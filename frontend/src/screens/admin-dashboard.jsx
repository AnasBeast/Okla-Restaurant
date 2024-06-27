import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Loadingscreen from './Loadingscreen';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [isLoading,setIsLoading] = useState(true)
    const [products,setProducts] = useState([])
    const token = localStorage.getItem("accessToken")

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
    

  return (
    <div>
        <section class="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-12">
            <div class="px-4 sm:px-0 mb-4 flex flex-col gap-12 justify-between items-center">
                <h2 class="text-sm md:text-xl font-medium text-gray-900" id="produits">Admin<span id='count'></span> </h2>
                <a>
                    <button 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    type="button"
                    onClick={()=>navigate("/admin/produits")}
                    >
                        Produits de Menu
                    </button>
                    
                </a>
                <a>
                    <button 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    type="button"
                    onClick={()=>navigate("/admin/blogs")}
                    >
                        Acceuil
                    </button>
                </a>

            </div>
            {/* <ul
                class="mt-5 px-4 divide-y divide-gray-200 border-gray-200 sm:mt-0 sm:border-t-0"
                id="list"
            >
                {products.map((product)=>(
                    <li class="mb-4">
                    <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0 shadow-md border hover:shadow-lg">
                        <div class="flex min-w-0 flex-1 items-center px-4 flex-col justify-center md:flex-row gap-4 md:gap-0">
                            <div class="flex-shrink-0 w-full md:w-auto"><img class="h-3/4 w-full md:h-12 md:w-24 rounded group-hover:opacity-75" 
                                src={product.bannerImg} alt="produit"/>
                            </div><div class="min-w-0 flex-1 px-4 flex flex-col md:grid md:grid-cols-4 md:items-center gap-2 md:gap-4">
                            <div>
                                <p class="md:truncate text-sm font-medium text-purple-600">{product.title}</p>
                                <p class="mt-2 flex items-center text-sm text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>
                                    <h2 className='font-bold'>TYPE : </h2>
                                    <span class="md:truncate">{product.type}</span></p>
                                </div>
                                <div class=" md:block col-span-1 col-start-4">
                                    <div className='flex gap-2'>
                                        <button type="button" 
                                            id={product._id}
                                            onClick={editUser}
                                            class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            
                                            Modifier
                                        </button>
                                        <button type="button" 
                                            id={product._id}
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
                ))}
            </ul> */}
        </section>
    </div>
  )
}
