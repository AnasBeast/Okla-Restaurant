import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  ImagePlus,
  Tag,
  FileText,
  Type,
  BadgePercent,
  RefreshCw,
} from "lucide-react";
import { productsAPI } from "../services/api";
import { useToast } from "../components/Toast";
import { useDocumentTitle } from "../hooks";
import { PRODUCT_TYPES } from "../config/constants";
import Loadingscreen from "./Loadingscreen";

/**
 * Unified Product Form Component
 * Handles both creating and editing products
 */
export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();

  // Determine if we're editing or creating
  const isEditing = Boolean(id);

  useDocumentTitle(isEditing ? "Modifier un Produit" : "Ajouter un Produit");

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "burger",
    promo: false,
    bannerImg: null,
  });

  // Fetch product data when editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchProduct = async () => {
      try {
        const { data } = await productsAPI.getById(id);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          type: data.type || "burger",
          promo: data.promo || false,
          bannerImg: null,
        });
        setImagePreview(data.bannerImg);
        setOriginalImage(data.bannerImg);
      } catch (err) {
        showToast("Erreur lors du chargement du produit", "error");
        navigate("/admin/produits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, isEditing, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showToast("L'image ne doit pas dépasser 5MB", "error");
        return;
      }

      setFormData((prev) => ({ ...prev, bannerImg: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setFormData((prev) => ({ ...prev, bannerImg: null }));
    setImagePreview(originalImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      showToast("Veuillez entrer le nom du produit", "error");
      return;
    }

    if (!isEditing && !formData.bannerImg) {
      showToast("Veuillez sélectionner une image", "error");
      return;
    }

    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append("title", formData.title.trim());
    submitData.append("description", formData.description.trim());
    submitData.append("type", formData.type);
    submitData.append("promo", formData.promo);

    if (formData.bannerImg) {
      submitData.append("bannerImg", formData.bannerImg);
    }

    try {
      if (isEditing) {
        await productsAPI.update(id, submitData);
        showToast("Produit modifié avec succès!", "success");
      } else {
        await productsAPI.create(submitData);
        showToast("Produit ajouté avec succès!", "success");
      }
      navigate("/admin/produits");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        (isEditing
          ? "Erreur lors de la modification"
          : "Erreur lors de l'ajout");
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loadingscreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/produits")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux produits
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Modifier le Produit" : "Ajouter un Produit"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Modifiez les informations du produit"
              : "Remplissez les informations pour créer un nouveau produit"}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Image Upload Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <ImagePlus className="w-4 h-4 inline mr-2" />
              Image du produit
            </label>
            <div className="flex items-start gap-6">
              <div
                className={`${isEditing ? "w-40 h-40" : "w-32 h-32"} rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-white flex-shrink-0`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  name="bannerImg"
                  onChange={handleImageChange}
                  accept="image/png, image/gif, image/jpeg, image/webp"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-medium
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100
                    cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF ou WEBP. Max 5MB.
                </p>
                {isEditing && formData.bannerImg && (
                  <button
                    type="button"
                    onClick={resetImage}
                    className="mt-3 flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Restaurer l'image originale
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Type className="w-4 h-4 inline mr-2" />
                Nom du produit
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Burger Classique"
                maxLength={100}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Décrivez votre produit..."
                maxLength={500}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">
                {formData.description.length}/500
              </p>
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Tag className="w-4 h-4 inline mr-2" />
                Type de produit
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
              >
                {PRODUCT_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Promo Toggle */}
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <BadgePercent className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">En promotion</p>
                  <p className="text-sm text-gray-500">
                    Afficher le badge promo sur ce produit
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="promo"
                  checked={formData.promo}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/produits")}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isEditing ? "Modification..." : "Ajout en cours..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {isEditing ? "Enregistrer" : "Ajouter le produit"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
