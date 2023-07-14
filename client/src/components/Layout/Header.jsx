import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import Searchinput from '../Form/Searchinput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge } from 'antd'

export const Header = () => {
  const [cart] =useCart()
   {console.log(cart?.length)}
  
 
  const [auth, setAuth] = useAuth()
  const cattegories = useCategory()
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    })
    localStorage.removeItem('auth')
    toast.success("Logout successfully")
  }
  return (

    <>
    
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid ">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand"><FaShoppingCart /> Markect Globel</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <Searchinput />
              <li className="nav-item">
                <NavLink to='/' className="nav-link " >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle"
                 to={"/categories" }
                  data-bs-toggle="dropdown" 
                  >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                  <Link className="dropdown-item" to={'/categories'}>
                    All Categories
                  </Link>
                  
                  </li>
                  {cattegories?.map(c=>(
                    <li>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                

                </ul>
              </li>
             
              {
                !auth.user ? (
                  <><li className="nav-item">
                    <NavLink to='/register' className="nav-link" >Register</NavLink>
                  </li>
                    <li className="nav-item">
                      <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
                    </li>
                  </>) : (<>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink to={`/dashboad/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" >Dasboad</NavLink></li>
                        <li><NavLink onClick={handleLogout} to='/login' className="dropdown-item" >Logout</NavLink></li>
                      </ul>
                    </li>

                  </>)
              }
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                <NavLink to='/cart' className="nav-link" >Cart</NavLink>
                </Badge>

              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
