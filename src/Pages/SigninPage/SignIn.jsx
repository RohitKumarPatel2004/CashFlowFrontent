import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import loginUser from "../../Components/Redux-react/Action/getLoginApi";
import Validation from "../../Components/LoginPageValidation/LoginPageValidation";
import Popup from "../../Components/AlertPage/Popup";
import { useAuth } from "../../Components/Context/Context";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login ,isAuthenticated } =useAuth()

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [serverErr, setServerErr] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleInput = (event) => {
    event.preventDefault();
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validateData = Validation(userData);
    setErrors(validateData);

    if (Object.keys(validateData).every((key) => validateData[key] === "")) {
      dispatch(loginUser(userData))
        .then((res) => {
          if (loginUser.fulfilled.match(res)) {
            login(res.payload.user.email,res.payload.token,res.payload.user.userType);
            setShowSuccessPopup(true);
            setTimeout(() => {
              setShowSuccessPopup(false);
              navigate('/');
            }, 2000);
          } else if (loginUser.rejected.match(res)) {
            setShowErrorPopup(true);
            setTimeout(() => {
              setShowErrorPopup(false);
            }, 2000);
            setServerErr(res.payload?.error || "An error occurred");
          }
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] h-5/6 bg-white flex flex-col gap-5 rounded-lg justify-center items-center p-5">
        {showSuccessPopup && <Popup message="Login successful!" type="success" />}
        {showErrorPopup && <Popup message="Invalid email or password." type="error" />}
        <h2 className="font-semibold text-xl">Welcome back</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {serverErr && <div className="text-red-500 bg-red-200 rounded-lg p-2">{serverErr}</div>}
          <label htmlFor="email" className="text-xs font-medium">EMAIL</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInput}
            placeholder="name@email.com"
            className="h-10 rounded-md outline-none px-2 border border-gray-300"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          <label htmlFor="password" className="text-xs font-medium">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInput}
            placeholder="Enter your password"
            className="h-10 rounded-md outline-none px-2 border border-gray-300"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          <div className="text-blue-500 text-xs font-medium pt-4 cursor-pointer">Forgot password?</div>
          <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg h-10">Login</button>
        </form>
        <div className="mt-7 flex justify-center items-center">
          <p className="text-sm font-bold">New to Masterji? <Link to="/SignUp" className="text-blue-600">Sign up</Link></p>
        </div>
        <section className="text-sm mt-6 text-center">
          <p>Having trouble logging in? Learner help center</p>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
