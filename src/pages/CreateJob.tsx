import z from "zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const jobSchema = z.object({
  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(100),
  department: z
    .string()
    .min(2, "Department should be at least 2 characters")
    .max(100),
  location: z
    .string()
    .min(2, "Location should be at least 2 characters")
    .max(100),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"]),
  jobDescription: z
    .string()
    .min(6, "Job description must be at least 6 characters")
    .max(1000),
  status: z.enum(["Active", "Inactive"]),
  requirements: z
    .array(z.string().min(5, "Requirement should be at least 15 characters"))
    .max(1000),
  responsibilities: z
    .array(
      z.string().min(2, "Each responsibility should be at least 2 characters")
    )
    .max(1000),
  minimumSalary: z
    .string()
    .min(2, "Minimum salary should be at least 2 characters")
    .max(100),
  maximumSalary: z
    .string()
    .min(2, "Maximum salary should be at least 2 characters")
    .max(100),
  benefits: z
    .array(z.string().min(2, "Each benefit should be at least 2 characters"))
    .max(1000),
    createdBy:z.string(),
  applicationclosingdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

type JobInput = z.infer<typeof jobSchema>;

function CreateJob() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [organizationId, setOrganizationId] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirements, setNewRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newResponsibilities, setNewResponsibilities] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefits, setNewBenefits] = useState("");
  console.log("user from create job page", user);

  const requirementsHandler = (requirement: string) => {
    setRequirements([...requirements, requirement]);
    console.log(requirements, "requirements");
  };

  const benefitsHandler = (benefit: string) => {
    setBenefits([...benefits, benefit]);
    console.log(benefit, "benefits");
  };

  const responsibilitiesHandler = (responsibility: string) => {
    setResponsibilities([...responsibilities, responsibility]);
    console.log(responsibility, "responsibilities");
  };

  async function getOrganizationDetails() {
    try {
      const res = await api.get(`/organization/user/${user._id}`);
      console.log("Organization details:", res.data);
      setOrganizationId(res.data._id);
      console.log("Organization details:", res.data);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  }

  useEffect(() => {
    getOrganizationDetails();
  }, [user, navigate]);

  console.log("organizationId from create job page", organizationId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: "",
      department: "",
      location: "",
      jobType: "full-time",
      jobDescription: "",
      status: "Active",
      requirements: [],
      responsibilities: [],
      minimumSalary: "",
      maximumSalary: "",
      createdBy: user._id,
      benefits: [],
      applicationclosingdate: new Date().toISOString().split("T")[0],
    },
  });

  const handleCreateJob = async (data: JobInput) => {


     const payload = {
    ...data,
    requirements,
    responsibilities,
    benefits,
    // createdBy: user._id,
  };
    console.log("Form data to be submitted:", payload  );
    try {
      const res = await api.post(`/job/${organizationId}`, payload);
      console.log("Job created successfully:", res.data);
      navigate("/job-page", {
        state: {
          newJob: [res.data],
          createdBy: user._id,  
        },
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      <div style={{ background: "#f9f9f5", minHeight: "100vh" }}>
        <div>
          <h1
            className="text-center pt-5"
            style={{ fontSize: "40px", fontWeight: 700 }}
          >
            Create a Job Posting
          </h1>
          <p className="text-center pt-3" style={{ fontSize: "20px" }}>
            Fill out the form below to add a new job listing to your
            organization
          </p>
        </div>

        <form onSubmit={handleSubmit(handleCreateJob)}>
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
                    {...register("jobTitle")}
                    type="text"
                    className="form-control"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.jobTitle && (
                    <p className="text-danger">{errors.jobTitle.message}</p>
                  )}
                </div>

                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Department *</label>
                  <input
                    {...register("department")}
                    type="text"
                    className="form-control"
                    placeholder="e.g. Engineering"
                  />
                  {errors.department && (
                    <p className="text-danger">{errors.department.message}</p>
                  )}
                </div>
              </div>

              <div className="d-flex gap-4 mt-4">
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Location *</label>
                  <input
                    {...register("location")}
                    type="text"
                    className="form-control"
                    placeholder="e.g. New York or Remote"
                  />
                  {errors.location && (
                    <p className="text-danger">{errors.location.message}</p>
                  )}
                </div>

                <div style={{ width: "25%" }}>
                  <label className="form-label fw-semibold">Job Type *</label>
                  <select {...register("jobType")} className="form-control">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  {errors.jobType && (
                    <p className="text-danger">{errors.jobType.message}</p>
                  )}
                </div>

                <div style={{ width: "25%" }}>
                  <label className="form-label fw-semibold">Status *</label>
                  <select {...register("status")} className="form-control">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="text-danger">{errors.status.message}</p>
                  )}
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
                {...register("jobDescription")}
                className="form-control mt-2"
                style={{ height: "140px" }}
                placeholder="Describe responsibilities and what the candidate will work on..."
              ></textarea>
              {errors.jobDescription && (
                <p className="text-danger">{errors.jobDescription.message}</p>
              )}

              <div className="d-flex gap-4 mt-4">
                <div style={{ width: "70%" }}>
                  <label className="form-label fw-semibold mt-3">
                    Requirements *
                  </label>
                  <textarea
                    onChange={(e) => setNewRequirements(e.target.value)}
                    className="form-control mt-2"
                    style={{ height: "100px" }}
                    placeholder="List job requirements..."
                  ></textarea>
                  {errors.requirements && (
                    <p className="text-danger">{errors.requirements.message}</p>
                  )}
                  <div style={{ height: "100px", overflowY: "scroll" }}>
                    <ul>
                      {requirements.map((requirement, index) => {
                        return <li key={index}>{requirement}</li>;
                      })}
                    </ul>
                    <button
                      type="button"
                      style={{ height: "40px" }}
                      onClick={() => requirementsHandler(newRequirements)}
                      className="btn btn-primary "
                    >
                      Add Requirement
                    </button>
                  </div>
                </div>
              </div>

              <label className="form-label fw-semibold mt-3">
                Responsibilities *
              </label>
              <textarea
                onChange={(e) => setNewResponsibilities(e.target.value)}
                className="form-control mt-2"
                style={{ height: "100px" }}
                placeholder="List job responsibilities..."
              >
               
              </textarea>
               {errors.responsibilities && (
                  <p className="text-danger">
                    {errors.responsibilities.message}
                  </p>
                )}
              <ul>
                <div style={{}}>
                  {responsibilities.map((responsibility, index) => {
                    return <li key={index}>{responsibility}</li>;
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
              <h1 className="fs-8">Compensation & Benefits</h1>
              <p style={{ fontSize: "20px" }}>
                Salary range and perks for the position
              </p>

              <div className="d-flex gap-4">
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">
                    Minimum Salary *
                  </label>
                  <input
                    {...register("minimumSalary")}
                    type="number"
                    className="form-control"
                    placeholder="e.g. $60,000"
                  />
                  {errors.minimumSalary && <p className="text-danger">{errors.minimumSalary.message}</p>}
                </div>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">
                    Maximum Salary *
                  </label>
                  <input
                    {...register("maximumSalary")}
                    type="number"
                    className="form-control"
                    placeholder="e.g. $90,000"
                  />
                  {errors.maximumSalary && <p className="text-danger">{errors.maximumSalary.message}</p>}
                </div>
              </div>

              <label className="form-label fw-semibold mt-3">Benefits *</label>
              <textarea
                onChange={(e) => setNewBenefits(e.target.value)}
                className="form-control mt-2"
                style={{ height: "100px" }}
                placeholder="List job benefits..."
              ></textarea>
              {errors.benefits && <p className="text-danger">{errors.benefits.message}</p>}
              <ul>

                {benefits.map((benefit, index) => {
                  return <li key={index}>{benefit}</li>;
                })}
              </ul>
              <div>
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
                {...register("applicationclosingdate")}
                type="date"
                className="form-control mt-2"
              ></input>

              {errors.applicationclosingdate && (
                <p className="text-danger">{errors.applicationclosingdate.message}</p>
              )}
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
              Publish Job Posting
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateJob;

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
