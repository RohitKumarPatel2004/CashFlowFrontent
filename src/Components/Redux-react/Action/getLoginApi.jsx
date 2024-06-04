import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from '../../../Pages/BaseUrl/baseURL';

const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, userData);
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

export default loginUser;
