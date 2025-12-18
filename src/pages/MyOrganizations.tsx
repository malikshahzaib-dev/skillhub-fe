import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";

export default function MyOrganizations() {
    const navigate = useNavigate()
  const [organization, setOrganization] = useState<any>([]);
   const user = JSON.parse(localStorage.getItem("user")!)
    const userId = user?._id
   

  const fetchOrganization = async () => {
    try {
      if(user.role === "super admin"){
        const res = await api.get("/organization")
        console.log("found organization by super admin",res.data)
        setOrganization(res.data)
      }else if(user.role === "organization"){
        const res = await api.get(`/organization?admin=${userId}`);
      console.log(" found organizations successfully", res.data);
      setOrganization(res.data.foundOrganizations);
      }
     
    } catch (err: any) {
      console.error("error to fetch organizations");
    }
  };
  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <>
    <NavBar/>
      <div className="container p-3">
        <h1 className="fw-bold fs-16 ">Organization</h1>
        <p className="mt-3">Manage and view his organizations you've created</p>
        <hr className="mt-5" />
        <div className="d-flex justify-content-center gap-3 mt-5">
          <input
            style={{ height: "40px", width: "83%", paddingLeft: "20px" }}
            className="rounded-3 border"
            type="text"
            name=""
            id=""
            placeholder="search organization"
          />
          <button
          disabled = {organization?.status !== "approved"}
           onClick={() => navigate("/create-job")}
            className="rounded-3 bg-dark "
            style={{ height: "40px", width: "17%", color: "white" }}
          >
            + Create Job
          </button>
        </div>
        <div className="container my-5">
          <div className="row g-4">
            {organization.map((organization:any, ind: any) => (
              <div key={ind} className="col-4"> 
                <div
                  className="p-4 border rounded"
                  style={{ height: "320px", background: "white" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>🏢</h1>
                    <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
                      {organization.name}
                    </h2>
                    <span
                      className="badge text-center"
                      style={{
                        height: "28px",
                        width: "75px",
                        color: "black",
                        borderRadius: "16px",
                        border: "1px solid black",
                      }}
                    >
                      {organization.status}
                    </span>
                  </div>

                  <p style={{ fontSize: "18px" }}>{organization.description}</p>
                  <hr className="mt-5" />

                  <div className="d-flex justify-content-between">
                    <p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icon-tabler-users"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                      </svg>
                      &nbsp;24 members
                    </p>
                    <p>{organization.createdAt}</p>
                  </div>

                  <div className="d-flex gap-3">
                    <button
                    onClick={() => navigate(`/organization/${organization._id}`)}

                      className="rounded"
                      style={{
                        width: "75%",
                        height: "30px",
                        background: "black",
                        color: "white",
                      }}
                    >
                      View
                    </button>
                    <button
                    onClick={() => navigate(`/update-organization/${organization._id}`)}
                      className="rounded"
                      style={{
                        width: "40%",
                        height: "30px",
                        background: "black",
                        color: "white",
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
