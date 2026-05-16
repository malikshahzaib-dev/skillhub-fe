import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";
import "../assets/styles.css";


const otpSchema = z.object({
  otp: z.string(),
});

type otpInput = z.infer<typeof otpSchema>;

export default function OtpVerify() {
  const navigate = useNavigate();
 const {state}= useLocation()
 const email = state?.email


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<otpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpCreation = async (data: otpInput) => {
    try {
      const response = await api.post("/users/verify-otp", {
        otp: data.otp,
        email: email, 
      });
      console.log("OTP Verified:", response.data);
      navigate("/reset-password",{   
        state:{
          email:email,
          otp:String(data.otp)
        }
      });
    } catch (error: any) {
      console.error("OTP verification error:", error);
      // alert("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card row g-0">
        <div className="col-lg-6 signin-left d-none d-lg-flex">
          <div>
            <div className="signin-logo">📁</div>
            <h1 className="signin-title">Verify Your Email</h1>
            <p className="signin-subtitle">
              We've sent a verification code to your email. Enter it below to continue.
            </p>
            <div className="mt-4">
              <p className="mb-2">Didn't receive the code?</p>
              <Link to="/forgot-password" className="btn btn-light btn-lg px-4">
                Resend OTP
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6 signin-right">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">OTP Verification</h2>
            <p className="text-muted">Enter the one-time password sent to your email</p>
          </div>

          <form onSubmit={handleSubmit(otpCreation)}>
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control"
                id="otp"
                placeholder="000000"
                {...register("otp")}
              />
              <label htmlFor="otp">Enter OTP</label>
              {errors.otp && (
                <div className="text-danger small mt-1">{errors.otp.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-signin w-100 mb-3">
              Verify OTP
            </button>

            <div className="text-center d-lg-none">
              <p className="signup-link mb-0">
                Didn't receive OTP?{" "}
                <Link to="/forgot-password" className="signup-link">
                  Resend
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
