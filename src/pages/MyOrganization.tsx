import { useEffect, useState } from "react";
import api from "../config/api";
import {  useNavigate } from "react-router-dom";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

export default function MyOrganizations() {
    const navigate = useNavigate()
  const [organization, setOrganization] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
   


    const {user} = useAuth()
   

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      if(user?.role === "super admin"){
        const res = await api.get("/organization")
        console.log("found organization by super admin",res.data)
        setOrganization(res.data.foundAllOrganizations || res.data);
      }else if(user?.role === "organization"){
        const res = await api.get(`/organization?admin=${user?._id}`);
      console.log(" found organizations successfully", res.data);
      setOrganization(res.data.foundOrganizations);
      }
     
    } catch (err: any) {
      console.error("error to fetch organizations");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrganization()
  }, []);

  const filteredOrganizations = organization.filter((org: any) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'badge bg-success';
      case 'reject': return 'badge bg-danger';
      case 'block': return 'badge bg-warning';
      case 'unblock': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        {/* Hero Section */}
        <div className="hero-section text-white py-5" style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "300px"
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3">
                  <i className="bi bi-building me-3"></i>My Organizations
                </h1>
                <p className="lead mb-4">
                  Manage and oversee the organizations you administer.
                  Create jobs, update information, and track your organizational activities.
                </p>
                <div className="d-flex align-items-center">
                  <div className="bg-white bg-opacity-20 rounded-pill px-3 py-2 me-3">
                    <i className="bi bi-building-fill text-success me-2"></i>
                    <span className="fw-semibold">{organization.length} Organizations</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-pill px-3 py-2">
                    <i className="bi bi-briefcase text-info me-2"></i>
                    <span className="fw-semibold">Job Management</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 text-center">
                <div className="floating-icon">
                  <i className="bi bi-building-gear-fill display-1 text-white opacity-75"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions Section */}
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="bi bi-search text-muted"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0 ps-0"
                          placeholder="Search organizations by name or description..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{ fontSize: "16px" }}
                        />
                        {searchTerm && (
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setSearchTerm("")}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <button
                        onClick={() => navigate("/create-job")}
                        className="btn btn-primary btn-lg"
                        disabled={user?.role !== "organization"}
                      >
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="container-fluid pb-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading organizations...</p>
                </div>
              ) : filteredOrganizations.length === 0 ? (
                <div className="text-center py-5">
                  <div className="empty-state">
                    <i className="bi bi-building-x display-1 text-muted mb-3"></i>
                    <h3 className="text-muted">No Organizations Found</h3>
                    <p className="text-muted">
                      {searchTerm ? "Try adjusting your search terms" : "No organizations available"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  {filteredOrganizations.map((org: any, ind: any) => (
                    <div key={org._id || ind} className="col-12 col-md-6 col-lg-4">
                      <div className="card h-100 shadow-sm hover-card position-relative" style={{
                        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        cursor: "pointer"
                      }}>
                        <div className="card-header bg-white border-bottom-0 pb-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center">
                              <div className="organization-icon me-3">
                                <i className="bi bi-building-fill text-primary" style={{ fontSize: "2rem" }}></i>
                              </div>
                              <div>
                                <h5 className="card-title mb-1 fw-bold text-truncate" style={{ maxWidth: "200px" }}>
                                  {org.name}
                                </h5>
                                <span className={`badge ${getStatusBadgeClass(org.status)} fs-6`}>
                                  {org.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <p className="card-text text-muted mb-3" style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                          }}>
                            {org.description}
                          </p>

                          <div className="row g-2 mb-3">
                            <div className="col-6">
                              <div className="d-flex align-items-center text-muted small">
                                <i className="bi bi-people-fill me-2 text-primary"></i>
                                <span>24 members</span>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="d-flex align-items-center text-muted small">
                                <i className="bi bi-calendar-event me-2 text-primary"></i>
                                <span>{new Date(org.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-footer bg-light border-top-0">
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => navigate(`/organization/${org._id}`)}
                              className="btn btn-primary flex-fill"
                            >
                              <i className="bi bi-eye me-1"></i>View Details
                            </button>
                            <button
                              onClick={() => navigate(`/update-organization/${org._id}`)}
                              className="btn btn-outline-primary flex-fill"
                            >
                              <i className="bi bi-pencil me-1"></i>Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }

        .organization-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .empty-state {
          padding: 3rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .input-group-text {
          border-radius: 8px 0 0 8px !important;
        }

        .form-control {
          border-radius: 0 8px 8px 0 !important;
          border-left: none !important;
        }
      `}</style>
    </>
  );
}
