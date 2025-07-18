import React, { useEffect, useState } from 'react'
import StarDisplay from '../Star/StarDisplay'
import Modal from 'react-modal';
import StarRating from '../Star/StarRating';
import './styles.css'
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AlertWithTimer } from '../../SweetAlert';

function Review({ data, setData }) {
    const [modalWidth, setModalWidth] = useState("90%");
    const [quantity, setQuantity] = useState(1)
    const [extras, setExtras] = useState([])
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [rating, setRating] = useState(0)
    const [datas, setDatas] = useState({
        totalPrice: 0,
        userId: "", // Will be set later
        formData: [] // Initialize as an empty array
    });
    const [userReeview, setUserReview] = useState({ rating: 0, comment: "", userId: '', username: '' });
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;



    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/verify-token`, { withCredentials: true })
                const { status, user: fetchedUser } = response.data
                if (status) {
                    setUser(fetchedUser)
                    setUserReview((prev) => ({ ...prev, userId: fetchedUser.id, username: fetchedUser.fullName }))
                }
            } catch (error) {
                console.error(error)
            }
        }
        getUserDetails()

    }, [])
    useEffect(() => {
        if (!user || !user.id || !data || !data._id) return; // ✅ Ensure itemId exists
        const fetchUserReview = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/review/${data._id}/${user.id}`);

                if (response.data.status) {
                    setUserReview(response.data.data);
                    setRating(response.data.data.rating);
                }
            } catch (error) {
                console.error("Error fetching user review:", error);
            }
        };
        fetchUserReview();
    }, [data, user]);


    const handleReviewSubmit = async () => {
        const updatedReview = { ...userReeview, rating, userId: user.id, username: user.fullName };

        try {
            const response = await axios.patch(`${SERVER_URL}/review/${data._id}`, updatedReview)
            const { status, data: updatedData, message } = response.data
            if (status) {

                setData(updatedData)
                setPopup(false)
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong!';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/items/Extras`);
                setExtras(response.data.data);
            } catch (error) {
                console.error("Error fetching extras:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!data) {
            console.error("data is undefined or null");
            return;
        }

        // ✅ Add new `data` directly without checking previous items
        setDatas((prev) => ({
            ...prev,
            formData: [{
                itemId: data._id,
                name: data.name,
                image: data.image,
                quantity: 1,
                price: data.price
            }]
        }));
    }, [data]);




    useEffect(() => {
        if (!datas.formData || !Array.isArray(datas.formData)) {
            console.error("formData is undefined or not an array", datas.formData);
            return;
        }

        const newTotal = datas.formData.reduce((sum, item) => {
            return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
        }, 0);

        setDatas((prev) => ({
            ...prev,
            totalPrice: newTotal
        }));

    }, [datas.formData]);


    // 🔹 **Update Item Quantity**
    const updateQuantity = (itemId, newQuantity) => {
        setDatas((prev) => ({
            ...prev,
            formData: prev.formData.map((item) =>
                item.itemId === itemId ? { ...item, quantity: newQuantity } : item
            )
        }));
    };

    const updateFormdata = (item) => {
        setDatas((prev) => {
            const updatedFormData = prev.formData.some((dataItem) => dataItem.itemId === item._id)
                ? prev.formData.filter((dataItem) => dataItem.itemId !== item._id) // Remove only the selected item
                : [...prev.formData, {
                    itemId: item._id,
                    name: item.name,
                    image: item.image,
                    quantity: 1,
                    price: item.price
                }]; // Add the new item without affecting others

            return {
                ...prev,
                formData: updatedFormData, // Update only the `formData` while keeping other data intact
            };
        });
    };

    useEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth < 480) {
                setModalWidth("95%");
            } else if (window.innerWidth < 768) {
                setModalWidth("85%");
            } else if (window.innerWidth < 900) {
                setModalWidth("70%");
            } else if (window.innerWidth < 1200) {
                setModalWidth("60%");
            } else {
                setModalWidth("50%");
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            width: modalWidth,
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const addToCart = async () => {
        const formData = new FormData()
        const userID = user.id
        const array = datas.formData
        formData.append('userId', userID);  // ✅ Corrected
        formData.append('items', JSON.stringify(array));  // ✅ Convert array to JSON


        try {
            const response = await axios.post(`${SERVER_URL}/cart`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const { status, data, message } = response.data
            if (status) {
                AlertWithTimer('success', 'Added to Cart', message, 'Ok', 1500);
                setTimeout(() => navigate('/cart'), 1500);
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong!';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }


    const [popup, setPopup] = useState(false)

    return (
        <div>
            <div className="food-detail-container">
                <h3 className='food-detail-name'>Ingredients</h3>
                <p className="food-details">
                    {data.description}
                </p>
                <div className="food-quantity-container">
                    <div>
                        <h4>Quantity:</h4>
                        <div className="d-flex">
                            <button className='btn btn-food-detail shadow-none' onClick={() => {
                                setQuantity(quantity + 1)
                                const newQuantity = quantity + 1
                                updateQuantity(data._id, newQuantity)
                            }
                            }>+</button>
                            <h5 className='p-2'>{quantity}</h5>
                            <button className='btn btn-food-detail shadow-none' onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1)
                                    const newQuantity = quantity - 1
                                    updateQuantity(data._id, newQuantity)
                                }
                            }}>-</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <h4>Would you like add some?</h4>
                </div>
                <div className="food-detail-addItem">
                    {
                        extras.map((data) => {
                            const isSelected = datas.formData.some((item) => item.itemId === data._id);

                            return (
                                <div
                                    className={`detail-addItem-img-box `}
                                    data-aos="zoom-in"
                                    data-aos-easing="linear"
                                    data-aos-duration="1000"
                                    data-aos-once="true"
                                    key={data._id} // ✅ Add a unique key
                                >
                                    <img className={`detail-addItem-img cursor-p ${isSelected ? "select-img" : ""}`} onClick={() => updateFormdata(data)} src={data.image} alt="" />
                                </div>
                            );
                        })
                    }
                </div>
                <div className="food-quantity-container p-3">
                    <h3 className="food-detail-price green-t">₹ {datas.totalPrice}</h3>
                </div>
                <div className="">
                    <button className='btn btn-addToCart shadow-none' onClick={addToCart}>Add to Cart</button>
                </div>
                <div className="">
                    <h4 className='mb-0'>Reviews & Ratings</h4>

                    <div className="row">
                        <div className="">
                            <div className="text-center">
                                <h2 className='m-0'>{data.ratings}</h2>
                                <div className='d-flex justify-content-center '>
                                    <StarDisplay value={data.ratings} big={true} />
                                </div>
                                <p className='text-muted m-0'>based on {data.reviews?.length || 0} reviews</p>
                            </div>
                        </div>
                        <hr className="w-100 m-0 mb-2" />
                        {
                            data.reviews?.length > 0 ? (
                                data.reviews.map((review) => (
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <div className='d-flex'>
                                                <div className='review-initial'>
                                                    <h4 className='m-0'>{review.username[0]}</h4>
                                                </div>
                                                <div className='ms-4'>
                                                    <p className='m-0'>{review.username}</p>
                                                    <StarDisplay value={review.rating} />
                                                </div>
                                            </div>
                                            <p className="m-0 text-muted">  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}                                        </p>
                                        </div>
                                        <p className='text-muted mb-2'>{review.comment}</p>
                                        <hr className="w-100 m-0 mb-3" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center  mt-5 mb-5">No reviews</p>
                            )
                        }


                        {/* <p className="text-center text-primary pt-3 pb-0 cursor-p">show more</p> */}
                    </div>
                    <button className='btn btn-primary mt-0 w-100 shadow-none' onClick={() => setPopup(true)}>Write a review</button>

                    <div className="">
                        <Modal
                            isOpen={popup}
                            style={customStyles}
                        >
                            <div className="d-flex justify-content-end">
                                <i class="fa-solid fa-x cursor-p" onClick={() => setPopup(false)}> </i>
                            </div>
                            <form action="" className='address-form'>
                                <h3 className='text-center'>Rate & Review</h3>
                                <label htmlFor="" className=''>Rating</label>
                                <div className="d-flex justifycontent-center">
                                    <StarRating big={true} setRating={setRating} rating={rating} />
                                </div>
                                <label htmlFor="">Comment</label>
                                <textarea name="" id="" value={userReeview ? userReeview.comment : ''} onChange={(e) => setUserReview({ ...userReeview, comment: e.target.value })} className='w-100 mt-1 ps-2 review-textarea' rows={4}></textarea>


                            </form>
                            <button className="btn btn-danger m-1 shadow-none" >delete</button>
                            <div className="d-flex justify-content-end">
                                <button className='btn btn-primary w-100 shadow-none' onClick={handleReviewSubmit}  >Submit</button>
                            </div>
                        </Modal>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Review
