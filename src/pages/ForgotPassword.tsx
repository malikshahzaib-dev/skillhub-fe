import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z  from "zod";
import api from "../config/api";

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
    <>
      <div
        className="d-flex justify-content-center p-2"
        style={{ height: "100%", background: "#f9f9f5" }}
      >
        <div
          className=" p-5 rounded"
          style={{ width: "500px", background: "white" }}
        >
          <div className="text-center mb-2 ">
            <h1 style={{ fontSize: "32px" }}>📁</h1>
            <h4 className="mt-2 fs-24 fw-bold">JobPortal</h4>
          </div>

          <h3 className="text-center fs-32 fw-bold">forgot Password</h3>
          <p className="text-center fs-16">
            Enter your Email to change your password
          </p>

          <form className=" p-2" onSubmit={handleSubmit(forgotPassword)}>
            <h6 className="mt-4">Reset Password</h6>
            <p>Enter your email address to receive reset instructions</p>
            <div>
              <label className="form-label">email</label>
              <input
                {...register("email")}
                type="email"
                className="form-control"
                placeholder="enter your  email"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            {/* <div>
            <label className="form-label mt-2">password</label>
            <input type="number" className="form-control" placeholder="enter your password"></input>
          </div> */}

            <div>
              {/* <label for = "role" className="mt-2">Role</label>
            <select id="role" className="form-select mt-2">
                <option selected disabled >select your role</option>
                <option value="applicanr">applicant</option>
                <option value= "organization admin">organization admin</option>
                <option value= "system admin">system admin</option>

            </select> */}
              {/* <a href="/Forgot Password">
                <p className="mt-2">Forgot Password</p>
            </a> */}

              <button className="btn btn-primary mt-4 text-center w-100">
                Send reset Link
              </button>

              {/* <p className="text-center mt-3">Remember your Password</p> */}

              <button
                style={{ height: "35px" }}
                className="mt-3 text-center w-100 rounded mt-5"
                onClick={() => navigate("/sign-in")}
              >
                Back to signIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
