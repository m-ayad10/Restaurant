import React, { useEffect, useState } from 'react'
import './style.css'
import './Responsive.css'
import axios from 'axios'
import { data, useNavigate } from 'react-router-dom'
import { Alert } from '../../SweetAlert'

function AdminCategories() {
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/category')
        setCategory(response.data.data)
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
        Alert('error', 'Error', errorMessage, 'Ok')
      }
    }
    fetchData()
  }, [])
  return (
    <div>
      <div className="d-flex justify-content-between p-1">
        <h3>Categories</h3>
        <button className="btn btn-primary shadow-none" onClick={() => navigate('/admin/category/addCategory')}>Add +</button>
      </div>
      <hr className="100 m-0" />
      <div className="addItem-container">
        {category.length > 0 ? (
          category.map((data, index) => (
            <div key={data._id || index} className="addItem-box bg-light">
              <div className="addItem-img-box">
                <img src={data.image} alt={data.name} className="addItem-img" />
              </div>
              <div className="ps-3 pe-2 pb-1">
                <p className="addItem-name m-0">{data.name}</p>
                <div className="d-flex justify-content-between">
                  <button className="btn shadow-none">
                    <i className="fa-solid fa-pencil" style={{ color: 'silver' }}></i> Edit
                  </button>
                  <button className="btn shadow-none">
                    <i className="fa-solid fa-trash" style={{ color: 'red' }}></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center m-4">No categories found.</p>
        )}
      </div>
    </div>
  )
}

export default AdminCategories
