import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
    const categories=useCategory()
  return (
     <Layout title={'All Categories'}>
            
            <div className='container' style={{marginTop:"10px"}}>
             
            <img src="/images/bannercat1.webp"
        className='banner-img '
        alt='bannerimage'
        width={'100%'}
        height={'230px'}
        /> 
          <h1 className='text-center' style={{fontFamily:"roboto" ,color:'gray',fontSize:"50px"}}>ALL CATEGORY</h1>
              <div className='row container'>
                {categories.map(c=>(
                 <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                   <div className='card'>
                    <Link to={`/category/${c.slug}`} className='btn cat-btn'>{c.name}</Link>
               </div>
               </div>
                ))}
              
              </div>
            </div>
            <img src="/images/bannercat.jpg"
        className='banner-img '
        alt='bannerimage'
        width={'100%'}
        height={'90px'}
        /> 
     </Layout>
  )
}

export default Categories

