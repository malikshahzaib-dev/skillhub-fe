import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

const applicationSchema = z.object({
  education: z.string().min(1, "Full name is required"),
  dateofBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    
  }),
  contactNumber: z
    .number()
    .min(10, "Contact number must be at least 10 digits"),
  experience: z.number().min(0, "Experience must be a positive number"),
  skills: z.string().min(1, "Skills are required"),
  resume: z.any(),
});

type CreateApplicationInput = z.infer<typeof applicationSchema>;

function CreateApplication() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      education: "",
      dateofBirth: new Date().toISOString().split("T")[0],
      contactNumber: 0,
      experience: 0,
      skills: "",
      resume: null,
    },
  });

  const onSubmit = async (data: CreateApplicationInput) => {
    try {
      const res = await api.post("/applicant", data);
      console.log("application creation successful", res.data);
      navigate("/applicant-dashboard");
    } catch (err) {
      console.error("Application creation failled", err);
    }
  };

  return (
    <>
      <div className="vh-100" style={{ background: "#f9f9f5" }}>
        <div className="p-5">
          <h1 className="text-center fs-48 fw-bold">Apply for Job</h1>
          <p className="text-center mt-3">
            Fill out the application form to apply
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="p-5"
            style={{ height: "750px", width: "100%", background: "#f9f9f5" }}
          >
            <div
              className=" p-4 rounded"
              style={{ height: "770px", width: "100%", background: "white" }}
            >
              <h1>Personal Information</h1>
              <p>Your details to apply for this job</p>

              <label htmlFor="fullName"> Education</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your  education"
                className="form-control mt-3"
                {...register("education")}
              />
              {errors.education && (
                <p className="text-danger">{errors.education.message}</p>
              )}

              <label className="mt-3" htmlFor="email">
                Contact Number
              </label>
              <input
                type="number"
                id="number"
                placeholder="Enter your contact number"
                className="form-control mt-3"
                {...register("contactNumber", { valueAsNumber: true })}
              />
              {errors.contactNumber && (
                <p className="text-danger">{errors.contactNumber.message}</p>
              )}

             <label className="form-label fw-semibold mt-3">
                Application Closing Date *
              </label>
              <input
                {...register("dateofBirth")}
                type="date"
                className="form-control mt-2"
              ></input>

              {errors.dateofBirth && (
                <p className="text-danger">{errors.dateofBirth.message}</p>
              )}

              <label className="mt-3" htmlFor="experience">
                Experience (in years)
              </label>
              <input
                type="number"
                id="experience"
                placeholder="Years of experience"
                className="form-control mt-3"
                {...register("experience", { valueAsNumber: true })}
              />
              {errors.experience && (
                <p className="text-danger">{errors.experience.message}</p>
              )}

              <label className="mt-3" htmlFor="skills">
                Skills
              </label>
              <input
                type="text"
                id="skills"
                placeholder="Add your skills (comma separated)"
                className="form-control mt-3"
                {...register("skills")}
              />
              {errors.skills && (
                <p className="text-danger">{errors.skills.message}</p>
              )}

              <label className="mt-3" htmlFor="skills">
                Expected Sellery
              </label>
              <input
                type="number"
                id="salary"
                placeholder="Add your demanded salary"
                className="form-control mt-3"
                {...register("skills")}
              />
              {errors.skills && (
                <p className="text-danger">{errors.skills.message}</p>
              )}
            </div>
          </div>

          <div
            className="p-5"
            style={{ height: "250px", width: "100%", background: "#f9f9f5" }}
          >
            <div className="p-4 rounded" style={{ background: "white" }}>
              <h1>Resume Upload</h1>
              <p>Provide your CV/Resume to complete the application</p>
              <label htmlFor="resume">Upload Resume</label>
              <input
                type="file"
                id="resume"
                className="form-control mt-3"
                {...register("resume")}
              />
            </div>
          </div>

          <div
            className="d-flex gap-3 justify-content-end p-5 mb-5"
            style={{ background: "#f9f9f5" }}
          >
            <button
              type="submit"
              style={{ height: "50px", width: "180px" }}
              className="btn btn-primary"
            >
              Submit Application
            </button>
            <button
              type="reset"
              style={{ height: "50px", width: "130px" }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateApplication;
