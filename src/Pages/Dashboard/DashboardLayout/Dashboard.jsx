import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { PiStudent } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { BiTask } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineSportsScore } from "react-icons/md";
import { CgFileAdd } from "react-icons/cg";
import { SiReadthedocs } from "react-icons/si";
import logo from "../../../Assets/HeaderImages/logo.png";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (menuref.current && menuref.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`w-64 bg-sky-50 ${isMenuOpen ? "block" : "hidden"} md:block`}
      >
        <div className="py-4 flex flex-col p-3">
          <div className="pl-3 h-20">
            <img src={logo} alt="" className="h-10" />
          </div>
          <p className=" px-4 py-2 font-bold">Home</p>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to=" "
          >
            <MdOutlineDashboard className="inline mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="mycourse"
          >
            <SiReadthedocs className="inline mr-2" />
            My Course
          </NavLink>
          <br />
          <p className="px-4 py-2 font-bold">Components</p>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="students"
          >
            <PiStudent className="inline mr-2" />
            Students Details
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="quizData"
          >
            <CgFileAdd className="inline mr-2" />
            QuizData
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="quiz"
          >
            <CgFileAdd className="inline mr-2" />
            Quiz
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="addMcq"
          >
            <CgFileAdd className="inline mr-2" />
            Add MCQ Question
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="addCourseDetails"
          >
            <CgFileAdd className="inline mr-2" />
            Add Course Details
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="task"
          >
            <BiTask className="inline mr-2" />
            Task
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="score"
          >
            <MdOutlineSportsScore className="inline mr-2" />
            Score
          </NavLink>
          <br />
          <p className=" px-4 py-2 font-bold">Extra</p>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="settings"
          >
            <IoSettingsOutline className="inline mr-2" />
            Settings
          </NavLink>
          <NavLink
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            to="help"
          >
            <IoMdHelpCircleOutline className="inline mr-2" />
            Help
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className=" bg-blue-100 p-4 h-10 text-white flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 md:hidden text-black" onClick={toggleMenu}>
              {isMenuOpen ? (
                <RiCloseLine className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </div>
          </div>
          <div className="relative ml-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex rounded-full bg-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <CgProfile className="text-3xl" />
            </button>
            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-white"
                ref={menuref}
              >
                <NavLink
                  to="profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Your Profile
                </NavLink>
                <NavLink
                  to="profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Inbox
                </NavLink>
                <NavLink
                  to="#"
                  className="block px-4 py-2 text-sm font-medium text-red-500"
                >
                  Sign out
                </NavLink>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>

        {/* <div className="bg-gray-600 p-4 text-white">
          Footer
        </div> */}
      </div>
    </div>
  );
}

export default DashboardLayout;
