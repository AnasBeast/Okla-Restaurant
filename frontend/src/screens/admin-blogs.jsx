import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Image,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { blogsAPI } from "../services/api";
import { useBlogs, useDocumentTitle } from "../hooks";
import { useToast } from "../components/Toast";
import { useConfirm } from "../components/ConfirmDialog";
import Loadingscreen from "./Loadingscreen";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function AdminBlogs() {
  useDocumentTitle("Gestion de la Galerie - Admin");

  const navigate = useNavigate();
  const { showToast } = useToast();
  const confirm = useConfirm();
  const { blogs, isLoading, error, fetchBlogs } = useBlogs();

  const handleEdit = (id) => {
    navigate(`/admin/galerie/${id}`);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();

    const confirmed = await confirm({
      title: "Supprimer l'image",
      message:
        "Êtes-vous sûr de vouloir supprimer cette image de la galerie? Cette action est irréversible.",
      confirmText: "Supprimer",
      cancelText: "Annuler",
      type: "danger",
    });

    if (confirmed) {
      try {
        await blogsAPI.delete(id);
        showToast("Image supprimée avec succès", "success");
        fetchBlogs();
      } catch (err) {
        showToast(
          err.response?.data?.message || "Erreur lors de la suppression",
          "error",
        );
      }
    }
  };

  if (isLoading) {
    return <Loadingscreen />;
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
            <Button onClick={fetchBlogs} variant="gradient" className="gap-2">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                  Galerie d'images
                </h1>
                <p className="text-sm text-gray-500">
                  {blogs.length} image{blogs.length !== 1 ? "s" : ""} dans la
                  galerie
                </p>
              </div>
            </div>
            <Button
              variant="gradient"
              onClick={() => navigate("/admin/galerie/nouveau")}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter une image
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Empty State */}
        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-soft p-12 text-center">
              <CardContent className="p-0">
                <div className="p-6 bg-gray-100 rounded-full w-fit mx-auto mb-6">
                  <Image className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucune image
                </h3>
                <p className="text-gray-500 mb-6">
                  Commencez par ajouter des images à votre galerie
                </p>
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => navigate("/admin/galerie/nouveau")}
                  className="gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter une image
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-soft hover:shadow-lg transition-all"
                >
                  <img
                    src={blog.image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <motion.button
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(blog._id)}
                      className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-100 transition-colors shadow-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleDelete(blog._id, e)}
                      className="p-3 bg-white rounded-full text-red-600 hover:bg-red-100 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
