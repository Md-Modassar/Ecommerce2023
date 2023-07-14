import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios';
const {Option}=Select
const UpdateProduct = () => {
    const navigate=useNavigate()
    const [categories,setCategories]=useState([])
    const [photo,setPhoto]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [category,setCategory]=useState("")
    const [quantity,setQuantity]=useState("")
    const [shipping,setShipping]=useState("")
    const [name,setName]=useState("")
    const params=useParams()
    const [id,setId]=useState("")


    const getSingalproduct=async()=>{
      try{
         const {data} =await axios.get(`/api/v1/product/get-product/${params.slug}`)
         setName(data.product.name);
         setId(data.product._id)
         setDescription(data.product.description);
         setPrice(data.product.price);
         setQuantity(data.product.quantity);
         setCategory(data.product.category._id);

      }catch(error)
        {
            toast.error('samethin went to wrong')
        }
    }    
    useEffect(()=>{
        getSingalproduct()
        //eslint-disbale-next-line
    },[])

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


      const handleupdate=async(e)=>{
        e.preventDefault()
        try{
            const productdata=new FormData()
            productdata.append("name",name)
            productdata.append("description",description)
            productdata.append("price",price)
            productdata.append("quantity",quantity)
            photo && productdata.append("photo",photo)
            productdata.append("category",category)
            const {data}= axios.put(`/api/v1/product/update-product/${id}`,productdata)
            if(data?.success)
              {

                toast.error(data.message)
               
                
              }else{
                toast.success("Product updated successfully")
                navigate('/dashboad/admin/products')
              }
        }catch(err){
            toast.error('samething went wrong')
        }

      };

      const HandleDelete = async () => {
        
          try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } =  axios.delete(
              `/api/v1/product/delete-product/${id}`
            );
            toast.success("Product DEleted Succfully");
            navigate("/dashboad/admin/products");
        
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
          }
          //eslint-disbale-next-line
        

          getAllCategory()
       
        
      };


  return (
    <Layout title={'Dashboad-Create Product'}>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1>Update product</h1>
            <div className='m-1 w-75'>
              <Select bordered={false} 
              placeholder="select a category"
               size="large" 
              showSearch className='form-select mb-3' 
              onChange={(value)=>{setCategory(value)}
               
              }
              value={category}
              >

               
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
                {photo ?(
                  <div className='text-center'>
                     <img src={URL.createObjectURL(photo)} alt ="product_photo" height={"200px"} className='img img-responsive'/>
                    </div>  
                ):(
                    <div className='text-center'>
                    <img src={`/api/v1/product/product-photo/${id}`}
                     alt ="product_photo" height={"200px"} 
                     className='img img-responsive'
                     />
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
                onChange={(value)=>{setShipping(value);}}
                 value={shipping?"Yes":"No"}
                >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
                </Select>
              
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleupdate}>UPDATE PRODUCT</button>
              </div>
              <div className='mb-3'>
                <button className='btn btn-danger' onClick={()=>HandleDelete()}>DELETE PRODUCT</button>
              </div>
            </div>
        </div>
    </div>
   </div> 

</Layout>
  )
  
}

export default UpdateProduct