import React from 'react'
import MyOrders from '../Components/My Orders/MyOrders'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import NavbarBack from '../Components/Navbar Back/NavbarBack'

function Orders() {
  return (
    <div>
      <NavbarBack/>
      <MyOrders />
      <BottomBar />
    </div>
  )
}

export default Orders
