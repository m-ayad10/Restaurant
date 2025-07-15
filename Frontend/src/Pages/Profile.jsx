import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import BottomBar from '../Components/Bottom Bar/BottomBar'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import axios from 'axios'
import { getUserDetails } from '../AuthMiddleware'
import { Alert } from '../SweetAlert'

function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    useEffect(() => {
        getUserDetails(setUser)

    }, [])

    const signOut = async () => {
        try {
            const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
            if (response.data.status) {
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
            const errorMessage = error.response?.data.message || 'Something went wrong';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='cart-border'>
                <div className="name-container " >
                    <div className="name-box">
                        <div className='profile-initial'>
                            <h4 className='m-0'>{user?.fullName[0]}</h4>
                        </div>
                        <div className='profile-name'>
                            <div>
                                <p className="m-0">{user?.fullName}</p>
                                <p className='m-0'>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="profile-container cursor-p bg-lighter" onClick={() => navigate('/profileInfo')}>
                        <div className="profile-box ms-2">
                            <i class="fa-solid fa-pencil"></i>
                            <h6>Edit Profile Info</h6>
                        </div>
                        <i class="fa-solid fa-arrow-right me-3"></i>
                    </div>
                    <div className="profile-container cursor-p bg-lighter " onClick={() => navigate('/orders')}>
                        <div className="profile-box ms-2">
                            <i class="fa-solid fa-bag-shopping"></i>
                            <h6>My Orders</h6>
                        </div>
                        <i class="fa-solid fa-arrow-right me-3"></i>
                    </div>
                    <div className="profile-container cursor-p bg-lighter " onClick={() => navigate('/about')}>
                        <div className="profile-box ms-2">
                            <i class="fa-solid fa-info-circle"></i>
                            <h6>About</h6>
                        </div>
                        <i class="fa-solid fa-arrow-right me-3"></i>
                    </div>
                    <div className="profile-container cursor-p bg-lighter "onClick={() => navigate('/contact')}>
                        <div className="profile-box ms-2">
                            <i class="fa-solid fa-phone"></i>
                            <h6>Contact</h6>
                        </div>
                        <i class="fa-solid fa-arrow-right me-3"></i>
                    </div>
                    <div className="profile-container cursor-p bg-lighter" onClick={() => signOut()}>
                        <div className="profile-box ms-2">
                            <i class="fa-solid fa-sign-out-alt" style={{ color: 'red' }}></i>
                            <h6 className='text-danger' >Logout</h6>
                        </div>
                        <i class="fa-solid fa-arrow-right me-3"></i>
                    </div>
                </div>
            </div>
            <BottomBar />
        </div>
    )
}

export default Profile
