import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import { useNavigate } from 'react-router-dom';

function SearchForm({ data, setData, items, searchText, setSearchText }) {
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchText(searchValue);
    };
   
    useEffect(() => {
        if (!Array.isArray(data)) {
            console.error("Data is not an array", data);
            return;
        }

        // Filter products based on the `name`
        const filteredData = items.filter(item =>
            item.name.toLowerCase().includes(searchText)
        );

        setData(filteredData);
    }, [searchText,items])

    return (
        <div>
            <div className="searchForm p-3">
                <i className="fa-solid fa-arrow-left" onClick={() => navigate(-1)}></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="search"
                    className='search-input'
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder='Search your favorite food here'
                />
            </div>
        </div>
    );
}

export default SearchForm;
