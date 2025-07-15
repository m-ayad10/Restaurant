import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import BottomBar from "../Components/Bottom Bar/BottomBar";
import axios from "axios";
import { Alert, AlertWithTimer } from "../SweetAlert";
import NavbarBack from "../Components/Navbar Back/NavbarBack";

function ProfileInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/verify-token', { withCredentials: true });
        const { status, user } = response.data;
        if (status) {
          setUser(user);
          setName(user.fullName || "");
          setEmail(user.email || "");
          setPhone(user.phone || "");
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);


  const handleEditSave = async () => {
    if (isEditing) {
      // Save functionality
      setLoading(true);
      const returnEdit = () => {
        setLoading(false);
        setIsEditing(false);
      }
      if (!name || !email || !phone) {
        setLoading(false);
        Alert('error', 'Error', 'All fields are required.', 'Ok');
        return;
      }
      if (!name.trim()) {
      setLoading(false);
      Alert('error', 'Error', 'Full Name is required.', 'Ok');
      return;
    }
    if (name.length < 4) {
      setLoading(false);
      Alert('error', 'Error', 'Full Name must be at least 4 characters.', 'Ok');
      return;
    }
    if (name.length > 40) {
      setLoading(false);
      Alert('error', 'Error', 'Full Name cannot exceed 40 characters.', 'Ok');
      return;
    }
    if (!email.trim()) {
      setLoading(false);
      Alert('error', 'Error', 'Email is required.', 'Ok');
      return;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      Alert('error', 'Error', 'Invalid email format.', 'Ok');
      return;
    }
    if (!phone.trim()) {
      setLoading(false);
      Alert('error', 'Error', 'Phone number is required.', 'Ok');
      return;
    }
    // --- End Validation ---
     
      try {
        const response = await axios.patch(`http://localhost:3000/user/${user.id}`, { email, fullName: name, phone }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        const { message, data, status } = response.data
        if (status) {
          setUser(data)
          setName(data.fullName)
          setEmail(data.email)
          setPhone(user.phone)
          returnEdit()
          AlertWithTimer('success', 'Success', message, 'Ok', 1200);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || 'Something went wrong!';
        Alert('error', 'Error', errorMessage, 'Ok');
      }
    } else {
      // Enable edit mode
      setIsEditing(true);
    }
  };

  return (
    <div>
      <NavbarBack />
      <div className="row justify-content-center">
        <div className="col-md-7 col-sm-8 col-11">
          <h3>Profile</h3>
          <form className="w-100">
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="fullName"
                className="form-control shadow-none"
                placeholder="Enter full name"
                disabled={!isEditing}
                required
              />
            </div>

            {/* Email & Phone Fields */}
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="form-control shadow-none"
                  placeholder="Enter email"
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  className="form-control shadow-none"
                  placeholder="Enter phone number"
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            {/* Edit/Save Button */}
            <div className=" mt-3">
              <button
                type="button"
                className={`btn ${isEditing ? "btn-primary" : "btn-secondary"} shadow-none`}
                onClick={handleEditSave}
                disabled={loading}
              >
                {loading ? "Saving..." : isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default ProfileInfo;
