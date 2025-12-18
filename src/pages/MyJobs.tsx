import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";


export default function MyJobs() {
  const navigate = useNavigate();
  const [job, setJob] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem("user")!);
  const userId = user?._id;

  const fetchJob = async () => {
    try {
      const res = await api.get(`/job?createdBy=${userId}`);
      console.log("fetch job createdBy successfully", res.data);
      setJob(res.data.foundJobsCreatedBy);
      // setAplication(res.data.countApplication)

    } catch (err: any) {
      console.error("error to fetch job createdBy");
    }
  };

  const updateJob = (id: string) => {
    navigate(`/update-job/${id}`);
  };

  const deleteJob = async(id: string) => {
    try {
      const res = await api.delete(`/job/${id}`);
      console.log("job deleted successfully", res.data);
      fetchJob();
    } catch (err: any) {
      console.error("error to delete job");
    }
  };


  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <>
      <NavBar />

      <div style={{ background: "#ffffff" }}>
        <div className="container p-2">
          <h1 className="fw-bold mt-3" style={{ fontSize: "24px" }}>
            Your Job Listings
          </h1>
          <p style={{ fontSize: "16px" }}>
            View and manage the jobs posted by your organization.
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
            {job.map((job: any, ind: any) => {
              return (
                <li key={ind}>
                  {
                    <div className="col" style={{ height: "600" }}>
                      <div
                        className="border p-3"
                        style={{ borderRadius: "12px" }}
                      >
                        <div className="d-flex justify-content-between gap-4 p-4">
                          <h5 style={{color:"black",fontSize:"12px"}}>{job?.applicationCount}</h5>
                          <h6 style={{ fontSize: "18px", fontWeight: "700" }}>
                            {job?.jobTitle}
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
                              {job.status}
                            </span>
                          </div>

                          
                          <div className="dropdown"

                          >
                            <button
                              className="dropdown-toggle bg-success"
                              data-bs-toggle="dropdown"
                              style={{
                                height: "40px",
                                width: "30px",
                                borderRadius: "8px",
                                color: "white",
                              }}
                            >
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item " href="#">
                                    status
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <button
                                      onClick={() => updateJob(job._id)}
                                      className="rounded bg-dark"
                                      style={{
                                        height: "30px",
                                        width: "60px",
                                        color: "white",
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <button
                                      onClick={() => deleteJob(job._id)}
                                      className=" rounded bg-dark"
                                      style={{
                                        height: "30px",
                                        width: "70px",
                                        color: "white",
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </a>
                                </li>
                              </ul>
                            </button>
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
                            {job?.department}
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
                            {job?.jobType}
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
                              {job?.minimumSalary}-{job?.maximumSalary}
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
                            onClick={() => navigate(`/job/${job._id}`)}
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
                            onClick={() =>
                              navigate(`/my-application/${job._id}`)
                            }
                            style={{ height: "35px", width: "155px" }}
                            className="btn btn-dark"
                          >
                            View Applications
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
