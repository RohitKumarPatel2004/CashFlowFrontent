import { useState, useEffect } from "react";

export default function Students(){
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(" ");
      const data = await response.json();
      setStudents(data);
    };

    fetchData();
  }, []);




return(
  <>
    <div>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Course</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Contact</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-2 border">{student.firstName}</td>
                  <td className="px-4 py-2 border">{student.lastName}</td>
                  <td className="px-4 py-2 border">{student.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}