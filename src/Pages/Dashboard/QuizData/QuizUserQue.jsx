import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function QuizUserQue() {
    const user = useSelector((state) => state.user.user);
    const { score, data: quizData } = useSelector((state) => state.QuizData);
    const [quizResults, setQuizResults] = useState(null);

    useEffect(() => {
        if (quizData) {
            const parsedData = JSON.parse(quizData);
            setQuizResults(parsedData);
        }
    }, [quizData]);

    return (
        <div className="w-[90%] pl-[5%]">
            <div className="flex w-[100%] justify-between mt-8">
                <h2 className="text-3xl font-bold mb-6">Questions</h2>
                <Link to="/dashboard/quizData" className="bg-blue-500 h-10 w-24 flex justify-center items-center hover:bg-blue-600 text-white font-bold rounded focus:outline-none focus:shadow-outline">
                    Back
                </Link>
            </div>
            {quizResults ? (
                <ul className="space-y-4">
                    {quizResults.map((result, index) => (
                        <li key={index} className="border border-gray-300 p-4 rounded-md shadow-md">
                            <p className="text-lg font-semibold">
                                {index + 1}. {result.question}
                            </p>
                            <p className="text-sm text-gray-600">Your Answer: {result.selectedOption}</p>
                            <p className="text-sm text-gray-600">Correct Answer: {result.correctOption}</p>
                            <p className={result.isCorrect ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                                {result.isCorrect ? 'Correct' : 'Incorrect'}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default QuizUserQue;
