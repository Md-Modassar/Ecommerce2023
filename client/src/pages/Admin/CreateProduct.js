import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option}=Select

const CreateProduct = () => {
    const navigate=useNavigate()
    const [categories,setCategories]=useState([])
    const [photo,setPhoto]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [quantity,setQuantity]=useState("")
    const [shipping,setShipping]=useState("")
    const [name,setName]=useState("")

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get('/api/v1/category/category/')
          if (data?.success) {
            console.log(data)
            setCategories(data?.category)
          }
        } catch (err) {
          console.log(err)
          toast.error("samething went wrong in getcategory")
        }
      }

      useEffect(() => {
        getAllCategory()
      }, [])

      const handlecreate=async(e)=>{
        e.preventDefault()
        try{
            const productdata=new FormData()
            productdata.append("name",name)
            productdata.append("description",description)
            productdata.append("price",price)
            productdata.append("quantity",quantity)
            productdata.append("photo",photo)
            productdata.append("category",category)
            const {data}=axios.post('/api/v1/product/create-product',productdata)
            if(data?.success)
              {
                toast.error(data?.message)
                
              }else{
                toast.success("Product created successfully")
                navigate('/dashboad/admin/products')
              }
        }catch(err){
            toast.error('samething went wrong')
        }

      }
    return (
        <Layout title={'Dashboad-Create Product'}>
            <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>create product</h1>
                    <div className='m-1 w-75'>
                      <Select bordered={false} placeholder="select a category" size="large" showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                       {categories?.map(c=>(
                        <Option key={c._id} value={c._id}>{c.name}</Option>

                       ))}
                      </Select>
                      <div className='mb-3'>
                        <label  className='btn btn-outline-secondary col-md-12'>
                            {photo?photo.name:'Upload Photo'}
                            <input type='file' name='photo' 
                            accept='images/*' 
                            onChange={(e)=>setPhoto(e.target.files[0])} 
                            hidden/>
                        </label>
                      </div>
                      <div className='mb-3'>
                        {photo && (
                          <div className='text-center'>
                             <img src={URL.createObjectURL(photo)} alt ="product_photo" height={"200px"} className='img img-responsive'/>
                            </div>  
                        )}
                      </div>
                      <div className='mb-3'>
                         <input type='text' value={name} placeholder='write a name' 
                         className='from-control col-md-12'
                         onChange={(e)=>setName(e.target.value)}/>
                      </div>
                      <div className='mb-3'>
                         <textarea type="text"
                         value={description}
                         placeholder='write a description'
                         className='from-control col-md-12'
                         onChange={(e)=>setDescription(e.target.value)}>

                         </textarea>
                      </div>
                      <div className='mb-3'>
                         <input type='number' value={price} placeholder='write a Price' 
                         className='from-control col-md-12'
                         onChange={(e)=>setPrice(e.target.value)}/>
                      </div>
                      <div className='mb-3'>
                         <input type='number' value={quantity} placeholder='write a quantity' 
                         className='from-control col-md-12'
                         onChange={(e)=>setQuantity(e.target.value)}/>
                      </div>
                      <div className='mb-3'>
                       <Select bordered={false}
                       placeholder="Select Shiping"
                       size='large'
                       showSearch
                       className='from-select mb-3 col-md-12'
                        onChange={(value)=>{setShipping(value);}}>
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                        </Select>
                      
                      </div>
                      <div className='mb-3'>
                        <button className='btn btn-primary' onClick={handlecreate}>CREATE PRODUCT</button>
                      </div>
                    </div>
                </div>
            </div>
           </div> 

        </Layout>
    )
}

export default CreateProduct