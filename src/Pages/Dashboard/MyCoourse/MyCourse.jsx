import React, { useEffect, useState } from 'react'
import CourseCard from '../../../Components/CourseCard/CourseCard'
import axios from 'axios'
import baseURL from './../../BaseUrl/baseURL';
const MyCourse = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getCourses();
    }, [data])
    const getCourses = async () => {
        const response = await axios.get(`${baseURL}/course/getCourseData`);
        setData(response.data);
    }
    return (
        <div className="m-4 bg-white-500 ">
            <div className="h-full grid  md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-y-6 items-center md:gap-y-10 px-4 sm:px-0 lg:w-[100%] relative ">
                {
                    data &&
                    data.map((item, index) => {
                        return (
                            <CourseCard
                                key={index}
                                id={item.id}
                                fees={item.fees}
                                duration={item.duration}
                                level={item.course_level}
                                title={item.title}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MyCourse

