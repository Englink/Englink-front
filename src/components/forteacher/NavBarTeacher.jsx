import React from "react";
import { NavLink } from "react-router-dom";

const NavBarTeacher = () => {
  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <ul className="flex justify-center items-center space-x-6">
        <li className="mx-4">
          <NavLink
            to="/teacher-page"
            className="text-white hover:text-yellow-300 transition duration-300">
            בית  
          </NavLink>
        </li>
        <li className="mx-4">
          <NavLink
            to="/teacher-page/my-classes"
            className="text-white hover:text-yellow-300 transition duration-300">
            השיעורים שלי    
          </NavLink>
        </li>
        <li className="mx-4">
          <NavLink
            to="/teacher-page/update-availability"
            className="text-white hover:text-yellow-300 transition duration-300">
            עדכון זמינות
          </NavLink>
        </li>
        <li className="mx-4">
          <NavLink
            to="/teacher-page/edit-profile"
            className="text-white hover:text-yellow-300 transition duration-300">
            עריכת פרטים אישיים  
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarTeacher;










// import React from "react";
// import { NavLink } from "react-router-dom";

// const NavBarTeacher = () => {
//   return (
//     <nav className="bg-blue-500 p-4 shadow-lg">
//       <ul className="flex justify-around items-center">
//         <li className="mx-4">
//           <NavLink
//             to="/teacher-page"
//             className="text-white hover:text-yellow-300 transition duration-300 ">
//             בית  
//           </NavLink>
//         </li>
//         <li className="mx-4">
//           <NavLink
//             to="/teacher-page/my-classes"
//             className="text-white hover:text-yellow-300 transition duration-300">
//             השיעורים שלי    
//           </NavLink>
//         </li>
//         <li className="mx-4">
//           <NavLink
//             to="/teacher-page/update-availability"
//             className="text-white hover:text-yellow-300 transition duration-300">
//             עדכון זמינות
//           </NavLink>
//         </li>
//         <li className="mx-4">
//           <NavLink
//             to="/teacher-page/edit-profile"
//             className="text-white hover:text-yellow-300 transition duration-300">
//             עריכת פרטים אישיים  
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBarTeacher;











// import React from "react";
// import { NavLink } from "react-router-dom";

// const NavBarTeacher = () => {
//   return (
//     <nav className="bg-blue-500 p-4 shadow-lg">
//       <ul className="flex justify-around items-center space-x-6">
//         <li>
//           <NavLink
//             to="/teacher-page"
//             className="text-white hover:text-yellow-300 transition duration-300">
//                בית  
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/teacher-page/my-classes"
//             className="text-white hover:text-yellow-300 transition duration-300">
//                 השיעורים שלי    
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/teacher-page/update-availability"
//             className="text-white hover:text-yellow-300 transition duration-300">
//                עדכון זמינות
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/teacher-page/edit-profile"
//             className="text-white hover:text-yellow-300 transition duration-300">
//               עריכת פרטים אישיים  
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default NavBarTeacher;





// import React from "react";
// import { NavLink } from "react-router-dom";

// const NavBarTeacher = () => {
//   return (
//     <nav>
//       <ul className="flex space-x-6">
//       <li>
//           <NavLink
//             to="/teacher-page"
//             className="text-gold hover:text-gold transition duration-300">
//                בית  
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/teacher-page/my-classes"
//             className="text-gold hover:text-gold transition duration-300">
//                 השיעורים שלי    
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/teacher-page/update-availability"
//             className="text-gold hover:text-gold transition duration-300">
//                עדכון זמינות
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/teacher-page/edit-profile"
//             className="text-gold hover:text-gold transition duration-300">
//               עריכת פרטים אישיים  
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   )
// }

// export default NavBarTeacher