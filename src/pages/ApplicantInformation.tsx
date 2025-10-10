import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import z, { } from "zod"
import api from "../config/api"

const ApplicantSchema = z.object({
    education:z.string().min(1,"education should be at least 1 character ").max(20),
    contactNumber:z.number(),
    address:z.string().min(2).max(20),
    skills:z.string().min(2).max(100),
    experience:z.string(),
    resume:z.any(),
 dateofBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
})

type ApplicantInput = z.infer<typeof ApplicantSchema>


const ApplicantInformation = () => {

    const navigate = useNavigate()

    const {register,handleSubmit,formState:{errors}} = useForm<ApplicantInput>({
        resolver:zodResolver(ApplicantSchema),
        defaultValues:{
            education:"",
            contactNumber:0,
            address:"",
            skills:"",
            experience:"",
            resume:null,
      dateofBirth: new Date().toISOString().split("T")[0],

        }
    })




const createInformation = async(data:ApplicantInput) => {
    try{
    const res = await api.post("/applicant",data)
    console.log("applicant creation successfull",res.data)
    navigate("/applicant-dashboard")
    }
    catch(error:any){
        console.error("applicant creation error",error)
    }
    

}

    return(
        <>
        <div style={{background:"#f9f9f5"}}>
            <div>
                <h1 className="text-center p-4 fs-bold fw-bold">Applicant Information</h1>
            </div>

           <form onSubmit={handleSubmit(createInformation)}>


            <div className="d-flex justify-content-center">

                
            <div className="rounded p-4" style={{height:"720px",width:"800px",background:"white"}}>

                <h1>Applicant Information</h1>
                <p className="mt-3" style={{fontSize:"20px"}}>pleage give your informatiion</p>


                <label htmlFor="" className="form-label mt-3">Education</label>
                <input type="text"  {...register("education")}  className="form-control mt-2" placeholder="enter your education" />
                {errors.education && <p className="text-danger">{errors.education.message}</p>}



                  <label htmlFor=""  className="form-label mt-3">Experience</label>
                <input type="number"   {...register("experience")}   className="form-control mt-2" placeholder="enter your education" />
                {errors.experience && <p className="text-danger">{errors.experience.message} </p>}




                
                  <label htmlFor=""  className="form-label mt-3">Contact Number</label>
                <input type="number"   {...register("experience")}   className="form-control mt-2" placeholder="enter your education" />
                {errors.contactNumber && <p className="text-danger">{errors.contactNumber.message} </p>}




            
              <label className="form-label fw-semibold mt-3">
                Application Closing Date *
              </label>
              <input
                {...register("dateofBirth")}
                type="date"
                className="form-control mt-2"
              ></input>

              {errors.dateofBirth && (
                <p className="text-danger">{errors.dateofBirth.message}</p>
              )}




                  <label htmlFor="" className="form-label mt-3">Skills</label>
                <input type="text"    {...register("skills")}  className="form-control mt-2" placeholder="enter your education" />
                {errors.skills && <p className="text-danger">{errors.skills.message}</p>}





                 

                  <label htmlFor="" className="form-label mt-3">Address</label>
                <input type="text"   {...register("address")} className="form-control mt-2" placeholder="enter your education" />
                {errors.address && <p className="tex-danger">{errors.address.message}</p>}

            </div>
            </div>
              <div className="d-flex justify-content-center mt-3  p-4" >
          
               <div className="p-4" style={{height:"200px",width:"800px",background:"white"}}>
                <h1 className="fw-semibold">Upload Resume</h1>
                 <label htmlFor="" className="form-label mt-3">Resume</label>
                <input type="file" {...register("resume")}  className="form-control mt-2" placeholder="choosen file" />
                {errors.resume && <p className="text-success">{errors.resume.message as string}</p>}
              </div>
            </div>

                <div className="d-flex justify-content-center mt-3 mb-3">
                    <button  type="submit" className="btn btn-danger" style={{height:'50px',width:"200px"}}>Register Information</button>
                </div>
            </form>

            </div>
            

        
        </>
    )
}
export default ApplicantInformation