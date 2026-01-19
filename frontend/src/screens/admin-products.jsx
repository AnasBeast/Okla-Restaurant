import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Package,
  CheckCircle,
} from "lucide-react";
import Loadingscreen, { ProductGridSkeleton } from "./Loadingscreen";
import { useProducts, useDocumentTitle } from "../hooks";
import { useToast } from "../components/Toast";
import { useConfirm } from "../components/ConfirmDialog";
import { PRODUCT_TYPES } from "../config/constants";

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48">
        {product.promo && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            PROMO
          </div>
        )}
        <img
          src={product.bannerImg}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {product.type}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(product._id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Section Component for grouping products
const ProductSection = ({ title, products, onEdit, onDelete }) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-green-600" />
        {title}
        <span className="text-sm font-normal text-gray-500">
          ({products.length})
        </span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default function AdminProducts() {
  const navigate = useNavigate();
  const toast = useToast();
  const confirm = useConfirm();
  const {
    products,
    productsByType,
    isLoading,
    error,
    deleteProduct,
    fetchProducts,
  } = useProducts();

  useDocumentTitle("Gestion des Produits");

  const handleEdit = (id) => {
    navigate(`/admin/produit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Supprimer le produit",
      message:
        "Êtes-vous sûr de vouloir supprimer ce produit? Cette action est irréversible.",
      confirmText: "Supprimer",
      cancelText: "Annuler",
      variant: "danger",
    });

    if (confirmed) {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success("Succès", "Produit supprimé avec succès");
      } else {
        toast.error(
          "Erreur",
          result.error || "Impossible de supprimer le produit",
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/admin")}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des Produits
                </h1>
                <p className="text-sm text-gray-500">
                  {products.length} produits au total
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/produit/nouveau")}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nouveau produit
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit
            </h2>
            <p className="text-gray-500 mb-6">
              Commencez par ajouter votre premier produit
            </p>
            <button
              onClick={() => navigate("/admin/ajouter-produit")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter un produit
            </button>
          </div>
        ) : (
          <>
            {PRODUCT_TYPES.map(({ value, label }) => (
              <ProductSection
                key={value}
                title={label}
                products={
                  productsByType[value + "s"] || productsByType[value] || []
                }
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </main>
    </div>
  );
}
