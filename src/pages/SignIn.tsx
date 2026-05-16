import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../config/api";
import "../assets/styles.css";
import { useAuth } from "../config/AuthProvider";

const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInInput = z.infer<typeof signInSchema>;
export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const {setToken,setUser} = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
 

  const signIn = async (data: SignInInput) => {
    try {
      const res = await api.post("/users/login", data);
      setUser(res.data.user);
      setToken(res.data.token);
      if (res.data.user.role === "organization") {
        if (res.data.isOrganizationInformationComplete) {
          const from = location.state?.from || "/organization-dashboard";
          navigate(from);
        } else {
          navigate("/organization-information");
        }
      }

      else if (res.data.user.role === "applicant") {
        if (res.data.isApplicantInformationComplete)
          navigate("/applicant-dashboard");
        else {
          navigate("/applicant-information");
        }
      }
      else if(res.data.user.role === "admin") {
        navigate("/all-organization")
      }
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card row g-0">
        <div className="col-lg-6 signin-left d-none d-lg-flex">
          <div>
            <div className="signin-logo">📁</div>
            <h1 className="signin-title">Welcome Back</h1>
            <p className="signin-subtitle">
              Sign in to your account and continue your journey with JobPortal
            </p>
            <div className="mt-4">
              <p className="mb-2">Don't have an account?</p>
              <div>
               
               <button
                className="btn btn-light btn-lg px-4"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </button>
              </div>

              <div>

                  <button
                className="btn btn-light mt-3 btn-lg px-4"
                onClick={() => navigate("/employer-signup")}
              >
              Employer  Sign Up
              </button>
              </div>
              

               
            </div>
          </div>
        </div>
        <div className="col-lg-6 signin-right">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Sign In</h2>
            <p className="text-muted">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(signIn)}>
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

            <div className="d-flex justify-content-between align-items-center mb-4">
              <p  onClick={() => navigate("/forgot-password")} className="forgot-link">
                Forgot Password?
              </p>
            </div>

            <button type="submit" className="btn btn-signin w-100 mb-3">
              Sign In
            </button>
            <div className="text-center d-lg-none">
              <p className="signup-link mb-0">
                Don't have an account?{" "}
                <span onClick={() => navigate("/sign-up")}>Sign Up</span>
              </p>
            </div>
              
          </form>
        </div>
      </div>
    </div>
  );
}
