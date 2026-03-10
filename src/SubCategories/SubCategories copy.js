import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import {
  Search, X, ChevronDown, Tag, DollarSign, ArrowLeft,
  Filter, Check, ChevronRight, SlidersHorizontal
} from "lucide-react";
import "./SubCategories.css";
import { baseurl } from "../BaseURL/BaseURL";
import Swal from "sweetalert2";
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
}) => {
  const [tab, setTab] = useState("categories");
  const toggle = (setter, val) => setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  if (isSidebar) {
    return (
      <div className="msub-sidebar-filter">
        {/* Categories */}
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
        {/* Price */}
        <SidebarSection title="Price Range" count={selectedPriceRanges.length}>
          {PRICE_RANGES.map(r => (
            <CheckRow key={r.value} label={r.label} on={selectedPriceRanges.includes(r.value)}
              onClick={() => toggle(setSelectedPriceRanges, r.value)} />
          ))}
        </SidebarSection>
        {/* Discount */}
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

// ============= Product Card =============
// ============= Product Card (Updated with Add + Qty Control) =============
// const ProductCard = ({ product, variant, navigate }) => {
//   const [qty, setQty] = useState(0);  // ADD THIS STATE

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
//   const url = `/product/${product.product_id}/?variant=${variant.id}`;

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

//       {/* REPLACE the old msub-card-foot with this: */}
//       <div className="msub-card-foot" onClick={e => e.stopPropagation()}>
//         {qty === 0 ? (
//           <button className="msub-add-btn" onClick={() => setQty(1)}>
//             ADD
//           </button>
//         ) : (
//           <div className="msub-qty-control">
//             <button className="msub-qty-btn" onClick={() => setQty(q => Math.max(0, q - 1))}>−</button>
//             <span className="msub-qty-value">{qty}</span>
//             <button className="msub-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// ============= Product Card (Updated with Global Cart Integration) =============
const ProductCard = ({ product, variant, navigate }) => {
  const [qty, setQty] = useState(0);

  const getImage = () => {
    if (variant.media?.length > 0) return `${baseurl}${variant.media[0].file}`;
    const v = product.variants?.find(v => v.media?.length > 0);
    if (v) return `${baseurl}${v.media[0].file}`;
    return "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300";
  };

  const mrp = parseFloat(variant.mrp) || 0;
  const price = parseFloat(variant.selling_price) || 0;
  const discount = mrp > 0 && price < mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const variantDisplay = variant.attributes ? Object.values(variant.attributes).join(" • ") : "";
  const productName = variantDisplay ? `${product.product_name} - ${variantDisplay}` : product.product_name;
  const url = `/product/${product.product_id}/?variant=${variant.id}`;

  // Check initial quantity from cart on component mount
  useEffect(() => {
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
    const existingItem = guestCart.find(item => item.variant_id === variant.id);
    if (existingItem) {
      setQty(existingItem.quantity);
    }
  }, [variant.id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Validate stock
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

    // Get guest cart from localStorage
    const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");

    // Create cart item
    const cartItem = {
      product_id: product.product_id,
      variant_id: variant.id,
      name: product.product_name,
      description: product.description,
      image: getImage(),
      mrp: mrp,
      price: price,
      quantity: 1, // Start with 1 when clicking ADD
      sku: variant.sku,
      attributes: variant.attributes || {},
      product_attributes: product.attributes || {},
      addedAt: new Date().toISOString(),
      business_id: product.business,
      stock: variant.stock
    };

    // Check if item already exists in cart (same variant)
    const existingItemIndex = guestCart.findIndex(
      item => item.variant_id === variant.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const newQty = guestCart[existingItemIndex].quantity + 1;

      // Check stock for updated quantity
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

      guestCart[existingItemIndex].quantity = newQty;
      guestCart[existingItemIndex].addedAt = new Date().toISOString();
      setQty(newQty);
    } else {
      // Add new item to cart
      guestCart.push(cartItem);
      setQty(1);
    }

    // Save to localStorage
    localStorage.setItem("website_guest_cart", JSON.stringify(guestCart));

    // Show success message
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
        navigate('/cart');
      }
    });

    // Trigger cart update event for navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleUpdateQuantity = (e, newQty) => {
    e.stopPropagation();
    
    if (newQty === 0) {
      // Remove from cart
      const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
      const updatedCart = guestCart.filter(item => item.variant_id !== variant.id);
      localStorage.setItem("website_guest_cart", JSON.stringify(updatedCart));
      setQty(0);
      
      // Show removal message
      Swal.fire({
        icon: 'info',
        title: 'Removed from Cart',
        text: `${productName} has been removed from your cart.`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      // Update quantity
      const guestCart = JSON.parse(localStorage.getItem("website_guest_cart") || "[]");
      const existingItemIndex = guestCart.findIndex(
        item => item.variant_id === variant.id
      );

      if (existingItemIndex >= 0) {
        // Check stock
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

        guestCart[existingItemIndex].quantity = newQty;
        guestCart[existingItemIndex].addedAt = new Date().toISOString();
        localStorage.setItem("website_guest_cart", JSON.stringify(guestCart));
        setQty(newQty);
      }
    }
    
    // Trigger cart update event for navbar
    window.dispatchEvent(new Event('cartUpdated'));
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
        {qty === 0 ? (
          <button 
            className="msub-add-btn" 
            onClick={handleAddToCart}
            disabled={variant.stock <= 0}
          >
            {variant.stock <= 0 ? 'OUT OF STOCK' : 'ADD'}
          </button>
        ) : (
          <div className="msub-qty-control">
            <button 
              className="msub-qty-btn" 
              onClick={(e) => handleUpdateQuantity(e, qty - 1)}
            >−</button>
            <span className="msub-qty-value">{qty}</span>
            <button 
              className="msub-qty-btn" 
              onClick={(e) => handleUpdateQuantity(e, qty + 1)}
              disabled={qty >= variant.stock}
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
const WebsiteSubCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [categoryTree, setCategoryTree] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

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

  const buildCategoryTree = useCallback((cats, parentId = null) =>
    cats.filter(c => c.parent === parentId)
      .map(c => ({ ...c, children: buildCategoryTree(cats, c.category_id) })), []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseurl}/categories/`);
        const data = await res.json();
        const current = data.results.find(c => c.category_id === parseInt(id));
        setCategoryName(current?.name || "Products");
        const children = data.results.filter(c => c.parent === parseInt(id) && c.is_active);
        setCategoryTree(children.map(c => ({ ...c, children: buildCategoryTree(data.results, c.category_id) })));
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    run();
  }, [id, buildCategoryTree]);

  useEffect(() => {
    const run = async () => {
      setProductsLoading(true);
      try {
        const toFetch = selectedCategories.length === 0 ? [id] : selectedCategories;
        const results = await Promise.all(toFetch.map(async catId => {
          const params = new URLSearchParams({ category_id: catId, variant_verification_status: "verified" });
          const res = await fetch(`${baseurl}/products/?${params}`);
          const data = await res.json();
          return (data.results || []).flatMap(product =>
            product.variants?.length > 0
              ? product.variants.map(variant => ({ product, variant }))
              : [{ product, variant: { id: product.product_id, sku: product.product_id, mrp: "0.00", selling_price: "0.00", attributes: {}, distribution_commission: "0.00" } }]
          );
        }));
        const unique = new Map();
        results.flat().forEach(item => {
          const key = `${item.product.product_id}-${item.variant.id}`;
          if (!unique.has(key)) unique.set(key, item);
        });
        setProducts(Array.from(unique.values()));
      } catch (e) { console.error(e); }
      finally { setProductsLoading(false); }
    };
    run();
  }, [id, selectedCategories]);

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase();
      list = list.filter(i => i.product.product_name.toLowerCase().includes(t) || i.product.brand?.toLowerCase().includes(t));
    }
    if (selectedPriceRanges.length > 0) {
      list = list.filter(i => {
        const p = parseFloat(i.variant.selling_price);
        return selectedPriceRanges.some(r => {
          if (r === "10000+") return p >= 10000;
          const [mn, mx] = r.split("-").map(Number);
          return p >= mn && p <= mx;
        });
      });
    }
    if (selectedDiscountRanges.length > 0) {
      list = list.filter(i => {
        const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price);
        const d = m > 0 && s < m ? Math.round(((m - s) / m) * 100) : 0;
        return selectedDiscountRanges.some(r => {
          if (r === "60+") return d >= 60;
          const [mn, mx] = r.split("-").map(Number);
          return d >= mn && d <= mx;
        });
      });
    }
    const disc = i => { const m = parseFloat(i.variant.mrp), s = parseFloat(i.variant.selling_price); return m > 0 ? ((m - s) / m) * 100 : 0; };
    switch (sortBy) {
      case "price_asc": list.sort((a, b) => parseFloat(a.variant.selling_price) - parseFloat(b.variant.selling_price)); break;
      case "price_desc": list.sort((a, b) => parseFloat(b.variant.selling_price) - parseFloat(a.variant.selling_price)); break;
      case "discount_desc": list.sort((a, b) => disc(b) - disc(a)); break;
      case "name_asc": list.sort((a, b) => a.product.product_name.localeCompare(b.product.product_name)); break;
      case "name_desc": list.sort((a, b) => b.product.product_name.localeCompare(a.product.product_name)); break;
    }
    return list;
  }, [products, searchTerm, selectedPriceRanges, selectedDiscountRanges, sortBy]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedCategories, selectedPriceRanges, selectedDiscountRanges]);

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
    <div className="msub-empty"><p>No products found</p><small>Try adjusting your search or filters</small></div>
  ) : (
    <>
      <div className={`msub-grid ${isMobile ? "msub-grid--2col" : "msub-grid--desktop"}`}>
        {paginated.map(item => (
          <ProductCard key={`${item.product.product_id}-${item.variant.id}`}
            product={item.product} variant={item.variant} navigate={navigate} />
        ))}
      </div>
      {totalPages > 1 && <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />}
    </>
  );

  return (
    <>
      <WebsiteNavbar />

      {/* ======= MOBILE ======= */}
      {isMobile && (
        <div className="msub-mobile">
          <div className="msub-mobile-topbar">
            <button className="msub-back" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
            <h1 className="msub-mobile-title">{categoryName}</h1>
            <div style={{ width: 36 }} />
          </div>

          <div className="msub-mobile-search-wrap">
            <div className="msub-search-bar">
              <Search size={15} className="msub-search-ico" />
              <input type="text" placeholder="Search products..." className="msub-search-input"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              {searchTerm && <button className="msub-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
            </div>
          </div>

          <div className="msub-toolbar">
            <button className="msub-toolbar-btn" onClick={() => setShowSortSheet(true)}>
              <span>{sortLabel}</span><ChevronDown size={14} />
            </button>
            <button className={`msub-toolbar-btn ${activeFilterCount > 0 ? "msub-toolbar-btn--on" : ""}`}
              onClick={() => setShowFilterSheet(true)}>
              <Filter size={14} /><span>Filter</span>
              {activeFilterCount > 0 && <span className="msub-toolbar-badge">{activeFilterCount}</span>}
            </button>
          </div>

          {activeFilterCount > 0 && (
            <ActiveChips selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
              selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
              clearAll={clearAll} />
          )}

          <div className="msub-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</div>
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
        <div className="msub-desktop">
          <div className="msub-desktop-header">
            <div className="msub-desktop-header-inner">
              <button className="msub-back-desktop" onClick={() => navigate(-1)}>
                <ArrowLeft size={17} /><span>Back</span>
              </button>
              <h1 className="msub-desktop-title">{categoryName}</h1>
            </div>
          </div>

          <div className="msub-desktop-body">
            {/* Sidebar */}
            <aside className="msub-sidebar">
              <div className="msub-sidebar-top">
                <span className="msub-sidebar-heading"><SlidersHorizontal size={15} /> Filters</span>
                {activeFilterCount > 0 && (
                  <button className="msub-sidebar-clearall" onClick={clearAll}>Clear ({activeFilterCount})</button>
                )}
              </div>
              <FilterContent {...filterProps} isSidebar={true} />
            </aside>

            {/* Main */}
            <main className="msub-main">
              {/* Topbar */}
              <div className="msub-main-topbar">
                <div className="msub-desktop-search">
                  <Search size={15} className="msub-search-ico" />
                  <input type="text" placeholder="Search products..." className="msub-search-input"
                    value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  {searchTerm && <button className="msub-search-clear" onClick={() => setSearchTerm("")}><X size={14} /></button>}
                </div>
                <div className="msub-sort-wrap">
                  <button className="msub-sort-btn" onClick={() => setShowSortDropdown(v => !v)}>
                    <span>{sortLabel}</span><ChevronDown size={14} />
                  </button>
                  {showSortDropdown && (
                    <>
                      <div className="msub-dropdown-overlay" onClick={() => setShowSortDropdown(false)} />
                      <div className="msub-sort-dropdown">
                        <SortList sortBy={sortBy} setSortBy={setSortBy} onClose={() => setShowSortDropdown(false)} />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <ActiveChips selectedPriceRanges={selectedPriceRanges} setSelectedPriceRanges={setSelectedPriceRanges}
                  selectedDiscountRanges={selectedDiscountRanges} setSelectedDiscountRanges={setSelectedDiscountRanges}
                  clearAll={clearAll} />
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

export default WebsiteSubCategories;