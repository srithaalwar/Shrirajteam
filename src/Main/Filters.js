// Main/Filters.js
import React, { useState } from "react";
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
import "./Filters.css";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Footer from "../Footer/Footer"

// ============= Data =============
const categories = [
  { name: "Electronics", count: 42 },
  { name: "Clothing & Fashion", count: 38 },
  { name: "Home & Kitchen", count: 56 },
  { name: "Beauty & Personal Care", count: 29 },
  { name: "Sports & Fitness", count: 24 },
  { name: "Books & Stationery", count: 18 },
  { name: "Toys & Games", count: 15 },
  { name: "Automotive", count: 32 },
  { name: "Groceries", count: 47 },
  { name: "Health & Wellness", count: 21 },
];

const brands = [
  { name: "Apple", count: 28 },
  { name: "Samsung", count: 35 },
  { name: "Nike", count: 42 },
  { name: "Adidas", count: 38 },
  { name: "Sony", count: 19 },
  { name: "LG", count: 22 },
  { name: "HP", count: 17 },
  { name: "Dell", count: 14 },
  { name: "Philips", count: 26 },
  { name: "Bose", count: 12 },
  { name: "JBL", count: 18 },
  { name: "Puma", count: 25 },
  { name: "Reebok", count: 16 },
  { name: "Levi's", count: 23 },
  { name: "H&M", count: 31 },
];

const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2500", min: 1000, max: 2500 },
  { label: "₹2500 - ₹5000", min: 2500, max: 5000 },
  { label: "₹5000 - ₹10000", min: 5000, max: 10000 },
  { label: "Over ₹10000", min: 10000, max: 999999 },
];

const discountRanges = [
  { label: "10% & above", value: 10 },
  { label: "20% & above", value: 20 },
  { label: "30% & above", value: 30 },
  { label: "40% & above", value: 40 },
  { label: "50% & above", value: 50 },
  { label: "60% & above", value: 60 },
  { label: "70% & above", value: 70 },
  { label: "80% & above", value: 80 },
];

const sampleProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    title: "Spiral Charger Cable Protector Data Cable Saver Charging...",
    quantity: "4 sets",
    price: 69,
    originalPrice: 999,
    discount: 93,
    brand: "Apple",
    category: "Electronics"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
    title: "USB-C to Lightning Fast Charging Cable (1M) | PD 20...",
    quantity: "1 piece",
    price: 149,
    originalPrice: 1999,
    discount: 93,
    brand: "Samsung",
    category: "Electronics"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&h=300&fit=crop",
    title: "Winter Warm Touch Screen / Gym Workouts Full Finger...",
    quantity: "1 pair",
    price: 149,
    originalPrice: 1999,
    discount: 93,
    brand: "Nike",
    category: "Sports & Fitness"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=300&h=300&fit=crop",
    title: "Electric Hot Water Bag for Pain Relief – Reusable Heati...",
    quantity: "1 piece",
    price: 129,
    originalPrice: 1499,
    discount: 91,
    brand: "Philips",
    category: "Health & Wellness"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    title: "Premium Wireless Bluetooth Headphones with Noise Cancellation...",
    quantity: "1 piece",
    price: 899,
    originalPrice: 4999,
    discount: 82,
    brand: "Bose",
    category: "Electronics"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    title: "Smart Watch with Heart Rate Monitor and Fitness Tracker...",
    quantity: "1 piece",
    price: 599,
    originalPrice: 2999,
    discount: 80,
    brand: "Samsung",
    category: "Electronics"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
    title: "Portable Power Bank 20000mAh Fast Charging USB-C...",
    quantity: "1 piece",
    price: 499,
    originalPrice: 1999,
    discount: 75,
    brand: "Sony",
    category: "Electronics"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop",
    title: "LED Desk Lamp with USB Charging Port Adjustable...",
    quantity: "1 piece",
    price: 349,
    originalPrice: 1299,
    discount: 73,
    brand: "Philips",
    category: "Home & Kitchen"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop",
    title: "Running Shoes for Men - Lightweight Sports Shoes",
    quantity: "1 pair",
    price: 1299,
    originalPrice: 2999,
    discount: 57,
    brand: "Adidas",
    category: "Sports & Fitness"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
    title: "Gaming Keyboard with RGB Backlit - Mechanical",
    quantity: "1 piece",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    brand: "HP",
    category: "Electronics"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
    title: "Casual T-Shirt for Men - Cotton Regular Fit",
    quantity: "1 piece",
    price: 399,
    originalPrice: 999,
    discount: 60,
    brand: "H&M",
    category: "Clothing & Fashion"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
    title: "Smart Water Bottle with Temperature Display",
    quantity: "1 piece",
    price: 799,
    originalPrice: 1999,
    discount: 60,
    brand: "Philips",
    category: "Health & Wellness"
  },
];

// ============= Product Card Component =============
const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 border rounded overflow-hidden d-flex flex-column">
      <div className="position-relative">
        <div className="bg-light d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-danger">{product.discount}% OFF</span>
        </div>
      </div>
      <div className="card-body d-flex flex-column flex-grow-1">
        <h6 className="card-title fw-medium mb-1 line-clamp-2" style={{ fontSize: '0.875rem' }}>
          {product.title}
        </h6>
        <p className="card-text text-muted small mb-2">{product.quantity}</p>
        <p className="card-text small text-muted mb-2">
          <span className="badge bg-light text-dark border">{product.brand}</span>
        </p>
        <div className="d-flex align-items-center gap-2 mb-3 mt-auto">
          <span className="h5 fw-bold text-dark">₹{product.price}</span>
          <span className="text-muted small text-decoration-line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span className="text-danger small fw-medium">
            ({product.discount}% OFF)
          </span>
        </div>
  <button 
  className="btn w-100 fw-semibold py-2"
  style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
>
  ADD TO CART
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
const FilterSidebar = () => {
  const [activeFilters, setActiveFilters] = useState({
    categories: true,
    price: true,
    discount: true,
    brand: true
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const toggleFilterSection = (section) => {
    setActiveFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = (name) => {
    setSelectedCategories((prev) =>
      prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev, name]
    );
  };

  const toggleBrand = (name) => {
    setSelectedBrands((prev) =>
      prev.includes(name)
        ? prev.filter((b) => b !== name)
        : [...prev, name]
    );
  };

  const togglePriceRange = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range]
    );
  };

  const toggleDiscount = (discount) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discount)
        ? prev.filter((d) => d !== discount)
        : [...prev, discount]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedDiscounts([]);
    setCategorySearch("");
    setBrandSearch("");
  };

  const activeFilterCount = 
    selectedCategories.length + 
    selectedBrands.length + 
    selectedPriceRanges.length + 
    selectedDiscounts.length;

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
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <FilterSection
        title="Categories"
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
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleCategory(category.name)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedCategories.includes(category.name)}
                  readOnly
                />
                <span className={`small ${selectedCategories.includes(category.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {category.name}
                </span>
              </div>
              <span className="text-muted small">
                ({category.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title="Price"
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
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedPriceRanges.includes(range.label)}
                  readOnly
                />
                <span className={`small ${selectedPriceRanges.includes(range.label) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {range.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Discount Filter */}
      <FilterSection
        title="Discount"
        isOpen={activeFilters.discount}
        onToggle={() => toggleFilterSection('discount')}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {discountRanges.map((range) => (
            <div
              key={range.label}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleDiscount(range.value)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedDiscounts.includes(range.value)}
                  readOnly
                />
                <span className={`small ${selectedDiscounts.includes(range.value) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {range.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        isOpen={activeFilters.brand}
        onToggle={() => toggleFilterSection('brand')}
      >
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          {filteredBrands.map((brand) => (
            <div
              key={brand.name}
              className="d-flex justify-content-between align-items-center mb-2 cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => toggleBrand(brand.name)}
            >
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedBrands.includes(brand.name)}
                  readOnly
                />
                <span className={`small ${selectedBrands.includes(brand.name) ? 'fw-semibold text-dark' : 'text-muted'}`}>
                  {brand.name}
                </span>
              </div>
              <span className="text-muted small">
                ({brand.count})
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Active Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="mt-4">
          <h6 className="fw-semibold mb-2">Active Filters:</h6>
          <div className="d-flex flex-wrap gap-2">
            {selectedCategories.map(cat => (
              <span key={cat} className="badge bg-primary-subtle text-primary border border-primary">
                {cat} <button onClick={() => toggleCategory(cat)} className="btn-close btn-close-sm ms-1"></button>
              </span>
            ))}
            {selectedBrands.map(brand => (
              <span key={brand} className="badge bg-success-subtle text-success border border-success">
                {brand} <button onClick={() => toggleBrand(brand)} className="btn-close btn-close-sm ms-1"></button>
              </span>
            ))}
            {selectedPriceRanges.map(range => (
              <span key={range} className="badge bg-warning-subtle text-warning border border-warning">
                {range} <button onClick={() => togglePriceRange(range)} className="btn-close btn-close-sm ms-1"></button>
              </span>
            ))}
            {selectedDiscounts.map(discount => (
              <span key={discount} className="badge bg-danger-subtle text-danger border border-danger">
                {discount}% & above <button onClick={() => toggleDiscount(discount)} className="btn-close btn-close-sm ms-1"></button>
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
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const viewButtons = [
    { mode: "grid-2", icon: Grid2X2, label: "2 Columns" },
    { mode: "grid-3", icon: Grid3X3, label: "3 Columns" },
    { mode: "list", icon: List, label: "List" },
    { mode: "grid-4", icon: LayoutList, label: "4 Columns" },
  ];

  return (
    <div className="row align-items-center justify-content-between mb-4">
      <div className="col-md-6 mb-3 mb-md-0">
        <div className="d-flex align-items-center">
          <h4 className="fw-bold mb-0 me-3">Products</h4>
          <p className="mb-0 text-muted">
            Showing <span className="fw-semibold text-dark">{showingProducts}</span> of{" "}
            <span className="fw-semibold text-primary">{totalProducts}</span>{" "}
            products
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
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="btn btn-outline-secondary border-start-0"
                type="button"
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
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <select className="form-select form-select-sm" style={{ width: '130px' }}>
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="discount">Discount</option>
            <option value="rating">Customer Rating</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// ============= Product Grid Component =============
const ProductGrid = ({ products, viewMode }) => {
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

  // In list view mode, show products differently
  if (viewMode === "list") {
    return (
      <div className="list-group">
        {products.map((product) => (
          <div key={product.id} className="list-group-item mb-3">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="bg-light d-flex align-items-center justify-content-center p-3" style={{ height: '150px' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h6 className="card-title fw-medium mb-2">{product.title}</h6>
                <p className="card-text text-muted small mb-2">{product.quantity}</p>
                <p className="card-text small text-muted mb-2">
                  <span className="badge bg-light text-dark border me-2">{product.brand}</span>
                  <span className="badge bg-light text-dark border">{product.category}</span>
                </p>
                <div className="d-flex align-items-center gap-2">
                  <span className="h5 fw-bold text-dark">₹{product.price}</span>
                  <span className="text-muted small text-decoration-line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-danger small fw-medium">
                    ({product.discount}% OFF)
                  </span>
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end">
               <button 
  className="btn w-100 fw-semibold py-2"
  style={{ backgroundColor: '#273c75', borderColor: '#273c75', color: '#fff' }}
>
  ADD TO CART
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={getGridClasses()}>
      {products.map((product) => (
        <div key={product.id} className="col mb-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

// ============= Main Filters Page Component =============
const Filters = () => {
  const [viewMode, setViewMode] = useState("grid-4");

      return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <WebsiteNavbar />
      
      {/* Main Content */}
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <ProductHeader
            totalProducts={329}
            showingProducts={sampleProducts.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          <div className="row">
            {/* Filters Sidebar */}
            <aside className="col-lg-3 mb-4 mb-lg-0">
              <div className="sticky-top" style={{ top: '20px' }}>
                <FilterSidebar />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="col-lg-9">
              <ProductGrid products={sampleProducts} viewMode={viewMode} />
              
              {/* Pagination */}
              <nav aria-label="Page navigation" className="mt-5">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <button className="page-link">Previous</button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">2</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">3</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Filters;