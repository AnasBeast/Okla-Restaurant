import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useHref } from 'react-router-dom';

export default function Menu() {
    const [isLoading,setIsLoading] = useState(true)
    const [products,setProducts] = useState([])
    const [pizzas,setPizzas] = useState([])
    const [burgers,setBurgers] = useState([])
    const [poutines,setPoutines] = useState([])
    const [sandwichs,setSandwichs] = useState([])
    const [assiettes,setAssiettes] = useState([])
    const [barquettes,setBarquettes] = useState([])
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

          }catch (err) {
            console.log("error", err)
          }
        };
        fetchData();
        setIsLoading(false);
        
      }, []);
      if (isLoading) {
        return <Loadingscreen />;
    }

  return (
    <>
    <Navbar/>
    <div className='max-w-7xl mx-auto my-20 flex flex-col gap-20'>
      <div className='w-11/12 mx-auto grid grid-cols-6 bg-green-600 border-green-600 border-2 text-center'>
        <div>
          <a href="#burgers">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full'>
              BURGER OKLA
            </button>
          </a>
        </div>
        <div>
          <a href="#pizzas">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full'>
              MINI PIZZA 6PO
            </button>
          </a>
        </div>
        <div>
          <a href="#poutines">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full'>
              POUTINE OKLA
            </button>
          </a>
        </div>
        <div>
          <a href="#sandwichs">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full'>
              SANDWICH OKLA
            </button>
          </a> 
        </div>
        <div>
          <a href="#assiettes">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full'>
              LES ASSIETTES
            </button>
          </a>
        </div>
        <div>
          <a href="#barquettes">
            <button className='text-white text-lg font-medium hover:bg-white hover:text-green-600 py-20 w-full'>
              BARQUETTES PATATES
            </button>
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-20">
        <section className='grid grid-cols-3 gap-4' id='burgers'>
          {/* Burgers */}
          {burgers.map((burger)=>(
            <div className='flex flex-col gap-4'>
              <img src={burger.bannerImg} alt="burger" className='w-auto h-64 hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{burger.title}</h1>
                <p> {burger.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='grid grid-cols-3 gap-4' id='pizzas'>
          {/* Pizzas */}
          {pizzas.map((pizza)=>(
            <div className='flex flex-col gap-4'>
              <img src={pizza.bannerImg} alt="pizza" className='w-auto h-64 hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{pizza.title}</h1>
                <p> {pizza.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='grid grid-cols-3 gap-4' id='poutines'>
          {/* Poutines */}
          {poutines.map((poutine)=>(
            <div className='flex flex-col gap-4'>
              <img src={poutine.bannerImg} alt="poutine" className='w-auto h-64 hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{poutine.title}</h1>
                <p> {poutine.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='grid grid-cols-3 gap-4' id='sandwichs'>
          {/* Sandwichs */}
          {sandwichs.map((sandwich)=>(
            <div className='flex flex-col gap-4'>
              <img src={sandwich.bannerImg} alt="sandwich" className='w-auto h-64 hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{sandwich.title}</h1>
                <p> {sandwich.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='grid grid-cols-3 gap-4' id='assiettes'>
          {/* Assiettes */}
          {assiettes.map((assiette)=>(
            <div className='flex flex-col gap-4'>
              <img src={assiette.bannerImg} alt="assiette" className='w-auto h-64 hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{assiette.title}</h1>
                <p> {assiette.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='grid grid-cols-3 gap-4' id='barquettes'>
          {/* Barquettes */}
          {barquettes.map((barquette)=>(
            <div className='flex flex-col gap-4'>
              <img src={barquette.bannerImg} alt="barquette" className='w-auto h-64 hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{barquette.title}</h1>
                <p> {barquette.description}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
    <Footer/>
    </>
  )
}
