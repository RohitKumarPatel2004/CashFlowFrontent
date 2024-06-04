import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-middle motion-reduce:animate-spin_1.5s_linear_infinite">
      </div>
    </div>
  );
}