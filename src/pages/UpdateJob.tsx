import { data, useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

export default function UpdateJob() {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirements, setNewRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newResponsibilities, setNewResponsibilities] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefits, setNewBenefits] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [status, setStatus] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [minmumSalary, setMinimumSalary] = useState("");
  const [maximumSalary, setMaximumSalary] = useState("");
  const [applicationClosingDate, setApplicationClosingDate] = useState("");
  const { jobId } = useParams();
  const {user} = useAuth() 
  const benefitsHandler = async (benefit: string) => {
    setBenefits([...benefits, benefit]);
    setNewBenefits("");
  };

  const removeBenefits = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit));
  };

  const responsibilitiesHandler = (responsibility: string) => {
    setResponsibilities([...responsibilities, responsibility]);
    setNewResponsibilities("");
  };
  const removeResponsibilities = (responsibility: string) => {
    setResponsibilities(responsibilities.filter((r) => r !== responsibility));
  };

  const requirementsHandler = (requirement: string) => {
    setRequirements([...requirements, requirement]);
    setNewRequirements("");
  };
  const removeRequirement = (requirement: string) => {
    setRequirements(requirements.filter((r) => r !== requirement));
  };

  const fetchJob = async () => {
    try {
      const res = await api.get(`/job/${jobId}`);
      console.log("fetch job successfully", res.data);
      const job = res.data;
      if (!job) {
        return console.error("job not found");
      }
      setJobTitle(job.jobTitle);
      setDepartment(job.department);
      setLocation(job.location);
      setJobType(job.jobType);
      setBenefits(job.benefits);
      setRequirements(job.requirements);
      setRequirements(job.requirements);
      setResponsibilities(job.responsibilities);
      setApplicationClosingDate(job.applicationClosingDate);
      setStatus(job.status);
      setMinimumSalary(job.minimumSalary);
      setMaximumSalary(job.maximumSalary);
      setJobDescription(job.jobDescription);
    } catch (err: any) {
      console.error("error to fetch job");
    }
  };

  useEffect(() => {
    fetchJob()
    if(!user) navigate("/sign-in");
  }, [jobId]);

  const updatedJob = async (e: any) => {
    e.preventDefault();

    try {
      const payLoad = {
        jobTitle,
        jobDescription,
        jobType,
        department,
        location,
        minmumSalary,
        maximumSalary,
        benefits,
        requirements,
        responsibilities,
        applicationClosingDate,
        status,
      };
      const res = await api.patch(`/job/${jobId}`, payLoad);
      console.log("job updated successfuly", res.data);
      navigate("/my-jobs");

      fetchJob();
    } catch (err: any) {
      console.error("error to update job", data);
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ background: "#f5f6fa", minHeight: "100vh" }}>
  {/* Header */}
  <div className="text-center py-5">
    <h1 className="fw-bold" style={{ fontSize: "42px" }}>
      Update Job
    </h1>
    <p className="text-muted fs-5 mt-2">
      Update the job details for your organization
    </p>
  </div>

  <form onSubmit={updatedJob}>
    {/* Basic Information */}
    <div className="d-flex justify-content-center mb-5">
      <div className="card shadow-sm rounded-4 p-5" style={{ width: "900px" }}>
        <h4 className="fw-bold mb-1">Basic Information</h4>
        <p className="text-muted mb-4">
          Essential details about the job position
        </p>

        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Job Title *</label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              className="form-control form-control-lg"
              placeholder="Senior Frontend Developer"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Department *</label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              className="form-control form-control-lg"
              placeholder="Engineering"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Location *</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="form-control form-control-lg"
              placeholder="Remote / New York"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Job Type *</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="form-select form-select-lg"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label fw-semibold">Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select form-select-lg"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Description & Requirements */}
    <div className="d-flex justify-content-center mb-5">
      <div className="card shadow-sm rounded-4 p-5" style={{ width: "900px" }}>
        <h4 className="fw-bold mb-1">Job Description & Requirements</h4>
        <p className="text-muted mb-4">
          Detailed information about the role
        </p>

        <label className="form-label fw-semibold">Job Description *</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="form-control form-control-lg mb-4"
          style={{ height: "150px" }}
        />

        <label className="form-label fw-semibold">Requirements *</label>
        <textarea
          value={newRequirements}
          onChange={(e) => setNewRequirements(e.target.value)}
          className="form-control mb-3"
          style={{ height: "110px" }}
        />

        <ul className="list-group mb-3">
          {requirements.map((req, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {req}
              <button
                type="button"
                onClick={() => removeRequirement(req)}
                className="btn btn-sm btn-outline-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => requirementsHandler(newRequirements)}
          className="btn btn-primary mb-4"
        >
          Add Requirement
        </button>

        <label className="form-label fw-semibold">Responsibilities *</label>
        <textarea
          value={newResponsibilities}
          onChange={(e) => setNewResponsibilities(e.target.value)}
          className="form-control mb-3"
          style={{ height: "110px" }}
        />

        <ul className="list-group mb-3">
          {responsibilities.map((res, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {res}
              <button
                type="button"
                onClick={() => removeResponsibilities(res)}
                className="btn btn-sm btn-outline-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => responsibilitiesHandler(newResponsibilities)}
          className="btn btn-primary"
        >
          Add Responsibility
        </button>
      </div>
    </div>

    {/* Salary & Benefits */}
    <div className="d-flex justify-content-center mb-5">
      <div className="card shadow-sm rounded-4 p-5" style={{ width: "900px" }}>
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Minimum Salary *</label>
            <input
              value={minmumSalary}
              onChange={(e) => setMinimumSalary(e.target.value)}
              type="number"
              className="form-control form-control-lg"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Maximum Salary *</label>
            <input
              value={maximumSalary}
              onChange={(e) => setMaximumSalary(e.target.value)}
              type="number"
              className="form-control form-control-lg"
            />
          </div>
        </div>

        <label className="form-label fw-semibold">Benefits *</label>
        <textarea
          value={newBenefits}
          onChange={(e) => setNewBenefits(e.target.value)}
          className="form-control mb-3"
          style={{ height: "140px" }}
        />

        <ul className="list-group mb-3">
          {benefits.map((b, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {b}
              <button
                type="button"
                onClick={() => removeBenefits(b)}
                className="btn btn-sm btn-outline-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => benefitsHandler(newBenefits)}
          className="btn btn-primary mb-4"
        >
          Add Benefit
        </button>

        <label className="form-label fw-semibold">Application Closing Date *</label>
        <input
          value={applicationClosingDate}
          onChange={(e) => setApplicationClosingDate(e.target.value)}
          type="date"
          className="form-control form-control-lg"
        />
      </div>
    </div>

    {/* Submit */}
    <div className="d-flex justify-content-center pb-5">
      <button
        type="submit"
        className="btn btn-lg px-5"
        style={{ background: "#865cdd", color: "white", borderRadius: "14px" }}
      >
        Update Job
      </button>
    </div>
  </form>
</div>

    </>
  );
}

// export default function CreateJob() {
//   const [requirements, setRequirements] = useState<string[]>([]);
//   const [newRequirement, setNewRequirement] = useState("");
//   const handleAddRequirement = (requirement: string) => {
//     setRequirements([...requirements, requirement]);
//   };
//   console.log(requirements, "requirements");
//   return (
//     <>
//       <div
//         className="p-5"
//         style={{ background: "#f9f9f5", minHeight: "100vh" }}
//       >
//         <h1>Create Job Posting</h1>

//         <label htmlFor="jobRequirements">Job Requirements *</label>
//         <input
//           id="jobRequirements"
//           type="text"
//           className="form-control"
//           placeholder="Enter job requirements"
//           onChange={(e) => setNewRequirement(e.target.value)}
//         />
//         <div className="mt-3">
//           <h5>Current Requirements:</h5>
//           <ul>
//             {requirements.map((req, index) => (
//               <li key={index}>{req}</li>
//             ))}
//           </ul>
//         </div>
//         <button
//           className="btn btn-primary mt-3"
//           onClick={() => handleAddRequirement(newRequirement)}
//         >
//           Add Requirement
//         </button>
//       </div>
//     </>
//   );
// }
