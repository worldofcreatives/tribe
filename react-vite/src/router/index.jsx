import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import OpportunityPage from '../components/OpportunityPage';
import Layout from './Layout';
import OpportunitiesLayout from '../components/OpportunitiesLayout';
import OpportunityForm from '../components/OpportunityForm/OpportunityForm';

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
        element: <OpportunitiesLayout />,
        children: [
          { path: ":id", element: <OpportunityPage /> },
        ],
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
      {
        path: "/opps/form",
        element: <OpportunityForm />,
      }
    ],
  },
]);



// import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
// import Opportunities from '../components/Opportunities';
// import OpportunityPage from '../components/OpportunityPage';
// import Layout from './Layout';
// import OpportunitiesLayout from '../components/OpportunitiesLayout';

// export const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     children: [
//       {
//         path: "/",
//         element: <h1>Welcome Home!</h1>,
//       },
//       {
//         path: "login",
//         element: <LoginFormPage />,
//       },
//       {
//         path: "signup",
//         element: <SignupFormPage />,
//       },
//       {
//         path: "opps",
//         element: <Opportunities />,
//       },
//       {
//         path: "opps/:id",
//         element: <OpportunityPage />,
//       },
//       {
//         path: "*",
//         element: <h1>Not Found</h1>,
//       },
//       {
//         path: "/opportunities",
//         element: <OpportunitiesLayout />,
//       }
//     ],
//   },
// ]);

