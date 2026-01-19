import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Separator } from "./ui/separator";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const quickLinks = [
  { name: "Menu", path: "/menu" },
  { name: "Contact", path: "/contact" },
  { name: "Localisation", path: "/localisation" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-green-600 to-green-700 text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Restaurant Okla"
                className="h-12 w-12 bg-white rounded-full p-1"
              />
              <h3 className="text-xl font-bold">Restaurant Okla</h3>
            </div>
            <p className="text-green-100 leading-relaxed">
              Une expérience culinaire unique avec des saveurs authentiques
              tunisiennes et méditerranéennes dans un cadre chaleureux.
            </p>
          </motion.div>

          {/* Hours Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 bg-white/10 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              Horaires
            </h3>
            <div className="space-y-2 text-green-100">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Lundi - Vendredi</span>
                <span className="font-medium text-white">11h30 - 19h</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span>Samedi - Dimanche</span>
                <span className="font-medium text-white">11h30 - 19h</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="p-2 bg-white/10 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              Contact
            </h3>
            <ul className="space-y-3 text-green-100">
              <li>
                <a
                  href="https://maps.google.com/?q=70+Av.+Bégin,+Lévis,+QC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors group"
                >
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>70 Av. Bégin, Lévis, QC G6V 4C5</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+14188333592"
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+1 418 833-3592</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:restokla2024@gmail.com"
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>restokla2024@gmail.com</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social & Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Quick Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-3 text-green-200">
                Liens rapides
              </h4>
              <div className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-green-100 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Separator */}
        <Separator className="my-8 bg-white/20" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-green-100 text-sm"
        >
          <p className="flex items-center gap-1">
            © {currentYear} Restaurant Okla. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-red-400 fill-red-400" />{" "}
            par
            <a href="mailto:boussehminea@gmail.com">Anas Boussehmine</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
