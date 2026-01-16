// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "./EditAsset.css";

// const EditAsset = () => {
//   const { state } = useLocation();
//   const { property } = state || {};
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     property_title: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     area: "",
//     builtup_area: "",
//     property_value: "",
//     agent_commission: "",
//     company_commission: "",
//     distribution_commission: "",
//     total_property_value: "",
//     owner_name: "",
//     owner_contact: "",
//     owner_email: "",
//     facing: "",
//     amenities: [],
//     agreement_video: null,
//     agreement_file: null,
//     listing_days: ""
//   });

//   const [amenities, setAmenities] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);

//   // ================= Fetch Amenities =================
//   useEffect(() => {
//     fetch(`${baseurl}/amenities/`)
//       .then(res => res.json())
//       .then(data => setAmenities(data || []))
//       .catch(err => console.error(err));
//   }, []);

//   // ================= Load Property =================
//   useEffect(() => {
//     if (property) {
//       setFormData({
//         ...property,
//         amenities: property.amenities?.map(a => a.amenity_id || a) || []
//       });
//       setExistingImages(property.images || []);
//     } else {
//       fetch(`${baseurl}/property/${id}/`)
//         .then(res => res.json())
//         .then(data => {
//           setFormData({
//             ...data,
//             amenities: data.amenities?.map(a => a.amenity_id || a) || []
//           });
//           setExistingImages(data.images || []);
//         });
//     }
//   }, [property, id]);

//   // ================= Change Handler =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => {
//       const propertyValue = parseFloat(prev.property_value) || 0;
//       const agent = parseFloat(prev.agent_commission) || 0;
//       const company = parseFloat(prev.company_commission) || 0;

//       return {
//         ...prev,
//         [name]: value,
//         total_property_value: propertyValue + agent + company
//       };
//     });
//   };

//   // ================= Amenity Toggle =================
//   const toggleAmenity = (id) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(id)
//         ? prev.amenities.filter(a => a !== id)
//         : [...prev.amenities, id]
//     }));
//   };

//   // ================= Image Upload =================
//   const handleImageUpload = (e) => {
//     setNewImages([...e.target.files]);
//   };

//   // ================= Submit =================
//   const handleSubmit = async () => {
//     try {
//       const fd = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key !== "amenities") fd.append(key, value);
//       });

//       formData.amenities.forEach(a => fd.append("amenities", a));
//       newImages.forEach(img => fd.append("images", img));

//       const res = await fetch(`${baseurl}/property/${id}/`, {
//         method: "PUT",
//         body: fd
//       });

//       if (res.ok) {
//         Swal.fire("Success", "Property updated successfully", "success");
//         navigate("/a-asset");
//       } else {
//         Swal.fire("Error", "Update failed", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   return (
//     <>
//       <WebsiteNavbar />
//       <div className="container py-4">
//         {/* Header */}
//         <div className="d-flex align-items-center mb-4">
//           <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//           <h4 className="mx-auto fw-bold">Edit Property</h4>
//         </div>

//         {/* Form */}
//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="row g-3">
//             {[
//               ["property_title", "Property Title"],
//               ["city", "City"],
//               ["state", "State"],
//               ["country", "Country"],
//               ["pin_code", "PIN Code"],
//               ["area", "Area"],
//               ["builtup_area", "Built-up Area"],
//               ["property_value", "Property Value"],
//               ["agent_commission", "Team Payout"],
//               ["company_commission", "Company Payout"],
//               ["distribution_commission", "Distribution Payout"],
//               ["total_property_value", "Total Property Value"],
//               ["owner_name", "Owner Name"],
//               ["owner_contact", "Owner Contact"],
//               ["owner_email", "Owner Email"],
//               ["listing_days", "Listing Days"]
//             ].map(([name, label]) => (
//               <div className="col-md-4" key={name}>
//                 <label className="form-label">{label}</label>
//                 <input
//                   className="form-control"
//                   name={name}
//                   value={formData[name] || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}

//             {/* Description */}
//             <div className="col-12">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 rows="3"
//                 name="description"
//                 value={formData.description || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Amenities */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Amenities</h6>
//               <div className="row">
//                 {amenities.map(a => (
//                   <div className="col-md-3" key={a.amenity_id}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={formData.amenities.includes(a.amenity_id)}
//                         onChange={() => toggleAmenity(a.amenity_id)}
//                       />
//                       <label className="form-check-label">{a.name}</label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Images */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Property Images</h6>
//               <input type="file" multiple className="form-control" onChange={handleImageUpload} />
//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingImages.map(img => (
//                   <img
//                     key={img.id}
//                     src={`${baseurl}${img.image}`}
//                     alt=""
//                     className="edit-thumb"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="col-12 text-center mt-4">
//               <button
//                 className="btn btn-success px-5 py-2 fw-semibold"
//                 onClick={handleSubmit}
//               >
//                 Update Property
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditAsset;




// import React, { useEffect, useState } from "react";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EditAsset = () => {
//   const { state } = useLocation();
//   const propertyFromState = state?.property;
//   const { id } = useParams();
//   const navigate = useNavigate();

//   /* ================= STATES ================= */
//   const [formData, setFormData] = useState({
//     property_title: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     area: "",
//     builtup_area: "",
//     property_value: "",
//     agent_commission: "",
//     company_commission: "",
//     distribution_commission: "",
//     total_property_value: "",
//     owner_name: "",
//     owner_contact: "",
//     owner_email: "",
//     facing: "",
//     amenities: [],
//     listing_days: ""
//   });

//   const [amenities, setAmenities] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH AMENITIES (FIXED) ================= */
//   useEffect(() => {
//     fetch(`${baseurl}/amenities/`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) {
//           setAmenities(data);
//         } else if (Array.isArray(data.results)) {
//           setAmenities(data.results); // DRF pagination
//         } else {
//           setAmenities([]);
//         }
//       })
//       .catch(err => {
//         console.error("Amenities error:", err);
//         setAmenities([]);
//       });
//   }, []);

//   /* ================= FETCH PROPERTY ================= */
//   useEffect(() => {
//     const loadProperty = async () => {
//       try {
//         let data = propertyFromState;

//         if (!data) {
//           const res = await fetch(`${baseurl}/property/${id}/`);
//           data = await res.json();
//         }

//         setFormData({
//           ...data,
//           amenities: Array.isArray(data.amenities)
//             ? data.amenities.map(a => a.amenity_id || a)
//             : []
//         });

//         setExistingImages(Array.isArray(data.images) ? data.images : []);
//       } catch (err) {
//         console.error("Property load error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProperty();
//   }, [propertyFromState, id]);

//   /* ================= INPUT CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => {
//       const propertyValue = parseFloat(prev.property_value) || 0;
//       const agent = parseFloat(prev.agent_commission) || 0;
//       const company = parseFloat(prev.company_commission) || 0;

//       return {
//         ...prev,
//         [name]: value,
//         total_property_value: propertyValue + agent + company
//       };
//     });
//   };

//   /* ================= AMENITY TOGGLE ================= */
//   const toggleAmenity = (amenityId) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenityId)
//         ? prev.amenities.filter(id => id !== amenityId)
//         : [...prev.amenities, amenityId]
//     }));
//   };

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     setNewImages(Array.from(e.target.files));
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       const fd = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key !== "amenities") fd.append(key, value);
//       });

//       formData.amenities.forEach(a => fd.append("amenities", a));
//       newImages.forEach(img => fd.append("images", img));

//       const res = await fetch(`${baseurl}/property/${id}/`, {
//         method: "PUT",
//         body: fd
//       });

//       if (res.ok) {
//         Swal.fire("Success", "Property updated successfully", "success");
//         navigate("/a-asset");
//       } else {
//         Swal.fire("Error", "Update failed", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="container py-5 text-center">
//           <div className="spinner-border text-primary" />
//           <p className="mt-3">Loading property...</p>
//         </div>
//       </>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <>
//       <WebsiteNavbar />
//       <div className="container py-4">
//         {/* Header */}
//         <div className="d-flex align-items-center mb-4">
//           <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//           <h4 className="mx-auto fw-bold">Edit Property</h4>
//         </div>

//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="row g-3">

//             {[
//               ["property_title", "Property Title"],
//               ["city", "City"],
//               ["state", "State"],
//               ["country", "Country"],
//               ["pin_code", "PIN Code"],
//               ["area", "Area"],
//               ["builtup_area", "Built-up Area"],
//               ["property_value", "Property Value"],
//               ["agent_commission", "Team Payout"],
//               ["company_commission", "Company Payout"],
//               ["distribution_commission", "Distribution Payout"],
//               ["total_property_value", "Total Property Value"],
//               ["owner_name", "Owner Name"],
//               ["owner_contact", "Owner Contact"],
//               ["owner_email", "Owner Email"],
//               ["listing_days", "Listing Days"]
//             ].map(([name, label]) => (
//               <div className="col-md-4" key={name}>
//                 <label className="form-label">{label}</label>
//                 <input
//                   className="form-control"
//                   name={name}
//                   value={formData[name] || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}

//             {/* Description */}
//             <div className="col-12">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 rows="3"
//                 name="description"
//                 value={formData.description || ""}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Amenities */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Amenities</h6>
//               <div className="row">
//                 {Array.isArray(amenities) && amenities.length > 0 ? (
//                   amenities.map(a => (
//                     <div className="col-md-3" key={a.amenity_id}>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           checked={formData.amenities.includes(a.amenity_id)}
//                           onChange={() => toggleAmenity(a.amenity_id)}
//                         />
//                         <label className="form-check-label">{a.name}</label>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-muted">No amenities found</p>
//                 )}
//               </div>
//             </div>

//             {/* Images */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Property Images</h6>
//               <input type="file" multiple className="form-control" onChange={handleImageUpload} />
//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {Array.isArray(existingImages) &&
//                   existingImages.map((img, index) => (
//                     <img
//                       key={img.id || index}
//                       src={`${baseurl}${img.image}`}
//                       alt=""
//                       style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }}
//                     />
//                   ))}
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="col-12 text-center mt-4">
//               <button
//                 className="btn btn-success px-5 py-2 fw-semibold"
//                 onClick={handleSubmit}
//               >
//                 Update Property
//               </button>
//             </div>

//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditAsset;






// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EditAsset = () => {
//   const { property_id } = useParams(); // ✅ FIXED
//   const navigate = useNavigate();

//   /* ================= STATES ================= */
//   const [formData, setFormData] = useState({
//     property_title: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     area: "",
//     builtup_area: "",
//     property_value: "",
//     agent_commission: "",
//     company_commission: "",
//     distribution_commission: "",
//     total_property_value: "",
//     owner_name: "",
//     owner_contact: "",
//     owner_email: "",
//     facing: "",
//     amenities: [],
//     listing_days: ""
//   });

//   const [amenities, setAmenities] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH AMENITIES ================= */
//   useEffect(() => {
//     fetch(`${baseurl}/amenities/`)
//       .then(res => res.json())
//       .then(data => {
//         setAmenities(Array.isArray(data.results) ? data.results : data);
//       })
//       .catch(() => setAmenities([]));
//   }, []);

//   /* ================= FETCH PROPERTY BY ID ================= */
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await fetch(`${baseurl}/properties/${property_id}/`); // ✅ FIXED
//         const data = await res.json();

//         setFormData({
//           ...data,
//           amenities: Array.isArray(data.amenities)
//             ? data.amenities.map(a => a.amenity_id || a)
//             : []
//         });

//         setExistingImages(Array.isArray(data.images) ? data.images : []);
//       } catch (err) {
//         console.error("Failed to load property", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [property_id]);

//   /* ================= INPUT CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => {
//       const propertyValue = parseFloat(prev.property_value) || 0;
//       const agent = parseFloat(prev.agent_commission) || 0;
//       const company = parseFloat(prev.company_commission) || 0;

//       return {
//         ...prev,
//         [name]: value,
//         total_property_value: propertyValue + agent + company
//       };
//     });
//   };

//   /* ================= AMENITY TOGGLE ================= */
//   const toggleAmenity = (amenityId) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenityId)
//         ? prev.amenities.filter(id => id !== amenityId)
//         : [...prev.amenities, amenityId]
//     }));
//   };

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     setNewImages([...e.target.files]);
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       const fd = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key !== "amenities") fd.append(key, value);
//       });

//       formData.amenities.forEach(a => fd.append("amenities", a));
//       newImages.forEach(img => fd.append("images", img));

//       const res = await fetch(`${baseurl}/properties/${property_id}/`, {
//         method: "PUT",
//         body: fd
//       });

//       if (res.ok) {
//         Swal.fire("Success", "Property updated successfully", "success");
//         navigate("/a-asset");
//       } else {
//         Swal.fire("Error", "Update failed", "error");
//       }
//     } catch {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="container py-5 text-center">
//           <div className="spinner-border text-primary" />
//           <p className="mt-3">Loading property...</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />
//       <div className="container py-4">
//         <div className="d-flex align-items-center mb-4">
//           <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//           <h4 className="mx-auto fw-bold">Edit Property</h4>
//         </div>

//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="row g-3">
//             {Object.entries(formData).map(([key]) =>
//               key !== "amenities" ? (
//                 <div className="col-md-4" key={key}>
//                   <label className="form-label text-capitalize">{key.replaceAll("_", " ")}</label>
//                   <input
//                     className="form-control"
//                     name={key}
//                     value={formData[key] || ""}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ) : null
//             )}

//             {/* Amenities */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Amenities</h6>
//               <div className="row">
//                 {amenities.map(a => (
//                   <div className="col-md-3" key={a.amenity_id}>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={formData.amenities.includes(a.amenity_id)}
//                         onChange={() => toggleAmenity(a.amenity_id)}
//                       />
//                       <label className="form-check-label">{a.name}</label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Images */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Property Images</h6>
//               <input type="file" multiple className="form-control" onChange={handleImageUpload} />
//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingImages.map((img, i) => (
//                   <img
//                     key={i}
//                     src={`${baseurl}${img.image}`}
//                     alt=""
//                     style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="col-12 text-center mt-4">
//               <button className="btn btn-success px-5 py-2 fw-semibold" onClick={handleSubmit}>
//                 Update Property
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditAsset;





//=======================================================================


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const PropertyEditForm = () => {
//   const { property_id } = useParams();
//   const navigate = useNavigate();

//   /* ================= STATES ================= */
//   const [formData, setFormData] = useState({
//     property_title: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin_code: "",
//     area: "",
//     builtup_area: "",
//     property_value: "",
//     agent_commission: "",
//     company_commission: "",
//     distribution_commission: "",
//     total_property_value: "",
//     owner_name: "",
//     owner_contact: "",
//     owner_email: "",
//     facing: "",
//     listing_days: "",
//     amenities: [],
//   });

//   const [amenities, setAmenities] = useState([]);
//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH AMENITIES ================= */
//   useEffect(() => {
//     fetch(`${baseurl}/amenities/`)
//       .then(res => res.json())
//       .then(data => {
//         setAmenities(Array.isArray(data.results) ? data.results : data);
//       })
//       .catch(() => setAmenities([]));
//   }, []);

//   /* ================= FETCH PROPERTY ================= */
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const res = await fetch(`${baseurl}/properties/${property_id}/`);
//         const data = await res.json();

//         setFormData({
//           property_title: data.property_title || "",
//           description: data.description || "",
//           address: data.address || "",
//           city: data.city || "",
//           state: data.state || "",
//           country: data.country || "",
//           pin_code: data.pin_code || "",
//           area: data.area || "",
//           builtup_area: data.builtup_area || "",
//           property_value: data.property_value || "",
//           agent_commission: data.agent_commission || "",
//           company_commission: data.company_commission || "",
//           distribution_commission: data.distribution_commission || "",
//           total_property_value: data.total_property_value || "",
//           owner_name: data.owner_name || "",
//           owner_contact: data.owner_contact || "",
//           owner_email: data.owner_email || "",
//           facing: data.facing || "",
//           listing_days: data.listing_days || "",
//           amenities: Array.isArray(data.amenities)
//             ? data.amenities.map(a => a.amenity_id || a)
//             : [],
//         });

//         setExistingImages(Array.isArray(data.images) ? data.images : []);
//       } catch (err) {
//         console.error("Failed to load property", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [property_id]);

//   /* ================= INPUT CHANGE ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => {
//       const propertyValue =
//         name === "property_value" ? parseFloat(value || 0) : parseFloat(prev.property_value || 0);
//       const agent =
//         name === "agent_commission" ? parseFloat(value || 0) : parseFloat(prev.agent_commission || 0);
//       const company =
//         name === "company_commission" ? parseFloat(value || 0) : parseFloat(prev.company_commission || 0);

//       return {
//         ...prev,
//         [name]: value,
//         total_property_value: propertyValue + agent + company,
//       };
//     });
//   };

//   /* ================= AMENITY TOGGLE ================= */
//   const toggleAmenity = (amenityId) => {
//     setFormData(prev => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenityId)
//         ? prev.amenities.filter(id => id !== amenityId)
//         : [...prev.amenities, amenityId],
//     }));
//   };

//   /* ================= IMAGE UPLOAD ================= */
//   const handleImageUpload = (e) => {
//     setNewImages([...e.target.files]);
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async () => {
//     try {
//       const fd = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key !== "amenities") fd.append(key, value);
//       });

//       formData.amenities.forEach(a => fd.append("amenities", a));
//       newImages.forEach(img => fd.append("images", img));

//       const res = await fetch(`${baseurl}/properties/${property_id}/`, {
//         method: "PUT",
//         body: fd,
//       });

//       if (res.ok) {
//         Swal.fire("Success", "Property updated successfully", "success");
//         navigate("/admin-properties");
//       } else {
//         Swal.fire("Error", "Update failed", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   /* ================= FIELD CONFIG (MATCHES OLD FORM) ================= */
//   const fields = [
//     "property_title",
//     "city",
//     "state",
//     "country",
//     "pin_code",
//     "area",
//     "builtup_area",
//     "owner_name",
//     "owner_contact",
//     "owner_email",
//     "address",
//     "facing",
//     "property_value",
//     "agent_commission",
//     "company_commission",
//     "distribution_commission",
//     "total_property_value",
//     "description",
//     "listing_days",
//   ];

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="container py-5 text-center">
//           <div className="spinner-border text-primary" />
//           <p className="mt-3">Loading property...</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="container py-4">
//         <div className="d-flex align-items-center mb-4">
//           <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//           <h4 className="mx-auto fw-bold">Edit Property</h4>
//         </div>

//         <form onSubmit={(e) => e.preventDefault()}>
//           <div className="row g-3">

//             {/* FORM FIELDS */}
//             {fields.map((field) => (
//               <div className="col-md-4" key={field}>
//                 <label className="form-label text-capitalize">
//                   {field.replaceAll("_", " ")}
//                 </label>
//                 <input
//                   className="form-control"
//                   name={field}
//                   value={formData[field] || ""}
//                   onChange={handleChange}
//                 />
//               </div>
//             ))}

//             {/* AMENITIES */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Amenities</h6>
//               <div className="row">
//                 {amenities.map(a => (
//                   <div className="col-md-3" key={a.amenity_id}>
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={formData.amenities.includes(a.amenity_id)}
//                         onChange={() => toggleAmenity(a.amenity_id)}
//                       />
//                       <label className="form-check-label">{a.name}</label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* IMAGES */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Property Images</h6>
//               <input type="file" multiple className="form-control" onChange={handleImageUpload} />

//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingImages.map((img, i) => (
//                   <img
//                     key={i}
//                     src={`${baseurl}${img.image}`}
//                     alt=""
//                     style={{
//                       width: 80,
//                       height: 80,
//                       objectFit: "cover",
//                       borderRadius: 6,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* SUBMIT */}
//             <div className="col-12 text-center mt-4">
//               <button
//                 type="button"
//                 className="btn btn-success px-5 py-2 fw-semibold"
//                 onClick={handleSubmit}
//               >
//                 Update Property
//               </button>
//             </div>

//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default PropertyEditForm;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const PropertyEditForm = () => {
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
  const [existingVideos, setExistingVideos] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [existingAgreementVideo, setExistingAgreementVideo] = useState("");
  const [existingAgreementFile, setExistingAgreementFile] = useState("");
  
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newAgreementVideo, setNewAgreementVideo] = useState(null);
  const [newAgreementFile, setNewAgreementFile] = useState(null);
  
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
        setExistingVideos(Array.isArray(data.videos) ? data.videos : []);
        setExistingFiles(Array.isArray(data.files) ? data.files : []);
        setExistingAgreementVideo(data.agreement_video || "");
        setExistingAgreementFile(data.agreement_file || "");
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

  /* ================= FILE UPLOAD HANDLERS ================= */
  const handleImageUpload = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleVideoUpload = (e) => {
    setNewVideos([...e.target.files]);
  };

  const handleFileUpload = (e) => {
    setNewFiles([...e.target.files]);
  };

  const handleAgreementVideoUpload = (e) => {
    if (e.target.files[0]) {
      setNewAgreementVideo(e.target.files[0]);
    }
  };

  const handleAgreementFileUpload = (e) => {
    if (e.target.files[0]) {
      setNewAgreementFile(e.target.files[0]);
    }
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
      newVideos.forEach(video => fd.append("videos", video));
      newFiles.forEach(file => fd.append("files", file));
      
      if (newAgreementVideo) {
        fd.append("agreement_video", newAgreementVideo);
      }
      
      if (newAgreementFile) {
        fd.append("agreement_file", newAgreementFile);
      }

      const res = await fetch(`${baseurl}/properties/${property_id}/`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        Swal.fire("Success", "Property updated successfully", "success");
        navigate("/admin-properties");
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
              <input type="file" multiple className="form-control" onChange={handleImageUpload} accept="image/*" />

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

            {/* VIDEOS */}
            <div className="col-12">
              <h6 className="fw-semibold mt-3">Property Videos</h6>
              <input type="file" multiple className="form-control" onChange={handleVideoUpload} accept="video/*" />

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingVideos.map((video, i) => (
                  <div key={i} className="card p-2">
                    <small className="text-muted">Video {i + 1}</small>
                    <a 
                      href={`${baseurl}${video.video}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      View Video
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* FILES */}
            <div className="col-12">
              <h6 className="fw-semibold mt-3">Property Files</h6>
              <input type="file" multiple className="form-control" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.xls,.xlsx" />

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingFiles.map((file, i) => (
                  <div key={i} className="card p-2">
                    <small className="text-muted">File {i + 1}</small>
                    <a 
                      href={`${baseurl}${file.file}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      View/Download File
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* AGREEMENT VIDEO */}
            <div className="col-12">
              <h6 className="fw-semibold mt-3">Agreement Video</h6>
              <input type="file" className="form-control" onChange={handleAgreementVideoUpload} accept="video/*" />

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingAgreementVideo && (
                  <div className="card p-2">
                    <a 
                      href={`${baseurl}${existingAgreementVideo}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      View Agreement Video
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* AGREEMENT FILE */}
            <div className="col-12">
              <h6 className="fw-semibold mt-3">Agreement File</h6>
              <input type="file" className="form-control" onChange={handleAgreementFileUpload} accept=".pdf,.doc,.docx" />

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingAgreementFile && (
                  <div className="card p-2">
                    <a 
                      href={`${baseurl}${existingAgreementFile}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      View/Download Agreement File
                    </a>
                  </div>
                )}
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

export default PropertyEditForm;