import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

export default function NavBar() {
  const userInStringify = localStorage.getItem("user");
  const user = userInStringify && JSON.parse(userInStringify);
  console.log(user, "user");
  const userRole = user?.role;
  console.log("userRole", userRole);
  const navigate = useNavigate();
  const [showLogOut, setShowLogOut] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/sign-in");
  };

  const handleProfileClik = async () => {
    if (user && userRole === "organization") {
      try {
    const orgId = user?._id

        const res = await api.get(`/organization/users/${orgId}`);
        console.log("organization fetch successfully", res.data);
        const dataOrg = res.data;

        if (!dataOrg) {
          alert("organizatioin not created");
          return;
        }
        if (dataOrg.status !== "approved") {
          alert("organization status not approved");
          return;
        }
        navigate(`/update-organization/${dataOrg._id}`);
      } catch (err) {
        console.error("organization not found");
      }
    } else {
      navigate(`/update-applicantinformation/${user._id}`);
    }
  };

  return (
    <>
      <div
        className="container "
        style={{
          height: "100px",
          background: "red",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "100%",
            background: "grey",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <div className="d-flex justify-content-between align-items-center h-100 px-5">
            <div className="d-flex gap-4">
              <h1 className="mt-5">📁</h1>
              <div
                className="d-flex p-2 mt-5  align-items-center"
                style={{ flexDirection: "column" }}
              >
                <h1
                  className="fw-bold"
                  style={{
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate("/")}
                >
                  JobPortal
                </h1>
                <p>
                  {user?.role} <p style={{ fontSize: "16px" }}>Dashboard</p>
                </p>
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center  gap-5 px-5 w-100">
              <div>
                {!user && (
                  <button
                    className="rounded"
                    style={{ height: "40px", width: "100px" }}
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign Up
                  </button>
                )}
              </div>

              <div>
                {!user && (
                  <button
                    className="rounded"
                    style={{ height: "40px", width: "150px" }}
                    onClick={() => navigate("/employer-signup")}
                  >
                    Employer/ Sign-up
                  </button>
                )}
              </div>

              {user && userRole === "admin" && (
                <div className="d-flex justify-content-center align-items-center gap-5">
                  <button
                    onClick={() => navigate("/all-organization")}
                    className="rounded"
                    style={{ height: "40px", width: "140px" }}
                  >
                    All Organization
                  </button>

                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "1px solid",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowLogOut(!showLogOut)}
                  >
                    <img
                      src="https://i.pravatar.cc/150?img=3"
                      alt="profile"
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex gap-5">
              {showLogOut && (
                <div
                  className="rounded  align-items-center border"
                  style={{
                    height: "140px",
                    width: "160px",
                    background: "white",
                    textAlign: "center",
                    position: "absolute",
                    top: "60px",
                    right: 0,
                  }}
                >
                  <p
                    className="rounded text-center mt-4"
                    onClick={handleLogOut}
                    style={{
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    logout
                  </p>
                  <p
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={handleProfileClik}
                    // onClick={() =>
                    //   userRole === "organization" ?
                    //   navigate(`/update-organization/${user._id}`)
                    //  : navigate(`/update-applicantinformation/${user._id}`)
                    // }
                  >
                    profile
                  </p>
                  <p>{userRole}</p>
                </div>
              )}
              {user && userRole === "applicant" && (
                <button
                  onClick={() => navigate("/jobs")}
                  className="rounded"
                  style={{ height: "40px", width: "100px" }}
                >
                  All Jobs
                </button>
              )}

              {user && userRole === "applicant" && (
                <button
                  onClick={() => navigate("/my-jobapplied")}
                  className="rounded"
                  style={{ height: "40px", width: "140px" }}
                >
                  My AppliedJob
                </button>
              )}

              {user && userRole === "applicant" && (
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    border: "1px solid",
                    position: "relative",
                  }}
                >
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="profile"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
                    onClick={() => setShowLogOut(!showLogOut)}
                  />
                </div>
              )}

              {user && userRole === "organization" && (
                <button
                  onClick={() => navigate(`/my-jobs`)}
                  className="rounded"
                  style={{ height: "40px", width: "100px" }}
                >
                  My Jobs
                </button>
              )}

              {user && userRole === "organization" && (
                <button
                  onClick={() => navigate("/my-organization")}
                  className="rounded"
                  style={{ height: "40px", width: "160px" }}
                >
                  My Organization
                </button>
              )}

              {user && userRole === "organization" && (
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    border: "1px solid",
                    position: "relative",
                  }}
                >
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="profile"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                    }}
                    onClick={() => setShowLogOut(!showLogOut)}
                  />
                </div>
              )}
            </div>
            <div
              className="d-flex p-4 align-items-center"
              style={{ flexDirection: "column" }}
            >
              <div>
                {user?.firstName}
                {user?.lastName}
              </div>
              <div>{user?.email}</div>
              <div>{user?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
