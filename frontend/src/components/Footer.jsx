import React from 'react'
import { Link } from 'react-router-dom'
let newDate = new Date()

export default function Footer() {
  return (
    <div>  
        <div class=" bg-green-600 mt-auto">
            <div class="max-w-2xl mx-auto text-white py-10">
                <div class="text-center">
                    <h3 class="text-3xl mb-3"> Restaurant Okla</h3>
                    <Link to="/"><img src="/assets/logo.png" alt="logo" className='w-60 mx-auto'/></Link>
                    <p> Savourez l'excellence à chaque bouchée. </p>
                </div>
                <div class="mt-14 md:mt-20 flex flex-col md:flex-row md:justify-between items-center text-sm text-white">
                    <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Restaurant Okla, {newDate.getFullYear()} </p>
                    <div class="order-1 md:order-2">
                        <Link to="/localisation"><span class="px-2">À Propos</span></Link>
                        <Link to="/contact"><span class="px-2 border-l">Contactez-nous</span></Link>
                        <span class="px-2 border-l">Politique de confidentialité</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
