import React, { useEffect } from 'react'
import './AboutInfo.css'
import img from '../../assets/about.png'
import img2 from '../../assets/support.png'
import Aos from 'aos'
import 'aos/dist/aos.css'


function AboutInfo() {
  useEffect(() => {
          Aos.init()
      }, [])
  return (
    <div>
      <div className="text-center">
        <h4 className='green-t'>About us</h4>
        <h2>Why Choose Us?</h2>
      </div>
      <div className="row cart-border pt-0">
        <div className="col-md-5" data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">
            <img src={img} className=' about-img' alt="" />
        </div>
        <div className="col-md-7">
            <div className='about-content'>
            <h2>Best Food in The Country</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
            <div className="about-card-container">
                <div className="about-card-box "data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">
                    <div className='d-flex '>
                    <i class="fa-solid fa-truck m-0 about-icon"></i>
                    <p className='m-0'>Free Delivery</p>
                    </div>
                </div>
                <div className="about-card-box "data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">
                    <div className='d-flex '>
                    <i class="fa-solid fa-dollar-sign about-icon"></i>
                    <p className='m-0'>Easy Payments</p>
                    </div>
                </div>
                <div className="about-card-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="800" data-aos-once="true">
                    <div className='d-flex '>
                        <img src={img2} className='icon-img ' alt="" />                    
                    <p className='m-0'>24/7 Service</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutInfo
