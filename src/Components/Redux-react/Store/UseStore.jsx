import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducer/LoginReducer";
import signUpSlice from "../Reducer/SignUpReduser";
import addCourseSlice from "../Reducer/AddCourseReducer";
import addQuestionSlice from "../Reducer/AddQuestionSlice";
import addQuizSlice from "../Reducer/AddQuizReducer";
import QuizDataSlice from "../Reducer/QuizDataReducer";


const store = configureStore({
    reducer: {
        user: userReducer,
        signUpData: signUpSlice,
        addCourseData: addCourseSlice,
        addQuestionData: addQuestionSlice,
        addQuizData:addQuizSlice,
        QuizData:QuizDataSlice
       
    }
    
});

export default store;
