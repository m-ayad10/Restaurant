import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../AuthMiddleware'
import axios from 'axios'
import { Alert } from '../../SweetAlert'

function AllOrders() {
  const [user, setUser] = useState()
  const [orders, setOrders] = useState([])
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/allorders`)
        const { data, status, message } = response.data
        if (status) {
          const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          console.log(sortedOrders);
          
          setOrders(sortedOrders);
        } else {
          alert(message)
        }
      } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/allorders`, {
        OrderId: orderId,
        status: newStatus
      });

      const { data, status, message } = response.data;
      if (status) {
        setOrders(data);
      } else {
        alert(message)
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
      Alert('error', 'Error', errorMessage, 'Ok')
    }
  };


  return (
    <div>
      <div className="bg-lighter">
        <div className="">
          <h3 className='p-2'>Orders</h3>
          <hr className="100 m-0 mb-2" />
        </div>
        {
          orders?.length > 0 ? (
            orders.map((order) => (
              <div className="cart-container ps-4 pe-3 pt-0  cart-border">
                <h5 className="text-danger m-0">OrderId: {order._id}</h5>
                <h5 className="text-danger m-0">UserId: {order.userId}</h5>
                <h6>23/01/25- 12:50 pm</h6>
                <select className='order-status' value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                  <option value="Ordered">Ordered</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                {
                  order.items.map((item) => (
                    <div className="cart-box mt-2">
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
                <hr className="m-0 bg-white" />
              </div>
            ))
          ) : (
            <p className="text-center">No orders found</p>
          )
        }
      </div>
    </div>
  )
}

export default AllOrders
