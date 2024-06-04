import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUpUser from "../../Components/Redux-react/Action/GetSignUp";
import Popup from "../../Components/AlertPage/Popup";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, message } = useSelector((state) => state.signUpData);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    number: "" 
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRegex.test(values.email) || !passwordRegex.test(values.password)) {
      setShowPopup(true);
      setPopupType("error");
      setPopupMessage("Please enter a valid email and password.");
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return;
    }

    dispatch(SignUpUser(values))
      .unwrap()
      .then((res) => {
        setShowPopup(true);
        setPopupType("success");
        setPopupMessage("Signup successful!");
        setTimeout(() => {
          setShowPopup(false);
          navigate('/SignIn');
        }, 2000);
      })
      .catch((error) => {
        setShowPopup(true);
        setPopupType("error");
        setPopupMessage(error.message || "An error occurred.");
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      });
  };

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <>
      <div className="w-full h-auto flex justify-center">
        <div className="w-96 h-5/6 border-2 rounded-lg my-6 bg-white opacity-90">
          <div className="flex justify-center mt-4 mb-2">
            <h1 className="font-bold text-xl w-90">Sign Up</h1>
          </div>
          <div className="flex justify-center text-center text-s mb-3">
            <p className="text-balance">
              Learn on your own time from top universities and businesses.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <form className="w-[90%]" onSubmit={handleSubmit}>
              <div className="px-4 py-1">
                <label
                  htmlFor="name"
                  className="text-slate-950 font-semibold text-xs"
                >
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="username"
                  id="name"
                  className="w-full h-10 border-2 rounded-md px-2 py-2 outline-none"
                  placeholder="Enter your full name"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="px-4 py-1">
                <label
                  htmlFor="email"
                  className="text-slate-950 font-semibold text-xs"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-10 border-2 rounded-md px-2 py-2 outline-none"
                  placeholder="example@gmail.com"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="px-4 py-1">
                <label
                  htmlFor="password"
                  className="text-slate-950 font-semibold text-xs"
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full h-10 border-2 rounded-md px-2 py-2 outline-none"
                  placeholder="Create Password"
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="px-4 py-1">
                <label
                  htmlFor="number"
                  className="text-slate-950 font-semibold text-xs"
                >
                  PHONE NUMBER
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  className="w-full h-10 border-2 rounded-md px-2 py-2 outline-none"
                  placeholder="Enter your phone number"
                  onChange={handleInput}
                />
              </div>
              <div className="text-slate-700 text-xs ml-4">
                Between 8 and 72 characters
              </div>

              <div className="flex justify-center items-center bg-blue-700 px-2 py-2 mt-5 ml-4 mr-4 rounded-lg">
                <button type="submit" className="text-white">
                  Sign Up
                </button>
              </div>
            </form>
            <p className="flex justify-center items-center mt-1 text-sm">
              Already on Course ?
              <Link to="/SignIn" className="text-blue-600 underline">
                Log in
              </Link>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <section className="text-center text-xs w-[17rem] text-zinc-600 m-5">
              <p>
                This site is protected by Enterprise and the Google
                <Link className="underline m-1" to="/">
                  Privacy Policy
                </Link>
                and
                <Link className="underline m-1" to="/">
                  Terms of Services
                </Link>
                apply
              </p>
            </section>
          </div>
        </div>
      </div>
      {showPopup && <Popup message={popupMessage} type={popupType} />}
    </>
  );
}

export default SignUp;
