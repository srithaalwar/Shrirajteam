
//==========================================================



// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info,
//   Edit, Package, Image as ImageIcon, Trash2, Plus,
//   CheckCircle, XCircle, Clock, TrendingUp, PackageOpen
// } from "lucide-react";
// import './Business_Products.css';
// import { baseurl } from "../../BaseURL/BaseURL";

// // ============= useIsMobile =============
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
//   useEffect(() => {
//     const h = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", h);
//     return () => window.removeEventListener("resize", h);
//   }, []);
//   return isMobile;
// };

// const SORT_OPTIONS = [
//   { value: "default", label: "Relevance" },
//   { value: "price_asc", label: "Price: Low to High" },
//   { value: "price_desc", label: "Price: High to Low" },
//   { value: "discount_desc", label: "Highest Discount" },
//   { value: "name_asc", label: "Name: A to Z" },
//   { value: "name_desc", label: "Name: Z to A" },
// ];

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

// // ============= Bottom Sheet =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);
//   return (
//     <>
//       <div className={`mp-overlay ${isOpen ? "mp-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`mp-sheet ${isOpen ? "mp-sheet--open" : ""}`}>
//         <div className="mp-sheet-handle" />
//         <div className="mp-sheet-header">
//           <span className="mp-sheet-title">{title}</span>
//           <button className="mp-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="mp-sheet-body">{children}</div>
//         {footer && <div className="mp-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="mp-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`mp-sort-opt ${sortBy === opt.value ? "mp-sort-opt--on" : ""}`}
//         onClick={() => { setSortBy(opt.value); onClose?.(); }}>
//         <span>{opt.label}</span>
//         {sortBy === opt.value && <Check size={16} />}
//       </button>
//     ))}
//   </div>
// );

// const CheckRow = ({ label, on, onClick }) => (
//   <div className={`mp-filter-row ${on ? "mp-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`mp-checkbox ${on ? "mp-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(true);
//   return (
//     <div className="mp-sidebar-section">
//       <button className="mp-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>{title}{count > 0 && <span className="mp-filter-badge">{count}</span>}</span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="mp-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// const FilterContent = ({ isSidebar, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges }) => {
//   const [tab, setTab] = useState("price");
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);
//   if (isSidebar) return (
//     <div className="mp-sidebar-filter">
//       <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
//         {PRICE_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)} onClick={() => toggle(setSelectedPriceRanges, r.value)} />)}
//       </SidebarSection>
//       <SidebarSection title="Discount" count={selectedDiscountRanges.length}>
//         {DISCOUNT_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)} onClick={() => toggle(setSelectedDiscountRanges, r.value)} />)}
//       </SidebarSection>
//     </div>
//   );
//   const tabs = [{ key: "price", label: "Price", count: selectedPriceRanges.length }, { key: "discount", label: "Discount", count: selectedDiscountRanges.length }];
//   return (
//     <>
//       <div className="mp-filter-tabs">
//         {tabs.map(t => <button key={t.key} className={`mp-filter-tab ${tab === t.key ? "mp-filter-tab--on" : ""}`} onClick={() => setTab(t.key)}>{t.label}{t.count > 0 && <span className="mp-tab-badge">{t.count}</span>}</button>)}
//       </div>
//       <div className="mp-filter-tab-body">
//         {tab === "price" && PRICE_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)} onClick={() => toggle(setSelectedPriceRanges, r.value)} />)}
//         {tab === "discount" && DISCOUNT_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)} onClick={() => toggle(setSelectedDiscountRanges, r.value)} />)}
//       </div>
//     </>
//   );
// };

// const ActiveChips = ({ selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="mp-chips">
//     {selectedPriceRanges.map(r => <span key={r} className="mp-chip"><DollarSign size={10} />{r}<button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>)}
//     {selectedDiscountRanges.map(r => <span key={r} className="mp-chip"><Tag size={10} />{r}%<button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>)}
//     <button className="mp-chip mp-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2), end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   return (
//     <div className="mp-pagination">
//       <button className="mp-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(p => (
//         <button key={p} className={`mp-page-btn ${current === p ? "mp-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="mp-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= MODALS =============
// const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
//   const [f, setF] = useState({ product_name: "", brand: "", description: "", verification_status: "pending", is_active: false });
//   useEffect(() => { if (product) setF({ product_name: product.product_name || "", brand: product.brand || "", description: product.description || "", verification_status: product.verification_status || "pending", is_active: product.is_active || false }); }, [product]);
//   const ch = e => { const { name, value, type, checked } = e.target; setF(p => ({ ...p, [name]: type === "checkbox" ? checked : value })); };
//   if (!isOpen) return null;
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Edit Product: {product?.product_name}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           <div className="col-md-6 mb-3"><label className="form-label">Product Name *</label><input type="text" className="form-control" name="product_name" value={f.product_name} onChange={ch} required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Brand</label><input type="text" className="form-control" name="brand" value={f.brand} onChange={ch} /></div>
//           <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea className="form-control" name="description" rows="3" value={f.description} onChange={ch} /></div>
//         </div></div>
//         <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={() => onSave(product.product_id, f)}>Save Changes</button></div>
//       </div></div>
//     </div>
//   );
// };

// const EditVariantModal = ({ product, variant, isOpen, onClose, onSave, onDelete }) => {
//   const [f, setF] = useState({ 
//     mrp: "", 
//     selling_price: "", 
//     stock: "", 
//     hsn_code: "", 
//     is_returnable: false, 
//     return_days: 7, 
//     is_active: false, 
//     product_commission: "0.00", 
//     distribution_commission: "0.00", 
//     verification_status: "pending" 
//   });
  
//   useEffect(() => { 
//     if (variant) {
//       console.log("Loading variant for edit:", {
//         id: variant.id,
//         sku: variant.sku,
//         is_active: variant.is_active,
//         is_active_type: typeof variant.is_active
//       });
      
//       setF({ 
//         mrp: variant.mrp || "", 
//         selling_price: variant.selling_price || "", 
//         stock: variant.stock || "", 
//         hsn_code: variant.hsn_code || "", 
//         is_returnable: variant.is_returnable || false, 
//         return_days: variant.return_days || 7, 
//         is_active: variant.is_active === true, // Ensure boolean
//         product_commission: variant.product_commission || "0.00", 
//         distribution_commission: variant.distribution_commission || "0.00", 
//         verification_status: variant.verification_status || "pending" 
//       });
//     }
//   }, [variant]);
  
//   const ch = e => { 
//     const { name, value, type, checked } = e.target; 
//     setF(p => ({ 
//       ...p, 
//       [name]: type === "checkbox" ? checked : value 
//     })); 
//   };
  
//   if (!isOpen) return null;
  
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Edit Variant: {variant?.sku}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           <div className="col-md-6 mb-3"><label className="form-label">SKU</label><input type="text" className="form-control" value={variant?.sku || ""} readOnly /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Variant ID</label><input type="text" className="form-control" value={variant?.id || ""} readOnly /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">MRP *</label><input type="number" className="form-control" name="mrp" value={f.mrp} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Selling Price *</label><input type="number" className="form-control" name="selling_price" value={f.selling_price} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Stock *</label><input type="number" className="form-control" name="stock" value={f.stock} onChange={ch} min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">HSN Code</label><input type="text" className="form-control" name="hsn_code" value={f.hsn_code} onChange={ch} /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Return Days</label><input type="number" className="form-control" name="return_days" value={f.return_days} onChange={ch} min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Product Commission (₹)</label><input type="number" className="form-control" name="product_commission" value={f.product_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Distribution Commission (₹)</label><input type="number" className="form-control" name="distribution_commission" value={f.distribution_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Verification Status</label><select className="form-select" name="verification_status" value={f.verification_status} onChange={ch}><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_returnable" checked={f.is_returnable} onChange={ch} /><label className="form-check-label">Returnable</label></div></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_active" checked={f.is_active} onChange={ch} /><label className="form-check-label">Active</label></div></div>
//           <div className="col-md-12 mb-3"><h6>Attributes</h6><pre className="bg-light p-3 rounded" style={{ fontSize: 12 }}>{JSON.stringify(variant?.attributes || {}, null, 2)}</pre></div>
//         </div></div>
//         <div className="modal-footer">
//           <button className="btn btn-danger" onClick={() => { if (window.confirm(`Delete variant ${variant?.sku}?`)) onDelete(product.product_id, variant.id); }}><Trash2 size={14} /> Delete</button>
//           <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
//           <button className="btn btn-primary" onClick={() => {
//             console.log("Saving variant with data:", f);
//             onSave(product.product_id, variant.id, f);
//           }}>Save Changes</button>
//         </div>
//       </div></div>
//     </div>
//   );
// };

// const AddVariantModal = ({ product, isOpen, onClose, onAdd }) => {
//   const [f, setF] = useState({ sku: "", mrp: "", selling_price: "", stock: "", hsn_code: "", is_returnable: false, return_days: 7, is_active: true, product_commission: "0.00", distribution_commission: "0.00", verification_status: "pending", attributes: '{\n  "quantity": "",\n  "packaging": "",\n  "display": ""\n}' });
//   const ch = e => { const { name, value, type, checked } = e.target; setF(p => ({ ...p, [name]: type === "checkbox" ? checked : value })); };
//   if (!isOpen) return null;
//   const submit = () => { try { const attrs = JSON.parse(f.attributes); onAdd(product.product_id, { sku: f.sku, mrp: parseFloat(f.mrp), selling_price: parseFloat(f.selling_price), stock: parseInt(f.stock), hsn_code: f.hsn_code || null, is_returnable: f.is_returnable, return_days: parseInt(f.return_days), is_active: f.is_active, product_commission: f.product_commission, distribution_commission: f.distribution_commission, verification_status: f.verification_status, attributes: attrs, media: [{ media_type: "image" }] }); } catch { alert("Invalid JSON in attributes"); } };
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Add Variant — {product?.product_name}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           <div className="col-md-6 mb-3"><label className="form-label">SKU *</label><input type="text" className="form-control" name="sku" value={f.sku} onChange={ch} required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">MRP *</label><input type="number" className="form-control" name="mrp" value={f.mrp} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Selling Price *</label><input type="number" className="form-control" name="selling_price" value={f.selling_price} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Stock *</label><input type="number" className="form-control" name="stock" value={f.stock} onChange={ch} min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">HSN Code</label><input type="text" className="form-control" name="hsn_code" value={f.hsn_code} onChange={ch} /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Return Days</label><input type="number" className="form-control" name="return_days" value={f.return_days} onChange={ch} min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Product Commission (₹)</label><input type="number" className="form-control" name="product_commission" value={f.product_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Distribution Commission (₹)</label><input type="number" className="form-control" name="distribution_commission" value={f.distribution_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Verification Status</label><select className="form-select" name="verification_status" value={f.verification_status} onChange={ch}><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_returnable" checked={f.is_returnable} onChange={ch} /><label className="form-check-label">Returnable</label></div></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_active" checked={f.is_active} onChange={ch} /><label className="form-check-label">Active</label></div></div>
//           <div className="col-md-12 mb-3"><label className="form-label">Attributes (JSON)</label><textarea className="form-control" name="attributes" rows="4" value={f.attributes} onChange={ch} /><small className="text-muted">Enter valid JSON</small></div>
//         </div></div>
//         <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-success" onClick={submit}><Plus size={14} /> Add Variant</button></div>
//       </div></div>
//     </div>
//   );
// };

// const ManageMediaModal = ({ product, variant, isOpen, onClose, onDeleteMedia }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Media — {variant?.sku}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           {variant?.media?.map(m => (
//             <div key={m.id} className="col-md-4 mb-3"><div className="card text-center"><div className="card-body">
//               {m.media_type === "image" ? <img src={`${baseurl}${m.file}`} alt="Media" className="img-fluid mb-2" style={{ maxHeight: 150, objectFit: "contain" }} onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} /> : <div className="bg-light p-4 mb-2"><PackageOpen size={40} className="text-muted" /></div>}
//               <div className="d-flex justify-content-between align-items-center"><small className="text-muted">{m.media_type}</small><button className="btn btn-sm btn-outline-danger" onClick={() => { if (window.confirm("Delete this media?")) onDeleteMedia(product.product_id, m.id); }}><Trash2 size={12} /></button></div>
//             </div></div></div>
//           ))}
//           {(!variant?.media || variant.media.length === 0) && <div className="col-12 text-center py-5"><ImageIcon size={48} className="text-muted mb-2" /><p className="text-muted">No media files</p></div>}
//         </div></div>
//         <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Close</button></div>
//       </div></div>
//     </div>
//   );
// };

// // ============= Product Card =============
// const ProductCard = ({ product, variant, onEditProduct, onEditVariant, onAddVariant, onManageMedia }) => {
//   const navigate = useNavigate();

//   const getImage = () => {
//     const img = variant.media?.find(m => m.media_type === "image");
//     if (img) return `${baseurl}${img.file}`;
//     for (const v of product.variants || []) { const m = v.media?.find(m => m.media_type === "image"); if (m) return `${baseurl}${m.file}`; }
//     return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
//   };

//   const mrp = parseFloat(variant.mrp) || 0;
//   const price = parseFloat(variant.selling_price) || 0;
//   const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

//   const getVariantDisplay = () => {
//     if (!variant.attributes) return "";
//     return ["display", "packaging", "milk_type", "fat_content", "quantity"].map(k => variant.attributes[k]).filter(Boolean).join(" • ");
//   };

//   const productName = variant.attributes?.display ? `${product.product_name} - ${variant.attributes.display}` : product.product_name;
//   const verMap = { verified: { cls: "mp-ver--ok", icon: <CheckCircle size={11} /> }, rejected: { cls: "mp-ver--no", icon: <XCircle size={11} /> } };
//   const ver = verMap[variant.verification_status] || { cls: "mp-ver--pending", icon: <Clock size={11} /> };
//   const url = `/admin-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   return (
//     <div className="mp-card">
//       <div className="mp-card-img-wrap" onClick={() => navigate(url)}>
//         <img src={getImage()} alt={productName} className="mp-card-img"
//           onError={e => { e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300"; }} />
//         {discount > 0 && <span className="mp-card-disc">{discount}% OFF</span>}
//         <span className={`mp-card-active ${variant.is_active ? "mp-card-active--on" : "mp-card-active--off"}`}>
//           {variant.is_active ? "Active" : "Inactive"}
//         </span>
//       </div>
//       <div className="mp-card-body">
//         <p className="mp-card-name" onClick={() => navigate(url)}>{productName}</p>
//         <div className="mp-card-meta">
//           <small className="mp-card-brand">{product.brand || "No Brand"}</small>
//           <span className={`mp-ver-badge ${ver.cls}`}>{ver.icon} {variant.verification_status || "pending"}</span>
//         </div>
//         {getVariantDisplay() && <small className="mp-card-attrs">{getVariantDisplay()}</small>}
//         <small className={`mp-stock ${variant.stock > 0 ? "mp-stock--in" : "mp-stock--out"}`}>
//           {variant.stock > 0 ? `In Stock (${variant.stock})` : "Out of Stock"}
//         </small>
//         <div className="mp-card-prices">
//           <span className="mp-card-price">₹{price.toFixed(2)}</span>
//           {mrp > price && <span className="mp-card-mrp">₹{mrp.toFixed(2)}</span>}
//         </div>
//       </div>
//       <div className="mp-card-foot" onClick={e => e.stopPropagation()}>
//         <div className="mp-action-row">
//           <button className="mp-action-btn mp-action-btn--blue" onClick={() => onEditProduct(product)} title="Edit Product"><Edit size={12} /><span>Product</span></button>
//           <button className="mp-action-btn mp-action-btn--teal" onClick={() => onEditVariant(product, variant)} title="Edit Variant"><Package size={12} /><span>Variant</span></button>
//           <button className="mp-action-btn mp-action-btn--amber" onClick={() => onManageMedia(product, variant)} title="Manage Media"><ImageIcon size={12} /><span>Media</span></button>
//         </div>
//         <button className="mp-view-btn" onClick={() => navigate(url)}>VIEW DETAILS</button>
//         <button className="mp-payout-btn"><Info size={13} /> PAYOUT</button>
//       </div>
//     </div>
//   );
// };

// // ============= Main =============
// const MyProducts = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isMobile = useIsMobile();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [businessName, setBusinessName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("default");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showSortSheet, setShowSortSheet] = useState(false);
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);
//   const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
//   const [editVariantModal, setEditVariantModal] = useState({ isOpen: false, product: null, variant: null });
//   const [addVariantModal, setAddVariantModal] = useState({ isOpen: false, product: null });
//   const [manageMediaModal, setManageMediaModal] = useState({ isOpen: false, product: null, variant: null });

//   const PAGE_SIZE = 12;
//   const getBusinessId = () => new URLSearchParams(location.search).get("business");
//   const getUserId = () => { try { const u = localStorage.getItem("user"); if (u) { const d = JSON.parse(u); return d.user_id || d.id; } return parseInt(localStorage.getItem("user_id") || "2"); } catch { return 2; } };

//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const fetchProducts = useCallback(() => {
//     setLoading(true);
//     const businessId = getBusinessId();

//     let url = `${baseurl}/products/?`;
//     const params = new URLSearchParams();

//     if (businessId) {
//       params.append("business", businessId);
//       fetch(`${baseurl}/business/${businessId}/`)
//         .then(r => r.json())
//         .then(d => { if (d.business_name) setBusinessName(d.business_name); })
//         .catch(() => { });
//     } else {
//       params.append("user_id", getUserId());
//     }

//     if (debouncedSearchTerm.trim()) {
//       params.append("search", debouncedSearchTerm.trim());
//     }

//     selectedPriceRanges.forEach(r => params.append("price_range", r));
//     selectedDiscountRanges.forEach(r => params.append("discount_range", r));

//     const fullUrl = `${baseurl}/products/?${params}`;

//     fetch(fullUrl)
//       .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
//       .then(data => {
//         const items = [];
//         (data.results || []).forEach(product => {
//           if (product.variants?.length > 0) {
//             product.variants.forEach(v => items.push({ product, variant: v }));
//           } else {
//             items.push({ product, variant: { 
//               id: product.product_id, 
//               sku: product.product_id, 
//               mrp: "0.00", 
//               selling_price: "0.00", 
//               stock: 0, 
//               verification_status: product.verification_status || "pending", 
//               attributes: {}, 
//               media: [],
//               is_active: product.is_active || false
//             } });
//           }
//         });
//         setProducts(items);
//       })
//       .catch(e => { console.error(e); setProducts([]); })
//       .finally(() => setLoading(false));
//   }, [location.search, debouncedSearchTerm, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [debouncedSearchTerm, sortBy, selectedPriceRanges, selectedDiscountRanges]);

//   // Client-side sorting only
//   const sortedProducts = useMemo(() => {
//     const list = [...products];
//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": {
//         const d = i => {
//           const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price);
//           return m > 0 ? ((m - s) / m) * 100 : 0;
//         };
//         list.sort((a, b) => d(b) - d(a));
//         break;
//       }
//       case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
//     }
//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
//   const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";
//   const filterProps = { selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges };

//   const handleUpdateProduct = (productId, data) => {
//     fetch(`${baseurl}/products/${productId}/`, { 
//       method: "PUT", 
//       headers: { "Content-Type": "application/json" }, 
//       body: JSON.stringify({ product: { 
//         verification_status: data.verification_status, 
//         brand: data.brand, 
//         product_name: data.product_name, 
//         description: data.description, 
//         is_active: data.is_active 
//       } }) 
//     })
//       .then(r => r.json())
//       .then(() => { 
//         alert("Product updated!"); 
//         fetchProducts(); 
//         setEditProductModal({ isOpen: false, product: null }); 
//       })
//       .catch(() => alert("Failed to update"));
//   };

//   const handleUpdateVariant = (productId, variantId, data) => {
//     // Ensure proper data types for the payload
//     const variantPayload = {
//       id: variantId,
//       mrp: parseFloat(data.mrp) || 0,
//       selling_price: parseFloat(data.selling_price) || 0,
//       stock: parseInt(data.stock) || 0,
//       hsn_code: data.hsn_code || null,
//       is_returnable: Boolean(data.is_returnable),
//       return_days: parseInt(data.return_days) || 7,
//       is_active: Boolean(data.is_active), // Convert to boolean explicitly
//       product_commission: data.product_commission || "0.00",
//       distribution_commission: data.distribution_commission || "0.00",
//       verification_status: data.verification_status || "pending"
//     };

//     console.log("Updating variant with payload:", variantPayload);

//     fetch(`${baseurl}/products/${productId}/`, { 
//       method: "PUT", 
//       headers: { "Content-Type": "application/json" }, 
//       body: JSON.stringify({ variants: [variantPayload] })
//     })
//       .then(async response => {
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("API Error:", errorText);
//           throw new Error(`HTTP ${response.status}: ${errorText}`);
//         }
//         return response.json();
//       })
//       .then(result => {
//         console.log("Update successful:", result);
//         alert("Variant updated successfully!");
//         fetchProducts(); // Refresh the products list
//         setEditVariantModal({ isOpen: false, product: null, variant: null });
//       })
//       .catch(error => {
//         console.error("Failed to update variant:", error);
//         alert(`Failed to update variant: ${error.message}`);
//       });
//   };

//   const handleAddVariant = (productId, variantData) => {
//     const fd = new FormData(); 
//     fd.append("variants", JSON.stringify([variantData]));
//     fetch(`${baseurl}/products/${productId}/`, { method: "PUT", body: fd })
//       .then(r => r.json())
//       .then(() => { 
//         alert("Variant added!"); 
//         fetchProducts(); 
//         setAddVariantModal({ isOpen: false, product: null }); 
//       })
//       .catch(() => alert("Failed to add"));
//   };

//   const handleDeleteVariant = (productId, variantId) => {
//     if (window.confirm("Are you sure you want to delete this variant?")) {
//       fetch(`${baseurl}/products/${productId}/?variants=${variantId}`, { method: "DELETE" })
//         .then(r => { 
//           if (!r.ok) throw new Error(); 
//           alert("Variant deleted successfully!"); 
//           fetchProducts(); 
//           setEditVariantModal({ isOpen: false, product: null, variant: null }); 
//         })
//         .catch(() => alert("Failed to delete variant"));
//     }
//   };

//   const handleDeleteMedia = (productId, mediaId) => {
//     if (window.confirm("Are you sure you want to delete this media?")) {
//       fetch(`${baseurl}/products/${productId}/?media=${mediaId}`, { method: "DELETE" })
//         .then(r => { 
//           if (!r.ok) throw new Error(); 
//           alert("Media deleted successfully!"); 
//           fetchProducts(); 
//           setManageMediaModal({ isOpen: false, product: null, variant: null }); 
//         })
//         .catch(() => alert("Failed to delete media"));
//     }
//   };

//   const mobileFilterFooter = (
//     <div className="mp-filter-footer-btns">
//       <button className="mp-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="mp-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const cardProps = {
//     onEditProduct: p => setEditProductModal({ isOpen: true, product: p }),
//     onEditVariant: (p, v) => setEditVariantModal({ isOpen: true, product: p, variant: v }),
//     onAddVariant: p => setAddVariantModal({ isOpen: true, product: p }),
//     onManageMedia: (p, v) => setManageMediaModal({ isOpen: true, product: p, variant: v }),
//   };

//   const productSection = loading ? (
//     <div className="mp-loading"><div className="mp-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="mp-empty"><p>No products found</p><small>{debouncedSearchTerm || activeFilterCount > 0 ? "Try adjusting search or filters" : businessName ? `No products for ${businessName}` : "No products added yet"}</small></div>
//   ) : (
//     <>
//       <div className={`mp-grid ${isMobile ? "mp-grid--2col" : "mp-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`} product={item.product} variant={item.variant} {...cardProps} />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <AdminNavbar />

//       {isMobile && (
//         <div className="mp-mobile">
//           <div className="mp-mobile-topbar">
//             <button className="mp-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="mp-mobile-title">Products</h1>
//             <div style={{ width: 36 }} />
//           </div>
//           <div className="mp-mobile-search-wrap">
//             <div className="mp-search-bar">
//               <Search size={15} className="mp-search-ico" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="mp-search-input"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>
//           <div className="mp-toolbar">
//             <button className="mp-toolbar-btn" onClick={() => setShowSortSheet(true)}><span>{sortLabel}</span><ChevronDown size={14} /></button>
//             <button className={`mp-toolbar-btn ${activeFilterCount > 0 ? "mp-toolbar-btn--on" : ""}`} onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>{activeFilterCount > 0 && <span className="mp-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>
//           {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
//           <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />
//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>
//           <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)} title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
//             <FilterContent {...filterProps} />
//           </BottomSheet>
//         </div>
//       )}

//       {!isMobile && (
//         <div className="mp-desktop">
//           <div className="mp-desktop-header">
//             <div className="mp-desktop-header-inner">
//               <button className="mp-back-desktop" onClick={() => navigate(-1)}><ArrowLeft size={17} /><span>Back</span></button>
//               <h1 className="mp-desktop-title">Products{businessName ? ` — ${businessName}` : ""}</h1>
//             </div>
//           </div>
//           <div className="mp-desktop-body">
//             <aside className="mp-sidebar">
//               <div className="mp-sidebar-top">
//                 <span className="mp-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && <button className="mp-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>
//             <main className="mp-main">
//               <div className="mp-main-topbar">
//                 <div className="mp-desktop-search">
//                   <Search size={15} className="mp-search-ico" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="mp-search-input"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                   />
//                   {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//                 </div>
//                 <div className="mp-sort-wrap">
//                   <button className="mp-sort-btn" onClick={() => setShowSortDropdown(v => !v)}><span>{sortLabel}</span><ChevronDown size={14} /></button>
//                   {showSortDropdown && (<>
//                     <div className="mp-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                     <div className="mp-sort-dropdown"><SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} /></div>
//                   </>)}
//                 </div>
//               </div>
//               {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
//               <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )}

//       <EditProductModal product={editProductModal.product} isOpen={editProductModal.isOpen} onClose={() => setEditProductModal({ isOpen: false, product: null })} onSave={handleUpdateProduct} />
//       <EditVariantModal product={editVariantModal.product} variant={editVariantModal.variant} isOpen={editVariantModal.isOpen} onClose={() => setEditVariantModal({ isOpen: false, product: null, variant: null })} onSave={handleUpdateVariant} onDelete={handleDeleteVariant} />
//       <AddVariantModal product={addVariantModal.product} isOpen={addVariantModal.isOpen} onClose={() => setAddVariantModal({ isOpen: false, product: null })} onAdd={handleAddVariant} />
//       <ManageMediaModal product={manageMediaModal.product} variant={manageMediaModal.variant} isOpen={manageMediaModal.isOpen} onClose={() => setManageMediaModal({ isOpen: false, product: null, variant: null })} onDeleteMedia={handleDeleteMedia} />
//     </>
//   );
// };

// export default MyProducts;





//======================================================
// replaced default product image changed in the below code 


// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
// import {
//   Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
//   Filter, Check, ChevronRight, SlidersHorizontal, Info,
//   Edit, Package, Image as ImageIcon, Trash2, Plus,
//   CheckCircle, XCircle, Clock, TrendingUp, PackageOpen
// } from "lucide-react";
// import './Business_Products.css';
// import { baseurl } from "../../BaseURL/BaseURL";
// import defaultProductImage from "../../Logos/business-default-image.png"; // Update path as needed

// // ============= useIsMobile =============
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
//   useEffect(() => {
//     const h = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", h);
//     return () => window.removeEventListener("resize", h);
//   }, []);
//   return isMobile;
// };

// const SORT_OPTIONS = [
//   { value: "default", label: "Relevance" },
//   { value: "price_asc", label: "Price: Low to High" },
//   { value: "price_desc", label: "Price: High to Low" },
//   { value: "discount_desc", label: "Highest Discount" },
//   { value: "name_asc", label: "Name: A to Z" },
//   { value: "name_desc", label: "Name: Z to A" },
// ];

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

// // ============= Bottom Sheet =============
// const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);
//   return (
//     <>
//       <div className={`mp-overlay ${isOpen ? "mp-overlay--on" : ""}`} onClick={onClose} />
//       <div className={`mp-sheet ${isOpen ? "mp-sheet--open" : ""}`}>
//         <div className="mp-sheet-handle" />
//         <div className="mp-sheet-header">
//           <span className="mp-sheet-title">{title}</span>
//           <button className="mp-sheet-close" onClick={onClose}><X size={20} /></button>
//         </div>
//         <div className="mp-sheet-body">{children}</div>
//         {footer && <div className="mp-sheet-footer">{footer}</div>}
//       </div>
//     </>
//   );
// };

// const SortList = ({ sortBy, setSortBy, onClose }) => (
//   <div className="mp-sort-list">
//     {SORT_OPTIONS.map(opt => (
//       <button key={opt.value}
//         className={`mp-sort-opt ${sortBy === opt.value ? "mp-sort-opt--on" : ""}`}
//         onClick={() => { setSortBy(opt.value); onClose?.(); }}>
//         <span>{opt.label}</span>
//         {sortBy === opt.value && <Check size={16} />}
//       </button>
//     ))}
//   </div>
// );

// const CheckRow = ({ label, on, onClick }) => (
//   <div className={`mp-filter-row ${on ? "mp-filter-row--on" : ""}`} onClick={onClick}>
//     <div className={`mp-checkbox ${on ? "mp-checkbox--on" : ""}`}>
//       {on && <Check size={10} color="#fff" strokeWidth={3} />}
//     </div>
//     <span>{label}</span>
//   </div>
// );

// const SidebarSection = ({ title, count, children }) => {
//   const [open, setOpen] = useState(true);
//   return (
//     <div className="mp-sidebar-section">
//       <button className="mp-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
//         <span>{title}{count > 0 && <span className="mp-filter-badge">{count}</span>}</span>
//         <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
//       </button>
//       {open && <div className="mp-sidebar-section-body">{children}</div>}
//     </div>
//   );
// };

// const FilterContent = ({ isSidebar, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges }) => {
//   const [tab, setTab] = useState("price");
//   const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);
//   if (isSidebar) return (
//     <div className="mp-sidebar-filter">
//       <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
//         {PRICE_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)} onClick={() => toggle(setSelectedPriceRanges, r.value)} />)}
//       </SidebarSection>
//       <SidebarSection title="Discount" count={selectedDiscountRanges.length}>
//         {DISCOUNT_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)} onClick={() => toggle(setSelectedDiscountRanges, r.value)} />)}
//       </SidebarSection>
//     </div>
//   );
//   const tabs = [{ key: "price", label: "Price", count: selectedPriceRanges.length }, { key: "discount", label: "Discount", count: selectedDiscountRanges.length }];
//   return (
//     <>
//       <div className="mp-filter-tabs">
//         {tabs.map(t => <button key={t.key} className={`mp-filter-tab ${tab === t.key ? "mp-filter-tab--on" : ""}`} onClick={() => setTab(t.key)}>{t.label}{t.count > 0 && <span className="mp-tab-badge">{t.count}</span>}</button>)}
//       </div>
//       <div className="mp-filter-tab-body">
//         {tab === "price" && PRICE_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)} onClick={() => toggle(setSelectedPriceRanges, r.value)} />)}
//         {tab === "discount" && DISCOUNT_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)} onClick={() => toggle(setSelectedDiscountRanges, r.value)} />)}
//       </div>
//     </>
//   );
// };

// const ActiveChips = ({ selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
//   <div className="mp-chips">
//     {selectedPriceRanges.map(r => <span key={r} className="mp-chip"><DollarSign size={10} />{r}<button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>)}
//     {selectedDiscountRanges.map(r => <span key={r} className="mp-chip"><Tag size={10} />{r}%<button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>)}
//     <button className="mp-chip mp-chip--clear" onClick={clearAll}>Clear All</button>
//   </div>
// );

// const Pagination = ({ current, total, onChange }) => {
//   let start = Math.max(1, current - 2), end = Math.min(total, start + 4);
//   if (end - start < 4) start = Math.max(1, end - 4);
//   return (
//     <div className="mp-pagination">
//       <button className="mp-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
//       {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(p => (
//         <button key={p} className={`mp-page-btn ${current === p ? "mp-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
//       ))}
//       <button className="mp-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
//     </div>
//   );
// };

// // ============= MODALS =============
// const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
//   const [f, setF] = useState({ product_name: "", brand: "", description: "", verification_status: "pending", is_active: false });
//   useEffect(() => { if (product) setF({ product_name: product.product_name || "", brand: product.brand || "", description: product.description || "", verification_status: product.verification_status || "pending", is_active: product.is_active || false }); }, [product]);
//   const ch = e => { const { name, value, type, checked } = e.target; setF(p => ({ ...p, [name]: type === "checkbox" ? checked : value })); };
//   if (!isOpen) return null;
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Edit Product: {product?.product_name}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           <div className="col-md-6 mb-3"><label className="form-label">Product Name *</label><input type="text" className="form-control" name="product_name" value={f.product_name} onChange={ch} required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Brand</label><input type="text" className="form-control" name="brand" value={f.brand} onChange={ch} /></div>
//           <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea className="form-control" name="description" rows="3" value={f.description} onChange={ch} /></div>
//         </div></div>
//         <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={() => onSave(product.product_id, f)}>Save Changes</button></div>
//       </div></div>
//     </div>
//   );
// };

// const EditVariantModal = ({ product, variant, isOpen, onClose, onSave, onDelete }) => {
//   const [f, setF] = useState({ 
//     mrp: "", 
//     selling_price: "", 
//     stock: "", 
//     hsn_code: "", 
//     is_returnable: false, 
//     return_days: 7, 
//     is_active: false, 
//     product_commission: "0.00", 
//     distribution_commission: "0.00", 
//     verification_status: "pending" 
//   });
  
//   useEffect(() => { 
//     if (variant) {
//       console.log("Loading variant for edit:", {
//         id: variant.id,
//         sku: variant.sku,
//         is_active: variant.is_active,
//         is_active_type: typeof variant.is_active
//       });
      
//       setF({ 
//         mrp: variant.mrp || "", 
//         selling_price: variant.selling_price || "", 
//         stock: variant.stock || "", 
//         hsn_code: variant.hsn_code || "", 
//         is_returnable: variant.is_returnable || false, 
//         return_days: variant.return_days || 7, 
//         is_active: variant.is_active === true, // Ensure boolean
//         product_commission: variant.product_commission || "0.00", 
//         distribution_commission: variant.distribution_commission || "0.00", 
//         verification_status: variant.verification_status || "pending" 
//       });
//     }
//   }, [variant]);
  
//   const ch = e => { 
//     const { name, value, type, checked } = e.target; 
//     setF(p => ({ 
//       ...p, 
//       [name]: type === "checkbox" ? checked : value 
//     })); 
//   };
  
//   if (!isOpen) return null;
  
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Edit Variant: {variant?.sku}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           <div className="col-md-6 mb-3"><label className="form-label">SKU</label><input type="text" className="form-control" value={variant?.sku || ""} readOnly /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Variant ID</label><input type="text" className="form-control" value={variant?.id || ""} readOnly /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">MRP *</label><input type="number" className="form-control" name="mrp" value={f.mrp} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Selling Price *</label><input type="number" className="form-control" name="selling_price" value={f.selling_price} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Stock *</label><input type="number" className="form-control" name="stock" value={f.stock} onChange={ch} min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">HSN Code</label><input type="text" className="form-control" name="hsn_code" value={f.hsn_code} onChange={ch} /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Return Days</label><input type="number" className="form-control" name="return_days" value={f.return_days} onChange={ch} min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Product Commission (₹)</label><input type="number" className="form-control" name="product_commission" value={f.product_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Distribution Commission (₹)</label><input type="number" className="form-control" name="distribution_commission" value={f.distribution_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Verification Status</label><select className="form-select" name="verification_status" value={f.verification_status} onChange={ch}><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_returnable" checked={f.is_returnable} onChange={ch} /><label className="form-check-label">Returnable</label></div></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_active" checked={f.is_active} onChange={ch} /><label className="form-check-label">Active</label></div></div>
//           <div className="col-md-12 mb-3"><h6>Attributes</h6><pre className="bg-light p-3 rounded" style={{ fontSize: 12 }}>{JSON.stringify(variant?.attributes || {}, null, 2)}</pre></div>
//         </div></div>
//         <div className="modal-footer">
//           <button className="btn btn-danger" onClick={() => { if (window.confirm(`Delete variant ${variant?.sku}?`)) onDelete(product.product_id, variant.id); }}><Trash2 size={14} /> Delete</button>
//           <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
//           <button className="btn btn-primary" onClick={() => {
//             console.log("Saving variant with data:", f);
//             onSave(product.product_id, variant.id, f);
//           }}>Save Changes</button>
//         </div>
//       </div></div>
//     </div>
//   );
// };

// const AddVariantModal = ({ product, isOpen, onClose, onAdd }) => {
//   const [f, setF] = useState({ sku: "", mrp: "", selling_price: "", stock: "", hsn_code: "", is_returnable: false, return_days: 7, is_active: true, product_commission: "0.00", distribution_commission: "0.00", verification_status: "pending", attributes: '{\n  "quantity": "",\n  "packaging": "",\n  "display": ""\n}' });
//   const ch = e => { const { name, value, type, checked } = e.target; setF(p => ({ ...p, [name]: type === "checkbox" ? checked : value })); };
//   if (!isOpen) return null;
//   const submit = () => { try { const attrs = JSON.parse(f.attributes); onAdd(product.product_id, { sku: f.sku, mrp: parseFloat(f.mrp), selling_price: parseFloat(f.selling_price), stock: parseInt(f.stock), hsn_code: f.hsn_code || null, is_returnable: f.is_returnable, return_days: parseInt(f.return_days), is_active: f.is_active, product_commission: f.product_commission, distribution_commission: f.distribution_commission, verification_status: f.verification_status, attributes: attrs, media: [{ media_type: "image" }] }); } catch { alert("Invalid JSON in attributes"); } };
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Add Variant — {product?.product_name}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           <div className="col-md-6 mb-3"><label className="form-label">SKU *</label><input type="text" className="form-control" name="sku" value={f.sku} onChange={ch} required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">MRP *</label><input type="number" className="form-control" name="mrp" value={f.mrp} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Selling Price *</label><input type="number" className="form-control" name="selling_price" value={f.selling_price} onChange={ch} step="0.01" min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Stock *</label><input type="number" className="form-control" name="stock" value={f.stock} onChange={ch} min="0" required /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">HSN Code</label><input type="text" className="form-control" name="hsn_code" value={f.hsn_code} onChange={ch} /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Return Days</label><input type="number" className="form-control" name="return_days" value={f.return_days} onChange={ch} min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Product Commission (₹)</label><input type="number" className="form-control" name="product_commission" value={f.product_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Distribution Commission (₹)</label><input type="number" className="form-control" name="distribution_commission" value={f.distribution_commission} onChange={ch} step="0.01" min="0" /></div>
//           <div className="col-md-6 mb-3"><label className="form-label">Verification Status</label><select className="form-select" name="verification_status" value={f.verification_status} onChange={ch}><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_returnable" checked={f.is_returnable} onChange={ch} /><label className="form-check-label">Returnable</label></div></div>
//           <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_active" checked={f.is_active} onChange={ch} /><label className="form-check-label">Active</label></div></div>
//           <div className="col-md-12 mb-3"><label className="form-label">Attributes (JSON)</label><textarea className="form-control" name="attributes" rows="4" value={f.attributes} onChange={ch} /><small className="text-muted">Enter valid JSON</small></div>
//         </div></div>
//         <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-success" onClick={submit}><Plus size={14} /> Add Variant</button></div>
//       </div></div>
//     </div>
//   );
// };

// const ManageMediaModal = ({ product, variant, isOpen, onClose, onDeleteMedia }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//       <div className="modal-dialog modal-lg"><div className="modal-content">
//         <div className="modal-header"><h5 className="modal-title">Media — {variant?.sku}</h5><button className="btn-close" onClick={onClose}></button></div>
//         <div className="modal-body"><div className="row">
//           {variant?.media?.map(m => (
//             <div key={m.id} className="col-md-4 mb-3"><div className="card text-center"><div className="card-body">
//               {m.media_type === "image" ? <img src={`${baseurl}${m.file}`} alt="Media" className="img-fluid mb-2" style={{ maxHeight: 150, objectFit: "contain" }} onError={e => { e.target.src = defaultProductImage; }} /> : <div className="bg-light p-4 mb-2"><PackageOpen size={40} className="text-muted" /></div>}
//               <div className="d-flex justify-content-between align-items-center"><small className="text-muted">{m.media_type}</small><button className="btn btn-sm btn-outline-danger" onClick={() => { if (window.confirm("Delete this media?")) onDeleteMedia(product.product_id, m.id); }}><Trash2 size={12} /></button></div>
//             </div></div></div>
//           ))}
//           {(!variant?.media || variant.media.length === 0) && <div className="col-12 text-center py-5"><ImageIcon size={48} className="text-muted mb-2" /><p className="text-muted">No media files</p></div>}
//         </div></div>
//         <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Close</button></div>
//       </div></div>
//     </div>
//   );
// };

// // ============= Product Card =============
// const ProductCard = ({ product, variant, onEditProduct, onEditVariant, onAddVariant, onManageMedia }) => {
//   const navigate = useNavigate();

//   const getImage = () => {
//     const img = variant.media?.find(m => m.media_type === "image");
//     if (img) return `${baseurl}${img.file}`;
//     for (const v of product.variants || []) { const m = v.media?.find(m => m.media_type === "image"); if (m) return `${baseurl}${m.file}`; }
//     return defaultProductImage;
//   };

//   const mrp = parseFloat(variant.mrp) || 0;
//   const price = parseFloat(variant.selling_price) || 0;
//   const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

//   const getVariantDisplay = () => {
//     if (!variant.attributes) return "";
//     return ["display", "packaging", "milk_type", "fat_content", "quantity"].map(k => variant.attributes[k]).filter(Boolean).join(" • ");
//   };

//   const productName = variant.attributes?.display ? `${product.product_name} - ${variant.attributes.display}` : product.product_name;
//   const verMap = { verified: { cls: "mp-ver--ok", icon: <CheckCircle size={11} /> }, rejected: { cls: "mp-ver--no", icon: <XCircle size={11} /> } };
//   const ver = verMap[variant.verification_status] || { cls: "mp-ver--pending", icon: <Clock size={11} /> };
//   const url = `/admin-business-product-details/${product.product_id}/?variant=${variant.id}`;

//   return (
//     <div className="mp-card">
//       <div className="mp-card-img-wrap" onClick={() => navigate(url)}>
//         <img src={getImage()} alt={productName} className="mp-card-img"
//           onError={e => { e.target.src = defaultProductImage; }} />
//         {discount > 0 && <span className="mp-card-disc">{discount}% OFF</span>}
//         {/* <span className={`mp-card-active ${variant.is_active ? "mp-card-active--on" : "mp-card-active--off"}`}>
//           {variant.is_active ? "Active" : "Inactive"}
//         </span> */}
//       </div>
//       <div className="mp-card-body">
//         <p className="mp-card-name" onClick={() => navigate(url)}>{productName}</p>
//         <div className="mp-card-meta">
//           <small className="mp-card-brand">{product.brand || "No Brand"}</small>
//           <span className={`mp-ver-badge ${ver.cls}`}>{ver.icon} {variant.verification_status || "pending"}</span>
//         </div>
//         {getVariantDisplay() && <small className="mp-card-attrs">{getVariantDisplay()}</small>}
//         <small className={`mp-stock ${variant.stock > 0 ? "mp-stock--in" : "mp-stock--out"}`}>
//           {variant.stock > 0 ? `In Stock (${variant.stock})` : "Out of Stock"}
//         </small>
//         <div className="mp-card-prices">
//           <span className="mp-card-price">₹{price.toFixed(2)}</span>
//           {mrp > price && <span className="mp-card-mrp">₹{mrp.toFixed(2)}</span>}
//         </div>
//       </div>
//       <div className="mp-card-foot" onClick={e => e.stopPropagation()}>
//         <div className="mp-action-row">
//           <button className="mp-action-btn mp-action-btn--blue" onClick={() => onEditProduct(product)} title="Edit Product"><Edit size={12} /><span>Product</span></button>
//           <button className="mp-action-btn mp-action-btn--teal" onClick={() => onEditVariant(product, variant)} title="Edit Variant"><Package size={12} /><span>Variant</span></button>
//           <button className="mp-action-btn mp-action-btn--amber" onClick={() => onManageMedia(product, variant)} title="Manage Media"><ImageIcon size={12} /><span>Media</span></button>
//         </div>
//         <button className="mp-view-btn" onClick={() => navigate(url)}>VIEW DETAILS</button>
//         <button className="mp-payout-btn"><Info size={13} /> PAYOUT</button>
//       </div>
//     </div>
//   );
// };

// // ============= Main =============
// const AdminProducts = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isMobile = useIsMobile();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [businessName, setBusinessName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("default");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showSortSheet, setShowSortSheet] = useState(false);
//   const [showFilterSheet, setShowFilterSheet] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);
//   const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
//   const [editVariantModal, setEditVariantModal] = useState({ isOpen: false, product: null, variant: null });
//   const [addVariantModal, setAddVariantModal] = useState({ isOpen: false, product: null });
//   const [manageMediaModal, setManageMediaModal] = useState({ isOpen: false, product: null, variant: null });

//   const PAGE_SIZE = 12;
//   const getBusinessId = () => new URLSearchParams(location.search).get("business");
//   const getUserId = () => { try { const u = localStorage.getItem("user"); if (u) { const d = JSON.parse(u); return d.user_id || d.id; } return parseInt(localStorage.getItem("user_id") || "2"); } catch { return 2; } };

//   // Debounce search term
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const fetchProducts = useCallback(() => {
//     setLoading(true);
//     const businessId = getBusinessId();

//     let url = `${baseurl}/products/?`;
//     const params = new URLSearchParams();

//     if (businessId) {
//       params.append("business", businessId);
//       fetch(`${baseurl}/business/${businessId}/`)
//         .then(r => r.json())
//         .then(d => { if (d.business_name) setBusinessName(d.business_name); })
//         .catch(() => { });
//     } else {
//       params.append("user_id", getUserId());
//     }

//     if (debouncedSearchTerm.trim()) {
//       params.append("search", debouncedSearchTerm.trim());
//     }

//     selectedPriceRanges.forEach(r => params.append("price_range", r));
//     selectedDiscountRanges.forEach(r => params.append("discount_range", r));

//     const fullUrl = `${baseurl}/products/?${params}`;

//     fetch(fullUrl)
//       .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
//       .then(data => {
//         const items = [];
//         (data.results || []).forEach(product => {
//           if (product.variants?.length > 0) {
//             product.variants.forEach(v => items.push({ product, variant: v }));
//           } else {
//             items.push({ product, variant: { 
//               id: product.product_id, 
//               sku: product.product_id, 
//               mrp: "0.00", 
//               selling_price: "0.00", 
//               stock: 0, 
//               verification_status: product.verification_status || "pending", 
//               attributes: {}, 
//               media: [],
//               is_active: product.is_active || false
//             } });
//           }
//         });
//         setProducts(items);
//       })
//       .catch(e => { console.error(e); setProducts([]); })
//       .finally(() => setLoading(false));
//   }, [location.search, debouncedSearchTerm, selectedPriceRanges, selectedDiscountRanges]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [debouncedSearchTerm, sortBy, selectedPriceRanges, selectedDiscountRanges]);

//   // Client-side sorting only
//   const sortedProducts = useMemo(() => {
//     const list = [...products];
//     switch (sortBy) {
//       case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
//       case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
//       case "discount_desc": {
//         const d = i => {
//           const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price);
//           return m > 0 ? ((m - s) / m) * 100 : 0;
//         };
//         list.sort((a, b) => d(b) - d(a));
//         break;
//       }
//       case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
//       case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
//     }
//     return list;
//   }, [products, sortBy]);

//   const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
//   const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
//   const activeFilterCount = selectedPriceRanges.length + selectedDiscountRanges.length;
//   const clearAll = () => { setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
//   const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";
//   const filterProps = { selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges };

//   const handleUpdateProduct = (productId, data) => {
//     fetch(`${baseurl}/products/${productId}/`, { 
//       method: "PUT", 
//       headers: { "Content-Type": "application/json" }, 
//       body: JSON.stringify({ product: { 
//         verification_status: data.verification_status, 
//         brand: data.brand, 
//         product_name: data.product_name, 
//         description: data.description, 
//         is_active: data.is_active 
//       } }) 
//     })
//       .then(r => r.json())
//       .then(() => { 
//         alert("Product updated!"); 
//         fetchProducts(); 
//         setEditProductModal({ isOpen: false, product: null }); 
//       })
//       .catch(() => alert("Failed to update"));
//   };

//   const handleUpdateVariant = (productId, variantId, data) => {
//     // Ensure proper data types for the payload
//     const variantPayload = {
//       id: variantId,
//       mrp: parseFloat(data.mrp) || 0,
//       selling_price: parseFloat(data.selling_price) || 0,
//       stock: parseInt(data.stock) || 0,
//       hsn_code: data.hsn_code || null,
//       is_returnable: Boolean(data.is_returnable),
//       return_days: parseInt(data.return_days) || 7,
//       is_active: Boolean(data.is_active), // Convert to boolean explicitly
//       product_commission: data.product_commission || "0.00",
//       distribution_commission: data.distribution_commission || "0.00",
//       verification_status: data.verification_status || "pending"
//     };

//     console.log("Updating variant with payload:", variantPayload);

//     fetch(`${baseurl}/products/${productId}/`, { 
//       method: "PUT", 
//       headers: { "Content-Type": "application/json" }, 
//       body: JSON.stringify({ variants: [variantPayload] })
//     })
//       .then(async response => {
//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("API Error:", errorText);
//           throw new Error(`HTTP ${response.status}: ${errorText}`);
//         }
//         return response.json();
//       })
//       .then(result => {
//         console.log("Update successful:", result);
//         alert("Variant updated successfully!");
//         fetchProducts(); // Refresh the products list
//         setEditVariantModal({ isOpen: false, product: null, variant: null });
//       })
//       .catch(error => {
//         console.error("Failed to update variant:", error);
//         alert(`Failed to update variant: ${error.message}`);
//       });
//   };

//   const handleAddVariant = (productId, variantData) => {
//     const fd = new FormData(); 
//     fd.append("variants", JSON.stringify([variantData]));
//     fetch(`${baseurl}/products/${productId}/`, { method: "PUT", body: fd })
//       .then(r => r.json())
//       .then(() => { 
//         alert("Variant added!"); 
//         fetchProducts(); 
//         setAddVariantModal({ isOpen: false, product: null }); 
//       })
//       .catch(() => alert("Failed to add"));
//   };

//   const handleDeleteVariant = (productId, variantId) => {
//     if (window.confirm("Are you sure you want to delete this variant?")) {
//       fetch(`${baseurl}/products/${productId}/?variants=${variantId}`, { method: "DELETE" })
//         .then(r => { 
//           if (!r.ok) throw new Error(); 
//           alert("Variant deleted successfully!"); 
//           fetchProducts(); 
//           setEditVariantModal({ isOpen: false, product: null, variant: null }); 
//         })
//         .catch(() => alert("Failed to delete variant"));
//     }
//   };

//   const handleDeleteMedia = (productId, mediaId) => {
//     if (window.confirm("Are you sure you want to delete this media?")) {
//       fetch(`${baseurl}/products/${productId}/?media=${mediaId}`, { method: "DELETE" })
//         .then(r => { 
//           if (!r.ok) throw new Error(); 
//           alert("Media deleted successfully!"); 
//           fetchProducts(); 
//           setManageMediaModal({ isOpen: false, product: null, variant: null }); 
//         })
//         .catch(() => alert("Failed to delete media"));
//     }
//   };

//   const mobileFilterFooter = (
//     <div className="mp-filter-footer-btns">
//       <button className="mp-btn-clear" onClick={clearAll}>Clear All</button>
//       <button className="mp-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
//     </div>
//   );

//   const cardProps = {
//     onEditProduct: p => setEditProductModal({ isOpen: true, product: p }),
//     onEditVariant: (p, v) => setEditVariantModal({ isOpen: true, product: p, variant: v }),
//     onAddVariant: p => setAddVariantModal({ isOpen: true, product: p }),
//     onManageMedia: (p, v) => setManageMediaModal({ isOpen: true, product: p, variant: v }),
//   };

//   const productSection = loading ? (
//     <div className="mp-loading"><div className="mp-spinner" /><span>Loading products...</span></div>
//   ) : sortedProducts.length === 0 ? (
//     <div className="mp-empty"><p>No products found</p><small>{debouncedSearchTerm || activeFilterCount > 0 ? "Try adjusting search or filters" : businessName ? `No products for ${businessName}` : "No products added yet"}</small></div>
//   ) : (
//     <>
//       <div className={`mp-grid ${isMobile ? "mp-grid--2col" : "mp-grid--desktop"}`}>
//         {paginated.map(item => (
//           <ProductCard key={`${item.product.product_id}-${item.variant.id}`} product={item.product} variant={item.variant} {...cardProps} />
//         ))}
//       </div>
//       {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
//     </>
//   );

//   return (
//     <>
//       <AdminNavbar />

//       {isMobile && (
//         <div className="mp-mobile">
//           <div className="mp-mobile-topbar">
//             <button className="mp-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
//             <h1 className="mp-mobile-title">Products</h1>
//             <div style={{ width: 36 }} />
//           </div>
//           <div className="mp-mobile-search-wrap">
//             <div className="mp-search-bar">
//               <Search size={15} className="mp-search-ico" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="mp-search-input"
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//               />
//               {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//             </div>
//           </div>
//           <div className="mp-toolbar">
//             <button className="mp-toolbar-btn" onClick={() => setShowSortSheet(true)}><span>{sortLabel}</span><ChevronDown size={14} /></button>
//             <button className={`mp-toolbar-btn ${activeFilterCount > 0 ? "mp-toolbar-btn--on" : ""}`} onClick={() => setShowFilterSheet(true)}>
//               <Filter size={14} /><span>Filter</span>{activeFilterCount > 0 && <span className="mp-toolbar-badge">{activeFilterCount}</span>}
//             </button>
//           </div>
//           {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
//           <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//           {productSection}
//           <div style={{ height: 24 }} />
//           <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
//             <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
//           </BottomSheet>
//           <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)} title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
//             <FilterContent {...filterProps} />
//           </BottomSheet>
//         </div>
//       )}

//       {/* {!isMobile && (
//         <div className="mp-desktop">
//           <div className="mp-desktop-header">
//             <div className="mp-desktop-header-inner">
//               <button className="mp-back-desktop" onClick={() => navigate(-1)}><ArrowLeft size={17} /><span>Back</span></button>
// <h1 className="mp-desktop-title">
//   {businessName ? `${businessName} — Products` : "Products"}
// </h1>            </div>
//           </div>
//           <div className="mp-desktop-body">
//             <aside className="mp-sidebar">
//               <div className="mp-sidebar-top">
//                 <span className="mp-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//                 {activeFilterCount > 0 && <button className="mp-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>}
//               </div>
//               <FilterContent {...filterProps} isSidebar={true} />
//             </aside>
//             <main className="mp-main">
//               <div className="mp-main-topbar">
//                 <div className="mp-desktop-search">
//                   <Search size={15} className="mp-search-ico" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="mp-search-input"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                   />
//                   {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//                 </div>
//                 <div className="mp-sort-wrap">
//                   <button className="mp-sort-btn" onClick={() => setShowSortDropdown(v => !v)}><span>{sortLabel}</span><ChevronDown size={14} /></button>
//                   {showSortDropdown && (<>
//                     <div className="mp-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                     <div className="mp-sort-dropdown"><SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} /></div>
//                   </>)}
//                 </div>
//               </div>
//               {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
//               <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//               {productSection}
//             </main>
//           </div>
//         </div>
//       )} */}

//       {!isMobile && (
//   <div className="mp-desktop">
//     {/* REMOVED the separate header section since AdminNavbar already handles the top bar */}
//     <div className="mp-desktop-body">
//       <aside className="mp-sidebar">
//         <div className="mp-sidebar-top">
//           <span className="mp-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
//           {activeFilterCount > 0 && <button className="mp-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>}
//         </div>
//         <FilterContent {...filterProps} isSidebar={true} />
//       </aside>
//       <main className="mp-main">
//         <div className="mp-main-header">
//           <h1 className="mp-desktop-title">
//             {businessName ? `${businessName} — Products` : "Products"}
//           </h1>
//           <button className="mp-back-desktop" onClick={() => navigate(-1)}>
//             <ArrowLeft size={17} /><span>Back</span>
//           </button>
//         </div>
        
//         <div className="mp-main-topbar">
//           <div className="mp-desktop-search">
//             <Search size={15} className="mp-search-ico" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="mp-search-input"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
//           </div>
//           <div className="mp-sort-wrap">
//             <button className="mp-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
//               <span>{sortLabel}</span><ChevronDown size={14} />
//             </button>
//             {showSortDropdown && (
//               <>
//                 <div className="mp-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
//                 <div className="mp-sort-dropdown">
//                   <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
        
//         {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
//         <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
//         {productSection}
//       </main>
//     </div>
//   </div>
// )}

//       <EditProductModal product={editProductModal.product} isOpen={editProductModal.isOpen} onClose={() => setEditProductModal({ isOpen: false, product: null })} onSave={handleUpdateProduct} />
//       <EditVariantModal product={editVariantModal.product} variant={editVariantModal.variant} isOpen={editVariantModal.isOpen} onClose={() => setEditVariantModal({ isOpen: false, product: null, variant: null })} onSave={handleUpdateVariant} onDelete={handleDeleteVariant} />
//       <AddVariantModal product={addVariantModal.product} isOpen={addVariantModal.isOpen} onClose={() => setAddVariantModal({ isOpen: false, product: null })} onAdd={handleAddVariant} />
//       <ManageMediaModal product={manageMediaModal.product} variant={manageMediaModal.variant} isOpen={manageMediaModal.isOpen} onClose={() => setManageMediaModal({ isOpen: false, product: null, variant: null })} onDeleteMedia={handleDeleteMedia} />
//     </>
//   );
// };

// export default AdminProducts;



//====================================================



import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal, Info,
  Edit, Package, Image as ImageIcon, Trash2, Plus,
  CheckCircle, XCircle, Clock, TrendingUp, PackageOpen
} from "lucide-react";
import './Business_Products.css';
import { baseurl } from "../../BaseURL/BaseURL";
import defaultProductImage from "../../Logos/business-default-image.png"; // Update path as needed

// ============= useIsMobile =============
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
};

const SORT_OPTIONS = [
  { value: "default", label: "Relevance" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount_desc", label: "Highest Discount" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
];

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

// ============= Bottom Sheet =============
const BottomSheet = ({ isOpen, onClose, title, children, footer }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  return (
    <>
      <div className={`mp-overlay ${isOpen ? "mp-overlay--on" : ""}`} onClick={onClose} />
      <div className={`mp-sheet ${isOpen ? "mp-sheet--open" : ""}`}>
        <div className="mp-sheet-handle" />
        <div className="mp-sheet-header">
          <span className="mp-sheet-title">{title}</span>
          <button className="mp-sheet-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="mp-sheet-body">{children}</div>
        {footer && <div className="mp-sheet-footer">{footer}</div>}
      </div>
    </>
  );
};

const SortList = ({ sortBy, setSortBy, onClose }) => (
  <div className="mp-sort-list">
    {SORT_OPTIONS.map(opt => (
      <button key={opt.value}
        className={`mp-sort-opt ${sortBy === opt.value ? "mp-sort-opt--on" : ""}`}
        onClick={() => { setSortBy(opt.value); onClose?.(); }}>
        <span>{opt.label}</span>
        {sortBy === opt.value && <Check size={16} />}
      </button>
    ))}
  </div>
);

const CheckRow = ({ label, on, onClick }) => (
  <div className={`mp-filter-row ${on ? "mp-filter-row--on" : ""}`} onClick={onClick}>
    <div className={`mp-checkbox ${on ? "mp-checkbox--on" : ""}`}>
      {on && <Check size={10} color="#fff" strokeWidth={3} />}
    </div>
    <span>{label}</span>
  </div>
);

const SidebarSection = ({ title, count, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mp-sidebar-section">
      <button className="mp-sidebar-section-hd" onClick={() => setOpen(v => !v)}>
        <span>{title}{count > 0 && <span className="mp-filter-badge">{count}</span>}</span>
        <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }} />
      </button>
      {open && <div className="mp-sidebar-section-body">{children}</div>}
    </div>
  );
};

const FilterContent = ({ isSidebar, selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges }) => {
  const [tab, setTab] = useState("price");
  const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);
  if (isSidebar) return (
    <div className="mp-sidebar-filter">
      <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
        {PRICE_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)} onClick={() => toggle(setSelectedPriceRanges, r.value)} />)}
      </SidebarSection>
      <SidebarSection title="Discount" count={selectedDiscountRanges.length}>
        {DISCOUNT_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)} onClick={() => toggle(setSelectedDiscountRanges, r.value)} />)}
      </SidebarSection>
    </div>
  );
  const tabs = [{ key: "price", label: "Price", count: selectedPriceRanges.length }, { key: "discount", label: "Discount", count: selectedDiscountRanges.length }];
  return (
    <>
      <div className="mp-filter-tabs">
        {tabs.map(t => <button key={t.key} className={`mp-filter-tab ${tab === t.key ? "mp-filter-tab--on" : ""}`} onClick={() => setTab(t.key)}>{t.label}{t.count > 0 && <span className="mp-tab-badge">{t.count}</span>}</button>)}
      </div>
      <div className="mp-filter-tab-body">
        {tab === "price" && PRICE_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)} onClick={() => toggle(setSelectedPriceRanges, r.value)} />)}
        {tab === "discount" && DISCOUNT_RANGES.map(r => <CheckRow key={r.value} label={r.label} on={selectedDiscountRanges.includes(r.value)} onClick={() => toggle(setSelectedDiscountRanges, r.value)} />)}
      </div>
    </>
  );
};

const ActiveChips = ({ selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges, clearAll }) => (
  <div className="mp-chips">
    {selectedPriceRanges.map(r => <span key={r} className="mp-chip"><DollarSign size={10} />{r}<button onClick={() => setSelectedPriceRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>)}
    {selectedDiscountRanges.map(r => <span key={r} className="mp-chip"><Tag size={10} />{r}%<button onClick={() => setSelectedDiscountRanges(p => p.filter(x => x !== r))}><X size={10} /></button></span>)}
    <button className="mp-chip mp-chip--clear" onClick={clearAll}>Clear All</button>
  </div>
);

const Pagination = ({ current, total, onChange }) => {
  let start = Math.max(1, current - 2), end = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  return (
    <div className="mp-pagination">
      <button className="mp-page-btn" disabled={current === 1} onClick={() => onChange(current - 1)}>‹</button>
      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(p => (
        <button key={p} className={`mp-page-btn ${current === p ? "mp-page-btn--on" : ""}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="mp-page-btn" disabled={current === total} onClick={() => onChange(current + 1)}>›</button>
    </div>
  );
};

// ============= MODALS =============
const EditProductModal = ({ product, isOpen, onClose, onSave }) => {
  const [f, setF] = useState({ product_name: "", brand: "", description: "", verification_status: "pending", is_active: false });
  useEffect(() => { if (product) setF({ product_name: product.product_name || "", brand: product.brand || "", description: product.description || "", verification_status: product.verification_status || "pending", is_active: product.is_active || false }); }, [product]);
  const ch = e => { const { name, value, type, checked } = e.target; setF(p => ({ ...p, [name]: type === "checkbox" ? checked : value })); };
  if (!isOpen) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">Edit Product: {product?.product_name}</h5><button className="btn-close" onClick={onClose}></button></div>
        <div className="modal-body"><div className="row">
          <div className="col-md-6 mb-3"><label className="form-label">Product Name *</label><input type="text" className="form-control" name="product_name" value={f.product_name} onChange={ch} required /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Brand</label><input type="text" className="form-control" name="brand" value={f.brand} onChange={ch} /></div>
          <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea className="form-control" name="description" rows="3" value={f.description} onChange={ch} /></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={() => onSave(product.product_id, f)}>Save Changes</button></div>
      </div></div>
    </div>
  );
};

const EditVariantModal = ({ product, variant, isOpen, onClose, onSave, onDelete }) => {
  const [f, setF] = useState({ 
    mrp: "", 
    selling_price: "", 
    stock: "", 
    hsn_code: "", 
    is_returnable: false, 
    return_days: 7, 
    is_active: false, 
    product_commission: "0.00", 
    distribution_commission: "0.00",
    max_order_quantity: "",
    verification_status: "pending" 
  });
  
  useEffect(() => { 
    if (variant) {
      console.log("Loading variant for edit:", {
        id: variant.id,
        sku: variant.sku,
        is_active: variant.is_active,
        is_active_type: typeof variant.is_active,
        max_order_quantity: variant.max_order_quantity
      });
      
      setF({ 
        mrp: variant.mrp || "", 
        selling_price: variant.selling_price || "", 
        stock: variant.stock || "", 
        hsn_code: variant.hsn_code || "", 
        is_returnable: variant.is_returnable || false, 
        return_days: variant.return_days || 7, 
        is_active: variant.is_active === true, // Ensure boolean
        product_commission: variant.product_commission || "0.00", 
        distribution_commission: variant.distribution_commission || "0.00",
        max_order_quantity: variant.max_order_quantity || "",
        verification_status: variant.verification_status || "pending" 
      });
    }
  }, [variant]);
  
  const ch = e => { 
    const { name, value, type, checked } = e.target; 
    setF(p => ({ 
      ...p, 
      [name]: type === "checkbox" ? checked : value 
    })); 
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">Edit Variant: {variant?.sku}</h5><button className="btn-close" onClick={onClose}></button></div>
        <div className="modal-body"><div className="row">
          <div className="col-md-6 mb-3"><label className="form-label">SKU</label><input type="text" className="form-control" value={variant?.sku || ""} readOnly /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Variant ID</label><input type="text" className="form-control" value={variant?.id || ""} readOnly /></div>
          <div className="col-md-6 mb-3"><label className="form-label">MRP *</label><input type="number" className="form-control" name="mrp" value={f.mrp} onChange={ch} step="0.01" min="0" required /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Selling Price *</label><input type="number" className="form-control" name="selling_price" value={f.selling_price} onChange={ch} step="0.01" min="0" required /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Stock *</label><input type="number" className="form-control" name="stock" value={f.stock} onChange={ch} min="0" required /></div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Max Order Quantity</label>
            <input type="number" className="form-control" name="max_order_quantity" value={f.max_order_quantity} onChange={ch} min="1" placeholder="Leave empty for unlimited" />
            <small className="text-muted">Maximum quantity per order (leave empty for no limit)</small>
          </div>
          <div className="col-md-6 mb-3"><label className="form-label">HSN Code</label><input type="text" className="form-control" name="hsn_code" value={f.hsn_code} onChange={ch} /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Return Days</label><input type="number" className="form-control" name="return_days" value={f.return_days} onChange={ch} min="0" /></div>
          <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Product Commission (₹)</label><input type="number" className="form-control" name="product_commission" value={f.product_commission} onChange={ch} step="0.01" min="0" /></div>
          <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Distribution Commission (₹)</label><input type="number" className="form-control" name="distribution_commission" value={f.distribution_commission} onChange={ch} step="0.01" min="0" /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Verification Status</label><select className="form-select" name="verification_status" value={f.verification_status} onChange={ch}><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></div>
          <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_returnable" checked={f.is_returnable} onChange={ch} /><label className="form-check-label">Returnable</label></div></div>
          <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_active" checked={f.is_active} onChange={ch} /><label className="form-check-label">Active</label></div></div>
          <div className="col-md-12 mb-3"><h6>Attributes</h6><pre className="bg-light p-3 rounded" style={{ fontSize: 12 }}>{JSON.stringify(variant?.attributes || {}, null, 2)}</pre></div>
        </div></div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={() => { if (window.confirm(`Delete variant ${variant?.sku}?`)) onDelete(product.product_id, variant.id); }}><Trash2 size={14} /> Delete</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => {
            console.log("Saving variant with data:", f);
            onSave(product.product_id, variant.id, f);
          }}>Save Changes</button>
        </div>
      </div></div>
    </div>
  );
};

const AddVariantModal = ({ product, isOpen, onClose, onAdd }) => {
  const [f, setF] = useState({ 
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
    max_order_quantity: "",
    verification_status: "pending", 
    attributes: '{\n  "quantity": "",\n  "packaging": "",\n  "display": ""\n}' 
  });
  
  const ch = e => { 
    const { name, value, type, checked } = e.target; 
    setF(p => ({ 
      ...p, 
      [name]: type === "checkbox" ? checked : value 
    })); 
  };
  
  if (!isOpen) return null;
  
  const submit = () => { 
    try { 
      const attrs = JSON.parse(f.attributes); 
      onAdd(product.product_id, { 
        sku: f.sku, 
        mrp: parseFloat(f.mrp), 
        selling_price: parseFloat(f.selling_price), 
        stock: parseInt(f.stock), 
        hsn_code: f.hsn_code || null, 
        is_returnable: f.is_returnable, 
        return_days: parseInt(f.return_days), 
        is_active: f.is_active, 
        product_commission: f.product_commission, 
        distribution_commission: f.distribution_commission,
        max_order_quantity: f.max_order_quantity ? parseInt(f.max_order_quantity) : null,
        verification_status: f.verification_status, 
        attributes: attrs, 
        media: [{ media_type: "image" }] 
      }); 
    } catch { 
      alert("Invalid JSON in attributes"); 
    } 
  };
  
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">Add Variant — {product?.product_name}</h5><button className="btn-close" onClick={onClose}></button></div>
        <div className="modal-body"><div className="row">
          <div className="col-md-6 mb-3"><label className="form-label">SKU *</label><input type="text" className="form-control" name="sku" value={f.sku} onChange={ch} required /></div>
          <div className="col-md-6 mb-3"><label className="form-label">MRP *</label><input type="number" className="form-control" name="mrp" value={f.mrp} onChange={ch} step="0.01" min="0" required /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Selling Price *</label><input type="number" className="form-control" name="selling_price" value={f.selling_price} onChange={ch} step="0.01" min="0" required /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Stock *</label><input type="number" className="form-control" name="stock" value={f.stock} onChange={ch} min="0" required /></div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Max Order Quantity</label>
            <input type="number" className="form-control" name="max_order_quantity" value={f.max_order_quantity} onChange={ch} min="1" placeholder="Leave empty for unlimited" />
            <small className="text-muted">Maximum quantity per order (leave empty for no limit)</small>
          </div>
          <div className="col-md-6 mb-3"><label className="form-label">HSN Code</label><input type="text" className="form-control" name="hsn_code" value={f.hsn_code} onChange={ch} /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Return Days</label><input type="number" className="form-control" name="return_days" value={f.return_days} onChange={ch} min="0" /></div>
          <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Product Commission (₹)</label><input type="number" className="form-control" name="product_commission" value={f.product_commission} onChange={ch} step="0.01" min="0" /></div>
          <div className="col-md-6 mb-3"><label className="form-label d-flex align-items-center gap-1"><TrendingUp size={14} />Distribution Commission (₹)</label><input type="number" className="form-control" name="distribution_commission" value={f.distribution_commission} onChange={ch} step="0.01" min="0" /></div>
          <div className="col-md-6 mb-3"><label className="form-label">Verification Status</label><select className="form-select" name="verification_status" value={f.verification_status} onChange={ch}><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option></select></div>
          <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_returnable" checked={f.is_returnable} onChange={ch} /><label className="form-check-label">Returnable</label></div></div>
          <div className="col-md-3 mb-3 d-flex align-items-end"><div className="form-check form-switch"><input className="form-check-input" type="checkbox" name="is_active" checked={f.is_active} onChange={ch} /><label className="form-check-label">Active</label></div></div>
          <div className="col-md-12 mb-3"><label className="form-label">Attributes (JSON)</label><textarea className="form-control" name="attributes" rows="4" value={f.attributes} onChange={ch} /><small className="text-muted">Enter valid JSON</small></div>
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-success" onClick={submit}><Plus size={14} /> Add Variant</button></div>
      </div></div>
    </div>
  );
};

const ManageMediaModal = ({ product, variant, isOpen, onClose, onDeleteMedia }) => {
  if (!isOpen) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg"><div className="modal-content">
        <div className="modal-header"><h5 className="modal-title">Media — {variant?.sku}</h5><button className="btn-close" onClick={onClose}></button></div>
        <div className="modal-body"><div className="row">
          {variant?.media?.map(m => (
            <div key={m.id} className="col-md-4 mb-3"><div className="card text-center"><div className="card-body">
              {m.media_type === "image" ? <img src={`${baseurl}${m.file}`} alt="Media" className="img-fluid mb-2" style={{ maxHeight: 150, objectFit: "contain" }} onError={e => { e.target.src = defaultProductImage; }} /> : <div className="bg-light p-4 mb-2"><PackageOpen size={40} className="text-muted" /></div>}
              <div className="d-flex justify-content-between align-items-center"><small className="text-muted">{m.media_type}</small><button className="btn btn-sm btn-outline-danger" onClick={() => { if (window.confirm("Delete this media?")) onDeleteMedia(product.product_id, m.id); }}><Trash2 size={12} /></button></div>
            </div></div></div>
          ))}
          {(!variant?.media || variant.media.length === 0) && <div className="col-12 text-center py-5"><ImageIcon size={48} className="text-muted mb-2" /><p className="text-muted">No media files</p></div>}
        </div></div>
        <div className="modal-footer"><button className="btn btn-secondary" onClick={onClose}>Close</button></div>
      </div></div>
    </div>
  );
};

// ============= Product Card =============
const ProductCard = ({ product, variant, onEditProduct, onEditVariant, onAddVariant, onManageMedia }) => {
  const navigate = useNavigate();

  const getImage = () => {
    const img = variant.media?.find(m => m.media_type === "image");
    if (img) return `${baseurl}${img.file}`;
    for (const v of product.variants || []) { const m = v.media?.find(m => m.media_type === "image"); if (m) return `${baseurl}${m.file}`; }
    return defaultProductImage;
  };

  const mrp = parseFloat(variant.mrp) || 0;
  const price = parseFloat(variant.selling_price) || 0;
  const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const getVariantDisplay = () => {
    if (!variant.attributes) return "";
    return ["display", "packaging", "milk_type", "fat_content", "quantity"].map(k => variant.attributes[k]).filter(Boolean).join(" • ");
  };

  const productName = variant.attributes?.display ? `${product.product_name} - ${variant.attributes.display}` : product.product_name;
  const verMap = { verified: { cls: "mp-ver--ok", icon: <CheckCircle size={11} /> }, rejected: { cls: "mp-ver--no", icon: <XCircle size={11} /> } };
  const ver = verMap[variant.verification_status] || { cls: "mp-ver--pending", icon: <Clock size={11} /> };
  const url = `/admin-business-product-details/${product.product_id}/?variant=${variant.id}`;

  return (
    <div className="mp-card">
      <div className="mp-card-img-wrap" onClick={() => navigate(url)}>
        <img src={getImage()} alt={productName} className="mp-card-img"
          onError={e => { e.target.src = defaultProductImage; }} />
        {discount > 0 && <span className="mp-card-disc">{discount}% OFF</span>}
        {/* <span className={`mp-card-active ${variant.is_active ? "mp-card-active--on" : "mp-card-active--off"}`}>
          {variant.is_active ? "Active" : "Inactive"}
        </span> */}
      </div>
      <div className="mp-card-body">
        <p className="mp-card-name" onClick={() => navigate(url)}>{productName}</p>
        <div className="mp-card-meta">
          <small className="mp-card-brand">{product.brand || "No Brand"}</small>
          <span className={`mp-ver-badge ${ver.cls}`}>{ver.icon} {variant.verification_status || "pending"}</span>
        </div>
        {getVariantDisplay() && <small className="mp-card-attrs">{getVariantDisplay()}</small>}
        <small className={`mp-stock ${variant.stock > 0 ? "mp-stock--in" : "mp-stock--out"}`}>
          {variant.stock > 0 ? `In Stock (${variant.stock})` : "Out of Stock"}
        </small>
        <div className="mp-card-prices">
          <span className="mp-card-price">₹{price.toFixed(2)}</span>
          {mrp > price && <span className="mp-card-mrp">₹{mrp.toFixed(2)}</span>}
        </div>
      </div>
      <div className="mp-card-foot" onClick={e => e.stopPropagation()}>
        <div className="mp-action-row">
          <button className="mp-action-btn mp-action-btn--blue" onClick={() => onEditProduct(product)} title="Edit Product"><Edit size={12} /><span>Product</span></button>
          <button className="mp-action-btn mp-action-btn--teal" onClick={() => onEditVariant(product, variant)} title="Edit Variant"><Package size={12} /><span>Variant</span></button>
          <button className="mp-action-btn mp-action-btn--amber" onClick={() => onManageMedia(product, variant)} title="Manage Media"><ImageIcon size={12} /><span>Media</span></button>
        </div>
        <button className="mp-view-btn" onClick={() => navigate(url)}>VIEW DETAILS</button>
        <button className="mp-payout-btn"><Info size={13} /> PAYOUT</button>
      </div>
    </div>
  );
};

// ============= Main =============
const AdminProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState([]);
  const [editProductModal, setEditProductModal] = useState({ isOpen: false, product: null });
  const [editVariantModal, setEditVariantModal] = useState({ isOpen: false, product: null, variant: null });
  const [addVariantModal, setAddVariantModal] = useState({ isOpen: false, product: null });
  const [manageMediaModal, setManageMediaModal] = useState({ isOpen: false, product: null, variant: null });

  const PAGE_SIZE = 12;
  const getBusinessId = () => new URLSearchParams(location.search).get("business");
  const getUserId = () => { try { const u = localStorage.getItem("user"); if (u) { const d = JSON.parse(u); return d.user_id || d.id; } return parseInt(localStorage.getItem("user_id") || "2"); } catch { return 2; } };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const businessId = getBusinessId();

    let url = `${baseurl}/products/?`;
    const params = new URLSearchParams();

    if (businessId) {
      params.append("business", businessId);
      fetch(`${baseurl}/business/${businessId}/`)
        .then(r => r.json())
        .then(d => { if (d.business_name) setBusinessName(d.business_name); })
        .catch(() => { });
    } else {
      params.append("user_id", getUserId());
    }

    if (debouncedSearchTerm.trim()) {
      params.append("search", debouncedSearchTerm.trim());
    }

    selectedPriceRanges.forEach(r => params.append("price_range", r));
    selectedDiscountRanges.forEach(r => params.append("discount_range", r));

    const fullUrl = `${baseurl}/products/?${params}`;

    fetch(fullUrl)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        const items = [];
        (data.results || []).forEach(product => {
          if (product.variants?.length > 0) {
            product.variants.forEach(v => items.push({ product, variant: v }));
          } else {
            items.push({ product, variant: { 
              id: product.product_id, 
              sku: product.product_id, 
              mrp: "0.00", 
              selling_price: "0.00", 
              stock: 0, 
              verification_status: product.verification_status || "pending", 
              attributes: {}, 
              media: [],
              is_active: product.is_active || false,
              max_order_quantity: null
            } });
          }
        });
        setProducts(items);
      })
      .catch(e => { console.error(e); setProducts([]); })
      .finally(() => setLoading(false));
  }, [location.search, debouncedSearchTerm, selectedPriceRanges, selectedDiscountRanges]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, sortBy, selectedPriceRanges, selectedDiscountRanges]);

  // Client-side sorting only
  const sortedProducts = useMemo(() => {
    const list = [...products];
    switch (sortBy) {
      case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
      case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
      case "discount_desc": {
        const d = i => {
          const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price);
          return m > 0 ? ((m - s) / m) * 100 : 0;
        };
        list.sort((a, b) => d(b) - d(a));
        break;
      }
      case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
      case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
    }
    return list;
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const paginated = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilterCount = selectedPriceRanges.length + selectedDiscountRanges.length;
  const clearAll = () => { setSelectedPriceRanges([]); setSelectedDiscountRanges([]); };
  const sortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Sort By";
  const filterProps = { selectedPriceRanges, setSelectedPriceRanges, selectedDiscountRanges, setSelectedDiscountRanges };

  const handleUpdateProduct = (productId, data) => {
    fetch(`${baseurl}/products/${productId}/`, { 
      method: "PUT", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ product: { 
        verification_status: data.verification_status, 
        brand: data.brand, 
        product_name: data.product_name, 
        description: data.description, 
        is_active: data.is_active 
      } }) 
    })
      .then(r => r.json())
      .then(() => { 
        alert("Product updated!"); 
        fetchProducts(); 
        setEditProductModal({ isOpen: false, product: null }); 
      })
      .catch(() => alert("Failed to update"));
  };

  const handleUpdateVariant = (productId, variantId, data) => {
    // Ensure proper data types for the payload
    const variantPayload = {
      id: variantId,
      mrp: parseFloat(data.mrp) || 0,
      selling_price: parseFloat(data.selling_price) || 0,
      stock: parseInt(data.stock) || 0,
      hsn_code: data.hsn_code || null,
      is_returnable: Boolean(data.is_returnable),
      return_days: parseInt(data.return_days) || 7,
      is_active: Boolean(data.is_active), // Convert to boolean explicitly
      product_commission: data.product_commission || "0.00",
      distribution_commission: data.distribution_commission || "0.00",
      max_order_quantity: data.max_order_quantity ? parseInt(data.max_order_quantity) : null,
      verification_status: data.verification_status || "pending"
    };

    console.log("Updating variant with payload:", variantPayload);

    fetch(`${baseurl}/products/${productId}/`, { 
      method: "PUT", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ variants: [variantPayload] })
    })
      .then(async response => {
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API Error:", errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        return response.json();
      })
      .then(result => {
        console.log("Update successful:", result);
        alert("Variant updated successfully!");
        fetchProducts(); // Refresh the products list
        setEditVariantModal({ isOpen: false, product: null, variant: null });
      })
      .catch(error => {
        console.error("Failed to update variant:", error);
        alert(`Failed to update variant: ${error.message}`);
      });
  };

  const handleAddVariant = (productId, variantData) => {
    const fd = new FormData(); 
    fd.append("variants", JSON.stringify([variantData]));
    fetch(`${baseurl}/products/${productId}/`, { method: "PUT", body: fd })
      .then(r => r.json())
      .then(() => { 
        alert("Variant added!"); 
        fetchProducts(); 
        setAddVariantModal({ isOpen: false, product: null }); 
      })
      .catch(() => alert("Failed to add"));
  };

  const handleDeleteVariant = (productId, variantId) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      fetch(`${baseurl}/products/${productId}/?variants=${variantId}`, { method: "DELETE" })
        .then(r => { 
          if (!r.ok) throw new Error(); 
          alert("Variant deleted successfully!"); 
          fetchProducts(); 
          setEditVariantModal({ isOpen: false, product: null, variant: null }); 
        })
        .catch(() => alert("Failed to delete variant"));
    }
  };

  const handleDeleteMedia = (productId, mediaId) => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      fetch(`${baseurl}/products/${productId}/?media=${mediaId}`, { method: "DELETE" })
        .then(r => { 
          if (!r.ok) throw new Error(); 
          alert("Media deleted successfully!"); 
          fetchProducts(); 
          setManageMediaModal({ isOpen: false, product: null, variant: null }); 
        })
        .catch(() => alert("Failed to delete media"));
    }
  };

  const mobileFilterFooter = (
    <div className="mp-filter-footer-btns">
      <button className="mp-btn-clear" onClick={clearAll}>Clear All</button>
      <button className="mp-btn-apply" onClick={() => { setCurrentPage(1); setShowFilterSheet(false); }}>Apply Filters</button>
    </div>
  );

  const cardProps = {
    onEditProduct: p => setEditProductModal({ isOpen: true, product: p }),
    onEditVariant: (p, v) => setEditVariantModal({ isOpen: true, product: p, variant: v }),
    onAddVariant: p => setAddVariantModal({ isOpen: true, product: p }),
    onManageMedia: (p, v) => setManageMediaModal({ isOpen: true, product: p, variant: v }),
  };

  const productSection = loading ? (
    <div className="mp-loading"><div className="mp-spinner" /><span>Loading products...</span></div>
  ) : sortedProducts.length === 0 ? (
    <div className="mp-empty"><p>No products found</p><small>{debouncedSearchTerm || activeFilterCount > 0 ? "Try adjusting search or filters" : businessName ? `No products for ${businessName}` : "No products added yet"}</small></div>
  ) : (
    <>
      <div className={`mp-grid ${isMobile ? "mp-grid--2col" : "mp-grid--desktop"}`}>
        {paginated.map(item => (
          <ProductCard key={`${item.product.product_id}-${item.variant.id}`} product={item.product} variant={item.variant} {...cardProps} />
        ))}
      </div>
      {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
    </>
  );

  return (
    <>
      <AdminNavbar />

      {isMobile && (
        <div className="mp-mobile">
          <div className="mp-mobile-topbar">
            <button className="mp-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
            <h1 className="mp-mobile-title">Products</h1>
            <div style={{ width: 36 }} />
          </div>
          <div className="mp-mobile-search-wrap">
            <div className="mp-search-bar">
              <Search size={15} className="mp-search-ico" />
              <input
                type="text"
                placeholder="Search products..."
                className="mp-search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
            </div>
          </div>
          <div className="mp-toolbar">
            <button className="mp-toolbar-btn" onClick={() => setShowSortSheet(true)}><span>{sortLabel}</span><ChevronDown size={14} /></button>
            <button className={`mp-toolbar-btn ${activeFilterCount > 0 ? "mp-toolbar-btn--on" : ""}`} onClick={() => setShowFilterSheet(true)}>
              <Filter size={14} /><span>Filter</span>{activeFilterCount > 0 && <span className="mp-toolbar-badge">{activeFilterCount}</span>}
            </button>
          </div>
          {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
          <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
          {productSection}
          <div style={{ height: 24 }} />
          <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort By">
            <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortSheet(false)} />
          </BottomSheet>
          <BottomSheet isOpen={showFilterSheet} onClose={() => setShowFilterSheet(false)} title={`Filters${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} footer={mobileFilterFooter}>
            <FilterContent {...filterProps} />
          </BottomSheet>
        </div>
      )}

      {!isMobile && (
        <div className="mp-desktop">
          <div className="mp-desktop-body">
            <aside className="mp-sidebar">
              <div className="mp-sidebar-top">
                <span className="mp-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
                {activeFilterCount > 0 && <button className="mp-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>}
              </div>
              <FilterContent {...filterProps} isSidebar={true} />
            </aside>
            <main className="mp-main">
              <div className="mp-main-header">
                <h1 className="mp-desktop-title">
                  {businessName ? `${businessName} — Products` : "Products"}
                </h1>
                <button className="mp-back-desktop" onClick={() => navigate(-1)}>
                  <ArrowLeft size={17} /><span>Back</span>
                </button>
              </div>
              
              <div className="mp-main-topbar">
                <div className="mp-desktop-search">
                  <Search size={15} className="mp-search-ico" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="mp-search-input"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && <button className="mp-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
                </div>
                <div className="mp-sort-wrap">
                  <button className="mp-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
                    <span>{sortLabel}</span><ChevronDown size={14} />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="mp-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
                      <div className="mp-sort-dropdown">
                        <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {activeFilterCount > 0 && <ActiveChips {...filterProps} clearAll={clearAll} />}
              <div className="mp-count">{sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}</div>
              {productSection}
            </main>
          </div>
        </div>
      )}

      <EditProductModal product={editProductModal.product} isOpen={editProductModal.isOpen} onClose={() => setEditProductModal({ isOpen: false, product: null })} onSave={handleUpdateProduct} />
      <EditVariantModal product={editVariantModal.product} variant={editVariantModal.variant} isOpen={editVariantModal.isOpen} onClose={() => setEditVariantModal({ isOpen: false, product: null, variant: null })} onSave={handleUpdateVariant} onDelete={handleDeleteVariant} />
      <AddVariantModal product={addVariantModal.product} isOpen={addVariantModal.isOpen} onClose={() => setAddVariantModal({ isOpen: false, product: null })} onAdd={handleAddVariant} />
      <ManageMediaModal product={manageMediaModal.product} variant={manageMediaModal.variant} isOpen={manageMediaModal.isOpen} onClose={() => setManageMediaModal({ isOpen: false, product: null, variant: null })} onDeleteMedia={handleDeleteMedia} />
    </>
  );
};

export default AdminProducts;