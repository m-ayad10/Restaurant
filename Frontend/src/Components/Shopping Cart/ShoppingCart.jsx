import React, { useEffect, useState } from 'react'
import './ShoppingCart.css'
import './Responsive.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Modal from 'react-modal';
import axios from 'axios'
import { getUserDetails } from '../../AuthMiddleware'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertWithTimer } from '../../SweetAlert'


function ShoppingCart({ setCart, cart }) {
    const [extras, setExtras] = useState([])
    const [user, setUser] = useState()
    const navigate = useNavigate()
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
    });
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/items/Extras`);
                setExtras(response.data.data);
            } catch (error) {
                console.error("Error fetching extras:", error);
                const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
                Alert('error', 'Error', errorMessage, 'Ok')
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        getUserDetails(setUser)
    }, [])

    const addCount = async (itemId) => {
        const formData = new FormData()
        formData.append('userId', cart.userId)
        formData.append('itemId', itemId)
        console.log(formData);

        try {
            const response = await axios.patch(`${SERVER_URL}/cart/addCount`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { status, data, message } = response.data
            if (status) {
                setCart(data)
            } else {
                alert(message)
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong!';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }
    const decreaseCount = async (itemId) => {
        const formData = new FormData()
        formData.append('userId', cart.userId)
        formData.append('itemId', itemId)
        try {
            const response = await axios.patch(`${SERVER_URL}/cart/decreaseCount`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { status, data, message } = response.data
            if (status) {
                setCart(data)
            } else {
                alert(message)
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong!';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }
    useEffect(() => {
        Aos.init()
    }, [])

    const addToCart = async (item) => {
        const formData = new FormData()
        const userID = user.id
        let array = []
        array.push({ name: item.name, itemId: item._id, image: item.image, quantity: 1, price: item.price })
        formData.append('userId', userID);
        
        formData.append('items', JSON.stringify(array));


        try {
            const response = await axios.post(`${SERVER_URL}/cart`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const { status, data, message } = response.data
            if (status) {
                setCart(data);
            }
            else {
                alert(message)
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong!';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }

    const handleDeleteCart = async (itemId) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/cart`, {
                params: { userId: cart.userId, itemId }
            })
            const { status, data, message } = response.data
            if (!status) {
                return alert(message)
            }
            setCart(data)
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Failed to delete item from cart';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }

    const [popup, setPopup] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddress = (e) => {
        e.preventDefault();
        if (cart.totalPrice === 0 || cart.items.length === 0) {
            Alert('error', 'Empty Cart', 'Add items before ordering.', 'Ok');
            return;
        }
        // Check if any required field is empty
        for (let key in formData) {
            if (!formData[key]) {
                alert(`Please fill in the ${key.replace(/([A-Z])/g, " $1")} field.`);
                return;
            }
        }
        handlePayment()
    };

    const handlePayment = async () => {
        try {
            console.log(cart);
            const response = await axios.post(`${SERVER_URL}/create-razorpay-order`, { totalPrice: cart.totalPrice })
            const { amount, currency, key, razorpayOrderId } = response.data
            const options = {
                key,
                amount,
                currency,
                order_id: razorpayOrderId,
                name: "Fashion Store",
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    // Send everything to backend to verify and save order
                    const verify = await axios.post(`${SERVER_URL}/verify-payment`, {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                    });
                    const { status } = verify.data
                    console.log('hbvv');

                    console.log(verify);

                    if (status) {
                        handleOrder()
                    }
                },
                prefill: {
                    name: formData.firstName + " " + formData.lastName,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            const errorMessage = error.response?.data.message || error.message || 'Something went wrong. Please try again.';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    }

    const handleOrder = async () => {
        try {
            const address = `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}, Phone: ${formData.phone}`;
            const response = await axios.post(`${SERVER_URL}/orders`, { userId: user.id, address });

            // Extract response data
            const { status, message } = response.data;

            if (status) {
                AlertWithTimer('success', 'Order Placed', message, 'Ok', 1200);
                setCart({});                         // clear client-side cart
                setTimeout(() => navigate('/orders'), 1200);
            } else {
                alert(`Failed to place order: ${message}`);
            }
        } catch (error) {
            const errorMessage = error.response?.data.message || 'Something went wrong. Please try again.';
            Alert('error', 'Error', errorMessage, 'Ok')
        }
    };


    return (
        <div>
            <div className="bg-lighter">
                <div className="cart-container cart-border">
                    {
                        cart.items?.length > 0 ? (
                            cart.items.map((item) =>
                            (
                                <div className="cart-box">
                                    <div className="cart-img-box">
                                        <img className='cart-img' src={item.image} alt="" />
                                    </div>
                                    <div className="cart-content">
                                        <h4>{item.name}</h4>
                                        <h6 className='green-t'>₹ {item.price}</h6>
                                        <div className="d-flex">
                                            <button className='btn btn-food-detail shadow-none' onClick={() => addCount(item.itemId)}>+</button>
                                            <h5 className='p-2'>{item.quantity}</h5>
                                            <button className='btn btn-food-detail shadow-none' onClick={() => decreaseCount(item.itemId)}>-</button>
                                        </div>
                                        <h6 className="text-danger cursor-p" onClick={() => handleDeleteCart(item.itemId)}>Delete</h6>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center mt-5 mb-5">No items in cart</p>
                        )
                    }



                </div>
            </div>
            <div className="d-flex justify-content-center ">
                <h4>Would you like add some?</h4>
            </div>
            <div className="row d-flex justify-content-center cart-border">
                <div className="col-md-7">
                    <div className="food-detail-addItem ">
                        {
                            extras.length > 0 ? (
                                extras.map((item) => (
                                    <div className="detail-addItem-img-box" data-aos="zoom-in" onClick={() => addToCart(item)} data-aos-easing="linear" data-aos-duration="500" data-aos-once="true">
                                        <img className='detail-addItem-img cursor-p' src={item.image} alt="" />
                                    </div>
                                ))

                            ) : (
                                <p className="m-5">No items</p>
                            )
                        }



                    </div>
                </div>
            </div>
            <hr className='m-0' />
            <div className="d-flex justify-content-end cart-border">
                <div>
                    <h4>Total :₹ {cart ? cart.totalPrice : 0}</h4>
                    <button className='btn btn-payment shadow-none' onClick={() => {
                        if (cart.totalPrice === 0 || cart.items.length === 0) {
                            Alert('error', 'Empty Cart', 'Add items before ordering.', 'Ok');
                            return;
                        }
                        setPopup(true)
                    }}>Proceed to pay</button>
                    <Modal isOpen={popup} style={customStyles}>
                        <div className="d-flex justify-content-end">
                            <i className="fa-solid fa-x cursor-p" onClick={() => setPopup(false)}></i>
                        </div>

                        <form onSubmit={handleAddress} className="address-form">
                            <h3>Delivery Information</h3>

                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    className="delivery-input"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    className="delivery-input"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-100 delivery-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    className="w-100 delivery-input"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    className="delivery-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    className="delivery-input"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    className="delivery-input"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    className="delivery-input"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-address shadow-none">
                                    Continue to Payment
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
