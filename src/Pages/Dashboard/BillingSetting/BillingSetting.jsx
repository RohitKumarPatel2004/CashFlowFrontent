import React from 'react'
// import { MdDownload } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";

const BillingSetting = () => {
    return (
        <div className='mt-4 ml-4 mr-4'>
            <div className="">
                <span className='font-bold'>Billing & Invoice</span>
                <p className="text-sm text-gray-600">Manage your billing information and invoices.</p>
            </div>
            <div className="mt-8 h-auto w-70 justify-around items-center flex-wrap">
                <div className=' w-[60%]    rounded-md shadow z-30 mb-4 mr-4'>
                    <div className='flex justify-between'>
                        <div className=' ml-4 mt-4 w-[80%] '>
                            <span className='font-semibold'>Free Plan</span>
                            <p className='text-sm text-gray-600'>Manage your billing and invoice</p>
                        </div>
                        <div className='order-last mt-4'><span>$0 / month</span>
                        </div>

                    </div>
                    <div className='ml-4 mt-4'>
                        <span>120/1000 Records</span>
                        <div className='h-1 w-[90%] bg-gray-100 shadow rounded-full'><div className='h-1 w-[35%] bg-yellow-500 rounded-full' ></div></div>
                    </div>
                    <div className='flex justify-end mt-4 mr-4 '>

                        <div className='w-auto mb-4 bg-gray-800  hover:bg-black text-white font-bold py-2 px-4 rounded'>

                            <button type="submit" className=''>Upgrade</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-8 flex justify-between '>
                <div className=" ">
                    <span className='font-bold'>Invoices</span>
                    <p className='text-sm text-gray-600'>Access all your previous invoices</p>
                </div>
                <div className='order-last  h-8 w-[20%] shadow rounded '>
                    <button className='font-semibold'> <AiOutlineDownload className="inline mr-2" />Download All</button>
                </div>
            </div>
            <div className='w-full rounded mt-4 shadow'>
                <table className='table-auto border w-full '>
                    <thead className='h-10'>
                        <tr className='shadow-sm  rounded  bg-slate-300'>
                            <th>Invoice</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Plan</th>
                        </tr>
                    </thead>
                    <tbody className='h-10'>
                        <tr className='ml-4 shadow-sm  rounded' >
                            <td className='px-4'>Invoice 1</td>
                            <td className='px-4'>dec 1, 2023</td>
                            <td className='px-4'><span className='w-32 bg-green-400 px-4 rounded-full'>Paid</span></td>
                            <td className='px-4'> 500</td>
                            <td className='px-4'>Paid</td>
                        </tr>
                        <tr className='shadow-sm  rounded  ' >
                            <td className='px-4'>Invoice 1</td>
                            <td className='px-4'>dec 1, 2023</td>
                            <td className='px-4'><span className='w-32 bg-green-400 px-4 rounded-full'>Paid</span></td>
                            <td className='px-4'> 500</td>
                            <td className='px-4'>Free</td>
                        </tr>
                    </tbody>
                </table >
            </div >
        </div >
    )
}

export default BillingSetting
