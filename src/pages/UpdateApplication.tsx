import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";

const UpdateApplication = () => {
  const navigate = useNavigate()
  const [application,setApplication] = useState<any>({})
  const [coverLetter,setCoverLetter] = useState("")
  const [expectedSalary,setExpectedSalary] = useState("")
  const {id} = useParams()
  

  const fetchApplication = async() => {
    try {
      const res = await api.get(`/application/${id}`)
      console.log("fetch application successfully",res.data)
      setApplication(res.data)
      setCoverLetter(res.data.coverLetter)
      setExpectedSalary(res.data.expectedSalary)
    }catch(err:any){
      console.error("error to fetch applicatioin")
    }
  }





  useEffect(()=> {
    fetchApplication()
  },[id])

  const updateApplication = async(e:any) => {
    e.preventDefault()
    try{
      const payLoad = {
        
        coverLetter,
        expectedSalary
      }
      const res = await api.patch(`/application/${id}`,payLoad)
      console.log("application updated successfully",res.data)
      navigate("/my-jobapplied")
    }catch(err:any){
      console.error("error to update application")
    }
  }
  
  if(!application){
    return <p>loading</p>
  }

  return (
    <>



     <NavBar/>



      <div  style={{ background: "#f9f9f5"  }}>
        <div className="pb-3 pt-5">
          <h1 className="text-center fs-48 fw-bold mt-2">Update Your Application</h1>
          <p className="text-center mt-2">
             Review your existing details and make necessary changes below.
          </p>
        </div>

        <div className=" d-flex justify-content-center">
          <form
            onSubmit={updateApplication}
            style={{
              background: "transparent",
              width: "75%",
              padding: "30px",
            }}
            className="border rounded-2 mb-5"
          >
            <div
              className=" p-4 rounded mb-4 border"
              style={{ background: "white", width: "100%" }}
            >
              <h1>Personal Information</h1>
              <p>Review and update your application details below.</p>

              <label htmlFor="fullName mt-2"> Cover Letter</label>
              <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
                id="fullName"
                placeholder="Enter your cover letter"
                className="form-control mt-3"
              ></textarea>
           


              <label className="mt-3" htmlFor="expectedSalary">
                Expected Salary
              </label>
              <input
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
                type="number"
                id="expectedSalary"
                placeholder="Add your demanded salary"
                className="form-control mt-3"
              />
             
            </div>

            <div
              className="p-4 rounded mb-4 border"
              style={{
                background: "white",
                width: "100%",
              }}
            >
              <h1>Resume Upload</h1>
              <p>Update or replace your CV/Resume if needed.</p>
              <label htmlFor="resume">Upload Resume</label>
              <input
                type="file"
                id="resume"
                className="form-control mt-3"
              />
            </div>

            <div
              className="d-flex gap-3 justify-content-center p-4"
              style={{ background: "transparent", width: "100%" }}
            >
              <button
                type="submit"
                style={{ height: "50px", width: "180px" }}
                className="btn btn-primary"
              >
                Update Application
              </button>
              <button
                type="reset"
                style={{ height: "50px", width: "180px" }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateApplication;
