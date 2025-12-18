import {  useNavigate, useParams } from "react-router-dom"
import api from "../config/api"
import {  useEffect, useState } from "react"





export default function JobDetail () {
    const {jobId} = useParams()
    const [job,setJob] = useState<any>(null)

    const navigate = useNavigate()


    const fetchJob = async () => {
        try{
            const res = await api.get(`/job/${jobId}`)
            console.log("job detail",res.data)
            setJob(res.data)
        }catch(error){
            console.error("error to fetch job detail",error)
        }
    }

    useEffect(() => {
        fetchJob()
    },[jobId])

    return (
        <>
        <div style={{background:"#f9f9f5"}}>
            <div>
                <h1 className="text-center fs-16 fw-bold p-5">Job Detail</h1>
            </div>
            <div className="d-flex justify-content-center">
            <div className="p-4 rounded" style={{height:"100%",width:"900px",background:"white"}}>
                <h1 className="mt-3 py-2 text-center">More About This job:</h1>
                <h3 className="mt-4">jobTitle:<p className="m-0 text-muted">{job?.jobTitle}</p></h3>
                <h3 className="mt-4">department: <p className="m-0 text-muted">{job?.department}</p></h3>
                <h3 className="mt-4">location:<p className="m-0 text-muted">{job?.location}</p></h3>
                <h3 className="mt-4">jobType:<p className="m-0 text-muted">{job?.jobType}</p></h3>
                 <h3>maximumSalary:<p className="m-0 text-muted">{job?.maximumSalary}</p></h3>
                 <h3>minimumSalary:<p className="m-0 text-muted">{job?.minimumSalary}</p></h3>
                <h3 className="mt-4">jobDescription:<p className="m-0 text-muted">{job?.jobDescription}</p></h3>
                <h3 className="mt-4">responsibilities:<p className="m-0 text-muted">{job?.responsibilities}</p></h3>
                <h3 className="mt-4">benefits:<p className="m-0 text-muted">{job?.benefits}</p></h3>
                <h3 className="mt-4">requirements:<p className="m-0 text-muted">{job?.requirements}</p></h3>
                <h3 className="mt-4">skills:<p className="m-0 text-muted">{job?.skills}</p></h3>

                <div className="d-flex justify-content-center gap-3">
                <button onClick={() => navigate(`/create-application/${jobId}`)}  style={{height:"40px",width:"200px",background:"black"}} className="btn btn-primary mt-3">Apply For This Job</button>
                <button onClick={() => navigate(`/update-job/${jobId}`)}  style={{height:"40px",width:"200px",background:"black"}} className="btn btn-primary mt-3">Edit Job</button>

                </div>

            </div>

            </div>

        </div>
        </>
    )
}
