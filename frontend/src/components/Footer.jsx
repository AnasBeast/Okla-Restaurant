import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Restaurant Okla</h3>
            <p className="text-green-100">
              Une expérience culinaire unique dans un cadre chaleureux et
              accueillant.
            </p>
          </div>

          {/* Hours Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horaires
            </h3>
            <ul className="space-y-2 text-green-100">
              <li>Lundi - Dimanche: 11h30 - 19h</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-green-100">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>70 Av. Bégin, Lévis, QC G6V 4C5, Canada</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:+14188333592"
                  className="hover:text-white transition-colors"
                >
                  +1 418 833-3592
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:restokla2024@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  restokla2024@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors p-2 bg-green-700 rounded-full hover:bg-green-800"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors p-2 bg-green-700 rounded-full hover:bg-green-800"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors p-2 bg-green-700 rounded-full hover:bg-green-800"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Liens rapides</h4>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/menu"
                  className="text-sm text-green-100 hover:text-white transition-colors"
                >
                  Menu
                </Link>
                <span className="text-green-400">•</span>
                <Link
                  to="/contact"
                  className="text-sm text-green-100 hover:text-white transition-colors"
                >
                  Contact
                </Link>
                <span className="text-green-400">•</span>
                <Link
                  to="/localisation"
                  className="text-sm text-green-100 hover:text-white transition-colors"
                >
                  Localisation
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-500 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {currentYear} Restaurant Okla. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
