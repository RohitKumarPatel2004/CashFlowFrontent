import { createSlice } from "@reduxjs/toolkit";
import addQuestionAction from "../Action/AddQuestionAction";

const addQuestionSlice = createSlice({
    name: "addQuestionData",
    initialState: {
        message: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuestionAction.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(addQuestionAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.msg; // Assuming the message is in `msg`
            })
            .addCase(addQuestionAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload.error : 'An error occurred'; // Handling the error payload
            });
    }
});

export default addQuestionSlice.reducer;
