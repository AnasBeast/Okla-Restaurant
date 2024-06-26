import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from "../styles.css"

export default function Menu() {
    const [isLoading,setIsLoading] = useState(true)
    const [products,setProducts] = useState([])
    const [pizzas,setPizzas] = useState([])
    const [burgers,setBurgers] = useState([])
    const [poutines,setPoutines] = useState([])
    const [sandwichs,setSandwichs] = useState([])
    const [assiettes,setAssiettes] = useState([])
    const [barquettes,setBarquettes] = useState([])
    const [cafes,setCafe] = useState([])
    const [cremeries,setCremerie] = useState([])
    const [patisseries,setPatisserie] = useState([])
    document.title = 'Restaurant Okla | Menu';
    useEffect(() => {
        // Simulate an API call
        const fetchData = async () => {
          try {
           const { data } = await Axios.get(`${process.env.REACT_APP_DOMAIN}/api/product`);
           setProducts(data.products)
           setPizzas(data.products.filter((product)=>product.type==="pizza"))
           setBurgers(data.products.filter((product)=>product.type==="burger"))
           setPoutines(data.products.filter((product)=>product.type==="poutine"))
           setSandwichs(data.products.filter((product)=>product.type==="sandwich"))
           setAssiettes(data.products.filter((product)=>product.type==="assiette"))
           setBarquettes(data.products.filter((product)=>product.type==="barquette"))
           setCafe(data.products.filter((product)=>product.type==="cafe"))
           setCremerie(data.products.filter((product)=>product.type==="cremerie"))
           setPatisserie(data.products.filter((product)=>product.type==="patisserie"))
           setIsLoading(false);
          }catch (err) {
            console.log("error", err)
          }
        };
        fetchData();
        
        
      }, []);
      if (isLoading) {
        return (
          <>
            <Navbar/>
            <Loadingscreen />
            <Footer/>
          </>
        );
      }

  return (
    <>
    <Navbar/>
    <div className='md:max-w-7xl mx-auto my-8 md:my-20 flex flex-col gap-8 md:gap-20'>
      <div className='hidden md:grid w-11/12 mx-auto  grid-cols-6 bg-green-600 border-green-600 border-2 text-center'>
        <div>
          <a href="#burgers">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full'>
              BURGER OKLA
            </button>
          </a>
        </div>
        <div>
          <a href="#pizzas">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full'>
              MINI PIZZA 6PO
            </button>
          </a>
        </div>
        <div>
          <a href="#poutines">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full'>
              POUTINE OKLA
            </button>
          </a>
        </div>
        <div>
          <a href="#sandwichs">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full'>
              SANDWICH OKLA
            </button>
          </a> 
        </div>
        <div>
          <a href="#assiettes">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full'>
              LES ASSIETTES
            </button>
          </a>
        </div>
        <div>
          <a href="#barquettes">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full h-full'>
              BARQUETTES PATATES
            </button>
          </a>
        </div>
      </div>
      

      <div className='flex flex-col bg-gray-50 items-center md:hidden py-4'>
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
          Menu Okla
        </h1>
        <div className='w-full overflow-auto'>
          <ul className='flex gap-4 w-max px-4'>
            <li><a href='#burgers'>Burger Okla</a></li>
            <li><a href='#pizzas'>MINI PIZZA 6PO</a></li>
            <li><a href='#poutines'>POUTINE OKLA</a></li>
            <li><a href='#sandwichs'>SANDWICH OKLA</a></li>
            <li><a href='#assiettes'>LES ASSIETTES</a></li>
            <li><a href='#barquettes'>BARQUETTES PATATES</a></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-20 bg-gray-100 py-10 px-2 md:w-11/12 mx-auto md:p-0 md:bg-white max-w-full">
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='burgers'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Burgers
          </h1>
          {/* Burgers */}
          {burgers.map((burger)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-2 md:gap-4'>
              <div>
                {burger.promo &&
                <img 
                src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                alt="promo" 
                className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="burger"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:w-full md:h-80 rounded-md hover:cursor-pointer'
                  src={burger.bannerImg}
                />
              </div>
              <div className='flex flex-col gap-2 max-w-max'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{burger.title}</h1>
                <p className='text-lg line-clamp-3'> {burger.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='pizzas'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Pizzas
          </h1>
          {/* Pizzas */}
          {pizzas.map((pizza)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {pizza.promo &&
                <img 
                src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                alt="promo" 
                className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="pizza"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={pizza.bannerImg}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{pizza.title}</h1>
                <p className='text-lg line-clamp-3'> {pizza.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='poutines'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Poutines
          </h1>
          {/* Poutines */}
          {poutines.map((poutine)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {poutine.promo &&
                <img 
                src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                alt="promo" 
                className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="poutine"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={poutine.bannerImg}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{poutine.title}</h1>
                <p className='text-lg line-clamp-3'> {poutine.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='sandwichs'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Sandwichs
          </h1>
          {/* Sandwichs */}
          {sandwichs.map((sandwich)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {sandwich.promo &&
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                  alt="promo" 
                  className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="sandwich"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={sandwich.bannerImg}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{sandwich.title}</h1>
                <p className='text-lg line-clamp-3'> {sandwich.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='assiettes'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Assiettes
          </h1>
          {/* Assiettes */}
          {assiettes.map((assiette)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {assiette.promo &&
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                  alt="promo" 
                  className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="assiette"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={assiette.bannerImg}
                />
              </div>
              
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{assiette.title}</h1>
                <p className='text-lg line-clamp-3'> {assiette.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Barquettes
          </h1>
          {/* Barquettes */}
          {barquettes.map((barquette)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {barquette.promo &&
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                  alt="promo" 
                  className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="barquette"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={barquette.bannerImg}
                />
              </div>
              
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{barquette.title}</h1>
                <p className='text-lg line-clamp-3'> {barquette.description}</p>
              </div>
            </div>
          ))}
        </section>
        {cafes.length!==0 && <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            café
          </h1>
          {/* Cafe */}
          {cafes.map((cafe)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {cafe.promo &&
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                  alt="promo" 
                  className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="cafe"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={cafe.bannerImg}
                />
              </div>
              
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{cafe.title}</h1>
                <p className='text-lg line-clamp-3'> {cafe.description}</p>
              </div>
            </div>
          ))}
        </section>}
        {cremeries.length!==0 && <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Crémerie
          </h1>
          {/* Crémerie */}
          {cremeries.map((cremerie)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {cremerie.promo &&
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                  alt="promo" 
                  className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="cremerie"
                  effect="blur"
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={cremerie.bannerImg}
                />
              </div>
              
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{cremerie.title}</h1>
                <p className='text-lg line-clamp-3'> {cremerie.description}</p>
              </div>
            </div>
          ))}
        </section>}
        {patisseries.length!==0 &&<section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-3xl md:text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Pâtisserie
          </h1>
          {/* Pâtisserie */}
          {patisseries.map((patisserie)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <div>
                {patisserie.promo &&
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/010/176/890/non_2x/promo-element-marketing-strategy-label-with-red-color-background-free-png.png" 
                  alt="promo" 
                  className='absolute z-10 w-24 md:w-48'
                />}
                <LazyLoadImage
                  alt="patisserie"
                  effect="blur"
                  id='burger'
                  wrapperProps={{
                      // If you need to, you can tweak the effect transition using the wrapper style.
                      style: {transitionDelay: "0.5s"},
                  }}
                  className='h-[120px] md:h-80 rounded-md hover:cursor-pointer'
                  src={patisserie.bannerImg}
                />
              </div>
              
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl text-green-700'>{patisserie.title}</h1>
                <p className='text-lg line-clamp-3'> {patisserie.description}</p>
              </div>
            </div>
          ))}
        </section>}
      </div>
    </div>
    <Footer/>
    </>
  )
}
