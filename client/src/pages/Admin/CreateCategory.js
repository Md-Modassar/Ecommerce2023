import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/Form/Categoryform'
import {} from 'antd'
import Modal from 'antd/es/modal/Modal'
const CreateCategory = () => {
  const [slected,setSlected]=useState(null)
  const [updatename,setUpdatename]=useState("")
  const [name,setName]=useState('')
  const [visible,setVisible]=useState(false)
  const handleSubmit=async(e)=>{
    e.preventDefault()
     try{
        const {data}=await axios.post('/api/v1/category/create-category',{name})
        if(data?.success)
         {
          toast.success(`${data.name} is created`)
          getAllCategory()
         }else{
          toast.error(data.message)
         }
     }catch(error){
          console.log(error)
          toast.error("samething went wrong in input form")
     }
  }
  const [category, setCategory] = useState([])

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/category/')
      if (data.success) {
        console.log(data)
        setCategory(data.category)
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
          const {data}=await axios.put(`/api/v1/category/update-category/${slected._id}`,{name:updatename})
          if(data.success)
            {
              toast.success(`${updatename} is updated`)
              setSlected(null)
              setUpdatename("")
              setVisible(false)
              getAllCategory();

            }else{
              toast.error(data.message)
            }
     }catch(err)
       {
        toast.error('samething went wrong')
       }
  }
  //delete 
  const handledelete=async(pid)=>{
    
    try{
         const {data}=await axios.delete(`/api/v1/category/delete-category/${pid}`)
         if(data.success)
           {
             toast.success(`${name} is deleted`)
             getAllCategory();
           }else{
             toast.error(data.message)
           }
    }catch(err)
      {
       toast.error('samething went wrong')
      }
 }
  return (
    <Layout title={'Dashboad-Create-category'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage category</h1>
             <div className='p-3 w-50'>
               <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName}/>
             </div>
            <div className='w-75'>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className='btn btn-primary'
                           onClick={()=>{setVisible(true); 
                           setUpdatename(c.name);
                           setSlected(c)}}>Edit</button>
                          </td>
                          <td>
                          <button className='btn btn-danger' onClick={()=>(handledelete(c._id))}>Delete</button>
                          </td>
                      </tr>
                    </>

                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}><Categoryform value={updatename} setValue={setUpdatename} handleSubmit={handleupdate}/></Modal>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default CreateCategory