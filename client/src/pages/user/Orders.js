import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'

const Orders = () => {
    const [order, setOrder] = useState([])
    const [auth, setAuth] = useAuth()
    const getoders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/orders')
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
    return (
        <Layout title={'Your orders'}>
            <div className='container-flui p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center'>All Orders</h1>
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
                                                    <td>{o?.status}</td>
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
            </div>

        </Layout>
    )
}

export default Orders