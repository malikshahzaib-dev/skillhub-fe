import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import "../assets/styles.css";
import { useAuth } from "../config/AuthProvider";

export default function Jobs() {
  const navigate = useNavigate();

  const {user} = useAuth();
  const role = user?.role
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
    fetchJob()
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
      <>
        <NavBar />
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="bg-light min-vh-100">
        {/* Hero Section */}
        <section className="jobs-hero">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h1 className="display-4 fw-bold mb-4">Find Your Dream Job</h1>
                <p className="lead mb-5">
                  Discover opportunities that match your skills and aspirations
                </p>
                <div className="search-container">
                  <input
                    value={searchJob}
                    onChange={(e) => setSearchJob(e.target.value)}
                    placeholder="Search for jobs..."
                    className="search-input"
                    type="text"
                  />
                  <button onClick={handleSearchChange} className="search-btn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="py-5">
          <div className="container">
            <div className="row mb-4">
              <div className="col">
                <h2 className="fw-bold">Open Positions</h2>
                <p className="text-muted">Explore opportunities across different departments</p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {job.map((newJob: any, ind: any) => (
                <div key={ind} className="col">
                  <div  className="job-card card h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="job-title card-title fw-bold">{newJob?.jobTitle}</h5>
                        <span className={`badge ${newJob.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                          {newJob.status}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="badge bg-light text-dark me-2 job-badge">{newJob?.department}</span>
                        <span className="badge bg-light text-dark me-2 job-badge">{newJob?.jobType}</span>
                        <span className="badge bg-light text-dark job-badge">Remote</span>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">
                          <strong>Experience:</strong> 4+ years HR/People Ops
                        </small>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">
                          <strong>Skills:</strong> Excellent communication, Familiar with HRIS tools
                        </small>
                      </div>

                      <div className="mb-3">
                        <span className="badge bg-light text-dark me-2 job-badge">Parental leave</span>
                        <span className="badge bg-light text-dark job-badge">Wellness stipend</span>
                      </div>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="salary-badge badge text-white fw-bold">
                            ${newJob?.minimumSalary} - ${newJob?.maximumSalary}
                          </span>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            onClick={() => navigate(`/job/${newJob._id}`)}
                            className="btn btn-outline-primary flex-fill"
                          >
                            View Details
                          </button>
                          <button
                            disabled={role !== "applicant" || newJob.status === "Inactive"}
                            onClick={() => navigate(`/create-application/${newJob._id}`)}
                            className="btn btn-primary flex-fill"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {job.length === 0 && (
              <div className="text-center py-5">
                <h3 className="text-muted">No jobs found</h3>
                <p className="text-muted">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
