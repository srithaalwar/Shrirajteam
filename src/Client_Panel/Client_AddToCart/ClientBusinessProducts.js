import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClientNavbar from "../Client_Navbar/Client_Navbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal, ShoppingCart, Store
} from "lucide-react";
// import "./ClientBusinessProducts.css";
import { baseurl } from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import axios from "axios";

// ============= useIsMobile Hook =============
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

// ============= Sort Options =============
const SORT_OPTIONS = [
  { value: "default", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount_desc", label: "Highest Discount" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
];

// ============= Product Card Component =============
const ProductCard = ({ product, variant, businessName }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  
  const userId = localStorage.getItem("user_id");

  const getImage = () => {
    if (variant.media?.length > 0) return `${baseurl}${variant.media[0].file}`;
    const v = product.variants?.find(v => v.media?.length > 0);
    if (v) return `${baseurl}${v.media[0].file}`;
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
  };

  const mrp = parseFloat(variant.mrp) || 0;
  const price = parseFloat(variant.selling_price) || 0;
  const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const variantDisplay = variant.attributes
    ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
    : "";
  const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
  const url = `/client-business-product-details/${product.product_id}/?variant=${variant.id}`;

  // Check if item is in cart
  useEffect(() => {
    const abortController = new AbortController();
    
    const checkCartStatus = async () => {
      if (!userId) return;
      
      try {
        const response = await axios.get(`${baseurl}/cart/?user=${userId}`, {
          signal: abortController.signal
        });
        const cartResponse = response.data;
        let userCartItems = [];
        
        if (cartResponse.results && Array.isArray(cartResponse.results)) {
          userCartItems = cartResponse.results;
        } else if (Array.isArray(cartResponse)) {
          userCartItems = cartResponse;
        }
        
        const existingItem = userCartItems.find(item => item.variant === variant.id);
        if (existingItem) {
          setQty(existingItem.quantity);
          setCartItemId(existingItem.id);
        } else {
          setQty(0);
          setCartItemId(null);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error checking cart status:", error);
        }
      }
    };
    
    checkCartStatus();
    
    return () => {
      abortController.abort();
    };
  }, [userId, variant.id]);

  const refreshCartStatus = async () => {
    if (!userId) return;
    
    try {
      const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
      const cartResponse = response.data;
      let userCartItems = [];
      
      if (cartResponse.results && Array.isArray(cartResponse.results)) {
        userCartItems = cartResponse.results;
      } else if (Array.isArray(cartResponse)) {
        userCartItems = cartResponse;
      }
      
      const existingItem = userCartItems.find(item => item.variant === variant.id);
      if (existingItem) {
        setQty(existingItem.quantity);
        setCartItemId(existingItem.id);
      } else {
        setQty(0);
        setCartItemId(null);
      }
    } catch (error) {
      console.error("Error refreshing cart status:", error);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add items to cart',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6600',
      });
      return;
    }
    
    if (variant.stock <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'This product is currently out of stock',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6600',
      });
      return;
    }

    setLoading(true);
    
    try {
      if (cartItemId) {
        const newQty = qty + 1;
        
        if (newQty > variant.stock) {
          Swal.fire({
            icon: 'error',
            title: 'Stock Limit Exceeded',
            text: `Cannot add more than ${variant.stock} units`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6600',
          });
          return;
        }
        
        await axios.put(`${baseurl}/cart/${cartItemId}/`, {
          user: parseInt(userId),
          variant: variant.id,
          quantity: newQty
        });
        
        await refreshCartStatus();
      } else {
        await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          variant: variant.id,
          quantity: 1
        });
        
        await refreshCartStatus();
      }
      
      window.dispatchEvent(new Event('cartUpdated'));
      
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart!',
        text: `${productName} has been added to your cart.`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'View Cart',
        cancelButtonText: 'Continue Shopping',
        confirmButtonColor: '#ff6600',
        cancelButtonColor: '#6c757d',
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/client-add-to-cart');
        }
      });
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      
      let errorMessage = 'Failed to add to cart. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6600',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (e, newQty) => {
    e.stopPropagation();
    
    if (!userId || !cartItemId) return;
    
    if (newQty === 0) {
      setLoading(true);
      try {
        await axios.delete(`${baseurl}/cart/${cartItemId}/`);
        await refreshCartStatus();
        
        Swal.fire({
          icon: 'info',
          title: 'Removed from Cart',
          text: `${productName} has been removed from your cart.`,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (error) {
        console.error("Error removing from cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      if (newQty > variant.stock) {
        Swal.fire({
          icon: 'error',
          title: 'Stock Limit Exceeded',
          text: `Cannot add more than ${variant.stock} units`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#ff6600',
        });
        return;
      }
      
      setLoading(true);
      try {
        await axios.put(`${baseurl}/cart/${cartItemId}/`, {
          user: parseInt(userId),
          variant: variant.id,
          quantity: newQty
        });
        
        await refreshCartStatus();
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="cbpc-card" onClick={() => navigate(url)}>
      <div className="cbpc-card-img-wrap">
        <img src={getImage()} alt={productName} className="cbpc-card-img"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
        {discount > 0 && <span className="cbpc-card-disc">{discount}% OFF</span>}
      </div>
      <div className="cbpc-card-body">
        {variantDisplay && <span className="cbpc-card-variant">{variantDisplay}</span>}
        <p className="cbpc-card-name">{productName}</p>
        <div className="cbpc-card-business">
          <Store size={12} />
          <span>{businessName}</span>
        </div>
        <div className="cbpc-card-prices">
          <span className="cbpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          {mrp > price && <span className="cbpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
        </div>
      </div>
      <div className="cbpc-card-foot" onClick={e => e.stopPropagation()}>
        {qty === 0 ? (
          <button 
            className="cbpc-add-btn" 
            onClick={handleAddToCart}
            disabled={loading || variant.stock <= 0}
          >
            {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
          </button>
        ) : (
          <div className="cbpc-qty-control">
            <button 
              className="cbpc-qty-btn" 
              onClick={(e) => handleUpdateQuantity(e, qty - 1)}
              disabled={loading}
            >−</button>
            <span className="cbpc-qty-value">{qty}</span>
            <button 
              className="cbpc-qty-btn" 
              onClick={(e) => handleUpdateQuantity(e, qty + 1)}
              disabled={loading || qty >= variant.stock}
            >+</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============= Pagination =============
const Pagination = ({ current, total, onChange }) => {
  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return (
    <div className="cbpc-pagination">
      <button className="cbpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
      {pages.map(p => (
        <button key={p} className={`cbpc-page-btn ${current === p ? "cbpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="cbpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
    </div>
  );
};

// ============= Main Component =============
const ClientBusinessProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const [businessInfo, setBusinessInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortSheet, setShowSortSheet] = useState(false);

  const PAGE_SIZE = 12;

  // Get business_id from URL params
  const businessId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('business_id');
  }, [location.search]);

  // Fetch business info
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!businessId) {
        navigate('/client-busineess-category');
        return;
      }

      try {
        const response = await fetch(`${baseurl}/business/${businessId}/`);
        const data = await response.json();
        setBusinessInfo(data);
      } catch (error) {
        console.error("Error fetching business info:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not load business information',
          confirmButtonText: 'OK',
          confirmButtonColor: '#ff6600',
        }).then(() => {
          navigate('/client-busineess-category');
        });
      }
    };

    fetchBusinessInfo();
  }, [businessId, navigate]);

  // Fetch products for this business
  const fetchProducts = useCallback(async () => {
    if (!businessId) return;
    
    setProductsLoading(true);
    try {
      const params = new URLSearchParams({
        business_id: businessId,
        variant_verification_status: "verified"
      });

      const url = `${baseurl}/products/?${params}`;
      console.log("Fetching business products:", url);

      const res = await fetch(url);
      const data = await res.json();
      const items = [];
      (data.results || []).forEach(product => {
        if (product.variants?.length > 0) {
          product.variants.forEach(variant => items.push({ product, variant }));
        }
      });
      setProducts(items);
    } catch (e) { 
      console.error(e); 
    } finally { 
      setProductsLoading(false); 
    }
  }, [businessId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  useEffect(() => { 
    setCurrentPage(1); 
  }, [sortBy]);

  // Client-side sort
  const sortedProducts = useMemo(() => {
    const list = [...products];
    const disc = i => { 
      const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); 
      return m > 0 ? ((m - s) / m) * 100 : 0; 
    };
    switch (sortBy) {
      case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
      case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
      case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
      case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
      case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
    }
    return list;
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

  const productSection = productsLoading ? (
    <div className="cbpc-loading"><div className="cbpc-spinner" /><span>Loading products...</span></div>
  ) : sortedProducts.length === 0 ? (
    <div className="cbpc-empty">
      <Store size={48} strokeWidth={1} />
      <p>No products found for this business</p>
      <small>This business hasn't added any products yet</small>
    </div>
  ) : (
    <>
      <div className={`cbpc-grid ${isMobile ? "cbpc-grid--2col" : "cbpc-grid--desktop"}`}>
        {paginated.map(item => (
          <ProductCard 
            key={`${item.product.product_id}-${item.variant.id}`}
            product={item.product} 
            variant={item.variant}
            businessName={businessInfo?.business_name}
          />
        ))}
      </div>
      {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
    </>
  );

  if (!businessInfo) {
    return (
      <>
        <ClientNavbar />
        <div className="cbpc-loading">
          <div className="cbpc-spinner" />
          <span>Loading business information...</span>
        </div>
      </>
    );
  }

  // Mobile View
  if (isMobile) {
    return (
      <>
        <ClientNavbar />
        <div className="cbpc-mobile">
          <div className="cbpc-mobile-topbar">
            <button className="cbpc-back" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
            <h1 className="cbpc-mobile-title">{businessInfo.business_name}</h1>
            <button className="cbpc-cart-icon-btn" onClick={() => navigate('/client-add-to-cart')}>
              <ShoppingCart size={20} color="white" />
            </button>
          </div>

          {/* Business Info Banner */}
          <div className="cbpc-business-banner-mobile">
            {businessInfo.logo && (
              <img 
                src={`${baseurl}${businessInfo.logo}`} 
                alt={businessInfo.business_name}
                className="cbpc-business-logo-mobile"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div className="cbpc-business-info-mobile">
              {businessInfo.description && (
                <p className="cbpc-business-desc-mobile">{businessInfo.description}</p>
              )}
              {businessInfo.min_order_value && (
                <span className="cbpc-business-minorder-mobile">
                  Min Order: ₹{parseFloat(businessInfo.min_order_value).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="cbpc-toolbar">
            <button className="cbpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
              <span>{sortLabel}</span><ChevronDown size={14} />
            </button>
            <button className="cbpc-toolbar-btn" onClick={() => navigate('/client-add-to-cart')}>
              <ShoppingCart size={14} />
              <span>Cart</span>
            </button>
          </div>

          <div className="cbpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
          {productSection}
          <div style={{ height: 24 }} />

          {/* Sort Bottom Sheet */}
          {showSortSheet && (
            <>
              <div className="cbpc-overlay cbpc-overlay--on" onClick={() => setShowSortSheet(false)} />
              <div className="cbpc-sheet cbpc-sheet--open">
                <div className="cbpc-sheet-handle" />
                <div className="cbpc-sheet-header">
                  <span className="cbpc-sheet-title">Sort By</span>
                  <button className="cbpc-sheet-close" onClick={() => setShowSortSheet(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="cbpc-sheet-body">
                  <div className="cbpc-sort-list">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        className={`cbpc-sort-opt ${sortBy === opt.value ? "cbpc-sort-opt--on" : ""}`}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSortSheet(false);
                        }}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.value && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  // Desktop View
  return (
    <>
      <ClientNavbar />
      <div className="cbpc-desktop">
        <div className="cbpc-desktop-header">
          <div className="cbpc-desktop-header-inner">
            <button className="cbpc-back-desktop" onClick={() => navigate(-1)}>
              <ArrowLeft size={17} /><span>Back to Categories</span>
            </button>
            <h1 className="cbpc-desktop-title">{businessInfo.business_name}</h1>
            <button className="cbpc-cart-desktop-btn" onClick={() => navigate('/client-add-to-cart')}>
              <ShoppingCart size={18} />
              <span>View Cart</span>
            </button>
          </div>
        </div>

        <div className="cbpc-desktop-body">
          {/* Sidebar with Business Info */}
          <aside className="cbpc-sidebar">
            <div className="cbpc-business-sidebar">
              {businessInfo.logo && (
                <img 
                  src={`${baseurl}${businessInfo.logo}`} 
                  alt={businessInfo.business_name}
                  className="cbpc-business-logo-sidebar"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <h3 className="cbpc-business-name-sidebar">{businessInfo.business_name}</h3>
              {businessInfo.description && (
                <p className="cbpc-business-desc-sidebar">{businessInfo.description}</p>
              )}
              <div className="cbpc-business-meta-sidebar">
                {businessInfo.min_order_value && (
                  <div className="cbpc-meta-item">
                    <span>Min Order Value</span>
                    <strong>₹{parseFloat(businessInfo.min_order_value).toFixed(2)}</strong>
                  </div>
                )}
                {businessInfo.rating > 0 && (
                  <div className="cbpc-meta-item">
                    <span>Rating</span>
                    <strong>★ {businessInfo.rating}</strong>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Products Area */}
          <main className="cbpc-main">
            <div className="cbpc-main-topbar">
              <div className="cbpc-sort-wrap">
                <button className="cbpc-sort-btn" onClick={() => setShowSortSheet(v => !v)}>
                  <span>{sortLabel}</span><ChevronDown size={14} />
                </button>
                {showSortSheet && (
                  <>
                    <div className="cbpc-dropdown-overlay" onClick={() => setShowSortSheet(false)} />
                    <div className="cbpc-sort-dropdown">
                      <div className="cbpc-sort-list">
                        {SORT_OPTIONS.map(opt => (
                          <button
                            key={opt.value}
                            className={`cbpc-sort-opt ${sortBy === opt.value ? "cbpc-sort-opt--on" : ""}`}
                            onClick={() => {
                              setSortBy(opt.value);
                              setShowSortSheet(false);
                            }}
                          >
                            <span>{opt.label}</span>
                            {sortBy === opt.value && <Check size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="cbpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
            {productSection}
          </main>
        </div>
      </div>
    </>
  );
};

export default ClientBusinessProducts;