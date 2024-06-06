import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/תמונת רקע מסך כניסה 2.jpg';

const HomePage = () => {
  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div> {/* שכבת כהות */}
      <h1 className="text-6xl font-bold mb-12 text-white z-10 shadow-lg">ברוכים הבאים</h1>
      <div className="bg-white bg-opacity-90 p-16 rounded-lg shadow-2xl z-10">
        <div className="flex flex-col gap-8 items-center">
          <Link to="/login">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-4 px-16 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400">
              התחברות
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-4 px-16 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400">
              הרשמה
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;







// import React from 'react';
// import { Link } from 'react-router-dom';
// import backgroundImage from '../images/תמונה רקע מסך כניסה.jpg';  // ודא שהנתיב נכון

// const HomePage = () => {
//   return (
//     <div 
//       className="flex flex-col items-center justify-center h-screen bg-cover bg-center" 
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <h1 className="text-5xl font-bold mb-8 text-white">דף הבית</h1>
//       <div className="bg-gray-200 bg-opacity-75 p-12 rounded-lg">
//         <div className="flex flex-col gap-6 items-center">
//           <Link to="/login">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
//               התחברות
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-lg focus:outline-none focus:ring focus:ring-green-400">
//               הרשמה
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;





// import React from 'react';
// import { Link } from 'react-router-dom';


// const HomePage = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-5xl font-bold mb-8">דף הבית</h1>
//       <div className="bg-gray-200 p-12 rounded-lg">
//         <div className="flex flex-col gap-6 items-center">
//           <Link to="/login">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-12 rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
//               התחברות
//             </button>
//           </Link>
//           <Link to="/signup">
//             <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-12 rounded-lg focus:outline-none focus:ring focus:ring-green-400">
//               הרשמה
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


