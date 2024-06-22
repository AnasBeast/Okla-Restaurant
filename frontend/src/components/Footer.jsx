import React from 'react'
let newDate = new Date()

export default function Footer() {
  return (
    <div>  
        <div class=" bg-green-700 mt-auto">
            <div class="max-w-2xl mx-auto text-white py-10">
                <div class="text-center">
                    <h3 class="text-3xl mb-3"> Restaurant Okla</h3>
                    <img src="/assets/logo.png" alt="logo" className='w-60 mx-auto'/>
                    <p> Savourez l'excellence à chaque bouchée. </p>
                </div>
                <div class="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-white">
                    <p class="order-2 md:order-1 mt-8 md:mt-0"> &copy; Restaurant Okla, {newDate.getFullYear()} </p>
                    <div class="order-1 md:order-2">
                        <span class="px-2">À Propos</span>
                        <span class="px-2 border-l">Contactez-nous</span>
                        <span class="px-2 border-l">Politique de confidentialité</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
