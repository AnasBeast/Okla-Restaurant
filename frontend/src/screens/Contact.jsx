import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, GlassCard } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input, Textarea, Label } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { useDocumentTitle } from "../hooks";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "70 avenue Bégin, Lévis G6V5C4",
    href: "https://maps.google.com/?q=70+Av.+Bégin,+Lévis,+QC",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+1 581 882 7878",
    href: "tel:+15818827878",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Email",
    content: "restokla2024@gmail.com",
    href: "mailto:restokla2024@gmail.com",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun - Dim: 11h30 - 19h",
    href: null,
    color: "from-amber-500 to-orange-500",
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/15818827878", label: "WhatsApp" },
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

export default function Contact() {
  useDocumentTitle("Contact");

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen">
      <Navbar />

      <main className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Nous sommes à votre écoute
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contactez-<span className="text-gradient">Nous</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une question, une réservation ou simplement envie de nous dire
              bonjour? N'hésitez pas à nous contacter!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-soft-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
                  <h2 className="text-xl font-semibold text-white">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    Nous vous répondrons dans les plus brefs délais
                  </p>
                </div>
                <CardContent className="p-6">
                  <form
                    action="https://formsubmit.co/restokla2024@gmail.com"
                    method="POST"
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Sujet de votre message"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Votre message..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="gradient"
                      className="w-full gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full border-0 shadow-soft hover-lift">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${info.color} flex-shrink-0`}
                          >
                            <info.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {info.title}
                            </h3>
                            {info.href ? (
                              <a
                                href={info.href}
                                target={
                                  info.href.startsWith("http")
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  info.href.startsWith("http")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="text-gray-600 hover:text-green-600 transition-colors text-sm"
                              >
                                {info.content}
                              </a>
                            ) : (
                              <p className="text-gray-600 text-sm">
                                {info.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Suivez-nous sur les réseaux
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-gray-100 rounded-xl hover:bg-green-100 hover:text-green-600 transition-colors"
                          aria-label={social.label}
                        >
                          <social.icon className="w-6 h-6" />
                        </motion.a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map Preview */}
              <motion.div variants={itemVariants}>
                <GlassCard className="overflow-hidden">
                  <div className="aspect-video relative">
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
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
