import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const PrivacySetting = () => {
    return (
        <>
            <div className='mt-4 ml-4 mr-4'>
                <span className='font-bold'>Privacy Setting</span>
                <div className='flex justify-between shadow rounded p-4 mt-4'>
                    <div>
                        <span>Privacy</span>
                        <p className='font-bold mt-3'>Clear app data</p>
                    </div>
                    <div className='order-last mt-12'><IoIosArrowForward /> </div>
                </div>
                <div className='flex justify-between shadow rounded p-4 mt-4'>
                    <div>
                        <span>Loction</span>
                        <p className='font-bold mt-3'>Shere Location with app</p>
                    </div>
                    <div className='order-last mt-12'><IoIosArrowForward /> </div>
                </div>
                <div className='flex justify-between shadow rounded p-4 mt-4'>
                    <div>
                        <span>Password</span>
                        <p className='font-bold mt-3'>Change Your Passwod</p>
                    </div>
                    <div className='order-last mt-12'><IoIosArrowForward /> </div>
                </div>
                <div className='flex justify-between shadow rounded p-4 mt-4'>
                    <div>
                        <span>About</span>
                        <p className='font-bold mt-3'>Privacy and Cookies</p>
                    </div>
                    <div className='order-last mt-12'><IoIosArrowForward /> </div>
                </div>

            </div>
        </>
    )
}

export default PrivacySetting
