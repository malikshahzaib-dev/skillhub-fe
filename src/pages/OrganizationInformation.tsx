import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";
import NavBar from "./NavbarComponent";
import { useAuth } from "../config/AuthProvider";

const OrganizationSchema = z.object({
  name: z.string().min(2, "Organization name is required"),
  description: z.string().min(10, "Description is required"),
  contactEmail: z.string().email("Invalid email"),
  website: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  industry: z.string().optional(),
  admin: z.string()
});

type OrganizationInput = z.infer<typeof OrganizationSchema>;

function CreateOrganization() {
  const {token} = useAuth()
    
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationInput>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
      description: "",
      contactEmail: "",
      website: "",
      phone: "",
      address: "",
      industry: "",
      admin:""
    },
  });


 

  const onSubmit = async (data: OrganizationInput) => {
    try {
      const res = await api.post("/organization", data,{
        headers: {
         Authorization: `Bearer ${token}`        }
      });
      console.log("Organization created successfully", res.data);
      navigate("/organization-dashboard"); 
    } catch (error: any) {
      console.log("Organization creation error", error);
    }
  };     

   

  return (
    <>
      
    <NavBar/>


      <div style={{ background: "#f9f9f5" }}>
        <div>
          <h1 className="text-center pt-5" style={{ fontSize: "40px", fontWeight: 700 }}>
            Create Organization
          </h1>
          <p className="text-center pt-3" style={{ fontSize: "20px" }}>
            Provide details about your organization
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Info */}
         <div className="d-flex justify-content-center pt-4">
  <div
    className="card shadow-lg rounded-4 p-5"
    style={{ width: "900px", backgroundColor: "#ffffff", minHeight: "380px" }}
  >
    {/* Header */}
    <div className="mb-4">
      <h3 className="fw-bold mb-1">
        <i className="bi bi-info-circle me-2"></i>Basic Information
      </h3>
      <small className="text-muted">Essential details about the organization</small>
    </div>

    {/* Form Inputs */}
    <div className="row g-4">
      <div className="col-md-6">
        <label className="form-label fw-semibold">Organization Name *</label>
        <input
          {...register("name")}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="e.g. TechCorp Inc."
        />
        {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Industry</label>
        <input
          {...register("industry")}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="e.g. Software, Healthcare"
        />
        {errors.industry && <p className="text-danger mt-1">{errors.industry.message}</p>}
      </div>

      <div className="col-12">
        <label className="form-label fw-semibold">Description *</label>
        <textarea
          {...register("description")}
          className="form-control rounded"
          style={{ height: "120px" }}
          placeholder="Brief description about the organization"
        />
        {errors.description && <p className="text-danger mt-1">{errors.description.message}</p>}
      </div>
    </div>
  </div>
</div>


          {/* Contact Info */}
         <div className="d-flex justify-content-center mt-5">
  <div
    className="card shadow-lg rounded-4 p-5"
    style={{ width: "900px", backgroundColor: "#ffffff", minHeight: "420px" }}
  >
    {/* Header */}
    <div className="mb-4">
      <h3 className="fw-bold mb-1">
        <i className="bi bi-telephone me-2"></i>Contact Information
      </h3>
      <small className="text-muted">
        How can people reach your organization?
      </small>
    </div>

    {/* Form */}
    <div className="row g-4">
      <div className="col-md-6">
        <label className="form-label fw-semibold">Contact Email *</label>
        <input
          {...register("contactEmail")}
          type="email"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="hr@company.com"
        />
        {errors.contactEmail && (
          <p className="text-danger mt-1">{errors.contactEmail.message}</p>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Phone</label>
        <input
          {...register("phone")}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="+92 300 1234567"
        />
        {errors.phone && (
          <p className="text-danger mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Website</label>
        <input
          {...register("website")}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="https://company.com"
        />
        {errors.website && (
          <p className="text-danger mt-1">{errors.website.message}</p>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">Address</label>
        <input
          {...register("address")}
          type="text"
          className="form-control"
          style={{ height: "50px" }}
          placeholder="123 Main St, New York"
        />
        {errors.address && (
          <p className="text-danger mt-1">{errors.address.message}</p>
        )}
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
              Create Organization
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateOrganization;
