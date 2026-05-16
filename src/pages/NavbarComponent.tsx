import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useAuth } from "../config/AuthProvider";

function NavBar() {
  const { user } = useAuth();
  const role = user?.role;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const gradient = "linear-gradient(135deg, #1e3c72, #2a5298)";

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const handleProfileClick = async () => {
    if (role === "organization") {
      try {
        const res = await api.get(`/organization/users/${user?._id}`);
        const org = res.data;

        if (!org) return alert("Organization not created");
        if (org.status !== "approved") return alert("Not approved");

        navigate(`/update-organization/${org._id}`);
      } catch {
        console.log("Org error");
      }
    } else {
      navigate(`/update-applicantinformation/${user?._id}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-3 sticky-top shadow-sm"
      style={{ background: gradient }}
    >
      <div className="container-fluid">

        {/* 🔥 Logo */}
        <span
          className="navbar-brand fw-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          🚀 JobPortal
        </span>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* LEFT LINKS */}
          <ul className="navbar-nav me-auto">

            {/* Public */}
            {!user && (
              <li className="nav-item">
                <span
                  className="nav-link cursor-pointer"
                  onClick={() => navigate("/jobs")}
                >
                  Jobs
                </span>
              </li>
            )}

            {/* Applicant */}
            {role === "applicant" && (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/jobs")}
                  >
                    Jobs
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/my-jobapplied")}
                  >
                    My Applications
                  </span>
                </li>
              </>
            )}

            {/* Organization */}
            {role === "organization" && (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/my-jobs")}
                  >
                    My Jobs
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    onClick={() => navigate("/my-organization")}
                  >
                  My  Organization
                  </span>
                </li>
              </>
            )}

            {/* Admin */}
            {role === "admin" && (
              <li className="nav-item">
                <span
                  className="nav-link cursor-pointer"
                  onClick={() => navigate("/all-organization")}
                >
                 Organizations
                </span>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <ul className="navbar-nav align-items-center">

            {/* Not logged in */}
            {!user && (
              <>
                <li className="nav-item me-2">
                  <button
                    className="btn btn-light rounded-pill px-4 cursor-pointer"
                    onClick={() => navigate("/sign-in")}
                  >
                    Login
                  </button>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-warning rounded-pill fw-bold px-4 cursor-pointer"
                    onClick={() => navigate("/sign-up")}
                  >
                    Get Started
                  </button>
                </li>
              </>
            )}

            {/* Logged in */}
            {user && (
              <li className="nav-item position-relative">
                <div
                  className="d-flex align-items-center cursor-pointer px-2"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${user._id}`}
                    className="rounded-circle me-2 border border-white"
                    style={{ width: 35, height: 35, objectFit: "cover" }}
                  />
                  <div className="text-white small">
                    <div className="fw-semibold">
                      {user.firstName} {user.lastName}
                    </div>
                    <div style={{ fontSize: "11px", opacity: 0.8 }}>
                      {role}
                    </div>
                  </div>
                </div>

                {/* Dropdown */}
                {showMenu && (
                  <div
                    className="bg-white text-dark shadow"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "110%",
                      borderRadius: "10px",
                      minWidth: "160px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="p-2 cursor-pointer"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </div>

                    <div className="border-top"></div>

                    <div
                      className="p-2 text-danger cursor-pointer"
                      onClick={handleLogOut}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;