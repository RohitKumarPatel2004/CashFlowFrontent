import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import addQuestionAction from '../../../Components/Redux-react/Action/AddQuestionAction';

const AddQuestions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error, message } = useSelector((state) => state.addQuestionData);
    const [questions, setQuestions] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState({
        question: '',
        option: ['', '', '', ''],
        correctOption: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('option_')) {
            const optionIndex = parseInt(name.split('_')[1]);
            const updatedOptions = [...currentQuestion.option];
            updatedOptions[optionIndex] = value;
            setCurrentQuestion({ ...currentQuestion, option: updatedOptions });
        } else {
            setCurrentQuestion({ ...currentQuestion, [name]: value });
        }
    };

    const addQuestion = () => {
        const questionKey = `question${Object.keys(questions).length + 1}`;
        const updatedQuestions = { ...questions, [questionKey]: currentQuestion };
        setQuestions(updatedQuestions);
        setCurrentQuestion({
            question: '',
            option: ['', '', '', ''],
            correctOption: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allQuestions = { ...questions };
        const questionKey = `question${Object.keys(questions).length + 1}`;
        allQuestions[questionKey] = currentQuestion;
        const values = {
            course_id: 8,
            allQuestions: allQuestions
        };
        dispatch(addQuestionAction(values))
            .unwrap()
            .then((res) => {
                alert(res.msg);
                navigate('/dashboard');
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className='p-4 bg-white shadow rounded z-30 w-[100%]'>
            <span className='font-bold'>Add MCQ Question</span>
            {Object.keys(questions).map((questionKey, index) => (
                <div key={index} className='p-4 my-4 shadow rounded'>
                    <div className=''>
                        <label>Question: {index + 1}</label>
                        <textarea
                            className='max-h-48 input_field'
                            placeholder='Please enter the question'
                            type="text"
                            name={`question_${questionKey}`}
                            value={questions[questionKey].question}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        {questions[questionKey].option.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                <label className='block'>Option {String.fromCharCode(65 + optionIndex)}:</label>
                                <input
                                    className='input_field'
                                    type="text"
                                    placeholder={`Please enter Option ${String.fromCharCode(65 + optionIndex)}`}
                                    name={`option_${optionIndex}_${questionKey}`}
                                    value={option}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    </div>
                    <label className='block'>Correct Option:</label>
                    <div className='w-[95%]'>
                        <input
                            className='input_field'
                            type="number"
                            name={`correctOption_${questionKey}`}
                            placeholder='Please enter index of correct option'
                            value={questions[questionKey].correctOption}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            ))}
            <form className='my-2 p-4 shadow rounded' onSubmit={handleSubmit}>
                <div className=''>
                    <label>Question:</label>
                    <textarea
                        className='max-h-48 input_field'
                        placeholder='Please enter the question'
                        type="text"
                        name="question"
                        value={currentQuestion.question}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    {currentQuestion.option.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <label className='block'>Option {String.fromCharCode(65 + optionIndex)}:</label>
                            <input
                                className='input_field'
                                type="text"
                                placeholder={`Please enter Option ${String.fromCharCode(65 + optionIndex)}`}
                                name={`option_${optionIndex}`}
                                value={option}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                </div>
                <label className='block'>Correct Option:</label>
                <div className='w-[95%]'>
                    <input
                        className='input_field'
                        type="number"
                        name="correctOption"
                        placeholder='Please enter correct option eg:1,2,3,4'
                        value={currentQuestion.correctOption}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='p-3 flex justify-between'>
                    <button className='button' type="button" onClick={addQuestion}>
                        Add Question
                    </button>
                    <button className='button' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddQuestions;
