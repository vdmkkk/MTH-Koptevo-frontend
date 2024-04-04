import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login/Login';
import OnboardingPage from './Pages/Onboarding/onboarding-page';
import ProfilePage from './Pages/Profile/profile-page';
import PlacesPage from './Pages/Places/places-page';
import PlacePage from './Pages/Place/place-page';
import RoutesPage from './Pages/Routes/routes-page';
import RoutePage from './Pages/Route/route-page';
import Checkin from './Components/Checkin/Checkin';
import CheckinFinal from './Components/CheckinFinal/CheckinFinal';

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
  },
  {
    path: "/places",
    element: <PlacesPage/>
  },
  {
    path: "/places/:placeID",
    element: <PlacePage/>
  },
  {
    path: "/routes",
    element: <RoutesPage/>
  },
  {
    path: "/routes/:pouteID",
    element: <RoutePage/>
  },
  {
    path: "/checkin/:cipher",
    element: <Checkin/>
  },
  {
    path: "/checkin/show/:hash",
    element: <CheckinFinal/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);