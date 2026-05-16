import { useNavigate } from "react-router-dom";
import NavBar from "./NavbarComponent";
import "../assets/styles.css";
import { useAuth } from "../config/AuthProvider";

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const {user} = useAuth()



  const handleClik = (path: string) => {
    if (!user) {
      navigate("/sign-in");
    } else {
      navigate(path);
    }

    
  };


  return (
    <>
      <NavBar />
      <div className="bg-light min-vh-100">
        {/* Hero Section */}
        <section className="dashboard-hero">
          <div className="container">
            <h1 className="display-4 fw-bold mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="lead mb-0">
              Manage your job search, track applications, and update your
              profile all in one place.
            </p>
          </div>
        </section>

        {/* Actions Section */}
        <section className="py-5">
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="dashboard-card card">
                  <div className="card-body">
                    <div className="dashboard-icon">🔍</div>
                    <h5 className="card-title fw-bold">Browse Jobs</h5>
                    <p className="card-text text-muted">
                      Explore thousands of job opportunities that match your
                      skills.
                    </p>
                    {/* <button
                      onClick={() => handleClik("/jobs")}
                      className="btn dashboard-btn text-white"
                    >
                      View Jobs
                    </button> */}
                      <button
                      onClick={() => handleClik("/jobs")}
                      className="dashboard-btn   text-white"
                    >
                      View Jobs
                    </button>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="dashboard-card card">
                  <div className="card-body">
                    <div className="dashboard-icon">📋</div>
                    <h5 className="card-title fw-bold">My Applications</h5>
                    <p className="card-text text-muted">
                      Track the status of all your job applications in one
                      place.
                    </p>
                    <button
                      onClick={() => handleClik("/my-jobapplied")}
                      className="btn dashboard-btn text-white"
                    >
                      View Applications
                    </button>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="dashboard-card card">
                  <div className="card-body">
                    <div className="dashboard-icon">👤</div>
                    <h5 className="card-title fw-bold">Update Profile</h5>
                    <p className="card-text text-muted">
                      Keep your profile up to date to improve your job matches.
                    </p>
                    <button
                      onClick={() =>
                        navigate(`/update-applicantinformation/${user?._id}`)
                      }
                      className="btn dashboard-btn text-white"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
