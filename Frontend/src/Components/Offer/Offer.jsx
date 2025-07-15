import React, { useContext } from 'react'
import './Offer.css'
import img from '../../assets/offer.jpg'
import { SearchQueryContext } from '../../Context Api/searchquery'
import { useNavigate } from 'react-router-dom'

function Offer() {
    const {searchQuery,setSearchQuery}=useContext(SearchQueryContext)
    const navigate=useNavigate()
    const handleSearch=(e)=>
    {
        if (e.key==='Enter') {
            navigate('/search')
        }
    }
    return (
        <div>
            <div className="search-form p-3">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="search" className='w-100 ' value={searchQuery} onKeyDown={handleSearch} onChange={(e)=>setSearchQuery(e.target.value)}  placeholder='Search your favaurite food here' />
            </div>
            <div className='row w-100'>
                <div className="col-md-6 col-sm-6   offer-container" >
                    <div className=''>
                        <h2 className='offer-name'>Chicken Manakesh</h2>
                        <h4>Try the best food of <br />the week</h4>
                      
                        <button className='btn btn-offer shadow-none'>View</button>
                    </div>
                </div>
                <div className="col-md-6  col-sm-6 offer-img-container ">
                    <img src={img} alt="" className='offer-img offer-animate' />
                </div>

            </div>
        </div>
    )
}

export default Offer
