// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate, useParams } from "react-router-dom";
// import AdminNavbar from "../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import { baseurl } from "../BaseURL/BaseURL";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AddEditCarousel = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     link: "",
//     order: "",
//     active: true,
//     image: null,
//     video: null,
//     existing_image: null,
//     existing_video: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [fetchLoading, setFetchLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'
//   const [isEditMode, setIsEditMode] = useState(false);

//   const navigate = useNavigate();
//   const { id } = useParams(); // Get ID from URL if in edit mode

//   // Check if we're in edit mode
//   useEffect(() => {
//     if (id) {
//       setIsEditMode(true);
//       fetchCarouselItem();
//     }
//   }, [id]);

//   // Fetch carousel item for editing
//   const fetchCarouselItem = async () => {
//     setFetchLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/carousel/${id}/`);
//       const item = res.data;
      
//       // Set form data with existing values
//       setFormData({
//         title: item.title || "",
//         description: item.description || "",
//         link: item.link || "",
//         order: item.order || "",
//         active: item.active !== undefined ? item.active : true,
//         image: null,
//         video: null,
//         existing_image: item.image || null,
//         existing_video: item.video || null
//       });

//       // Set media type based on existing media
//       if (item.video) {
//         setMediaType("video");
//         setVideoPreview(item.video);
//       } else if (item.image) {
//         setMediaType("image");
//         setImagePreview(item.image);
//       }
      
//     } catch (error) {
//       console.error("Error fetching carousel item:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load carousel item",
//         confirmButtonColor: "#273c75",
//       }).then(() => navigate("/admin-carousel-list"));
//     }
//     setFetchLoading(false);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (max 5MB for images)
//       if (file.size > 5 * 1024 * 1024) {
//         Swal.fire({
//           icon: "error",
//           title: "File too large",
//           text: "Please select an image smaller than 5MB",
//           confirmButtonColor: "#273c75",
//         });
//         return;
//       }

//       // Validate file type
//       const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
//       if (!validTypes.includes(file.type)) {
//         Swal.fire({
//           icon: "error",
//           title: "Invalid file type",
//           text: "Please select a valid image (JPEG, PNG, GIF, WebP)",
//           confirmButtonColor: "#273c75",
//         });
//         return;
//       }

//       setFormData({ 
//         ...formData, 
//         image: file, 
//         video: null,
//         existing_image: null,
//         existing_video: null 
//       });
//       setMediaType("image");
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setVideoPreview(null);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (max 20MB for videos)
//       if (file.size > 20 * 1024 * 1024) {
//         Swal.fire({
//           icon: "error",
//           title: "File too large",
//           text: "Please select a video smaller than 20MB",
//           confirmButtonColor: "#273c75",
//         });
//         return;
//       }

//       // Validate file type
//       const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
//       if (!validTypes.includes(file.type)) {
//         Swal.fire({
//           icon: "error",
//           title: "Invalid file type",
//           text: "Please select a valid video (MP4, WebM, OGG, MOV)",
//           confirmButtonColor: "#273c75",
//         });
//         return;
//       }

//       setFormData({ 
//         ...formData, 
//         video: file, 
//         image: null,
//         existing_image: null,
//         existing_video: null 
//       });
//       setMediaType("video");
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setVideoPreview(reader.result);
//         setImagePreview(null);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.title.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter carousel title",
//         confirmButtonColor: "#273c75",
//       });
//       return;
//     }

//     // Check if media exists (either new or existing)
//     const hasNewMedia = formData.image || formData.video;
//     const hasExistingMedia = formData.existing_image || formData.existing_video;
    
//     if (!hasNewMedia && !hasExistingMedia) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please select either an image or a video",
//         confirmButtonColor: "#273c75",
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Prepare form data for file upload
//       const formDataObj = new FormData();
//       formDataObj.append('title', formData.title.trim());
      
//       if (formData.description) {
//         formDataObj.append('description', formData.description.trim());
//       }
      
//       if (formData.link) {
//         formDataObj.append('link', formData.link.trim());
//       }
      
//       if (formData.order) {
//         formDataObj.append('order', formData.order);
//       }
      
//       formDataObj.append('active', formData.active);
      
//       // Only append new files if they exist
//       if (formData.image) {
//         formDataObj.append('image', formData.image);
//       }
      
//       if (formData.video) {
//         formDataObj.append('video', formData.video);
//       }

//       if (isEditMode) {
//         // Update existing item
//         await axios.put(`${baseurl}/carousel/${id}/`, formDataObj, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//       } else {
//         // Create new item
//         await axios.post(`${baseurl}/carousel/`, formDataObj, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });
//       }

//       // Success message
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: isEditMode ? "Carousel item updated successfully" : "Carousel item created successfully",
//         confirmButtonColor: "#273c75",
//         confirmButtonText: "OK",
//       }).then(() => navigate("/admin-carousel-list"));

//     } catch (err) {
//       console.error("Error saving carousel item:", err);
      
//       // Handle validation errors
//       let errorMessage = isEditMode ? "Failed to update carousel item" : "Failed to create carousel item";
//       if (err.response?.data) {
//         if (typeof err.response.data === 'object') {
//           const errors = Object.values(err.response.data).flat().join(', ');
//           errorMessage = errors;
//         } else {
//           errorMessage = err.response.data.detail || errorMessage;
//         }
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: errorMessage,
//         confirmButtonColor: "#273c75",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearMediaSelection = () => {
//     setFormData({
//       ...formData,
//       image: null,
//       video: null,
//       existing_image: null,
//       existing_video: null
//     });
//     setImagePreview(null);
//     setVideoPreview(null);
//     setMediaType("image");
//   };

//   const handleMediaTypeChange = (type) => {
//     setMediaType(type);
//     clearMediaSelection();
//   };

//   if (fetchLoading) {
//     return (
//       <>
//         <AdminNavbar />
//         <div className="container my-4 text-center">
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AdminNavbar />

//       <div className="container my-4">
//         <div className="card p-4">
//           <h4 className="text-center mb-4">
//             {isEditMode ? "Edit Carousel Item" : "Add Carousel Item"}
//           </h4>

//           <form onSubmit={handleSubmit}>
//             {/* Title + Order in one row */}
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label className="form-label">
//                   Title <span className="text-danger">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter carousel title"
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Display Order</label>
//                 <input
//                   type="number"
//                   name="order"
//                   value={formData.order}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter display order (optional)"
//                   min="0"
//                   disabled={loading}
//                 />
//                 <small className="text-muted">Lower numbers display first</small>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <label className="form-label">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="Enter description (optional)"
//                   rows="3"
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Link */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <label className="form-label">Link URL</label>
//                 <input
//                   type="url"
//                   name="link"
//                   value={formData.link}
//                   onChange={handleChange}
//                   className="form-control"
//                   placeholder="https://example.com (optional)"
//                   disabled={loading}
//                 />
//                 <small className="text-muted">URL to navigate when carousel is clicked</small>
//               </div>
//             </div>

//             {/* Media Type Selection */}
//             <div className="row mb-3">
//               <div className="col-12">
//                 <label className="form-label mb-2">Media Type</label>
//                 <div className="d-flex gap-4">
//                   <div className="form-check">
//                     <input
//                       type="radio"
//                       id="mediaImage"
//                       name="mediaType"
//                       value="image"
//                       checked={mediaType === "image"}
//                       onChange={(e) => handleMediaTypeChange(e.target.value)}
//                       className="form-check-input"
//                       disabled={loading}
//                     />
//                     <label className="form-check-label" htmlFor="mediaImage">
//                       Image
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       type="radio"
//                       id="mediaVideo"
//                       name="mediaType"
//                       value="video"
//                       checked={mediaType === "video"}
//                       onChange={(e) => handleMediaTypeChange(e.target.value)}
//                       className="form-check-input"
//                       disabled={loading}
//                     />
//                     <label className="form-check-label" htmlFor="mediaVideo">
//                       Video
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Image Upload */}
//             {mediaType === "image" && (
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">
//                     Carousel Image {!isEditMode && <span className="text-danger">*</span>}
//                   </label>
//                   <input
//                     type="file"
//                     name="image"
//                     onChange={handleImageChange}
//                     className="form-control"
//                     accept="image/*"
//                     disabled={loading}
//                   />
//                   <small className="text-muted">
//                     {isEditMode ? "Leave empty to keep existing image. " : ""}
//                     Max 5MB. Supported: JPEG, PNG, GIF, WebP
//                   </small>
//                 </div>
                
//                 {(imagePreview || formData.existing_image) && (
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       {imagePreview ? "New Preview" : "Current Image"}
//                     </label>
//                     <div>
//                       <img 
//                         src={imagePreview || formData.existing_image} 
//                         alt="Preview" 
//                         className="img-thumbnail"
//                         style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
//                       />
//                       {formData.existing_image && !imagePreview && (
//                         <p className="text-muted mt-1">
//                           <small>Existing image (will be kept if no new image selected)</small>
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Video Upload */}
//             {mediaType === "video" && (
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">
//                     Carousel Video {!isEditMode && <span className="text-danger">*</span>}
//                   </label>
//                   <input
//                     type="file"
//                     name="video"
//                     onChange={handleVideoChange}
//                     className="form-control"
//                     accept="video/*"
//                     disabled={loading}
//                   />
//                   <small className="text-muted">
//                     {isEditMode ? "Leave empty to keep existing video. " : ""}
//                     Max 20MB. Supported: MP4, WebM, OGG, MOV
//                   </small>
//                 </div>
                
//                 {(videoPreview || formData.existing_video) && (
//                   <div className="col-md-6">
//                     <label className="form-label">
//                       {videoPreview ? "New Preview" : "Current Video"}
//                     </label>
//                     <div>
//                       <video 
//                         src={videoPreview || formData.existing_video} 
//                         controls
//                         className="img-thumbnail"
//                         style={{ maxWidth: '200px', maxHeight: '150px' }}
//                       >
//                         Your browser does not support the video tag.
//                       </video>
//                       {formData.existing_video && !videoPreview && (
//                         <p className="text-muted mt-1">
//                           <small>Existing video (will be kept if no new video selected)</small>
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Status Checkbox */}
//             <div className="row mb-4">
//               <div className="col-12">
//                 <div className="form-check">
//                   <input
//                     type="checkbox"
//                     name="active"
//                     checked={formData.active}
//                     onChange={handleChange}
//                     className="form-check-input"
//                     id="isActive"
//                     disabled={loading}
//                   />
//                   <label className="form-check-label" htmlFor="isActive">
//                     Active Carousel Item
//                   </label>
//                 </div>
//                 <small className="text-muted">
//                   Inactive items won't be displayed on the website
//                 </small>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="row">
//               <div className="col-12">
//                 <div className="d-flex justify-content-between">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate("/admin-carousel-list")}
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className="btn"
//                     style={{
//                       backgroundColor: "#273c75",
//                       borderColor: "#273c75",
//                       color: "white",
//                       minWidth: "180px",
//                     }}
//                     disabled={loading}
//                   >
//                     {loading ? (isEditMode ? "Updating..." : "Creating...") : 
//                      (isEditMode ? "Update Carousel" : "Create Carousel")}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddEditCarousel;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../Admin_Panel/Admin_Navbar/Admin_Navbar";
import { baseurl } from "../BaseURL/BaseURL";
import "bootstrap/dist/css/bootstrap.min.css";

const AddEditCarousel = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    order: "",
    active: true,
    image: null,
    video: null,
    existing_image: null,
    existing_video: null
  });

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [mediaType, setMediaType] = useState("image"); // 'image' or 'video'
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if in edit mode

  // Helper function to get full image URL
  const getFullImageUrl = (url) => {
    if (!url) return null;
    // If it's already a full URL, return as is
    if (url.startsWith('http')) return url;
    // Otherwise, prepend the base URL
    return `${baseurl}${url}`;
  };

  // Check if we're in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchCarouselItem();
    }
  }, [id]);

  // Fetch carousel item for editing
  const fetchCarouselItem = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get(`${baseurl}/carousel/${id}/`);
      const item = res.data;
      
      console.log("Fetched item:", item); // Debug log
      
      // Set form data with existing values
      setFormData({
        title: item.title || "",
        description: item.description || "",
        link: item.link || "",
        order: item.order || "",
        active: item.active !== undefined ? item.active : true,
        image: null,
        video: null,
        existing_image: item.image || null,
        existing_video: item.video || null
      });

      // Set media type based on existing media
      if (item.video) {
        setMediaType("video");
        setVideoPreview(getFullImageUrl(item.video));
      } else if (item.image) {
        setMediaType("image");
        setImagePreview(getFullImageUrl(item.image));
      }
      
    } catch (error) {
      console.error("Error fetching carousel item:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load carousel item",
        confirmButtonColor: "#273c75",
      }).then(() => navigate("/admin-carousel-list"));
    }
    setFetchLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB for images)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image smaller than 5MB",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select a valid image (JPEG, PNG, GIF, WebP)",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      setFormData({ 
        ...formData, 
        image: file, 
        video: null,
        existing_image: null,
        existing_video: null 
      });
      setMediaType("image");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setVideoPreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 20MB for videos)
      if (file.size > 20 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select a video smaller than 20MB",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please select a valid video (MP4, WebM, OGG, MOV)",
          confirmButtonColor: "#273c75",
        });
        return;
      }

      setFormData({ 
        ...formData, 
        video: file, 
        image: null,
        existing_image: null,
        existing_video: null 
      });
      setMediaType("video");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter carousel title",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    // Check if media exists (either new or existing)
    const hasNewMedia = formData.image || formData.video;
    const hasExistingMedia = formData.existing_image || formData.existing_video;
    
    if (!hasNewMedia && !hasExistingMedia) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select either an image or a video",
        confirmButtonColor: "#273c75",
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for file upload
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title.trim());
      
      if (formData.description) {
        formDataObj.append('description', formData.description.trim());
      }
      
      if (formData.link) {
        formDataObj.append('link', formData.link.trim());
      }
      
      if (formData.order) {
        formDataObj.append('order', formData.order);
      }
      
      formDataObj.append('active', formData.active);
      
      // Only append new files if they exist
      if (formData.image) {
        formDataObj.append('image', formData.image);
      }
      
      if (formData.video) {
        formDataObj.append('video', formData.video);
      }

      if (isEditMode) {
        // Update existing item
        await axios.put(`${baseurl}/carousel/${id}/`, formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new item
        await axios.post(`${baseurl}/carousel/`, formDataObj, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: isEditMode ? "Carousel item updated successfully" : "Carousel item created successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-carousel-list"));

    } catch (err) {
      console.error("Error saving carousel item:", err);
      
      // Handle validation errors
      let errorMessage = isEditMode ? "Failed to update carousel item" : "Failed to create carousel item";
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          const errors = Object.values(err.response.data).flat().join(', ');
          errorMessage = errors;
        } else {
          errorMessage = err.response.data.detail || errorMessage;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMediaSelection = () => {
    setFormData({
      ...formData,
      image: null,
      video: null,
      existing_image: null,
      existing_video: null
    });
    setImagePreview(null);
    setVideoPreview(null);
    setMediaType("image");
  };

  const handleMediaTypeChange = (type) => {
    setMediaType(type);
    clearMediaSelection();
  };

  if (fetchLoading) {
    return (
      <>
        <AdminNavbar />
        <div className="container my-4 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">
            {isEditMode ? "Edit Carousel Item" : "Add Carousel Item"}
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Title + Order in one row */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter carousel title"
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter display order (optional)"
                  min="0"
                  disabled={loading}
                />
                <small className="text-muted">Lower numbers display first</small>
              </div>
            </div>

            {/* Description */}
            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter description (optional)"
                  rows="3"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Link */}
            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label">Link URL</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://example.com (optional)"
                  disabled={loading}
                />
                <small className="text-muted">URL to navigate when carousel is clicked</small>
              </div>
            </div>

            {/* Media Type Selection */}
            <div className="row mb-3">
              <div className="col-12">
                <label className="form-label mb-2">Media Type</label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="mediaImage"
                      name="mediaType"
                      value="image"
                      checked={mediaType === "image"}
                      onChange={(e) => handleMediaTypeChange(e.target.value)}
                      className="form-check-input"
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="mediaImage">
                      Image
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="mediaVideo"
                      name="mediaType"
                      value="video"
                      checked={mediaType === "video"}
                      onChange={(e) => handleMediaTypeChange(e.target.value)}
                      className="form-check-input"
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="mediaVideo">
                      Video
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            {mediaType === "image" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Carousel Image {!isEditMode && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-control"
                    accept="image/*"
                    disabled={loading}
                  />
                  <small className="text-muted">
                    {isEditMode ? "Leave empty to keep existing image. " : ""}
                    Max 5MB. Supported: JPEG, PNG, GIF, WebP
                  </small>
                </div>
                
                {(imagePreview || formData.existing_image) && (
                  <div className="col-md-6">
                    <label className="form-label">
                      {imagePreview ? "New Preview" : "Current Image"}
                    </label>
                    <div>
                      <img 
                        src={imagePreview || getFullImageUrl(formData.existing_image)} 
                        alt="Preview" 
                        className="img-thumbnail"
                        style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/200x150?text=Image+Error';
                          console.log("Image failed to load:", e.target.src);
                        }}
                      />
                      {formData.existing_image && !imagePreview && (
                        <p className="text-muted mt-1">
                          <small>Existing image (will be kept if no new image selected)</small>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Upload */}
            {mediaType === "video" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Carousel Video {!isEditMode && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="file"
                    name="video"
                    onChange={handleVideoChange}
                    className="form-control"
                    accept="video/*"
                    disabled={loading}
                  />
                  <small className="text-muted">
                    {isEditMode ? "Leave empty to keep existing video. " : ""}
                    Max 20MB. Supported: MP4, WebM, OGG, MOV
                  </small>
                </div>
                
                {(videoPreview || formData.existing_video) && (
                  <div className="col-md-6">
                    <label className="form-label">
                      {videoPreview ? "New Preview" : "Current Video"}
                    </label>
                    <div>
                      <video 
                        src={videoPreview || getFullImageUrl(formData.existing_video)} 
                        controls
                        className="img-thumbnail"
                        style={{ maxWidth: '200px', maxHeight: '150px' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          console.log("Video failed to load:", e.target.src);
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                      {formData.existing_video && !videoPreview && (
                        <p className="text-muted mt-1">
                          <small>Existing video (will be kept if no new video selected)</small>
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Status Checkbox */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isActive"
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active Carousel Item
                  </label>
                </div>
                <small className="text-muted">
                  Inactive items won't be displayed on the website
                </small>
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin-carousel-list")}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#273c75",
                      borderColor: "#273c75",
                      color: "white",
                      minWidth: "180px",
                    }}
                    disabled={loading}
                  >
                    {loading ? (isEditMode ? "Updating..." : "Creating...") : 
                     (isEditMode ? "Update Carousel" : "Create Carousel")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEditCarousel;