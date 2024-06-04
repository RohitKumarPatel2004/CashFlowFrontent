import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../Pages/BaseUrl/baseURL";

const addQuestionAction = createAsyncThunk(
    "addQuestionData/addQuestionSlice",
    async (questionData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/quiz/postquestion`, questionData);
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

export default addQuestionAction;
