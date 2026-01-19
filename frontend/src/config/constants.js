/**
 * Shared Configuration
 * Constants and configuration used across the frontend
 */

// Product type configuration
export const PRODUCT_TYPES = [
  { value: "burger", label: "Burger", displayName: "BURGER OKLA" },
  { value: "pizza", label: "Pizza", displayName: "MINI PIZZA 6PO" },
  { value: "poutine", label: "Poutine", displayName: "POUTINE OKLA" },
  { value: "sandwich", label: "Sandwich", displayName: "SANDWICH OKLA" },
  { value: "assiette", label: "Assiette", displayName: "LES ASSIETTES" },
  { value: "barquette", label: "Barquette", displayName: "BARQUETTES PATATES" },
  { value: "cafe", label: "Café", displayName: "CAFÉ" },
  { value: "cremerie", label: "Crémerie", displayName: "CRÉMERIE" },
  { value: "patisserie", label: "Pâtisserie", displayName: "PÂTISSERIE" },
];

// Menu categories for navigation
export const MENU_CATEGORIES = [
  { id: "burgers", name: "Burger Okla", type: "burger" },
  { id: "pizzas", name: "MINI PIZZA 6PO", type: "pizza" },
  { id: "poutines", name: "POUTINE OKLA", type: "poutine" },
  { id: "sandwichs", name: "SANDWICH OKLA", type: "sandwich" },
  { id: "assiettes", name: "LES ASSIETTES", type: "assiette" },
  { id: "barquettes", name: "BARQUETTES PATATES", type: "barquette" },
];

// Restaurant info
export const RESTAURANT_INFO = {
  name: "Restaurant Okla",
  address: "70 Av. Bégin, Lévis, QC G6V 4C5, Canada",
  plusCode: "RR59+9P Levis, Quebec, Canada",
  phone: "+14188333592",
  email: "restokla2024@gmail.com",
  hours: "Lundi - Dimanche: 11h:30 - 19h",
  socialMedia: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
  },
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.787602556296!2d-71.18331668759187!3d46.808489642628196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb895bc3065b769%3A0xe318d05e8b004093!2s70%20Av.%20B%C3%A9gin%2C%20L%C3%A9vis%2C%20QC%20G6V%204C5%2C%20Canada!5e0!3m2!1sen!2stn!4v1719059603528!5m2!1sen!2stn",
};

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_DOMAIN,
  timeout: 30000,
};

// Testimonials data
export const TESTIMONIALS = [
  {
    name: "Karim L.",
    comment:
      "Delicious filled baguette and homemade fries at reasonable prices. Très delicieux!",
    rating: 5,
  },
  {
    name: "Rana D.",
    comment:
      "Okla est un restaurant unique de cuisine méditerranéenne-tunisienne et internationale à Lévis, Québec. Les propriétaires sont exceptionnellement gentils et orientés client. La nourriture est vraiment faite maison, authentique et délicieuse. L'établissement est très propre, confortable et dégage un arôme appétissant. Je recommande vivement ce restaurant d'exception !",
    rating: 5,
  },
  {
    name: "David G.",
    comment:
      "Au bas de la rue Bégin, une superbe découverte! Tout est frais, fabriqué sur place ! La baguette farcie tunisienne est incroyable. Les frites sont fraîches et faites maison, cuites à la commande et servies avec des épices. A découvrir sans hésiter c'était vraiment excellent. J'ai mangé sur la terrasse extérieure.",
    rating: 5,
  },
];

// Floating foods for home page
export const FLOATING_FOODS = [
  { src: "/assets/burger-outline.png", alt: "Burger", top: "10%", left: "5%" },
  { src: "/assets/pizza-outline.png", alt: "Pizza", top: "30%", right: "10%" },
  {
    src: "/assets/poutine-outline.png",
    alt: "Poutine",
    bottom: "20%",
    left: "15%",
  },
  {
    src: "/assets/sandwich-outline.png",
    alt: "Sandwich",
    top: "15%",
    right: "20%",
  },
  {
    src: "/assets/burger-outline.png",
    alt: "Burger",
    bottom: "10%",
    right: "25%",
  },
  {
    src: "/assets/pizza-outline.png",
    alt: "Pizza",
    bottom: "30%",
    left: "40%",
  },
  {
    src: "/assets/poutine-outline.png",
    alt: "Poutine",
    top: "20%",
    right: "35%",
  },
];
