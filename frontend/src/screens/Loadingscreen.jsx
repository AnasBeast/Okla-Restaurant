import React from "react";
import { motion } from "framer-motion";

export default function Loadingscreen({
  message = "Chargement...",
  fullScreen = true,
}) {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-gradient-to-br from-green-50 via-white to-green-50 z-50"
    : "w-full py-20";

  return (
    <div
      className={`${containerClasses} flex flex-col items-center justify-center`}
    >
      {/* Background decorations */}
      {fullScreen && (
        <>
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-green-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-green-300/30 rounded-full blur-3xl" />
        </>
      )}

      {/* Logo */}
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="/assets/logo.png"
        alt="Restaurant Okla"
        className="w-24 h-24 mb-6 drop-shadow-lg"
      />

      {/* Animated Spinner */}
      <div className="relative">
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-green-100"
          style={{ borderTopColor: "transparent" }}
        />
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-green-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 w-12 h-12 rounded-full border-4 border-transparent border-t-green-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-green-700 font-medium text-lg"
      >
        {message}
      </motion.p>

      {/* Animated Dots */}
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
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
    <div className={`space-y-4 ${className}`}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"
            style={{ width: `${100 - i * 15}%` }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
    </div>
  );
}

// Product card skeleton
export function ProductSkeleton() {
  return (
    <div className="rounded-xl shadow-soft overflow-hidden bg-white">
      <div className="h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gray-200 rounded-full w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-full w-2/3 animate-pulse" />
        <div className="flex gap-2 mt-4">
          <div className="h-8 bg-gray-200 rounded-lg flex-1 animate-pulse" />
          <div className="h-8 w-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Grid of product skeletons
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProductSkeleton />
          </motion.div>
        ))}
    </div>
  );
}

// Card skeleton
export function CardSkeleton({ className = "" }) {
  return (
    <div
      className={`rounded-xl bg-white shadow-soft overflow-hidden ${className}`}
    >
      <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
      </div>
    </div>
  );
}
