// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import axios from "axios";

// // ============= useIsMobile Hook =============
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return isMobile;
// };

// // ============= Sort Options =============
// const SORT_OPTIONS = [
//   { value: "default", label: "Relevance" },
//   { value: "price_asc", label: "Price: Low to High" },
//   { value: "price_desc", label: "Price: High to Low" },
//   { value: "discount_desc", label: "Highest Discount" },
//   { value: "name_asc", label: "Name: A to Z" },
//   { value: "name_desc", label: "Name: Z to A" },
// ];

// // ============= Bottom Sheet (Mobile) =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   return (
//     <>
//       <div className={`msub-overlay ${isOpen ? "msub-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`msub-sheet ${isOpen ? "msub-sheet--open" : ""}`}>
//         <div className="msub-sheet-handle" />
//         <div className="msub-sheet-header">
//           <span className="msub-sheet-title">{title}</span>
//           <button className="msub-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="msub-sheet-body">{children}</div>
//         {footer && <div className="msub-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="msub-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`msub-sort-opt ${sortBy === opt.value ? "msub-sort-opt--on" : ""}`}
//         onClick={() => { setSortBy(opt.value); onClose?.(); }}>
//         <span>{opt.label}</span>
//         {sortBy === opt.value && <Check size={16} />}
//       </button>
//     ))}
//   </div>
// );

// // ============= Nested Category Item =============
// const NestedCategoryItem = ({ category, level = 0, selectedCategories, onToggle }) => {
//   const [expanded, setExpanded] = useState(false);
//   const hasChildren = category.children?.length > 0;
//   const on = selectedCategories.includes(category.category_id);
//   return (
//     <div>
//       <div className={`msub-cat-row ${level > 0 ? "msub-cat-row--child" : ""}`}
//         onClick={() => onToggle(category.category_id)}>
//         <div className={`msub-checkbox ${on ? "msub-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`msub-cat-label ${on ? "msub-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="msub-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="msub-cat-children">
//           {category.children.map(child => (
//             <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
//               selectedCategories={selectedCategories} onToggle={onToggle} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Content =============
// const PRICE_RANGES = [
//   { value: "0-500", label: "Under ₹500" },
//   { value: "500-1000", label: "₹500 – ₹1,000" },
//   { value: "1000-5000", label: "₹1,000 – ₹5,000" },
//   { value: "5000-10000", label: "₹5,000 – ₹10,000" },
//   { value: "10000+", label: "Over ₹10,000" },
// ];
// const DISCOUNT_RANGES = [
//   { value: "0-10", label: "Up to 10%" },
//   { value: "10-20", label: "10% – 20%" },
//   { value: "20-30", label: "20% – 30%" },
//   { value: "30-50", label: "30% – 50%" },
//   { value: "50-60", label: "50% – 60%" },
//   { value: "60+", label: "60% & above" },
// ];

// const CheckRow = ({ label, on, onClick }) => (
//   <div className={`msub-filter-row ${on ? "msub-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`msub-checkbox ${on ? "msub-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// const FilterContent = ({
//   categoryTree, loading, isSidebar,
//   selectedCategories, setSelectedCategories,
//   selectedPriceRanges, setSelectedPriceRanges,
//   selectedDiscountRanges, setSelectedDiscountRanges,
// }) => {
//   const [tab, setTab] = useState("categories");
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

//   if (isSidebar) {
//     return (
//       <div className="msub-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="msub-load-inline"><div className="msub-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="msub-empty-txt">No subcategories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories}
//                   onToggle={id => toggle(setSelectedCategories, id)} />
//               ))
//           }
//         </SidebarSection>
//         <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
//           {PRICE_RANGES.map(r => (
//             <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
//               onClick={() => toggle(setSelectedPriceRanges, r.value)} />
//           ))}
//         </SidebarSection>
//         <SidebarSection title="Discount" count={selectedDiscountRanges.length}>
//           {DISCOUNT_RANGES.map(r => (
//             <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)}
//               onClick={() => toggle(setSelectedDiscountRanges, r.value)} />
//           ))}
//         </SidebarSection>
//       </div>
//     );
//   }

//   // Mobile tabbed
//   const tabs = [
//     { key: "categories", label: "Category", count: selectedCategories.length },
//     { key: "price", label: "Price", count: selectedPriceRanges.length },
//     { key: "discount", label: "Discount", count: selectedDiscountRanges.length },
//   ];
//   return (
//     <>
//       <div className="msub-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`msub-filter-tab ${tab === t.key ? "msub-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="msub-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="msub-filter-tab-body">
//         {tab === "categories" && (loading
//           ? <div className="msub-load-inline"><div className="msub-spinner-sm" /> Loading...</div>
//           : categoryTree.length === 0
//             ? <p className="msub-empty-txt">No subcategories</p>
//             : categoryTree.map(cat => (
//               <NestedCategoryItem key={cat.category_id} category={cat}
//                 selectedCategories={selectedCategories}
//                 onToggle={id => toggle(setSelectedCategories, id)} />
//             ))
//         )}
//         {tab === "price" && PRICE_RANGES.map(r => (
//           <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
//             onClick={() => toggle(setSelectedPriceRanges, r.value)} />
//         ))}
//         {tab === "discount" && DISCOUNT_RANGES.map(r => (
//           <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)}
//             onClick={() => toggle(setSelectedDiscountRanges, r.value)} />
//         ))}
//       </div>
//     </>
//   );
// };

// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="msub-sidebar-section">
//       <button className="msub-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>{title}{count > 0 && <span className="msub-filter-badge">{count}</span>}</span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="msub-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// // ============= Product Card (Updated with Cart Integration) =============
// const ProductCard = ({ product, variant, navigate }) => {
//   const [qty, setQty] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [cartItemId, setCartItemId] = useState(null);
  
//   const userId = localStorage.getItem("user_id");

//   const getImage = () => {
//     if (variant.media?.length > 0) return `${baseurl}${variant.media[0].file}`;
//     const v = product.variants?.find(v => v.media?.length > 0);
//     if (v) return `${baseurl}${v.media[0].file}`;
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   const mrp = parseFloat(variant.mrp) || 0;
//   const price = parseFloat(variant.selling_price) || 0;
//   const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
//   const variantDisplay = variant.attributes ? Object.values(variant.attributes).join(" • ") : "";
//   const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
//   const url = `/agent-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   // Check if item is in cart
//   useEffect(() => {
//     const checkCartStatus = async () => {
//       if (!userId) return;
      
//       try {
//         const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//         const cartResponse = response.data;
//         let userCartItems = [];
        
//         if (cartResponse.results && Array.isArray(cartResponse.results)) {
//           userCartItems = cartResponse.results;
//         } else if (Array.isArray(cartResponse)) {
//           userCartItems = cartResponse;
//         }
        
//         const existingItem = userCartItems.find(item => item.variant === variant.id);
//         if (existingItem) {
//           setQty(existingItem.quantity);
//           setCartItemId(existingItem.id);
//         } else {
//           setQty(0);
//           setCartItemId(null);
//         }
//       } catch (error) {
//         console.error("Error checking cart status:", error);
//       }
//     };
    
//     checkCartStatus();
//   }, [userId, variant.id]);

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
    
//     if (!userId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Login Required',
//         text: 'Please login to add items to cart',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//       return;
//     }
    
//     if (variant.stock <= 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Out of Stock',
//         text: 'This product is currently out of stock',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//       return;
//     }

//     setLoading(true);
    
//     try {
//       if (cartItemId) {
//         // Update existing cart item
//         const newQty = qty + 1;
        
//         if (newQty > variant.stock) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Stock Limit Exceeded',
//             text: `Cannot add more than ${variant.stock} units`,
//             confirmButtonText: 'OK',
//             confirmButtonColor: '#f76f2f',
//           });
//           return;
//         }
        
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//           user: parseInt(userId),
//           variant: variant.id,
//           quantity: newQty
//         });
        
//         setQty(newQty);
//       } else {
//         // Add new item to cart
//         const response = await axios.post(`${baseurl}/cart/`, {
//           user: parseInt(userId),
//           variant: variant.id,
//           quantity: 1
//         });
        
//         setQty(1);
//         setCartItemId(response.data.id);
//       }
      
//       // Trigger cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Added to Cart!',
//         text: `${productName} has been added to your cart.`,
//         showConfirmButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'View Cart',
//         cancelButtonText: 'Continue Shopping',
//         confirmButtonColor: '#f76f2f',
//         cancelButtonColor: '#6c757d',
//         timer: 2000,
//         timerProgressBar: true,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/agent-add-to-cart');
//         }
//       });
      
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to add to cart. Please try again.',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateQuantity = async (e, newQty) => {
//     e.stopPropagation();
    
//     if (!userId || !cartItemId) return;
    
//     if (newQty === 0) {
//       // Remove from cart
//       setLoading(true);
//       try {
//         await axios.delete(`${baseurl}/cart/${cartItemId}/`);
//         setQty(0);
//         setCartItemId(null);
        
//         Swal.fire({
//           icon: 'info',
//           title: 'Removed from Cart',
//           text: `${productName} has been removed from your cart.`,
//           showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//         });
        
//         window.dispatchEvent(new Event('cartUpdated'));
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       // Update quantity
//       if (newQty > variant.stock) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Stock Limit Exceeded',
//           text: `Cannot add more than ${variant.stock} units`,
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#f76f2f',
//         });
//         return;
//       }
      
//       setLoading(true);
//       try {
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//           user: parseInt(userId),
//           variant: variant.id,
//           quantity: newQty
//         });
        
//         setQty(newQty);
//         window.dispatchEvent(new Event('cartUpdated'));
//       } catch (error) {
//         console.error("Error updating cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="msub-card" onClick={() => navigate(url)}>
//       <div className="msub-card-img-wrap">
//         <img src={getImage()} alt={productName} className="msub-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="msub-card-disc">{discount}% OFF</span>}
//       </div>
//       <div className="msub-card-body">
//         {variantDisplay && <span className="msub-card-variant">{variantDisplay}</span>}
//         <p className="msub-card-name">{productName}</p>
//         {discount > 0 && <span className="msub-card-off">{discount}% OFF</span>}
//         <div className="msub-card-prices">
//           <span className="msub-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="msub-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>
//       <div className="msub-card-foot" onClick={e => e.stopPropagation()}>
//         {loading ? (
//           <div className="msub-spinner-sm" style={{ margin: "0 auto" }}></div>
//         ) : qty === 0 ? (
//           <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
//             {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
//           </button>
//         ) : (
//           <div className="msub-qty-control">
//             <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty - 1)}>−</button>
//             <span className="msub-qty-value">{qty}</span>
//             <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty + 1)} disabled={qty >= variant.stock}>+</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="msub-pagination">
//       <button className="msub-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`msub-page-btn ${current === p ? "msub-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="msub-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= Active Chips =============
// const ActiveChips = ({ selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="msub-chips">
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="msub-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="msub-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="msub-chip msub-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Main Component =============
// const CategoryProducts = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [currentCategoryId, setCurrentCategoryId] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("default");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showSortSheet, setShowSortSheet] = useState(false);
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

//   const PAGE_SIZE = 12;

//   const buildCategoryTree = useCallback((cats, parentId = null) =>
//     cats.filter(c => c.parent === parentId)
//       .map(c => ({ ...c, children: buildCategoryTree(cats, c.category_id) })), []);

//   // Get category ID from URL params
//   useEffect(() => {
//     const categoryIdFromUrl = id;
//     const categoryIdFromState = location.state?.categoryId;
//     const finalCategoryId = categoryIdFromState || categoryIdFromUrl;
    
//     setCurrentCategoryId(finalCategoryId);
//     console.log("Current Category ID:", finalCategoryId);
//   }, [id, location.state]);

//   // Fetch category details and subcategories
//   useEffect(() => {
//     if (!currentCategoryId) return;

//     const fetchCategoryDetails = async () => {
//       setLoading(true);
//       try {
//         // Fetch all categories
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         // Find current category details
//         const currentCategory = allCategories.find(c => c.category_id === parseInt(currentCategoryId));
//         setCategoryName(currentCategory?.name || "Products");
//         console.log("Category Name:", currentCategory?.name);

//         // Get subcategories for current category
//         const children = allCategories.filter(
//           c => c.parent === parseInt(currentCategoryId) && c.is_active !== false
//         );
        
//         // Build category tree for subcategories
//         const categoryTreeData = children.map(c => ({ 
//           ...c, 
//           children: buildCategoryTree(allCategories, c.category_id) 
//         }));
        
//         setCategoryTree(categoryTreeData);
//         console.log("Category Tree:", categoryTreeData);
//       } catch (e) {
//         console.error("Error fetching category details:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchCategoryDetails();
//   }, [currentCategoryId, buildCategoryTree]);

//   // Fetch products based on category
//   const fetchProducts = useCallback(async () => {
//     if (!currentCategoryId) return;
    
//     setProductsLoading(true);
//     try {
//       const userId = localStorage.getItem("user_id");
      
//       // Build URL with category_id and exclude_user_id
//       const params = new URLSearchParams();
      
//       // Add category_id (use selected categories if any, otherwise use current category)
//       const categoriesToFetch = selectedCategories.length === 0
//         ? [currentCategoryId]
//         : selectedCategories;
      
//       if (categoriesToFetch.length > 0) {
//         params.append("category_id", categoriesToFetch.join(","));
//       }
      
//       // Add exclude_user_id if user is logged in
//       if (userId) {
//         params.append("exclude_user_id", userId);
//       }
      
//       // Add price range filters
//       if (selectedPriceRanges.length > 0) {
//         selectedPriceRanges.forEach(r => params.append("price_range", r));
//       }
      
//       // Add discount range filters
//       if (selectedDiscountRanges.length > 0) {
//         selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       }
      
//       // Always filter for verified variants
//       params.append("variant_verification_status", "verified");
      
//       const url = `${baseurl}/products/?${params}`;
//       console.log("Fetching products with URL:", url);
      
//       const res = await fetch(url);
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log("Products API Response:", data);
      
//       const items = [];
      
//       // Process products and filter for verified variants only
//       (data.results || []).forEach(product => {
//         // Check if product has variants
//         if (product.variants && product.variants.length > 0) {
//           // Filter variants that are verified and active
//           const verifiedVariants = product.variants.filter(
//             variant => variant.verification_status === "verified" && variant.is_active === true
//           );
          
//           // Add each verified variant to the items list
//           verifiedVariants.forEach(variant => {
//             items.push({ 
//               product: {
//                 ...product,
//                 product_name: product.product_name,
//                 product_id: product.product_id,
//                 description: product.description,
//                 attributes: product.attributes,
//                 business: product.business,
//                 category: product.category
//               }, 
//               variant: variant 
//             });
//           });
//         } 
//         // If no variants but product is active and verified
//         else if (product.is_active !== false && product.verification_status === "verified") {
//           items.push({
//             product,
//             variant: {
//               id: product.product_id,
//               sku: product.product_id,
//               mrp: product.mrp || "0.00",
//               selling_price: product.selling_price || "0.00",
//               stock: product.stock || 0,
//               attributes: {},
//               media: product.media || [],
//               distribution_commission: product.distribution_commission || "0.00",
//               verification_status: product.verification_status || "verified"
//             }
//           });
//         }
//       });
      
//       console.log("Processed items count:", items.length);
//       setProducts(items);
      
//     } catch (e) {
//       console.error("Error fetching products:", e);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [currentCategoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   // Filter + Sort
//   const filteredProducts = useMemo(() => {
//     let list = [...products];

//     if (searchTerm.trim()) {
//       const t = searchTerm.toLowerCase();
//       list = list.filter(i =>
//         i.product.product_name?.toLowerCase().includes(t) ||
//         i.product.brand?.toLowerCase().includes(t)
//       );
//     }

//     const disc = i => {
//       const m = parseFloat(i.variant.mrp);
//       const s = parseFloat(i.variant.selling_price);
//       return m > 0 ? ((m - s) / m) * 100 : 0;
//     };

//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc": list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
//       default: list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
//     }

//     return list;
//   }, [products, searchTerm, sortBy]);

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree,
//     loading,
//     selectedCategories, setSelectedCategories,
//     selectedPriceRanges, setSelectedPriceRanges,
//     selectedDiscountRanges, setSelectedDiscountRanges,
//   };

//   const mobileFilterFooter = (
//     <div className="msub-filter-footer-btns">
//       <button className="msub-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="msub-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="msub-loading"><div className="msub-spinner" /><span>Loading products...</span></div>
//   ) : filteredProducts.length === 0 ? (
//     <div className="msub-empty">
//       <p>No products found</p>
//       <small>Try adjusting your search or filters</small>
//     </div>
//   ) : (
//     <>
//       <div className={`msub-grid ${isMobile ? "msub-grid--2col" : "msub-grid--desktop"}`}>
//         {paginated.map((item, index) => (
//           <ProductCard
//             key={`${item.product.product_id}-${item.variant.id}-${index}`}
//             product={item.product}
//             variant={item.variant}
//             navigate={navigate}
//           />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <AgentNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="msub-mobile">
//           <div className="msub-mobile-topbar">
//             <button className="msub-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="msub-mobile-title">{categoryName}</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="msub-mobile-search-wrap">
//             <div className="msub-search-bar">
//               <Search size={15} className="msub-search-ico" />
//               <input type="text" placeholder="Search products..." className="msub-search-input"
//                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//               {searchTerm && <button className="msub-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>

//           <div className="msub-toolbar">
//             <button className="msub-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button
//               className={`msub-toolbar-btn ${activeFilterCount > 0 ? "msub-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}
//             >
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="msub-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll}
//             />
//           )}

//           <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />

//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>

//           <BottomSheet
//             isOpen={showFilterSheet}
//             onClose={() => setShowFilterSheet(false)}
//             title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
//             footer={mobileFilterFooter}
//           >
//             <FilterContent {...filterProps} isSidebar={false} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* ======= DESKTOP ======= */}
//       {!isMobile && (
//         <div className="msub-desktop">
//           <div className="msub-desktop-header">
//             <div className="msub-desktop-header-inner">
//               <button className="msub-back-desktop" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={17} /><span>Back</span>
//               </button>
//               <h1 className="msub-desktop-title">{categoryName}</h1>
//             </div>
//           </div>

//           <div className="msub-desktop-body">
//             <aside className="msub-sidebar">
//               <div className="msub-sidebar-top">
//                 <span className="msub-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="msub-sidebar-clearall" onClick={clearAll}>
//                     Clear ({activeFilterCount})
//                   </button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             <main className="msub-main">
//               <div className="msub-main-topbar">
//                 <div className="msub-desktop-search">
//                   <Search size={15} className="msub-search-ico" />
//                   <input type="text" placeholder="Search products..." className="msub-search-input"
//                     value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//                   {searchTerm && <button className="msub-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//                 </div>
//                 <div className="msub-sort-wrap">
//                   <button className="msub-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="msub-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="msub-sort-dropdown">
//                         <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {activeFilterCount > 0 && (
//                 <ActiveChips
//                   selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//                   clearAll={clearAll}
//                 />
//               )}

//               <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CategoryProducts;


//============================================


// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import axios from "axios";

// // ============= useIsMobile Hook =============
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
//   useEffect(() => {
//     const handler = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return isMobile;
// };

// // ============= Sort Options =============
// const SORT_OPTIONS = [
//   { value: "default", label: "Relevance" },
//   { value: "price_asc", label: "Price: Low to High" },
//   { value: "price_desc", label: "Price: High to Low" },
//   { value: "discount_desc", label: "Highest Discount" },
//   { value: "name_asc", label: "Name: A to Z" },
//   { value: "name_desc", label: "Name: Z to A" },
// ];

// // ============= Bottom Sheet (Mobile) =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   return (
//     <>
//       <div className={`msub-overlay ${isOpen ? "msub-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`msub-sheet ${isOpen ? "msub-sheet--open" : ""}`}>
//         <div className="msub-sheet-handle" />
//         <div className="msub-sheet-header">
//           <span className="msub-sheet-title">{title}</span>
//           <button className="msub-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="msub-sheet-body">{children}</div>
//         {footer && <div className="msub-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="msub-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`msub-sort-opt ${sortBy === opt.value ? "msub-sort-opt--on" : ""}`}
//         onClick={() => { setSortBy(opt.value); onClose?.(); }}>
//         <span>{opt.label}</span>
//         {sortBy === opt.value && <Check size={16} />}
//       </button>
//     ))}
//   </div>
// );

// // ============= Nested Category Item =============
// const NestedCategoryItem = ({ category, level = 0, selectedCategories, onToggle }) => {
//   const [expanded, setExpanded] = useState(false);
//   const hasChildren = category.children?.length > 0;
//   const on = selectedCategories.includes(category.category_id);
//   return (
//     <div>
//       <div className={`msub-cat-row ${level > 0 ? "msub-cat-row--child" : ""}`}
//         onClick={() => onToggle(category.category_id)}>
//         <div className={`msub-checkbox ${on ? "msub-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`msub-cat-label ${on ? "msub-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="msub-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="msub-cat-children">
//           {category.children.map(child => (
//             <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
//               selectedCategories={selectedCategories} onToggle={onToggle} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Content =============
// const PRICE_RANGES = [
//   { value: "0-500", label: "Under ₹500" },
//   { value: "500-1000", label: "₹500 – ₹1,000" },
//   { value: "1000-5000", label: "₹1,000 – ₹5,000" },
//   { value: "5000-10000", label: "₹5,000 – ₹10,000" },
//   { value: "10000+", label: "Over ₹10,000" },
// ];
// const DISCOUNT_RANGES = [
//   { value: "0-10", label: "Up to 10%" },
//   { value: "10-20", label: "10% – 20%" },
//   { value: "20-30", label: "20% – 30%" },
//   { value: "30-50", label: "30% – 50%" },
//   { value: "50-60", label: "50% – 60%" },
//   { value: "60+", label: "60% & above" },
// ];

// const CheckRow = ({ label, on, onClick }) => (
//   <div className={`msub-filter-row ${on ? "msub-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`msub-checkbox ${on ? "msub-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// const FilterContent = ({
//   categoryTree, loading, isSidebar,
//   selectedCategories, setSelectedCategories,
//   selectedPriceRanges, setSelectedPriceRanges,
//   selectedDiscountRanges, setSelectedDiscountRanges,
//   sortBy, setSortBy,
// }) => {
//   const [tab, setTab] = useState("categories");
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

//   if (isSidebar) {
//     return (
//       <div className="msub-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="msub-load-inline"><div className="msub-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="msub-empty-txt">No subcategories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories}
//                   onToggle={id => toggle(setSelectedCategories, id)} />
//               ))
//           }
//         </SidebarSection>
//         <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
//           {PRICE_RANGES.map(r => (
//             <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
//               onClick={() => toggle(setSelectedPriceRanges, r.value)} />
//           ))}
//         </SidebarSection>
//         <SidebarSection title="Discount" count={selectedDiscountRanges.length}>
//           {DISCOUNT_RANGES.map(r => (
//             <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)}
//               onClick={() => toggle(setSelectedDiscountRanges, r.value)} />
//           ))}
//         </SidebarSection>
//         <SidebarSection title="Relevance" count={0}>
//           <div className="msub-relevance-options">
//             {SORT_OPTIONS.map(opt => (
//               <CheckRow 
//                 key={opt.value} 
//                 label={opt.label} 
//                 on={sortBy === opt.value}
//                 onClick={() => setSortBy(opt.value)} 
//               />
//             ))}
//           </div>
//         </SidebarSection>
//       </div>
//     );
//   }

//   // Mobile tabbed
//   const tabs = [
//     { key: "categories", label: "Category", count: selectedCategories.length },
//     { key: "price", label: "Price", count: selectedPriceRanges.length },
//     { key: "discount", label: "Discount", count: selectedDiscountRanges.length },
//     { key: "relevance", label: "Relevance", count: 0 },
//   ];
  
//   return (
//     <>
//       <div className="msub-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`msub-filter-tab ${tab === t.key ? "msub-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="msub-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="msub-filter-tab-body">
//         {tab === "categories" && (loading
//           ? <div className="msub-load-inline"><div className="msub-spinner-sm" /> Loading...</div>
//           : categoryTree.length === 0
//             ? <p className="msub-empty-txt">No subcategories</p>
//             : categoryTree.map(cat => (
//               <NestedCategoryItem key={cat.category_id} category={cat}
//                 selectedCategories={selectedCategories}
//                 onToggle={id => toggle(setSelectedCategories, id)} />
//             ))
//         )}
//         {tab === "price" && PRICE_RANGES.map(r => (
//           <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
//             onClick={() => toggle(setSelectedPriceRanges, r.value)} />
//         ))}
//         {tab === "discount" && DISCOUNT_RANGES.map(r => (
//           <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)}
//             onClick={() => toggle(setSelectedDiscountRanges, r.value)} />
//         ))}
//         {tab === "relevance" && (
//           <div className="msub-relevance-options">
//             {SORT_OPTIONS.map(opt => (
//               <CheckRow 
//                 key={opt.value} 
//                 label={opt.label} 
//                 on={sortBy === opt.value}
//                 onClick={() => setSortBy(opt.value)} 
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="msub-sidebar-section">
//       <button className="msub-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>{title}{count > 0 && <span className="msub-filter-badge">{count}</span>}</span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="msub-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// // ============= Product Card =============
// const ProductCard = ({ product, variant, navigate }) => {
//   const [qty, setQty] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [cartItemId, setCartItemId] = useState(null);
  
//   const userId = localStorage.getItem("user_id");

//   const getImage = () => {
//     if (variant.media?.length > 0) return `${baseurl}${variant.media[0].file}`;
//     const v = product.variants?.find(v => v.media?.length > 0);
//     if (v) return `${baseurl}${v.media[0].file}`;
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   const mrp = parseFloat(variant.mrp) || 0;
//   const price = parseFloat(variant.selling_price) || 0;
//   const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
//   const variantDisplay = variant.attributes ? Object.values(variant.attributes).join(" • ") : "";
//   const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
//   const url = `/agent-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   // Check if item is in cart
//   useEffect(() => {
//     const checkCartStatus = async () => {
//       if (!userId) return;
      
//       try {
//         const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//         const cartResponse = response.data;
//         let userCartItems = [];
        
//         if (cartResponse.results && Array.isArray(cartResponse.results)) {
//           userCartItems = cartResponse.results;
//         } else if (Array.isArray(cartResponse)) {
//           userCartItems = cartResponse;
//         }
        
//         const existingItem = userCartItems.find(item => item.variant === variant.id);
//         if (existingItem) {
//           setQty(existingItem.quantity);
//           setCartItemId(existingItem.id);
//         } else {
//           setQty(0);
//           setCartItemId(null);
//         }
//       } catch (error) {
//         console.error("Error checking cart status:", error);
//       }
//     };
    
//     checkCartStatus();
//   }, [userId, variant.id]);

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
    
//     if (!userId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Login Required',
//         text: 'Please login to add items to cart',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//       return;
//     }
    
//     if (variant.stock <= 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Out of Stock',
//         text: 'This product is currently out of stock',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//       return;
//     }

//     setLoading(true);
    
//     try {
//       if (cartItemId) {
//         const newQty = qty + 1;
        
//         if (newQty > variant.stock) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Stock Limit Exceeded',
//             text: `Cannot add more than ${variant.stock} units`,
//             confirmButtonText: 'OK',
//             confirmButtonColor: '#f76f2f',
//           });
//           return;
//         }
        
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//           user: parseInt(userId),
//           variant: variant.id,
//           quantity: newQty
//         });
        
//         setQty(newQty);
//       } else {
//         const response = await axios.post(`${baseurl}/cart/`, {
//           user: parseInt(userId),
//           variant: variant.id,
//           quantity: 1
//         });
        
//         setQty(1);
//         setCartItemId(response.data.id);
//       }
      
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Added to Cart!',
//         text: `${productName} has been added to your cart.`,
//         showConfirmButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'View Cart',
//         cancelButtonText: 'Continue Shopping',
//         confirmButtonColor: '#f76f2f',
//         cancelButtonColor: '#6c757d',
//         timer: 2000,
//         timerProgressBar: true,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate('/agent-add-to-cart');
//         }
//       });
      
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to add to cart. Please try again.',
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateQuantity = async (e, newQty) => {
//     e.stopPropagation();
    
//     if (!userId || !cartItemId) return;
    
//     if (newQty === 0) {
//       setLoading(true);
//       try {
//         await axios.delete(`${baseurl}/cart/${cartItemId}/`);
//         setQty(0);
//         setCartItemId(null);
        
//         Swal.fire({
//           icon: 'info',
//           title: 'Removed from Cart',
//           text: `${productName} has been removed from your cart.`,
//           showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//         });
        
//         window.dispatchEvent(new Event('cartUpdated'));
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (newQty > variant.stock) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Stock Limit Exceeded',
//           text: `Cannot add more than ${variant.stock} units`,
//           confirmButtonText: 'OK',
//           confirmButtonColor: '#f76f2f',
//         });
//         return;
//       }
      
//       setLoading(true);
//       try {
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//           user: parseInt(userId),
//           variant: variant.id,
//           quantity: newQty
//         });
        
//         setQty(newQty);
//         window.dispatchEvent(new Event('cartUpdated'));
//       } catch (error) {
//         console.error("Error updating cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="msub-card" onClick={() => navigate(url)}>
//       <div className="msub-card-img-wrap">
//         <img src={getImage()} alt={productName} className="msub-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="msub-card-disc">{discount}% OFF</span>}
//       </div>
//       <div className="msub-card-body">
//         {variantDisplay && <span className="msub-card-variant">{variantDisplay}</span>}
//         <p className="msub-card-name">{productName}</p>
//         {discount > 0 && <span className="msub-card-off">{discount}% OFF</span>}
//         <div className="msub-card-prices">
//           <span className="msub-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="msub-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>
//       <div className="msub-card-foot" onClick={e => e.stopPropagation()}>
//         {loading ? (
//           <div className="msub-spinner-sm" style={{ margin: "0 auto" }}></div>
//         ) : qty === 0 ? (
//           <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
//             {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
//           </button>
//         ) : (
//           <div className="msub-qty-control">
//             <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty - 1)}>−</button>
//             <span className="msub-qty-value">{qty}</span>
//             <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty + 1)} disabled={qty >= variant.stock}>+</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="msub-pagination">
//       <button className="msub-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`msub-page-btn ${current === p ? "msub-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="msub-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= Active Chips =============
// const ActiveChips = ({ selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="msub-chips">
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="msub-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="msub-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="msub-chip msub-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Main Component =============
// const CategoryProducts = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [currentCategoryId, setCurrentCategoryId] = useState(null);

//   const [sortBy, setSortBy] = useState("default");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showSortSheet, setShowSortSheet] = useState(false);
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

//   const PAGE_SIZE = 12;

//   const buildCategoryTree = useCallback((cats, parentId = null) =>
//     cats.filter(c => c.parent === parentId)
//       .map(c => ({ ...c, children: buildCategoryTree(cats, c.category_id) })), []);

//   // Get category ID from URL params
//   useEffect(() => {
//     const categoryIdFromUrl = id;
//     const categoryIdFromState = location.state?.categoryId;
//     const finalCategoryId = categoryIdFromState || categoryIdFromUrl;
    
//     setCurrentCategoryId(finalCategoryId);
//     console.log("Current Category ID:", finalCategoryId);
//   }, [id, location.state]);

//   // Fetch category details and subcategories
//   useEffect(() => {
//     if (!currentCategoryId) return;

//     const fetchCategoryDetails = async () => {
//       setLoading(true);
//       try {
//         // Fetch all categories
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         // Find current category details
//         const currentCategory = allCategories.find(c => c.category_id === parseInt(currentCategoryId));
//         setCategoryName(currentCategory?.name || "Products");
//         console.log("Category Name:", currentCategory?.name);

//         // Get subcategories for current category
//         const children = allCategories.filter(
//           c => c.parent === parseInt(currentCategoryId) && c.is_active !== false
//         );
        
//         // Build category tree for subcategories
//         const categoryTreeData = children.map(c => ({ 
//           ...c, 
//           children: buildCategoryTree(allCategories, c.category_id) 
//         }));
        
//         setCategoryTree(categoryTreeData);
//         console.log("Category Tree:", categoryTreeData);
//       } catch (e) {
//         console.error("Error fetching category details:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchCategoryDetails();
//   }, [currentCategoryId, buildCategoryTree]);

//   // Fetch products based on category
//   const fetchProducts = useCallback(async () => {
//     if (!currentCategoryId) return;
    
//     setProductsLoading(true);
//     try {
//       const userId = localStorage.getItem("user_id");
      
//       // Build URL with category_id and exclude_user_id
//       const params = new URLSearchParams();
      
//       // Add category_id (use selected categories if any, otherwise use current category)
//       const categoriesToFetch = selectedCategories.length === 0
//         ? [currentCategoryId]
//         : selectedCategories;
      
//       if (categoriesToFetch.length > 0) {
//         params.append("category_id", categoriesToFetch.join(","));
//       }
      
//       // Add exclude_user_id if user is logged in
//       if (userId) {
//         params.append("exclude_user_id", userId);
//       }
      
//       // Add price range filters
//       if (selectedPriceRanges.length > 0) {
//         selectedPriceRanges.forEach(r => params.append("price_range", r));
//       }
      
//       // Add discount range filters
//       if (selectedDiscountRanges.length > 0) {
//         selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       }
      
//       // Always filter for verified variants
//       params.append("variant_verification_status", "verified");
      
//       const url = `${baseurl}/products/?${params}`;
//       console.log("Fetching products with URL:", url);
      
//       const res = await fetch(url);
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log("Products API Response:", data);
      
//       const items = [];
      
//       // Process products and filter for verified variants only
//       (data.results || []).forEach(product => {
//         // Check if product has variants
//         if (product.variants && product.variants.length > 0) {
//           // Filter variants that are verified and active
//           const verifiedVariants = product.variants.filter(
//             variant => variant.verification_status === "verified" && variant.is_active === true
//           );
          
//           // Add each verified variant to the items list
//           verifiedVariants.forEach(variant => {
//             items.push({ 
//               product: {
//                 ...product,
//                 product_name: product.product_name,
//                 product_id: product.product_id,
//                 description: product.description,
//                 attributes: product.attributes,
//                 business: product.business,
//                 category: product.category
//               }, 
//               variant: variant 
//             });
//           });
//         } 
//         // If no variants but product is active and verified
//         else if (product.is_active !== false && product.verification_status === "verified") {
//           items.push({
//             product,
//             variant: {
//               id: product.product_id,
//               sku: product.product_id,
//               mrp: product.mrp || "0.00",
//               selling_price: product.selling_price || "0.00",
//               stock: product.stock || 0,
//               attributes: {},
//               media: product.media || [],
//               distribution_commission: product.distribution_commission || "0.00",
//               verification_status: product.verification_status || "verified"
//             }
//           });
//         }
//       });
      
//       console.log("Processed items count:", items.length);
//       setProducts(items);
      
//     } catch (e) {
//       console.error("Error fetching products:", e);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [currentCategoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   // Filter + Sort
//   const filteredProducts = useMemo(() => {
//     let list = [...products];

//     const disc = i => {
//       const m = parseFloat(i.variant.mrp);
//       const s = parseFloat(i.variant.selling_price);
//       return m > 0 ? ((m - s) / m) * 100 : 0;
//     };

//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc": list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
//       default: list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
//     }

//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree,
//     loading,
//     selectedCategories, setSelectedCategories,
//     selectedPriceRanges, setSelectedPriceRanges,
//     selectedDiscountRanges, setSelectedDiscountRanges,
//     sortBy, setSortBy,
//   };

//   const mobileFilterFooter = (
//     <div className="msub-filter-footer-btns">
//       <button className="msub-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="msub-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="msub-loading"><div className="msub-spinner" /><span>Loading products...</span></div>
//   ) : filteredProducts.length === 0 ? (
//     <div className="msub-empty">
//       <p>No products found</p>
//       <small>Try adjusting your search or filters</small>
//     </div>
//   ) : (
//     <>
//       <div className={`msub-grid ${isMobile ? "msub-grid--2col" : "msub-grid--desktop"}`}>
//         {paginated.map((item, index) => (
//           <ProductCard
//             key={`${item.product.product_id}-${item.variant.id}-${index}`}
//             product={item.product}
//             variant={item.variant}
//             navigate={navigate}
//           />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <AgentNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="msub-mobile">
//           <div className="msub-mobile-topbar">
//             <button className="msub-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="msub-mobile-title">{categoryName}</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="msub-toolbar">
//             <button className="msub-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button
//               className={`msub-toolbar-btn ${activeFilterCount > 0 ? "msub-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}
//             >
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="msub-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll}
//             />
//           )}

//           <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />

//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>

//           <BottomSheet
//             isOpen={showFilterSheet}
//             onClose={() => setShowFilterSheet(false)}
//             title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
//             footer={mobileFilterFooter}
//           >
//             <FilterContent {...filterProps} isSidebar={false} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* ======= DESKTOP ======= */}
//       {!isMobile && (
//         <div className="msub-desktop">
//           {/* REMOVED the separate header section - now handled by content area */}
//           <div className="msub-desktop-body">
//             <aside className="msub-sidebar">
//               <div className="msub-sidebar-top">
//                 <span className="msub-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="msub-sidebar-clearall" onClick={clearAll}>
//                     Clear ({activeFilterCount})
//                   </button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             <main className="msub-main">
//               {/* Header with category name and back button */}
//               <div className="msub-main-header">
//                 <h1 className="msub-desktop-title">{categoryName}</h1>
//                 <button className="msub-back-desktop" onClick={() => navigate(-1)}>
//                   <ArrowLeft size={17} /><span>Back</span>
//                 </button>
//               </div>

//               {/* <div className="msub-main-topbar">
//                 <div className="msub-sort-wrap">
//                   <button className="msub-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="msub-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="msub-sort-dropdown">
//                         <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div> */}

//               {activeFilterCount > 0 && (
//                 <ActiveChips
//                   selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//                   clearAll={clearAll}
//                 />
//               )}

//               <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CategoryProducts;


//=============================================


import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal, Info
} from "lucide-react";
import { baseurl } from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import axios from "axios";
import "./CategoryProducts.css";
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

// ============= Commission Tooltip =============
const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
  if (!show || !commissions || commissions.length === 0) return null;
  const commissionAmount = parseFloat(distributionCommission) || 0;
  const list = commissions.map(c => ({
    level: c.level_no,
    amount: (commissionAmount * parseFloat(c.percentage)) / 100,
  }));
  return (
    <div className="msub-commission-tooltip">
      {list.map(c => (
        <div key={c.level} className="msub-commission-row">
          <span>Team {c.level}:</span>
          <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
        </div>
      ))}
    </div>
  );
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

// ============= Bottom Sheet (Mobile) =============
const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`msub-overlay ${isOpen ? "msub-overlay--on" : ""}`} onClick={onClose} />
      <div className={`msub-sheet ${isOpen ? "msub-sheet--open" : ""}`}>
        <div className="msub-sheet-handle" />
        <div className="msub-sheet-header">
          <span className="msub-sheet-title">{title}</span>
          <button className="msub-sheet-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="msub-sheet-body">{children}</div>
        {footer && <div className="msub-sheet-footer">{footer}</div>}
      </div>
    </>
  );
};

// ============= Sort List =============
const SortList = ({ sortBy, setSortBy, onClose }) => (
  <div className="msub-sort-list">
    {SORT_OPTIONS.map(opt => (
      <button key={opt.value}
        className={`msub-sort-opt ${sortBy === opt.value ? "msub-sort-opt--on" : ""}`}
        onClick={() => { setSortBy(opt.value); onClose?.(); }}>
        <span>{opt.label}</span>
        {sortBy === opt.value && <Check size={16} />}
      </button>
    ))}
  </div>
);

// ============= Nested Category Item =============
const NestedCategoryItem = ({ category, level = 0, selectedCategories, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = category.children?.length > 0;
  const on = selectedCategories.includes(category.category_id);
  return (
    <div>
      <div className={`msub-cat-row ${level > 0 ? "msub-cat-row--child" : ""}`}
        onClick={() => onToggle(category.category_id)}>
        <div className={`msub-checkbox ${on ? "msub-checkbox--on" : ""}`}>
          {on && <Check size={10} color="#fff" strokeWidth={3} />}
        </div>
        <span className={`msub-cat-label ${on ? "msub-cat-label--on" : ""}`}>{category.name}</span>
        {hasChildren && (
          <button className="msub-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
            <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
          </button>
        )}
      </div>
      {expanded && hasChildren && (
        <div className="msub-cat-children">
          {category.children.map(child => (
            <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
              selectedCategories={selectedCategories} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

// ============= Filter Content =============
const PRICE_RANGES = [
  { value: "0-500", label: "Under ₹500" },
  { value: "500-1000", label: "₹500 – ₹1,000" },
  { value: "1000-5000", label: "₹1,000 – ₹5,000" },
  { value: "5000-10000", label: "₹5,000 – ₹10,000" },
  { value: "10000+", label: "Over ₹10,000" },
];
const DISCOUNT_RANGES = [
  { value: "0-10", label: "Up to 10%" },
  { value: "10-20", label: "10% – 20%" },
  { value: "20-30", label: "20% – 30%" },
  { value: "30-50", label: "30% – 50%" },
  { value: "50-60", label: "50% – 60%" },
  { value: "60+", label: "60% & above" },
];

const CheckRow = ({ label, on, onClick }) => (
  <div className={`msub-filter-row ${on ? "msub-filter-row--on" : ""}`} onClick={onClick}>
    <div className={`msub-checkbox ${on ? "msub-checkbox--on" : ""}`}>
      {on && <Check size={10} color="#fff" strokeWidth={3} />}
    </div>
    <span>{label}</span>
  </div>
);

const FilterContent = ({
  categoryTree, loading, isSidebar,
  selectedCategories, setSelectedCategories,
  selectedPriceRanges, setSelectedPriceRanges,
  selectedDiscountRanges, setSelectedDiscountRanges,
  sortBy, setSortBy,
}) => {
  const [tab, setTab] = useState("categories");
  const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  if (isSidebar) {
    return (
      <div className="msub-sidebar-filter">
        <SidebarSection title="Categories" count={selectedCategories.length}>
          {loading
            ? <div className="msub-load-inline"><div className="msub-spinner-sm" /> Loading...</div>
            : categoryTree.length === 0
              ? <p className="msub-empty-txt">No subcategories</p>
              : categoryTree.map(cat => (
                <NestedCategoryItem key={cat.category_id} category={cat}
                  selectedCategories={selectedCategories}
                  onToggle={id => toggle(setSelectedCategories, id)} />
              ))
          }
        </SidebarSection>
        <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
          {PRICE_RANGES.map(r => (
            <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
              onClick={() => toggle(setSelectedPriceRanges, r.value)} />
          ))}
        </SidebarSection>
        <SidebarSection title="Discount" count={selectedDiscountRanges.length}>
          {DISCOUNT_RANGES.map(r => (
            <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)}
              onClick={() => toggle(setSelectedDiscountRanges, r.value)} />
          ))}
        </SidebarSection>
        <SidebarSection title="Relevance" count={0}>
          <div className="msub-relevance-options">
            {SORT_OPTIONS.map(opt => (
              <CheckRow 
                key={opt.value} 
                label={opt.label} 
                on={sortBy === opt.value}
                onClick={() => setSortBy(opt.value)} 
              />
            ))}
          </div>
        </SidebarSection>
      </div>
    );
  }

  // Mobile tabbed
  const tabs = [
    { key: "categories", label: "Category", count: selectedCategories.length },
    { key: "price", label: "Price", count: selectedPriceRanges.length },
    { key: "discount", label: "Discount", count: selectedDiscountRanges.length },
    { key: "relevance", label: "Relevance", count: 0 },
  ];
  
  return (
    <>
      <div className="msub-filter-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`msub-filter-tab ${tab === t.key ? "msub-filter-tab--on" : ""}`}
            onClick={() => setTab(t.key)}>
            {t.label}
            {t.count > 0 && <span className="msub-tab-badge">{t.count}</span>}
          </button>
        ))}
      </div>
      <div className="msub-filter-tab-body">
        {tab === "categories" && (loading
          ? <div className="msub-load-inline"><div className="msub-spinner-sm" /> Loading...</div>
          : categoryTree.length === 0
            ? <p className="msub-empty-txt">No subcategories</p>
            : categoryTree.map(cat => (
              <NestedCategoryItem key={cat.category_id} category={cat}
                selectedCategories={selectedCategories}
                onToggle={id => toggle(setSelectedCategories, id)} />
            ))
        )}
        {tab === "price" && PRICE_RANGES.map(r => (
          <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
            onClick={() => toggle(setSelectedPriceRanges, r.value)} />
        ))}
        {tab === "discount" && DISCOUNT_RANGES.map(r => (
          <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)}
            onClick={() => toggle(setSelectedDiscountRanges, r.value)} />
        ))}
        {tab === "relevance" && (
          <div className="msub-relevance-options">
            {SORT_OPTIONS.map(opt => (
              <CheckRow 
                key={opt.value} 
                label={opt.label} 
                on={sortBy === opt.value}
                onClick={() => setSortBy(opt.value)} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const SidebarSection = ({ title, count, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="msub-sidebar-section">
      <button className="msub-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
        <span>{title}{count > 0 && <span className="msub-filter-badge">{count}</span>}</span>
        <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </button>
      {open && <div className="msub-sidebar-section-body">{children}</div>}
    </div>
  );
};

// ============= Product Card with Payout =============
const ProductCard = ({ product, variant, navigate, commissionData }) => {
  const [qty, setQty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [showPayout, setShowPayout] = useState(false);
  
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
  const distributionCommission = parseFloat(variant.distribution_commission || 0);
  const variantDisplay = variant.attributes ? Object.values(variant.attributes).join(" • ") : "";
  const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
  const url = `/agent-business-product-details/${product.product_id}/?variant=${variant.id}`;

  // Function to refresh cart status from server
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

  // Check if item is in cart - with abort controller
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

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add items to cart',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }
    
    if (variant.stock <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'This product is currently out of stock',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
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
            confirmButtonColor: '#f76f2f',
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
        const response = await axios.post(`${baseurl}/cart/`, {
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
        confirmButtonColor: '#f76f2f',
        cancelButtonColor: '#6c757d',
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/agent-add-to-cart');
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
        confirmButtonColor: '#f76f2f',
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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to remove from cart. Please try again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
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
          confirmButtonColor: '#f76f2f',
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
        
        let errorMessage = 'Failed to update cart. Please try again.';
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
          confirmButtonColor: '#f76f2f',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="msub-card" onClick={() => navigate(url)}>
      <div className="msub-card-img-wrap">
        <img src={getImage()} alt={productName} className="msub-card-img"
          onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
        {discount > 0 && <span className="msub-card-disc">{discount}% OFF</span>}
      </div>
      <div className="msub-card-body">
        {variantDisplay && <span className="msub-card-variant">{variantDisplay}</span>}
        <p className="msub-card-name">{productName}</p>
        {discount > 0 && <span className="msub-card-off">{discount}% OFF</span>}
        <div className="msub-card-prices">
          <span className="msub-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          {mrp > price && <span className="msub-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
        </div>
      </div>
      <div className="msub-card-foot" onClick={e => e.stopPropagation()}>
        {loading ? (
          <div className="msub-spinner-sm" style={{ margin: "0 auto" }}></div>
        ) : qty === 0 ? (
          <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
            {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
          </button>
        ) : (
          <div className="msub-qty-control">
            <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty - 1)}>−</button>
            <span className="msub-qty-value">{qty}</span>
            <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty + 1)} disabled={qty >= variant.stock}>+</button>
          </div>
        )}

        {/* PAYOUT button */}
        <div className="msub-payout-wrap"
          onMouseEnter={() => setShowPayout(true)}
          onMouseLeave={() => setShowPayout(false)}>
          <button className="msub-payout-btn">
            <Info size={14} /> PAYOUT
          </button>
          <CommissionTooltip
            show={showPayout}
            commissions={commissionData}
            distributionCommission={distributionCommission}
          />
        </div>
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
    <div className="msub-pagination">
      <button className="msub-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
      {pages.map(p => (
        <button key={p} className={`msub-page-btn ${current === p ? "msub-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="msub-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
    </div>
  );
};

// ============= Active Chips =============
const ActiveChips = ({ selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
  <div className="msub-chips">
    {selectedPriceRanges.map(r => (
      <span key={r} className="msub-chip"><DollarSign size={10} />{r}
        <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
    ))}
    {selectedDiscountRanges.map(r => (
      <span key={r} className="msub-chip"><Tag size={10} />{r}%
        <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
    ))}
    <button className="msub-chip msub-chip--clear" onClick={clearAll}>Clear All</button>
  </div>
);

// ============= Main Component =============
const CategoryProducts = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [categoryTree, setCategoryTree] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [commissionData, setCommissionData] = useState([]);

  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

  const PAGE_SIZE = 12;

  // Fetch commission data
  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const res = await fetch(`${baseurl}/commissions-master/`);
        const data = await res.json();
        setCommissionData(data.results || []);
      } catch (e) { 
        console.error("Error fetching commission data:", e); 
      }
    };
    fetchCommissions();
  }, []);

  const buildCategoryTree = useCallback((cats, parentId = null) =>
    cats.filter(c => c.parent === parentId)
      .map(c => ({ ...c, children: buildCategoryTree(cats, c.category_id) })), []);

  // Get category ID from URL params
  useEffect(() => {
    const categoryIdFromUrl = id;
    const categoryIdFromState = location.state?.categoryId;
    const finalCategoryId = categoryIdFromState || categoryIdFromUrl;
    
    setCurrentCategoryId(finalCategoryId);
    console.log("Current Category ID:", finalCategoryId);
  }, [id, location.state]);

  // Fetch category details and subcategories
  useEffect(() => {
    if (!currentCategoryId) return;

    const fetchCategoryDetails = async () => {
      setLoading(true);
      try {
        // Fetch all categories
        const res = await fetch(`${baseurl}/categories/`);
        const data = await res.json();
        const allCategories = data.results || data || [];

        // Find current category details
        const currentCategory = allCategories.find(c => c.category_id === parseInt(currentCategoryId));
        setCategoryName(currentCategory?.name || "Products");
        console.log("Category Name:", currentCategory?.name);

        // Get subcategories for current category
        const children = allCategories.filter(
          c => c.parent === parseInt(currentCategoryId) && c.is_active !== false
        );
        
        // Build category tree for subcategories
        const categoryTreeData = children.map(c => ({ 
          ...c, 
          children: buildCategoryTree(allCategories, c.category_id) 
        }));
        
        setCategoryTree(categoryTreeData);
        console.log("Category Tree:", categoryTreeData);
      } catch (e) {
        console.error("Error fetching category details:", e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryDetails();
  }, [currentCategoryId, buildCategoryTree]);

  // Fetch products based on category
  const fetchProducts = useCallback(async () => {
    if (!currentCategoryId) return;
    
    setProductsLoading(true);
    try {
      const userId = localStorage.getItem("user_id");
      
      // Build URL with category_id and exclude_user_id
      const params = new URLSearchParams();
      
      // Add category_id (use selected categories if any, otherwise use current category)
      const categoriesToFetch = selectedCategories.length === 0
        ? [currentCategoryId]
        : selectedCategories;
      
      if (categoriesToFetch.length > 0) {
        params.append("category_id", categoriesToFetch.join(","));
      }
      
      // Add exclude_user_id if user is logged in
      if (userId) {
        params.append("exclude_user_id", userId);
      }
      
      // Add price range filters
      if (selectedPriceRanges.length > 0) {
        selectedPriceRanges.forEach(r => params.append("price_range", r));
      }
      
      // Add discount range filters
      if (selectedDiscountRanges.length > 0) {
        selectedDiscountRanges.forEach(r => params.append("discount_range", r));
      }
      
      // Always filter for verified variants
      params.append("variant_verification_status", "verified", );
      params.append("business_verification_status", "verified");
      
      const url = `${baseurl}/products/?${params}`;
      console.log("Fetching products with URL:", url);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Products API Response:", data);
      
      const items = [];
      
      // Process products and filter for verified variants only
      (data.results || []).forEach(product => {
        // Check if product has variants
        if (product.variants && product.variants.length > 0) {
          // Filter variants that are verified and active
          const verifiedVariants = product.variants.filter(
            variant => variant.verification_status === "verified" && variant.is_active === true
          );
          
          // Add each verified variant to the items list
          verifiedVariants.forEach(variant => {
            items.push({ 
              product: {
                ...product,
                product_name: product.product_name,
                product_id: product.product_id,
                description: product.description,
                attributes: product.attributes,
                business: product.business,
                category: product.category
              }, 
              variant: variant 
            });
          });
        } 
        // If no variants but product is active and verified
        else if (product.is_active !== false && product.verification_status === "verified") {
          items.push({
            product,
            variant: {
              id: product.product_id,
              sku: product.product_id,
              mrp: product.mrp || "0.00",
              selling_price: product.selling_price || "0.00",
              stock: product.stock || 0,
              attributes: {},
              media: product.media || [],
              distribution_commission: product.distribution_commission || "0.00",
              verification_status: product.verification_status || "verified"
            }
          });
        }
      });
      
      console.log("Processed items count:", items.length);
      setProducts(items);
      
    } catch (e) {
      console.error("Error fetching products:", e);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, [currentCategoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    const disc = i => {
      const m = parseFloat(i.variant.mrp);
      const s = parseFloat(i.variant.selling_price);
      return m > 0 ? ((m - s) / m) * 100 : 0;
    };

    switch (sortBy) {
      case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
      case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
      case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
      case "name_asc": list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
      case "name_desc": list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
      default: list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
    }

    return list;
  }, [products, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
  const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
  const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

  const filterProps = {
    categoryTree,
    loading,
    selectedCategories, setSelectedCategories,
    selectedPriceRanges, setSelectedPriceRanges,
    selectedDiscountRanges, setSelectedDiscountRanges,
    sortBy, setSortBy,
  };

  const mobileFilterFooter = (
    <div className="msub-filter-footer-btns">
      <button className="msub-btn-clear" onClick={clearAll}>Clear All</button>
      <button className="msub-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
    </div>
  );

  const productSection = productsLoading ? (
    <div className="msub-loading"><div className="msub-spinner" /><span>Loading products...</span></div>
  ) : filteredProducts.length === 0 ? (
    <div className="msub-empty">
      <p>No products found</p>
      <small>Try adjusting your search or filters</small>
    </div>
  ) : (
    <>
      <div className={`msub-grid ${isMobile ? "msub-grid--2col" : "msub-grid--desktop"}`}>
        {paginated.map((item, index) => (
          <ProductCard
            key={`${item.product.product_id}-${item.variant.id}-${index}`}
            product={item.product}
            variant={item.variant}
            navigate={navigate}
            commissionData={commissionData}
          />
        ))}
      </div>
      {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
    </>
  );

  return (
    <>
      <AgentNavbar />

      {/* ======= MOBILE ======= */}
      {isMobile && (
        <div className="msub-mobile">
          <div className="msub-mobile-topbar">
            <button className="msub-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
            <h1 className="msub-mobile-title">{categoryName}</h1>
            <div style={{ width: 36 }} />
          </div>

          <div className="msub-toolbar">
            <button className="msub-toolbar-btn" onClick={() => setShowSortSheet(true)}>
              <span>{sortLabel}</span><ChevronDown size={14} />
            </button>
            <button
              className={`msub-toolbar-btn ${activeFilterCount > 0 ? "msub-toolbar-btn--on" : ""}`}
              onClick={() => setShowFilterSheet(true)}
            >
              <Filter size={14} /><span>Filter</span>
              {activeFilterCount > 0 && <span className="msub-toolbar-badge">{activeFilterCount}</span>}
            </button>
          </div>

          {activeFilterCount > 0 && (
            <ActiveChips
              selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
              selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
              clearAll={clearAll}
            />
          )}

          <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
          {productSection}
          <div style={{ height: 24 }} />

          <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
            <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
          </BottomSheet>

          <BottomSheet
            isOpen={showFilterSheet}
            onClose={() => setShowFilterSheet(false)}
            title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`}
            footer={mobileFilterFooter}
          >
            <FilterContent {...filterProps} isSidebar={false} />
          </BottomSheet>
        </div>
      )}

      {/* ======= DESKTOP ======= */}
      {!isMobile && (
        <div className="msub-desktop">
          {/* REMOVED the separate header section - now handled by content area */}
          <div className="msub-desktop-body">
            <aside className="msub-sidebar">
              <div className="msub-sidebar-top">
                <span className="msub-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
                {activeFilterCount > 0 && (
                  <button className="msub-sidebar-clearall" onClick={clearAll}>
                    Clear ({activeFilterCount})
                  </button>
                )}
              </div>
              <FilterContent {...filterProps} isSidebar={true} />
            </aside>

            <main className="msub-main">
              {/* Header with category name and back button */}
              <div className="msub-main-header">
                <h1 className="msub-desktop-title">{categoryName}</h1>
                <button className="msub-back-desktop" onClick={() => navigate(-1)}>
                  <ArrowLeft size={17} /><span>Back</span>
                </button>
              </div>

              {activeFilterCount > 0 && (
                <ActiveChips
                  selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
                  selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
                  clearAll={clearAll}
                />
              )}

              <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
              {productSection}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryProducts;