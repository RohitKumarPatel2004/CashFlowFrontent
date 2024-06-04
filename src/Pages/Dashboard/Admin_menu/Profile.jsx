import lap from "../../Dashboard/Admin_assests/banner1.jpg";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
  return (
    <>
      <div className="max-w-screen py-5">
        <div className="flex flex-col justify-between md:flex-row gap-4 px-5">
          <div className="md:w-3/4 order-last lg:order-first h-auto bg-white rounded-md p-4">
            <h1 className="font-bold">General information</h1>
            <br />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <p>First Name</p>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p>Last Name</p>
                <input
                  type="text"
                  placeholder="Also your last name"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <p>Birthday</p>
                <input
                  type="date"
                  placeholder="Enter your birth"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
              <div className="w-full md:w-1/2">
                {/* <p>Gender</p> */}
                <select
                  placeholder="Gender"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <p>Email</p>
                <input
                  type="email"
                  placeholder="example@company.com"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p>Phone</p>
                <input
                  type="tel"
                  placeholder="+91 1234567890"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
            </div>
            <br />
            <h1 className="font-bold">Address</h1> <br />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <p>Address</p>
                <input
                  type="text"
                  placeholder="Enter your home address"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
              <div className="w-full md:w-auto">
                <p>Number</p>
                <input
                  type="text"
                  placeholder="No."
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-auto">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
              <div className="w-full md:w-auto">
                <p>ZIP</p>
                <input
                  type="text"
                  placeholder="ZIP"
                  className="w-full rounded-lg px-2 py-2 mt-1 border border-gray-500"
                />
              </div>
            </div>
            <br />
            <button className="bg-blue-600 text-white rounded-lg h-9 w-24">
              Edit Profile
            </button>
          </div>

          <div className="bg-white md:w-1/4 pb-11 rounded-xl overflow-hidden flex flex-col items-center">
            <div className="flex justify-center relative">
              <CgProfile className="absolute lg:top-12 top-24 rounded-full border-4 border-white h-[100px] w-[100px] bg-white" />
              <img src={lap} alt="" className="w-full sm:w-full" />
            </div>

            <div className="flex flex-col items-center py-10">
              <p className="text-xl font-bold">User</p>
              <p className="text-base">example@gmail.com</p>
              <p className="text-xs text-gray-500">New Delhi (India)</p>
            </div>
            <div className="space-x-3 text-center">
              <button className="bg-blue-600 text-white rounded-lg h-7 w-20">
                Connect
              </button>
              <button className="bg-black text-white rounded-lg h-7 w-20">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
