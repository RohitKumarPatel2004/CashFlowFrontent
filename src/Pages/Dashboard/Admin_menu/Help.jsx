import {MdHelp } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Help(){
  return(
    <>
    <div className="">
      <Link to="/help" className="flex items-center justify-center w-32 h-32 bg-indigo-500 text-white rounded-lg p-4">
            <MdHelp className="w-12 h-12" />
            <span className="ml-2">Help</span>
      </Link>
     </div>
    </>
  )
}