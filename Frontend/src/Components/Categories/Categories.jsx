import React, { useEffect } from 'react'
import './Category.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import StarDisplay from '../Star/StarDisplay'
import { useNavigate } from 'react-router-dom'


function Categories({ mainTitle, subTitle, data }) {
    const navigate=useNavigate()
    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <div>
            <div className="category-border ">
                <h3 className='orange-t'>{mainTitle ? mainTitle : ''}</h3>
                <h4 className='green-t'>{subTitle ? subTitle : ''}</h4>
                <div className="">


                    <div className="category-display-container ">
                    {data?.length === 0 ? (
                            <p className="text-center text-muted mt-5 left-50">No Items found</p>
                        ) : (
                            data.map((item, index) => (
                                <div key={index} className="category-display-img-box cursor-p" onClick={()=>navigate(`/item/${item._id}`)} data-aos-easing="linear" data-aos-duration="600" data-aos-once="true" data-aos="zoom-in">
                                    <div className="category-img-text">
                                        <h5 className='m-0'>{item.name}</h5>
                                        <StarDisplay value={item.ratings} />
                                    </div>
                                    <img src={item.image} alt={item.name} className="category-img" />
                                </div>
                            ))
                        )}
                       {/* <div className="category-display-img-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500" data-aos-once="true">
                            <div className="category-img-text">
                                <h5 className='m-0'>Salad</h5>
                                <StarDisplay value={2.5} />
                            </div>
                            <img src="https://th.bing.com/th/id/OIP.fT0aY-nmZmYnPBady7fxpAHaKS?pid=ImgDet&w=178&h=247&c=7&dpr=1.5" alt="" className="category-img " />
                        </div>
                        <div className="category-display-img-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500">
                            <div className="category-img-text">
                                <h5 className='m-0'>Salad</h5>
                                <StarDisplay value={2.5} />
                            </div>
                            <img src="https://th.bing.com/th/id/OIP.fT0aY-nmZmYnPBady7fxpAHaKS?pid=ImgDet&w=178&h=247&c=7&dpr=1.5" alt="" className="category-img " />
                        </div>
                        <div className="category-display-img-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500" data-aos-once="true">
                            <div className="category-img-text">
                                <h5 className='m-0'>Salad</h5>
                                <StarDisplay value={2.5} />
                            </div>
                            <img src="https://th.bing.com/th/id/OIP.fT0aY-nmZmYnPBady7fxpAHaKS?pid=ImgDet&w=178&h=247&c=7&dpr=1.5" alt="" className="category-img " />
                        </div>
                        <div className="category-display-img-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500">
                            <div className="category-img-text">
                                <h5 className='m-0'>Salad</h5>
                                <StarDisplay value={2.5} />
                            </div>
                            <img src="https://th.bing.com/th/id/OIP.fT0aY-nmZmYnPBady7fxpAHaKS?pid=ImgDet&w=178&h=247&c=7&dpr=1.5" alt="" className="category-img " />
                        </div>
                        <div className="category-display-img-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500" data-aos-once="true">
                            <div className="category-img-text">
                                <h5 className='m-0'>Salad</h5>
                                <StarDisplay value={2.5} />
                            </div>
                            <img src="https://th.bing.com/th/id/OIP.fT0aY-nmZmYnPBady7fxpAHaKS?pid=ImgDet&w=178&h=247&c=7&dpr=1.5" alt="" className="category-img " />
                        </div>
                        <div className="category-display-img-box " data-aos="zoom-in" data-aos-easing="linear" data-aos-duration="500">
                            <div className="category-img-text">
                                <h5 className='m-0'>Salad</h5>
                                <StarDisplay value={2.5} />
                            </div>
                            <img src="https://th.bing.com/th/id/OIP.fT0aY-nmZmYnPBady7fxpAHaKS?pid=ImgDet&w=178&h=247&c=7&dpr=1.5" alt="" className="category-img " />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
