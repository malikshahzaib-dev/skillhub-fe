import { useEffect, useState } from "react";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useParams } from "react-router-dom";

export default function ApplicationDetail(){
    const[application,setApplication] = useState<any>("")
    const {id} = useParams()
    const fetchApplication = async() => {
        try{
            const res = await api.get(`/application/${id}`)
            console.log("fetch application successfully",res.data)
            setApplication(res.data)
        }catch(err:any){
            console.error("error to fetch applicationn")
        }
    }
      
    const updateStatus = async(status:string) => {
        try{
            const res = await api.patch(`/application/${id}/status`,{status})
            console.log("status updated successfully",res.data)
               setApplication({...application,status})

        }catch(err:any){
            console.error("error to update status",err)
        }
    }



    useEffect(() => {
        fetchApplication()
    },[id])
    return(
        <>
        <NavBar/>
        
               <div
        className="container   mt-4"
        style={{ background: "#ffffff", padding: "50px" }}
      >
        <h1 className="fs-24 mb-5" style={{ fontWeight: 700 }}>
          Applicant Information
        </h1>
        <div className="d-flex justify-content-between mb-4">
          <p>Application Details</p>

             <div className="d-flex justify-content-between align-items-center">
                  <select
                    className="badge d-flex justify-content-center align-items-center rounded  border"
                    style={{
                      height: "30px",
                      color: "black",
                      width: "90px",
                      borderRadius: "16px",
                    }}
                    value={application?.status}
                    onChange={(e)=>updateStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Hired">Hired</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>


        </div>
        <div
          className="container  border rounded p-4 mt-2"
          style={{ height: "150px", background: "white" }}
        >
          <h5 className="mb-3">FirstName</h5>
          <p className="mt-5">
            {application?.applicantId?.user?.firstName}
          </p>
        </div>
        <div className="d-flex justify-content-between  gap-3 mt-4">
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h5 className="mb-3">LastName</h5>
            <p className="mt-5">
              {application?.applicantId?.user?.lastName}
            </p>
          </div>
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h4 className="mb-3">Phone:</h4>
            <p className="mt-5">+{application?.phone}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between  gap-3 mt-4">
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h5 className="mb-3">email:</h5>
            <p className="mt-5">
              {application?.applicantId?.user?.email}
            </p>
          </div>
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h4 className="mb-3">Address</h4>
            <p className="mt-5">{application?.applicantId?.address}</p>
          </div>
        </div>
        <div
            className="container  border rounded p-4 mt-3"
            style={{ height: "150px", background: "white" }}
          >
            <h5 className="mb-3">expectedSalary:</h5>
            <p className="mt-5">
              {application?.expectedSalary}
            </p>
          </div>

        
      </div>
            </>
    )
}