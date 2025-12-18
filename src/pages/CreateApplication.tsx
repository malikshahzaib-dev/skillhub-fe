import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavbarComponent";

const applicationSchema = z.object({
  coverLetter: z.string().min(1, "Cover letter is required"),
  phone: z.number().min(11, "Phone must be at least 11 characters"),
  address:z.string(),
  dateofBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),

  resume: z.any().optional(),
  expectedSalary: z
    .number()
    .min(1, "Expected salary must be a positive number"),
});

type CreateApplicationInput = z.infer<typeof applicationSchema>;

function CreateApplication() {
  const navigate = useNavigate();
  const { jobId } = useParams ();
  const stringifyUser = localStorage.getItem("user");
  const parsedUser = stringifyUser ? JSON.parse(stringifyUser) : null;
  const userId = parsedUser?._id;
  console.log("userId", userId);
  console.log(jobId, "jobid");

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
      phone:0,
      address:"",
      expectedSalary: 0,
    },
  });

 

  const onSubmit = async (data: CreateApplicationInput) => {
    const payLoad = {
      coverLetter: data.coverLetter,
      expectedSalary: data.expectedSalary,
      address:data.address,
      phone:data.phone,
      dateOfBirth:data.dateofBirth
    };
    try {
      const token = localStorage.getItem("accessToken");
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
      
      <NavBar/>

      <div style={{ background: "#f9f9f5" }}>
        <div className="pb-3 ">
          <h1 className="text-center fs-48 fw-bold mt-5">Apply for Job</h1>
          <p className="text-center mt-2">
            Fill out the application form to apply
          </p>
        </div>

        <div className=" d-flex justify-content-center">
          <form
          
            onSubmit={handleSubmit(onSubmit)}
            style={{
              background: "transparent",
              width: "75%",
              padding: "30px",
            }}
            className="border rounded-2 mb-5"
          >
            <div
              className=" p-4 rounded mb-4 border"
              style={{ background: "white", width: "100%" }}
            >
              <h1>Personal Information</h1>
              <p>Your details to apply for this job</p>

              <label htmlFor="fullName mt-2"> Cover Letter</label>
              <textarea
                id="fullName"
                placeholder="Enter your cover letter"
                className="form-control mt-3"
                {...register("coverLetter")}
              ></textarea>
              {errors.coverLetter && (
                <p className="text-danger">{errors.coverLetter.message}</p>
              )}


              <label className="mt-3" htmlFor="expectedSalary">
                Expected Salary
              </label>
              <input
                type="number"
                id="expectedSalary"
                placeholder="Add your demanded salary"
                className="form-control mt-3"
                {...register("expectedSalary", { valueAsNumber: true })}
              />
              {errors.expectedSalary && (
                <p className="text-danger">{errors.expectedSalary.message}</p>
              )}

              
              <label className="mt-3" htmlFor="expectedSalary">
                phone 
              </label>
              <input
                type="number"
                id="phone"
                placeholder="Add your phone number"
                className="form-control mt-3"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-danger">{errors.phone.message}</p>
              )}




              
              <label className="mt-3" htmlFor="expectedSalary">
                Date of Birth 
              </label>
              <input
                type="date"
                id="dateofBirth"
                placeholder="Add your demanded salary"
                className="form-control mt-3"
                {...register("dateofBirth")}
              />
              {errors.dateofBirth && (
                <p className="text-danger">{errors.dateofBirth.message}</p>
              )}
            </div>

            <div
              className="p-4 rounded mb-4 border"
              style={{
                background: "white",
                width: "100%",
              }}
            >
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

            <div
              className="d-flex gap-3 justify-content-center p-4"
              style={{ background: "transparent", width: "100%" }}
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
                style={{ height: "50px", width: "180px" }}
                className="btn btn-secondary"
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
