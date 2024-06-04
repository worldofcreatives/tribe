import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import OpportunityPage from '../components/OpportunityPage';
import Layout from './Layout';
import OpportunitiesLayout from '../components/OpportunitiesLayout';
import OpportunityForm from '../components/OpportunityForm/OpportunityForm';
import Submissions from '../components/Submissions/Submissions';
import SubmissionDetails from '../components/SubmissionDetails/SubmissionDetails';
import OpportunityUpdateForm from '../components/OpportunityUpdateForm/OpportunityUpdateForm';
import UserOpportunitiesTable from '../components/OpportunitiesChart/OpportunitiesChart';
import LandingPage from '../components/LandingPage/LandingPage';
import ProfileForm from '../components/ProfileForm';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import GenreTypeForm from '../components/GenreTypeForm/GenreTypeForm';
import Charts from '../components/Charts';
import OnboardingApplication from '../components/OnboardingApplication';
import UsersChart from '../components/UsersChart';
import UserInfo from '../components/UserInfo/UserInfo';
import Unauthorized from '../components/Unauthorized';
import SubscriptionComponent from '../components/SubscriptionComponent/SubscriptionComponent';
import PasswordReset from '../components/PasswordReset/PasswordReset';
import PasswordResetRequest from '../components/PasswordResetRequest/PasswordResetRequest';
import ContactUs from '../components/ContactUs';
import UserSubmissions from '../components/UserSubmissions/UserSubmissions';
import ApplicationComplete from '../components/ApplicationComplete/ApplicationComplete';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
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
      },
      {
        path: "/opps/:oppId/subs",
        element: <Submissions />,
      },
      {
        path: "/opps/:oppId/subs/:subId",
        element: <SubmissionDetails />,
      },
      {
        path: "/opps/:id/update",
        element: <OpportunityUpdateForm />,
      },
      {
        path: "/charts",
        element: <Charts />,
      },
      {
        path: "/profile/edit",
        element: <ProfileForm />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/update",
        element: <GenreTypeForm />,
      },
      {
        path: "/apply",
        element: <OnboardingApplication />,
      },
      {
        path: "/userchart",
        element: <UsersChart />,
      },
      {
        path: "/user/:userId",
        element: <UserInfo />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/subscribe",
        element: <ProfilePage />,
      },
      {
        path: "/success",
        element: <ProfilePage />,
      },
      {
        path: "/cancel",
        element: <ProfilePage />,
      },
      {
        path: "/reset_password/:token",
        element: <PasswordReset />,
      },
      {
        path: "/password_reset_request",
        element: <PasswordResetRequest />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/submissions",
        element: <UserSubmissions />,
      },
      {
        path: "/welcome",
        element: <ApplicationComplete />,
      },
    ],
  },
]);
