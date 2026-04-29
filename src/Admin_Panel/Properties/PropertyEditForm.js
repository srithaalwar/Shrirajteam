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



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AdminPropertyEditForm = () => {
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
//   const [existingVideos, setExistingVideos] = useState([]);
//   const [existingFiles, setExistingFiles] = useState([]);
//   const [existingAgreementVideo, setExistingAgreementVideo] = useState("");
//   const [existingAgreementFile, setExistingAgreementFile] = useState("");
  
//   const [newImages, setNewImages] = useState([]);
//   const [newVideos, setNewVideos] = useState([]);
//   const [newFiles, setNewFiles] = useState([]);
//   const [newAgreementVideo, setNewAgreementVideo] = useState(null);
//   const [newAgreementFile, setNewAgreementFile] = useState(null);
  
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
//         setExistingVideos(Array.isArray(data.videos) ? data.videos : []);
//         setExistingFiles(Array.isArray(data.files) ? data.files : []);
//         setExistingAgreementVideo(data.agreement_video || "");
//         setExistingAgreementFile(data.agreement_file || "");
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

//   /* ================= FILE UPLOAD HANDLERS ================= */
//   const handleImageUpload = (e) => {
//     setNewImages([...e.target.files]);
//   };

//   const handleVideoUpload = (e) => {
//     setNewVideos([...e.target.files]);
//   };

//   const handleFileUpload = (e) => {
//     setNewFiles([...e.target.files]);
//   };

//   const handleAgreementVideoUpload = (e) => {
//     if (e.target.files[0]) {
//       setNewAgreementVideo(e.target.files[0]);
//     }
//   };

//   const handleAgreementFileUpload = (e) => {
//     if (e.target.files[0]) {
//       setNewAgreementFile(e.target.files[0]);
//     }
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
//       newVideos.forEach(video => fd.append("videos", video));
//       newFiles.forEach(file => fd.append("files", file));
      
//       if (newAgreementVideo) {
//         fd.append("agreement_video", newAgreementVideo);
//       }
      
//       if (newAgreementFile) {
//         fd.append("agreement_file", newAgreementFile);
//       }

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
//               <input type="file" multiple className="form-control" onChange={handleImageUpload} accept="image/*" />

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

//             {/* VIDEOS */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Property Videos</h6>
//               <input type="file" multiple className="form-control" onChange={handleVideoUpload} accept="video/*" />

//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingVideos.map((video, i) => (
//                   <div key={i} className="card p-2">
//                     <small className="text-muted">Video {i + 1}</small>
//                     <a 
//                       href={`${baseurl}${video.video}`} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-primary"
//                     >
//                       View Video
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* FILES */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Property Files</h6>
//               <input type="file" multiple className="form-control" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.xls,.xlsx" />

//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingFiles.map((file, i) => (
//                   <div key={i} className="card p-2">
//                     <small className="text-muted">File {i + 1}</small>
//                     <a 
//                       href={`${baseurl}${file.file}`} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-primary"
//                     >
//                       View/Download File
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* AGREEMENT VIDEO */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Agreement Video</h6>
//               <input type="file" className="form-control" onChange={handleAgreementVideoUpload} accept="video/*" />

//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingAgreementVideo && (
//                   <div className="card p-2">
//                     <a 
//                       href={`${baseurl}${existingAgreementVideo}`} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-primary"
//                     >
//                       View Agreement Video
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* AGREEMENT FILE */}
//             <div className="col-12">
//               <h6 className="fw-semibold mt-3">Agreement File</h6>
//               <input type="file" className="form-control" onChange={handleAgreementFileUpload} accept=".pdf,.doc,.docx" />

//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingAgreementFile && (
//                   <div className="card p-2">
//                     <a 
//                       href={`${baseurl}${existingAgreementFile}`} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-primary"
//                     >
//                       View/Download Agreement File
//                     </a>
//                   </div>
//                 )}
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

// export default AdminPropertyEditForm;

//================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPropertyEditForm = () => {
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
    location_advantages: "", // Added
    other_features: "", // Added
    length_ft: "", // Added
    breadth_ft: "", // Added
    number_of_bedrooms: "", // Added
    number_of_balconies: "", // Added
    number_of_bathrooms: "", // Added
    floor: "", // Added
    furnishing_status: "", // Added
    number_of_floors: "", // Added
    number_of_open_sides: "", // Added
    number_of_roads: "", // Added
    road_width_1_ft: "", // Added
    road_width_2_ft: "", // Added
    area_unit: "", // Added
    price_per_unit: "", // Added
    ownership_type: "", // Added
    property_uniqueness: "", // Added
    is_featured: false, // Added
    preferred_tenants: "", // Added
    rent_amount: "", // Added
    deposit_amount: "", // Added
    available_from: "", // Added
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
  const [lookingTo, setLookingTo] = useState("sell"); // Added for rent/sell toggle

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

        // Determine if property is for rent or sell
        if (data.rent_amount && parseFloat(data.rent_amount) > 0) {
          setLookingTo("rent");
        } else {
          setLookingTo("sell");
        }

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
          location_advantages: data.location_advantages || "",
          // other_features: data.other_features || "",
          length_ft: data.length_ft || "",
          breadth_ft: data.breadth_ft || "",
          number_of_bedrooms: data.number_of_bedrooms || "",
          number_of_balconies: data.number_of_balconies || "",
          number_of_bathrooms: data.number_of_bathrooms || "",
          floor: data.floor || "",
          furnishing_status: data.furnishing_status || "",
          number_of_floors: data.number_of_floors || "",
          number_of_open_sides: data.number_of_open_sides || "",
          number_of_roads: data.number_of_roads || "",
          road_width_1_ft: data.road_width_1_ft || "",
          road_width_2_ft: data.road_width_2_ft || "",
          area_unit: data.area_unit || "",
          price_per_unit: data.price_per_unit || "",
          ownership_type: data.ownership_type || "",
          property_uniqueness: data.property_uniqueness || "",
          is_featured: data.is_featured || false,
          preferred_tenants: data.preferred_tenants || "",
          rent_amount: data.rent_amount || "",
          deposit_amount: data.deposit_amount || "",
          available_from: data.available_from || "",
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
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      const propertyValue =
        name === "property_value" ? parseFloat(newValue || 0) : parseFloat(prev.property_value || 0);
      const agent =
        name === "agent_commission" ? parseFloat(newValue || 0) : parseFloat(prev.agent_commission || 0);
      const company =
        name === "company_commission" ? parseFloat(newValue || 0) : parseFloat(prev.company_commission || 0);

      // Calculate total based on lookingTo
      let total = propertyValue + agent + company;
      
      // For rent properties, total might be different
      if (lookingTo === "rent") {
        total = parseFloat(prev.rent_amount || 0);
      }

      return {
        ...prev,
        [name]: newValue,
        total_property_value: total,
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
        if (key !== "amenities" && value !== null && value !== undefined && value !== "") {
          fd.append(key, value);
        }
      });

      // Add looking_to field
      fd.append("looking_to", lookingTo);

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
        const errorData = await res.json();
        console.error("Update error:", errorData);
        Swal.fire("Error", "Update failed: " + JSON.stringify(errorData), "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

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

            {/* Looking To (Sell/Rent) */}
            <div className="col-md-4">
              <label className="form-label">Looking To *</label>
              <select
                className="form-select"
                value={lookingTo}
                onChange={(e) => setLookingTo(e.target.value)}
              >
                <option value="sell">Sell</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            {/* Basic Information Section */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Basic Information</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Property Title</label>
                  <input
                    className="form-control"
                    name="property_title"
                    value={formData.property_title || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    className="form-control"
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input
                    className="form-control"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Country</label>
                  <input
                    className="form-control"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Pin Code</label>
                  <input
                    className="form-control"
                    name="pin_code"
                    value={formData.pin_code || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Facing</label>
                  <input
                    className="form-control"
                    name="facing"
                    value={formData.facing || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Area Details Section */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Area Details</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Area Unit</label>
                  <select
                    className="form-select"
                    name="area_unit"
                    value={formData.area_unit || "sq.ft."}
                    onChange={handleChange}
                  >
                    <option value="sq.ft.">Square Feet</option>
                    <option value="sq.m.">Square Meters</option>
                    <option value="sq.yd.">Square Yards</option>
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                    <option value="cents">Cents</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Area</label>
                  <input
                    className="form-control"
                    name="area"
                    type="number"
                    step="0.01"
                    value={formData.area || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Built-up Area</label>
                  <input
                    className="form-control"
                    name="builtup_area"
                    type="number"
                    step="0.01"
                    value={formData.builtup_area || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Length (ft)</label>
                  <input
                    className="form-control"
                    name="length_ft"
                    type="number"
                    step="0.01"
                    value={formData.length_ft || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Breadth (ft)</label>
                  <input
                    className="form-control"
                    name="breadth_ft"
                    type="number"
                    step="0.01"
                    value={formData.breadth_ft || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Price Per Unit</label>
                  <input
                    className="form-control"
                    name="price_per_unit"
                    type="number"
                    step="0.01"
                    value={formData.price_per_unit || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Room Details Section */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Room Details</h5>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Bedrooms</label>
                  <input
                    className="form-control"
                    name="number_of_bedrooms"
                    type="number"
                    value={formData.number_of_bedrooms || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Bathrooms</label>
                  <input
                    className="form-control"
                    name="number_of_bathrooms"
                    type="number"
                    value={formData.number_of_bathrooms || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Balconies</label>
                  <input
                    className="form-control"
                    name="number_of_balconies"
                    type="number"
                    value={formData.number_of_balconies || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Floor Number</label>
                  <input
                    className="form-control"
                    name="floor"
                    type="number"
                    value={formData.floor || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Total Floors</label>
                  <input
                    className="form-control"
                    name="number_of_floors"
                    type="number"
                    value={formData.number_of_floors || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Furnishing Status</label>
                  <select
                    className="form-select"
                    name="furnishing_status"
                    value={formData.furnishing_status || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully-Furnished">Fully-Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Road & Open Sides Section */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Road & Open Sides</h5>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Open Sides</label>
                  <input
                    className="form-control"
                    name="number_of_open_sides"
                    type="number"
                    min="0"
                    max="4"
                    value={formData.number_of_open_sides || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Number of Roads</label>
                  <input
                    className="form-control"
                    name="number_of_roads"
                    type="number"
                    min="0"
                    max="2"
                    value={formData.number_of_roads || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Road 1 Width (ft)</label>
                  <input
                    className="form-control"
                    name="road_width_1_ft"
                    type="number"
                    step="0.01"
                    value={formData.road_width_1_ft || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Road 2 Width (ft)</label>
                  <input
                    className="form-control"
                    name="road_width_2_ft"
                    type="number"
                    step="0.01"
                    value={formData.road_width_2_ft || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section - Conditional based on lookingTo */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">
                {lookingTo === 'sell' ? 'Pricing Details' : 'Rental Details'}
              </h5>
              <div className="row g-3">
                {lookingTo === 'sell' ? (
                  <>
                    <div className="col-md-3">
                      <label className="form-label">Property Value</label>
                      <input
                        className="form-control"
                        name="property_value"
                        type="number"
                        step="0.01"
                        value={formData.property_value || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Agent Commission</label>
                      <input
                        className="form-control"
                        name="agent_commission"
                        type="number"
                        step="0.01"
                        value={formData.agent_commission || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Company Commission</label>
                      <input
                        className="form-control"
                        name="company_commission"
                        type="number"
                        step="0.01"
                        value={formData.company_commission || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Distribution Commission</label>
                      <input
                        className="form-control"
                        name="distribution_commission"
                        type="number"
                        step="0.01"
                        value={formData.distribution_commission || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Total Property Value</label>
                      <input
                        className="form-control"
                        name="total_property_value"
                        type="number"
                        step="0.01"
                        value={formData.total_property_value || ""}
                        readOnly
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-4">
                      <label className="form-label">Preferred Tenants</label>
                      <input
                        className="form-control"
                        name="preferred_tenants"
                        value={formData.preferred_tenants || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Rent Amount</label>
                      <input
                        className="form-control"
                        name="rent_amount"
                        type="number"
                        step="0.01"
                        value={formData.rent_amount || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Deposit Amount</label>
                      <input
                        className="form-control"
                        name="deposit_amount"
                        type="number"
                        step="0.01"
                        value={formData.deposit_amount || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Available From</label>
                      <input
                        className="form-control"
                        name="available_from"
                        type="date"
                        value={formData.available_from || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Owner Details Section */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Owner Details</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Owner Name</label>
                  <input
                    className="form-control"
                    name="owner_name"
                    value={formData.owner_name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Owner Contact</label>
                  <input
                    className="form-control"
                    name="owner_contact"
                    value={formData.owner_contact || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Owner Email</label>
                  <input
                    className="form-control"
                    name="owner_email"
                    type="email"
                    value={formData.owner_email || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Additional Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location Advantages</label>
                  <textarea
                    className="form-control"
                    name="location_advantages"
                    value={formData.location_advantages || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                {/* <div className="col-md-6">
                  <label className="form-label">Other Features</label>
                  <textarea
                    className="form-control"
                    name="other_features"
                    value={formData.other_features || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </div> */}
                <div className="col-md-6">
                  <label className="form-label">Property Uniqueness</label>
                  <textarea
                    className="form-control"
                    name="property_uniqueness"
                    value={formData.property_uniqueness || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Listing Days</label>
                  <input
                    className="form-control"
                    name="listing_days"
                    type="number"
                    value={formData.listing_days || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Ownership Type</label>
                  <select
                    className="form-select"
                    name="ownership_type"
                    value={formData.ownership_type || "Freehold"}
                    onChange={handleChange}
                  >
                    <option value="Freehold">Freehold</option>
                    <option value="Leasehold">Leasehold</option>
                    <option value="Cooperative">Cooperative</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <div className="form-check mt-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_featured"
                      name="is_featured"
                      checked={formData.is_featured || false}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="is_featured">
                      Featured Property
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* AMENITIES */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Amenities</h5>
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
              {amenities.length === 0 && (
                <p className="text-muted">No amenities available</p>
              )}
            </div>

            {/* IMAGES */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Property Images</h5>
              <input type="file" multiple className="form-control" onChange={handleImageUpload} accept="image/*" />

              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingImages.map((img, i) => (
                  <img
                    key={i}
                    src={`${baseurl}${img.image}`}
                    alt={`Property ${i + 1}`}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* VIDEOS */}
            <div className="col-12">
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Property Videos</h5>
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
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Property Files</h5>
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
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Agreement Video</h5>
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
              <h5 className="fw-semibold mt-3 mb-3 text-primary">Agreement File</h5>
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

export default AdminPropertyEditForm;