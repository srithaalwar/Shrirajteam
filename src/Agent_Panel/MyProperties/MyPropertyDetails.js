
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// // import "./PropertyDetails.css";
// import { baseurl } from "../../BaseURL/BaseURL";
// import {
//   Bed,
//   Bath,
//   Car,
//   ArrowLeft,
//   Maximize2,
//   MapPin,
//   Calendar,
//   User,
//   Phone,
//   Mail,
//   Heart,
//   Share2,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Building,
//   Layers,
//   Home,
//   Key,
//   CheckCircle,
//   PhoneCall,
//   MessageCircle
// } from "lucide-react";

// const AgentMyPropertyDetails = () => {
//   const { propertyId } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [openAbout, setOpenAbout] = useState(true);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [openContact, setOpenContact] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Format price in lakhs/crores
//   const formatPrice = (price) => {
//     const priceNum = parseFloat(price);
//     if (priceNum >= 10000000) {
//       return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
//     } else if (priceNum >= 100000) {
//       return `₹${(priceNum / 100000).toFixed(2)} L`;
//     }
//     return `₹${priceNum.toLocaleString()}`;
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return "₹0";
//     return `₹${parseFloat(amount).toLocaleString()}`;
//   };

//   // Get property images
//   const getImages = () => {
//     if (property?.images && property.images.length > 0) {
//       return property.images.map(img => ({
//         image: img.image.startsWith('/media/') ? `${baseurl}${img.image}` : img.image
//       }));
//     }
//     return [
//       { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//       { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811" },
//       { image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" }
//     ];
//   };

//   // Fetch property details
//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${baseurl}/properties/${propertyId}/`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         setProperty(data);
        
//         // Set initial selected image
//         if (data.images && data.images.length > 0) {
//           const firstImage = data.images[0].image;
//           setSelectedImage(firstImage.startsWith('/media/') ? 
//             `${baseurl}${firstImage}` : firstImage);
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching property details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [propertyId]);

//   // Navigate images
//   const nextImage = () => {
//     const images = getImages();
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//     setSelectedImage(images[(currentImageIndex + 1) % images.length].image);
//   };

//   const prevImage = () => {
//     const images = getImages();
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//     setSelectedImage(images[(currentImageIndex - 1 + images.length) % images.length].image);
//   };

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="product-wrapper">
//           <div className="container py-5">
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading property details...</p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error || !property) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="product-wrapper">
//           <div className="container py-5">
//             <div className="alert alert-danger" role="alert">
//               Error loading property details: {error || "Property not found"}
//             </div>
//             <button 
//               className="btn btn-primary mt-3"
//               onClick={() => navigate(-1)}
//             >
//               Go Back
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   const images = getImages();
//   const isForSale = property.looking_to === "sell";
//   const price = isForSale ? 
//     formatPrice(property.total_property_value || property.property_value) :
//     `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount ? 
//     ` | Deposit: ${formatCurrency(property.deposit_amount)}` : '';

//   // Get property category name
//   const getCategoryName = (id) => {
//     const categories = {
//       1: "Residential",
//       7: "Commercial",
//       13: "Commercial",
//       14: "Residential"
//     };
//     return categories[id] || "Property";
//   };

//   // Get property type name
//   const getPropertyTypeName = (id) => {
//     const types = {
//       1: "Apartment",
//       9: "Shop",
//       10: "Office Space",
//       12: "Warehouse",
//       13: "Independent House"
//     };
//     return types[id] || "Property";
//   };

//   // Get facing direction
//   const getFacingDirection = (facing) => {
//     const directions = {
//       "north": "North",
//       "south": "South", 
//       "east": "East",
//       "west": "West",
//       "north-east": "North East",
//       "north-west": "North West",
//       "south-east": "South East",
//       "south-west": "South West"
//     };
//     return directions[facing?.toLowerCase()] || facing;
//   };

//   // Get furnishing status
//   const getFurnishingStatus = (status) => {
//     const statusMap = {
//       "Fully-Furnished": "Fully Furnished",
//       "Semi-Furnished": "Semi Furnished",
//       "Unfurnished": "Unfurnished"
//     };
//     return statusMap[status] || status;
//   };

//   // Get ownership type
//   const getOwnershipType = (type) => {
//     const types = {
//       "Freehold": "Freehold",
//       "Leasehold": "Leasehold"
//     };
//     return types[type] || type;
//   };

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="product-wrapper">
//         {/* Breadcrumb */}
//         {/* <div className="breadcrumb">
//           <button 
//             className="back-btn"
//             onClick={() => navigate(-1)}
//             style={{ 
//               background: 'none', 
//               border: 'none', 
//               color: '#666',
//               cursor: 'pointer',
//               marginRight: '10px'
//             }}
//           >
//             ← Back
//           </button>
//           Home / Properties / {property.city} / {property.property_title}
//         </div> */}

//         <button
//           className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft size={16} /> Back
//         </button>

//         <div className="product-layout">
//           {/* LEFT – IMAGE SECTION */}
//           <div className="image-section">
//             {/* Thumbnails */}
//             <div className="thumbnail-list">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className={`thumb-box ${
//                     selectedImage === img.image ? "active" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedImage(img.image);
//                     setCurrentImageIndex(index);
//                   }}
//                 >
//                   <img src={img.image} alt={`thumbnail ${index + 1}`} />
//                 </div>
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="main-image-box">
//               <div className="image-navigation">
//                 <button className="nav-btn prev" onClick={prevImage}>
//                   <ChevronLeft size={24} />
//                 </button>
//                 <img src={selectedImage} alt={property.property_title} />
//                 <button className="nav-btn next" onClick={nextImage}>
//                   <ChevronRight size={24} />
//                 </button>
//               </div>

//               <div className="floating-icons">
//                 <div 
//                   className="icon-circle"
//                   onClick={() => setIsFavorite(!isFavorite)}
//                   style={{ color: isFavorite ? '#ff2e93' : '#666' }}
//                 >
//                   <Heart size={20} fill={isFavorite ? '#ff2e93' : 'none'} />
//                 </div>
//                 <div className="icon-circle">
//                   <Share2 size={20} />
//                 </div>
//               </div>
              
//               {/* Image counter */}
//               <div className="image-counter">
//                 {currentImageIndex + 1} / {images.length}
//               </div>
//             </div>
//           </div>

//           {/* MIDDLE – DETAILS */}
//           <div className="details-section">
//             <div className="property-status">
//               <span className={`status-badge ${isForSale ? 'sale' : 'rent'}`}>
//                 {isForSale ? "FOR SALE" : "FOR RENT"}
//               </span>
//               {property.status && (
//                 <span className="featured-badge">
//                         {/* {property.status} */}
//                           {property.status.toUpperCase()}
//                         </span>
//               )}
//             </div>

//             <h1>{property.property_title}</h1>
            
//             <div className="location-info">
//               <MapPin size={16} />
//               <span>
//                 {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}
//               </span>
//             </div>

//             {/* Property Highlights */}
//             <div className="property-highlights">
//               {property.number_of_bedrooms && (
//                 <div className="highlight">
//                   <Bed size={18} />
//                   <span>{property.number_of_bedrooms} Beds</span>
//                 </div>
//               )}
//               {property.number_of_bathrooms && (
//                 <div className="highlight">
//                   <Bath size={18} />
//                   <span>{property.number_of_bathrooms} Baths</span>
//                 </div>
//               )}
//               <div className="highlight">
//                 <Maximize2 size={18} />
//                 <span>{property.area} {property.area_unit}</span>
//               </div>
//               {property.number_of_floors && (
//                 <div className="highlight">
//                   <Layers size={18} />
//                   <span>{property.number_of_floors} Floors</span>
//                 </div>
//               )}
//               {property.facing && (
//                 <div className="highlight">
//                   <Home size={18} />
//                   <span>{getFacingDirection(property.facing)} Facing</span>
//                 </div>
//               )}
//             </div>

//             <p className="desc">
//               {property.description || "No description available."}
//               {property.description && property.description.length > 150 && (
//                 <span> Read More</span>
//               )}
//             </p>

//             <h3>Key Attributes</h3>

//             <div className="attributes">
//               <div>
//                 <span>Property Type</span>
//                 <span>{getPropertyTypeName(property.property_type)}</span>
//               </div>
//               <div>
//                 <span>Category</span>
//                 <span>{getCategoryName(property.category)}</span>
//               </div>
//               <div>
//                 <span>Ownership</span>
//                 <span>{getOwnershipType(property.ownership_type)}</span>
//               </div>
//               <div>
//                 <span>Furnishing</span>
//                 <span>{getFurnishingStatus(property.furnishing_status)}</span>
//               </div>
//               <div>
//                 <span>Available From</span>
//                 <span>{property.available_from || "Immediate"}</span>
//               </div>
//               <div>
//                 <span>Listed On</span>
//                 <span>{property.created_at}</span>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT – BUY/INQUIRY BOX */}
//           <div className="buy-box">
//             <div className="price-section">
//               <div className="price-row">
//                 <span className="price">{price}</span>
//                 {isForSale && property.price_per_unit && (
//                   <span className="unit-price">
//                     ₹{property.price_per_unit} per {property.area_unit}
//                   </span>
//                 )}
//               </div>
//               {!isForSale && depositText && (
//                 <p className="deposit-info">
//                   Deposit: {formatCurrency(property.deposit_amount)}
//                 </p>
//               )}
//             </div>

//             {/* Contact Owner Button */}
//             <button 
//               className="contact-btn"
//               onClick={() => setOpenContact(!openContact)}
//             >
//               <PhoneCall size={18} />
//               {isForSale ? "CONTACT SELLER" : "CONTACT OWNER"}
//             </button>

//             {/* Contact Information */}
//             {openContact && (
//               <div className="contact-info">
//                 <div className="owner-details">
//                   <div className="owner-header">
//                     <User size={16} />
//                     <strong>{property.owner_name}</strong>
//                   </div>
//                   <div className="contact-methods">
//                     <a href={`tel:${property.owner_contact}`} className="contact-method">
//                       <Phone size={16} />
//                       <span>{property.owner_contact}</span>
//                     </a>
//                     <a href={`mailto:${property.owner_email}`} className="contact-method">
//                       <Mail size={16} />
//                       <span>{property.owner_email}</span>
//                     </a>
//                   </div>
//                 </div>
//                 {/* <button className="whatsapp-btn">
//                   <MessageCircle size={18} />
//                   Chat on WhatsApp
//                 </button> */}
//               </div>
//             )}

//             {/* Property Facts */}
//             <div className="property-facts">
//               <div className="fact">
//                 <CheckCircle size={16} color="#28a745" />
//                 <span>Verified Property</span>
//               </div>
//               <div className="fact">
//                 <Building size={16} color="#007bff" />
//                 <span>Free Legal Verification</span>
//               </div>
//               {/* <div className="fact">
//                 <Key size={16} color="#ffc107" />
//                 <span>Instant Visit Available</span>
//               </div> */}
//             </div>

//             {/* Schedule Visit */}
//             {/* <div className="schedule-visit">
//               <h4>Schedule a Visit</h4>
//               <button className="schedule-btn">
//                 <Calendar size={18} />
//                 Book Free Site Visit
//               </button>
//             </div> */}

//             {/* Loan Calculator */}
//             {/* {isForSale && (
//               <div className="loan-calculator">
//                 <h4>EMI Calculator</h4>
//                 <div className="emi-info">
//                   <strong>EMI starts from ₹{(parseFloat(property.total_property_value) * 0.008).toFixed(0)}/month</strong>
//                   <span className="link">Calculate EMI</span>
//                 </div>
//               </div>
//             )} */}

          
//           </div>
//         </div>

//         {/* ADDITIONAL INFORMATION SECTIONS */}
//         <div className="additional-sections">
//           {/* About Property Section */}
//           <div className="info-accordion">
//             <div
//               className="info-header"
//               onClick={() => setOpenAbout(!openAbout)}
//             >
//               <h3>About This Property</h3>
//               <span className={`arrow ${openAbout ? "open" : ""}`}>⌃</span>
//             </div>

//             {openAbout && (
//               <div className="info-body">
//                 <div className="property-details-grid">
//                   <div className="detail-column">
//                     <h4>Property Specifications</h4>
//                     <table className="specs-table">
//                       <tbody>
//                         <tr>
//                           <td>Plot Area</td>
//                           <td>{property.area} {property.area_unit}</td>
//                         </tr>
//                         {property.builtup_area && (
//                           <tr>
//                             <td>Built-up Area</td>
//                             <td>{property.builtup_area} {property.area_unit}</td>
//                           </tr>
//                         )}
//                         {property.length_ft && (
//                           <tr>
//                             <td>Length</td>
//                             <td>{property.length_ft} ft</td>
//                           </tr>
//                         )}
//                         {property.breadth_ft && (
//                           <tr>
//                             <td>Breadth</td>
//                             <td>{property.breadth_ft} ft</td>
//                           </tr>
//                         )}
//                         <tr>
//                           <td>Floor Number</td>
//                           <td>{property.floor || "Ground Floor"}</td>
//                         </tr>
//                         <tr>
//                           <td>Total Floors</td>
//                           <td>{property.number_of_floors}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="detail-column">
//                     <h4>Location Advantages</h4>
//                     <p>{property.location_advantages || "Prime location with excellent connectivity."}</p>
                    
//                     <h4>Property Uniqueness</h4>
//                     <p>{property.property_uniqueness || "Well-maintained property with modern amenities."}</p>
                    
//                     <h4>Other Features</h4>
//                     <p>{property.other_features || "Spacious and well-ventilated."}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Property Details Section */}
//           <div className="info-accordion">
//             <div
//               className="info-header"
//               onClick={() => setOpenDetails(!openDetails)}
//             >
//               <h3>Complete Property Details</h3>
//               <span className={`arrow ${openDetails ? "open" : ""}`}>⌃</span>
//             </div>

//             {openDetails && (
//               <div className="info-body">
//                 <table className="product-details-table">
//                   <tbody>
//                     <tr>
//                       <td>Property ID</td>
//                       <td>{property.property_id}</td>
//                     </tr>
//                     <tr>
//                       <td>Property Type</td>
//                       <td>{getPropertyTypeName(property.property_type)}</td>
//                     </tr>
//                     <tr>
//                       <td>Category</td>
//                       <td>{getCategoryName(property.category)}</td>
//                     </tr>
//                     <tr>
//                       <td>Transaction Type</td>
//                       <td>{isForSale ? "Sale" : "Rent"}</td>
//                     </tr>
//                     <tr>
//                       <td>Price</td>
//                       <td>{price}{depositText}</td>
//                     </tr>
//                     <tr>
//                       <td>Price per Unit</td>
//                       <td>₹{property.price_per_unit || "0"} per {property.area_unit}</td>
//                     </tr>
//                     <tr>
//                       <td>Total Value</td>
//                       <td>{formatCurrency(property.total_property_value)}</td>
//                     </tr>
//                     {!isForSale && (
//                       <>
//                         <tr>
//                           <td>Monthly Rent</td>
//                           <td>{formatCurrency(property.rent_amount)}</td>
//                         </tr>
//                         <tr>
//                           <td>Security Deposit</td>
//                           <td>{formatCurrency(property.deposit_amount)}</td>
//                         </tr>
//                       </>
//                     )}
//                     <tr>
//                       <td>Booking Amount</td>
//                       <td>{formatCurrency(property.booking_amount)}</td>
//                     </tr>
//                     <tr>
//                       <td>Area</td>
//                       <td>{property.area} {property.area_unit}</td>
//                     </tr>
//                     <tr>
//                       <td>Built-up Area</td>
//                       <td>{property.builtup_area || "N/A"} {property.area_unit}</td>
//                     </tr>
//                     <tr>
//                       <td>Facing Direction</td>
//                       <td>{getFacingDirection(property.facing)}</td>
//                     </tr>
//                     <tr>
//                       <td>Ownership Type</td>
//                       <td>{getOwnershipType(property.ownership_type)}</td>
//                     </tr>
//                     <tr>
//                       <td>Furnishing Status</td>
//                       <td>{getFurnishingStatus(property.furnishing_status)}</td>
//                     </tr>
//                     <tr>
//                       <td>Number of Bedrooms</td>
//                       <td>{property.number_of_bedrooms || "N/A"}</td>
//                     </tr>
//                     <tr>
//                       <td>Number of Bathrooms</td>
//                       <td>{property.number_of_bathrooms || "N/A"}</td>
//                     </tr>
//                     <tr>
//                       <td>Number of Balconies</td>
//                       <td>{property.number_of_balconies || "N/A"}</td>
//                     </tr>
//                     <tr>
//                       <td>Floor Number</td>
//                       <td>{property.floor || "Ground Floor"}</td>
//                     </tr>
//                     <tr>
//                       <td>Total Floors</td>
//                       <td>{property.number_of_floors}</td>
//                     </tr>
//                     <tr>
//                       <td>Number of Open Sides</td>
//                       <td>{property.number_of_open_sides || "N/A"}</td>
//                     </tr>
//                     <tr>
//                       <td>Road Width</td>
//                       <td>{property.road_width_1_ft || "N/A"} ft</td>
//                     </tr>
//                     <tr>
//                       <td>Preferred Tenants</td>
//                       <td>{property.preferred_tenants || "All"}</td>
//                     </tr>
//                     <tr>
//                       <td>Available From</td>
//                       <td>{property.available_from || "Immediate"}</td>
//                     </tr>
//                     <tr>
//                       <td>Property Status</td>
//                       <td>{property.status}</td>
//                     </tr>
//                     <tr>
//                       <td>Approval Status</td>
//                       <td>{property.approval_status}</td>
//                     </tr>
//                     <tr>
//                       <td>Listed On</td>
//                       <td>{property.created_at}</td>
//                     </tr>
//                     <tr>
//                       <td>Owner Name</td>
//                       <td>{property.owner_name}</td>
//                     </tr>
//                     <tr>
//                       <td>Owner Contact</td>
//                       <td>{property.owner_contact}</td>
//                     </tr>
//                     <tr>
//                       <td>Owner Email</td>
//                       <td>{property.owner_email}</td>
//                     </tr>
//                     <tr>
//                       <td>Latitude</td>
//                       <td>{property.latitude}</td>
//                     </tr>
//                     <tr>
//                       <td>Longitude</td>
//                       <td>{property.longitude}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AgentMyPropertyDetails;





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import "./PropertyDetails.css";
import { baseurl } from "../../BaseURL/BaseURL";
import {
  Bed,
  Bath,
  Car,
  ArrowLeft,
  Maximize2,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Building,
  Layers,
  Home,
  Key,
  CheckCircle,
  PhoneCall,
  MessageCircle
} from "lucide-react";

const AgentMyPropertyDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [openAbout, setOpenAbout] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [propertyCategories, setPropertyCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [typesLoading, setTypesLoading] = useState(true);

  // Format price in lakhs/crores
  const formatPrice = (price) => {
    if (!price) return "₹0";
    const priceNum = parseFloat(price);
    if (priceNum >= 10000000) {
      return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
    } else if (priceNum >= 100000) {
      return `₹${(priceNum / 100000).toFixed(2)} L`;
    }
    return `₹${priceNum.toLocaleString()}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "₹0";
    return `₹${parseFloat(amount).toLocaleString()}`;
  };

  // Fetch property categories
  const fetchPropertyCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await fetch(`${baseurl}/property-categories/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      const data = await response.json();
      setPropertyCategories(data.results || []);
    } catch (err) {
      console.error("Error fetching property categories:", err);
      setPropertyCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Fetch property types
  const fetchPropertyTypes = async () => {
    try {
      setTypesLoading(true);
      const response = await fetch(`${baseurl}/property-types/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch property types: ${response.status}`);
      }
      const data = await response.json();
      setPropertyTypes(data.results || []);
    } catch (err) {
      console.error("Error fetching property types:", err);
      setPropertyTypes([]);
    } finally {
      setTypesLoading(false);
    }
  };

  // Get property category name dynamically
  const getCategoryName = (categoryId) => {
    if (categoriesLoading) return "Loading...";
    if (!categoryId) return "Not specified";
    
    const category = propertyCategories.find(
      cat => cat.property_category_id === categoryId
    );
    return category ? category.name : "Unknown Category";
  };

  // Get property type name dynamically
  const getPropertyTypeName = (typeId) => {
    if (typesLoading) return "Loading...";
    if (!typeId) return "Not specified";
    
    const propertyType = propertyTypes.find(
      type => type.property_type_id === typeId
    );
    return propertyType ? propertyType.name : "Unknown Type";
  };

  // Get property images
  const getImages = () => {
    if (property?.images && property.images.length > 0) {
      return property.images.map(img => ({
        image: img.image.startsWith('/media/') ? `${baseurl}${img.image}` : img.image
      }));
    }
    return [
      { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
      { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811" },
      { image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" }
    ];
  };

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseurl}/properties/${propertyId}/`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProperty(data);
        
        // Set initial selected image
        if (data.images && data.images.length > 0) {
          const firstImage = data.images[0].image;
          setSelectedImage(firstImage.startsWith('/media/') ? 
            `${baseurl}${firstImage}` : firstImage);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch all required data
    fetchPropertyDetails();
    fetchPropertyCategories();
    fetchPropertyTypes();
  }, [propertyId]);

  // Navigate images
  const nextImage = () => {
    const images = getImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setSelectedImage(images[(currentImageIndex + 1) % images.length].image);
  };

  const prevImage = () => {
    const images = getImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setSelectedImage(images[(currentImageIndex - 1 + images.length) % images.length].image);
  };

  if (loading || categoriesLoading || typesLoading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="product-wrapper">
          <div className="container py-5">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading property details...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <WebsiteNavbar />
        <div className="product-wrapper">
          <div className="container py-5">
            <div className="alert alert-danger" role="alert">
              Error loading property details: {error || "Property not found"}
            </div>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const images = getImages();
  const isForSale = property.looking_to === "sell";
  const price = isForSale ? 
    formatPrice(property.total_property_value || property.property_value) :
    `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

  const depositText = property.deposit_amount ? 
    ` | Deposit: ${formatCurrency(property.deposit_amount)}` : '';

  // Get facing direction
  const getFacingDirection = (facing) => {
    const directions = {
      "north": "North",
      "south": "South", 
      "east": "East",
      "west": "West",
      "north-east": "North East",
      "north-west": "North West",
      "south-east": "South East",
      "south-west": "South West"
    };
    return directions[facing?.toLowerCase()] || facing;
  };

  // Get furnishing status
  const getFurnishingStatus = (status) => {
    const statusMap = {
      "Fully-Furnished": "Fully Furnished",
      "Semi-Furnished": "Semi Furnished",
      "Unfurnished": "Unfurnished"
    };
    return statusMap[status] || status;
  };

  // Get ownership type
  const getOwnershipType = (type) => {
    const types = {
      "Freehold": "Freehold",
      "Leasehold": "Leasehold"
    };
    return types[type] || type;
  };

  return (
    <>
      <WebsiteNavbar />

      <div className="product-wrapper">
        <button
          className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="product-layout">
          {/* LEFT – IMAGE SECTION */}
          <div className="image-section">
            {/* Thumbnails */}
            <div className="thumbnail-list">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`thumb-box ${
                    selectedImage === img.image ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedImage(img.image);
                    setCurrentImageIndex(index);
                  }}
                >
                  <img src={img.image} alt={`thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="main-image-box">
              <div className="image-navigation">
                <button className="nav-btn prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <img src={selectedImage} alt={property.property_title} />
                <button className="nav-btn next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="floating-icons">
                <div 
                  className="icon-circle"
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{ color: isFavorite ? '#ff2e93' : '#666' }}
                >
                  <Heart size={20} fill={isFavorite ? '#ff2e93' : 'none'} />
                </div>
                <div className="icon-circle">
                  <Share2 size={20} />
                </div>
              </div>
              
              {/* Image counter */}
              <div className="image-counter">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* MIDDLE – DETAILS */}
          <div className="details-section">
            <div className="property-status">
              <span className={`status-badge ${isForSale ? 'sale' : 'rent'}`}>
                {isForSale ? "FOR SALE" : "FOR RENT"}
              </span>
              {property.status && (
                <span className="featured-badge">
                  {property.status.toUpperCase()}
                </span>
              )}
            </div>

            <h1>{property.property_title}</h1>
            
            <div className="location-info">
              <MapPin size={16} />
              <span>
                {property.address}, {property.city}, {property.state}, {property.country} - {property.pin_code}
              </span>
            </div>

            {/* Property Highlights */}
            <div className="property-highlights">
              {property.number_of_bedrooms && (
                <div className="highlight">
                  <Bed size={18} />
                  <span>{property.number_of_bedrooms} Beds</span>
                </div>
              )}
              {property.number_of_bathrooms && (
                <div className="highlight">
                  <Bath size={18} />
                  <span>{property.number_of_bathrooms} Baths</span>
                </div>
              )}
              <div className="highlight">
                <Maximize2 size={18} />
                <span>{property.area} {property.area_unit}</span>
              </div>
              {property.number_of_floors && (
                <div className="highlight">
                  <Layers size={18} />
                  <span>{property.number_of_floors} Floors</span>
                </div>
              )}
              {property.facing && (
                <div className="highlight">
                  <Home size={18} />
                  <span>{getFacingDirection(property.facing)} Facing</span>
                </div>
              )}
            </div>

            <p className="desc">
              {property.description || "No description available."}
              {property.description && property.description.length > 150 && (
                <span> Read More</span>
              )}
            </p>

            <h3>Key Attributes</h3>

            <div className="attributes">
              <div>
                <span>Property Type</span>
                <span>{getPropertyTypeName(property.property_type)}</span>
              </div>
              <div>
                <span>Category</span>
                <span>{getCategoryName(property.category)}</span>
              </div>
              <div>
                <span>Ownership</span>
                <span>{getOwnershipType(property.ownership_type)}</span>
              </div>
              <div>
                <span>Furnishing</span>
                <span>{getFurnishingStatus(property.furnishing_status)}</span>
              </div>
              <div>
                <span>Available From</span>
                <span>{property.available_from || "Immediate"}</span>
              </div>
              <div>
                <span>Listed On</span>
                <span>{property.created_at}</span>
              </div>
            </div>
          </div>

          {/* RIGHT – BUY/INQUIRY BOX */}
          <div className="buy-box">
            <div className="price-section">
              <div className="price-row">
                <span className="price">{price}</span>
                {isForSale && property.price_per_unit && (
                  <span className="unit-price">
                    ₹{property.price_per_unit} per {property.area_unit}
                  </span>
                )}
              </div>
              {!isForSale && depositText && (
                <p className="deposit-info">
                  Deposit: {formatCurrency(property.deposit_amount)}
                </p>
              )}
            </div>

            {/* Contact Owner Button */}
            <button 
              className="contact-btn"
              onClick={() => setOpenContact(!openContact)}
            >
              <PhoneCall size={18} />
              {isForSale ? "CONTACT SELLER" : "CONTACT OWNER"}
            </button>

            {/* Contact Information */}
            {openContact && (
              <div className="contact-info">
                <div className="owner-details">
                  <div className="owner-header">
                    <User size={16} />
                    <strong>{property.owner_name}</strong>
                  </div>
                  <div className="contact-methods">
                    <a href={`tel:${property.owner_contact}`} className="contact-method">
                      <Phone size={16} />
                      <span>{property.owner_contact}</span>
                    </a>
                    <a href={`mailto:${property.owner_email}`} className="contact-method">
                      <Mail size={16} />
                      <span>{property.owner_email}</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Property Facts */}
            <div className="property-facts">
              <div className="fact">
                <CheckCircle size={16} color="#28a745" />
                <span>Verified Property</span>
              </div>
              <div className="fact">
                <Building size={16} color="#007bff" />
                <span>Free Legal Verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL INFORMATION SECTIONS */}
        <div className="additional-sections">
          {/* About Property Section */}
          <div className="info-accordion">
            <div
              className="info-header"
              onClick={() => setOpenAbout(!openAbout)}
            >
              <h3>About This Property</h3>
              <span className={`arrow ${openAbout ? "open" : ""}`}>⌃</span>
            </div>

            {openAbout && (
              <div className="info-body">
                <div className="property-details-grid">
                  <div className="detail-column">
                    <h4>Property Specifications</h4>
                    <table className="specs-table">
                      <tbody>
                        <tr>
                          <td>Plot Area</td>
                          <td>{property.area} {property.area_unit}</td>
                        </tr>
                        {property.builtup_area && (
                          <tr>
                            <td>Built-up Area</td>
                            <td>{property.builtup_area} {property.area_unit}</td>
                          </tr>
                        )}
                        {property.length_ft && (
                          <tr>
                            <td>Length</td>
                            <td>{property.length_ft} ft</td>
                          </tr>
                        )}
                        {property.breadth_ft && (
                          <tr>
                            <td>Breadth</td>
                            <td>{property.breadth_ft} ft</td>
                          </tr>
                        )}
                        <tr>
                          <td>Floor Number</td>
                          <td>{property.floor || "Ground Floor"}</td>
                        </tr>
                        <tr>
                          <td>Total Floors</td>
                          <td>{property.number_of_floors}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="detail-column">
                    <h4>Location Advantages</h4>
                    <p>{property.location_advantages || "Prime location with excellent connectivity."}</p>
                    
                    <h4>Property Uniqueness</h4>
                    <p>{property.property_uniqueness || "Well-maintained property with modern amenities."}</p>
                    
                    <h4>Other Features</h4>
                    <p>{property.other_features || "Spacious and well-ventilated."}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Property Details Section */}
          <div className="info-accordion">
            <div
              className="info-header"
              onClick={() => setOpenDetails(!openDetails)}
            >
              <h3>Complete Property Details</h3>
              <span className={`arrow ${openDetails ? "open" : ""}`}>⌃</span>
            </div>

            {openDetails && (
              <div className="info-body">
                <table className="product-details-table">
                  <tbody>
                    <tr>
                      <td>Property ID</td>
                      <td>{property.property_id}</td>
                    </tr>
                    <tr>
                      <td>Property Type</td>
                      <td>{getPropertyTypeName(property.property_type)}</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{getCategoryName(property.category)}</td>
                    </tr>
                    <tr>
                      <td>Transaction Type</td>
                      <td>{isForSale ? "Sale" : "Rent"}</td>
                    </tr>
                    <tr>
                      <td>Price</td>
                      <td>{price}{depositText}</td>
                    </tr>
                    <tr>
                      <td>Price per Unit</td>
                      <td>₹{property.price_per_unit || "0"} per {property.area_unit}</td>
                    </tr>
                    <tr>
                      <td>Total Value</td>
                      <td>{formatCurrency(property.total_property_value)}</td>
                    </tr>
                    {!isForSale && (
                      <>
                        <tr>
                          <td>Monthly Rent</td>
                          <td>{formatCurrency(property.rent_amount)}</td>
                        </tr>
                        <tr>
                          <td>Security Deposit</td>
                          <td>{formatCurrency(property.deposit_amount)}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <td>Booking Amount</td>
                      <td>{formatCurrency(property.booking_amount)}</td>
                    </tr>
                    <tr>
                      <td>Area</td>
                      <td>{property.area} {property.area_unit}</td>
                    </tr>
                    <tr>
                      <td>Built-up Area</td>
                      <td>{property.builtup_area || "N/A"} {property.area_unit}</td>
                    </tr>
                    <tr>
                      <td>Facing Direction</td>
                      <td>{getFacingDirection(property.facing)}</td>
                    </tr>
                    <tr>
                      <td>Ownership Type</td>
                      <td>{getOwnershipType(property.ownership_type)}</td>
                    </tr>
                    <tr>
                      <td>Furnishing Status</td>
                      <td>{getFurnishingStatus(property.furnishing_status)}</td>
                    </tr>
                    <tr>
                      <td>Number of Bedrooms</td>
                      <td>{property.number_of_bedrooms || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Number of Bathrooms</td>
                      <td>{property.number_of_bathrooms || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Number of Balconies</td>
                      <td>{property.number_of_balconies || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Floor Number</td>
                      <td>{property.floor || "Ground Floor"}</td>
                    </tr>
                    <tr>
                      <td>Total Floors</td>
                      <td>{property.number_of_floors}</td>
                    </tr>
                    <tr>
                      <td>Number of Open Sides</td>
                      <td>{property.number_of_open_sides || "N/A"}</td>
                    </tr>
                    <tr>
                      <td>Road Width</td>
                      <td>{property.road_width_1_ft || "N/A"} ft</td>
                    </tr>
                    <tr>
                      <td>Preferred Tenants</td>
                      <td>{property.preferred_tenants || "All"}</td>
                    </tr>
                    <tr>
                      <td>Available From</td>
                      <td>{property.available_from || "Immediate"}</td>
                    </tr>
                    <tr>
                      <td>Property Status</td>
                      <td>{property.status}</td>
                    </tr>
                    <tr>
                      <td>Approval Status</td>
                      <td>{property.approval_status}</td>
                    </tr>
                    <tr>
                      <td>Listed On</td>
                      <td>{property.created_at}</td>
                    </tr>
                    <tr>
                      <td>Owner Name</td>
                      <td>{property.owner_name}</td>
                    </tr>
                    <tr>
                      <td>Owner Contact</td>
                      <td>{property.owner_contact}</td>
                    </tr>
                    <tr>
                      <td>Owner Email</td>
                      <td>{property.owner_email}</td>
                    </tr>
                    <tr>
                      <td>Latitude</td>
                      <td>{property.latitude}</td>
                    </tr>
                    <tr>
                      <td>Longitude</td>
                      <td>{property.longitude}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentMyPropertyDetails;