import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getUserDetails } from '../../AuthMiddleware'
function NavbarBack() {
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
        <div>
            <nav class="navbar navbar-expand-md navbar-light pb-0 mb-0 ">
                <div class="container-fluid">
                    <p class="navbar-brand cursor-p mb-0 d-flex" >
                        <i className="fa-solid fa-arrow-left align-self-center me-3" onClick={() => navigate(-1)}></i>
                        <h2 className='nav-title'>Arabian Mexico</h2>
                    </p>


                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav m-auto ">
                            <li class="nav-item ">
                                <p class="nav-link active pt-2 cursor-p" aria-current="page" onClick={() => navigate('/')}>Home</p>
                            </li>
                            <li class="nav-item">
                                <p class="nav-link active pt-2 cursor-p " aria-current="page" onClick={() => navigate('/table')} >Book a Table</p>
                            </li>
                            <li class="nav-item">
                                <p class="nav-link active pt-2  cursor-p" aria-current="page" onClick={() => navigate('/about')}>About </p>
                            </li>
                            <li class="nav-item">
                                <p class="nav-link active pt-2 cursor-p" aria-current="page" onClick={() => navigate('/contact')} >Contact</p>
                            </li>

                        </ul>

                    </div>
                    <div className="d-flex align-items-center nav-right ">
                        <p className="mb-0 navbar-hide cursor-p" onClick={() => navigate('/cart')}><i class="fa-solid fa-cart-shopping nav-icon"></i></p>
                        <p className="mb-0  ">
                            <ul class="navbar-nav ms-auto navbar-hide">
                                <li class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <div className='loged-initial'>
                                            <p>{user?.fullName[0]}</p>
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-loged" aria-labelledby="navbarDropdownMenuLink">
                                        <li>
                                            <button className="dropdown-item" onClick={() => navigate('/profileInfo')}>
                                                <i className="fa-solid fa-user"></i> My Profile
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={() => navigate('/orders')}>
                                                <i className="fa-solid fa-bag-shopping"></i> Orders
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={() => signOut()}>
                                                <i className="fa-solid fa-right-from-bracket"></i> Logout
                                            </button>
                                        </li>
                                    </ul>

                                </li>
                            </ul>
                        </p>


                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavbarBack