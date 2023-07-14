import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import "../style/cartstyle.css";

const Cartpage = () => {
 const [cart,setCart]=useCart()
 const [auth,setAuth]=useAuth()
 const navigate=useNavigate()
 const [clientToken,setClientToken]=useState('')
 const [instance,setInstance]=useState('')
 const [loading,setLoading]=useState(false)


 const totalprice=()=>{
   try{
       let toatal=0;
       cart?.map(item=>{toatal+=item.price})

       return toatal
   }catch(err){
    console.log(err)
   }
 }

 const removeCartItem=(pid)=>{
   try{
      let mycart=[...cart]
      let index=mycart.findIndex(item=>item._id===pid)
      mycart.splice(index,1)
      setCart(mycart)
      localStorage.setItem('cart',JSON.stringify(mycart))
   }catch(err){
    console.log(err)
   }
 }

 //get payment

 const getToken=async()=>{
   try{
        const {data}=await axios.get('/api/v1/product/braintree/token')
        setClientToken(data?.clientToken)
   }catch(err)
   {
    console.log(err)
   }
 }

 useEffect(()=>{
  getToken()
 },[auth?.token])

//handlepayment

const handlePayment = async () => {
  try {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post("/api/v1/product/braintree/payment", {
      nonce,
      cart,
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboad/user/orders");
    toast.success("Payment Completed Successfully ");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  return (
     <Layout>
        <div className='cart-page'>
            <div className='row'>
             <div className='col-md-12'>
               <h1 className='text-center bg-light p-2 mb-1'>
                 {!auth?.user ? "Hello Guest":
                 `Hello ${auth?.token &&auth?.user?.name}`}
               
               <p className='text-center'>
                {cart?.length>0
                ?`You Have ${cart?.length} item in your cart ${
                  auth?.token?"":"Please login to checkout"}`:"Your carts is emapty"}
                </p>
               </h1>
             </div>
            </div>
            <div className='container'>
            <div className='row'>
                 <div className='col-md-7 p-0 m-0'>
                  {
                    cart?.map(p=>(
                      <div className='row  card flex-row' key={p._id}>
                        <div className='col-md-4'>
                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top " 
                 alt={p.name}
                  width='100%'
                  height={'130px'}
                  /> 
                        </div>
                        <div className='col-md-4'>
                          <p>
                            {p.name}
                          </p>
                          <p>{p.description.substring(0,30)}</p>
                          <p>Price: {p.price}₹</p>
                          </div>
                          <div className='col-md-4 cart-remove-btn'>
                          <button className='btn btn-danger' onClick={()=>(removeCartItem(p._id))}>REMOVE</button>
                        </div>
                      </div>
                    ))
                  }
                  </div>
                 <div className='col-md-5 cart-summary'>
                     <h2>Cart Summary</h2>
                     <p> Total | checkout | Payment</p>
                     <hr/>
                     <h4>Total :{totalprice()}₹</h4>
                     {auth?.user?.address ? (
                      <>
                       <div className='mb-3'>
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button className='btn btn-outline-warning'
                         onClick={()=>navigate('/dashboad/user/profile')}>Update Address</button>
                       </div> 
                       </>  
                     ): (
                      <div className='mb-3'>
                        {
                          auth?.token ?(
                            <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboad/user/profile')}>Update Adress </button>
                          ):(
                            <button className='btn btn-outline-warning' onClick={()=>navigate('/login',{state:"/cart",})}>Please Longin to checkout</button>
                          )
                        }
                      </div>
                     )}
                     <div className='mt-2'>
                       {
                         !clientToken ||!auth?.token || !cart?.length ? (""):
                         (<>
                          <DropIn
                            options={{
                              authorization: clientToken,
                              paypal: {
                                flow: "vault",
                              },
                            }}
                            onInstance={(instance) => setInstance(instance)}
                          />
      
                          <button
                            className="btn btn-primary"
                            onClick={handlePayment}
                            disabled={loading || !instance || !auth?.user?.address}
                          >
                            {loading ? "Processing ...." : "Make Payment"}
                          </button>
                        </>
      )
                       }
                     
                     </div>
                 </div>
                
            </div>
            </div>
        </div>
     </Layout>
  )

}

export default Cartpage