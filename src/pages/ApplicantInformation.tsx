import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

const ApplicantSchema = z.object({
  education: z.string().min(1).max(20),
  contactNumber: z.number(),
  address: z.string().min(2).max(20),
  skills: z.string().min(2).max(100),
  experience: z.string(),
  resume: z.any(),
  dateofBirth: z.string().refine((val) => !isNaN(Date.parse(val))),
});

type ApplicantInput = z.infer<typeof ApplicantSchema>;

const ApplicantInformation = () => {
  const navigate = useNavigate();
  const { setToken, token, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicantInput>({
    resolver: zodResolver(ApplicantSchema),
    defaultValues: {
      education: "",
      contactNumber: 0,
      address: "",
      skills: "",
      experience: "",
      resume: null,
      dateofBirth: new Date().toISOString().split("T")[0],
    },
  });
  if (!user) {
    navigate("/sign-in");
  }
  const createApplicant = async (data: ApplicantInput) => {
    try {
      setToken(token);
      if (!token) console.error("no token found", token);
      const res = await api.post("/applicant", data);
      console.log("applicant creation successfull", res.data);

      navigate("/applicant-dashboard");
    } catch (error: any) {
      console.error("applicant creation error", error);
    }
  };

  return (
    <>
      <NavBar />

      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          <h1 className="text-center mb-5 fw-bold" style={{ color: "#343a40" }}>
            Applicant Information
          </h1>

          <form onSubmit={handleSubmit(createApplicant)}>
            <div className="mx-auto mb-4" style={{ maxWidth: "800px" }}>
              <div className="card shadow-lg p-5 rounded-4 border-0">
                <h3 className="fw-bold mb-3" style={{ color: "#495057" }}>
                  Personal Information
                </h3>
                <p className="text-muted mb-4">
                  Please provide your details below.
                </p>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Education</label>
                  <input
                    type="text"
                    {...register("education")}
                    className={`form-control ${
                      errors.education ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your education"
                  />
                  {errors.education && (
                    <div className="invalid-feedback">
                      {errors.education.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Experience</label>
                  <input
                    type="text"
                    {...register("experience")}
                    className={`form-control ${
                      errors.experience ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your experience"
                  />
                  {errors.experience && (
                    <div className="invalid-feedback">
                      {errors.experience.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    {...register("contactNumber", { valueAsNumber: true })}
                    className={`form-control ${
                      errors.contactNumber ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your contact number"
                  />
                  {errors.contactNumber && (
                    <div className="invalid-feedback">
                      {errors.contactNumber.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Skills</label>
                  <input
                    type="text"
                    {...register("skills")}
                    className={`form-control ${
                      errors.skills ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your skills"
                  />
                  {errors.skills && (
                    <div className="invalid-feedback">
                      {errors.skills.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">
                      {errors.address.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mx-auto mb-4" style={{ maxWidth: "800px" }}>
              <div className="card shadow-lg p-5 rounded-4 border-0">
                <h3 className="fw-bold mb-3" style={{ color: "#495057" }}>
                  Upload Resume
                </h3>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Resume</label>
                  <input
                    type="file"
                    className={`form-control ${
                      errors.resume ? "is-invalid" : ""
                    }`}
                  />
                  {errors.resume && (
                    <div className="invalid-feedback">
                      {errors.resume.message as string}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-5">
              <button
                type="submit"
                className="btn btn-gradient btn-lg fw-bold"
                style={{
                  background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
                  color: "white",
                  width: "260px",
                  height: "50px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 15px rgba(0,0,0,0.2)";
                }}
              >
                Register Information
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicantInformation;
