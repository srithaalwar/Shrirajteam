// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import ClientNavbar from "../Client_Navbar/Client_Navbar"; // adjust path as needed
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal
// } from "lucide-react";
// import "./ClientBusinessProductsCategories.css";
// import { baseurl } from "../../BaseURL/BaseURL";

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
//       <div className={`cbpc-overlay ${isOpen ? "cbpc-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`cbpc-sheet ${isOpen ? "cbpc-sheet--open" : ""}`}>
//         <div className="cbpc-sheet-handle" />
//         <div className="cbpc-sheet-header">
//           <span className="cbpc-sheet-title">{title}</span>
//           <button className="cbpc-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="cbpc-sheet-body">{children}</div>
//         {footer && <div className="cbpc-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// // ============= Sort List =============
// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="cbpc-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`cbpc-sort-opt ${sortBy === opt.value ? "cbpc-sort-opt--on" : ""}`}
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
//       <div className={`cbpc-cat-row ${level > 0 ? "cbpc-cat-row--child" : ""}`}
//         onClick={() => onToggle(category)}>
//         <div className={`cbpc-checkbox ${on ? "cbpc-checkbox--on" : ""}`}>
//           {on && <Check size={10} color="#fff" strokeWidth={3} />}
//         </div>
//         <span className={`cbpc-cat-label ${on ? "cbpc-cat-label--on" : ""}`}>{category.name}</span>
//         {hasChildren && (
//           <button className="cbpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
//             <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
//           </button>
//         )}
//       </div>
//       {expanded && hasChildren && (
//         <div className="cbpc-cat-children">
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
//   <div className={`cbpc-filter-row ${on ? "cbpc-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`cbpc-checkbox ${on ? "cbpc-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// // ============= Sidebar Section (Desktop) =============
// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="cbpc-sidebar-section">
//       <button className="cbpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>
//           {title}
//           {count > 0 && <span className="cbpc-filter-badge">{count}</span>}
//         </span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="cbpc-sidebar-section-body">{children}</div>}
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
//       <div className="cbpc-sidebar-filter">
//         <SidebarSection title="Categories" count={selectedCategories.length}>
//           {loading
//             ? <div className="cbpc-load-inline"><div className="cbpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="cbpc-empty-txt">No categories</p>
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

//   // Mobile tabbed
//   const tabs = [
//     { key: "categories", label: "Category", count: selectedCategories.length },
//     { key: "price", label: "Price", count: selectedPriceRanges.length },
//     { key: "discount", label: "Discount", count: selectedDiscountRanges.length },
//   ];
//   return (
//     <>
//       <div className="cbpc-filter-tabs">
//         {tabs.map(t => (
//           <button key={t.key} className={`cbpc-filter-tab ${tab === t.key ? "cbpc-filter-tab--on" : ""}`}
//             onClick={() => setTab(t.key)}>
//             {t.label}
//             {t.count > 0 && <span className="cbpc-tab-badge">{t.count}</span>}
//           </button>
//         ))}
//       </div>
//       <div className="cbpc-filter-tab-body">
//         {tab === "categories" && (
//           loading
//             ? <div className="cbpc-load-inline"><div className="cbpc-spinner-sm" /> Loading...</div>
//             : categoryTree.length === 0
//               ? <p className="cbpc-empty-txt">No categories</p>
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
// const ProductCard = ({ product, variant }) => {
//   const navigate = useNavigate();
//   const [qty, setQty] = useState(0);

//   const getImage = () => {
//     if (variant.media?.length > 0) return `${baseurl}${variant.media[0].file}`;
//     const v = product.variants?.find(v => v.media?.length > 0);
//     if (v) return `${baseurl}${v.media[0].file}`;
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   const mrp = parseFloat(variant.mrp) || 0;
//   const price = parseFloat(variant.selling_price) || 0;
//   const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

//   const variantDisplay = variant.attributes
//     ? Object.values(variant.attributes).filter(v => typeof v === "string" || typeof v === "number").join(" • ")
//     : "";
//   const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
//   const url = `/client-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   return (
//     <div className="cbpc-card" onClick={() => navigate(url)}>
//       <div className="cbpc-card-img-wrap">
//         <img src={getImage()} alt={productName} className="cbpc-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="cbpc-card-disc">{discount}% OFF</span>}
//       </div>
//       <div className="cbpc-card-body">
//         {variantDisplay && <span className="cbpc-card-variant">{variantDisplay}</span>}
//         <p className="cbpc-card-name">{productName}</p>
//         <small className="cbpc-card-brand">{product.brand || ""}</small>
//         {discount > 0 && <span className="cbpc-card-off">{discount}% OFF</span>}
//         <div className="cbpc-card-prices">
//           <span className="cbpc-card-price">₹{price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
//           {mrp > price && <span className="cbpc-card-mrp">₹{mrp.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>}
//         </div>
//       </div>
//       <div className="cbpc-card-foot" onClick={e => e.stopPropagation()}>
//         {qty === 0 ? (
//           <button className="cbpc-add-btn" onClick={() => setQty(1)}>ADD</button>
//         ) : (
//           <div className="cbpc-qty-control">
//             <button className="cbpc-qty-btn" onClick={() => setQty(q => Math.max(0, q - 1))}>−</button>
//             <span className="cbpc-qty-value">{qty}</span>
//             <button className="cbpc-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============= Active Chips =============
// const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="cbpc-chips">
//     {selectedCategories.map(cat => (
//       <span key={cat.category_id} className="cbpc-chip">{cat.name}
//         <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
//       </span>
//     ))}
//     {selectedPriceRanges.map(r => (
//       <span key={r} className="cbpc-chip"><DollarSign size={10} />{r}
//         <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     {selectedDiscountRanges.map(r => (
//       <span key={r} className="cbpc-chip"><Tag size={10} />{r}%
//         <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
//     ))}
//     <button className="cbpc-chip cbpc-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// // ============= Pagination =============
// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2);
//   let end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   return (
//     <div className="cbpc-pagination">
//       <button className="cbpc-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {pages.map(p => (
//         <button key={p} className={`cbpc-page-btn ${current === p ? "cbpc-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="cbpc-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
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
// const ClientBusinessProductsCategories = () => {
//   const navigate = useNavigate();
//   const isMobile = useIsMobile();

//   const [categoryTree, setCategoryTree] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);

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

//   // Fetch categories
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
//     run();
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

//   // Client-side sort
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
//     <div className="cbpc-filter-footer-btns">
//       <button className="cbpc-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="cbpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const productSection = productsLoading ? (
//     <div className="cbpc-loading"><div className="cbpc-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="cbpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
//   ) : (
//     <>
//       <div className={`cbpc-grid ${isMobile ? "cbpc-grid--2col" : "cbpc-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
//             product={item.product} variant={item.variant} />
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
//         <div className="cbpc-mobile">
//           <div className="cbpc-mobile-topbar">
//             <button className="cbpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="cbpc-mobile-title">Categories</h1>
//             <div style={{ width: 36 }} />
//           </div>

//           <div className="cbpc-mobile-search-wrap">
//             <div className="cbpc-search-bar">
//               <Search size={15} className="cbpc-search-ico" />
//               <input type="text" placeholder="Search products..." className="cbpc-search-input"
//                 value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//               {searchTerm && <button className="cbpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>

//           <div className="cbpc-toolbar">
//             <button className="cbpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             <button className={`cbpc-toolbar-btn ${activeFilterCount > 0 ? "cbpc-toolbar-btn--on" : ""}`}
//               onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>
//               {activeFilterCount > 0 && <span className="cbpc-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>

//           {activeFilterCount > 0 && (
//             <ActiveChips
//               selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
//               selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
//               selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
//               clearAll={clearAll}
//             />
//           )}

//           <div className="cbpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
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
//         <div className="cbpc-desktop">
//           <div className="cbpc-desktop-header">
//             <div className="cbpc-desktop-header-inner">
//               <button className="cbpc-back-desktop" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={17} /><span>Back</span>
//               </button>
//               <h1 className="cbpc-desktop-title">Categories</h1>
//             </div>
//           </div>

//           <div className="cbpc-desktop-body">
//             {/* Sidebar */}
//             <aside className="cbpc-sidebar">
//               <div className="cbpc-sidebar-top">
//                 <span className="cbpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && (
//                   <button className="cbpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
//                 )}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>

//             {/* Main */}
//             <main className="cbpc-main">
//               <div className="cbpc-main-topbar">
//                 <div className="cbpc-desktop-search">
//                   <Search size={15} className="cbpc-search-ico" />
//                   <input type="text" placeholder="Search products..." className="cbpc-search-input"
//                     value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
//                   {searchTerm && <button className="cbpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//                 </div>
//                 <div className="cbpc-sort-wrap">
//                   <button className="cbpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//                     <span>{sortLabel}</span><ChevronDown size={14} />
//                   </button>
//                   {showSortDropdown && (
//                     <>
//                       <div className="cbpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                       <div className="cbpc-sort-dropdown">
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
//                   clearAll={clearAll}
//                 />
//               )}

//               <div className="cbpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ClientBusinessProductsCategories;





import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ClientNavbar from "../Client_Navbar/Client_Navbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal, ShoppingCart
} from "lucide-react";
import "./ClientBusinessProductsCategories.css";
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

// ============= Bottom Sheet (Mobile) =============
const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`cbpc-overlay ${isOpen ? "cbpc-overlay--on" : ""}`} onClick={onClose} />
      <div className={`cbpc-sheet ${isOpen ? "cbpc-sheet--open" : ""}`}>
        <div className="cbpc-sheet-handle" />
        <div className="cbpc-sheet-header">
          <span className="cbpc-sheet-title">{title}</span>
          <button className="cbpc-sheet-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="cbpc-sheet-body">{children}</div>
        {footer && <div className="cbpc-sheet-footer">{footer}</div>}
      </div>
    </>
  );
};

// ============= Sort List =============
const SortList = ({ sortBy, setSortBy, onClose }) => (
  <div className="cbpc-sort-list">
    {SORT_OPTIONS.map(opt => (
      <button key={opt.value}
        className={`cbpc-sort-opt ${sortBy === opt.value ? "cbpc-sort-opt--on" : ""}`}
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
      <div className={`cbpc-cat-row ${level > 0 ? "cbpc-cat-row--child" : ""}`}
        onClick={() => onToggle(category)}>
        <div className={`cbpc-checkbox ${on ? "cbpc-checkbox--on" : ""}`}>
          {on && <Check size={10} color="#fff" strokeWidth={3} />}
        </div>
        <span className={`cbpc-cat-label ${on ? "cbpc-cat-label--on" : ""}`}>{category.name}</span>
        {hasChildren && (
          <button className="cbpc-expand-btn" onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}>
            <ChevronRight size={13} style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "0.2s" }} />
          </button>
        )}
      </div>
      {expanded && hasChildren && (
        <div className="cbpc-cat-children">
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
  <div className={`cbpc-filter-row ${on ? "cbpc-filter-row--on" : ""}`} onClick={onClick}>
    <div className={`cbpc-checkbox ${on ? "cbpc-checkbox--on" : ""}`}>
      {on && <Check size={10} color="#fff" strokeWidth={3} />}
    </div>
    <span>{label}</span>
  </div>
);

// ============= Sidebar Section (Desktop) =============
const SidebarSection = ({ title, count, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="cbpc-sidebar-section">
      <button className="cbpc-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
        <span>
          {title}
          {count > 0 && <span className="cbpc-filter-badge">{count}</span>}
        </span>
        <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </button>
      {open && <div className="cbpc-sidebar-section-body">{children}</div>}
    </div>
  );
};

// ============= Filter Content =============
const FilterContent = ({
  categoryTree, loading, isSidebar,
  selectedCategories, setSelectedCategories,
  selectedPriceRanges, setSelectedPriceRanges,
  selectedDiscountRanges, setSelectedDiscountRanges,
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
      <div className="cbpc-sidebar-filter">
        <SidebarSection title="Categories" count={selectedCategories.length}>
          {loading
            ? <div className="cbpc-load-inline"><div className="cbpc-spinner-sm" /> Loading...</div>
            : categoryTree.length === 0
              ? <p className="cbpc-empty-txt">No categories</p>
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
      </div>
    );
  }

  // Mobile tabbed
  const tabs = [
    { key: "categories", label: "Category", count: selectedCategories.length },
    { key: "price", label: "Price", count: selectedPriceRanges.length },
    { key: "discount", label: "Discount", count: selectedDiscountRanges.length },
  ];
  return (
    <>
      <div className="cbpc-filter-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`cbpc-filter-tab ${tab === t.key ? "cbpc-filter-tab--on" : ""}`}
            onClick={() => setTab(t.key)}>
            {t.label}
            {t.count > 0 && <span className="cbpc-tab-badge">{t.count}</span>}
          </button>
        ))}
      </div>
      <div className="cbpc-filter-tab-body">
        {tab === "categories" && (
          loading
            ? <div className="cbpc-load-inline"><div className="cbpc-spinner-sm" /> Loading...</div>
            : categoryTree.length === 0
              ? <p className="cbpc-empty-txt">No categories</p>
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
      </div>
    </>
  );
};

// ============= Product Card (Updated with Cart Integration) =============
const ProductCard = ({ product, variant }) => {
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
    const checkCartStatus = async () => {
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
        console.error("Error checking cart status:", error);
      }
    };
    
    checkCartStatus();
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
        
        setQty(newQty);
      } else {
        // Add new item to cart
        const response = await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          variant: variant.id,
          quantity: 1
        });
        
        setQty(1);
        setCartItemId(response.data.id);
      }
      
      // Trigger cart update event for navbar
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
          navigate('/client-add-to-cart');
        }
      });
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add to cart. Please try again.',
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
      // Remove from cart
      setLoading(true);
      try {
        await axios.delete(`${baseurl}/cart/${cartItemId}/`);
        setQty(0);
        setCartItemId(null);
        
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
        
        setQty(newQty);
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
        <small className="cbpc-card-brand">{product.brand || ""}</small>
        {discount > 0 && <span className="cbpc-card-off">{discount}% OFF</span>}
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

// ============= Active Chips =============
const ActiveChips = ({ selectedCategories, setSelectedCategories, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
  <div className="cbpc-chips">
    {selectedCategories.map(cat => (
      <span key={cat.category_id} className="cbpc-chip">{cat.name}
        <button onClick={() => setSelectedCategories(p => p.filter(c => c.category_id !== cat.category_id))}><X size={10} /></button>
      </span>
    ))}
    {selectedPriceRanges.map(r => (
      <span key={r} className="cbpc-chip"><DollarSign size={10} />{r}
        <button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
    ))}
    {selectedDiscountRanges.map(r => (
      <span key={r} className="cbpc-chip"><Tag size={10} />{r}%
        <button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>
    ))}
    <button className="cbpc-chip cbpc-chip--clear" onClick={clearAll}>Clear All</button>
  </div>
);

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
const ClientBusinessProductsCategories = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [categoryTree, setCategoryTree] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);

  const PAGE_SIZE = 12;

  // Fetch categories
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
    run();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const params = new URLSearchParams({ variant_verification_status: "verified" });
      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      selectedPriceRanges.forEach(r => params.append("price_range", r));
      selectedDiscountRanges.forEach(r => params.append("discount_range", r));
      selectedCategories.forEach(c => params.append("category_id", c.category_id));

      const res = await fetch(`${baseurl}/products/?${params}`);
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
  }, [searchTerm, selectedPriceRanges, selectedDiscountRanges, selectedCategories]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

  // Client-side sort
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
  };

  const mobileFilterFooter = (
    <div className="cbpc-filter-footer-btns">
      <button className="cbpc-btn-clear" onClick={clearAll}>Clear All</button>
      <button className="cbpc-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
    </div>
  );

  const productSection = productsLoading ? (
    <div className="cbpc-loading"><div className="cbpc-spinner" /><span>Loading products...</span></div>
  ) : sortedProducts.length === 0 ? (
    <div className="cbpc-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
  ) : (
    <>
      <div className={`cbpc-grid ${isMobile ? "cbpc-grid--2col" : "cbpc-grid--desktop"}`}>
        {paginated.map(item => (
          <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
            product={item.product} variant={item.variant} />
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
        <div className="cbpc-mobile">
          <div className="cbpc-mobile-topbar">
            <button className="cbpc-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
            <h1 className="cbpc-mobile-title">categories</h1>
            <div style={{ width: 36 }} />
          </div>

          <div className="cbpc-mobile-search-wrap">
            <div className="cbpc-search-bar">
              <Search size={15} className="cbpc-search-ico" />
              <input type="text" placeholder="Search products..." className="cbpc-search-input"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              {searchTerm && <button className="cbpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
            </div>
          </div>

          <div className="cbpc-toolbar">
            <button className="cbpc-toolbar-btn" onClick={() => setShowSortSheet(true)}>
              <span>{sortLabel}</span><ChevronDown size={14} />
            </button>
            <button className={`cbpc-toolbar-btn ${activeFilterCount > 0 ? "cbpc-toolbar-btn--on" : ""}`}
              onClick={() => setShowFilterSheet(true)}>
              <Filter size={14} /><span>Filter</span>
              {activeFilterCount > 0 && <span className="cbpc-toolbar-badge">{activeFilterCount}</span>}
            </button>
          </div>

          {activeFilterCount > 0 && (
            <ActiveChips
              selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
              selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
              selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
              clearAll={clearAll}
            />
          )}

          <div className="cbpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
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
        <div className="cbpc-desktop">
          <div className="cbpc-desktop-header">
            <div className="cbpc-desktop-header-inner">
              <button className="cbpc-back-desktop" onClick={() => navigate(-1)}>
                <ArrowLeft size={17} /><span>Back</span>
              </button>
              <h1 className="cbpc-desktop-title">Categories</h1>
            </div>
          </div>

          <div className="cbpc-desktop-body">
            {/* Sidebar */}
            <aside className="cbpc-sidebar">
              <div className="cbpc-sidebar-top">
                <span className="cbpc-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
                {activeFilterCount > 0 && (
                  <button className="cbpc-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
                )}
              </div>
              <FilterContent {...filterProps} isSidebar={true} />
            </aside>

            {/* Main */}
            <main className="cbpc-main">
              <div className="cbpc-main-topbar">
                <div className="cbpc-desktop-search">
                  <Search size={15} className="cbpc-search-ico" />
                  <input type="text" placeholder="Search products..." className="cbpc-search-input"
                    value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  {searchTerm && <button className="cbpc-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
                </div>
                <div className="cbpc-sort-wrap">
                  <button className="cbpc-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
                    <span>{sortLabel}</span><ChevronDown size={14} />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="cbpc-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
                      <div className="cbpc-sort-dropdown">
                        <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <ActiveChips
                  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
                  selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
                  selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
                  clearAll={clearAll}
                />
              )}

              <div className="cbpc-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
              {productSection}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientBusinessProductsCategories;