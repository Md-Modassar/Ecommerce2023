import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const Profile = () => {
    const [auth,setAuth]=useAuth()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')


  //  get user data
  useEffect(()=>{
    const {name,email,phone,address}=auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[])  

    const handelsumbit=async(e)=>{
        e.preventDefault();
        try{
           const {data}=await axios.put('/api/v1/auth/profile',
           {name,email,password,phone,address});

           if(data?.error)
             {
                toast.error(data?.error)
             }else{
                setAuth({...auth,user:data?.updateuser})
                let ls=localStorage.getItem("auth")
                ls=JSON.parse(ls)
                ls.user=data.updateuser
                localStorage.setItem('auth',JSON.stringify(ls))
                toast.success('Profile Update successfully');
            }
           
        }catch(error){
          console.log(error)
          toast.error('samething went wrong')
        }
      }
  return (
     <Layout title={'Your Profile'}>
          <div className='container-flui m-3 p-3'>
                <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>
                </div>
                <div className='col-md-9'>
                <div className='regiter-bg'>
            <div className='form-container'>
             <form onSubmit={handelsumbit}>
                <h1 className='title'>USER PROFILE</h1>
                    <div className="mb-3">
                        
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name'  />
                        
                    </div>
                    <div className="mb-3">
                       
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email'  disabled />
                        
                    </div>
                    <div className="mb-3">
                        
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password'  />
                    </div>
                    <div className="mb-3">
                       
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder=' Phone No.'  />
                        
                    </div>
                    <div className="mb-3">
                       
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Address'  />
                        
                    </div>
                   
                    <button type="submit"  className="btn btn-primary">UPDATE</button>
                </form>
                </div>
               </div>
                </div>
                </div>
            </div>
     </Layout>
  )
}

export default Profile