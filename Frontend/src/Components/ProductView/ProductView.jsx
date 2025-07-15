import React, { useEffect, useState } from 'react'
import './ProductView.css'
import './Responsive.css'
import StarDisplay from '../Star/StarDisplay'
import Aos from 'aos'
import 'aos/dist/aos.css'
import StarRating from '../Star/StarRating'
import Review from '../Review and Rating/Review'

function ProductView({data,setData}) {
    const [rating] = useState(4);

    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <div>
            <div className="row p-2">
                <div className="col-md-5 food-img-cont">
                    <div className='food-img-cont' data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="1000" data-aos-once="true">
                        <img src={data.image} className='w-100' alt="" />
                        <div className="category-img-text">
                            <h3 className='m-0'>{data.name}</h3>
                            <StarDisplay value={data.ratings} />
                        </div>
                    </div>

                </div>
                <div className="col-md-7 ">
                    <Review data={data} setData={setData}/>
                </div>
            </div>
        </div>
    )
}

export default ProductView
