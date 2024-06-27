import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryImages from '../components/Gallery';
import { Link } from 'react-router-dom';

export default function Acceuil() {
  document.title = 'Restaurant Okla | Acceuil';

  return (
    <>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10 md:my-20'>
        
        <Link to="/menu">
          <GalleryImages/>
        </Link>
      </div>
      <Footer/>
    </>
    
  )
}
