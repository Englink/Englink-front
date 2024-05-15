import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold mb-8">דף הבית</h1>
      <div className="bg-gray-200 p-12 rounded-lg">
        <div className="flex flex-col gap-6 items-center">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
              התחברות
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-lg focus:outline-none focus:ring focus:ring-green-400">
              הרשמה
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


