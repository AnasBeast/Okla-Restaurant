/**
 * Application Constants
 * Centralized configuration for the application
 */

// Product types configuration
const PRODUCT_TYPES = [
  "burger",
  "pizza",
  "poutine",
  "sandwich",
  "assiette",
  "barquette",
  "cafe",
  "cremerie",
  "patisserie",
];

// Product type display names (French)
const PRODUCT_TYPE_LABELS = {
  burger: "Burger",
  pizza: "Pizza",
  poutine: "Poutine",
  sandwich: "Sandwich",
  assiette: "Assiette",
  barquette: "Barquette",
  cafe: "Café",
  cremerie: "Crémerie",
  patisserie: "Pâtisserie",
};

// Pagination defaults
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// JWT Configuration
const JWT_CONFIG = {
  EXPIRATION: "24h", // Increased from 2h for better UX
  REFRESH_EXPIRATION: "7d",
};

// File upload configuration
const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
};

// CORS Configuration
const CORS_CONFIG = {
  ALLOWED_ORIGINS: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  ALLOWED_METHODS: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  ALLOWED_HEADERS: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "x-access-token",
    "Accept",
    "Origin",
  ],
};

// Error messages (French)
const ERROR_MESSAGES = {
  UNAUTHORIZED: "Non autorisé. Veuillez vous connecter.",
  FORBIDDEN: "Accès refusé.",
  NOT_FOUND: "Ressource non trouvée.",
  INVALID_CREDENTIALS: "Email ou mot de passe incorrect.",
  USER_EXISTS: "Un utilisateur avec cet email existe déjà.",
  TOKEN_EXPIRED: "Session expirée. Veuillez vous reconnecter.",
  INVALID_TOKEN: "Token invalide.",
  SERVER_ERROR: "Une erreur est survenue. Veuillez réessayer.",
  VALIDATION_ERROR: "Données invalides.",
  PRODUCT_NOT_FOUND: "Produit non trouvé.",
  BLOG_NOT_FOUND: "Blog non trouvé.",
  FILE_REQUIRED: "Fichier requis.",
  INVALID_FILE_TYPE: "Type de fichier non supporté.",
  FILE_TOO_LARGE: "Fichier trop volumineux.",
};

// Success messages (French)
const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Connexion réussie.",
  LOGOUT_SUCCESS: "Déconnexion réussie.",
  PRODUCT_CREATED: "Produit créé avec succès.",
  PRODUCT_UPDATED: "Produit mis à jour avec succès.",
  PRODUCT_DELETED: "Produit supprimé avec succès.",
  BLOG_CREATED: "Blog créé avec succès.",
  BLOG_UPDATED: "Blog mis à jour avec succès.",
  BLOG_DELETED: "Blog supprimé avec succès.",
};

module.exports = {
  PRODUCT_TYPES,
  PRODUCT_TYPE_LABELS,
  PAGINATION,
  JWT_CONFIG,
  UPLOAD_CONFIG,
  CORS_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
