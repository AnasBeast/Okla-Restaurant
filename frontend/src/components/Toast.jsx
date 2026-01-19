/**
 * Toast Notification Component
 * Modern toast notifications for user feedback
 */
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

// Toast Context
const ToastContext = createContext(null);

// Toast types with their styles
const toastTypes = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
    iconColor: "text-green-500",
    titleColor: "text-green-800",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-500",
    iconColor: "text-red-500",
    titleColor: "text-red-800",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-500",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-800",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
    iconColor: "text-blue-500",
    titleColor: "text-blue-800",
  },
};

// Individual Toast Component
const Toast = ({ id, type, title, message, onClose, duration = 5000 }) => {
  const config = toastTypes[type] || toastTypes.info;
  const Icon = config.icon;

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 ${config.bgColor} ${config.borderColor} max-w-md w-full`}
    >
      <Icon className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1">
        {title && (
          <h4 className={`font-medium ${config.titleColor}`}>{title}</h4>
        )}
        {message && <p className="text-gray-600 text-sm mt-1">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((options) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      type: options.type || "info",
      title: options.title,
      message: options.message,
      duration: options.duration ?? 5000,
    };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods
  const toast = {
    success: (title, message, duration) =>
      addToast({ type: "success", title, message, duration }),
    error: (title, message, duration) =>
      addToast({ type: "error", title, message, duration }),
    warning: (title, message, duration) =>
      addToast({ type: "warning", title, message, duration }),
    info: (title, message, duration) =>
      addToast({ type: "info", title, message, duration }),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
