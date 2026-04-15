// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info
// } from "lucide-react";
// import "./AgentBusinessProductsCategories.css";


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

// // ============= Commission Tooltip =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;
//   const commissionAmount = parseFloat(distributionCommission) || 0;
//   const list = commissions.map(c => ({
//     level: c.level_no,
//     amount: (commissionAmount * parseFloat(c.percentage)) / 100,
//   }));
//   return (
//     <div className="abpc-commission-tooltip">
//       {list.map(c => (
//         <div key={c.level} className="abpc-commission-row">
//           <span>Team {c.level}:</span>
//           <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Bottom Sheet (Mobile) =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);
//   return (
//     <>
//       <div className={`abpc-overlay ${isOpen ? "abpc-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`abpc-sheet ${isOpen ? "abpc-sheet--open" : ""}`}>
//         <div className="abpc-sheet-handle" />
//         <div className="abpc-sheet-header">
//           <span className="abpc-sheet-title">{title}</span>
//           <button className="abpc-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="abpc-sheet-body">{children}</div>
//         {footer && <div className="abpc-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="abpc-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`abpc-sort-opt ${sortBy === opt.value ? "abpc-sort-opt--on" : ""}`}
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
//   const on = selectedCategories.some(c => c.category_id === category.category_id);
//   return (
//     <div>
//       <div className={`abpc-cat-row ${level > 0 ? "abpc-cat-row--child" : ""}`}
//         onClick={() => onToggle(category)}>
//         <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`abpc-cat-label ${on ? "abpc-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="abpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="abpc-cat-children">
//           {category.children.map(child => (
//             <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
//               selectedCategories={selectedCategories} onToggle={onToggle} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Ranges =============
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
//   <div className={`abpc-filter-row ${on ? "abpc-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// // ============= Sidebar Section (Desktop) =============
// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="abpc-sidebar-section">
//       <button className="abpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>
//           {title}
//           {count > 0 && <span className="abpc-filter-badge">{count}</span>}
//         </span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="abpc-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// // ============= Filter Content =============
// const FilterContent = ({
//   categoryTree, loading, isSidebar,
//   selectedCategories, setSelectedCategories,
//   selectedPriceRanges, setSelectedPriceRanges,
//   selectedDiscountRanges, setSelectedDiscountRanges,
// }) => {
//   const [tab, setTab] = useState("categories");
//   const toggleCat = (cat) => setSelectedCategories(prev =>
//     prev.some(c => c.category_id === cat.category_id)
//       ? prev.filter(c => c.category_id !== cat.category_id)
//       : [...prev, cat]
//   );
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

//   if (isSidebar) {
//     return (
//       <div className="abpc-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
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
//       <div className="abpc-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`abpc-filter-tab ${tab === t.key ? "abpc-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="abpc-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="abpc-filter-tab-body">
//         {tab === "categories" && (
//           loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
//               ))
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

// // ============= Product Card =============
// const ProductCard = ({ product, variant, commissionData }) => {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(0);
//   const [showPayout, setShowPayout] = useState(false);

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

//   const variantDisplay = variant.attributes
//     ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
//     : "";
//   const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
//   const url = `/agent-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   return (
//     <div className="abpc-card" onClick={() => navigate(url)}>
//       <div className="abpc-card-img-wrap">
//         <img src={getImage()} alt={productName} className="abpc-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="abpc-card-disc">{discount}% OFF</span>}
//       </div>

//       <div className="abpc-card-body">
//         {variantDisplay && <span className="abpc-card-variant">{variantDisplay}</span>}
//         <p className="abpc-card-name">{productName}</p>
//         <small className="abpc-card-brand">{product.brand || ""}</small>
//         {discount > 0 && <span className="abpc-card-off">{discount}% OFF</span>}
//         <div className="abpc-card-prices">
//           <span className="abpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="abpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>

//       <div className="abpc-card-foot" onClick={e => e.stopPropagation()}>
//         {/* ADD / QTY */}
//         {qty === 0 ? (
//           <button className="abpc-add-btn" onClick={() => setQty(1)}>ADD</button>
//         ) : (
//           <div className="abpc-qty-control">
//             <button className="abpc-qty-btn" onClick={() => setQty(q => Math.max(0, q - 1))}>−</button>
//             <span className="abpc-qty-value">{qty}</span>
//             <button className="abpc-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
//           </div>
//         )}

//         {/* PAYOUT button */}
//         <div className="abpc-payout-wrap"
//           onMouseEnter={() => setShowPayout(true)}
//           onMouseLeave={() => setShowPayout(false)}>
//           <button className="abpc-payout-btn">
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

// // ============= Active Chips =============
// const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="abpc-chips">
//     {selectedCategories.map(cat => (
//       <span key={cat.category_id} className="abpc-chip">{cat.name}
//         <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
//       </span>
//     ))}
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="abpc-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="abpc-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="abpc-chip abpc-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="abpc-pagination">
//       <button className="abpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`abpc-page-btn ${current === p ? "abpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="abpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= Build & Filter Category Tree =============
// const buildCategoryTree = (categories, parentId = null) =>
//   categories.filter(c => c.parent === parentId)
//     .map(c => ({ ...c, children: buildCategoryTree(categories, c.category_id) }));

// const filterBusinessAndProductCategories = (categories) => {
//   const validCats = categories.filter(c => c.level === "business" || c.level === "product");
//   const toInclude = new Set(validCats.map(c => c.category_id));
//   validCats.forEach(cat => {
//     let parent = cat.parent;
//     while (parent) {
//       const p = categories.find(c => c.category_id === parent);
//       if (p) { toInclude.add(p.category_id); parent = p.parent; } else break;
//     }
//   });
//   return buildCategoryTree(categories.filter(c => toInclude.has(c.category_id)), null);
// };

// // ============= Main Component =============
// const AgentBusinessProductsCategories = () => {
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [commissionData, setCommissionData] = useState([]);

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

//   // Fetch categories + commissions
//   useEffect(() => {
//     const run = async () => {
//       setCategoriesLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const active = data.results.filter(c => c.is_active);
//         setCategoryTree(filterBusinessAndProductCategories(active));
//       } catch (e) { console.error(e); }
//       finally { setCategoriesLoading(false); }
//     };
//     const fetchCommissions = async () => {
//       try {
//         const res = await fetch(`${baseurl}/commissions-master/`);
//         const data = await res.json();
//         setCommissionData(data.results || []);
//       } catch (e) { console.error(e); }
//     };
//     run();
//     fetchCommissions();
//   }, []);

//   // Fetch products
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const params = new URLSearchParams({ variant_verification_status: "verified" });
//       if (searchTerm.trim()) params.append("search", searchTerm.trim());
//       selectedPriceRanges.forEach(r => params.append("price_range", r));
//       selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       selectedCategories.forEach(c => params.append("category_id", c.category_id));

//       const res = await fetch(`${baseurl}/products/?${params}`);
//       const data = await res.json();
//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else {
//           items.push({ product, variant: { id: product.product_id, sku: product.product_id, mrp: "0.00", selling_price: "0.00", attributes: {}, distribution_commission: "0.00" } });
//         }
//       });
//       setProducts(items);
//     } catch (e) { console.error(e); }
//     finally { setProductsLoading(false); }
//   }, [searchTerm, selectedPriceRanges, selectedDiscountRanges, selectedCategories]);

//   useEffect(() => { fetchProducts(); }, [fetchProducts]);
//   useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   const sortedProducts = useMemo(() => {
//     const list = [...products];
//     const disc = i => { const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); return m > 0 ? ((m - s) / m) * 100 : 0; };
//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
//     }
//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
//   const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading: categoriesLoading,
//     selectedCategories, setSelectedCategories,
//     selectedPriceRanges, setSelectedPriceRanges,
//     selectedDiscountRanges, setSelectedDiscountRanges,
//   };

//   const mobileFilterFooter = (
//     <div className="abpc-filter-footer-btns">
//       <button className="abpc-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="abpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="abpc-loading"><div className="abpc-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="abpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
//   ) : (
//     <>
//       <div className={`abpc-grid ${isMobile ? "abpc-grid--2col" : "abpc-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
//             product={item.product} variant={item.variant} commissionData={commissionData} />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <ClientNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="abpc-mobile">
//           <div className="abpc-mobile-topbar">
//             <button className="abpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="abpc-mobile-title">Categories</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="abpc-mobile-search-wrap">
//             <div className="abpc-search-bar">
//               <Search size={15} className="abpc-search-ico" />
//               <input type="text" placeholder="Search products..." className="abpc-search-input"
//                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//               {searchTerm && <button className="abpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>

//           <div className="abpc-toolbar">
//             <button className="abpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button className={`abpc-toolbar-btn ${activeFilterCount > 0 ? "abpc-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="abpc-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll} />
//           )}

//           <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />

//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>

//           <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)}
//             title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
//             <FilterContent {...filterProps} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* ======= DESKTOP ======= */}
//       {!isMobile && (
//         <div className="abpc-desktop">
//           <div className="abpc-desktop-header">
//             <div className="abpc-desktop-header-inner">
//               <button className="abpc-back-desktop" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={17} /><span>Back</span>
//               </button>
//               <h1 className="abpc-desktop-title">Categories</h1>
//             </div>
//           </div>

//           <div className="abpc-desktop-body">
//             {/* Sidebar */}
//             <aside className="abpc-sidebar">
//               <div className="abpc-sidebar-top">
//                 <span className="abpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="abpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             {/* Main */}
//             <main className="abpc-main">
//               <div className="abpc-main-topbar">
//                 <div className="abpc-desktop-search">
//                   <Search size={15} className="abpc-search-ico" />
//                   <input type="text" placeholder="Search products..." className="abpc-search-input"
//                     value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//                   {searchTerm && <button className="abpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//                 </div>
//                 <div className="abpc-sort-wrap">
//                   <button className="abpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="abpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="abpc-sort-dropdown">
//                         <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {activeFilterCount > 0 && (
//                 <ActiveChips
//                   selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//                   selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//                   clearAll={clearAll} />
//               )}

//               <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AgentBusinessProductsCategories;




// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info, ShoppingCart
// } from "lucide-react";
// import "./AgentBusinessProductsCategories.css";
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

// // ============= Commission Tooltip =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;
//   const commissionAmount = parseFloat(distributionCommission) || 0;
//   const list = commissions.map(c => ({
//     level: c.level_no,
//     amount: (commissionAmount * parseFloat(c.percentage)) / 100,
//   }));
//   return (
//     <div className="abpc-commission-tooltip">
//       {list.map(c => (
//         <div key={c.level} className="abpc-commission-row">
//           <span>Team {c.level}:</span>
//           <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Bottom Sheet (Mobile) =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);
//   return (
//     <>
//       <div className={`abpc-overlay ${isOpen ? "abpc-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`abpc-sheet ${isOpen ? "abpc-sheet--open" : ""}`}>
//         <div className="abpc-sheet-handle" />
//         <div className="abpc-sheet-header">
//           <span className="abpc-sheet-title">{title}</span>
//           <button className="abpc-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="abpc-sheet-body">{children}</div>
//         {footer && <div className="abpc-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="abpc-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`abpc-sort-opt ${sortBy === opt.value ? "abpc-sort-opt--on" : ""}`}
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
//   const on = selectedCategories.some(c => c.category_id === category.category_id);
//   return (
//     <div>
//       <div className={`abpc-cat-row ${level > 0 ? "abpc-cat-row--child" : ""}`}
//         onClick={() => onToggle(category)}>
//         <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`abpc-cat-label ${on ? "abpc-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="abpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="abpc-cat-children">
//           {category.children.map(child => (
//             <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
//               selectedCategories={selectedCategories} onToggle={onToggle} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Ranges =============
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
//   <div className={`abpc-filter-row ${on ? "abpc-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// // ============= Sidebar Section (Desktop) =============
// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="abpc-sidebar-section">
//       <button className="abpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>
//           {title}
//           {count > 0 && <span className="abpc-filter-badge">{count}</span>}
//         </span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="abpc-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// // ============= Filter Content =============
// const FilterContent = ({
//   categoryTree, loading, isSidebar,
//   selectedCategories, setSelectedCategories,
//   selectedPriceRanges, setSelectedPriceRanges,
//   selectedDiscountRanges, setSelectedDiscountRanges,
// }) => {
//   const [tab, setTab] = useState("categories");
//   const toggleCat = (cat) => setSelectedCategories(prev =>
//     prev.some(c => c.category_id === cat.category_id)
//       ? prev.filter(c => c.category_id !== cat.category_id)
//       : [...prev, cat]
//   );
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

//   if (isSidebar) {
//     return (
//       <div className="abpc-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
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
//       <div className="abpc-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`abpc-filter-tab ${tab === t.key ? "abpc-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="abpc-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="abpc-filter-tab-body">
//         {tab === "categories" && (
//           loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
//               ))
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

// // ============= Product Card (Updated with Cart Integration) =============
// const ProductCard = ({ product, variant, commissionData }) => {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(0);
//   const [showPayout, setShowPayout] = useState(false);
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
//   const distributionCommission = parseFloat(variant.distribution_commission || 0);

//   const variantDisplay = variant.attributes
//     ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
//     : "";
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
//     <div className="abpc-card" onClick={() => navigate(url)}>
//       <div className="abpc-card-img-wrap">
//         <img src={getImage()} alt={productName} className="abpc-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="abpc-card-disc">{discount}% OFF</span>}
//       </div>

//       <div className="abpc-card-body">
//         {variantDisplay && <span className="abpc-card-variant">{variantDisplay}</span>}
//         <p className="abpc-card-name">{productName}</p>
//         <small className="abpc-card-brand">{product.brand || ""}</small>
//         {discount > 0 && <span className="abpc-card-off">{discount}% OFF</span>}
//         <div className="abpc-card-prices">
//           <span className="abpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="abpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>

//       <div className="abpc-card-foot" onClick={e => e.stopPropagation()}>
//         {/* ADD / QTY */}
//         {qty === 0 ? (
//           <button 
//             className="abpc-add-btn" 
//             onClick={handleAddToCart}
//             disabled={loading || variant.stock <= 0}
//           >
//             {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
//           </button>
//         ) : (
//           <div className="abpc-qty-control">
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty - 1)}
//               disabled={loading}
//             >−</button>
//             <span className="abpc-qty-value">{qty}</span>
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty + 1)}
//               disabled={loading || qty >= variant.stock}
//             >+</button>
//           </div>
//         )}

//         {/* PAYOUT button */}
//         <div className="abpc-payout-wrap"
//           onMouseEnter={() => setShowPayout(true)}
//           onMouseLeave={() => setShowPayout(false)}>
//           <button className="abpc-payout-btn">
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

// // ============= Active Chips =============
// const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="abpc-chips">
//     {selectedCategories.map(cat => (
//       <span key={cat.category_id} className="abpc-chip">{cat.name}
//         <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
//       </span>
//     ))}
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="abpc-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="abpc-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="abpc-chip abpc-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="abpc-pagination">
//       <button className="abpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`abpc-page-btn ${current === p ? "abpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="abpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= Build & Filter Category Tree =============
// const buildCategoryTree = (categories, parentId = null) =>
//   categories.filter(c => c.parent === parentId)
//     .map(c => ({ ...c, children: buildCategoryTree(categories, c.category_id) }));

// const filterBusinessAndProductCategories = (categories) => {
//   const validCats = categories.filter(c => c.level === "business" || c.level === "product");
//   const toInclude = new Set(validCats.map(c => c.category_id));
//   validCats.forEach(cat => {
//     let parent = cat.parent;
//     while (parent) {
//       const p = categories.find(c => c.category_id === parent);
//       if (p) { toInclude.add(p.category_id); parent = p.parent; } else break;
//     }
//   });
//   return buildCategoryTree(categories.filter(c => toInclude.has(c.category_id)), null);
// };

// // ============= Main Component =============
// const AgentBusinessProductsCategories = () => {
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [commissionData, setCommissionData] = useState([]);

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

//   // Fetch categories + commissions
//   useEffect(() => {
//     const run = async () => {
//       setCategoriesLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const active = data.results.filter(c => c.is_active);
//         setCategoryTree(filterBusinessAndProductCategories(active));
//       } catch (e) { console.error(e); }
//       finally { setCategoriesLoading(false); }
//     };
//     const fetchCommissions = async () => {
//       try {
//         const res = await fetch(`${baseurl}/commissions-master/`);
//         const data = await res.json();
//         setCommissionData(data.results || []);
//       } catch (e) { console.error(e); }
//     };
//     run();
//     fetchCommissions();
//   }, []);

//   // Fetch products
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const params = new URLSearchParams({ variant_verification_status: "verified" });
//       if (searchTerm.trim()) params.append("search", searchTerm.trim());
//       selectedPriceRanges.forEach(r => params.append("price_range", r));
//       selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       selectedCategories.forEach(c => params.append("category_id", c.category_id));

//       const res = await fetch(`${baseurl}/products/?${params}`);
//       const data = await res.json();
//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else {
//           items.push({ product, variant: { id: product.product_id, sku: product.product_id, mrp: "0.00", selling_price: "0.00", attributes: {}, distribution_commission: "0.00" } });
//         }
//       });
//       setProducts(items);
//     } catch (e) { console.error(e); }
//     finally { setProductsLoading(false); }
//   }, [searchTerm, selectedPriceRanges, selectedDiscountRanges, selectedCategories]);

//   useEffect(() => { fetchProducts(); }, [fetchProducts]);
//   useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   const sortedProducts = useMemo(() => {
//     const list = [...products];
//     const disc = i => { const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); return m > 0 ? ((m - s) / m) * 100 : 0; };
//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
//     }
//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
//   const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading: categoriesLoading,
//     selectedCategories, setSelectedCategories,
//     selectedPriceRanges, setSelectedPriceRanges,
//     selectedDiscountRanges, setSelectedDiscountRanges,
//   };

//   const mobileFilterFooter = (
//     <div className="abpc-filter-footer-btns">
//       <button className="abpc-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="abpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="abpc-loading"><div className="abpc-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="abpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
//   ) : (
//     <>
//       <div className={`abpc-grid ${isMobile ? "abpc-grid--2col" : "abpc-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
//             product={item.product} variant={item.variant} commissionData={commissionData} />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <ClientNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="abpc-mobile">
//           <div className="abpc-mobile-topbar">
//             <button className="abpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="abpc-mobile-title">Categories</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="abpc-mobile-search-wrap">
//             <div className="abpc-search-bar">
//               <Search size={15} className="abpc-search-ico" />
//               <input type="text" placeholder="Search products..." className="abpc-search-input"
//                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//               {searchTerm && <button className="abpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>

//           <div className="abpc-toolbar">
//             <button className="abpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button className={`abpc-toolbar-btn ${activeFilterCount > 0 ? "abpc-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="abpc-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll} />
//           )}

//           <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />

//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>

//           <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)}
//             title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
//             <FilterContent {...filterProps} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* ======= DESKTOP ======= */}
//       {!isMobile && (
//         <div className="abpc-desktop">
//           <div className="abpc-desktop-header">
//             <div className="abpc-desktop-header-inner">
//               <button className="abpc-back-desktop" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={17} /><span>Back</span>
//               </button>
//               <h1 className="abpc-desktop-title">Categories</h1>
//             </div>
//           </div>

//           <div className="abpc-desktop-body">
//             {/* Sidebar */}
//             <aside className="abpc-sidebar">
//               <div className="abpc-sidebar-top">
//                 <span className="abpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="abpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             {/* Main */}
//             <main className="abpc-main">
//               <div className="abpc-main-topbar">
//                 <div className="abpc-desktop-search">
//                   <Search size={15} className="abpc-search-ico" />
//                   <input type="text" placeholder="Search products..." className="abpc-search-input"
//                     value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//                   {searchTerm && <button className="abpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//                 </div>
//                 <div className="abpc-sort-wrap">
//                   <button className="abpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="abpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="abpc-sort-dropdown">
//                         <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {activeFilterCount > 0 && (
//                 <ActiveChips
//                   selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//                   selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//                   clearAll={clearAll} />
//               )}

//               <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AgentBusinessProductsCategories;






// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info, ShoppingCart
// } from "lucide-react";
// import "./AgentBusinessProductsCategories.css";
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

// // ============= Commission Tooltip =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;
//   const commissionAmount = parseFloat(distributionCommission) || 0;
//   const list = commissions.map(c => ({
//     level: c.level_no,
//     amount: (commissionAmount * parseFloat(c.percentage)) / 100,
//   }));
//   return (
//     <div className="abpc-commission-tooltip">
//       {list.map(c => (
//         <div key={c.level} className="abpc-commission-row">
//           <span>Team {c.level}:</span>
//           <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Bottom Sheet (Mobile) =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);
//   return (
//     <>
//       <div className={`abpc-overlay ${isOpen ? "abpc-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`abpc-sheet ${isOpen ? "abpc-sheet--open" : ""}`}>
//         <div className="abpc-sheet-handle" />
//         <div className="abpc-sheet-header">
//           <span className="abpc-sheet-title">{title}</span>
//           <button className="abpc-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="abpc-sheet-body">{children}</div>
//         {footer && <div className="abpc-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="abpc-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`abpc-sort-opt ${sortBy === opt.value ? "abpc-sort-opt--on" : ""}`}
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
//   const on = selectedCategories.some(c => c.category_id === category.category_id);
//   return (
//     <div>
//       <div className={`abpc-cat-row ${level > 0 ? "abpc-cat-row--child" : ""}`}
//         onClick={() => onToggle(category)}>
//         <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`abpc-cat-label ${on ? "abpc-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="abpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="abpc-cat-children">
//           {category.children.map(child => (
//             <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
//               selectedCategories={selectedCategories} onToggle={onToggle} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Ranges =============
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
//   <div className={`abpc-filter-row ${on ? "abpc-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// // ============= Sidebar Section (Desktop) =============
// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="abpc-sidebar-section">
//       <button className="abpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>
//           {title}
//           {count > 0 && <span className="abpc-filter-badge">{count}</span>}
//         </span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="abpc-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// // ============= Filter Content =============
// const FilterContent = ({
//   categoryTree, loading, isSidebar,
//   selectedCategories, setSelectedCategories,
//   selectedPriceRanges, setSelectedPriceRanges,
//   selectedDiscountRanges, setSelectedDiscountRanges,
// }) => {
//   const [tab, setTab] = useState("categories");
//   const toggleCat = (cat) => setSelectedCategories(prev =>
//     prev.some(c => c.category_id === cat.category_id)
//       ? prev.filter(c => c.category_id !== cat.category_id)
//       : [...prev, cat]
//   );
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

//   if (isSidebar) {
//     return (
//       <div className="abpc-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
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
//       <div className="abpc-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`abpc-filter-tab ${tab === t.key ? "abpc-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="abpc-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="abpc-filter-tab-body">
//         {tab === "categories" && (
//           loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
//               ))
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

// // ============= Product Card (Updated with Cart Integration) =============
// const ProductCard = ({ product, variant, commissionData }) => {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(0);
//   const [showPayout, setShowPayout] = useState(false);
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
//   const distributionCommission = parseFloat(variant.distribution_commission || 0);

//   const variantDisplay = variant.attributes
//     ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
//     : "";
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
//     <div className="abpc-card" onClick={() => navigate(url)}>
//       <div className="abpc-card-img-wrap">
//         <img src={getImage()} alt={productName} className="abpc-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="abpc-card-disc">{discount}% OFF</span>}
//       </div>

//       <div className="abpc-card-body">
//         {variantDisplay && <span className="abpc-card-variant">{variantDisplay}</span>}
//         <p className="abpc-card-name">{productName}</p>
//         <small className="abpc-card-brand">{product.brand || ""}</small>
//         {discount > 0 && <span className="abpc-card-off">{discount}% OFF</span>}
//         <div className="abpc-card-prices">
//           <span className="abpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="abpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>

//       <div className="abpc-card-foot" onClick={e => e.stopPropagation()}>
//         {/* ADD / QTY */}
//         {qty === 0 ? (
//           <button 
//             className="abpc-add-btn" 
//             onClick={handleAddToCart}
//             disabled={loading || variant.stock <= 0}
//           >
//             {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
//           </button>
//         ) : (
//           <div className="abpc-qty-control">
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty - 1)}
//               disabled={loading}
//             >−</button>
//             <span className="abpc-qty-value">{qty}</span>
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty + 1)}
//               disabled={loading || qty >= variant.stock}
//             >+</button>
//           </div>
//         )}

//         {/* PAYOUT button */}
//         <div className="abpc-payout-wrap"
//           onMouseEnter={() => setShowPayout(true)}
//           onMouseLeave={() => setShowPayout(false)}>
//           <button className="abpc-payout-btn">
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

// // ============= Active Chips =============
// const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="abpc-chips">
//     {selectedCategories.map(cat => (
//       <span key={cat.category_id} className="abpc-chip">{cat.name}
//         <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
//       </span>
//     ))}
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="abpc-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="abpc-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="abpc-chip abpc-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="abpc-pagination">
//       <button className="abpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`abpc-page-btn ${current === p ? "abpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="abpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= Build & Filter Category Tree =============
// const buildCategoryTree = (categories, parentId = null) =>
//   categories.filter(c => c.parent === parentId)
//     .map(c => ({ ...c, children: buildCategoryTree(categories, c.category_id) }));

// const filterBusinessAndProductCategories = (categories) => {
//   const validCats = categories.filter(c => c.level === "business" || c.level === "product");
//   const toInclude = new Set(validCats.map(c => c.category_id));
//   validCats.forEach(cat => {
//     let parent = cat.parent;
//     while (parent) {
//       const p = categories.find(c => c.category_id === parent);
//       if (p) { toInclude.add(p.category_id); parent = p.parent; } else break;
//     }
//   });
//   return buildCategoryTree(categories.filter(c => toInclude.has(c.category_id)), null);
// };

// // ============= Main Component =============
// // ============= Main Component =============
// const AgentBusinessProductsCategories = () => {
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [commissionData, setCommissionData] = useState([]);

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

//   // Add debounced search
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
//   // Get user_id from localStorage
//   const userId = localStorage.getItem("user_id");

//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 500); // 500ms delay

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Fetch categories + commissions
//   useEffect(() => {
//     const run = async () => {
//       setCategoriesLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const active = data.results.filter(c => c.is_active);
//         setCategoryTree(filterBusinessAndProductCategories(active));
//       } catch (e) { console.error(e); }
//       finally { setCategoriesLoading(false); }
//     };
//     const fetchCommissions = async () => {
//       try {
//         const res = await fetch(`${baseurl}/commissions-master/`);
//         const data = await res.json();
//         setCommissionData(data.results || []);
//       } catch (e) { console.error(e); }
//     };
//     run();
//     fetchCommissions();
//   }, []);

//   // Fetch products - using debounced search term and excluding current user
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       const params = new URLSearchParams();
      
//       // Always add variant_verification_status
//       params.append("variant_verification_status", "verified");
      
//       // Exclude current user's products if user_id exists
//       if (userId) {
//         params.append("exclude_user_id", userId);
//         console.log("Excluding user ID:", userId); // Debug log
//       }
      
//       // Add search term if present
//       if (debouncedSearchTerm.trim()) {
//         params.append("search", debouncedSearchTerm.trim());
//         console.log("Searching with term:", debouncedSearchTerm.trim()); // Debug log
//       }
      
//       // Add price ranges
//       selectedPriceRanges.forEach(r => params.append("price_range", r));
      
//       // Add discount ranges
//       selectedDiscountRanges.forEach(r => params.append("discount_range", r));
      
//       // Add category IDs
//       selectedCategories.forEach(c => params.append("category_id", c.category_id));

//       const url = `${baseurl}/products/?${params}`;
//       console.log("Fetching URL:", url); // Debug log to see the full URL
      
//       const res = await fetch(url);
//       const data = await res.json();
//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else {
//           items.push({ product, variant: { id: product.product_id, sku: product.product_id, mrp: "0.00", selling_price: "0.00", attributes: {}, distribution_commission: "0.00" } });
//         }
//       });
//       setProducts(items);
//     } catch (e) { 
//       console.error("Error fetching products:", e); 
//     }
//     finally { setProductsLoading(false); }
//   }, [debouncedSearchTerm, selectedPriceRanges, selectedDiscountRanges, selectedCategories, userId]);

//   useEffect(() => { 
//     fetchProducts(); 
//   }, [fetchProducts]);
  
//   useEffect(() => { 
//     setCurrentPage(1); 
//   }, [debouncedSearchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   const sortedProducts = useMemo(() => {
//     const list = [...products];
//     const disc = i => { const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); return m > 0 ? ((m - s) / m) * 100 : 0; };
//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
//     }
//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
//   const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading: categoriesLoading,
//     selectedCategories, setSelectedCategories,
//     selectedPriceRanges, setSelectedPriceRanges,
//     selectedDiscountRanges, setSelectedDiscountRanges,
//   };

//   const mobileFilterFooter = (
//     <div className="abpc-filter-footer-btns">
//       <button className="abpc-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="abpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="abpc-loading"><div className="abpc-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="abpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
//   ) : (
//     <>
//       <div className={`abpc-grid ${isMobile ? "abpc-grid--2col" : "abpc-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
//             product={item.product} variant={item.variant} commissionData={commissionData} />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <ClientNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="abpc-mobile">
//           <div className="abpc-mobile-topbar">
//             <button className="abpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="abpc-mobile-title">Categories</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="abpc-mobile-search-wrap">
//             <div className="abpc-search-bar">
//               <Search size={15} className="abpc-search-ico" />
//               <input type="text" placeholder="Search products using name, price, category..." className="abpc-search-input"
//                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//               {searchTerm && <button className="abpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>

//           <div className="abpc-toolbar">
//             <button className="abpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button className={`abpc-toolbar-btn ${activeFilterCount > 0 ? "abpc-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="abpc-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll} />
//           )}

//           <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />

//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>

//           <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)}
//             title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
//             <FilterContent {...filterProps} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* ======= DESKTOP ======= */}
//       {!isMobile && (
//         <div className="abpc-desktop">
//       <div className="abpc-desktop-header">
//   <div className="abpc-desktop-header-inner">
//     <button className="abpc-back-desktop" onClick={() => navigate('/agent-dashboard')}>
//       <ArrowLeft size={17} /><span>Go to Dashboard</span>
//     </button>
//     <h1 className="abpc-desktop-title">Categories</h1>
//   </div>
// </div>
//           <div className="abpc-desktop-body">
//             {/* Sidebar */}
//             <aside className="abpc-sidebar">
//               <div className="abpc-sidebar-top">
//                 <span className="abpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="abpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             {/* Main */}
//             <main className="abpc-main">
//               <div className="abpc-main-topbar">
//                 <div className="abpc-desktop-search">
//                   <Search size={15} className="abpc-search-ico" />
//                   <input 
//                     type="text" 
//                     placeholder="Search products using name, price, category..." 
//                     className="abpc-search-input"
//                     value={searchTerm} 
//                     onChange={e => setSearchTerm(e.target.value)} 
//                   />
//                   {searchTerm && (
//                     <button className="abpc-search-clear" onClick={() => setSearchTerm("")}>
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//                 <div className="abpc-sort-wrap">
//                   <button className="abpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="abpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="abpc-sort-dropdown">
//                         <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {activeFilterCount > 0 && (
//                 <ActiveChips
//                   selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//                   selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//                   clearAll={clearAll} />
//               )}

//               <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AgentBusinessProductsCategories;



//========================================================================
// Dated on - 0104-2026

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { baseurl } from "../../BaseURL/BaseURL";
// import ClientNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info, ShoppingCart
// } from "lucide-react";
// import "./AgentBusinessProductsCategories.css";
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

// // ============= Commission Tooltip =============
// const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
//   if (!show || !commissions || commissions.length === 0) return null;
//   const commissionAmount = parseFloat(distributionCommission) || 0;
//   const list = commissions.map(c => ({
//     level: c.level_no,
//     amount: (commissionAmount * parseFloat(c.percentage)) / 100,
//   }));
//   return (
//     <div className="abpc-commission-tooltip">
//       {list.map(c => (
//         <div key={c.level} className="abpc-commission-row">
//           <span>Team {c.level}:</span>
//           <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Bottom Sheet (Mobile) =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);
//   return (
//     <>
//       <div className={`abpc-overlay ${isOpen ? "abpc-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`abpc-sheet ${isOpen ? "abpc-sheet--open" : ""}`}>
//         <div className="abpc-sheet-handle" />
//         <div className="abpc-sheet-header">
//           <span className="abpc-sheet-title">{title}</span>
//           <button className="abpc-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="abpc-sheet-body">{children}</div>
//         {footer && <div className="abpc-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="abpc-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`abpc-sort-opt ${sortBy === opt.value ? "abpc-sort-opt--on" : ""}`}
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
//   const on = selectedCategories.some(c => c.category_id === category.category_id);
//   return (
//     <div>
//       <div className={`abpc-cat-row ${level > 0 ? "abpc-cat-row--child" : ""}`}
//         onClick={() => onToggle(category)}>
//         <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`abpc-cat-label ${on ? "abpc-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="abpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="abpc-cat-children">
//           {category.children.map(child => (
//             <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
//               selectedCategories={selectedCategories} onToggle={onToggle} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Ranges =============
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
//   <div className={`abpc-filter-row ${on ? "abpc-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// // ============= Sidebar Section (Desktop) =============
// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="abpc-sidebar-section">
//       <button className="abpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>
//           {title}
//           {count > 0 && <span className="abpc-filter-badge">{count}</span>}
//         </span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="abpc-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// // ============= Filter Content =============
// const FilterContent = ({
//   categoryTree, loading, isSidebar,
//   selectedCategories, setSelectedCategories,
//   selectedPriceRanges, setSelectedPriceRanges,
//   selectedDiscountRanges, setSelectedDiscountRanges,
// }) => {
//   const [tab, setTab] = useState("categories");
//   const toggleCat = (cat) => setSelectedCategories(prev =>
//     prev.some(c => c.category_id === cat.category_id)
//       ? prev.filter(c => c.category_id !== cat.category_id)
//       : [...prev, cat]
//   );
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

//   if (isSidebar) {
//     return (
//       <div className="abpc-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
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
//       <div className="abpc-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`abpc-filter-tab ${tab === t.key ? "abpc-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="abpc-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="abpc-filter-tab-body">
//         {tab === "categories" && (
//           loading
//             ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="abpc-empty-txt">No categories</p>
//               : categoryTree.map(cat => (
//                 <NestedCategoryItem key={cat.category_id} category={cat}
//                   selectedCategories={selectedCategories} onToggle={toggleCat} />
//               ))
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

// // ============= Product Card (Updated with Cart Integration) =============
// const ProductCard = ({ product, variant, commissionData }) => {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(0);
//   const [showPayout, setShowPayout] = useState(false);
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
//   const distributionCommission = parseFloat(variant.distribution_commission || 0);

//   const variantDisplay = variant.attributes
//     ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
//     : "";
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
//     <div className="abpc-card" onClick={() => navigate(url)}>
//       <div className="abpc-card-img-wrap">
//         <img src={getImage()} alt={productName} className="abpc-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="abpc-card-disc">{discount}% OFF</span>}
//       </div>

//       <div className="abpc-card-body">
//         {variantDisplay && <span className="abpc-card-variant">{variantDisplay}</span>}
//         <p className="abpc-card-name">{productName}</p>
//         <small className="abpc-card-brand">{product.brand || ""}</small>
//         {discount > 0 && <span className="abpc-card-off">{discount}% OFF</span>}
//         <div className="abpc-card-prices">
//           <span className="abpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="abpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>

//       <div className="abpc-card-foot" onClick={e => e.stopPropagation()}>
//         {/* ADD / QTY */}
//         {qty === 0 ? (
//           <button 
//             className="abpc-add-btn" 
//             onClick={handleAddToCart}
//             disabled={loading || variant.stock <= 0}
//           >
//             {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
//           </button>
//         ) : (
//           <div className="abpc-qty-control">
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty - 1)}
//               disabled={loading}
//             >−</button>
//             <span className="abpc-qty-value">{qty}</span>
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty + 1)}
//               disabled={loading || qty >= variant.stock}
//             >+</button>
//           </div>
//         )}

//         {/* PAYOUT button */}
//         <div className="abpc-payout-wrap"
//           onMouseEnter={() => setShowPayout(true)}
//           onMouseLeave={() => setShowPayout(false)}>
//           <button className="abpc-payout-btn">
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

// // ============= Active Chips =============
// const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="abpc-chips">
//     {selectedCategories.map(cat => (
//       <span key={cat.category_id} className="abpc-chip">{cat.name}
//         <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
//       </span>
//     ))}
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="abpc-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="abpc-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="abpc-chip abpc-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="abpc-pagination">
//       <button className="abpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`abpc-page-btn ${current === p ? "abpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="abpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= Build & Filter Category Tree =============
// const buildCategoryTree = (categories, parentId = null) =>
//   categories.filter(c => c.parent === parentId)
//     .map(c => ({ ...c, children: buildCategoryTree(categories, c.category_id) }));

// const filterBusinessAndProductCategories = (categories) => {
//   const validCats = categories.filter(c => c.level === "business" || c.level === "product");
//   const toInclude = new Set(validCats.map(c => c.category_id));
//   validCats.forEach(cat => {
//     let parent = cat.parent;
//     while (parent) {
//       const p = categories.find(c => c.category_id === parent);
//       if (p) { toInclude.add(p.category_id); parent = p.parent; } else break;
//     }
//   });
//   return buildCategoryTree(categories.filter(c => toInclude.has(c.category_id)), null);
// };

// // ============= Main Component =============
// const AgentBusinessProductsCategories = () => {
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [commissionData, setCommissionData] = useState([]);

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

//   // Debounced search term
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   // Fetch categories + commissions
//   useEffect(() => {
//     const run = async () => {
//       setCategoriesLoading(true);
//       try {
//         const res = await fetch(`${baseurl}/categories/`);
//         const data = await res.json();
//         const active = data.results.filter(c => c.is_active);
//         setCategoryTree(filterBusinessAndProductCategories(active));
//       } catch (e) { console.error(e); }
//       finally { setCategoriesLoading(false); }
//     };
//     const fetchCommissions = async () => {
//       try {
//         const res = await fetch(`${baseurl}/commissions-master/`);
//         const data = await res.json();
//         setCommissionData(data.results || []);
//       } catch (e) { console.error(e); }
//     };
//     run();
//     fetchCommissions();
//   }, []);

//   // Fetch products
//   const fetchProducts = useCallback(async () => {
//     setProductsLoading(true);
//     try {
//       // ✅ FIX: Read user_id from localStorage and pass as exclude_user_id
//       const userId = localStorage.getItem("user_id");
//       const params = new URLSearchParams({ variant_verification_status: "verified" });

//       if (userId) {
//         params.append("exclude_user_id", userId);
//       }
//       if (debouncedSearchTerm.trim()) {
//         params.append("search", debouncedSearchTerm.trim());
//       }
//       selectedPriceRanges.forEach(r => params.append("price_range", r));
//       selectedDiscountRanges.forEach(r => params.append("discount_range", r));
//       selectedCategories.forEach(c => params.append("category_id", c.category_id));

//       const url = `${baseurl}/products/?${params}`;
//       const res = await fetch(url);
//       const data = await res.json();
//       const items = [];
//       (data.results || []).forEach(product => {
//         if (product.variants?.length > 0) {
//           product.variants.forEach(variant => items.push({ product, variant }));
//         } else {
//           items.push({ product, variant: { id: product.product_id, sku: product.product_id, mrp: "0.00", selling_price: "0.00", attributes: {}, distribution_commission: "0.00" } });
//         }
//       });
//       setProducts(items);
//     } catch (e) { console.error(e); }
//     finally { setProductsLoading(false); }
//   }, [debouncedSearchTerm, selectedPriceRanges, selectedDiscountRanges, selectedCategories]);

//   useEffect(() => { 
//     fetchProducts(); 
//   }, [fetchProducts]);
  
//   useEffect(() => { 
//     setCurrentPage(1); 
//   }, [debouncedSearchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

//   const sortedProducts = useMemo(() => {
//     const list = [...products];
//     const disc = i => { const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); return m > 0 ? ((m - s) / m) * 100 : 0; };
//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
//       case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
//     }
//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
//   const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

//   const filterProps = {
//     categoryTree, loading: categoriesLoading,
//     selectedCategories, setSelectedCategories,
//     selectedPriceRanges, setSelectedPriceRanges,
//     selectedDiscountRanges, setSelectedDiscountRanges,
//   };

//   const mobileFilterFooter = (
//     <div className="abpc-filter-footer-btns">
//       <button className="abpc-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="abpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="abpc-loading"><div className="abpc-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="abpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
//   ) : (
//     <>
//       <div className={`abpc-grid ${isMobile ? "abpc-grid--2col" : "abpc-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
//             product={item.product} variant={item.variant} commissionData={commissionData} />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <ClientNavbar />

//       {/* ======= MOBILE ======= */}
//       {isMobile && (
//         <div className="abpc-mobile">
//           <div className="abpc-mobile-topbar">
//             <button className="abpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="abpc-mobile-title">Categories</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="abpc-mobile-search-wrap">
//             <div className="abpc-search-bar">
//               <Search size={15} className="abpc-search-ico" />
//               <input type="text" placeholder="Search products using name, price, category..." className="abpc-search-input"
//                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//               {searchTerm && <button className="abpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>

//           <div className="abpc-toolbar">
//             <button className="abpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button className={`abpc-toolbar-btn ${activeFilterCount > 0 ? "abpc-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="abpc-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll} />
//           )}

//           <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />

//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>

//           <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)}
//             title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
//             <FilterContent {...filterProps} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* ======= DESKTOP ======= */}
//       {/* {!isMobile && (
//         <div className="abpc-desktop">
//           <div className="abpc-desktop-header">
//             <div className="abpc-desktop-header-inner">
//               <button className="abpc-back-desktop" onClick={() => navigate('/agent-dashboard')}>
//                 <ArrowLeft size={17} /><span>Go to Dashboard</span>
//               </button>
//               <h1 className="abpc-desktop-title">Categories</h1>
//             </div>
//           </div>
//           <div className="abpc-desktop-body">
//             <aside className="abpc-sidebar">
//               <div className="abpc-sidebar-top">
//                 <span className="abpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="abpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             <main className="abpc-main">
//               <div className="abpc-main-topbar">
//                 <div className="abpc-desktop-search">
//                   <Search size={15} className="abpc-search-ico" />
//                   <input 
//                     type="text" 
//                     placeholder="Search products using name, price, category..." 
//                     className="abpc-search-input"
//                     value={searchTerm} 
//                     onChange={e => setSearchTerm(e.target.value)} 
//                   />
//                   {searchTerm && (
//                     <button className="abpc-search-clear" onClick={() => setSearchTerm("")}>
//                       <X size={14} />
//                     </button>
//                   )}
//                 </div>
//                 <div className="abpc-sort-wrap">
//                   <button className="abpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="abpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="abpc-sort-dropdown">
//                         <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {activeFilterCount > 0 && (
//                 <ActiveChips
//                   selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//                   selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//                   clearAll={clearAll} />
//               )}

//               <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )} */}
//       {/* ======= DESKTOP ======= */}
// {!isMobile && (
//   <div className="abpc-desktop">
//     {/* REMOVED the separate header section since ClientNavbar already handles the top bar */}
//     <div className="abpc-desktop-body">
//       {/* Sidebar */}
//       <aside className="abpc-sidebar">
//         <div className="abpc-sidebar-top">
//           <span className="abpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//           {activeFilterCount > 0 && (
//             <button className="abpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
//           )}
//         </div>
//         <FilterContent {...filterProps} isSidebar={true} />
//       </aside>

//       {/* Main */}
//       <main className="abpc-main">
//         <div className="abpc-main-header">
//           <h1 className="abpc-desktop-title">Categories</h1>
//           <button className="abpc-back-desktop" onClick={() => navigate('/agent-dashboard')}>
//             <ArrowLeft size={17} /><span>Go to Dashboard</span>
//           </button>
//         </div>
        
//         <div className="abpc-main-topbar">
//           <div className="abpc-desktop-search">
//             <Search size={15} className="abpc-search-ico" />
//             <input 
//               type="text" 
//               placeholder="Search products using name, price, category..." 
//               className="abpc-search-input"
//               value={searchTerm} 
//               onChange={e => setSearchTerm(e.target.value)} 
//             />
//             {searchTerm && (
//               <button className="abpc-search-clear" onClick={() => setSearchTerm("")}>
//                 <X size={14} />
//               </button>
//             )}
//           </div>
//           <div className="abpc-sort-wrap">
//             <button className="abpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             {showSortDropdown && (
//               <>
//                 <div className="abpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                 <div className="abpc-sort-dropdown">
//                   <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {activeFilterCount > 0 && (
//           <ActiveChips
//             selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//             selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//             selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//             clearAll={clearAll} />
//         )}

//         <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//         {productSection}
//       </main>
//     </div>
//   </div>
// )}
//     </>
//   );
// };

// export default AgentBusinessProductsCategories;


//==========================================================


import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import ClientNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal, Info, ShoppingCart
} from "lucide-react";
import "./AgentBusinessProductsCategories.css";
import Swal from "sweetalert2";
import axios from "axios";
import defaultProductImage from "../../Logos/business-default-image.png";
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

// ============= Commission Tooltip =============
const CommissionTooltip = ({ show, commissions, distributionCommission }) => {
  if (!show || !commissions || commissions.length === 0) return null;
  const commissionAmount = parseFloat(distributionCommission) || 0;
  const list = commissions.map(c => ({
    level: c.level_no,
    amount: (commissionAmount * parseFloat(c.percentage)) / 100,
  }));
  return (
    <div className="abpc-commission-tooltip">
      {list.map(c => (
        <div key={c.level} className="abpc-commission-row">
          <span>Team {c.level}:</span>
          <span>₹{c.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
        </div>
      ))}
    </div>
  );
};

// ============= Bottom Sheet (Mobile) =============
const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  return (
    <>
      <div className={`abpc-overlay ${isOpen ? "abpc-overlay--on" : ""}`} onClick={onClose} />
      <div className={`abpc-sheet ${isOpen ? "abpc-sheet--open" : ""}`}>
        <div className="abpc-sheet-handle" />
        <div className="abpc-sheet-header">
          <span className="abpc-sheet-title">{title}</span>
          <button className="abpc-sheet-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="abpc-sheet-body">{children}</div>
        {footer && <div className="abpc-sheet-footer">{footer}</div>}
      </div>
    </>
  );
};

// ============= Sort List =============
const SortList = ({ sortBy, setSortBy, onClose }) => (
  <div className="abpc-sort-list">
    {SORT_OPTIONS.map(opt => (
      <button key={opt.value}
        className={`abpc-sort-opt ${sortBy === opt.value ? "abpc-sort-opt--on" : ""}`}
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
  const on = selectedCategories.some(c => c.category_id === category.category_id);
  return (
    <div>
      <div className={`abpc-cat-row ${level > 0 ? "abpc-cat-row--child" : ""}`}
        onClick={() => onToggle(category)}>
        <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
          {on && <Check size={10} color="#fff" strokeWidth={3} />}
        </div>
        <span className={`abpc-cat-label ${on ? "abpc-cat-label--on" : ""}`}>{category.name}</span>
        {hasChildren && (
          <button className="abpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
            <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
          </button>
        )}
      </div>
      {expanded && hasChildren && (
        <div className="abpc-cat-children">
          {category.children.map(child => (
            <NestedCategoryItem key={child.category_id} category={child} level={level + 1}
              selectedCategories={selectedCategories} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
};

// ============= Filter Ranges =============
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
  <div className={`abpc-filter-row ${on ? "abpc-filter-row--on" : ""}`} onClick={onClick}>
    <div className={`abpc-checkbox ${on ? "abpc-checkbox--on" : ""}`}>
      {on && <Check size={10} color="#fff" strokeWidth={3} />}
    </div>
    <span>{label}</span>
  </div>
);

// ============= Sidebar Section (Desktop) =============
const SidebarSection = ({ title, count, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="abpc-sidebar-section">
      <button className="abpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
        <span>
          {title}
          {count > 0 && <span className="abpc-filter-badge">{count}</span>}
        </span>
        <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </button>
      {open && <div className="abpc-sidebar-section-body">{children}</div>}
    </div>
  );
};

// ============= Filter Content =============
const FilterContent = ({
  categoryTree, loading, isSidebar,
  selectedCategories, setSelectedCategories,
  selectedPriceRanges, setSelectedPriceRanges,
  selectedDiscountRanges, setSelectedDiscountRanges,
  sortBy, setSortBy,
}) => {
  const [tab, setTab] = useState("categories");
  const toggleCat = (cat) => setSelectedCategories(prev =>
    prev.some(c => c.category_id === cat.category_id)
      ? prev.filter(c => c.category_id !== cat.category_id)
      : [...prev, cat]
  );
  const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  if (isSidebar) {
    return (
      <div className="abpc-sidebar-filter">
        <SidebarSection title="Categories" count={selectedCategories.length}>
          {loading
            ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
            : categoryTree.length === 0
              ? <p className="abpc-empty-txt">No categories</p>
              : categoryTree.map(cat => (
                <NestedCategoryItem key={cat.category_id} category={cat}
                  selectedCategories={selectedCategories} onToggle={toggleCat} />
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
          <div className="abpc-relevance-options">
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
      <div className="abpc-filter-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`abpc-filter-tab ${tab === t.key ? "abpc-filter-tab--on" : ""}`}
            onClick={() => setTab(t.key)}>
            {t.label}
            {t.count > 0 && <span className="abpc-tab-badge">{t.count}</span>}
          </button>
        ))}
      </div>
      <div className="abpc-filter-tab-body">
        {tab === "categories" && (
          loading
            ? <div className="abpc-load-inline"><div className="abpc-spinner-sm" /> Loading...</div>
            : categoryTree.length === 0
              ? <p className="abpc-empty-txt">No categories</p>
              : categoryTree.map(cat => (
                <NestedCategoryItem key={cat.category_id} category={cat}
                  selectedCategories={selectedCategories} onToggle={toggleCat} />
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
          <div className="abpc-relevance-options">
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

// ============= Product Card (Updated with Cart Integration) =============
// const ProductCard = ({ product, variant, commissionData }) => {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(0);
//   const [showPayout, setShowPayout] = useState(false);
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
//   const distributionCommission = parseFloat(variant.distribution_commission || 0);

//   const variantDisplay = variant.attributes
//     ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
//     : "";
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

// const handleAddToCart = async (e) => {
//   e.stopPropagation();
  
//   if (!userId) {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Login Required',
//       text: 'Please login to add items to cart',
//       confirmButtonText: 'OK',
//       confirmButtonColor: '#f76f2f',
//     });
//     return;
//   }
  
//   if (variant.stock <= 0) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Out of Stock',
//       text: 'This product is currently out of stock',
//       confirmButtonText: 'OK',
//       confirmButtonColor: '#f76f2f',
//     });
//     return;
//   }

//   setLoading(true);
  
//   try {
//     if (cartItemId) {
//       // Update existing cart item
//       const newQty = qty + 1;
      
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
      
//       await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//         user: parseInt(userId),
//         variant: variant.id,
//         quantity: newQty
//       });
      
//       setQty(newQty);
//     } else {
//       // Add new item to cart
//       const response = await axios.post(`${baseurl}/cart/`, {
//         user: parseInt(userId),
//         variant: variant.id,
//         quantity: 1
//       });
      
//       setQty(1);
//       setCartItemId(response.data.id);
//     }
    
//     window.dispatchEvent(new Event('cartUpdated'));
    
//     Swal.fire({
//       icon: 'success',
//       title: 'Added to Cart!',
//       text: `${productName} has been added to your cart.`,
//       showConfirmButton: true,
//       showCancelButton: true,
//       confirmButtonText: 'View Cart',
//       cancelButtonText: 'Continue Shopping',
//       confirmButtonColor: '#f76f2f',
//       cancelButtonColor: '#6c757d',
//       timer: 2000,
//       timerProgressBar: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate('/agent-add-to-cart');
//       }
//     });
    
//   } catch (error) {
//     console.error("Error adding to cart:", error);
    
//     // Extract error message from backend response
//     let errorMessage = 'Failed to add to cart. Please try again.';
    
//     if (error.response) {
//       // Backend responded with error status
//       const responseData = error.response.data;
      
//       if (responseData.error) {
//         errorMessage = responseData.error;
//       } else if (responseData.message) {
//         errorMessage = responseData.message;
//       } else if (typeof responseData === 'string') {
//         errorMessage = responseData;
//       } else if (responseData.detail) {
//         errorMessage = responseData.detail;
//       }
//     } else if (error.request) {
//       errorMessage = 'No response from server. Please check your connection.';
//     } else {
//       errorMessage = error.message || 'An unexpected error occurred.';
//     }
    
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       text: errorMessage,
//       confirmButtonText: 'OK',
//       confirmButtonColor: '#f76f2f',
//     });
//   } finally {
//     setLoading(false);
//   }
// };

// const handleUpdateQuantity = async (e, newQty) => {
//   e.stopPropagation();
  
//   if (!userId || !cartItemId) return;
  
//   if (newQty === 0) {
//     // Remove from cart
//     setLoading(true);
//     try {
//       await axios.delete(`${baseurl}/cart/${cartItemId}/`);
//       setQty(0);
//       setCartItemId(null);
      
//       Swal.fire({
//         icon: 'info',
//         title: 'Removed from Cart',
//         text: `${productName} has been removed from your cart.`,
//         showConfirmButton: false,
//         timer: 1500,
//         timerProgressBar: true,
//       });
      
//       window.dispatchEvent(new Event('cartUpdated'));
//     } catch (error) {
//       console.error("Error removing from cart:", error);
      
//       let errorMessage = 'Failed to remove from cart. Please try again.';
//       if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: errorMessage,
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//     } finally {
//       setLoading(false);
//     }
//   } else {
//     // Update quantity
//     if (newQty > variant.stock) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Stock Limit Exceeded',
//         text: `Cannot add more than ${variant.stock} units`,
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//       return;
//     }
    
//     setLoading(true);
//     try {
//       await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//         user: parseInt(userId),
//         variant: variant.id,
//         quantity: newQty
//       });
      
//       setQty(newQty);
//       window.dispatchEvent(new Event('cartUpdated'));
//     } catch (error) {
//       console.error("Error updating cart:", error);
      
//       // Extract error message from backend response
//       let errorMessage = 'Failed to update cart. Please try again.';
      
//       if (error.response) {
//         const responseData = error.response.data;
        
//         if (responseData.error) {
//           errorMessage = responseData.error;
//         } else if (responseData.message) {
//           errorMessage = responseData.message;
//         } else if (typeof responseData === 'string') {
//           errorMessage = responseData;
//         } else if (responseData.detail) {
//           errorMessage = responseData.detail;
//         }
//       } else if (error.request) {
//         errorMessage = 'No response from server. Please check your connection.';
//       } else {
//         errorMessage = error.message || 'An unexpected error occurred.';
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Cannot Update Quantity',
//         text: errorMessage,
//         confirmButtonText: 'OK',
//         confirmButtonColor: '#f76f2f',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }
// };

//   return (
//     <div className="abpc-card" onClick={() => navigate(url)}>
//       <div className="abpc-card-img-wrap">
//         <img src={getImage()} alt={productName} className="abpc-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="abpc-card-disc">{discount}% OFF</span>}
//       </div>

//       <div className="abpc-card-body">
//         {variantDisplay && <span className="abpc-card-variant">{variantDisplay}</span>}
//         <p className="abpc-card-name">{productName}</p>
//         <small className="abpc-card-brand">{product.brand || ""}</small>
//         {discount > 0 && <span className="abpc-card-off">{discount}% OFF</span>}
//         <div className="abpc-card-prices">
//           <span className="abpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="abpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>

//       <div className="abpc-card-foot" onClick={e => e.stopPropagation()}>
//         {/* ADD / QTY */}
//         {qty === 0 ? (
//           <button 
//             className="abpc-add-btn" 
//             onClick={handleAddToCart}
//             disabled={loading || variant.stock <= 0}
//           >
//             {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
//           </button>
//         ) : (
//           <div className="abpc-qty-control">
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty - 1)}
//               disabled={loading}
//             >−</button>
//             <span className="abpc-qty-value">{qty}</span>
//             <button 
//               className="abpc-qty-btn" 
//               onClick={(e) => handleUpdateQuantity(e, qty + 1)}
//               disabled={loading || qty >= variant.stock}
//             >+</button>
//           </div>
//         )}

//         {/* PAYOUT button */}
//         <div className="abpc-payout-wrap"
//           onMouseEnter={() => setShowPayout(true)}
//           onMouseLeave={() => setShowPayout(false)}>
//           <button className="abpc-payout-btn">
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


// ============= Product Card (Updated with Cart Integration) =============
const ProductCard = ({ product, variant, commissionData }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [showPayout, setShowPayout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  
  const userId = localStorage.getItem("user_id");

const getImage = () => {
  if (variant.media?.length > 0) return `${baseurl}${variant.media[0].file}`;
  const v = product.variants?.find(v => v.media?.length > 0);
  if (v) return `${baseurl}${v.media[0].file}`;
  return defaultProductImage; // Changed from Unsplash URL
};

  const mrp = parseFloat(variant.mrp) || 0;
  const price = parseFloat(variant.selling_price) || 0;
  const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const distributionCommission = parseFloat(variant.distribution_commission || 0);

  const variantDisplay = variant.attributes
    ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
    : "";
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
        // Update existing cart item
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
        
        // Refresh cart status after update
        await refreshCartStatus();
      } else {
        // Add new item to cart
        const response = await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          variant: variant.id,
          quantity: 1
        });
        
        // Refresh cart status after adding
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
      
      // Extract error message from backend response
      let errorMessage = 'Failed to add to cart. Please try again.';
      
      if (error.response) {
        const responseData = error.response.data;
        
        if (responseData.error) {
          errorMessage = responseData.error;
        } else if (responseData.message) {
          errorMessage = responseData.message;
        } else if (typeof responseData === 'string') {
          errorMessage = responseData;
        } else if (responseData.detail) {
          errorMessage = responseData.detail;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message || 'An unexpected error occurred.';
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
    
    if (!userId || !cartItemId) {
      console.log("Missing userId or cartItemId", { userId, cartItemId });
      return;
    }
    
    if (newQty === 0) {
      // Remove from cart
      setLoading(true);
      try {
        await axios.delete(`${baseurl}/cart/${cartItemId}/`);
        
        // Refresh cart status after removal
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
        
        let errorMessage = 'Failed to remove from cart. Please try again.';
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
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
    } else {
      // Update quantity
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
        
        // Refresh cart status after update
        await refreshCartStatus();
        
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (error) {
        console.error("Error updating cart:", error);
        
        // Extract error message from backend response
        let errorMessage = 'Failed to update cart. Please try again.';
        
        if (error.response) {
          const responseData = error.response.data;
          
          if (responseData.error) {
            errorMessage = responseData.error;
          } else if (responseData.message) {
            errorMessage = responseData.message;
          } else if (typeof responseData === 'string') {
            errorMessage = responseData;
          } else if (responseData.detail) {
            errorMessage = responseData.detail;
          }
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          errorMessage = error.message || 'An unexpected error occurred.';
        }
        
        Swal.fire({
          icon: 'error',
          title: 'Cannot Update Quantity',
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
    <div className="abpc-card" onClick={() => navigate(url)}>
      <div className="abpc-card-img-wrap">
        <img 
  src={getImage()} 
  alt={productName} 
  className="abpc-card-img"
  onError={e => { e.target.src = defaultProductImage; }} 
/>
        {discount > 0 && <span className="abpc-card-disc">{discount}% OFF</span>}
      </div>

      <div className="abpc-card-body">
        {variantDisplay && <span className="abpc-card-variant">{variantDisplay}</span>}
        <p className="abpc-card-name">{productName}</p>
        <small className="abpc-card-brand">{product.brand || ""}</small>
        {discount > 0 && <span className="abpc-card-off">{discount}% OFF</span>}
        <div className="abpc-card-prices">
          <span className="abpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
          {mrp > price && <span className="abpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
        </div>
      </div>

      <div className="abpc-card-foot" onClick={e => e.stopPropagation()}>
        {/* ADD / QTY */}
        {qty === 0 ? (
          <button 
            className="abpc-add-btn" 
            onClick={handleAddToCart}
            disabled={loading || variant.stock <= 0}
          >
            {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
          </button>
        ) : (
          <div className="abpc-qty-control">
            <button 
              className="abpc-qty-btn" 
              onClick={(e) => handleUpdateQuantity(e, qty - 1)}
              disabled={loading}
            >−</button>
            <span className="abpc-qty-value">{qty}</span>
            <button 
              className="abpc-qty-btn" 
              onClick={(e) => handleUpdateQuantity(e, qty + 1)}
              disabled={loading || qty >= variant.stock}
            >+</button>
          </div>
        )}

        {/* PAYOUT button */}
        <div className="abpc-payout-wrap"
          onMouseEnter={() => setShowPayout(true)}
          onMouseLeave={() => setShowPayout(false)}>
          <button className="abpc-payout-btn">
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

// ============= Active Chips =============
const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
  <div className="abpc-chips">
    {selectedCategories.map(cat => (
      <span key={cat.category_id} className="abpc-chip">{cat.name}
        <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
      </span>
    ))}
    {selectedPriceRanges.map(r => (
      <span key={r} className="abpc-chip"><DollarSign size={10} />{r}
        <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
    ))}
    {selectedDiscountRanges.map(r => (
      <span key={r} className="abpc-chip"><Tag size={10} />{r}%
        <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
    ))}
    <button className="abpc-chip abpc-chip--clear" onClick={clearAll}>Clear All</button>
  </div>
);

// ============= Pagination =============
const Pagination = ({ current, total, onChange }) => {
  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return (
    <div className="abpc-pagination">
      <button className="abpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
      {pages.map(p => (
        <button key={p} className={`abpc-page-btn ${current === p ? "abpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="abpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
    </div>
  );
};

// ============= Build & Filter Category Tree =============
const buildCategoryTree = (categories, parentId = null) =>
  categories.filter(c => c.parent === parentId)
    .map(c => ({ ...c, children: buildCategoryTree(categories, c.category_id) }));

const filterBusinessAndProductCategories = (categories) => {
  const validCats = categories.filter(c => c.level === "business" || c.level === "product");
  const toInclude = new Set(validCats.map(c => c.category_id));
  validCats.forEach(cat => {
    let parent = cat.parent;
    while (parent) {
      const p = categories.find(c => c.category_id === parent);
      if (p) { toInclude.add(p.category_id); parent = p.parent; } else break;
    }
  });
  return buildCategoryTree(categories.filter(c => toInclude.has(c.category_id)), null);
};

// ============= Main Component =============
const AgentBusinessProductsCategories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [categoryTree, setCategoryTree] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
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

  // Fetch categories + commissions
  useEffect(() => {
    const run = async () => {
      setCategoriesLoading(true);
      try {
        const res = await fetch(`${baseurl}/categories/`);
        const data = await res.json();
        const active = data.results.filter(c => c.is_active);
        setCategoryTree(filterBusinessAndProductCategories(active));
      } catch (e) { console.error(e); }
      finally { setCategoriesLoading(false); }
    };
    const fetchCommissions = async () => {
      try {
        const res = await fetch(`${baseurl}/commissions-master/?commission_type=product_commission`);
        const data = await res.json();
        setCommissionData(data.results || []);
      } catch (e) { console.error(e); }
    };
    run();
    fetchCommissions();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const userId = localStorage.getItem("user_id");
      const params = new URLSearchParams({ variant_verification_status: "verified",  business_verification_status: "verified" });

      if (userId) {
        params.append("exclude_user_id", userId);
      }
      
      selectedPriceRanges.forEach(r => params.append("price_range", r));
      selectedDiscountRanges.forEach(r => params.append("discount_range", r));
      selectedCategories.forEach(c => params.append("category_id", c.category_id));

      const url = `${baseurl}/products/?${params}`;
      const res = await fetch(url);
      const data = await res.json();
      const items = [];
      (data.results || []).forEach(product => {
        if (product.variants?.length > 0) {
          product.variants.forEach(variant => items.push({ product, variant }));
        } else {
          items.push({ product, variant: { id: product.product_id, sku: product.product_id, mrp: "0.00", selling_price: "0.00", attributes: {}, distribution_commission: "0.00" } });
        }
      });
      setProducts(items);
    } catch (e) { console.error(e); }
    finally { setProductsLoading(false); }
  }, [selectedPriceRanges, selectedDiscountRanges, selectedCategories]);

  useEffect(() => { 
    fetchProducts(); 
  }, [fetchProducts]);
  
  useEffect(() => { 
    setCurrentPage(1); 
  }, [sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    const disc = i => { const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); return m > 0 ? ((m - s) / m) * 100 : 0; };
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
  const activeFilterCount = selectedCategories.length + selectedPriceRanges.length + selectedDiscountRanges.length;
  const clearAll = () => { setSelectedCategories([]); setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
  const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";

  const filterProps = {
    categoryTree, loading: categoriesLoading,
    selectedCategories, setSelectedCategories,
    selectedPriceRanges, setSelectedPriceRanges,
    selectedDiscountRanges, setSelectedDiscountRanges,
    sortBy, setSortBy,
  };

  const mobileFilterFooter = (
    <div className="abpc-filter-footer-btns">
      <button className="abpc-btn-clear" onClick={clearAll}>Clear All</button>
      <button className="abpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
    </div>
  );

  const productSection = productsLoading ? (
    <div className="abpc-loading"><div className="abpc-spinner" /><span>Loading products...</span></div>
  ) : sortedProducts.length === 0 ? (
    <div className="abpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
  ) : (
    <>
      <div className={`abpc-grid ${isMobile ? "abpc-grid--2col" : "abpc-grid--desktop"}`}>
        {paginated.map(item => (
          <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
            product={item.product} variant={item.variant} commissionData={commissionData} />
        ))}
      </div>
      {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
    </>
  );

  return (
    <>
      <ClientNavbar />

      {/* ======= MOBILE ======= */}
      {isMobile && (
        <div className="abpc-mobile">
          <div className="abpc-mobile-topbar">
            <button className="abpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
            <h1 className="abpc-mobile-title">Categories</h1>
            <div style={{ width: 36 }} />
          </div>

          <div className="abpc-toolbar">
            <button className="abpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
              <span>{sortLabel}</span><ChevronDown size={14} />
            </button>
            <button className={`abpc-toolbar-btn ${activeFilterCount > 0 ? "abpc-toolbar-btn--on" : ""}`}
              onClick={() => setShowFilterSheet(true)}>
              <Filter size={14} /><span>Filter</span>
              {activeFilterCount > 0 && <span className="abpc-toolbar-badge">{activeFilterCount}</span>}
            </button>
          </div>

          {activeFilterCount > 0 && (
            <ActiveChips
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
              selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
              selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
              clearAll={clearAll} />
          )}

          <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
          {productSection}
          <div style={{ height: 24 }} />

          <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
            <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
          </BottomSheet>

          <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)}
            title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
            <FilterContent {...filterProps} />
          </BottomSheet>
        </div>
      )}

      {/* ======= DESKTOP ======= */}
      {!isMobile && (
        <div className="abpc-desktop">
          <div className="abpc-desktop-body">
            <aside className="abpc-sidebar">
              <div className="abpc-sidebar-top">
                <span className="abpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
                {activeFilterCount > 0 && (
                  <button className="abpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
                )}
              </div>
              <FilterContent {...filterProps} isSidebar={true} />
            </aside>

            <main className="abpc-main">
              <div className="abpc-main-header">
                <h1 className="abpc-desktop-title">Categories</h1>
                <button className="abpc-back-desktop" onClick={() => navigate('/agent-dashboard')}>
                  <ArrowLeft size={17} /><span>Go to Dashboard</span>
                </button>
              </div>
              
              {/* <div className="abpc-main-topbar">
                <div className="abpc-sort-wrap">
                  <button className="abpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
                    <span>{sortLabel}</span><ChevronDown size={14} />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="abpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
                      <div className="abpc-sort-dropdown">
                        <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
                      </div>
                    </>
                  )}
                </div>
              </div> */}

              {activeFilterCount > 0 && (
                <ActiveChips
                  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                  selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
                  selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
                  clearAll={clearAll} />
              )}

              <div className="abpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
              {productSection}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentBusinessProductsCategories;