import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Offer from '../Components/Offer/Offer'
import FoodCard from '../Components/FoodCard/FoodCard'
import StarRating from '../Components/Star/StarRating'
import StarDisplay from '../Components/Star/StarDisplay'
import SearchForm from '../Components/Search/SearchForm'
import Categories from '../Components/Categories/Categories'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import axios from 'axios'
import ItemFoodCard from '../Components/Item Food Card/ItemFoodCard'
import { getUserDetails } from '../AuthMiddleware'
import { useNavigate } from 'react-router-dom'
import Aos from 'aos'


function Home() {
  const [category, setCategory] = useState([])
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    Aos.init()
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category')
        setCategory(response.data.data)
      } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data.message || 'Something went wrong';
        Alert('error', 'Error', errorMessage, 'Ok')

      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    getUserDetails(setUser)
  }, [])
  useEffect(() => {
    if (!user) {
      return
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${user.id}`)
        const { data } = response.data

        const sortedOrders = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data.message || 'Something went wrong';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchData()
  }, [user])
  return (
    <div>
      <Navbar />
      <Offer />
      <FoodCard subTitle={'Explore your categories'} mainTitle={"What's your choice today?"} data={category} />
      <div className="category-border">
        <h3 className='orange-t'>Recently Ordered</h3>
        {/* <h4 className='green-t'>{subTitle ? subTitle : ''}</h4> */}
        <div className="category-container">
          {orders.length === 0 ? (
            <p className='text-center text-muted mt-5 mb-5 left-50'>No Items found</p>
          ) : (
            orders.map((item) => (
              item.items.map((order) => (
                <div
                  className="category-img-box"
                  onClick={() => navigate(`/item/${order.itemId}`)}
                  data-aos="zoom-in"
                  data-aos-easing="linear"
                  data-aos-duration="500"
                  data-aos-once="true"
                  key={order.itemId} // Using order.itemId as a unique key
                >
                  <div className="category-img-text">
                    <h5 className='m-0'>{order.name}</h5>
                  </div>
                  <img src={order.image} alt={order.name} className="category-img cursor-p" />
                </div>
              ))
            ))
          )}
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

export default Home
