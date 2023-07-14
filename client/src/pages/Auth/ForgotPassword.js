import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import "../../style/authstyle.css"


const ForgotPassword = () => {
    const [email,setEmail]=useState('')
    const [newpassword,setNewPassword]=useState('')
    const [answer,setAnswer]=useState('')
   
    const navigate=useNavigate();
   
    const handelsumbit=async(e)=>{
        e.preventDefault();
        try{
           const res=await axios.post('/api/v1/auth/forgot-password',
           {email,newpassword,answer});
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
     <Layout title={'Forgot Password Ecommerce'}>
          <div className='regiter-bg'>
                <div className='form-container'>
                    <form onSubmit={handelsumbit}>
                        <h1 className='title'>RESET PASSWORD</h1>
                        
                        <div className="mb-3">

                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />

                        </div>
                        <div className="mb-3">

                            <input type="password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your NewPassword' required />
                        </div>
                        <div className="mb-3">

                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Favorite Sport Name' required />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">RESET</button>
                        
                    </form>
                </div>
            </div>
     </Layout>

  )
}

export default ForgotPassword