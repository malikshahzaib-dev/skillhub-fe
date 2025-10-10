// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import api from "../config/api";

// const signInSchema = z.object({
//   email: z.email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

// type SignInInput = z.infer<typeof signInSchema>;

// export default function SignIn() {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInInput>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const signIn = async (data: SignInInput) => {
//     try {
//       const res = await api.post("/users/login", data);
//       console.log("Signin successful:", res.data);
//       navigate("/organization-dashboard");
//     } catch (error) {
//       console.error("Signin error:", error);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center p-4"
//       style={{ height: "100%", background: "#f9f9f5" }}
//     >
//       <div
//         className="border p-5 rounded"
//         style={{ width: "500px", background: "white" }}
//       >
//         <div className="text-center mb-2 mt-5">
//           <h1 style={{ fontSize: "32px" }}>📁</h1>
//           <h4 className="mt-2 fs-24 fw-bold">Organization Portal</h4>
//         </div>

//         <h3 className="text-center fs-32 fw-bold">Welcome Back</h3>
//         <p className="text-center fs-16">Sign in to your account to continue</p>

//         <form className="border p-4" onSubmit={handleSubmit(signIn)}>
//           <h6>SignIn</h6>
//           <p>Enter your credentials to access your account</p>

//           <div>
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter your email"
//               {...register("email")}
//             />
//             {errors.email && (
//               <p className="text-danger">{errors.email.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="form-label mt-2">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter your password"
//               {...register("password")}
//             />
//             {errors.password && (
//               <p className="text-danger">{errors.password.message}</p>
//             )}
//           </div>

//           <div>
//             <a href="/forgot-password">
//               <p className="mt-2">Forgot Password</p>
//             </a>

//             <button
//               type="submit"
//               className="btn btn-primary mt-2 text-center w-100"
//             >
//               SignIn
//             </button>

//             <p className="mt-3 text-center">
//               Don't have an account? <a href="/employer-signup">SignUp</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
