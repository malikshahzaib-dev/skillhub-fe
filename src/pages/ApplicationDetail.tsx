import { useEffect, useState } from "react";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../config/AuthProvider";

export default function ApplicationDetail(){
     const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch Application
  const fetchApplication = async () => {
    try {
      const res = await api.get(`/application/${id}`);
      console.log("Application fetched", res.data);
      setApplication(res.data);
    } catch (err: any) {
      console.error("Error fetching application", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Status
  const updateStatus = async (status: string) => {
    try {
      const res = await api.patch(`/application/${id}/status`, { status });
      console.log("Status updated successfully", res.data);

      setApplication({
        ...application,
        status: status,
      });

    } catch (err: any) {
      console.error("Error updating status", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    fetchApplication();
  }, [id, user]);

  if (loading) return <p>Loading...</p>;
  if (!application) return <p>Application not found</p>;

    return(
        <>
        <NavBar/>
        
        <div className="bg-light" style={{  minHeight: "100vh", padding: "20px 0" }}>
            <div className="container">
                <h1 className="fw-bold mb-4" style={{ fontSize: "32px", color: "#000" }}>
                    Application Information
                </h1>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Application Details</h5>
                    {user?.role === "organization" && (
  <div className="d-flex align-items-center gap-3">
    <span className="text-muted">Status:</span>

    <select
      className="form-select"
      style={{ width: "150px" }}
      value={application?.status}
      onChange={(e) => updateStatus(e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Hired">Hired</option>
      <option value="Interview">Interview</option>
      <option value="Rejected">Rejected</option>
    </select>
  </div>
)}
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">First Name</h5>
                                <p className="card-text">{application?.applicantId?.user?.firstName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Last Name</h5>
                                <p className="card-text">{application?.applicantId?.user?.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Email</h5>
                                <p className="card-text">{application?.applicantId?.user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Phone</h5>
                                <p className="card-text">+{application?.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Address</h5>
                                <p className="card-text">{application?.applicantId?.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Expected Salary</h5>
                                <p className="card-text">{application?.expectedSalary}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Cover Letter</h5>
                                <p className="card-text">{application?.coverLetter}</p>
                            </div>
                        </div>
                    </div>
                    {application?.resume && (
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Resume</h5>
                                    <a href={application?.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Resume</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}