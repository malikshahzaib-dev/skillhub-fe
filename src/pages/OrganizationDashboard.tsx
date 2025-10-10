import { useNavigate } from "react-router-dom";

const OrganizationDashboard = () => {

    

    const navigate = useNavigate()
    return (
        <>
            <div className="" style={{ minHeight: "100vh", width: "100%", backgroundColor: "#f9f9f5" }}>
                <div className=" d-flex justify-content-around" style={{ width: "100%", backgroundColor: "#f9f9f5" }}>
                    <div style={{ height: "110px", width: "100%", backgroundColor: "#333333" }} className="d-flex justify-content-between align-items-center p-5">
                        <h1><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="yellow" viewBox="0 0 24 24">
                            <path d="M10 2h4a2 2 0 012 2v2h4a2 2 0 012 2v12a2 
                              2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 
                                0 012-2h4V4a2 2 0 012-2zm2 
                                 2h-2v2h4V4h-2z"/>
                 </svg>  </h1>
                        <div className="d-flex justify-content-center  gap-5">
                            <div>

                                <h1 className="text-center text-white">Dashboard</h1>
                            </div>
                            <div>
                                <h1 className="text-center text-white">Jobs</h1>
                            </div>
                            <div><h1 className="text-center text-white" style={{ textAlign: "center" }}>Application</h1></div>
                        </div>
                    </div>




                </div>
                <div className="" style={{ background: "" }}>
                    <h1 className="text-center p-3 mt-4 fs-1 fw-bold">Organization Dashboard</h1>
                    <p className="text-center fs-1 fw-semibold " style={{ paddingLeft: "200px", paddingRight: "200px" }}> Welcome to your organization dashboard. Here you can manage job postings,
                        review applications, and track your hiring process — all in one place.</p>
                </div>
                <div className="d-flex gap-4 justify-content-center align-items-center">
                    <div className="text-center p-5" style={{ background: "" }}>
                            <button onClick={ () => navigate("/create-job")}  className="btn btn-primary" style={{ height: "50px", width: "200px" }}>Create Job Posting</button>
                    </div>

                    <div className="text-center p-5" style={{ background: "" }}>
                        <button  onClick={() => navigate("/application")} className="btn btn-secondary" style={{ height: "50px", width: "200px" }}>View Applications</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrganizationDashboard;
