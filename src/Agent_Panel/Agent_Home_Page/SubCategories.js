

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";

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

// // ============= Product Card =============
// const ProductCard = ({ product, variant, navigate, userId }) => {
//   const [qty, setQty] = useState(0);
//   const [updating, setUpdating] = useState(false);

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

//   // Fetch current cart quantity on mount
//   useEffect(() => {
//     if (!userId) return;
    
//     const fetchCartQuantity = async () => {
//       try {
//         const response = await fetch(`${baseurl}/cart/?user=${userId}&variant=${variant.id}`);
//         const data = await response.json();
//         const cartItems = data.results || data || [];
//         const existingItem = cartItems.find(item => item.variant === variant.id);
//         if (existingItem) setQty(existingItem.quantity);
//       } catch (error) {
//         console.error("Error fetching cart quantity:", error);
//       }
//     };
    
//     fetchCartQuantity();
//   }, [userId, variant.id]);

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
    
//     if (!userId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Login Required',
//         text: 'Please login to add items to cart',
//         confirmButtonColor: '#f76f2f'
//       }).then(() => navigate('/login'));
//       return;
//     }
    
//     if (variant.stock <= 0) {
//       Swal.fire({ icon: 'error', title: 'Out of Stock', text: 'This product is currently out of stock', confirmButtonColor: '#f76f2f' });
//       return;
//     }
    
//     setUpdating(true);
    
//     try {
//       // Check if item already exists in cart
//       const response = await fetch(`${baseurl}/cart/?user=${userId}&variant=${variant.id}`);
//       const data = await response.json();
//       const cartItems = data.results || data || [];
//       const existingItem = cartItems.find(item => item.variant === variant.id);
      
//       if (existingItem) {
//         // Update existing cart item
//         const newQuantity = existingItem.quantity + 1;
//         if (newQuantity > variant.stock) {
//           Swal.fire({ icon: 'error', title: 'Stock Limit Exceeded', text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: '#f76f2f' });
//           return;
//         }
        
//         await fetch(`${baseurl}/cart/${existingItem.id}/`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             user: parseInt(userId),
//             variant: variant.id,
//             quantity: newQuantity
//           })
//         });
//         setQty(newQuantity);
//       } else {
//         // Create new cart item
//         await fetch(`${baseurl}/cart/`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             user: parseInt(userId),
//             variant: variant.id,
//             quantity: 1
//           })
//         });
//         setQty(1);
//       }
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Added to Cart!',
//         text: `${productName} added to cart.`,
//         showConfirmButton: true,
//         showCancelButton: true,
//         confirmButtonText: 'View Cart',
//         cancelButtonText: 'Continue Shopping',
//         confirmButtonColor: '#f76f2f',
//         cancelButtonColor: '#6c757d',
//         timer: 2000,
//         timerProgressBar: true,
//       }).then(result => {
//         if (result.isConfirmed) navigate('/agent-add-to-cart');
//       });
      
//       window.dispatchEvent(new Event('cartUpdated'));
      
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to add item to cart', confirmButtonColor: '#f76f2f' });
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleUpdateQuantity = async (e, newQty) => {
//     e.stopPropagation();
    
//     if (!userId) return;
    
//     if (newQty === 0) {
//       setUpdating(true);
//       try {
//         // Find the cart item ID
//         const response = await fetch(`${baseurl}/cart/?user=${userId}&variant=${variant.id}`);
//         const data = await response.json();
//         const cartItems = data.results || data || [];
//         const existingItem = cartItems.find(item => item.variant === variant.id);
        
//         if (existingItem) {
//           await fetch(`${baseurl}/cart/${existingItem.id}/`, { method: 'DELETE' });
//           setQty(0);
//           Swal.fire({ icon: 'info', title: 'Removed from Cart', showConfirmButton: false, timer: 1500 });
//         }
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//       } finally {
//         setUpdating(false);
//       }
//     } else {
//       if (newQty > variant.stock) {
//         Swal.fire({ icon: 'error', title: 'Stock Limit Exceeded', text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: '#f76f2f' });
//         return;
//       }
      
//       setUpdating(true);
//       try {
//         // Find the cart item ID
//         const response = await fetch(`${baseurl}/cart/?user=${userId}&variant=${variant.id}`);
//         const data = await response.json();
//         const cartItems = data.results || data || [];
//         const existingItem = cartItems.find(item => item.variant === variant.id);
        
//         if (existingItem) {
//           await fetch(`${baseurl}/cart/${existingItem.id}/`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               user: parseInt(userId),
//               variant: variant.id,
//               quantity: newQty
//             })
//           });
//           setQty(newQty);
//         }
//       } catch (error) {
//         console.error("Error updating quantity:", error);
//       } finally {
//         setUpdating(false);
//       }
//     }
    
//     window.dispatchEvent(new Event('cartUpdated'));
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
//         {updating ? (
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
// const AgentHomeSubCategories = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [viewType, setViewType] = useState("category");
//   const [businessId, setBusinessId] = useState(null);
//   const [categoryId, setCategoryId] = useState(null);

//   // The effective category ID used for fetching subcategories in sidebar.
//   // For business view, use the category passed in location state.
//   // For category view, use the URL param id.
//   const [effectiveCategoryId, setEffectiveCategoryId] = useState(null);

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

//   // ── Determine view type & IDs from location state and URL ──────────────────
//   useEffect(() => {
//     const passedBusinessId = location.state?.businessId;
//     const passedBusinessName = location.state?.businessName;
//     const passedCategoryId = location.state?.categoryId;

//     if (passedBusinessId) {
//       // Banner click → business view
//       setViewType("business");
//       setBusinessId(passedBusinessId);
//       setBusinessName(passedBusinessName || "Products");
//       setCategoryId(passedCategoryId || null);
//       setCategoryName(passedBusinessName || "Products");
//       // Use passedCategoryId for sidebar categories, fallback to URL id
//       setEffectiveCategoryId(passedCategoryId || id);
//     } else {
//       // View All click → category view
//       setViewType("category");
//       setCategoryId(id);
//       setBusinessId(null);
//       setEffectiveCategoryId(id);
//     }
//   }, [location.state, id]);

//   // ── FIX: Always fetch categories for sidebar regardless of view type ────────
//   useEffect(() => {
//     if (!effectiveCategoryId) return;

//     const run = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         // Find the current category name (only needed for category view)
//         if (viewType === "category") {
//           const current = allCategories.find(c => c.category_id === parseInt(effectiveCategoryId));
//           setCategoryName(current?.name || "Products");
//         }

//         // Build subcategory tree for sidebar — works for BOTH view types
//         const children = allCategories.filter(
//           c => c.parent === parseInt(effectiveCategoryId) && c.is_active !== false
//         );
//         setCategoryTree(
//           children.map(c => ({ ...c, children: buildCategoryTree(allCategories, c.category_id) }))
//         );
//       } catch (e) {
//         console.error("Error fetching categories:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [effectiveCategoryId, buildCategoryTree, viewType]);

//   // ── Fetch products ──────────────────────────────────────────────────────────
//   // useEffect(() => {
//   //   const fetchProducts = async () => {
//   //     setProductsLoading(true);
//   //     try {
//   //       let results = [];

//   //       if (viewType === "business" && businessId) {
//   //         // Business view: fetch by business ID
//   //         // Also apply any selected subcategory filters on top
//   //         let apiUrl;
//   //         if (selectedCategories.length > 0) {
//   //           // If user picked subcategories, filter by those too
//   //           const promises = selectedCategories.map(async catId => {
//   //             const params = new URLSearchParams({ business: businessId, category_id: catId });
//   //             const res = await fetch(`${baseurl}/products/?${params}`);
//   //             if (!res.ok) return [];
//   //             const data = await res.json();
//   //             return (data.results || data || []);
//   //           });
//   //           const allResults = await Promise.all(promises);
//   //           const flat = allResults.flat();
//   //           results = processProducts(flat);
//   //         } else {
//   //           // No subcategory selected — fetch all products for this business
//   //           const params = new URLSearchParams({ business: businessId });
//   //           apiUrl = `${baseurl}/products/?${params}`;
//   //           const res = await fetch(apiUrl);
//   //           if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//   //           const data = await res.json();
//   //           results = processProducts(data.results || data || []);
//   //         }

//   //       } else if (viewType === "category" && categoryId) {
//   //         // Category view: fetch by category (with subcategory filter if applied)
//   //         const categoriesToFetch = selectedCategories.length === 0
//   //           ? [categoryId]
//   //           : selectedCategories;

//   //         const promises = categoriesToFetch.map(async catId => {
//   //           const params = new URLSearchParams({ category_id: catId, variant_verification_status: "verified" });
//   //           const res = await fetch(`${baseurl}/products/?${params}`);
//   //           if (!res.ok) return [];
//   //           const data = await res.json();
//   //           return data.results || data || [];
//   //         });

//   //         const allResults = await Promise.all(promises);
//   //         results = processProducts(allResults.flat());
//   //       }

//   //       // Deduplicate
//   //       const unique = new Map();
//   //       results.forEach(item => {
//   //         const key = `${item.product.product_id}-${item.variant.id}`;
//   //         if (!unique.has(key)) unique.set(key, item);
//   //       });

//   //       setProducts(Array.from(unique.values()));
//   //     } catch (e) {
//   //       console.error("Error fetching products:", e);
//   //       setProducts([]);
//   //     } finally {
//   //       setProductsLoading(false);
//   //     }
//   //   };

//   //   if ((viewType === "business" && businessId) || (viewType === "category" && categoryId)) {
//   //     fetchProducts();
//   //   }
//   // }, [categoryId, selectedCategories, viewType, businessId]);


//   // Fetch products based on view type
// useEffect(() => {
//   const fetchProducts = async () => {
//     setProductsLoading(true);
//     try {
//       let results = [];

//       if (viewType === "business" && businessId) {
//         // ✅ Business view: Always include variant_verification_status=verified
//         const params = new URLSearchParams({ 
//           business: businessId,
//           variant_verification_status: "verified"
//         });
        
//         // If subcategories are selected, add them to the filter
//         if (selectedCategories.length > 0) {
//           // Fetch products for each selected subcategory
//           const promises = selectedCategories.map(async catId => {
//             const catParams = new URLSearchParams({ 
//               business: businessId,
//               category_id: catId,
//               variant_verification_status: "verified"
//             });
//             const res = await fetch(`${baseurl}/products/?${catParams}`);
//             if (!res.ok) return [];
//             const data = await res.json();
//             return data.results || data || [];
//           });
//           const allResults = await Promise.all(promises);
//           const flat = allResults.flat();
//           results = processProducts(flat);
//         } else {
//           // Fetch all products for this business with verified variants
//           const apiUrl = `${baseurl}/products/?${params}`;
//           console.log("📦 Fetching business products:", apiUrl);
          
//           const res = await fetch(apiUrl);
//           if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          
//           const data = await res.json();
//           console.log("✅ Business products loaded:", data.results?.length || data?.length || 0, "products");
//           results = processProducts(data.results || data || []);
//         }

//       } else if (viewType === "category" && categoryId) {
//         // Category view: fetch by category
//         const categoriesToFetch = selectedCategories.length === 0
//           ? [categoryId]
//           : selectedCategories;

//         const promises = categoriesToFetch.map(async catId => {
//           const params = new URLSearchParams({ 
//             category_id: catId, 
//             variant_verification_status: "verified" 
//           });
//           const res = await fetch(`${baseurl}/products/?${params}`);
//           if (!res.ok) return [];
//           const data = await res.json();
//           return data.results || data || [];
//         });

//         const allResults = await Promise.all(promises);
//         results = processProducts(allResults.flat());
//       }

//       // Deduplicate products
//       const unique = new Map();
//       results.forEach(item => {
//         const key = `${item.product.product_id}-${item.variant.id}`;
//         if (!unique.has(key)) unique.set(key, item);
//       });

//       setProducts(Array.from(unique.values()));
      
//     } catch (e) {
//       console.error("❌ Error fetching products:", e);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   };

//   if ((viewType === "business" && businessId) || (viewType === "category" && categoryId)) {
//     fetchProducts();
//   }
// }, [categoryId, selectedCategories, viewType, businessId]);

//   // ── Helper: flatten product list into {product, variant} pairs ─────────────
//   const processProducts = (productsList) => {
//     return productsList.flatMap(product => {
//       if (product.variants && product.variants.length > 0) {
//         return product.variants.map(variant => ({ product, variant }));
//       } else if (product.is_active !== false) {
//         return [{
//           product,
//           variant: {
//             id: product.product_id,
//             sku: product.product_id,
//             mrp: product.mrp || "0.00",
//             selling_price: product.selling_price || "0.00",
//             stock: product.stock || 0,
//             attributes: {},
//             media: product.media || [],
//             distribution_commission: product.distribution_commission || "0.00"
//           }
//         }];
//       }
//       return [];
//     });
//   };

//   // ── Filter + Sort ──────────────────────────────────────────────────────────
//   const filteredProducts = useMemo(() => {
//     let list = [...products];

//     if (searchTerm.trim()) {
//       const t = searchTerm.toLowerCase();
//       list = list.filter(i =>
//         i.product.product_name?.toLowerCase().includes(t) ||
//         i.product.brand?.toLowerCase().includes(t)
//       );
//     }

//     if (selectedPriceRanges.length > 0) {
//       list = list.filter(i => {
//         const p = parseFloat(i.variant.selling_price);
//         return selectedPriceRanges.some(r => {
//           if (r === "10000+") return p >= 10000;
//           const [mn, mx] = r.split("-").map(Number);
//           return p >= mn && p <= mx;
//         });
//       });
//     }

//     if (selectedDiscountRanges.length > 0) {
//       list = list.filter(i => {
//         const m = parseFloat(i.variant.mrp);
//         const s = parseFloat(i.variant.selling_price);
//         const d = m > 0 && s < m ? Math.round(((m - s) / m) * 100) : 0;
//         return selectedDiscountRanges.some(r => {
//           if (r === "60+") return d >= 60;
//           const [mn, mx] = r.split("-").map(Number);
//           return d >= mn && d <= mx;
//         });
//       });
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
//   }, [products, searchTerm, selectedPriceRanges, selectedDiscountRanges, sortBy]);

//   useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   // filterProps — always passed to sidebar regardless of viewType
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

//   // Display title: business name for banner clicks, category name for view-all
//   const displayTitle = viewType === "business" ? businessName : categoryName;

//   return (
//     <>
//       <AgentNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="msub-mobile">
//           <div className="msub-mobile-topbar">
//             <button className="msub-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="msub-mobile-title">{displayTitle}</h1>
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
//             {/* ✅ FIX: Always show filter button — removed viewType === "category" condition */}
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

//           {/* ✅ FIX: Always show filter bottom sheet — removed viewType === "category" condition */}
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
//               <h1 className="msub-desktop-title">{displayTitle}</h1>
//             </div>
//           </div>

//           <div className="msub-desktop-body">
//             {/* ✅ FIX: Always show sidebar — removed viewType === "category" condition */}
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

//             {/* ✅ FIX: Always use msub-main (with sidebar) — removed msub-main-full for business view */}
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

// export default AgentHomeSubCategories;



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
// const AgentHomeSubCategories = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [viewType, setViewType] = useState("category");
//   const [businessId, setBusinessId] = useState(null);
//   const [categoryId, setCategoryId] = useState(null);
//   const [effectiveCategoryId, setEffectiveCategoryId] = useState(null);

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

//   // Determine view type & IDs from location state and URL
//   useEffect(() => {
//     const passedBusinessId = location.state?.businessId;
//     const passedBusinessName = location.state?.businessName;
//     const passedCategoryId = location.state?.categoryId;

//     if (passedBusinessId) {
//       setViewType("business");
//       setBusinessId(passedBusinessId);
//       setBusinessName(passedBusinessName || "Products");
//       setCategoryId(passedCategoryId || null);
//       setCategoryName(passedBusinessName || "Products");
//       setEffectiveCategoryId(passedCategoryId || id);
//     } else {
//       setViewType("category");
//       setCategoryId(id);
//       setBusinessId(null);
//       setEffectiveCategoryId(id);
//     }
//   }, [location.state, id]);

//   // Fetch categories for sidebar
//   useEffect(() => {
//     if (!effectiveCategoryId) return;

//     const run = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         if (viewType === "category") {
//           const current = allCategories.find(c => c.category_id === parseInt(effectiveCategoryId));
//           setCategoryName(current?.name || "Products");
//         }

//         const children = allCategories.filter(
//           c => c.parent === parseInt(effectiveCategoryId) && c.is_active !== false
//         );
//         setCategoryTree(
//           children.map(c => ({ ...c, children: buildCategoryTree(allCategories, c.category_id) }))
//         );
//       } catch (e) {
//         console.error("Error fetching categories:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [effectiveCategoryId, buildCategoryTree, viewType]);

//   // Fetch products
//   // const fetchProducts = useCallback(async () => {
//   //   setProductsLoading(true);
//   //   try {
//   //     const userId = localStorage.getItem("user_id");
//   //     const params = new URLSearchParams({ variant_verification_status: "verified" });

//   //     if (userId) {
//   //       params.append("exclude_user_id", userId);
//   //     }

//   //     if (viewType === "business" && businessId) {
//   //       params.append("business", businessId);
//   //     } else if (viewType === "category" && categoryId) {
//   //       const categoriesToFetch = selectedCategories.length === 0
//   //         ? [categoryId]
//   //         : selectedCategories;
        
//   //       if (categoriesToFetch.length > 0) {
//   //         params.append("category_id", categoriesToFetch.join(","));
//   //       }
//   //     }

//   //     if (selectedPriceRanges.length > 0) {
//   //       selectedPriceRanges.forEach(r => params.append("price_range", r));
//   //     }

//   //     if (selectedDiscountRanges.length > 0) {
//   //       selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//   //     }

//   //     const url = `${baseurl}/products/?${params}`;
//   //     const res = await fetch(url);
//   //     const data = await res.json();
      
//   //     const items = [];
//   //     (data.results || []).forEach(product => {
//   //       if (product.variants?.length > 0) {
//   //         product.variants.forEach(variant => items.push({ product, variant }));
//   //       } else if (product.is_active !== false) {
//   //         items.push({
//   //           product,
//   //           variant: {
//   //             id: product.product_id,
//   //             sku: product.product_id,
//   //             mrp: product.mrp || "0.00",
//   //             selling_price: product.selling_price || "0.00",
//   //             stock: product.stock || 0,
//   //             attributes: {},
//   //             media: product.media || [],
//   //             distribution_commission: product.distribution_commission || "0.00"
//   //           }
//   //         });
//   //       }
//   //     });
      
//   //     setProducts(items);
//   //   } catch (e) {
//   //     console.error("Error fetching products:", e);
//   //     setProducts([]);
//   //   } finally {
//   //     setProductsLoading(false);
//   //   }
//   // }, [viewType, businessId, categoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   const fetchProducts = useCallback(async () => {
//   setProductsLoading(true);
//   try {
//     const userId = localStorage.getItem("user_id");
//     const params = new URLSearchParams();
    
//     // Add variant verification status
//     params.append("variant_verification_status", "verified");

//     // Add business ID if we're in business view
//     if (viewType === "business" && businessId) {
//       params.append("business", businessId);
//     } else if (viewType === "category" && categoryId) {
//       // For category view, we don't need business parameter
//       // Instead, we use category filtering
//       const categoriesToFetch = selectedCategories.length === 0
//         ? [categoryId]
//         : selectedCategories;
      
//       if (categoriesToFetch.length > 0) {
//         params.append("category_id", categoriesToFetch.join(","));
//       }
//     }

//     // Add user exclusion (to exclude current user's products if needed)
//     if (userId) {
//       params.append("exclude_user_id", userId);
//     }

//     // Add price range filters
//     if (selectedPriceRanges.length > 0) {
//       selectedPriceRanges.forEach(r => params.append("price_range", r));
//     }

//     // Add discount range filters
//     if (selectedDiscountRanges.length > 0) {
//       selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//     }

//     // Build the complete URL
//     const url = `${baseurl}/products/?${params.toString()}`;
    
//     console.log("Fetching products from:", url); // For debugging
    
//     const res = await fetch(url);
//     const data = await res.json();
    
//     const items = [];
//     (data.results || []).forEach(product => {
//       if (product.variants?.length > 0) {
//         product.variants.forEach(variant => items.push({ product, variant }));
//       } else if (product.is_active !== false) {
//         items.push({
//           product,
//           variant: {
//             id: product.product_id,
//             sku: product.product_id,
//             mrp: product.mrp || "0.00",
//             selling_price: product.selling_price || "0.00",
//             stock: product.stock || 0,
//             attributes: {},
//             media: product.media || [],
//             distribution_commission: product.distribution_commission || "0.00"
//           }
//         });
//       }
//     });
    
//     setProducts(items);
//   } catch (e) {
//     console.error("Error fetching products:", e);
//     setProducts([]);
//   } finally {
//     setProductsLoading(false);
//   }
// }, [viewType, businessId, categoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

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

//   const displayTitle = viewType === "business" ? businessName : categoryName;

//   return (
//     <>
//       <AgentNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="msub-mobile">
//           <div className="msub-mobile-topbar">
//             <button className="msub-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="msub-mobile-title">{displayTitle}</h1>
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
//               <h1 className="msub-desktop-title">{displayTitle}</h1>
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

// export default AgentHomeSubCategories;




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
// import "./style.css"
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
//       Swal.fire({ icon: "warning", title: "Login Required", text: "Please login to add items to cart", confirmButtonColor: "#f76f2f" });
//       return;
//     }
//     if (variant.stock <= 0) {
//       Swal.fire({ icon: "error", title: "Out of Stock", text: "This product is currently out of stock", confirmButtonColor: "#f76f2f" });
//       return;
//     }
//     setLoading(true);
//     try {
//       if (cartItemId) {
//         const newQty = qty + 1;
//         if (newQty > variant.stock) {
//           Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
//           return;
//         }
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
//         setQty(newQty);
//       } else {
//         const response = await axios.post(`${baseurl}/cart/`, { user: parseInt(userId), variant: variant.id, quantity: 1 });
//         setQty(1);
//         setCartItemId(response.data.id);
//       }
//       window.dispatchEvent(new Event("cartUpdated"));
//       Swal.fire({
//         icon: "success", title: "Added to Cart!", text: `${productName} has been added to your cart.`,
//         showConfirmButton: true, showCancelButton: true,
//         confirmButtonText: "View Cart", cancelButtonText: "Continue Shopping",
//         confirmButtonColor: "#f76f2f", cancelButtonColor: "#6c757d",
//         timer: 2000, timerProgressBar: true,
//       }).then((result) => { if (result.isConfirmed) navigate("/agent-add-to-cart"); });
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to add to cart. Please try again.", confirmButtonColor: "#f76f2f" });
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
//         Swal.fire({ icon: "info", title: "Removed from Cart", text: `${productName} has been removed.`, showConfirmButton: false, timer: 1500, timerProgressBar: true });
//         window.dispatchEvent(new Event("cartUpdated"));
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (newQty > variant.stock) {
//         Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
//         return;
//       }
//       setLoading(true);
//       try {
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
//         setQty(newQty);
//         window.dispatchEvent(new Event("cartUpdated"));
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
//           <div className="msub-spinner-sm" style={{ margin: "0 auto" }} />
//         ) : qty === 0 ? (
//           <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
//             {variant.stock <= 0 ? "OUT OF STOCK" : "ADD"}
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
// const AgentHomeSubCategories = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [viewType, setViewType] = useState("category");
//   const [businessId, setBusinessId] = useState(null);
//   const [categoryId, setCategoryId] = useState(null);
//   const [effectiveCategoryId, setEffectiveCategoryId] = useState(null);

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

//   // ✅ FIX 1: Determine view type & IDs correctly
//   // Business card click  → viewType="business", businessId set, effectiveCategoryId = passed categoryId (may be null)
//   // View All click       → viewType="category", categoryId = URL id, effectiveCategoryId = URL id
//   useEffect(() => {
//     const passedViewType   = location.state?.viewType;
//     const passedBusinessId = location.state?.businessId;
//     const passedBusinessName = location.state?.businessName;
//     const passedCategoryId = location.state?.categoryId;
//     const passedCategoryName = location.state?.categoryName;

//     if (passedViewType === "business" && passedBusinessId) {
//       // ── Business view ──────────────────────────────────────────────────────
//       setViewType("business");
//       setBusinessId(passedBusinessId);
//       setBusinessName(passedBusinessName || "Products");
//       setCategoryName(passedBusinessName || "Products");

//       // Only use a real categoryId for the sidebar — never use the URL id here
//       // because the URL id IS the businessId in this route
//       const realCategoryId = passedCategoryId || null;
//       setCategoryId(realCategoryId);
//       setEffectiveCategoryId(realCategoryId); // may be null → sidebar skipped
//     } else {
//       // ── Category view (View All) ────────────────────────────────────────────
//       setViewType("category");
//       setBusinessId(null);
//       setCategoryId(id);               // URL id is a real categoryId here
//       setEffectiveCategoryId(id);
//       if (passedCategoryName) setCategoryName(passedCategoryName);
//     }
//   }, [location.state, id]);

//   // ✅ FIX 2: Fetch sidebar category tree using effectiveCategoryId
//   // Guard: if effectiveCategoryId is null (business view without a categoryId) → skip
//   useEffect(() => {
//     if (!effectiveCategoryId) {
//       setLoading(false);
//       setCategoryTree([]);
//       return;
//     }

//     const run = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         // Set category name only in category view (business view name comes from state)
//         if (viewType === "category") {
//           const current = allCategories.find(
//             c => c.category_id === parseInt(effectiveCategoryId)
//           );
//           if (current?.name) setCategoryName(current.name);
//         }

//         const children = allCategories.filter(
//           c => c.parent === parseInt(effectiveCategoryId) && c.is_active !== false
//         );
//         setCategoryTree(
//           children.map(c => ({ ...c, children: buildCategoryTree(allCategories, c.category_id) }))
//         );
//       } catch (e) {
//         console.error("Error fetching categories:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [effectiveCategoryId, buildCategoryTree, viewType]);

//   // ✅ FIX 3: Fetch products — strict separation of business vs category view
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const userId = localStorage.getItem("user_id");
//       const params = new URLSearchParams();
//       params.append("variant_verification_status", "verified");

//       if (viewType === "business" && businessId) {
//         // ── Business view: fetch ONLY this business's products ──────────────
//         // Do NOT add any category filter here — just the businessId
//         params.append("business", businessId);
//       } else if (viewType === "category" && categoryId) {
//         // ── Category view: fetch products by category (+ any selected subcats)
//         const categoriesToFetch =
//           selectedCategories.length > 0 ? selectedCategories : [categoryId];
//         params.append("category_id", categoriesToFetch.join(","));
//       } else {
//         // Neither condition met — nothing to fetch
//         setProducts([]);
//         setProductsLoading(false);
//         return;
//       }

//       // Exclude current user's own products in both views
//       if (userId) {
//         params.append("exclude_user_id", userId);
//       }

//       // Price / discount filters apply in both views
//       if (selectedPriceRanges.length > 0) {
//         selectedPriceRanges.forEach(r => params.append("price_range", r));
//       }
//       if (selectedDiscountRanges.length > 0) {
//         selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       }

//       const url = `${baseurl}/products/?${params.toString()}`;
//       console.log("Fetching products from:", url);

//       const res = await fetch(url);
//       const data = await res.json();

//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else if (product.is_active !== false) {
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
//             },
//           });
//         }
//       });

//       setProducts(items);
//     } catch (e) {
//       console.error("Error fetching products:", e);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [viewType, businessId, categoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     // Only fetch once viewType & IDs are resolved (not both null at start)
//     if (viewType === "business" && !businessId) return;
//     if (viewType === "category" && !categoryId) return;
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
//       case "price_asc":     list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc":    list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc":      list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
//       case "name_desc":     list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
//       default:              list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
//     }

//     return list;
//   }, [products, searchTerm, sortBy]);

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading,
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

//   // Display title: business name for business view, category name for category view
//   const displayTitle = viewType === "business" ? businessName : categoryName;

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
//             <h1 className="msub-mobile-title">{displayTitle}</h1>
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
//       {/* {!isMobile && (
//         <div className="msub-desktop">
//           <div className="msub-desktop-header">
//             <div className="msub-desktop-header-inner">
//               <button className="msub-back-desktop" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={17} /><span>Back</span>
//               </button>
//               <h1 className="msub-desktop-title">{displayTitle}</h1>
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
//       )} */}
//       {/* ======= DESKTOP ======= */}
// {!isMobile && (
//   <div className="msub-desktop">
//     {/* REMOVED the separate header section since AgentNavbar already handles the top bar */}
//     <div className="msub-desktop-body">
//       <aside className="msub-sidebar">
//         <div className="msub-sidebar-top">
//           <span className="msub-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//           {activeFilterCount > 0 && (
//             <button className="msub-sidebar-clearall" onClick={clearAll}>
//               Clear ({activeFilterCount})
//             </button>
//           )}
//         </div>
//         <FilterContent {...filterProps} isSidebar={true} />
//       </aside>

//       <main className="msub-main">
//         <div className="msub-main-header">
//           <h1 className="msub-desktop-title">{displayTitle}</h1>
//           <button className="msub-back-desktop" onClick={() => navigate(-1)}>
//             <ArrowLeft size={17} /><span>Back</span>
//           </button>
//         </div>
        
//         <div className="msub-main-topbar">
//           <div className="msub-desktop-search">
//             <Search size={15} className="msub-search-ico" />
//             <input 
//               type="text" 
//               placeholder="Search products..." 
//               className="msub-search-input"
//               value={searchTerm} 
//               onChange={e => setSearchTerm(e.target.value)} 
//             />
//             {searchTerm && (
//               <button className="msub-search-clear" onClick={() => setSearchTerm("")}>
//                 <X size={14} />
//               </button>
//             )}
//           </div>
//           <div className="msub-sort-wrap">
//             <button className="msub-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             {showSortDropdown && (
//               <>
//                 <div className="msub-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                 <div className="msub-sort-dropdown">
//                   <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {activeFilterCount > 0 && (
//           <ActiveChips
//             selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//             selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//             clearAll={clearAll}
//           />
//         )}

//         <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
//         {productSection}
//       </main>
//     </div>
//   </div>
// )}
//     </>
//   );
// };

// export default AgentHomeSubCategories;



//=================================================



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
// import "./style.css"
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
//       Swal.fire({ icon: "warning", title: "Login Required", text: "Please login to add items to cart", confirmButtonColor: "#f76f2f" });
//       return;
//     }
//     if (variant.stock <= 0) {
//       Swal.fire({ icon: "error", title: "Out of Stock", text: "This product is currently out of stock", confirmButtonColor: "#f76f2f" });
//       return;
//     }
//     setLoading(true);
//     try {
//       if (cartItemId) {
//         const newQty = qty + 1;
//         if (newQty > variant.stock) {
//           Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
//           return;
//         }
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
//         setQty(newQty);
//       } else {
//         const response = await axios.post(`${baseurl}/cart/`, { user: parseInt(userId), variant: variant.id, quantity: 1 });
//         setQty(1);
//         setCartItemId(response.data.id);
//       }
//       window.dispatchEvent(new Event("cartUpdated"));
//       Swal.fire({
//         icon: "success", title: "Added to Cart!", text: `${productName} has been added to your cart.`,
//         showConfirmButton: true, showCancelButton: true,
//         confirmButtonText: "View Cart", cancelButtonText: "Continue Shopping",
//         confirmButtonColor: "#f76f2f", cancelButtonColor: "#6c757d",
//         timer: 2000, timerProgressBar: true,
//       }).then((result) => { if (result.isConfirmed) navigate("/agent-add-to-cart"); });
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to add to cart. Please try again.", confirmButtonColor: "#f76f2f" });
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
//         Swal.fire({ icon: "info", title: "Removed from Cart", text: `${productName} has been removed.`, showConfirmButton: false, timer: 1500, timerProgressBar: true });
//         window.dispatchEvent(new Event("cartUpdated"));
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (newQty > variant.stock) {
//         Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
//         return;
//       }
//       setLoading(true);
//       try {
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
//         setQty(newQty);
//         window.dispatchEvent(new Event("cartUpdated"));
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
//           <div className="msub-spinner-sm" style={{ margin: "0 auto" }} />
//         ) : qty === 0 ? (
//           <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
//             {variant.stock <= 0 ? "OUT OF STOCK" : "ADD"}
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
// const AgentHomeSubCategories = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [viewType, setViewType] = useState("category");
//   const [businessId, setBusinessId] = useState(null);
//   const [categoryId, setCategoryId] = useState(null);
//   const [effectiveCategoryId, setEffectiveCategoryId] = useState(null);

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

//   // ✅ FIX 1: Determine view type & IDs correctly
//   // Business card click  → viewType="business", businessId set, effectiveCategoryId = passed categoryId (may be null)
//   // View All click       → viewType="category", categoryId = URL id, effectiveCategoryId = URL id
//   useEffect(() => {
//     const passedViewType   = location.state?.viewType;
//     const passedBusinessId = location.state?.businessId;
//     const passedBusinessName = location.state?.businessName;
//     const passedCategoryId = location.state?.categoryId;
//     const passedCategoryName = location.state?.categoryName;

//     if (passedViewType === "business" && passedBusinessId) {
//       // ── Business view ──────────────────────────────────────────────────────
//       setViewType("business");
//       setBusinessId(passedBusinessId);
//       setBusinessName(passedBusinessName || "Products");
//       setCategoryName(passedBusinessName || "Products");

//       // Only use a real categoryId for the sidebar — never use the URL id here
//       // because the URL id IS the businessId in this route
//       const realCategoryId = passedCategoryId || null;
//       setCategoryId(realCategoryId);
//       setEffectiveCategoryId(realCategoryId); // may be null → sidebar skipped
//     } else {
//       // ── Category view (View All) ────────────────────────────────────────────
//       setViewType("category");
//       setBusinessId(null);
//       setCategoryId(id);               // URL id is a real categoryId here
//       setEffectiveCategoryId(id);
//       if (passedCategoryName) setCategoryName(passedCategoryName);
//     }
//   }, [location.state, id]);

//   // ✅ FIX 2: Fetch sidebar category tree using effectiveCategoryId
//   // Guard: if effectiveCategoryId is null (business view without a categoryId) → skip
//   useEffect(() => {
//     if (!effectiveCategoryId) {
//       setLoading(false);
//       setCategoryTree([]);
//       return;
//     }

//     const run = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         // Set category name only in category view (business view name comes from state)
//         if (viewType === "category") {
//           const current = allCategories.find(
//             c => c.category_id === parseInt(effectiveCategoryId)
//           );
//           if (current?.name) setCategoryName(current.name);
//         }

//         const children = allCategories.filter(
//           c => c.parent === parseInt(effectiveCategoryId) && c.is_active !== false
//         );
//         setCategoryTree(
//           children.map(c => ({ ...c, children: buildCategoryTree(allCategories, c.category_id) }))
//         );
//       } catch (e) {
//         console.error("Error fetching categories:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [effectiveCategoryId, buildCategoryTree, viewType]);

//   // ✅ FIX 3: Fetch products — strict separation of business vs category view
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const userId = localStorage.getItem("user_id");
//       const params = new URLSearchParams();
//       params.append("variant_verification_status", "verified");

//       if (viewType === "business" && businessId) {
//         // ── Business view: fetch ONLY this business's products ──────────────
//         // Do NOT add any category filter here — just the businessId
//         params.append("business", businessId);
//       } else if (viewType === "category" && categoryId) {
//         // ── Category view: fetch products by category (+ any selected subcats)
//         const categoriesToFetch =
//           selectedCategories.length > 0 ? selectedCategories : [categoryId];
//         params.append("category_id", categoriesToFetch.join(","));
//       } else {
//         // Neither condition met — nothing to fetch
//         setProducts([]);
//         setProductsLoading(false);
//         return;
//       }

//       // Exclude current user's own products in both views
//       if (userId) {
//         params.append("exclude_user_id", userId);
//       }

//       // Price / discount filters apply in both views
//       if (selectedPriceRanges.length > 0) {
//         selectedPriceRanges.forEach(r => params.append("price_range", r));
//       }
//       if (selectedDiscountRanges.length > 0) {
//         selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       }

//       const url = `${baseurl}/products/?${params.toString()}`;
//       console.log("Fetching products from:", url);

//       const res = await fetch(url);
//       const data = await res.json();

//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else if (product.is_active !== false) {
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
//             },
//           });
//         }
//       });

//       setProducts(items);
//     } catch (e) {
//       console.error("Error fetching products:", e);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [viewType, businessId, categoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     // Only fetch once viewType & IDs are resolved (not both null at start)
//     if (viewType === "business" && !businessId) return;
//     if (viewType === "category" && !categoryId) return;
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   // Filter + Sort (removed search filter)
//   const filteredProducts = useMemo(() => {
//     let list = [...products];

//     const disc = i => {
//       const m = parseFloat(i.variant.mrp);
//       const s = parseFloat(i.variant.selling_price);
//       return m > 0 ? ((m - s) / m) * 100 : 0;
//     };

//     switch (sortBy) {
//       case "price_asc":     list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc":    list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc":      list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
//       case "name_desc":     list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
//       default:              list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
//     }

//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading,
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

//   // Display title: business name for business view, category name for category view
//   const displayTitle = viewType === "business" ? businessName : categoryName;

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
//             <h1 className="msub-mobile-title">{displayTitle}</h1>
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
//               <div className="msub-main-header">
//                 <h1 className="msub-desktop-title">{displayTitle}</h1>
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

// export default AgentHomeSubCategories;


//===============================================



// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info
// } from "lucide-react";
// import { baseurl } from "../../BaseURL/BaseURL";
// import Swal from "sweetalert2";
// import axios from "axios";
// import "./style.css"

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

// // ============= Commission Tooltip =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;
//   const commissionAmount = parseFloat(distributionCommission) || 0;
//   const list = commissions.map(c => ({
//     level: c.level_no,
//     amount: (commissionAmount * parseFloat(c.percentage)) / 100,
//   }));
//   return (
//     <div className="msub-commission-tooltip">
//       {list.map(c => (
//         <div key={c.level} className="msub-commission-row">
//           <span>Team {c.level}:</span>
//           <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//         </div>
//       ))}
//     </div>
//   );
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

// // ============= Product Card with Payout =============
// const ProductCard = ({ product, variant, navigate, commissionData }) => {
//   const [qty, setQty] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [cartItemId, setCartItemId] = useState(null);
//   const [showPayout, setShowPayout] = useState(false);

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
//   const distributionCommission = parseFloat(variant.distribution_commission || 0);
//   const variantDisplay = variant.attributes ? Object.values(variant.attributes).join(" • ") : "";
//   const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
//   const url = `/agent-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   // Function to refresh cart status from server
//   const refreshCartStatus = async () => {
//     if (!userId) return;
    
//     try {
//       const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
//       const cartResponse = response.data;
//       let userCartItems = [];
      
//       if (cartResponse.results && Array.isArray(cartResponse.results)) {
//         userCartItems = cartResponse.results;
//       } else if (Array.isArray(cartResponse)) {
//         userCartItems = cartResponse;
//       }
      
//       const existingItem = userCartItems.find(item => item.variant === variant.id);
//       if (existingItem) {
//         setQty(existingItem.quantity);
//         setCartItemId(existingItem.id);
//       } else {
//         setQty(0);
//         setCartItemId(null);
//       }
//     } catch (error) {
//       console.error("Error refreshing cart status:", error);
//     }
//   };

//   // Check if item is in cart with abort controller
//   useEffect(() => {
//     const abortController = new AbortController();
    
//     const checkCartStatus = async () => {
//       if (!userId) return;
      
//       try {
//         const response = await axios.get(`${baseurl}/cart/?user=${userId}`, {
//           signal: abortController.signal
//         });
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
//         if (error.name !== 'AbortError') {
//           console.error("Error checking cart status:", error);
//         }
//       }
//     };
    
//     checkCartStatus();
    
//     return () => {
//       abortController.abort();
//     };
//   }, [userId, variant.id]);

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
//     if (!userId) {
//       Swal.fire({ icon: "warning", title: "Login Required", text: "Please login to add items to cart", confirmButtonColor: "#f76f2f" });
//       return;
//     }
//     if (variant.stock <= 0) {
//       Swal.fire({ icon: "error", title: "Out of Stock", text: "This product is currently out of stock", confirmButtonColor: "#f76f2f" });
//       return;
//     }
//     setLoading(true);
//     try {
//       if (cartItemId) {
//         const newQty = qty + 1;
//         if (newQty > variant.stock) {
//           Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
//           return;
//         }
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
//         await refreshCartStatus();
//       } else {
//         const response = await axios.post(`${baseurl}/cart/`, { user: parseInt(userId), variant: variant.id, quantity: 1 });
//         await refreshCartStatus();
//       }
//       window.dispatchEvent(new Event("cartUpdated"));
//       Swal.fire({
//         icon: "success", title: "Added to Cart!", text: `${productName} has been added to your cart.`,
//         showConfirmButton: true, showCancelButton: true,
//         confirmButtonText: "View Cart", cancelButtonText: "Continue Shopping",
//         confirmButtonColor: "#f76f2f", cancelButtonColor: "#6c757d",
//         timer: 2000, timerProgressBar: true,
//       }).then((result) => { if (result.isConfirmed) navigate("/agent-add-to-cart"); });
//     } catch (error) {
//       console.error("Error adding to cart:", error);
      
//       let errorMessage = 'Failed to add to cart. Please try again.';
//       if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }
      
//       Swal.fire({ icon: "error", title: "Error", text: errorMessage, confirmButtonColor: "#f76f2f" });
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
//         await refreshCartStatus();
//         Swal.fire({ icon: "info", title: "Removed from Cart", text: `${productName} has been removed.`, showConfirmButton: false, timer: 1500, timerProgressBar: true });
//         window.dispatchEvent(new Event("cartUpdated"));
//       } catch (error) {
//         console.error("Error removing from cart:", error);
//         Swal.fire({ icon: "error", title: "Error", text: "Failed to remove from cart. Please try again.", confirmButtonColor: "#f76f2f" });
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       if (newQty > variant.stock) {
//         Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
//         return;
//       }
//       setLoading(true);
//       try {
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
//         await refreshCartStatus();
//         window.dispatchEvent(new Event("cartUpdated"));
//       } catch (error) {
//         console.error("Error updating cart:", error);
        
//         let errorMessage = 'Failed to update cart. Please try again.';
//         if (error.response?.data?.error) {
//           errorMessage = error.response.data.error;
//         } else if (error.response?.data?.message) {
//           errorMessage = error.response.data.message;
//         }
        
//         Swal.fire({ icon: "error", title: "Error", text: errorMessage, confirmButtonColor: "#f76f2f" });
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
//           <div className="msub-spinner-sm" style={{ margin: "0 auto" }} />
//         ) : qty === 0 ? (
//           <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
//             {variant.stock <= 0 ? "OUT OF STOCK" : "ADD"}
//           </button>
//         ) : (
//           <div className="msub-qty-control">
//             <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty - 1)}>−</button>
//             <span className="msub-qty-value">{qty}</span>
//             <button className="msub-qty-btn" onClick={(e) => handleUpdateQuantity(e, qty + 1)} disabled={qty >= variant.stock}>+</button>
//           </div>
//         )}

//         {/* PAYOUT button */}
//         <div className="msub-payout-wrap"
//           onMouseEnter={() => setShowPayout(true)}
//           onMouseLeave={() => setShowPayout(false)}>
//           <button className="msub-payout-btn">
//             <Info size={14} /> PAYOUT
//           </button>
//           <CommissionTooltip
//             show={showPayout}
//             commissions={commissionData}
//             distributionCommission={distributionCommission}
//           />
//         </div>
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
// const AgentHomeSubCategories = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [viewType, setViewType] = useState("category");
//   const [businessId, setBusinessId] = useState(null);
//   const [categoryId, setCategoryId] = useState(null);
//   const [effectiveCategoryId, setEffectiveCategoryId] = useState(null);
//   const [commissionData, setCommissionData] = useState([]);

//   const [sortBy, setSortBy] = useState("default");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showSortSheet, setShowSortSheet] = useState(false);
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

//   const PAGE_SIZE = 12;

//   // Fetch commission data
//   useEffect(() => {
//     const fetchCommissions = async () => {
//       try {
//         const res = await fetch(`${baseurl}/commissions-master/`);
//         const data = await res.json();
//         setCommissionData(data.results || []);
//       } catch (e) { 
//         console.error("Error fetching commission data:", e); 
//       }
//     };
//     fetchCommissions();
//   }, []);

//   const buildCategoryTree = useCallback((cats, parentId = null) =>
//     cats.filter(c => c.parent === parentId)
//       .map(c => ({ ...c, children: buildCategoryTree(cats, c.category_id) })), []);

//   // ✅ FIX 1: Determine view type & IDs correctly
//   // Business card click  → viewType="business", businessId set, effectiveCategoryId = passed categoryId (may be null)
//   // View All click       → viewType="category", categoryId = URL id, effectiveCategoryId = URL id
//   useEffect(() => {
//     const passedViewType   = location.state?.viewType;
//     const passedBusinessId = location.state?.businessId;
//     const passedBusinessName = location.state?.businessName;
//     const passedCategoryId = location.state?.categoryId;
//     const passedCategoryName = location.state?.categoryName;

//     if (passedViewType === "business" && passedBusinessId) {
//       // ── Business view ──────────────────────────────────────────────────────
//       setViewType("business");
//       setBusinessId(passedBusinessId);
//       setBusinessName(passedBusinessName || "Products");
//       setCategoryName(passedBusinessName || "Products");

//       // Only use a real categoryId for the sidebar — never use the URL id here
//       // because the URL id IS the businessId in this route
//       const realCategoryId = passedCategoryId || null;
//       setCategoryId(realCategoryId);
//       setEffectiveCategoryId(realCategoryId); // may be null → sidebar skipped
//     } else {
//       // ── Category view (View All) ────────────────────────────────────────────
//       setViewType("category");
//       setBusinessId(null);
//       setCategoryId(id);               // URL id is a real categoryId here
//       setEffectiveCategoryId(id);
//       if (passedCategoryName) setCategoryName(passedCategoryName);
//     }
//   }, [location.state, id]);

//   // ✅ FIX 2: Fetch sidebar category tree using effectiveCategoryId
//   // Guard: if effectiveCategoryId is null (business view without a categoryId) → skip
//   useEffect(() => {
//     if (!effectiveCategoryId) {
//       setLoading(false);
//       setCategoryTree([]);
//       return;
//     }

//     const run = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const allCategories = data.results || data || [];

//         // Set category name only in category view (business view name comes from state)
//         if (viewType === "category") {
//           const current = allCategories.find(
//             c => c.category_id === parseInt(effectiveCategoryId)
//           );
//           if (current?.name) setCategoryName(current.name);
//         }

//         const children = allCategories.filter(
//           c => c.parent === parseInt(effectiveCategoryId) && c.is_active !== false
//         );
//         setCategoryTree(
//           children.map(c => ({ ...c, children: buildCategoryTree(allCategories, c.category_id) }))
//         );
//       } catch (e) {
//         console.error("Error fetching categories:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [effectiveCategoryId, buildCategoryTree, viewType]);

//   // ✅ FIX 3: Fetch products — strict separation of business vs category view
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const userId = localStorage.getItem("user_id");
//       const params = new URLSearchParams();
//       params.append("variant_verification_status", "verified");

//       if (viewType === "business" && businessId) {
//         // ── Business view: fetch ONLY this business's products ──────────────
//         // Do NOT add any category filter here — just the businessId
//         params.append("business", businessId);
//       } else if (viewType === "category" && categoryId) {
//         // ── Category view: fetch products by category (+ any selected subcats)
//         const categoriesToFetch =
//           selectedCategories.length > 0 ? selectedCategories : [categoryId];
//         params.append("category_id", categoriesToFetch.join(","));
//       } else {
//         // Neither condition met — nothing to fetch
//         setProducts([]);
//         setProductsLoading(false);
//         return;
//       }

//       // Exclude current user's own products in both views
//       if (userId) {
//         params.append("exclude_user_id", userId);
//       }

//       // Price / discount filters apply in both views
//       if (selectedPriceRanges.length > 0) {
//         selectedPriceRanges.forEach(r => params.append("price_range", r));
//       }
//       if (selectedDiscountRanges.length > 0) {
//         selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       }

//       const url = `${baseurl}/products/?${params.toString()}`;
//       console.log("Fetching products from:", url);

//       const res = await fetch(url);
//       const data = await res.json();

//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else if (product.is_active !== false) {
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
//             },
//           });
//         }
//       });

//       setProducts(items);
//     } catch (e) {
//       console.error("Error fetching products:", e);
//       setProducts([]);
//     } finally {
//       setProductsLoading(false);
//     }
//   }, [viewType, businessId, categoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     // Only fetch once viewType & IDs are resolved (not both null at start)
//     if (viewType === "business" && !businessId) return;
//     if (viewType === "category" && !categoryId) return;
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   // Filter + Sort (removed search filter)
//   const filteredProducts = useMemo(() => {
//     let list = [...products];

//     const disc = i => {
//       const m = parseFloat(i.variant.mrp);
//       const s = parseFloat(i.variant.selling_price);
//       return m > 0 ? ((m - s) / m) * 100 : 0;
//     };

//     switch (sortBy) {
//       case "price_asc":     list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc":    list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc":      list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
//       case "name_desc":     list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
//       default:              list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
//     }

//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading,
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

//   // Display title: business name for business view, category name for category view
//   const displayTitle = viewType === "business" ? businessName : categoryName;

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
//             commissionData={commissionData}
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
//             <h1 className="msub-mobile-title">{displayTitle}</h1>
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
//               <div className="msub-main-header">
//                 <h1 className="msub-desktop-title">{displayTitle}</h1>
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

// export default AgentHomeSubCategories;



import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal, Info, FileText
} from "lucide-react";
import { baseurl } from "../../BaseURL/BaseURL";
import Swal from "sweetalert2";
import axios from "axios";
import "./style.css"

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

// ============= Enquiry Modal with Multiple Products =============
// ============= Enquiry Modal with Multiple Products =============
const EnquiryModal = ({ isOpen, onClose, businessId, onSubmit }) => {
  const [products, setProducts] = useState([
    { name: "", brand: "",  qty: ""}
  ]);
  const [formData, setFormData] = useState({
    enquiry_date: "",
    due_date: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Get today's date
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      
      // Calculate due date (7 days from today)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      const formattedDueDate = dueDate.toISOString().split('T')[0];
      
      setFormData({
        enquiry_date: formattedToday,
        due_date: formattedDueDate,
        message: ""
      });
    }
  }, [isOpen]);

  const handleProductChange = (index, field, value) => {
  const updatedProducts = [...products];
  if (field === "qty") {
    // Allow empty string, only convert to number if value is not empty
    if (value === "") {
      updatedProducts[index][field] = "";
    } else {
      const qtyValue = parseInt(value);
      updatedProducts[index][field] = isNaN(qtyValue) ? "" : Math.max(1, qtyValue);
    }
  } else {
    updatedProducts[index][field] = value;
  }
  setProducts(updatedProducts);
};

  const addProduct = () => {
    setProducts([...products, { name: "", brand: "", qty: ""  }]);
  };

  const removeProduct = (index) => {
    if (products.length > 1) {
      const updatedProducts = products.filter((_, i) => i !== index);
      setProducts(updatedProducts);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'enquiry_date') {
      // Auto-calculate due date when enquiry date changes
      const enquiryDate = new Date(value);
      const newDueDate = new Date(enquiryDate);
      newDueDate.setDate(enquiryDate.getDate() + 7);
      const formattedDueDate = newDueDate.toISOString().split('T')[0];
      
      setFormData(prev => ({ 
        ...prev, 
        enquiry_date: value,
        due_date: formattedDueDate 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation
  const invalidProducts = products.filter(p => !p.name.trim());
  if (invalidProducts.length > 0) {
    Swal.fire({ 
      icon: "error", 
      title: "Validation Error", 
      text: "Please enter product name for all products", 
      confirmButtonColor: "#f76f2f" 
    });
    return;
  }
  
  // Check for empty or invalid quantity
  const invalidQty = products.filter(p => !p.qty || p.qty === "" || parseInt(p.qty) < 1);
  if (invalidQty.length > 0) {
    Swal.fire({ 
      icon: "error", 
      title: "Validation Error", 
      text: "Please enter valid quantity for all products (minimum 1)", 
      confirmButtonColor: "#f76f2f" 
    });
    return;
  }

  setLoading(true);
  try {
    const userId = localStorage.getItem("user_id");
    
    if (!userId) {
      throw new Error("User not logged in");
    }
    
    if (!businessId) {
      throw new Error("Business ID not found");
    }
    
    // Format products array as per API specification
    const productsArray = products
      .filter(product => product.name.trim())
      .map(product => {
        const productObj = { 
          name: product.name.trim(), 
          qty: parseInt(product.qty) 
        };
        if (product.brand && product.brand.trim()) {
          productObj.brand = product.brand.trim();
        }
        return productObj;
      });
    
    const payload = {
      user: parseInt(userId),
      business: parseInt(businessId),
      products: productsArray,
      enquiry_date: formData.enquiry_date,
      due_date: formData.due_date,
      message: formData.message || ""
    };
    
    console.log("Submitting payload:", payload);

    await onSubmit(payload);
    onClose();
    // Reset form - set qty to empty string
    setProducts([{ name: "", brand: "", qty: "" }]);
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    const formattedDueDate = dueDate.toISOString().split('T')[0];
    setFormData({
      enquiry_date: formattedToday,
      due_date: formattedDueDate,
      message: ""
    });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="msub-modal-overlay" onClick={onClose}>
      <div className="msub-modal msub-modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="msub-modal-header">
          <h3>Product Enquiry</h3>
          <button className="msub-modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="msub-enquiry-form">
          {/* Products Section */}
          <div className="msub-form-section">
            <div className="msub-section-header">
              <label className="msub-section-label">Products </label>
              <button type="button" className="msub-add-product-btn" onClick={addProduct}>
                + Add Product
              </button>
            </div>
            
            {products.map((product, index) => (
              <div key={index} className="msub-product-row">
                <div className="msub-product-fields">
                  <div className="msub-form-group msub-form-group-sm">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, "name", e.target.value)}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div className="msub-form-group msub-form-group-sm">
                    <label>Brand (Optional)</label>
                    <input
                      type="text"
                      value={product.brand}
                      onChange={(e) => handleProductChange(index, "brand", e.target.value)}
                      placeholder="Enter brand name"
                    />
                  </div>
                  
                  <div className="msub-form-group msub-form-group-sm">
                    <label>Quantity *</label>
                    <input
                      type="number"
                      value={product.qty}
                      onChange={(e) => handleProductChange(index, "qty", e.target.value)}
                        placeholder="Enter quantity"
                      min="1"
                      step="1"
                      required
                    />
                  </div>
                </div>
                {products.length > 1 && (
                  <button 
                    type="button" 
                    className="msub-remove-product-btn"
                    onClick={() => removeProduct(index)}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Enquiry Details Section */}
          <div className="msub-form-section">
            {/* <div className="msub-section-header">
              <label className="msub-section-label">Enquiry Details</label>
            </div> */}
            
            <div className="msub-form-row">
              <div className="msub-form-group">
                <label>Enquiry Date</label>
                <input
                  type="date"
                  name="enquiry_date"
                  value={formData.enquiry_date}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="msub-form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleFormChange}
                  required
                />
                <small className="msub-helper-text">
                  ⓘ By default, due date is set to 1 week from enquiry date
                </small>
              </div>
            </div>
            
            <div className="msub-form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Any specific requirements or additional information..."
                rows="3"
              />
            </div>
          </div>
          
          <div className="msub-modal-footer">
            <button type="button" className="msub-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="msub-btn-submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </div>
        </form>
      </div>
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

  // Check if item is in cart with abort controller
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
      Swal.fire({ icon: "warning", title: "Login Required", text: "Please login to add items to cart", confirmButtonColor: "#f76f2f" });
      return;
    }
    if (variant.stock <= 0) {
      Swal.fire({ icon: "error", title: "Out of Stock", text: "This product is currently out of stock", confirmButtonColor: "#f76f2f" });
      return;
    }
    setLoading(true);
    try {
      if (cartItemId) {
        const newQty = qty + 1;
        if (newQty > variant.stock) {
          Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
          return;
        }
        await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
        await refreshCartStatus();
      } else {
        const response = await axios.post(`${baseurl}/cart/`, { user: parseInt(userId), variant: variant.id, quantity: 1 });
        await refreshCartStatus();
      }
      window.dispatchEvent(new Event("cartUpdated"));
      Swal.fire({
        icon: "success", title: "Added to Cart!", text: `${productName} has been added to your cart.`,
        showConfirmButton: true, showCancelButton: true,
        confirmButtonText: "View Cart", cancelButtonText: "Continue Shopping",
        confirmButtonColor: "#f76f2f", cancelButtonColor: "#6c757d",
        timer: 2000, timerProgressBar: true,
      }).then((result) => { if (result.isConfirmed) navigate("/agent-add-to-cart"); });
    } catch (error) {
      console.error("Error adding to cart:", error);
      
      let errorMessage = 'Failed to add to cart. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({ icon: "error", title: "Error", text: errorMessage, confirmButtonColor: "#f76f2f" });
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
        Swal.fire({ icon: "info", title: "Removed from Cart", text: `${productName} has been removed.`, showConfirmButton: false, timer: 1500, timerProgressBar: true });
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (error) {
        console.error("Error removing from cart:", error);
        Swal.fire({ icon: "error", title: "Error", text: "Failed to remove from cart. Please try again.", confirmButtonColor: "#f76f2f" });
      } finally {
        setLoading(false);
      }
    } else {
      if (newQty > variant.stock) {
        Swal.fire({ icon: "error", title: "Stock Limit Exceeded", text: `Cannot add more than ${variant.stock} units`, confirmButtonColor: "#f76f2f" });
        return;
      }
      setLoading(true);
      try {
        await axios.put(`${baseurl}/cart/${cartItemId}/`, { user: parseInt(userId), variant: variant.id, quantity: newQty });
        await refreshCartStatus();
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (error) {
        console.error("Error updating cart:", error);
        
        let errorMessage = 'Failed to update cart. Please try again.';
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
        
        Swal.fire({ icon: "error", title: "Error", text: errorMessage, confirmButtonColor: "#f76f2f" });
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
          <div className="msub-spinner-sm" style={{ margin: "0 auto" }} />
        ) : qty === 0 ? (
          <button className="msub-add-btn" onClick={handleAddToCart} disabled={variant.stock <= 0}>
            {variant.stock <= 0 ? "OUT OF STOCK" : "ADD"}
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
const AgentHomeSubCategories = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [categoryTree, setCategoryTree] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [viewType, setViewType] = useState("category");
  const [businessId, setBusinessId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [effectiveCategoryId, setEffectiveCategoryId] = useState(null);
  const [commissionData, setCommissionData] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

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
        const res = await fetch(`${baseurl}/commissions-master/?commission_type=product_commission`);
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

  // ✅ FIX 1: Determine view type & IDs correctly
  // Business card click  → viewType="business", businessId set, effectiveCategoryId = passed categoryId (may be null)
  // View All click       → viewType="category", categoryId = URL id, effectiveCategoryId = URL id
  useEffect(() => {
    const passedViewType   = location.state?.viewType;
    const passedBusinessId = location.state?.businessId;
    const passedBusinessName = location.state?.businessName;
    const passedCategoryId = location.state?.categoryId;
    const passedCategoryName = location.state?.categoryName;

    if (passedViewType === "business" && passedBusinessId) {
      // ── Business view ──────────────────────────────────────────────────────
      setViewType("business");
      setBusinessId(passedBusinessId);
      setBusinessName(passedBusinessName || "Products");
      setCategoryName(passedBusinessName || "Products");

      // Only use a real categoryId for the sidebar — never use the URL id here
      // because the URL id IS the businessId in this route
      const realCategoryId = passedCategoryId || null;
      setCategoryId(realCategoryId);
      setEffectiveCategoryId(realCategoryId); // may be null → sidebar skipped
    } else {
      // ── Category view (View All) ────────────────────────────────────────────
      setViewType("category");
      setBusinessId(null);
      setCategoryId(id);               // URL id is a real categoryId here
      setEffectiveCategoryId(id);
      if (passedCategoryName) setCategoryName(passedCategoryName);
    }
  }, [location.state, id]);

  // ✅ FIX 2: Fetch sidebar category tree using effectiveCategoryId
  // Guard: if effectiveCategoryId is null (business view without a categoryId) → skip
  useEffect(() => {
    if (!effectiveCategoryId) {
      setLoading(false);
      setCategoryTree([]);
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseurl}/categories/`);
        const data = await res.json();
        const allCategories = data.results || data || [];

        // Set category name only in category view (business view name comes from state)
        if (viewType === "category") {
          const current = allCategories.find(
            c => c.category_id === parseInt(effectiveCategoryId)
          );
          if (current?.name) setCategoryName(current.name);
        }

        const children = allCategories.filter(
          c => c.parent === parseInt(effectiveCategoryId) && c.is_active !== false
        );
        setCategoryTree(
          children.map(c => ({ ...c, children: buildCategoryTree(allCategories, c.category_id) }))
        );
      } catch (e) {
        console.error("Error fetching categories:", e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [effectiveCategoryId, buildCategoryTree, viewType]);

  // ✅ FIX 3: Fetch products — strict separation of business vs category view
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const userId = localStorage.getItem("user_id");
      const params = new URLSearchParams();
      params.append("variant_verification_status", "verified");

      if (viewType === "business" && businessId) {
        // ── Business view: fetch ONLY this business's products ──────────────
        // Do NOT add any category filter here — just the businessId
        params.append("business", businessId);
      } else if (viewType === "category" && categoryId) {
        // ── Category view: fetch products by category (+ any selected subcats)
        const categoriesToFetch =
          selectedCategories.length > 0 ? selectedCategories : [categoryId];
        params.append("category_id", categoriesToFetch.join(","));
      } else {
        // Neither condition met — nothing to fetch
        setProducts([]);
        setProductsLoading(false);
        return;
      }

      // Exclude current user's own products in both views
      if (userId) {
        params.append("exclude_user_id", userId);
      }

      // Price / discount filters apply in both views
      if (selectedPriceRanges.length > 0) {
        selectedPriceRanges.forEach(r => params.append("price_range", r));
      }
      if (selectedDiscountRanges.length > 0) {
        selectedDiscountRanges.forEach(r => params.append("discount_range", r));
      }

      const url = `${baseurl}/products/?${params.toString()}`;
      console.log("Fetching products from:", url);

      const res = await fetch(url);
      const data = await res.json();

      const items = [];
      (data.results || []).forEach(product => {
        if (product.variants?.length > 0) {
          product.variants.forEach(variant => items.push({ product, variant }));
        } else if (product.is_active !== false) {
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
            },
          });
        }
      });

      setProducts(items);
    } catch (e) {
      console.error("Error fetching products:", e);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, [viewType, businessId, categoryId, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  useEffect(() => {
    // Only fetch once viewType & IDs are resolved (not both null at start)
    if (viewType === "business" && !businessId) return;
    if (viewType === "category" && !categoryId) return;
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  // Filter + Sort (removed search filter)
  const filteredProducts = useMemo(() => {
    let list = [...products];

    const disc = i => {
      const m = parseFloat(i.variant.mrp);
      const s = parseFloat(i.variant.selling_price);
      return m > 0 ? ((m - s) / m) * 100 : 0;
    };

    switch (sortBy) {
      case "price_asc":     list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
      case "price_desc":    list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
      case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
      case "name_asc":      list.sort((a, b) => a.product.product_name?.localeCompare(b.product.product_name || "")); break;
      case "name_desc":     list.sort((a, b) => b.product.product_name?.localeCompare(a.product.product_name || "")); break;
      default:              list.sort((a, b) => (b.product.product_id || 0) - (a.product.product_id || 0)); break;
    }

    return list;
  }, [products, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginated = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
  const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
  const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

  const filterProps = {
    categoryTree, loading,
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

const handleEnquirySubmit = async (payload) => {
  try {
    console.log("Sending payload:", payload); // Debug log
    
    const response = await axios.post(`${baseurl}/product-enquiries/`, payload, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Enquiry Submitted!",
        text: "Your product enquiry has been sent successfully. The seller will contact you soon.",
        confirmButtonColor: "#f76f2f"
      });
      return response;
    }
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    
    // Log the full error response for debugging
    if (error.response) {
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      
      // Show detailed error message
      let errorMessage = "Failed to submit enquiry. ";
      if (error.response.data) {
        if (typeof error.response.data === 'object') {
          // Format the error message nicely
          const errors = Object.entries(error.response.data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
          errorMessage += errors;
        } else {
          errorMessage += error.response.data;
        }
      } else {
        errorMessage += "Please try again.";
      }
      
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
        confirmButtonColor: "#f76f2f"
      });
    } else if (error.request) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to server. Please check your connection.",
        confirmButtonColor: "#f76f2f"
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Failed to submit enquiry. Please try again.",
        confirmButtonColor: "#f76f2f"
      });
    }
    throw error;
  }
};
  // Display title: business name for business view, category name for category view
  const displayTitle = viewType === "business" ? businessName : categoryName;

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
            <h1 className="msub-mobile-title">{displayTitle}</h1>
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
              <div className="msub-main-header">
                <h1 className="msub-desktop-title">{displayTitle}</h1>
                <div className="msub-header-buttons">
                  <button className="msub-enquiry-btn" onClick={() => setShowEnquiryModal(true)}>
                    <FileText size={17} /><span>Enquiry Form</span>
                  </button>
                  <button className="msub-back-desktop" onClick={() => navigate(-1)}>
                    <ArrowLeft size={17} /><span>Back</span>
                  </button>
                </div>
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

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={showEnquiryModal}
        onClose={() => setShowEnquiryModal(false)}
        businessId={businessId}
        onSubmit={handleEnquirySubmit}
      />
    </>
  );
};

export default AgentHomeSubCategories;