import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Opportunities from '../components/Opportunities';
import OpportunityPage from '../components/OpportunityPage';
import Layout from './Layout';
import OpportunitiesLayout from '../components/OpportunitiesLayout';

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
        path: "/opportunities",
        element: <OpportunitiesLayout />,
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

