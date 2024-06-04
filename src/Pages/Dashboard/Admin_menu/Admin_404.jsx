import { Link } from 'react-router-dom';

const Admin404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-purple-900 to-blue-900 text-white">
      <div className="text-center">
        <div className="font-bold text-6xl">ERROR</div>
        <h1 className="text-7xl font-bold mb-8">404</h1>
        <hr className="border-t border-white my-8" />
        <div className="text-2xl">Page Not Found</div>
        <Link to="/" className="text-2xl underline mt-8 block">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Go To Home Page
            <svg
              className="rtl:rotate-180 w-6 h-6 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Admin404;
