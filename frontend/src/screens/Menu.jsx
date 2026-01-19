import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileMenuScroller from "../components/MobileScroller";
import { ProductGridSkeleton } from "./Loadingscreen";
import { useProducts, useDocumentTitle } from "../hooks";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { cn } from "../lib/utils";
import { ChevronDown, ChevronUp, Sparkles, RefreshCw } from "lucide-react";

const menuCategories = [
  { id: "burgers", label: "BURGER OKLA", icon: "🍔" },
  { id: "pizzas", label: "MINI PIZZA", icon: "🍕" },
  { id: "poutines", label: "POUTINE OKLA", icon: "🍟" },
  { id: "sandwichs", label: "SANDWICH OKLA", icon: "🥖" },
  { id: "assiettes", label: "LES ASSIETTES", icon: "🍽️" },
  { id: "barquettes", label: "BARQUETTES", icon: "📦" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const MenuItem = ({ item, index }) => (
  <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group">
    <Card className="h-full overflow-hidden border-0 shadow-soft hover:shadow-soft-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        {item.promo && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="absolute top-3 left-3 z-10"
          >
            <Badge variant="destructive" className="gap-1 shadow-lg">
              <Sparkles className="w-3 h-3" />
              PROMO
            </Badge>
          </motion.div>
        )}
        <div className="relative h-56 overflow-hidden">
          <LazyLoadImage
            src={item.bannerImg}
            alt={item.title}
            effect="blur"
            wrapperProps={{
              style: { transitionDelay: "0.1s" },
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            placeholderSrc={item.bannerImg}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1">
            {item.title}
          </h3>
          {item.price && (
            <Badge variant="success" className="ml-2 flex-shrink-0">
              {item.price}
            </Badge>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const MenuCategory = ({ items, categoryName }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 6);

  if (items.length === 0) return null;

  return (
    <div className="mb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {displayedItems.map((item, index) => (
            <MenuItem key={item._id || index} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length > 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Voir moins
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Voir plus ({items.length - 6} de plus)
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default function Menu() {
  useDocumentTitle("Menu");
  const [activeCategory, setActiveCategory] = useState("burgers");

  const {
    isLoading,
    error,
    burgers,
    pizzas,
    poutines,
    sandwichs,
    assiettes,
    barquettes,
    cafes,
    cremeries,
    patisseries,
    fetchProducts,
  } = useProducts();

  const categoryData = {
    burgers,
    pizzas,
    poutines,
    sandwichs,
    assiettes,
    barquettes,
    cafes,
    cremeries,
    patisseries,
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <ProductGridSkeleton count={6} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto py-20 px-4">
          <Card className="max-w-md mx-auto text-center p-8">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <RefreshCw className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Erreur de chargement
              </h3>
              <p className="text-gray-600">{error}</p>
              <Button onClick={fetchProducts} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen">
      <Navbar />

      <main className="py-8 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 px-4"
        >
          <Badge variant="secondary" className="mb-4">
            Découvrez nos spécialités
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Notre <span className="text-gradient">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des saveurs authentiques tunisiennes et méditerranéennes préparées
            avec des ingrédients frais et de qualité.
          </p>
        </motion.div>

        {/* Desktop Category Navigation */}
        <div className="hidden md:block max-w-6xl mx-auto mb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-2 border-0 shadow-soft">
              <ScrollArea className="w-full">
                <div className="flex gap-2 p-1">
                  {menuCategories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "flex-1 min-w-[140px] py-4 px-6 rounded-xl text-center font-medium transition-all duration-300",
                        activeCategory === cat.id
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-600",
                      )}
                    >
                      <span className="text-2xl block mb-1">{cat.icon}</span>
                      <span className="text-xs">{cat.label}</span>
                    </a>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Card>
          </motion.div>
        </div>

        {/* Mobile Menu Scroller */}
        <MobileMenuScroller />

        {/* Menu Sections */}
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {menuCategories.map((cat) => {
            const items = categoryData[cat.id] || [];
            if (items.length === 0) return null;

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-8"
                >
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {cat.label}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {items.length} produit{items.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </motion.div>
                <MenuCategory items={items} categoryName={cat.label} />
              </section>
            );
          })}

          {/* Optional Categories */}
          {cafes.length > 0 && (
            <section id="cafes" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-4xl">☕</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    CAFÉ
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {cafes.length} produit{cafes.length > 1 ? "s" : ""}
                  </p>
                </div>
              </motion.div>
              <MenuCategory items={cafes} categoryName="Café" />
            </section>
          )}

          {cremeries.length > 0 && (
            <section id="cremeries" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-4xl">🍦</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    CRÉMERIE
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {cremeries.length} produit{cremeries.length > 1 ? "s" : ""}
                  </p>
                </div>
              </motion.div>
              <MenuCategory items={cremeries} categoryName="Crémerie" />
            </section>
          )}

          {patisseries.length > 0 && (
            <section id="patisseries" className="scroll-mt-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="text-4xl">🥐</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    PÂTISSERIE
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {patisseries.length} produit
                    {patisseries.length > 1 ? "s" : ""}
                  </p>
                </div>
              </motion.div>
              <MenuCategory items={patisseries} categoryName="Pâtisserie" />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
