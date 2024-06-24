import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryImages from '../components/Gallery';
import { Link } from 'react-router-dom';

export default function Acceuil() {
    const [isLoading,setIsLoading] = useState(true)
    document.title = 'Restaurant Okla | Acceuil';
    useEffect(() => {
        // Simulate an API call
        
        setIsLoading(false);
        
      }, []);
      if (isLoading) {
        return <Loadingscreen />;
    }
    
  return (
    <>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-20'>
        
        <Link to="/menu">
          <GalleryImages/>
        </Link>
      </div>
      <Footer/>
    </>
    
  )
}
