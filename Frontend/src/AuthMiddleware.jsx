import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    useEffect(() => {
        const validate = async () => {
            try {
                const response = await axios.get('http://localhost:3000/verify-token', { withCredentials: true })
                const { status, message, user } = response.data
                setIsAuthenticated(status)
            } catch (error) {
                console.error(error)
                setIsAuthenticated(false)
            }
        }
        validate()
    }, [])
    if (isAuthenticated === null) {
        return <p className='text-center mt-5'>Loading</p>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};



export const getUserDetails = async (setUser) => {
    try {
        const response = await axios.get('http://localhost:3000/verify-token', { withCredentials: true })
        const { status, user } = response.data
        if (status) {
            setUser(user)
        }
    } catch (error) {
        console.error(error)
    }
}  

export const signOut=async()=>
{
    const navigate=useNavigate()
    try {
       const response= await axios.post('http://localhost:3000/logout',{},{withCredentials:true})
       if (response.data.status) {
        navigate('/login')
       }
    } catch (error) {
        console.error(error)
    }
}