import { useEffect, useState } from "react";
import api from "../config/api";
import { useParams } from "react-router-dom";
import NavBar from "./NavbarComponent";

export default function OrganizationDetail() {
  const [organization, setOrganization] = useState<any>([]);
  // const navigate = useNavigate()
  // const {user} = useAuth()
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
    fetchOrganization()
  //  if(!user) navigate("/sign-in");
  }, [id]);

  
  return (
    <>
<NavBar/>

    <div className="container mt-5">
  <div
    className="card border-0 shadow-lg rounded-4 p-5"
    style={{ background: "linear-gradient(180deg, #ffffff, #f8f9fa)" }}
  >
    {/* Header */}
    <div className="mb-5">
      <h2 className="fw-bold mb-1 text-dark">TechCorp Solutions</h2>
      <p className="text-secondary mb-0">
        Organization Details & Information
      </p>
      <hr className="mt-3" />
    </div>

    {/* About */}
    <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
      <h5 className="fw-semibold mb-2 text-primary">About Organization</h5>
      <p className="text-muted mb-0 lh-lg">
        {organization?.description}
      </p>
    </div>

    {/* Contact Info */}
    <div className="row g-4 mb-5">
      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100 hover-shadow">
          <h6 className="fw-semibold text-dark mb-2">📧 Email</h6>
          <p className="text-muted mb-0">
            {organization?.contactEmail}
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 className="fw-semibold text-dark mb-2">📞 Phone</h6>
          <p className="text-muted mb-0">
            +{organization?.phone}
          </p>
        </div>
      </div>
    </div>

    {/* Address & Website */}
    <div className="row g-4 mb-5">
      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 className="fw-semibold text-dark mb-2">📍 Address</h6>
          <p className="text-muted mb-0">
            {organization?.address}
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 className="fw-semibold text-dark mb-2">🌐 Website</h6>
          <p className="text-muted mb-0">
            {organization?.website}
          </p>
        </div>
      </div>
    </div>

    {/* Industry & Dates */}
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 className="fw-semibold text-dark mb-2">🏢 Industry</h6>
          <p className="text-muted mb-0">
            {organization?.industry}
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 className="fw-semibold text-dark mb-2">ℹ️ Information</h6>
          <p className="text-muted mb-1">
            Created: {new Date(organization?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-muted mb-0">
            Updated: {new Date(organization?.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

