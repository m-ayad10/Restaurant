import React, { useState } from 'react'
import './BookTable.css'
import './Responsive.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function BookTable() {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date())
    return (
        <div className='book-table-main'>
            <div className="book-table-container" >
                <div className="book-table-box">
                    <div className="d-flex justify-content-center green-t">
                        <h4>Book a Table</h4>
                    </div>
                    <div className="w-100 gap-table row">
                        <div className="col-md-6">
                        <input type="text" className='table-input w-100 ' placeholder='Your Name' />
                        </div>
                        <div className="col-md-6">
                        <input type="number" className='table-input w-100 ' placeholder='Phone Number' />

                        </div>
                    </div>
                    <div className="row gap-table">
                        <div className="col-md-4">
                        <select className='table-input w-100'>
                            <option value="1">1 Person</option>
                            <option value="2">2 Person</option>
                            <option value="3">3 Person</option>
                            <option value="4">4 Person</option>
                            <option value="6">6 Person</option>
                            <option value="8">8 Person</option>
                            <option value="10">10 Person</option>
                            <option value="16">16 Person</option>

                        </select>
                        </div>
                        <div className="col-md-4">
                        <DatePicker
                            className='table-input ps-4 pb-3 p-0 w-100'
                            dateFormat="dd/MM/yyyy" // Correct date format for react-datepicker
                            showIcon
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            icon="fa fa-calendar"
                        />
                        </div>
                        <div className="col-md-4">
                        <DatePicker
                            className='table-input ps-4 pb-3 p-0 w-100 '
                            showTimeSelect
                            showTimeSelectOnly
                            showIcon
                            timeIntervals={30}
                            dateFormat="hh:mm aa"
                            timeFormat='hh:mm aa'
                            selected={startDate}
                            onChange={(time) => {
                                setStartDate(time)
                                console.log(time);
                            }}
                            icon="fa-solid fa-clock"
                        />
                        </div>
                        
                        
                        
                    </div>
                    <div className="">
                        <textarea name="" placeholder='Message' className='table-textarea' id="" rows="5"></textarea>
                    </div>
                    <div>
                        <button className='btn btn-table shadow-none'>Book A Table</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookTable
