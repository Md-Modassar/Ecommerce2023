import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../../style/authstyle.css"
const Register = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    const [answer,setAnswer]=useState('')
    const navigate=useNavigate();

    const handelsumbit=async(e)=>{
      e.preventDefault();
      try{
         const res=await axios.post('/api/v1/auth/register',
         {name,email,password,phone,address,answer});
         if(res.data.success)
           {
            toast.success(res.data.message)
            navigate('/login');
           }else{
             toast.error(res.data.message)
           }
      }catch(error){
        console.log(error)
        toast.error('samething went wrong')
      }
    }
    return (
        <Layout title={'Register form'}>
            <div className='regiter-bg'>
            <div className='form-container'>
             <form onSubmit={handelsumbit}>
                <h1 className='title'>REGISTER FORM</h1>
                    <div className="mb-3">
                        
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' required />
                        
                    </div>
                    <div className="mb-3">
                       
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        
                    </div>
                    <div className="mb-3">
                        
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>
                    <div className="mb-3">
                       
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder=' Phone No.' required />
                        
                    </div>
                    <div className="mb-3">
                       
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Address' required />
                        
                    </div>
                    <div className="mb-3">
                       
                       <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='What is Your Favorite sport' required />
                       
                   </div>
                    <button type="submit"  className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register