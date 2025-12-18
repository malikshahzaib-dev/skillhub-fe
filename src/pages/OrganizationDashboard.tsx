import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";
import { useState } from "react";


const OrganizationDashboard = () => {

    const navigate = useNavigate()

   
    const [job,setJob]= useState<any>("")
    const user = JSON.parse(localStorage.getItem("user")!)
    const userRole= user?.role
    console.log(user,"user for console")
    
    


const handleCreateJobPosting = () => {
  const organization = user?.organization;

  if (user && userRole === "organization" && organization?.status === "approved") {
    navigate("/create-job");
  } else {
    navigate("/sign-in");
  }
};

   




    return (
        <>

          <NavBar/>
            <div className="" style={{ width: "100%", backgroundColor: "transparent" }}>
              
                <div className="" style={{ background: "" }}>
                    <h1 className="text-center p-3 mt-4 fs-1 fw-bold">Organization Dashboard</h1>
                    <p className="text-center fs-1 fw-semibold " style={{ paddingLeft: "200px", paddingRight: "200px" }}> Welcome to your organization dashboard. Here you can manage job postings,
                        review applications, and track your hiring process — all in one place.</p>
                </div>
                <div className="d-flex gap-1 justify-content-center align-items-center">
                    <div className="text-center p-5" style={{ background: "" }}>
                            <button 
                             
                             onClick={ () => handleCreateJobPosting()}  className="btn btn-primary" style={{ height: "50px", width: "200px" }}>Create Job Posting</button>
                    </div>

                    {/* <div className="text-center p-5" style={{ background: "" }}>
                        <button  onClick={() => navigate(`/my-application/${job._id}`)} className="btn btn-secondary" style={{ height: "50px", width: "200px" }}>View Applications</button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default OrganizationDashboard;
