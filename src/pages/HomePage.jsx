import React from 'react';
import { Link } from 'react-router-dom';
import videoSource from '../images/Englink.mp4';

const HomePage = () => {
  return (
      <div className="relative min-h-screen">
          <div className="absolute inset-0 z-0">
              <video className="w-full h-full" autoPlay loop muted>
                  <source src={videoSource} type="video/mp4"/>
                  הדפדפן שלך אינו תומך באלמנט ה- video.
              </video>

          </div>

          <div className="relative z-10 flex items-end  mr-20 h-screen">
              <div className=" p-16 rounded-lg  flex flex-row gap-8 items-center ">
                  <Link to="/login">
                      <button
                          className=" mr-10 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-12 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400">
                          התחברות
                      </button>
                  </Link>
                  <Link to="/signup">
                      <button
                          className=" mr-10 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-2 px-12 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400">
                          הרשמה
                      </button>
                  </Link>

              </div>
              <div className="text-left mb-4">
                  <h2 className="text-xl font-bold text-teal-600 mb-2 ml-2">רשום כמורה?</h2>
                  <a
                      href="/login-teachers"
                      className="relative inline-flex items-center px-4 py-3 overflow-hidden font-bold text-white bg-gradient-to-br from-teal-400 to-teal-600 rounded-full group mr-5"
                  >
        <span
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-300 to-teal-500 rounded-full blur opacity-85 group-hover:opacity-100 group-hover:blur transition duration-500 group-hover:duration-200 animate-tilt"></span>
                      <span className="relative z-50">התחבר כמורה</span>
                  </a>
              </div>

          </div>

      </div>
  );
};

export default HomePage;