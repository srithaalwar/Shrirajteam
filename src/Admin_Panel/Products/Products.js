// Main/Products.js
import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  Grid2X2,
  Grid3X3,
  LayoutList,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";
import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
import Footer from "../../Footer/Footer";

/* ================= SAMPLE PRODUCTS ================= */
const sampleProducts = [
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
    title: `Product ${i + 1} - Spiral Charger Cable`,
    quantity: "1 piece",
    price: 99 + i,
    originalPrice: 999,
    discount: 90,
    brand: "Apple",
  })),
];

/* ================= PRODUCT CARD ================= */
const ProductCard = ({ product }) => (
  <div className="card h-100">
    <div className="bg-light p-3 text-center position-relative" style={{ height: 200 }}>
      <img
        src={product.image}
        alt={product.title}
        className="img-fluid"
        style={{ maxHeight: "100%", objectFit: "contain" }}
      />
      <span className="badge bg-danger position-absolute top-0 end-0 m-2">
        {product.discount}% OFF
      </span>
    </div>

    <div className="card-body d-flex flex-column">
      <h6 className="line-clamp-2">{product.title}</h6>
      <small className="text-muted">{product.quantity}</small>

      <div className="mt-auto">
        <div className="d-flex align-items-center gap-2">
          <strong>₹{product.price}</strong>
          <small className="text-muted text-decoration-line-through">
            ₹{product.originalPrice}
          </small>
        </div>

        <button className="btn w-100 mt-2 text-white" style={{ background: "#273c75" }}>
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
);

/* ================= PRODUCT HEADER ================= */
const ProductHeader = ({ viewMode, onViewModeChange, search, setSearch }) => {
  const views = [
    { mode: "grid-2", icon: Grid2X2 },
    { mode: "grid-3", icon: Grid3X3 },
    { mode: "grid-4", icon: LayoutList },
  ];

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <h4 className="fw-bold mb-0">Products</h4>

      <div className="d-flex align-items-center gap-2">
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
  );
};

/* ================= PRODUCT GRID ================= */
const ProductGrid = ({ products, viewMode }) => {
  const gridClass = {
    "grid-2": "row row-cols-1 row-cols-sm-2",
    "grid-3": "row row-cols-1 row-cols-sm-2 row-cols-md-3",
    "grid-4": "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4",
  }[viewMode];

  return (
    <div className={gridClass}>
      {products.map((p) => (
        <div key={p.id} className="col mb-4">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
};

/* ================= MAIN ================= */
const Products = () => {
  const [viewMode, setViewMode] = useState("grid-4");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* 🔢 ITEMS PER PAGE BASED ON VIEW */
  const itemsPerPage = {
    "grid-2": 4, // 2 x 2
    "grid-3": 6, // 3 x 2
    "grid-4": 8, // 4 x 2
  }[viewMode];

  /* 🔍 SEARCH FILTER */
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* 📄 PAGINATION CALCULATIONS */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* 🔁 RESET PAGE ON VIEW / SEARCH CHANGE */
  React.useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, search]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <WebsiteNavbar />

      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <ProductHeader
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            search={search}
            setSearch={setSearch}
          />

          <ProductGrid products={paginatedProducts} viewMode={viewMode} />

          {/* ✅ DYNAMIC PAGINATION */}
          {totalPages > 1 && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 && "active"}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;






// // Main/Products.js
// import React, { useState, useEffect, useMemo } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Search,
//   X,
//   Grid2X2,
//   Grid3X3,
//   LayoutList,
// } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Products.css";
// import WebsiteNavbar from "../Admin_Navbar/Admin_Navbar";
// import Footer from "../../Footer/Footer";
// import { baseurl } from "../../BaseURL/BaseURL";

// /* ================= PRODUCT CARD ================= */
// const ProductCard = ({ product }) => {
//   const primaryImage =
//     product.media?.find((m) => m.is_primary)?.file ||
//     product.media?.[0]?.file;

//   const variant = product.variants?.[0];

//   const sellingPrice = variant?.selling_price;
//   const mrp = variant?.mrp;

//   const discount =
//     mrp && sellingPrice
//       ? Math.round(((mrp - sellingPrice) / mrp) * 100)
//       : null;

//   return (
//     <div className="card h-100">
//       <div
//         className="bg-light p-3 text-center position-relative"
//         style={{ height: 200 }}
//       >
//         <img
//           src={
//             primaryImage
//               ? `${baseurl}${primaryImage}`
//               : "https://via.placeholder.com/300"
//           }
//           alt={product.product_name}
//           className="img-fluid"
//           style={{ maxHeight: "100%", objectFit: "contain" }}
//         />

//         {discount > 0 && (
//           <span className="badge bg-danger position-absolute top-0 end-0 m-2">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       <div className="card-body d-flex flex-column">
//         <h6 className="line-clamp-2">{product.product_name}</h6>
//         <small className="text-muted">{product.brand}</small>

//         <div className="mt-auto">
//           <div className="d-flex align-items-center gap-2">
//             <strong>₹{sellingPrice}</strong>
//             {mrp && (
//               <small className="text-muted text-decoration-line-through">
//                 ₹{mrp}
//               </small>
//             )}
//           </div>

//           <button
//             className="btn w-100 mt-2 text-white"
//             style={{ background: "#273c75" }}
//           >
//             ADD TO CART
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= HEADER ================= */
// const ProductHeader = ({ viewMode, setViewMode, search, setSearch }) => {
//   const views = [
//     { mode: "grid-2", icon: Grid2X2 },
//     { mode: "grid-3", icon: Grid3X3 },
//     { mode: "grid-4", icon: LayoutList },
//   ];

//   return (
//     <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//       <h4 className="fw-bold mb-0">Products</h4>

//       <div className="d-flex align-items-center gap-2">
//         <div className="input-group input-group-sm" style={{ width: 220 }}>
//           <span className="input-group-text bg-transparent">
//             <Search size={16} />
//           </span>
//           <input
//             className="form-control"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {search && (
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => setSearch("")}
//             >
//               <X size={14} />
//             </button>
//           )}
//         </div>

//         <div className="btn-group">
//           {views.map(({ mode, icon: Icon }) => (
//             <button
//               key={mode}
//               className={`btn btn-outline-secondary ${
//                 viewMode === mode ? "active" : ""
//               }`}
//               onClick={() => setViewMode(mode)}
//             >
//               <Icon size={16} />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ================= GRID ================= */
// const ProductGrid = ({ products, viewMode }) => {
//   const gridClass = {
//     "grid-2": "row row-cols-1 row-cols-sm-2",
//     "grid-3": "row row-cols-1 row-cols-sm-2 row-cols-md-3",
//     "grid-4":
//       "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4",
//   }[viewMode];

//   return (
//     <div className={gridClass}>
//       {products.map((p) => (
//         <div className="col mb-4" key={p.product_id}>
//           <ProductCard product={p} />
//         </div>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN ================= */
// const Products = () => {
//   const { id } = useParams(); // category_id

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [viewMode, setViewMode] = useState("grid-4");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = {
//     "grid-2": 4,
//     "grid-3": 6,
//     "grid-4": 8,
//   }[viewMode];

//   /* ===== FETCH PRODUCTS ===== */
//   useEffect(() => {
//     setLoading(true);
//     fetch(`${baseurl}/products/?category_id=${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.results || []);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   /* ===== SEARCH ===== */
//   const filteredProducts = useMemo(() => {
//     return products.filter((p) =>
//       p.product_name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [products, search]);

//   /* ===== PAGINATION ===== */
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [viewMode, search]);

//   return (
//     <div className="min-vh-100 d-flex flex-column">
//       <WebsiteNavbar />

//       <main className="flex-grow-1 bg-light">
//         <div className="container py-4">
//           <ProductHeader
//             viewMode={viewMode}
//             setViewMode={setViewMode}
//             search={search}
//             setSearch={setSearch}
//           />

//           {loading ? (
//             <p className="text-center">Loading products...</p>
//           ) : paginatedProducts.length === 0 ? (
//             <p className="text-center">No products found</p>
//           ) : (
//             <ProductGrid
//               products={paginatedProducts}
//               viewMode={viewMode}
//             />
//           )}

//           {totalPages > 1 && (
//             <nav className="mt-5">
//               <ul className="pagination justify-content-center">
//                 <li
//                   className={`page-item ${
//                     currentPage === 1 && "disabled"
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setCurrentPage((p) => p - 1)}
//                   >
//                     Previous
//                   </button>
//                 </li>

//                 {Array.from({ length: totalPages }).map((_, i) => (
//                   <li
//                     key={i}
//                     className={`page-item ${
//                       currentPage === i + 1 && "active"
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setCurrentPage(i + 1)}
//                     >
//                       {i + 1}
//                     </button>
//                   </li>
//                 ))}

//                 <li
//                   className={`page-item ${
//                     currentPage === totalPages && "disabled"
//                   }`}
//                 >
//                   <button
//                     className="page-link"
//                     onClick={() => setCurrentPage((p) => p + 1)}
//                   >
//                     Next
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Products;
