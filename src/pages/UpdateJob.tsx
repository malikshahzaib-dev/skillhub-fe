// const UpdateJob = () => {
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");

//     const formData = () => {
//         jobTitle: FormData.jobTitle,
//         department: FormData.department,
//         location: FormData.location,
//         jobType: FormData.jobType,
//         status: FormData.status,
//         description: FormData.description,
//         requirements: FormData.requirements,
//         responsibilities: FormData.responsibilities,
//         minimumSalary: FormData.minimumSalary,
//         maximumSalary: FormData.maximumSalary,
//         benefits: FormData.benefits,
//         applicationClosing: FormData.applicationClosing,
//     }

//   return (
//     <>
//       <div className="vh-100 " style={{ background: "grey" }}>
//         <div className="p-5">
//           <h1 className="text-center fs-48 fw-bold">Update Job</h1>
//           <p className="text-center">
//             Update the details of your job posting
//           </p>
//         </div>

//         <form>
//           <div
//             className="p-5"
//             style={{ width: "100%", background: "lightgrey" }}
//           >
//             <div
//               className="border p-4 rounded"
//               style={{ width: "100%", background: "white" }}
//             >
//               <h1>Basic Information</h1>
//               <p>Essential details about the job position</p>

//               <label htmlFor="jobTitle"> Job Title</label>

//               <input
//                 value={FormData.jobTitle}
//                 onChange={(e) => jobTitle(e.target.value)}
//                 type="text"
//                 id="jobTitle"
//                 name="jobTitle"
//                 placeholder="Job Title"
//                 className="form-control mt-3"
//                 required
//               />

//               <label className="mt-3" htmlFor="department">
//                 Department
//               </label>
//               <input
//                 value={FormData.department}
//                 onChange={(e) => setDepartment(e.target.value)}
//                 type="text"
//                 id="department"
//                 name="department"
//                 placeholder="Department"
//                 className="form-control mt-3"
//               />

//               <label className="mt-3" htmlFor="location">
//                 Location
//               </label>
//               <input
//                 value={FormData.location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 type="text"
//                 id="location"
//                 name="location"
//                 placeholder="Location"
//                 className="form-control mt-3"
//               />

//               <label className="mt-3" htmlFor="jobtype">
//                 Job Type
//               </label>
//               <select id="jobtype" name="jobType"  value={FormData.jobType} onChange={(e) => setJobType(e.target.value)} className="form-select mt-3" required>
//                 <option value="" disabled selected>
//                   Select Job Type
//                 </option>
//                 <option value="full-time">Full-time</option>
//                 <option value="part-time">Part-time</option>
//                 <option value="contract">Contract</option>
//                 <option value="internship">Internship</option>
//               </select>

//               <label className="mt-3" htmlFor="status">
//                 Status
//               </label>
//               <select id="status" name="status"  value={FormData.status} onChange={(e) => setStatus(e.target.value)}  className="form-select mt-3">
//                 <option value="" disabled selected>
//                   Select Status
//                 </option>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>

//               <label className="mt-3" htmlFor="description">
//                 Job Description
//               </label>
//               <textarea 
//                 value={FormData.description}        
//                 onChange={(e) => setDescription(e.target.value)}
//                 id="description"
//                 name="description"
//                 className="form-control mt-3"
//                 rows={5}
//                 placeholder="Job Description"
//               ></textarea>
//             </div>
//           </div>

//           {/* Requirements */}
//           <div
//             className="p-5"
//             style={{ width: "100%", background: "lightgrey" }}
//           >
//             <div className="p-4 rounded" style={{ background: "white" }}>
//               <h1>Requirements & Responsibilities</h1>
//               <p>Skills and duties for this position</p>

//               <label htmlFor="requirements"> Requirements</label>
//               <input
//                 value={FormData.requirements}
//                 onChange={(e) => setRequirements(e.target.value)}
//                 type="text"
//                 id="requirements"
//                 name="requirements"
//                 placeholder="Add a requirement"
//                 className="form-control mt-3"
//               />

//               <label className="mt-3" htmlFor="responsibilities">
//                 Responsibilities
//               </label>
//               <input
//               value={FormData.responsibilities}
//                 onChange={(e) => setResponsibilities(e.target.value)}
//                 type="text"
//                 id="responsibilities"
//                 name="responsibilities"
//                 placeholder="Add a responsibility"
//                 className="form-control mt-3"
//               />
//             </div>
//           </div>

//           {/* Compensation */}
//           <div
//             className="p-5"
//             style={{ width: "100%", background: "lightgrey" }}
//           >
//             <div className="p-4 rounded" style={{ background: "white" }}>
//               <h1>Compensation & Benefits</h1>
//               <p>Salary and perks for this position</p>

//               <label htmlFor="minimumSalary"> Minimum Salary ($)</label>
//               <input
//                 value={FormData.minimumSalary}
//                 onChange={(e) => setMinimumSalary(Number(e.target.value))}
//                 type="number"
//                 id="minimumSalary"
//                 name="minimumSalary"
//                 placeholder="Minimum Salary"
//                 className="form-control mt-3"
//               />

//               <label className="mt-3" htmlFor="maximumSalary">
//                 Maximum Salary
//               </label>
//               <input
//                 value={FormData.maximumSalary}
//                 onChange={(e) => setMaximumSalary(Number(e.target.value))}
//                 type="number"
//                 id="maximumSalary"
//                 name="maximumSalary"
//                 placeholder="Maximum Salary"
//                 className="form-control mt-3"
//               />

//               <label className="mt-3" htmlFor="benefits">
//                 Benefits
//               </label>
//               <input
//                 value={FormData.benefits}
//                 onChange={(e) => setBenefits(e.target.value)}
//                 type="text"
//                 id="benefits"
//                 name="benefits"
//                 placeholder="Add a benefit"
//                 className="form-control mt-3"
              
//               />

//               <label className="mt-3" htmlFor="applicationClosing">
//                 Application Closing Date
//               </label>
//               <input
//                 value={FormData.applicationClosing}
//                 onChange={(e) => setApplicationClosing(e.target.value)}
//                 type="date"
//                 id="applicationClosing"
//                 name="applicationClosing"
//                 className="form-control mt-3"
//               />
//             </div>
//           </div>

//           <div
//             className="d-flex gap-3 justify-content-end p-5 mb-5"
//             style={{ background: "lightgrey" }}
//           >
//             <button
//               type="submit"
//               style={{ height: "50px", width: "130px" }}
//               className="btn btn-primary mt-1 text-center"
//             >
//               Edit Job
//             </button>
//             <button
//               type="reset"
//               style={{ height: "50px", width: "130px" }}
//               className="btn btn-secondary mt-1 text-center"
//             >
//               Delete
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default UpdateJob;
