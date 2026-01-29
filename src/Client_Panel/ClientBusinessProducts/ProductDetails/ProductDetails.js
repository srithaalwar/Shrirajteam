
// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import ClientNavbar from "../../../Client_Panel/Client_Navbar/Client_Navbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../../../BaseURL/BaseURL";

// const ProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams(); // MUST MATCH App.js
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant");

//   /* ================= STATE ================= */
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= FETCH PRODUCT ================= */
//   useEffect(() => {
//     console.log("📌 productId:", productId);
//     console.log("📌 variantId:", variantId);

//     if (!productId) {
//       setError("Invalid product");
//       setLoading(false);
//       return;
//     }

//     const apiUrl = `${baseurl}/products/${productId}/?variant_id=${variantId || ""}`;
//     console.log("🚀 API URL:", apiUrl);

//     setLoading(true);
//     setError("");

//     fetch(apiUrl)
//       .then(res => {
//         if (!res.ok) {
//           throw new Error("API failed");
//         }
//         return res.json();
//       })
//       .then(data => {
//         console.log("✅ API Response:", data);

//         if (!data || !data.product_id) {
//           throw new Error("Product not found");
//         }

//         setProduct(data);

//         const variant =
//           data.variants?.find(v => String(v.id) === String(variantId)) ||
//           data.variants?.[0] ||
//           null;

//         if (!variant) {
//           throw new Error("Variant not found");
//         }

//         setSelectedVariant(variant);

//         if (variant.media?.length > 0) {
//           setSelectedImage(`${baseurl}${variant.media[0].file}`);
//         } else {
//           setSelectedImage(
//             "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
//           );
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ ProductDetails error:", err);
//         setError(err.message || "Something went wrong");
//         setLoading(false);
//       });
//   }, [productId, variantId]);

//   /* ================= PRICING ================= */
//   const pricing = useMemo(() => {
//     const mrp = parseFloat(selectedVariant?.mrp || 0);
//     const price = parseFloat(selectedVariant?.selling_price || 0);
//     const discount =
//       mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return { mrp, price, discount };
//   }, [selectedVariant]);

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <>
//         <ClientNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <>
//         <ClientNavbar />
//         <div className="text-center py-5 text-danger">{error}</div>
//       </>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <>
//       <ClientNavbar />
//       {/* <ShopHeader /> */}
//       <ShopHeader businessId={product.business} />


//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ========== LEFT : IMAGES ========== */}
//           <div className="image-section">
//             <div className="thumbnail-list">
//               {(selectedVariant.media || []).map((img, index) => {
//                 const imgUrl = `${baseurl}${img.file}`;
//                 return (
//                   <div
//                     key={index}
//                     className={`thumb-box ${selectedImage === imgUrl ? "active" : ""}`}
//                     onClick={() => setSelectedImage(imgUrl)}
//                   >
//                     <img src={imgUrl} alt="thumb" />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section product-details-section">
//             <p className="store-link">
//               Visit the {product.brand || "Store"}
//             </p>

//             <h1>{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h1>Product Attributes</h1>
//                 <div className="attributes">
//                   {Object.entries(product.attributes).map(([k, v]) => (
//                     <div key={k}>
//                       <span>{k.replace(/_/g, " ")}</span>
//                       <span>{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* VARIANT ATTRIBUTES */}
//             {selectedVariant.attributes && (
//               <>
//                 <h1>Variant Details</h1>
//                 <div className="attributes">
//                   {Object.entries(selectedVariant.attributes).map(([k, v]) => (
//                     <div key={k}>
//                       <span>{k.replace(/_/g, " ")}</span>
//                       <span>{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* ========== RIGHT : BUY BOX ========== */}
//           <div className="buy-box">
//             <div className="price-row">
//               <span className="price">₹{pricing.price.toFixed(2)}</span>
//               {pricing.mrp > pricing.price && (
//                 <>
//                   <span className="mrp">₹{pricing.mrp.toFixed(2)}</span>
//                   <span className="off">{pricing.discount}% OFF</span>
//                 </>
//               )}
//             </div>

//             <p className="unit">SKU: {selectedVariant.sku}</p>

//             <div className="qty">
//               <button onClick={() => setQty(q => q - 1)} disabled={qty === 1}>
//                 −
//               </button>
//               <span>{qty}</span>
//               <button
//                 onClick={() => setQty(q => q + 1)}
//                 disabled={qty >= selectedVariant.stock}
//               >
//                 +
//               </button>
//             </div>

//             <button className="cart-btn">ADD TO CART</button>

//             <p className="secure">
//               Stock Available: {selectedVariant.stock}
//             </p>
//           </div>
//         </div>

//         {/* ========== ABOUT & DETAILS ========== */}
//         <div className="product-info-row">

//           <div className="info-accordion">
//             <div
//               className="info-header"
//               onClick={() => setOpenAbout(!openAbout)}
//             >
//               <h3>About Product</h3>
//               <span className={`arrow ${openAbout ? "open" : ""}`}>⌃</span>
//             </div>

//             {openAbout && (
//               <div className="info-body">
//                 <p>{product.description || "No description available."}</p>
//               </div>
//             )}
//           </div>

//           <div className="info-accordion">
//             <div
//               className="info-header"
//               onClick={() => setOpenDetails(!openDetails)}
//             >
//               <h3>Product details</h3>
//               <span className={`arrow ${openDetails ? "open" : ""}`}>⌃</span>
//             </div>

//             {openDetails && (
//               <div className="info-body">
//                 <table className="product-details-table">
//                   <tbody>
//                     {Object.entries(selectedVariant.attributes || {}).map(
//                       ([key, value]) => (
//                         <tr key={key}>
//                           <td>{key.replace(/_/g, " ")}</td>
//                           <td>{value}</td>
//                         </tr>
//                       )
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;





import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ClientNavbar from "../../../Client_Panel/Client_Navbar/Client_Navbar";
import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
import "./ProductDetails.css";
import { baseurl } from "../../../BaseURL/BaseURL";

const ProductDetails = () => {
  /* ================= ROUTE PARAMS ================= */
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant");

  /* ================= STATE ================= */
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [openAbout, setOpenAbout] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    console.log("📌 productId:", productId);
    console.log("📌 variantId:", variantId);

    if (!productId) {
      setError("Invalid product");
      setLoading(false);
      return;
    }

    const apiUrl = `${baseurl}/products/${productId}/?variant_id=${variantId || ""}`;
    console.log("🚀 API URL:", apiUrl);

    setLoading(true);
    setError("");

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error("API failed");
        }
        return res.json();
      })
      .then(data => {
        console.log("✅ API Response:", data);

        if (!data || !data.product_id) {
          throw new Error("Product not found");
        }

        setProduct(data);

        const variant =
          data.variants?.find(v => String(v.id) === String(variantId)) ||
          data.variants?.[0] ||
          null;

        if (!variant) {
          throw new Error("Variant not found");
        }

        setSelectedVariant(variant);

        if (variant.media?.length > 0) {
          setSelectedImage(`${baseurl}${variant.media[0].file}`);
        } else {
          setSelectedImage(
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
          );
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("❌ ProductDetails error:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [productId, variantId]);

  /* ================= PRICING ================= */
  const pricing = useMemo(() => {
    const mrp = parseFloat(selectedVariant?.mrp || 0);
    const price = parseFloat(selectedVariant?.selling_price || 0);
    const discount =
      mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return { mrp, price, discount };
  }, [selectedVariant]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <ClientNavbar />
        <div className="text-center py-5">Loading product...</div>
      </>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <>
        <ClientNavbar />
        <div className="text-center py-5 text-danger">{error}</div>
      </>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <ClientNavbar />
      <ShopHeader businessId={product.business} />

      <div className="product-wrapper">
        <div className="product-layout">

          {/* ========== LEFT : IMAGES ========== */}
          <div className="image-section">
            {/* Thumbnails Container with Scroll */}
            <div className="thumbnail-list-container">
              <div className="thumbnail-list">
                {(selectedVariant.media || []).map((img, index) => {
                  const imgUrl = `${baseurl}${img.file}`;
                  return (
                    <div
                      key={index}
                      className={`thumb-box ${selectedImage === imgUrl ? "active" : ""}`}
                      onClick={() => setSelectedImage(imgUrl)}
                    >
                      <img src={imgUrl} alt="thumb" />
                    </div>
                  );
                })}
              </div>
              
              {/* Scroll Indicator (only shows when there are more than 5 images) */}
              {(selectedVariant.media || []).length > 5 && (
                <div className="scroll-indicator">
                  <span>↓</span>
                </div>
              )}
            </div>

            {/* Main Image */}
            <div className="main-image-box">
              <img src={selectedImage} alt={product.product_name} />
              <div className="floating-icons">
                <div className="icon-circle">❤️</div>
                <div className="icon-circle">↗️</div>
              </div>
            </div>
          </div>

          {/* ========== MIDDLE : DETAILS ========== */}
          <div className="details-section product-details-section">
            <p className="store-link">
              Visit the {product.brand || "Store"}
            </p>

            <h1>{product.product_name}</h1>

            {product.description && (
              <p className="desc">{product.description}</p>
            )}

            {/* PRODUCT ATTRIBUTES */}
            {product.attributes && (
              <>
                <h2>Product Attributes</h2>
                <div className="attributes">
                  {Object.entries(product.attributes).map(([k, v]) => (
                    <div key={k} className="attribute-row">
                      <span className="attribute-key">{k.replace(/_/g, " ")}</span>
                      <span className="attribute-value">{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* VARIANT ATTRIBUTES */}
            {selectedVariant.attributes && (
              <>
                <h2>Variant Details</h2>
                <div className="attributes">
                  {Object.entries(selectedVariant.attributes).map(([k, v]) => (
                    <div key={k} className="attribute-row">
                      <span className="attribute-key">{k.replace(/_/g, " ")}</span>
                      <span className="attribute-value">{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ========== RIGHT : BUY BOX ========== */}
          <div className="buy-box">
            <div className="price-row">
              <span className="price">₹{pricing.price.toFixed(2)}</span>
              {pricing.mrp > pricing.price && (
                <>
                  <span className="mrp">₹{pricing.mrp.toFixed(2)}</span>
                  <span className="off">{pricing.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="unit">SKU: {selectedVariant.sku}</p>

            <div className="qty">
              <button 
                className="qty-btn minus" 
                onClick={() => setQty(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button 
                className="qty-btn plus"
                onClick={() => setQty(q => q + 1)}
                disabled={qty >= selectedVariant.stock}
              >
                +
              </button>
            </div>

            <button className="cart-btn">ADD TO CART</button>

            <p className="secure">
              Stock Available: {selectedVariant.stock}
            </p>
          </div>
        </div>

        {/* ========== ABOUT & DETAILS ========== */}
        <div className="product-info-row">
          <div className="info-accordion">
            <div
              className="info-header"
              onClick={() => setOpenAbout(!openAbout)}
            >
              <h3>About Product</h3>
              <span className={`arrow ${openAbout ? "open" : ""}`}>⌃</span>
            </div>

            {openAbout && (
              <div className="info-body">
                <p>{product.description || "No description available."}</p>
              </div>
            )}
          </div>

          <div className="info-accordion">
            <div
              className="info-header"
              onClick={() => setOpenDetails(!openDetails)}
            >
              <h3>Product details</h3>
              <span className={`arrow ${openDetails ? "open" : ""}`}>⌃</span>
            </div>

            {openDetails && (
              <div className="info-body">
                <table className="product-details-table">
                  <tbody>
                    {Object.entries(selectedVariant.attributes || {}).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td>{key.replace(/_/g, " ")}</td>
                          <td>{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;