// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   List,
//   LayoutList,
//   Filter,
//   User
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MyProperties.css";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";

// // ============= Utility Functions =============
// const formatPrice = (price) => {
//   const priceNum = parseFloat(price);
//   if (priceNum >= 10000000) {
//     return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
//   } else if (priceNum >= 100000) {
//     return `₹${(priceNum / 100000).toFixed(2)} L`;
//   }
//   return `₹${priceNum.toLocaleString()}`;
// };

// const getImageUrl = (images) => {
//   if (images && images.length > 0) {
//     const imagePath = images[0].image;
    
//     // Check if it's a relative path starting with /media/
//     if (imagePath.startsWith('/media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     // Check if it's a relative path without leading slash
//     if (imagePath.startsWith('media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     // Check if it's already a full URL
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
    
//     // For any other relative path
//     return `${baseurl}/${imagePath}`;
//   }
  
//   // Fallback image
//   return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// };

// // ============= Property Card Component =============
// const PropertyCard = ({ property }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/property/${property.property_id}`);
//   };

//   // Get the image URL
//   const imageUrl = getImageUrl(property.images);
  
//   const formattedPrice = property.looking_to === "sell" 
//     ? formatPrice(property.total_property_value || property.property_value)
//     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount 
//     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//     : '';

//   return (
//     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
//       <div className="position-relative">
//         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
//           <img
//             src={imageUrl}
//             alt={property.property_title}
//             className="img-fluid"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//             }}
//           />
//         </div>
//         <div className="position-absolute top-0 end-0 m-2">
//           <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
//             {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//           </span>
//         </div>
//         {property.status && (
//           <div className="position-absolute top-0 start-0 m-2">
//             <span className="badge bg-warning text-dark">
//               {property.status.toUpperCase()}
//             </span>
//           </div>
//         )}
//       </div>
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
//           {property.property_title}
//         </h6>
//         <p className="card-text text-muted small mb-2">
//           <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//         </p>
//         <div className="d-flex flex-wrap gap-1 mb-2">
//           {property.number_of_bedrooms && (
//             <span className="badge bg-light text-dark border small">
//               {property.number_of_bedrooms} BHK
//             </span>
//           )}
//           {property.facing && (
//             <span className="badge bg-light text-dark border small">
//               {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//             </span>
//           )}
//         </div>
//         <div className="d-flex align-items-center gap-2 mt-auto">
//           <span className="h5 fw-bold text-dark">
//             {formattedPrice}
//             {property.looking_to === "rent" && (
//               <small className="text-muted d-block">{depositText}</small>
//             )}
//           </span>
//         </div>
      
//         <button 
//           className="btn w-100 fw-semibold py-2 "
//           style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//         >
//           Payout
//         </button>
//         <button 
//           onClick={handleViewDetails}
//           className="btn w-100 fw-semibold py-2 mt-2"
//           style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//         >
//           {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============= Filter Section Component =============
// const FilterSection = ({ 
//   title, 
//   isOpen, 
//   onToggle, 
//   children 
// }) => {
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={onToggle}
//         className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
//         style={{ cursor: 'pointer' }}
//         aria-label={`Toggle ${title} filter section`}
//         aria-expanded={isOpen}
//       >
//         <span className="fw-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-5 w-5 text-muted" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-muted" />
//         )}
//       </button>
      
//       {isOpen && (
//         <div className="px-3 pb-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Sidebar Component =============
// const FilterSidebar = ({ 
//   selectedCategories, 
//   setSelectedCategories,
//   selectedTypes,
//   setSelectedTypes,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   selectedCities,
//   setSelectedCities,
//   selectedTransactionTypes,
//   setSelectedTransactionTypes,
//   selectedRoles,
//   setSelectedRoles,
//   categories,
//   propertyTypes,
//   roles,
//   loadingCategories,
//   loadingTypes,
//   loadingRoles,
//   onFilterChange
// }) => {
//   const [activeFilters, setActiveFilters] = useState({
//     transaction: true,
//     role: true,
//     categories: true,
//     price: true,
//     type: true,
//     location: true
//   });

//   const [categorySearch, setCategorySearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");
//   const [roleSearch, setRoleSearch] = useState("");

//   const priceRanges = [
//     { label: "Under ₹10L", min: 0, max: 1000000 },
//     { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
//     { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
//     { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//     { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
//     { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
//   ];

//   const cities = [
//     { name: "Karimnagar", count: 12 },
//     { name: "Hyderabad", count: 35 },
//     { name: "Visakhapatnam", count: 42 },
//     { name: "Nandyal", count: 38 },
//     { name: "Adoni", count: 19 },
//     { name: "Amudalavalasa", count: 22 },
//   ];

//   const transactionTypes = [
//     { name: "sell", displayName: "Sale", count: 65 },
//     { name: "rent", displayName: "Rent", count: 35 },
//   ];

//   const filteredCategories = useMemo(() => {
//     return categories.filter((cat) =>
//       cat.name.toLowerCase().includes(categorySearch.toLowerCase())
//     );
//   }, [categories, categorySearch]);

//   const filteredTypes = useMemo(() => {
//     return propertyTypes.filter((type) =>
//       type.name.toLowerCase().includes(typeSearch.toLowerCase())
//     );
//   }, [propertyTypes, typeSearch]);

//   const filteredCities = useMemo(() => {
//     return cities.filter((city) =>
//       city.name.toLowerCase().includes(citySearch.toLowerCase())
//     );
//   }, [cities, citySearch]);

//   const filteredRoles = useMemo(() => {
//     return roles.filter((role) =>
//       role.role_name.toLowerCase().includes(roleSearch.toLowerCase())
//     );
//   }, [roles, roleSearch]);

//   const toggleFilterSection = (section) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCategory = useCallback((categoryName) => {
//     setSelectedCategories((prev) => {
//       const newSelection = prev.includes(categoryName)
//         ? prev.filter((c) => c !== categoryName)
//         : [...prev, categoryName];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedCategories, onFilterChange]);

//   const toggleType = useCallback((typeName) => {
//     setSelectedTypes((prev) => {
//       const newSelection = prev.includes(typeName)
//         ? prev.filter((b) => b !== typeName)
//         : [...prev, typeName];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedTypes, onFilterChange]);

//   const togglePriceRange = useCallback((range) => {
//     setSelectedPriceRanges((prev) => {
//       const newSelection = prev.includes(range)
//         ? prev.filter((r) => r !== range)
//         : [...prev, range];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedPriceRanges, onFilterChange]);

//   const toggleCity = useCallback((name) => {
//     setSelectedCities((prev) => {
//       const newSelection = prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedCities, onFilterChange]);

//   const toggleTransactionType = useCallback((type) => {
//     setSelectedTransactionTypes((prev) => {
//       const newSelection = prev.includes(type)
//         ? prev.filter((t) => t !== type)
//         : [...prev, type];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedTransactionTypes, onFilterChange]);

//   const toggleRole = useCallback((roleId) => {
//     setSelectedRoles((prev) => {
//       const newSelection = prev.includes(roleId)
//         ? prev.filter((r) => r !== roleId)
//         : [...prev, roleId];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedRoles, onFilterChange]);

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setSelectedRoles([]);
//     setCategorySearch("");
//     setTypeSearch("");
//     setCitySearch("");
//     setRoleSearch("");
    
//     if (onFilterChange) {
//       setTimeout(() => onFilterChange(), 0);
//     }
//   };

//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedTypes.length + 
//     selectedPriceRanges.length + 
//     selectedCities.length +
//     selectedTransactionTypes.length +
//     selectedRoles.length;

//   return (
//     <div className="w-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">
//           <Filter className="h-5 w-5 me-2" />
//           Filters
//         </h5>
//         {activeFilterCount > 0 && (
//           <button 
//             onClick={clearAllFilters}
//             className="btn btn-sm btn-outline-secondary"
//             aria-label="Clear all filters"
//           >
//             Clear All ({activeFilterCount})
//           </button>
//         )}
//       </div>

//       {/* Transaction Type Filter */}
//       <FilterSection
//         title="Looking For"
//         isOpen={activeFilters.transaction}
//         onToggle={() => toggleFilterSection('transaction')}
//       >
//         <div className="overflow-y-auto">
//           {transactionTypes.map((type) => (
//             <div
//               key={type.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleTransactionType(type.name)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleTransactionType(type.name)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedTransactionTypes.includes(type.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedTransactionTypes.includes(type.name)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.displayName}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({type.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Role Filter */}
//       {/* <FilterSection
//         title="User Role"
//         isOpen={activeFilters.role}
//         onToggle={() => toggleFilterSection('role')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search roles..."
//             value={roleSearch}
//             onChange={(e) => setRoleSearch(e.target.value)}
//             aria-label="Search roles"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingRoles ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading roles...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading roles...</p>
//             </div>
//           ) : filteredRoles.length === 0 ? (
//             <p className="small text-muted text-center py-3">No roles found</p>
//           ) : (
//             filteredRoles.map((role) => (
//               <div
//                 key={role.role_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleRole(role.role_id)}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleRole(role.role_id)}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedRoles.includes(role.role_id)}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedRoles.includes(role.role_id)}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedRoles.includes(role.role_id) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {role.role_name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection> */}

//       {/* Categories Filter */}
//       <FilterSection
//         title="Property Category"
//         isOpen={activeFilters.categories}
//         onToggle={() => toggleFilterSection('categories')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search categories..."
//             value={categorySearch}
//             onChange={(e) => setCategorySearch(e.target.value)}
//             aria-label="Search categories"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingCategories ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading categories...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading categories...</p>
//             </div>
//           ) : filteredCategories.length === 0 ? (
//             <p className="small text-muted text-center py-3">No categories found</p>
//           ) : (
//             filteredCategories.map((category) => (
//               <div
//                 key={category.property_category_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleCategory(category.name.toLowerCase())}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleCategory(category.name.toLowerCase())}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedCategories.includes(category.name.toLowerCase())}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedCategories.includes(category.name.toLowerCase())}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedCategories.includes(category.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {category.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Property Type Filter */}
//       <FilterSection
//         title="Property Type"
//         isOpen={activeFilters.type}
//         onToggle={() => toggleFilterSection('type')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search property types..."
//             value={typeSearch}
//             onChange={(e) => setTypeSearch(e.target.value)}
//             aria-label="Search property types"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingTypes ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading property types...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading property types...</p>
//             </div>
//           ) : filteredTypes.length === 0 ? (
//             <p className="small text-muted text-center py-3">No property types found</p>
//           ) : (
//             filteredTypes.map((type) => (
//               <div
//                 key={type.property_type_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleType(type.name.toLowerCase())}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleType(type.name.toLowerCase())}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedTypes.includes(type.name.toLowerCase())}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedTypes.includes(type.name.toLowerCase())}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedTypes.includes(type.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {type.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Price Filter */}
//       <FilterSection
//         title="Price Range"
//         isOpen={activeFilters.price}
//         onToggle={() => toggleFilterSection('price')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {priceRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => togglePriceRange(range.label)}
//               onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.label)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedPriceRanges.includes(range.label)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Location Filter */}
//       {/* <FilterSection
//         title="Location"
//         isOpen={activeFilters.location}
//         onToggle={() => toggleFilterSection('location')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search cities..."
//             value={citySearch}
//             onChange={(e) => setCitySearch(e.target.value)}
//             aria-label="Search cities"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredCities.map((city) => (
//             <div
//               key={city.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleCity(city.name)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleCity(city.name)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedCities.includes(city.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedCities.includes(city.name)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedCities.includes(city.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {city.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({city.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection> */}

//       {/* Active Filters Summary */}
//       {activeFilterCount > 0 && (
//         <div className="mt-4">
//           <h6 className="fw-semibold mb-2">Active Filters:</h6>
//           <div className="d-flex flex-wrap gap-2">
//             {selectedTransactionTypes.map(type => (
//               <span key={type} className="badge bg-info-subtle text-info border border-info d-flex align-items-center">
//                 {type === 'sell' ? 'Sale' : 'Rent'}
//                 <button 
//                   onClick={() => toggleTransactionType(type)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${type} filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedRoles.map(roleId => {
//               const role = roles.find(r => r.role_id === roleId);
//               return (
//                 <span key={roleId} className="badge bg-purple-subtle text-purple border border-purple d-flex align-items-center">
//                   {role?.role_name || 'Role'}
//                   <button 
//                     onClick={() => toggleRole(roleId)} 
//                     className="btn-close btn-close-sm ms-1"
//                     aria-label={`Remove ${role?.role_name} role filter`}
//                   ></button>
//                 </span>
//               );
//             })}
//             {selectedCategories.map(catName => (
//               <span key={catName} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
//                 {catName.charAt(0).toUpperCase() + catName.slice(1)}
//                 <button 
//                   onClick={() => toggleCategory(catName)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${catName} category filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedTypes.map(typeName => (
//               <span key={typeName} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
//                 {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
//                 <button 
//                   onClick={() => toggleType(typeName)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${typeName} type filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedPriceRanges.map(range => (
//               <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
//                 {range}
//                 <button 
//                   onClick={() => togglePriceRange(range)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${range} price filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedCities.map(city => (
//               <span key={city} className="badge bg-danger-subtle text-danger border border-danger d-flex align-items-center">
//                 {city}
//                 <button 
//                   onClick={() => toggleCity(city)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${city} location filter`}
//                 ></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Product Header Component =============
// const ProductHeader = ({
//   totalProducts,
//   showingProducts,
//   viewMode,
//   onViewModeChange,
//   searchTerm,
//   setSearchTerm,
//   sortOption,
//   setSortOption,
//   onSearch
// }) => {
//   const viewButtons = [
//     { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
//     { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
//     { mode: "list", icon: List, label: "List" },
//     { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
//   ];

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (onSearch) {
//       onSearch(value);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchTerm("");
//     if (onSearch) {
//       onSearch("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && onSearch) {
//       onSearch(searchTerm);
//     }
//   };

//   return (
//     <div className="row align-items-center justify-content-between mb-4">
//       <div className="col-md-6 mb-3 mb-md-0">
//         <div className="d-flex align-items-center">
//           <h4 className="fw-bold mb-0 me-3">Properties</h4>
//           <p className="mb-0 text-muted">
//             Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//             <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
//             properties
//           </p>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
//           <div className="input-group" style={{ width: '200px' }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search className="h-4 w-4 text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-sm border-start-0"
//               placeholder="Search properties..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onKeyPress={handleKeyPress}
//               aria-label="Search properties"
//             />
//             {searchTerm && (
//               <button
//                 onClick={handleClearSearch}
//                 className="btn btn-outline-secondary border-start-0"
//                 type="button"
//                 aria-label="Clear search"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <div className="btn-group" role="group" aria-label="View mode">
//             {viewButtons.map(({ mode, icon: Icon, label }) => (
//               <button
//                 key={mode}
//                 onClick={() => onViewModeChange(mode)}
//                 className={`btn btn-outline-secondary ${
//                   viewMode === mode ? "active" : ""
//                 }`}
//                 style={{ padding: '0.375rem 0.75rem' }}
//                 title={label}
//                 aria-label={`Switch to ${label} view`}
//               >
//                 <Icon className="h-4 w-4" />
//               </button>
//             ))}
//           </div>

//           <select 
//             className="form-select form-select-sm" 
//             style={{ width: '130px' }}
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             aria-label="Sort properties"
//           >
//             <option value="default">Sort By</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="newest">Newest First</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Grid Component =============
// const PropertyGrid = ({ properties, viewMode }) => {
//   const getGridClasses = () => {
//     switch (viewMode) {
//       case "grid-2":
//         return "row row-cols-1 row-cols-sm-2";
//       case "grid-3":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
//       case "grid-4":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//       case "list":
//         return "row row-cols-1";
//       default:
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//     }
//   };

//   const navigate = useNavigate();

//   // In list view mode, show properties differently
//   if (viewMode === "list") {
//     return (
//       <div className="list-group">
//         {properties.map((property) => {
//           const imageUrl = getImageUrl(property.images);
          
//           const getPriceInfo = () => {
//             if (property.looking_to === "sell") {
//               const price = property.total_property_value || property.property_value;
//               return {
//                 price: formatPrice(price),
//                 suffix: "",
//                 showDeposit: false
//               };
//             } else {
//               return {
//                 price: `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`,
//                 suffix: property.deposit_amount 
//                   ? `Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//                   : '',
//                 showDeposit: true
//               };
//             }
//           };

//           const priceInfo = getPriceInfo();

//           return (
//             <div key={property.property_id} className="list-group-item mb-3">
//               <div className="row g-3">
//                 <div className="col-md-3">
//                   <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
//                     <img
//                       src={imageUrl}
//                       alt={property.property_title}
//                       className="img-fluid"
//                       style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex align-items-start gap-2 mb-2">
//                     <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
//                     {property.status && (
//                       <span className="badge bg-warning text-dark small">
//                         {property.status.toUpperCase()}
//                       </span>
//                     )}
//                     <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                       {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//                     </span>
//                   </div>
//                   <p className="card-text text-muted small mb-2">
//                     <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//                   </p>
//                   <div className="d-flex flex-wrap gap-2 mb-2">
//                     {property.area && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.area} {property.area_unit || 'sq ft'}
//                       </span>
//                     )}
//                     {property.number_of_bedrooms && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.number_of_bedrooms} BHK
//                       </span>
//                     )}
//                     {property.facing && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//                       </span>
//                     )}
//                   </div>
//                   <div className="d-flex align-items-center gap-2">
//                     <span className="h5 fw-bold text-dark">
//                       {priceInfo.price}
//                       {priceInfo.showDeposit && priceInfo.suffix && (
//                         <small className="text-muted d-block">{priceInfo.suffix}</small>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-md-3 d-flex flex-column gap-2">
//                   <button 
//                     className="btn fw-semibold py-2"
//                     style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//                   >
//                     Payout
//                   </button>
//                   <button 
//                     onClick={() => navigate(`/property/${property.property_id}`)}
//                     className="btn fw-semibold py-2"
//                     style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//                   >
//                     {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   return (
//     <div className={getGridClasses()}>
//       {properties.map((property) => (
//         <div key={property.property_id} className="col mb-4">
//           <PropertyCard property={property} />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Main Filters Page Component =============
// const Properties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(true);
//   const [loadingRoles, setLoadingRoles] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("default");

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState([]);

//   // Dynamic data states
//   const [categories, setCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [roles, setRoles] = useState([]);

//   // Fetch roles from API
//   const fetchRoles = useCallback(async () => {
//     try {
//       setLoadingRoles(true);
//       const response = await fetch(`${baseurl}/roles/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setRoles(data.results || []);
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       setRoles([]);
//     } finally {
//       setLoadingRoles(false);
//     }
//   }, []);

//   // Fetch categories from API
//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoadingCategories(true);
//       const response = await fetch(`${baseurl}/property-categories/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCategories(data.results || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setCategories([]);
//     } finally {
//       setLoadingCategories(false);
//     }
//   }, []);

//   // Fetch property types from API
//   const fetchPropertyTypes = useCallback(async () => {
//     try {
//       setLoadingTypes(true);
//       const response = await fetch(`${baseurl}/property-types/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setPropertyTypes(data.results || []);
//     } catch (err) {
//       console.error("Error fetching property types:", err);
//       setPropertyTypes([]);
//     } finally {
//       setLoadingTypes(false);
//     }
//   }, []);

//   // Fetch properties from API with filters
//   const fetchProperties = useCallback(async () => {
//   try {
//     setLoading(true);
    
//     const params = new URLSearchParams();
    
//     // Get user_id from local storage
//     const userId = localStorage.getItem('user_id');
    
//     if (userId) {
//       params.append('user_id', userId);
//     } else {
//       // Handle case where user_id is not found in local storage
//       console.warn('user_id not found in local storage');
//       // Optionally, you could throw an error or handle it differently
//       // throw new Error('User ID not found in local storage');
//     }
    
//     if (searchTerm.trim()) {
//       params.append('keyword', searchTerm.trim());
//     }
    
//     if (selectedCategories.length > 0) {
//       const categoryQuery = selectedCategories.join(',');
//       params.append('category', categoryQuery);
//     }
    
//     if (selectedTypes.length > 0) {
//       const typeQuery = selectedTypes.join(',');
//       params.append('property_type', typeQuery);
//     }
    
//     if (selectedTransactionTypes.length > 0) {
//       const lookingToQuery = selectedTransactionTypes.join(',');
//       params.append('looking_to', lookingToQuery);
//     }
    
//     if (selectedCities.length > 0) {
//       params.append('city', selectedCities.join(','));
//     }
    
//     if (selectedRoles.length > 0) {
//       const roleIds = selectedRoles.join(',');
//       params.append('user_role', roleIds);
//     }
    
//     params.append('page', currentPage);
    
//     const queryString = params.toString();
// const url = `${baseurl}/properties/${queryString ? `?${queryString}` : ''}`;
    
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     setProperties(data.results || []);
//     setTotalCount(data.count || 0);
//     setTotalPages(Math.ceil((data.count || 0) / 10));
//   } catch (err) {
//     setError(err.message);
//     console.error("Error fetching properties:", err);
//   } finally {
//     setLoading(false);
//   }
// }, [
//   currentPage, 
//   selectedCategories, 
//   selectedTypes, 
//   selectedCities, 
//   selectedTransactionTypes,
//   selectedRoles,
//   searchTerm
//   // Note: We don't need to add localStorage as a dependency
//   // since it's synchronous and not a React state/prop
// ]);

//   // Handle filter changes
//   const handleFilterChange = useCallback(() => {
//     setCurrentPage(1);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchRoles();
//     fetchCategories();
//     fetchPropertyTypes();
//   }, [fetchRoles, fetchCategories, fetchPropertyTypes]);

//   // Fetch properties when filters or page change
//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   // Handle search
//   const handleSearch = useCallback((term) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   }, []);

//   // Filter properties based on price ranges (client-side only)
//   const filteredProperties = useMemo(() => {
//     if (selectedPriceRanges.length === 0) {
//       return properties;
//     }

//     return properties.filter(property => {
//       const price = parseFloat(property.looking_to === "sell" 
//         ? (property.total_property_value || property.property_value)
//         : property.rent_amount || 0);
      
//       return selectedPriceRanges.some(rangeLabel => {
//         switch (rangeLabel) {
//           case "Under ₹10L":
//             return price >= 0 && price <= 1000000;
//           case "₹10L - ₹25L":
//             return price >= 1000000 && price <= 2500000;
//           case "₹25L - ₹50L":
//             return price >= 2500000 && price <= 5000000;
//           case "₹50L - ₹1Cr":
//             return price >= 5000000 && price <= 10000000;
//           case "₹1Cr - ₹5Cr":
//             return price >= 10000000 && price <= 50000000;
//           case "Over ₹5Cr":
//             return price >= 50000000;
//           default:
//             return false;
//         }
//       });
//     });
//   }, [properties, selectedPriceRanges]);

//   // Sort properties
//   const sortedProperties = useMemo(() => {
//     return [...filteredProperties].sort((a, b) => {
//       switch (sortOption) {
//         case "price-low":
//           return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
//                   parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
//         case "price-high":
//           return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
//                   parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
//         case "newest":
//           return new Date(b.created_at) - new Date(a.created_at);
//         default:
//           return 0;
//       }
//     });
//   }, [filteredProperties, sortOption]);

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Render pagination
//   const renderPagination = () => {
//     if (totalPages <= 1) return null;
    
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button 
//             className="page-link" 
//             onClick={() => handlePageChange(i)}
//             aria-label={`Go to page ${i}`}
//             aria-current={currentPage === i ? 'page' : undefined}
//           >
//             {i}
//           </button>
//         </li>
//       );
//     }

//     return (
//       <nav aria-label="Page navigation" className="mt-5">
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Go to previous page"
//             >
//               Previous
//             </button>
//           </li>
//           {startPage > 1 && (
//             <>
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(1)}
//                   aria-label="Go to page 1"
//                 >
//                   1
//                 </button>
//               </li>
//               {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//             </>
//           )}
//           {pages}
//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(totalPages)}
//                   aria-label={`Go to page ${totalPages}`}
//                 >
//                   {totalPages}
//                 </button>
//               </li>
//             </>
//           )}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Go to next page"
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   if (loading && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading properties...</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (error && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="alert alert-danger" role="alert">
//               Error loading properties: {error}
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       <WebsiteNavbar />
      
//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             totalProducts={totalCount}
//             showingProducts={sortedProperties.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//             onSearch={handleSearch}
//           />

//           <div className="row">
//             <aside className="col-lg-3 mb-4 mb-lg-0">
//               <div className="" style={{ top: '20px' }}>
//                 <FilterSidebar
//                   selectedCategories={selectedCategories}
//                   setSelectedCategories={setSelectedCategories}
//                   selectedTypes={selectedTypes}
//                   setSelectedTypes={setSelectedTypes}
//                   selectedPriceRanges={selectedPriceRanges}
//                   setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedCities={selectedCities}
//                   setSelectedCities={setSelectedCities}
//                   selectedTransactionTypes={selectedTransactionTypes}
//                   setSelectedTransactionTypes={setSelectedTransactionTypes}
//                   selectedRoles={selectedRoles}
//                   setSelectedRoles={setSelectedRoles}
//                   categories={categories}
//                   propertyTypes={propertyTypes}
//                   roles={roles}
//                   loadingCategories={loadingCategories}
//                   loadingTypes={loadingTypes}
//                   loadingRoles={loadingRoles}
//                   onFilterChange={handleFilterChange}
//                 />
//               </div>
//             </aside>

//             <div className="col-lg-9">
//               {loading && sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-3">Loading properties...</p>
//                 </div>
//               ) : sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <h5>No properties found matching your criteria.</h5>
//                   <p className="text-muted">Try adjusting your filters or search term.</p>
//                 </div>
//               ) : (
//                 <>
//                   <PropertyGrid 
//                     properties={sortedProperties} 
//                     viewMode={viewMode}
//                   />
//                   {renderPagination()}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Properties;




// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   List,
//   LayoutList,
//   Filter,
//   User,
//   Edit,
//   Trash2,
//     Info

// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MyProperties.css";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// // ============= Utility Functions =============
// const formatPrice = (price) => {
//   const priceNum = parseFloat(price);
//   if (priceNum >= 10000000) {
//     return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
//   } else if (priceNum >= 100000) {
//     return `₹${(priceNum / 100000).toFixed(2)} L`;
//   }
//   return `₹${priceNum.toLocaleString()}`;
// };

// const getImageUrl = (images) => {
//   if (images && images.length > 0) {
//     const imagePath = images[0].image;
    
//     // Check if it's a relative path starting with /media/
//     if (imagePath.startsWith('/media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     // Check if it's a relative path without leading slash
//     if (imagePath.startsWith('media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     // Check if it's already a full URL
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
    
//     // For any other relative path
//     return `${baseurl}/${imagePath}`;
//   }
  
//   // Fallback image
//   return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// };



// // ============= Commission Tooltip Component =============
// const CommissionTooltip = ({ show, commissions, propertyValue }) => {
//   if (!show || !commissions || commissions.length === 0) return null;

//   // Calculate commission amounts based on property value
//   const calculateCommissions = () => {
//     const value = parseFloat(propertyValue) || 0;
//     return commissions.map(commission => ({
//       level: commission.level_no,
//       percentage: parseFloat(commission.percentage),
//       amount: (value * parseFloat(commission.percentage)) / 100
//     }));
//   };

//   const commissionList = calculateCommissions();
//   const totalCommission = commissionList.reduce((sum, comm) => sum + comm.amount, 0);

//   return (
//     <div className="commission-tooltip">
//       <div className="commission-tooltip-content">
//         {/* <div className="commission-header">
//           <h6 className="mb-2 fw-bold">Commission Details</h6>
//           <small className="text-muted">Based on property value: ₹{parseFloat(propertyValue || 0).toLocaleString()}</small>
//         </div> */}
//         <div className="commission-body">
//           {commissionList.map((commission) => (
//             <div key={commission.level} className="d-flex justify-content-between align-items-center mb-2">
//               <span className="fw-medium">Team {commission.level}:</span>
//               <div className="text-end">
//                 <span className="fw-bold text-success d-block">₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
//                 <small className="text-muted">({commission.percentage}%)</small>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* <div className="commission-footer mt-2 pt-2 border-top">
//           <div className="d-flex justify-content-between align-items-center">
//             <strong>Total Commission:</strong>
//             <strong className="text-success">₹{totalCommission.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };
// // ============= Property Card Component =============
// // const PropertyCard = ({ property, onDeleteProperty }) => {
// //   const navigate = useNavigate();
// //   const [isDeleting, setIsDeleting] = useState(false);

// //   const handleViewDetails = () => {
// //     navigate(`/property/${property.property_id}`);
// //   };

// //   const handleEditProperty = () => {
// //     navigate(`/myproperties/edit/${property.property_id}`);
// //   };

// //   // Handle delete property
// //   const handleDeleteProperty = async () => {
// //     // Show confirmation dialog
// //     const result = await Swal.fire({
// //       title: 'Are you sure?',
// //       text: `You are about to delete "${property.property_title}". This action cannot be undone!`,
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonColor: '#d33',
// //       cancelButtonColor: '#3085d6',
// //       confirmButtonText: 'Yes, delete it!',
// //       cancelButtonText: 'Cancel',
// //       reverseButtons: true
// //     });

// //     if (result.isConfirmed) {
// //       try {
// //         setIsDeleting(true);
        
// //         // Call the parent component's delete handler
// //         if (onDeleteProperty) {
// //           await onDeleteProperty(property.property_id);
// //         }
        
// //         // Show success message
// //         Swal.fire(
// //           'Deleted!',
// //           'The property has been deleted successfully.',
// //           'success'
// //         );
// //       } catch (error) {
// //         console.error('Error deleting property:', error);
// //         Swal.fire(
// //           'Error!',
// //           'Failed to delete the property. Please try again.',
// //           'error'
// //         );
// //       } finally {
// //         setIsDeleting(false);
// //       }
// //     }
// //   };

// //   // Get the image URL
// //   const imageUrl = getImageUrl(property.images);
  
// //   const formattedPrice = property.looking_to === "sell" 
// //     ? formatPrice(property.total_property_value || property.property_value)
// //     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

// //   const depositText = property.deposit_amount 
// //     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
// //     : '';

// //   return (
// //     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
// //       <div className="position-relative">
// //         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
// //           <img
// //             src={imageUrl}
// //             alt={property.property_title}
// //             className="img-fluid"
// //             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
// //             onError={(e) => {
// //               e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// //             }}
// //           />
// //         </div>
// //         <div className="position-absolute top-0 end-0 m-2">
// //           <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
// //             {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
// //           </span>
// //         </div>
// //         {property.status && (
// //           <div className="position-absolute top-0 start-0 m-2">
// //             <span className="badge bg-warning text-dark">
// //               {property.status.toUpperCase()}
// //             </span>
// //           </div>
// //         )}
// //       </div>
// //       <div className="card-body d-flex flex-column flex-grow-1">
// //         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
// //           {property.property_title}
// //         </h6>
// //         <p className="card-text text-muted small mb-2">
// //           <i className="bi bi-geo-alt"></i>  {property.city}
// //         </p>
// //         <div className="d-flex flex-wrap gap-1 mb-2">
// //           {property.number_of_bedrooms && (
// //             <span className="badge bg-light text-dark border small">
// //               {property.number_of_bedrooms} BHK
// //             </span>
// //           )}
// //           {property.facing && (
// //             <span className="badge bg-light text-dark border small">
// //               {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
// //             </span>
// //           )}
// //         </div>
// //         <div className="d-flex align-items-center gap-2 mt-auto">
// //           <span className="h5 fw-bold text-dark">
// //             {formattedPrice}
// //             {property.looking_to === "rent" && (
// //               <small className="text-muted d-block">{depositText}</small>
// //             )}
// //           </span>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="d-flex gap-2 mt-2">
// //           {/* EDIT BUTTON */}
// //           <button
// //             onClick={handleEditProperty}
// //             className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
// //             style={{
// //               backgroundColor: "#ffc107",
// //               borderColor: "#ffc107",
// //               color: "#000",
// //             }}
// //           >
// //             <Edit size={16} />
// //             <span>Edit</span>
// //           </button>
          
// //           {/* DELETE BUTTON */}
// //           <button
// //             onClick={handleDeleteProperty}
// //             disabled={isDeleting}
// //             className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
// //             style={{
// //               backgroundColor: "#dc3545",
// //               borderColor: "#dc3545",
// //               color: "#fff",
// //             }}
// //           >
// //             {isDeleting ? (
// //               <>
// //                 <div className="spinner-border spinner-border-sm" role="status">
// //                   <span className="visually-hidden">Deleting...</span>
// //                 </div>
// //                 <span>Deleting...</span>
// //               </>
// //             ) : (
// //               <>
// //                 <Trash2 size={16} />
// //                 <span>Delete</span>
// //               </>
// //             )}
// //           </button>
// //         </div>
      
// //         <button 
// //           className="btn w-100 fw-semibold py-2 mt-2"
// //           style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
// //         >
// //           Payout
// //         </button>
// //         <button 
// //           onClick={handleViewDetails}
// //           className="btn w-100 fw-semibold py-2 mt-2"
// //           style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
// //         >
// //           {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };


// // ============= Property Card Component =============
// // ============= Property Card Component =============
// const PropertyCard = ({ property, onDeleteProperty, commissionData }) => {
//   const navigate = useNavigate();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

//   const handleViewDetails = () => {
//     navigate(`/property/${property.property_id}`);
//   };

//   const handleEditProperty = () => {
//     navigate(`/myproperties/edit/${property.property_id}`);
//   };

//   // Handle delete property
//   const handleDeleteProperty = async () => {
//     // Show confirmation dialog
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${property.property_title}". This action cannot be undone!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//       reverseButtons: true
//     });

//     if (result.isConfirmed) {
//       try {
//         setIsDeleting(true);
        
//         // Call the parent component's delete handler
//         if (onDeleteProperty) {
//           await onDeleteProperty(property.property_id);
//         }
        
//         // Show success message
//         Swal.fire(
//           'Deleted!',
//           'The property has been deleted successfully.',
//           'success'
//         );
//       } catch (error) {
//         console.error('Error deleting property:', error);
//         Swal.fire(
//           'Error!',
//           'Failed to delete the property. Please try again.',
//           'error'
//         );
//       } finally {
//         setIsDeleting(false);
//       }
//     }
//   };

//   // Get property value based on transaction type
//   const getPropertyValue = () => {
//     if (property.looking_to === "sell") {
//       return property.total_property_value || property.property_value || 0;
//     } else {
//       // For rent, calculate based on annual rent (12 months)
//       const monthlyRent = parseFloat(property.rent_amount || 0);
//       return monthlyRent * 12; // Annual rent as base for commission calculation
//     }
//   };

//   const propertyValue = getPropertyValue();

//   // Get the image URL
//   const imageUrl = getImageUrl(property.images);
  
//   const formattedPrice = property.looking_to === "sell" 
//     ? formatPrice(property.total_property_value || property.property_value)
//     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount 
//     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//     : '';

//   // Handle mouse enter for commission tooltip
//   const handleMouseEnter = () => {
//     setShowCommissionTooltip(true);
//   };

//   // Handle mouse leave for commission tooltip
//   const handleMouseLeave = () => {
//     setShowCommissionTooltip(false);
//   };

//   return (
//     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
//       <div className="position-relative">
//         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
//           <img
//             src={imageUrl}
//             alt={property.property_title}
//             className="img-fluid"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//             }}
//           />
//         </div>
//         <div className="position-absolute top-0 end-0 m-2">
//           <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
//             {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//           </span>
//         </div>
//         {property.status && (
//           <div className="position-absolute top-0 start-0 m-2">
//             <span className="badge bg-warning text-dark">
//               {property.status.toUpperCase()}
//             </span>
//           </div>
//         )}
//       </div>
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
//           {property.property_title}
//         </h6>
//         <p className="card-text text-muted small mb-2">
//           <i className="bi bi-geo-alt"></i>  {property.city}
//         </p>
//         <div className="d-flex flex-wrap gap-1 mb-2">
//           {property.number_of_bedrooms && (
//             <span className="badge bg-light text-dark border small">
//               {property.number_of_bedrooms} BHK
//             </span>
//           )}
//           {property.facing && (
//             <span className="badge bg-light text-dark border small">
//               {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//             </span>
//           )}
//         </div>
//         <div className="d-flex align-items-center gap-2 mt-auto">
//           <span className="h5 fw-bold text-dark">
//             {formattedPrice}
//             {property.looking_to === "rent" && (
//               <small className="text-muted d-block">{depositText}</small>
//             )}
//           </span>
//         </div>

//         {/* Action Buttons */}
//         <div className="d-flex gap-2 mt-2">
//           {/* EDIT BUTTON */}
//           <button
//             onClick={handleEditProperty}
//             className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
//             style={{
//               backgroundColor: "#ffc107",
//               borderColor: "#ffc107",
//               color: "#000",
//             }}
//           >
//             <Edit size={16} />
//             <span>Edit</span>
//           </button>
          
//           {/* DELETE BUTTON */}
//           <button
//             onClick={handleDeleteProperty}
//             disabled={isDeleting}
//             className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
//             style={{
//               backgroundColor: "#dc3545",
//               borderColor: "#dc3545",
//               color: "#fff",
//             }}
//           >
//             {isDeleting ? (
//               <>
//                 <div className="spinner-border spinner-border-sm" role="status">
//                   <span className="visually-hidden">Deleting...</span>
//                 </div>
//                 <span>Deleting...</span>
//               </>
//             ) : (
//               <>
//                 <Trash2 size={16} />
//                 <span>Delete</span>
//               </>
//             )}
//           </button>
//         </div>
      
//         {/* PAYOUT BUTTON with Commission Tooltip */}
//         <div className="position-relative mt-2">
//           <button 
//             className="btn w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
//             style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             onFocus={handleMouseEnter}
//             onBlur={handleMouseLeave}
//           >
//             <Info size={16} />
//             Payout
//           </button>
          
//           <CommissionTooltip 
//             show={showCommissionTooltip}
//             commissions={commissionData}
//             propertyValue={propertyValue}
//           />
//         </div>
        
//         <button 
//           onClick={handleViewDetails}
//           className="btn w-100 fw-semibold py-2 mt-2"
//           style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//         >
//           {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//         </button>
//       </div>
//     </div>
//   );
// };




// // ============= Filter Section Component =============
// const FilterSection = ({ 
//   title, 
//   isOpen, 
//   onToggle, 
//   children 
// }) => {
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={onToggle}
//         className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
//         style={{ cursor: 'pointer' }}
//         aria-label={`Toggle ${title} filter section`}
//         aria-expanded={isOpen}
//       >
//         <span className="fw-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-5 w-5 text-muted" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-muted" />
//         )}
//       </button>
      
//       {isOpen && (
//         <div className="px-3 pb-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Sidebar Component =============
// const FilterSidebar = ({ 
//   selectedCategories, 
//   setSelectedCategories,
//   selectedTypes,
//   setSelectedTypes,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   selectedCities,
//   setSelectedCities,
//   selectedTransactionTypes,
//   setSelectedTransactionTypes,
//   selectedRoles,
//   setSelectedRoles,
//   categories,
//   propertyTypes,
//   roles,
//   loadingCategories,
//   loadingTypes,
//   loadingRoles,
//   onFilterChange
// }) => {
//   const [activeFilters, setActiveFilters] = useState({
//     transaction: true,
//     role: true,
//     categories: true,
//     price: true,
//     type: true,
//     location: true
//   });

//   const [categorySearch, setCategorySearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");
//   const [roleSearch, setRoleSearch] = useState("");

//   const priceRanges = [
//     { label: "Under ₹10L", min: 0, max: 1000000 },
//     { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
//     { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
//     { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//     { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
//     { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
//   ];

//   const cities = [
//     { name: "Karimnagar", count: 12 },
//     { name: "Hyderabad", count: 35 },
//     { name: "Visakhapatnam", count: 42 },
//     { name: "Nandyal", count: 38 },
//     { name: "Adoni", count: 19 },
//     { name: "Amudalavalasa", count: 22 },
//   ];

//   const transactionTypes = [
//     { name: "sell", displayName: "Sale", count: 65 },
//     { name: "rent", displayName: "Rent", count: 35 },
//   ];

//   const filteredCategories = useMemo(() => {
//     return categories.filter((cat) =>
//       cat.name.toLowerCase().includes(categorySearch.toLowerCase())
//     );
//   }, [categories, categorySearch]);

//   const filteredTypes = useMemo(() => {
//     return propertyTypes.filter((type) =>
//       type.name.toLowerCase().includes(typeSearch.toLowerCase())
//     );
//   }, [propertyTypes, typeSearch]);

//   const filteredCities = useMemo(() => {
//     return cities.filter((city) =>
//       city.name.toLowerCase().includes(citySearch.toLowerCase())
//     );
//   }, [cities, citySearch]);

//   const filteredRoles = useMemo(() => {
//     return roles.filter((role) =>
//       role.role_name.toLowerCase().includes(roleSearch.toLowerCase())
//     );
//   }, [roles, roleSearch]);

//   const toggleFilterSection = (section) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCategory = useCallback((categoryName) => {
//     setSelectedCategories((prev) => {
//       const newSelection = prev.includes(categoryName)
//         ? prev.filter((c) => c !== categoryName)
//         : [...prev, categoryName];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedCategories, onFilterChange]);

//   const toggleType = useCallback((typeName) => {
//     setSelectedTypes((prev) => {
//       const newSelection = prev.includes(typeName)
//         ? prev.filter((b) => b !== typeName)
//         : [...prev, typeName];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedTypes, onFilterChange]);

//   const togglePriceRange = useCallback((range) => {
//     setSelectedPriceRanges((prev) => {
//       const newSelection = prev.includes(range)
//         ? prev.filter((r) => r !== range)
//         : [...prev, range];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedPriceRanges, onFilterChange]);

//   const toggleCity = useCallback((name) => {
//     setSelectedCities((prev) => {
//       const newSelection = prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedCities, onFilterChange]);

//   const toggleTransactionType = useCallback((type) => {
//     setSelectedTransactionTypes((prev) => {
//       const newSelection = prev.includes(type)
//         ? prev.filter((t) => t !== type)
//         : [...prev, type];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedTransactionTypes, onFilterChange]);

//   const toggleRole = useCallback((roleId) => {
//     setSelectedRoles((prev) => {
//       const newSelection = prev.includes(roleId)
//         ? prev.filter((r) => r !== roleId)
//         : [...prev, roleId];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedRoles, onFilterChange]);

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setSelectedRoles([]);
//     setCategorySearch("");
//     setTypeSearch("");
//     setCitySearch("");
//     setRoleSearch("");
    
//     if (onFilterChange) {
//       setTimeout(() => onFilterChange(), 0);
//     }
//   };

//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedTypes.length + 
//     selectedPriceRanges.length + 
//     selectedCities.length +
//     selectedTransactionTypes.length +
//     selectedRoles.length;

//   return (
//     <div className="w-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">
//           <Filter className="h-5 w-5 me-2" />
//           Filters
//         </h5>
//         {activeFilterCount > 0 && (
//           <button 
//             onClick={clearAllFilters}
//             className="btn btn-sm btn-outline-secondary"
//             aria-label="Clear all filters"
//           >
//             Clear All ({activeFilterCount})
//           </button>
//         )}
//       </div>

//       {/* Transaction Type Filter */}
//       <FilterSection
//         title="Looking For"
//         isOpen={activeFilters.transaction}
//         onToggle={() => toggleFilterSection('transaction')}
//       >
//         <div className="overflow-y-auto">
//           {transactionTypes.map((type) => (
//             <div
//               key={type.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleTransactionType(type.name)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleTransactionType(type.name)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedTransactionTypes.includes(type.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedTransactionTypes.includes(type.name)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.displayName}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({type.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Categories Filter */}
//       <FilterSection
//         title="Property Category"
//         isOpen={activeFilters.categories}
//         onToggle={() => toggleFilterSection('categories')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search categories..."
//             value={categorySearch}
//             onChange={(e) => setCategorySearch(e.target.value)}
//             aria-label="Search categories"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingCategories ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading categories...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading categories...</p>
//             </div>
//           ) : filteredCategories.length === 0 ? (
//             <p className="small text-muted text-center py-3">No categories found</p>
//           ) : (
//             filteredCategories.map((category) => (
//               <div
//                 key={category.property_category_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleCategory(category.name.toLowerCase())}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleCategory(category.name.toLowerCase())}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedCategories.includes(category.name.toLowerCase())}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedCategories.includes(category.name.toLowerCase())}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedCategories.includes(category.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {category.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Property Type Filter */}
//       <FilterSection
//         title="Property Type"
//         isOpen={activeFilters.type}
//         onToggle={() => toggleFilterSection('type')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search property types..."
//             value={typeSearch}
//             onChange={(e) => setTypeSearch(e.target.value)}
//             aria-label="Search property types"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingTypes ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading property types...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading property types...</p>
//             </div>
//           ) : filteredTypes.length === 0 ? (
//             <p className="small text-muted text-center py-3">No property types found</p>
//           ) : (
//             filteredTypes.map((type) => (
//               <div
//                 key={type.property_type_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleType(type.name.toLowerCase())}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleType(type.name.toLowerCase())}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedTypes.includes(type.name.toLowerCase())}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedTypes.includes(type.name.toLowerCase())}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedTypes.includes(type.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {type.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Price Filter */}
//       <FilterSection
//         title="Price Range"
//         isOpen={activeFilters.price}
//         onToggle={() => toggleFilterSection('price')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {priceRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => togglePriceRange(range.label)}
//               onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.label)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedPriceRanges.includes(range.label)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Active Filters Summary */}
//       {activeFilterCount > 0 && (
//         <div className="mt-4">
//           <h6 className="fw-semibold mb-2">Active Filters:</h6>
//           <div className="d-flex flex-wrap gap-2">
//             {selectedTransactionTypes.map(type => (
//               <span key={type} className="badge bg-info-subtle text-info border border-info d-flex align-items-center">
//                 {type === 'sell' ? 'Sale' : 'Rent'}
//                 <button 
//                   onClick={() => toggleTransactionType(type)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${type} filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedRoles.map(roleId => {
//               const role = roles.find(r => r.role_id === roleId);
//               return (
//                 <span key={roleId} className="badge bg-purple-subtle text-purple border border-purple d-flex align-items-center">
//                   {role?.role_name || 'Role'}
//                   <button 
//                     onClick={() => toggleRole(roleId)} 
//                     className="btn-close btn-close-sm ms-1"
//                     aria-label={`Remove ${role?.role_name} role filter`}
//                   ></button>
//                 </span>
//               );
//             })}
//             {selectedCategories.map(catName => (
//               <span key={catName} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
//                 {catName.charAt(0).toUpperCase() + catName.slice(1)}
//                 <button 
//                   onClick={() => toggleCategory(catName)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${catName} category filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedTypes.map(typeName => (
//               <span key={typeName} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
//                 {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
//                 <button 
//                   onClick={() => toggleType(typeName)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${typeName} type filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedPriceRanges.map(range => (
//               <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
//                 {range}
//                 <button 
//                   onClick={() => togglePriceRange(range)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${range} price filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedCities.map(city => (
//               <span key={city} className="badge bg-danger-subtle text-danger border border-danger d-flex align-items-center">
//                 {city}
//                 <button 
//                   onClick={() => toggleCity(city)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${city} location filter`}
//                 ></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Product Header Component =============
// const ProductHeader = ({
//   totalProducts,
//   showingProducts,
//   viewMode,
//   onViewModeChange,
//   searchTerm,
//   setSearchTerm,
//   sortOption,
//   setSortOption,
//   onSearch
// }) => {
//   const viewButtons = [
//     // { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
//     { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
//     { mode: "list", icon: List, label: "List" },
//     { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
//   ];

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (onSearch) {
//       onSearch(value);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchTerm("");
//     if (onSearch) {
//       onSearch("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && onSearch) {
//       onSearch(searchTerm);
//     }
//   };

//   return (
//     <div className="row align-items-center justify-content-between mb-4">
//       <div className="col-md-6 mb-3 mb-md-0">
//         <div className="d-flex align-items-center">
//           <h4 className="fw-bold mb-0 me-3">Properties</h4>
//           <p className="mb-0 text-muted">
//             Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//             <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
//             properties
//           </p>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
//           <div className="input-group" style={{ width: '200px' }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search className="h-4 w-4 text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-sm border-start-0"
//               placeholder="Search properties..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onKeyPress={handleKeyPress}
//               aria-label="Search properties"
//             />
//             {searchTerm && (
//               <button
//                 onClick={handleClearSearch}
//                 className="btn btn-outline-secondary border-start-0"
//                 type="button"
//                 aria-label="Clear search"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <div className="btn-group" role="group" aria-label="View mode">
//             {viewButtons.map(({ mode, icon: Icon, label }) => (
//               <button
//                 key={mode}
//                 onClick={() => onViewModeChange(mode)}
//                 className={`btn btn-outline-secondary ${
//                   viewMode === mode ? "active" : ""
//                 }`}
//                 style={{ padding: '0.375rem 0.75rem' }}
//                 title={label}
//                 aria-label={`Switch to ${label} view`}
//               >
//                 <Icon className="h-4 w-4" />
//               </button>
//             ))}
//           </div>

//           <select 
//             className="form-select form-select-sm" 
//             style={{ width: '130px' }}
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             aria-label="Sort properties"
//           >
//             <option value="default">Sort By</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             {/* <option value="newest">Newest First</option> */}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Grid Component =============
// // const PropertyGrid = ({ properties, viewMode, onDeleteProperty }) => {
// //   const getGridClasses = () => {
// //     switch (viewMode) {
// //       // case "grid-2":
// //       //   return "row row-cols-1 row-cols-sm-2";
// //       case "grid-3":
// //         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
// //       case "grid-4":
// //         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
// //       case "list":
// //         return "row row-cols-1";
// //       default:
// //         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
// //     }
// //   };

// //   const navigate = useNavigate();

// //   // In list view mode, show properties differently
// //   if (viewMode === "list") {
// //     return (
// //       <div className="list-group">
// //         {properties.map((property) => {
// //           const imageUrl = getImageUrl(property.images);
          
// //           const getPriceInfo = () => {
// //             if (property.looking_to === "sell") {
// //               const price = property.total_property_value || property.property_value;
// //               return {
// //                 price: formatPrice(price),
// //                 suffix: "",
// //                 showDeposit: false
// //               };
// //             } else {
// //               return {
// //                 price: `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`,
// //                 suffix: property.deposit_amount 
// //                   ? `Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
// //                   : '',
// //                 showDeposit: true
// //               };
// //             }
// //           };

// //           const priceInfo = getPriceInfo();

// //           return (
// //             <div key={property.property_id} className="list-group-item mb-3">
// //               <div className="row g-3">
// //                 <div className="col-md-3">
// //                   <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
// //                     <img
// //                       src={imageUrl}
// //                       alt={property.property_title}
// //                       className="img-fluid"
// //                       style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
// //                       onError={(e) => {
// //                         e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// //                       }}
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                   <div className="d-flex align-items-start gap-2 mb-2">
// //                     <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
// //                     {property.status && (
// //                       <span className="badge bg-warning text-dark small">
// //                         {property.status.toUpperCase()}
// //                       </span>
// //                     )}
// //                     <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
// //                       {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
// //                     </span>
// //                   </div>
// //                   <p className="card-text text-muted small mb-2">
// //                     <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
// //                   </p>
// //                   <div className="d-flex flex-wrap gap-2 mb-2">
// //                     {property.area && (
// //                       <span className="badge bg-light text-dark border small">
// //                         {property.area} {property.area_unit || 'sq ft'}
// //                       </span>
// //                     )}
// //                     {property.number_of_bedrooms && (
// //                       <span className="badge bg-light text-dark border small">
// //                         {property.number_of_bedrooms} BHK
// //                       </span>
// //                     )}
// //                     {property.facing && (
// //                       <span className="badge bg-light text-dark border small">
// //                         {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
// //                       </span>
// //                     )}
// //                   </div>
// //                   <div className="d-flex align-items-center gap-2">
// //                     <span className="h5 fw-bold text-dark">
// //                       {priceInfo.price}
// //                       {priceInfo.showDeposit && priceInfo.suffix && (
// //                         <small className="text-muted d-block">{priceInfo.suffix}</small>
// //                       )}
// //                     </span>
// //                   </div>
// //                 </div>
// //                 <div className="col-md-3 d-flex flex-column gap-2">
// //                   {/* Action Buttons for List View */}
// //                   <div className="d-flex gap-2 mb-2">
// //                     <button
// //                       onClick={() => navigate(`/myproperties/edit/${property.property_id}`)}
// //                       className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
// //                       style={{
// //                         backgroundColor: "#ffc107",
// //                         borderColor: "#ffc107",
// //                         color: "#000",
// //                       }}
// //                     >
// //                       <Edit size={14} />
// //                       <span>Edit</span>
// //                     </button>
                    
// //                     <button
// //                       onClick={() => onDeleteProperty && onDeleteProperty(property.property_id)}
// //                       className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
// //                       style={{
// //                         backgroundColor: "#dc3545",
// //                         borderColor: "#dc3545",
// //                         color: "#fff",
// //                       }}
// //                     >
// //                       <Trash2 size={14} />
// //                       <span>Delete</span>
// //                     </button>
// //                   </div>
                  
// //                   <button 
// //                     className="btn fw-semibold py-2"
// //                     style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
// //                   >
// //                     Payout
// //                   </button>
// //                   <button 
// //                     onClick={() => navigate(`/property/${property.property_id}`)}
// //                     className="btn fw-semibold py-2"
// //                     style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
// //                   >
// //                     {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={getGridClasses()}>
// //       {properties.map((property) => (
// //         <div key={property.property_id} className="col mb-4">
// //           <PropertyCard 
// //             property={property} 
// //             onDeleteProperty={onDeleteProperty}
// //           />
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };



// // ============= Property Grid Component (List View) =============
// const PropertyGrid = ({ properties, viewMode, onDeleteProperty, commissionData }) => {
//   const getGridClasses = () => {
//     switch (viewMode) {
//       case "grid-3":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
//       case "grid-4":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//       case "list":
//         return "row row-cols-1";
//       default:
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//     }
//   };

//   const navigate = useNavigate();

//   // In list view mode, show properties differently
//   if (viewMode === "list") {
//     return (
//       <div className="list-group">
//         {properties.map((property) => {
//           const imageUrl = getImageUrl(property.images);
          
//           const getPriceInfo = () => {
//             if (property.looking_to === "sell") {
//               const price = property.total_property_value || property.property_value;
//               return {
//                 price: formatPrice(price),
//                 suffix: "",
//                 showDeposit: false
//               };
//             } else {
//               return {
//                 price: `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`,
//                 suffix: property.deposit_amount 
//                   ? `Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//                   : '',
//                 showDeposit: true
//               };
//             }
//           };

//           const priceInfo = getPriceInfo();

//           // Create a separate ListPropertyItem for list view
//           const ListPropertyItem = ({ property }) => {
//             const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

//             // Get property value based on transaction type
//             const getPropertyValue = () => {
//               if (property.looking_to === "sell") {
//                 return property.total_property_value || property.property_value || 0;
//               } else {
//                 const monthlyRent = parseFloat(property.rent_amount || 0);
//                 return monthlyRent * 12;
//               }
//             };

//             const propertyValue = getPropertyValue();

//             const handleMouseEnter = () => {
//               setShowCommissionTooltip(true);
//             };

//             const handleMouseLeave = () => {
//               setShowCommissionTooltip(false);
//             };

//             return (
//               <div className="list-group-item mb-3">
//                 <div className="row g-3">
//                   <div className="col-md-3">
//                     <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
//                       <img
//                         src={imageUrl}
//                         alt={property.property_title}
//                         className="img-fluid"
//                         style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//                         onError={(e) => {
//                           e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="d-flex align-items-start gap-2 mb-2">
//                       <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
//                       {property.status && (
//                         <span className="badge bg-warning text-dark small">
//                           {property.status.toUpperCase()}
//                         </span>
//                       )}
//                       <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                         {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//                       </span>
//                     </div>
//                     <p className="card-text text-muted small mb-2">
//                       <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//                     </p>
//                     <div className="d-flex flex-wrap gap-2 mb-2">
//                       {property.area && (
//                         <span className="badge bg-light text-dark border small">
//                           {property.area} {property.area_unit || 'sq ft'}
//                         </span>
//                       )}
//                       {property.number_of_bedrooms && (
//                         <span className="badge bg-light text-dark border small">
//                           {property.number_of_bedrooms} BHK
//                         </span>
//                       )}
//                       {property.facing && (
//                         <span className="badge bg-light text-dark border small">
//                           {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//                         </span>
//                       )}
//                     </div>
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="h5 fw-bold text-dark">
//                         {priceInfo.price}
//                         {priceInfo.showDeposit && priceInfo.suffix && (
//                           <small className="text-muted d-block">{priceInfo.suffix}</small>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="col-md-3 d-flex flex-column gap-2">
//                     {/* Action Buttons for List View */}
//                     <div className="d-flex gap-2 mb-2">
//                       <button
//                         onClick={() => navigate(`/myproperties/edit/${property.property_id}`)}
//                         className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
//                         style={{
//                           backgroundColor: "#ffc107",
//                           borderColor: "#ffc107",
//                           color: "#000",
//                         }}
//                       >
//                         <Edit size={14} />
//                         <span>Edit</span>
//                       </button>
                      
//                       <button
//                         onClick={() => onDeleteProperty && onDeleteProperty(property.property_id)}
//                         className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
//                         style={{
//                           backgroundColor: "#dc3545",
//                           borderColor: "#dc3545",
//                           color: "#fff",
//                         }}
//                       >
//                         <Trash2 size={14} />
//                         <span>Delete</span>
//                       </button>
//                     </div>
                    
//                     {/* PAYOUT BUTTON for List View */}
//                     <div className="position-relative">
//                       <button 
//                         className="btn fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 w-100"
//                         style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                         onFocus={handleMouseEnter}
//                         onBlur={handleMouseLeave}
//                       >
//                         <Info size={14} />
//                         Payout
//                       </button>
                      
//                       <CommissionTooltip 
//                         show={showCommissionTooltip}
//                         commissions={commissionData}
//                         propertyValue={propertyValue}
//                       />
//                     </div>
                    
//                     <button 
//                       onClick={() => navigate(`/property/${property.property_id}`)}
//                       className="btn fw-semibold py-2"
//                       style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//                     >
//                       {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           };

//           return <ListPropertyItem key={property.property_id} property={property} />;
//         })}
//       </div>
//     );
//   }

//   return (
//     <div className={getGridClasses()}>
//       {properties.map((property) => (
//         <div key={property.property_id} className="col mb-4">
//           <PropertyCard 
//             property={property} 
//             onDeleteProperty={onDeleteProperty}
//             commissionData={commissionData}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };
// // ============= Main Filters Page Component =============
// const MyProperties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(true);
//   const [loadingRoles, setLoadingRoles] = useState(true);
//   const [loadingCommissions, setLoadingCommissions] = useState(false);
//   const [error, setError] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("default");

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState([]);

//   // Dynamic data states
//   const [categories, setCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [commissionData, setCommissionData] = useState([]);

//   // Handle delete property
//   const handleDeleteProperty = useCallback(async (propertyId) => {
//     try {
//       // Make API call to delete property
//       const response = await fetch(`${baseurl}/properties/${propertyId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to delete property: ${response.status}`);
//       }
      
//       // Remove property from local state
//       setProperties(prevProperties => 
//         prevProperties.filter(property => property.property_id !== propertyId)
//       );
      
//       // Update total count
//       setTotalCount(prev => prev - 1);
      
//       return true;
//     } catch (error) {
//       console.error('Error deleting property:', error);
//       throw error;
//     }
//   }, []);

//   // Fetch commission data from API
//   const fetchCommissionData = useCallback(async () => {
//     try {
//       setLoadingCommissions(true);
//       const response = await fetch(`${baseurl}/commissions-master/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCommissionData(data.results || []);
//     } catch (err) {
//       console.error("Error fetching commission data:", err);
//       setCommissionData([]);
//     } finally {
//       setLoadingCommissions(false);
//     }
//   }, []);

//   // Fetch roles from API
//   const fetchRoles = useCallback(async () => {
//     try {
//       setLoadingRoles(true);
//       const response = await fetch(`${baseurl}/roles/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setRoles(data.results || []);
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       setRoles([]);
//     } finally {
//       setLoadingRoles(false);
//     }
//   }, []);

//   // Fetch categories from API
//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoadingCategories(true);
//       const response = await fetch(`${baseurl}/property-categories/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCategories(data.results || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setCategories([]);
//     } finally {
//       setLoadingCategories(false);
//     }
//   }, []);

//   // Fetch property types from API
//   const fetchPropertyTypes = useCallback(async () => {
//     try {
//       setLoadingTypes(true);
//       const response = await fetch(`${baseurl}/property-types/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setPropertyTypes(data.results || []);
//     } catch (err) {
//       console.error("Error fetching property types:", err);
//       setPropertyTypes([]);
//     } finally {
//       setLoadingTypes(false);
//     }
//   }, []);

//   // Fetch properties from API with filters
//   const fetchProperties = useCallback(async () => {
//     try {
//       setLoading(true);
      
//       const params = new URLSearchParams();
      
//       // Get user_id from local storage
//       const userId = localStorage.getItem('user_id');
      
//       if (userId) {
//         params.append('user_id', userId);
//       } else {
//         console.warn('user_id not found in local storage');
//       }
      
//       if (searchTerm.trim()) {
//         params.append('keyword', searchTerm.trim());
//       }
      
//       if (selectedCategories.length > 0) {
//         const categoryQuery = selectedCategories.join(',');
//         params.append('category', categoryQuery);
//       }
      
//       if (selectedTypes.length > 0) {
//         const typeQuery = selectedTypes.join(',');
//         params.append('property_type', typeQuery);
//       }
      
//       if (selectedTransactionTypes.length > 0) {
//         const lookingToQuery = selectedTransactionTypes.join(',');
//         params.append('looking_to', lookingToQuery);
//       }
      
//       if (selectedCities.length > 0) {
//         params.append('city', selectedCities.join(','));
//       }
      
//       if (selectedRoles.length > 0) {
//         const roleIds = selectedRoles.join(',');
//         params.append('user_role', roleIds);
//       }
      
//       params.append('page', currentPage);
      
//       const queryString = params.toString();
//       const url = `${baseurl}/properties/${queryString ? `?${queryString}` : ''}`;
      
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setProperties(data.results || []);
//       setTotalCount(data.count || 0);
//       setTotalPages(Math.ceil((data.count || 0) / 10));
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching properties:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     currentPage, 
//     selectedCategories, 
//     selectedTypes, 
//     selectedCities, 
//     selectedTransactionTypes,
//     selectedRoles,
//     searchTerm
//   ]);

//   // Handle filter changes
//   const handleFilterChange = useCallback(() => {
//     setCurrentPage(1);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchRoles();
//     fetchCategories();
//     fetchPropertyTypes();
//     fetchCommissionData();
//   }, [fetchRoles, fetchCategories, fetchPropertyTypes, fetchCommissionData]);

//   // Fetch properties when filters or page change
//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   // Handle search
//   const handleSearch = useCallback((term) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   }, []);

//   // Filter properties based on price ranges (client-side only)
//   const filteredProperties = useMemo(() => {
//     if (selectedPriceRanges.length === 0) {
//       return properties;
//     }

//     return properties.filter(property => {
//       const price = parseFloat(property.looking_to === "sell" 
//         ? (property.total_property_value || property.property_value)
//         : property.rent_amount || 0);
      
//       return selectedPriceRanges.some(rangeLabel => {
//         switch (rangeLabel) {
//           case "Under ₹10L":
//             return price >= 0 && price <= 1000000;
//           case "₹10L - ₹25L":
//             return price >= 1000000 && price <= 2500000;
//           case "₹25L - ₹50L":
//             return price >= 2500000 && price <= 5000000;
//           case "₹50L - ₹1Cr":
//             return price >= 5000000 && price <= 10000000;
//           case "₹1Cr - ₹5Cr":
//             return price >= 10000000 && price <= 50000000;
//           case "Over ₹5Cr":
//             return price >= 50000000;
//           default:
//             return false;
//         }
//       });
//     });
//   }, [properties, selectedPriceRanges]);

//   // Sort properties
//   const sortedProperties = useMemo(() => {
//     return [...filteredProperties].sort((a, b) => {
//       switch (sortOption) {
//         case "price-low":
//           return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
//                   parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
//         case "price-high":
//           return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
//                   parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
//         case "newest":
//           return new Date(b.created_at) - new Date(a.created_at);
//         default:
//           return 0;
//       }
//     });
//   }, [filteredProperties, sortOption]);

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Render pagination
//   const renderPagination = () => {
//     if (totalPages <= 1) return null;
    
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button 
//             className="page-link" 
//             onClick={() => handlePageChange(i)}
//             aria-label={`Go to page ${i}`}
//             aria-current={currentPage === i ? 'page' : undefined}
//           >
//             {i}
//           </button>
//         </li>
//       );
//     }

//     return (
//       <nav aria-label="Page navigation" className="mt-5">
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Go to previous page"
//             >
//               Previous
//             </button>
//           </li>
//           {startPage > 1 && (
//             <>
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(1)}
//                   aria-label="Go to page 1"
//                 >
//                   1
//                 </button>
//               </li>
//               {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//             </>
//           )}
//           {pages}
//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(totalPages)}
//                   aria-label={`Go to page ${totalPages}`}
//                 >
//                   {totalPages}
//                 </button>
//               </li>
//             </>
//           )}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Go to next page"
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   if (loading && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading properties...</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (error && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="alert alert-danger" role="alert">
//               Error loading properties: {error}
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       <WebsiteNavbar />
      
//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             totalProducts={totalCount}
//             showingProducts={sortedProperties.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//             onSearch={handleSearch}
//           />

//           <div className="row">
//             <aside className="col-lg-3 mb-4 mb-lg-0">
//               <div className="" style={{ top: '20px' }}>
//                 <FilterSidebar
//                   selectedCategories={selectedCategories}
//                   setSelectedCategories={setSelectedCategories}
//                   selectedTypes={selectedTypes}
//                   setSelectedTypes={setSelectedTypes}
//                   selectedPriceRanges={selectedPriceRanges}
//                   setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedCities={selectedCities}
//                   setSelectedCities={setSelectedCities}
//                   selectedTransactionTypes={selectedTransactionTypes}
//                   setSelectedTransactionTypes={setSelectedTransactionTypes}
//                   selectedRoles={selectedRoles}
//                   setSelectedRoles={setSelectedRoles}
//                   categories={categories}
//                   propertyTypes={propertyTypes}
//                   roles={roles}
//                   loadingCategories={loadingCategories}
//                   loadingTypes={loadingTypes}
//                   loadingRoles={loadingRoles}
//                   onFilterChange={handleFilterChange}
//                 />
//               </div>
//             </aside>

//             <div className="col-lg-9">
//               {loading && sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-3">Loading properties...</p>
//                 </div>
//               ) : sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <h5>No properties found matching your criteria.</h5>
//                   <p className="text-muted">Try adjusting your filters or search term.</p>
//                 </div>
//               ) : (
//                 <>
//                   <PropertyGrid 
//                     properties={sortedProperties} 
//                     viewMode={viewMode}
//                     onDeleteProperty={handleDeleteProperty}
//                     commissionData={commissionData}
//                   />
//                   {renderPagination()}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MyProperties;

// =========================================================================
// Below code Without Pagination full code 


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   List,
//   LayoutList,
//   Filter,
//   User,
//   Edit,
//   Trash2,
//   Info
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MyProperties.css";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// // ============= Utility Functions =============
// const formatPrice = (price) => {
//   const priceNum = parseFloat(price);
//   if (priceNum >= 10000000) {
//     return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
//   } else if (priceNum >= 100000) {
//     return `₹${(priceNum / 100000).toFixed(2)} L`;
//   }
//   return `₹${priceNum.toLocaleString()}`;
// };

// const getImageUrl = (images) => {
//   if (images && images.length > 0) {
//     const imagePath = images[0].image;
    
//     // Check if it's a relative path starting with /media/
//     if (imagePath.startsWith('/media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     // Check if it's a relative path without leading slash
//     if (imagePath.startsWith('media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     // Check if it's already a full URL
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
    
//     // For any other relative path
//     return `${baseurl}/${imagePath}`;
//   }
  
//   // Fallback image
//   return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// };

// // ============= Commission Tooltip Component =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;

//   // Calculate commission amounts based on distribution_commission
//   const calculateCommissions = () => {
//     const commissionAmount = parseFloat(distributionCommission) || 0;
//     return commissions.map(commission => ({
//       level: commission.level_no,
//       percentage: parseFloat(commission.percentage),
//       amount: (commissionAmount * parseFloat(commission.percentage)) / 100
//     }));
//   };

//   const commissionList = calculateCommissions();
//   const totalCommission = commissionList.reduce((sum, comm) => sum + comm.amount, 0);

//   return (
//     <div className="commission-tooltip">
//       <div className="commission-tooltip-content">
//         <div className="commission-body">
//           {commissionList.map((commission) => (
//             <div key={commission.level} className="d-flex justify-content-between align-items-center mb-2">
//               <span className="fw-medium">Team {commission.level}: &nbsp;₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
//               {/* <div className="text-end">
//                 <span className="fw-bold text-success d-block">₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
//                 <small className="text-muted">({commission.percentage}%)</small>
//               </div> */}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Card Component =============
// const PropertyCard = ({ property, onDeleteProperty, commissionData }) => {
//   const navigate = useNavigate();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

//   const handleViewDetails = () => {
//     navigate(`/agent-my-properties-details/${property.property_id}`);
//   };

//   const handleEditProperty = () => {
//     navigate(`/myproperties/edit/${property.property_id}`);
//   };

//   // Handle delete property
//   const handleDeleteProperty = async () => {
//     // Show confirmation dialog
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${property.property_title}". This action cannot be undone!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'Cancel',
//       reverseButtons: true
//     });

//     if (result.isConfirmed) {
//       try {
//         setIsDeleting(true);
        
//         // Call the parent component's delete handler
//         if (onDeleteProperty) {
//           await onDeleteProperty(property.property_id);
//         }
        
//         // Show success message
//         Swal.fire(
//           'Deleted!',
//           'The property has been deleted successfully.',
//           'success'
//         );
//       } catch (error) {
//         console.error('Error deleting property:', error);
//         Swal.fire(
//           'Error!',
//           'Failed to delete the property. Please try again.',
//           'error'
//         );
//       } finally {
//         setIsDeleting(false);
//       }
//     }
//   };

//   // Get distribution commission
//   const getDistributionCommission = () => {
//     return parseFloat(property.distribution_commission || 0);
//   };

//   const distributionCommission = getDistributionCommission();

//   // Get the image URL
//   const imageUrl = getImageUrl(property.images);
  
//   const formattedPrice = property.looking_to === "sell" 
//     ? formatPrice(property.total_property_value || property.property_value)
//     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount 
//     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//     : '';

//   // Handle mouse enter for commission tooltip
//   const handleMouseEnter = () => {
//     setShowCommissionTooltip(true);
//   };

//   // Handle mouse leave for commission tooltip
//   const handleMouseLeave = () => {
//     setShowCommissionTooltip(false);
//   };

//   return (
//     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
//       <div className="position-relative">
//         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
//           <img
//             src={imageUrl}
//             alt={property.property_title}
//             className="img-fluid"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//             }}
//           />
//         </div>
//         <div className="position-absolute top-0 end-0 m-2">
//           <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
//             {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//           </span>
//         </div>
//         {property.status && (
//           <div className="position-absolute top-0 start-0 m-2">
//             <span className="badge bg-warning text-dark">
//               {property.status.toUpperCase()}
//             </span>
//           </div>
//         )}
//       </div>
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
//           {property.property_title}
//         </h6>
//         <p className="card-text text-muted small mb-2">
//           <i className="bi bi-geo-alt"></i>  {property.city}
//         </p>
//         <div className="d-flex flex-wrap gap-1 mb-2">
//           {property.number_of_bedrooms && (
//             <span className="badge bg-light text-dark border small">
//               {property.number_of_bedrooms} BHK
//             </span>
//           )}
//           {property.facing && (
//             <span className="badge bg-light text-dark border small">
//               {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//             </span>
//           )}
//         </div>
        
//         {/* Distribution Commission Display */}
//         {/* <div className="mb-3">
//           <div className="d-flex justify-content-between align-items-center">
//             <span className="small fw-semibold">Commission:</span>
//             <span className="badge bg-info text-dark small">
//               ₹{distributionCommission.toLocaleString()}
//             </span>
//           </div>
//         </div> */}
        
//         <div className="d-flex align-items-center gap-2 mt-auto">
//           <span className="h5 fw-bold text-dark">
//             {formattedPrice}
//             {property.looking_to === "rent" && (
//               <small className="text-muted d-block">{depositText}</small>
//             )}
//           </span>
//         </div>

//         {/* Action Buttons */}
//         <div className="d-flex gap-2 mt-2">
//           {/* EDIT BUTTON */}
//           <button
//             onClick={handleEditProperty}
//             className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
//             style={{
//               backgroundColor: "#ffc107",
//               borderColor: "#ffc107",
//               color: "#000",
//             }}
//           >
//             <Edit size={16} />
//             <span>Edit</span>
//           </button>
          
//           {/* DELETE BUTTON */}
//           <button
//             onClick={handleDeleteProperty}
//             disabled={isDeleting}
//             className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
//             style={{
//               backgroundColor: "#dc3545",
//               borderColor: "#dc3545",
//               color: "#fff",
//             }}
//           >
//             {isDeleting ? (
//               <>
//                 <div className="spinner-border spinner-border-sm" role="status">
//                   <span className="visually-hidden">Deleting...</span>
//                 </div>
//                 <span>Deleting...</span>
//               </>
//             ) : (
//               <>
//                 <Trash2 size={16} />
//                 <span>Delete</span>
//               </>
//             )}
//           </button>
//         </div>
      
//         {/* PAYOUT BUTTON with Commission Tooltip */}
//         <div className="position-relative mt-2">
//           <button 
//             className="btn w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
//             style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             onFocus={handleMouseEnter}
//             onBlur={handleMouseLeave}
//           >
//             <Info size={16} />
//             PAYOUT
//           </button>
          
//           <CommissionTooltip 
//             show={showCommissionTooltip}
//             commissions={commissionData}
//             distributionCommission={distributionCommission}
//           />
//         </div>
        
//         <button 
//           onClick={handleViewDetails}
//           className="btn w-100 fw-semibold py-2 mt-2"
//           style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//         >
//           {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============= Filter Section Component =============
// const FilterSection = ({ 
//   title, 
//   isOpen, 
//   onToggle, 
//   children 
// }) => {
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={onToggle}
//         className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
//         style={{ cursor: 'pointer' }}
//         aria-label={`Toggle ${title} filter section`}
//         aria-expanded={isOpen}
//       >
//         <span className="fw-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-5 w-5 text-muted" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-muted" />
//         )}
//       </button>
      
//       {isOpen && (
//         <div className="px-3 pb-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Sidebar Component =============
// const FilterSidebar = ({ 
//   selectedCategories, 
//   setSelectedCategories,
//   selectedTypes,
//   setSelectedTypes,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   selectedCities,
//   setSelectedCities,
//   selectedTransactionTypes,
//   setSelectedTransactionTypes,
//   selectedRoles,
//   setSelectedRoles,
//   categories,
//   propertyTypes,
//   roles,
//   loadingCategories,
//   loadingTypes,
//   loadingRoles,
//   onFilterChange
// }) => {
//   const [activeFilters, setActiveFilters] = useState({
//     transaction: true,
//     role: true,
//     categories: true,
//     price: true,
//     type: true,
//     location: true
//   });

//   const [categorySearch, setCategorySearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");
//   const [roleSearch, setRoleSearch] = useState("");

//   const priceRanges = [
//     { label: "Under ₹10L", min: 0, max: 1000000 },
//     { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
//     { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
//     { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//     { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
//     { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
//   ];

//   const cities = [
//     { name: "Karimnagar", count: 12 },
//     { name: "Hyderabad", count: 35 },
//     { name: "Visakhapatnam", count: 42 },
//     { name: "Nandyal", count: 38 },
//     { name: "Adoni", count: 19 },
//     { name: "Amudalavalasa", count: 22 },
//   ];

//   const transactionTypes = [
//     { name: "sell", displayName: "Sale", count: 65 },
//     { name: "rent", displayName: "Rent", count: 35 },
//   ];

//   const filteredCategories = useMemo(() => {
//     return categories.filter((cat) =>
//       cat.name.toLowerCase().includes(categorySearch.toLowerCase())
//     );
//   }, [categories, categorySearch]);

//   const filteredTypes = useMemo(() => {
//     return propertyTypes.filter((type) =>
//       type.name.toLowerCase().includes(typeSearch.toLowerCase())
//     );
//   }, [propertyTypes, typeSearch]);

//   const filteredCities = useMemo(() => {
//     return cities.filter((city) =>
//       city.name.toLowerCase().includes(citySearch.toLowerCase())
//     );
//   }, [cities, citySearch]);

//   const filteredRoles = useMemo(() => {
//     return roles.filter((role) =>
//       role.role_name.toLowerCase().includes(roleSearch.toLowerCase())
//     );
//   }, [roles, roleSearch]);

//   const toggleFilterSection = (section) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCategory = useCallback((categoryName) => {
//     setSelectedCategories((prev) => {
//       const newSelection = prev.includes(categoryName)
//         ? prev.filter((c) => c !== categoryName)
//         : [...prev, categoryName];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedCategories, onFilterChange]);

//   const toggleType = useCallback((typeName) => {
//     setSelectedTypes((prev) => {
//       const newSelection = prev.includes(typeName)
//         ? prev.filter((b) => b !== typeName)
//         : [...prev, typeName];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedTypes, onFilterChange]);

//   const togglePriceRange = useCallback((range) => {
//     setSelectedPriceRanges((prev) => {
//       const newSelection = prev.includes(range)
//         ? prev.filter((r) => r !== range)
//         : [...prev, range];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedPriceRanges, onFilterChange]);

//   const toggleCity = useCallback((name) => {
//     setSelectedCities((prev) => {
//       const newSelection = prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedCities, onFilterChange]);

//   const toggleTransactionType = useCallback((type) => {
//     setSelectedTransactionTypes((prev) => {
//       const newSelection = prev.includes(type)
//         ? prev.filter((t) => t !== type)
//         : [...prev, type];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedTransactionTypes, onFilterChange]);

//   const toggleRole = useCallback((roleId) => {
//     setSelectedRoles((prev) => {
//       const newSelection = prev.includes(roleId)
//         ? prev.filter((r) => r !== roleId)
//         : [...prev, roleId];
      
//       if (onFilterChange) {
//         setTimeout(() => onFilterChange(), 0);
//       }
      
//       return newSelection;
//     });
//   }, [setSelectedRoles, onFilterChange]);

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setSelectedRoles([]);
//     setCategorySearch("");
//     setTypeSearch("");
//     setCitySearch("");
//     setRoleSearch("");
    
//     if (onFilterChange) {
//       setTimeout(() => onFilterChange(), 0);
//     }
//   };

//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedTypes.length + 
//     selectedPriceRanges.length + 
//     selectedCities.length +
//     selectedTransactionTypes.length +
//     selectedRoles.length;

//   return (
//     <div className="w-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">
//           <Filter className="h-5 w-5 me-2" />
//           Filters
//         </h5>
//         {activeFilterCount > 0 && (
//           <button 
//             onClick={clearAllFilters}
//             className="btn btn-sm btn-outline-secondary"
//             aria-label="Clear all filters"
//           >
//             Clear All ({activeFilterCount})
//           </button>
//         )}
//       </div>

//       {/* Transaction Type Filter */}
//       <FilterSection
//         title="Looking For"
//         isOpen={activeFilters.transaction}
//         onToggle={() => toggleFilterSection('transaction')}
//       >
//         <div className="overflow-y-auto">
//           {transactionTypes.map((type) => (
//             <div
//               key={type.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleTransactionType(type.name)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleTransactionType(type.name)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedTransactionTypes.includes(type.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedTransactionTypes.includes(type.name)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.displayName}
//                 </span>
//               </div>
//               {/* <span className="text-muted small">
//                 ({type.count})
//               </span> */}
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Categories Filter */}
//       <FilterSection
//         title="Property Category"
//         isOpen={activeFilters.categories}
//         onToggle={() => toggleFilterSection('categories')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search categories..."
//             value={categorySearch}
//             onChange={(e) => setCategorySearch(e.target.value)}
//             aria-label="Search categories"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingCategories ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading categories...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading categories...</p>
//             </div>
//           ) : filteredCategories.length === 0 ? (
//             <p className="small text-muted text-center py-3">No categories found</p>
//           ) : (
//             filteredCategories.map((category) => (
//               <div
//                 key={category.property_category_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleCategory(category.name.toLowerCase())}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleCategory(category.name.toLowerCase())}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedCategories.includes(category.name.toLowerCase())}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedCategories.includes(category.name.toLowerCase())}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedCategories.includes(category.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {category.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Property Type Filter */}
//       <FilterSection
//         title="Property Type"
//         isOpen={activeFilters.type}
//         onToggle={() => toggleFilterSection('type')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search property types..."
//             value={typeSearch}
//             onChange={(e) => setTypeSearch(e.target.value)}
//             aria-label="Search property types"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingTypes ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading property types...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading property types...</p>
//             </div>
//           ) : filteredTypes.length === 0 ? (
//             <p className="small text-muted text-center py-3">No property types found</p>
//           ) : (
//             filteredTypes.map((type) => (
//               <div
//                 key={type.property_type_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleType(type.name.toLowerCase())}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleType(type.name.toLowerCase())}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedTypes.includes(type.name.toLowerCase())}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedTypes.includes(type.name.toLowerCase())}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedTypes.includes(type.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {type.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Price Filter */}
//       <FilterSection
//         title="Price Range"
//         isOpen={activeFilters.price}
//         onToggle={() => toggleFilterSection('price')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {priceRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => togglePriceRange(range.label)}
//               onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.label)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedPriceRanges.includes(range.label)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Active Filters Summary */}
//       {activeFilterCount > 0 && (
//         <div className="mt-4">
//           <h6 className="fw-semibold mb-2">Active Filters:</h6>
//           <div className="d-flex flex-wrap gap-2">
//             {selectedTransactionTypes.map(type => (
//               <span key={type} className="badge bg-info-subtle text-info border border-info d-flex align-items-center">
//                 {type === 'sell' ? 'Sale' : 'Rent'}
//                 <button 
//                   onClick={() => toggleTransactionType(type)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${type} filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedRoles.map(roleId => {
//               const role = roles.find(r => r.role_id === roleId);
//               return (
//                 <span key={roleId} className="badge bg-purple-subtle text-purple border border-purple d-flex align-items-center">
//                   {role?.role_name || 'Role'}
//                   <button 
//                     onClick={() => toggleRole(roleId)} 
//                     className="btn-close btn-close-sm ms-1"
//                     aria-label={`Remove ${role?.role_name} role filter`}
//                   ></button>
//                 </span>
//               );
//             })}
//             {selectedCategories.map(catName => (
//               <span key={catName} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
//                 {catName.charAt(0).toUpperCase() + catName.slice(1)}
//                 <button 
//                   onClick={() => toggleCategory(catName)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${catName} category filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedTypes.map(typeName => (
//               <span key={typeName} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
//                 {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
//                 <button 
//                   onClick={() => toggleType(typeName)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${typeName} type filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedPriceRanges.map(range => (
//               <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
//                 {range}
//                 <button 
//                   onClick={() => togglePriceRange(range)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${range} price filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedCities.map(city => (
//               <span key={city} className="badge bg-danger-subtle text-danger border border-danger d-flex align-items-center">
//                 {city}
//                 <button 
//                   onClick={() => toggleCity(city)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${city} location filter`}
//                 ></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Product Header Component =============
// const ProductHeader = ({
//   totalProducts,
//   showingProducts,
//   viewMode,
//   onViewModeChange,
//   searchTerm,
//   setSearchTerm,
//   sortOption,
//   setSortOption,
//   onSearch
// }) => {
//   const viewButtons = [
//     // { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
//     { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
//     { mode: "list", icon: List, label: "List" },
//     { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
//   ];

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     if (onSearch) {
//       onSearch(value);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchTerm("");
//     if (onSearch) {
//       onSearch("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && onSearch) {
//       onSearch(searchTerm);
//     }
//   };

//   return (
//     <div className="row align-items-center justify-content-between mb-4">
//       <div className="col-md-6 mb-3 mb-md-0">
//         <div className="d-flex align-items-center">
//           <h4 className="fw-bold mb-0 me-3">Properties</h4>
//           <p className="mb-0 text-muted">
//             Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//             <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
//             properties
//           </p>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
//           <div className="input-group" style={{ width: '200px' }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search className="h-4 w-4 text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-sm border-start-0"
//               placeholder="Search properties..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onKeyPress={handleKeyPress}
//               aria-label="Search properties"
//             />
//             {searchTerm && (
//               <button
//                 onClick={handleClearSearch}
//                 className="btn btn-outline-secondary border-start-0"
//                 type="button"
//                 aria-label="Clear search"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <div className="btn-group" role="group" aria-label="View mode">
//             {viewButtons.map(({ mode, icon: Icon, label }) => (
//               <button
//                 key={mode}
//                 onClick={() => onViewModeChange(mode)}
//                 className={`btn btn-outline-secondary ${
//                   viewMode === mode ? "active" : ""
//                 }`}
//                 style={{ padding: '0.375rem 0.75rem' }}
//                 title={label}
//                 aria-label={`Switch to ${label} view`}
//               >
//                 <Icon className="h-4 w-4" />
//               </button>
//             ))}
//           </div>

//           <select 
//             className="form-select form-select-sm" 
//             style={{ width: '130px' }}
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             aria-label="Sort properties"
//           >
//             <option value="default">Sort By</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Grid Component =============
// const PropertyGrid = ({ properties, viewMode, onDeleteProperty, commissionData }) => {
//   const getGridClasses = () => {
//     switch (viewMode) {
//       case "grid-3":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
//       case "grid-4":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//       case "list":
//         return "row row-cols-1";
//       default:
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//     }
//   };

//   const navigate = useNavigate();

//   // In list view mode, show properties differently
//   if (viewMode === "list") {
//     return (
//       <div className="list-group">
//         {properties.map((property) => {
//           const imageUrl = getImageUrl(property.images);
          
//           const getPriceInfo = () => {
//             if (property.looking_to === "sell") {
//               const price = property.total_property_value || property.property_value;
//               return {
//                 price: formatPrice(price),
//                 suffix: "",
//                 showDeposit: false
//               };
//             } else {
//               return {
//                 price: `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`,
//                 suffix: property.deposit_amount 
//                   ? `Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//                   : '',
//                 showDeposit: true
//               };
//             }
//           };

//           const priceInfo = getPriceInfo();

//           // Create a separate ListPropertyItem for list view
//           const ListPropertyItem = ({ property }) => {
//             const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

//             // Get distribution commission
//             const getDistributionCommission = () => {
//               return parseFloat(property.distribution_commission || 0);
//             };

//             const distributionCommission = getDistributionCommission();

//             const handleMouseEnter = () => {
//               setShowCommissionTooltip(true);
//             };

//             const handleMouseLeave = () => {
//               setShowCommissionTooltip(false);
//             };

//             return (
//               <div className="list-group-item mb-3">
//                 <div className="row g-3">
//                   <div className="col-md-3">
//                     <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
//                       <img
//                         src={imageUrl}
//                         alt={property.property_title}
//                         className="img-fluid"
//                         style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//                         onError={(e) => {
//                           e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="d-flex align-items-start gap-2 mb-2">
//                       <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
//                       {property.status && (
//                         <span className="badge bg-warning text-dark small">
//                           {property.status.toUpperCase()}
//                         </span>
//                       )}
//                       <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                         {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//                       </span>
//                     </div>
//                     <p className="card-text text-muted small mb-2">
//                       <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//                     </p>
//                     <div className="d-flex flex-wrap gap-2 mb-2">
//                       {property.area && (
//                         <span className="badge bg-light text-dark border small">
//                           {property.area} {property.area_unit || 'sq ft'}
//                         </span>
//                       )}
//                       {property.number_of_bedrooms && (
//                         <span className="badge bg-light text-dark border small">
//                           {property.number_of_bedrooms} BHK
//                         </span>
//                       )}
//                       {property.facing && (
//                         <span className="badge bg-light text-dark border small">
//                           {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//                         </span>
//                       )}
//                     </div>
                    
//                     {/* Distribution Commission Display for List View */}
//                     {/* <div className="mb-3">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span className="small fw-semibold">Commission:</span>
//                         <span className="badge bg-info text-dark small">
//                           ₹{distributionCommission.toLocaleString()}
//                         </span>
//                       </div>
//                     </div> */}
                    
//                     <div className="d-flex align-items-center gap-2">
//                       <span className="h5 fw-bold text-dark">
//                         {priceInfo.price}
//                         {priceInfo.showDeposit && priceInfo.suffix && (
//                           <small className="text-muted d-block">{priceInfo.suffix}</small>
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="col-md-3 d-flex flex-column gap-2">
//                     {/* Action Buttons for List View */}
//                     <div className="d-flex gap-2 mb-2">
//                       <button
//                         onClick={() => navigate(`/myproperties/edit/${property.property_id}`)}
//                         className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
//                         style={{
//                           backgroundColor: "#ffc107",
//                           borderColor: "#ffc107",
//                           color: "#000",
//                         }}
//                       >
//                         <Edit size={14} />
//                         <span>Edit</span>
//                       </button>
                      
//                       <button
//                         onClick={() => onDeleteProperty && onDeleteProperty(property.property_id)}
//                         className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
//                         style={{
//                           backgroundColor: "#dc3545",
//                           borderColor: "#dc3545",
//                           color: "#fff",
//                         }}
//                       >
//                         <Trash2 size={14} />
//                         <span>Delete</span>
//                       </button>
//                     </div>
                    
//                     {/* PAYOUT BUTTON for List View */}
//                     <div className="position-relative">
//                       <button 
//                         className="btn fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 w-100"
//                         style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                         onFocus={handleMouseEnter}
//                         onBlur={handleMouseLeave}
//                       >
//                         <Info size={14} />
//                         PAYOUT
//                       </button>
                      
//                       <CommissionTooltip 
//                         show={showCommissionTooltip}
//                         commissions={commissionData}
//                         distributionCommission={distributionCommission}
//                       />
//                     </div>
                    
//                     <button 
//                       onClick={() => navigate(`/agent-my-properties-details/${property.property_id}`)}
//                       className="btn fw-semibold py-2"
//                       style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//                     >
//                       {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           };

//           return <ListPropertyItem key={property.property_id} property={property} />;
//         })}
//       </div>
//     );
//   }

//   return (
//     <div className={getGridClasses()}>
//       {properties.map((property) => (
//         <div key={property.property_id} className="col mb-4">
//           <PropertyCard 
//             property={property} 
//             onDeleteProperty={onDeleteProperty}
//             commissionData={commissionData}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Main Filters Page Component =============
// const MyProperties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(true);
//   const [loadingRoles, setLoadingRoles] = useState(true);
//   const [loadingCommissions, setLoadingCommissions] = useState(false);
//   const [error, setError] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("default");

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState([]);

//   // Dynamic data states
//   const [categories, setCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [commissionData, setCommissionData] = useState([]);

//   // Handle delete property
//   const handleDeleteProperty = useCallback(async (propertyId) => {
//     try {
//       // Make API call to delete property
//       const response = await fetch(`${baseurl}/properties/${propertyId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to delete property: ${response.status}`);
//       }
      
//       // Remove property from local state
//       setProperties(prevProperties => 
//         prevProperties.filter(property => property.property_id !== propertyId)
//       );
      
//       // Update total count
//       setTotalCount(prev => prev - 1);
      
//       return true;
//     } catch (error) {
//       console.error('Error deleting property:', error);
//       throw error;
//     }
//   }, []);

//   // Fetch commission data from API
//   const fetchCommissionData = useCallback(async () => {
//     try {
//       setLoadingCommissions(true);
//       const response = await fetch(`${baseurl}/commissions-master/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCommissionData(data.results || []);
//     } catch (err) {
//       console.error("Error fetching commission data:", err);
//       setCommissionData([]);
//     } finally {
//       setLoadingCommissions(false);
//     }
//   }, []);

//   // Fetch roles from API
//   const fetchRoles = useCallback(async () => {
//     try {
//       setLoadingRoles(true);
//       const response = await fetch(`${baseurl}/roles/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setRoles(data.results || []);
//     } catch (err) {
//       console.error("Error fetching roles:", err);
//       setRoles([]);
//     } finally {
//       setLoadingRoles(false);
//     }
//   }, []);

//   // Fetch categories from API
//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoadingCategories(true);
//       const response = await fetch(`${baseurl}/property-categories/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCategories(data.results || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       setCategories([]);
//     } finally {
//       setLoadingCategories(false);
//     }
//   }, []);

//   // Fetch property types from API
//   const fetchPropertyTypes = useCallback(async () => {
//     try {
//       setLoadingTypes(true);
//       const response = await fetch(`${baseurl}/property-types/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setPropertyTypes(data.results || []);
//     } catch (err) {
//       console.error("Error fetching property types:", err);
//       setPropertyTypes([]);
//     } finally {
//       setLoadingTypes(false);
//     }
//   }, []);

//   // Fetch properties from API with filters
//   const fetchProperties = useCallback(async () => {
//     try {
//       setLoading(true);
      
//       const params = new URLSearchParams();
      
//       // Get user_id from local storage
//       const userId = localStorage.getItem('user_id');
      
//       if (userId) {
//         params.append('user_id', userId);
//       } else {
//         console.warn('user_id not found in local storage');
//       }
      
//       if (searchTerm.trim()) {
//         params.append('keyword', searchTerm.trim());
//       }
      
//       if (selectedCategories.length > 0) {
//         const categoryQuery = selectedCategories.join(',');
//         params.append('category', categoryQuery);
//       }
      
//       if (selectedTypes.length > 0) {
//         const typeQuery = selectedTypes.join(',');
//         params.append('property_type', typeQuery);
//       }
      
//       if (selectedTransactionTypes.length > 0) {
//         const lookingToQuery = selectedTransactionTypes.join(',');
//         params.append('looking_to', lookingToQuery);
//       }
      
//       if (selectedCities.length > 0) {
//         params.append('city', selectedCities.join(','));
//       }
      
//       if (selectedRoles.length > 0) {
//         const roleIds = selectedRoles.join(',');
//         params.append('user_role', roleIds);
//       }
      
//       params.append('page', currentPage);
      
//       const queryString = params.toString();
//       const url = `${baseurl}/properties/${queryString ? `?${queryString}` : ''}`;
      
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setProperties(data.results || []);
//       setTotalCount(data.count || 0);
//       setTotalPages(Math.ceil((data.count || 0) / 10));
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching properties:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     currentPage, 
//     selectedCategories, 
//     selectedTypes, 
//     selectedCities, 
//     selectedTransactionTypes,
//     selectedRoles,
//     searchTerm
//   ]);

//   // Handle filter changes
//   const handleFilterChange = useCallback(() => {
//     setCurrentPage(1);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchRoles();
//     fetchCategories();
//     fetchPropertyTypes();
//     fetchCommissionData();
//   }, [fetchRoles, fetchCategories, fetchPropertyTypes, fetchCommissionData]);

//   // Fetch properties when filters or page change
//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   // Handle search
//   const handleSearch = useCallback((term) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   }, []);

//   // Filter properties based on price ranges (client-side only)
//   const filteredProperties = useMemo(() => {
//     if (selectedPriceRanges.length === 0) {
//       return properties;
//     }

//     return properties.filter(property => {
//       const price = parseFloat(property.looking_to === "sell" 
//         ? (property.total_property_value || property.property_value)
//         : property.rent_amount || 0);
      
//       return selectedPriceRanges.some(rangeLabel => {
//         switch (rangeLabel) {
//           case "Under ₹10L":
//             return price >= 0 && price <= 1000000;
//           case "₹10L - ₹25L":
//             return price >= 1000000 && price <= 2500000;
//           case "₹25L - ₹50L":
//             return price >= 2500000 && price <= 5000000;
//           case "₹50L - ₹1Cr":
//             return price >= 5000000 && price <= 10000000;
//           case "₹1Cr - ₹5Cr":
//             return price >= 10000000 && price <= 50000000;
//           case "Over ₹5Cr":
//             return price >= 50000000;
//           default:
//             return false;
//         }
//       });
//     });
//   }, [properties, selectedPriceRanges]);

//   // Sort properties
//   const sortedProperties = useMemo(() => {
//     return [...filteredProperties].sort((a, b) => {
//       switch (sortOption) {
//         case "price-low":
//           return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
//                   parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
//         case "price-high":
//           return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
//                   parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
//         case "newest":
//           return new Date(b.created_at) - new Date(a.created_at);
//         default:
//           return 0;
//       }
//     });
//   }, [filteredProperties, sortOption]);

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Render pagination
//   const renderPagination = () => {
//     if (totalPages <= 1) return null;
    
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button 
//             className="page-link" 
//             onClick={() => handlePageChange(i)}
//             aria-label={`Go to page ${i}`}
//             aria-current={currentPage === i ? 'page' : undefined}
//           >
//             {i}
//           </button>
//         </li>
//       );
//     }

//     return (
//       <nav aria-label="Page navigation" className="mt-5">
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Go to previous page"
//             >
//               Previous
//             </button>
//           </li>
//           {startPage > 1 && (
//             <>
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(1)}
//                   aria-label="Go to page 1"
//                 >
//                   1
//                 </button>
//               </li>
//               {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//             </>
//           )}
//           {pages}
//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(totalPages)}
//                   aria-label={`Go to page ${totalPages}`}
//                 >
//                   {totalPages}
//                 </button>
//               </li>
//             </>
//           )}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Go to next page"
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   if (loading && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading properties...</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (error && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="alert alert-danger" role="alert">
//               Error loading properties: {error}
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       <WebsiteNavbar />
      
//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             totalProducts={totalCount}
//             showingProducts={sortedProperties.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//             onSearch={handleSearch}
//           />

//           <div className="row">
//             <aside className="col-lg-3 mb-4 mb-lg-0">
//               <div className="" style={{ top: '20px' }}>
//                 <FilterSidebar
//                   selectedCategories={selectedCategories}
//                   setSelectedCategories={setSelectedCategories}
//                   selectedTypes={selectedTypes}
//                   setSelectedTypes={setSelectedTypes}
//                   selectedPriceRanges={selectedPriceRanges}
//                   setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedCities={selectedCities}
//                   setSelectedCities={setSelectedCities}
//                   selectedTransactionTypes={selectedTransactionTypes}
//                   setSelectedTransactionTypes={setSelectedTransactionTypes}
//                   selectedRoles={selectedRoles}
//                   setSelectedRoles={setSelectedRoles}
//                   categories={categories}
//                   propertyTypes={propertyTypes}
//                   roles={roles}
//                   loadingCategories={loadingCategories}
//                   loadingTypes={loadingTypes}
//                   loadingRoles={loadingRoles}
//                   onFilterChange={handleFilterChange}
//                 />
//               </div>
//             </aside>

//             <div className="col-lg-9">
//               {loading && sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-3">Loading properties...</p>
//                 </div>
//               ) : sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <h5>No properties found matching your criteria.</h5>
//                   <p className="text-muted">Try adjusting your filters or search term.</p>
//                 </div>
//               ) : (
//                 <>
//                   <PropertyGrid 
//                     properties={sortedProperties} 
//                     viewMode={viewMode}
//                     onDeleteProperty={handleDeleteProperty}
//                     commissionData={commissionData}
//                   />
//                   {renderPagination()}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MyProperties;




//================================================================
// Below code with Pagination Added full code 

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Search,
  X,
  Grid2X2,
  Grid3X3,
  List,
  LayoutList,
  Filter,
  User,
  Edit,
  Trash2,
  Info
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyProperties.css";
import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// ============= Utility Functions =============
const formatPrice = (price) => {
  const priceNum = parseFloat(price);
  if (priceNum >= 10000000) {
    return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
  } else if (priceNum >= 100000) {
    return `₹${(priceNum / 100000).toFixed(2)} L`;
  }
  return `₹${priceNum.toLocaleString()}`;
};

const getImageUrl = (images) => {
  if (images && images.length > 0) {
    const imagePath = images[0].image;
    
    // Check if it's a relative path starting with /media/
    if (imagePath.startsWith('/media/')) {
      return `${baseurl}/${imagePath}`;
    }
    
    // Check if it's a relative path without leading slash
    if (imagePath.startsWith('media/')) {
      return `${baseurl}/${imagePath}`;
    }
    
    // Check if it's already a full URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // For any other relative path
    return `${baseurl}/${imagePath}`;
  }
  
  // Fallback image
  return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
};

// ============= Commission Tooltip Component =============
const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
  if (!show || !commissions || commissions.length === 0) return null;

  // Calculate commission amounts based on distribution_commission
  const calculateCommissions = () => {
    const commissionAmount = parseFloat(distributionCommission) || 0;
    return commissions.map(commission => ({
      level: commission.level_no,
      percentage: parseFloat(commission.percentage),
      amount: (commissionAmount * parseFloat(commission.percentage)) / 100
    }));
  };

  const commissionList = calculateCommissions();
  const totalCommission = commissionList.reduce((sum, comm) => sum + comm.amount, 0);

  return (
    <div className="commission-tooltip">
      <div className="commission-tooltip-content">
        <div className="commission-body">
          {commissionList.map((commission) => (
            <div key={commission.level} className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-medium">Team {commission.level}: &nbsp;₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============= Property Card Component =============
const PropertyCard = ({ property, onDeleteProperty, commissionData }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

  const handleViewDetails = () => {
    navigate(`/agent-my-properties-details/${property.property_id}`);
  };

  const handleEditProperty = () => {
    navigate(`/myproperties/edit/${property.property_id}`);
  };

  // Handle delete property
  const handleDeleteProperty = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${property.property_title}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        setIsDeleting(true);
        
        // Call the parent component's delete handler
        if (onDeleteProperty) {
          await onDeleteProperty(property.property_id);
        }
        
        // Show success message
        Swal.fire(
          'Deleted!',
          'The property has been deleted successfully.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting property:', error);
        Swal.fire(
          'Error!',
          'Failed to delete the property. Please try again.',
          'error'
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Get distribution commission
  const getDistributionCommission = () => {
    return parseFloat(property.distribution_commission || 0);
  };

  const distributionCommission = getDistributionCommission();

  // Get the image URL
  const imageUrl = getImageUrl(property.images);
  
  const formattedPrice = property.looking_to === "sell" 
    ? formatPrice(property.total_property_value || property.property_value)
    : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

  const depositText = property.deposit_amount 
    ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
    : '';

  // Handle mouse enter for commission tooltip
  const handleMouseEnter = () => {
    setShowCommissionTooltip(true);
  };

  // Handle mouse leave for commission tooltip
  const handleMouseLeave = () => {
    setShowCommissionTooltip(false);
  };

  return (
    <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
      <div className="position-relative">
        <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
          <img
            src={imageUrl}
            alt={property.property_title}
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
            }}
          />
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
            {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
          </span>
        </div>
        {property.status && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-warning text-dark">
              {property.status.toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column flex-grow-1">
        <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
          {property.property_title}
        </h6>
        <p className="card-text text-muted small mb-2">
          <i className="bi bi-geo-alt"></i>  {property.city}
        </p>
        <div className="d-flex flex-wrap gap-1 mb-2">
          {property.number_of_bedrooms && (
            <span className="badge bg-light text-dark border small">
              {property.number_of_bedrooms} BHK
            </span>
          )}
          {property.facing && (
            <span className="badge bg-light text-dark border small">
              {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
            </span>
          )}
        </div>
        
        <div className="d-flex align-items-center gap-2 mt-auto">
          <span className="h5 fw-bold text-dark">
            {formattedPrice}
            {property.looking_to === "rent" && (
              <small className="text-muted d-block">{depositText}</small>
            )}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2">
          {/* EDIT BUTTON */}
          <button
            onClick={handleEditProperty}
            className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
            style={{
              backgroundColor: "#ffc107",
              borderColor: "#ffc107",
              color: "#000",
            }}
          >
            <Edit size={16} />
            <span>Edit</span>
          </button>
          
          {/* DELETE BUTTON */}
          <button
            onClick={handleDeleteProperty}
            disabled={isDeleting}
            className="btn fw-semibold py-2 flex-fill d-flex align-items-center justify-content-center gap-1"
            style={{
              backgroundColor: "#dc3545",
              borderColor: "#dc3545",
              color: "#fff",
            }}
          >
            {isDeleting ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Deleting...</span>
                </div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      
        {/* PAYOUT BUTTON with Commission Tooltip */}
        <div className="position-relative mt-2">
          <button 
            className="btn w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
            style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
          >
            <Info size={16} />
            PAYOUT
          </button>
          
          <CommissionTooltip 
            show={showCommissionTooltip}
            commissions={commissionData}
            distributionCommission={distributionCommission}
          />
        </div>
        
        <button 
          onClick={handleViewDetails}
          className="btn w-100 fw-semibold py-2 mt-2"
          style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
        >
          {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
        </button>
      </div>
    </div>
  );
};

// ============= Filter Section Component =============
const FilterSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}) => {
  return (
    <div className="border rounded mb-3">
      <button
        onClick={onToggle}
        className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
        style={{ cursor: 'pointer' }}
        aria-label={`Toggle ${title} filter section`}
        aria-expanded={isOpen}
      >
        <span className="fw-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-3 pb-3">
          {children}
        </div>
      )}
    </div>
  );
};

// ============= Filter Sidebar Component =============
const FilterSidebar = ({ 
  selectedCategories, 
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedCities,
  setSelectedCities,
  selectedTransactionTypes,
  setSelectedTransactionTypes,
  selectedRoles,
  setSelectedRoles,
  categories,
  propertyTypes,
  roles,
  loadingCategories,
  loadingTypes,
  loadingRoles,
  onFilterChange
}) => {
  const [activeFilters, setActiveFilters] = useState({
    transaction: true,
    role: true,
    categories: true,
    price: true,
    type: true,
    location: true
  });

  const [categorySearch, setCategorySearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [roleSearch, setRoleSearch] = useState("");

  const priceRanges = [
    { label: "Under ₹10L", min: 0, max: 1000000 },
    { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
    { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
    { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
    { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
  ];

  const cities = [
    { name: "Karimnagar", count: 12 },
    { name: "Hyderabad", count: 35 },
    { name: "Visakhapatnam", count: 42 },
    { name: "Nandyal", count: 38 },
    { name: "Adoni", count: 19 },
    { name: "Amudalavalasa", count: 22 },
  ];

  const transactionTypes = [
    { name: "sell", displayName: "Sale", count: 65 },
    { name: "rent", displayName: "Rent", count: 35 },
  ];

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categories, categorySearch]);

  const filteredTypes = useMemo(() => {
    return propertyTypes.filter((type) =>
      type.name.toLowerCase().includes(typeSearch.toLowerCase())
    );
  }, [propertyTypes, typeSearch]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      role.role_name.toLowerCase().includes(roleSearch.toLowerCase())
    );
  }, [roles, roleSearch]);

  const toggleFilterSection = (section) => {
    setActiveFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = useCallback((categoryName) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedCategories, onFilterChange]);

  const toggleType = useCallback((typeName) => {
    setSelectedTypes((prev) => {
      const newSelection = prev.includes(typeName)
        ? prev.filter((b) => b !== typeName)
        : [...prev, typeName];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedTypes, onFilterChange]);

  const togglePriceRange = useCallback((range) => {
    setSelectedPriceRanges((prev) => {
      const newSelection = prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedPriceRanges, onFilterChange]);

  const toggleCity = useCallback((name) => {
    setSelectedCities((prev) => {
      const newSelection = prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedCities, onFilterChange]);

  const toggleTransactionType = useCallback((type) => {
    setSelectedTransactionTypes((prev) => {
      const newSelection = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedTransactionTypes, onFilterChange]);

  const toggleRole = useCallback((roleId) => {
    setSelectedRoles((prev) => {
      const newSelection = prev.includes(roleId)
        ? prev.filter((r) => r !== roleId)
        : [...prev, roleId];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedRoles, onFilterChange]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedPriceRanges([]);
    setSelectedCities([]);
    setSelectedTransactionTypes([]);
    setSelectedRoles([]);
    setCategorySearch("");
    setTypeSearch("");
    setCitySearch("");
    setRoleSearch("");
    
    if (onFilterChange) {
      setTimeout(() => onFilterChange(), 0);
    }
  };

  const activeFilterCount = 
    selectedCategories.length + 
    selectedTypes.length + 
    selectedPriceRanges.length + 
    selectedCities.length +
    selectedTransactionTypes.length +
    selectedRoles.length;

  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-semibold mb-0">
          <Filter className="h-5 w-5 me-2" />
          Filters
        </h5>
        {activeFilterCount > 0 && (
          <button 
            onClick={clearAllFilters}
            className="btn btn-sm btn-outline-secondary"
            aria-label="Clear all filters"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Transaction Type Filter */}
      <FilterSection
        title="Looking For"
        isOpen={activeFilters.transaction}
        onToggle={() => toggleFilterSection('transaction')}
      >
        <div className="overflow-y-auto">
          {transactionTypes.map((type) => (
            <div
              key={type.name}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleTransactionType(type.name)}
              onKeyPress={(e) => e.key === 'Enter' && toggleTransactionType(type.name)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedTransactionTypes.includes(type.name)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedTransactionTypes.includes(type.name)}
                  readOnly
                  tabIndex={-1}
                />
                <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {type.displayName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Categories Filter */}
      <FilterSection
        title="Property Category"
        isOpen={activeFilters.categories}
        onToggle={() => toggleFilterSection('categories')}
      >
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search categories..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            aria-label="Search categories"
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {loadingCategories ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading categories...</span>
              </div>
              <p className="small text-muted mt-2">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <p className="small text-muted text-center py-3">No categories found</p>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.property_category_id}
                className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleCategory(category.name.toLowerCase())}
                onKeyPress={(e) => e.key === 'Enter' && toggleCategory(category.name.toLowerCase())}
                tabIndex={0}
                role="checkbox"
                aria-checked={selectedCategories.includes(category.name.toLowerCase())}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedCategories.includes(category.name.toLowerCase())}
                    readOnly
                    tabIndex={-1}
                  />
                  <span className={`small ${selectedCategories.includes(category.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                    {category.name}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </FilterSection>

      {/* Property Type Filter */}
      <FilterSection
        title="Property Type"
        isOpen={activeFilters.type}
        onToggle={() => toggleFilterSection('type')}
      >
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search property types..."
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
            aria-label="Search property types"
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {loadingTypes ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading property types...</span>
              </div>
              <p className="small text-muted mt-2">Loading property types...</p>
            </div>
          ) : filteredTypes.length === 0 ? (
            <p className="small text-muted text-center py-3">No property types found</p>
          ) : (
            filteredTypes.map((type) => (
              <div
                key={type.property_type_id}
                className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleType(type.name.toLowerCase())}
                onKeyPress={(e) => e.key === 'Enter' && toggleType(type.name.toLowerCase())}
                tabIndex={0}
                role="checkbox"
                aria-checked={selectedTypes.includes(type.name.toLowerCase())}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedTypes.includes(type.name.toLowerCase())}
                    readOnly
                    tabIndex={-1}
                  />
                  <span className={`small ${selectedTypes.includes(type.name.toLowerCase()) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                    {type.name}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title="Price Range"
        isOpen={activeFilters.price}
        onToggle={() => toggleFilterSection('price')}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {priceRanges.map((range) => (
            <div
              key={range.label}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => togglePriceRange(range.label)}
              onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.label)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedPriceRanges.includes(range.label)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedPriceRanges.includes(range.label)}
                  readOnly
                  tabIndex={-1}
                />
                <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {range.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="mt-4">
          <h6 className="fw-semibold mb-2">Active Filters:</h6>
          <div className="d-flex flex-wrap gap-2">
            {selectedTransactionTypes.map(type => (
              <span key={type} className="badge bg-info-subtle text-info border border-info d-flex align-items-center">
                {type === 'sell' ? 'Sale' : 'Rent'}
                <button 
                  onClick={() => toggleTransactionType(type)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${type} filter`}
                ></button>
              </span>
            ))}
            {selectedRoles.map(roleId => {
              const role = roles.find(r => r.role_id === roleId);
              return (
                <span key={roleId} className="badge bg-purple-subtle text-purple border border-purple d-flex align-items-center">
                  {role?.role_name || 'Role'}
                  <button 
                    onClick={() => toggleRole(roleId)} 
                    className="btn-close btn-close-sm ms-1"
                    aria-label={`Remove ${role?.role_name} role filter`}
                  ></button>
                </span>
              );
            })}
            {selectedCategories.map(catName => (
              <span key={catName} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
                {catName.charAt(0).toUpperCase() + catName.slice(1)}
                <button 
                  onClick={() => toggleCategory(catName)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${catName} category filter`}
                ></button>
              </span>
            ))}
            {selectedTypes.map(typeName => (
              <span key={typeName} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
                {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                <button 
                  onClick={() => toggleType(typeName)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${typeName} type filter`}
                ></button>
              </span>
            ))}
            {selectedPriceRanges.map(range => (
              <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
                {range}
                <button 
                  onClick={() => togglePriceRange(range)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${range} price filter`}
                ></button>
              </span>
            ))}
            {selectedCities.map(city => (
              <span key={city} className="badge bg-danger-subtle text-danger border border-danger d-flex align-items-center">
                {city}
                <button 
                  onClick={() => toggleCity(city)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${city} location filter`}
                ></button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============= Product Header Component =============
const ProductHeader = ({
  totalProducts,
  showingProducts,
  viewMode,
  onViewModeChange,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  onSearch
}) => {
  const viewButtons = [
    { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
    { mode: "list", icon: List, label: "List" },
    { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="row align-items-center justify-content-between mb-4">
      <div className="col-md-6 mb-3 mb-md-0">
        <div className="d-flex align-items-center">
          <h4 className="fw-bold mb-0 me-3">Properties</h4>
          <p className="mb-0 text-muted">
            Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
            <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
            properties
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
          <div className="input-group" style={{ width: '200px' }}>
            <span className="input-group-text bg-transparent border-end-0">
              <Search className="h-4 w-4 text-muted" />
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              aria-label="Search properties"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="btn btn-outline-secondary border-start-0"
                type="button"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="btn-group" role="group" aria-label="View mode">
            {viewButtons.map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`btn btn-outline-secondary ${
                  viewMode === mode ? "active" : ""
                }`}
                style={{ padding: '0.375rem 0.75rem' }}
                title={label}
                aria-label={`Switch to ${label} view`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <select 
            className="form-select form-select-sm" 
            style={{ width: '130px' }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort properties"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// ============= Property Grid Component =============
const PropertyGrid = ({ properties, viewMode, onDeleteProperty, commissionData }) => {
  const getGridClasses = () => {
    switch (viewMode) {
      case "grid-3":
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
      case "grid-4":
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
      case "list":
        return "row row-cols-1";
      default:
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
    }
  };

  const navigate = useNavigate();

  // In list view mode, show properties differently
  if (viewMode === "list") {
    return (
      <div className="list-group">
        {properties.map((property) => {
          const imageUrl = getImageUrl(property.images);
          
          const getPriceInfo = () => {
            if (property.looking_to === "sell") {
              const price = property.total_property_value || property.property_value;
              return {
                price: formatPrice(price),
                suffix: "",
                showDeposit: false
              };
            } else {
              return {
                price: `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`,
                suffix: property.deposit_amount 
                  ? `Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
                  : '',
                showDeposit: true
              };
            }
          };

          const priceInfo = getPriceInfo();

          // Create a separate ListPropertyItem for list view
          const ListPropertyItem = ({ property }) => {
            const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

            // Get distribution commission
            const getDistributionCommission = () => {
              return parseFloat(property.distribution_commission || 0);
            };

            const distributionCommission = getDistributionCommission();

            const handleMouseEnter = () => {
              setShowCommissionTooltip(true);
            };

            const handleMouseLeave = () => {
              setShowCommissionTooltip(false);
            };

            return (
              <div className="list-group-item mb-3">
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
                      <img
                        src={imageUrl}
                        alt={property.property_title}
                        className="img-fluid"
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-start gap-2 mb-2">
                      <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
                      {property.status && (
                        <span className="badge bg-warning text-dark small">
                          {property.status.toUpperCase()}
                        </span>
                      )}
                      <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
                        {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
                      </span>
                    </div>
                    <p className="card-text text-muted small mb-2">
                      <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {property.area && (
                        <span className="badge bg-light text-dark border small">
                          {property.area} {property.area_unit || 'sq ft'}
                        </span>
                      )}
                      {property.number_of_bedrooms && (
                        <span className="badge bg-light text-dark border small">
                          {property.number_of_bedrooms} BHK
                        </span>
                      )}
                      {property.facing && (
                        <span className="badge bg-light text-dark border small">
                          {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
                        </span>
                      )}
                    </div>
                    
                    <div className="d-flex align-items-center gap-2">
                      <span className="h5 fw-bold text-dark">
                        {priceInfo.price}
                        {priceInfo.showDeposit && priceInfo.suffix && (
                          <small className="text-muted d-block">{priceInfo.suffix}</small>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column gap-2">
                    {/* Action Buttons for List View */}
                    <div className="d-flex gap-2 mb-2">
                      <button
                        onClick={() => navigate(`/myproperties/edit/${property.property_id}`)}
                        className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
                        style={{
                          backgroundColor: "#ffc107",
                          borderColor: "#ffc107",
                          color: "#000",
                        }}
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      
                      <button
                        onClick={() => onDeleteProperty && onDeleteProperty(property.property_id)}
                        className="btn fw-semibold flex-fill d-flex align-items-center justify-content-center gap-1"
                        style={{
                          backgroundColor: "#dc3545",
                          borderColor: "#dc3545",
                          color: "#fff",
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                    
                    {/* PAYOUT BUTTON for List View */}
                    <div className="position-relative">
                      <button 
                        className="btn fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 w-100"
                        style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onFocus={handleMouseEnter}
                        onBlur={handleMouseLeave}
                      >
                        <Info size={14} />
                        PAYOUT
                      </button>
                      
                      <CommissionTooltip 
                        show={showCommissionTooltip}
                        commissions={commissionData}
                        distributionCommission={distributionCommission}
                      />
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/agent-my-properties-details/${property.property_id}`)}
                      className="btn fw-semibold py-2"
                      style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
                    >
                      {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
                    </button>
                  </div>
                </div>
              </div>
            );
          };

          return <ListPropertyItem key={property.property_id} property={property} />;
        })}
      </div>
    );
  }

  return (
    <div className={getGridClasses()}>
      {properties.map((property) => (
        <div key={property.property_id} className="col mb-4">
          <PropertyCard 
            property={property} 
            onDeleteProperty={onDeleteProperty}
            commissionData={commissionData}
          />
        </div>
      ))}
    </div>
  );
};

// ============= Main Filters Page Component =============
const MyProperties = () => {
  const [viewMode, setViewMode] = useState("grid-4");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingCommissions, setLoadingCommissions] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Dynamic data states
  const [categories, setCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [commissionData, setCommissionData] = useState([]);

  // Page size state
  const [pageSize, setPageSize] = useState(10);

  // Handle delete property
  const handleDeleteProperty = useCallback(async (propertyId) => {
    try {
      const response = await fetch(`${baseurl}/properties/${propertyId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete property: ${response.status}`);
      }
      
      // Remove property from local state
      setProperties(prevProperties => 
        prevProperties.filter(property => property.property_id !== propertyId)
      );
      
      // Update total count
      setTotalCount(prev => prev - 1);
      
      // Recalculate total pages
      setTotalPages(Math.ceil((totalCount - 1) / pageSize));
      
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  }, [totalCount, pageSize]);

  // Fetch commission data from API
  const fetchCommissionData = useCallback(async () => {
    try {
      setLoadingCommissions(true);
      const response = await fetch(`${baseurl}/commissions-master/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCommissionData(data.results || []);
    } catch (err) {
      console.error("Error fetching commission data:", err);
      setCommissionData([]);
    } finally {
      setLoadingCommissions(false);
    }
  }, []);

  // Fetch roles from API
  const fetchRoles = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const response = await fetch(`${baseurl}/roles/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoles(data.results || []);
    } catch (err) {
      console.error("Error fetching roles:", err);
      setRoles([]);
    } finally {
      setLoadingRoles(false);
    }
  }, []);

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch(`${baseurl}/property-categories/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data.results || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // Fetch property types from API
  const fetchPropertyTypes = useCallback(async () => {
    try {
      setLoadingTypes(true);
      const response = await fetch(`${baseurl}/property-types/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPropertyTypes(data.results || []);
    } catch (err) {
      console.error("Error fetching property types:", err);
      setPropertyTypes([]);
    } finally {
      setLoadingTypes(false);
    }
  }, []);

  // Fetch properties from API with filters
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      
      // Get user_id from local storage
      const userId = localStorage.getItem('user_id');
      
      if (userId) {
        params.append('user_id', userId);
      } else {
        console.warn('user_id not found in local storage');
      }
      
      if (searchTerm.trim()) {
        params.append('keyword', searchTerm.trim());
      }
      
      if (selectedCategories.length > 0) {
        const categoryQuery = selectedCategories.join(',');
        params.append('category', categoryQuery);
      }
      
      if (selectedTypes.length > 0) {
        const typeQuery = selectedTypes.join(',');
        params.append('property_type', typeQuery);
      }
      
      if (selectedTransactionTypes.length > 0) {
        const lookingToQuery = selectedTransactionTypes.join(',');
        params.append('looking_to', lookingToQuery);
      }
      
      if (selectedCities.length > 0) {
        params.append('city', selectedCities.join(','));
      }
      
      if (selectedRoles.length > 0) {
        const roleIds = selectedRoles.join(',');
        params.append('user_role', roleIds);
      }
      
      // Pagination parameters
      params.append('page', currentPage);
      params.append('page_size', pageSize);
      
      const queryString = params.toString();
      const url = `${baseurl}/properties/${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data.results || []);
      setTotalCount(data.count || 0);
      setTotalPages(Math.ceil((data.count || 0) / pageSize));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage, 
    selectedCategories, 
    selectedTypes, 
    selectedCities, 
    selectedTransactionTypes,
    selectedRoles,
    searchTerm,
    pageSize
  ]);

  // Handle filter changes
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchRoles();
    fetchCategories();
    fetchPropertyTypes();
    fetchCommissionData();
  }, [fetchRoles, fetchCategories, fetchPropertyTypes, fetchCommissionData]);

  // Fetch properties when filters or page change
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  // Filter properties based on price ranges (client-side only)
  const filteredProperties = useMemo(() => {
    if (selectedPriceRanges.length === 0) {
      return properties;
    }

    return properties.filter(property => {
      const price = parseFloat(property.looking_to === "sell" 
        ? (property.total_property_value || property.property_value)
        : property.rent_amount || 0);
      
      return selectedPriceRanges.some(rangeLabel => {
        switch (rangeLabel) {
          case "Under ₹10L":
            return price >= 0 && price <= 1000000;
          case "₹10L - ₹25L":
            return price >= 1000000 && price <= 2500000;
          case "₹25L - ₹50L":
            return price >= 2500000 && price <= 5000000;
          case "₹50L - ₹1Cr":
            return price >= 5000000 && price <= 10000000;
          case "₹1Cr - ₹5Cr":
            return price >= 10000000 && price <= 50000000;
          case "Over ₹5Cr":
            return price >= 50000000;
          default:
            return false;
        }
      });
    });
  }, [properties, selectedPriceRanges]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
                  parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
        case "price-high":
          return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
                  parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
        default:
          return 0;
      }
    });
  }, [filteredProperties, sortOption]);

  // Render pagination
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <nav aria-label="Properties pagination" className="mt-5">
        <ul className="pagination justify-content-center flex-wrap">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="visually-hidden">Previous</span>
            </button>
          </li>
          
          {/* First Page */}
          {currentPage > 2 && (
            <li className="page-item">
              <button 
                className="page-link" 
                onClick={() => handlePageChange(1)}
                aria-label="Go to page 1"
              >
                1
              </button>
            </li>
          )}
          
          {/* Ellipsis if needed */}
          {currentPage > 3 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          
          {/* Page Before Current */}
          {currentPage > 1 && (
            <li className="page-item">
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label={`Go to page ${currentPage - 1}`}
              >
                {currentPage - 1}
              </button>
            </li>
          )}
          
          {/* Current Page */}
          <li className="page-item active" aria-current="page">
            <button className="page-link">
              {currentPage}
              <span className="visually-hidden">(current)</span>
            </button>
          </li>
          
          {/* Page After Current */}
          {currentPage < totalPages && (
            <li className="page-item">
              <button 
                className="page-link" 
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label={`Go to page ${currentPage + 1}`}
              >
                {currentPage + 1}
              </button>
            </li>
          )}
          
          {/* Ellipsis if needed */}
          {currentPage < totalPages - 2 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          
          {/* Last Page */}
          {currentPage < totalPages - 1 && (
            <li className="page-item">
              <button 
                className="page-link" 
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </li>
          )}
          
          {/* Next Button */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              <span className="visually-hidden">Next</span>
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
        
        {/* Page Info */}
        <div className="text-center text-muted small mt-2">
          Page {currentPage} of {totalPages} • {totalCount} total properties
        </div>
      </nav>
    );
  };

  if (loading && properties.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <WebsiteNavbar />
        <main className="flex-grow-1 bg-light">
          <div className="container py-5">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading properties...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error && properties.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <WebsiteNavbar />
        <main className="flex-grow-1 bg-light">
          <div className="container py-5">
            <div className="alert alert-danger" role="alert">
              Error loading properties: {error}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <WebsiteNavbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <ProductHeader
            totalProducts={totalCount}
            showingProducts={sortedProperties.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onSearch={handleSearch}
          />

          <div className="row">
            <aside className="col-lg-3 mb-4 mb-lg-0">
              <div className="" style={{ top: '20px' }}>
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  selectedPriceRanges={selectedPriceRanges}
                  setSelectedPriceRanges={setSelectedPriceRanges}
                  selectedCities={selectedCities}
                  setSelectedCities={setSelectedCities}
                  selectedTransactionTypes={selectedTransactionTypes}
                  setSelectedTransactionTypes={setSelectedTransactionTypes}
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                  categories={categories}
                  propertyTypes={propertyTypes}
                  roles={roles}
                  loadingCategories={loadingCategories}
                  loadingTypes={loadingTypes}
                  loadingRoles={loadingRoles}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </aside>

            <div className="col-lg-9">
              {loading && sortedProperties.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading properties...</p>
                </div>
              ) : sortedProperties.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No properties found matching your criteria.</h5>
                  <p className="text-muted">Try adjusting your filters or search term.</p>
                </div>
              ) : (
                <>
                  <PropertyGrid 
                    properties={sortedProperties} 
                    viewMode={viewMode}
                    onDeleteProperty={handleDeleteProperty}
                    commissionData={commissionData}
                  />
                  {renderPagination()}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProperties;