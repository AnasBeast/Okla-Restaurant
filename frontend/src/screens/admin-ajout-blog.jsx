import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loadingscreen from './Loadingscreen';
import Axios from "axios"

export default function AdminAjouterBlog() {
  const [isLoading,setIsLoading] = useState(true)
  const navigate=useNavigate();
  const token = localStorage.getItem("accessToken")
  const [ajouter,setAjouter] = useState("Ajouter")

  useEffect(() => {
    // Simulate an API call
    const loginUser = async()=>{
      try {
        const { data } = await Axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/checkuser`,{
          token:token
        });
        console.log(data)
      }catch (err) {
        console.log("error", err)
        navigate('/login');
      }
    }
    loginUser();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loadingscreen />;
  }
  const handleSumbit=async(e)=>{
    e.preventDefault();
    const image = document.getElementById("product-img").value
    setAjouter("Loading...")

    await Axios.post(`${process.env.REACT_APP_DOMAIN}/api/blogs`,{
      image,
      token
    })
    .then(({data})=>{
      console.log(data.message)
      alert(data.message)
      navigate('/admin')
      setAjouter("Ajouter")
    })
    .catch((err)=>{
      console.log(err)
      alert(err)
      setAjouter("Ajouter")
    })


  }
  return (
    <div>
      <section class=" sm:px-6 lg:px-8 mt-12">
      <div class="px-4 sm:px-0 mb-4 flex justify-between items-center">
        <h2 class="text-sm md:text-xl font-medium text-gray-900">Ajouter Produit</h2>
       
      </div>
      <form class="flex h-full flex-col divide-y divide-gray-200 bg-white" action="#">
        <div class="h-0 flex-1 overflow-y-auto">
          <div class="bg-gray-700 py-6 px-4 sm:px-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium text-white" id="headlessui-dialog-title-:rk:" data-headlessui-state="open">
                Nouveau Porduit
              </h2>
            </div>
            <div class="mt-1">
              <p class="text-sm text-gray-300">
              Commencez par remplir les informations ci-dessous pour
              ajoutez le nouvel produit.
              </p>
            </div>
          </div>
          <div class="flex flex-1 flex-col justify-between">
            <div class="divide-y divide-gray-200 px-4 sm:px-6">
              <div class="space-y-6 pt-6 pb-5">
                <div>
                  <label for="product-img" class="block text-sm font-medium text-gray-900">Lien de l'image du Produit</label>
                  <div class="mt-1">
                    <input type="text" name="product-img" id="product-img"
                      class="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required 
                      placeholder="https://imgur.com/myfr9j5.jpg"
                      />
                  </div>
                </div>
              </div>
              </div>
          </div>
        </div>
        <div class="flex flex-shrink-0 justify-end px-4 py-4">
          <a>
            <button id="cancel-btn" type="button"
            onClick={()=>navigate("/admin")}
            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Annuler
            </button>
          </a>
         
          <button type="submit"
            id="add-productbtn"
            onClick={handleSumbit}
            class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {ajouter}
          </button>
        </div>
      </form>
    </section>
    </div>
  )
}
