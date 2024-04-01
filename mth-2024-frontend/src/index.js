import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login/Login';
import OnboardingPage from './Pages/Onboarding/onboarding-page';
import ProfilePage from './Pages/Profile/profile-page';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/",
    element: <OnboardingPage/>
  },
  {
    path: "/profile",
    element: <ProfilePage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);