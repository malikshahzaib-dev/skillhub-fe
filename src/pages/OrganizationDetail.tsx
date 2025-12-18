import { useEffect, useState } from "react";
import api from "../config/api";
import {  useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";

export default function OrganizationDetail() {
  const [organization, setOrganization] = useState<any>([]);
  const { id } = useParams();
  console.log(id, "id");

  const fetchOrganization = async () => {
    try {
      const res = await api.get(`/organization/${id}`);
      console.log("organization fetch successfully", res.data);
      setOrganization(res.data);
    } catch (err: any) {
      console.error("error to fetch organization detail");
    }
  };
  useEffect(() => {
    fetchOrganization();
  }, [id]);

  
  return (
    <>
<NavBar/>

      <div
        className="container  border mt-4"
        style={{ background: "#ffffff", padding: "40px" }}
      >
        <h1 className="fs-24" style={{ fontWeight: 700 }}>
          TechCorp Solutions
        </h1>
        <div className="d-flex justify-content-between">
          <p>Organization Details</p>
      
        </div>
        <div
          className="container  border rounded p-4 mt-2"
          style={{ height: "150px", background: "white" }}
        >
          <h2 className="mb-3">About</h2>
          <p className="mt-5">
            {organization?.description}
          </p>
        </div>
        <div className="d-flex justify-content-between  gap-3 mt-4">
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h5 className="mb-3">Email</h5>
            <p className="mt-5">
              {organization?.contactEmail}
            </p>
          </div>
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h4 className="mb-3">Phone:</h4>
            <p className="mt-5">+{organization?.phone}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between  gap-3 mt-4">
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h5 className="mb-3">Address:</h5>
            <p className="mt-5">
              {organization?.address}
            </p>
          </div>
          <div
            className="container  border rounded p-4"
            style={{ height: "150px", background: "white" }}
          >
            <h4 className="mb-3">Website</h4>
            <p className="mt-5">{organization?.website}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between  gap-3 mt-4">
          <div
            className="container  border rounded p-4"
            style={{ height: "185px", background: "white" }}
          >
            <h5 className="mb-3">Industry</h5>
            <p className="mt-5">
              {organization?.industry}
            </p>
          </div>
          <div
            className="container  border rounded p-4"
            style={{ height: "185px", background: "white" }}
          >
            <h4 className="mb-3">Information</h4>
            <p className="mt-2">{new Date(organization?.createdAt).toLocaleDateString()}</p>
            <p className="">{new Date(organization?.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
