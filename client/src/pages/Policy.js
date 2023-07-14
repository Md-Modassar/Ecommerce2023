import React from 'react'
import Layout from '../components/Layout/Layout'

export const Policy = () => {
  return (
    <Layout title={'Policy'}>
        <div className='row policy mt-5'>
        <div className='col-md-6'>
          <img src={'/images/policy.jpg'} alt="" style={{width:'100%'}}/>
        </div>
        <di className='col-md-4'>
           <h1 className='bg-dark p-2 text-white text-center'>POLICY</h1>
          <p>policy</p>
          <p>Policy</p>
          <p>policy</p>
          <p>Policy</p>
        </di>
        </div>
    </Layout>
  )
}
