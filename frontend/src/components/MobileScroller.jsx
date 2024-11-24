import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

const menuCategories = [
  { id: 'burgers', name: 'Burger Okla' },
  { id: 'pizzas', name: 'MINI PIZZA 6PO' },
  { id: 'poutines', name: 'POUTINE OKLA' },
  { id: 'sandwichs', name: 'SANDWICH OKLA' },
  { id: 'assiettes', name: 'LES ASSIETTES' },
  { id: 'barquettes', name: 'BARQUETTES PATATES' },
];

const MobileMenuScroller = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const scroller = document.getElementById('category-scroller');
    const handleScroll = () => {
      if (scroller) {
        setShowLeftArrow(scroller.scrollLeft > 0);
        setShowRightArrow(
          scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth
        );
      }
    };

    const handlePageScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handlePageScroll);

    return () => {
      if (scroller) {
        scroller.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handlePageScroll);
    };
  }, []);

  const scroll = (direction) => {
    const scroller = document.getElementById('category-scroller');
    if (scroller) {
      const scrollAmount = scroller.clientWidth / 2;
      scroller.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className='flex flex-col bg-green-50 items-center md:hidden py-6 px-4 relative'>
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Menu Okla
        </h1>
        <div className='w-full relative'>
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-1 shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-1 shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          )}
          <div id="category-scroller" className='w-full overflow-x-auto scrollbar-hide'>
            <ul className='flex gap-4 w-max px-4 py-2'>
              {menuCategories.map((category) => (
                <li key={category.id}>
                  <motion.a
                    href={`#${category.id}`}
                    className={`block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-green-800 hover:bg-green-100'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-4 left-4 bg-green-600 text-white rounded-full p-3 shadow-lg z-50"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenuScroller;

