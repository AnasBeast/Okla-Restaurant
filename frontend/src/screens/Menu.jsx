import React, { useEffect, useState } from 'react'
import Loadingscreen from './Loadingscreen';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slider from '../components/Slider';

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

          }catch (err) {
            console.log("error", err)
          }
        };
        fetchData();
        setIsLoading(false);
        
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
      <div className="flex flex-col gap-20 bg-gray-100 py-10 px-2 md:w-11/12 mx-auto md:p-0 md:bg-white">
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='burgers'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Burgers
          </h1>
          {/* Burgers */}
          {burgers.map((burger)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={burger.bannerImg} alt="burger" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{burger.title}</h1>
                <p> {burger.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='pizzas'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Pizzas
          </h1>
          {/* Pizzas */}
          {pizzas.map((pizza)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={pizza.bannerImg} alt="pizza" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{pizza.title}</h1>
                <p> {pizza.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='poutines'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Poutines
          </h1>
          {/* Poutines */}
          {poutines.map((poutine)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={poutine.bannerImg} alt="poutine" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{poutine.title}</h1>
                <p> {poutine.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='sandwichs'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Sandwichs
          </h1>
          {/* Sandwichs */}
          {sandwichs.map((sandwich)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={sandwich.bannerImg} alt="sandwich" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{sandwich.title}</h1>
                <p> {sandwich.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='assiettes'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Assiettes
          </h1>
          {/* Assiettes */}
          {assiettes.map((assiette)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={assiette.bannerImg} alt="assiette" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{assiette.title}</h1>
                <p> {assiette.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Barquettes
          </h1>
          {/* Barquettes */}
          {barquettes.map((barquette)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={barquette.bannerImg} alt="barquette" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{barquette.title}</h1>
                <p> {barquette.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            café
          </h1>
          {/* Cafe */}
          {cafes.map((cafe)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={cafe.bannerImg} alt="cafe" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{cafe.title}</h1>
                <p> {cafe.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Crémerie
          </h1>
          {/* Crémerie */}
          {cremeries.map((cremerie)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={cremerie.bannerImg} alt="cremerie" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{cremerie.title}</h1>
                <p> {cremerie.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className='flex flex-col md:grid grid-cols-3 gap-4' id='barquettes'>
          <h1 className="text-5xl font-bold title-font mb-4 text-gray-900 md:hidden">
            Pâtisserie
          </h1>
          {/* Pâtisserie */}
          {patisseries.map((patisserie)=>(
            <div className='flex items-center sm:items-stretch justify-items-center md:flex-col gap-4'>
              <img src={patisserie.bannerImg} alt="patisserie" className='w-[145px] h-[100px] md:h-80 md:w-auto rounded-md hover:cursor-pointer'/>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl text-green-700'>{patisserie.title}</h1>
                <p> {patisserie.description}</p>
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
