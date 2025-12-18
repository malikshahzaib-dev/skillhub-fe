import { data, useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";

export default function UpdateJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
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
      setJob(job);
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
    fetchJob();
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
      <div style={{ background: "#f9f9f5", minHeight: "100vh" }}>
        <div>
          <h1
            className="text-center pt-5"
            style={{ fontSize: "40px", fontWeight: 700 }}
          >
            Update a Job
          </h1>
          <p className="text-center pt-3" style={{ fontSize: "20px" }}>
            Fill out the form below to add a new job listing to your
            organization
          </p>
        </div>

        <form onSubmit={updatedJob}>
          <div className="d-flex justify-content-center pt-3">
            <div
              className="rounded p-5"
              style={{ width: "900px", background: "#ffffff" }}
            >
              <h1 className="fs-8">Basic Information</h1>
              <p className="mt-2" style={{ fontSize: "20px" }}>
                Essential details about the job position
              </p>

              <div className="d-flex gap-4 mt-4">
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Job Title *</label>
                  <input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>

                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Department *</label>
                  <input
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="e.g. Engineering"
                  />
                </div>
              </div>

              <div className="d-flex gap-4 mt-4">
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Location *</label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="e.g. New York or Remote"
                  />
                </div>

                <div style={{ width: "25%" }}>
                  <label className="form-label fw-semibold">Job Type *</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="form-control"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div style={{ width: "25%" }}>
                  <label className="form-label fw-semibold">Status *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <div
              className="p-4 rounded"
              style={{ width: "900px", background: "#ffffff" }}
            >
              <h1 className="fs-8">Job Description & Requirements</h1>
              <p style={{ fontSize: "20px" }}>
                Detailed information about the role and expectations
              </p>

              <label className="form-label fw-semibold">
                Job Description *
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="form-control mt-2"
                style={{ height: "140px" }}
                placeholder="Describe responsibilities and what the candidate will work on..."
              ></textarea>

              <div className="d-flex gap-4 mt-4">
                <div style={{ width: "100%" }}>
                  <label className="form-label fw-semibold mt-3">
                    Requirements *
                  </label>
                  <textarea
                    value={newRequirements}
                    onChange={(e) => setNewRequirements(e.target.value)}
                    className="form-control mt-2"
                    style={{ height: "100px" }}
                    placeholder="List job requirements..."
                  ></textarea>

                  <div style={{ height: "100px", overflowY: "scroll" }}>
                    <ul>
                      {requirements.map((requirement, index) => (
                        <li
                          key={index}
                          className="d-flex justify-content-between align-items-center"
                        >
                          {requirement}
                          <button
                            type="button"
                            style={{ height: "25px" }}
                            onClick={() => removeRequirement(requirement)}
                            className="btn btn-dark btn-sm mt-2"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="d-flex gap-4 mt-2">
                      <button
                        type="button"
                        style={{ height: "40px" }}
                        onClick={() => requirementsHandler(newRequirements)}
                        className="btn btn-primary"
                      >
                        Add Requirement
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <label className="form-label fw-semibold mt-3">
                Responsibilities *
              </label>
              <textarea
                value={newResponsibilities}
                onChange={(e) => setNewResponsibilities(e.target.value)}
                className="form-control mt-2"
                style={{ height: "100px" }}
                placeholder="List job responsibilities..."
              ></textarea>

              <ul>
                <div>
                  {responsibilities.map((responsibility, index) => {
                    return (
                      <li
                        className="d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        {responsibility}
                        <button
                          type="button"
                          onClick={() => removeResponsibilities(responsibility)}
                          className="btn btn-dark btn-sm mt-2"
                          style={{ height: "25px", background: "black" }}
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </div>
              </ul>
              <button
                type="button"
                onClick={() => responsibilitiesHandler(newResponsibilities)}
                className="btn btn-primary mt-2"
              >
                Add Responsibility
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <div
              className="p-4 rounded"
              style={{ width: "900px", background: "#ffffff" }}
            >
              <div className="d-flex gap-4">
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">
                    Minimum Salary *
                  </label>
                  <input
                    value={minmumSalary}
                    onChange={(e) => setMinimumSalary(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="e.g. $60,000"
                  />
                </div>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">
                    Maximum Salary *
                  </label>
                  <input
                    value={maximumSalary}
                    onChange={(e) => setMaximumSalary(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="e.g. $90,000"
                  />
                </div>
              </div>
               <div>
              <label className="form-label fw-semibold mt-3">Benefits *</label>
              <textarea
                value={newBenefits}
                onChange={(e) => setNewBenefits(e.target.value)}
                className="form-control mt-2"
                style={{ height: "140px" }}
                placeholder="List job benefits..."
              ></textarea>
              <ul>
                {benefits.map((benefit, index) => {
                  return (
                    <li
                      key={index}
                      className="d-flex justify-content-between align-items-center "
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeBenefits(benefit)}
                        className="btn btn-dark btn-sm mt-2"
                        style={{ height: "25px", background: "black" }}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  style={{ height: "40px", width: "120px" }}
                  onClick={() => benefitsHandler(newBenefits)}
                >
                  add benefits
                </button>
                </div>

              {/* {errors.benefits && (
                <p className="text-danger">{errors.benefits.message}</p>
              )} */}

              <label className="form-label fw-semibold mt-3">
                Application Closing Date *
              </label>
              <input
                value={applicationClosingDate}
                onChange={(e) => setApplicationClosingDate(e.target.value)}
                type="date"
                className="form-control mt-2"
              ></input>

              {/* 
              <label className="form-label fw-semibold mt-3">
                Application Closing Date *
              </label>
              <input
                {...register("applicationclosingdate")}
                type="date"
                className="form-control mt-2"
              /> */}
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5 p-3">
            <button
              type="submit"
              className="rounded"
              style={{
                height: "50px",
                width: "240px",
                background: "#865cdd",
                color: "white",
              }}
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
