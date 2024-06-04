import {MdScore} from "react-icons/md";
import { Link } from "react-router-dom";

export default function Score(){
  return(
    <>
       <Link to="/score" className="flex items-center justify-center w-32 h-32 bg-red-500 text-white rounded-lg p-4">
            <MdScore className="w-12 h-12" />
            <span className="ml-2">Score</span>
        </Link>
    </>
  )
}