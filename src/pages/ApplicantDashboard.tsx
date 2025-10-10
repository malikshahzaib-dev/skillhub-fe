import { useNavigate } from "react-router-dom";

const ApplicantDashboard = () => {
    const navigate = useNavigate()
    return (
        <>
            <div style={{ height: "100vh", width: "100%", backgroundColor: "#f9f9f5" }}>
                <div className="d-flex justify-content-around" style={{ width: "100%", backgroundColor: "lightgrey" }}>
                    <div style={{ height: "110px", width: "100%", backgroundColor: "grey" }}
                        className="d-flex justify-content-between align-items-center p-5">

                        <h1>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="yellow" viewBox="0 0 24 24">
                                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 
                                         15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                        </h1>

                        <div className="d-flex justify-content-center gap-5">
                            <div>
                                <h1 className="text-center text-white">Dashboard</h1>
                            </div>
                            <div>
                                <h1 className="text-center text-white">Jobs</h1>
                            </div>
                            <div>
                                <h1 className="text-center text-white">My Applications</h1>
                            </div>
                            <div>
                                <h1 className="text-center text-white">Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-center p-3 mt-4 fs-1 fw-bold">Applicant Dashboard</h1>
                    <p className="text-center fs-1 fw-semibold"
                        style={{ paddingLeft: "200px", paddingRight: "200px" }}>
                        Welcome to your applicant dashboard. Here you can explore job postings,
                        apply for jobs, and track the status of your applications — all in one place.
                    </p>
                </div>


                <div className="d-flex gap-4 justify-content-center align-items-center">
                    <div className="text-center p-5">
                            <button  onClick={() => navigate("/job-page")} className="btn btn-primary" style={{ height: "50px", width: "200px" }}>
                                Browse Jobs
                            </button>
                    </div>

                    <div className="text-center p-5">
                            <button onClick={() => navigate("/my-application")} className="btn btn-secondary" style={{ height: "50px", width: "200px" }}>
                                My Applications
                            </button>
                    </div>

                    <div className="text-center p-5">
                            <button onClick={() => navigate("/my-profile")} className="btn btn-success" style={{ height: "50px", width: "200px" }}>
                                Update Profile
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplicantDashboard;
