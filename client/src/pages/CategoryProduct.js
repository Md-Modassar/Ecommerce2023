import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useCart } from '../context/cart'
import { useNavigate, useParams } from 'react-router-dom'
import "../style/searchstyle.css"
import { toast } from 'react-hot-toast'
import { Checkbox } from 'antd'
const CategoryProduct = () => {
  const [cart,setCart]=useCart()
  const [product,setProduct] =useState([])
  const [category,setCategory]=useState([])
  const [cat,setCat]=useState([])
  const [total,setTotal]=useState(0)
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const navigate=useNavigate()
   const params=useParams()


   const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/category')
        console.log(data)
      if (data?.success) {
        setCategory(data?.category)
  
      }
    } catch (err) {
      console.log(err)
     
    }
  }
  
  useEffect(() => {
    getAllCategory()
    gettotal();
     //eslint-disbale-next-line
  }, [])
  const gettotal=async()=>{
    try{
       const {data}=await axios.get('/api/v1/product/product-count')
       
       setTotal(data?.total)
    }catch(error){
       console.log(error)
    }
  }
  const getProductBycat=async()=>{
    try{
        const {data}=await axios.get(`/api/v1/product/product-category/${params.slug}`)
        setProduct(data?.products)
        setCat(data?.category)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(params?.slug) getProductBycat()
  },[params?.slug])

  const handlefilter=(value,id)=>{
    let all=[...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter((c)=>c!==id)
    }
    setChecked(all)
}
const filterProduct=async()=>{
  try{
     const {data}=await axios.post('/api/v1/product/product-filters',{checked,radio})
     setProduct(data?.products)
  }catch(err){
    console.log(err)
  }
 }
 useEffect(()=>{
  if(checked.length||radio.length)filterProduct()
},[checked,radio])
  return (
    <Layout className='container mt-3 ' >
       
      <div className='container-fluid row mt-3 search'>
      
      <div className='col-md-3 filters'>
           <h4 className='text-cneter'>Filter By Category</h4>
           <div className='d-flex flex-column '>
           {category?.map((c)=>(
              <Checkbox key={c._id} onChange={(e)=>handlefilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
           ))}
           </div>
           <h4 className='text-cneter mt-4'>Filter By Prices</h4>
           <div className='d-flex flex-column '>
               <button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTER</button>
           </div>
          </div>
        <div className='col-md-9'>
        <img src="/images/bannercat1.webp"
        className='banner-img '
        alt='bannerimage'
        width={'100%'}
        height={'180px'}
        /> 
        <div className='text-center'>
        <h1>{cat?.name}</h1>
       
        <div className='row'>
        
        <div className='d-flex flex-wrap'>
        
           {product?.map((p)=>(
               
                 <div className="card m-2" key={p._id} >

                 <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" 
                 alt={p.name}
                 /> 
                 
                 <div className="card-body ">
                  <div className='card-name-price'>
                   <h5 className="card-title">{p.name}</h5>
                   <h5 className="card-price">₹{p.price}</h5>
                   </div>
                   <p className="card-text">{p.description}</p>
                   <div className='card-name-price '>
                   <button className='btn btn-info ms-1' onClick={()=>navigate(`/product/${p.slug}`)}>MORE DETAILS</button>
                   <button className='btn btn-dark ms-1'
                      onClick={()=>{setCart([...cart,p])
                        localStorage.setItem('cart',JSON.stringify([...cart,p]))
                        toast.success("Item added to cart")}}
                     >ADD TO CARD</button>
                     
                   </div>
                 </div>
               </div>
               
              ))}
              
           </div>

        </div>
        </div>
        </div>
        </div>
        <img src="/images/bannercat.jpg"
        className='banner-img '
        alt='bannerimage'
        width={'100%'}
        height={'180px'}
        /> 
        </Layout>
  )
}

export default CategoryProduct

