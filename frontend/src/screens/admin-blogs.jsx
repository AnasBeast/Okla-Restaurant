import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Loadingscreen from './Loadingscreen';
import { useNavigate } from 'react-router-dom';

export default function AdminBlogs() {
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
           const { data } = await Axios.get(`${process.env.REACT_APP_DOMAIN}/api/blogs`);
           setProducts(data.blogs)
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
        navigate(`/admin/modifier-blog/${id}`)
    }

    const deleteUser = async(e)=>{
        e.preventDefault();
        const id = e.target.id;
        try {
            const { data } = await Axios.delete(`${process.env.REACT_APP_DOMAIN}/api/blogs/${id}?token=${token}`)
            console.log(data)
            alert(data.message)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <section class="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-12">
            <div class="px-4 sm:px-0 mb-4 flex justify-between items-center">
                <h2 class="text-sm md:text-xl font-medium text-gray-900" id="produits">Blogs<span id='count'></span> </h2>

                <a>
                    <button
                    id="ajouter-blog"
                    type="button"
                    onClick={()=>navigate("/admin/ajouter-blog")}
                    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ajouter nouveau blog
                    </button>
                </a>

            </div>
            <ul
                class="mt-5 px-4 divide-y divide-gray-200 border-gray-200 sm:mt-0 sm:border-t-0"
                id="list"
            >
                {products.map((product)=>(
                    <li class="mb-4">
                    <div class="flex items-center py-5 px-4 sm:py-6 sm:px-0 shadow-md border hover:shadow-lg">
                        <div class="flex min-w-0 flex-1 items-center px-4 flex-col justify-center md:flex-row gap-4 md:gap-0">
                            <div class="flex-shrink-0 w-full md:w-auto"><img class="h-3/4 w-full md:h-12 md:w-24 rounded group-hover:opacity-75" 
                                src={product.image} alt="produit"/>
                            </div>
                            <div class="min-w-0 flex-1 px-4 flex flex-col md:grid md:grid-cols-4 md:items-center gap-2 md:gap-4">
                                
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
            </ul>
        </section>
    </div>
  )
}
