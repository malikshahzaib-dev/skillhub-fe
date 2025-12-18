import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api";

interface Job{
  jobTitle:string,
  department:string,
  location:string,
  jobType:string,
  status:string,
  minimumSalary:number,
  maximumsSalary:number,
  jobDescription:string,
  requirements:string[],
  benefots:string[],
  applicationclosingdate:Date,
  jobLink:string,
  createdBy:string

}  

const JobPage = () => {
  const navigate = useNavigate()  
    const location = useLocation()
    const {newJob,createdBy}   =  location.state || {}
    const [job,setJob] = useState<Job[]>([])
    console.log("new job from create job page",newJob)
    console.log("createdBy",createdBy)

    const fetchJobs = async () => {

    try{
        const res = await api.get("/job/job")
         console.log(" fetch jobs successfully",res.data)
         setJob(res.data.foundJobs)

      }catch (error) {
        console.error("Error fetching jobs:", error)
    }
};
    useEffect(() => {
      fetchJobs()
    },[newJob])


  return (
    <>
      <div className=" " style={{ background: "#f9f9f5" }}>
        <h1 className="text-center p-2">SkillHub - Job</h1>
        <div className="d-flex justify-content-center p-3">
          <div
            style={{
              height: "800px",
              width: "950px",
              background: "#f9f9f5",
              border: "1 px solid",
            }}
          >
            <div className=" ">
              <div className="row g-4">
                <div className="col">
                  <div
                    className=" rounded  border  p-4"
                    style={{ height: "780px", background: "#f9f9f5" }}
                  >
                    <h1 className="fs-8">Add Job</h1>
                    <p>Add new opportunities to your SkillHub.</p>
                    <label htmlFor="" className="form-label ">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder=""
                    />
                    <label htmlFor="" className="form-label mt-2">
                      Department
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder=""
                    />
                    <label htmlFor="" className="form-label mt-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder=""
                    />

                    <label htmlFor="type" className="form-label mt-2">
                      JobType
                    </label>
                    <select
                      name="type"
                      id="type"
                      className="form-control mt-2"
                      style={{ width: "25%" }}
                    >
                      <option value="part-time">part-time</option>
                      <option value="full-time">full-time</option>
                      <option value="internship">internship</option>
                      <option value="contract">contract</option>
                    </select>
                    <label htmlFor="" className="form-label mt-3">
                      JobDescription
                    </label>
                    <textarea
                      name=""
                      id=""
                      className="form-control mt-3 "
                      placeholder="Enter job description here"
                    ></textarea>

                    <label htmlFor="" className="form-label mt-2">
                      Job Link
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder=""
                    />
                    <div className="d-flex justify-content-end mt-4 p-2 ">
                      <button
                        className="rounded"
                        style={{
                          height: "40px",
                          width: "100px",
                          background: "black",
                          color: "white",
                        }}
                      >
                        Save Jobb
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="bg- rounded h-100 border"
                    style={{ background: "#f9f9f5" }}
                  >
                    <h2 className="mt-3 p-3">Job Overview</h2>
                    <p className="mt-3 p-3">Quick counts of your stored data</p>
                    <div className="p-4">
                      <label htmlFor="" className="form-label"></label>
                      <input type="number" className="form-control" />
                      <label htmlFor="" className="form-label"></label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                </div>
                <div 
                className="mt-5"
                  style={{
                    height: "100vh",
                    width: "100%",
                    background: "#f9f9f5",
                    
                  }}
                >
                  <h1 className="fs-4 mt-4">Job Listing</h1>

                  { 
                    job.map((newJob:any, index:any) => (
                      <ul >
                        <li key={index}>
                      <div
                      key={index}
                        className="mt-2 rounded border p-4"
                        style={{
                          height: "520px",
                          width: "100%",
                          background: "white",
                          padding: "10px",
                        }}
                      >
                        <li>
                        <h5>JobTitle:{newJob.jobTitle}</h5>
                        <p mt-3>
                          JobDepartment: {newJob.department} 
                          <p className="mt-3">Location: {newJob.location} </p>
                          <p className="mt-3">jobType: {newJob.jobType}</p>
                        </p>
                        <p className="mt-3">Status : {newJob.status}</p>
                        <p className="mt-3"> maximumSalary: {newJob.minimumSalary}</p>
                        <p className="mt-3"> minimumSalary:  {newJob.maximumSalary}</p>
                        <p className="mt-3">requirements:{newJob.requirements}</p>
                        <p className="mt-3">responsibilities:{newJob.responsibilities}</p>
                        <p className="mt-3">skills:{newJob.skills}</p>
                        <p className="mt-3">benefits:{newJob.benefits}</p>
                        <button onClick={() => navigate(`/job/${newJob._id}`)}  style={{height:"40px",width:"120px",background:"black"}} className="btn btn-primary">View Detail</button>
                        </li>
                        </div>
                      </li>
                      </ul>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPage;


