import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import ShoppingCart from '../Components/Shopping Cart/ShoppingCart'
import axios from 'axios'
import { Alert } from '../SweetAlert'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Cart() {
  const [user, setUser] = useState()
  const [cart, setCart] = useState([])
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/verify-token`, { withCredentials: true })
        const { status, user } = response.data
        if (status) {
          setUser(user)
        }
      } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchUser()
  }, [])
  useEffect(() => {
    if (!user) {
      return
    }
    const fetchData = async (req, res) => {
      try {
        const response = await axios.get(`${SERVER_URL}/cart/${user.id}`)
        const { data, status, message } = response.data
        if (status) {
          setCart(data)
        }
      } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
      }
    }
    fetchData()
  }, [user])
  return (
    <div>
      <Navbar />
      <ShoppingCart setCart={setCart} cart={cart} />
      <BottomBar />

    </div>
  )
}

export default Cart
