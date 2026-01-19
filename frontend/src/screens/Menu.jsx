import React, { useRef, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileMenuScroller from "../components/MobileScroller";
import Loadingscreen, { ProductGridSkeleton } from "./Loadingscreen";
import { useProducts, useDocumentTitle } from "../hooks";

const MenuItem = ({ item, index }) => (
  <div
    key={index}
    className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 justify-items-center flex-col gap-2 md:gap-4 bg-white"
  >
    <div className="relative h-60 w-full object-contain">
      {item.promo && (
        <img
          src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png"
          alt="promo"
          className="absolute z-10 w-24 md:w-48"
        />
      )}
      <LazyLoadImage
        src={item.bannerImg}
        alt={item.title}
        effect="blur"
        wrapperProps={{
          style: { transitionDelay: "0.25s" },
        }}
        className="rounded-lg object-cover h-[240px] w-full md:h-60"
        placeholderSrc={item.bannerImg}
        loading="lazy"
      />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
        {item.price && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
            {item.price}
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm">{item.description}</p>
    </div>
  </div>
);

const MenuCategory = ({ items }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 3);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    if (contentRef.current) {
      const calculateHeight = () => {
        const fullHeight = contentRef.current.scrollHeight;
        const singleItemHeight =
          contentRef.current.children[0]?.offsetHeight || 0;
        const collapsedHeight = Math.min(fullHeight, singleItemHeight * 3 + 64);
        return showAll ? `${fullHeight}px` : `${collapsedHeight}px`;
      };

      setContentHeight(calculateHeight());

      if (!showAll) {
        setTimeout(() => {
          setContentHeight(calculateHeight());
        }, 0);
      }
    }
  }, [showAll, items]);

  if (items.length === 0) return null;

  return (
    <div className="mb-12">
      <div
        ref={contentRef}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: contentHeight }}
      >
        {displayedItems.map((item, index) => (
          <MenuItem key={item._id || index} item={item} index={index} />
        ))}
      </div>
      {items.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 p-4 rounded-lg"
          >
            {showAll ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
    </div>
  );
};

export default function Menu() {
  useDocumentTitle("Menu");

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
  if (isLoading) {
    return (
      <div className="bg-green-50 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto my-8 md:my-20 px-4">
          <ProductGridSkeleton count={6} />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-green-50 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto my-8 md:my-20 px-4 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Réessayer
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-green-50">
      <Navbar />
      <div className="md:max-w-7xl mx-auto my-8 md:my-20 flex flex-col gap-8 md:gap-20 ">
        <div className="hidden w-full md:grid mx-auto  grid-cols-6 bg-green-600 border-green-600 border-2 text-center">
          <div>
            <a href="#burgers">
              <button className="text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full">
                BURGER OKLA
              </button>
            </a>
          </div>
          <div>
            <a href="#pizzas">
              <button className="text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full">
                MINI PIZZA 6PO
              </button>
            </a>
          </div>
          <div>
            <a href="#poutines">
              <button className="text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full">
                POUTINE OKLA
              </button>
            </a>
          </div>
          <div>
            <a href="#sandwichs">
              <button className="text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full">
                SANDWICH OKLA
              </button>
            </a>
          </div>
          <div>
            <a href="#assiettes">
              <button className="text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full">
                LES ASSIETTES
              </button>
            </a>
          </div>
          <div>
            <a href="#barquettes">
              <button className="text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full">
                BARQUETTES PATATES
              </button>
            </a>
          </div>
        </div>

        <MobileMenuScroller />

        <div className="flex flex-col gap-20  py-10 px-2 md:max-w-7xl mx-auto md:p-0 ">
          <section className="flex flex-col gap-8" id="burgers">
            <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
              Burgers
            </h1>
            {/* Burgers */}
            <MenuCategory items={burgers} />
          </section>
          <section className="flex flex-col gap-8" id="pizzas">
            <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
              Pizzas
            </h1>
            {/* Pizzas */}
            <MenuCategory items={pizzas} />
          </section>
          <section className="flex flex-col gap-8" id="poutines">
            <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
              Poutines
            </h1>
            {/* Poutines */}
            <MenuCategory items={poutines} />
          </section>
          <section className="flex flex-col gap-8" id="sandwichs">
            <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
              Sandwichs
            </h1>
            {/* Sandwichs */}
            <MenuCategory items={sandwichs} />
          </section>
          <section className="flex flex-col gap-8" id="assiettes">
            <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
              Assiettes
            </h1>
            {/* Assiettes */}
            <MenuCategory items={assiettes} />
          </section>
          <section className="flex flex-col gap-8" id="barquettes">
            <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
              Barquettes
            </h1>
            {/* Barquettes */}
            <MenuCategory items={barquettes} />
          </section>
          {cafes.length !== 0 && (
            <section className="flex flex-col gap-8" id="cafes">
              <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
                café
              </h1>
              {/* Cafe */}
              <MenuCategory items={cafes} />
            </section>
          )}
          {cremeries.length !== 0 && (
            <section className="flex flex-col gap-8" id="cremeries">
              <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
                Crémerie
              </h1>
              {/* Crémerie */}
              <MenuCategory items={cremeries} />
            </section>
          )}
          {patisseries.length !== 0 && (
            <section className="flex flex-col gap-8" id="patisseries">
              <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
                Pâtisserie
              </h1>
              {/* Pâtisserie */}
              <MenuCategory items={patisseries} />
            </section>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
