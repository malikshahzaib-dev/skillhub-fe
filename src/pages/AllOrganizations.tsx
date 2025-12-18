import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";

export default function AllOrganization() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<any>([]);
  //   const [status, setStatus] = useState("");
  // const {id }= useParams()
  const fetchOrganization = async () => {
    try {
      const res = await api.get("/organization");
      console.log("found organization by super admin", res.data);
      setOrganizations(res.data.foundAllOrganizations);
    } catch (err: any) {
      console.error("error to fetch organizations");
    }
  };

  const deleleOrganization = async (organizationId: string) => {
    try {
      const res = await api.delete(`/organization/${organizationId}`);
      console.log("organization deleted successfully", res.data);
    } catch (err: any) {
      console.error("error to delete organization");
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);




  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await api.patch(`/organization/${id}/status`, {
        status: newStatus,
      });
      console.log("status update successfully", response.data);
      // setOrganizations([...organizations,status])
      setOrganizations(
        organizations.map(() =>
          organizations._id === id
            ? { ...organizations, newStatus }
            : organizations
        )
      );
    } catch (err: any) {
      console.error("error to update status", err);
    }
  };


const updateStatus = async (organizationId: string, status: string) => {
  try {
    const res = await api.patch(`/organization/${organizationId}/status`,{ status: status });
    console.log("Organization status updated successfully", res.data);
    fetchOrganization();
  } catch (err: any) {
    console.error("Error updating status", err);
  }
};

  return (
    <>
      <NavBar />
      <div className="container p-3">
        <h1 className="fw-bold fs-16 ">Organizations</h1>
        <p className="mt-3">Manage and view all organizations you've created</p>
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
          {/* <button
            className="rounded-3 bg-dark "
            style={{ height: "40px", width: "17%", color: "white" }}
          >
            + Create Organization
          </button> */}
        </div>
        <div className="container my-5">
          <div className="row g-4">
            {organizations.map((organization: any, ind: any) => (
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

                    <div className="dropdown">
                      <div
                        className="cursor-pointer"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          style={{
                            height: "30px",
                            width: "80px",
                            borderRadius: "12px",
                            border: "1px solid black",
                          }}
                        >
                          <p> {organization.status}</p>
                        </div>
                      </div>

                      <ul className="dropdown-menu">
                        <li>
                          <button
                          onClick={()=>updateStatus(organization._id,'reject')}
                            className="dropdown-item"
                          >
                            Reject
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={()=>updateStatus(organization._id,'approved')}
                            className="dropdown-item"
                          >
                            Approved
                          </button>
                        </li>
                        <li>
                          <button
                               onClick={()=>updateStatus(organization._id,'block')}
                            className="dropdown-item"
                          >
                            Block
                          </button>
                        </li>
                        <li>
                          <button
                              onClick={()=>updateStatus(organization._id,'unBlock')}
                            className="dropdown-item"
                          >
                            unBlock
                          </button>
                        </li>
                      </ul>
                    </div>
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
                      onClick={() =>
                        navigate(`/organization/${organization._id}`)
                      }
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
                      onClick={() => deleleOrganization(organization._id)}
                      className="rounded"
                      style={{
                        width: "30%",
                        height: "30px",
                        background: "black",
                        color: "white",
                      }}
                    >
                      Delete
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
