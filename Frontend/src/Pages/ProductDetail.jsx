import React, { useEffect, useState } from 'react'
import ProductView from '../Components/ProductView/ProductView'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Alert } from '../SweetAlert'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import NavbarBack from '../Components/Navbar Back/NavbarBack'

function ProductDetail() {
  const { id } = useParams()
  const [data, setData] = useState({})
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/item/${id}`)
        setData(response.data.data)
      } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data.message || 'Something went wrong';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <NavbarBack/>
      <ProductView data={data} setData={setData} />
      <BottomBar />
    </div>
  )
}

export default ProductDetail
