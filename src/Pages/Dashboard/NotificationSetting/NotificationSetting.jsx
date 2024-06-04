import React from 'react'
import { MdOutlineWatchLater } from "react-icons/md";

const NotificationSetting = () => {
    return (
        <div className='mt-4 ml-4 mr-4'>
            <span className='font-bold'>Notification Setting</span>
            <div className='mt-4 shadow rounded'>
                <div className='  p-4 flex justify-between '>
                    <div className='bg-green-500  px-3 rounded'><span>joined new user</span></div>
                    <div className='order-last'><MdOutlineWatchLater className='inline mr-2' /><span className='text-gray-500'>24 Nov 2023 at 09:30 am</span></div>
                </div>
                <div className='p-4'>
                    <span>New Registration :</span>
                    <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    <span className='text-red-500'>Allen deo</span>
                </div>

            </div>
            <div className='mt-4 shadow rounded'>
                <div className='  p-4 flex justify-between '>
                    <div className='bg-green-500 px-3  rounded'><span>joined new user</span></div>
                    <div className='order-last'><MdOutlineWatchLater className='inline mr-2' /><span className='text-gray-500'>24 Nov 2023 at 09:30 am</span></div>
                </div>
                <div className='p-4'>
                    <span>New Registration :</span>
                    <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    <span className='text-red-500'>Allen deo</span>
                </div>

            </div>
            <div className='mt-4 shadow rounded'>
                <div className='  p-4 flex justify-between '>
                    <div className='bg-green-500 px-3  rounded'><span>joined new user</span></div>
                    <div className='order-last'><MdOutlineWatchLater className='inline mr-2' /><span className='text-gray-500'>24 Nov 2023 at 09:30 am</span></div>
                </div>
                <div className='p-4'>
                    <span>New Registration :</span>
                    <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    <span className='text-red-500'>Allen deo</span>
                </div>

            </div>
        </div>
    )
}

export default NotificationSetting
