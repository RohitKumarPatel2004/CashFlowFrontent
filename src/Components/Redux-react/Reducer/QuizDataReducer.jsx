import { createSlice } from "@reduxjs/toolkit";
import QuizData from "../Action/QuizDataAction";

const QuizDataSlice = createSlice({
  name: 'QuizData',
  initialState: {
    score: null,
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(QuizData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(QuizData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.score = action.payload.score;
        state.data = action.payload.data;
      })
      .addCase(QuizData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload.error : "An error occurred";
      });
  }
});

export default QuizDataSlice.reducer;
