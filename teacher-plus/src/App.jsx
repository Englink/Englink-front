
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage.jsx";
import { MainPage } from "./pages/MainPage.jsx"
import SingUpTeachersPage from "./pages/SingUpTeachersPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import StudentProfilePage from "./pages/StudentProfilePage.jsx";
import NotFound404 from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TeacherPage from "./pages/TeachersPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/signup-teachers" element={<SingUpTeachersPage/>} />
                <Route path="/main" element={<MainPage/>} />
                <Route path="/user-profile" element={<StudentProfilePage/>} />
                <Route path="/teacher-profile/:id" element={<TeacherPage/>} />
                <Route path="*" element={<NotFound404/>} />
            </Routes>
        </Router>
    );
}

export default App;