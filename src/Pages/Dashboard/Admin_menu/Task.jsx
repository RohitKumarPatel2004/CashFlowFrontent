import {MdAssignment} from "react-icons/md";
import { Link } from "react-router-dom";

export default function Task(){
  return(
    <>
       <Link to="/tasks" className="flex items-center justify-center w-32 h-32 bg-yellow-500 text-white rounded-lg p-4">
            <MdAssignment className="w-12 h-12" />
            <span className="ml-2">Tasks</span>
        </Link>
    </>
  )
}