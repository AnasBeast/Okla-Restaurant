import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, GlassCard } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Car,
  Bus,
  ExternalLink,
} from "lucide-react";
import { useDocumentTitle } from "../hooks";

const locationDetails = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "70 Av. Bégin, Lévis, QC G6V 4C5, Canada",
    href: "https://maps.google.com/?q=70+Av.+Bégin,+Lévis,+QC",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Heures d'ouverture",
    content: "Lundi - Dimanche: 11h30 - 19h",
    href: null,
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+1 418 833-3592",
    href: "tel:+14188333592",
    color: "from-purple-500 to-pink-500",
  },
];

const transportOptions = [
  {
    icon: Car,
    title: "En voiture",
    description:
      "Stationnement gratuit disponible devant le restaurant et dans les rues avoisinantes.",
  },
  {
    icon: Bus,
    title: "Transport en commun",
    description:
      "Accessible par les lignes de bus RTC. Arrêt à proximité sur l'Avenue Bégin.",
  },
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

export default function Localisation() {
  useDocumentTitle("Localisation");

  const openInGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/dir//70+Av.+Bégin,+Lévis,+QC+G6V+4C5,+Canada",
      "_blank",
    );
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen">
      <Navbar />

      <main className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              Comment nous trouver
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Notre <span className="text-gradient">Localisation</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Situé au cœur de Lévis, notre restaurant vous accueille dans un
              cadre chaleureux et convivial.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <GlassCard className="overflow-hidden h-full">
                <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.787602556296!2d-71.18331668759187!3d46.808489642628196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb895bc3065b769%3A0xe318d05e8b004093!2s70%20Av.%20B%C3%A9gin%2C%20L%C3%A9vis%2C%20QC%20G6V%204C5%2C%20Canada!5e0!3m2!1sen!2stn!4v1719059603528!5m2!1sen!2stn"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: "absolute", inset: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Restaurant Okla Location"
                  />
                </div>
              </GlassCard>
            </motion.div>

            {/* Info Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Location Details */}
              {locationDetails.map((detail, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 shadow-soft hover-lift">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${detail.color} flex-shrink-0`}
                        >
                          <detail.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {detail.title}
                          </h3>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              target={
                                detail.href.startsWith("tel:")
                                  ? "_self"
                                  : "_blank"
                              }
                              rel="noopener noreferrer"
                              className="text-gray-600 text-sm hover:text-primary transition-colors hover:underline"
                            >
                              {detail.content}
                            </a>
                          ) : (
                            <p className="text-gray-600 text-sm">
                              {detail.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Get Directions Button */}
              <motion.div variants={itemVariants}>
                <Button
                  onClick={openInGoogleMaps}
                  size="lg"
                  variant="gradient"
                  className="w-full gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Obtenir l'itinéraire
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Transport Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Comment venir
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {transportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-soft hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-xl">
                          <option.icon className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
