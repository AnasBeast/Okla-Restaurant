import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loadingscreen from './Loadingscreen';
import Axios from "axios"

export default function AdminAjouterProduit() {
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
        setIsLoading(false);
      }catch (err) {
        console.log("error", err)
        navigate('/login');
      }
    }
    loginUser();
    
  }, []);

  if (isLoading) {
    return <Loadingscreen />;
  }
  const handleSumbit=async(e)=>{
    e.preventDefault();
    const title = document.getElementById("product-name").value
    const description = document.getElementById("description").value
    const type = document.getElementById("types").value
    const bannerImg = document.getElementById("product-img").value
    const promo = document.getElementById("promo").checked
    setAjouter("Loading...")

    await Axios.post(`${process.env.REACT_APP_DOMAIN}/api/product`,{
      title,
      description,
      bannerImg,
      type,
      promo,
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
                  <label for="product-name" class="block text-sm font-medium text-gray-900">Nom du Produit</label>
                  <div class="mt-1">
                    <input type="text" name="product-name" id="product-name"
                      class="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required="" 
                      placeholder="Burger régulier"
                      />
                  </div>
                </div>
                <div>
                  <label for="description" class="block text-sm font-medium text-gray-900">Description du produit</label>
                  <div class="mt-1">
                    <input type="text" name="description" id="description"
                      class="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                      placeholder=""
                      />
                  </div>
                </div>
                <div>
                  <label for="type" class="block text-sm font-medium text-gray-900">Type de produit</label>
                  <div class="mt-1">

                      <select id="types" class="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                        <option value="burger">Burger</option>
                        <option value="pizza">Pizza</option>
                        <option value="poutine">Poutine</option>
                        <option value="sandwich">Sandwich</option>
                        <option value="assiette">Assiette</option>
                        <option value="barquette">Barquette</option>
                        <option value="café">café</option>
                        <option value="crémerie">crémerie</option>
                        <option value="pâtisserie">pâtisserie</option>

                      </select>
                  </div>
                </div>
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
                <div className='flex items-center gap-8'>
                  <label for="promo">Promo</label>

                  <input type="checkbox" id="promo" name="promo" value="promo" />
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
