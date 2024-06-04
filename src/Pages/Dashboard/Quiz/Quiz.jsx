import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addQuizAction from '../../../Components/Redux-react/Action/AddQuizAction';
import QuizData from '../../../Components/Redux-react/Action/QuizDataAction';

function Quiz() {
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.addQuizData);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft === 0 || !timerRunning) {
        clearTimeout(timer);
        handleSubmit();
      } else {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);

  const fetchQuestions = async () => {
    try {
      const courseId = 2;
      const response = await dispatch(addQuizAction(courseId)).unwrap();
      const { questions } = response;
      const questionsArray = Object.values(questions);
      setQuestions(questionsArray);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnswerSelection = (selectedAnswer) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers.slice(0, currentQuestionIndex),
      selectedAnswer,
      ...prevAnswers.slice(currentQuestionIndex + 1)
    ]);
  };

  const handleSubmit = () => {
    setTimerRunning(false);
    const results = questions.map((question, index) => ({
      question: question.question,
      selectedOption: question.option[userAnswers[index]],
      correctOption: question.option[question.correctOption],
      isCorrect: userAnswers[index] === question.correctOption
    }));
    setResults(results);

    const correctAnswers = results.filter((result) => result.isCorrect).length;
    const totalQuestions = results.length;
    const calculatedScore = `${correctAnswers}/${totalQuestions}`;
    setScore(calculatedScore);
    const resultData = JSON.stringify(results);
    dispatch(QuizData({ score: calculatedScore, data: resultData }));
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;

    if (!currentQuestion) {
      return <p>No more questions.</p>;
    }
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold mb-2">{`Question ${questionNumber}: ${currentQuestion.question}`}</h3>
        <ul className="mb-4">
          {currentQuestion.option.map((option, index) => (
            <li key={index} className="mb-2">
              <button
                className={`border rounded px-2 py-1 w-full text-left ${userAnswers[currentQuestionIndex] === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleAnswerSelection(index)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mb-4">
          <div>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
        </div>
        {isLastQuestion ? (
          <button
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg focus:outline-none"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="mt-6 w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg focus:outline-none"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        )}
        {score && <p className="absolute top-0 right-0 bg-gray-900 text-white p-2 rounded-tr-md font-bold">Score: {score}</p>}
      </div>
    );
  };

  const renderResults = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Results <p className="text-xl font-semibold mt-8">Score: {score}</p></h2>
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="border border-gray-300 p-4 rounded-md shadow-md">
              <p className="text-lg font-semibold">{result.question}</p>
              <p className="text-sm text-gray-600">Your Answer: {result.selectedOption}</p>
              <p className="text-sm text-gray-600">Correct Answer: {result.correctOption}</p>
              <p className={result.isCorrect ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                {result.isCorrect ? 'Correct' : 'Incorrect'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      {score !== null ? renderResults() : questions.length === 0 ? <p>Loading...</p> : renderQuestion()}
    </div>
  );
}

export default Quiz;
