import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addCourseData from '../../../Components/Redux-react/Action/AddCourseAction';

const AddCourseDetailsPage = () => {
    const dispatch = useDispatch();
    const { status, error, message } = useSelector((state) => state.addCourseData);

    const [courseDetails, setCourseDetails] = useState({
        title: '',
        duration: '',
        instructor: '',
        courseDescription: '',
        courseLevel: '',
        courseType: '',
        fees: '',
        launchDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCourseData(courseDetails))
            .unwrap()
            .then((res) => {
                alert(res.data.message);
                setCourseDetails({
                    title: '',
                    duration: '',
                    instructor: '',
                    courseDescription: '',
                    courseLevel: '',
                    courseType: '',
                    fees: '',
                    launchDate: ''
                });
            }).catch((error) => console.log(error))
    };

    return (
        <div className="p-4 bg-white shadow rounded z-30 w-[100%]">
            <span className='font-bold'>Add Course Details</span>
            <form onSubmit={handleSubmit} className="p-4 my-4 shadow rounded">
                <div className='lg:flex justify-between m-4'>
                    <div className='lg:lg:w-[40%]'>
                        <label className="block">Title:</label>
                        <input type="text" name="title" placeholder='Enter the Title' value={courseDetails.title} onChange={handleChange} required className="form-input p-3 rounded shadow w-full focus:outline-blue-100 " />
                    </div>
                    <div className='lg:w-[40%]'>
                        <label className="block">Instructor:</label>
                        <input className="form-input p-3 rounded shadow w-full focus:outline-blue-100" type="text" name="instructor" placeholder='Enter the Instructor Name' value={courseDetails.instructor} required onChange={handleChange} />
                    </div>
                </div>
                <div className='lg:flex justify-between m-4'>
                    <div className='lg:lg:w-[40%]'>
                        <label className="block">Duration:</label>
                        <input type="text" name="duration" placeholder='Enter the Duration' value={courseDetails.duration} onChange={handleChange} required className="form-input mt-1 p-3 rounded shadow w-full focus:outline-blue-100" />
                    </div>
                    <div className='lg:w-[40%]'>
                        <label className="block">Fees:</label>
                        <input type="number" name="fees" placeholder='Enter the Fee' value={courseDetails.fees} onChange={handleChange} required className="form-input mt-1 p-3 rounded shadow w-full focus:outline-blue-100" />
                    </div>
                </div>
                <div className='lg:flex justify-between m-4'>
                    <div className='lg:w-[40%]'>
                        <label className="block">Course Type:</label>
                        <select name="courseType" value={courseDetails.courseType} onChange={handleChange} required className="form-input mt-1 p-3 rounded shadow w-full focus:outline-blue-100">
                            <option value="">Select Option</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                    <div className='lg:w-[40%]'>
                        <label className="block">Course Level:</label>
                        <select name="courseLevel" value={courseDetails.courseLevel} onChange={handleChange} required className="form-input mt-1 p-3 rounded shadow w-full focus:outline-blue-100">
                            <option value="">Select option</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Pro">Pro</option>
                        </select>
                    </div>
                </div>
                <div className='lg:flex justify-between m-4'>
                    <div className='lg:w-[40%]'>
                        <label className="block">Course Description:</label>
                        <textarea name="courseDescription" placeholder='Enter the Course Description' value={courseDetails.courseDescription} required onChange={handleChange} className="form-textarea mt-1 p-3 rounded shadow w-full focus:outline-blue-100"></textarea>
                    </div>
                    <div className='lg:w-[40%]'>
                        <label className="block">Launch Date:</label>
                        <input type='date' name="launchDate" placeholder='Enter the Course launch date' value={courseDetails.launchDate} required onChange={handleChange} className="form-textarea mt-1 p-3 rounded shadow w-full focus:outline-blue-100"></input>
                    </div>
                </div>
                <div className='flex justify-end p-4'>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Course Details</button>
                </div>
            </form>
        </div>
    );
};

export default AddCourseDetailsPage;
