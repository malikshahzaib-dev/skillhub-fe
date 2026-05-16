import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

export default function UpdateApplicantInformation() {
  const navigate = useNavigate();
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const { id } = useParams();
  const {user} = useAuth()

  const fetchApplicantInformation = async () => {
    try {
      const res = await api.get(`/applicant/users/${id}`);
      console.log("found applicant", res.data);
      const data = res.data.foundApplicant;
      console.log(data, "data response");

      setEducation(data.education);
      setExperience(data.experience);
      setAddress(data.address);
      setContactNumber(data.contactNumber);
      setSkills(data.skills);
      setResume(data.files);
    } catch (err: any) {
      console.error("error to fetch applicant information");
    }
  };
  useEffect(() => {
    fetchApplicantInformation()
    if(!user) navigate("/sign-in");
  }, [id]);

  const updatedApplicantInformation = async (e: any) => {
    e.preventDefault();
    try {
      const payLoad = {
        education,
        experience,
        address,
        skills,
        contactNumber,
      };
      const res = await api.patch(`/applicant/users/${id}`, payLoad);
      console.log("applicant information updated successfully", res.data);
      fetchApplicantInformation();
      navigate("/applicant-dashboard");
    } catch (err: any) {
      console.error("error to update applicant information");
    }
  };
  return (
    <>
      <NavBar />

      <div style={{ background: "#f9f9f5" }}>
        <div>
          <h1 className="text-center p-4 fs-bold fw-bold">
            Update Applicant Information
          </h1>
        </div>

        <form onSubmit={updatedApplicantInformation}>
          <div
            className="card shadow-sm mb-4 mx-auto"
            style={{ maxWidth: "800px" }}
          >
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-person-circle me-2"></i>Applicant
                Information
              </h5>
              <small>Please provide your information to update</small>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Education</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="form-control"
                    placeholder="Enter your education"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="form-control"
                    placeholder="Enter your experience"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="form-control"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="form-control"
                    placeholder="Enter your skills"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3  p-4">
            <div
              className="p-4"
              style={{ height: "200px", width: "800px", background: "white" }}
            >
              <h1 className="fw-semibold">Upload Resume</h1>
              <label htmlFor="" className="form-label mt-3">
                Resume
              </label>
              <input
                type="file"
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="form-control mt-2"
                placeholder="choosen file"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3 mb-3">
            <button
              type="submit"
              className="btn btn-danger"
              style={{ height: "50px", width: "200px" }}
            >
              update Information
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
