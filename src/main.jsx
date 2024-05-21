import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { ValidateUser } from './data/ValidateUser';
import { MainPage } from './pages/MainPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import StudentProfilePage from './pages/StudentProfilePage';
import SignUpPage from './pages/SignUpPage';
import './index.css';

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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);



