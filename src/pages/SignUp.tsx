import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "../assets/styles.css";
import { useAuth } from "../config/AuthProvider";



const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
    email: z.email("Invalid email address"),
    role: z.enum(["applicant"]),
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
  const {setToken,setUser} = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "applicant",
      password: "", 
      confirmPassword: "",
    },
  });

  const signUp = async (data: SignUpInput) => {
    try {
      const res = await api.post("/users/sign-up", data);
      console.log("Signup successful:", res.data);
      setUser(res.data.user)
      setToken(res.data.token)


     
      navigate("/applicant-information");
    } catch (error: any) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card row g-0">
        <div className="col-lg-6 signin-left d-none d-lg-flex">
          <div>
            <div className="signin-logo">📁</div>
            <h1 className="signin-title">Join JobPortal</h1>
            <p className="signin-subtitle">
              Create your account and start your journey to finding the perfect job
            </p>
            <div className="mt-4">
              <p className="mb-2">Already have an account?</p>
              <div className="flex justify-center gap-4">
                <div>
               <button
                className="btn btn-light btn-lg px-4"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
               </button>
                </div>
               <div>
                 
                 <button
                className="btn mt-2 btn-light btn-lg px-4"
                onClick={() => navigate("/employer-signup")}
              >
                Employer Signup
              </button>

               </div>
              
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 signin-right">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Create Account</h2>
            <p className="text-muted">Join thousands of professionals finding their dream jobs</p>
          </div>

          <form onSubmit={handleSubmit(signUp)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    {...register("firstName")}
                  />
                  <label htmlFor="firstName">First Name</label>
                  {errors.firstName && (
                    <div className="text-danger small mt-1">{errors.firstName.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  <label htmlFor="lastName">Last Name</label>
                  {errors.lastName && (
                    <div className="text-danger small mt-1">{errors.lastName.message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                {...register("email")}
              />
              <label htmlFor="email">Email address</label>
              {errors.email && (
                <div className="text-danger small mt-1">{errors.email.message}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              <label htmlFor="password">Password</label>
              {errors.password && (
                <div className="text-danger small mt-1">{errors.password.message}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              {errors.confirmPassword && (
                <div className="text-danger small mt-1">{errors.confirmPassword.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-signin w-100 mb-3">
              Create Account
            </button>

            <div className="text-center d-lg-none">
              <p className="signup-link mb-0">
                Already have an account?{" "}
                <span onClick={() => navigate("/sign-in")}>Sign In</span>

              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
