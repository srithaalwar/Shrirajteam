// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// //  import './AgentBusinessProductsCategories.css'
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../Client_Navbar/Client_Navbar";

// const ClientBusinessProductsCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const navigate = useNavigate();
//   const categoriesRowRef = useRef(null);

//   useEffect(() => {
//     // Using baseurl for the API endpoint
//     fetch(`${baseurl}/categories/?level=global`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = data.results
//           .filter(cat => cat.level === "global" && cat.is_active)
//           .sort((a, b) => a.display_order - b.display_order);

//         setCategories(filtered);
//       })
//       .catch(error => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   // Calculate total pages
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(categories.length / itemsPerPage);

//   // Get current page categories
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentCategories = categories.slice(startIndex, endIndex);

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setCurrentPage(prev => prev - 1);
//     }
//   };

//   return (

//     <>
//     <ClientNavbar/>
//     <div className="categories-wrapper">
//       {/* LEFT ARROW */}
//       <button
//         className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//         onClick={handlePrev}
//         disabled={currentPage === 0}
//       >
//         ‹
//       </button>

//       {/* CATEGORIES */}
//       <div className="categories-row" ref={categoriesRowRef}>
//         {currentCategories.map(cat => (
//           <div
//             className="category-item"
//             key={cat.category_id}
//             onClick={() => navigate(`/client-subcategory/${cat.category_id}`)}
//           >
//             <div className="category-icon">
//               <BusinessCenterIcon />
//             </div>
//             <p>{cat.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT ARROW */}
//       <button
//         className={`category-arrow ${currentPage === totalPages - 1 ? "disabled" : ""}`}
//         onClick={handleNext}
//         disabled={currentPage === totalPages - 1}
//       >
//         ›
//       </button>

//       {/* Optional: Dots indicator - Remove if not needed */}
//       {totalPages > 1 && (
//         <div className="category-dots">
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <span
//               key={index}
//               className={`category-dot ${index === currentPage ? "active" : ""}`}
//               onClick={() => setCurrentPage(index)}
//             ></span>
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default ClientBusinessProductsCategories;



// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import {
//   Search,
//   X,
//   Eye,
//   Grid3X3,
//   LayoutList,
//   ChevronUp,
//   ChevronDown,
//   Tag,
//   DollarSign
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../Client_Navbar/Client_Navbar";

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

// /* ================= FILTER COMPONENTS ================= */
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

// /* ================= PRODUCT CARD COMPONENT ================= */
// const ProductCard = ({ product, variant, baseurl }) => {
//   const navigate = useNavigate();
  
//   const getProductImage = () => {
//     if (variant.media && variant.media.length > 0) {
//       return `${baseurl}${variant.media[0].file}`;
//     }
    
//     if (product.variants && product.variants.length > 0) {
//       const variantWithMedia = product.variants.find(v => v.media && v.media.length > 0);
//       if (variantWithMedia && variantWithMedia.media.length > 0) {
//         return `${baseurl}${variantWithMedia.media[0].file}`;
//       }
//     }
    
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   const calculateDiscount = () => {
//     const mrp = parseFloat(variant.mrp);
//     const sellingPrice = parseFloat(variant.selling_price);
//     if (mrp > 0 && sellingPrice < mrp) {
//       return Math.round(((mrp - sellingPrice) / mrp) * 100);
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
  
//   const getVariantName = () => {
//     if (variant.attributes) {
//       const attrDisplay = Object.values(variant.attributes)
//         .filter(val => typeof val === 'string' || typeof val === 'number')
//         .join(" ");
//       if (attrDisplay.trim()) {
//         return `${product.product_name} - ${attrDisplay}`;
//       }
//     }
//     return product.product_name;
//   };

//   const getVariantDisplay = () => {
//     if (variant.attributes) {
//       return Object.entries(variant.attributes)
//         .map(([key, value]) => `${value}`)
//         .join(" • ");
//     }
//     return "";
//   };
  
//   return (
//     <div className="card h-100" style={{ zIndex: 999 }}>
//       <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
//            onClick={() => navigate(`/client-business-product-details/${product.product_id}?variant=${variant.id}`)}>
//         <img
//           src={getProductImage()}
//           alt={getVariantName()}
//           className="img-fluid"
//           style={{ maxHeight: "100%", objectFit: "contain" }}
//         />
//         {discount > 0 && (
//           <span className="badge bg-danger position-absolute top-0 end-0 m-2">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       <div className="card-body d-flex flex-column">
//         <h6 className="line-clamp-2" style={{ cursor: "pointer" }}
//             onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
//           {getVariantName()}
//         </h6>
//         <small className="text-muted">{product.brand || "No Brand"}</small>
        
//         {getVariantDisplay() && (
//           <small className="text-info mb-2">
//             {getVariantDisplay()}
//           </small>
//         )}

//         <div className="mt-auto">
//           <div className="d-flex align-items-center gap-2">
//             <strong>₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
//             {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(variant.mrp).toFixed(2)}
//               </small>
//             )}
//           </div>

//           {/* View Details and Add to Cart in one row */}
//         <div className="d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
//           {/* VIEW DETAILS BUTTON */}
//           <button 
//             className="btn text-white" 
//             style={{ background: "#6c757d", fontSize: "14px" }}
//             onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}
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

//         <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#273c75" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Add to cart:", variant.id, variant.sku);
//             }}
//           >
// PAYOUT          </button>

//           {/* <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#6c757d", marginBottom: "8px" }}
//             onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}
//           >
//             VIEW DETAILS
//           </button> */}

//           {/* <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#273c75" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               console.log("Add to cart:", variant.id, variant.sku);
//             }}
//           >
//             ADD TO CART
//           </button> */}
//         </div>
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
//   selectedPriceRanges,
//   selectedDiscountRanges,
//   onPriceRangeToggle,
//   onDiscountRangeToggle,
//   onRemovePriceFilter,
//   onRemoveDiscountFilter,
//   onClearAllFilters
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
//         <h4 className="fw-bold mb-0">Products</h4>

//         <div className="d-flex align-items-center gap-2 flex-wrap">
//           <div className="input-group input-group-sm" style={{ width: 220 }}>
//             <span className="input-group-text bg-transparent">
//               <Search size={16} />
//             </span>
//             <input
//               className="form-control"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             {search && (
//               <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
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
// const ProductGrid = ({ products, viewMode, baseurl }) => {
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
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN CATEGORIES COMPONENT ================= */
// const ClientBusinessProductsCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const navigate = useNavigate();
//   const categoriesRowRef = useRef(null);

//   // Products states (from AgentBusinessProductsCategories pattern)
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsViewMode, setProductsViewMode] = useState("grid-4");
//   const [productsSearch, setProductsSearch] = useState("");
//   const [productsCurrentPage, setProductsCurrentPage] = useState(1);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

//   // Fetch categories
//   useEffect(() => {
//     fetch(`${baseurl}/categories/?level=global`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = data.results
//           .filter(cat => cat.level === "global" && cat.is_active)
//           .sort((a, b) => a.display_order - b.display_order);

//         setCategories(filtered);
//       })
//       .catch(error => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   // Fetch products (using the same pattern as AgentBusinessProductsCategories)
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
    
//     const params = new URLSearchParams();
    
//     if (productsSearch.trim()) params.append('search', productsSearch.trim());
    
//     selectedPriceRanges.forEach(range => params.append('price_range', range));
//     selectedDiscountRanges.forEach(range => params.append('discount_range', range));
    
//     try {
//       const response = await fetch(`${baseurl}/products/?${params.toString()}`);
//       const data = await response.json();
      
//       const allProductItems = [];
//       (data.results || []).forEach(product => {
//         if (product.variants && product.variants.length > 0) {
//           product.variants.forEach(variant => {
//             allProductItems.push({ product, variant });
//           });
//         } else {
//           allProductItems.push({
//             product,
//             variant: {
//               id: product.product_id,
//               sku: product.product_id,
//               mrp: "0.00",
//               selling_price: "0.00",
//               attributes: {}
//             }
//           });
//         }
//       });
      
//       setProducts(allProductItems);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [productsSearch, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Filter handlers
//   const handlePriceRangeToggle = (range) => {
//     setSelectedPriceRanges(prev =>
//       prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
//     );
//     setProductsCurrentPage(1);
//   };

//   const handleDiscountRangeToggle = (range) => {
//     setSelectedDiscountRanges(prev =>
//       prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
//     );
//     setProductsCurrentPage(1);
//   };

//   const handleRemovePriceFilter = (range) => {
//     setSelectedPriceRanges(prev => prev.filter(r => r !== range));
//     setProductsCurrentPage(1);
//   };

//   const handleRemoveDiscountFilter = (range) => {
//     setSelectedDiscountRanges(prev => prev.filter(r => r !== range));
//     setProductsCurrentPage(1);
//   };

//   const handleClearAllFilters = () => {
//     setSelectedPriceRanges([]);
//     setSelectedDiscountRanges([]);
//     setProductsCurrentPage(1);
//   };

//   // Categories pagination
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(categories.length / itemsPerPage);
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentCategories = categories.slice(startIndex, endIndex);

//   // Products pagination
//   const productsItemsPerPage = {
//     "grid-3": 6,
//     "grid-4": 8,
//   }[productsViewMode];

//   const productsTotalPages = Math.ceil(products.length / productsItemsPerPage);
//   const paginatedProducts = products.slice(
//     (productsCurrentPage - 1) * productsItemsPerPage,
//     productsCurrentPage * productsItemsPerPage
//   );

//   useEffect(() => {
//     setProductsCurrentPage(1);
//   }, [productsViewMode, productsSearch]);

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setCurrentPage(prev => prev - 1);
//     }
//   };

//   return (
//     <>
//       <ClientNavbar />
      
//       <div className="container-fluid py-4">
//         {/* Categories Section */}
//         <h2 className="section-title-head mb-4">Categories</h2>
        
//         <div className="categories-wrapper mb-5">
//           <button
//             className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//             onClick={handlePrev}
//             disabled={currentPage === 0}
//           >
//             ‹
//           </button>

//           <div className="categories-row" ref={categoriesRowRef}>
//             {currentCategories.map(cat => (
//               <div
//                 className="category-item"
//                 key={cat.category_id}
//                 onClick={() => navigate(`/client-subcategory/${cat.category_id}`)}
//               >
//                 <div className="category-icon">
//                   <BusinessCenterIcon />
//                 </div>
//                 <p>{cat.name}</p>
//               </div>
//             ))}
//           </div>

//           <button
//             className={`category-arrow ${currentPage === totalPages - 1 ? "disabled" : ""}`}
//             onClick={handleNext}
//             disabled={currentPage === totalPages - 1}
//           >
//             ›
//           </button>
//         </div>

//         {totalPages > 1 && (
//           <div className="category-dots mb-5">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <span
//                 key={index}
//                 className={`category-dot ${index === currentPage ? "active" : ""}`}
//                 onClick={() => setCurrentPage(index)}
//               ></span>
//             ))}
//           </div>
//         )}

//         {/* Products Section - Added from AgentBusinessProductsCategories */}
//         <div className="products-section mt-5 pt-4 border-top">
//           <ProductHeader
//             viewMode={productsViewMode}
//             onViewModeChange={setProductsViewMode}
//             search={productsSearch}
//             setSearch={setProductsSearch}
//             selectedPriceRanges={selectedPriceRanges}
//             selectedDiscountRanges={selectedDiscountRanges}
//             onPriceRangeToggle={handlePriceRangeToggle}
//             onDiscountRangeToggle={handleDiscountRangeToggle}
//             onRemovePriceFilter={handleRemovePriceFilter}
//             onRemoveDiscountFilter={handleRemoveDiscountFilter}
//             onClearAllFilters={handleClearAllFilters}
//           />

//           {productsLoading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading products...</p>
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-5">
//               <h5>No products found</h5>
//               <p className="text-muted">Try changing your filters or check back later.</p>
//             </div>
//           ) : (
//             <>
//               <ProductGrid 
//                 products={paginatedProducts} 
//                 viewMode={productsViewMode} 
//                 baseurl={baseurl}
//               />

//               {productsTotalPages > 1 && (
//                 <nav className="mt-5">
//                   <ul className="pagination justify-content-center">
//                     <li className={`page-item ${productsCurrentPage === 1 && "disabled"}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setProductsCurrentPage(p => p - 1)}
//                         disabled={productsCurrentPage === 1}
//                       >
//                         Previous
//                       </button>
//                     </li>

//                     {Array.from({ length: productsTotalPages }).map((_, i) => (
//                       <li
//                         key={i}
//                         className={`page-item ${productsCurrentPage === i + 1 && "active"}`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setProductsCurrentPage(i + 1)}
//                         >
//                           {i + 1}
//                         </button>
//                       </li>
//                     ))}

//                     <li className={`page-item ${productsCurrentPage === productsTotalPages && "disabled"}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setProductsCurrentPage(p => p + 1)}
//                         disabled={productsCurrentPage === productsTotalPages}
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
//     </>
//   );
// };

// export default ClientBusinessProductsCategories;





// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import {
//   Search,
//   X,
//   Eye,
//   Grid3X3,
//   LayoutList,
//   ChevronUp,
//   ChevronDown,
//   Tag,
//   DollarSign,
//   Info
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../Client_Navbar/Client_Navbar";

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
//               <span className="fw-medium">Team {commission.level}:&nbsp;₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= FILTER COMPONENTS ================= */
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

// /* ================= PRODUCT CARD COMPONENT ================= */
// const ProductCard = ({ product, variant, baseurl, commissionData }) => {
//   const navigate = useNavigate();
//   const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);
  
//   // Get distribution commission from variant
//   const getDistributionCommission = () => {
//     return parseFloat(variant.distribution_commission || 0);
//   };

//   const distributionCommission = getDistributionCommission();

//   // Handle mouse enter for commission tooltip
//   const handleMouseEnter = () => {
//     setShowCommissionTooltip(true);
//   };

//   // Handle mouse leave for commission tooltip
//   const handleMouseLeave = () => {
//     setShowCommissionTooltip(false);
//   };

//   const getProductImage = () => {
//     if (variant.media && variant.media.length > 0) {
//       return `${baseurl}${variant.media[0].file}`;
//     }
    
//     if (product.variants && product.variants.length > 0) {
//       const variantWithMedia = product.variants.find(v => v.media && v.media.length > 0);
//       if (variantWithMedia && variantWithMedia.media.length > 0) {
//         return `${baseurl}${variantWithMedia.media[0].file}`;
//       }
//     }
    
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   const calculateDiscount = () => {
//     const mrp = parseFloat(variant.mrp);
//     const sellingPrice = parseFloat(variant.selling_price);
//     if (mrp > 0 && sellingPrice < mrp) {
//       return Math.round(((mrp - sellingPrice) / mrp) * 100);
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
  
//   const getVariantName = () => {
//     if (variant.attributes) {
//       const attrDisplay = Object.values(variant.attributes)
//         .filter(val => typeof val === 'string' || typeof val === 'number')
//         .join(" ");
//       if (attrDisplay.trim()) {
//         return `${product.product_name} - ${attrDisplay}`;
//       }
//     }
//     return product.product_name;
//   };

//   const getVariantDisplay = () => {
//     if (variant.attributes) {
//       return Object.entries(variant.attributes)
//         .map(([key, value]) => `${value}`)
//         .join(" • ");
//     }
//     return "";
//   };
  
//   return (
//     <div className="card h-100" style={{ zIndex: 999 }}>
//       <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
//            onClick={() => navigate(`/client-business-product-details/${product.product_id}?variant=${variant.id}`)}>
//         <img
//           src={getProductImage()}
//           alt={getVariantName()}
//           className="img-fluid"
//           style={{ maxHeight: "100%", objectFit: "contain" }}
//         />
//         {discount > 0 && (
//           <span className="badge bg-danger position-absolute top-0 end-0 m-2">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       <div className="card-body d-flex flex-column">
//         <h6 className="line-clamp-2" style={{ cursor: "pointer" }}
//             onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
//           {getVariantName()}
//         </h6>
//         <small className="text-muted">{product.brand || "No Brand"}</small>
        
//         {getVariantDisplay() && (
//           <small className="text-info mb-2">
//             {getVariantDisplay()}
//           </small>
//         )}

//         <div className="mt-auto">
//           <div className="d-flex align-items-center gap-2">
//             <strong>₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
//             {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(variant.mrp).toFixed(2)}
//               </small>
//             )}
//           </div>

//           {/* View Details and Add to Cart in one row */}
//           {/* <div className="d-grid gap-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
            
//             <button 
//               className="btn text-white" 
//               style={{ background: "#6c757d", fontSize: "14px" }}
//               onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}
//             >
//               <Eye size={14} /> Details
//             </button>

            
//             <button 
//               className="btn text-white" 
//               style={{ background: "#273c75", fontSize: "14px" }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Add to cart:", variant.id, variant.sku);
//               }}
//               disabled={variant.stock <= 0}
//             >
//               {variant.stock > 0 ? "Add to Cart" : "Out of Stock"}
//             </button>
//           </div> */}

//           <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#6c757d", marginBottom: "8px" }}
//             onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}
//           >
//             VIEW DETAILS
//           </button>


//           {/* PAYOUT BUTTON with Commission Tooltip */}
//           {/* <div className="position-relative mt-2">
//             <button 
//               className="btn w-100 text-white d-flex align-items-center justify-content-center gap-2"
//               style={{ background: "#273c75" }}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//               onFocus={handleMouseEnter}
//               onBlur={handleMouseLeave}
//             >
//               <Info size={14} />
//               PAYOUT
//             </button>
            
//             <CommissionTooltip 
//               show={showCommissionTooltip}
//               commissions={commissionData}
//               distributionCommission={distributionCommission}
//             />
//           </div> */}
//         </div>
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
//   selectedPriceRanges,
//   selectedDiscountRanges,
//   onPriceRangeToggle,
//   onDiscountRangeToggle,
//   onRemovePriceFilter,
//   onRemoveDiscountFilter,
//   onClearAllFilters
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
//         <h4 className="fw-bold mb-0">Products</h4>

//         <div className="d-flex align-items-center gap-2 flex-wrap">
//           <div className="input-group input-group-sm" style={{ width: 220 }}>
//             <span className="input-group-text bg-transparent">
//               <Search size={16} />
//             </span>
//             <input
//               className="form-control"
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             {search && (
//               <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
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
// const ProductGrid = ({ products, viewMode, baseurl, commissionData }) => {
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
//             commissionData={commissionData}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN CATEGORIES COMPONENT ================= */
// const ClientBusinessProductsCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const navigate = useNavigate();
//   const categoriesRowRef = useRef(null);

//   // Products states (from AgentBusinessProductsCategories pattern)
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsViewMode, setProductsViewMode] = useState("grid-4");
//   const [productsSearch, setProductsSearch] = useState("");
//   const [productsCurrentPage, setProductsCurrentPage] = useState(1);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);
//   const [commissionData, setCommissionData] = useState([]);
  
//   // Fetch commission data from API
//   const fetchCommissionData = useCallback(async () => {
//     try {
//       const response = await fetch(`${baseurl}/commissions-master/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCommissionData(data.results || []);
//     } catch (err) {
//       console.error("Error fetching commission data:", err);
//       setCommissionData([]);
//     }
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     fetch(`${baseurl}/categories/?level=global`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = data.results
//           .filter(cat => cat.level === "global" && cat.is_active)
//           .sort((a, b) => a.display_order - b.display_order);

//         setCategories(filtered);
//       })
//       .catch(error => {
//         console.error("Error fetching categories:", error);
//       });
    
//     // Fetch commission data
//     fetchCommissionData();
//   }, [fetchCommissionData]);

//   // Fetch products (using the same pattern as AgentBusinessProductsCategories)
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
    
//     const params = new URLSearchParams();
    
//     if (productsSearch.trim()) params.append('search', productsSearch.trim());
    
//     selectedPriceRanges.forEach(range => params.append('price_range', range));
//     selectedDiscountRanges.forEach(range => params.append('discount_range', range));
    
//     try {
//       // const response = await fetch(`${baseurl}/products/?${params.toString()}`);
//       const response = await fetch(`${baseurl}/products/?variant_verification_status=verified&${params.toString()}`);
//       const data = await response.json();
      
//       const allProductItems = [];
//       (data.results || []).forEach(product => {
//         if (product.variants && product.variants.length > 0) {
//           product.variants.forEach(variant => {
//             allProductItems.push({ product, variant });
//           });
//         } else {
//           allProductItems.push({
//             product,
//             variant: {
//               id: product.product_id,
//               sku: product.product_id,
//               mrp: "0.00",
//               selling_price: "0.00",
//               attributes: {},
//               distribution_commission: "0.00"
//             }
//           });
//         }
//       });
      
//       setProducts(allProductItems);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [productsSearch, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Filter handlers
//   const handlePriceRangeToggle = (range) => {
//     setSelectedPriceRanges(prev =>
//       prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
//     );
//     setProductsCurrentPage(1);
//   };

//   const handleDiscountRangeToggle = (range) => {
//     setSelectedDiscountRanges(prev =>
//       prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
//     );
//     setProductsCurrentPage(1);
//   };

//   const handleRemovePriceFilter = (range) => {
//     setSelectedPriceRanges(prev => prev.filter(r => r !== range));
//     setProductsCurrentPage(1);
//   };

//   const handleRemoveDiscountFilter = (range) => {
//     setSelectedDiscountRanges(prev => prev.filter(r => r !== range));
//     setProductsCurrentPage(1);
//   };

//   const handleClearAllFilters = () => {
//     setSelectedPriceRanges([]);
//     setSelectedDiscountRanges([]);
//     setProductsCurrentPage(1);
//   };

//   // Categories pagination
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(categories.length / itemsPerPage);
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentCategories = categories.slice(startIndex, endIndex);

//   // Products pagination
//   const productsItemsPerPage = {
//     "grid-3": 6,
//     "grid-4": 8,
//   }[productsViewMode];

//   const productsTotalPages = Math.ceil(products.length / productsItemsPerPage);
//   const paginatedProducts = products.slice(
//     (productsCurrentPage - 1) * productsItemsPerPage,
//     productsCurrentPage * productsItemsPerPage
//   );

//   useEffect(() => {
//     setProductsCurrentPage(1);
//   }, [productsViewMode, productsSearch]);

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setCurrentPage(prev => prev - 1);
//     }
//   };

//   return (
//     <>
//       <ClientNavbar />
      
//       <div className="container-fluid py-4">
//         {/* Categories Section */}
//         <h2 className="section-title-head mb-4">Categories</h2>
        
//         <div className="categories-wrapper mb-5">
//           <button
//             className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//             onClick={handlePrev}
//             disabled={currentPage === 0}
//           >
//             ‹
//           </button>

//           <div className="categories-row" ref={categoriesRowRef}>
//             {currentCategories.map(cat => (
//               <div
//                 className="category-item"
//                 key={cat.category_id}
//                 onClick={() => navigate(`/client-subcategory/${cat.category_id}`)}
//               >
//                 <div className="category-icon">
//                   <BusinessCenterIcon />
//                 </div>
//                 <p>{cat.name}</p>
//               </div>
//             ))}
//           </div>

//           <button
//             className={`category-arrow ${currentPage === totalPages - 1 ? "disabled" : ""}`}
//             onClick={handleNext}
//             disabled={currentPage === totalPages - 1}
//           >
//             ›
//           </button>
//         </div>

//         {totalPages > 1 && (
//           <div className="category-dots mb-5">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <span
//                 key={index}
//                 className={`category-dot ${index === currentPage ? "active" : ""}`}
//                 onClick={() => setCurrentPage(index)}
//               ></span>
//             ))}
//           </div>
//         )}

//         {/* Products Section - Added from AgentBusinessProductsCategories */}
//         <div className="products-section mt-5 pt-4 border-top">
//           <ProductHeader
//             viewMode={productsViewMode}
//             onViewModeChange={setProductsViewMode}
//             search={productsSearch}
//             setSearch={setProductsSearch}
//             selectedPriceRanges={selectedPriceRanges}
//             selectedDiscountRanges={selectedDiscountRanges}
//             onPriceRangeToggle={handlePriceRangeToggle}
//             onDiscountRangeToggle={handleDiscountRangeToggle}
//             onRemovePriceFilter={handleRemovePriceFilter}
//             onRemoveDiscountFilter={handleRemoveDiscountFilter}
//             onClearAllFilters={handleClearAllFilters}
//           />

//           {productsLoading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading products...</p>
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-5">
//               <h5>No products found</h5>
//               <p className="text-muted">Try changing your filters or check back later.</p>
//             </div>
//           ) : (
//             <>
//               <ProductGrid 
//                 products={paginatedProducts} 
//                 viewMode={productsViewMode} 
//                 baseurl={baseurl}
//                 commissionData={commissionData}
//               />

//               {productsTotalPages > 1 && (
//                 <nav className="mt-5">
//                   <ul className="pagination justify-content-center">
//                     <li className={`page-item ${productsCurrentPage === 1 && "disabled"}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setProductsCurrentPage(p => p - 1)}
//                         disabled={productsCurrentPage === 1}
//                       >
//                         Previous
//                       </button>
//                     </li>

//                     {Array.from({ length: productsTotalPages }).map((_, i) => (
//                       <li
//                         key={i}
//                         className={`page-item ${productsCurrentPage === i + 1 && "active"}`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setProductsCurrentPage(i + 1)}
//                         >
//                           {i + 1}
//                         </button>
//                       </li>
//                     ))}

//                     <li className={`page-item ${productsCurrentPage === productsTotalPages && "disabled"}`}>
//                       <button
//                         className="page-link"
//                         onClick={() => setProductsCurrentPage(p => p + 1)}
//                         disabled={productsCurrentPage === productsTotalPages}
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
//     </>
//   );
// };

// export default ClientBusinessProductsCategories;




import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import {
  Search,
  X,
  Eye,
  Grid3X3,
  LayoutList,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Tag,
  DollarSign,
  Info,
  ArrowLeft,
  Filter
} from "lucide-react";
import { baseurl } from "../../BaseURL/BaseURL";
import ClientNavbar from "../Client_Navbar/Client_Navbar";

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
              <span className="fw-medium">Team {commission.level}:&nbsp;₹{commission.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============= Nested Category Item Component with Checkbox =============
const NestedCategoryItem = ({ 
  category, 
  level = 0,
  selectedCategories,
  onToggle,
  onFilterChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategories.some(c => c.category_id === category.category_id);
  
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(category);
  };

  const handleExpandToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="nested-category-item">
      <div 
        className={`d-flex align-items-center mb-2 ${level > 0 ? 'ms-3' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        {hasChildren && (
          <button
            onClick={handleExpandToggle}
            className="btn btn-link p-0 me-1 text-muted"
            style={{ minWidth: '20px', textDecoration: 'none' }}
            aria-label={isExpanded ? "Collapse category" : "Expand category"}
          >
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
        {!hasChildren && <div style={{ width: '20px' }} />}
        
        <div 
          className="d-flex align-items-center gap-2 flex-grow-1"
          onClick={handleToggle}
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleToggle(e)}
        >
          <input
            type="checkbox"
            className="form-check-input"
            checked={isSelected}
            readOnly
            tabIndex={-1}
            onChange={() => {}}
          />
          <span className={`small ${isSelected ? 'fw-semibold text-dark' : 'text-muted'}`}>
            {category.name}
          </span>
          {/* {category.level && (
            <span className="badge bg-light text-muted ms-2" style={{ fontSize: '0.7rem' }}>
              {category.level}
            </span>
          )} */}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="nested-category-children">
          {category.children.map(child => (
            <NestedCategoryItem
              key={child.category_id}
              category={child}
              level={level + 1}
              selectedCategories={selectedCategories}
              onToggle={onToggle}
              onFilterChange={onFilterChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============= Filter Section Component =============
const FilterSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children,
  filterCount = 0
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
        <div className="d-flex align-items-center gap-2">
          <span className="fw-medium" style={{ whiteSpace: 'nowrap' }}>{title}</span>
          {filterCount > 0 && (
            <span className="badge bg-primary rounded-pill">{filterCount}</span>
          )}
        </div>
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
  categoryTree,
  selectedCategories,
  setSelectedCategories,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedDiscountRanges,
  setSelectedDiscountRanges,
  onFilterChange,
  loading
}) => {
  const [activeFilters, setActiveFilters] = useState({
    categories: true,
    price: false,
    discount: false
  });

  const [categorySearch, setCategorySearch] = useState("");

  const priceRanges = [
    { value: "0-500", label: "Under ₹500" },
    { value: "500-1000", label: "₹500 - ₹1000" },
    { value: "1000-5000", label: "₹1000 - ₹5000" },
    { value: "5000-10000", label: "₹5000 - ₹10000" },
    { value: "10000+", label: "Over ₹10000" },
  ];

  const discountRanges = [
    { value: "0-10", label: "0-10%" },
    { value: "10-20", label: "10-20%" },
    { value: "20-30", label: "20-30%" },
    { value: "30-40", label: "30-40%" },
    { value: "40-50", label: "40-50%" },
    { value: "50-60", label: "50-60%" },
    { value: "60+", label: "60%+" },
  ];

  const toggleFilterSection = (section) => {
    setActiveFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.some(c => c.category_id === category.category_id);
      let newSelection;
      
      if (isSelected) {
        newSelection = prev.filter(c => c.category_id !== category.category_id);
      } else {
        newSelection = [...prev, category];
      }
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedCategories, onFilterChange]);

  const togglePriceRange = useCallback((range) => {
    setSelectedPriceRanges((prev) => {
      const newSelection = prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedPriceRanges, onFilterChange]);

  const toggleDiscountRange = useCallback((range) => {
    setSelectedDiscountRanges((prev) => {
      const newSelection = prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range];
      
      if (onFilterChange) {
        setTimeout(() => onFilterChange(), 0);
      }
      
      return newSelection;
    });
  }, [setSelectedDiscountRanges, onFilterChange]);

  // Filter categories based on search
  const filterCategoryTree = useCallback((cats, searchTerm) => {
    if (!searchTerm.trim()) return cats;
    
    return cats.filter(cat => {
      const matches = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
      if (matches) return true;
      
      if (cat.children && cat.children.length > 0) {
        const filteredChildren = filterCategoryTree(cat.children, searchTerm);
        if (filteredChildren.length > 0) {
          cat.children = filteredChildren;
          return true;
        }
      }
      
      return false;
    });
  }, []);

  const filteredCategoryTree = useMemo(() => {
    if (!categorySearch.trim()) return categoryTree;
    return filterCategoryTree([...categoryTree], categorySearch);
  }, [categoryTree, categorySearch, filterCategoryTree]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedDiscountRanges([]);
    setCategorySearch("");
    
    if (onFilterChange) {
      setTimeout(() => onFilterChange(), 0);
    }
  };

  const activeFilterCount = 
    selectedCategories.length + 
    selectedPriceRanges.length + 
    selectedDiscountRanges.length;

  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-semibold mb-0 d-flex align-items-center gap-2">
          <Filter size={18} />
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

      {/* Categories Filter */}
      <FilterSection
        title="Categories"
        isOpen={activeFilters.categories}
        onToggle={() => toggleFilterSection('categories')}
        filterCount={selectedCategories.length}
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
        <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
          {loading ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading categories...</span>
              </div>
              <p className="small text-muted mt-2">Loading categories...</p>
            </div>
          ) : filteredCategoryTree.length === 0 ? (
            <p className="small text-muted text-center py-3">No categories found</p>
          ) : (
            filteredCategoryTree.map((category) => (
              <NestedCategoryItem
                key={category.category_id}
                category={category}
                selectedCategories={selectedCategories}
                onToggle={toggleCategory}
                onFilterChange={onFilterChange}
              />
            ))
          )}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isOpen={activeFilters.price}
        onToggle={() => toggleFilterSection('price')}
        filterCount={selectedPriceRanges.length}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {priceRanges.map((range) => (
            <div
              key={range.value}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => togglePriceRange(range.value)}
              onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.value)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedPriceRanges.includes(range.value)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedPriceRanges.includes(range.value)}
                  readOnly
                  tabIndex={-1}
                  onChange={() => {}}
                />
                <span className={`small ${selectedPriceRanges.includes(range.value) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {range.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Discount Range Filter */}
      <FilterSection
        title="Discount"
        isOpen={activeFilters.discount}
        onToggle={() => toggleFilterSection('discount')}
        filterCount={selectedDiscountRanges.length}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {discountRanges.map((range) => (
            <div
              key={range.value}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleDiscountRange(range.value)}
              onKeyPress={(e) => e.key === 'Enter' && toggleDiscountRange(range.value)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedDiscountRanges.includes(range.value)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedDiscountRanges.includes(range.value)}
                  readOnly
                  tabIndex={-1}
                  onChange={() => {}}
                />
                <span className={`small ${selectedDiscountRanges.includes(range.value) ? 'fw-semibold text-dark' : 'text-muted'}`}>
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
          <h6 className="fw-semibold mb-2 small">Active Filters:</h6>
          <div className="d-flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <span key={cat.category_id} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
                {cat.name}
                <button 
                  onClick={() => toggleCategory(cat)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove category filter`}
                  style={{ fontSize: '0.5rem' }}
                ></button>
              </span>
            ))}
            {selectedPriceRanges.map(range => {
              const priceRange = priceRanges.find(r => r.value === range);
              return (
                <span key={range} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
                  <DollarSign size={12} className="me-1" />
                  {priceRange?.label || range}
                  <button 
                    onClick={() => togglePriceRange(range)} 
                    className="btn-close btn-close-sm ms-1"
                    aria-label={`Remove price filter`}
                    style={{ fontSize: '0.5rem' }}
                  ></button>
                </span>
              );
            })}
            {selectedDiscountRanges.map(range => {
              const discountRange = discountRanges.find(r => r.value === range);
              return (
                <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
                  <Tag size={12} className="me-1" />
                  {discountRange?.label || range}
                  <button 
                    onClick={() => toggleDiscountRange(range)} 
                    className="btn-close btn-close-sm ms-1"
                    aria-label={`Remove discount filter`}
                    style={{ fontSize: '0.5rem' }}
                  ></button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= PRODUCT CARD COMPONENT ================= */
const ProductCard = ({ product, variant, baseurl, commissionData }) => {
  const navigate = useNavigate();
  const [showCommissionTooltip, setShowCommissionTooltip] = useState(false);
  
  // Get distribution commission from variant
  const getDistributionCommission = () => {
    return parseFloat(variant.distribution_commission || 0);
  };

  const distributionCommission = getDistributionCommission();

  // Handle mouse enter for commission tooltip
  const handleMouseEnter = () => {
    setShowCommissionTooltip(true);
  };

  // Handle mouse leave for commission tooltip
  const handleMouseLeave = () => {
    setShowCommissionTooltip(false);
  };

  const getProductImage = () => {
    if (variant.media && variant.media.length > 0) {
      return `${baseurl}${variant.media[0].file}`;
    }
    
    if (product.variants && product.variants.length > 0) {
      const variantWithMedia = product.variants.find(v => v.media && v.media.length > 0);
      if (variantWithMedia && variantWithMedia.media.length > 0) {
        return `${baseurl}${variantWithMedia.media[0].file}`;
      }
    }
    
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
  };

  const calculateDiscount = () => {
    const mrp = parseFloat(variant.mrp);
    const sellingPrice = parseFloat(variant.selling_price);
    if (mrp > 0 && sellingPrice < mrp) {
      return Math.round(((mrp - sellingPrice) / mrp) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();
  
  const getVariantName = () => {
    if (variant.attributes) {
      const attrDisplay = Object.values(variant.attributes)
        .filter(val => typeof val === 'string' || typeof val === 'number')
        .join(" ");
      if (attrDisplay.trim()) {
        return `${product.product_name} - ${attrDisplay}`;
      }
    }
    return product.product_name;
  };

  const getVariantDisplay = () => {
    if (variant.attributes) {
      return Object.entries(variant.attributes)
        .map(([key, value]) => `${value}`)
        .join(" • ");
    }
    return "";
  };
  
  return (
    <div className="card h-100 border rounded overflow-hidden">
      <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
           onClick={() => navigate(`/client-business-product-details/${product.product_id}?variant=${variant.id}`)}>
        <img
          src={getProductImage()}
          alt={getVariantName()}
          className="img-fluid"
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

      <div className="card-body d-flex flex-column">
        <h6 className="fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem', cursor: "pointer" }}
            onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
          {getVariantName()}
        </h6>
        <small className="text-muted mb-2">{product.brand || "No Brand"}</small>
        
        {getVariantDisplay() && (
          <small className="text-info mb-2">
            {getVariantDisplay()}
          </small>
        )}

        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="h5 fw-bold text-dark">
              ₹{parseFloat(variant.selling_price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
              <small className="text-muted text-decoration-line-through">
                ₹{parseFloat(variant.mrp).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </small>
            )}
          </div>

          <button 
            className="btn w-100 fw-semibold py-2"
            style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
            onClick={() => navigate(`/client-business-product-details/${product.product_id}/?variant=${variant.id}`)}
          >
            VIEW DETAILS
          </button>

          {/* PAYOUT BUTTON with Commission Tooltip */}
          {/* <div className="position-relative mt-2">
            <button 
              className="btn w-100 text-white d-flex align-items-center justify-content-center gap-2"
              style={{ background: "#28a745" }}
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
        </div>
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
  showingProducts
}) => {
  const views = [
    { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
    { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Search is already handled by the filter effect
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      {/* Left side - Products and count */}
      <div className="d-flex align-items-center gap-3 flex-nowrap">
        <h4 className="fw-bold mb-0" style={{ whiteSpace: 'nowrap' }}>Products</h4>
        <p className="mb-0 text-muted small" style={{ whiteSpace: 'nowrap' }}>
          Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
          <span className="fw-semibold text-primary">{totalProducts}</span> products
        </p>
      </div>

      {/* Right side - Search and View modes */}
      <div className="d-flex align-items-center gap-2 flex-nowrap">
        <div className="input-group" style={{ width: '250px' }}>
          <span className="input-group-text bg-transparent border-end-0">
            <Search size={16} className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            aria-label="Search products"
          />
          {search && (
            <button
              onClick={handleClearSearch}
              className="btn btn-outline-secondary border-start-0"
              type="button"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="btn-group" role="group" aria-label="View mode">
          {views.map(({ mode, icon: Icon, label }) => (
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
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================= PRODUCT GRID COMPONENT ================= */
const ProductGrid = ({ products, viewMode, baseurl, commissionData }) => {
  const getGridClasses = () => {
    switch (viewMode) {
      case "grid-3":
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
      case "grid-4":
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
      default:
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
    }
  };

  return (
    <div className={getGridClasses()}>
      {products.map((item) => (
        <div key={`${item.product.product_id}-${item.variant.id}`} className="col mb-4">
          <ProductCard 
            product={item.product} 
            variant={item.variant} 
            baseurl={baseurl}
            commissionData={commissionData}
          />
        </div>
      ))}
    </div>
  );
};

// Function to build category tree
const buildCategoryTree = (categories, parentId = null) => {
  return categories
    .filter(cat => cat.parent === parentId)
    .map(cat => ({
      ...cat,
      children: buildCategoryTree(categories, cat.category_id)
    }));
};

// Function to filter categories to show only business and product levels
const filterBusinessAndProductCategories = (categories) => {
  // Filter to include only business and product level categories
  const businessAndProductCategories = categories.filter(cat => 
    cat.level === "business" || cat.level === "product"
  );
  
  // Get IDs of business and product categories
  const validCategoryIds = new Set(businessAndProductCategories.map(cat => cat.category_id));
  
  // Also include parent categories that are needed for the tree structure
  const categoriesToInclude = new Set(validCategoryIds);
  
  businessAndProductCategories.forEach(cat => {
    let currentParent = cat.parent;
    while (currentParent) {
      const parentCat = categories.find(c => c.category_id === currentParent);
      if (parentCat) {
        categoriesToInclude.add(parentCat.category_id);
        currentParent = parentCat.parent;
      } else {
        break;
      }
    }
  });
  
  // Filter all categories to only include those in our set
  const filteredCategories = categories.filter(cat => 
    categoriesToInclude.has(cat.category_id)
  );
  
  // Build tree starting from top level (parent: null)
  return buildCategoryTree(filteredCategories, null);
};

/* ================= MAIN CATEGORIES COMPONENT ================= */
const ClientBusinessProductsCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const navigate = useNavigate();

  // Products states
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsViewMode, setProductsViewMode] = useState("grid-3");
  const [productsSearch, setProductsSearch] = useState("");
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [commissionData, setCommissionData] = useState([]);

  // Fetch commission data from API
  const fetchCommissionData = useCallback(async () => {
    try {
      const response = await fetch(`${baseurl}/commissions-master/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCommissionData(data.results || []);
    } catch (err) {
      console.error("Error fetching commission data:", err);
      setCommissionData([]);
    }
  }, []);

  // Fetch all categories and build filtered tree
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await fetch(`${baseurl}/categories/`);
        const data = await response.json();
        
        // Filter active categories
        const activeCategories = data.results.filter(cat => cat.is_active);
        setAllCategories(activeCategories);
        
        // Build filtered tree with only business and product level categories
        const filteredTree = filterBusinessAndProductCategories(activeCategories);
        setCategoryTree(filteredTree);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
    fetchCommissionData();
  }, [fetchCommissionData]);

  // Handle filter change - reset to first page
  const handleFilterChange = useCallback(() => {
    setProductsCurrentPage(1);
  }, []);

  // Fetch products based on selected filters
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    
    const params = new URLSearchParams();
    
    if (productsSearch.trim()) params.append('search', productsSearch.trim());
    
    selectedPriceRanges.forEach(range => params.append('price_range', range));
    selectedDiscountRanges.forEach(range => params.append('discount_range', range));
    
    // Add category filters if any are selected
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(cat => {
        params.append('category_id', cat.category_id);
      });
    }
    
    try {
      const response = await fetch(`${baseurl}/products/?variant_verification_status=verified&${params.toString()}`);
      const data = await response.json();
      
      const allProductItems = [];
      (data.results || []).forEach(product => {
        if (product.variants && product.variants.length > 0) {
          product.variants.forEach(variant => {
            allProductItems.push({ product, variant });
          });
        } else {
          allProductItems.push({
            product,
            variant: {
              id: product.product_id,
              sku: product.product_id,
              mrp: "0.00",
              selling_price: "0.00",
              attributes: {},
              distribution_commission: "0.00"
            }
          });
        }
      });
      
      setProducts(allProductItems);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  }, [productsSearch, selectedPriceRanges, selectedDiscountRanges, selectedCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter handlers
  const handlePriceRangeToggle = (range) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
    setProductsCurrentPage(1);
  };

  const handleDiscountRangeToggle = (range) => {
    setSelectedDiscountRanges(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
    setProductsCurrentPage(1);
  };

  const handleRemovePriceFilter = (range) => {
    setSelectedPriceRanges(prev => prev.filter(r => r !== range));
    setProductsCurrentPage(1);
  };

  const handleRemoveDiscountFilter = (range) => {
    setSelectedDiscountRanges(prev => prev.filter(r => r !== range));
    setProductsCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedDiscountRanges([]);
    setSelectedCategories([]);
    setProductsCurrentPage(1);
  };

  // Products pagination
  const pageSize = productsViewMode === "grid-3" ? 9 : 8;

  const productsTotalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = products.slice(
    (productsCurrentPage - 1) * pageSize,
    productsCurrentPage * pageSize
  );

  useEffect(() => {
    setProductsCurrentPage(1);
  }, [productsViewMode, productsSearch, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  // Render pagination
  const renderPagination = () => {
    if (productsTotalPages <= 1) return null;

    return (
      <nav aria-label="Products pagination" className="mt-5">
        <ul className="pagination justify-content-center flex-wrap">
          <li className={`page-item ${productsCurrentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => setProductsCurrentPage(p => p - 1)}
              disabled={productsCurrentPage === 1}
              aria-label="Go to previous page"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          
          {Array.from({ length: Math.min(5, productsTotalPages) }, (_, i) => {
            let pageNum;
            if (productsTotalPages <= 5) {
              pageNum = i + 1;
            } else if (productsCurrentPage <= 3) {
              pageNum = i + 1;
            } else if (productsCurrentPage >= productsTotalPages - 2) {
              pageNum = productsTotalPages - 4 + i;
            } else {
              pageNum = productsCurrentPage - 2 + i;
            }
            
            return (
              <li key={pageNum} className={`page-item ${productsCurrentPage === pageNum ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setProductsCurrentPage(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={productsCurrentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}
          
          <li className={`page-item ${productsCurrentPage === productsTotalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => setProductsCurrentPage(p => p + 1)}
              disabled={productsCurrentPage === productsTotalPages}
              aria-label="Go to next page"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
        
        <div className="text-center text-muted small mt-2">
          Page {productsCurrentPage} of {productsTotalPages} • {products.length} total products
        </div>
      </nav>
    );
  };

  return (
    <>
      <ClientNavbar />
      
      <div className="container py-4">
        {/* Back Button */}
        <div className="d-flex align-items-center mb-3">
          <button
            className="btn btn-link text-decoration-none p-0 d-flex align-items-center gap-2"
            onClick={() => navigate(-1)}
            style={{ color: '#273c75' }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        <h2 className="fw-bold mb-4">Categories</h2>

        <div className="row">
          {/* Filter Sidebar - Left Column */}
          <aside className="col-lg-3 mb-4 mb-lg-0">
            <div className="sticky-top" style={{ top: '20px' }}>
              <FilterSidebar
                categoryTree={categoryTree}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPriceRanges={selectedPriceRanges}
                setSelectedPriceRanges={setSelectedPriceRanges}
                selectedDiscountRanges={selectedDiscountRanges}
                setSelectedDiscountRanges={setSelectedDiscountRanges}
                onFilterChange={handleFilterChange}
                loading={categoriesLoading}
              />
            </div>
          </aside>

          {/* Products Grid - Right Column */}
          <div className="col-lg-9 col-12">
            <ProductHeader
              viewMode={productsViewMode}
              onViewModeChange={setProductsViewMode}
              search={productsSearch}
              setSearch={setProductsSearch}
              totalProducts={products.length}
              showingProducts={paginatedProducts.length}
            />

            {productsLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-5">
                <h5>No products found</h5>
                <p className="text-muted">Try adjusting your filters or select different categories.</p>
              </div>
            ) : (
              <>
                <ProductGrid 
                  products={paginatedProducts} 
                  viewMode={productsViewMode} 
                  baseurl={baseurl}
                  commissionData={commissionData}
                />
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientBusinessProductsCategories;