import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronRight, Star, Clock, Phone } from 'lucide-react';
import '../animations.css';

const floatingFoods = [
  { src: "/assets/burger-outline.png", alt: "Burger", top: "10%", left: "5%" },
  { src: "/assets/pizza-outline.png", alt: "Pizza", top: "30%", right: "10%" },
  { src: "/assets/poutine-outline.png", alt: "Poutine", bottom: "20%", left: "15%" },
  { src: "/assets/sandwich-outline.png", alt: "Sandwich", top: "15%", right: "20%" },
  { src: "/assets/burger-outline.png", alt: "Burger", bottom: "10%", right: "25%" },
  { src: "/assets/pizza-outline.png", alt: "Pizza", bottom: "30%", left: "40%" },
  { src: "/assets/poutine-outline.png", alt: "Poutine", top: "20%", right: "35%" },
];

export default function Acceuil() {
  document.title = 'Restaurant Okla | Accueil';

  return (
    <div className='bg-green-50 min-h-screen relative overflow-hidden'>
      {floatingFoods.map((food, index) => (
        <img
          key={index}
          src={food.src}
          alt={food.alt}
          className="floating-food"
          style={{
            top: food.top,
            left: food.left,
            right: food.right,
            bottom: food.bottom,
            width: '130px',  // Set a fixed width
            height: 'auto',  // Maintain aspect ratio
          }}
        />
      ))}
      <div className='relative z-10'>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-20 relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
                  Bienvenue chez Restaurant Okla
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Découvrez une expérience culinaire unique avec nos plats savoureux et notre ambiance chaleureuse. Notre cuisine authentique vous transportera dans un voyage gustatif inoubliable.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition duration-300 inline-flex items-center">
                    Réserver une table
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link to="/menu" className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-full transition duration-300">
                    Voir le menu
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="https://cloudkitchens.com/_gatsby/file/b1353b19906a1722db41a01f47b70b30/Fast-Food.jpeg?u=https%3A%2F%2Fcloudkitchblog.wpenginepowered.com%2Fwp-content%2Fuploads%2FFast-Food.jpeg"
                  alt="Restaurant Okla"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-green-100">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <Star className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cuisine Exceptionnelle</h3>
                <p className="text-gray-600">Des plats préparés avec passion et des ingrédients de première qualité.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <Clock className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Horaires Flexibles</h3>
                <p className="text-gray-600">Ouvert 7j/7 pour vous accueillir dans les meilleures conditions.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <Phone className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Réservation Facile</h3>
                <p className="text-gray-600">Réservez votre table en quelques clics ou par téléphone.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Ce que nos clients disent</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Karim L.",
                  comment: "Delicious filled baguette and homemade fries at reasonable prices. Très delicieux!",
                  rating: 5
                },
                {
                  name: "Rana D.",
                  comment: "Okla est un restaurant unique de cuisine méditerranéenne-tunisienne et internationale à Lévis, Québec. Les propriétaires sont exceptionnellement gentils et orientés client. La nourriture est vraiment faite maison, authentique et délicieuse. L'établissement est très propre, confortable et dégage un arôme appétissant.Je recommande vivement ce restaurant d'exception !",
                  rating: 5
                },
                {
                  name: "David G.",
                  comment: "Au bas de la rue Bégin, une superbe découverte! Tout est frais, fabriqué sur place ! La baguette farcie tunisienne est incroyable. Les frites sont fraîches et faites maison, cuites à la commande et servies avec des épices. A découvrir sans hésiter c'était vraiment excellent. J'ai mangé sur la terrasse extérieure.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">&quot;{testimonial.comment}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      </div>
      
    </div>
  );
}

