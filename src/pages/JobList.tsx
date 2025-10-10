import { useEffect, useState } from "react";
import api from "../config/api";

interface Job {
  _id: string;
  jobTitle: string;
  department: string;
  location: string;
  jobType: string;
  status: string;
  minimumSalary: string;
  maximumSalary: string;
  applicationclosingdate: string;
}

function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  // jobs fetch function
  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs"); // backend se jobs fetch
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
            jobs.map((job) => (
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
                    onClick={() => window.location.href = `/job/${job._id}`}
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
