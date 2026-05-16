import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

export default function JobDetaill() {
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const navigate = useNavigate();
  const {user} = useAuth();
  const role = user?.role;


  const fetchJob = async () => {
    try {
      const res = await api.get(`/job/${jobId}`);
      setJob(res.data);
    } catch (err: any) {
      console.error("Error fetching job", err);
    }
  };

  useEffect(() => {
    fetchJob();
    //if (!user) navigate('/sign-in');
  }, [jobId]);

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 1100 }}>
        <NavBar />
      </div>

      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingTop: "20px" }}>
        <div className="container-fluid py-5">
          <div className="row g-4">
            <div className="col-md-4 col-lg-3">
              <div
                className="card shadow-lg p-4 sticky-top"
                style={{ top: "30px", borderRadius: "16px", backgroundColor: "#ffffff" }}
              >
                <h3 className="fw-bold mb-2">{job?.jobTitle}</h3>
                <p className="text-muted mb-4">{job?.department} · {job?.jobType}</p>

                <div className="d-grid gap-2 mb-4">
                  {["About Role", "Requirements", "Responsibilities", "Benefits", "Details"].map((item) => (
                    <button
                      key={item}
                      className="btn btn-outline-primary text-start rounded-3"
                      style={{
                        transition: "0.2s",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => e.currentTarget.classList.add("shadow-sm")}
                      onMouseLeave={(e) => e.currentTarget.classList.remove("shadow-sm")}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <span className="badge bg-secondary mt-4 w-100 py-2 text-center rounded-3 fs-6 shadow-sm">
                  {job?.applicationclosingdate ? new Date(job?.applicationclosingdate).toLocaleDateString() : ""}
                </span>
              </div>
            </div>

           
            <div className="col-md-8 col-lg-9">
              <div className="card shadow-lg p-5 rounded-4" style={{ backgroundColor: "#ffffff" }}>
              
                <h2 className="fw-bold mb-3">{job?.jobTitle}</h2>
                <p className="fs-5 text-muted mb-4">{job?.jobDescription}</p>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {[job?.status, job?.jobType, job?.department, `${job?.minimumSalary}-${job?.maximumSalary}`].map((badge, idx) => (
                    <span
                      key={idx}
                      className="badge bg-light text-dark border rounded-pill py-1 px-3"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)", fontSize: "14px" }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {[job?.applicationclosingdate, job?.location].map((badge, idx) => (
                    <span
                      key={idx}
                      className="badge bg-light text-dark border rounded-pill py-1 px-3"
                      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)", fontSize: "14px" }}
                    >
                      {badge ? new Date(badge).toLocaleDateString() : badge}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                {role === "applicant" && (
                  <button
                    disabled={job?.status === "Inactive"}
                    onClick={() => navigate(`/create-application/${job?._id}`)}
                    className="btn fw-bold mb-5 rounded-3 shadow-sm"
                    style={{
                      height: "50px",
                      width: "160px",
                      fontWeight: 600,
                      background: "linear-gradient(90deg, #4b6cb7, #182848)",
                      border: "none",
                      color: "#fff",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    Apply Now
                  </button>
                )}

                {/* Job Sections */}
                <div className="mt-5">
                  <h3 className="fw-semibold border-bottom pb-2">Requirements</h3>
                  <p className="text-muted">What you need to be successful in this role.</p>
                  <ul className="text-dark">
                    <li>{job?.requirements}</li>
                  </ul>
                </div>

                <div className="mt-5">
                  <h3 className="fw-semibold border-bottom pb-2">Responsibilities</h3>
                  <p className="text-muted">What you will do day-to-day.</p>
                  <ul className="text-dark">
                    <li>{job?.responsibilities}</li>
                  </ul>
                </div>

                <div className="mt-5">
                  <h3 className="fw-semibold border-bottom pb-2">Benefits</h3>
                  <ul className="text-dark">
                    <li>{job?.benefits}</li>
                  </ul>
                </div>

                <div className="mt-5">
                  <h5 className="fw-semibold border-bottom pb-2">Details</h5>
                  <p><strong>Department:</strong> {job?.department}</p>
                  <p><strong>Job type:</strong> {job?.jobType}</p>
                  <p><strong>Location:</strong> {job?.location}</p>
                  <p><strong>Salary range:</strong> {job?.minimumSalary}-{job?.maximumSalary}</p>
                  <p><strong>Application closing date:</strong> {job?.applicationclosingdate ? new Date(job?.applicationclosingdate).toLocaleDateString() : ""}</p>
                  <p><strong>Status:</strong> {job?.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
