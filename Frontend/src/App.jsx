import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart'
import MyOrders from './Pages/Orders'
import BookTable from './Pages/Table'
import About from './Pages/About'
import SideBar from './Components/Side Bar/SideBar'
import AdminDashbord from './Pages/AdminDashbord'
import AdminCategory from './Pages/AdminCategory'
import AdminOrders from './Pages/AdminOrders'
import AdminItems from './Pages/AdminItems'
import AdminAddItems from './Pages/AdminAddItems'
import AdminAddCategory from './Pages/AdminAddCategory'
import CategoryDetail from './Pages/CategoryDetail'
import UpdateAdminItem from './Pages/UpdateAdminItem'
import SignUp from './Pages/SignUp'
import { ProtectedRoute } from './AuthMiddleware'
import Profile from './Pages/Profile'
import ProfileInfo from './Pages/ProfileInfo'
import AdminLogin from './Pages/AdminLogin'
import { AdminProtectedRoute } from './AdminMiddleware'
import Search from './Pages/Search'
import Contact from './Pages/Contact'

function AdminLayout() {

  return (
    <SideBar>
      <Outlet />
    </SideBar>
  )
}

function App() {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} /> {/* Home page */}
          <Route path='/search' element={<Search />} /> {/* Search page */}
          <Route path='/profile' element={<Profile />} /> {/* User profile */}
          <Route path='/contact' element={<Contact />} /> {/* Contact page */}
          <Route path='/profileInfo' element={<ProfileInfo />} /> {/* Profile info edit */}
          <Route path='/item/:id' element={<ProductDetail />} /> {/* Product details */}
          <Route path='/cart' element={<Cart />} /> {/* Cart */}
          <Route path='/orders' element={<MyOrders />} /> {/* Orders */}
          <Route path='/table' element={<BookTable />} /> {/* Table booking */}
          <Route path='/about' element={<About />} /> {/* About page */}
          <Route path='/category/:name' element={<CategoryDetail />} /> {/* Category details */}
        </Route>

        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} /> {/* Admin login */}
        <Route element={<AdminProtectedRoute />}>
          <Route path='/admin/*' element={<AdminLayout />}>
            <Route index element={<AdminItems />} /> {/* Admin dashboard/items */}
            <Route path='category' element={<AdminCategory />} /> {/* Admin category management */}
            <Route path='orders' element={<AdminOrders />} /> {/* Admin orders management */}
            <Route path='items' element={<AdminItems />} /> {/* Admin items management */}
            <Route path='items/addItem' element={<AdminAddItems />} /> {/* Add new item */}
            <Route path='items/updateItem/:id' element={<UpdateAdminItem />} /> {/* Update item */}
            <Route path='category/addCategory' element={<AdminAddCategory />} /> {/* Add new category */}
          </Route>
        </Route>

      </Routes>
    </div>
  )
}

export default App
