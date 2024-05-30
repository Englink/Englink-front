import React from "react";
import { NavLink } from "react-router-dom";

const NavBarTeacher = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/teacher-page/my-classes"
            className="text-gold hover:text-gold transition duration-300">
            השיעורים שלי
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/teacher-page/update-availability"
            className="text-gold hover:text-gold transition duration-300">
            עדכון זמינות
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/teacher-page/edit-profile"
            className="text-gold hover:text-gold transition duration-300">
            עריכת פרטים אישיים
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBarTeacher