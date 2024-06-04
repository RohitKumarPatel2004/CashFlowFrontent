import dash from '../../Dashboard/Admin_assests/adm4.jpg'
import user from '../../Dashboard/Admin_assests/users.webp'

export default function Dashboard(){
  return(
    <>
    <div className="h-full grid lg:ml-32 md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-y-4 items-center md:gap-y-10 px-4 sm:px-0 relative">
        <div className="px-2 pt-2  bg-white shadow-lg rounded-t-xl">
              <img className=" rounded-lg w-96 h-60" src={dash} alt="" />
              <h1 className="font-bold">Total Number of Courses</h1>
              <br />
              <p className="text-3xl font-bold">{"-"+"1500"}</p>
        </div>
        <div className="px-2 pt-2  bg-white shadow-lg rounded-t-xl">
              <img className=" rounded-lg w-96 h-60" src={user} alt="" />
              <h1 className="font-bold">Total Number of Users</h1>
              <br />
              <p className="text-3xl font-bold">{"-"+"16000"}</p>
        </div>
    </div>
    </>
  )
}