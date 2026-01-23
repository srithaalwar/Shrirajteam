// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import {
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   LayoutList,
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";

// /* ================= PRODUCT CARD COMPONENT ================= */
// const ProductCard = ({ product, variant, baseurl }) => {
//   const navigate = useNavigate();
  
//   // Get image for specific variant
//   const getProductImage = () => {
//     // Check if this variant has media images
//     if (variant.media && variant.media.length > 0) {
//       // Find an image (not video) from variant's media
//       const imageMedia = variant.media.find(m => m.media_type === "image");
//       if (imageMedia) {
//         return `${baseurl}${imageMedia.file}`;
//       }
//       // If no image but has video, use video thumbnail or skip
//       return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//     }
    
//     // If no media for this variant, check other variants in the product
//     if (product.variants && product.variants.length > 0) {
//       // Find any variant that has image media
//       for (const v of product.variants) {
//         if (v.media && v.media.length > 0) {
//           const imageMedia = v.media.find(m => m.media_type === "image");
//           if (imageMedia) {
//             return `${baseurl}${imageMedia.file}`;
//           }
//         }
//       }
//     }
    
//     // Fallback to default image
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
//       // Create display from attributes if no display field
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
//       // Show key attributes in a readable format
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
//       <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
//            onClick={() => navigate(`/agent-business-product-details/${product.product_id}?variant=${variant.id}`)}>
//         <img
//           src={getProductImage()}
//           alt={getVariantName()}
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

//       <div className="card-body d-flex flex-column p-3">
//         <h6 className="line-clamp-2 mb-2" style={{ cursor: "pointer", minHeight: "48px" }}
//             onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
//           {getVariantName()}
//         </h6>
//         <small className="text-muted">{product.brand || "No Brand"}</small>
        
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

//         <div className="mt-auto">
//           <div className="d-flex align-items-center gap-2 mb-2">
//             <strong className="h5 mb-0">₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
//             {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(variant.mrp).toFixed(2)}
//               </small>
//             )}
//           </div>

//           {/* VIEW DETAILS BUTTON */}
//           <button 
//             className="btn w-100 mb-2 text-white" 
//             style={{ background: "#6c757d", fontSize: "14px" }}
//             onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}
//           >
//             VIEW DETAILS
//           </button>

//           {/* ADD TO CART BUTTON */}
//           <button 
//             className="btn w-100 text-white" 
//             style={{ background: "#273c75", fontSize: "14px" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               // Add to cart logic here with variant.id
//               console.log("Add to cart:", variant.id, variant.sku);
//             }}
//             disabled={variant.stock <= 0}
//           >
//             {variant.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= PRODUCT HEADER COMPONENT ================= */
// const ProductHeader = ({ viewMode, onViewModeChange, search, setSearch, totalProducts }) => {
//   const views = [
//     { mode: "grid-2", icon: Grid2X2 },
//     { mode: "grid-3", icon: Grid3X3 },
//     { mode: "grid-4", icon: LayoutList },
//   ];

//   return (
//     <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//       <div>
//         <h4 className="fw-bold mb-0">My Products</h4>
//         <small className="text-muted">{totalProducts} products found</small>
//       </div>

//       <div className="d-flex align-items-center gap-2">
//         <div className="input-group input-group-sm" style={{ width: 220 }}>
//           <span className="input-group-text bg-transparent border-end-0">
//             <Search size={16} />
//           </span>
//           <input
//             className="form-control border-start-0"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {search && (
//             <button className="btn btn-outline-secondary border-start-0" onClick={() => setSearch("")}>
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
//               title={`${mode.replace('grid-', '')} columns`}
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

// /* ================= MAIN PRODUCTS COMPONENT ================= */
// const MyProducts = () => {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Products grid states
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Get user_id from localStorage
//   const getUserIdFromLocalStorage = () => {
//     try {
//       // Try to get user_id from different possible keys in localStorage
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const user = JSON.parse(userData);
//         if (user.user_id) return user.user_id;
//         if (user.id) return user.id;
//       }
      
//       // Try other possible keys
//       const userId = localStorage.getItem('user_id') || 
//                     localStorage.getItem('userId') ||
//                     localStorage.getItem('id');
      
//       if (userId) return parseInt(userId);
      
//       // Return default user_id if none found
//       console.warn("No user_id found in localStorage, using default 2");
//       return 2;
//     } catch (error) {
//       console.error("Error getting user_id from localStorage:", error);
//       return 2; // Default fallback
//     }
//   };

//   // Fetch products for the user
//   useEffect(() => {
//     setLoading(true);
    
//     const userId = getUserIdFromLocalStorage();
//     console.log("Fetching products for user_id:", userId);
    
//     fetch(`${baseurl}/products/?user_id=${userId}`)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(data => {
//         console.log("Products data received:", data);
        
//         // Transform products to include each variant as a separate item
//         const allProductItems = [];
//         (data.results || []).forEach(product => {
//           if (product.variants && product.variants.length > 0) {
//             // Add each variant as a separate product item
//             product.variants.forEach(variant => {
//               allProductItems.push({
//                 product: product,
//                 variant: variant
//               });
//             });
//           } else {
//             // If no variants, add the product as is
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
//   }, []);

//   /* ===== Filter products based on search ===== */
//   const filteredProducts = products.filter((item) => {
//     const searchTerm = search.toLowerCase();
//     if (!searchTerm) return true;
    
//     return (
//       item.product.product_name.toLowerCase().includes(searchTerm) ||
//       (item.product.brand && item.product.brand.toLowerCase().includes(searchTerm)) ||
//       item.variant.sku.toLowerCase().includes(searchTerm) ||
//       (item.variant.attributes && 
//         JSON.stringify(item.variant.attributes).toLowerCase().includes(searchTerm))
//     );
//   });

//   /* ===== Pagination ===== */
//   const itemsPerPage = {
//     "grid-2": 8,
//     "grid-3": 9,
//     "grid-4": 12,
//   }[viewMode];

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Reset page on view/search change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [viewMode, search]);

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="webhome-container" style={{ padding: "20px" }}>
//         {/* 🔙 BACK BUTTON */}
//         <button
//           className="back-btn"
//           onClick={() => navigate(-1)}
//           style={{
//             background: "none",
//             border: "none",
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             color: "#333",
//             marginBottom: "20px",
//             cursor: "pointer",
//             fontSize: "16px"
//           }}
//         >
//           <ArrowBackIosNewIcon fontSize="small" />
//           <span>Back</span>
//         </button>

//         {/* PRODUCTS SECTION */}
//         <div className="products-section">
//           <ProductHeader
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             search={search}
//             setSearch={setSearch}
//             totalProducts={filteredProducts.length}
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
//                 {search ? `No products match "${search}"` : "You haven't added any products yet"}
//               </p>
//             </div>
//           ) : (
//             <>
//               <ProductGrid 
//                 products={paginatedProducts} 
//                 viewMode={viewMode} 
//                 baseurl={baseurl}
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
//                       // Show only limited page numbers
//                       if (
//                         i === 0 || // First page
//                         i === totalPages - 1 || // Last page
//                         (i >= currentPage - 2 && i <= currentPage + 2) // Pages around current
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
                      
//                       // Show ellipsis
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
//     </>
//   );
// };

// export default MyProducts;





//===============================================================================




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WebsiteNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Search,
  X,
  Grid2X2,
  Grid3X3,
  LayoutList,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Package,
  Image as ImageIcon,
  DollarSign,
  PackageOpen,
  AlertCircle
} from "lucide-react";
import { baseurl } from "../../BaseURL/BaseURL";

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
    is_active: false
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
        is_active: variant.is_active || false
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
//       {/* Action buttons overlay */}
//       <div className="position-absolute top-0 start-0 p-2 z-1">
//         {/* <div className="btn-group">
//           <button 
//             className="btn btn-sm btn-outline-primary"
//             onClick={(e) => {
//               e.stopPropagation();
//               onEditProduct(product);
//             }}
//             title="Edit Product"
//           >
//             <Edit size={14} />
//           </button>
//           <button 
//             className="btn btn-sm btn-outline-info"
//             onClick={(e) => {
//               e.stopPropagation();
//               onEditVariant(product, variant);
//             }}
//             title="Edit Variant"
//           >
//             <Package size={14} />
//           </button>
//           <button 
//             className="btn btn-sm btn-outline-warning"
//             onClick={(e) => {
//               e.stopPropagation();
//               onManageMedia(product, variant);
//             }}
//             title="Manage Media"
//           >
//             <ImageIcon size={14} />
//           </button>
//         </div> */}

//         <div className="btn-group">
//   <button 
//     className="btn btn-sm btn-outline-primary"
//     onClick={(e) => {
//       e.stopPropagation();
//       onEditProduct(product);
//     }}
//   >
//     Edit Product
//   </button>
//   <button 
//     className="btn btn-sm btn-outline-info"
//     onClick={(e) => {
//       e.stopPropagation();
//       onEditVariant(product, variant);
//     }}
//   >
//     Edit Variant
//   </button>
//   <button 
//     className="btn btn-sm btn-outline-warning"
//     onClick={(e) => {
//       e.stopPropagation();
//       onManageMedia(product, variant);
//     }}
//   >
//     Media
//   </button>
// </div>
//       </div>

//       <div className="bg-light p-3 text-center position-relative" style={{ height: 150, cursor: "pointer" }}
//            onClick={() => navigate(`/agent-business-product-details/${product.product_id}?variant=${variant.id}`)}>
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
//             onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
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

//         <div className="mt-auto">
//           <div className="d-flex align-items-center gap-2 mb-2">
//             <strong className="h5 mb-0">₹{parseFloat(variant.selling_price).toFixed(2)}</strong>
//             {parseFloat(variant.mrp) > parseFloat(variant.selling_price) && (
//               <small className="text-muted text-decoration-line-through">
//                 ₹{parseFloat(variant.mrp).toFixed(2)}
//               </small>
//             )}
//           </div>

//           <div className="d-grid gap-2">
//             {/* VIEW DETAILS BUTTON */}
//             <button 
//               className="btn w-100 text-white" 
//               style={{ background: "#6c757d", fontSize: "14px" }}
//               onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}
//             >
//               <Eye size={14} /> VIEW DETAILS
//             </button>

//               <button 
//               className="btn w-100 text-white" 
//               style={{ background: "#273c75", fontSize: "14px" }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Add to cart:", variant.id, variant.sku);
//               }}
//               disabled={variant.stock <= 0}
//             >
// PAYOUT
//             </button>

//             {/* ADD TO CART BUTTON */}
//             <button 
//               className="btn w-100 text-white" 
//               style={{ background: "#273c75", fontSize: "14px" }}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Add to cart:", variant.id, variant.sku);
//               }}
//               disabled={variant.stock <= 0}
//             >
//                {variant.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
//             </button>
//           </div>
//         </div>

        
//       </div>
//     </div>
//   );
// };


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
           onClick={() => navigate(`/agent-business-product-details/${product.product_id}?variant=${variant.id}`)}>
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
            onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
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
            onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}
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
  onAddVariant
}) => {
  const views = [
    { mode: "grid-2", icon: Grid2X2 },
    { mode: "grid-3", icon: Grid3X3 },
    { mode: "grid-4", icon: LayoutList },
  ];

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h4 className="fw-bold mb-0">My Products</h4>
        <small className="text-muted">{totalProducts} products found</small>
      </div>

      <div className="d-flex align-items-center gap-3">
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

        {/* <button
          className="btn btn-success"
          onClick={onAddVariant}
          title="Add New Variant"
        >
          <Plus size={16} /> Add Variant
        </button> */}
      </div>
    </div>
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Products grid states
  const [viewMode, setViewMode] = useState("grid-4");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
  const [editVariantModal, setEditVariantModal] = useState({ isOpen: false, product: null, variant: null });
  const [addVariantModal, setAddVariantModal] = useState({ isOpen: false, product: null });
  const [manageMediaModal, setManageMediaModal] = useState({ isOpen: false, product: null, variant: null });

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

  // Fetch products for the user
  const fetchProducts = () => {
    setLoading(true);
    
    const userId = getUserIdFromLocalStorage();
    console.log("Fetching products for user_id:", userId);
    
    fetch(`${baseurl}/products/?user_id=${userId}`)
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
  }, []);

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
          is_active: variantData.is_active
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

  /* ===== Filter products based on search ===== */
  const filteredProducts = products.filter((item) => {
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

  /* ===== Pagination ===== */
  const itemsPerPage = {
    "grid-2": 8,
    "grid-3": 9,
    "grid-4": 12,
  }[viewMode];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on view/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, search]);

  return (
    <>
      <WebsiteNavbar />

      <div className="webhome-container" style={{ padding: "20px" }}>
        {/* 🔙 BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#333",
            marginBottom: "20px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
          <span>Back</span>
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
                {search ? `No products match "${search}"` : "You haven't added any products yet"}
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