import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthProvider";
import { useEffect, useState } from "react";

export default function Application() {
   const navigate = useNavigate();
  const { user } = useAuth();

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      const res = await api.get(`/application/organization/${user?._id}`);
      console.log("Applications fetched successfully", res.data);

      setApplications(res.data);
    } catch (err: any) {
      console.error("Error fetching applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (!user) {
      navigate("/sign-in");
      return;
    }

    if (user?._id) {
      fetchApplications();
    }

  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <NavBar />

      <h1
        className=" text-center "
        style={{ fontSize: "36px", fontWeight: "700", marginTop: "30px" }}
      >
        Applied Jobs
      </h1>

      <p className="text-center mt-2">
        Track all your job applications and their current status
      </p>
      <ul>
        {applications.map((application: any) => {
          const job = application.jobId;
          return (
            <li key={application._id}>
              <div
                className="container "
                style={{ background: "#ffffff", padding: "60px" }}
              >
                <div>
                  <div
                    className="p-4  border"
                    style={{
                      height: "250px",
                      width: "100%",
                      background: "white",
                      borderRadius: "12px",
                    }}
                  >
                    <h1 style={{ fontWeight: "700", fontSize: "32px" }}>
                      {job?.jobTitle}
                    </h1>
                    <div className="d-flex justify-content-between gap-3">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                        </svg>
                        {job?.location}
                      </span>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                          <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                          <path d="M12 12l0 .01" />
                          <path d="M3 13a20 20 0 0 0 18 0" />
                        </svg>
                        {job?.applicationclosingdate}
                      </p>

                      {/* <div className="dropdown ">
                           <button className="btn btn-primary dropdown-toggle d-flex align-items-center" data-bs-toggle = "dropdown" style={{height:"37px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg> 
                                <ul className="dropdown-menu">
                                 <li><a className="dropdown-item" href="">status</a></li>
                                 <li><a  className="dropdown-item" href="">
                                   <button style={{height:"25px",width:"60px",borderRadius:"8px",color:"white",alignItems:"center",background:"black"}} onClick={()=> updateApplication(application._id)}>Edit</button>
                                   </a></li>
                                 <li><a className="dropdown-item" href="">
                                   <button   style={{height:"25px",width:"80px",background:"black",color:"white",borderRadius:"8px",alignItems:"center"}} onClick={() => deleteApplication(application._id)}>Delelte</button></a></li>
                                </ul>
                           </button>
   
                         </div> */}
                    </div>
                    <p>{job?.jobDescription}</p>
                    <div className="d-flex gap-3">
                      <span
                        className=" border badge d-flex justify-content-center align-items-center"
                        style={{
                          height: "25px",
                          width: "80px",
                          color: "black",
                          borderRadius: "12px",
                        }}
                      >
                        {job?.jobType}
                      </span>
                      <span
                        className=" border badge d-flex justify-content-center align-items-center"
                        style={{
                          height: "25px",
                          width: "100px",
                          color: "black",
                          borderRadius: "12px",
                        }}
                      >
                        {job?.minimumSalary}-{job?.maximumSalary}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/job/${job?._id}`)}
                      className="btn btn-primary mt-3"
                      style={{ height: "40px", width: "120px" }}
                    >
                      view Detail
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
// }
