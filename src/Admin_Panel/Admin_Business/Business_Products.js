// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
// import {
//   Search,
//   X,
//   Grid3X3,
//   LayoutList,
//   Edit,
//   Trash2,
//   Plus,
//   Eye,
//   Package,
//   Image as ImageIcon,
//   DollarSign,
//   PackageOpen,
//   ArrowLeft,
//   Tag,
//   ChevronUp,
//   ChevronDown,
//   Building
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";

// // Custom hook to detect clicks outside of component
// const useClickOutside = (ref, callback) => {
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [ref, callback]);
// };

// /* ================= FILTER COMPONENT ================= */
// const FilterDropdown = ({ 
//   title, 
//   icon: Icon, 
//   options, 
//   selectedOptions, 
//   onOptionToggle,
//   type = "price",
//   isOpen,
//   onToggle
// }) => {
//   const dropdownRef = useRef(null);
  
//   // Close dropdown when clicking outside
//   useClickOutside(dropdownRef, () => {
//     if (isOpen) onToggle();
//   });

//   const handleOptionClick = (option) => {
//     onOptionToggle(option);
//   };

//   const clearSelection = (e) => {
//     e.stopPropagation();
//     selectedOptions.forEach(option => onOptionToggle(option));
//   };

//   return (
//     <div className="position-relative" ref={dropdownRef}>
//       <button
//         className="btn btn-outline-secondary d-flex align-items-center gap-2"
//         onClick={onToggle}
//         style={{ 
//           borderColor: selectedOptions.length > 0 ? '#273c75' : '#dee2e6',
//           backgroundColor: selectedOptions.length > 0 ? '#f0f4ff' : 'transparent'
//         }}
//       >
//         {Icon && <Icon size={16} />}
//         <span>{title}</span>
//         {selectedOptions.length > 0 && (
//           <span className="badge bg-primary ms-1">{selectedOptions.length}</span>
//         )}
//         {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//       </button>

//       {isOpen && (
//         <div className="position-absolute bg-white border rounded shadow mt-1 p-2"
//              style={{ 
//                minWidth: '200px', 
//                zIndex: 1000,
//                left: 0,
//                top: '100%'
//              }}>
//           <div className="d-flex justify-content-between align-items-center mb-2 p-2">
//             <small className="fw-semibold text-muted">Select {type}</small>
//             {selectedOptions.length > 0 && (
//               <button 
//                 className="btn btn-sm btn-link text-decoration-none p-0"
//                 onClick={clearSelection}
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//           <div className="overflow-auto" style={{ maxHeight: '200px' }}>
//             {options.map((option) => (
//               <div
//                 key={option.value}
//                 className="d-flex align-items-center gap-2 p-2 hover-bg-light rounded"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => handleOptionClick(option.value)}
//               >
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedOptions.includes(option.value)}
//                   readOnly
//                 />
//                 <span className="small">{option.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ================= ACTIVE FILTERS BADGES ================= */
// const ActiveFilters = ({ 
//   selectedPriceRanges, 
//   selectedDiscountRanges, 
//   priceOptions, 
//   discountOptions,
//   onRemovePriceFilter,
//   onRemoveDiscountFilter,
//   onClearAll
// }) => {
//   const hasActiveFilters = selectedPriceRanges.length > 0 || selectedDiscountRanges.length > 0;
  
//   if (!hasActiveFilters) return null;

//   const getLabelFromValue = (value, options) => {
//     const option = options.find(opt => opt.value === value);
//     return option ? option.label : value;
//   };

//   return (
//     <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
//       <small className="fw-semibold text-muted me-1">Active:</small>
      
//       {selectedPriceRanges.map(range => (
//         <span key={range} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
//           <DollarSign size={12} className="me-1" />
//           {getLabelFromValue(range, priceOptions)}
//           <button 
//             onClick={() => onRemovePriceFilter(range)} 
//             className="btn-close btn-close-sm ms-1"
//             style={{ fontSize: '0.5rem' }}
//           ></button>
//         </span>
//       ))}
      
//       {selectedDiscountRanges.map(range => (
//         <span key={range} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
//           <Tag size={12} className="me-1" />
//           {getLabelFromValue(range, discountOptions)}
//           <button 
//             onClick={() => onRemoveDiscountFilter(range)} 
//             className="btn-close btn-close-sm ms-1"
//             style={{ fontSize: '0.5rem' }}
//           ></button>
//         </span>
//       ))}
      
//       <button 
//         onClick={onClearAll}
//         className="btn btn-sm btn-outline-secondary ms-2"
//         style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem' }}
//       >
//         Clear All
//       </button>
//     </div>
//   );
// };

// /* ================= MODAL COMPONENTS ================= */
// const EditProductModal = ({ product, isOpen, onClose, onSave, baseurl }) => {
//   const [formData, setFormData] = useState({
//     product_name: "",
//     brand: "",
//     description: "",
//     verification_status: "",
//     is_active: false
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         product_name: product.product_name || "",
//         brand: product.brand || "",
//         description: product.description || "",
//         verification_status: product.verification_status || "pending",
//         is_active: product.is_active || false
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(product.product_id, formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Edit Product: {product?.product_name}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Product Name *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="product_name"
//                     value={formData.product_name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Brand</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-12 mb-3">
//                   <label className="form-label">Description</label>
//                   <textarea
//                     className="form-control"
//                     name="description"
//                     rows="3"
//                     value={formData.description}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Verification Status</label>
//                   <select
//                     className="form-select"
//                     name="verification_status"
//                     value={formData.verification_status}
//                     onChange={handleChange}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="verified">Verified</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </div>
//                 <div className="col-md-6 mb-3 d-flex align-items-end">
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name="is_active"
//                       checked={formData.is_active}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Product Active</label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onClose}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditVariantModal = ({ product, variant, isOpen, onClose, onSave, onDelete, baseurl }) => {
//   const [formData, setFormData] = useState({
//     mrp: "",
//     selling_price: "",
//     stock: "",
//     hsn_code: "",
//     is_returnable: false,
//     return_days: 7,
//     is_active: false
//   });

//   useEffect(() => {
//     if (variant) {
//       setFormData({
//         mrp: variant.mrp || "",
//         selling_price: variant.selling_price || "",
//         stock: variant.stock || "",
//         hsn_code: variant.hsn_code || "",
//         is_returnable: variant.is_returnable || false,
//         return_days: variant.return_days || 7,
//         is_active: variant.is_active || false
//       });
//     }
//   }, [variant]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(product.product_id, variant.id, formData);
//   };

//   const handleDelete = () => {
//     if (window.confirm(`Are you sure you want to delete variant ${variant.sku}?`)) {
//       onDelete(product.product_id, variant.id);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Edit Variant: {variant?.sku}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">SKU</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={variant?.sku || ""}
//                     readOnly
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Variant ID</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={variant?.id || ""}
//                     readOnly
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">MRP *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="mrp"
//                     value={formData.mrp}
//                     onChange={handleChange}
//                     required
//                     step="0.01"
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Selling Price *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="selling_price"
//                     value={formData.selling_price}
//                     onChange={handleChange}
//                     required
//                     step="0.01"
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Stock *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">HSN Code</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="hsn_code"
//                     value={formData.hsn_code}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Return Days</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="return_days"
//                     value={formData.return_days}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-3 mb-3 d-flex align-items-end">
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name="is_returnable"
//                       checked={formData.is_returnable}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Returnable</label>
//                   </div>
//                 </div>
//                 <div className="col-md-3 mb-3 d-flex align-items-end">
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name="is_active"
//                       checked={formData.is_active}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Active</label>
//                   </div>
//                 </div>
//                 <div className="col-md-12 mb-3">
//                   <h6>Attributes</h6>
//                   <pre className="bg-light p-3 rounded">
//                     {JSON.stringify(variant?.attributes || {}, null, 2)}
//                   </pre>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-danger" onClick={handleDelete}>
//                 <Trash2 size={16} /> Delete Variant
//               </button>
//               <button type="button" className="btn btn-secondary" onClick={onClose}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddVariantModal = ({ product, isOpen, onClose, onAdd, baseurl }) => {
//   const [formData, setFormData] = useState({
//     sku: "",
//     mrp: "",
//     selling_price: "",
//     stock: "",
//     hsn_code: "",
//     is_returnable: false,
//     return_days: 7,
//     is_active: true,
//     attributes: JSON.stringify({
//       quantity: "",
//       packaging: "",
//       display: ""
//     }, null, 2)
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       const attributes = JSON.parse(formData.attributes);
//       const variantData = {
//         sku: formData.sku,
//         mrp: parseFloat(formData.mrp),
//         selling_price: parseFloat(formData.selling_price),
//         stock: parseInt(formData.stock),
//         hsn_code: formData.hsn_code || null,
//         is_returnable: formData.is_returnable,
//         return_days: parseInt(formData.return_days),
//         is_active: formData.is_active,
//         attributes: attributes,
//         media: [{ media_type: "image" }]
//       };
//       onAdd(product.product_id, variantData);
//     } catch (error) {
//       alert("Invalid JSON in attributes field");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Add New Variant to {product?.product_name}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">SKU *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="sku"
//                     value={formData.sku}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">MRP *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="mrp"
//                     value={formData.mrp}
//                     onChange={handleChange}
//                     required
//                     step="0.01"
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Selling Price *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="selling_price"
//                     value={formData.selling_price}
//                     onChange={handleChange}
//                     required
//                     step="0.01"
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Stock *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="stock"
//                     value={formData.stock}
//                     onChange={handleChange}
//                     required
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">HSN Code</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="hsn_code"
//                     value={formData.hsn_code}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Return Days</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="return_days"
//                     value={formData.return_days}
//                     onChange={handleChange}
//                     min="0"
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3 d-flex align-items-end">
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name="is_returnable"
//                       checked={formData.is_returnable}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Returnable</label>
//                   </div>
//                 </div>
//                 <div className="col-md-6 mb-3 d-flex align-items-end">
//                   <div className="form-check form-switch">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       name="is_active"
//                       checked={formData.is_active}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label">Active</label>
//                   </div>
//                 </div>
//                 <div className="col-md-12 mb-3">
//                   <label className="form-label">Attributes (JSON Format)</label>
//                   <textarea
//                     className="form-control"
//                     name="attributes"
//                     rows="4"
//                     value={formData.attributes}
//                     onChange={handleChange}
//                     placeholder='{"quantity": "500ml", "packaging": "Bottle", "display": "500 ml"}'
//                   />
//                   <small className="text-muted">Enter valid JSON for variant attributes</small>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={onClose}>
//                 Cancel
//               </button>
//               <button type="submit" className="btn btn-success">
//                 <Plus size={16} /> Add Variant
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ManageMediaModal = ({ product, variant, isOpen, onClose, onDeleteMedia, baseurl }) => {
//   const [selectedMedia, setSelectedMedia] = useState([]);

//   if (!isOpen) return null;

//   const handleDeleteMedia = (mediaId) => {
//     if (window.confirm("Are you sure you want to delete this media?")) {
//       onDeleteMedia(product.product_id, mediaId);
//     }
//   };

//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Manage Media for {variant?.sku}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <h6 className="mb-3">Media Files ({variant?.media?.length || 0})</h6>
//             <div className="row">
//               {variant?.media?.map((mediaItem) => (
//                 <div key={mediaItem.id} className="col-md-4 mb-3">
//                   <div className="card">
//                     <div className="card-body text-center">
//                       {mediaItem.media_type === 'image' ? (
//                         <img 
//                           src={`${baseurl}${mediaItem.file}`} 
//                           alt="Media" 
//                           className="img-fluid mb-2"
//                           style={{ maxHeight: '150px', objectFit: 'contain' }}
//                           onError={(e) => {
//                             e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w-300";
//                           }}
//                         />
//                       ) : (
//                         <div className="bg-light p-4 mb-2">
//                           <PackageOpen size={48} className="text-muted" />
//                           <p className="mt-2 mb-0">Video File</p>
//                           <small>{mediaItem.file?.split('/').pop()}</small>
//                         </div>
//                       )}
//                       <div className="d-flex justify-content-between">
//                         <small className="text-muted">{mediaItem.media_type}</small>
//                         <button 
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => handleDeleteMedia(mediaItem.id)}
//                         >
//                           <Trash2 size={12} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {(!variant?.media || variant.media.length === 0) && (
//                 <div className="col-12 text-center py-4">
//                   <ImageIcon size={48} className="text-muted mb-2" />
//                   <p className="text-muted">No media files found</p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" onClick={onClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT CARD COMPONENT ================= */
// const ProductCard = ({ 
//   product, 
//   variant, 
//   baseurl,
//   onEditProduct,
//   onEditVariant,
//   onAddVariant,
//   onManageMedia
// }) => {
//   const navigate = useNavigate();
  
//   // Get image for specific variant
//   const getProductImage = () => {
//     if (variant.media && variant.media.length > 0) {
//       const imageMedia = variant.media.find(m => m.media_type === "image");
//       if (imageMedia) {
//         return `${baseurl}${imageMedia.file}`;
//       }
//       return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//     }
    
//     if (product.variants && product.variants.length > 0) {
//       for (const v of product.variants) {
//         if (v.media && v.media.length > 0) {
//           const imageMedia = v.media.find(m => m.media_type === "image");
//           if (imageMedia) {
//             return `${baseurl}${imageMedia.file}`;
//           }
//         }
//       }
//     }
    
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   // Calculate discount percentage for variant
//   const calculateDiscount = () => {
//     const mrp = parseFloat(variant.mrp);
//     const sellingPrice = parseFloat(variant.selling_price);
//     if (mrp > 0 && sellingPrice < mrp) {
//       return Math.round(((mrp - sellingPrice) / mrp) * 100);
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
  
//   // Create variant name
//   const getVariantName = () => {
//     if (variant.attributes && variant.attributes.display) {
//       return `${product.product_name} - ${variant.attributes.display}`;
//     } else if (variant.attributes) {
//       const attrDisplay = Object.entries(variant.attributes)
//         .filter(([key]) => key !== 'unit' && key !== 'value')
//         .map(([key, value]) => value)
//         .join(" ");
//       if (attrDisplay.trim()) {
//         return `${product.product_name} - ${attrDisplay}`;
//       }
//     }
//     return product.product_name;
//   };

//   // Get variant display text from attributes
//   const getVariantDisplay = () => {
//     if (variant.attributes) {
//       const displayAttrs = [];
      
//       if (variant.attributes.display) {
//         displayAttrs.push(variant.attributes.display);
//       }
      
//       if (variant.attributes.packaging) {
//         displayAttrs.push(variant.attributes.packaging);
//       }
      
//       if (variant.attributes.milk_type) {
//         displayAttrs.push(variant.attributes.milk_type);
//       }
      
//       if (variant.attributes.fat_content) {
//         displayAttrs.push(variant.attributes.fat_content);
//       }
      
//       if (variant.attributes.quantity) {
//         displayAttrs.push(variant.attributes.quantity);
//       }
      
//       return displayAttrs.join(" • ");
//     }
//     return "";
//   };
  
//   return (
//     <div className="card h-100 shadow-sm border-0">
//       {/* Product Image with Discount Badge */}
//       <div className="bg-light p-3 text-center position-relative" style={{ height: 150, cursor: "pointer" }}
//            onClick={() => navigate(`/admin-business-product-details/${product.product_id}?variant=${variant.id}`)}>
//         <img
//           src={getProductImage()}
//           alt={getVariantName()}
//           className="img-fluid mt-4"
//           style={{ maxHeight: "100%", objectFit: "contain" }}
//           onError={(e) => {
//             e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//           }}
//         />
//         {discount > 0 && (
//           <span className="badge bg-danger position-absolute top-0 end-0 m-2">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       <div className="card-body d-flex flex-column p-3">
//         <h6 className="line-clamp-2 mb-2" style={{ cursor: "pointer", minHeight: "30px" }}
//             onClick={() => navigate(`/admin-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
//           {getVariantName()}
//         </h6>
        
//         <div className="d-flex justify-content-between align-items-center mb-2">
//           <small className="text-muted">{product.brand || "No Brand"}</small>
//           <span className={`badge ${variant.is_active ? 'bg-success' : 'bg-danger'}`}>
//             {variant.is_active ? 'Active' : 'Inactive'}
//           </span>
//         </div>
        
//         {/* Variant attributes */}
//         {getVariantDisplay() && (
//           <small className="text-info mb-2 d-block">
//             {getVariantDisplay()}
//           </small>
//         )}

//         {/* Stock status */}
//         <small className={`mb-2 ${variant.stock > 0 ? "text-success" : "text-danger"}`}>
//           {variant.stock > 0 ? `In Stock (${variant.stock})` : "Out of Stock"}
//         </small>

//         {/* Verification Status */}
//         <small className={`badge mb-2 ${variant.verification_status === 'verified' ? 'bg-success' : variant.verification_status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
//           {variant.verification_status || 'pending'}
//         </small>

//         {/* Price Section */}
//         <div className="mt-auto mb-3">
//           <div className="d-flex align-items-center gap-2">
//             <strong className="h5 mb-0">₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
//             {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(variant.mrp).toFixed(2)}
//               </small>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons - Moved above the main buttons */}
//         <div className="mb-3">
//           <div className="btn-group w-100" role="group">
//             <button 
//               className="btn btn-sm btn-outline-primary flex-fill"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onEditProduct(product);
//               }}
//               title="Edit Product"
//             >
//               <Edit size={14} /> Product
//             </button>
//             <button 
//               className="btn btn-sm btn-outline-info flex-fill"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onEditVariant(product, variant);
//               }}
//               title="Edit Variant"
//             >
//               <Package size={14} /> Variant
//             </button>
//             <button 
//               className="btn btn-sm btn-outline-warning flex-fill"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onManageMedia(product, variant);
//               }}
//               title="Manage Media"
//             >
//               <ImageIcon size={14} /> Media
//             </button>
//           </div>
//         </div>

//         {/* View Details and Add to Cart in one row */}
//         <div className="d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
//           {/* VIEW DETAILS BUTTON */}
//           <button 
//             className="btn text-white" 
//             style={{ background: "#6c757d", fontSize: "14px" }}
//             onClick={() => navigate(`/admin-business-product-details/${product.product_id}/?variant=${variant.id}`)}
//           >
//             <Eye size={14} /> Details
//           </button>

//           {/* ADD TO CART BUTTON */}
//           <button 
//             className="btn text-white" 
//             style={{ background: "#273c75", fontSize: "14px" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Add to cart:", variant.id, variant.sku);
//             }}
//             disabled={variant.stock <= 0}
//           >
//             {variant.stock > 0 ? "Add to Cart" : "Out of Stock"}
//           </button>
//         </div>

//         {/* PAYOUT BUTTON - Full width below the two buttons */}
//         <button 
//           className="btn w-100 text-white mt-2" 
//           style={{ background: "#273c75", fontSize: "14px" }}
//           onClick={(e) => {
//             e.stopPropagation();
//             console.log("Payout:", variant.id, variant.sku);
//           }}
//         >
//           PAYOUT
//         </button>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT HEADER COMPONENT ================= */
// const ProductHeader = ({ 
//   viewMode, 
//   onViewModeChange, 
//   search, 
//   setSearch, 
//   totalProducts,
//   onAddVariant,
//   selectedPriceRanges,
//   selectedDiscountRanges,
//   onPriceRangeToggle,
//   onDiscountRangeToggle,
//   onRemovePriceFilter,
//   onRemoveDiscountFilter,
//   onClearAllFilters,
//   businessName
// }) => {
//   const [openDropdown, setOpenDropdown] = useState(null); // 'price', 'discount', or null

//   const views = [
//     { mode: "grid-3", icon: Grid3X3 },
//     { mode: "grid-4", icon: LayoutList },
//   ];

//   const priceOptions = [
//     { value: "0-500", label: "Under ₹500" },
//     { value: "500-1000", label: "₹500 - ₹1000" },
//     { value: "1000-5000", label: "₹1000 - ₹5000" },
//     { value: "5000-10000", label: "₹5000 - ₹10000" },
//     { value: "10000+", label: "Over ₹10000" },
//   ];

//   const discountOptions = [
//     { value: "0-10", label: "0-10%" },
//     { value: "10-20", label: "10-20%" },
//     { value: "20-30", label: "20-30%" },
//     { value: "30-40", label: "30-40%" },
//     { value: "40-50", label: "40-50%" },
//     { value: "50-60", label: "50-60%" },
//     { value: "60+", label: "60%+" },
//   ];

//   const handlePriceToggle = () => {
//     setOpenDropdown(openDropdown === 'price' ? null : 'price');
//   };

//   const handleDiscountToggle = () => {
//     setOpenDropdown(openDropdown === 'discount' ? null : 'discount');
//   };

//   const handleOptionClick = (type, option) => {
//     if (type === 'price') {
//       onPriceRangeToggle(option);
//     } else {
//       onDiscountRangeToggle(option);
//     }
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <div className="d-flex align-items-center gap-2 mb-1">
//             <Building size={20} className="text-primary" />
//             <h4 className="fw-bold mb-0">Products for {businessName || "Business"}</h4>
//           </div>
//           <small className="text-muted">{totalProducts} products found</small>
//         </div>

//         <div className="d-flex align-items-center gap-3 flex-wrap">
//           <div className="input-group input-group-sm" style={{ width: 220 }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search size={16} />
//             </span>
//             <input
//               className="form-control border-start-0"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             {search && (
//               <button className="btn btn-outline-secondary border-start-0" onClick={() => setSearch("")}>
//                 <X size={14} />
//               </button>
//             )}
//           </div>

//           <FilterDropdown
//             title="Price"
//             icon={DollarSign}
//             options={priceOptions}
//             selectedOptions={selectedPriceRanges}
//             onOptionToggle={(option) => handleOptionClick('price', option)}
//             isOpen={openDropdown === 'price'}
//             onToggle={handlePriceToggle}
//             type="price"
//           />

//           <FilterDropdown
//             title="Discount"
//             icon={Tag}
//             options={discountOptions}
//             selectedOptions={selectedDiscountRanges}
//             onOptionToggle={(option) => handleOptionClick('discount', option)}
//             isOpen={openDropdown === 'discount'}
//             onToggle={handleDiscountToggle}
//             type="discount"
//           />

//           <div className="btn-group">
//             {views.map(({ mode, icon: Icon }) => (
//               <button
//                 key={mode}
//                 className={`btn btn-outline-secondary ${viewMode === mode ? "active" : ""}`}
//                 onClick={() => onViewModeChange(mode)}
//                 title={`${mode.replace('grid-', '')} columns`}
//               >
//                 <Icon size={16} />
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <ActiveFilters
//         selectedPriceRanges={selectedPriceRanges}
//         selectedDiscountRanges={selectedDiscountRanges}
//         priceOptions={priceOptions}
//         discountOptions={discountOptions}
//         onRemovePriceFilter={onRemovePriceFilter}
//         onRemoveDiscountFilter={onRemoveDiscountFilter}
//         onClearAll={onClearAllFilters}
//       />
//     </>
//   );
// };

// /* ================= PRODUCT GRID COMPONENT ================= */
// const ProductGrid = ({ 
//   products, 
//   viewMode, 
//   baseurl,
//   onEditProduct,
//   onEditVariant,
//   onAddVariant,
//   onManageMedia
// }) => {
//   const gridClass = {
//     "grid-3": "row row-cols-1 row-cols-sm-2 row-cols-md-3",
//     "grid-4": "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4",
//   }[viewMode];

//   return (
//     <div className={gridClass}>
//       {products.map((item) => (
//         <div key={`${item.product.product_id}-${item.variant.id}`} className="col mb-4">
//           <ProductCard 
//             product={item.product} 
//             variant={item.variant} 
//             baseurl={baseurl}
//             onEditProduct={onEditProduct}
//             onEditVariant={onEditVariant}
//             onAddVariant={onAddVariant}
//             onManageMedia={onManageMedia}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN PRODUCTS COMPONENT ================= */
// const MyProducts = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [businessName, setBusinessName] = useState("");
  
//   // Products grid states
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter states
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

//   // Modal states
//   const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
//   const [editVariantModal, setEditVariantModal] = useState({ isOpen: false, product: null, variant: null });
//   const [addVariantModal, setAddVariantModal] = useState({ isOpen: false, product: null });
//   const [manageMediaModal, setManageMediaModal] = useState({ isOpen: false, product: null, variant: null });

//   // Get business ID from URL query parameters
//   const getBusinessIdFromURL = () => {
//     const searchParams = new URLSearchParams(location.search);
//     return searchParams.get('business');
//   };

//   // Get user_id from localStorage
//   const getUserIdFromLocalStorage = () => {
//     try {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const user = JSON.parse(userData);
//         if (user.user_id) return user.user_id;
//         if (user.id) return user.id;
//       }
      
//       const userId = localStorage.getItem('user_id') || 
//                     localStorage.getItem('userId') ||
//                     localStorage.getItem('id');
      
//       if (userId) return parseInt(userId);
      
//       console.warn("No user_id found in localStorage, using default 2");
//       return 2;
//     } catch (error) {
//       console.error("Error getting user_id from localStorage:", error);
//       return 2;
//     }
//   };

//   // Fetch products based on business ID
//   const fetchProducts = () => {
//     setLoading(true);
    
//     const userId = getUserIdFromLocalStorage();
//     const businessId = getBusinessIdFromURL();
    
//     console.log("Fetching products for:", {
//       userId,
//       businessId,
//       hasBusinessId: !!businessId
//     });
    
//     // Build API URL based on whether we have a business ID
//     let apiUrl = `${baseurl}/products/`;
//     const params = new URLSearchParams();
    
//     if (businessId) {
//       // Fetch products for specific business
//       params.append('business', businessId);
//       apiUrl = `${baseurl}/products/?${params.toString()}`;
      
//       // Also fetch business details to get business name
//       fetch(`${baseurl}/business/${businessId}/`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.business_name) {
//             setBusinessName(data.business_name);
//           }
//         })
//         .catch(err => console.error("Error fetching business details:", err));
//     } else {
//       // Fallback: Fetch all products for the user (original behavior)
//       params.append('user_id', userId);
//       apiUrl = `${baseurl}/products/?${params.toString()}`;
//     }
    
//     console.log("API URL:", apiUrl);
    
//     fetch(apiUrl)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(data => {
//         console.log("Products data received:", data);
        
//         const allProductItems = [];
//         (data.results || []).forEach(product => {
//           if (product.variants && product.variants.length > 0) {
//             product.variants.forEach(variant => {
//               allProductItems.push({
//                 product: product,
//                 variant: variant
//               });
//             });
//           } else {
//             allProductItems.push({
//               product: product,
//               variant: {
//                 id: product.product_id,
//                 sku: product.product_id,
//                 mrp: "0.00",
//                 selling_price: "0.00",
//                 stock: 0,
//                 attributes: {},
//                 media: []
//               }
//             });
//           }
//         });
        
//         setProducts(allProductItems);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//         setProducts([]);
//       });
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [location.search]); // Re-fetch when URL changes

//   // Filter handlers
//   const handlePriceRangeToggle = (range) => {
//     setSelectedPriceRanges(prev =>
//       prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
//     );
//     setCurrentPage(1);
//   };

//   const handleDiscountRangeToggle = (range) => {
//     setSelectedDiscountRanges(prev =>
//       prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
//     );
//     setCurrentPage(1);
//   };

//   const handleRemovePriceFilter = (range) => {
//     setSelectedPriceRanges(prev => prev.filter(r => r !== range));
//     setCurrentPage(1);
//   };

//   const handleRemoveDiscountFilter = (range) => {
//     setSelectedDiscountRanges(prev => prev.filter(r => r !== range));
//     setCurrentPage(1);
//   };

//   const handleClearAllFilters = () => {
//     setSelectedPriceRanges([]);
//     setSelectedDiscountRanges([]);
//     setCurrentPage(1);
//   };

//   /* ===== CRUD Operations ===== */
  
//   // C. UPDATE PRODUCT
//   const handleUpdateProduct = (productId, productData) => {
//     console.log("Updating product:", productId, productData);
    
//     const payload = {
//       product: {
//         verification_status: productData.verification_status,
//         brand: productData.brand,
//         product_name: productData.product_name,
//         description: productData.description,
//         is_active: productData.is_active
//       }
//     };

//     fetch(`${baseurl}/products/${productId}/`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload)
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log("Product updated successfully:", data);
//       alert("Product updated successfully!");
//       fetchProducts(); // Refresh the list
//       setEditProductModal({ isOpen: false, product: null });
//     })
//     .catch(error => {
//       console.error("Error updating product:", error);
//       alert("Failed to update product");
//     });
//   };

//   // D. UPDATE VARIANT WITHOUT MEDIA
//   const handleUpdateVariant = (productId, variantId, variantData) => {
//     console.log("Updating variant:", productId, variantId, variantData);
    
//     const payload = {
//       variants: [
//         {
//           id: variantId,
//           mrp: parseFloat(variantData.mrp),
//           selling_price: parseFloat(variantData.selling_price),
//           stock: parseInt(variantData.stock),
//           hsn_code: variantData.hsn_code || null,
//           is_returnable: variantData.is_returnable,
//           return_days: parseInt(variantData.return_days),
//           is_active: variantData.is_active
//         }
//       ]
//     };

//     fetch(`${baseurl}/products/${productId}/`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload)
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log("Variant updated successfully:", data);
//       alert("Variant updated successfully!");
//       fetchProducts(); // Refresh the list
//       setEditVariantModal({ isOpen: false, product: null, variant: null });
//     })
//     .catch(error => {
//       console.error("Error updating variant:", error);
//       alert("Failed to update variant");
//     });
//   };

//   // F. ADD NEW VARIANT (PUT)
//   const handleAddVariant = (productId, variantData) => {
//     console.log("Adding new variant:", productId, variantData);
    
//     const payload = {
//       variants: [variantData]
//     };

//     // Create FormData for file upload
//     const formData = new FormData();
//     formData.append('variants', JSON.stringify(payload.variants));
//     // Note: media_file should be added here if you have file upload
    
//     fetch(`${baseurl}/products/${productId}/`, {
//       method: 'PUT',
//       body: formData
//       // Note: Don't set Content-Type header for FormData, browser will set it with boundary
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log("Variant added successfully:", data);
//       alert("Variant added successfully!");
//       fetchProducts(); // Refresh the list
//       setAddVariantModal({ isOpen: false, product: null });
//     })
//     .catch(error => {
//       console.error("Error adding variant:", error);
//       alert("Failed to add variant");
//     });
//   };

//   // G. DELETE VARIANT
//   const handleDeleteVariant = (productId, variantId) => {
//     console.log("Deleting variant:", productId, variantId);
    
//     fetch(`${baseurl}/products/${productId}/?variants=${variantId}`, {
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log("Variant deleted successfully");
//         alert("Variant deleted successfully!");
//         fetchProducts(); // Refresh the list
//         setEditVariantModal({ isOpen: false, product: null, variant: null });
//       } else {
//         throw new Error("Failed to delete variant");
//       }
//     })
//     .catch(error => {
//       console.error("Error deleting variant:", error);
//       alert("Failed to delete variant");
//     });
//   };

//   // H. DELETE MEDIA
//   const handleDeleteMedia = (productId, mediaId) => {
//     console.log("Deleting media:", productId, mediaId);
    
//     fetch(`${baseurl}/products/${productId}/?media=${mediaId}`, {
//       method: 'DELETE'
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log("Media deleted successfully");
//         alert("Media deleted successfully!");
//         fetchProducts(); // Refresh the list
//         setManageMediaModal({ isOpen: false, product: null, variant: null });
//       } else {
//         throw new Error("Failed to delete media");
//       }
//     })
//     .catch(error => {
//       console.error("Error deleting media:", error);
//       alert("Failed to delete media");
//     });
//   };

//   /* ===== Filter products based on search and filters ===== */
//   const filterProducts = () => {
//     let filtered = products.filter((item) => {
//       const searchTerm = search.toLowerCase();
//       if (!searchTerm) return true;
      
//       return (
//         item.product.product_name.toLowerCase().includes(searchTerm) ||
//         (item.product.brand && item.product.brand.toLowerCase().includes(searchTerm)) ||
//         item.variant.sku.toLowerCase().includes(searchTerm) ||
//         (item.variant.attributes && 
//           JSON.stringify(item.variant.attributes).toLowerCase().includes(searchTerm))
//       );
//     });

//     // Apply price filters
//     if (selectedPriceRanges.length > 0) {
//       filtered = filtered.filter(item => {
//         const price = parseFloat(item.variant.selling_price);
//         return selectedPriceRanges.some(range => {
//           if (range === "10000+") return price >= 10000;
//           const [min, max] = range.split('-').map(Number);
//           return price >= min && price <= max;
//         });
//       });
//     }

//     // Apply discount filters
//     if (selectedDiscountRanges.length > 0) {
//       filtered = filtered.filter(item => {
//         const mrp = parseFloat(item.variant.mrp);
//         const sellingPrice = parseFloat(item.variant.selling_price);
//         let discount = 0;
//         if (mrp > 0 && sellingPrice < mrp) {
//           discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
//         }
        
//         return selectedDiscountRanges.some(range => {
//           if (range === "60+") return discount >= 60;
//           const [min, max] = range.split('-').map(Number);
//           return discount >= min && discount <= max;
//         });
//       });
//     }

//     return filtered;
//   };

//   const filteredProducts = filterProducts();

//   /* ===== Pagination ===== */
//   const itemsPerPage = {
//     "grid-3": 9,
//     "grid-4": 12,
//   }[viewMode];

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Reset page on view/search/filter change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [viewMode, search, selectedPriceRanges, selectedDiscountRanges]);

//   return (
//     <>
//       <AdminNavbar />

//       <div className="webhome-container" style={{ padding: "20px" }}>
//         <button
//           className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft size={16} /> Back
//         </button>

//         {/* PRODUCTS SECTION */}
//         <div className="products-section">
//           <ProductHeader
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             search={search}
//             setSearch={setSearch}
//             totalProducts={filteredProducts.length}
//             onAddVariant={() => {
//               if (products.length > 0) {
//                 setAddVariantModal({ 
//                   isOpen: true, 
//                   product: products[0].product 
//                 });
//               } else {
//                 alert("No products available to add variant to");
//               }
//             }}
//             selectedPriceRanges={selectedPriceRanges}
//             selectedDiscountRanges={selectedDiscountRanges}
//             onPriceRangeToggle={handlePriceRangeToggle}
//             onDiscountRangeToggle={handleDiscountRangeToggle}
//             onRemovePriceFilter={handleRemovePriceFilter}
//             onRemoveDiscountFilter={handleRemoveDiscountFilter}
//             onClearAllFilters={handleClearAllFilters}
//             businessName={businessName}
//           />

//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading products...</p>
//             </div>
//           ) : filteredProducts.length === 0 ? (
//             <div className="text-center py-5">
//               <h5>No products found</h5>
//               <p className="text-muted">
//                 {search || selectedPriceRanges.length > 0 || selectedDiscountRanges.length > 0 
//                   ? "No products match your search or filters" 
//                   : businessName 
//                     ? `No products found for ${businessName}` 
//                     : "You haven't added any products yet"}
//               </p>
//             </div>
//           ) : (
//             <>
//               <ProductGrid 
//                 products={paginatedProducts} 
//                 viewMode={viewMode} 
//                 baseurl={baseurl}
//                 onEditProduct={(product) => setEditProductModal({ isOpen: true, product })}
//                 onEditVariant={(product, variant) => setEditVariantModal({ isOpen: true, product, variant })}
//                 onAddVariant={(product) => setAddVariantModal({ isOpen: true, product })}
//                 onManageMedia={(product, variant) => setManageMediaModal({ isOpen: true, product, variant })}
//               />

//               {/* PRODUCTS PAGINATION */}
//               {totalPages > 1 && (
//                 <nav className="mt-5">
//                   <ul className="pagination justify-content-center">
//                     <li className={`page-item ${currentPage === 1 && "disabled"}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(p => p - 1)}
//                         disabled={currentPage === 1}
//                       >
//                         Previous
//                       </button>
//                     </li>

//                     {Array.from({ length: totalPages }).map((_, i) => {
//                       if (
//                         i === 0 ||
//                         i === totalPages - 1 ||
//                         (i >= currentPage - 2 && i <= currentPage + 2)
//                       ) {
//                         return (
//                           <li
//                             key={i}
//                             className={`page-item ${currentPage === i + 1 && "active"}`}
//                           >
//                             <button
//                               className="page-link"
//                               onClick={() => setCurrentPage(i + 1)}
//                             >
//                               {i + 1}
//                             </button>
//                           </li>
//                         );
//                       }
                      
//                       if (i === 1 || i === totalPages - 2) {
//                         return (
//                           <li key={i} className="page-item disabled">
//                             <span className="page-link">...</span>
//                           </li>
//                         );
//                       }
                      
//                       return null;
//                     })}

//                     <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setCurrentPage(p => p + 1)}
//                         disabled={currentPage === totalPages}
//                       >
//                         Next
//                       </button>
//                     </li>
//                   </ul>
//                 </nav>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* MODALS */}
//       <EditProductModal
//         product={editProductModal.product}
//         isOpen={editProductModal.isOpen}
//         onClose={() => setEditProductModal({ isOpen: false, product: null })}
//         onSave={handleUpdateProduct}
//         baseurl={baseurl}
//       />

//       <EditVariantModal
//         product={editVariantModal.product}
//         variant={editVariantModal.variant}
//         isOpen={editVariantModal.isOpen}
//         onClose={() => setEditVariantModal({ isOpen: false, product: null, variant: null })}
//         onSave={handleUpdateVariant}
//         onDelete={handleDeleteVariant}
//         baseurl={baseurl}
//       />

//       <AddVariantModal
//         product={addVariantModal.product}
//         isOpen={addVariantModal.isOpen}
//         onClose={() => setAddVariantModal({ isOpen: false, product: null })}
//         onAdd={handleAddVariant}
//         baseurl={baseurl}
//       />

//       <ManageMediaModal
//         product={manageMediaModal.product}
//         variant={manageMediaModal.variant}
//         isOpen={manageMediaModal.isOpen}
//         onClose={() => setManageMediaModal({ isOpen: false, product: null, variant: null })}
//         onDeleteMedia={handleDeleteMedia}
//         baseurl={baseurl}
//       />
//     </>
//   );
// };

// export default MyProducts;




import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";
import {
  Search,
  X,
  Grid3X3,
  LayoutList,
  Edit,
  Trash2,
  Plus,
  Eye,
  Package,
  Image as ImageIcon,
  DollarSign,
  PackageOpen,
  ArrowLeft,
  Tag,
  ChevronUp,
  ChevronDown,
  Building,
  Percent,
  TrendingUp
} from "lucide-react";
import { baseurl } from "../../BaseURL/BaseURL";

// Custom hook to detect clicks outside of component
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

/* ================= FILTER COMPONENT ================= */
const FilterDropdown = ({ 
  title, 
  icon: Icon, 
  options, 
  selectedOptions, 
  onOptionToggle,
  type = "price",
  isOpen,
  onToggle
}) => {
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    if (isOpen) onToggle();
  });

  const handleOptionClick = (option) => {
    onOptionToggle(option);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    selectedOptions.forEach(option => onOptionToggle(option));
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-outline-secondary d-flex align-items-center gap-2"
        onClick={onToggle}
        style={{ 
          borderColor: selectedOptions.length > 0 ? '#273c75' : '#dee2e6',
          backgroundColor: selectedOptions.length > 0 ? '#f0f4ff' : 'transparent'
        }}
      >
        {Icon && <Icon size={16} />}
        <span>{title}</span>
        {selectedOptions.length > 0 && (
          <span className="badge bg-primary ms-1">{selectedOptions.length}</span>
        )}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="position-absolute bg-white border rounded shadow mt-1 p-2"
             style={{ 
               minWidth: '200px', 
               zIndex: 1000,
               left: 0,
               top: '100%'
             }}>
          <div className="d-flex justify-content-between align-items-center mb-2 p-2">
            <small className="fw-semibold text-muted">Select {type}</small>
            {selectedOptions.length > 0 && (
              <button 
                className="btn btn-sm btn-link text-decoration-none p-0"
                onClick={clearSelection}
              >
                Clear
              </button>
            )}
          </div>
          <div className="overflow-auto" style={{ maxHeight: '200px' }}>
            {options.map((option) => (
              <div
                key={option.value}
                className="d-flex align-items-center gap-2 p-2 hover-bg-light rounded"
                style={{ cursor: 'pointer' }}
                onClick={() => handleOptionClick(option.value)}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedOptions.includes(option.value)}
                  readOnly
                />
                <span className="small">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= ACTIVE FILTERS BADGES ================= */
const ActiveFilters = ({ 
  selectedPriceRanges, 
  selectedDiscountRanges, 
  priceOptions, 
  discountOptions,
  onRemovePriceFilter,
  onRemoveDiscountFilter,
  onClearAll
}) => {
  const hasActiveFilters = selectedPriceRanges.length > 0 || selectedDiscountRanges.length > 0;
  
  if (!hasActiveFilters) return null;

  const getLabelFromValue = (value, options) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
      <small className="fw-semibold text-muted me-1">Active:</small>
      
      {selectedPriceRanges.map(range => (
        <span key={range} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
          <DollarSign size={12} className="me-1" />
          {getLabelFromValue(range, priceOptions)}
          <button 
            onClick={() => onRemovePriceFilter(range)} 
            className="btn-close btn-close-sm ms-1"
            style={{ fontSize: '0.5rem' }}
          ></button>
        </span>
      ))}
      
      {selectedDiscountRanges.map(range => (
        <span key={range} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
          <Tag size={12} className="me-1" />
          {getLabelFromValue(range, discountOptions)}
          <button 
            onClick={() => onRemoveDiscountFilter(range)} 
            className="btn-close btn-close-sm ms-1"
            style={{ fontSize: '0.5rem' }}
          ></button>
        </span>
      ))}
      
      <button 
        onClick={onClearAll}
        className="btn btn-sm btn-outline-secondary ms-2"
        style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem' }}
      >
        Clear All
      </button>
    </div>
  );
};

/* ================= MODAL COMPONENTS ================= */
const EditProductModal = ({ product, isOpen, onClose, onSave, baseurl }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    brand: "",
    description: "",
    verification_status: "",
    is_active: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name || "",
        brand: product.brand || "",
        description: product.description || "",
        verification_status: product.verification_status || "pending",
        is_active: product.is_active || false
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product.product_id, formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product: {product?.product_name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    className="form-control"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Verification Status</label>
                  <select
                    className="form-select"
                    name="verification_status"
                    value={formData.verification_status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Product Active</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EditVariantModal = ({ product, variant, isOpen, onClose, onSave, onDelete, baseurl }) => {
  const [formData, setFormData] = useState({
    mrp: "",
    selling_price: "",
    stock: "",
    hsn_code: "",
    is_returnable: false,
    return_days: 7,
    is_active: false,
    product_commission: "",
    distribution_commission: ""
  });

  useEffect(() => {
    if (variant) {
      setFormData({
        mrp: variant.mrp || "",
        selling_price: variant.selling_price || "",
        stock: variant.stock || "",
        hsn_code: variant.hsn_code || "",
        is_returnable: variant.is_returnable || false,
        return_days: variant.return_days || 7,
        is_active: variant.is_active || false,
        product_commission: variant.product_commission || "0.00",
        distribution_commission: variant.distribution_commission || "0.00"
      });
    }
  }, [variant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product.product_id, variant.id, formData);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete variant ${variant.sku}?`)) {
      onDelete(product.product_id, variant.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Variant: {variant?.sku}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">SKU</label>
                  <input
                    type="text"
                    className="form-control"
                    value={variant?.sku || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Variant ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={variant?.id || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">MRP *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Selling Price *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="selling_price"
                    value={formData.selling_price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">HSN Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hsn_code"
                    value={formData.hsn_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Return Days</label>
                  <input
                    type="number"
                    className="form-control"
                    name="return_days"
                    value={formData.return_days}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                
                {/* Commission Fields */}
                <div className="col-md-6 mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <TrendingUp size={16} />
                    Product Commission (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="product_commission"
                    value={formData.product_commission}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                  <small className="text-muted">Commission amount in rupees</small>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <TrendingUp size={16} />
                    Distribution Commission (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="distribution_commission"
                    value={formData.distribution_commission}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                  <small className="text-muted">Distribution commission in rupees</small>
                </div>
                
                <div className="col-md-3 mb-3 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_returnable"
                      checked={formData.is_returnable}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Returnable</label>
                  </div>
                </div>
                <div className="col-md-3 mb-3 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <h6>Attributes</h6>
                  <pre className="bg-light p-3 rounded">
                    {JSON.stringify(variant?.attributes || {}, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                <Trash2 size={16} /> Delete Variant
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AddVariantModal = ({ product, isOpen, onClose, onAdd, baseurl }) => {
  const [formData, setFormData] = useState({
    sku: "",
    mrp: "",
    selling_price: "",
    stock: "",
    hsn_code: "",
    is_returnable: false,
    return_days: 7,
    is_active: true,
    product_commission: "0.00",
    distribution_commission: "0.00",
    attributes: JSON.stringify({
      quantity: "",
      packaging: "",
      display: ""
    }, null, 2)
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const attributes = JSON.parse(formData.attributes);
      const variantData = {
        sku: formData.sku,
        mrp: parseFloat(formData.mrp),
        selling_price: parseFloat(formData.selling_price),
        stock: parseInt(formData.stock),
        hsn_code: formData.hsn_code || null,
        is_returnable: formData.is_returnable,
        return_days: parseInt(formData.return_days),
        is_active: formData.is_active,
        product_commission: formData.product_commission || "0.00",
        distribution_commission: formData.distribution_commission || "0.00",
        attributes: attributes,
        media: [{ media_type: "image" }]
      };
      onAdd(product.product_id, variantData);
    } catch (error) {
      alert("Invalid JSON in attributes field");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Variant to {product?.product_name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">SKU *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">MRP *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="mrp"
                    value={formData.mrp}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Selling Price *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="selling_price"
                    value={formData.selling_price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">HSN Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hsn_code"
                    value={formData.hsn_code}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Return Days</label>
                  <input
                    type="number"
                    className="form-control"
                    name="return_days"
                    value={formData.return_days}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                
                {/* Commission Fields for Add Variant */}
                <div className="col-md-6 mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <TrendingUp size={16} />
                    Product Commission (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="product_commission"
                    value={formData.product_commission}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                  <small className="text-muted">Commission amount in rupees</small>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label d-flex align-items-center gap-2">
                    <TrendingUp size={16} />
                    Distribution Commission (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="distribution_commission"
                    value={formData.distribution_commission}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                  <small className="text-muted">Distribution commission in rupees</small>
                </div>
                
                <div className="col-md-6 mb-3 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_returnable"
                      checked={formData.is_returnable}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Returnable</label>
                  </div>
                </div>
                <div className="col-md-6 mb-3 d-flex align-items-end">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Attributes (JSON Format)</label>
                  <textarea
                    className="form-control"
                    name="attributes"
                    rows="4"
                    value={formData.attributes}
                    onChange={handleChange}
                    placeholder='{"quantity": "500ml", "packaging": "Bottle", "display": "500 ml"}'
                  />
                  <small className="text-muted">Enter valid JSON for variant attributes</small>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                <Plus size={16} /> Add Variant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ManageMediaModal = ({ product, variant, isOpen, onClose, onDeleteMedia, baseurl }) => {
  const [selectedMedia, setSelectedMedia] = useState([]);

  if (!isOpen) return null;

  const handleDeleteMedia = (mediaId) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      onDeleteMedia(product.product_id, mediaId);
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Manage Media for {variant?.sku}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h6 className="mb-3">Media Files ({variant?.media?.length || 0})</h6>
            <div className="row">
              {variant?.media?.map((mediaItem) => (
                <div key={mediaItem.id} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      {mediaItem.media_type === 'image' ? (
                        <img 
                          src={`${baseurl}${mediaItem.file}`} 
                          alt="Media" 
                          className="img-fluid mb-2"
                          style={{ maxHeight: '150px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w-300";
                          }}
                        />
                      ) : (
                        <div className="bg-light p-4 mb-2">
                          <PackageOpen size={48} className="text-muted" />
                          <p className="mt-2 mb-0">Video File</p>
                          <small>{mediaItem.file?.split('/').pop()}</small>
                        </div>
                      )}
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">{mediaItem.media_type}</small>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteMedia(mediaItem.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!variant?.media || variant.media.length === 0) && (
                <div className="col-12 text-center py-4">
                  <ImageIcon size={48} className="text-muted mb-2" />
                  <p className="text-muted">No media files found</p>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= PRODUCT CARD COMPONENT ================= */
const ProductCard = ({ 
  product, 
  variant, 
  baseurl,
  onEditProduct,
  onEditVariant,
  onAddVariant,
  onManageMedia
}) => {
  const navigate = useNavigate();
  
  // Get image for specific variant
  const getProductImage = () => {
    if (variant.media && variant.media.length > 0) {
      const imageMedia = variant.media.find(m => m.media_type === "image");
      if (imageMedia) {
        return `${baseurl}${imageMedia.file}`;
      }
      return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
    }
    
    if (product.variants && product.variants.length > 0) {
      for (const v of product.variants) {
        if (v.media && v.media.length > 0) {
          const imageMedia = v.media.find(m => m.media_type === "image");
          if (imageMedia) {
            return `${baseurl}${imageMedia.file}`;
          }
        }
      }
    }
    
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
  };

  // Calculate discount percentage for variant
  const calculateDiscount = () => {
    const mrp = parseFloat(variant.mrp);
    const sellingPrice = parseFloat(variant.selling_price);
    if (mrp > 0 && sellingPrice < mrp) {
      return Math.round(((mrp - sellingPrice) / mrp) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();
  
  // Create variant name
  const getVariantName = () => {
    if (variant.attributes && variant.attributes.display) {
      return `${product.product_name} - ${variant.attributes.display}`;
    } else if (variant.attributes) {
      const attrDisplay = Object.entries(variant.attributes)
        .filter(([key]) => key !== 'unit' && key !== 'value')
        .map(([key, value]) => value)
        .join(" ");
      if (attrDisplay.trim()) {
        return `${product.product_name} - ${attrDisplay}`;
      }
    }
    return product.product_name;
  };

  // Get variant display text from attributes
  const getVariantDisplay = () => {
    if (variant.attributes) {
      const displayAttrs = [];
      
      if (variant.attributes.display) {
        displayAttrs.push(variant.attributes.display);
      }
      
      if (variant.attributes.packaging) {
        displayAttrs.push(variant.attributes.packaging);
      }
      
      if (variant.attributes.milk_type) {
        displayAttrs.push(variant.attributes.milk_type);
      }
      
      if (variant.attributes.fat_content) {
        displayAttrs.push(variant.attributes.fat_content);
      }
      
      if (variant.attributes.quantity) {
        displayAttrs.push(variant.attributes.quantity);
      }
      
      return displayAttrs.join(" • ");
    }
    return "";
  };
  
  return (
    <div className="card h-100 shadow-sm border-0">
      {/* Product Image with Discount Badge */}
      <div className="bg-light p-3 text-center position-relative" style={{ height: 150, cursor: "pointer" }}
           onClick={() => navigate(`/admin-business-product-details/${product.product_id}?variant=${variant.id}`)}>
        <img
          src={getProductImage()}
          alt={getVariantName()}
          className="img-fluid mt-4"
          style={{ maxHeight: "100%", objectFit: "contain" }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
          }}
        />
        {discount > 0 && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h6 className="line-clamp-2 mb-2" style={{ cursor: "pointer", minHeight: "30px" }}
            onClick={() => navigate(`/admin-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
          {getVariantName()}
        </h6>
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">{product.brand || "No Brand"}</small>
          <span className={`badge ${variant.is_active ? 'bg-success' : 'bg-danger'}`}>
            {variant.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        {/* Variant attributes */}
        {getVariantDisplay() && (
          <small className="text-info mb-2 d-block">
            {getVariantDisplay()}
          </small>
        )}

        {/* Stock status */}
        <small className={`mb-2 ${variant.stock > 0 ? "text-success" : "text-danger"}`}>
          {variant.stock > 0 ? `In Stock (${variant.stock})` : "Out of Stock"}
        </small>

        {/* Verification Status */}
        <small className={`badge mb-2 ${variant.verification_status === 'verified' ? 'bg-success' : variant.verification_status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
          {variant.verification_status || 'pending'}
        </small>

        {/* Price Section */}
        <div className="mt-auto mb-3">
          <div className="d-flex align-items-center gap-2">
            <strong className="h5 mb-0">₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
            {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
              <small className="text-muted text-decoration-line-through">
                ₹{parseFloat(variant.mrp).toFixed(2)}
              </small>
            )}
          </div>
        </div>

        {/* Action Buttons - Moved above the main buttons */}
        <div className="mb-3">
          <div className="btn-group w-100" role="group">
            <button 
              className="btn btn-sm btn-outline-primary flex-fill"
              onClick={(e) => {
                e.stopPropagation();
                onEditProduct(product);
              }}
              title="Edit Product"
            >
              <Edit size={14} /> Product
            </button>
            <button 
              className="btn btn-sm btn-outline-info flex-fill"
              onClick={(e) => {
                e.stopPropagation();
                onEditVariant(product, variant);
              }}
              title="Edit Variant"
            >
              <Package size={14} /> Variant
            </button>
            <button 
              className="btn btn-sm btn-outline-warning flex-fill"
              onClick={(e) => {
                e.stopPropagation();
                onManageMedia(product, variant);
              }}
              title="Manage Media"
            >
              <ImageIcon size={14} /> Media
            </button>
          </div>
        </div>

        {/* View Details and Add to Cart in one row */}
        <div className="d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* VIEW DETAILS BUTTON */}
          <button 
            className="btn text-white" 
            style={{ background: "#6c757d", fontSize: "14px" }}
            onClick={() => navigate(`/admin-business-product-details/${product.product_id}/?variant=${variant.id}`)}
          >
            <Eye size={14} /> Details
          </button>

          {/* ADD TO CART BUTTON */}
          <button 
            className="btn text-white" 
            style={{ background: "#273c75", fontSize: "14px" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart:", variant.id, variant.sku);
            }}
            disabled={variant.stock <= 0}
          >
            {variant.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

        {/* PAYOUT BUTTON - Full width below the two buttons */}
        <button 
          className="btn w-100 text-white mt-2" 
          style={{ background: "#273c75", fontSize: "14px" }}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Payout:", variant.id, variant.sku);
          }}
        >
          PAYOUT
        </button>
      </div>
    </div>
  );
};

/* ================= PRODUCT HEADER COMPONENT ================= */
const ProductHeader = ({ 
  viewMode, 
  onViewModeChange, 
  search, 
  setSearch, 
  totalProducts,
  onAddVariant,
  selectedPriceRanges,
  selectedDiscountRanges,
  onPriceRangeToggle,
  onDiscountRangeToggle,
  onRemovePriceFilter,
  onRemoveDiscountFilter,
  onClearAllFilters,
  businessName
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'price', 'discount', or null

  const views = [
    { mode: "grid-3", icon: Grid3X3 },
    { mode: "grid-4", icon: LayoutList },
  ];

  const priceOptions = [
    { value: "0-500", label: "Under ₹500" },
    { value: "500-1000", label: "₹500 - ₹1000" },
    { value: "1000-5000", label: "₹1000 - ₹5000" },
    { value: "5000-10000", label: "₹5000 - ₹10000" },
    { value: "10000+", label: "Over ₹10000" },
  ];

  const discountOptions = [
    { value: "0-10", label: "0-10%" },
    { value: "10-20", label: "10-20%" },
    { value: "20-30", label: "20-30%" },
    { value: "30-40", label: "30-40%" },
    { value: "40-50", label: "40-50%" },
    { value: "50-60", label: "50-60%" },
    { value: "60+", label: "60%+" },
  ];

  const handlePriceToggle = () => {
    setOpenDropdown(openDropdown === 'price' ? null : 'price');
  };

  const handleDiscountToggle = () => {
    setOpenDropdown(openDropdown === 'discount' ? null : 'discount');
  };

  const handleOptionClick = (type, option) => {
    if (type === 'price') {
      onPriceRangeToggle(option);
    } else {
      onDiscountRangeToggle(option);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Building size={20} className="text-primary" />
            <h4 className="fw-bold mb-0">Products for {businessName || "Business"}</h4>
          </div>
          <small className="text-muted">{totalProducts} products found</small>
        </div>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          <div className="input-group input-group-sm" style={{ width: 220 }}>
            <span className="input-group-text bg-transparent border-end-0">
              <Search size={16} />
            </span>
            <input
              className="form-control border-start-0"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="btn btn-outline-secondary border-start-0" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <FilterDropdown
            title="Price"
            icon={DollarSign}
            options={priceOptions}
            selectedOptions={selectedPriceRanges}
            onOptionToggle={(option) => handleOptionClick('price', option)}
            isOpen={openDropdown === 'price'}
            onToggle={handlePriceToggle}
            type="price"
          />

          <FilterDropdown
            title="Discount"
            icon={Tag}
            options={discountOptions}
            selectedOptions={selectedDiscountRanges}
            onOptionToggle={(option) => handleOptionClick('discount', option)}
            isOpen={openDropdown === 'discount'}
            onToggle={handleDiscountToggle}
            type="discount"
          />

          <div className="btn-group">
            {views.map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                className={`btn btn-outline-secondary ${viewMode === mode ? "active" : ""}`}
                onClick={() => onViewModeChange(mode)}
                title={`${mode.replace('grid-', '')} columns`}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <ActiveFilters
        selectedPriceRanges={selectedPriceRanges}
        selectedDiscountRanges={selectedDiscountRanges}
        priceOptions={priceOptions}
        discountOptions={discountOptions}
        onRemovePriceFilter={onRemovePriceFilter}
        onRemoveDiscountFilter={onRemoveDiscountFilter}
        onClearAll={onClearAllFilters}
      />
    </>
  );
};

/* ================= PRODUCT GRID COMPONENT ================= */
const ProductGrid = ({ 
  products, 
  viewMode, 
  baseurl,
  onEditProduct,
  onEditVariant,
  onAddVariant,
  onManageMedia
}) => {
  const gridClass = {
    "grid-3": "row row-cols-1 row-cols-sm-2 row-cols-md-3",
    "grid-4": "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4",
  }[viewMode];

  return (
    <div className={gridClass}>
      {products.map((item) => (
        <div key={`${item.product.product_id}-${item.variant.id}`} className="col mb-4">
          <ProductCard 
            product={item.product} 
            variant={item.variant} 
            baseurl={baseurl}
            onEditProduct={onEditProduct}
            onEditVariant={onEditVariant}
            onAddVariant={onAddVariant}
            onManageMedia={onManageMedia}
          />
        </div>
      ))}
    </div>
  );
};

/* ================= MAIN PRODUCTS COMPONENT ================= */
const MyProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState("");
  
  // Products grid states
  const [viewMode, setViewMode] = useState("grid-4");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

  // Modal states
  const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
  const [editVariantModal, setEditVariantModal] = useState({ isOpen: false, product: null, variant: null });
  const [addVariantModal, setAddVariantModal] = useState({ isOpen: false, product: null });
  const [manageMediaModal, setManageMediaModal] = useState({ isOpen: false, product: null, variant: null });

  // Get business ID from URL query parameters
  const getBusinessIdFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('business');
  };

  // Get user_id from localStorage
  const getUserIdFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.user_id) return user.user_id;
        if (user.id) return user.id;
      }
      
      const userId = localStorage.getItem('user_id') || 
                    localStorage.getItem('userId') ||
                    localStorage.getItem('id');
      
      if (userId) return parseInt(userId);
      
      console.warn("No user_id found in localStorage, using default 2");
      return 2;
    } catch (error) {
      console.error("Error getting user_id from localStorage:", error);
      return 2;
    }
  };

  // Fetch products based on business ID
  const fetchProducts = () => {
    setLoading(true);
    
    const userId = getUserIdFromLocalStorage();
    const businessId = getBusinessIdFromURL();
    
    console.log("Fetching products for:", {
      userId,
      businessId,
      hasBusinessId: !!businessId
    });
    
    // Build API URL based on whether we have a business ID
    let apiUrl = `${baseurl}/products/`;
    const params = new URLSearchParams();
    
    if (businessId) {
      // Fetch products for specific business
      params.append('business', businessId);
      apiUrl = `${baseurl}/products/?${params.toString()}`;
      
      // Also fetch business details to get business name
      fetch(`${baseurl}/business/${businessId}/`)
        .then(res => res.json())
        .then(data => {
          if (data.business_name) {
            setBusinessName(data.business_name);
          }
        })
        .catch(err => console.error("Error fetching business details:", err));
    } else {
      // Fallback: Fetch all products for the user (original behavior)
      params.append('user_id', userId);
      apiUrl = `${baseurl}/products/?${params.toString()}`;
    }
    
    console.log("API URL:", apiUrl);
    
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Products data received:", data);
        
        const allProductItems = [];
        (data.results || []).forEach(product => {
          if (product.variants && product.variants.length > 0) {
            product.variants.forEach(variant => {
              allProductItems.push({
                product: product,
                variant: variant
              });
            });
          } else {
            allProductItems.push({
              product: product,
              variant: {
                id: product.product_id,
                sku: product.product_id,
                mrp: "0.00",
                selling_price: "0.00",
                stock: 0,
                attributes: {},
                media: []
              }
            });
          }
        });
        
        setProducts(allProductItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [location.search]); // Re-fetch when URL changes

  // Filter handlers
  const handlePriceRangeToggle = (range) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
    setCurrentPage(1);
  };

  const handleDiscountRangeToggle = (range) => {
    setSelectedDiscountRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
    setCurrentPage(1);
  };

  const handleRemovePriceFilter = (range) => {
    setSelectedPriceRanges(prev => prev.filter(r => r !== range));
    setCurrentPage(1);
  };

  const handleRemoveDiscountFilter = (range) => {
    setSelectedDiscountRanges(prev => prev.filter(r => r !== range));
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedDiscountRanges([]);
    setCurrentPage(1);
  };

  /* ===== CRUD Operations ===== */
  
  // C. UPDATE PRODUCT
  const handleUpdateProduct = (productId, productData) => {
    console.log("Updating product:", productId, productData);
    
    const payload = {
      product: {
        verification_status: productData.verification_status,
        brand: productData.brand,
        product_name: productData.product_name,
        description: productData.description,
        is_active: productData.is_active
      }
    };

    fetch(`${baseurl}/products/${productId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Product updated successfully:", data);
      alert("Product updated successfully!");
      fetchProducts(); // Refresh the list
      setEditProductModal({ isOpen: false, product: null });
    })
    .catch(error => {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    });
  };

  // D. UPDATE VARIANT WITHOUT MEDIA
  const handleUpdateVariant = (productId, variantId, variantData) => {
    console.log("Updating variant:", productId, variantId, variantData);
    
    const payload = {
      variants: [
        {
          id: variantId,
          mrp: parseFloat(variantData.mrp),
          selling_price: parseFloat(variantData.selling_price),
          stock: parseInt(variantData.stock),
          hsn_code: variantData.hsn_code || null,
          is_returnable: variantData.is_returnable,
          return_days: parseInt(variantData.return_days),
          is_active: variantData.is_active,
          product_commission: variantData.product_commission || "0.00",
          distribution_commission: variantData.distribution_commission || "0.00"
        }
      ]
    };

    fetch(`${baseurl}/products/${productId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Variant updated successfully:", data);
      alert("Variant updated successfully!");
      fetchProducts(); // Refresh the list
      setEditVariantModal({ isOpen: false, product: null, variant: null });
    })
    .catch(error => {
      console.error("Error updating variant:", error);
      alert("Failed to update variant");
    });
  };

  // F. ADD NEW VARIANT (PUT)
  const handleAddVariant = (productId, variantData) => {
    console.log("Adding new variant:", productId, variantData);
    
    const payload = {
      variants: [variantData]
    };

    // Create FormData for file upload
    const formData = new FormData();
    formData.append('variants', JSON.stringify(payload.variants));
    // Note: media_file should be added here if you have file upload
    
    fetch(`${baseurl}/products/${productId}/`, {
      method: 'PUT',
      body: formData
      // Note: Don't set Content-Type header for FormData, browser will set it with boundary
    })
    .then(response => response.json())
    .then(data => {
      console.log("Variant added successfully:", data);
      alert("Variant added successfully!");
      fetchProducts(); // Refresh the list
      setAddVariantModal({ isOpen: false, product: null });
    })
    .catch(error => {
      console.error("Error adding variant:", error);
      alert("Failed to add variant");
    });
  };

  // G. DELETE VARIANT
  const handleDeleteVariant = (productId, variantId) => {
    console.log("Deleting variant:", productId, variantId);
    
    fetch(`${baseurl}/products/${productId}/?variants=${variantId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log("Variant deleted successfully");
        alert("Variant deleted successfully!");
        fetchProducts(); // Refresh the list
        setEditVariantModal({ isOpen: false, product: null, variant: null });
      } else {
        throw new Error("Failed to delete variant");
      }
    })
    .catch(error => {
      console.error("Error deleting variant:", error);
      alert("Failed to delete variant");
    });
  };

  // H. DELETE MEDIA
  const handleDeleteMedia = (productId, mediaId) => {
    console.log("Deleting media:", productId, mediaId);
    
    fetch(`${baseurl}/products/${productId}/?media=${mediaId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log("Media deleted successfully");
        alert("Media deleted successfully!");
        fetchProducts(); // Refresh the list
        setManageMediaModal({ isOpen: false, product: null, variant: null });
      } else {
        throw new Error("Failed to delete media");
      }
    })
    .catch(error => {
      console.error("Error deleting media:", error);
      alert("Failed to delete media");
    });
  };

  /* ===== Filter products based on search and filters ===== */
  const filterProducts = () => {
    let filtered = products.filter((item) => {
      const searchTerm = search.toLowerCase();
      if (!searchTerm) return true;
      
      return (
        item.product.product_name.toLowerCase().includes(searchTerm) ||
        (item.product.brand && item.product.brand.toLowerCase().includes(searchTerm)) ||
        item.variant.sku.toLowerCase().includes(searchTerm) ||
        (item.variant.attributes && 
          JSON.stringify(item.variant.attributes).toLowerCase().includes(searchTerm))
      );
    });

    // Apply price filters
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter(item => {
        const price = parseFloat(item.variant.selling_price);
        return selectedPriceRanges.some(range => {
          if (range === "10000+") return price >= 10000;
          const [min, max] = range.split('-').map(Number);
          return price >= min && price <= max;
        });
      });
    }

    // Apply discount filters
    if (selectedDiscountRanges.length > 0) {
      filtered = filtered.filter(item => {
        const mrp = parseFloat(item.variant.mrp);
        const sellingPrice = parseFloat(item.variant.selling_price);
        let discount = 0;
        if (mrp > 0 && sellingPrice < mrp) {
          discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
        }
        
        return selectedDiscountRanges.some(range => {
          if (range === "60+") return discount >= 60;
          const [min, max] = range.split('-').map(Number);
          return discount >= min && discount <= max;
        });
      });
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

  /* ===== Pagination ===== */
  const itemsPerPage = {
    "grid-3": 9,
    "grid-4": 12,
  }[viewMode];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on view/search/filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, search, selectedPriceRanges, selectedDiscountRanges]);

  return (
    <>
      <AdminNavbar />

      <div className="webhome-container" style={{ padding: "20px" }}>
        <button
          className="btn btn-outline-secondary mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* PRODUCTS SECTION */}
        <div className="products-section">
          <ProductHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            search={search}
            setSearch={setSearch}
            totalProducts={filteredProducts.length}
            onAddVariant={() => {
              if (products.length > 0) {
                setAddVariantModal({ 
                  isOpen: true, 
                  product: products[0].product 
                });
              } else {
                alert("No products available to add variant to");
              }
            }}
            selectedPriceRanges={selectedPriceRanges}
            selectedDiscountRanges={selectedDiscountRanges}
            onPriceRangeToggle={handlePriceRangeToggle}
            onDiscountRangeToggle={handleDiscountRangeToggle}
            onRemovePriceFilter={handleRemovePriceFilter}
            onRemoveDiscountFilter={handleRemoveDiscountFilter}
            onClearAllFilters={handleClearAllFilters}
            businessName={businessName}
          />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
              <p className="text-muted">
                {search || selectedPriceRanges.length > 0 || selectedDiscountRanges.length > 0 
                  ? "No products match your search or filters" 
                  : businessName 
                    ? `No products found for ${businessName}` 
                    : "You haven't added any products yet"}
              </p>
            </div>
          ) : (
            <>
              <ProductGrid 
                products={paginatedProducts} 
                viewMode={viewMode} 
                baseurl={baseurl}
                onEditProduct={(product) => setEditProductModal({ isOpen: true, product })}
                onEditVariant={(product, variant) => setEditVariantModal({ isOpen: true, product, variant })}
                onAddVariant={(product) => setAddVariantModal({ isOpen: true, product })}
                onManageMedia={(product, variant) => setManageMediaModal({ isOpen: true, product, variant })}
              />

              {/* PRODUCTS PAGINATION */}
              {totalPages > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      if (
                        i === 0 ||
                        i === totalPages - 1 ||
                        (i >= currentPage - 2 && i <= currentPage + 2)
                      ) {
                        return (
                          <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 && "active"}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        );
                      }
                      
                      if (i === 1 || i === totalPages - 2) {
                        return (
                          <li key={i} className="page-item disabled">
                            <span className="page-link">...</span>
                          </li>
                        );
                      }
                      
                      return null;
                    })}

                    <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      {/* MODALS */}
      <EditProductModal
        product={editProductModal.product}
        isOpen={editProductModal.isOpen}
        onClose={() => setEditProductModal({ isOpen: false, product: null })}
        onSave={handleUpdateProduct}
        baseurl={baseurl}
      />

      <EditVariantModal
        product={editVariantModal.product}
        variant={editVariantModal.variant}
        isOpen={editVariantModal.isOpen}
        onClose={() => setEditVariantModal({ isOpen: false, product: null, variant: null })}
        onSave={handleUpdateVariant}
        onDelete={handleDeleteVariant}
        baseurl={baseurl}
      />

      <AddVariantModal
        product={addVariantModal.product}
        isOpen={addVariantModal.isOpen}
        onClose={() => setAddVariantModal({ isOpen: false, product: null })}
        onAdd={handleAddVariant}
        baseurl={baseurl}
      />

      <ManageMediaModal
        product={manageMediaModal.product}
        variant={manageMediaModal.variant}
        isOpen={manageMediaModal.isOpen}
        onClose={() => setManageMediaModal({ isOpen: false, product: null, variant: null })}
        onDeleteMedia={handleDeleteMedia}
        baseurl={baseurl}
      />
    </>
  );
};

export default MyProducts;