import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import moment from 'moment'
import { Select } from 'antd'
const {Option}=Select
const AdminOrder = () => {
    const [status,setStatus]=useState(['Not Process','Processing','Shipped','deliver','cancel'])
    const [changestatus,setChangestatus]=useState("")
    const [order, setOrder] = useState([])
    const [auth, setAuth] = useAuth()
    const getoders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders')
            setOrder(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (auth?.token) {
            getoders()
        }

    }, [auth?.token])

    const handleChange=async(orderId,value)=>{
          try{
               console.log(value)
               const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value,})
               getoders()
            }catch(err){
                console.log(err)
            }
    }
  return (
     <Layout title={'All Orders Data'}>
       <div className='row'>
          <div className='col-md-3'>
             <AdminMenu/>
          </div>
          <div className='col-md-9'>
              <h1 className='text-center'>All orders</h1>
              {
                            order?.map((o, i) => {

                                return (
                                    <div className='border shadow'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Date</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <Select bordered={false} onChange={(vaule)=>{handleChange(o._id,vaule)}} defaultValue={o?.status}>
                                                          {
                                                            status.map((s,i)=>(
                                                               <Option key={i} vaule={status}>{s}</Option>
                                                            ))
                                                          }
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                            <div className='container'>
                                                {
                                                    o.products?.map(p => (
                                                        <div className='row mb-2 card p-2 flex-row'>
                                                            <div className='col-md-4'>
                                                                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top "
                                                                    alt={p.name}
                                                                    width={'100px'}
                                                                    height={'100px'}
                                                                />
                                                            </div>
                                                            <div className='col-md-8'>
                                                                <p>
                                                                    {p.name}
                                                                </p>
                                                                <p>{p.description.substring(0, 30)}</p>
                                                                <p>Price: {p.price}₹</p>
                                                               
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </table>
                                    </div>
                                )
                            })
                        }
            </div>
       </div>
     </Layout>
  )
}

export default AdminOrder