import { useNavigate } from "react-router-dom";
import NavBar from "./NavbarComponent";

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log("user",user)

const handleClik = (path:string) => {
  if(!user){
    navigate("/sign-in")
  }else{
    navigate(path)
  }
}
 

  return (
    <>
      {/* <div
        className="d-flex justify-content-between align-items-center p-5"
        style={{
          height: "100px",
          width: "100%",
          background: "grey",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <div className="d-flex gap-4">
          <h1>📁</h1>
          <h1 className="fs-24 fw-bold" style={{ color: "white" }}>
            JobPortal
          </h1>
        </div>

        <div
          className="d-flex gap-4 align-items-center"
          style={{ position: "relative" }}
        >
          <button
            onClick={() => navigate("/jobs")}
            className="btn"
            style={{ width: "120px", height: "40px", background: "white" }}
          >
            All Jobs
          </button>

          <button
            onClick={() => navigate("/my-jobapplied")}
            className="btn"
            style={{ width: "160px", height: "40px", background: "white" }}
          >
            My Applied Jobs
          </button>

          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              border: "1px solid",
              position: "relative",
            }}
          >
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="profile"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => setShowLogOut(!showLogOut)}
            />
          </div>

          {showLogOut && (
            <div
              className="rounded d-flex justify-content-center align-items-center"
              style={{
                height: "110px",
                width: "160px",
                background: "white",
                textAlign: "center",
                position: "absolute",
                top: "60px",
                right: 0,
              }}
            >
              <button
                className="rounded"
                onClick={handleLogOut}
                style={{
                  height: "34px",
                  width: "100px",
                  background: "black",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div> */}
      <NavBar/>
    

      <div
        style={{
          width: "100%",
          // marginTop: "110px",
          backgroundColor: "#f9f9f5",
        }}
      >
        <h1 className="text-center p-3 mt-4 fs-1 fw-bold">
          Applicant Dashboard
        </h1>
        <p
          className="text-center fs-1 fw-semibold"
          style={{ paddingLeft: "200px", paddingRight: "200px" }}
        >
          Welcome to your applicant dashboard. Here you can explore job
          postings, apply for jobs, and track the status of your applications —
          all in one place.
        </p>

        <div className="d-flex gap-4 justify-content-center align-items-center">
          <div className="text-center p-5">
            <button
              onClick={() => handleClik("/jobs")}
              className="btn btn-primary"
              style={{ height: "50px", width: "200px", background: "black" }}
            >
              Browse Jobs
            </button>
          </div>

          <div className="text-center p-5">
            <button
              onClick={() => handleClik("/my-jobapplied")}
              className="btn btn-secondary"
              style={{ height: "50px", width: "200px", background: "black" }}
            >
              My Applications
            </button>
          </div>

          <div className="text-center p-5">
            <button
              onClick={() => navigate(`/update-applicantinformation/${user._id}`)}
              className="btn btn-success"
              style={{ height: "50px", width: "200px" }}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
}
