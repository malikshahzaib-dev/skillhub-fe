import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";
import { Link } from "react-router-dom";
import "../assets/styles.css";
const resetPasswordSchema = z.object({
    password: z.string().min(8,"Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8,"Password must be at least 8 characters long"),

})
.refine((data) => data.password === data.confirmPassword, {
  message:"password do not match",
  path:["confirmPassword"]
})

type resetPasswordInput = z.infer< typeof resetPasswordSchema>

export default function ResetPassword () {
    const navigate  = useNavigate()

    const location = useLocation()
const {email,otp} = location.state || {}
console.log("email and otp",email,"email",otp,"otp")


    const {register,handleSubmit,formState:{errors}} = useForm<resetPasswordInput>({
        resolver:zodResolver(resetPasswordSchema),
        defaultValues: {
            password:"",
            confirmPassword:""
        }
        
    })

    const resetPassword = async (data:resetPasswordInput) => {
        try{
        const res = await api.patch("/users/reset-password", {email:email,otp:otp.toString(),newPassword:data.password})
        console.log("reset password succesfull",res.data)
        if(res.data){
        navigate("/sign-in",{
          state:{
          email:email,
          otp:String(otp)
          }   

        })
     
        }

        }
        catch (errors:any) {
            console.log("error",errors)

        }
    }




  return (
    <div className="signin-container">
      <div className="signin-card row g-0">
        <div className="col-lg-6 signin-left d-none d-lg-flex">
          <div>
            <div className="signin-logo">📁</div>
            <h1 className="signin-title">Secure Your Account</h1>
            <p className="signin-subtitle">
              Create a strong password to protect your JobPortal account
            </p>
            <div className="mt-4">
              <p className="mb-2">Already have an account?</p>
              <Link to="/sign-in" className="btn btn-light btn-lg px-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-6 signin-right">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Reset Password</h2>
            <p className="text-muted">Enter and confirm your new password</p>
          </div>

          <form onSubmit={handleSubmit(resetPassword)}>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="New Password"
                {...register("password")}
              />
              <label htmlFor="password">New Password</label>
              {errors.password && (
                <div className="text-danger small mt-1">{errors.password.message}</div>
              )}
            </div>

            <div className="form-floating mb-4">
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
              Reset Password
            </button>

            <div className="text-center d-lg-none">
              <p className="signup-link mb-0">
                Already have an account?{" "}
                <Link to="/sign-in" className="signup-link">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

