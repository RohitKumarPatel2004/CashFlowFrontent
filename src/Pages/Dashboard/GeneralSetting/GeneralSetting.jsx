import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";


const GeneralSetting = () => {
    return (
        <>
            <div className='mt-4 ml-4 mr-4'>
                <span className='font-bold'>General Setting</span>
                <div className='flex justify-between shadow p-4 mt-4 rounded'>
                    <div>
                        <span className='font-semibold'>Language</span>
                        <p className='text-gray-500'>interface will apear in this language</p>
                    </div>
                    <div className='order-last font-semibold text-gray-500'><span>English(US) <IoIosArrowForward className='inline' /></span></div>
                </div>
                <div className='flex justify-between shadow p-4 mt-4 rounded'>
                    <div>
                        <span className='font-semibold'>Region & Language</span>
                        <p className='text-gray-500'> Region & Language your Channels and News feed pulls content from</p>
                    </div>
                    <div className='order-last font-semibold text-gray-500'><span> <FaLocationDot className='inline mr-2' />United States</span></div>
                </div>
                <div className='flex justify-between shadow rounded p-4 mt-4'>
                    <div>
                        <span className='font-semibold'>Display</span>
                        <p className='text-gray-500 mt-4    '>Dark Mode</p>
                    </div>
                    <div className='order-last mt-12'><IoIosArrowForward /> </div>
                </div>
            </div>
        </>
    )
}

export default GeneralSetting
