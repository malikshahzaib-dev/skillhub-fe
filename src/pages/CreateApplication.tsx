import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

const applicationSchema = z.object({
  coverLetter: z.string().min(1, "Cover letter is required"),
  phone: z
    .number()
    .refine((val) => !isNaN(val) && val > 0, { message: "Phone must be valid" }),
  address: z.string().min(1, "Address is required"),
  dateofBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  resume: z.any().optional(),
  expectedSalary: z.number().min(1, "Expected salary must be positive"),
});

type CreateApplicationInput = z.infer<typeof applicationSchema>;

function CreateApplication() {
  const navigate = useNavigate();
  const { jobId } = useParams(); 
  const {token ,setToken} = useAuth()



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
      dateofBirth: new Date().toISOString().split("T")[0],
      resume: null,
      phone: 0,
      address: "",
      expectedSalary: 0,
    },
  });

  const onSubmit = async (data: CreateApplicationInput) => {
    const payLoad = {
      coverLetter: data.coverLetter,
      expectedSalary: data.expectedSalary,
      address: data.address,
      phone: data.phone,
      dateOfBirth: data.dateofBirth,
    };
    try {


      setToken(token)
      const res = await axios.post(
        `http://localhost:5000/api/application/jobs/${jobId}`,
        payLoad,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("application creation successful", res.data);
      navigate("/applicant-dashboard");
    } catch (err) {
      console.error("Application creation failed", err);
    }
  };

  return (
    <>
      <NavBar />

      <div className="bg-gradient-to-b from-blue-50 to-white min-vh-100 py-5">
        <div className="container text-center mb-5">
          <h1 className="fs-1 fw-bold text-primary">Apply for Job</h1>
          <p className="fs-5 text-muted">Fill out the application form to apply</p>
        </div>

        <div className="container d-flex justify-content-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-5 rounded-4 shadow-lg w-100"
            style={{ maxWidth: "800px" }}
          >
            {/* Personal Info */}
            <div className="mb-5 p-4 rounded-3 border border-light shadow-sm">
              <h2 className="text-primary mb-3">Personal Information</h2>
              <p className="text-muted mb-4">Your details to apply for this job</p>

              <div className="mb-3">
                <label htmlFor="coverLetter" className="form-label fw-semibold">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  placeholder="Enter your cover letter"
                  className="form-control form-control-lg rounded-3"
                  {...register("coverLetter")}
                  rows={4}
                />
                {errors.coverLetter && <p className="text-danger mt-1">{errors.coverLetter.message}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="expectedSalary" className="form-label fw-semibold">
                  Expected Salary
                </label>
                <input
                  type="number"
                  id="expectedSalary"
                  placeholder="Add your demanded salary"
                  className="form-control form-control-lg rounded-3"
                  {...register("expectedSalary", { valueAsNumber: true })}
                />
                {errors.expectedSalary && <p className="text-danger mt-1">{errors.expectedSalary.message}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  placeholder="Add your phone number"
                  className="form-control form-control-lg rounded-3"
                  {...register("phone", { valueAsNumber: true })}
                />
                {errors.phone && <p className="text-danger mt-1">{errors.phone.message}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label fw-semibold">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  className="form-control form-control-lg rounded-3"
                  {...register("address")}
                />
                {errors.address && <p className="text-danger mt-1">{errors.address.message}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="dateofBirth" className="form-label fw-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateofBirth"
                  className="form-control form-control-lg rounded-3"
                  {...register("dateofBirth")}
                />
                {errors.dateofBirth && <p className="text-danger mt-1">{errors.dateofBirth.message}</p>}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="mb-5 p-4 rounded-3 border border-light shadow-sm bg-light">
              <h2 className="text-primary mb-3">Resume Upload</h2>
              <p className="text-muted mb-4">Provide your CV/Resume to complete the application</p>
              <label htmlFor="resume" className="form-label fw-semibold">
                Upload Resume
              </label>
              <input type="file" id="resume" className="form-control form-control-lg rounded-3" {...register("resume")} />
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="submit"
                className="btn btn-gradient-primary btn-lg px-5 py-2 rounded-pill shadow-sm text-white fw-bold"
                style={{
                  background: "linear-gradient(90deg, #4f46e5, #3b82f6)",
                }}
              >
                Submit Application
              </button>
              <button
                type="reset"
                className="btn btn-outline-secondary btn-lg px-5 py-2 rounded-pill fw-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateApplication;
