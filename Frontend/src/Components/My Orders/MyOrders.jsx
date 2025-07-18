import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../AuthMiddleware'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MyOrders() {
    const [user, setUser] = useState()
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    useEffect(() => {
        getUserDetails(setUser)
    }, [])
    useEffect(() => {
        if (!user) {
            return
        }
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/orders/${user.id}`)
                const { status, message, data } = response.data
                if (status) {
                    const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                } else {
                    alert(message)
                }
            } catch (error) {
                console.error(error)
                const errorMessage =
                    error.response?.data?.message || 'Something went wrong. Please try again.';
                Alert('error', 'Error', errorMessage, 'Ok');
            }
        }

        fetchOrder()
    }, [user])
    return (
        <div>
            <div className="bg-lighter">
                {
                    orders?.length > 0 ? (
                        orders.map((order) => (
                            <div className="cart-container cart-border">

                                {/* <h5 className="text-danger m-0">Order Id</h5> */}
                                <h6>
                                    {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    }).format(new Date(order.createdAt))}
                                </h6>                                <h5 className="green-t m-0">{order.status}</h5>
                                {
                                    order.items.map((item) =>
                                    (
                                        <div className="cart-box">
                                            <div className="cart-img-box">
                                                <img className='cart-img' src={item.image} alt="" />
                                            </div>
                                            <div className="cart-content">
                                                <h4>{item.name} x {item.quantity}</h4>
                                                <h6 className=''>₹{item.price} x{item.quantity}</h6>
                                                <h5 className="green-t">₹ {item.subTotal}</h5>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="d-flex justify-content-center">
                                    <button className='btn btn-payment shadow-none' onClick={() => navigate('/')} >Order Again</button>
                                </div>
                                <hr className="m-0 bg-white" />
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No orders found </p>
                    )
                }


            </div>
        </div >
    )
}

export default MyOrders
