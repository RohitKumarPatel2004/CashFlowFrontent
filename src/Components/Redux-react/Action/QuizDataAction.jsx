import { createAsyncThunk } from "@reduxjs/toolkit";

const QuizData = createAsyncThunk(
    "quizData/quizDataReducer",
    async ({ score, data }, { rejectWithValue }) => {
        try {
            return { score, data }
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ error: "An error occurred" });
            }
        }
    }
)


export default QuizData;