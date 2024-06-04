import { IoIosNotifications } from "react-icons/io";
import { FaFileInvoice } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MdPrivacyTip } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import user from '../../../Assets/HeaderImages/user5.webp';

export default function Settings() {
  const { pathname } = useLocation()
  const Linkness = (type = null) => {
    let classes = ['px-4', 'py-2', 'h-[100%]', 'w-[100%]', 'hover:bg-blue-100', 'block'];
    if (type === pathname) {
      classes = [...classes, 'bg-blue-300', 'focus:bg-blue-300'];
    }
    return classes.join(' ');
  }
  return (
    <>

      <div className="flex  bg-white-500 space-x">
        <div className="  w-[30%]  h-screen z-40 shadow-md space-y">
          <div className=" w-full flex flex-col  justify-center items-center "><img className=" mt-4  rounded-full   p-1 h-32 w-32 z-30 shadow-xl  " src={user} alt="pic" />
            <span className=" mt-4  text-size-200 font-bold items-cent ">John Elia</span>
          </div>
          <div className=" mt-5   items-center  ">
            <label className="ml-4 font-bold">Settings:</label>
            <div className="  py-2 ">
              <Link className={Linkness('/dashboard/settings')} to="/dashboard/settings"><IoSettingsSharp className="inline mr-2 " />General</Link>
              <Link className={Linkness('/dashboard/settings/privacy')} to="privacy"><MdPrivacyTip className="inline mr-2" />Privacy</Link>
              <Link className={Linkness('/dashboard/settings/billing')} to="billing"><FaFileInvoice className="inline mr-2" />Billing & invoice</Link>
              <Link className={Linkness('/dashboard/settings/notification')} to="notification"><IoIosNotifications className="inline mr-2" />Notification</Link>
            </div>

          </div>
        </div>

        <div className="w-[70%] border rounded-xl   z-40 shadow-md">
          <Outlet />
        </div>
      </div>
    </>
  )
}