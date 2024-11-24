
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
let newDate = new Date()

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Restaurant Okla</h3>
            <p className="text-green-100">
              Une expérience culinaire unique dans un cadre chaleureux et accueillant.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 text-green-100">
              <li>Lundi - Dimanche: 11h:30 - 19h</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-green-100">
              <li>70 Av. Bégin, Lévis, QC G6V 4C5, Canada</li>
              <li>RR59+9P Levis, Quebec, Canada</li>
              <li> <a href="tel:+14188333592">Tél: +14188333592</a> </li>
              <li> <a href="mailto:restokla2024@gmail.com">Email: restokla2024@gmail.com</a> </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-green-200 transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-green-200 transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-green-200 transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-green-500 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {newDate.getFullYear()} Restaurant Okla. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

