import { useNavigate } from "react-router-dom";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";
import { useEffect, useState } from "react";
import api from "../config/api";

type Organization = {
  status: string;
  _id: string;
  organizationName?: string;
};

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [organizationData, setOrganizationData] = useState<Organization | null>(null);
  const [search, setSearch] = useState("");

  const role = user?.role;

  // ✅ Fetch organization
  const findOrganizationByUser = async () => {
    try {
      const res = await api.get(`/organization/users/${user?._id}`);
      setOrganizationData(res.data);
    } catch (err) {
      console.log("Error fetching organization");
    }
  };

  useEffect(() => {
    if (user?.role === "organization") {
      findOrganizationByUser();
    }
  }, [user?._id]);

  // ✅ Handlers
  const handleBrowseJobs = () => {
    navigate(`/jobs?search=${search}`);
  };

  const handleCreateJobs = () => {
    if (
      user &&
      role === "organization" &&
      organizationData?.status === "approved"
    ) {
      navigate("/create-job");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-vh-100 bg-light">
        {/* 🔥 HERO SECTION */}
        <section
          className="text-white py-5"
          style={{
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
          }}
        >
          <div className="container text-center">
            <h1 className="display-4 fw-bold mb-3">
              Get Hired Faster 🚀
            </h1>
            <p className="lead mb-4">
              Find jobs that match your skills or hire top talent easily.
            </p>

            {/* 🔍 Search Bar */}
            <div className="d-flex justify-content-center mb-4">
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control w-50 me-2"
                style={{ borderRadius: "2rem", padding: "12px" }}
              />
              <button
                onClick={handleBrowseJobs}
                className="btn btn-warning fw-bold"
                style={{ borderRadius: "2rem" }}
              >
                Search
              </button>
            </div>

            {/* 🎯 CTA Buttons */}
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                onClick={handleBrowseJobs}
                className="btn btn-light fw-bold"
              >
                Explore Jobs
              </button>

              {user?.role === "organization" && (
                <button
                  onClick={handleCreateJobs}
                  className="btn btn-danger fw-bold"
                >
                  Post a Job
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 🧠 HOW IT WORKS */}
        <section className="py-5">
          <div className="container text-center">
            <h2 className="fw-bold mb-5">How It Works</h2>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card p-4 shadow-sm h-100">
                  <h5 className="fw-bold">Create Profile</h5>
                  <p className="text-muted">
                    Sign up and build your professional profile.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-4 shadow-sm h-100">
                  <h5 className="fw-bold">Find Jobs</h5>
                  <p className="text-muted">
                    Browse jobs that match your skills.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card p-4 shadow-sm h-100">
                  <h5 className="fw-bold">Get Hired</h5>
                  <p className="text-muted">
                    Apply and land your dream job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📊 STATS */}
        <section className="bg-white py-5">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-3">
                <h2 className="fw-bold">10k+</h2>
                <p>Jobs</p>
              </div>
              <div className="col-md-3">
                <h2 className="fw-bold">5k+</h2>
                <p>Companies</p>
              </div>
              <div className="col-md-3">
                <h2 className="fw-bold">50k+</h2>
                <p>Users</p>
              </div>
              <div className="col-md-3">
                <h2 className="fw-bold">95%</h2>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* 📩 CTA SECTION */}
        <section className="py-5 text-center bg-dark text-white">
          <h2 className="fw-bold mb-3">
            Ready to Get Started?
          </h2>
          <button
            onClick={() => navigate("/sign-up")}
            className="btn btn-warning fw-bold"
          >
            Create Account
          </button>
        </section>

        {/* 🧾 FOOTER */}
        <footer className="bg-dark text-white py-4">
          <div className="container text-center">
            <h5>JobPortal</h5>
            <p className="mb-0">
              © 2026 All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomePage;