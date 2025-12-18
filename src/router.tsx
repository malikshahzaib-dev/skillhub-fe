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
import UpdateJob from "./pages/UpdateJob";
import Jobs from "./pages/Jobs";
import JobDetaill from "./pages/JobDetaill";
import MyAppliedJob from "./pages/myAppliedJob";
import MyJobs from "./pages/MyJobs";
import MyOrganizations from "./pages/MyOrganizations";
import UpdateOrganization from "./pages/UpdateOrganization";
import OrganizationDetail from "./pages/OrganizationDetail";
import NavBar from "./pages/NavbarComponent";
import UpdateApplicantInformation from "./pages/UpdateApplicantInformation";
import Application from "./pages/Application";
import AllOrganization from "./pages/AllOrganizations";
import MyApplication from "./pages/MyApplication";
import FileUpload from "./pages/FileUpload";
import ApplicationDetail from "./pages/ApplicationDetail";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
   {
    path: "/sign-in",
    element: <SignIn />,
  },
   {
    path: "/sign-up",
    element: <SignUp />,
  },  

  {
    path: "/employer-signup",
    element: <EmployerSignUp />,
  },
 
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
   {
    path: "/reset-password",
    element: <ResetPassword />,
  },
   
  {
    path: "/applicant-information",
    element: <ApplicantInformation />,
  },
 
  {
    path: "/applicant-dashboard",
    element: <ApplicantDashboard />,
  },
   {
    path: "/create-application/:jobId",
    element: <CreateApplication />,
  },
   {
    path: "/organization-information",
    element: <OrganizationInformation />,
  },
  // { path:"/application/:id" ,element:<CreateOrUpdateApplication />}


   {
    path: "/organization-dashboard",
    element: <OrganizationDashboard/>,
  },
  {
    path: "/create-job",
    element: <CreateJob />,
  },
 
  {
    path: "/update-application/:id",
    element: <UpdateApplication />,
  },
  {
    path:"/my-application/:jobId",
    element:<MyApplication/>
  },
  
  


  {
    path: "/job-list",
    element: <JobsList />,
  },

  {
    path: "/job-page",
    element: <JobPage />,
  },
 
  
  {
    path: "/update-job/:jobId",
    element: <UpdateJob />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path:"/my-jobs",
    element:<MyJobs/>

  },
  {
    path: "/job/:jobId",
    element: <JobDetaill />,
  },
  {
    path: "/my-jobapplied",
    element: <MyAppliedJob />,
  },{
    path:"/my-organization",
    element:<MyOrganizations/>
  },{
    path:"/update-organization/:id",
    element:<UpdateOrganization/>
  },{
    path:"organization/:id",
    element:<OrganizationDetail/>
  },{
    path:"/navBar",
    element:<NavBar/>
  },{
    path:"/update-applicantinformation/:id",
    element:<UpdateApplicantInformation/>
  },
  {
    path:"/all-application",
    element:<Application/>
  },{
    path:"/all-organization",
    element:<AllOrganization/>
  },{
    path:"/file-upload",
    element:<FileUpload/>
  },{
    path:"/application-detail/:id",
    element:<ApplicationDetail/>
  }
 
]);
