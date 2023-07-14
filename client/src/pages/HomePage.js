import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {Checkbox,Radio} from "antd"
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { AiOutlineReload } from 'react-icons/ai';
import "../style/homepage.css"

export default function HomePage() {
  const [cart,setCart]=useCart()
 const navigate=useNavigate()
 const [product,setProduct]=useState([]);
 const [category,setCategory]=useState([]);
 const [checked,setChecked]=useState([])
 const [radio,setRadio]=useState([])
 const [total,setTotal]=useState(0)
 const [page,setPage]=useState(1)
 const [loading,setLoading]=useState(false)


 

 const getAllCategory = async () => {
  try {
    const { data } = await axios.get('/api/v1/category/category')
    
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

// load more
useEffect(()=>{
  if(page==1)return ;
  loadMore()
},[page])

const loadMore=async()=>{
  try{
    setLoading(true)
     const {data}=await axios.get(`api/v1/product/product-list/${page}`);
     setLoading(false) 
     setProduct([...product,...data?.products])
    
  }catch(err){
    console.log(err)
    setLoading(false)
  }
}

 const getAllproduct=async()=>{
    try{
      setLoading(true)
       const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
       setLoading(false)
       setProduct(data?.products)
       
      
    }catch(err){
      setLoading(false)
      toast.error("samething went wrong")
    }

 }
 useEffect(()=>{
 getAllproduct();
 
 },[])

 useEffect(()=>{
    if(checked.length||radio.length)filterProduct()
 },[checked,radio])


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
  return (
    <Layout title={'All product Best Offers'}>
       {/* <img src="/images/banner1.jpg"
        className='banner-img'
        alt='bannerimage'
        width={'100%'}
        /> */}
          <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carsousel" >
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
   
  <div className="carousel-inner" id="carosual">
    
    <div className="carousel-item active">
      <img src="/images/banner5.webp" className="d-block w-100" style={{filter:"brightness(100%" ,"width":"100%","maxHeight":"400px"}} alt="..."/>
      <div className="carousel-caption d-none d-md-block" >
     
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/images/banner4.webp" className="d-block w-100" style={{filter:"brightness(100%","width":"100%","maxHeight":"400px" }} alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="/images/banner.png" className="d-block w-100" style={{filter:"brightness(100%" ,"width":"100%","maxHeight":"400px"}} alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
   
   
      <div className='container-fluid row mt-3 home-page'>
         <div className='col-md-3 filters'>
           <h4 className='text-cneter'>Filter By Category</h4>
           <div className='d-flex flex-column fliter-check'>
           {category?.map((c)=>(
              <Checkbox key={c._id} onChange={(e)=>handlefilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
           ))}
           </div>
           <h4 className='text-cneter mt-4'>Filter By Prices</h4>
           <div className='d-flex flex-column mr-2 position:sticky'>
               <Radio.Group onChange={e=>setRadio(e.target.value)}>
                {Prices?.map(p=>(
                  <div key={p._id}>
                     <Radio value={p.array}>{p.name}</Radio>
                  </div>
                  
                ))}
               </Radio.Group>
           </div>
           <div className='d-flex flex-column '>
               <button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTER</button>
           </div>
          </div>
          <div className='col-md-9'>
           <h1 className='text-center'>All Products</h1>
           <div className='d-flex flex-wrap'>
           {product?.map((p)=>(
             
                    
                 <div className="card m-2" key={p._id } >

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
                   <button 
                     className='btn btn-info ms-1'
                     onClick={()=>navigate(`/product/${p.slug}`)}>
                      MORE DETAILS

                    </button>
                   <button className='btn btn-dark ms-1'
                      onClick={()=>{setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success("Item added to cart")
                      
                  }}>ADD TO CARD</button>
                   </div>
                 </div>
               </div>
               
                ))}
           </div>
           <div className='m-2 p-3'>
            {product && product.length <total &&(
              <button 
                className='btn loadmore'
                onClick={(e)=>{
                  e.preventDefault();
                  setPage(page+1)

                }}>
                {loading?('Loading....'):(
                <>{" "}
                 Loadmore
                  <AiOutlineReload/>
                  </>
                  )}
              </button>
            )}
          
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
