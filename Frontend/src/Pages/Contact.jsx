import React from 'react';
import './Contact.css'; // Make sure this path is correct
import BottomBar from '../Components/Bottom Bar/BottomBar';
import NavbarBack from '../Components/Navbar Back/NavbarBack';

function Contact() {
    return (
        <div>
            <NavbarBack />
            <div className="contact-container">
                <div className="contact-card">
                    {/* Left Section */}
                    <div className="contact-info">
                        <h2>Contact Us</h2>
                        <p>
                            Need to get in touch with us? Fill out the form and we'll get back to you as soon as possible.
                        </p>
                        <ul>
                            <li><strong>Email:</strong> support@example.com</li>
                            <li><strong>Phone:</strong> +1 234 567 890</li>
                            <li><strong>Address:</strong> 123 Fashion St, New York, USA</li>
                        </ul>
                    </div>

                    {/* Right Section - Form */}
                    <form className="contact-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" required />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="4" required></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
            <BottomBar />
        </div>
    );
}

export default Contact;
