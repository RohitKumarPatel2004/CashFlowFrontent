import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuizDataTable = () => {

  const { status, error, score } = useSelector((state) => state.QuizData);
  const { user } = useSelector((state) => state.user);
 
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!score || score.length === 0) {
    return <p>No quiz data available.</p>;
  }

  return (
    <div className="w-[90%] pl-[5%]">
      <table className="min-w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.user.full_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{score}</td>
            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
              <Link to={`/dashboard/quizUserQue`} className="text-indigo-600 hover:text-indigo-900">
                View Details
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuizDataTable;
