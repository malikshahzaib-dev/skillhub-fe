import { useEffect } from "react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthProvider";
import { useQuery } from "@tanstack/react-query";

// interface Job {
//   _id: string;
//   jobTitle: string;
//   department: string;
//   location: string;
//   jobType: string;
//   status: string;
//   minimumSalary: string;
//   maximumSalary: string;
//   applicationclosingdate: string;
// }

function JobsList() {
  // const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();
  // const userObj = JSON.parse(localStorage.getItem("user")!)
  const { user } = useAuth();
  // console.log("userObj ", userObj)

  // const fetchJobs = async () => {
  //   try {
  //     const res = await api.get("/jobs");
  //     setJobs(res.data);
  //   } catch (err) {
  //     console.error("Error fetching jobs:", err);
  //   }
  // };

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  const { data: jobs , isLoading, error,} = useQuery({
     queryKey: ["jobs"],
     queryFn: async () => {
      const res = await api.get("/jobs");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs.</p>;

  return (
    <div style={{ background: "#f9f9f5", minHeight: "100vh" }}>
      <h1
        className="text-center pt-5"
        style={{ fontSize: "40px", fontWeight: 700 }}
      >
        Available Jobs
      </h1>

      <div className="container mt-5">
        <div className="row">
          {jobs.length === 0 ? (
            <p className="text-center">No jobs available yet</p>
          ) : (
            jobs.map((job: any) => (
              <div key={job._id} className="col-md-4 mb-4">
                <div
                  className="card shadow p-3 rounded"
                  style={{ minHeight: "260px" }}
                >
                  <h4>{job.jobTitle}</h4>
                  <p>
                    <b>Department:</b> {job.department}
                  </p>
                  <p>
                    <b>Location:</b> {job.location}
                  </p>
                  <p>
                    <b>Type:</b> {job.jobType}
                  </p>
                  <p>
                    <b>Salary:</b> {job.minimumSalary} - {job.maximumSalary}
                  </p>

                  <button
                    onClick={() => (window.location.href = `/job/${job._id}`)}
                    className="btn btn-primary mt-auto"
                  >
                    View & Apply
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsList;
