import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useCart } from '../context/cart'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import "../style/prodectdetails.css"

const Productdetails = () => {
     const params=useParams()
     const [product,setProduct]=useState({})
     const [realtedproduct,setRealtedproduct]=useState([])
     const navigate=useNavigate();
     const [cart,setCart]=useCart()

     useEffect(()=>{
        if(params?.slug)getproduct();
     },[params?.slug])

    const getproduct=async()=>{
        try{
           const {data}=await axios.get(`/api/v1/product/get-product/${params.slug}`)
          
           setProduct(data?.product)
           
           getSimillerproduct(data?.product._id,data.product.category._id)
        }catch(err){
            console.log(err)
        }
    }

    //get simmiler product

    const getSimillerproduct=async(pid,cid)=>{
      try{
         
           const {data}=await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
           
           setRealtedproduct(data?.products)
      }catch(err){
         console.log(err)
      }
    }
  return (
    <Layout>
       <img src="/images/bannercat1.webp"
        className='banner-img '
        alt='bannerimage'
        width={'100%'}
        height={'230px'}
        /> 
       <div className='row-container product-details'>
       
        <div className='row'>
       
        </div>
          <div className='col-md-6 product-details-info'>
          <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" 
                 alt={product.name}
                 height={"500px"}
                 width={"600px"}

                 /> 
          
           
                  <h1 className='text-center'>Product details</h1>
                  <h6>Name:{product.name}</h6>
                  <h6>Description:{product.description}</h6>
                  <h6>Price:{product.price}</h6>
                  {<h6>Category:{product.category?.name}</h6> 
                   }
                  <button className='btn btn-secondary ms-1'>ADD TO CART</button>
                
             </div>    
       </div>
       <hr/>
       
        <img src="/images/bannercat.jpg"
        className='banner-img '
        alt='bannerimage'
        width={'100%'}
        height={'120px'}
        /> 
       <div className='container-fluid row mt-3 search' >
       <div className='text-center'>
         <h6>similer product</h6>
         {realtedproduct.length<1 &&(<p className='text-center'>No Similar Product found</p>)}
         <div className='d-flex flex-wrap '>
              {realtedproduct?.map(p=>(
                
                 <div className="card m-2" key={p._id} >

                 <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" 
                 alt={p.name}
                 /> 
                 
                 <div className="card-body">
                   <div className='card-name-price'>
                   <h5 className="card-title">{p.name}</h5>
                   <h5 className='card-price'>₹{p.price}</h5>
                   </div>
                   <p className="card-text">{p.description}</p>
                   <div className='card-name-price'>
                   <button 
                     className='btn btn-info ms-1'
                     onClick={()=>navigate(`/product/${p.slug}`)}>
                      MORE DETAILS

                    </button>
                   <button className='btn btn-dark ms-1'
                      onClick={()=>{setCart([...cart,p])
                        localStorage.setItem('cart',JSON.stringify([...cart,p]))
                        toast.success("Item added to cart")}}
                     >ADD TO CARD</button>
                   </div>
                 </div>
               </div>
            
              )
              )}
              </div>
       </div>
       </div>
    </Layout>   
  )
}

export default Productdetails