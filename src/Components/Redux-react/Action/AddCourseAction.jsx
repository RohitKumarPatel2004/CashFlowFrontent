import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../Pages/BaseUrl/baseURL";

const addCourseData = createAsyncThunk(
  "addCourseData/addCourseSlice",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/course/addCourseData`, courseData);
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

export default addCourseData;
