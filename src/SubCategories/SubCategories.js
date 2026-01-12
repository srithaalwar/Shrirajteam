// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import "./SubCategories.css";
// import { baseurl } from "../BaseURL/BaseURL";

// const SubCategories = () => {
//   const { id } = useParams();
//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${baseurl}/categories/${id}/`)
    
//       .then(res => res.json())
//       .then(data => {
//         setSubCategories(data.children || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="webhome-container">
//         <h2 className="section-title">Sub Categories</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : subCategories.length === 0 ? (
//           <p>No subcategories available</p>
//         ) : (
//           <div className="categories-row">
//             {subCategories.map((sub, index) => (
//               <div className="category-item" key={index}>
//                 <div className="category-icon">
//                   <BusinessCenterIcon />
//                 </div>
//                 <p>{sub.name}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SubCategories;



// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import "./SubCategories.css";
// import { baseurl } from "../BaseURL/BaseURL";

// const SubCategories = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);

//   const categoriesRowRef = useRef(null);

//   useEffect(() => {
//     setLoading(true);
//     fetch(`${baseurl}/categories/${id}/`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = (data.children || []).filter(sc => sc.is_active);
//         setSubCategories(filtered);
//         setCurrentPage(0);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

  

//   /* ===== Pagination (same as Categories) ===== */
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(subCategories.length / itemsPerPage);

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSubCategories = subCategories.slice(startIndex, endIndex);

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
//       <WebsiteNavbar />

//       <div className="webhome-container">
//         {/* 🔙 BACK BUTTON */}
//         <button
//           className="back-btn"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIosNewIcon />
//           <span>Back</span>
//         </button>

//         <h2 className="section-title">Sub Categories</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : subCategories.length === 0 ? (
//           <p>No subcategories available</p>
//         ) : (
//           <div className="categories-wrapper">
//             {/* LEFT ARROW */}
//             <button
//               className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//               onClick={handlePrev}
//               disabled={currentPage === 0}
//             >
//               ‹
//             </button>

//             {/* SUB CATEGORY GRID */}
//             <div className="categories-row" ref={categoriesRowRef}>
//               {currentSubCategories.map(sub => (
//                 <div
//                   className="category-item"
//                   key={sub.category_id}
//                   onClick={() => navigate(`/w-subcategory/${sub.category_id}`)}
//                 >
//                   <div className="category-icon">
//                     <BusinessCenterIcon />
//                   </div>
//                   <p>{sub.name}</p>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT ARROW */}
//             <button
//               className={`category-arrow ${
//                 currentPage === totalPages - 1 ? "disabled" : ""
//               }`}
//               onClick={handleNext}
//               disabled={currentPage === totalPages - 1}
//             >
//               ›
//             </button>
//           </div>
//         )}

//         <div>

//           <h1>help</h1>
//         </div>

//         {/* DOTS */}
//         {totalPages > 1 && (
//           <div className="category-dots">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <span
//                 key={index}
//                 className={`category-dot ${
//                   index === currentPage ? "active" : ""
//                 }`}
//                 onClick={() => setCurrentPage(index)}
//               ></span>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SubCategories;





// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import "./SubCategories.css";
// import { baseurl } from "../BaseURL/BaseURL";

// const SubCategories = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [subCategories, setSubCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);

//   const categoriesRowRef = useRef(null);

//   // Fetch subcategories
//   useEffect(() => {
//     setLoading(true);
//     fetch(`${baseurl}/categories/${id}/`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = (data.children || []).filter(sc => sc.is_active);
//         setSubCategories(filtered);
//         setCurrentPage(0);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   // Fetch products for the category
//   useEffect(() => {
//     setProductsLoading(true);
//     fetch(`${baseurl}/products/?category_id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Products data:", data);
//         setProducts(data.results || []);
//         setProductsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setProductsLoading(false);
//       });
//   }, [id]);

//   /* ===== Pagination (same as Categories) ===== */
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(subCategories.length / itemsPerPage);

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSubCategories = subCategories.slice(startIndex, endIndex);

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
//       <WebsiteNavbar />

//       <div className="webhome-container">
//         {/* 🔙 BACK BUTTON */}
//         <button
//           className="back-btn"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIosNewIcon />
//           <span>Back</span>
//         </button>

//         <h2 className="section-title">Sub Categories</h2>

//         {loading ? (
//           <p>Loading...</p>
//         ) : subCategories.length === 0 ? (
//           <p>No subcategories available</p>
//         ) : (
//           <div className="categories-wrapper">
//             {/* LEFT ARROW */}
//             <button
//               className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//               onClick={handlePrev}
//               disabled={currentPage === 0}
//             >
//               ‹
//             </button>

//             {/* SUB CATEGORY GRID */}
//             <div className="categories-row" ref={categoriesRowRef}>
//               {currentSubCategories.map(sub => (
//                 <div
//                   className="category-item"
//                   key={sub.category_id}
//                   onClick={() => navigate(`/w-subcategory/${sub.category_id}`)}
//                 >
//                   <div className="category-icon">
//                     <BusinessCenterIcon />
//                   </div>
//                   <p>{sub.name}</p>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT ARROW */}
//             <button
//               className={`category-arrow ${
//                 currentPage === totalPages - 1 ? "disabled" : ""
//               }`}
//               onClick={handleNext}
//               disabled={currentPage === totalPages - 1}
//             >
//               ›
//             </button>
//           </div>
//         )}

//         {/* DOTS */}
//         {totalPages > 1 && (
//           <div className="category-dots">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <span
//                 key={index}
//                 className={`category-dot ${
//                   index === currentPage ? "active" : ""
//                 }`}
//                 onClick={() => setCurrentPage(index)}
//               ></span>
//             ))}
//           </div>
//         )}

//         {/* PRODUCTS SECTION */}
//         <div className="products-section">
//           <h2 className="section-title">Products in this Category</h2>
          
//           {productsLoading ? (
//             <p>Loading products...</p>
//           ) : products.length === 0 ? (
//             <p>No products available in this category</p>
//           ) : (
//             <div className="products-grid">
//               {products.map(product => (
//                 <div key={product.product_id} className="product-card">
//                   {/* Product Image */}
//                   {product.media && product.media.length > 0 ? (
//                     <div className="product-image">
//                       <img 
//                         src={`${baseurl}${product.media[0].file}`} 
//                         alt={product.product_name}
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/200x150?text=No+Image";
//                         }}
//                       />
//                     </div>
//                   ) : (
//                     <div className="product-image placeholder">
//                       <div>No Image</div>
//                     </div>
//                   )}
                  
//                   {/* Product Details */}
//                   <div className="product-details">
//                     <h3 className="product-name">{product.product_name}</h3>
//                     <p className="product-brand">Brand: {product.brand}</p>
//                     <p className="product-description">
//                       {product.description && product.description.length > 100 
//                         ? `${product.description.substring(0, 100)}...` 
//                         : product.description}
//                     </p>
                    
//                     {/* Price from the first variant */}
//                     {product.variants && product.variants.length > 0 && (
//                       <div className="product-price">
//                         <span className="selling-price">
//                           ₹{parseFloat(product.variants[0].selling_price).toFixed(2)}
//                         </span>
//                         <span className="mrp">
//                           <del>₹{parseFloat(product.variants[0].mrp).toFixed(2)}</del>
//                         </span>
//                         <span className="discount">
//                           {((parseFloat(product.variants[0].mrp) - parseFloat(product.variants[0].selling_price)) / parseFloat(product.variants[0].mrp) * 100).toFixed(0)}% off
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* Variants */}
//                     {product.has_variants && product.variants && product.variants.length > 0 && (
//                       <div className="product-variants">
//                         <p className="variants-title">Variants:</p>
//                         <div className="variant-chips">
//                           {product.variants.slice(0, 3).map(variant => (
//                             <span key={variant.id} className="variant-chip">
//                               {variant.attributes && variant.attributes.color 
//                                 ? variant.attributes.color 
//                                 : variant.attributes && variant.attributes.shape 
//                                 ? variant.attributes.shape 
//                                 : variant.sku}
//                             </span>
//                           ))}
//                           {product.variants.length > 3 && (
//                             <span className="variant-chip">+{product.variants.length - 3} more</span>
//                           )}
//                         </div>
//                       </div>
//                     )}
                    
//                     {/* Stock Status */}
//                     {product.variants && product.variants.length > 0 && (
//                       <div className="stock-status">
//                         {product.variants[0].stock > 0 ? (
//                           <span className="in-stock">In Stock ({product.variants[0].stock} units)</span>
//                         ) : (
//                           <span className="out-of-stock">Out of Stock</span>
//                         )}
//                       </div>
//                     )}
                    
//                     {/* View Details Button */}
//                     <button 
//                       className="view-details-btn"
//                       onClick={() => navigate(`/product/${product.product_id}`)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SubCategories;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import {
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   LayoutList,
// } from "lucide-react";
// import "./SubCategories.css";
// import { baseurl } from "../BaseURL/BaseURL";

// /* ================= PRODUCT CARD COMPONENT ================= */
// const ProductCard = ({ product, baseurl }) => {
//   const navigate = useNavigate();
  
//   // Get primary image or first available image
//   const getProductImage = () => {
//     if (product.media && product.media.length > 0) {
//       const primaryImage = product.media.find(m => m.is_primary) || product.media[0];
//       return `${baseurl}${primaryImage.file}`;
//     }
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   // Calculate discount percentage
//   const calculateDiscount = () => {
//     if (product.variants && product.variants.length > 0) {
//       const variant = product.variants[0];
//       const mrp = parseFloat(variant.mrp);
//       const sellingPrice = parseFloat(variant.selling_price);
//       return Math.round(((mrp - sellingPrice) / mrp) * 100);
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
  
//   return (
//     <div className="card h-100" onClick={() => navigate(`/product/${product.product_id}`)}>
//       <div className="bg-light p-3 text-center position-relative" style={{ height: 200 }}>
//         <img
//           src={getProductImage()}
//           alt={product.product_name}
//           className="img-fluid"
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

//       <div className="card-body d-flex flex-column">
//         <h6 className="line-clamp-2">{product.product_name}</h6>
//         <small className="text-muted">{product.brand || "No Brand"}</small>

//         <div className="mt-auto">
//           {product.variants && product.variants.length > 0 ? (
//             <div className="d-flex align-items-center gap-2">
//               <strong>₹{parseFloat(product.variants[0].selling_price).toFixed(2)}</strong>
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(product.variants[0].mrp).toFixed(2)}
//               </small>
//             </div>
//           ) : (
//             <div className="d-flex align-items-center gap-2">
//               <strong>₹0.00</strong>
//               <small className="text-muted text-decoration-line-through">
//                 ₹0.00
//               </small>
//             </div>
//           )}

//           <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#273c75" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               // Add to cart logic here
//             }}
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT HEADER COMPONENT ================= */
// const ProductHeader = ({ viewMode, onViewModeChange, search, setSearch }) => {
//   const views = [
//     { mode: "grid-2", icon: Grid2X2 },
//     { mode: "grid-3", icon: Grid3X3 },
//     { mode: "grid-4", icon: LayoutList },
//   ];

//   return (
//     <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//       <h4 className="fw-bold mb-0">Products</h4>

//       <div className="d-flex align-items-center gap-2">
//         <div className="input-group input-group-sm" style={{ width: 220 }}>
//           <span className="input-group-text bg-transparent">
//             <Search size={16} />
//           </span>
//           <input
//             className="form-control"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {search && (
//             <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
//               <X size={14} />
//             </button>
//           )}
//         </div>

//         <div className="btn-group">
//           {views.map(({ mode, icon: Icon }) => (
//             <button
//               key={mode}
//               className={`btn btn-outline-secondary ${viewMode === mode ? "active" : ""}`}
//               onClick={() => onViewModeChange(mode)}
//             >
//               <Icon size={16} />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT GRID COMPONENT ================= */
// const ProductGrid = ({ products, viewMode, baseurl }) => {
//   const gridClass = {
//     "grid-2": "row row-cols-1 row-cols-sm-2",
//     "grid-3": "row row-cols-1 row-cols-sm-2 row-cols-md-3",
//     "grid-4": "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4",
//   }[viewMode];

//   return (
//     <div className={gridClass}>
//       {products.map((p) => (
//         <div key={p.product_id} className="col mb-4">
//           <ProductCard product={p} baseurl={baseurl} />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN SUBCATEGORIES COMPONENT ================= */
// const SubCategories = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [subCategories, setSubCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
  
//   // Products grid states
//   const [productsViewMode, setProductsViewMode] = useState("grid-4");
//   const [productsSearch, setProductsSearch] = useState("");
//   const [productsCurrentPage, setProductsCurrentPage] = useState(1);

//   // Fetch subcategories
//   useEffect(() => {
//     setLoading(true);
//     fetch(`${baseurl}/categories/${id}/`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = (data.children || []).filter(sc => sc.is_active);
//         setSubCategories(filtered);
//         setCurrentPage(0);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   // Fetch products for the category
//   useEffect(() => {
//     setProductsLoading(true);
//     fetch(`${baseurl}/products/?category_id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Products data:", data);
//         setProducts(data.results || []);
//         setProductsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setProductsLoading(false);
//       });
//   }, [id]);

//   /* ===== Subcategories Pagination ===== */
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(subCategories.length / itemsPerPage);

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSubCategories = subCategories.slice(startIndex, endIndex);

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

//   /* ===== Products Pagination ===== */
//   const productsItemsPerPage = {
//     "grid-2": 4,
//     "grid-3": 6,
//     "grid-4": 8,
//   }[productsViewMode];

//   const filteredProducts = products.filter((p) =>
//     p.product_name.toLowerCase().includes(productsSearch.toLowerCase()) ||
//     (p.brand && p.brand.toLowerCase().includes(productsSearch.toLowerCase()))
//   );

//   const productsTotalPages = Math.ceil(filteredProducts.length / productsItemsPerPage);

//   const paginatedProducts = filteredProducts.slice(
//     (productsCurrentPage - 1) * productsItemsPerPage,
//     productsCurrentPage * productsItemsPerPage
//   );

//   // Reset products page on view/search change
//   useEffect(() => {
//     setProductsCurrentPage(1);
//   }, [productsViewMode, productsSearch]);

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="webhome-container">
//         {/* 🔙 BACK BUTTON */}
//         <button
//           className="back-btn"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIosNewIcon />
//           <span>Back</span>
//         </button>

//         <h2 className="section-title-head">Sub Categories</h2>

//         {loading ? (
//           <p>Loading subcategories...</p>
//         ) : subCategories.length === 0 ? (
//           <p></p>
//         ) : (
//           <div className="categories-wrapper">
//             {/* LEFT ARROW */}
//             <button
//               className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//               onClick={handlePrev}
//               disabled={currentPage === 0}
//             >
//               ‹
//             </button>

//             {/* SUB CATEGORY GRID */}
//             <div className="categories-row">
//               {currentSubCategories.map(sub => (
//                 <div
//                   className="category-item"
//                   key={sub.category_id}
//                   onClick={() => navigate(`/w-subcategory/${sub.category_id}`)}
//                 >
//                   <div className="category-icon">
//                     <BusinessCenterIcon />
//                   </div>
//                   <p>{sub.name}</p>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT ARROW */}
//             <button
//               className={`category-arrow ${
//                 currentPage === totalPages - 1 ? "disabled" : ""
//               }`}
//               onClick={handleNext}
//               disabled={currentPage === totalPages - 1}
//             >
//               ›
//             </button>
//           </div>
//         )}

//         {/* SUBCATEGORIES DOTS */}
//         {totalPages > 1 && (
//           <div className="category-dots">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <span
//                 key={index}
//                 className={`category-dot ${
//                   index === currentPage ? "active" : ""
//                 }`}
//                 onClick={() => setCurrentPage(index)}
//               ></span>
//             ))}
//           </div>
//         )}

//         {/* PRODUCTS SECTION */}
//         <div className="products-section mt-5 pt-4 border-top">
//           <ProductHeader
//             viewMode={productsViewMode}
//             onViewModeChange={setProductsViewMode}
//             search={productsSearch}
//             setSearch={setProductsSearch}
//           />

//           {productsLoading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading products...</p>
//             </div>
//           ) : filteredProducts.length === 0 ? (
//             <div className="text-center py-5">
//               <h5>No products found</h5>
//               <p className="text-muted">Try changing your search or check back later.</p>
//             </div>
//           ) : (
//             <>
//               <ProductGrid 
//                 products={paginatedProducts} 
//                 viewMode={productsViewMode} 
//                 baseurl={baseurl}
//               />

//               {/* PRODUCTS PAGINATION */}
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

// export default SubCategories;




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import {
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   LayoutList,
// } from "lucide-react";
// import "./SubCategories.css";
// import { baseurl } from "../BaseURL/BaseURL";

// /* ================= PRODUCT CARD COMPONENT ================= */
// const ProductCard = ({ product, baseurl }) => {
//   const navigate = useNavigate();
  
//   // Get primary image or first available image
//   const getProductImage = () => {
//     if (product.media && product.media.length > 0) {
//       const primaryImage = product.media.find(m => m.is_primary) || product.media[0];
//       return `${baseurl}${primaryImage.file}`;
//     }
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   // Calculate discount percentage
//   const calculateDiscount = () => {
//     if (product.variants && product.variants.length > 0) {
//       const variant = product.variants[0];
//       const mrp = parseFloat(variant.mrp);
//       const sellingPrice = parseFloat(variant.selling_price);
//       return Math.round(((mrp - sellingPrice) / mrp) * 100);
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
  
//   return (
//     <div className="card h-100">
//       <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
//            onClick={() => navigate(`/product/${product.product_id}`)}>
//         <img
//           src={getProductImage()}
//           alt={product.product_name}
//           className="img-fluid"
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

//       <div className="card-body d-flex flex-column">
//         <h6 className="line-clamp-2" style={{ cursor: "pointer" }}
//             onClick={() => navigate(`/product/${product.product_id}`)}>
//           {product.product_name}
//         </h6>
//         <small className="text-muted">{product.brand || "No Brand"}</small>

//         <div className="mt-auto">
//           {product.variants && product.variants.length > 0 ? (
//             <div className="d-flex align-items-center gap-2">
//               <strong>₹{parseFloat(product.variants[0].selling_price).toFixed(2)}</strong>
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(product.variants[0].mrp).toFixed(2)}
//               </small>
//             </div>
//           ) : (
//             <div className="d-flex align-items-center gap-2">
//               <strong>₹0.00</strong>
//               <small className="text-muted text-decoration-line-through">
//                 ₹0.00
//               </small>
//             </div>
//           )}

//           {/* VIEW DETAILS BUTTON */}
//           <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#6c757d", marginBottom: "8px" }}
//             onClick={() => navigate(`/product/${product.product_id}`)}
//           >
//             VIEW DETAILS
//           </button>

//           {/* ADD TO CART BUTTON */}
//           <button 
//             className="btn w-100 mt-2 text-white" 
//             style={{ background: "#273c75" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               // Add to cart logic here
//             }}
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT HEADER COMPONENT ================= */
// const ProductHeader = ({ viewMode, onViewModeChange, search, setSearch }) => {
//   const views = [
//     { mode: "grid-2", icon: Grid2X2 },
//     { mode: "grid-3", icon: Grid3X3 },
//     { mode: "grid-4", icon: LayoutList },
//   ];

//   return (
//     <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//       <h4 className="fw-bold mb-0">Products</h4>

//       <div className="d-flex align-items-center gap-2">
//         <div className="input-group input-group-sm" style={{ width: 220 }}>
//           <span className="input-group-text bg-transparent">
//             <Search size={16} />
//           </span>
//           <input
//             className="form-control"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {search && (
//             <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
//               <X size={14} />
//             </button>
//           )}
//         </div>

//         <div className="btn-group">
//           {views.map(({ mode, icon: Icon }) => (
//             <button
//               key={mode}
//               className={`btn btn-outline-secondary ${viewMode === mode ? "active" : ""}`}
//               onClick={() => onViewModeChange(mode)}
//             >
//               <Icon size={16} />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT GRID COMPONENT ================= */
// const ProductGrid = ({ products, viewMode, baseurl }) => {
//   const gridClass = {
//     "grid-2": "row row-cols-1 row-cols-sm-2",
//     "grid-3": "row row-cols-1 row-cols-sm-2 row-cols-md-3",
//     "grid-4": "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4",
//   }[viewMode];

//   return (
//     <div className={gridClass}>
//       {products.map((p) => (
//         <div key={p.product_id} className="col mb-4">
//           <ProductCard product={p} baseurl={baseurl} />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN SUBCATEGORIES COMPONENT ================= */
// const SubCategories = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [subCategories, setSubCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
  
//   // Products grid states
//   const [productsViewMode, setProductsViewMode] = useState("grid-4");
//   const [productsSearch, setProductsSearch] = useState("");
//   const [productsCurrentPage, setProductsCurrentPage] = useState(1);

//   // Fetch subcategories
//   useEffect(() => {
//     setLoading(true);
//     fetch(`${baseurl}/categories/${id}/`)
//       .then(res => res.json())
//       .then(data => {
//         const filtered = (data.children || []).filter(sc => sc.is_active);
//         setSubCategories(filtered);
//         setCurrentPage(0);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   // Fetch products for the category
//   useEffect(() => {
//     setProductsLoading(true);
//     fetch(`${baseurl}/products/?category_id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("Products data:", data);
//         setProducts(data.results || []);
//         setProductsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//         setProductsLoading(false);
//       });
//   }, [id]);

//   /* ===== Subcategories Pagination ===== */
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(subCategories.length / itemsPerPage);

//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSubCategories = subCategories.slice(startIndex, endIndex);

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

//   /* ===== Products Pagination ===== */
//   const productsItemsPerPage = {
//     "grid-2": 4,
//     "grid-3": 6,
//     "grid-4": 8,
//   }[productsViewMode];

//   const filteredProducts = products.filter((p) =>
//     p.product_name.toLowerCase().includes(productsSearch.toLowerCase()) ||
//     (p.brand && p.brand.toLowerCase().includes(productsSearch.toLowerCase()))
//   );

//   const productsTotalPages = Math.ceil(filteredProducts.length / productsItemsPerPage);

//   const paginatedProducts = filteredProducts.slice(
//     (productsCurrentPage - 1) * productsItemsPerPage,
//     productsCurrentPage * productsItemsPerPage
//   );

//   // Reset products page on view/search change
//   useEffect(() => {
//     setProductsCurrentPage(1);
//   }, [productsViewMode, productsSearch]);

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="webhome-container">
//         {/* 🔙 BACK BUTTON */}
//         <button
//           className="back-btn"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowBackIosNewIcon />
//           <span>Back</span>
//         </button>

//         <h2 className="section-title-head">Sub Categories</h2>

//         {loading ? (
//           <p>Loading subcategories...</p>
//         ) : subCategories.length === 0 ? (
//           <p></p>
//         ) : (
//           <div className="categories-wrapper">
//             {/* LEFT ARROW */}
//             <button
//               className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
//               onClick={handlePrev}
//               disabled={currentPage === 0}
//             >
//               ‹
//             </button>

//             {/* SUB CATEGORY GRID */}
//             <div className="categories-row">
//               {currentSubCategories.map(sub => (
//                 <div
//                   className="category-item"
//                   key={sub.category_id}
//                   onClick={() => navigate(`/w-subcategory/${sub.category_id}`)}
//                 >
//                   <div className="category-icon">
//                     <BusinessCenterIcon />
//                   </div>
//                   <p>{sub.name}</p>
//                 </div>
//               ))}
//             </div>

//             {/* RIGHT ARROW */}
//             <button
//               className={`category-arrow ${
//                 currentPage === totalPages - 1 ? "disabled" : ""
//               }`}
//               onClick={handleNext}
//               disabled={currentPage === totalPages - 1}
//             >
//               ›
//             </button>
//           </div>
//         )}

//         {/* SUBCATEGORIES DOTS */}
//         {totalPages > 1 && (
//           <div className="category-dots">
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <span
//                 key={index}
//                 className={`category-dot ${
//                   index === currentPage ? "active" : ""
//                 }`}
//                 onClick={() => setCurrentPage(index)}
//               ></span>
//             ))}
//           </div>
//         )}

//         {/* PRODUCTS SECTION */}
//         <div className="products-section mt-5 pt-4 border-top">
//           <ProductHeader
//             viewMode={productsViewMode}
//             onViewModeChange={setProductsViewMode}
//             search={productsSearch}
//             setSearch={setProductsSearch}
//           />

//           {productsLoading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading products...</p>
//             </div>
//           ) : filteredProducts.length === 0 ? (
//             <div className="text-center py-5">
//               <h5>No products found</h5>
//               <p className="text-muted">Try changing your search or check back later.</p>
//             </div>
//           ) : (
//             <>
//               <ProductGrid 
//                 products={paginatedProducts} 
//                 viewMode={productsViewMode} 
//                 baseurl={baseurl}
//               />

//               {/* PRODUCTS PAGINATION */}
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

// export default SubCategories;




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Search,
  X,
  Grid2X2,
  Grid3X3,
  LayoutList,
} from "lucide-react";
import "./SubCategories.css";
import { baseurl } from "../BaseURL/BaseURL";

/* ================= PRODUCT CARD COMPONENT ================= */
const ProductCard = ({ product, variant, baseurl }) => {
  const navigate = useNavigate();
  
  // Get image for specific variant
  const getProductImage = () => {
    if (product.media && product.media.length > 0) {
      // Find media for this specific variant
      const variantMedia = product.media.find(m => m.variant === variant.id);
      if (variantMedia) {
        return `${baseurl}${variantMedia.file}`;
      }
      
      // If no variant-specific media, use primary or first available
      const primaryImage = product.media.find(m => m.is_primary) || product.media[0];
      return `${baseurl}${primaryImage.file}`;
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
    }
    return product.product_name;
  };
  
  return (
    <div className="card h-100">
      <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
           onClick={() => navigate(`/product/${product.product_id}?variant=${variant.id}`)}>
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
        <h6 className="line-clamp-2" style={{ cursor: "pointer" }}
            onClick={() => navigate(`/product/${product.product_id}?variant=${variant.id}`)}>
          {getVariantName()}
        </h6>
        <small className="text-muted">{product.brand || "No Brand"}</small>
        
        {/* Variant attributes */}
        {variant.attributes && variant.attributes.display && (
          <small className="text-info mb-2">
            Size: {variant.attributes.display}
          </small>
        )}

        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2">
            <strong>₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
            {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
              <small className="text-muted text-decoration-line-through">
                ₹{parseFloat(variant.mrp).toFixed(2)}
              </small>
            )}
          </div>

          {/* VIEW DETAILS BUTTON */}
          <button 
            className="btn w-100 mt-2 text-white" 
            style={{ background: "#6c757d", marginBottom: "8px" }}
            onClick={() => navigate(`/product/${product.product_id}?variant=${variant.id}`)}
          >
            VIEW DETAILS
          </button>

          {/* ADD TO CART BUTTON */}
          <button 
            className="btn w-100 mt-2 text-white" 
            style={{ background: "#273c75" }}
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here with variant.id
              console.log("Add to cart:", variant.id);
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= PRODUCT HEADER COMPONENT ================= */
const ProductHeader = ({ viewMode, onViewModeChange, search, setSearch }) => {
  const views = [
    { mode: "grid-2", icon: Grid2X2 },
    { mode: "grid-3", icon: Grid3X3 },
    { mode: "grid-4", icon: LayoutList },
  ];

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <h4 className="fw-bold mb-0">Products</h4>

      <div className="d-flex align-items-center gap-2">
        <div className="input-group input-group-sm" style={{ width: 220 }}>
          <span className="input-group-text bg-transparent">
            <Search size={16} />
          </span>
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="btn-group">
          {views.map(({ mode, icon: Icon }) => (
            <button
              key={mode}
              className={`btn btn-outline-secondary ${viewMode === mode ? "active" : ""}`}
              onClick={() => onViewModeChange(mode)}
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
const ProductGrid = ({ products, viewMode, baseurl }) => {
  const gridClass = {
    "grid-2": "row row-cols-1 row-cols-sm-2",
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
          />
        </div>
      ))}
    </div>
  );
};

/* ================= MAIN SUBCATEGORIES COMPONENT ================= */
const SubCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Products grid states
  const [productsViewMode, setProductsViewMode] = useState("grid-4");
  const [productsSearch, setProductsSearch] = useState("");
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);

  // Fetch subcategories
  useEffect(() => {
    setLoading(true);
    fetch(`${baseurl}/categories/${id}/`)
      .then(res => res.json())
      .then(data => {
        const filtered = (data.children || []).filter(sc => sc.is_active);
        setSubCategories(filtered);
        setCurrentPage(0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Fetch products for the category
  useEffect(() => {
    setProductsLoading(true);
    fetch(`${baseurl}/products/?category_id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Products data:", data);
        
        // Transform products to include each variant as a separate item
        const allProductItems = [];
        (data.results || []).forEach(product => {
          if (product.variants && product.variants.length > 0) {
            // Add each variant as a separate product item
            product.variants.forEach(variant => {
              allProductItems.push({
                product: product,
                variant: variant
              });
            });
          } else {
            // If no variants, add the product as is
            allProductItems.push({
              product: product,
              variant: {
                id: product.product_id,
                sku: product.product_id,
                mrp: "0.00",
                selling_price: "0.00",
                attributes: {}
              }
            });
          }
        });
        
        setProducts(allProductItems);
        setProductsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProductsLoading(false);
      });
  }, [id]);

  /* ===== Subcategories Pagination ===== */
  const itemsPerPage = 9;
  const totalPages = Math.ceil(subCategories.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubCategories = subCategories.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  /* ===== Products Pagination ===== */
  const productsItemsPerPage = {
    "grid-2": 4,
    "grid-3": 6,
    "grid-4": 8,
  }[productsViewMode];

  // Filter products based on search
  const filteredProducts = products.filter((item) => {
    const searchTerm = productsSearch.toLowerCase();
    return (
      item.product.product_name.toLowerCase().includes(searchTerm) ||
      (item.product.brand && item.product.brand.toLowerCase().includes(searchTerm)) ||
      item.variant.sku.toLowerCase().includes(searchTerm)
    );
  });

  const productsTotalPages = Math.ceil(filteredProducts.length / productsItemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (productsCurrentPage - 1) * productsItemsPerPage,
    productsCurrentPage * productsItemsPerPage
  );

  // Reset products page on view/search change
  useEffect(() => {
    setProductsCurrentPage(1);
  }, [productsViewMode, productsSearch]);

  return (
    <>
      <WebsiteNavbar />

      <div className="webhome-container">
        {/* 🔙 BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
          <span>Back</span>
        </button>

        <h2 className="section-title-head">Sub Categories</h2>

        {loading ? (
          <p>Loading subcategories...</p>
        ) : subCategories.length === 0 ? (
          <p></p>
        ) : (
          <div className="categories-wrapper">
            {/* LEFT ARROW */}
            <button
              className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
              onClick={handlePrev}
              disabled={currentPage === 0}
            >
              ‹
            </button>

            {/* SUB CATEGORY GRID */}
            <div className="categories-row">
              {currentSubCategories.map(sub => (
                <div
                  className="category-item"
                  key={sub.category_id}
                  onClick={() => navigate(`/w-subcategory/${sub.category_id}`)}
                >
                  <div className="category-icon">
                    <BusinessCenterIcon />
                  </div>
                  <p>{sub.name}</p>
                </div>
              ))}
            </div>

            {/* RIGHT ARROW */}
            <button
              className={`category-arrow ${
                currentPage === totalPages - 1 ? "disabled" : ""
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
            >
              ›
            </button>
          </div>
        )}

        {/* SUBCATEGORIES DOTS */}
        {totalPages > 1 && (
          <div className="category-dots">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={index}
                className={`category-dot ${
                  index === currentPage ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index)}
              ></span>
            ))}
          </div>
        )}

        {/* PRODUCTS SECTION */}
        <div className="products-section mt-5 pt-4 border-top">
          <ProductHeader
            viewMode={productsViewMode}
            onViewModeChange={setProductsViewMode}
            search={productsSearch}
            setSearch={setProductsSearch}
          />

          {productsLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
              <p className="text-muted">Try changing your search or check back later.</p>
            </div>
          ) : (
            <>
              <ProductGrid 
                products={paginatedProducts} 
                viewMode={productsViewMode} 
                baseurl={baseurl}
              />

              {/* PRODUCTS PAGINATION */}
              {productsTotalPages > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${productsCurrentPage === 1 && "disabled"}`}>
                      <button
                        className="page-link"
                        onClick={() => setProductsCurrentPage(p => p - 1)}
                        disabled={productsCurrentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: productsTotalPages }).map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${productsCurrentPage === i + 1 && "active"}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setProductsCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${productsCurrentPage === productsTotalPages && "disabled"}`}>
                      <button
                        className="page-link"
                        onClick={() => setProductsCurrentPage(p => p + 1)}
                        disabled={productsCurrentPage === productsTotalPages}
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
    </>
  );
};

export default SubCategories;