import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


export const AdminProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    useEffect(() => {
        const validate = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin/verify-token`, { withCredentials: true })
                const { status, message, admin} = response.data
                setIsAuthenticated(status)
            } catch (error) {
                console.error(error)
                setIsAuthenticated(false)
            }
        }
        validate()
    }, [])
    if (isAuthenticated === null) {
        return <p className='text-center mt-5'>Loading...</p>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};



export const getAdminDetails = async (setAdmin) => {
    try {
        const response = await axios.get(`${SERVER_URL}/admin/verify-token`, { withCredentials: true })
        const { status, admin } = response.data
        if (status) {
            setAdmin(admin)
        }
    } catch (error) {
        console.error(error)
    }
}  
