import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Loadingscreen from './Loadingscreen';
import { useNavigate } from 'react-router-dom';




export default function AdminProducts() {
    const [isLoading,setIsLoading] = useState(true)
    const [products,setProducts] = useState([])
    const token = localStorage.getItem("accessToken")

    const [pizzas,setPizzas] = useState([])
    const [burgers,setBurgers] = useState([])
    const [poutines,setPoutines] = useState([])
    const [sandwichs,setSandwichs] = useState([])
    const [assiettes,setAssiettes] = useState([])
    const [barquettes,setBarquettes] = useState([])
    const [cafes,setCafe] = useState([])
    const [cremeries,setCremerie] = useState([])
    const [patisseries,setPatisserie] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        // Simulate an API call
        const loginUser = async()=>{
            try {
              const { data } = await Axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/checkuser`,{
                token:token
              });
              
            }catch (err) {
              console.log("error", err)
              navigate('/login');
            }
        }
        loginUser();

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
        return <Loadingscreen />;
    }
    
    const editUser = async(e)=>{
        e.preventDefault();
        const id = e.target.id;
        navigate(`/admin/modifier-product/${id}`)
    }

    const deleteUser = async(e)=>{
        e.preventDefault();
        const id = e.target.id;
        try {
            const { data } = await Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/product/${id}?token=${token}`)
            console.log(data)
            alert(data.message)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    const MenuCategory = ({category})=>{
        return(
            <li class="mb-4">
                        <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0 shadow-md border hover:shadow-lg">
                            <div class="flex min-w-0 flex-1 items-center px-4 flex-col justify-center md:flex-row gap-4 md:gap-0">
                                <div class="flex-shrink-0 w-full md:w-auto"><img class="h-3/4 w-full md:h-12 md:w-24 rounded group-hover:opacity-75" 
                                    src={category.bannerImg} alt="produit"/>
                                </div>
                                <div class="min-w-0 flex-1 px-4 flex flex-col md:grid md:grid-cols-4 md:items-center gap-2 md:gap-4">
                                    <div>
                                    <p class="md:truncate text-sm font-medium text-purple-600">{category.title}</p>
                                    <p class="mt-2 flex items-center text-sm text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>
                                        <h2 className='font-bold'>TYPE : </h2>
                                        <span class="md:truncate">{category.type}</span></p>
                                    </div>
                                    <div class=" md:block col-span-1 col-start-4">
                                        <div className='flex gap-2'>
                                            <button type="button" 
                                                id={category._id}
                                                onClick={editUser}
                                                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                
                                                Modifier
                                            </button>
                                            <button type="button" 
                                                id={category._id}
                                                onClick={deleteUser}
                                                class="inline-flex items-center rounded-md border border-gray-300 bg-red-600 text-white px-3 py-2 text-sm font-medium leading-4 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
        )
    }
  return (
    <div>
        <section class="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-12">
            <div class="px-4 sm:px-0 mb-4 flex justify-between items-center">
                <h2 class="text-sm md:text-xl font-medium text-gray-900" id="produits">Produits<span id='count'></span> </h2>

                <a>
                    <button
                    id="ajouter-blog"
                    type="button"
                    onClick={()=>navigate("/admin/ajouter-produit")}
                    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ajouter nouveau produit
                    </button>
                </a>

            </div>
            <ul
                class="mt-5 px-4 divide-y divide-gray-200 border-gray-200 sm:mt-0 sm:border-t-0"
                id="list"
            >
                {burgers.map((burger)=>(
                    <MenuCategory category={burger}/>
                ))}
                {pizzas.map((pizza)=>(
                    <MenuCategory category={pizza}/>
                ))}
                {poutines.map((poutine)=>(
                    <MenuCategory category={poutine}/>
                ))}
                {sandwichs.map((sandwich)=>(
                    <MenuCategory category={sandwich}/>
                ))}
                {assiettes.map((assiette)=>(
                    <MenuCategory category={assiette}/>
                ))}
                {barquettes.map((barquette)=>(
                    <MenuCategory category={barquette}/>
                ))}
                {cafes.map((cafe)=>(
                    <MenuCategory category={cafe}/>
                ))}
                {cremeries.map((cremerie)=>(
                    <MenuCategory category={cremerie}/>
                ))}
                {patisseries.map((patisserie)=>(
                    <MenuCategory category={patisserie}/>
                ))}
                
            </ul>
        </section>
    </div>
  )
}
