import React, { useEffect } from 'react'
import './Category.css'
import './Responsive.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import StarDisplay from '../Star/StarDisplay'
import { useNavigate } from 'react-router-dom'


function FoodCard({ mainTitle, subTitle, data }) {
    useEffect(() => {
        Aos.init()
    }, [])
    const navigate=useNavigate()
    return (
        <div>
            <div className="category-border ">
                <h3 className='orange-t'>{mainTitle ? mainTitle : ''}</h3>
                <h4 className='green-t'>{subTitle ? subTitle : ''}</h4>
                <div className="category-container">
                    {
                        data.length === 0 ? (
                            <p className='text-center text-muted ms-5 mt-5 mb-5'>No Categoies found</p>
                        ) : (
                            data.map((item) => (
                                <div className="category-img-box" onClick={()=>navigate(`/category/${item.name}`)} data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500" data-aos-once="true" key={item.id}>
                                    <div className="category-img-text">
                                        <h5 className='m-0'>{item.name}</h5>
                                        {item.value && <StarDisplay value={2.5} />} 
                                    </div>
                                    <img src={item.image} alt={item.name} className="category-img cursor-p" />
                                </div>
                            ))
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default FoodCard
