import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

export default function MyJobs() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await api.get(`/job?createdBy=${user?._id}`);
      console.log("Jobs fetched successfully", res.data);

      setJobs(res.data.foundJobsCreatedBy);

    } catch (err: any) {
      console.error("Error fetching jobs", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Job
  const deleteJob = async (id: string) => {
    try {
      const res = await api.delete(`/job/${id}`);
      console.log("Job deleted successfully", res.data);

      // refresh jobs
      fetchJobs();

    } catch (err: any) {
      console.error("Error deleting job", err);
    }
  };

  // Navigate to update page
  const updateJob = (id: string) => {
    navigate(`/update-job/${id}`);
  };

  // Filter jobs
  const filteredJobs = jobs.filter((j: any) =>
    j.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {

    // if (!user) {
    //   navigate("/sign-in");
    //   return;
    // }

    if (user?._id) {
      fetchJobs();
    }

  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />

      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "60px 0",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Your Job Listings</h1>
          <p className="lead">
            View and manage the jobs posted by your organization.
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {filteredJobs.map((jobItem: any, ind: any) => {
            const isDropdownOpen = openDropdownId === jobItem._id;
            return (
              <div key={ind} className="col">
                <div
                  className="card h-100 shadow-sm"
                  style={{ borderRadius: "15px", transition: "transform 0.2s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title fw-bold">
                          {jobItem?.jobTitle}
                        </h5>
                        <small className="text-muted">
                          Applications: {jobItem?.applicationCount}
                        </small>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className={`badge ${jobItem.status === "active" ? "bg-success" : "bg-secondary"}`}
                          style={{ borderRadius: "20px" }}
                        >
                          {jobItem.status}
                        </span>
                        <div className="dropdown">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              setOpenDropdownId(
                                isDropdownOpen ? null : jobItem._id,
                              )
                            }
                            style={{
                              borderRadius: "50%",
                              width: "35px",
                              height: "35px",
                            }}
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>
                          {isDropdownOpen && (
                            <ul
                              className="dropdown-menu show"
                              style={{
                                position: "absolute",
                                right: 0,
                                zIndex: 1000,
                              }}
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => updateJob(jobItem._id)}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => deleteJob(jobItem._id)}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <span className="badge bg-light text-dark me-2">
                        {jobItem?.department}
                      </span>
                      <span className="badge bg-light text-dark me-2">
                        {jobItem?.jobType}
                      </span>
                      <span className="badge bg-light text-dark">Remote</span>
                    </div>
                    <div className="mb-3">
                      <p className="mb-1">
                        <strong>Experience:</strong> 4+ years HR/People Ops
                      </p>
                      <p className="mb-1">
                        <strong>Salary:</strong> {jobItem?.minimumSalary} -{" "}
                        {jobItem?.maximumSalary}
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary flex-fill"
                        onClick={() => navigate(`/job/${jobItem._id}`)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-outline-primary flex-fill"
                        onClick={() =>
                          navigate(`/my-application/${jobItem._id}`)
                        }
                      >
                        View Applications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
