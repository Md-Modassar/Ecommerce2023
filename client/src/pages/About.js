import React from 'react'
import Layout from '../components/Layout/Layout'

export default function About() {
  return (
    <Layout title={'About us Ecommerce'}>
        <div className='row abouts mt-5'>
         <div className='col-md-6'>
         <img src={'/images/about.jpg'} alt='' style={{width:"100%"}}/>

         </div>
         <div className='col-md-4'>
         <h1 className='bg-dark p-2 text-white text-center'>ABOUT</h1>
          <p>
          It is a platform where businesses can list the products or services they sell, along with prices3. eCommerce websites are built to connect shoppers to products or services for trading online3. They provide everything we need for online shopping, including product listings, eCommerce blog content, company history, and contact information
          </p>
         </div>

        </div>
    </Layout>
  )
}
