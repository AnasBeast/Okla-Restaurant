import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";

const menuCategories = [
  { id: "burgers", name: "Burger Okla", icon: "🍔" },
  { id: "pizzas", name: "Mini Pizza", icon: "🍕" },
  { id: "poutines", name: "Poutine Okla", icon: "🍟" },
  { id: "sandwichs", name: "Sandwich Okla", icon: "🥪" },
  { id: "assiettes", name: "Les Assiettes", icon: "🍽️" },
  { id: "barquettes", name: "Barquettes", icon: "🥡" },
];

const MobileMenuScroller = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    menuCategories[0].id,
  );
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById("category-scroller");
    const handleScroll = () => {
      if (scroller) {
        setShowLeftArrow(scroller.scrollLeft > 0);
        setShowRightArrow(
          scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth,
        );
      }
    };

    const handlePageScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    if (scroller) {
      scroller.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handlePageScroll);

    return () => {
      if (scroller) {
        scroller.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, []);

  const scroll = (direction) => {
    const scroller = document.getElementById("category-scroller");
    if (scroller) {
      const scrollAmount = scroller.clientWidth / 2;
      scroller.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex flex-col bg-gradient-to-b from-green-50 to-white items-center md:hidden py-6 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Badge variant="secondary" className="mb-2">
            Notre Sélection
          </Badge>
          <h1 className="text-3xl font-bold text-gradient">Menu Okla</h1>
        </motion.div>

        <div className="w-full relative">
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-green-600 rounded-full p-1.5 shadow-soft z-10 border border-green-100"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-green-600 rounded-full p-1.5 shadow-soft z-10 border border-green-100"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div
            id="category-scroller"
            className="w-full overflow-x-auto scrollbar-hide"
          >
            <ul className="flex gap-3 w-max px-6 py-2">
              {menuCategories.map((category, index) => (
                <motion.li
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.a
                    href={`#${category.id}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-green-50 border border-gray-100"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-base">{category.icon}</span>
                    {category.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full p-3 shadow-lg z-50 hover:shadow-xl transition-shadow"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenuScroller;
