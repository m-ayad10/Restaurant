import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import SearchForm from '../Components/Search/SearchForm'
import Categories from '../Components/Categories/Categories'
import { SearchQueryContext } from '../Context Api/searchquery'
import axios from 'axios'
import { Alert } from '../SweetAlert'
import BottomBar from '../Components/Bottom Bar/BottomBar'

function Search() {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext)
  const [data, setData] = useState([])
  const [items, setItems] = useState([])
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/items`)
        setData(response.data.data)
        setItems(response.data.data)
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
      <Navbar />
      <SearchForm data={data} setData={setData} items={items} searchText={searchQuery} setSearchText={setSearchQuery} />
      <Categories data={data || []} />
      <BottomBar />
    </div>
  )
}

export default Search
