import React, { useState } from "react";
import img from "../../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertWithTimer } from "../../SweetAlert";

function SignupForm() {
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate()
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post(`${SERVER_URL}/signup`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { status, message, error } = response.data
            if (status) {
                AlertWithTimer('success', 'Success', message, 'Ok', 1500);
                navigate('/login')
            } else {
                alert(message)
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    };

    return (
        <div className="form-container">
            <div className="form-back-img">
                <img src={img} className="w-100 login-form-img" alt="Signup" />
            </div>
            <div className="form-container-box">
                <div className="p-3">
                    <h4>Sign Up</h4>
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
                            type="text"
                            name="fullName"
                            className="form-control shadow-none form-input"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            className="form-control shadow-none form-input"
                            placeholder="Phone"
                            value={formData.phone}
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
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control shadow-none form-input"
                            placeholder="Repeat Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-form w-100 shadow-none">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center">Already have an account?</p>
                    <p className="text-center cursor-p green-t" onClick={() => navigate('/login')} >Sign In</p>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
