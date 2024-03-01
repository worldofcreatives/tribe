import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Opportunities from '../components/Opportunities';
import OpportunityPage from '../components/OpportunityPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome Home!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "opps",
        element: <Opportunities />,
      },
      {
        path: "opps/:id",
        element: <OpportunityPage />,
      },
    ],
  },
]);
