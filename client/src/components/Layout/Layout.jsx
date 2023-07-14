import React from 'react'
import { Header } from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import 'react-toastify/dist/ReactToastify.css';
import  { Toaster } from 'react-hot-toast';
export default function Layout({children,title,Description,keywords,author}) {
  return (
    <div>
          <Helmet>
                <meta charSet="utf-8" />
                
                  <meta className='description' content={Description}/>
                  <meta className='keywords' content={keywords}/>
                  <meta className='authore' content={author}/>
              
                <title>{title}</title>
                
            </Helmet>
        <Header/>
        <main style={{minHeight:'80vh'}}>
          <Toaster/>
        {children}
        </main>
        <Footer/>
       
    </div>
  )
}
Layout.defaultProps={
  title:'Ecommerce -shop now',
  Description:'mern stack project',
  keywords:'mern,react,node,mongoDB',
  author:'MG'
}
