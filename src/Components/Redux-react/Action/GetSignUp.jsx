import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../Pages/BaseUrl/baseURL"; 

const SignUpUser = createAsyncThunk(
  "signUpData/SignUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signupAuthData`, userData);
      return response.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue({ error: "An error occurred" });
      }
    }
  }
);

export default SignUpUser;
