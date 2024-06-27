import React, { useEffect, useState } from 'react'
import { Gallery } from "react-grid-gallery";
import Navbar from './Navbar';
import Loadingscreen from '../screens/Loadingscreen';
import Footer from './Footer';
import Axios from "axios"

const images = [
   {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      width: 320,
      height: 174,
      caption: "After Rain (Jeshu John - designerspics.com)",
   },
   {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      width: 320,
      height: 212,
      alt: "Boats (Jeshu John - designerspics.com)",
   },
   {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      width: 320,
      height: 212,
   },
   {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
 },
 {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    alt: "Boats (Jeshu John - designerspics.com)",
 },
 {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
 },
 {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
 },
 {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    alt: "Boats (Jeshu John - designerspics.com)",
 },
 {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
 },
 {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
 },
 {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    alt: "Boats (Jeshu John - designerspics.com)",
 },
 {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
 },
];
 

export default function GalleryImages() {
   const [blogs,setBlogs] = useState([])
   const [isLoading,setIsLoading] = useState(true)
   
   useEffect(() => {
      // Simulate an API call
      const fetchData = async () => {
         try {
            const { data } = await Axios.get(`${process.env.REACT_APP_DOMAIN}/api/blogs`);
            console.log(data)
            setBlogs(data.blogs)
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
   var images = blogs.map((blog)=>({
      src:blog.image,
      loading:"lazy",
      width:"auto",
      height:"auto"
   }))
   console.log(images)
   return (
   <Gallery images={images} enableImageSelection={false}/>
)};
