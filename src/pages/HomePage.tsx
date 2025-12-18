import { useNavigate } from "react-router-dom";
import NavBar from "./NavbarComponent";

function HomePage() {
  const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem("user") || "null");
    const userRole = user?.role;


  const handleClik = () => {
  
    // const token = localStorage.getItem("token")
    if (user &&( userRole === "applicant" || userRole === "organization")) {
      navigate("/jobs");
    } else {
      navigate("/sign-in");
    }
  };
  const handleCreateJobs = () => {
   const organization = user?.organization
    // const token = localStorage.getItem("token")
    if (user && userRole === "organization" && organization?.status === "approved") {
      navigate("/create-job");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <>
      <NavBar />
      <div className="" style={{ height: "100%", background: "#f9f9f5" }}>
        {/* <div className="d-flex justify-content-between align-items-center p-5" style={{ height: "100px", width: "100%", background: "grey" }}>

                    <div className="d-flex gap-4">
                        <h1>📁</h1>
                        <h1 className="fs-24 fw-bold" style={{ color: "white" }}>JobPortal</h1>
                    </div>
                    <div className="d-flex gap-4">
                            <button  onClick={() => navigate("/sign-in")} className=" rounded" style={{ height: "40px", width: "100px", background: "white" }}>SignIn</button>
                            <button onClick={() => navigate("/employer-signup")} className="btn " style={{ width: "200px", height: "40px",background:"white" }}>Employers/Post Job</button>
                    </div>

                </div> */}

        <div className="d-flex justify-content-center">
          <div className="p-5" style={{ width: "950px" }}>
            <h1
              className="text-center mt-3"
              style={{ fontWeight: "bold", fontSize: "52px" }}
            >
              Find Your Dream Job Today
            </h1>
            <p className="text-center  p-3" style={{ fontSize: "36px" }}>
              Connect with top employers and discover opportunities that match
              your skills and aspirations. Join thousands of professionals who
              found their perfect career match.
            </p>

            <div className="d-flex gap-4 justify-content-center mb-2">
              <button
                onClick={handleClik}
                className="btn btn-primary"
                style={{
                  height: "40px",
                  width: "180px",
                  background: "#343434",
                }}
              >
                Browse Jobs
              </button>
              {/* <a href="/create-job"> */}
              <button
                className="rounded"
                type="button"
                onClick={handleCreateJobs}
                style={{ height: "40px", width: "180px" }}
              >
                Post a Job
              </button>
              {/* </a> */}
            </div>
          </div>
        </div>

        <h1 className="text-center fw-bold mt-5">How Job Portal Works</h1>

        <div className="d-flex justify-content-around gap-4 p-5">
          <div
            className="border rounded"
            style={{ height: "320px", background: "white", padding: "30px" }}
          >
            <p className="text-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-users"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
            </p>

            <h3 className="text-center">For Job Seeker</h3>
            <p className="text-center">
              Create your profile, browse opportunities, and apply with ease
            </p>
            <p className="text-center">• Browse thousands of job listings</p>
            <p className="text-center"> • Track application status</p>
            <p className="text-center">
              • Get matched with relevant opportunities
            </p>
          </div>
          <div
            className="border rounded"
            style={{ height: "320px", background: "white", padding: "30px" }}
          >
            <p className="text-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-license"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                <path d="M9 7l4 0" />
                <path d="M9 11l4 0" />
              </svg>
            </p>

            <h3 className="text-center">For Organization</h3>
            <p className="text-center">
              Create your profile, browse opportunities, and apply with ease
            </p>
            <p className="text-center">• Browse thousands of job listings</p>
            <p className="text-center"> • Track application status</p>

            <p className="text-center">
              • Get matched with relevant opportunities
            </p>
          </div>
          <div
            className="border rounded"
            style={{ height: "320px", background: "white", padding: "30px" }}
          >
            <p className="text-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-users"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
            </p>

            <h3 className="text-center">Smart Matching</h3>
            <p className="text-center">
              Create your profile, browse opportunities, and apply with ease
            </p>
            <p className="text-center">• Browse thousands of job listings</p>
            <p className="text-center"> • Track application status</p>

            <p className="text-center">
              • Get matched with relevant opportunities
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-around mb-4 mt-5">
          <div>
            <h1 style={{ color: "#2E8B57" }}>10k</h1>
            <p>Active Jobs</p>
          </div>
          <div>
            <h1 style={{ color: "#2E8B57" }}>5k</h1>
            <p>Companies</p>
          </div>
          <div>
            <h1 style={{ color: "#2E8B57" }}>50k</h1>
            <p>Job Seekers</p>
          </div>
          <div>
            <h1 style={{ color: "#2E8B57" }}>95%</h1>
            <p>Success Rate</p>
          </div>
        </div>

        <div
          className="d-flex justify-content-between align-items-center p-5 mb-5"
          style={{ height: "100px", width: "100%", border: "1px solid" }}
        >
          <div className="d-flex gap-4 align-items-center">
            <h5 className="text-center">📁</h5>
            <h6 className="text-center">JobPortal</h6>
          </div>
          <div className="d-flex gap-4">
            <a href="">
              <p>about</p>
            </a>
            <a href="">
              <p>contact</p>
            </a>
            <a href="">
              <p>privacy</p>
            </a>
            <a href="">
              <p>terms</p>
            </a>
          </div>
        </div>
        <div>
          <p className="mt-3 text-center">
            © 2024 JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
export default HomePage;
