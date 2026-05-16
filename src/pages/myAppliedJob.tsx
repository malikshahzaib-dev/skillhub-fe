import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import { Dropdown } from "react-bootstrap";
import "../assets/styles.css";
import { useAuth } from "../config/AuthProvider";

export default function MyAppliedJob() {
  const navigate = useNavigate();
  const [appliedJob, setAppliedJob] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  

  const {user} = useAuth()

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/application/user/${user?._id}`);
      setAppliedJob(res.data);
    } catch (error: any) {
      console.error("error to fetch job");
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = (id: string) => {
    navigate(`/update-application/${id}`);
  };

  const deleteApplication = async (id: string) => {
    try {
      await api.delete(`/application/${id}`);
      fetchJob();
    } catch (err: any) {
      console.error("error to delete application");
    }
  };

  useEffect(() => {
    fetchJob()
  }, []);

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
        <section className="applied-jobs-hero">
          <div className="container text-center">
            <h1 className="display-4 fw-bold mb-4">My Applied Jobs</h1>
            <p className="lead mb-0">
              Track all your job applications and their current status
            </p>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            {appliedJob.length === 0 ? (
              <div className="text-center py-5">
                <h3 className="text-muted">No applications found</h3>
                <p className="text-muted">You haven't applied to any jobs yet</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/jobs")}
                >
                  Browse Jobs
                </button>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {appliedJob.map((application: any) => {
                  const job = application.jobId;
                  const statusClass = `status-${application?.status?.toLowerCase()}`;

                  return (
                    <div key={application._id} className="col">
                      <div className="application-card card h-100">
                        <div className="card-body d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h5 className="card-title fw-bold text-truncate">
                              {job?.jobTitle || "Job Title"}
                            </h5>
                            <span className={`status-badge ${statusClass}`}>
                              {application?.status}
                            </span>
                          </div>

                          <div className="mb-3">
                            <p className="card-text text-muted small mb-2">
                              Location: {job?.location || "Location"}
                            </p>
                            <p className="card-text text-muted small">
                              Applied: {new Date(application.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="mb-3">
                            <span className="salary-badge badge text-white fw-bold">
                              Expected: ${application?.expectedSalary}
                            </span>
                          </div>

                          <div className="mt-auto d-flex gap-2">
                            <button
                              onClick={() => navigate(`/application-detail/${application?._id}`)}
                              className="btn btn-outline-primary flex-fill"
                            >
                              View Details
                            </button>

                            {/* React-Bootstrap Dropdown */}
                            <Dropdown className="flex-fill">
                              <Dropdown.Toggle variant="primary" className="w-100">
                                Actions
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => updateApplication(application._id)}>
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteApplication(application._id)}
                                  className="text-primary"
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
