
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import { Pagenotfound } from './pages/Pagenotfound';
import { Policy } from './pages/Policy';
import Register from './pages/Auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboad from './pages/user/Dashboad';
import PrivateRoute from './Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './Routes/AdminRoute';
import AdminDashboad from './pages/Admin/AdminDashboad';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import Productdetails from './pages/Productdetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Cartpage from './pages/Cartpage';
import AdminOrder from './pages/Admin/AdminOrder';
//import { Router } from 'express';
//import { AuthProvider } from './context/auth';


function App() {
  return (
    
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product/:slug' element={<Productdetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<Cartpage/>}/>
      <Route path='/category/:slug' element={<CategoryProduct/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboad' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboad/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboad' element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboad/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/users' element={<Users/>}/>
        <Route path='admin/orders' element={<AdminOrder/>}/>
      </Route>

      <Route path='*' element={<Pagenotfound/>}/>
      
      
    </Routes>
   
    
    
  );
}

export default App;
