import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Package,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { ProductGridSkeleton } from "./Loadingscreen";
import { useProducts, useDocumentTitle } from "../hooks";
import { useToast } from "../components/Toast";
import { useConfirm } from "../components/ConfirmDialog";
import { PRODUCT_TYPES } from "../config/constants";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden border-0 shadow-soft hover-lift group">
        <div className="relative h-48 overflow-hidden">
          {product.promo && (
            <Badge variant="destructive" className="absolute top-3 left-3 z-10">
              PROMO
            </Badge>
          )}
          <img
            src={product.bannerImg}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 truncate">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="success" className="gap-1">
              <CheckCircle className="w-3 h-3" />
              {product.type}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {product.description}
          </p>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(product._id)}
              className="flex-1 gap-1"
            >
              <Edit className="w-4 h-4" />
              Modifier
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(product._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Section Component for grouping products
const ProductSection = ({ title, products, onEdit, onDelete }) => {
  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Package className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Badge variant="secondary">{products.length}</Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
        <div className="max-w-7xl mx-auto">
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="max-w-md border-0 shadow-soft">
          <CardContent className="p-8 text-center">
            <div className="p-4 bg-red-100 rounded-full w-fit mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Erreur de chargement
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button
              onClick={fetchProducts}
              variant="gradient"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des Produits
                </h1>
                <p className="text-sm text-gray-500">
                  {products.length} produits au total
                </p>
              </div>
            </div>
            <Button
              variant="gradient"
              onClick={() => navigate("/admin/produit/nouveau")}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Nouveau produit
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun produit
            </h2>
            <p className="text-gray-500 mb-6">
              Commencez par ajouter votre premier produit
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate("/admin/ajouter-produit")}
              className="gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter un produit
            </Button>
          </motion.div>
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
