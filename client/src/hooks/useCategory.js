import { useState,useEffect } from "react";
import axios from "axios";

export default function useCategory(){
    const [categories,setCategories]=useState([])

    const getCategpries=async()=>{
        try{
           const {data}=await axios.get('/api/v1/category/category')
           setCategories(data.category)
        }catch(err){
            console.log(err)
        }


    }

    useEffect(()=>{
        getCategpries();
    },[])

    return categories
}