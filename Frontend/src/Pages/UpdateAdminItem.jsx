import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '../SweetAlert';

function UpdateAdminItem() {
  const [image, setImage] = useState(null);
  const [categ, setCateg] = useState([])
  const [name, setName] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [price, setPrice] = useState()
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/category`)
        setCateg(response.data.data)
      } catch (error) {
        console.log(error);

      }
    }
    fetchData()
  }, [])
  // Fetch item details
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const url=`${SERVER_URL}/item/${id}`   
             
        const response = await axios.get(url);

        const { name, price, category, description, image } = response.data.data;
        
        setName(name);
        setPrice(price);
        setCategory(category);
        setDescription(description);
        setImage(image);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    if (!id) {
      return
    }
    fetchItemDetails();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    if (!name || !description || !category || !price ) {
      alert('Please fill all the fields and upload an image.');
      setLoading(false)
      return;
    }
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('price', price)
      if (imageFile) {
        formData.append('image', imageFile)
      }

      console.log(name);
      
      const response = await axios.patch(`${SERVER_URL}/item/${id}`, formData);

      const { status, message, error } = response.data
      if (status) {
        navigate('/admin/items')
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setImage(null);
        setImageFile(null);
        alert(message);
        setLoading(false);
      } else {
        alert(message)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
      Alert('error', 'Error', errorMessage, 'Ok')
    }

  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-sm-8 col-11">
          <h3 className="text-center mb-4">Create Item</h3>
          <form className="w-100" onSubmit={handleSubmit}>
            {/* Item Name */}
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="itemName"
                className="form-control shadow-none"
                placeholder="Enter item name"
              />
            </div>

            {/* Price & Category */}
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  className="form-control shadow-none"
                  placeholder="Enter price"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="category" className="form-label">Category</label>
                <select id="category" className="form-select shadow-none" value={category}

                  onChange={(e) => setCategory(e.target.value)}>
                  <option value={''} disabled>{'Select'}</option>
                  {
                    categ.map((data) => {
                      return (
                        <option value={data.name}>{data.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="form-control shadow-none"
                rows={4}
                placeholder="Enter item description"
              ></textarea>
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
            <button type="submit" className="btn btn-primary w-100 mt-2 shadow-none mb-3">{loading ? 'Submiting...' : "Submit"} </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAdminItem;
