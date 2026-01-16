
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WebsiteNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const EditAsset = () => {
  const { property_id } = useParams();
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [formData, setFormData] = useState({
    property_title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    area: "",
    builtup_area: "",
    property_value: "",
    agent_commission: "",
    company_commission: "",
    distribution_commission: "",
    total_property_value: "",
    owner_name: "",
    owner_contact: "",
    owner_email: "",
    facing: "",
    listing_days: "",
    amenities: [],
  });

  const [amenities, setAmenities] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH AMENITIES ================= */
  useEffect(() => {
    fetch(`${baseurl}/amenities/`)
      .then(res => res.json())
      .then(data => {
        setAmenities(Array.isArray(data.results) ? data.results : data);
      })
      .catch(() => setAmenities([]));
  }, []);

  /* ================= FETCH PROPERTY ================= */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${baseurl}/properties/${property_id}/`);
        const data = await res.json();

        setFormData({
          property_title: data.property_title || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          pin_code: data.pin_code || "",
          area: data.area || "",
          builtup_area: data.builtup_area || "",
          property_value: data.property_value || "",
          agent_commission: data.agent_commission || "",
          company_commission: data.company_commission || "",
          distribution_commission: data.distribution_commission || "",
          total_property_value: data.total_property_value || "",
          owner_name: data.owner_name || "",
          owner_contact: data.owner_contact || "",
          owner_email: data.owner_email || "",
          facing: data.facing || "",
          listing_days: data.listing_days || "",
          amenities: Array.isArray(data.amenities)
            ? data.amenities.map(a => a.amenity_id || a)
            : [],
        });

        setExistingImages(Array.isArray(data.images) ? data.images : []);
      } catch (err) {
        console.error("Failed to load property", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [property_id]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const propertyValue =
        name === "property_value" ? parseFloat(value || 0) : parseFloat(prev.property_value || 0);
      const agent =
        name === "agent_commission" ? parseFloat(value || 0) : parseFloat(prev.agent_commission || 0);
      const company =
        name === "company_commission" ? parseFloat(value || 0) : parseFloat(prev.company_commission || 0);

      return {
        ...prev,
        [name]: value,
        total_property_value: propertyValue + agent + company,
      };
    });
  };

  /* ================= AMENITY TOGGLE ================= */
  const toggleAmenity = (amenityId) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e) => {
    setNewImages([...e.target.files]);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "amenities") fd.append(key, value);
      });

      formData.amenities.forEach(a => fd.append("amenities", a));
      newImages.forEach(img => fd.append("images", img));

      const res = await fetch(`${baseurl}/properties/${property_id}/`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        Swal.fire("Success", "Property updated successfully", "success");
        navigate("/a-properties");
      } else {
        Swal.fire("Error", "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  /* ================= FIELD CONFIG (MATCHES OLD FORM) ================= */
  const fields = [
    "property_title",
    "city",
    "state",
    "country",
    "pin_code",
    "area",
    "builtup_area",
    "owner_name",
    "owner_contact",
    "owner_email",
    "address",
    "facing",
    "property_value",
    "agent_commission",
    "company_commission",
    "distribution_commission",
    "total_property_value",
    "description",
    "listing_days",
  ];

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" />
          <p className="mt-3">Loading property...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />

      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h4 className="mx-auto fw-bold">Edit Property</h4>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row g-3">

            {/* FORM FIELDS */}
            {fields.map((field) => (
              <div className="col-md-4" key={field}>
                <label className="form-label text-capitalize">
                  {field.replaceAll("_", " ")}
                </label>
                <input
                  className="form-control"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* AMENITIES */}
            <div className="col-12">
              <h6 className="fw-semibold mt-3">Amenities</h6>
              <div className="row">
                {amenities.map(a => (
                  <div className="col-md-3" key={a.amenity_id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={formData.amenities.includes(a.amenity_id)}
                        onChange={() => toggleAmenity(a.amenity_id)}
                      />
                      <label className="form-check-label">{a.name}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IMAGES */}
            <div className="col-12">
              <h6 className="fw-semibold mt-3">Property Images</h6>
              <input type="file" multiple className="form-control" onChange={handleImageUpload} />

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingImages.map((img, i) => (
                  <img
                    key={i}
                    src={`${baseurl}${img.image}`}
                    alt=""
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* SUBMIT */}
            <div className="col-12 text-center mt-4">
              <button
                type="button"
                className="btn btn-success px-5 py-2 fw-semibold"
                onClick={handleSubmit}
              >
                Update Property
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default EditAsset;
