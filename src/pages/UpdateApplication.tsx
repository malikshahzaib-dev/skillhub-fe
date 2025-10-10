
const UpdateApplication = () => {
  let user;
  const foundUser = localStorage.getItem('user')
  if (foundUser) {
    user = JSON.parse(foundUser)
  }

  console.log(user)
  return (
    <>
      <div className="vh-100" style={{ background: "grey" }}>
        <div className="p-5">
          <h1 className="text-center fs-48 fw-bold">Update Application</h1>
          <p className="text-center">Review and update your application details below</p>
        </div>

        <form>
          <div
            className="p-5"
            style={{ height: "750px", width: "100%", background: "lightgrey" }}
          >
            <div
              className="border p-4 rounded"
              style={{ height: "770px", width: "100%", background: "white" }}
            >
              <h1>Personal Information</h1>
              <p>Your details to apply for this job</p>

              <label htmlFor="name"> Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="form-control mt-3"
                required
              />

              <label className="mt-3" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-control mt-3"
                required
              />

              <label className="mt-3" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                className="form-control mt-3"
              />

              <label className="mt-3" htmlFor="experience">
                Experience (in years)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                placeholder="Years of experience"
                className="form-control mt-3"
              />

              <label className="mt-3" htmlFor="skills">
                Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="Add your skills (comma separated)"
                className="form-control mt-3"
              />

              <label className="mt-3" htmlFor="status">
                Application Status
              </label>
              <select id="status" name="status" className="form-select mt-3">
                <option value="" disabled selected>
                  Select Status
                </option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>

          <div
            className="p-5"
            style={{ height: "250px", width: "100%", background: "lightgrey" }}
          >
            <div className="p-4 rounded" style={{ background: "white" }}>
              <h1>Resume Upload</h1>
              <p>Provide your CV/Resume to complete the application</p>
              <label htmlFor="resume"> Upload Resume</label>
              <input type="file" id="resume" name="resume" className="form-control mt-3" />
            </div>
          </div>

          {/* Job Selection */}
          <div
            className="p-5"
            style={{ height: "300px", width: "100%", background: "lightgrey" }}
          >
            <div className="p-4 rounded" style={{ background: "white" }}>
              <h1>Job Information</h1>
              <p>Select the job you want to apply for</p>
              <label htmlFor="job"> Select Job</label>
              <select id="job" name="jobId" className="form-select mt-3" required>
                <option value="" disabled selected>
                  Choose Job
                </option>
                <option value="job1">Software Engineer</option>
                <option value="job2">UI/UX Designer</option>
                <option value="job3">Backend Developer</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="d-flex gap-3 justify-content-end p-5 mb-5"
            style={{ background: "lightgrey" }}
          >
            <button
              type="submit"
              style={{ height: "50px", width: "180px" }}
              className="btn btn-primary"
            >
              Submit Application
            </button>
            <button
              type="reset"
              style={{ height: "50px", width: "130px" }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateApplication;
