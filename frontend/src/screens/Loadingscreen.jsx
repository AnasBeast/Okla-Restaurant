import React from "react";
import { motion } from "framer-motion";

export default function Loadingscreen({
  message = "Chargement...",
  fullScreen = true,
}) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-green-50/80 backdrop-blur-sm z-50"
    : "w-full py-20";

  return (
    <div
      className={`${containerClasses} flex flex-col items-center justify-center`}
    >
      {/* Animated Logo/Spinner */}
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-green-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-green-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-green-700 font-medium"
      >
        {message}
      </motion.p>

      {/* Animated Dots */}
      <div className="flex gap-1 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-green-600 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton loader for content placeholders
export function SkeletonLoader({ className = "", rows = 3 }) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 rounded w-full"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
    </div>
  );
}

// Product card skeleton
export function ProductSkeleton() {
  return (
    <div className="rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-60 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

// Grid of product skeletons
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
    </div>
  );
}
