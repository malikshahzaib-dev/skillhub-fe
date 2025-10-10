import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import api from "../config/api";

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
    const token = localStorage.getItem("token")
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
          <div className="d-flex justify-content-center pt-3">
            <div
              className="rounded p-5"
              style={{ width: "900px", background: "#ffffff" }}
            >
              <h1 className="fs-8">Basic Information</h1>
              <p className="mt-2" style={{ fontSize: "20px" }}>
                Essential details about the organization
              </p>

              <div className="d-flex gap-4 mt-4" style={{ width: "100%" }}>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Organization Name *</label>
                  <input
                    {...register("name")}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="e.g. TechCorp Inc."
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Industry</label>
                  <input
                    {...register("industry")}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="e.g. Software, Healthcare"
                  />
                  {errors.industry && <p className="text-danger">{errors.industry.message}</p>}
                </div>
              </div>

              <label className="form-label mt-4 fw-semibold">Description *</label>
              <textarea
                {...register("description")}
                className="form-control rounded"
                style={{ height: "120px" }}
                placeholder="Brief description about the organization"
              />
              {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>
          </div>

          {/* Contact Info */}
          <div className="d-flex justify-content-center mt-5 rounded">
            <div
              className="p-4 rounded"
              style={{ width: "900px", background: "#ffffff" }}
            >
              <h1 className="fs-8">Contact Information</h1>
              <p style={{ fontSize: "20px" }}>
                How can people reach your organization?
              </p>

              <div className="d-flex gap-4 mt-4" style={{ width: "100%" }}>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Contact Email *</label>
                  <input
                    {...register("contactEmail")}
                    type="email"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="hr@company.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-danger">{errors.contactEmail.message}</p>
                  )}
                </div>

                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    {...register("phone")}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="+92 300 1234567"
                  />
                  {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="d-flex gap-4 mt-4" style={{ width: "100%" }}>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Website</label>
                  <input
                    {...register("website")}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="https://company.com"
                  />
                  {errors.website && <p className="text-danger">{errors.website.message}</p>}
                </div>
                <div style={{ width: "50%" }}>
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    {...register("address")}
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    placeholder="123 Main St, New York"
                  />
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
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
