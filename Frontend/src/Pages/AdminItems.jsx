import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarName from '../Components/Navbar name/NavbarName'

function AdminItems() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items")
        setData(response.data.data)
      } catch (error) {
        console.error("Error fetching items:", error);
        const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchData()
  }, [])

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/item/${itemId}`)
      const {data,message,status}=response.data
      if (status) {
        setData(data)
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
      Alert('error', 'Error', errorMessage, 'Ok')
    }
  }

  return (
    <div>
      <NavbarName />
      <div className="d-flex justify-content-between  ">
        <h3 className=' p-1 pt-0 mt-0'>Items</h3>
        <button className="btn btn-primary shadow-none mb-1" onClick={() => navigate('/admin/items/addItem')}>Add +</button>
      </div>
      <hr className="100 m-0" />
      <div className="addItem-container">
        {data.length === 0 ? (
          <p className="text-center text-muted mt-4 mb-2">No items found</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="addItem-box bg-light">
              <div className="addItem-img-box">
                <img src={item.image} alt={item.name} className="addItem-img" />
              </div>
              <div className="ps-3 pe-2 pb-1">
                <p className="addItem-name m-0">{item.name}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn shadow-none" onClick={() => navigate(`/admin/items/updateItem/${item._id}`)}>
                    <i className="fa-solid fa-pencil" style={{ color: 'silver' }} ></i> Edit
                  </button>
                  <button className="btn shadow-none" onClick={()=>handleDeleteItem(item._id)}>
                    <i className="fa-solid fa-trash" style={{ color: 'red' }} ></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminItems
