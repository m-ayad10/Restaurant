import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SearchForm from '../Components/Search/SearchForm'
import Categories from '../Components/Categories/Categories'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Alert } from '../SweetAlert'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function CategoryDetail() {
  const { name } = useParams()
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${name}`)
        setData(response.data.data)
        setItems(response.data.data)
      } catch (error) {
        console.error(error)
        const errorMessage = error.response?.data.message || 'Failed to delete item from cart';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <Navbar />
      <SearchForm data={data} setData={setData} items={items} searchText={searchText} setSearchText={setSearchText} />
      <Categories data={data || []} />
      <BottomBar />
    </div>
  )
}

export default CategoryDetail
