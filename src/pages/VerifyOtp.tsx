import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";


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
    <div
      className="d-flex justify-content-center p-2"
      style={{ height: "100%", background: "#f9f9f5" }}
    >
      <div
        className="border p-5 rounded"
        style={{ width: "500px", background: "white" }}
      >
        <div className="text-center mb-2 ">
          <h1 style={{ fontSize: "32px" }}>📁</h1>
          <h4 className="mt-2 fs-24 fw-bold">JobPortal</h4>
        </div>

        <h3 className="text-center fs-32 fw-bold">Verify OTP</h3>
        <p className="text-center fs-16">
          Enter the one time password sent to your email
        </p>

        <form className=" p-4 mt-5" onSubmit={handleSubmit(otpCreation)}>
          <h6>OTP Verification</h6>
          <p>Enter the OTP to verify your account</p>

          <div>
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your OTP"
              {...register("otp")}
            />
            {errors.otp && <p className="text-danger">{errors.otp.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary mt-3 text-center w-100"
            >
              Verify OTP
            </button>

            <p className="mt-3 text-center">
              Didn't receive OTP? {<Link to="/forgot-password"> Resend </Link>}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
