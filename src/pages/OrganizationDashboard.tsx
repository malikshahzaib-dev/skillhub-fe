import { useNavigate } from "react-router-dom";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

const OrganizationDashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const role = user?.role;

  if (!user) {
    navigate("/sign-in");
  }
  const handleCreateJobPosting = () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    if (role !== "organization") {
      alert("Only organizations can create jobs");
      return;
    }

    navigate("/create-job");

    // useEffect(() => {
    //   if (!user) navigate("/sign-in");
    // });
  };

  return (
    <>
      <NavBar />
      <div
        className="hero-section"
        style={{
          width: "100%",
          minHeight: "100vh",
          color: "white",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#4b6cb7", // background color same
          backgroundImage: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)", // subtle gradient
        }}
      >
        <div className="text-center px-3">
          <h1
            className="fw-bold mb-4"
            style={{
              fontSize: "3rem",
              textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            }}
          >
            Organization Dashboard
          </h1>
          <p
            className="fs-5 mb-5"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: "1.6",
              textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            Welcome to your organization dashboard. Here you can manage job
            postings, review applications, and track your hiring process — all
            in one place.
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center p-3">
            <button
              onClick={handleCreateJobPosting}
              className="btn btn-primary fw-bold"
              style={{
                height: "60px",
                width: "220px",
                fontSize: "18px",
                borderRadius: "2rem",
                background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
                border: "none",
                boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.05)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 10px 20px rgba(0,0,0,0.4)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.3)";
              }}
            >
              Create Job Posting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationDashboard;
