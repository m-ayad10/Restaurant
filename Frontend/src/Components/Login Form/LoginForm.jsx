import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import img from "../../assets/login.jpg";
import "./LoginForm.css";
import "./Responsive.css";
import axios from "axios";
import { Alert, AlertWithTimer } from "../../SweetAlert";

function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
          const response=await axios.post(`${SERVER_URL}/login`,formData,{
            headers:{
              'Content-Type':'application/json'
            },withCredentials:true
          })
          const {status,message,jwtToken}=response.data
          if (status) {
            AlertWithTimer('success', 'Success', message,'Ok', 1000);
            navigate('/')
          } else {
            alert(message)
          }
        } catch (error) {
            const errorMessage=error.response?.data.message||'Something went wrong. Please try again.';
          Alert('error','Error',errorMessage,'Ok')
        }
    };

    return (
        <div className="form-container">
            <div className="form-back-img">
                <img src={img} className="w-100 login-form-img" alt="Login" />
            </div>
            <div className="form-container-box">
                <div className="p-3">
                    <h4>Sign In</h4>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            className="form-control shadow-none form-input"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control shadow-none form-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-form w-100 shadow-none">
                            Sign In
                        </button>
                    </form>
                    <p className="text-center">Don't have an account?</p>
                    <p
                        className="text-center cursor-p green-t"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
