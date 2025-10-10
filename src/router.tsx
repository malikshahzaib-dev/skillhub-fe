import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import CreateJob from "./pages/CreateJob";
import CreateApplication from "./pages/CreateApplication";
import UpdateApplication from "./pages/UpdateApplication";
import VerifyOtp from "./pages/VerifyOtp";
import EmployerSignUp from "./pages/EmployerSignUp";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import SignIn from "./pages/SignIn";
import OrganizationInformation from "./pages/OrganizationInformation";
import ResetPassword from "./pages/ResetPassword";
import JobsList from "./pages/JobList";
import JobPage from "./pages/JobPage";
import ApplicantInformation from "./pages/ApplicantInformation";
// import JobsList from "./pages/JobPage";

export const router = createBrowserRouter([
   
    {
        path: "/",
        element: <HomePage/>,
    },

    {
        path: "/employer-signup",
        element:<EmployerSignUp/>
    },
    {
        path: "/sign-up",
        element:<SignUp/>
    },
   {
        path:'/forgot-password',
        element:<ForgotPassword/>
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path:'/applicant-dashboard',
        element:<ApplicantDashboard/>
    },{
        path:'/create-job',
        element:<CreateJob/>
    },{
        path:'/create-application',
        element:<CreateApplication/>
    },{
        path:'/update-application',
        element:<UpdateApplication/>
    },{
        path:'/verify-otp', 
        element:<VerifyOtp/>
    },
    // {
    //     path:"/job-list",
    //     element: < JobsList/>
    // },
    {
        path:'/organization-dashboard',
        element:<OrganizationDashboard/>    
    },{
        path:"/organization-information",
        element:< OrganizationInformation/>
    },{
        path:"/reset-password",
        element: <ResetPassword/>
    },{
        path:"/job-list",
        element:<JobsList/>
    },
    {
        path:'/job-page', 
        element:<JobPage/>
    },
    {
        path:"/applicant-information",
        element:<ApplicantInformation/>
    }
    
    
    //     path:'/updatejob', 
    //     element:<UpdateJob/>
    // }
])    