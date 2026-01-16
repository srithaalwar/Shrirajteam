import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WebsiteNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar"; 
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const EditMyProperty = () => { // Changed component name for clarity
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
    looking_to: "", // Added missing field
    number_of_bedrooms: "", // Added missing field
    rent_amount: "", // Added missing field
    deposit_amount: "", // Added missing field
  });

  const [amenities, setAmenities] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          looking_to: data.looking_to || "",
          number_of_bedrooms: data.number_of_bedrooms || "",
          rent_amount: data.rent_amount || "",
          deposit_amount: data.deposit_amount || "",
          amenities: Array.isArray(data.amenities)
            ? data.amenities.map(a => a.amenity_id || a)
            : [],
        });

        setExistingImages(Array.isArray(data.images) ? data.images : []);
      } catch (err) {
        console.error("Failed to load property", err);
        Swal.fire("Error", "Failed to load property details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [property_id]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle checkboxes
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === "property_value" || name === "agent_commission" || name === "company_commission") {
      // Handle commission calculations
      const propertyValue = name === "property_value" ? parseFloat(value || 0) : parseFloat(formData.property_value || 0);
      const agentCommission = name === "agent_commission" ? parseFloat(value || 0) : parseFloat(formData.agent_commission || 0);
      const companyCommission = name === "company_commission" ? parseFloat(value || 0) : parseFloat(formData.company_commission || 0);
      const distributionCommission = parseFloat(formData.distribution_commission || 0);
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        total_property_value: propertyValue + agentCommission + companyCommission + distributionCommission,
      }));
    } else if (name === "distribution_commission") {
      // Handle distribution commission separately
      const distributionCommission = parseFloat(value || 0);
      const propertyValue = parseFloat(formData.property_value || 0);
      const agentCommission = parseFloat(formData.agent_commission || 0);
      const companyCommission = parseFloat(formData.company_commission || 0);
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        total_property_value: propertyValue + agentCommission + companyCommission + distributionCommission,
      }));
    } else {
      // Handle all other fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  /* ================= SELECT CHANGE ================= */
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  /* ================= REMOVE EXISTING IMAGE ================= */
  const removeExistingImage = async (imageId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This image will be removed from the property!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it!'
      });

      if (result.isConfirmed) {
        const response = await fetch(`${baseurl}/property-images/${imageId}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setExistingImages(prev => prev.filter(img => img.id !== imageId));
          Swal.fire('Removed!', 'Image has been removed.', 'success');
        } else {
          Swal.fire('Error!', 'Failed to remove image.', 'error');
        }
      }
    } catch (error) {
      console.error('Error removing image:', error);
      Swal.fire('Error!', 'Failed to remove image.', 'error');
    }
  };

  /* ================= REMOVE NEW IMAGE ================= */
  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.property_title || !formData.city || !formData.address) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new FormData();

      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "amenities" && key !== "images") {
          if (value !== null && value !== undefined) {
            fd.append(key, value);
          }
        }
      });

      // Append amenities
      formData.amenities.forEach(a => fd.append("amenities", a));
      
      // Append new images
      newImages.forEach(img => fd.append("images", img));

      const res = await fetch(`${baseurl}/properties/${property_id}/`, {
        method: "PUT",
        body: fd,
      });

      const responseData = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: "Property updated successfully",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          navigate("/agent-my-properties"); // Navigate back to my properties list
        });
      } else {
        console.error("Update failed:", responseData);
        Swal.fire("Error", `Update failed: ${JSON.stringify(responseData)}`, "error");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Any unsaved changes will be lost!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel!',
      cancelButtonText: 'No, keep editing'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/agent-my-properties");
      }
    });
  };

  /* ================= FIELD CONFIG ================= */
  const basicFields = [
    { name: "property_title", label: "Property Title", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "address", label: "Address", required: true },
    { name: "city", label: "City", required: true },
    { name: "state", label: "State" },
    { name: "country", label: "Country" },
    { name: "pin_code", label: "PIN Code" },
  ];

  const propertyDetails = [
    { name: "area", label: "Area (sq ft)" },
    { name: "builtup_area", label: "Built-up Area (sq ft)" },
    { name: "number_of_bedrooms", label: "Bedrooms", type: "select", options: ["", "1", "2", "3", "4", "5+"] },
    { name: "facing", label: "Facing", type: "select", options: ["", "North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"] },
    { name: "listing_days", label: "Listing Days" },
  ];

  const transactionFields = [
    { name: "looking_to", label: "Looking To", type: "select", options: ["", "sell", "rent"], required: true },
    { name: "property_value", label: "Property Value (₹)" },
    { name: "rent_amount", label: "Rent Amount (₹/month)" },
    { name: "deposit_amount", label: "Deposit Amount (₹)" },
    { name: "agent_commission", label: "Agent Commission (₹)" },
    { name: "company_commission", label: "Company Commission (₹)" },
    { name: "distribution_commission", label: "Distribution Commission (₹)" },
    { name: "total_property_value", label: "Total Property Value (₹)", readOnly: true },
  ];

  const ownerDetails = [
    { name: "owner_name", label: "Owner Name" },
    { name: "owner_contact", label: "Owner Contact" },
    { name: "owner_email", label: "Owner Email" },
  ];

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading property details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <WebsiteNavbar />

      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <button 
            className="btn btn-outline-secondary me-3" 
            onClick={() => navigate("/agent-my-properties")}
          >
            ← Back to My Properties
          </button>
          <h4 className="mx-auto fw-bold">Edit My Property</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            
            {/* BASIC INFORMATION */}
            <div className="col-12">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Basic Information</h5>
            </div>
            {basicFields.map((field) => (
              <div className="col-md-4" key={field.name}>
                <label className="form-label fw-semibold">
                  {field.label} {field.required && <span className="text-danger">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    rows="3"
                  />
                ) : (
                  <input
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            {/* PROPERTY DETAILS */}
            <div className="col-12 mt-4">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Property Details</h5>
            </div>
            {propertyDetails.map((field) => (
              <div className="col-md-4" key={field.name}>
                <label className="form-label fw-semibold">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleSelectChange}
                  >
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option === "" ? `Select ${field.label}` : option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}

            {/* TRANSACTION DETAILS */}
            <div className="col-12 mt-4">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Transaction Details</h5>
            </div>
            {transactionFields.map((field) => (
              <div className="col-md-4" key={field.name}>
                <label className="form-label fw-semibold">
                  {field.label} {field.required && <span className="text-danger">*</span>}
                </label>
                {field.type === "select" ? (
                  <select
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleSelectChange}
                    required={field.required}
                  >
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option === "" ? `Select ${field.label}` : option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    readOnly={field.readOnly}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            {/* OWNER DETAILS */}
            <div className="col-12 mt-4">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Owner Details</h5>
            </div>
            {ownerDetails.map((field) => (
              <div className="col-md-4" key={field.name}>
                <label className="form-label fw-semibold">{field.label}</label>
                <input
                  className="form-control"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* AMENITIES */}
            <div className="col-12 mt-4">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Amenities</h5>
              <div className="row">
                {amenities.length > 0 ? (
                  amenities.map(a => (
                    <div className="col-md-3 mb-2" key={a.amenity_id}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`amenity-${a.amenity_id}`}
                          checked={formData.amenities.includes(a.amenity_id)}
                          onChange={() => toggleAmenity(a.amenity_id)}
                        />
                        <label className="form-check-label" htmlFor={`amenity-${a.amenity_id}`}>
                          {a.name}
                        </label>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-muted">No amenities available</p>
                  </div>
                )}
              </div>
            </div>

            {/* IMAGES */}
            <div className="col-12 mt-4">
              <h5 className="fw-bold border-bottom pb-2 mb-3">Property Images</h5>
              
              <div className="mb-3">
                <label className="form-label fw-semibold">Add New Images</label>
                <input 
                  type="file" 
                  multiple 
                  className="form-control" 
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <small className="text-muted">You can select multiple images</small>
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-semibold">Existing Images</h6>
                  <div className="d-flex gap-2 mt-2 flex-wrap">
                    {existingImages.map((img, i) => (
                      <div key={i} className="position-relative">
                        <img
                          src={img.image.startsWith('http') ? img.image : `${baseurl}${img.image}`}
                          alt={`Property ${i + 1}`}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                          className="border"
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{ transform: 'translate(30%, -30%)' }}
                          onClick={() => removeExistingImage(img.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images Preview */}
              {newImages.length > 0 && (
                <div className="mb-4">
                  <h6 className="fw-semibold">New Images to Upload</h6>
                  <div className="d-flex gap-2 mt-2 flex-wrap">
                    {newImages.map((img, i) => (
                      <div key={i} className="position-relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`New ${i + 1}`}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 6,
                          }}
                          className="border"
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{ transform: 'translate(30%, -30%)' }}
                          onClick={() => removeNewImage(i)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="col-12 text-center mt-5">
              <button
                type="button"
                className="btn btn-outline-danger px-4 py-2 fw-semibold me-3"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success px-5 py-2 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  'Update Property'
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default EditMyProperty;