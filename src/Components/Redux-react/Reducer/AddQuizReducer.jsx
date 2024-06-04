import { createSlice } from "@reduxjs/toolkit";
import addQuizAction from "../Action/AddQuizAction";

const addQuizSlice = createSlice({
  name: "addQuizData",
  initialState: {
    data: null,
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuizAction.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addQuizAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addQuizAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  }
});

export default addQuizSlice.reducer;
