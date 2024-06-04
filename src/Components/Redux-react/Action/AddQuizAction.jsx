import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../Pages/BaseUrl/baseURL";

const addQuizAction = createAsyncThunk(
    "addQuiz/addQuizSlice",
    async (courseId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/quiz/getquizquestion`, { course_id: courseId });
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ error: "An error occurred" });
            }
        }
    }
);

export default addQuizAction;
