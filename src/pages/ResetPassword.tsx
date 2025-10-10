import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import z  from "zod";
import api from "../config/api";
import { Link } from "react-router-dom";
const resetPasswordSchema = z.object({
    password: z.string().min(6,"Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6,"Password must be at least 6 characters long"),

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
    <>

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

        <h3 className="text-center fs-32 fw-bold">Reset Password</h3>
        <p className="text-center fs-16">
         Enter and confirm your new password to secure your account.
        </p>
        

        <form className=" p-3" onSubmit={handleSubmit(resetPassword)}>
          <h6 className="mt-2">Change your password</h6>
          <p>Enter your credentials to change your password</p>

          <div>
            <label className="form-label mt-3">password</label>
            <input
            {...register("password")}
              type="text"
              className="form-control mt-2"
              placeholder="Enter your email"
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
           
          </div>

          <div>
            <label className="form-label mt-3">Confirm Password</label>
            <input
            {...register("confirmPassword")}
              type="text"
              className="form-control mt-2"
              placeholder="Enter your password"
            />
            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
          
          </div>

          <div>
           

            <button
              type="submit"
              className="btn btn-primary mt-2 text-center w-100 mt-4"
            >
              Reset Password
            </button>

            <p className="mt-3 text-center">
              Don't have an account? <Link to="/sign-in">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

