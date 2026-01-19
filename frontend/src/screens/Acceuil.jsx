import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  ChevronRight,
  Star,
  Clock,
  Phone,
  Utensils,
  MapPin,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, GlassCard } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

const floatingFoods = [
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
];

const features = [
  {
    icon: Star,
    title: "Cuisine Exceptionnelle",
    description:
      "Des plats préparés avec passion et des ingrédients de première qualité.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Clock,
    title: "Horaires Flexibles",
    description:
      "Ouvert 7j/7 pour vous accueillir dans les meilleures conditions.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Réservation Facile",
    description: "Réservez votre table en quelques clics ou par téléphone.",
    color: "from-green-500 to-emerald-500",
  },
];

const testimonials = [
  {
    name: "Karim L.",
    comment:
      "Delicious filled baguette and homemade fries at reasonable prices. Très délicieux!",
    rating: 5,
  },
  {
    name: "Rana D.",
    comment:
      "Okla est un restaurant unique de cuisine méditerranéenne-tunisienne. Les propriétaires sont exceptionnellement gentils. La nourriture est vraiment faite maison et délicieuse!",
    rating: 5,
  },
  {
    name: "David G.",
    comment:
      "Au bas de la rue Bégin, une superbe découverte! Tout est frais, fabriqué sur place! La baguette farcie tunisienne est incroyable. À découvrir sans hésiter!",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Acceuil() {
  document.title = "Restaurant Okla | Accueil";
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen relative overflow-hidden">
      {/* Floating Food Background */}
      {floatingFoods.map((food, index) => (
        <motion.img
          key={index}
          src={food.src}
          alt={food.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: index * 0.2 }}
          className="floating-food"
          style={{
            top: food.top,
            left: food.left,
            right: food.right,
            bottom: food.bottom,
            width: "100px",
          }}
        />
      ))}

      <div className="relative z-10">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="relative pt-8 pb-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge variant="success" className="mb-4 px-4 py-1.5">
                      <Utensils className="w-4 h-4 mr-2" />
                      Cuisine Tunisienne & Méditerranéenne
                    </Badge>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  >
                    Bienvenue chez{" "}
                    <span className="text-gradient">Restaurant Okla</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-gray-600 leading-relaxed max-w-xl"
                  >
                    Découvrez une expérience culinaire unique avec nos plats
                    savoureux et notre ambiance chaleureuse. Notre cuisine
                    authentique vous transportera dans un voyage gustatif
                    inoubliable.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4 relative z-20"
                  >
                    <Link to="/contact">
                      <Button size="lg" variant="gradient" className="gap-2">
                        Réserver une table
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/menu">
                      <Button size="lg" variant="outline" className="gap-2">
                        Voir le menu
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Quick Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-6 pt-4"
                  >
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span>Lévis, Québec</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-green-600" />
                      <span>11h30 - 19h</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ y }}
                  className="relative hidden lg:block"
                >
                  <div className="relative">
                    {/* Decorative Elements */}
                    <div className="absolute -top-8 -right-8 w-72 h-72 bg-green-200 rounded-full opacity-50 blur-3xl" />
                    <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-amber-200 rounded-full opacity-50 blur-3xl" />

                    <GlassCard className="p-2 relative">
                      <img
                        src="https://cloudkitchens.com/_gatsby/file/b1353b19906a1722db41a01f47b70b30/Fast-Food.jpeg"
                        alt="Restaurant Okla"
                        className="rounded-xl w-full h-auto shadow-xl"
                      />
                    </GlassCard>

                    {/* Floating Badge */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -bottom-4 -left-4"
                    >
                      <GlassCard className="p-4 flex items-center gap-3">
                        <div className="flex -space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-800">
                          5.0 sur Google
                        </span>
                      </GlassCard>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white relative">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge variant="secondary" className="mb-4">
                  Pourquoi nous choisir
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Une expérience unique
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-3 gap-8"
              >
                {features.map((feature, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full hover-lift card-glow border-0 shadow-soft">
                      <CardContent className="p-8 text-center">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={cn(
                            "w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br",
                            feature.color,
                          )}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500" />

            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge variant="secondary" className="mb-4">
                  Témoignages
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ce que nos clients disent
                </h2>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full hover-lift border-0 shadow-soft">
                      <CardContent className="p-6">
                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                          "{testimonial.comment}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {testimonial.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="container mx-auto px-4"
            >
              <div className="relative bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-16 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Prêt à découvrir nos saveurs?
                  </h2>
                  <p className="text-green-100 text-lg mb-8">
                    Rejoignez-nous pour une expérience culinaire inoubliable.
                    Réservez votre table dès maintenant!
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact">
                      <Button
                        size="lg"
                        className="bg-white text-green-600 hover:bg-green-50 gap-2"
                      >
                        Réserver maintenant
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/menu">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white/10"
                      >
                        Explorer le menu
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
