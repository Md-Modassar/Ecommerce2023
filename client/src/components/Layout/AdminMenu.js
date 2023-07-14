import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
          <div className='text-center'>
            <div className="list-group">
                 <h4>Admin Panel</h4>
                <NavLink to="/dashboad/admin/create-category" className="list-group-item list-group-item-action">
                   Create Category
                </NavLink>
                <NavLink to="/dashboad/admin/create-product" className="list-group-item list-group-item-action">
                    Create Product
                </NavLink>
                <NavLink to="/dashboad/admin/orders" className="list-group-item list-group-item-action">
                    Orders
                </NavLink>
                <NavLink to="/dashboad/admin/products" className="list-group-item list-group-item-action">
                     Products
                </NavLink>
                <NavLink to="/dashboad/admin/users" className="list-group-item list-group-item-action">
                    Users
                </NavLink>
               
            </div>
          </div> 
        </>
    )
}

export default AdminMenu