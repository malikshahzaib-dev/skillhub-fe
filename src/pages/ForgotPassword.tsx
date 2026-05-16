import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";
import "../assets/styles.css";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const forgotPassword = async (data: forgotPasswordInput) => {
    try {
      console.log("hitting the forgot password", data);
      const res = await api.post("/users/forgot-password", data);
      console.log(res, "res");
      if (res.data) {
        navigate("/verify-otp", {
          state: {
            email: data.email,
          },
        });
      }
    } catch (error: any) {
      console.error("error", error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card row g-0">
        <div className="col-lg-6 signin-left d-none d-lg-flex">
          <div>
            <div className="signin-logo">📁</div>
            <h1 className="signin-title">Reset Password</h1>
            <p className="signin-subtitle">
              Enter your email address and we'll send you a link to reset your password
            </p>
            <div className="mt-4">
              <p className="mb-2">Remember your password?</p>
              <button
                className="btn btn-light btn-lg px-4"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 signin-right">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Forgot Password</h2>
            <p className="text-muted">Enter your email to receive reset instructions</p>
          </div>

          <form onSubmit={handleSubmit(forgotPassword)}>
            <div className="form-floating mb-4">
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

            <button type="submit" className="btn btn-signin w-100 mb-3">
              Send Reset Link
            </button>

            <div className="text-center d-lg-none">
              <p className="signup-link mb-0">
                Remember your password?{" "}
                <span onClick={() => navigate("/sign-in")}>Sign In</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
