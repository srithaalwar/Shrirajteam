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
//   Trash2,
//   Edit
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./PropertiesList.css";
// import WebsiteNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Info } from "lucide-react";

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
    
//     if (imagePath.startsWith('/media/')) {
//       return `${baseurl}${imagePath}`;
//     }
    
//     if (imagePath.startsWith('media/')) {
//       return `${baseurl}/${imagePath}`;
//     }
    
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }
    
//     return `${baseurl}/${imagePath}`;
//   }
  
//   return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// };

// // ============= Commission Tooltip Component =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;

//   const calculateCommissions = () => {
//     const commissionAmount = parseFloat(distributionCommission) || 0;
//     return commissions.map(commission => ({
//       level: commission.level_no,
//       percentage: parseFloat(commission.percentage),
//       amount: (commissionAmount * parseFloat(commission.percentage)) / 100
//     }));
//   };

//   const commissionList = calculateCommissions();

//   return (
//     <div className="commission-tooltip">
//       <div className="commission-tooltip-content">
//         <div className="commission-body">
//           {commissionList.map((commission) => (
//             <div key={commission.level} className="d-flex justify-content-between align-items-center mb-2">
//               <span className="fw-medium">Team {commission.level}:&nbsp;₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Mobile Filter Modal Component =============
// const MobileFilterModal = ({ 
//   isOpen, 
//   onClose, 
//   children,
//   activeFilterCount,
//   onClearAll
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
//       <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down" role="document">
//         <div className="modal-content h-100">
//           <div className="modal-header bg-white" style={{ zIndex: 1050 }}>
//             <h5 className="modal-title d-flex align-items-center gap-2">
//               <Filter size={20} />
//               Filters
//               {activeFilterCount > 0 && (
//                 <span className="badge bg-primary rounded-pill">{activeFilterCount}</span>
//               )}
//             </h5>
//             <div className="d-flex align-items-center gap-2">
//               {activeFilterCount > 0 && (
//                 <button 
//                   onClick={onClearAll}
//                   className="btn btn-sm btn-outline-danger me-2"
//                 >
//                   Clear All
//                 </button>
//               )}
//               <button 
//                 type="button" 
//                 className="btn-close" 
//                 onClick={onClose}
//                 aria-label="Close"
//               ></button>
//             </div>
//           </div>
//           <div className="modal-body">
//             {children}
//           </div>
//           <div className="modal-footer sticky-bottom bg-white border-top">
//             <button 
//               type="button" 
//               className="btn btn-primary w-100"
//               onClick={onClose}
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Card Component =============
// const PropertyCard = ({ property, onVerificationStatusUpdate, onDeleteProperty, commissionData, hasActiveSubscription }) => {
//   const navigate = useNavigate();
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [verificationStatus, setVerificationStatus] = useState(property.verification_status || 'pending');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

//   const handleViewDetails = () => {
//     // Check if user has active subscription
//     if (!hasActiveSubscription) {
//       Swal.fire({
//         title: 'Subscription Required',
//         text: 'Please purchase a subscription to view property details.',
//         icon: 'warning',
//         confirmButtonColor: '#273c75',
//         confirmButtonText: 'OK'
//       });
//       return;
//     }
//     navigate(`/client-properties-details/${property.property_id}`);
//   };

//   const handleEditProperty = () => {
//     navigate(`/edit-property/${property.property_id}`);
//   };

//   // Handle delete property
//   const handleDeleteProperty = async () => {
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
        
//         if (onDeleteProperty) {
//           await onDeleteProperty(property.property_id);
//         }
        
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
//   const imageUrl = getImageUrl(property.images);
  
//   const formattedPrice = property.looking_to === "sell" 
//     ? formatPrice(property.total_property_value || property.property_value)
//     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount 
//     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//     : '';

//   // Handle verification status change
//   const handleVerificationStatusChange = async (e) => {
//     const newStatus = e.target.value;
//     const previousStatus = verificationStatus;
    
//     setVerificationStatus(newStatus);
    
//     try {
//       setIsUpdating(true);
      
//       const response = await fetch(`${baseurl}/properties/${property.property_id}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           verification_status: newStatus
//         })
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to update verification status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (onVerificationStatusUpdate) {
//         onVerificationStatusUpdate(property.property_id, newStatus);
//       }
      
//       console.log('Verification status updated successfully:', result);
      
//     } catch (error) {
//       console.error('Error updating verification status:', error);
//       setVerificationStatus(previousStatus);
//       alert(`Failed to update verification status: ${error.message}. Please try again.`);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

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
//           <i className="bi bi-geo-alt"></i> {property.city}
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

//         {/* PAYOUT BUTTON with Commission Tooltip - Commented out */}
//         {/* <div className="position-relative mt-2">
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
//         </div> */}
        
//         <button 
//           onClick={handleViewDetails}
//           className="btn w-100 fw-semibold py-2 mt-2"
//           style={{ 
//             backgroundColor: !hasActiveSubscription ? '#95a5a6' : '#273c75', 
//             borderColor: !hasActiveSubscription ? '#7f8c8d' : '#273c75', 
//             color: '#fff',
//             cursor: !hasActiveSubscription ? 'not-allowed' : 'pointer',
//             opacity: !hasActiveSubscription ? 0.65 : 1
//           }}
//           disabled={!hasActiveSubscription}
//           title={!hasActiveSubscription ? 'Subscription required to view details' : ''}
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
//         className="w-100 border-0 bg-transparent"
//         style={{ 
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '1rem',
//           width: '100%',
//           minHeight: '54px'
//         }}
//         aria-label={`Toggle ${title} filter section`}
//         aria-expanded={isOpen}
//       >
//         <span className="fw-medium" style={{ whiteSpace: 'nowrap' }}>{title}</span>
//         <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
//           {isOpen ? (
//             <ChevronUp size={20} className="text-muted" />
//           ) : (
//             <ChevronDown size={20} className="text-muted" />
//           )}
//         </div>
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
//   selectedSortOptions,
//   setSelectedSortOptions,
//   categories,
//   propertyTypes,
//   roles,
//   loadingCategories,
//   loadingTypes,
//   loadingRoles,
//   onFilterChange,
//   isMobile = false
// }) => {
//   const [activeFilters, setActiveFilters] = useState({
//     transaction: false,
//     role: false,
//     categories: false,
//     price: false,
//     type: false,
//     location: false,
//     sort: false
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

//   const sortOptions = [
//     { value: "default", label: "Default" },
//     { value: "price-low", label: "Price: Low to High" },
//     { value: "price-high", label: "Price: High to Low" },
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

//   const toggleSortOption = useCallback((sortValue) => {
//     setSelectedSortOptions((prev) => {
//       // For sort, we want single selection (radio behavior)
//       // If clicking the same option, deselect it (go back to default)
//       if (prev.includes(sortValue)) {
//         return [];
//       } else {
//         return [sortValue];
//       }
//     });
    
//     if (onFilterChange) {
//       setTimeout(() => onFilterChange(), 0);
//     }
//   }, [setSelectedSortOptions, onFilterChange]);

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setSelectedRoles([]);
//     setSelectedSortOptions([]);
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
//     selectedRoles.length +
//     selectedSortOptions.length;

//   return (
//     <div className="w-100">
//       {!isMobile && (
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="fw-semibold mb-0">
//             <Filter className="h-5 w-5 me-2" />
//             Filters
//           </h5>
//           {activeFilterCount > 0 && (
//             <button 
//               onClick={clearAllFilters}
//               className="btn btn-sm btn-outline-secondary"
//               aria-label="Clear all filters"
//             >
//               Clear All ({activeFilterCount})
//             </button>
//           )}
//         </div>
//       )}

//       {/* Sort Filter */}
//       <FilterSection
//         title="Sort By"
//         isOpen={activeFilters.sort}
//         onToggle={() => toggleFilterSection('sort')}
//       >
//         <div className="overflow-y-auto">
//           {sortOptions.map((option) => (
//             <div
//               key={option.value}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleSortOption(option.value)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleSortOption(option.value)}
//               tabIndex={0}
//               role="radio"
//               aria-checked={selectedSortOptions.includes(option.value)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="radio"
//                   name="sortOption"
//                   className="form-check-input"
//                   checked={selectedSortOptions.includes(option.value)}
//                   readOnly
//                   tabIndex={-1}
//                   onChange={() => {}}
//                 />
//                 <span className={`small ${selectedSortOptions.includes(option.value) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {option.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

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
//                   onChange={() => {}}
//                 />
//                 <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.displayName}
//                 </span>
//               </div>
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
//                     onChange={() => {}}
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
//                     onChange={() => {}}
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
//                   onChange={() => {}}
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
//             {selectedSortOptions.map(sortValue => {
//               const sortOption = sortOptions.find(o => o.value === sortValue);
//               return (
//                 <span key={sortValue} className="badge bg-dark-subtle text-dark border border-dark d-flex align-items-center">
//                   Sort: {sortOption?.label || sortValue}
//                   <button 
//                     onClick={() => toggleSortOption(sortValue)} 
//                     className="btn-close btn-close-sm ms-1"
//                     aria-label={`Remove sort filter`}
//                   ></button>
//                 </span>
//               );
//             })}
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
//   onSearch,
//   onOpenMobileFilters,
//   activeFilterCount,
//   pageSize,
//   setPageSize
// }) => {
//   const viewButtons = [
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
//     <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4">
//       <div className="d-flex flex-wrap align-items-center gap-3 mb-2 mb-md-0">
//         <h4 className="fw-bold mb-0">Properties</h4>
//         <p className="mb-0 text-muted">
//           Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//           <span className="fw-semibold text-primary">{totalProducts}</span> properties
//         </p>
//       </div>

//       <div className="d-flex align-items-center gap-3 w-50 w-md-auto flex-wrap">
//         <div className="input-group flex-grow-1" style={{ minWidth: '200px' }}>
//           <span className="input-group-text bg-transparent border-end-0">
//             <Search className="h-4 w-4 text-muted" />
//           </span>
//           <input
//             type="text"
//             className="form-control form-control-sm border-start-0"
//             placeholder="Search properties..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             onKeyPress={handleKeyPress}
//             aria-label="Search properties"
//           />
//           {searchTerm && (
//             <button
//               onClick={handleClearSearch}
//               className="btn btn-outline-secondary border-start-0"
//               type="button"
//               aria-label="Clear search"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           )}
//         </div>

//         <div className="btn-group" role="group" aria-label="View mode">
//           {viewButtons.map(({ mode, icon: Icon, label }) => (
//             <button
//               key={mode}
//               onClick={() => onViewModeChange(mode)}
//               className={`btn btn-outline-secondary ${
//                 viewMode === mode ? "active" : ""
//               }`}
//               style={{ padding: '0.375rem 0.75rem' }}
//               title={label}
//               aria-label={`Switch to ${label} view`}
//             >
//               <Icon className="h-4 w-4" />
//             </button>
//           ))}
//         </div>

//         {/* Items per page selector - Hidden on mobile, shown in filters modal */}
//         <select 
//           className="form-select form-select-sm d-none d-md-block" 
//           style={{ width: '120px' }}
//           value={pageSize}
//           onChange={(e) => setPageSize(Number(e.target.value))}
//           aria-label="Items per page"
//         >
//           <option value="10">10 per page</option>
//           <option value="20">20 per page</option>
//           <option value="50">50 per page</option>
//         </select>

//         {/* Mobile Filter Button - Hidden on desktop */}
//         <button 
//           onClick={onOpenMobileFilters}
//           className="btn btn-primary d-md-none d-flex align-items-center gap-2"
//         >
//           <Filter size={16} />
//           Filters
//           {activeFilterCount > 0 && (
//             <span className="badge bg-white text-primary rounded-pill">
//               {activeFilterCount}
//             </span>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============= Property Grid Component =============
// const PropertyGrid = ({ properties, viewMode, onVerificationStatusUpdate, onDeleteProperty, commissionData, hasActiveSubscription }) => {
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
            
//             const handleViewDetails = () => {
//               if (!hasActiveSubscription) {
//                 Swal.fire({
//                   title: 'Subscription Required',
//                   text: 'Please purchase a subscription to view property details.',
//                   icon: 'warning',
//                   confirmButtonColor: '#273c75',
//                   confirmButtonText: 'OK'
//                 });
//                 return;
//               }
//               navigate(`/client-properties-details/${property.property_id}`);
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
//                     {/* PAYOUT BUTTON for List View - Commented out */}
//                     {/* <div className="position-relative">
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
//                     </div> */}
                    
//                     <button 
//                       onClick={handleViewDetails}
//                       className="btn fw-semibold py-2"
//                       style={{ 
//                         backgroundColor: !hasActiveSubscription ? '#95a5a6' : '#273c75', 
//                         borderColor: !hasActiveSubscription ? '#7f8c8d' : '#273c75', 
//                         color: '#fff',
//                         cursor: !hasActiveSubscription ? 'not-allowed' : 'pointer',
//                         opacity: !hasActiveSubscription ? 0.65 : 1
//                       }}
//                       disabled={!hasActiveSubscription}
//                       title={!hasActiveSubscription ? 'Subscription required to view details' : ''}
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
//             onVerificationStatusUpdate={onVerificationStatusUpdate}
//             onDeleteProperty={onDeleteProperty}
//             commissionData={commissionData}
//             hasActiveSubscription={hasActiveSubscription}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Main Filters Page Component =============
// const ClientProperties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(true);
//   const [loadingRoles, setLoadingRoles] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [commissionData, setCommissionData] = useState([]);
//   const [loadingCommissions, setLoadingCommissions] = useState(false);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   // Subscription state
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [loadingSubscription, setLoadingSubscription] = useState(true);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
//   const [selectedRoles, setSelectedRoles] = useState([]);
//   const [selectedSortOptions, setSelectedSortOptions] = useState([]);

//   // Dynamic data states
//   const [categories, setCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [roles, setRoles] = useState([]);

//   // Get current user ID from localStorage
//   const currentUserId = localStorage.getItem("user_id");

//   // Calculate active filter count
//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedTypes.length + 
//     selectedPriceRanges.length + 
//     selectedCities.length +
//     selectedTransactionTypes.length +
//     selectedRoles.length +
//     selectedSortOptions.length;

//   // Handle clear all filters
//   const handleClearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setSelectedRoles([]);
//     setSelectedSortOptions([]);
//     setCurrentPage(1);
//   };

//   // Fetch user subscription status
//   const fetchUserSubscription = useCallback(async () => {
//     if (!currentUserId) {
//       setHasActiveSubscription(false);
//       setLoadingSubscription(false);
//       return;
//     }

//     try {
//       setLoadingSubscription(true);
//       const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
//       if (res.ok) {
//         const response = await res.json();
//         console.log("Subscription API Response:", response);
        
//         // Check if user has any active subscription based on latest_status
//         if (response && response.latest_status === "paid") {
//           setHasActiveSubscription(true);
//         } else {
//           setHasActiveSubscription(false);
//         }
//       } else {
//         console.error('Failed to fetch subscription:', res.status);
//         setHasActiveSubscription(false);
//       }
//     } catch (err) {
//       console.error('Error fetching user subscription:', err);
//       setHasActiveSubscription(false);
//     } finally {
//       setLoadingSubscription(false);
//     }
//   }, [currentUserId]);

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

//   const handleVerificationStatusUpdate = useCallback((propertyId, newStatus) => {
//     setProperties(prevProperties => 
//       prevProperties.map(property => 
//         property.property_id === propertyId 
//           ? { ...property, verification_status: newStatus }
//           : property
//       )
//     );
//     setFilteredProperties(prevProperties => 
//       prevProperties.map(property => 
//         property.property_id === propertyId 
//           ? { ...property, verification_status: newStatus }
//           : property
//       )
//     );
//   }, []);

//   // Handle delete property
//   const handleDeleteProperty = useCallback(async (propertyId) => {
//     try {
//       const response = await fetch(`${baseurl}/properties/${propertyId}/`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`Failed to delete property: ${response.status}`);
//       }
      
//       setProperties(prevProperties => 
//         prevProperties.filter(property => property.property_id !== propertyId)
//       );
//       setFilteredProperties(prevProperties => 
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

//   // Fetch approved properties from API with pagination
//   const fetchApprovedProperties = useCallback(async () => {
//     try {
//       setLoading(true);
      
//       const params = new URLSearchParams();
      
//       // Add verification status filter
//       params.append('verification_status', 'verified');
      
//       // Add pagination parameters
//       params.append('page', currentPage);
//       params.append('page_size', pageSize);
      
//       // Add search term if exists
//       if (searchTerm.trim()) {
//         params.append('search', searchTerm.trim());
//       }
      
//       // Add category filter if exists
//       if (selectedCategories.length > 0) {
//         params.append('category', selectedCategories.join(','));
//       }
      
//       // Add type filter if exists
//       if (selectedTypes.length > 0) {
//         params.append('property_type', selectedTypes.join(','));
//       }
      
//       // Add transaction type filter if exists
//       if (selectedTransactionTypes.length > 0) {
//         params.append('looking_to', selectedTransactionTypes.join(','));
//       }
      
//       // Add city filter if exists
//       if (selectedCities.length > 0) {
//         params.append('city', selectedCities.join(','));
//       }
      
//       // Add role filter if exists
//       if (selectedRoles.length > 0) {
//         params.append('user_role', selectedRoles.join(','));
//       }
      
//       // Add sort parameter if selected
//       if (selectedSortOptions.length > 0) {
//         const sortValue = selectedSortOptions[0];
//         if (sortValue === 'price-low') {
//           params.append('ordering', 'price');
//         } else if (sortValue === 'price-high') {
//           params.append('ordering', '-price');
//         }
//       }
      
//       const queryString = params.toString();
//       const url = `${baseurl}/properties/${queryString ? `?${queryString}` : ''}`;
      
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       const propertiesArray = data.results || [];
      
//       // Filter out properties where user_id matches the current user's id
//       const filteredProperties = propertiesArray.filter(
//         (property) => property.user_id?.toString() !== currentUserId
//       );
      
//       setProperties(filteredProperties);
//       setFilteredProperties(filteredProperties);
//       setTotalCount(data.count || 0);
//       setTotalPages(Math.ceil((data.count || 0) / pageSize));
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching properties:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [
//     currentPage, 
//     pageSize, 
//     searchTerm,
//     selectedCategories,
//     selectedTypes,
//     selectedTransactionTypes,
//     selectedCities,
//     selectedRoles,
//     selectedSortOptions,
//     currentUserId
//   ]);

//   // Apply price range filter client-side
//   useEffect(() => {
//     if (properties.length === 0) return;
    
//     let result = [...properties];
    
//     // Apply price range filter (client-side only)
//     if (selectedPriceRanges.length > 0) {
//       result = result.filter(property => {
//         const price = parseFloat(property.looking_to === "sell" 
//           ? (property.total_property_value || property.property_value)
//           : property.rent_amount || 0);
        
//         return selectedPriceRanges.some(rangeLabel => {
//           switch (rangeLabel) {
//             case "Under ₹10L":
//               return price >= 0 && price <= 1000000;
//             case "₹10L - ₹25L":
//               return price >= 1000000 && price <= 2500000;
//             case "₹25L - ₹50L":
//               return price >= 2500000 && price <= 5000000;
//             case "₹50L - ₹1Cr":
//               return price >= 5000000 && price <= 10000000;
//             case "₹1Cr - ₹5Cr":
//               return price >= 10000000 && price <= 50000000;
//             case "Over ₹5Cr":
//               return price >= 50000000;
//             default:
//               return false;
//           }
//         });
//       });
//     }
    
//     setFilteredProperties(result);
//   }, [properties, selectedPriceRanges]);

//   // Handle filter changes
//   const handleFilterChange = useCallback(() => {
//     setCurrentPage(1);
//   }, []);

//   // Handle search
//   const handleSearch = useCallback((term) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   }, []);

//   // Handle page change
//   const handlePageChange = useCallback((page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);

//   // Handle page size change
//   const handlePageSizeChange = useCallback((size) => {
//     setPageSize(size);
//     setCurrentPage(1);
//   }, []);

//   // Initial data fetch
//   useEffect(() => {
//     fetchRoles();
//     fetchCategories();
//     fetchPropertyTypes();
//     fetchCommissionData();
//     fetchUserSubscription();
//   }, [fetchRoles, fetchCategories, fetchPropertyTypes, fetchCommissionData, fetchUserSubscription]);

//   // Fetch properties when filters or page change
//   useEffect(() => {
//     fetchApprovedProperties();
//   }, [fetchApprovedProperties]);

//   // Show subscription banner if no active subscription
//   const renderSubscriptionBanner = () => {
//     if (!loadingSubscription && !hasActiveSubscription && currentUserId) {
//       return (
//         <div className="alert alert-warning mb-4" role="alert">
//           <div className="d-flex align-items-center">
//             <Info className="me-2" size={20} />
//             <div>
//               <strong>Subscription Required:</strong> You need an active subscription to view property details. 
//               <button 
//                 className="btn btn-sm btn-primary ms-3"
//                 onClick={() => window.location.href = '/client-subscription-plan'}
//               >
//                 View Plans
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Render pagination
//   const renderPagination = () => {
//     if (totalPages <= 1) return null;
    
//     return (
//       <nav aria-label="Properties pagination" className="mt-5">
//         <ul className="pagination justify-content-center flex-wrap">
//           {/* Previous Button */}
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Go to previous page"
//             >
//               <span aria-hidden="true">&laquo;</span>
//               <span className="visually-hidden">Previous</span>
//             </button>
//           </li>
          
//           {/* First Page */}
//           {currentPage > 2 && (
//             <li className="page-item">
//               <button 
//                 className="page-link" 
//                 onClick={() => handlePageChange(1)}
//                 aria-label="Go to page 1"
//               >
//                 1
//               </button>
//             </li>
//           )}
          
//           {/* Ellipsis if needed */}
//           {currentPage > 3 && (
//             <li className="page-item disabled">
//               <span className="page-link">...</span>
//             </li>
//           )}
          
//           {/* Page Before Current */}
//           {currentPage > 1 && (
//             <li className="page-item">
//               <button 
//                 className="page-link" 
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 aria-label={`Go to page ${currentPage - 1}`}
//               >
//                 {currentPage - 1}
//               </button>
//             </li>
//           )}
          
//           {/* Current Page */}
//           <li className="page-item active" aria-current="page">
//             <button className="page-link">
//               {currentPage}
//               <span className="visually-hidden">(current)</span>
//             </button>
//           </li>
          
//           {/* Page After Current */}
//           {currentPage < totalPages && (
//             <li className="page-item">
//               <button 
//                 className="page-link" 
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 aria-label={`Go to page ${currentPage + 1}`}
//               >
//                 {currentPage + 1}
//               </button>
//             </li>
//           )}
          
//           {/* Ellipsis if needed */}
//           {currentPage < totalPages - 2 && (
//             <li className="page-item disabled">
//               <span className="page-link">...</span>
//             </li>
//           )}
          
//           {/* Last Page */}
//           {currentPage < totalPages - 1 && (
//             <li className="page-item">
//               <button 
//                 className="page-link" 
//                 onClick={() => handlePageChange(totalPages)}
//                 aria-label={`Go to page ${totalPages}`}
//               >
//                 {totalPages}
//               </button>
//             </li>
//           )}
          
//           {/* Next Button */}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Go to next page"
//             >
//               <span className="visually-hidden">Next</span>
//               <span aria-hidden="true">&raquo;</span>
//             </button>
//           </li>
//         </ul>
        
//         {/* Page Info */}
//         <div className="text-center text-muted small mt-2">
//           Page {currentPage} of {totalPages} • {filteredProperties.length} properties on this page • {totalCount} total properties
//         </div>
//       </nav>
//     );
//   };

//   if ((loading || loadingSubscription) && properties.length === 0) {
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
//           {/* Mobile Filter Modal */}
//           <MobileFilterModal
//             isOpen={showMobileFilters}
//             onClose={() => setShowMobileFilters(false)}
//             activeFilterCount={activeFilterCount}
//             onClearAll={handleClearAllFilters}
//           >
//             <FilterSidebar
//               selectedCategories={selectedCategories}
//               setSelectedCategories={setSelectedCategories}
//               selectedTypes={selectedTypes}
//               setSelectedTypes={setSelectedTypes}
//               selectedPriceRanges={selectedPriceRanges}
//               setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedCities={selectedCities}
//               setSelectedCities={setSelectedCities}
//               selectedTransactionTypes={selectedTransactionTypes}
//               setSelectedTransactionTypes={setSelectedTransactionTypes}
//               selectedRoles={selectedRoles}
//               setSelectedRoles={setSelectedRoles}
//               selectedSortOptions={selectedSortOptions}
//               setSelectedSortOptions={setSelectedSortOptions}
//               categories={categories}
//               propertyTypes={propertyTypes}
//               roles={roles}
//               loadingCategories={loadingCategories}
//               loadingTypes={loadingTypes}
//               loadingRoles={loadingRoles}
//               onFilterChange={handleFilterChange}
//               isMobile={true}
//             />
//           </MobileFilterModal>

//           <ProductHeader
//             totalProducts={totalCount}
//             showingProducts={filteredProperties.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             onSearch={handleSearch}
//             onOpenMobileFilters={() => setShowMobileFilters(true)}
//             activeFilterCount={activeFilterCount}
//             pageSize={pageSize}
//             setPageSize={handlePageSizeChange}
//           />

//           <div className="row">
//             {/* Desktop Filter Sidebar - Hidden on mobile */}
//             <aside className="col-lg-3 mb-4 mb-lg-0 d-none d-lg-block">
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
//                   selectedSortOptions={selectedSortOptions}
//                   setSelectedSortOptions={setSelectedSortOptions}
//                   categories={categories}
//                   propertyTypes={propertyTypes}
//                   roles={roles}
//                   loadingCategories={loadingCategories}
//                   loadingTypes={loadingTypes}
//                   loadingRoles={loadingRoles}
//                   onFilterChange={handleFilterChange}
//                   isMobile={false}
//                 />
//               </div>
//             </aside>

//             <div className="col-lg-9 col-12">
//               {renderSubscriptionBanner()}
              
//               {(loading && filteredProperties.length === 0) ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-3">Loading properties...</p>
//                 </div>
//               ) : filteredProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <h5>No properties found matching your criteria.</h5>
//                   <p className="text-muted">Try adjusting your filters or search term.</p>
//                 </div>
//               ) : (
//                 <>
//                   <PropertyGrid 
//                     properties={filteredProperties} 
//                     viewMode={viewMode}
//                     onVerificationStatusUpdate={handleVerificationStatusUpdate}
//                     onDeleteProperty={handleDeleteProperty}
//                     commissionData={commissionData}
//                     hasActiveSubscription={hasActiveSubscription}
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

// export default ClientProperties;


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
  Trash2,
  Edit
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PropertiesList.css";
import WebsiteNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Info } from "lucide-react";

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
    
    if (imagePath.startsWith('/media/')) {
      return `${baseurl}${imagePath}`;
    }
    
    if (imagePath.startsWith('media/')) {
      return `${baseurl}/${imagePath}`;
    }
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    return `${baseurl}/${imagePath}`;
  }
  
  return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
};

// ============= Commission Tooltip Component =============
const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
  if (!show || !commissions || commissions.length === 0) return null;

  const calculateCommissions = () => {
    const commissionAmount = parseFloat(distributionCommission) || 0;
    return commissions.map(commission => ({
      level: commission.level_no,
      percentage: parseFloat(commission.percentage),
      amount: (commissionAmount * parseFloat(commission.percentage)) / 100
    }));
  };

  const commissionList = calculateCommissions();

  return (
    <div className="commission-tooltip">
      <div className="commission-tooltip-content">
        <div className="commission-body">
          {commissionList.map((commission) => (
            <div key={commission.level} className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-medium">Team {commission.level}:&nbsp;₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============= Mobile Filter Modal Component =============
const MobileFilterModal = ({ 
  isOpen, 
  onClose, 
  children,
  activeFilterCount,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen-md-down" role="document">
        <div className="modal-content h-100">
          <div className="modal-header bg-white" style={{ zIndex: 1050 }}>
            <h5 className="modal-title d-flex align-items-center gap-2">
              <Filter size={20} />
              Filters
              {activeFilterCount > 0 && (
                <span className="badge bg-primary rounded-pill">{activeFilterCount}</span>
              )}
            </h5>
            <div className="d-flex align-items-center gap-2">
              {activeFilterCount > 0 && (
                <button 
                  onClick={onClearAll}
                  className="btn btn-sm btn-outline-danger me-2"
                >
                  Clear All
                </button>
              )}
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer sticky-bottom bg-white border-top">
            <button 
              type="button" 
              className="btn btn-primary w-100"
              onClick={onClose}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============= Property Card Component =============
const PropertyCard = ({ property, onVerificationStatusUpdate, onDeleteProperty, commissionData, hasActiveSubscription }) => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(property.verification_status || 'pending');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);

  const handleViewDetails = () => {
    // Check if user has active subscription
    if (!hasActiveSubscription) {
      Swal.fire({
        title: 'Subscription Required',
        text: 'Please purchase a subscription to view property details.',
        icon: 'warning',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
      return;
    }
    navigate(`/client-properties-details/${property.property_id}`);
  };

  const handleEditProperty = () => {
    navigate(`/edit-property/${property.property_id}`);
  };

  // Handle delete property
  const handleDeleteProperty = async () => {
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
        
        if (onDeleteProperty) {
          await onDeleteProperty(property.property_id);
        }
        
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
  const imageUrl = getImageUrl(property.images);
  
  const formattedPrice = property.looking_to === "sell" 
    ? formatPrice(property.total_property_value || property.property_value)
    : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

  const depositText = property.deposit_amount 
    ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
    : '';

  // Handle verification status change
  const handleVerificationStatusChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = verificationStatus;
    
    setVerificationStatus(newStatus);
    
    try {
      setIsUpdating(true);
      
      const response = await fetch(`${baseurl}/properties/${property.property_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verification_status: newStatus
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update verification status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (onVerificationStatusUpdate) {
        onVerificationStatusUpdate(property.property_id, newStatus);
      }
      
      console.log('Verification status updated successfully:', result);
      
    } catch (error) {
      console.error('Error updating verification status:', error);
      setVerificationStatus(previousStatus);
      alert(`Failed to update verification status: ${error.message}. Please try again.`);
    } finally {
      setIsUpdating(false);
    }
  };

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
          <i className="bi bi-geo-alt"></i> {property.city}
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

        {/* PAYOUT BUTTON with Commission Tooltip - Commented out */}
        {/* <div className="position-relative mt-2">
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
        </div> */}
        
        <button 
          onClick={handleViewDetails}
          className="btn w-100 fw-semibold py-2 mt-2"
          style={{ 
            backgroundColor: !hasActiveSubscription ? '#95a5a6' : '#273c75', 
            borderColor: !hasActiveSubscription ? '#7f8c8d' : '#273c75', 
            color: '#fff',
            cursor: !hasActiveSubscription ? 'not-allowed' : 'pointer',
            opacity: !hasActiveSubscription ? 0.65 : 1
          }}
          disabled={!hasActiveSubscription}
          title={!hasActiveSubscription ? 'Subscription required to view details' : ''}
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
        className="w-100 border-0 bg-transparent"
        style={{ 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          width: '100%',
          minHeight: '54px'
        }}
        aria-label={`Toggle ${title} filter section`}
        aria-expanded={isOpen}
      >
        <span className="fw-medium" style={{ whiteSpace: 'nowrap' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {isOpen ? (
            <ChevronUp size={20} className="text-muted" />
          ) : (
            <ChevronDown size={20} className="text-muted" />
          )}
        </div>
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
  selectedSortOptions,
  setSelectedSortOptions,
  categories,
  propertyTypes,
  roles,
  loadingCategories,
  loadingTypes,
  loadingRoles,
  onFilterChange,
  isMobile = false
}) => {
  const [activeFilters, setActiveFilters] = useState({
    transaction: false,
    role: false,
    categories: false,
    price: false,
    type: false,
    location: false,
    sort: false
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

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
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

  const toggleSortOption = useCallback((sortValue) => {
    setSelectedSortOptions((prev) => {
      // For sort, we want single selection (radio behavior)
      // If clicking the same option, deselect it (go back to default)
      if (prev.includes(sortValue)) {
        return [];
      } else {
        return [sortValue];
      }
    });
    
    if (onFilterChange) {
      setTimeout(() => onFilterChange(), 0);
    }
  }, [setSelectedSortOptions, onFilterChange]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedPriceRanges([]);
    setSelectedCities([]);
    setSelectedTransactionTypes([]);
    setSelectedRoles([]);
    setSelectedSortOptions([]);
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
    selectedRoles.length +
    selectedSortOptions.length;

  return (
    <div className="w-100">
      {!isMobile && (
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
      )}

      {/* Sort Filter */}
      <FilterSection
        title="Sort By"
        isOpen={activeFilters.sort}
        onToggle={() => toggleFilterSection('sort')}
      >
        <div className="overflow-y-auto">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleSortOption(option.value)}
              onKeyPress={(e) => e.key === 'Enter' && toggleSortOption(option.value)}
              tabIndex={0}
              role="radio"
              aria-checked={selectedSortOptions.includes(option.value)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="sortOption"
                  className="form-check-input"
                  checked={selectedSortOptions.includes(option.value)}
                  readOnly
                  tabIndex={-1}
                  onChange={() => {}}
                />
                <span className={`small ${selectedSortOptions.includes(option.value) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {option.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

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
                  onChange={() => {}}
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                  onChange={() => {}}
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
            {selectedSortOptions.map(sortValue => {
              const sortOption = sortOptions.find(o => o.value === sortValue);
              return (
                <span key={sortValue} className="badge bg-dark-subtle text-dark border border-dark d-flex align-items-center">
                  Sort: {sortOption?.label || sortValue}
                  <button 
                    onClick={() => toggleSortOption(sortValue)} 
                    className="btn-close btn-close-sm ms-1"
                    aria-label={`Remove sort filter`}
                  ></button>
                </span>
              );
            })}
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
  onSearch,
  onOpenMobileFilters,
  activeFilterCount
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
    <div className="d-flex align-items-center justify-content-between mb-4">
      {/* Left side - Title and count */}
      <div className="d-flex align-items-center gap-3">
        <h4 className="fw-bold mb-0">Properties</h4>
        <p className="mb-0 text-muted">
          Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
          <span className="fw-semibold text-primary">{totalProducts}</span> properties
        </p>
      </div>

      {/* Right side - Search and View modes in same line */}
      <div className="d-flex align-items-center gap-3">
        {/* Search input */}
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text bg-transparent border-end-0">
            <Search className="h-4 w-4 text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
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

        {/* View mode buttons */}
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

        {/* Mobile Filter Button - Hidden on desktop */}
        <button 
          onClick={onOpenMobileFilters}
          className="btn btn-primary d-md-none d-flex align-items-center gap-2"
        >
          <Filter size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="badge bg-white text-primary rounded-pill">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

// ============= Property Grid Component =============
const PropertyGrid = ({ properties, viewMode, onVerificationStatusUpdate, onDeleteProperty, commissionData, hasActiveSubscription }) => {
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
            
            const handleViewDetails = () => {
              if (!hasActiveSubscription) {
                Swal.fire({
                  title: 'Subscription Required',
                  text: 'Please purchase a subscription to view property details.',
                  icon: 'warning',
                  confirmButtonColor: '#273c75',
                  confirmButtonText: 'OK'
                });
                return;
              }
              navigate(`/client-properties-details/${property.property_id}`);
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
                    {/* PAYOUT BUTTON for List View - Commented out */}
                    {/* <div className="position-relative">
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
                    </div> */}
                    
                    <button 
                      onClick={handleViewDetails}
                      className="btn fw-semibold py-2"
                      style={{ 
                        backgroundColor: !hasActiveSubscription ? '#95a5a6' : '#273c75', 
                        borderColor: !hasActiveSubscription ? '#7f8c8d' : '#273c75', 
                        color: '#fff',
                        cursor: !hasActiveSubscription ? 'not-allowed' : 'pointer',
                        opacity: !hasActiveSubscription ? 0.65 : 1
                      }}
                      disabled={!hasActiveSubscription}
                      title={!hasActiveSubscription ? 'Subscription required to view details' : ''}
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
            onVerificationStatusUpdate={onVerificationStatusUpdate}
            onDeleteProperty={onDeleteProperty}
            commissionData={commissionData}
            hasActiveSubscription={hasActiveSubscription}
          />
        </div>
      ))}
    </div>
  );
};

// ============= Main Filters Page Component =============
const ClientProperties = () => {
  const [viewMode, setViewMode] = useState("grid-3");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [commissionData, setCommissionData] = useState([]);
  const [loadingCommissions, setLoadingCommissions] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Subscription state
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedSortOptions, setSelectedSortOptions] = useState([]);

  // Dynamic data states
  const [categories, setCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [roles, setRoles] = useState([]);

  // Get current user ID from localStorage
  const currentUserId = localStorage.getItem("user_id");

  // Calculate active filter count
  const activeFilterCount = 
    selectedCategories.length + 
    selectedTypes.length + 
    selectedPriceRanges.length + 
    selectedCities.length +
    selectedTransactionTypes.length +
    selectedRoles.length +
    selectedSortOptions.length;

  // Handle clear all filters
  const handleClearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedPriceRanges([]);
    setSelectedCities([]);
    setSelectedTransactionTypes([]);
    setSelectedRoles([]);
    setSelectedSortOptions([]);
    setCurrentPage(1);
  };

  // Fetch user subscription status
  const fetchUserSubscription = useCallback(async () => {
    if (!currentUserId) {
      setHasActiveSubscription(false);
      setLoadingSubscription(false);
      return;
    }

    try {
      setLoadingSubscription(true);
      const res = await fetch(`${baseurl}/user-subscriptions/user-id/${currentUserId}/`);
      
      if (res.ok) {
        const response = await res.json();
        console.log("Subscription API Response:", response);
        
        // Check if user has any active subscription based on latest_status
        if (response && response.latest_status === "paid") {
          setHasActiveSubscription(true);
        } else {
          setHasActiveSubscription(false);
        }
      } else {
        console.error('Failed to fetch subscription:', res.status);
        setHasActiveSubscription(false);
      }
    } catch (err) {
      console.error('Error fetching user subscription:', err);
      setHasActiveSubscription(false);
    } finally {
      setLoadingSubscription(false);
    }
  }, [currentUserId]);

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

  const handleVerificationStatusUpdate = useCallback((propertyId, newStatus) => {
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.property_id === propertyId 
          ? { ...property, verification_status: newStatus }
          : property
      )
    );
    setFilteredProperties(prevProperties => 
      prevProperties.map(property => 
        property.property_id === propertyId 
          ? { ...property, verification_status: newStatus }
          : property
      )
    );
  }, []);

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
      
      setProperties(prevProperties => 
        prevProperties.filter(property => property.property_id !== propertyId)
      );
      setFilteredProperties(prevProperties => 
        prevProperties.filter(property => property.property_id !== propertyId)
      );
      
      // Update total count
      setTotalCount(prev => prev - 1);
      
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
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

  // Fetch approved properties from API with pagination
  const fetchApprovedProperties = useCallback(async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      
      // Add verification status filter
      params.append('verification_status', 'verified');
      
      // Add pagination parameters
      params.append('page', currentPage);
      params.append('page_size', pageSize);
      
      // Add search term if exists
      if (searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }
      
      // Add category filter if exists
      if (selectedCategories.length > 0) {
        params.append('category', selectedCategories.join(','));
      }
      
      // Add type filter if exists
      if (selectedTypes.length > 0) {
        params.append('property_type', selectedTypes.join(','));
      }
      
      // Add transaction type filter if exists
      if (selectedTransactionTypes.length > 0) {
        params.append('looking_to', selectedTransactionTypes.join(','));
      }
      
      // Add city filter if exists
      if (selectedCities.length > 0) {
        params.append('city', selectedCities.join(','));
      }
      
      // Add role filter if exists
      if (selectedRoles.length > 0) {
        params.append('user_role', selectedRoles.join(','));
      }
      
      // Add sort parameter if selected
      if (selectedSortOptions.length > 0) {
        const sortValue = selectedSortOptions[0];
        if (sortValue === 'price-low') {
          params.append('ordering', 'price');
        } else if (sortValue === 'price-high') {
          params.append('ordering', '-price');
        }
      }
      
      const queryString = params.toString();
      const url = `${baseurl}/properties/${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const propertiesArray = data.results || [];
      
      // Filter out properties where user_id matches the current user's id
      const filteredProperties = propertiesArray.filter(
        (property) => property.user_id?.toString() !== currentUserId
      );
      
      setProperties(filteredProperties);
      setFilteredProperties(filteredProperties);
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
    pageSize, 
    searchTerm,
    selectedCategories,
    selectedTypes,
    selectedTransactionTypes,
    selectedCities,
    selectedRoles,
    selectedSortOptions,
    currentUserId
  ]);

  // Apply price range filter client-side
  useEffect(() => {
    if (properties.length === 0) return;
    
    let result = [...properties];
    
    // Apply price range filter (client-side only)
    if (selectedPriceRanges.length > 0) {
      result = result.filter(property => {
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
    }
    
    setFilteredProperties(result);
  }, [properties, selectedPriceRanges]);

  // Handle filter changes
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle page size change
  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchRoles();
    fetchCategories();
    fetchPropertyTypes();
    fetchCommissionData();
    fetchUserSubscription();
  }, [fetchRoles, fetchCategories, fetchPropertyTypes, fetchCommissionData, fetchUserSubscription]);

  // Fetch properties when filters or page change
  useEffect(() => {
    fetchApprovedProperties();
  }, [fetchApprovedProperties]);

  // Show subscription banner if no active subscription
  const renderSubscriptionBanner = () => {
    if (!loadingSubscription && !hasActiveSubscription && currentUserId) {
      return (
        <div className="alert alert-warning mb-4" role="alert">
          <div className="d-flex align-items-center">
            <Info className="me-2" size={20} />
            <div>
              <strong>Subscription Required:</strong> You need an active subscription to view property details. 
              <button 
                className="btn btn-sm btn-primary ms-3"
                onClick={() => window.location.href = '/client-subscription-plan'}
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

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
          Page {currentPage} of {totalPages} • {filteredProperties.length} properties on this page • {totalCount} total properties
        </div>
      </nav>
    );
  };

  if ((loading || loadingSubscription) && properties.length === 0) {
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
          {/* Mobile Filter Modal */}
          <MobileFilterModal
            isOpen={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
            activeFilterCount={activeFilterCount}
            onClearAll={handleClearAllFilters}
          >
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
              selectedSortOptions={selectedSortOptions}
              setSelectedSortOptions={setSelectedSortOptions}
              categories={categories}
              propertyTypes={propertyTypes}
              roles={roles}
              loadingCategories={loadingCategories}
              loadingTypes={loadingTypes}
              loadingRoles={loadingRoles}
              onFilterChange={handleFilterChange}
              isMobile={true}
            />
          </MobileFilterModal>

          <ProductHeader
            totalProducts={totalCount}
            showingProducts={filteredProperties.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            onOpenMobileFilters={() => setShowMobileFilters(true)}
            activeFilterCount={activeFilterCount}
          />

          <div className="row">
            {/* Desktop Filter Sidebar - Hidden on mobile */}
            <aside className="col-lg-3 mb-4 mb-lg-0 d-none d-lg-block">
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
                  selectedSortOptions={selectedSortOptions}
                  setSelectedSortOptions={setSelectedSortOptions}
                  categories={categories}
                  propertyTypes={propertyTypes}
                  roles={roles}
                  loadingCategories={loadingCategories}
                  loadingTypes={loadingTypes}
                  loadingRoles={loadingRoles}
                  onFilterChange={handleFilterChange}
                  isMobile={false}
                />
              </div>
            </aside>

            <div className="col-lg-9 col-12">
              {renderSubscriptionBanner()}
              
              {(loading && filteredProperties.length === 0) ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading properties...</p>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No properties found matching your criteria.</h5>
                  <p className="text-muted">Try adjusting your filters or search term.</p>
                </div>
              ) : (
                <>
                  <PropertyGrid 
                    properties={filteredProperties} 
                    viewMode={viewMode}
                    onVerificationStatusUpdate={handleVerificationStatusUpdate}
                    onDeleteProperty={handleDeleteProperty}
                    commissionData={commissionData}
                    hasActiveSubscription={hasActiveSubscription}
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

export default ClientProperties;