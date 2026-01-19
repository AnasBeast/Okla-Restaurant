import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Image,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { blogsAPI } from "../services/api";
import { useBlogs, useDocumentTitle } from "../hooks";
import { useToast } from "../components/Toast";
import { useConfirm } from "../components/ConfirmDialog";
import Loadingscreen from "./Loadingscreen";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Galerie d'images
            </h1>
            <p className="text-gray-600 mt-1">
              {blogs.length} image{blogs.length !== 1 ? "s" : ""} dans la
              galerie
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/admin/galerie/nouveau")}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Ajouter une image
          </motion.button>
        </div>

        {/* Empty State */}
        {blogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune image
            </h3>
            <p className="text-gray-500 mb-6">
              Commencez par ajouter des images à votre galerie
            </p>
            <button
              onClick={() => navigate("/admin/galerie/nouveau")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />
              Ajouter une image
            </button>
          </motion.div>
        ) : (
          /* Gallery Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <img
                  src={blog.image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(blog._id)}
                    className="p-3 bg-white rounded-full text-gray-800 hover:bg-green-100 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleDelete(blog._id, e)}
                    className="p-3 bg-white rounded-full text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
