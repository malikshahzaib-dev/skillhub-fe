import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
    email: z.email("Invalid email address"),
    role: z.enum([ "organization"]),
    password: z.string().min(8, "Password must be at least 8 characters").max(100),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


type SignUpInput = z.infer<typeof signUpSchema>;

function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "organization",
      password: "",
      confirmPassword: "",
    },
  });

  const signUp = async (data: SignUpInput) => {
    try {
      const res = await api.post("/users/sign-up", data);
      console.log("Signup successful:", res.data);
      navigate("/organization-information");
    } catch (error: any) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
   <div style={{background:"#f9f9f5"}}>
     <div className="text-center mb-2 mt-5" style={{background:"#f9f9f5"}}>
          <h1 style={{ fontSize: "32px" }}>📁</h1>
          <h4 className="mt-2 fs-24 fw-bold">Employers Portal</h4>
        </div>

        <h3 className="text-center mb-2 fs-32 fw-bold mt-2">Create Account</h3>
        <p className="text-center  fs-8 p-4">
           Join thousands of companies hiring top talent. Create your employer account today  <br />and start posting jobs to find the perfect candidates for your organization.
        </p>
        </div>
    <div
      className="d-flex justify-content-center align-items-center p-4"
      style={{ height: "100%", backgroundColor: "#f9f9f5" }}
    >
      <div className="border p-5 rounded" style={{ width: "500px", background: "#f9f9f5" }}>
       

        <form onSubmit={handleSubmit(signUp)}>
          <div>
            <label className="form-label ">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="form-label mt-2">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label mt-2">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label mt-2">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password")}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/sign-in">SignIn</a>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignUp;
