import React from 'react'
import './BottomBar.css'
import { useNavigate } from 'react-router-dom'

function BottomBar() {
    const navigate=useNavigate()
    return (
        <div className=''>
            <div className="bottom-hieght">

            </div>
            <div className="bottom-bar">


                <div className="bottom-container bg-light pt-2">
                    <div className="bottom-box" onClick={()=>navigate('/')}>
                        <div className="cursor-p">
                            <i class="fa-solid fa-house bottom-icon"></i>
                            <p className='mb-0 bottom-text'>Home</p>
                        </div>
                    </div>
                    <div className="bottom-box"onClick={()=>navigate('/table')}>
                        <div className="">
                            <i class="fa-solid fa-table bottom-icon"></i>
                            <p className='mb-0 bottom-text'>Book a table</p>
                        </div>
                    </div>
                    <div className="bottom-box" onClick={()=>navigate('/cart')}>
                        <div className="">
                            <i class="fa-solid fa-cart-shopping bottom-icon"></i>
                            <p className='mb-0 bottom-text'>Cart</p>
                        </div>
                    </div>
                    <div className="bottom-box" onClick={()=>navigate('/profile')}>
                        <div className="">
                            <i class="fa-solid fa-user bottom-icon"></i>
                            <p className='mb-0 bottom-text'>Profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomBar
