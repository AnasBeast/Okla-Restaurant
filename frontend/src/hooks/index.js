/**
 * Custom React Hooks
 * Reusable hooks for common functionality
 */
import { useState, useEffect, useCallback } from "react";
import { productsAPI, blogsAPI } from "../services/api";

/**
 * Hook for fetching and managing products
 */
export const useProducts = (fetchOnMount = true) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Group products by type
  const [productsByType, setProductsByType] = useState({
    burger: [],
    pizza: [],
    poutine: [],
    sandwich: [],
    assiette: [],
    barquette: [],
    cafe: [],
    cremerie: [],
    patisserie: [],
  });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await productsAPI.getAll();
      const fetchedProducts = data.products || [];
      setProducts(fetchedProducts);

      // Group by type
      setProductsByType({
        burger: fetchedProducts.filter((p) => p.type === "burger"),
        pizza: fetchedProducts.filter((p) => p.type === "pizza"),
        poutine: fetchedProducts.filter((p) => p.type === "poutine"),
        sandwich: fetchedProducts.filter((p) => p.type === "sandwich"),
        assiette: fetchedProducts.filter((p) => p.type === "assiette"),
        barquette: fetchedProducts.filter((p) => p.type === "barquette"),
        cafe: fetchedProducts.filter((p) => p.type === "cafe"),
        cremerie: fetchedProducts.filter((p) => p.type === "cremerie"),
        patisserie: fetchedProducts.filter((p) => p.type === "patisserie"),
      });
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      await productsAPI.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      // Also update grouped products
      setProductsByType((prev) => {
        const updated = {};
        Object.keys(prev).forEach((key) => {
          updated[key] = prev[key].filter((p) => p._id !== id);
        });
        return updated;
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  useEffect(() => {
    if (fetchOnMount) {
      fetchProducts();
    }
  }, [fetchOnMount, fetchProducts]);

  return {
    products,
    productsByType,
    isLoading,
    error,
    fetchProducts,
    deleteProduct,
    // Keep backward compatibility with old naming
    burgers: productsByType.burger,
    pizzas: productsByType.pizza,
    poutines: productsByType.poutine,
    sandwichs: productsByType.sandwich,
    assiettes: productsByType.assiette,
    barquettes: productsByType.barquette,
    cafes: productsByType.cafe,
    cremeries: productsByType.cremerie,
    patisseries: productsByType.patisserie,
  };
};

/**
 * Hook for fetching a single product
 */
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const { data } = await productsAPI.getById(id);
        setProduct(data.data?.product || data);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};

/**
 * Hook for fetching and managing blogs
 */
export const useBlogs = (fetchOnMount = true) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await blogsAPI.getAll();
      setBlogs(data.blogs || []);
    } catch (err) {
      setError(err.message || "Failed to fetch blogs");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBlog = useCallback(async (id) => {
    try {
      await blogsAPI.delete(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  useEffect(() => {
    if (fetchOnMount) {
      fetchBlogs();
    }
  }, [fetchOnMount, fetchBlogs]);

  return { blogs, isLoading, error, fetchBlogs, deleteBlog };
};

/**
 * Hook for document title
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Restaurant Okla | ${title}`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

/**
 * Hook for local storage
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook for scroll position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
};

/**
 * Hook for window dimensions
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
