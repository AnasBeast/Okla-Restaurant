import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Image,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useDocumentTitle } from "../hooks";

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  color = "green",
}) => {
  const colors = {
    green:
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    purple:
      "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-6 rounded-xl bg-gradient-to-r ${colors[color]} text-white shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-white/80">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5" />
      </div>
    </motion.button>
  );
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useDocumentTitle("Tableau de bord");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Produits du Menu",
      description: "Gérer les produits affichés sur le menu",
      icon: Package,
      onClick: () => navigate("/admin/produits"),
      color: "green",
    },
    {
      title: "Galerie d'images",
      description: "Gérer les images de la galerie",
      icon: Image,
      onClick: () => navigate("/admin/blogs"),
      color: "blue",
    },
  ];

  const quickActions = [
    {
      title: "Ajouter un produit",
      icon: PlusCircle,
      onClick: () => navigate("/admin/produit/nouveau"),
      color: "text-green-600 hover:bg-green-50",
    },
    {
      title: "Ajouter une image",
      icon: PlusCircle,
      onClick: () => navigate("/admin/galerie/nouveau"),
      color: "text-blue-600 hover:bg-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Tableau de bord
                </h1>
                <p className="text-sm text-gray-500">
                  Restaurant Okla - Administration
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-2">
            Bienvenue{user?.email ? `, ${user.email.split("@")[0]}` : ""} !
          </h2>
          <p className="text-green-100">
            Gérez votre restaurant depuis ce tableau de bord. Ajoutez, modifiez
            ou supprimez des produits et des images.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h3>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.onClick}
                className={`flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 font-medium transition-colors ${action.color}`}
              >
                <action.icon className="w-4 h-4" />
                {action.title}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Menu */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <DashboardCard {...item} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
