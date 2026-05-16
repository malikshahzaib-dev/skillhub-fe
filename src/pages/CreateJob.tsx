import z from "zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import api from "../config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

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
    .array(z.string().min(5, "Each requirement should be at least 5 characters"))
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
  createdBy: z.string(),
  applicationclosingdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

type JobInput = z.infer<typeof jobSchema>;

function CreateJob() {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user") || "{}");

  const {user} = useAuth()
  const [organizationId, setOrganizationId] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirements, setNewRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [newResponsibilities, setNewResponsibilities] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefits, setNewBenefits] = useState("");
  console.log("user from create job page", user);

  const requirementsHandler = (requirement: string) => {
    if (requirement.trim()) {
      setRequirements([...requirements, requirement.trim()]);
      setNewRequirements("");
    }
  };

  const benefitsHandler = (benefit: string) => {
    if (benefit.trim()) {
      setBenefits([...benefits, benefit.trim()]);
      setNewBenefits("");
    }
  };  

  const responsibilitiesHandler = (responsibility: string) => {
    if (responsibility.trim()) {
      setResponsibilities([...responsibilities, responsibility.trim()]);
      setNewResponsibilities("");
    }
  };

  async function getOrganizationDetails() {
    try {
      const res = await api.get(`/organization/users/${user?._id}`);
      console.log("Organization details:", res.data);
      setOrganizationId(res.data._id);
      console.log("Organization details:", res.data);
    } catch (error) {
      console.error("Error fetching organization details:", error);
        }
  }

  useEffect(() => {
    getOrganizationDetails()
    if(!user) navigate("/employer-signup");
  }, [user, navigate]);

  console.log("organizationId from create job page", organizationId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
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
      createdBy: user?._id,
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
    createdBy:user?._id
  };
    console.log("Form data to be submitted:", payload  );
    try {
      const res = await api.post(`/job/${organizationId}`, payload);
      console.log("Job created successfully:", res.data);
      reset();
      setRequirements([])
      setResponsibilities([])
      setBenefits([])
      setNewRequirements("")
      setNewResponsibilities("")
      setNewBenefits("")
      navigate("/jobs", {
        state: {
          newJob: [res.data],
          createdBy: user?._id,  
        },
        
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ background: "white", minHeight: "100vh", padding: "20px 0" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Create a Job Posting</h1>
            <p className="lead">Fill out the form below to add a new job listing to your organization</p>
          </div>

          <form onSubmit={handleSubmit(handleCreateJob)}>
            {/* Basic Information Section */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0"><i className="bi bi-info-circle me-2"></i>Basic Information</h5>
                <small>Essential details about the job position</small>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Job Type *</label>
                    <select {...register("jobType")} className="form-select">
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                    {errors.jobType && (
                      <p className="text-danger">{errors.jobType.message}</p>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Status *</label>
                    <select {...register("status")} className="form-select">
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

            {/* Job Description & Requirements Section */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="card-title mb-0"><i className="bi bi-file-text me-2"></i>Job Description & Requirements</h5>
                <small>Detailed information about the role and expectations</small>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Job Description *</label>
                  <textarea
                    {...register("jobDescription")}
                    className="form-control"
                    rows={5}
                    placeholder="Describe responsibilities and what the candidate will work on..."
                  ></textarea>
                  {errors.jobDescription && (
                    <p className="text-danger">{errors.jobDescription.message}</p>
                  )}
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Requirements *</label>
                    <textarea
                      value={newRequirements}
                      onChange={(e) => setNewRequirements(e.target.value)}
                      className="form-control"
                      rows={4}
                      placeholder="List job requirements..."
                    ></textarea>
                    {errors.requirements && (
                      <p className="text-danger">{errors.requirements.message}</p>
                    )}
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => requirementsHandler(newRequirements)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-plus-circle me-1"></i>Add Requirement
                      </button>
                    </div>
                    <div className="mt-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
                      <ul className="list-group list-group-flush">
                        {requirements.map((requirement, index) => (
                          <li key={index} className="list-group-item">{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Responsibilities *</label>
                    <textarea
                      value={newResponsibilities}
                      onChange={(e) => setNewResponsibilities(e.target.value)}
                      className="form-control"
                      rows={4}
                      placeholder="List job responsibilities..."
                    ></textarea>
                    {errors.responsibilities && (
                      <p className="text-danger">{errors.responsibilities.message}</p>
                    )}
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => responsibilitiesHandler(newResponsibilities)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-plus-circle me-1"></i>Add Responsibility
                      </button>
                    </div>
                    <div className="mt-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
                      <ul className="list-group list-group-flush">
                        {responsibilities.map((responsibility, index) => (
                          <li key={index} className="list-group-item">{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         

            {/* Salary & Benefits Section */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-info text-white">
                <h5 className="card-title mb-0"><i className="bi bi-cash-coin me-2"></i>Salary & Benefits</h5>
                <small>Compensation details and perks offered</small>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Minimum Salary *</label>
                    <input
                      {...register("minimumSalary")}
                      type="number"
                      className="form-control"
                      placeholder="e.g. 60000"
                    />
                    {errors.minimumSalary && <p className="text-danger">{errors.minimumSalary.message}</p>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Maximum Salary *</label>
                    <input
                      {...register("maximumSalary")}
                      type="number"
                      className="form-control"
                      placeholder="e.g. 90000"
                    />
                    {errors.maximumSalary && <p className="text-danger">{errors.maximumSalary.message}</p>}
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label fw-semibold">Benefits *</label>
                  <textarea
                    value={newBenefits}
                    onChange={(e) => setNewBenefits(e.target.value)}
                    className="form-control"
                    rows={4}
                    placeholder="List job benefits..."
                  ></textarea>
                  {errors.benefits && <p className="text-danger">{errors.benefits.message}</p>}
                  <div className="mt-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => benefitsHandler(newBenefits)}
                    >
                      <i className="bi bi-plus-circle me-1"></i>Add Benefit
                    </button>
                  </div>
                  <div className="mt-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
                    <ul className="list-group list-group-flush">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="list-group-item">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label fw-semibold">Application Closing Date *</label>
                  <input
                    {...register("applicationclosingdate")}
                    type="date"
                    className="form-control"
                  />
                  {errors.applicationclosingdate && (
                    <p className="text-danger">{errors.applicationclosingdate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                <i className="bi bi-check-circle me-2"></i>Publish Job Posting
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateJob;
