import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { ValidateUser } from './data/ValidateUser';
import  MainPage  from './pages/MainPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentProfilePage from './pages/StudentProfilePage';
import SignUpPage from './pages/SignUpPage';
import MyLessons from './pages/myLessonsPage';
import './index.css';
import SingUpTeachersPage from './pages/SingUpTeachersPage';
import LoginTeacherPage from "./pages/LoginTeachersPage.jsx";
import TeacherPage from './pages/TeachersPage.jsx';
import MyClasses from './components/forteacher/MyClasses.jsx';
import UpdateAvailability from './components/forteacher/UpdateAvailability.jsx';
import SetAlessonPage from './pages/SetAlessonPage.jsx';
import EditProfile from './components/forteacher/EditProfile.jsx';
import FeedbackForm from "./components/FeedbackForm.jsx";
import NotFound404 from "./pages/ErrorPage.jsx";
import ForgotPassword from './pages/ForgetPasswordPage.jsx';
import ResetPassword from './pages/ResetPasswordPage.jsx';



const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignUpPage />
    },
    {
        path: '/main',
        element: <MainPage />,
        loader: async () => {
            try {
                const res = await ValidateUser();
                return res
            } catch (error) {
                return redirect('/login')
            }
        }
    },
    {
        path: '/user-profile',
        element: <StudentProfilePage />,
        loader: async () => {
            try {
                const res = await ValidateUser();
                return res
            } catch (error) {
                return redirect('/login')
            }
        }
    },
    {
        path: '/myLessons',
        element: <MyLessons />,
        loader: async () => {
            try {
                const res = await ValidateUser();
                return res
            } catch (error) {
                return redirect('/login')
            }
        }
    },
    {
        path: 'set-lesson',
        element: < SetAlessonPage/>,
        loader: async () => {
        try {
            const res = await ValidateUser();
            return res
        } catch (error) {
            return redirect('/login-teachers')
        }
    }
    },
    {
        path: '/signup-teachers',
        element: < SingUpTeachersPage/>,
        loader: async () => {
            try {
                const res = await ValidateUser();
                return res
            } catch (error) {
                return redirect('/main')
            }
        }
    },
    {
        path: '/login-teachers',
        element: < LoginTeacherPage/>,
        loader: async () => {
        try {
            const res = await ValidateUser();
            return res
        } catch (error) {
            return redirect('/main')
        }
    }
    },
    {
        path: '/teacher-page',
        element: < TeacherPage/>,
        loader: async () => {
        try {
            const res = await ValidateUser();
            return res
        } catch (error) {
            return redirect('/login-teachers')
        }
    }
    },
    {
        path: '/teacher-page/my-classes',
        element: < MyClasses/>,
        loader: async () => {
        try {
            const res = await ValidateUser();
            return res
        } catch (error) {
            return redirect('/login-teachers')
        }
    }
    },{
        path: '/teacher-page/update-availability',
        element: < UpdateAvailability/>,
        loader: async () => {
        try {
            const res = await ValidateUser();
            return res
        } catch (error) {
            return redirect('/login-teachers')
        }
    }
    },
    {
        path: 'feedback',
        element: < FeedbackForm/>,
    },
    {
        path: '/teacher-page/edit-profile',
        element: < EditProfile/>,
        loader: async () => {
        try {
            const res = await ValidateUser();
            return res
        } catch (error) {
            return redirect('/login-teachers')
        }
    }
    },
    {
        path: '/forget-password',
        element: < ForgotPassword/>,
        
    }
    ,
    {
        path: '/reset-password/:token',
        element: < ResetPassword/>,
        
    }
    ,
    {
        path: '*',
        element: <NotFound404 />
    }
    

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);