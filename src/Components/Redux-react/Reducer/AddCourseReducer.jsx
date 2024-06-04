import { createSlice } from "@reduxjs/toolkit";
import addCourseData from "../Action/AddCourseAction";

const addCourseSlice = createSlice({
  name: "addCourseData",
  initialState: {
    message: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCourseData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCourseData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(addCourseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  }
});

export default addCourseSlice.reducer;
