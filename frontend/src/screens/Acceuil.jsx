import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryImages from '../components/Gallery';
import { Link } from 'react-router-dom';

export default function Acceuil() {
  document.title = 'Restaurant Okla | Acceuil';

  return (
    <div className='bg-green-50'>
      <Navbar/>
      <div className="container mx-auto px-4 py-8 my-32">
      <div className="grid md:grid-cols-2 gap-8">
        <div className='flex flex-col justify-between'>
          <h1 className="text-4xl font-bold text-green-800 mb-6">Bienvenue chez Restaurant Okla</h1>

          <div>
            <p className="text-lg mb-4">
              Découvrez une expérience culinaire unique avec nos plats savoureux et notre ambiance chaleureuse.
            </p>
            <Link to="/contact" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
              Réserver une table
            </Link>
          </div>
        </div>
        <div className="relative h-64 md:h-96">
          <img
            src="https://cloudkitchens.com/_gatsby/file/b1353b19906a1722db41a01f47b70b30/Fast-Food.jpeg?u=https%3A%2F%2Fcloudkitchblog.wpenginepowered.com%2Fwp-content%2Fuploads%2FFast-Food.jpeg"
            alt="Restaurant Okla"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
      <Footer/>
    </div>
    
  )
}
