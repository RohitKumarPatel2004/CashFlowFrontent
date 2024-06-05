import React, { useState, useEffect } from "react";
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
    number: "",
    referralCode: new URLSearchParams(window.location.search).get("referralCode") || ""
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
      <div className="flex justify-center items-center h-screen">
        <div className="w-[400px] h-auto bg-white flex flex-col gap-5 rounded-lg justify-center items-center p-5">
          {showPopup && <Popup message={popupMessage} type={popupType} />}
          <h2 className="font-semibold text-xl">Sign Up</h2>
          <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
            <div className="px-4 py-1">
              <label htmlFor="name" className="text-slate-950 font-semibold text-xs">FULL NAME</label>
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
              <label htmlFor="email" className="text-slate-950 font-semibold text-xs">EMAIL</label>
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
              <label htmlFor="password" className="text-slate-950 font-semibold text-xs">PASSWORD</label>
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
              <label htmlFor="number" className="text-slate-950 font-semibold text-xs">PHONE NUMBER</label>
              <input
                type="text"
                name="number"
                id="number"
                className="w-full h-10 border-2 rounded-md px-2 py-2 outline-none"
                placeholder="Enter your phone number"
                onChange={handleInput}
              />
            </div>
            <div className="px-4 py-1">
              <label htmlFor="referralCode" className="text-slate-950 font-semibold text-xs">REFERRAL CODE</label>
              <input
                type="text"
                name="referralCode"
                id="referralCode"
                value={values.referralCode}
                className="w-full h-10 border-2 rounded-md px-2 py-2 outline-none"
                placeholder="Enter referral code (optional)"
                onChange={handleInput}
              />
            </div>
            <div className="text-slate-700 text-xs ml-4">Between 8 and 72 characters</div>
            <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg h-10">Sign Up</button>
          </form>
          <div className="mt-4 flex justify-center items-center">
            <p className="text-sm font-bold">Already on Course? <Link to="/SignIn" className="text-blue-600">Log in</Link></p>
          </div>
          <section className="text-sm mt-3 text-center">
            <p>Having trouble logging in? Learner help center</p>
          </section>
        </div>
      </div>
    </>
  );
}

export default SignUp;
