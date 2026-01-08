// // Main/Filters.js
// import React, { useState } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   List,
//   LayoutList,
//   Filter
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Properties.css";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer"

// // ============= Data =============
// const categories = [
//   { name: "Electronics", count: 42 },
//   { name: "Clothing & Fashion", count: 38 },
//   { name: "Home & Kitchen", count: 56 },
//   { name: "Beauty & Personal Care", count: 29 },
//   { name: "Sports & Fitness", count: 24 },
//   { name: "Books & Stationery", count: 18 },
//   { name: "Toys & Games", count: 15 },
//   { name: "Automotive", count: 32 },
//   { name: "Groceries", count: 47 },
//   { name: "Health & Wellness", count: 21 },
// ];

// const brands = [
//   { name: "Apple", count: 28 },
//   { name: "Samsung", count: 35 },
//   { name: "Nike", count: 42 },
//   { name: "Adidas", count: 38 },
//   { name: "Sony", count: 19 },
//   { name: "LG", count: 22 },
//   { name: "HP", count: 17 },
//   { name: "Dell", count: 14 },
//   { name: "Philips", count: 26 },
//   { name: "Bose", count: 12 },
//   { name: "JBL", count: 18 },
//   { name: "Puma", count: 25 },
//   { name: "Reebok", count: 16 },
//   { name: "Levi's", count: 23 },
//   { name: "H&M", count: 31 },
// ];

// const priceRanges = [
//   { label: "Under ₹500", min: 0, max: 500 },
//   { label: "₹500 - ₹1000", min: 500, max: 1000 },
//   { label: "₹1000 - ₹2500", min: 1000, max: 2500 },
//   { label: "₹2500 - ₹5000", min: 2500, max: 5000 },
//   { label: "₹5000 - ₹10000", min: 5000, max: 10000 },
//   { label: "Over ₹10000", min: 10000, max: 999999 },
// ];

// const discountRanges = [
//   { label: "10% & above", value: 10 },
//   { label: "20% & above", value: 20 },
//   { label: "30% & above", value: 30 },
//   { label: "40% & above", value: 40 },
//   { label: "50% & above", value: 50 },
//   { label: "60% & above", value: 60 },
//   { label: "70% & above", value: 70 },
//   { label: "80% & above", value: 80 },
// ];

// const sampleProducts = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
//     title: "Spiral Charger Cable Protector Data Cable Saver Charging...",
//     quantity: "4 sets",
//     price: 69,
//     originalPrice: 999,
//     discount: 93,
//     brand: "Apple",
//     category: "Electronics"
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
//     title: "USB-C to Lightning Fast Charging Cable (1M) | PD 20...",
//     quantity: "1 piece",
//     price: 149,
//     originalPrice: 1999,
//     discount: 93,
//     brand: "Samsung",
//     category: "Electronics"
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=300&fit=crop",
//     title: "Winter Warm Touch Screen / Gym Workouts Full Finger...",
//     quantity: "1 pair",
//     price: 149,
//     originalPrice: 1999,
//     discount: 93,
//     brand: "Nike",
//     category: "Sports & Fitness"
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=300&h=300&fit=crop",
//     title: "Electric Hot Water Bag for Pain Relief – Reusable Heati...",
//     quantity: "1 piece",
//     price: 129,
//     originalPrice: 1499,
//     discount: 91,
//     brand: "Philips",
//     category: "Health & Wellness"
//   },
//   {
//     id: 5,
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
//     title: "Premium Wireless Bluetooth Headphones with Noise Cancellation...",
//     quantity: "1 piece",
//     price: 899,
//     originalPrice: 4999,
//     discount: 82,
//     brand: "Bose",
//     category: "Electronics"
//   },
//   {
//     id: 6,
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
//     title: "Smart Watch with Heart Rate Monitor and Fitness Tracker...",
//     quantity: "1 piece",
//     price: 599,
//     originalPrice: 2999,
//     discount: 80,
//     brand: "Samsung",
//     category: "Electronics"
//   },
//   {
//     id: 7,
//     image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
//     title: "Portable Power Bank 20000mAh Fast Charging USB-C...",
//     quantity: "1 piece",
//     price: 499,
//     originalPrice: 1999,
//     discount: 75,
//     brand: "Sony",
//     category: "Electronics"
//   },
//   {
//     id: 8,
//     image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop",
//     title: "LED Desk Lamp with USB Charging Port Adjustable...",
//     quantity: "1 piece",
//     price: 349,
//     originalPrice: 1299,
//     discount: 73,
//     brand: "Philips",
//     category: "Home & Kitchen"
//   },
//   {
//     id: 9,
//     image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop",
//     title: "Running Shoes for Men - Lightweight Sports Shoes",
//     quantity: "1 pair",
//     price: 1299,
//     originalPrice: 2999,
//     discount: 57,
//     brand: "Adidas",
//     category: "Sports & Fitness"
//   },
//   {
//     id: 10,
//     image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
//     title: "Gaming Keyboard with RGB Backlit - Mechanical",
//     quantity: "1 piece",
//     price: 2499,
//     originalPrice: 4999,
//     discount: 50,
//     brand: "HP",
//     category: "Electronics"
//   },
//   {
//     id: 11,
//     image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
//     title: "Casual T-Shirt for Men - Cotton Regular Fit",
//     quantity: "1 piece",
//     price: 399,
//     originalPrice: 999,
//     discount: 60,
//     brand: "H&M",
//     category: "Clothing & Fashion"
//   },
//   {
//     id: 12,
//     image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
//     title: "Smart Water Bottle with Temperature Display",
//     quantity: "1 piece",
//     price: 799,
//     originalPrice: 1999,
//     discount: 60,
//     brand: "Philips",
//     category: "Health & Wellness"
//   },
// ];

// // ============= Product Card Component =============
// const ProductCard = ({ product }) => {
//   return (
//     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
//       <div className="position-relative">
//         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
//           <img
//             src={product.image}
//             alt={product.title}
//             className="img-fluid"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
//           />
//         </div>
//         <div className="position-absolute top-0 end-0 m-2">
//           <span className="badge bg-danger">{product.discount}% OFF</span>
//         </div>
//       </div>
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
//           {product.title}
//         </h6>
//         <p className="card-text text-muted small mb-2">{product.quantity}</p>
//         <p className="card-text small text-muted mb-2">
//           <span className="badge bg-light text-dark border">{product.brand}</span>
//         </p>
//         <div className="d-flex align-items-center gap-2 mb-3 mt-auto">
//           <span className="h5 fw-bold text-dark">₹{product.price}</span>
//           <span className="text-muted small text-decoration-line-through">
//             ₹{product.originalPrice.toLocaleString()}
//           </span>
//           <span className="text-danger small fw-medium">
//             ({product.discount}% OFF)
//           </span>
//         </div>
//   <button 
//   className="btn w-100 fw-semibold py-2"
//   style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
// >
//   ADD TO CART
// </button>
//       </div>
//     </div>
//   );
// };

// // ============= Filter Section Component =============
// const FilterSection = ({ 
//   title, 
//   isOpen, 
//   onToggle, 
//   children 
// }) => {
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={onToggle}
//         className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
//         style={{ cursor: 'pointer' }}
//       >
//         <span className="fw-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-5 w-5 text-muted" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-muted" />
//         )}
//       </button>
      
//       {isOpen && (
//         <div className="px-3 pb-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Sidebar Component =============
// const FilterSidebar = () => {
//   const [activeFilters, setActiveFilters] = useState({
//     categories: true,
//     price: true,
//     discount: true,
//     brand: true
//   });

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedDiscounts, setSelectedDiscounts] = useState([]);
//   const [categorySearch, setCategorySearch] = useState("");
//   const [brandSearch, setBrandSearch] = useState("");

//   const filteredCategories = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(categorySearch.toLowerCase())
//   );

//   const filteredBrands = brands.filter((brand) =>
//     brand.name.toLowerCase().includes(brandSearch.toLowerCase())
//   );

//   const toggleFilterSection = (section) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCategory = (name) => {
//     setSelectedCategories((prev) =>
//       prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name]
//     );
//   };

//   const toggleBrand = (name) => {
//     setSelectedBrands((prev) =>
//       prev.includes(name)
//         ? prev.filter((b) => b !== name)
//         : [...prev, name]
//     );
//   };

//   const togglePriceRange = (range) => {
//     setSelectedPriceRanges((prev) =>
//       prev.includes(range)
//         ? prev.filter((r) => r !== range)
//         : [...prev, range]
//     );
//   };

//   const toggleDiscount = (discount) => {
//     setSelectedDiscounts((prev) =>
//       prev.includes(discount)
//         ? prev.filter((d) => d !== discount)
//         : [...prev, discount]
//     );
//   };

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedBrands([]);
//     setSelectedPriceRanges([]);
//     setSelectedDiscounts([]);
//     setCategorySearch("");
//     setBrandSearch("");
//   };

//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedBrands.length + 
//     selectedPriceRanges.length + 
//     selectedDiscounts.length;

//   return (
//     <div className="w-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">
//           <Filter className="h-5 w-5 me-2" />
//           Filters
//         </h5>
//         {activeFilterCount > 0 && (
//           <button 
//             onClick={clearAllFilters}
//             className="btn btn-sm btn-outline-secondary"
//           >
//             Clear All ({activeFilterCount})
//           </button>
//         )}
//       </div>

//       {/* Categories Filter */}
//       <FilterSection
//         title="Categories"
//         isOpen={activeFilters.categories}
//         onToggle={() => toggleFilterSection('categories')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search categories..."
//             value={categorySearch}
//             onChange={(e) => setCategorySearch(e.target.value)}
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredCategories.map((category) => (
//             <div
//               key={category.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleCategory(category.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedCategories.includes(category.name)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedCategories.includes(category.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {category.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({category.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Price Filter */}
//       <FilterSection
//         title="Price"
//         isOpen={activeFilters.price}
//         onToggle={() => toggleFilterSection('price')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {priceRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => togglePriceRange(range.label)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Discount Filter */}
//       <FilterSection
//         title="Discount"
//         isOpen={activeFilters.discount}
//         onToggle={() => toggleFilterSection('discount')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {discountRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleDiscount(range.value)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedDiscounts.includes(range.value)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedDiscounts.includes(range.value) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Brand Filter */}
//       <FilterSection
//         title="Brand"
//         isOpen={activeFilters.brand}
//         onToggle={() => toggleFilterSection('brand')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search brands..."
//             value={brandSearch}
//             onChange={(e) => setBrandSearch(e.target.value)}
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredBrands.map((brand) => (
//             <div
//               key={brand.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleBrand(brand.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedBrands.includes(brand.name)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedBrands.includes(brand.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {brand.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({brand.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Active Filters Summary */}
//       {activeFilterCount > 0 && (
//         <div className="mt-4">
//           <h6 className="fw-semibold mb-2">Active Filters:</h6>
//           <div className="d-flex flex-wrap gap-2">
//             {selectedCategories.map(cat => (
//               <span key={cat} className="badge bg-primary-subtle text-primary border border-primary">
//                 {cat} <button onClick={() => toggleCategory(cat)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedBrands.map(brand => (
//               <span key={brand} className="badge bg-success-subtle text-success border border-success">
//                 {brand} <button onClick={() => toggleBrand(brand)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedPriceRanges.map(range => (
//               <span key={range} className="badge bg-warning-subtle text-warning border border-warning">
//                 {range} <button onClick={() => togglePriceRange(range)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedDiscounts.map(discount => (
//               <span key={discount} className="badge bg-danger-subtle text-danger border border-danger">
//                 {discount}% & above <button onClick={() => toggleDiscount(discount)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Product Header Component =============
// const ProductHeader = ({
//   totalProducts,
//   showingProducts,
//   viewMode,
//   onViewModeChange,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const viewButtons = [
//     { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
//     { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
//     { mode: "list", icon: List, label: "List" },
//     { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
//   ];

//   return (
//     <div className="row align-items-center justify-content-between mb-4">
//       <div className="col-md-6 mb-3 mb-md-0">
//         <div className="d-flex align-items-center">
//           <h4 className="fw-bold mb-0 me-3">Products</h4>
//           <p className="mb-0 text-muted">
//             Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//             <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
//             products
//           </p>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
//           <div className="input-group" style={{ width: '200px' }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search className="h-4 w-4 text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-sm border-start-0"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="btn btn-outline-secondary border-start-0"
//                 type="button"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <div className="btn-group" role="group" aria-label="View mode">
//             {viewButtons.map(({ mode, icon: Icon, label }) => (
//               <button
//                 key={mode}
//                 onClick={() => onViewModeChange(mode)}
//                 className={`btn btn-outline-secondary ${
//                   viewMode === mode ? "active" : ""
//                 }`}
//                 style={{ padding: '0.375rem 0.75rem' }}
//                 title={label}
//               >
//                 <Icon className="h-4 w-4" />
//               </button>
//             ))}
//           </div>

//           <select className="form-select form-select-sm" style={{ width: '130px' }}>
//             <option value="default">Sort By</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="newest">Newest First</option>
//             <option value="discount">Discount</option>
//             <option value="rating">Customer Rating</option>
//             <option value="popularity">Popularity</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Product Grid Component =============
// const ProductGrid = ({ products, viewMode }) => {
//   const getGridClasses = () => {
//     switch (viewMode) {
//       case "grid-2":
//         return "row row-cols-1 row-cols-sm-2";
//       case "grid-3":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
//       case "grid-4":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//       case "list":
//         return "row row-cols-1";
//       default:
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//     }
//   };

//   // In list view mode, show products differently
//   if (viewMode === "list") {
//     return (
//       <div className="list-group">
//         {products.map((product) => (
//           <div key={product.id} className="list-group-item mb-3">
//             <div className="row g-3">
//               <div className="col-md-3">
//                 <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="img-fluid"
//                     style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <h6 className="card-title fw-medium mb-2">{product.title}</h6>
//                 <p className="card-text text-muted small mb-2">{product.quantity}</p>
//                 <p className="card-text small text-muted mb-2">
//                   <span className="badge bg-light text-dark border me-2">{product.brand}</span>
//                   <span className="badge bg-light text-dark border">{product.category}</span>
//                 </p>
//                 <div className="d-flex align-items-center gap-2">
//                   <span className="h5 fw-bold text-dark">₹{product.price}</span>
//                   <span className="text-muted small text-decoration-line-through">
//                     ₹{product.originalPrice.toLocaleString()}
//                   </span>
//                   <span className="text-danger small fw-medium">
//                     ({product.discount}% OFF)
//                   </span>
//                 </div>
//               </div>
//               <div className="col-md-3 d-flex align-items-center justify-content-end">
//                <button 
//   className="btn w-100 fw-semibold py-2"
//   style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
// >
//   ADD TO CART
// </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className={getGridClasses()}>
//       {products.map((product) => (
//         <div key={product.id} className="col mb-4">
//           <ProductCard product={product} />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Main Filters Page Component =============
// const Properties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");

//       return (
//     <div className="min-vh-100 d-flex flex-column">
//       {/* Header */}
//       <WebsiteNavbar />
      
//       {/* Main Content */}
//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             totalProducts={329}
//             showingProducts={sampleProducts.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//           />

//           <div className="row">
//             {/* Filters Sidebar */}
//             <aside className="col-lg-3 mb-4 mb-lg-0">
//               <div className="sticky-top" style={{ top: '20px' }}>
//                 <FilterSidebar />
//               </div>
//             </aside>

//             {/* Products Grid */}
//             <div className="col-lg-9">
//               <ProductGrid products={sampleProducts} viewMode={viewMode} />
              
//               {/* Pagination */}
//               <nav aria-label="Page navigation" className="mt-5">
//                 <ul className="pagination justify-content-center">
//                   <li className="page-item disabled">
//                     <button className="page-link">Previous</button>
//                   </li>
//                   <li className="page-item active">
//                     <button className="page-link">1</button>
//                   </li>
//                   <li className="page-item">
//                     <button className="page-link">2</button>
//                   </li>
//                   <li className="page-item">
//                     <button className="page-link">3</button>
//                   </li>
//                   <li className="page-item">
//                     <button className="page-link">Next</button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Properties;




// import React, { useState, useEffect } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   List,
//   LayoutList,
//   Filter
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Properties.css";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer"
// import { baseurl } from "../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";

// // ============= Data =============
// const categories = [
//   { name: "Residential", count: 42 },
//   { name: "Commercial", count: 38 },
//   { name: "Agricultural", count: 56 },
//   { name: "Industrial", count: 29 },
//   { name: "Vacant Land", count: 24 },
// ];

// const propertyTypes = [
//   { name: "Apartment", count: 28 },
//   { name: "Independent House", count: 35 },
//   { name: "Villa", count: 42 },
//   { name: "Plot", count: 38 },
//   { name: "Shop", count: 19 },
//   { name: "Office Space", count: 22 },
//   { name: "Warehouse", count: 17 },
//   { name: "Factory", count: 14 },
// ];

// const priceRanges = [
//   { label: "Under ₹10L", min: 0, max: 1000000 },
//   { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
//   { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
//   { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//   { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
//   { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
// ];

// const cities = [
//   { name: "Karimnagar", count: 12 },
//   { name: "Hyderabad", count: 35 },
//   { name: "Visakhapatnam", count: 42 },
//   { name: "Nandyal", count: 38 },
//   { name: "Adoni", count: 19 },
//   { name: "Amudalavalasa", count: 22 },
// ];

// const transactionTypes = [
//   { name: "Sell", count: 65 },
//   { name: "Rent", count: 35 },
// ];

// // ============= Product Card Component =============
// const PropertyCard = ({ property }) => {
//     const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/property/${property.property_id}`);
//   };

//   // Construct image URL
//   const getImageUrl = () => {
//     if (property.images && property.images.length > 0) {
//       const imagePath = property.images[0].image;
//       if (imagePath.startsWith('/media/')) {
//         return `${baseurl}${imagePath}`; // Use baseurl here
//       }
//       return imagePath;
//     }
//     return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//   };

//   // Format price in lakhs/crores
//   const formatPrice = (price) => {
//     const priceNum = parseFloat(price);
//     if (priceNum >= 10000000) {
//       return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
//     } else if (priceNum >= 100000) {
//       return `₹${(priceNum / 100000).toFixed(2)} L`;
//     }
//     return `₹${priceNum.toLocaleString()}`;
//   };

//   const imageUrl = getImageUrl();
//   const formattedPrice = property.looking_to === "sell" 
//     ? formatPrice(property.total_property_value || property.property_value)
//     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount 
//     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//     : '';

//   return (
//     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
//       <div className="position-relative">
//         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
//           <img
//             src={imageUrl}
//             alt={property.property_title}
//             className="img-fluid"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//             }}
//           />
//         </div>
//         <div className="position-absolute top-0 end-0 m-2">
//           <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
//             {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//           </span>
//         </div>
//         {property.is_featured && (
//           <div className="position-absolute top-0 start-0 m-2">
//             <span className="badge bg-warning text-dark">FEATURED</span>
//           </div>
//         )}
//       </div>
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
//           {property.property_title}
//         </h6>
//         <p className="card-text text-muted small mb-2">
//           <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//         </p>
//         <div className="d-flex flex-wrap gap-1 mb-2">
//           <span className="badge bg-light text-dark border small">
//             {property.area} {property.area_unit}
//           </span>
//           {property.number_of_bedrooms && (
//             <span className="badge bg-light text-dark border small">
//               {property.number_of_bedrooms} BHK
//             </span>
//           )}
//           {property.facing && (
//             <span className="badge bg-light text-dark border small">
//               {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//             </span>
//           )}
//         </div>
//         <div className="d-flex align-items-center gap-2  mt-auto">
//           <span className="h5 fw-bold text-dark">
//             {formattedPrice}
//             {property.looking_to === "rent" && (
//               <small className="text-muted d-block">{depositText}</small>
//             )}
//           </span>
//         </div>
      
//          {/* Buttons Section */}
//            <button 
//             className="btn w-100 fw-semibold py-2 "
//             style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//           >
//             Payout
//           </button>
//         <button 
//           onClick={handleViewDetails}
//           className="btn w-100 fw-semibold py-2 mt-2"
//           style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//         >
//           {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//         </button>
        
//         {/* Add Pay Now button only for properties for sale */}
        
      
//       </div>
//     </div>
//   );
// };

// // ============= Filter Section Component =============
// const FilterSection = ({ 
//   title, 
//   isOpen, 
//   onToggle, 
//   children 
// }) => {
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={onToggle}
//         className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
//         style={{ cursor: 'pointer' }}
//       >
//         <span className="fw-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-5 w-5 text-muted" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-muted" />
//         )}
//       </button>
      
//       {isOpen && (
//         <div className="px-3 pb-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Sidebar Component =============
// const FilterSidebar = ({ 
//   selectedCategories, 
//   setSelectedCategories,
//   selectedTypes,
//   setSelectedTypes,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   selectedCities,
//   setSelectedCities,
//   selectedTransactionTypes,
//   setSelectedTransactionTypes
// }) => {
//   const [activeFilters, setActiveFilters] = useState({
//     categories: true,
//     price: true,
//     type: true,
//     location: true,
//     transaction: true
//   });

//   const [categorySearch, setCategorySearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");

//   const filteredCategories = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(categorySearch.toLowerCase())
//   );

//   const filteredTypes = propertyTypes.filter((type) =>
//     type.name.toLowerCase().includes(typeSearch.toLowerCase())
//   );

//   const filteredCities = cities.filter((city) =>
//     city.name.toLowerCase().includes(citySearch.toLowerCase())
//   );

//   const toggleFilterSection = (section) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCategory = (name) => {
//     setSelectedCategories((prev) =>
//       prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name]
//     );
//   };

//   const toggleType = (name) => {
//     setSelectedTypes((prev) =>
//       prev.includes(name)
//         ? prev.filter((b) => b !== name)
//         : [...prev, name]
//     );
//   };

//   const togglePriceRange = (range) => {
//     setSelectedPriceRanges((prev) =>
//       prev.includes(range)
//         ? prev.filter((r) => r !== range)
//         : [...prev, range]
//     );
//   };

//   const toggleCity = (name) => {
//     setSelectedCities((prev) =>
//       prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name]
//     );
//   };

//   const toggleTransactionType = (type) => {
//     setSelectedTransactionTypes((prev) =>
//       prev.includes(type)
//         ? prev.filter((t) => t !== type)
//         : [...prev, type]
//     );
//   };

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setCategorySearch("");
//     setTypeSearch("");
//     setCitySearch("");
//   };

//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedTypes.length + 
//     selectedPriceRanges.length + 
//     selectedCities.length +
//     selectedTransactionTypes.length;

//   return (
//     <div className="w-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">
//           <Filter className="h-5 w-5 me-2" />
//           Filters
//         </h5>
//         {activeFilterCount > 0 && (
//           <button 
//             onClick={clearAllFilters}
//             className="btn btn-sm btn-outline-secondary"
//           >
//             Clear All ({activeFilterCount})
//           </button>
//         )}
//       </div>

//       {/* Transaction Type Filter */}
//       <FilterSection
//         title="Transaction Type"
//         isOpen={activeFilters.transaction}
//         onToggle={() => toggleFilterSection('transaction')}
//       >
//         <div className="overflow-y-auto">
//           {transactionTypes.map((type) => (
//             <div
//               key={type.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleTransactionType(type.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedTransactionTypes.includes(type.name)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({type.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Categories Filter */}
//       <FilterSection
//         title="Property Category"
//         isOpen={activeFilters.categories}
//         onToggle={() => toggleFilterSection('categories')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search categories..."
//             value={categorySearch}
//             onChange={(e) => setCategorySearch(e.target.value)}
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredCategories.map((category) => (
//             <div
//               key={category.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleCategory(category.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedCategories.includes(category.name)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedCategories.includes(category.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {category.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({category.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Property Type Filter */}
//       <FilterSection
//         title="Property Type"
//         isOpen={activeFilters.type}
//         onToggle={() => toggleFilterSection('type')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search property types..."
//             value={typeSearch}
//             onChange={(e) => setTypeSearch(e.target.value)}
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredTypes.map((type) => (
//             <div
//               key={type.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleType(type.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedTypes.includes(type.name)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({type.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Price Filter */}
//       <FilterSection
//         title="Price Range"
//         isOpen={activeFilters.price}
//         onToggle={() => toggleFilterSection('price')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {priceRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => togglePriceRange(range.label)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Location Filter */}
//       <FilterSection
//         title="Location"
//         isOpen={activeFilters.location}
//         onToggle={() => toggleFilterSection('location')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search cities..."
//             value={citySearch}
//             onChange={(e) => setCitySearch(e.target.value)}
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredCities.map((city) => (
//             <div
//               key={city.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleCity(city.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedCities.includes(city.name)}
//                   readOnly
//                 />
//                 <span className={`small ${selectedCities.includes(city.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {city.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({city.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Active Filters Summary */}
//       {activeFilterCount > 0 && (
//         <div className="mt-4">
//           <h6 className="fw-semibold mb-2">Active Filters:</h6>
//           <div className="d-flex flex-wrap gap-2">
//             {selectedTransactionTypes.map(type => (
//               <span key={type} className="badge bg-info-subtle text-info border border-info">
//                 {type} <button onClick={() => toggleTransactionType(type)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedCategories.map(cat => (
//               <span key={cat} className="badge bg-primary-subtle text-primary border border-primary">
//                 {cat} <button onClick={() => toggleCategory(cat)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedTypes.map(type => (
//               <span key={type} className="badge bg-success-subtle text-success border border-success">
//                 {type} <button onClick={() => toggleType(type)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedPriceRanges.map(range => (
//               <span key={range} className="badge bg-warning-subtle text-warning border border-warning">
//                 {range} <button onClick={() => togglePriceRange(range)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//             {selectedCities.map(city => (
//               <span key={city} className="badge bg-danger-subtle text-danger border border-danger">
//                 {city} <button onClick={() => toggleCity(city)} className="btn-close btn-close-sm ms-1"></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Product Header Component =============
// const ProductHeader = ({
//   totalProducts,
//   showingProducts,
//   viewMode,
//   onViewModeChange,
//   searchTerm,
//   setSearchTerm,
//   sortOption,
//   setSortOption
// }) => {
//   const viewButtons = [
//     { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
//     { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
//     { mode: "list", icon: List, label: "List" },
//     { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
//   ];

//   return (
//     <div className="row align-items-center justify-content-between mb-4">
//       <div className="col-md-6 mb-3 mb-md-0">
//         <div className="d-flex align-items-center">
//           <h4 className="fw-bold mb-0 me-3">Properties</h4>
//           <p className="mb-0 text-muted">
//             Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//             <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
//             properties
//           </p>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
//           <div className="input-group" style={{ width: '200px' }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search className="h-4 w-4 text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-sm border-start-0"
//               placeholder="Search properties..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="btn btn-outline-secondary border-start-0"
//                 type="button"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <div className="btn-group" role="group" aria-label="View mode">
//             {viewButtons.map(({ mode, icon: Icon, label }) => (
//               <button
//                 key={mode}
//                 onClick={() => onViewModeChange(mode)}
//                 className={`btn btn-outline-secondary ${
//                   viewMode === mode ? "active" : ""
//                 }`}
//                 style={{ padding: '0.375rem 0.75rem' }}
//                 title={label}
//               >
//                 <Icon className="h-4 w-4" />
//               </button>
//             ))}
//           </div>

//           <select 
//             className="form-select form-select-sm" 
//             style={{ width: '130px' }}
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//           >
//             <option value="default">Sort By</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="newest">Newest First</option>
//             <option value="area-high">Area: High to Low</option>
//             <option value="area-low">Area: Low to High</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Grid Component =============
// const PropertyGrid = ({ properties, viewMode }) => {
//   const getGridClasses = () => {
//     switch (viewMode) {
//       case "grid-2":
//         return "row row-cols-1 row-cols-sm-2";
//       case "grid-3":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
//       case "grid-4":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//       case "list":
//         return "row row-cols-1";
//       default:
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//     }
//   };

//   // Format price for list view
//   const formatPrice = (property) => {
//     const price = parseFloat(property.looking_to === "sell" 
//       ? (property.total_property_value || property.property_value)
//       : property.rent_amount || 0);
    
//     if (price >= 10000000) {
//       return `₹${(price / 10000000).toFixed(2)} Cr`;
//     } else if (price >= 100000) {
//       return `₹${(price / 100000).toFixed(2)} L`;
//     }
//     return `₹${price.toLocaleString()}`;
//   };

//   // In list view mode, show properties differently
//   if (viewMode === "list") {
//     return (
//       <div className="list-group">
//         {properties.map((property) => {
//           const imageUrl = property.images && property.images.length > 0
//                      ? `${baseurl}${property.images[0].image}` 

//             : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
          
//           const priceText = property.looking_to === "sell"
//             ? `${formatPrice(property)}`
//             : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;
          
//           const depositText = property.deposit_amount 
//             ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//             : '';

//           return (
//             <div key={property.property_id} className="list-group-item mb-3">
//               <div className="row g-3">
//                 <div className="col-md-3">
//                   <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
//                     <img
//                       src={imageUrl}
//                       alt={property.property_title}
//                       className="img-fluid"
//                       style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex align-items-start gap-2 mb-2">
//                     <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
//                     {property.is_featured && (
//                       <span className="badge bg-warning text-dark small">FEATURED</span>
//                     )}
//                     <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                       {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//                     </span>
//                   </div>
//                   <p className="card-text text-muted small mb-2">
//                     <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//                   </p>
//                   <div className="d-flex flex-wrap gap-2 mb-2">
//                     <span className="badge bg-light text-dark border small">
//                       {property.area} {property.area_unit}
//                     </span>
//                     {property.number_of_bedrooms && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.number_of_bedrooms} BHK
//                       </span>
//                     )}
//                     {property.facing && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//                       </span>
//                     )}
//                   </div>
//                   <div className="d-flex align-items-center gap-2">
//                     <span className="h5 fw-bold text-dark">
//                       {priceText}
//                       {property.looking_to === "rent" && (
//                         <small className="text-muted d-block">{depositText}</small>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-md-3 d-flex align-items-center justify-content-end">
//                   <button 
//                     className="btn w-100 fw-semibold py-2"
//                     style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//                   >
//                     {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   return (
//     <div className={getGridClasses()}>
//       {properties.map((property) => (
//         <div key={property.property_id} className="col mb-4">
//           <PropertyCard property={property} />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Main Filters Page Component =============
// const Properties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("default");

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);

//   // Fetch properties from API
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//                const response = await fetch(`${baseurl}/properties/?page=${currentPage}`); // Use baseurl here

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProperties(data.results);
//         setTotalCount(data.count);
//         setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 items per page
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching properties:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, [currentPage]);

//   // Filter properties based on selected filters and search term
//   const filteredProperties = properties.filter(property => {
//     // Search filter
//     if (searchTerm && !property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         !property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         !property.city.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false;
//     }

//     // Transaction type filter
//     if (selectedTransactionTypes.length > 0) {
//       const transactionType = property.looking_to === "sell" ? "Sell" : "Rent";
//       if (!selectedTransactionTypes.includes(transactionType)) {
//         return false;
//       }
//     }

//     // Category filter (you'll need to map category IDs to names)
//     if (selectedCategories.length > 0) {
//       // You'll need to fetch categories from API or map IDs to names
//       // For now, using property_type as category
//       const propertyCategory = getCategoryFromId(property.category);
//       if (!selectedCategories.includes(propertyCategory)) {
//         return false;
//       }
//     }

//     // Property type filter
//     if (selectedTypes.length > 0) {
//       const propertyType = getPropertyTypeFromId(property.property_type);
//       if (!selectedTypes.includes(propertyType)) {
//         return false;
//       }
//     }

//     // Price range filter
//     if (selectedPriceRanges.length > 0) {
//       const price = parseFloat(property.looking_to === "sell" 
//         ? (property.total_property_value || property.property_value)
//         : property.rent_amount || 0);
      
//       const passesPriceFilter = selectedPriceRanges.some(rangeLabel => {
//         const range = priceRanges.find(r => r.label === rangeLabel);
//         return range && price >= range.min && price <= range.max;
//       });
      
//       if (!passesPriceFilter) return false;
//     }

//     // City filter
//     if (selectedCities.length > 0 && !selectedCities.includes(property.city)) {
//       return false;
//     }

//     return true;
//   });

//   // Sort properties
//   const sortedProperties = [...filteredProperties].sort((a, b) => {
//     switch (sortOption) {
//       case "price-low":
//         return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
//                 parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
//       case "price-high":
//         return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
//                 parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
//       case "newest":
//         return new Date(b.created_at) - new Date(a.created_at);
//       case "area-high":
//         return parseFloat(b.area) - parseFloat(a.area);
//       case "area-low":
//         return parseFloat(a.area) - parseFloat(b.area);
//       default:
//         return 0;
//     }
//   });

//   // Helper functions to map IDs to names
//   const getCategoryFromId = (id) => {
//     const categoryMap = {
//       1: "Residential",
//       7: "Commercial",
//       13: "Commercial",
//       14: "Residential"
//       // Add more mappings as needed
//     };
//     return categoryMap[id] || "Other";
//   };

//   const getPropertyTypeFromId = (id) => {
//     const typeMap = {
//       1: "Apartment",
//       9: "Shop",
//       10: "Office Space",
//       12: "Warehouse",
//       13: "Independent House"
//       // Add more mappings as needed
//     };
//     return typeMap[id] || "Other";
//   };

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Render pagination
//   const renderPagination = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button className="page-link" onClick={() => handlePageChange(i)}>
//             {i}
//           </button>
//         </li>
//       );
//     }

//     return (
//       <nav aria-label="Page navigation" className="mt-5">
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>
//           {startPage > 1 && (
//             <>
//               <li className="page-item">
//                 <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
//               </li>
//               {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//             </>
//           )}
//           {pages}
//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//               <li className="page-item">
//                 <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
//               </li>
//             </>
//           )}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading properties...</p>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="alert alert-danger" role="alert">
//               Error loading properties: {error}
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       {/* Header */}
//       <WebsiteNavbar />
      
//       {/* Main Content */}
//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             totalProducts={totalCount}
//             showingProducts={sortedProperties.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//           />

//           <div className="row">
//             {/* Filters Sidebar */}
//             <aside className="col-lg-3 mb-4 mb-lg-0">
//               <div className="sticky-top" style={{ top: '20px' }}>
//                 <FilterSidebar
//                   selectedCategories={selectedCategories}
//                   setSelectedCategories={setSelectedCategories}
//                   selectedTypes={selectedTypes}
//                   setSelectedTypes={setSelectedTypes}
//                   selectedPriceRanges={selectedPriceRanges}
//                   setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedCities={selectedCities}
//                   setSelectedCities={setSelectedCities}
//                   selectedTransactionTypes={selectedTransactionTypes}
//                   setSelectedTransactionTypes={setSelectedTransactionTypes}
//                 />
//               </div>
//             </aside>

//             {/* Properties Grid */}
//             <div className="col-lg-9">
//               {sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <h5>No properties found matching your criteria.</h5>
//                   <p className="text-muted">Try adjusting your filters or search term.</p>
//                 </div>
//               ) : (
//                 <>
//                   <PropertyGrid properties={sortedProperties} viewMode={viewMode} />
//                   {renderPagination()}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Properties;



// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   List,
//   LayoutList,
//   Filter
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Properties.css";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import Footer from "../Footer/Footer"
// import { baseurl } from "../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";

// // ============= Utility Functions =============
// const formatPrice = (price) => {
//   const priceNum = parseFloat(price);
//   if (priceNum >= 10000000) {
//     return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
//   } else if (priceNum >= 100000) {
//     return `₹${(priceNum / 100000).toFixed(2)} L`;
//   }
//   return `₹${priceNum.toLocaleString()}`;
// };

// const getImageUrl = (images) => {
//   if (images && images.length > 0) {
//     const imagePath = images[0].image;
//     if (imagePath.startsWith('/media/')) {
//       return `${baseurl}${imagePath}`;
//     }
//     return imagePath;
//   }
//   return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
// };

// // ============= Property Card Component =============
// const PropertyCard = ({ property }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/property/${property.property_id}`);
//   };

//   const imageUrl = getImageUrl(property.images);
//   const formattedPrice = property.looking_to === "sell" 
//     ? formatPrice(property.total_property_value || property.property_value)
//     : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

//   const depositText = property.deposit_amount 
//     ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//     : '';

//   return (
//     <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
//       <div className="position-relative">
//         <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
//           <img
//             src={imageUrl}
//             alt={property.property_title}
//             className="img-fluid"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//             onError={(e) => {
//               e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//             }}
//           />
//         </div>
//         <div className="position-absolute top-0 end-0 m-2">
//           <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
//             {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//           </span>
//         </div>
//         {property.is_featured && (
//           <div className="position-absolute top-0 start-0 m-2">
//             <span className="badge bg-warning text-dark">FEATURED</span>
//           </div>
//         )}
//       </div>
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
//           {property.property_title}
//         </h6>
//         <p className="card-text text-muted small mb-2">
//           <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//         </p>
//         <div className="d-flex flex-wrap gap-1 mb-2">
//           <span className="badge bg-light text-dark border small">
//             {property.area} {property.area_unit}
//           </span>
//           {property.number_of_bedrooms && (
//             <span className="badge bg-light text-dark border small">
//               {property.number_of_bedrooms} BHK
//             </span>
//           )}
//           {property.facing && (
//             <span className="badge bg-light text-dark border small">
//               {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//             </span>
//           )}
//         </div>
//         <div className="d-flex align-items-center gap-2 mt-auto">
//           <span className="h5 fw-bold text-dark">
//             {formattedPrice}
//             {property.looking_to === "rent" && (
//               <small className="text-muted d-block">{depositText}</small>
//             )}
//           </span>
//         </div>
      
//         <button 
//           className="btn w-100 fw-semibold py-2 "
//           style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
//         >
//           Payout
//         </button>
//         <button 
//           onClick={handleViewDetails}
//           className="btn w-100 fw-semibold py-2 mt-2"
//           style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//         >
//           {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============= Filter Section Component =============
// const FilterSection = ({ 
//   title, 
//   isOpen, 
//   onToggle, 
//   children 
// }) => {
//   return (
//     <div className="border rounded mb-3">
//       <button
//         onClick={onToggle}
//         className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
//         style={{ cursor: 'pointer' }}
//         aria-label={`Toggle ${title} filter section`}
//         aria-expanded={isOpen}
//       >
//         <span className="fw-medium">{title}</span>
//         {isOpen ? (
//           <ChevronUp className="h-5 w-5 text-muted" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-muted" />
//         )}
//       </button>
      
//       {isOpen && (
//         <div className="px-3 pb-3">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Filter Sidebar Component =============
// const FilterSidebar = ({ 
//   selectedCategories, 
//   setSelectedCategories,
//   selectedTypes,
//   setSelectedTypes,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   selectedCities,
//   setSelectedCities,
//   selectedTransactionTypes,
//   setSelectedTransactionTypes,
//   categories,
//   propertyTypes,
//   loadingCategories,
//   loadingTypes
// }) => {
//   const [activeFilters, setActiveFilters] = useState({
//     categories: true,
//     price: true,
//     type: true,
//     location: true,
//     transaction: true
//   });

//   const [categorySearch, setCategorySearch] = useState("");
//   const [typeSearch, setTypeSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");

//   const priceRanges = [
//     { label: "Under ₹10L", min: 0, max: 1000000 },
//     { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
//     { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
//     { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//     { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
//     { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
//   ];

//   const cities = [
//     { name: "Karimnagar", count: 12 },
//     { name: "Hyderabad", count: 35 },
//     { name: "Visakhapatnam", count: 42 },
//     { name: "Nandyal", count: 38 },
//     { name: "Adoni", count: 19 },
//     { name: "Amudalavalasa", count: 22 },
//   ];

//   const transactionTypes = [
//     { name: "Sell", count: 65 },
//     { name: "Rent", count: 35 },
//   ];

//   const filteredCategories = useMemo(() => {
//     return categories.filter((cat) =>
//       cat.name.toLowerCase().includes(categorySearch.toLowerCase())
//     );
//   }, [categories, categorySearch]);

//   const filteredTypes = useMemo(() => {
//     return propertyTypes.filter((type) =>
//       type.name.toLowerCase().includes(typeSearch.toLowerCase())
//     );
//   }, [propertyTypes, typeSearch]);

//   const filteredCities = useMemo(() => {
//     return cities.filter((city) =>
//       city.name.toLowerCase().includes(citySearch.toLowerCase())
//     );
//   }, [cities, citySearch]);

//   const toggleFilterSection = (section) => {
//     setActiveFilters(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const toggleCategory = useCallback((id) => {
//     setSelectedCategories((prev) =>
//       prev.includes(id)
//         ? prev.filter((c) => c !== id)
//         : [...prev, id]
//     );
//   }, [setSelectedCategories]);

//   const toggleType = useCallback((id) => {
//     setSelectedTypes((prev) =>
//       prev.includes(id)
//         ? prev.filter((b) => b !== id)
//         : [...prev, id]
//     );
//   }, [setSelectedTypes]);

//   const togglePriceRange = useCallback((range) => {
//     setSelectedPriceRanges((prev) =>
//       prev.includes(range)
//         ? prev.filter((r) => r !== range)
//         : [...prev, range]
//     );
//   }, [setSelectedPriceRanges]);

//   const toggleCity = useCallback((name) => {
//     setSelectedCities((prev) =>
//       prev.includes(name)
//         ? prev.filter((c) => c !== name)
//         : [...prev, name]
//     );
//   }, [setSelectedCities]);

//   const toggleTransactionType = useCallback((type) => {
//     setSelectedTransactionTypes((prev) =>
//       prev.includes(type)
//         ? prev.filter((t) => t !== type)
//         : [...prev, type]
//     );
//   }, [setSelectedTransactionTypes]);

//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedTypes([]);
//     setSelectedPriceRanges([]);
//     setSelectedCities([]);
//     setSelectedTransactionTypes([]);
//     setCategorySearch("");
//     setTypeSearch("");
//     setCitySearch("");
//   };

//   const activeFilterCount = 
//     selectedCategories.length + 
//     selectedTypes.length + 
//     selectedPriceRanges.length + 
//     selectedCities.length +
//     selectedTransactionTypes.length;

//   // Helper function to get category name by ID
//   const getCategoryName = (id) => {
//     const category = categories.find(cat => cat.property_category_id === id);
//     return category ? category.name : `Category ${id}`;
//   };

//   // Helper function to get type name by ID
//   const getTypeName = (id) => {
//     const type = propertyTypes.find(t => t.property_type_id === id);
//     return type ? type.name : `Type ${id}`;
//   };

//   return (
//     <div className="w-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-semibold mb-0">
//           <Filter className="h-5 w-5 me-2" />
//           Filters
//         </h5>
//         {activeFilterCount > 0 && (
//           <button 
//             onClick={clearAllFilters}
//             className="btn btn-sm btn-outline-secondary"
//             aria-label="Clear all filters"
//           >
//             Clear All ({activeFilterCount})
//           </button>
//         )}
//       </div>

//       {/* Transaction Type Filter */}
//       <FilterSection
//         title="Transaction Type"
//         isOpen={activeFilters.transaction}
//         onToggle={() => toggleFilterSection('transaction')}
//       >
//         <div className="overflow-y-auto">
//           {transactionTypes.map((type) => (
//             <div
//               key={type.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleTransactionType(type.name)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleTransactionType(type.name)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedTransactionTypes.includes(type.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedTransactionTypes.includes(type.name)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {type.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({type.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Categories Filter */}
//       <FilterSection
//         title="Property Category"
//         isOpen={activeFilters.categories}
//         onToggle={() => toggleFilterSection('categories')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search categories..."
//             value={categorySearch}
//             onChange={(e) => setCategorySearch(e.target.value)}
//             aria-label="Search categories"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingCategories ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading categories...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading categories...</p>
//             </div>
//           ) : filteredCategories.length === 0 ? (
//             <p className="small text-muted text-center py-3">No categories found</p>
//           ) : (
//             filteredCategories.map((category) => (
//               <div
//                 key={category.property_category_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleCategory(category.property_category_id)}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleCategory(category.property_category_id)}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedCategories.includes(category.property_category_id)}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedCategories.includes(category.property_category_id)}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedCategories.includes(category.property_category_id) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {category.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Property Type Filter */}
//       <FilterSection
//         title="Property Type"
//         isOpen={activeFilters.type}
//         onToggle={() => toggleFilterSection('type')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search property types..."
//             value={typeSearch}
//             onChange={(e) => setTypeSearch(e.target.value)}
//             aria-label="Search property types"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {loadingTypes ? (
//             <div className="text-center py-3">
//               <div className="spinner-border spinner-border-sm text-primary" role="status">
//                 <span className="visually-hidden">Loading property types...</span>
//               </div>
//               <p className="small text-muted mt-2">Loading property types...</p>
//             </div>
//           ) : filteredTypes.length === 0 ? (
//             <p className="small text-muted text-center py-3">No property types found</p>
//           ) : (
//             filteredTypes.map((type) => (
//               <div
//                 key={type.property_type_id}
//                 className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => toggleType(type.property_type_id)}
//                 onKeyPress={(e) => e.key === 'Enter' && toggleType(type.property_type_id)}
//                 tabIndex={0}
//                 role="checkbox"
//                 aria-checked={selectedTypes.includes(type.property_type_id)}
//               >
//                 <div className="d-flex align-items-center gap-2">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     checked={selectedTypes.includes(type.property_type_id)}
//                     readOnly
//                     tabIndex={-1}
//                   />
//                   <span className={`small ${selectedTypes.includes(type.property_type_id) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                     {type.name}
//                   </span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </FilterSection>

//       {/* Price Filter */}
//       <FilterSection
//         title="Price Range"
//         isOpen={activeFilters.price}
//         onToggle={() => toggleFilterSection('price')}
//       >
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {priceRanges.map((range) => (
//             <div
//               key={range.label}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => togglePriceRange(range.label)}
//               onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.label)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedPriceRanges.includes(range.label)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedPriceRanges.includes(range.label)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {range.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Location Filter */}
//       <FilterSection
//         title="Location"
//         isOpen={activeFilters.location}
//         onToggle={() => toggleFilterSection('location')}
//       >
//         <div className="input-group input-group-sm mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search cities..."
//             value={citySearch}
//             onChange={(e) => setCitySearch(e.target.value)}
//             aria-label="Search cities"
//           />
//         </div>
//         <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
//           {filteredCities.map((city) => (
//             <div
//               key={city.name}
//               className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
//               style={{ cursor: 'pointer' }}
//               onClick={() => toggleCity(city.name)}
//               onKeyPress={(e) => e.key === 'Enter' && toggleCity(city.name)}
//               tabIndex={0}
//               role="checkbox"
//               aria-checked={selectedCities.includes(city.name)}
//             >
//               <div className="d-flex align-items-center gap-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={selectedCities.includes(city.name)}
//                   readOnly
//                   tabIndex={-1}
//                 />
//                 <span className={`small ${selectedCities.includes(city.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
//                   {city.name}
//                 </span>
//               </div>
//               <span className="text-muted small">
//                 ({city.count})
//               </span>
//             </div>
//           ))}
//         </div>
//       </FilterSection>

//       {/* Active Filters Summary */}
//       {activeFilterCount > 0 && (
//         <div className="mt-4">
//           <h6 className="fw-semibold mb-2">Active Filters:</h6>
//           <div className="d-flex flex-wrap gap-2">
//             {selectedTransactionTypes.map(type => (
//               <span key={type} className="badge bg-info-subtle text-info border border-info d-flex align-items-center">
//                 {type}
//                 <button 
//                   onClick={() => toggleTransactionType(type)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${type} filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedCategories.map(catId => {
//               const catName = getCategoryName(catId);
//               return (
//                 <span key={catId} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
//                   {catName}
//                   <button 
//                     onClick={() => toggleCategory(catId)} 
//                     className="btn-close btn-close-sm ms-1"
//                     aria-label={`Remove ${catName} category filter`}
//                   ></button>
//                 </span>
//               );
//             })}
//             {selectedTypes.map(typeId => {
//               const typeName = getTypeName(typeId);
//               return (
//                 <span key={typeId} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
//                   {typeName}
//                   <button 
//                     onClick={() => toggleType(typeId)} 
//                     className="btn-close btn-close-sm ms-1"
//                     aria-label={`Remove ${typeName} type filter`}
//                   ></button>
//                 </span>
//               );
//             })}
//             {selectedPriceRanges.map(range => (
//               <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
//                 {range}
//                 <button 
//                   onClick={() => togglePriceRange(range)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${range} price filter`}
//                 ></button>
//               </span>
//             ))}
//             {selectedCities.map(city => (
//               <span key={city} className="badge bg-danger-subtle text-danger border border-danger d-flex align-items-center">
//                 {city}
//                 <button 
//                   onClick={() => toggleCity(city)} 
//                   className="btn-close btn-close-sm ms-1"
//                   aria-label={`Remove ${city} location filter`}
//                 ></button>
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ============= Product Header Component =============
// const ProductHeader = ({
//   totalProducts,
//   showingProducts,
//   viewMode,
//   onViewModeChange,
//   searchTerm,
//   setSearchTerm,
//   sortOption,
//   setSortOption
// }) => {
//   const viewButtons = [
//     { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
//     { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
//     { mode: "list", icon: List, label: "List" },
//     { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
//   ];

//   return (
//     <div className="row align-items-center justify-content-between mb-4">
//       <div className="col-md-6 mb-3 mb-md-0">
//         <div className="d-flex align-items-center">
//           <h4 className="fw-bold mb-0 me-3">Properties</h4>
//           <p className="mb-0 text-muted">
//             Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
//             <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
//             properties
//           </p>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
//           <div className="input-group" style={{ width: '200px' }}>
//             <span className="input-group-text bg-transparent border-end-0">
//               <Search className="h-4 w-4 text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-sm border-start-0"
//               placeholder="Search properties..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               aria-label="Search properties"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="btn btn-outline-secondary border-start-0"
//                 type="button"
//                 aria-label="Clear search"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             )}
//           </div>

//           <div className="btn-group" role="group" aria-label="View mode">
//             {viewButtons.map(({ mode, icon: Icon, label }) => (
//               <button
//                 key={mode}
//                 onClick={() => onViewModeChange(mode)}
//                 className={`btn btn-outline-secondary ${
//                   viewMode === mode ? "active" : ""
//                 }`}
//                 style={{ padding: '0.375rem 0.75rem' }}
//                 title={label}
//                 aria-label={`Switch to ${label} view`}
//               >
//                 <Icon className="h-4 w-4" />
//               </button>
//             ))}
//           </div>

//           <select 
//             className="form-select form-select-sm" 
//             style={{ width: '130px' }}
//             value={sortOption}
//             onChange={(e) => setSortOption(e.target.value)}
//             aria-label="Sort properties"
//           >
//             <option value="default">Sort By</option>
//             <option value="price-low">Price: Low to High</option>
//             <option value="price-high">Price: High to Low</option>
//             <option value="newest">Newest First</option>
           
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============= Property Grid Component =============
// const PropertyGrid = ({ properties, viewMode, categories, propertyTypes }) => {
//   const getGridClasses = () => {
//     switch (viewMode) {
//       case "grid-2":
//         return "row row-cols-1 row-cols-sm-2";
//       case "grid-3":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
//       case "grid-4":
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//       case "list":
//         return "row row-cols-1";
//       default:
//         return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
//     }
//   };

//   // In list view mode, show properties differently
//   if (viewMode === "list") {
//     return (
//       <div className="list-group">
//         {properties.map((property) => {
//           const imageUrl = getImageUrl(property.images);
          
//           const priceText = property.looking_to === "sell"
//             ? formatPrice(property.looking_to === "sell" 
//               ? (property.total_property_value || property.property_value)
//               : property.rent_amount || 0)
//             : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;
          
//           const depositText = property.deposit_amount 
//             ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
//             : '';

//           return (
//             <div key={property.property_id} className="list-group-item mb-3">
//               <div className="row g-3">
//                 <div className="col-md-3">
//                   <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
//                     <img
//                       src={imageUrl}
//                       alt={property.property_title}
//                       className="img-fluid"
//                       style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
//                       onError={(e) => {
//                         e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="d-flex align-items-start gap-2 mb-2">
//                     <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
//                     {property.is_featured && (
//                       <span className="badge bg-warning text-dark small">FEATURED</span>
//                     )}
//                     <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
//                       {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
//                     </span>
//                   </div>
//                   <p className="card-text text-muted small mb-2">
//                     <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
//                   </p>
//                   <div className="d-flex flex-wrap gap-2 mb-2">
//                     <span className="badge bg-light text-dark border small">
//                       {property.area} {property.area_unit}
//                     </span>
//                     {property.number_of_bedrooms && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.number_of_bedrooms} BHK
//                       </span>
//                     )}
//                     {property.facing && (
//                       <span className="badge bg-light text-dark border small">
//                         {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
//                       </span>
//                     )}
//                   </div>
//                   <div className="d-flex align-items-center gap-2">
//                     <span className="h5 fw-bold text-dark">
//                       {priceText}
//                       {property.looking_to === "rent" && (
//                         <small className="text-muted d-block">{depositText}</small>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-md-3 d-flex align-items-center justify-content-end">
//                   <button 
//                     className="btn w-100 fw-semibold py-2"
//                     style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
//                   >
//                     {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   return (
//     <div className={getGridClasses()}>
//       {properties.map((property) => (
//         <div key={property.property_id} className="col mb-4">
//           <PropertyCard property={property} />
//         </div>
//       ))}
//     </div>
//   );
// };

// // ============= Main Filters Page Component =============
// const Properties = () => {
//   const [viewMode, setViewMode] = useState("grid-4");
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("default");

//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTypes, setSelectedTypes] = useState([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);

//   // Dynamic data states
//   const [categories, setCategories] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);

//   // Fetch categories from API
//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoadingCategories(true);
//       const response = await fetch(`${baseurl}/property-categories/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setCategories(data.results || []);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//       // Keep empty array if fetch fails
//       setCategories([]);
//     } finally {
//       setLoadingCategories(false);
//     }
//   }, []);

//   // Fetch property types from API
//   const fetchPropertyTypes = useCallback(async () => {
//     try {
//       setLoadingTypes(true);
//       const response = await fetch(`${baseurl}/property-types/`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setPropertyTypes(data.results || []);
//     } catch (err) {
//       console.error("Error fetching property types:", err);
//       // Keep empty array if fetch fails
//       setPropertyTypes([]);
//     } finally {
//       setLoadingTypes(false);
//     }
//   }, []);

//   // Fetch properties from API
//   const fetchProperties = useCallback(async () => {
//     try {
//       setLoading(true);
//       // Build query parameters for filters
//       const params = new URLSearchParams();
//       params.append('page', currentPage);
      
//       // Add category filters if selected
//       if (selectedCategories.length > 0) {
//         params.append('property_category', selectedCategories.join(','));
//       }
      
//       // Add property type filters if selected
//       if (selectedTypes.length > 0) {
//         params.append('property_type', selectedTypes.join(','));
//       }
      
//       // Note: For price ranges, you would need to adjust the backend API
//       // to accept price range parameters
      
//       // Add city filters if selected
//       if (selectedCities.length > 0) {
//         params.append('city', selectedCities.join(','));
//       }
      
//       // Add transaction type filters if selected
//       if (selectedTransactionTypes.length > 0) {
//         const lookingTo = selectedTransactionTypes.map(type => 
//           type.toLowerCase() === 'sell' ? 'sell' : 'rent'
//         ).join(',');
//         params.append('looking_to', lookingTo);
//       }
      
//       // Add search term if exists
//       if (searchTerm.trim()) {
//         params.append('search', searchTerm.trim());
//       }

//       const response = await fetch(`${baseurl}/properties/?${params.toString()}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       setProperties(data.results || []);
//       setTotalCount(data.count || 0);
//       setTotalPages(Math.ceil((data.count || 0) / 10));
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching properties:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, selectedCategories, selectedTypes, selectedCities, selectedTransactionTypes, searchTerm]);

//   // Initial data fetch
//   useEffect(() => {
//     fetchCategories();
//     fetchPropertyTypes();
//   }, [fetchCategories, fetchPropertyTypes]);

//   // Fetch properties when filters or page change
//   useEffect(() => {
//     fetchProperties();
//   }, [fetchProperties]);

//   // Filter properties based on selected filters and search term
//   const filteredProperties = useMemo(() => {
//     return properties.filter(property => {
//       // Search filter (already done server-side, but keep for client-side fallback)
//       if (searchTerm && !property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//           !property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
//           !property.city.toLowerCase().includes(searchTerm.toLowerCase())) {
//         return false;
//       }

//       // Transaction type filter (already done server-side, but keep for client-side fallback)
//       if (selectedTransactionTypes.length > 0) {
//         const transactionType = property.looking_to === "sell" ? "Sell" : "Rent";
//         if (!selectedTransactionTypes.includes(transactionType)) {
//           return false;
//         }
//       }

//       // Category filter (already done server-side, but keep for client-side fallback)
//       if (selectedCategories.length > 0) {
//         if (!selectedCategories.includes(property.property_category)) {
//           return false;
//         }
//       }

//       // Property type filter (already done server-side, but keep for client-side fallback)
//       if (selectedTypes.length > 0) {
//         if (!selectedTypes.includes(property.property_type)) {
//           return false;
//         }
//       }

//       // Price range filter (client-side only)
//       if (selectedPriceRanges.length > 0) {
//         const priceRanges = [
//           { label: "Under ₹10L", min: 0, max: 1000000 },
//           { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
//           { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
//           { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
//           { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
//           { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
//         ];
        
//         const price = parseFloat(property.looking_to === "sell" 
//           ? (property.total_property_value || property.property_value)
//           : property.rent_amount || 0);
        
//         const passesPriceFilter = selectedPriceRanges.some(rangeLabel => {
//           const range = priceRanges.find(r => r.label === rangeLabel);
//           return range && price >= range.min && price <= range.max;
//         });
        
//         if (!passesPriceFilter) return false;
//       }

//       // City filter (already done server-side, but keep for client-side fallback)
//       if (selectedCities.length > 0 && !selectedCities.includes(property.city)) {
//         return false;
//       }

//       return true;
//     });
//   }, [properties, searchTerm, selectedTransactionTypes, selectedCategories, selectedTypes, selectedPriceRanges, selectedCities]);

//   // Sort properties
//   const sortedProperties = useMemo(() => {
//     return [...filteredProperties].sort((a, b) => {
//       switch (sortOption) {
//         case "price-low":
//           return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
//                   parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
//         case "price-high":
//           return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
//                   parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
//         case "newest":
//           return new Date(b.created_at) - new Date(a.created_at);
        
//         default:
//           return 0;
//       }
//     });
//   }, [filteredProperties, sortOption]);

//   // Handle pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Render pagination
//   const renderPagination = () => {
//     if (totalPages <= 1) return null;
    
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
//           <button 
//             className="page-link" 
//             onClick={() => handlePageChange(i)}
//             aria-label={`Go to page ${i}`}
//             aria-current={currentPage === i ? 'page' : undefined}
//           >
//             {i}
//           </button>
//         </li>
//       );
//     }

//     return (
//       <nav aria-label="Page navigation" className="mt-5">
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               aria-label="Go to previous page"
//             >
//               Previous
//             </button>
//           </li>
//           {startPage > 1 && (
//             <>
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(1)}
//                   aria-label="Go to page 1"
//                 >
//                   1
//                 </button>
//               </li>
//               {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//             </>
//           )}
//           {pages}
//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
//               <li className="page-item">
//                 <button 
//                   className="page-link" 
//                   onClick={() => handlePageChange(totalPages)}
//                   aria-label={`Go to page ${totalPages}`}
//                 >
//                   {totalPages}
//                 </button>
//               </li>
//             </>
//           )}
//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button 
//               className="page-link" 
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               aria-label="Go to next page"
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   if (loading && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-3">Loading properties...</p>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (error && properties.length === 0) {
//     return (
//       <div className="min-vh-100 d-flex flex-column">
//         <WebsiteNavbar />
//         <main className="flex-grow-1 bg-light">
//           <div className="container py-5">
//             <div className="alert alert-danger" role="alert">
//               Error loading properties: {error}
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       <WebsiteNavbar />
      
//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             totalProducts={totalCount}
//             showingProducts={sortedProperties.length}
//             viewMode={viewMode}
//             onViewModeChange={setViewMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//             sortOption={sortOption}
//             setSortOption={setSortOption}
//           />

//           <div className="row">
//             <aside className="col-lg-3 mb-4 mb-lg-0">
//               <div className="sticky-top" style={{ top: '20px' }}>
//                 <FilterSidebar
//                   selectedCategories={selectedCategories}
//                   setSelectedCategories={setSelectedCategories}
//                   selectedTypes={selectedTypes}
//                   setSelectedTypes={setSelectedTypes}
//                   selectedPriceRanges={selectedPriceRanges}
//                   setSelectedPriceRanges={setSelectedPriceRanges}
//                   selectedCities={selectedCities}
//                   setSelectedCities={setSelectedCities}
//                   selectedTransactionTypes={selectedTransactionTypes}
//                   setSelectedTransactionTypes={setSelectedTransactionTypes}
//                   categories={categories}
//                   propertyTypes={propertyTypes}
//                   loadingCategories={loadingCategories}
//                   loadingTypes={loadingTypes}
//                 />
//               </div>
//             </aside>

//             <div className="col-lg-9">
//               {loading && sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-3">Loading properties...</p>
//                 </div>
//               ) : sortedProperties.length === 0 ? (
//                 <div className="text-center py-5">
//                   <h5>No properties found matching your criteria.</h5>
//                   <p className="text-muted">Try adjusting your filters or search term.</p>
//                 </div>
//               ) : (
//                 <>
//                   <PropertyGrid 
//                     properties={sortedProperties} 
//                     viewMode={viewMode}
//                     categories={categories}
//                     propertyTypes={propertyTypes}
//                   />
//                   {renderPagination()}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Properties;

//=============================================================================
// below code with search field global working 



import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Search,
  X,
  Grid2X2,
  Grid3X3,
  List,
  LayoutList,
  Filter
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Properties.css";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer"
import { baseurl } from "../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

// ============= Utility Functions =============
const formatPrice = (price) => {
  const priceNum = parseFloat(price);
  if (priceNum >= 10000000) {
    return `₹${(priceNum / 10000000).toFixed(2)} Cr`;
  } else if (priceNum >= 100000) {
    return `₹${(priceNum / 100000).toFixed(2)} L`;
  }
  return `₹${priceNum.toLocaleString()}`;
};

const getImageUrl = (images) => {
  if (images && images.length > 0) {
    const imagePath = images[0].image;
    if (imagePath.startsWith('/media/')) {
      return `${baseurl}${imagePath}`;
    }
    return imagePath;
  }
  return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
};

// ============= Property Card Component =============
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/property/${property.property_id}`);
  };

  const imageUrl = getImageUrl(property.images);
  const formattedPrice = property.looking_to === "sell" 
    ? formatPrice(property.total_property_value || property.property_value)
    : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;

  const depositText = property.deposit_amount 
    ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
    : '';

  return (
    <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
      <div className="position-relative">
        <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
          <img
            src={imageUrl}
            alt={property.property_title}
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
            }}
          />
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge" style={{ backgroundColor: '#273c75', color: 'white' }}>
            {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
          </span>
        </div>
        {property.is_featured && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-warning text-dark">FEATURED</span>
          </div>
        )}
      </div>
      <div className="card-body d-flex flex-column flex-grow-1">
        <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
          {property.property_title}
        </h6>
        <p className="card-text text-muted small mb-2">
          <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
        </p>
        <div className="d-flex flex-wrap gap-1 mb-2">
          <span className="badge bg-light text-dark border small">
            {property.area} {property.area_unit}
          </span>
          {property.number_of_bedrooms && (
            <span className="badge bg-light text-dark border small">
              {property.number_of_bedrooms} BHK
            </span>
          )}
          {property.facing && (
            <span className="badge bg-light text-dark border small">
              {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
            </span>
          )}
        </div>
        <div className="d-flex align-items-center gap-2 mt-auto">
          <span className="h5 fw-bold text-dark">
            {formattedPrice}
            {property.looking_to === "rent" && (
              <small className="text-muted d-block">{depositText}</small>
            )}
          </span>
        </div>
      
        <button 
          className="btn w-100 fw-semibold py-2 "
          style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
        >
          Payout
        </button>
        <button 
          onClick={handleViewDetails}
          className="btn w-100 fw-semibold py-2 mt-2"
          style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
        >
          {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
        </button>
      </div>
    </div>
  );
};

// ============= Filter Section Component =============
const FilterSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}) => {
  return (
    <div className="border rounded mb-3">
      <button
        onClick={onToggle}
        className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent"
        style={{ cursor: 'pointer' }}
        aria-label={`Toggle ${title} filter section`}
        aria-expanded={isOpen}
      >
        <span className="fw-medium">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-muted" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted" />
        )}
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
  selectedCategories, 
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  selectedPriceRanges,
  setSelectedPriceRanges,
  selectedCities,
  setSelectedCities,
  selectedTransactionTypes,
  setSelectedTransactionTypes,
  categories,
  propertyTypes,
  loadingCategories,
  loadingTypes
}) => {
  const [activeFilters, setActiveFilters] = useState({
    categories: true,
    price: true,
    type: true,
    location: true,
    transaction: true
  });

  const [categorySearch, setCategorySearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const priceRanges = [
    { label: "Under ₹10L", min: 0, max: 1000000 },
    { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
    { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
    { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
    { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
  ];

  const cities = [
    { name: "Karimnagar", count: 12 },
    { name: "Hyderabad", count: 35 },
    { name: "Visakhapatnam", count: 42 },
    { name: "Nandyal", count: 38 },
    { name: "Adoni", count: 19 },
    { name: "Amudalavalasa", count: 22 },
  ];

  const transactionTypes = [
    { name: "Sale", count: 65 },
    { name: "Rent", count: 35 },
  ];

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categories, categorySearch]);

  const filteredTypes = useMemo(() => {
    return propertyTypes.filter((type) =>
      type.name.toLowerCase().includes(typeSearch.toLowerCase())
    );
  }, [propertyTypes, typeSearch]);

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [cities, citySearch]);

  const toggleFilterSection = (section) => {
    setActiveFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = useCallback((id) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
  }, [setSelectedCategories]);

  const toggleType = useCallback((id) => {
    setSelectedTypes((prev) =>
      prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id]
    );
  }, [setSelectedTypes]);

  const togglePriceRange = useCallback((range) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range]
    );
  }, [setSelectedPriceRanges]);

  const toggleCity = useCallback((name) => {
    setSelectedCities((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  }, [setSelectedCities]);

  const toggleTransactionType = useCallback((type) => {
    setSelectedTransactionTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  }, [setSelectedTransactionTypes]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedPriceRanges([]);
    setSelectedCities([]);
    setSelectedTransactionTypes([]);
    setCategorySearch("");
    setTypeSearch("");
    setCitySearch("");
  };

  const activeFilterCount = 
    selectedCategories.length + 
    selectedTypes.length + 
    selectedPriceRanges.length + 
    selectedCities.length +
    selectedTransactionTypes.length;

  // Helper function to get category name by ID
  const getCategoryName = (id) => {
    const category = categories.find(cat => cat.property_category_id === id);
    return category ? category.name : `Category ${id}`;
  };

  // Helper function to get type name by ID
  const getTypeName = (id) => {
    const type = propertyTypes.find(t => t.property_type_id === id);
    return type ? type.name : `Type ${id}`;
  };

  return (
    <div className="w-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-semibold mb-0">
          <Filter className="h-5 w-5 me-2" />
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

      {/* Transaction Type Filter */}
      <FilterSection
        title="Looking For"
        isOpen={activeFilters.transaction}
        onToggle={() => toggleFilterSection('transaction')}
      >
        <div className="overflow-y-auto">
          {transactionTypes.map((type) => (
            <div
              key={type.name}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleTransactionType(type.name)}
              onKeyPress={(e) => e.key === 'Enter' && toggleTransactionType(type.name)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedTransactionTypes.includes(type.name)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedTransactionTypes.includes(type.name)}
                  readOnly
                  tabIndex={-1}
                />
                <span className={`small ${selectedTransactionTypes.includes(type.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {type.name}
                </span>
              </div>
              <span className="text-muted small">
                ({type.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Categories Filter */}
      <FilterSection
        title="Property Category"
        isOpen={activeFilters.categories}
        onToggle={() => toggleFilterSection('categories')}
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
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {loadingCategories ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading categories...</span>
              </div>
              <p className="small text-muted mt-2">Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <p className="small text-muted text-center py-3">No categories found</p>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.property_category_id}
                className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleCategory(category.property_category_id)}
                onKeyPress={(e) => e.key === 'Enter' && toggleCategory(category.property_category_id)}
                tabIndex={0}
                role="checkbox"
                aria-checked={selectedCategories.includes(category.property_category_id)}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedCategories.includes(category.property_category_id)}
                    readOnly
                    tabIndex={-1}
                  />
                  <span className={`small ${selectedCategories.includes(category.property_category_id) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                    {category.name}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </FilterSection>

      {/* Property Type Filter */}
      <FilterSection
        title="Property Type"
        isOpen={activeFilters.type}
        onToggle={() => toggleFilterSection('type')}
      >
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search property types..."
            value={typeSearch}
            onChange={(e) => setTypeSearch(e.target.value)}
            aria-label="Search property types"
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {loadingTypes ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Loading property types...</span>
              </div>
              <p className="small text-muted mt-2">Loading property types...</p>
            </div>
          ) : filteredTypes.length === 0 ? (
            <p className="small text-muted text-center py-3">No property types found</p>
          ) : (
            filteredTypes.map((type) => (
              <div
                key={type.property_type_id}
                className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleType(type.property_type_id)}
                onKeyPress={(e) => e.key === 'Enter' && toggleType(type.property_type_id)}
                tabIndex={0}
                role="checkbox"
                aria-checked={selectedTypes.includes(type.property_type_id)}
              >
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedTypes.includes(type.property_type_id)}
                    readOnly
                    tabIndex={-1}
                  />
                  <span className={`small ${selectedTypes.includes(type.property_type_id) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                    {type.name}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title="Price Range"
        isOpen={activeFilters.price}
        onToggle={() => toggleFilterSection('price')}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {priceRanges.map((range) => (
            <div
              key={range.label}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => togglePriceRange(range.label)}
              onKeyPress={(e) => e.key === 'Enter' && togglePriceRange(range.label)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedPriceRanges.includes(range.label)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedPriceRanges.includes(range.label)}
                  readOnly
                  tabIndex={-1}
                />
                <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {range.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Location Filter */}
      {/* <FilterSection
        title="Location"
        isOpen={activeFilters.location}
        onToggle={() => toggleFilterSection('location')}
      >
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search cities..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            aria-label="Search cities"
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {filteredCities.map((city) => (
            <div
              key={city.name}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleCity(city.name)}
              onKeyPress={(e) => e.key === 'Enter' && toggleCity(city.name)}
              tabIndex={0}
              role="checkbox"
              aria-checked={selectedCities.includes(city.name)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedCities.includes(city.name)}
                  readOnly
                  tabIndex={-1}
                />
                <span className={`small ${selectedCities.includes(city.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {city.name}
                </span>
              </div>
              <span className="text-muted small">
                ({city.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection> */}

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="mt-4">
          <h6 className="fw-semibold mb-2">Active Filters:</h6>
          <div className="d-flex flex-wrap gap-2">
            {selectedTransactionTypes.map(type => (
              <span key={type} className="badge bg-info-subtle text-info border border-info d-flex align-items-center">
                {type}
                <button 
                  onClick={() => toggleTransactionType(type)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${type} filter`}
                ></button>
              </span>
            ))}
            {selectedCategories.map(catId => {
              const catName = getCategoryName(catId);
              return (
                <span key={catId} className="badge bg-primary-subtle text-primary border border-primary d-flex align-items-center">
                  {catName}
                  <button 
                    onClick={() => toggleCategory(catId)} 
                    className="btn-close btn-close-sm ms-1"
                    aria-label={`Remove ${catName} category filter`}
                  ></button>
                </span>
              );
            })}
            {selectedTypes.map(typeId => {
              const typeName = getTypeName(typeId);
              return (
                <span key={typeId} className="badge bg-success-subtle text-success border border-success d-flex align-items-center">
                  {typeName}
                  <button 
                    onClick={() => toggleType(typeId)} 
                    className="btn-close btn-close-sm ms-1"
                    aria-label={`Remove ${typeName} type filter`}
                  ></button>
                </span>
              );
            })}
            {selectedPriceRanges.map(range => (
              <span key={range} className="badge bg-warning-subtle text-warning border border-warning d-flex align-items-center">
                {range}
                <button 
                  onClick={() => togglePriceRange(range)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${range} price filter`}
                ></button>
              </span>
            ))}
            {selectedCities.map(city => (
              <span key={city} className="badge bg-danger-subtle text-danger border border-danger d-flex align-items-center">
                {city}
                <button 
                  onClick={() => toggleCity(city)} 
                  className="btn-close btn-close-sm ms-1"
                  aria-label={`Remove ${city} location filter`}
                ></button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============= Product Header Component =============
const ProductHeader = ({
  totalProducts,
  showingProducts,
  viewMode,
  onViewModeChange,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  onSearch
}) => {
  const viewButtons = [
    { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
    { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
    { mode: "list", icon: List, label: "List" },
    { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Trigger search when user types (with debounce effect from parent)
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="row align-items-center justify-content-between mb-4">
      <div className="col-md-6 mb-3 mb-md-0">
        <div className="d-flex align-items-center">
          <h4 className="fw-bold mb-0 me-3">Properties</h4>
          <p className="mb-0 text-muted">
            Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
            <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
            properties
          </p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="d-flex align-items-center gap-3 justify-content-md-end flex-wrap">
          <div className="input-group" style={{ width: '200px' }}>
            <span className="input-group-text bg-transparent border-end-0">
              <Search className="h-4 w-4 text-muted" />
            </span>
            <input
              type="text"
              className="form-control form-control-sm border-start-0"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              aria-label="Search properties"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="btn btn-outline-secondary border-start-0"
                type="button"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="btn-group" role="group" aria-label="View mode">
            {viewButtons.map(({ mode, icon: Icon, label }) => (
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
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <select 
            className="form-select form-select-sm" 
            style={{ width: '130px' }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            aria-label="Sort properties"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// ============= Property Grid Component =============
const PropertyGrid = ({ properties, viewMode, categories, propertyTypes }) => {
  const getGridClasses = () => {
    switch (viewMode) {
      case "grid-2":
        return "row row-cols-1 row-cols-sm-2";
      case "grid-3":
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3";
      case "grid-4":
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
      case "list":
        return "row row-cols-1";
      default:
        return "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4";
    }
  };

  // In list view mode, show properties differently
  if (viewMode === "list") {
    return (
      <div className="list-group">
        {properties.map((property) => {
          const imageUrl = getImageUrl(property.images);
          
          const priceText = property.looking_to === "sell"
            ? formatPrice(property.looking_to === "sell" 
              ? (property.total_property_value || property.property_value)
              : property.rent_amount || 0)
            : `₹${parseFloat(property.rent_amount || 0).toLocaleString()}/month`;
          
          const depositText = property.deposit_amount 
            ? ` | Deposit: ₹${parseFloat(property.deposit_amount).toLocaleString()}`
            : '';

          return (
            <div key={property.property_id} className="list-group-item mb-3">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
                    <img
                      src={imageUrl}
                      alt={property.property_title}
                      className="img-fluid"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=300&fit=crop";
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <h6 className="card-title fw-medium mb-0">{property.property_title}</h6>
                    {property.is_featured && (
                      <span className="badge bg-warning text-dark small">FEATURED</span>
                    )}
                    <span className="badge ms-auto" style={{ backgroundColor: '#273c75', color: 'white' }}>
                      {property.looking_to === "sell" ? "FOR SALE" : "FOR RENT"}
                    </span>
                  </div>
                  <p className="card-text text-muted small mb-2">
                    <i className="bi bi-geo-alt"></i> {property.address}, {property.city}
                  </p>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    <span className="badge bg-light text-dark border small">
                      {property.area} {property.area_unit}
                    </span>
                    {property.number_of_bedrooms && (
                      <span className="badge bg-light text-dark border small">
                        {property.number_of_bedrooms} BHK
                      </span>
                    )}
                    {property.facing && (
                      <span className="badge bg-light text-dark border small">
                        {property.facing.charAt(0).toUpperCase() + property.facing.slice(1)} Facing
                      </span>
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="h5 fw-bold text-dark">
                      {priceText}
                      {property.looking_to === "rent" && (
                        <small className="text-muted d-block">{depositText}</small>
                      )}
                    </span>
                  </div>
                </div>
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                  <button 
                    className="btn w-100 fw-semibold py-2"
                    style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
                  >
                    {property.looking_to === "sell" ? "VIEW DETAILS" : "CONTACT OWNER"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={getGridClasses()}>
      {properties.map((property) => (
        <div key={property.property_id} className="col mb-4">
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

// ============= Main Filters Page Component =============
const Properties = () => {
  const [viewMode, setViewMode] = useState("grid-4");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);

  // Dynamic data states
  const [categories, setCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const response = await fetch(`${baseurl}/property-categories/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data.results || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Keep empty array if fetch fails
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // Fetch property types from API
  const fetchPropertyTypes = useCallback(async () => {
    try {
      setLoadingTypes(true);
      const response = await fetch(`${baseurl}/property-types/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPropertyTypes(data.results || []);
    } catch (err) {
      console.error("Error fetching property types:", err);
      // Keep empty array if fetch fails
      setPropertyTypes([]);
    } finally {
      setLoadingTypes(false);
    }
  }, []);

  // Fetch properties from API
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build query parameters for filters
      const params = new URLSearchParams();
      params.append('page', currentPage);
      
      // Add category filters if selected
      if (selectedCategories.length > 0) {
        params.append('property_category', selectedCategories.join(','));
      }
      
      // Add property type filters if selected
      if (selectedTypes.length > 0) {
        params.append('property_type', selectedTypes.join(','));
      }
      
      // Note: For price ranges, you would need to adjust the backend API
      // to accept price range parameters
      
      // Add city filters if selected
      if (selectedCities.length > 0) {
        params.append('city', selectedCities.join(','));
      }
      
      // Add transaction type filters if selected
      if (selectedTransactionTypes.length > 0) {
        const lookingTo = selectedTransactionTypes.map(type => 
          type.toLowerCase() === 'sell' ? 'sell' : 'rent'
        ).join(',');
        params.append('looking_to', lookingTo);
      }
      
      // Use the search endpoint when there's a search term
      let url;
      if (searchTerm.trim()) {
        // Use the search endpoint with keyword parameter
        url = `${baseurl}/properties/search/?keyword=${encodeURIComponent(searchTerm.trim())}`;
        // Append other filters to the search URL
        const filterParams = params.toString();
        if (filterParams) {
          url += `&${filterParams}`;
        }
      } else {
        // Use the regular properties endpoint
        url = `${baseurl}/properties/?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data.results || []);
      setTotalCount(data.count || 0);
      setTotalPages(Math.ceil((data.count || 0) / 10));
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategories, selectedTypes, selectedCities, selectedTransactionTypes, searchTerm]);

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
    fetchPropertyTypes();
  }, [fetchCategories, fetchPropertyTypes]);

  // Fetch properties when filters or page change
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Handle search with debounce
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Filter properties based on selected filters and search term
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Search filter (already done server-side, but keep for client-side fallback)
      if (searchTerm && !property.property_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !property.city.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Transaction type filter (already done server-side, but keep for client-side fallback)
      if (selectedTransactionTypes.length > 0) {
        const transactionType = property.looking_to === "sell" ? "Sell" : "Rent";
        if (!selectedTransactionTypes.includes(transactionType)) {
          return false;
        }
      }

      // Category filter (already done server-side, but keep for client-side fallback)
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(property.property_category)) {
          return false;
        }
      }

      // Property type filter (already done server-side, but keep for client-side fallback)
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(property.property_type)) {
          return false;
        }
      }

      // Price range filter (client-side only)
      if (selectedPriceRanges.length > 0) {
        const priceRanges = [
          { label: "Under ₹10L", min: 0, max: 1000000 },
          { label: "₹10L - ₹25L", min: 1000000, max: 2500000 },
          { label: "₹25L - ₹50L", min: 2500000, max: 5000000 },
          { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
          { label: "₹1Cr - ₹5Cr", min: 10000000, max: 50000000 },
          { label: "Over ₹5Cr", min: 50000000, max: 999999999 },
        ];
        
        const price = parseFloat(property.looking_to === "sell" 
          ? (property.total_property_value || property.property_value)
          : property.rent_amount || 0);
        
        const passesPriceFilter = selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          return range && price >= range.min && price <= range.max;
        });
        
        if (!passesPriceFilter) return false;
      }

      // City filter (already done server-side, but keep for client-side fallback)
      if (selectedCities.length > 0 && !selectedCities.includes(property.city)) {
        return false;
      }

      return true;
    });
  }, [properties, searchTerm, selectedTransactionTypes, selectedCategories, selectedTypes, selectedPriceRanges, selectedCities]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return (parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0) -
                  parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0));
        case "price-high":
          return (parseFloat(b.looking_to === "sell" ? b.total_property_value || b.property_value : b.rent_amount || 0) -
                  parseFloat(a.looking_to === "sell" ? a.total_property_value || a.property_value : a.rent_amount || 0));
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        
        default:
          return 0;
      }
    });
  }, [filteredProperties, sortOption]);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render pagination
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(i)}
            aria-label={`Go to page ${i}`}
            aria-current={currentPage === i ? 'page' : undefined}
          >
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation" className="mt-5">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              Previous
            </button>
          </li>
          {startPage > 1 && (
            <>
              <li className="page-item">
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(1)}
                  aria-label="Go to page 1"
                >
                  1
                </button>
              </li>
              {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
            </>
          )}
          {pages}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
              <li className="page-item">
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(totalPages)}
                  aria-label={`Go to page ${totalPages}`}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  if (loading && properties.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <WebsiteNavbar />
        <main className="flex-grow-1 bg-light">
          <div className="container py-5">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading properties...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && properties.length === 0) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <WebsiteNavbar />
        <main className="flex-grow-1 bg-light">
          <div className="container py-5">
            <div className="alert alert-danger" role="alert">
              Error loading properties: {error}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <WebsiteNavbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <ProductHeader
            totalProducts={totalCount}
            showingProducts={sortedProperties.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOption={sortOption}
            setSortOption={setSortOption}
            onSearch={handleSearch}
          />

          <div className="row">
            <aside className="col-lg-3 mb-4 mb-lg-0">
              <div className="sticky-top" style={{ top: '20px' }}>
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  selectedPriceRanges={selectedPriceRanges}
                  setSelectedPriceRanges={setSelectedPriceRanges}
                  selectedCities={selectedCities}
                  setSelectedCities={setSelectedCities}
                  selectedTransactionTypes={selectedTransactionTypes}
                  setSelectedTransactionTypes={setSelectedTransactionTypes}
                  categories={categories}
                  propertyTypes={propertyTypes}
                  loadingCategories={loadingCategories}
                  loadingTypes={loadingTypes}
                />
              </div>
            </aside>

            <div className="col-lg-9">
              {loading && sortedProperties.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading properties...</p>
                </div>
              ) : sortedProperties.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No properties found matching your criteria.</h5>
                  <p className="text-muted">Try adjusting your filters or search term.</p>
                </div>
              ) : (
                <>
                  <PropertyGrid 
                    properties={sortedProperties} 
                    viewMode={viewMode}
                    categories={categories}
                    propertyTypes={propertyTypes}
                  />
                  {renderPagination()}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Properties;