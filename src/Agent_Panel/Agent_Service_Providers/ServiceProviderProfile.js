


// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// // import { baseurl } from '../../BaseURL/BaseURL';

// // const ServiceProviders = () => {
// //   const navigate = useNavigate();
// //   const [providers, setProviders] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Fetch both service providers and service categories
// //     const fetchData = async () => {
// //       try {
// //         const [providersResponse, categoriesResponse] = await Promise.all([
// //           fetch(`${baseurl}/service-providers/`),
// //           fetch(`${baseurl}/service-categories/`)
// //         ]);

// //         if (!providersResponse.ok || !categoriesResponse.ok) {
// //           throw new Error('Network response was not ok');
// //         }

// //         const providersData = await providersResponse.json();
// //         const categoriesData = await categoriesResponse.json();

// //         setProviders(providersData.results || []);
// //         setCategories(categoriesData.results || []);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Function to get service name by category ID
// //   const getServiceName = (categoryId) => {
// //     const category = categories.find(cat => cat.category_id === categoryId);
// //     return category ? category.category_name : 'Unknown Service';
// //   };

// //   const handleGoBack = () => {
// //     navigate(-1); // Goes back to previous page
// //   };

// //   if (loading) {
// //     return (
// //       <div className="d-flex justify-content-center align-items-center min-vh-100">
// //         <div className="spinner-border text-primary" role="status">
// //           <span className="visually-hidden">Loading...</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="container mt-5">
// //         <div className="alert alert-danger" role="alert">
// //           Error loading data: {error}
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (providers.length === 0) {
// //     return (
// //       <div className="container mt-5">
// //         <div className="alert alert-info" role="alert">
// //           No service providers found.
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <AgentNavbar />
// //       <div className="container py-4">
// //         {/* Back Button */}
// //         <div className="mb-4">
// //           <button 
// //             onClick={handleGoBack}
// //             className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
// //             style={{ borderRadius: '6px', padding: '8px 20px' }}
// //           >
// //             <i className="bi bi-arrow-left"></i>
// //             Back
// //           </button>
// //         </div>

// //         <h1 className="text-center mb-4 display-6 fw-bold">Our Service Providers</h1>
// //         <div className="row g-4">
// //           {providers.map((provider) => (
// //             <div key={provider.provider_id} className="col-12">
// //               <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
// //                 <div className="row g-0">
// //                   {/* Left side - Image (30%) */}
// //                   <div className="col-12 col-sm-4">
// //                     <div className="h-100 bg-light d-flex align-items-center justify-content-center p-3">
// //                       {provider.photo ? (
// //                         <img
// //                           src={`${baseurl}${provider.photo}`}
// //                           alt={provider.business_name}
// //                           className="img-fluid rounded-3 object-fit-cover"
// //                           style={{ 
// //                             width: '100%', 
// //                             height: '200px', 
// //                             objectFit: 'cover' 
// //                           }}
// //                           onError={(e) => {
// //                             e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
// //                           }}
// //                         />
// //                       ) : (
// //                         <div 
// //                           className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 rounded-3"
// //                           style={{ width: '100%', height: '200px' }}
// //                         >
// //                           <span className="text-muted">No Image</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Right side - Content (70%) */}
// //                   <div className="col-12 col-sm-8">
// //                     <div className="card-body p-3 p-md-4">
// //                       <h3 className="card-title fw-bold mb-2">{provider.business_name}</h3>
                      
// //                       {/* Service Name - Added before service area */}
// //                       <div className="mb-2 d-flex align-items-start gap-2">
// //                         <i className="bi bi-briefcase-fill text-danger fs-5 mt-1"></i>
// //                         <div>
// //                           <strong>Service Name:</strong> {getServiceName(provider.service_category)}
// //                         </div>
// //                       </div>

// //                       {provider.service_area && (
// //                         <div className="mb-2 d-flex align-items-start gap-2">
// //                           <i className="bi bi-geo-alt-fill text-primary fs-5 mt-1"></i>
// //                           <div>
// //                             <strong>Service Area:</strong> {provider.service_area}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {provider.address && (
// //                         <div className="mb-2 d-flex align-items-start gap-2">
// //                           <i className="bi bi-house-door-fill text-success fs-5 mt-1"></i>
// //                           <div>
// //                             <strong>Address:</strong> {provider.address}
// //                             {provider.city && `, ${provider.city}`}
// //                             {provider.state && `, ${provider.state}`}
// //                             {provider.pin_code && ` - ${provider.pin_code}`}
// //                           </div>
// //                         </div>
// //                       )}

// //                       <div className="mb-2 d-flex align-items-start gap-2">
// //                         <i className="bi bi-envelope-fill text-warning fs-5 mt-1"></i>
// //                         <div>
// //                           <strong>Email:</strong> {provider.email}
// //                         </div>
// //                       </div>

// //                       <div className="mb-3 d-flex align-items-start gap-2">
// //                         <i className="bi bi-telephone-fill text-info fs-5 mt-1"></i>
// //                         <div>
// //                           <strong>Phone:</strong> {provider.mobile_number}
// //                         </div>
// //                       </div>

// //                       {/* {provider.service_charges && (
// //                         <div className="mt-3">
// //                           <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
// //                             ₹{parseFloat(provider.service_charges).toLocaleString('en-IN')}
// //                           </span>
// //                         </div>
// //                       )} */}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Bootstrap Icons CDN */}
// //         <link 
// //           rel="stylesheet" 
// //           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
// //         />
// //       </div>
// //     </>
// //   );
// // };

// // export default ServiceProviders;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';

// const ServiceProviders = () => {
//   const navigate = useNavigate();
//   const [providers, setProviders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch both service providers and service categories
//     const fetchData = async () => {
//       try {
//         const [providersResponse, categoriesResponse] = await Promise.all([
//           fetch(`${baseurl}/service-providers/`),
//           fetch(`${baseurl}/service-categories/`)
//         ]);

//         if (!providersResponse.ok || !categoriesResponse.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const providersData = await providersResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         setProviders(providersData.results || []);
//         setCategories(categoriesData.results || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to get service name by category ID
//   const getServiceName = (categoryId) => {
//     const category = categories.find(cat => cat.category_id === categoryId);
//     return category ? category.category_name : 'Unknown Service';
//   };

//   const handleGoBack = () => {
//     navigate(-1); // Goes back to previous page
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           Error loading data: {error}
//         </div>
//       </div>
//     );
//   }

//   if (providers.length === 0) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-info" role="alert">
//           No service providers found.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4">
//         {/* Back Button */}
//         <div className="mb-4">
//           <button 
//             onClick={handleGoBack}
//             className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
//             style={{ borderRadius: '6px', padding: '8px 20px' }}
//           >
//             <i className="bi bi-arrow-left"></i>
//             Back
//           </button>
//         </div>

//         <h1 className="text-center mb-4 display-6 fw-bold"> Service Providers</h1>
        
//         {/* Grid Layout - 4 cards per row on desktop */}
//         <div className="row g-4">
//           {providers.map((provider) => (
//             <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
//               <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
//                 {/* Image Section */}
//                 <div className="card-img-top p-3 bg-light" style={{ height: '250px' }}>
//                   {provider.photo ? (
//                     <img
//                       src={`${baseurl}${provider.photo}`}
//                       alt={provider.business_name}
//                       className="img-fluid rounded-3"
//                       style={{ 
//                         width: '100%', 
//                         height: '100%', 
//                         objectFit: 'cover' 
//                       }}
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
//                       }}
//                     />
//                   ) : (
//                     <div 
//                       className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 rounded-3"
//                       style={{ width: '100%', height: '100%' }}
//                     >
//                       <span className="text-muted">No Image</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Content Section */}
//                 <div className="card-body p-3">
//                   <h5 className="card-title fw-bold mb-2 text-truncate" title={provider.business_name}>
//                     {provider.business_name}
//                   </h5>
                  
//                   {/* Service Name */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small">
//                       <strong>Service:</strong> {getServiceName(provider.service_category)}
//                     </div>
//                   </div>

//                   {/* Service Area */}
//                   {provider.service_area && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Area:</strong> {provider.service_area}
//                       </div>
//                     </div>
//                   )}

//                   {/* Address - Truncated */}
//                   {provider.address && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-house-door-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small text-truncate" title={`${provider.address}${provider.city ? `, ${provider.city}` : ''}${provider.state ? `, ${provider.state}` : ''}`}>
//                         <strong>Address:</strong> {provider.address}
//                         {provider.city && `, ${provider.city}`}
//                         {provider.state && `, ${provider.state}`}
//                       </div>
//                     </div>
//                   )}

//                   {/* Email - Truncated */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small text-truncate" title={provider.email}>
//                       <strong>Email:</strong> {provider.email}
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-telephone-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small">
//                       <strong>Phone:</strong> {provider.mobile_number}
//                     </div>
//                   </div>
//                 </div>

            
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bootstrap Icons CDN */}
//         <link 
//           rel="stylesheet" 
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
//         />
//       </div>

//       {/* Custom CSS for hover effects */}
//       <style jsx>{`
//         .hover-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .hover-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
//         }
//       `}</style>
//     </>
//   );
// };

// export default ServiceProviders;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';

// const ServiceProviders = () => {
//   const navigate = useNavigate();
//   const [providers, setProviders] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // Fetch both service providers and service categories
//     const fetchData = async () => {
//       try {
//         const [providersResponse, categoriesResponse] = await Promise.all([
//           fetch(`${baseurl}/service-providers/`),
//           fetch(`${baseurl}/service-categories/`)
//         ]);

//         if (!providersResponse.ok || !categoriesResponse.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const providersData = await providersResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         setProviders(providersData.results || []);
//         setCategories(categoriesData.results || []);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to get service name by category ID
//   const getServiceName = (categoryId) => {
//     const category = categories.find(cat => cat.category_id === categoryId);
//     return category ? category.category_name : 'Unknown Service';
//   };

//   // Filter providers based on search term
//   const filteredProviders = providers.filter(provider => {
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       provider.business_name?.toLowerCase().includes(searchTermLower) ||
//       getServiceName(provider.service_category)?.toLowerCase().includes(searchTermLower) ||
//       provider.service_area?.toLowerCase().includes(searchTermLower) ||
//       provider.city?.toLowerCase().includes(searchTermLower) ||
//       provider.email?.toLowerCase().includes(searchTermLower)
//     );
//   });

//   const handleGoBack = () => {
//     navigate(-1); // Goes back to previous page
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center min-vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           Error loading data: {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="container py-4">
//         {/* Back Button and Search Bar Row */}
//         <div className="row mb-4 align-items-center">
//           <div className="col-12 col-md-4 mb-3 mb-md-0">
//             <button 
//               onClick={handleGoBack}
//               className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
//               style={{ borderRadius: '6px', padding: '8px 20px' }}
//             >
//               <i className="bi bi-arrow-left"></i>
//               Back
//             </button>
//           </div>
//           <div className="col-12 col-md-8">
//             <div className="input-group" style={{ maxWidth: '500px', marginLeft: 'auto' }}>
//               <span className="input-group-text bg-white">
//                 <i className="bi bi-search"></i>
//               </span>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search by business name, service, area, city, or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ borderRadius: '0 6px 6px 0' }}
//               />
//               {searchTerm && (
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   <i className="bi bi-x-lg"></i>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <h1 className="text-center mb-4 display-6 fw-bold"> Service Providers</h1>
        
//         {/* Search Results Count */}
//         {searchTerm && (
//           <div className="text-center mb-3">
//             <p className="text-muted">
//               Found {filteredProviders.length} result{filteredProviders.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         )}

//         {/* No Results Message */}
//         {filteredProviders.length === 0 && (
//           <div className="text-center py-5">
//             <i className="bi bi-search display-1 text-muted"></i>
//             <h3 className="mt-3">No service providers found</h3>
//             <p className="text-muted">Try adjusting your search criteria</p>
//             <button 
//               className="btn btn-primary mt-2"
//               onClick={() => setSearchTerm('')}
//             >
//               Clear Search
//             </button>
//           </div>
//         )}

//         {/* Grid Layout - 4 cards per row on desktop */}
//         <div className="row g-4">
//           {filteredProviders.map((provider) => (
//             <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
//               <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
//                 {/* Image Section - Fixed Size */}
//                 <div className="card-img-top p-3 bg-light d-flex align-items-center justify-content-center">
//                   <div 
//                     style={{ 
//                       width: '100%', 
//                       height: '200px',
//                       maxWidth: '300px',
//                       margin: '0 auto'
//                     }}
//                   >
//                     {provider.photo ? (
//                       <img
//                         src={`${baseurl}${provider.photo}`}
//                         alt={provider.business_name}
//                         style={{ 
//                           width: '100%', 
//                           height: '100%', 
//                           objectFit: 'cover',
//                           borderRadius: '8px'
//                         }}
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                         }}
//                       />
//                     ) : (
//                       <div 
//                         className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
//                         style={{ 
//                           width: '100%', 
//                           height: '100%', 
//                           borderRadius: '8px'
//                         }}
//                       >
//                         <span className="text-muted">No Image</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="card-body p-3">
//                   <h5 className="card-title fw-bold mb-2 text-truncate" title={provider.business_name}>
//                     {provider.business_name}
//                   </h5>
                  
//                   {/* Service Name */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small">
//                       <strong>Service:</strong> {getServiceName(provider.service_category)}
//                     </div>
//                   </div>

//                   {/* Service Area */}
//                   {provider.service_area && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Area:</strong> {provider.service_area}
//                       </div>
//                     </div>
//                   )}

//                   {/* Address - Truncated */}
//                   {provider.address && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-house-door-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small text-truncate" title={`${provider.address}${provider.city ? `, ${provider.city}` : ''}${provider.state ? `, ${provider.state}` : ''}`}>
//                         <strong>Address:</strong> {provider.address}
//                         {provider.city && `, ${provider.city}`}
//                         {provider.state && `, ${provider.state}`}
//                       </div>
//                     </div>
//                   )}

//                   {/* Email - Truncated */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small text-truncate" title={provider.email}>
//                       <strong>Email:</strong> {provider.email}
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-telephone-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small">
//                       <strong>Phone:</strong> {provider.mobile_number}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Optional Footer with Service Charges */}
//                 {/* {provider.service_charges && (
//                   <div className="card-footer bg-white border-0 pb-3 pt-0">
//                     <span className="badge bg-success fs-6 px-3 py-2 rounded-pill w-100 text-center">
//                       ₹{parseFloat(provider.service_charges).toLocaleString('en-IN')}
//                     </span>
//                   </div>
//                 )} */}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bootstrap Icons CDN */}
//         <link 
//           rel="stylesheet" 
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
//         />
//       </div>

//       {/* Custom CSS for hover effects and responsive image */}
//       <style jsx>{`
//         .hover-card {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .hover-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
//         }
        
//         /* Ensure image container maintains fixed size on all devices */
//         .card-img-top {
//           min-height: 200px;
//           max-height: 200px;
//         }
        
//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .card-img-top div {
//             width: 100% !important;
//             height: 200px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default ServiceProviders;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';

const ServiceProviders = () => {
  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch both service providers and service categories
    const fetchData = async () => {
      try {
        const [providersResponse, categoriesResponse] = await Promise.all([
          fetch(`${baseurl}/service-providers/`),
          fetch(`${baseurl}/service-categories/`)
        ]);

        if (!providersResponse.ok || !categoriesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const providersData = await providersResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProviders(providersData.results || []);
        setCategories(categoriesData.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to get service name by category ID
  const getServiceName = (categoryId) => {
    const category = categories.find(cat => cat.category_id === categoryId);
    return category ? category.category_name : 'Unknown Service';
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Filter providers based on search term
  const filteredProviders = providers.filter(provider => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      provider.full_name?.toLowerCase().includes(searchTermLower) ||
      provider.business_name?.toLowerCase().includes(searchTermLower) ||
      getServiceName(provider.service_category)?.toLowerCase().includes(searchTermLower) ||
      provider.service_area?.toLowerCase().includes(searchTermLower) ||
      provider.city?.toLowerCase().includes(searchTermLower) ||
      provider.email?.toLowerCase().includes(searchTermLower)
    );
  });

  const handleGoBack = () => {
    navigate(-1); // Goes back to previous page
  };

  const handleViewDetails = (providerId) => {
    navigate(`/service-provider-details/${providerId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Error loading data: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <AgentNavbar />
      <div className="container py-4">
        {/* Back Button and Search Bar Row */}
        <div className="row mb-4 align-items-center">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <button 
              onClick={handleGoBack}
              className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
              style={{ borderRadius: '6px', padding: '8px 20px' }}
            >
              <i className="bi bi-arrow-left"></i>
              Back
            </button>
          </div>
          <div className="col-12 col-md-8">
            <div className="input-group" style={{ maxWidth: '500px', marginLeft: 'auto' }}>
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, business, service, area, city, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '0 6px 6px 0' }}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        <h1 className="text-center mb-4 display-6 fw-bold">Service Providers</h1>
        
        {/* Search Results Count */}
        {searchTerm && (
          <div className="text-center mb-3">
            <p className="text-muted">
              Found {filteredProviders.length} result{filteredProviders.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* No Results Message */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h3 className="mt-3">No service providers found</h3>
            <p className="text-muted">Try adjusting your search criteria</p>
            <button 
              className="btn btn-primary mt-2"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Grid Layout - 4 cards per row on desktop */}
        <div className="row g-4">
          {filteredProviders.map((provider) => (
            <div key={provider.provider_id} className="col-12 col-sm-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card"
                style={{ cursor: 'pointer' }}
                onClick={() => handleViewDetails(provider.provider_id)}
              >
                {/* Image Section - Fixed Size */}
                <div className="card-img-top p-3 bg-light d-flex align-items-center justify-content-center">
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '200px',
                      maxWidth: '300px',
                      margin: '0 auto'
                    }}
                  >
                    {provider.photo ? (
                      <img
                        src={`${baseurl}${provider.photo}`}
                        alt={provider.full_name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    ) : (
                      <div 
                        className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          borderRadius: '8px'
                        }}
                      >
                        <span className="text-muted">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="card-body p-3">
                  {/* Full Name */}
                  <div className="mb-2 d-flex align-items-start gap-2">
                    <i className="bi bi-person-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
                    <div className="small">
                      <strong>Name:</strong> {provider.full_name}
                    </div>
                  </div>
                  
                  {/* Business Name */}
                  {provider.business_name && (
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-building-fill text-secondary fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small">
                        <strong>Business:</strong> {provider.business_name}
                      </div>
                    </div>
                  )}
                  
                  {/* Service Name */}
                  <div className="mb-2 d-flex align-items-start gap-2">
                    <i className="bi bi-briefcase-fill text-danger fs-6 mt-1 flex-shrink-0"></i>
                    <div className="small">
                      <strong>Service:</strong> {getServiceName(provider.service_category)}
                    </div>
                  </div>

                  {/* Service Area */}
                  {provider.service_area && (
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-geo-alt-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small">
                        <strong>Area:</strong> {provider.service_area}
                      </div>
                    </div>
                  )}

                  {/* City */}
                  {provider.city && (
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-geo-fill text-success fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small">
                        <strong>City:</strong> {provider.city}
                      </div>
                    </div>
                  )}

                  {/* Address - Truncated */}
                  {provider.address && (
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-house-door-fill text-info fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small text-truncate" title={provider.address}>
                        <strong>Address:</strong> {provider.address}
                      </div>
                    </div>
                  )}

                  {/* Email - Truncated */}
                  <div className="mb-2 d-flex align-items-start gap-2">
                    <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
                    <div className="small text-truncate" title={provider.email}>
                      <strong>Email:</strong> {provider.email || 'N/A'}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="mb-2 d-flex align-items-start gap-2">
                    <i className="bi bi-telephone-fill text-success fs-6 mt-1 flex-shrink-0"></i>
                    <div className="small">
                      <strong>Phone:</strong> {provider.mobile_number}
                    </div>
                  </div>

                  {/* Service Charge Type - Added after phone */}
                  {provider.service_charge_type && (
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small">
                        <strong>Service Charge Type:</strong> {provider.service_charge_type}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Service Charges */}
                <div className="card-footer bg-white border-0 pb-3 pt-0">
                  {provider.service_charges && (
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Service Charges:</span>
                      <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                        {formatCurrency(provider.service_charges)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bootstrap Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </div>

      {/* Custom CSS for hover effects and responsive image */}
      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        /* Ensure image container maintains fixed size on all devices */
        .card-img-top {
          min-height: 200px;
          max-height: 200px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .card-img-top div {
            width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceProviders;