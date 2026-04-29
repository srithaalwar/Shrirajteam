// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
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
//         navigate("/agent-my-properties");
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
//             {/* <div className="col-12">
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
//             </div> */}

//             {/* AGREEMENT FILE */}
//             {/* <div className="col-12">
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
//             </div> */}

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


//==================================================



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AgentPropertyEditForm = () => {
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
//     location_advantages: "", // Added
//     other_features: "", // Added
//     length_ft: "", // Added
//     breadth_ft: "", // Added
//     number_of_bedrooms: "", // Added
//     number_of_balconies: "", // Added
//     number_of_bathrooms: "", // Added
//     floor: "", // Added
//     furnishing_status: "", // Added
//     number_of_floors: "", // Added
//     number_of_open_sides: "", // Added
//     number_of_roads: "", // Added
//     road_width_1_ft: "", // Added
//     road_width_2_ft: "", // Added
//     area_unit: "", // Added
//     price_per_unit: "", // Added
//     ownership_type: "", // Added
//     property_uniqueness: "", // Added
//     is_featured: false, // Added
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
//           location_advantages: data.location_advantages || "",
//           other_features: data.other_features || "",
//           length_ft: data.length_ft || "",
//           breadth_ft: data.breadth_ft || "",
//           number_of_bedrooms: data.number_of_bedrooms || "",
//           number_of_balconies: data.number_of_balconies || "",
//           number_of_bathrooms: data.number_of_bathrooms || "",
//           floor: data.floor || "",
//           furnishing_status: data.furnishing_status || "",
//           number_of_floors: data.number_of_floors || "",
//           number_of_open_sides: data.number_of_open_sides || "",
//           number_of_roads: data.number_of_roads || "",
//           road_width_1_ft: data.road_width_1_ft || "",
//           road_width_2_ft: data.road_width_2_ft || "",
//           area_unit: data.area_unit || "",
//           price_per_unit: data.price_per_unit || "",
//           ownership_type: data.ownership_type || "",
//           property_uniqueness: data.property_uniqueness || "",
//           is_featured: data.is_featured || false,
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
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;

//     setFormData(prev => {
//       const propertyValue =
//         name === "property_value" ? parseFloat(newValue || 0) : parseFloat(prev.property_value || 0);
//       const agent =
//         name === "agent_commission" ? parseFloat(newValue || 0) : parseFloat(prev.agent_commission || 0);

//       return {
//         ...prev,
//         [name]: newValue,
//         total_property_value: propertyValue + agent,
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
//         if (key !== "amenities") {
//           if (value !== null && value !== undefined && value !== "") {
//             fd.append(key, value);
//           }
//         }
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
//         navigate("/agent-my-properties");
//       } else {
//         const errorData = await res.json();
//         console.error("Update error:", errorData);
//         Swal.fire("Error", "Update failed: " + JSON.stringify(errorData), "error");
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   /* ================= FIELD CONFIG ================= */
//   const basicFields = [
//     "property_title",
//     "city",
//     "state",
//     "country",
//     "pin_code",
//     "address",
//     "facing",
//   ];

//   const areaFields = [
//     "area_unit",
//     "area",
//     "builtup_area",
//     "length_ft",
//     "breadth_ft",
//     "price_per_unit",
//   ];

//   const roomFields = [
//     "number_of_bedrooms",
//     "number_of_bathrooms",
//     "number_of_balconies",
//     "floor",
//     "number_of_floors",
//     "furnishing_status",
//   ];

//   const roadFields = [
//     "number_of_open_sides",
//     "number_of_roads",
//     "road_width_1_ft",
//     "road_width_2_ft",
//   ];

//   const pricingFields = [
//     "property_value",
//     "agent_commission",
//     "total_property_value",
//   ];

//   const ownerFields = [
//     "owner_name",
//     "owner_contact",
//     "owner_email",
//   ];

//   const additionalFields = [
//     "description",
//     "location_advantages",
//     "other_features",
//     "property_uniqueness",
//     "listing_days",
//     "ownership_type",
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

//             {/* Basic Information Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Basic Information</h5>
//               <div className="row g-3">
//                 {basicFields.map((field) => (
//                   <div className="col-md-4" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     <input
//                       className="form-control"
//                       name={field}
//                       value={formData[field] || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Area Details Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Area Details</h5>
//               <div className="row g-3">
//                 {areaFields.map((field) => (
//                   <div className="col-md-4" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     <input
//                       className="form-control"
//                       name={field}
//                       value={formData[field] || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Room Details Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Room Details</h5>
//               <div className="row g-3">
//                 {roomFields.map((field) => (
//                   <div className="col-md-4" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     <input
//                       className="form-control"
//                       name={field}
//                       value={formData[field] || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Road & Open Sides Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Road & Open Sides</h5>
//               <div className="row g-3">
//                 {roadFields.map((field) => (
//                   <div className="col-md-4" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     <input
//                       className="form-control"
//                       name={field}
//                       value={formData[field] || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Pricing Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Pricing Details</h5>
//               <div className="row g-3">
//                 {pricingFields.map((field) => (
//                   <div className="col-md-4" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     <input
//                       className="form-control"
//                       name={field}
//                       value={formData[field] || ""}
//                       onChange={handleChange}
//                       readOnly={field === "total_property_value"}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Owner Details Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Owner Details</h5>
//               <div className="row g-3">
//                 {ownerFields.map((field) => (
//                   <div className="col-md-4" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     <input
//                       className="form-control"
//                       name={field}
//                       value={formData[field] || ""}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Additional Information Section */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Additional Information</h5>
//               <div className="row g-3">
//                 {additionalFields.map((field) => (
//                   <div className="col-md-6" key={field}>
//                     <label className="form-label text-capitalize">
//                       {field.replaceAll("_", " ")}
//                     </label>
//                     {field === "description" || field === "location_advantages" || field === "other_features" ? (
//                       <textarea
//                         className="form-control"
//                         name={field}
//                         value={formData[field] || ""}
//                         onChange={handleChange}
//                         rows={3}
//                       />
//                     ) : (
//                       <input
//                         className="form-control"
//                         name={field}
//                         value={formData[field] || ""}
//                         onChange={handleChange}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Is Featured Checkbox */}
//             <div className="col-12">
//               <div className="form-check mt-3">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="is_featured"
//                   name="is_featured"
//                   checked={formData.is_featured || false}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="is_featured">
//                   Featured Property
//                 </label>
//               </div>
//             </div>

//             {/* AMENITIES */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Amenities</h5>
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
//               {amenities.length === 0 && (
//                 <p className="text-muted">No amenities available</p>
//               )}
//             </div>

//             {/* IMAGES */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Property Images</h5>
//               <input type="file" multiple className="form-control" onChange={handleImageUpload} accept="image/*" />

//               <div className="d-flex gap-2 mt-2 flex-wrap">
//                 {existingImages.map((img, i) => (
//                   <img
//                     key={i}
//                     src={`${baseurl}${img.image}`}
//                     alt={`Property ${i + 1}`}
//                     style={{
//                       width: 100,
//                       height: 100,
//                       objectFit: "cover",
//                       borderRadius: 6,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* VIDEOS */}
//             <div className="col-12">
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Property Videos</h5>
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
//               <h5 className="fw-semibold mt-3 mb-3 text-primary">Property Files</h5>
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

// export default AgentPropertyEditForm;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { Country, State, City } from "country-state-city";
import "bootstrap/dist/css/bootstrap.min.css";

const AgentPropertyEditForm = () => {
  const { property_id } = useParams();
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [formData, setFormData] = useState({
    looking_to: "sell",
    property_title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "IN",
    pin_code: "",
    latitude: "",
    longitude: "",
    area: "",
    price_per_unit: "",
    area_unit: "sq.ft.",
    length_ft: "",
    breadth_ft: "",
    number_of_floors: 1,
    number_of_bedrooms: "",
    number_of_balconies: "",
    floor: "",
    furnishing_status: "",
    number_of_open_sides: 0,
    builtup_area: "",
    number_of_roads: 0,
    road_width_1_ft: null,
    road_width_2_ft: null,
    facing: "east",
    ownership_type: "Freehold",
    property_value: "",
    maintenance: "",
    amenities: [],
    property_uniqueness: "",
    location_advantages: "",
    other_features: "",
    owner_name: "",
    owner_contact: "",
    owner_email: "",
    is_featured: false,
    user_id: "",
    added_by: "",
    agent_commission: "",
    total_property_value: "",
    preferred_tenants: "",
    rent_amount: "",
    deposit_amount: "",
    available_from: "",
    number_of_bathrooms: "",
  });

  const [amenities, setAmenities] = useState([]);
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  
  // Media files states
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [existingLayout, setExistingLayout] = useState("");
  const [existingAgreementVideo, setExistingAgreementVideo] = useState("");
  const [existingAgreementFile, setExistingAgreementFile] = useState("");
  
  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [newLayout, setNewLayout] = useState(null);
  const [newAgreementVideo, setNewAgreementVideo] = useState(null);
  const [newAgreementFile, setNewAgreementFile] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [showResidentialFields, setShowResidentialFields] = useState(false);
  const [showBuiltupArea, setShowBuiltupArea] = useState(true);
  
  // Location states
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  /* ================= FETCH COUNTRIES ================= */
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  /* ================= FETCH AMENITIES ================= */
  useEffect(() => {
    fetch(`${baseurl}/amenities/`)
      .then(res => res.json())
      .then(data => {
        const amenitiesData = data.results || data;
        setAmenities(Array.isArray(amenitiesData) ? amenitiesData : []);
      })
      .catch(() => setAmenities([]));
  }, []);

  /* ================= FETCH PROPERTY CATEGORIES ================= */
  useEffect(() => {
    fetch(`${baseurl}/property-categories/`)
      .then(res => res.json())
      .then(data => {
        const categoriesData = data.results || data;
        setPropertyCategories(Array.isArray(categoriesData) ? categoriesData : []);
      })
      .catch(() => setPropertyCategories([]));
  }, []);

  /* ================= FETCH PROPERTY TYPES BASED ON CATEGORY ================= */
  useEffect(() => {
    if (selectedCategory) {
      fetch(`${baseurl}/property-types/category-id/${selectedCategory}/`)
        .then(res => res.json())
        .then(data => {
          const typesData = data.results || data;
          setPropertyTypes(Array.isArray(typesData) ? typesData : []);
        })
        .catch(() => setPropertyTypes([]));
    } else {
      setPropertyTypes([]);
    }
  }, [selectedCategory]);

  /* ================= UPDATE STATES WHEN COUNTRY CHANGES ================= */
  useEffect(() => {
    if (formData.country) {
      const statesOfCountry = State.getStatesOfCountry(formData.country);
      setStates(statesOfCountry);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.country]);

  /* ================= UPDATE CITIES WHEN STATE CHANGES ================= */
  useEffect(() => {
    if (formData.country && formData.state) {
      const citiesOfState = City.getCitiesOfState(formData.country, formData.state);
      setCities(citiesOfState);
    } else {
      setCities([]);
    }
  }, [formData.country, formData.state]);

  /* ================= CHECK RESIDENTIAL FIELDS ================= */
  useEffect(() => {
    if (!selectedPropertyType || !Array.isArray(propertyTypes)) return;

    const selectedType = propertyTypes.find(
      (type) => Number(type.property_type_id) === Number(selectedPropertyType)
    );

    if (!selectedType) return;

    const typeName = selectedType.name.toLowerCase();
    const residentialTypes = ["flat", "house", "apartment", "villa"];
    const isResidential = residentialTypes.some(type => typeName.includes(type));

    setShowResidentialFields(isResidential);
    setShowBuiltupArea(!typeName.includes("plot"));
  }, [selectedPropertyType, propertyTypes]);

  /* ================= CALCULATE TOTAL PROPERTY VALUE ================= */
  useEffect(() => {
    if (formData.looking_to === "sell") {
      const price = parseFloat(formData.property_value) || 0;
      const commission = parseFloat(formData.agent_commission) || 0;
      setFormData(prev => ({
        ...prev,
        total_property_value: price + commission
      }));
    }
  }, [formData.property_value, formData.agent_commission, formData.looking_to]);

  /* ================= CALCULATE PRICE FROM AREA AND PRICE PER UNIT ================= */
  useEffect(() => {
    const pricePerUnit = parseFloat(formData.price_per_unit) || 0;
    const area = parseFloat(formData.area) || 0;
    const calculatedPrice = pricePerUnit * area;
    if (calculatedPrice > 0 && calculatedPrice !== parseFloat(formData.property_value)) {
      setFormData(prev => ({
        ...prev,
        property_value: calculatedPrice.toString()
      }));
    }
  }, [formData.price_per_unit, formData.area]);

  /* ================= FETCH PROPERTY ================= */
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${baseurl}/property/${property_id}/`);
        const data = await res.json();

        // Find category and property type names/ids
        let categoryId = "";
        let propertyTypeId = "";
        
        if (data.category) {
          categoryId = data.category;
          setSelectedCategory(data.category);
        }
        
        if (data.property_type) {
          propertyTypeId = data.property_type;
          setSelectedPropertyType(data.property_type);
        }

        setFormData({
          looking_to: data.looking_to || "sell",
          property_title: data.property_title || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "IN",
          pin_code: data.pin_code || "",
          latitude: data.latitude || "",
          longitude: data.longitude || "",
          area: data.area || "",
          price_per_unit: data.price_per_unit || "",
          area_unit: data.area_unit || "sq.ft.",
          length_ft: data.length_ft || "",
          breadth_ft: data.breadth_ft || "",
          number_of_floors: data.number_of_floors || 1,
          number_of_bedrooms: data.number_of_bedrooms || "",
          number_of_balconies: data.number_of_balconies || "",
          floor: data.floor || "",
          furnishing_status: data.furnishing_status || "",
          number_of_open_sides: data.number_of_open_sides || 0,
          builtup_area: data.builtup_area || "",
          number_of_roads: data.number_of_roads || 0,
          road_width_1_ft: data.road_width_1_ft || null,
          road_width_2_ft: data.road_width_2_ft || null,
          facing: data.facing || "east",
          ownership_type: data.ownership_type || "Freehold",
          property_value: data.property_value || "",
          maintenance: data.maintenance || "",
          amenities: Array.isArray(data.amenities)
            ? data.amenities.map(a => parseInt(a.amenity_id || a))
            : [],
          property_uniqueness: data.property_uniqueness || "",
          location_advantages: data.location_advantages || "",
          other_features: data.other_features || "",
          owner_name: data.owner_name || "",
          owner_contact: data.owner_contact || "",
          owner_email: data.owner_email || "",
          is_featured: data.is_featured || false,
          user_id: data.user_id || "",
          added_by: data.added_by || "",
          agent_commission: data.agent_commission || "",
          total_property_value: data.total_property_value || "",
          preferred_tenants: data.preferred_tenants || "",
          rent_amount: data.rent_amount || "",
          deposit_amount: data.deposit_amount || "",
          available_from: data.available_from || "",
          number_of_bathrooms: data.number_of_bathrooms || "",
        });

        setExistingImages(Array.isArray(data.images) ? data.images : []);
        setExistingVideos(Array.isArray(data.videos) ? data.videos : []);
        setExistingFiles(Array.isArray(data.files) ? data.files : []);
        setExistingLayout(data.layout || "");
        setExistingAgreementVideo(data.agreement_video || "");
        setExistingAgreementFile(data.agreement_file || "");
        
      } catch (err) {
        console.error("Failed to load property", err);
        Swal.fire("Error", "Failed to load property data", "error");
      } finally {
        setLoading(false);
      }
    };

    if (property_id) {
      fetchProperty();
    }
  }, [property_id]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  /* ================= CATEGORY CHANGE ================= */
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setFormData(prev => ({
      ...prev,
      category: categoryId,
      property_type: ""
    }));
    setSelectedPropertyType("");
  };

  /* ================= PROPERTY TYPE CHANGE ================= */
  const handlePropertyTypeChange = (e) => {
    const typeId = e.target.value;
    setSelectedPropertyType(typeId);
    setFormData(prev => ({
      ...prev,
      property_type: typeId
    }));
  };

  /* ================= COUNTRY CHANGE ================= */
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData(prev => ({
      ...prev,
      country: selectedCountry,
      state: "",
      city: ""
    }));
  };

  /* ================= STATE CHANGE ================= */
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData(prev => ({
      ...prev,
      state: selectedState,
      city: ""
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

  const handleLayoutUpload = (e) => {
    if (e.target.files[0]) {
      setNewLayout(e.target.files[0]);
    }
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

  /* ================= REMOVE EXISTING FILE ================= */
  const removeExistingImage = async (imageId) => {
    // You can implement delete API call here
    setExistingImages(prev => prev.filter((_, i) => i !== imageId));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      // Add all form fields
      const fieldMappings = {
        looking_to: formData.looking_to,
        property_title: formData.property_title,
        description: formData.description,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pin_code: formData.pin_code,
        latitude: formData.latitude,
        longitude: formData.longitude,
        area: formData.area,
        price_per_unit: formData.price_per_unit,
        area_unit: formData.area_unit,
        length_ft: formData.length_ft,
        breadth_ft: formData.breadth_ft,
        number_of_floors: formData.number_of_floors,
        number_of_bedrooms: formData.number_of_bedrooms,
        number_of_balconies: formData.number_of_balconies,
        floor: formData.floor,
        furnishing_status: formData.furnishing_status,
        number_of_open_sides: formData.number_of_open_sides,
        builtup_area: formData.builtup_area,
        number_of_roads: formData.number_of_roads,
        road_width_1_ft: formData.road_width_1_ft,
        road_width_2_ft: formData.road_width_2_ft,
        facing: formData.facing,
        ownership_type: formData.ownership_type,
        property_value: formData.property_value,
        maintenance: formData.maintenance,
        property_uniqueness: formData.property_uniqueness,
        location_advantages: formData.location_advantages,
        other_features: formData.other_features,
        owner_name: formData.owner_name,
        owner_contact: formData.owner_contact,
        owner_email: formData.owner_email,
        is_featured: formData.is_featured,
        agent_commission: formData.agent_commission,
        total_property_value: formData.total_property_value,
        preferred_tenants: formData.preferred_tenants,
        rent_amount: formData.rent_amount,
        deposit_amount: formData.deposit_amount,
        available_from: formData.available_from,
        number_of_bathrooms: formData.number_of_bathrooms,
        category: selectedCategory,
        property_type: selectedPropertyType,
      };

      Object.entries(fieldMappings).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          fd.append(key, value);
        }
      });

      // Add amenities
      formData.amenities.forEach(a => fd.append("amenities", a));

      // Add new files
      newImages.forEach(img => fd.append("images", img));
      newVideos.forEach(video => fd.append("videos", video));
      newFiles.forEach(file => fd.append("files", file));
      
      if (newLayout) {
        fd.append("layout", newLayout);
      }
      
      if (newAgreementVideo) {
        fd.append("agreement_video", newAgreementVideo);
      }
      
      if (newAgreementFile) {
        fd.append("agreement_file", newAgreementFile);
      }

      const res = await fetch(`${baseurl}/property/${property_id}/`, {
        method: "PUT",
        body: fd,
      });

      if (res.ok) {
        Swal.fire("Success", "Property updated successfully", "success");
        navigate("/agent-my-properties");
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
          <div className="row g-4">

            {/* Looking To & Category Section */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Property Type Information</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Looking To *</label>
                  <select
                    className="form-select"
                    name="looking_to"
                    value={formData.looking_to}
                    onChange={handleChange}
                  >
                    <option value="sell">Sell</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Property Category *</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select Category</option>
                    {propertyCategories.map(cat => (
                      <option key={cat.property_category_id} value={cat.property_category_id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Property Type *</label>
                  <select
                    className="form-select"
                    value={selectedPropertyType}
                    onChange={handlePropertyTypeChange}
                    disabled={!selectedCategory}
                  >
                    <option value="">Select Property Type</option>
                    {propertyTypes.map(type => (
                      <option key={type.property_type_id} value={type.property_type_id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Property Title *</label>
                  <input
                    className="form-control"
                    name="property_title"
                    value={formData.property_title || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Location Details Section */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Location Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Country *</label>
                  <select
                    className="form-select"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">State *</label>
                  <select
                    className="form-select"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    disabled={!formData.country}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">City *</label>
                  <select
                    className="form-select"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Pin Code</label>
                  <input
                    className="form-control"
                    name="pin_code"
                    value={formData.pin_code || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Full Address *</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Area & Pricing Section */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Area & Pricing</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Area Unit *</label>
                  <select
                    className="form-select"
                    name="area_unit"
                    value={formData.area_unit}
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
                  <label className="form-label">Area *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="area"
                    value={formData.area || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Price Per Unit *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="price_per_unit"
                    value={formData.price_per_unit || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Length (ft)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="length_ft"
                    value={formData.length_ft || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Breadth (ft)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="breadth_ft"
                    value={formData.breadth_ft || ""}
                    onChange={handleChange}
                  />
                </div>
                {showBuiltupArea && (
                  <div className="col-md-4">
                    <label className="form-label">Built-up Area</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="builtup_area"
                      value={formData.builtup_area || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Residential Fields (conditionally shown) */}
            {showResidentialFields && (
              <div className="col-12">
                <h5 className="fw-semibold mb-3 text-primary">Room Details</h5>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">Bedrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_bedrooms"
                      value={formData.number_of_bedrooms || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Bathrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_bathrooms"
                      value={formData.number_of_bathrooms || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Balconies</label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_balconies"
                      value={formData.number_of_balconies || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Total Floors</label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_floors"
                      value={formData.number_of_floors || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Floor Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="floor"
                      value={formData.floor || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Furnishing Status</label>
                    <select
                      className="form-select"
                      name="furnishing_status"
                      value={formData.furnishing_status}
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
            )}

            {/* Facing & Open Sides Section */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Property Features</h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Facing Direction</label>
                  <select
                    className="form-select"
                    name="facing"
                    value={formData.facing}
                    onChange={handleChange}
                  >
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="north_east">North-East</option>
                    <option value="north_west">North-West</option>
                    <option value="south_east">South-East</option>
                    <option value="south_west">South-West</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Number of Open Sides</label>
                  <input
                    type="number"
                    className="form-control"
                    name="number_of_open_sides"
                    value={formData.number_of_open_sides || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Number of Roads</label>
                  <input
                    type="number"
                    className="form-control"
                    name="number_of_roads"
                    value={formData.number_of_roads || ""}
                    onChange={handleChange}
                  />
                </div>
                {formData.number_of_roads >= 1 && (
                  <div className="col-md-6">
                    <label className="form-label">Road 1 Width (ft)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="road_width_1_ft"
                      value={formData.road_width_1_ft || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {formData.number_of_roads >= 2 && (
                  <div className="col-md-6">
                    <label className="form-label">Road 2 Width (ft)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="road_width_2_ft"
                      value={formData.road_width_2_ft || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Details (based on looking_to) */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">
                {formData.looking_to === "sell" ? "Sell Pricing Details" : "Rent Pricing Details"}
              </h5>
              <div className="row g-3">
                {formData.looking_to === "sell" ? (
                  <>
                    <div className="col-md-4">
                      <label className="form-label">Property Value</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="property_value"
                        value={formData.property_value || ""}
                        readOnly
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Team Payout</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="agent_commission"
                        value={formData.agent_commission || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Total Property Value</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="total_property_value"
                        value={formData.total_property_value || ""}
                        readOnly
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-4">
                      <label className="form-label">Rent Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="rent_amount"
                        value={formData.rent_amount || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Deposit Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="deposit_amount"
                        value={formData.deposit_amount || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Available From</label>
                      <input
                        type="date"
                        className="form-control"
                        name="available_from"
                        value={formData.available_from || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Preferred Tenants</label>
                      <input
                        className="form-control"
                        name="preferred_tenants"
                        value={formData.preferred_tenants || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Owner Details */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Owner Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Owner Name</label>
                  <input
                    className="form-control"
                    name="owner_name"
                    value={formData.owner_name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Owner Phone Number</label>
                  <input
                    className="form-control"
                    name="owner_contact"
                    value={formData.owner_contact || ""}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-md-4">
                  <label className="form-label">Owner Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="owner_email"
                    value={formData.owner_email || ""}
                    onChange={handleChange}
                  />
                </div> */}
              </div>
            </div>

            {/* Additional Information */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Additional Information</h5>
              <div className="row g-3">
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
                {/* <div className="col-12">
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
                  <label className="form-label">Ownership Type</label>
                  <input
                    className="form-control"
                    name="ownership_type"
                    value={formData.ownership_type || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-check mt-4">
                    <input                      type="checkbox"
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
              <h5 className="fw-semibold mb-3 text-primary">Amenities</h5>
              <div className="row">
                {amenities.map(a => (
                  <div className="col-md-3" key={a.amenity_id}>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`amenity-${a.amenity_id}`}
                        checked={formData.amenities.includes(parseInt(a.amenity_id))}
                        onChange={() => toggleAmenity(parseInt(a.amenity_id))}
                      />
                      <label className="form-check-label" htmlFor={`amenity-${a.amenity_id}`}>
                        {a.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {amenities.length === 0 && (
                <p className="text-muted">No amenities available</p>
              )}
            </div>

            {/* MEDIA UPLOAD SECTIONS */}
            {/* Images */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Property Images</h5>
              <input type="file" multiple className="form-control" onChange={handleImageUpload} accept="image/*" />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingImages.map((img, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={`${baseurl}${img.image || img}`}
                      alt={`Property ${i + 1}`}
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => removeExistingImage(i)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Property Videos</h5>
              <input type="file" multiple className="form-control" onChange={handleVideoUpload} accept="video/*" />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingVideos.map((video, i) => (
                  <div key={i} className="card p-2">
                    <small className="text-muted">Video {i + 1}</small>
                    <a 
                      href={`${baseurl}${video.video || video}`} 
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

            {/* Files */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Property Documents</h5>
              <input type="file" multiple className="form-control" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" />
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {existingFiles.map((file, i) => (
                  <div key={i} className="card p-2">
                    <small className="text-muted">Document {i + 1}</small>
                    <a 
                      href={`${baseurl}${file.file || file}`} 
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

            {/* Layout */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Layout</h5>
              <input type="file" className="form-control" onChange={handleLayoutUpload} accept=".pdf,.jpg,.jpeg,.png,.dwg" />
              {existingLayout && (
                <div className="mt-2">
                  <a href={`${baseurl}${existingLayout}`} target="_blank" rel="noopener noreferrer">
                    Current Layout File
                  </a>
                </div>
              )}
            </div>

            {/* Agreement Video */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Agreement Video</h5>
              <input type="file" className="form-control" onChange={handleAgreementVideoUpload} accept="video/*" />
              {existingAgreementVideo && (
                <div className="mt-2">
                  <a href={`${baseurl}${existingAgreementVideo}`} target="_blank" rel="noopener noreferrer">
                    Current Agreement Video
                  </a>
                </div>
              )}
            </div>

            {/* Agreement File */}
            <div className="col-12">
              <h5 className="fw-semibold mb-3 text-primary">Agreement Document</h5>
              <input type="file" className="form-control" onChange={handleAgreementFileUpload} accept=".pdf,.doc,.docx" />
              {existingAgreementFile && (
                <div className="mt-2">
                  <a href={`${baseurl}${existingAgreementFile}`} target="_blank" rel="noopener noreferrer">
                    Current Agreement Document
                  </a>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
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

export default AgentPropertyEditForm;