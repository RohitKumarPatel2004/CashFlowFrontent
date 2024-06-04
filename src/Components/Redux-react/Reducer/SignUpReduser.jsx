import { createSlice } from "@reduxjs/toolkit";
import SignUpUser from "../Action/GetSignUp";

const signUpSlice = createSlice({
  name: "signUpData",
  initialState: {
    message: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SignUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(SignUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      });
  }
});

export default signUpSlice.reducer;
