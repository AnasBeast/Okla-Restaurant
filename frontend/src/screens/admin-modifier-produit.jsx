import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios";
import Loadingscreen from './Loadingscreen';

export default function AdminModifierProduit() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageurl, setImageUrl] = useState("");
  const [isModifing,setIsModifiying] = useState("Modifier")
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    type: "",
    bannerImg: "",
    promo: false,
  });

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Validate user session
    const loginUser = async () => {
      try {
        await Axios.post(`${process.env.REACT_APP_DOMAIN}/api/admin/checkuser`, { token });
      } catch (err) {
        navigate('/login');
      }
    };

    // Fetch product data
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(`${process.env.REACT_APP_DOMAIN}/api/product/${id}`);
        setFormState({
          title: data.title,
          description: data.description,
          type: data.type,
          bannerImg: data.bannerImg,
          promo: data.promo,
        });
        setImageUrl(data.bannerImg)
        setIsLoading(false);
      } catch (err) {
        console.log("Error fetching product:", err);
      }
    };

    loginUser();
    fetchData();
  }, [id, token, navigate]);

  const handleSumbit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("type", formState.type);
    formData.append("promo", formState.promo);
    formData.append("bannerImg", formState.bannerImg); // Append the file
    setIsModifiying("En cours...")
    try {
      const response = await Axios.put(`${process.env.REACT_APP_DOMAIN}/api/product/${id}`, 
        formData
      ,{
        headers: {
          "Content-Type": "multipart/form-data", // Set the appropriate Content-Type
          "x-access-token" : token
        },
      });
      alert(response.data.message);
      navigate('/admin/produits');
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
    setIsModifiying("Modifier")

  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleImage = (e)=>{
    const file = e.target.files[0];
    setFormState((prevState) => ({
      ...prevState,
      bannerImg: file, // Store the file object directly
    }));
    setImageUrl(URL.createObjectURL(file));
    console.log(formState.bannerImg)
  }
  if (isLoading) {
    return <Loadingscreen />;
  }

  return (
    <div>
      <section className="sm:px-6 lg:px-8 mt-12">
        <div className="px-4 sm:px-0 mb-4 flex justify-between items-center">
          <h2 className="text-sm md:text-xl font-medium text-gray-900">Modifier Produit</h2>
        </div>
        <form
          className="flex h-full flex-col divide-y divide-gray-200 bg-white"
          onSubmit={handleSumbit}
        >
          <div className="h-0 flex-1 overflow-y-auto">
            <div className="bg-gray-700 py-6 px-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Modifier Produit</h2>
              </div>
              <p className="mt-1 text-sm text-gray-300">
                Commencez par remplir les informations ci-dessous pour la modification du produit.
              </p>
            </div>
            <div className="divide-y divide-gray-200 px-4 sm:px-6">
              <div className="space-y-6 pt-6 pb-5">
                {/* Product Name */}
                <div>
                  <label htmlFor="product-name" className="block text-sm font-medium text-gray-900">
                    Nom du Produit
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="product-name"
                    className="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formState.title}
                    onChange={handleInputChange}
                    
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                    Description du produit
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formState.description}
                    onChange={handleInputChange}
                    
                  />
                </div>

                {/* Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-900">
                    Type de produit
                  </label>
                  <select
                    name="type"
                    id="types"
                    className="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formState.type}
                    onChange={handleInputChange}
                    
                  >
                    <option value="burger">Burger</option>
                    <option value="pizza">Pizza</option>
                    <option value="poutine">Poutine</option>
                    <option value="sandwich">Sandwich</option>
                    <option value="assiette">Assiette</option>
                    <option value="barquette">Barquette</option>
                    <option value="cafe">Café</option>
                    <option value="cremerie">Crémerie</option>
                    <option value="patisserie">Pâtisserie</option>
                  </select>
                </div>

                {/* Image URL */}
                <div>
                  <label>
                      Image Actuelle
                  </label>
                  <img src={imageurl} alt="img" className='w-[600px] mb-8'/>
                </div>
                <div>
                  
                  <label
                    htmlFor="product-img"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Nouvelle image
                  </label>
                  <input
                    type="file"
                    name="bannerImg"
                    id="product-img"
                    className="block w-full h-8 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={handleImage}
                  />
                </div>

                {/* Promo */}
                <div className="flex items-center gap-8">
                  <label htmlFor="promo">Promo</label>
                  <input
                    type="checkbox"
                    id="promo"
                    name="promo"
                    checked={formState.promo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 justify-end px-4 py-4">
            <button
              type="button"
              onClick={() => navigate("/admin/produits")}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isModifing}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
