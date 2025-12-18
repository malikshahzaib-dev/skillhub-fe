import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";

export default function JobDetaill() {
  const {jobId} = useParams()
  const [job,setJob] = useState<any>(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user")!)
  const role = user?.role



  

  
  


  const fetchJob = async () => {
    try{
      const res = await api.get(`/job/${jobId}`)
      console.log("fetch job successfully",res.data)
      setJob(res.data)
    }catch(err:any) {
      console.error("error to fetch job",err)
    }
  }


  useEffect(() => {
    fetchJob()
  },[jobId])





  return (
    <>

     {/* <div
        className="d-flex justify-content-between align-items-center p-5"
        style={{ height: "100px", width: "100%", background: "grey" ,position:"fixed",top:0,left:0}}
      >
        <div className="d-flex gap-4">
          <h1>📁</h1>
          <h1 className="fs-24 fw-bold" style={{ color: "white" }}>
            JobPortal
          </h1>
        </div>

        <div className="d-flex gap-4 align-items-center" style={{position:"relative",}}>
          <button
            onClick={() => navigate("/sign-in")}
            className=" rounded"
            style={{ height: "40px", width: "100px", background: "white" }}
          >
            signIn
          </button>

              <button
            onClick={() => navigate("/jobs")}
            className="btn "
            style={{ width: "120px", height: "40px", background: "white" }}
          >
            All Jobs
          </button>


          <button
            onClick={() => navigate("/my-jobapplied")}
            className="btn "
            style={{ width: "160px", height: "40px", background: "white" }}
          >
            My AppliedJobs
          </button>



          <div style={{ width: "35px", height: "35px", borderRadius: "50%",border:"1px solid",position:"relative" }}  >
          <img
           
           src="https://i.pravatar.cc/150?img=3" alt="profile" style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            onClick={() => setShowProfile(!showProfile)}
          />
          </div >

          {showProfile && (
            <div className="rounded d-flex justify-content-center align-items-center" style={{height:"110px",width:"160px",background:"white",textAlign:"center",position:"absolute",top:"60px",right:0}}>
            <button  className="rounded" onClick={() =>navigate("/my-Jobs")} style={{height:"34px",width:"100px",background:"black",color:"white",cursor:"pointer"}}>profile</button>
            
            </div>
          )}





         <div style={{ width: "35px", height: "35px", borderRadius: "50%",border:"1px solid",position:"relative" }}  >
          <img
           
           src="https://i.pravatar.cc/150?img=3"alt="profile" style={{ width: "35px", height: "35px", borderRadius: "50%" }}
            onClick={() => setShowLogOut(!showLogOut)}
          />
          </div >
          {showLogOut && (<div className="rounded d-flex justify-content-center align-items-center" style={{height:"110px",width:"160px",background:"white",textAlign:"center",position:"absolute",top:"60px",right:0}}>
            <button  className="rounded" onClick={handleLogOut} style={{height:"34px",width:"100px",background:"black",color:"white",cursor:"pointer"}}>logout</button>
          </div>)}
        </div>
      </div> */}
      <NavBar/>




      <div style={{ background: "white", height: "100vh" }}>
        <div className="d-flex gap-3 ">
          <div
            className="d-flex justify-content-center  position-fixed top-0 start-0"
            style={{
              height: "602px",
              width: "450px",
              marginTop:"100px",
              padding:"20px",
              background: "white",
              color: "black",
              position:"fixed",
              top:"0",
              left:"0",
              bottom:"0"

            }}
          >
            <div className="p-5">
              <h1 className="mt-3" style={{fontSize:"38px"}}>Senior Frontend Engineer</h1>
              <p className="mt-2">Engineering · Full-time</p>
              <div>
                <a href="">
                  <p className="mt-4">About Role</p>
                </a>
                <a href="">
                  <p>Requirements</p>
                </a>
                <a href="">
                  <p> Responsibilities </p>
                </a>
                <a href="">
                  <p>Benenfits</p>
                </a>
                <a href="">
                  <p>Details</p>
                </a>

                <span
                  className="badge border  d-flex justify-content-center align-items-center mt-5"
                  style={{
                    height: "50px",
                    width: "300px",
                    borderRadius: "12px",
                  }}
                >
                  Applications close 11/13/2025
                </span>
              </div>
            </div>
          </div>
          <div  style={{ height: "1440px", width: "100%", background: "white",marginLeft:"   450px",padding:"50px" }}>
            <h2 className="mt-5 fw-bold " style={{ color: "black",fontSize:"24px" }}>
              About this role
            </h2>
            <h1 className="fw-bold " style={{ color: "black" ,fontSize:"48px"}}>
              {job?.jobTitle}
            </h1>
            <p className="fs-12" style={{ color: "black" }}>
              {/* We are looking for a Senior Frontend Engineer to craft accessible,
              high-performance web <br /> experiences. You will collaborate
              closely with design and platform teams to ship reliable,
              <br />:
              elegant UI. */}
              {job?.jobDescription}
            </p>
            <div className="d-flex gap-3">
              <span
                className="border d-flex justify-content-center align-items-center"
                style={{ height: "30px", width: "120px", borderRadius: "16px",color:"black" }}
              >
                {job?.status}
              </span>
              <span
                className="border d-flex justify-content-center align-items-center"
                style={{
                  height: "30px",
                  width: "90px",
                  borderRadius: "16px",
                  color: "black",
                }}
              >
              {job?.jobType}
              </span>
              <span
                className="border d-flex justify-content-center align-items-center"
                style={{
                  height: "30px",
                  width: "120px",
                  borderRadius: "16px",
                  color: "black",
                }}
              >
               {job?.department}
              </span>
              <span
                className="border d-flex justify-content-center align-items-center"
                style={{
                  height: "30px",
                  width: "220px",
                  borderRadius: "16px",
                  color: "black",
                }}
              >
                {job
                ?.minimumSalary}-{job?.maximumSalary}
              </span>
             
            </div>
             <div className="d-flex gap-3">
                <span className="border mt-3 d-flex justify-content-center align-items-center" style={{height:"30px",width:"390px",borderRadius
                  :"16px",color:"black"
                }}>{job?.applicationclosingdate}</span>
                <span className="border d-flex justify-content-center align-items-center mt-3" style={{height:"30px",width:"150px",borderRadius:"16px",color:"black"}}>
                   {job?.location}
                   
                </span>
              </div>
               {role === "applicant" && (
         <button
         disabled ={job?.status === "Inactive"}
          onClick={() => navigate(`/create-application/${job?._id}`)}
          className="btn btn-primary mt-4"
          style={{ height: "45px", width: "130px", borderRadius: "12px" }}
          >
          Apply Now
          </button>
)}

         

            <h1 className="fw-semibold  mt-5" style={{ color: "black" ,fontSize:"36px",}}>
              Requirements:
          
            </h1>
            <div>
            <p style={{ color: "black" }}>
              What you need to be successful in this role.
            </p>
            <ul style={{color:"black"}}>
              {job?.requirements}
            </ul>
            </div>
            <h1 className="fw-semibold  mt-5" style={{color:"black",fontSize:"36px"}}>Responsibilities</h1>
            <p style={{color:"black"}}>What you will do day-to-day.</p>
            <ul style={{color:"black"}}>
              {job?.responsibilities}
         
            </ul>

            <h1 className="fw-semibold mt-5" style={{fontSize:"36px",color:"black"}}>Benefits</h1>
            <ul style={{color:"black"}}>
              {job?.benefits}
            

            </ul>
              
            <h5 className="fw-semibold mt-5" style={{fontSize:"36px",color:"black"}}>Details</h5>
            <h5 style={{color:"black"}}>Department  :{job?.jobTitle}</h5>
            <h5 style={{color:"black"}}>Job type : {job?.jobType}</h5>
            <h5 style={{color:"black"}}>Location  :{job?.location}</h5>
            <h5 style={{color:"black"}}>Salary range  :{job?.minimumSalary}-{job?.maximumSalary}</h5>
            <h5 style={{color:"black"}}>Application closing date  :{new Date(job?.applicationclosingdate).getDate() +1}</h5>
            <h5 style={{color:"black"}}>status  :{job?.status}</h5>



          </div>
        </div>
      </div>
    </>
  );
}
    