import React from 'react'
import Layout from '../components/Layout/Layout'
import {AiTwotoneMail} from 'react-icons/ai'
import {BiSupport}from 'react-icons/bi'
import {BsFillTelephoneFill} from 'react-icons/bs'
export default function Contact() {
  return (
    <Layout title={'Contacts '}>
      <div className='row contacts mt-5 mr-3 '>
       <div className='col-md-6'>
        <img src={'/images/office.jpeg'} alt='' style={{width:"100%"}}/>
        
       </div>
       <div className='col-md-4'>
           <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
           <p className='text-justify mt-2'>
            any query and info about product feel free to call anytime we 24X7 avaialible
           </p>
           <p className='mt-3'>
              < AiTwotoneMail/>: www.help@md.com
           </p>
           <p className='mt-3'>
              <BsFillTelephoneFill/> :012-4321863
           </p>
           <p className='mt-3'>
             <BiSupport/>:1800-0000-0000
           </p>
       </div>
      </div>
    </Layout>
  )
}
