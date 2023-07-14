import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom'
import "../../style/authstyle.css"
import { useAuth } from '../../context/auth';

const Login = () => {
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate();
    const location=useLocation()
    const handelsumbit=async(e)=>{
        e.preventDefault();
        try{
           const res=await axios.post('/api/v1/auth/login',
           {email,password});
           if(res.data.success)
             {
              toast.success(res.data.message)
              setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
              })
              localStorage.setItem('auth',JSON.stringify(res.data))
              navigate(location.state||'/');
             }else{
               toast.error(res.data.message)
             }
        }catch(error){
          console.log(error)
          toast.error('samething went wrong')
        }
      }

    return (
        <Layout>
            <div className='regiter-bg'>
                <div className='form-container'>
                    <form onSubmit={handelsumbit}>
                        <h1 className='title'>LOGIN FORM</h1>
                        
                        <div className="mb-3">

                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />

                        </div>
                        <div className="mb-3">

                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                        </div>
                        <div className="mb-3">
                         
                        <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
                        </div>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                        
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login