import { useEffect, useState } from "react";
import api from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

export default function UpdateOrganization() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const {user} = useAuth()
  const { id } = useParams();
  console.log("organization", id);

  const fetchOrganization = async () => {
    try {
      const res = await api.get(`/organization/${id}`);
      console.log("fetch organization successfully", res.data);
      setName(res.data.name);
      setIndustry(res.data.industry);
      setDescription(res.data.description);
      setPhone(res.data.phone);
      setAddress(res.data.address);
      setWebsite(res.data.website);
      setContactEmail(res.data.contactEmail);
    } catch (err: any) {
      console.error("error to fetch organization");
    }
  };

  useEffect(() => {
    fetchOrganization()
    if(!user) navigate("/sign-in");
  }, [id]);

  const updateOrganization = async (e: any) => {
    e.preventDefault();
    try {
      const payLoad = {
        name,
        description,
        address,
        contactEmail,
        phone,
        industry,
        website,
      };
      const res = await api.patch(`/organization/${id}`, payLoad);
      console.log("organization updated successfully", res.data);
      fetchOrganization();
      navigate("/organization-dashboard");
    } catch (err: any) {
      console.error("error to update organization");
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ background: "#f9f9f5" }}>
        <div>
          <h1
            className="text-center text-info  pt-7"
            style={{ fontSize: "40px", fontWeight: 700 }}
          >
            Update Organization
          </h1>
          <p className="text-center pt-3" style={{ fontSize: "20px" }}>
            Provide details about your organization
          </p>
        </div>

        <form onSubmit={updateOrganization}>
          {/* Basic Info */}
          <div className="d-flex justify-content-center pt-5">
            <div
              className="card shadow-lg rounded-4 p-4"
              style={{
                width: "900px",
                backgroundColor: "#ffffff",
                minHeight: "450px",
              }}
            >
              {/* Card Header */}
              <div className="card-header bg-primary text-white rounded-3 mb-4">
                <h4 className="mb-1">
                  <i className="bi bi-building me-2"></i>Basic Information
                </h4>
                <small>Essential details about the organization</small>
              </div>

              {/* Form Inputs */}
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Organization Name *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="e.g. TechCorp Inc."
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Industry</label>
                  <input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="e.g. Software, Healthcare"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control rounded"
                    style={{ height: "120px" }}
                    placeholder="Brief description about the organization"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
         <div className="d-flex justify-content-center mt-5">
  <div
    className="card shadow-lg rounded-4 p-4"
    style={{ width: "900px", backgroundColor: "#ffffff", minHeight: "400px" }}
  >
    {/* Card Header */}
    <div className="card-header bg-info text-white rounded-3 mb-4">
      <h4 className="mb-1">
        <i className="bi bi-telephone me-2"></i>Contact Information
      </h4>
      <small>How can people reach your organization?</small>
    </div>

    {/* Form Inputs */}
    <div className="row g-4">
      <div className="col-md-6">
        <label className="form-label fw-semibold">Contact Email *</label>
        <input
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          type="email"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="hr@company.com"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="+92 300 1234567"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Website</label>
        <input
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="https://company.com"
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Address</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="123 Main St, New York"
        />
      </div>
    </div>
  </div>
</div>


          {/* Submit Button */}
          <div className="d-flex justify-content-center mt-5 p-3">
            <button
              className="rounded"
              style={{
                height: "50px",
                width: "240px",
                background: "#865cdd",
                color: "white",
              }}
            >
              Update Organization
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
