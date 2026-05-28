


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

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return 'N/A';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   // Filter providers based on search term
//   const filteredProviders = providers.filter(provider => {
//     const searchTermLower = searchTerm.toLowerCase();
//     return (
//       provider.full_name?.toLowerCase().includes(searchTermLower) ||
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

//   const handleViewDetails = (providerId) => {
//     navigate(`/service-provider-details/${providerId}`);
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
//                 placeholder="Search by name, business, service, area, city, or email..."
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

//         <h1 className="text-center mb-4 display-6 fw-bold">Service Providers</h1>
        
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
//               <div 
//                 className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card"
//                 style={{ cursor: 'pointer' }}
//                 // onClick={() => handleViewDetails(provider.provider_id)}
//               >
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
//                         alt={provider.full_name}
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
//                   {/* Full Name */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-person-fill text-primary fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small">
//                       <strong>Name:</strong> {provider.full_name}
//                     </div>
//                   </div>
                  
//                   {/* Business Name */}
//                   {provider.business_name && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-building-fill text-secondary fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Business:</strong> {provider.business_name}
//                       </div>
//                     </div>
//                   )}
                  
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

//                   {/* City */}
//                   {provider.city && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-geo-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>City:</strong> {provider.city}
//                       </div>
//                     </div>
//                   )}

//                   {/* Address - Truncated */}
//                   {provider.address && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-house-door-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small text-truncate" title={provider.address}>
//                         <strong>Address:</strong> {provider.address}
//                       </div>
//                     </div>
//                   )}

//                   {/* Email - Truncated */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-envelope-fill text-warning fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small text-truncate" title={provider.email}>
//                       <strong>Email:</strong> {provider.email || 'N/A'}
//                     </div>
//                   </div>

//                   {/* Phone */}
//                   <div className="mb-2 d-flex align-items-start gap-2">
//                     <i className="bi bi-telephone-fill text-success fs-6 mt-1 flex-shrink-0"></i>
//                     <div className="small">
//                       <strong>Phone:</strong> {provider.mobile_number}
//                     </div>
//                   </div>

//                   {/* Service Charge Type - Added after phone */}
//                   {provider.service_charge_type && (
//                     <div className="mb-2 d-flex align-items-start gap-2">
//                       <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
//                       <div className="small">
//                         <strong>Service Charge Type:</strong> {provider.service_charge_type}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer with Service Charges */}
//                 <div className="card-footer bg-white border-0 pb-3 pt-0">
//                   {provider.service_charges && (
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="text-muted small">Service Charges:</span>
//                       <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
//                         {formatCurrency(provider.service_charges)}
//                       </span>
//                     </div>
//                   )}
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
  
  // Booking Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingData, setBookingData] = useState({
    user: localStorage.getItem('user_id') || 1,
    service_provider: null,
    service_start_date: '',
    service_end_date: '',
    number_of_hours: '',
    number_of_days: '',
    address: '',
    booking_notes: '',
    payment_status: 'Pending',
    booking_status: 'Pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');

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
    navigate(-1);
  };

  const handleViewDetails = (providerId) => {
    navigate(`/service-provider-details/${providerId}`);
  };

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setBookingData({
      ...bookingData,
      service_provider: provider.provider_id,
      service_start_date: '',
      service_end_date: '',
      number_of_hours: '',
      number_of_days: '',
      address: '',
      booking_notes: '',
    });
    setBookingError('');
    setShowModal(true);
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-calculate end date for contract bookings
    if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Contract') {
      const startDate = bookingData.service_start_date;
      if (startDate && value) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + parseInt(value));
        const endDateStr = end.toISOString().split('T')[0];
        setBookingData(prev => ({
          ...prev,
          service_end_date: endDateStr
        }));
      }
    }
    
    // For Per Day, set end date based on number of days
    if (name === 'number_of_days' && selectedProvider?.service_charge_type === 'Per Day') {
      const startDate = bookingData.service_start_date;
      if (startDate && value) {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + parseInt(value) - 1);
        const endDateStr = end.toISOString().split('T')[0];
        setBookingData(prev => ({
          ...prev,
          service_end_date: endDateStr
        }));
      }
    }
    
    // For Per Hour, set end date same as start date
    if (name === 'service_start_date' && selectedProvider?.service_charge_type === 'Per Hour') {
      setBookingData(prev => ({
        ...prev,
        service_end_date: value
      }));
    }
  };

  const validateBookingForm = () => {
    if (!bookingData.service_start_date) {
      setBookingError('Please select start date');
      return false;
    }
    
    if (!bookingData.address.trim()) {
      setBookingError('Please enter address');
      return false;
    }
    
    if (selectedProvider?.service_charge_type === 'Per Hour') {
      if (!bookingData.number_of_hours || bookingData.number_of_hours <= 0) {
        setBookingError('Please enter valid number of hours');
        return false;
      }
    } else if (selectedProvider?.service_charge_type === 'Per Day' || selectedProvider?.service_charge_type === 'Contract') {
      if (!bookingData.number_of_days || bookingData.number_of_days <= 0) {
        setBookingError('Please enter valid number of days');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmitBooking = async () => {
    if (!validateBookingForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let payload = {};
      const providerType = selectedProvider?.service_charge_type;
      
      if (providerType === 'Per Hour') {
        payload = {
          user: parseInt(bookingData.user),
          service_provider: bookingData.service_provider,
          service_start_date: bookingData.service_start_date,
          service_end_date: bookingData.service_end_date || bookingData.service_start_date,
          number_of_hours: parseInt(bookingData.number_of_hours),
          address: bookingData.address,
          booking_notes: bookingData.booking_notes,
          payment_status: bookingData.payment_status,
          booking_status: bookingData.booking_status
        };
      } else if (providerType === 'Per Day') {
        payload = {
          user: parseInt(bookingData.user),
          service_provider: bookingData.service_provider,
          service_start_date: bookingData.service_start_date,
          service_end_date: bookingData.service_end_date,
          number_of_days: parseInt(bookingData.number_of_days),
          address: bookingData.address,
          booking_notes: bookingData.booking_notes,
          payment_status: bookingData.payment_status,
          booking_status: bookingData.booking_status
        };
      } else if (providerType === 'Contract') {
        payload = {
          user: parseInt(bookingData.user),
          service_provider: bookingData.service_provider,
          service_start_date: bookingData.service_start_date,
          service_end_date: bookingData.service_end_date,
          number_of_days: parseInt(bookingData.number_of_days),
          address: bookingData.address,
          booking_notes: bookingData.booking_notes,
          payment_status: bookingData.payment_status,
          booking_status: bookingData.booking_status
        };
      }
      
      const response = await fetch(`${baseurl}/service-bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Booking failed');
      }
      
      const result = await response.json();
      
      // Close modal and show success message
      setShowModal(false);
      alert('Booking created successfully!');
      
      // Reset form
      setBookingData({
        user: localStorage.getItem('user_id') || 1,
        service_provider: null,
        service_start_date: '',
        service_end_date: '',
        number_of_hours: '',
        number_of_days: '',
        address: '',
        booking_notes: '',
        payment_status: 'Pending',
        booking_status: 'Pending'
      });
      setSelectedProvider(null);
      
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProvider(null);
    setBookingError('');
  };

  // Calculate total price based on service charge type
  const calculateTotalPrice = () => {
    if (!selectedProvider) return 0;
    const rate = parseFloat(selectedProvider.service_charges) || 0;
    
    if (selectedProvider.service_charge_type === 'Per Hour') {
      const hours = parseInt(bookingData.number_of_hours) || 0;
      return rate * hours;
    } else if (selectedProvider.service_charge_type === 'Per Day') {
      const days = parseInt(bookingData.number_of_days) || 0;
      return rate * days;
    } else if (selectedProvider.service_charge_type === 'Contract') {
      const days = parseInt(bookingData.number_of_days) || 0;
      return rate * days;
    }
    return 0;
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
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
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

                  {/* Service Charge Type */}
                  {provider.service_charge_type && (
                    <div className="mb-2 d-flex align-items-start gap-2">
                      <i className="bi bi-clock-fill text-info fs-6 mt-1 flex-shrink-0"></i>
                      <div className="small">
                        <strong>Service Charge Type:</strong> {provider.service_charge_type}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer with Service Charges and Book Now Button */}
                <div className="card-footer bg-white border-0 pb-3 pt-0">
                  {provider.service_charges && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted small">Service Charges:</span>
                      <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                        {formatCurrency(provider.service_charges)}
                      </span>
                    </div>
                  )}
                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => handleBookNow(provider)}
                    style={{ backgroundColor: '#273c75', borderColor: '#273c75' }}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showModal && selectedProvider && (
          <div 
            className="modal show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={closeModal}
          >
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: '#273c75', color: 'white' }}>
                  <h5 className="modal-title">
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Service - {selectedProvider.full_name}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {bookingError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {bookingError}
                      <button type="button" className="btn-close" onClick={() => setBookingError('')}></button>
                    </div>
                  )}
                  
                  {/* Provider Details Summary */}
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title mb-3">Service Provider Details</h6>
                          <p className="mb-1"><strong>Name:</strong> {selectedProvider.full_name}</p>
                          <p className="mb-1"><strong>Service:</strong> {getServiceName(selectedProvider.service_category)}</p>
                          <p className="mb-1"><strong>Charge Type:</strong> {selectedProvider.service_charge_type}</p>
                          <p className="mb-0"><strong>Rate:</strong> {formatCurrency(selectedProvider.service_charges)}</p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title mb-3">Booking Summary</h6>
                          <p className="mb-1"><strong>Service Type:</strong> {selectedProvider.service_charge_type}</p>
                          {selectedProvider.service_charge_type === 'Per Hour' && bookingData.number_of_hours && (
                            <p className="mb-1"><strong>Hours:</strong> {bookingData.number_of_hours}</p>
                          )}
                          {(selectedProvider.service_charge_type === 'Per Day' || selectedProvider.service_charge_type === 'Contract') && bookingData.number_of_days && (
                            <p className="mb-1"><strong>Days:</strong> {bookingData.number_of_days}</p>
                          )}
                          <p className="mb-0"><strong>Total Amount:</strong> <span className="text-success fw-bold">{formatCurrency(calculateTotalPrice())}</span></p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  
                  <form>
                    <div className="row">
                      {/* Service Start Date */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Service Start Date *</label>
                        <input
                          type="date"
                          name="service_start_date"
                          value={bookingData.service_start_date}
                          onChange={handleBookingInputChange}
                          className="form-control"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      
                      {/* Duration based on charge type */}
                      {selectedProvider.service_charge_type === 'Per Hour' && (
                        <>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Number of Hours *</label>
                            <input
                              type="number"
                              name="number_of_hours"
                              value={bookingData.number_of_hours}
                              onChange={handleBookingInputChange}
                              className="form-control"
                              placeholder="Enter hours"
                              min="1"
                              step="1"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Service End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={bookingData.service_start_date}
                              disabled
                            />
                            <small className="text-muted">Same as start date for hourly booking</small>
                          </div>
                        </>
                      )}
                      
                      {(selectedProvider.service_charge_type === 'Per Day' || selectedProvider.service_charge_type === 'Contract') && (
                        <>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Number of Days *</label>
                            <input
                              type="number"
                              name="number_of_days"
                              value={bookingData.number_of_days}
                              onChange={handleBookingInputChange}
                              className="form-control"
                              placeholder="Enter days"
                              min="1"
                              step="1"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Service End Date</label>
                            <input
                              type="date"
                              name="service_end_date"
                              value={bookingData.service_end_date}
                              onChange={handleBookingInputChange}
                              className="form-control"
                              min={bookingData.service_start_date}
                              required
                            />
                            <small className="text-muted">Automatically calculated based on days</small>
                          </div>
                        </>
                      )}
                      
                      {/* Address */}
                      <div className="col-12 mb-3">
                        <label className="form-label fw-bold">Service Address *</label>
                        <textarea
                          name="address"
                          value={bookingData.address}
                          onChange={handleBookingInputChange}
                          className="form-control"
                          rows="3"
                          placeholder="Enter full service address"
                          required
                        ></textarea>
                      </div>
                      
                      {/* Booking Notes */}
                      <div className="col-12 mb-3">
                        <label className="form-label fw-bold">Additional Notes (Optional)</label>
                        <textarea
                          name="booking_notes"
                          value={bookingData.booking_notes}
                          onChange={handleBookingInputChange}
                          className="form-control"
                          rows="2"
                          placeholder="Any special requirements or instructions"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#273c75', borderColor: '#273c75' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
        
        .modal {
          z-index: 1050;
        }
      `}</style>
    </>
  );
};

export default ServiceProviders;