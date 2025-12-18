import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";

export default function Jobs() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")!)
  const userRole = user?.role
  const location = useLocation();
  const { newJob, createdBy } = location.state || {};
  console.log(newJob, "new job from create job componenet");
  console.log("createdBy", createdBy);
  const [searchJob, setSearchJob] = useState("");
  const [job, setJob] = useState<[]>([]);
  const [loading,setLoading] = useState(false)

  const fetchJob = async () => {
    try {
      setLoading(true)
      const res = await api.get("/job");
      console.log("fetch job successfully", res.data);
      setJob(res.data.foundJobs);
    } catch (error) {
      console.error("error to fetch job detail", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  
  const handleSearchChange = async(e: any) => {
   e.preventDefault()
    try {
      setLoading(true)
      if(!searchJob){
      const res = await api.get("/job");
      console.log("fetch job successfully", res.data);
      setJob(res.data.foundJobs);
      }else {
         const res = await api.get(`/job?jobTitle=${searchJob}`);
      console.log("found job by jobTitle", res.data);
      setJob(res.data.findJob);
      }
     
    } catch (err:any) {
      console.error("error to fetch jobs:",err);
    }finally{
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <div>
        <p className="text-center">loading...</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ background: "#ffffff" }}>
        <div className="container p-2">
          <div className="d-flex justify-content-center align-items-center gap-3">
             
            <input
              value={searchJob}
              onChange={(e) => setSearchJob(e.target.value)}
              placeholder="Search jobs"
              className="border mt-3"
              type="text"
              style={{
                height: "40px",
                borderRadius: "12px",
                width: "60%",
                paddingLeft: "30px",
              }}
            />
          <button onClick={handleSearchChange} className="mt-3 rounded bg-dark" style={{height:"35px",width:"80px",color:"white"}}>Search</button>

          </div>

          <h1 className="fw-bold  mt-3 " style={{ fontSize: "24px" }}>
            Open roles
          </h1>
          <p style={{ fontSize: "16px" }}>
            Explore opportunities across differe nt departments — click a card
            to view more details.
          </p>
        </div>
        <div className="container">
          <div
            className="row row-cols-3 g-4  mb-5"
            // style={{
            //   width: "100%",
            //   background: "white",
            //   padding: "20px",
            // }}
          >
            {job.map((newJob: any, ind: any) => {
              return (
                <li key={ind}>
                  {
                    <div className="col" style={{ height: "600" }}>
                      <div
                        className="border p-4"
                        style={{ borderRadius: "12px" }}
                      >
                        <div className="d-flex justify-content-between gap-1 p-4">
                          <h6 style={{ fontSize: "18px", fontWeight: "700" }}>
                            {newJob?.jobTitle}
                          </h6>
                          <div>
                            <span
                              className="badge border text-center gap-4"
                              style={{
                                height: "25px",
                                width: "70px",
                                background: "red",
                                borderRadius: "12px",
                              }}
                            >
                              {newJob.status}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex gap-4 px-4">
                          <span
                            className="badge  border text-center"
                            style={{
                              height: "25px",
                              borderRadius: "12px",
                              width: "100px",
                              color: "black",
                            }}
                          >
                            {newJob?.department}
                          </span>
                          <span
                            className="badge  border text-center"
                            style={{
                              height: "25px",
                              borderRadius: "12px",
                              width: "70px",
                              color: "black",
                            }}
                          >
                            {newJob?.jobType}
                          </span>
                          <span
                            className="badge  border text-center"
                            style={{
                              height: "25px",
                              borderRadius: "12px",
                              width: "60px",
                              color: "black",
                            }}
                          >
                            Remote
                          </span>
                        </div>
                        <p
                          className="px-2   text-muted"
                          style={{ fontSize: "13px", fontWeight: "600" }}
                        >
                          {/* {newJob?.jobDescription} */}
                        </p>
                        <div className="d-flex justify-content-between px-3 py-0">
                          {/* <p>{newJob?.requirements}</p> */}
                          {/* <p>{newJob?.benefits}</p> */}
                        </div>
                        <div className="d-flex justify-content-between px-3 mb-0 py-0">
                          <li>
                            <p>
                              4+ years <br /> HR/People Ops:
                              {/* {newJob?.experience} */}
                            </p>
                          </li>
                          <span
                            className="badge border text-center"
                            style={{
                              height: "25px",
                              borderRadius: "12px",
                              width: "110px",
                              color: "black",
                            }}
                          >
                            Parental leave
                          </span>
                        </div>
                        <div className="d-flex justify-content-between px-3 mb-0 py-0">
                          <li>{/* <p>{newJob?.skills}</p> */}</li>
                          <p>Excellent communication</p>

                          <span
                            className="badge border text-center"
                            style={{
                              height: "25px",
                              borderRadius: "12px ",
                              width: "110px",
                              color: "black",
                            }}
                          >
                            Wellness stipend
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-0 px-3 py-0">
                          <li>
                            <p> Familiar with HRIS tools</p>
                          </li>
                          {/* <span className="badge border   text-center" style={{height:"20px",width:"110px",color:"black"}}>Remote-friendly</span> */}
                        </div>
                        {/* <div className="d-flex justify-content-between px-3 py-0">
                        <li><p>+ 1 more</p></li>
                    </div> */}
                        <div className="d-flex justify-content-center gap-2">
                          <div>
                            <span
                              className="badge border   text-center"
                              style={{
                                height: "30px",
                                width: "170px",
                                color: "black",
                              }}
                            >
                              {newJob?.minimumSalary}-{newJob?.maximumSalary}
                            </span>
                          </div>
                          <div>
                            <span
                              className="badge border   text-center"
                              style={{
                                height: "30px",
                                width: "120px",
                                color: "black",
                              }}
                            >
                              {/* {newJob?.applicationclosingdate} */}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 gap-3 ">
                          <button
                            onClick={() => navigate(`/job/${newJob._id}`)}
                            style={{
                              height: "40px",
                              width: "120px",
                              borderRadius: "12px",
                            }}
                            className="btn  border "
                          >
                            view details
                          </button>
                          <button
                          disabled = {userRole !== "applicant" || newJob.status === "Inactive"}
                          
                            onClick={() =>
                              
                              navigate(`/create-application/${newJob._id}`)
                            }
                            style={{ height: "35px", width: "70px" }}
                            className="btn btn-dark"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
