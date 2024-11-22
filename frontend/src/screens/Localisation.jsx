import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Localisation() {
    const [isLoading,setIsLoading] = useState(true)
    const [isMapLoaded, setIsMapLoaded] = useState(false)
    document.title = 'Restaurant Okla | Localisation';

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsMapLoaded(true)
      }, 2000) // Simulate a 2-second loading time
  
      return () => clearTimeout(timer)
    }, [])
    useEffect(() => {
        // Simulate an API call
        
        setIsLoading(false);
        
      }, []);
      if (isLoading) {
        return <Loadingscreen />;
    }
    
  return (
    <div className='bg-green-50'>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10 md:my-20'>
        < h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Localisation
        </h1>
        <div className='aspect-video relative'>
          {!isMapLoaded &&
          <div className='w-100 h-[700px] absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md'>
          </div>}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.787602556296!2d-71.18331668759187!3d46.808489642628196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb895bc3065b769%3A0xe318d05e8b004093!2s70%20Av.%20B%C3%A9gin%2C%20L%C3%A9vis%2C%20QC%20G6V%204C5%2C%20Canada!5e0!3m2!1sen!2stn!4v1719059603528!5m2!1sen!2stn" width="100%" height="700" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      
        </div>
      </div>
      <Footer/>
    </div>
    
  )
}
