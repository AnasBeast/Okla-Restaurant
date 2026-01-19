import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  ImagePlus,
  Link as LinkIcon,
  Eye,
  RefreshCw,
} from "lucide-react";
import { blogsAPI } from "../services/api";
import { useToast } from "../components/Toast";
import { useDocumentTitle } from "../hooks";
import Loadingscreen from "./Loadingscreen";

/**
 * Unified Gallery Image Form Component
 * Handles both creating and editing gallery images
 */
export default function GalleryImageForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();

  // Determine if we're editing or creating
  const isEditing = Boolean(id);

  useDocumentTitle(isEditing ? "Modifier une Image" : "Ajouter une Image");

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Fetch image data when editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchImage = async () => {
      try {
        const { data } = await blogsAPI.getById(id);
        setImageUrl(data.image || "");
        setOriginalUrl(data.image || "");
        setShowPreview(true);
      } catch (err) {
        showToast("Erreur lors du chargement de l'image", "error");
        navigate("/admin/blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [id, isEditing, navigate, showToast]);

  const validateUrl = (url) => {
    try {
      const parsed = new URL(url);
      // Only allow http and https protocols
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setImageUrl(value);
    setShowPreview(false);
    setPreviewError(false);
  };

  const handlePreview = () => {
    if (!validateUrl(imageUrl)) {
      showToast("Veuillez entrer une URL valide (http/https)", "error");
      return;
    }
    setPreviewError(false);
    setShowPreview(true);
  };

  const handleImageError = () => {
    setPreviewError(true);
    showToast("Impossible de charger l'image", "error");
  };

  const resetToOriginal = () => {
    setImageUrl(originalUrl);
    setShowPreview(true);
    setPreviewError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUrl = imageUrl.trim();

    if (!trimmedUrl) {
      showToast("Veuillez entrer l'URL de l'image", "error");
      return;
    }

    if (!validateUrl(trimmedUrl)) {
      showToast("Veuillez entrer une URL valide (http/https)", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        await blogsAPI.update(id, { image: trimmedUrl });
        showToast("Image modifiée avec succès!", "success");
      } else {
        await blogsAPI.create({ image: trimmedUrl });
        showToast("Image ajoutée avec succès!", "success");
      }
      navigate("/admin/blogs");
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
            onClick={() => navigate("/admin/blogs")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à la galerie
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Modifier l'Image" : "Ajouter une Image"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Modifiez l'URL de l'image de la galerie"
              : "Ajoutez une nouvelle image à votre galerie"}
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Preview Section */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <ImagePlus className="w-4 h-4 inline mr-2" />
              Aperçu de l'image
            </label>
            <div className="w-full h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-white">
              {imageUrl && showPreview && !previewError ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="text-center p-8">
                  <ImagePlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    {previewError
                      ? "Impossible de charger l'image. Vérifiez l'URL."
                      : imageUrl
                        ? 'Cliquez sur "Aperçu" pour afficher l\'image'
                        : "Entrez une URL pour voir l'aperçu"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-6">
            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <LinkIcon className="w-4 h-4 inline mr-2" />
                URL de l'image
              </label>
              <div className="flex gap-3">
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://exemple.com/image.jpg"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={handlePreview}
                  disabled={!imageUrl}
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Aperçu
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Formats supportés: JPG, PNG, GIF, WEBP. Seules les URLs
                HTTP/HTTPS sont acceptées.
              </p>
              {isEditing && imageUrl !== originalUrl && (
                <button
                  type="button"
                  onClick={resetToOriginal}
                  className="mt-3 flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Restaurer l'URL originale
                </button>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
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
                  {isEditing ? "Enregistrer" : "Ajouter l'image"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
