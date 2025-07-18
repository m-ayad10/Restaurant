import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AdminAddCategory() {
     const [image, setImage] = useState(null);
     const [name,setName]=useState('')
     const [imageFile,setImageFile]=useState(null)
     const SERVER_URL = import.meta.env.VITE_SERVER_URL;
     const [loading,setLoading]=useState(false)
     const navigate=useNavigate()
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
           setImageFile(file) 
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const handleSubmit=async(e)=>
      {
        e.preventDefault()
        setLoading(true)
        if (!name||!imageFile) {
            alert('Please provide category name and image')
            setLoading(false)
            return
        }
        try {
            const formData=new FormData()
            formData.append('name',name)
            formData.append('image',imageFile)
            console.log(imageFile);
            
          const response=await axios.post(`${SERVER_URL}/category`,formData,
            {
                headers:{
                    'Content-Type':'multipart/form-data'  
                },
            }
          )
            const {status,message,error}= response.data
            if (status) {
                alert(message)
                setImage(null)
                setImageFile(null)
                setName('')
                setLoading(false)
                navigate('/admin/category')
            } else {
                setLoading(false)
                alert(message)
            }
        } catch (error) {
            console.error("Upload failed:", error);
            setLoading(false)
            alert("Failed to upload category. Please try again.");
        }
      }

  return (
    <div>
          <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-sm-8 col-11">
          <h3 className="text-center mb-4">Create Item</h3>
          <form className="w-100" onSubmit={handleSubmit}>
            {/* Item Name */}
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Category Name</label>
              <input
                type="text"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                id="itemName"
                className="form-control shadow-none"
                placeholder="Enter Category name"
              />
            </div>

            
            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="imageUpload" className="form-label">Upload Image</label>
              <input
                type="file"
                id="imageUpload"
                className="form-control shadow-none"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Image Preview */}
            {image && (
              <div className="text-center mb-3">
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className="img-fluid uploaded-img rounded shadow-sm"
                />
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100 mt-2 shadow-none"> {loading?'Submiting...':"Submit"} </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminAddCategory
