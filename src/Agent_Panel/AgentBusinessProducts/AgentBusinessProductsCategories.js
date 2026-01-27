// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
//  import './AgentBusinessProductsCategories.css'
// import { baseurl } from "../../BaseURL/BaseURL";
// import AgentNavbar from "../Agent_Navbar/Agent_Navbar";

// const Categories = () => {
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
//     <AgentNavbar/>
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
//             onClick={() => navigate(`/agent-subcategory/${cat.category_id}`)}
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

// export default Categories;




import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import {
  Search,
  X,
  Grid3X3,
  LayoutList,
  ChevronUp,
  ChevronDown,
  Tag,
  DollarSign,
  ArrowLeft
} from "lucide-react";
import './AgentBusinessProductsCategories.css';
import { baseurl } from "../../BaseURL/BaseURL";
import AgentNavbar from "../Agent_Navbar/Agent_Navbar";

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

/* ================= FILTER COMPONENTS ================= */
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

/* ================= PRODUCT CARD COMPONENT ================= */
const ProductCard = ({ product, variant, baseurl }) => {
  const navigate = useNavigate();
  
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
    <div className="card h-100" style={{ zIndex: 999 }}>
      <div className="bg-light p-3 text-center position-relative" style={{ height: 200, cursor: "pointer" }}
           onClick={() => navigate(`/agent-business-product-details/${product.product_id}?variant=${variant.id}`)}>
        <img
          src={getProductImage()}
          alt={getVariantName()}
          className="img-fluid"
          style={{ maxHeight: "100%", objectFit: "contain" }}
        />
        {discount > 0 && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="line-clamp-2" style={{ cursor: "pointer" }}
            onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}>
          {getVariantName()}
        </h6>
        <small className="text-muted">{product.brand || "No Brand"}</small>
        
        {getVariantDisplay() && (
          <small className="text-info mb-2">
            {getVariantDisplay()}
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

          <button 
            className="btn w-100 mt-2 text-white" 
            style={{ background: "#6c757d", marginBottom: "8px" }}
            onClick={() => navigate(`/agent-business-product-details/${product.product_id}/?variant=${variant.id}`)}
          >
            VIEW DETAILS
          </button>

          <button 
            className="btn w-100 mt-2 text-white" 
            style={{ background: "#273c75" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart:", variant.id, variant.sku);
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
const ProductHeader = ({ 
  viewMode, 
  onViewModeChange, 
  search, 
  setSearch,
  selectedPriceRanges,
  selectedDiscountRanges,
  onPriceRangeToggle,
  onDiscountRangeToggle,
  onRemovePriceFilter,
  onRemoveDiscountFilter,
  onClearAllFilters
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
        <h4 className="fw-bold mb-0">Products</h4>

        <div className="d-flex align-items-center gap-2 flex-wrap">
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
const ProductGrid = ({ products, viewMode, baseurl }) => {
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
          />
        </div>
      ))}
    </div>
  );
};

/* ================= MAIN CATEGORIES COMPONENT ================= */
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const categoriesRowRef = useRef(null);

  // Products states (from SubCategories pattern)
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsViewMode, setProductsViewMode] = useState("grid-4");
  const [productsSearch, setProductsSearch] = useState("");
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

  // Fetch categories
  useEffect(() => {
    fetch(`${baseurl}/categories/?level=global`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.results
          .filter(cat => cat.level === "global" && cat.is_active)
          .sort((a, b) => a.display_order - b.display_order);

        setCategories(filtered);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch products (using the same pattern as SubCategories)
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    
    const params = new URLSearchParams();
    
    if (productsSearch.trim()) params.append('search', productsSearch.trim());
    
    selectedPriceRanges.forEach(range => params.append('price_range', range));
    selectedDiscountRanges.forEach(range => params.append('discount_range', range));
    
    try {
      const response = await fetch(`${baseurl}/products/?${params.toString()}`);
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
              attributes: {}
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
  }, [productsSearch, selectedPriceRanges, selectedDiscountRanges]);

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
    setProductsCurrentPage(1);
  };

  // Categories pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  // Products pagination
  const productsItemsPerPage = {
    "grid-3": 6,
    "grid-4": 8,
  }[productsViewMode];

  const productsTotalPages = Math.ceil(products.length / productsItemsPerPage);
  const paginatedProducts = products.slice(
    (productsCurrentPage - 1) * productsItemsPerPage,
    productsCurrentPage * productsItemsPerPage
  );

  useEffect(() => {
    setProductsCurrentPage(1);
  }, [productsViewMode, productsSearch]);

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

  return (
    <>
      <AgentNavbar />
      
      <div className="container-fluid py-4">
        {/* Back Button */}
        {/* <button
          className="btn btn-outline-secondary mb-4 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back
        </button> */}

        {/* Categories Section */}
        <h2 className="section-title-head mb-4">Categories</h2>
        
        <div className="categories-wrapper mb-5">
          <button
            className={`category-arrow ${currentPage === 0 ? "disabled" : ""}`}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            ‹
          </button>

          <div className="categories-row" ref={categoriesRowRef}>
            {currentCategories.map(cat => (
              <div
                className="category-item"
                key={cat.category_id}
                onClick={() => navigate(`/agent-subcategory/${cat.category_id}`)}
              >
                <div className="category-icon">
                  <BusinessCenterIcon />
                </div>
                <p>{cat.name}</p>
              </div>
            ))}
          </div>

          <button
            className={`category-arrow ${currentPage === totalPages - 1 ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            ›
          </button>
        </div>

        {totalPages > 1 && (
          <div className="category-dots mb-5">
            {Array.from({ length: totalPages }).map((_, index) => (
              <span
                key={index}
                className={`category-dot ${index === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(index)}
              ></span>
            ))}
          </div>
        )}

        {/* Products Section - Same as SubCategories */}
        <div className="products-section mt-5 pt-4 border-top">
          <ProductHeader
            viewMode={productsViewMode}
            onViewModeChange={setProductsViewMode}
            search={productsSearch}
            setSearch={setProductsSearch}
            selectedPriceRanges={selectedPriceRanges}
            selectedDiscountRanges={selectedDiscountRanges}
            onPriceRangeToggle={handlePriceRangeToggle}
            onDiscountRangeToggle={handleDiscountRangeToggle}
            onRemovePriceFilter={handleRemovePriceFilter}
            onRemoveDiscountFilter={handleRemoveDiscountFilter}
            onClearAllFilters={handleClearAllFilters}
          />

          {productsLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <h5>No products found</h5>
              <p className="text-muted">Try changing your filters or check back later.</p>
            </div>
          ) : (
            <>
              <ProductGrid 
                products={paginatedProducts} 
                viewMode={productsViewMode} 
                baseurl={baseurl}
              />

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

export default Categories;