import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import NavBar from "./NavbarComponent";

export default function MyApplication() {
  const [application, setApplication] = useState<any[]>([]);

  // const {user} = useAuth()
  const navigate = useNavigate();
  const { jobId } = useParams();

  const fetchApplication = async () => {
    try {
      const res = await api.get(`/application/job/${jobId}`);
      setApplication(res.data.applications);
    } catch (err: any) {
      console.error("error to fetch application by job");
    }
  };

  useEffect(() => {
    fetchApplication()
  }, []);

  return (
    <>
      <NavBar />

      {/* Page Header */}
      <div className="container mt-5">
        <h1 className="text-center fw-bold" style={{ fontSize: "36px" }}>
          Applied Applications
        </h1>
        <p className="text-center text-muted mt-2">
          Track all your job applications and their current status
        </p>
      </div>

      {/* Applications List */}
      <div className="container mt-5">
        {application?.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <h5>No applications found</h5>
            <p>You haven’t applied for any job yet.</p>
          </div>
        ) : (
          <div className="row g-4">
            {application.map((application: any) => {
              const job = application.jobId;

              return (
                <div key={application._id} className="col-md-6 mt-40 col-lg-4">
                  <div
                    className="card h-200 border-0  mt-20 shadow-sm"
                    style={{ borderRadius: "16px" }}
                  >
                    <div className="card-body d-flex flex-column">
                      {/* Title */}
                      <h5 className="fw-bold mb-2">
                        {application?.coverLetter}
                      </h5>

                      {/* Job Info */}
                      <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                        📅 Closing Date:{" "}
                        <strong>{job?.applicationclosingdate}</strong>
                      </p>

                      {/* Badges */}
                      <div className="d-flex gap-2 flex-wrap mb-3">
                        <span
                          className="badge px-3 py-2"
                          style={{
                            background:
                              application?.status === "approved"
                                ? "#dcfce7"
                                : application?.status === "pending"
                                ? "#fef9c3"
                                : "#fee2e2",
                            color:
                              application?.status === "approved"
                                ? "#166534"
                                : application?.status === "pending"
                                ? "#854d0e"
                                : "#991b1b",
                            borderRadius: "20px",
                          }}
                        >
                          {application?.status}
                        </span>

                        <span
                          className="badge border text-dark px-3 py-2"
                          style={{ borderRadius: "20px" }}
                        >
                          💰 {application?.expectedSalary}
                        </span>
                      </div>

                      {/* Spacer */}
                      <div className="mt-auto">
                        <button
                          onClick={() =>
                            navigate(
                              `/application-detail/${application?._id}`
                            )
                          }
                          className="btn btn-primary w-100"
                          style={{ borderRadius: "10px" }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
