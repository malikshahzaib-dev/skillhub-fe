import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

const UpdateApplication = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState<any>({});
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const {user} = useAuth()
  const { id } = useParams();

  const fetchApplication = async () => {
    try {
      const res = await api.get(`/application/${id}`);
      setApplication(res.data);
      setCoverLetter(res.data.coverLetter);
      setExpectedSalary(res.data.expectedSalary);
    } catch (err: any) {
      console.error("error to fetch application");
    }
  };

  useEffect(() => {
    fetchApplication()
    if(!user) navigate("/sign-in");
  }, [id]);

  const updateApplication = async (e: any) => {
    e.preventDefault();
    try {
      const payLoad = { coverLetter, expectedSalary };
      const res = await api.patch(`/application/${id}`, payLoad);
      console.log("application updated successfully", res.data);
      navigate("/my-jobapplied");
    } catch (err: any) {
      console.error("error to update application");
    }
  };

  if (!application) return <p>Loading...</p>;

  return (
    <>
      <NavBar />

      <div style={{ background: "#f4f6f8" }}>
        <div className="pb-3 pt-5 text-center">
          <h1 className="fs-2 fw-bold mt-2" style={{ color: "#1c1c1c" }}>
            Update Your Application
          </h1>
          <p className="mt-2 text-muted">
            Review your existing details and make necessary changes below.
          </p>
        </div>

        <div className="d-flex justify-content-center mb-5">
          <form
            onSubmit={updateApplication}
            style={{ width: "75%" }}
          >
            {/* Personal Info */}
            <div
              className="p-5 rounded-4 shadow-sm mb-4"
              style={{ background: "white", borderLeft: "5px solid #4b6cb7" }}
            >
              <h3 className="fw-bold mb-3" style={{ color: "#4b6cb7" }}>
                Personal Information
              </h3>
              <p className="text-muted mb-4">Review and update your application details below.</p>

              <label htmlFor="coverLetter" className="fw-semibold">
                Cover Letter
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                id="coverLetter"
                placeholder="Enter your cover letter"
                className="form-control mt-2 shadow-sm"
                style={{ minHeight: "100px", borderRadius: "0.5rem" }}
              ></textarea>

              <label className="mt-4 fw-semibold" htmlFor="expectedSalary">
                Expected Salary
              </label>
              <input
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                type="number"
                id="expectedSalary"
                placeholder="Add your demanded salary"
                className="form-control mt-2 shadow-sm"
                style={{ borderRadius: "0.5rem" }}
              />
            </div>

            {/* Resume Upload */}
            <div
              className="p-5 rounded-4 shadow-sm mb-4"
              style={{ background: "white", borderLeft: "5px solid #4b6cb7" }}
            >
              <h3 className="fw-bold mb-3" style={{ color: "#4b6cb7" }}>
                Resume Upload
              </h3>
              <p className="text-muted mb-3">
                Update or replace your CV/Resume if needed.
              </p>
              <label htmlFor="resume" className="fw-semibold">
                Upload Resume
              </label>
              <input
                type="file"
                id="resume"
                className="form-control mt-2"
                style={{ borderRadius: "0.5rem" }}
              />
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
                style={{
                  borderRadius: "2rem",
                  background: "linear-gradient(90deg, #4b6cb7, #182848)",
                  border: "none",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Update Application
              </button>
              <button
                type="reset"
                className="btn btn-secondary px-4 py-2 fw-semibold shadow-sm"
                style={{ borderRadius: "2rem" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateApplication;
