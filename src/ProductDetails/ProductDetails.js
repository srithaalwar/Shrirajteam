// import React, { useState } from "react";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import "./ProductDetails.css";

// const images = [
//   { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811" },
//   { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
//   { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
// ];

// const ProductDetails = () => {
    
//   const [selectedImage, setSelectedImage] = useState(images[0].image);
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
// const [openDetails, setOpenDetails] = useState(false);

//   return (
//     <>
//       <WebsiteNavbar />

//       <div className="product-wrapper">
//         {/* Breadcrumb */}
//         <div className="breadcrumb">
//           Home / properties /
//         </div>

//         <div className="product-layout">

//        {/* LEFT – IMAGE SECTION */}
//     <div className="image-section">
//       {/* Thumbnails */}
//       <div className="thumbnail-list">
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className={`thumb-box ${
//               selectedImage === img.image ? "active" : ""
//             }`}
//             onClick={() => setSelectedImage(img.image)}
//           >
//             <img src={img.image} alt="thumbnail" />
//           </div>
//         ))}
//       </div>

//       {/* Main Image */}
//       <div className="main-image-box">
//         <img src={selectedImage} alt="product" />

//         <div className="floating-icons">
//           <div className="icon-circle">♡</div>
//           <div className="icon-circle">↗</div>
//         </div>
//   </div>
// </div>



//           {/* MIDDLE – DETAILS */}
//           <div className="details-section">
//             <a href="/" className="store-link">
//               Visit the Om Systems Store
//             </a>

//             <h1>Epson EcoTank L8050</h1>
//             <p className="review">Be the first to review this product</p>

//             <p className="desc">
//               Presenting cost-effective borderless A4 photo printing solutions
//               perfectly suited for design drawing, stunning photos, and versatile
//               media printing, with the Epson L8050 Superb Savings and Page Yield:
//               High capacity integrated ink tanks and high...
//               <span> Read More</span>
//             </p>

//             <h3>Key Attributes</h3>

//             <div className="attributes">
//               <div><span>Country Of Origin</span><span>Indonesia</span></div>
//               <div><span>Warranty</span><span>1 year</span></div>
//               <div><span>Model</span><span>Epson EcoTank L8050</span></div>
//               <div><span>Brand</span><span>Epson India Pvt. Ltd.</span></div>
//               <div><span>Net Quantity</span><span>1 unit</span></div>
//               <div><span>Manufacturer</span><span>PT.EPSON BATAM</span></div>
//             </div>

//             <a href="/" className="view-all">View full attributes</a>
//           </div>
          

          
//  {/* FIXED BUY BOX */}
//           <div className="buy-box">
//             <div className="price-row">
//               <span className="price">₹21,199</span>
//               <span className="mrp">₹26,999</span>
//               <span className="off">21%</span>
//             </div>

//             <p className="unit">1 unit</p>

//             <div className="qty">
//               <button onClick={() => setQty(qty - 1)} disabled={qty === 1}>−</button>
//               <span>{qty}</span>
//               <button onClick={() => setQty(qty + 1)}>+</button>
//             </div>

//             <button className="cart-btn">ADD TO CART</button>

//             <div className="seller-card">
//               <div>
//                 <p><strong>Sold By:</strong> Om Systems</p>
//                 <p className="rating">★ No ratings yet</p>
//               </div>
//               <span>›</span>
//             </div>

//             <div className="payment-card">
//               <strong>EMI from ₹745/month</strong>
//               <span className="link">View plans</span>
//             </div>

//             <div className="payment-card">
//               <strong>Pay later available</strong>
//               <span className="link">View options</span>
//             </div>

//             <p className="secure">Secured by Razorpay</p>

//             <div className="policies">
//               <span>🚚 Not cancellable</span>
//               <span>📦 Not returnable</span>
//             </div>

//             <hr />

//              {/* QR */}
//   <div className="qr-actions">
//     <span>⬇ Download QR</span>
//     <span>↗ Share</span>
//   </div>
//           </div>

//           {/* ===============================
//     ABOUT PRODUCT & PRODUCT DETAILS
//     =============================== */}
// {/* ===============================
//    ABOUT PRODUCT & PRODUCT DETAILS
// =============================== */}
// <div className="product-info-row">

//   {/* ABOUT PRODUCT */}
//   <div className="info-accordion">
//     <div
//       className="info-header"
//       onClick={() => setOpenAbout(!openAbout)}
//     >
//       <h3>About Product</h3>
//       <span className={`arrow ${openAbout ? "open" : ""}`}>⌃</span>
//     </div>

//     {openAbout && (
//       <div className="info-body">
//         <p>
//           Presenting cost-effective borderless A4 photo printing solutions
//           perfectly suited for design drawing, stunning photos, and versatile
//           media printing, with the Epson L8050 Superb Savings and Page Yield.
//           High capacity integrated ink tanks and highly affordable genuine
//           photo ink bottles. Supports CD/DVD printing and Epson Heat-Free
//           Technology for superior performance.
//         </p>
//       </div>
//     )}
//   </div>

//   {/* PRODUCT DETAILS */}
//   <div className="info-accordion">
//     <div
//       className="info-header"
//       onClick={() => setOpenDetails(!openDetails)}
//     >
//       <h3>Product details</h3>
//       <span className={`arrow ${openDetails ? "open" : ""}`}>⌃</span>
//     </div>

//     {openDetails && (
//       <div className="info-body">
//         <table className="product-details-table">
//           <tbody>
//             <tr>
//               <td>Country Of Origin</td>
//               <td>Indonesia</td>
//             </tr>
//             <tr>
//               <td>Printer Speed</td>
//               <td>8.0 ipm / 8.0 ipm</td>
//             </tr>
//             <tr>
//               <td>Printer Output</td>
//               <td>Colour</td>
//             </tr>
//             <tr>
//               <td>Warranty</td>
//               <td>1 year</td>
//             </tr>
//             <tr>
//               <td>Includes</td>
//               <td>
//                 Printer, Power Cable, USB Cable, Ink Bottles (1 Set),
//                 User Manual, Warranty Card
//               </td>
//             </tr>
//             <tr>
//               <td>Special Feature</td>
//               <td>Epson Heat-Free Technology</td>
//             </tr>
//             <tr>
//               <td>Connectivity</td>
//               <td>Wi-Fi</td>
//             </tr>
//             <tr>
//               <td>Height</td>
//               <td>150 mm</td>
//             </tr>
//               <tr>
//               <td>Breadth</td>
//               <td>369 mm mm</td>
//             </tr>
//               <tr>
//               <td>Length</td>
//               <td>403 mm</td>
//             </tr>  
//             <tr>
//               <td>Weight</td>
//               <td>6 kg</td>
//             </tr>
//              <tr>
//               <td>Model</td>
//               <td>Epson EcoTank L8050</td>
//             </tr>
//              <tr>
//               <td>Brand</td>
//               <td>Epson India Pvt Ltd.</td>
//             </tr>
//              <tr>
//               <td>Common name</td>
//               <td>printer</td>
//             </tr>
//               <tr>
//               <td>Net Quantity</td>
//               <td>1 unit</td>
//             </tr>
//               <tr>
//               <td>Model number</td>
//               <td>-</td>
//             </tr>
//               <tr>
//               <td>Package Dimension</td>
//               <td>36.9L x 40.3W x 15H cm</td>
//             </tr>
//               <tr>
//               <td>Manufacturer or packer name</td>
//               <td>P.T.EPSON BATAM</td>
//             </tr>
//               <tr>
//               <td>Manufacturer or packer address</td>
//               <td>P.T.EPSON BATAM, Jl.Rambutan, Lot 504-510 & Lot 530 Batamindo Industrial Park, Muka Kuning Batam, Indonesia 29433</td>
//             </tr>
//                <tr>
//               <td>Manufacturing Date</td>
//               <td>Aug-23</td>
//             </tr>
//                <tr>
//               <td>Importer name</td>
//               <td>Epson India Pvt ltd</td>
//             </tr>
//               <tr>
//               <td>Importer address</td>
//               <td>Epson India Pvt ltd, 12 th Floor, The Millenia, Tower A, No.1 Murphy Road, Ulsoor, Bangalore - 560008</td>
//             </tr>
          
//           </tbody>
//         </table>
//       </div>
//     )}
//   </div>

// </div>

// </div>
//         </div>
      


//     </>
//   );
// };

// export default ProductDetails;




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// const ProductDetails = () => {
//   const { id } = useParams(); // product_id from URL

//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH PRODUCT ================= */
//   useEffect(() => {
//     setLoading(true);

//     fetch(`${baseurl}/products/?product_id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         const prod = data.results?.[0];
//         setProduct(prod);

//         // Set primary image
//         if (prod?.media?.length > 0) {
//           const primary =
//             prod.media.find(m => m.is_primary) || prod.media[0];
//           setSelectedImage(`${baseurl}${primary.file}`);
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   if (!product) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Product not found</div>
//       </>
//     );
//   }

//   const variant = product.variants?.[0];
//   const mrp = parseFloat(variant?.mrp || 0);
//   const price = parseFloat(variant?.selling_price || 0);
//   const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

//   return (
//     <>
//       <WebsiteNavbar />

//       <ShopHeader/>

//       <div className="product-wrapper">

//         {/* Breadcrumb */}
//         {/* <div className="breadcrumb">
//           Home / Products / {product.product_name}
//         </div> */}

//         <div className="product-layout">

//           {/* LEFT – IMAGE SECTION */}
//           <div className="image-section">
//             <div className="thumbnail-list">
//               {product.media?.map((img, index) => (
//                 <div
//                   key={index}
//                   className={`thumb-box ${
//                     selectedImage === `${baseurl}${img.file}` ? "active" : ""
//                   }`}
//                   onClick={() => setSelectedImage(`${baseurl}${img.file}`)}
//                 >
//                   <img src={`${baseurl}${img.file}`} alt="thumb" />
//                 </div>
//               ))}
//             </div>

//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
//             </div>
//           </div>

//           {/* MIDDLE – DETAILS */}
//           <div className="details-section">
//             <p className="store-link">
//               Visit the {product.brand || "Store"}
//             </p>

//             <h1>{product.product_name}</h1>

//             <p className="desc">
//               {product.description}
//             </p>

//             <h3>Key Attributes</h3>

//             <div className="attributes">
//               {product.attributes &&
//                 Object.entries(product.attributes).map(([key, value]) => (
//                   <div key={key}>
//                     <span>{key.replace("_", " ")}</span>
//                     <span>{value}</span>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           {/* RIGHT – BUY BOX */}
//           <div className="buy-box">
//             <div className="price-row">
//               <span className="price">₹{price}</span>
//               {mrp > price && (
//                 <>
//                   <span className="mrp">₹{mrp}</span>
//                   <span className="off">{discount}%</span>
//                 </>
//               )}
//             </div>

//             <p className="unit">1 unit</p>

//             <div className="qty">
//               <button onClick={() => setQty(qty - 1)} disabled={qty === 1}>
//                 −
//               </button>
//               <span>{qty}</span>
//               <button
//                 onClick={() => setQty(qty + 1)}
//                 disabled={qty >= variant?.stock}
//               >
//                 +
//               </button>
//             </div>

//             <button className="cart-btn">ADD TO CART</button>

//             <p className="secure">
//               Stock Available: {variant?.stock || 0}
//             </p>
//           </div>
//         </div>

//         {/* ================= ABOUT & DETAILS ================= */}
//         <div className="product-info-row">

//           {/* ABOUT PRODUCT */}
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
//                 <p>{product.description}</p>
//               </div>
//             )}
//           </div>

//           {/* PRODUCT DETAILS */}
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
//                     {variant &&
//                       Object.entries(variant.attributes || {}).map(
//                         ([key, value]) => (
//                           <tr key={key}>
//                             <td>{key}</td>
//                             <td>{value}</td>
//                           </tr>
//                         )
//                       )}
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




// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";

// const ProductDetails = () => {
//   const { id } = useParams(); // product_id
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant"); // ✅ GET VARIANT ID

//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH PRODUCT ================= */
//   useEffect(() => {
//     setLoading(true);

//     fetch(`${baseurl}/products/?product_id=${id}`)
//       .then(res => res.json())
//       .then(data => {
//         const prod = data.results?.[0];
//         if (!prod) {
//           setLoading(false);
//           return;
//         }

//         setProduct(prod);

//         // ✅ SELECT VARIANT
//         let variant =
//           prod.variants?.find(v => String(v.id) === String(variantId)) ||
//           prod.variants?.[0] ||
//           null;

//         setSelectedVariant(variant);

//         // ✅ SET IMAGE (VARIANT → PRODUCT → FALLBACK)
//         if (variant?.media?.length > 0) {
//           setSelectedImage(`${baseurl}${variant.media[0].file}`);
//         } else if (prod.media?.length > 0) {
//           const primary =
//             prod.media.find(m => m.is_primary) || prod.media[0];
//           setSelectedImage(`${baseurl}${primary.file}`);
//         } else {
//           setSelectedImage(
//             "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
//           );
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [id, variantId]);

//   /* ================= PRICING ================= */
//   const pricing = useMemo(() => {
//     const mrp = parseFloat(selectedVariant?.mrp || 0);
//     const price = parseFloat(selectedVariant?.selling_price || 0);
//     const discount =
//       mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return { mrp, price, discount };
//   }, [selectedVariant]);

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   if (!product || !selectedVariant) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Product not found</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />
//       <ShopHeader />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ================= LEFT – IMAGE ================= */}
//           <div className="image-section">
//             <div className="thumbnail-list">
//               {(selectedVariant.media?.length > 0
//                 ? selectedVariant.media
//                 : product.media || []
//               ).map((img, index) => (
//                 <div
//                   key={index}
//                   className={`thumb-box ${
//                     selectedImage === `${baseurl}${img.file}` ? "active" : ""
//                   }`}
//                   onClick={() =>
//                     setSelectedImage(`${baseurl}${img.file}`)
//                   }
//                 >
//                   <img src={`${baseurl}${img.file}`} alt="thumb" />
//                 </div>
//               ))}
//             </div>

//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
//             </div>
//           </div>

//           {/* ================= MIDDLE – DETAILS ================= */}
//           <div className="details-section">
//             <p className="store-link">
//               Visit the {product.brand || "Store"}
//             </p>

//             <h1>{product.product_name}</h1>

//             <p className="desc">{product.description}</p>

//             {selectedVariant.attributes && (
//               <>
//                 <h3>Key Attributes</h3>
//                 <div className="attributes">
//                   {Object.entries(selectedVariant.attributes).map(
//                     ([key, value]) => (
//                       <div key={key}>
//                         <span>{key.replace(/_/g, " ")}</span>
//                         <span>{value}</span>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* ================= RIGHT – BUY BOX ================= */}
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
//                 disabled={qty >= (selectedVariant.stock || 1)}
//               >
//                 +
//               </button>
//             </div>

//             <button className="cart-btn">
//               ADD TO CART
//             </button>

//             <p className="secure">
//               Stock Available: {selectedVariant.stock || 0}
//             </p>
//           </div>
//         </div>

//         {/* ================= ABOUT & DETAILS ================= */}
//         <div className="product-info-row">

//           {/* ABOUT PRODUCT */}
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
//                 <p>{product.description}</p>
//               </div>
//             )}
//           </div>

//           {/* PRODUCT DETAILS */}
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
//                     {Object.entries(
//                       selectedVariant.attributes || {}
//                     ).map(([key, value]) => (
//                       <tr key={key}>
//                         <td>{key.replace(/_/g, " ")}</td>
//                         <td>{value}</td>
//                       </tr>
//                     ))}
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





// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";

// const ProductDetails = () => {
//   const { id } = useParams(); // product_id
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant");

//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH PRODUCT (NEW API) ================= */
//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     fetch(`${baseurl}/products/${id}/?variant_id=${variantId || ""}`)
//       .then(res => res.json())
//       .then(data => {
//         if (!data || !data.product_id) {
//           setLoading(false);
//           return;
//         }

//         setProduct(data);

//         // ✅ Select variant (priority: URL → first variant)
//         const variant =
//           data.variants?.find(v => String(v.id) === String(variantId)) ||
//           data.variants?.[0] ||
//           null;

//         setSelectedVariant(variant);

//         // ✅ Image selection (variant media only)
//         if (variant?.media?.length > 0) {
//           setSelectedImage(`${baseurl}${variant.media[0].file}`);
//         } else {
//           setSelectedImage(
//             "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
//           );
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Product fetch error:", err);
//         setLoading(false);
//       });
//   }, [id, variantId]);

//   /* ================= PRICING ================= */
//   const pricing = useMemo(() => {
//     const mrp = parseFloat(selectedVariant?.mrp || 0);
//     const price = parseFloat(selectedVariant?.selling_price || 0);
//     const discount =
//       mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

//     return { mrp, price, discount };
//   }, [selectedVariant]);

//   if (loading) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   if (!product || !selectedVariant) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5">Product not found</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <WebsiteNavbar />
//       <ShopHeader />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ================= LEFT – IMAGES ================= */}
//           <div className="image-section">
//             <div className="thumbnail-list">
//               {(selectedVariant.media || []).map((img, index) => (
//                 <div
//                   key={index}
//                   className={`thumb-box ${
//                     selectedImage === `${baseurl}${img.file}` ? "active" : ""
//                   }`}
//                   onClick={() => setSelectedImage(`${baseurl}${img.file}`)}
//                 >
//                   <img src={`${baseurl}${img.file}`} alt="thumb" />
//                 </div>
//               ))}
//             </div>

//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
//             </div>
//           </div>

//           {/* ================= MIDDLE – DETAILS ================= */}
//           <div className="details-section">
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
//                 <h3>Product Attributes</h3>
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
//                 <h3>Variant Details</h3>
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

//           {/* ================= RIGHT – BUY BOX ================= */}
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

//         {/* ================= ABOUT & DETAILS ================= */}
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




// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import {
//   Share2,
  
// } from "lucide-react";

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
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5 text-danger">{error}</div>
//       </>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <>
//       <WebsiteNavbar />
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

//               <div className="floating-icons">
                
//                 <div className="icon-circle">
//                   <Share2 size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section">
            

//             <h1>{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h3>Product Attributes</h3>
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
//                 <h3>Variant Details</h3>
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





// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import { Share2 } from "lucide-react";

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

//   /* ================= SHARE FUNCTIONALITY ================= */
//   const handleShareClick = () => {
//     const currentUrl = window.location.href;
    
//     navigator.clipboard.writeText(currentUrl)
//       .then(() => {
//         alert("Product URL copied to clipboard!");
//       })
//       .catch((err) => {
//         console.error("Failed to copy URL: ", err);
//         // Fallback for browsers that don't support clipboard API
//         const textArea = document.createElement("textarea");
//         textArea.value = currentUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand("copy");
//           alert("Product URL copied to clipboard!");
//         } catch (err) {
//           alert("Failed to copy URL. Please copy it manually: " + currentUrl);
//         }
//         document.body.removeChild(textArea);
//       });
//   };

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
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5 text-danger">{error}</div>
//       </>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <>
//       <WebsiteNavbar />
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

//               <div className="floating-icons">
//                 <div 
//                   className="icon-circle" 
//                   onClick={handleShareClick}
//                   style={{ cursor: "pointer" }}
//                   title="Share product URL"
//                 >
//                   <Share2 size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section">
//             <h1>{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h3>Product Attributes</h3>
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
//                 <h3>Variant Details</h3>
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


// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import { Share2 } from "lucide-react";

// const ProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams(); // MUST MATCH App.js
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant");

//   /* ================= STATE ================= */
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showCopyAlert, setShowCopyAlert] = useState(false);

//   /* ================= SHARE FUNCTIONALITY ================= */
//   const handleShareClick = () => {
//     const currentUrl = window.location.href;
    
//     navigator.clipboard.writeText(currentUrl)
//       .then(() => {
//         // Show custom alert/notification
//         setShowCopyAlert(true);
        
//         // Auto-hide after 3 seconds
//         setTimeout(() => {
//           setShowCopyAlert(false);
//         }, 3000);
//       })
//       .catch((err) => {
//         console.error("Failed to copy URL: ", err);
//         // Fallback for browsers that don't support clipboard API
//         const textArea = document.createElement("textarea");
//         textArea.value = currentUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand("copy");
//           setShowCopyAlert(true);
//           setTimeout(() => {
//             setShowCopyAlert(false);
//           }, 3000);
//         } catch (err) {
//           // Show error message
//           alert("Failed to copy URL. Please copy it manually: " + currentUrl);
//         }
//         document.body.removeChild(textArea);
//       });
//   };

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
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5 text-danger">{error}</div>
//       </>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <>
//       <WebsiteNavbar />
//       <ShopHeader businessId={product.business} />

//       {/* Copy Alert Notification */}
//       {showCopyAlert && (
//         <div className="product-copy-alert">
//           <div className="product-copy-alert-content">
//             <span className="product-copy-alert-icon">✓</span>
//             <span className="product-copy-alert-text">Product link copied!</span>
//           </div>
//         </div>
//       )}

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

//               <div className="floating-icons">
//                 <div 
//                   className="icon-circle" 
//                   onClick={handleShareClick}
//                   style={{ cursor: "pointer" }}
//                   title="Share product URL"
//                 >
//                   <Share2 size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section">
//             <h1>{product.product_name}</h1>

//             {/* PRICE INFORMATION */}
//             <div className="price-info">
//               <div className="price-row">
//                 <span className="price">₹{pricing.price.toFixed(2)}</span>
//                 {pricing.mrp > pricing.price && (
//                   <>
//                     <span className="mrp">₹{pricing.mrp.toFixed(2)}</span>
//                     <span className="off">{pricing.discount}% OFF</span>
//                   </>
//                 )}
//               </div>
              
//               <div className="sku-stock-info">
//                 <p className="sku">SKU: {selectedVariant.sku}</p>
//                 <p className="stock">Stock Available: {selectedVariant.stock}</p>
//               </div>
//             </div>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h3>Product Attributes</h3>
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
//                 <h3>Variant Details</h3>
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
//         </div>

//                  {/* ========== RIGHT : BUY BOX ========== */} 
//            <div className="buy-box">
//             <div className="price-row">
//               <span className="price">₹{pricing.price.toFixed(2)}</span>
//                {pricing.mrp > pricing.price && (
//                  <>
//                    <span className="mrp">₹{pricing.mrp.toFixed(2)}</span>
//                    <span className="off">{pricing.discount}% OFF</span>
//                  </>
//                )}
//              </div>

//             <p className="unit">SKU: {selectedVariant.sku}</p>

//              <div className="qty">
//                <button onClick={() => setQty(q => q - 1)} disabled={qty === 1}>
//                  −
//                </button>
//                <span>{qty}</span>
//                <button
//                  onClick={() => setQty(q => q + 1)}
//                  disabled={qty >= selectedVariant.stock}
//                >
//                  +
//                </button>
//             </div>

//              <button className="cart-btn">ADD TO CART</button>

//              <p className="secure">
//                Stock Available: {selectedVariant.stock}
//              </p>
//            </div>
//          </div>

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



//================================================================

// Addded Add to cart option 

// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import { Share2 } from "lucide-react";

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
//   const [showCopyAlert, setShowCopyAlert] = useState(false);

//   /* ================= SHARE FUNCTIONALITY ================= */
//   const handleShareClick = () => {
//     const currentUrl = window.location.href;
    
//     navigator.clipboard.writeText(currentUrl)
//       .then(() => {
//         // Show custom alert/notification
//         setShowCopyAlert(true);
        
//         // Auto-hide after 3 seconds
//         setTimeout(() => {
//           setShowCopyAlert(false);
//         }, 3000);
//       })
//       .catch((err) => {
//         console.error("Failed to copy URL: ", err);
//         // Fallback for browsers that don't support clipboard API
//         const textArea = document.createElement("textarea");
//         textArea.value = currentUrl;
//         document.body.appendChild(textArea);
//         textArea.select();
//         try {
//           document.execCommand("copy");
//           setShowCopyAlert(true);
//           setTimeout(() => {
//             setShowCopyAlert(false);
//           }, 3000);
//         } catch (err) {
//           // Show error message
//           alert("Failed to copy URL. Please copy it manually: " + currentUrl);
//         }
//         document.body.removeChild(textArea);
//       });
//   };

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
//         <WebsiteNavbar />
//         <div className="text-center py-5">Loading product...</div>
//       </>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <>
//         <WebsiteNavbar />
//         <div className="text-center py-5 text-danger">{error}</div>
//       </>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <>
//       <WebsiteNavbar />
//       <ShopHeader businessId={product.business} />

//       {/* Copy Alert Notification */}
//       {showCopyAlert && (
//         <div className="product-copy-alert">
//           <div className="product-copy-alert-content">
//             <span className="product-copy-alert-icon">✓</span>
//             <span className="product-copy-alert-text">Product link copied!</span>
//           </div>
//         </div>
//       )}

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

//               <div className="floating-icons">
//                 <div 
//                   className="icon-circle" 
//                   onClick={handleShareClick}
//                   style={{ cursor: "pointer" }}
//                   title="Share product URL"
//                 >
//                   <Share2 size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section">
//             <h1>{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h3>Product Attributes</h3>
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
//                 <h3>Variant Details</h3>
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
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
import "./ProductDetails.css";
import { baseurl } from "../BaseURL/BaseURL";
import { Share2, ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";

const WebProductDetails = () => {
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
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  /* ================= SHARE FUNCTIONALITY ================= */
  const handleShareClick = () => {
    const currentUrl = window.location.href;
    
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setShowCopyAlert(true);
        setTimeout(() => {
          setShowCopyAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          setShowCopyAlert(true);
          setTimeout(() => {
            setShowCopyAlert(false);
          }, 3000);
        } catch (err) {
          alert("Failed to copy URL. Please copy it manually: " + currentUrl);
        }
        document.body.removeChild(textArea);
      });
  };

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

  /* ================= ADD TO CART FUNCTION ================= */
  const handleAddToCart = () => {
    if (!selectedVariant || !product) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Product information is missing',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    // Validate stock
    if (selectedVariant.stock <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Out of Stock',
        text: 'This product is currently out of stock',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    if (qty > selectedVariant.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Insufficient Stock',
        text: `Only ${selectedVariant.stock} units available`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    // Validate price
    if (isNaN(pricing.price) || pricing.price <= 0) {
      console.error(
        "Attempted to add item with invalid price:",
        product.product_name,
        pricing.price
      );
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Product price is invalid',
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
      variant_id: selectedVariant.id,
      name: product.product_name,
      description: product.description,
      image: selectedImage,
      mrp: pricing.mrp,
      price: pricing.price,
      quantity: qty,
      sku: selectedVariant.sku,
      attributes: selectedVariant.attributes || {},
      product_attributes: product.attributes || {},
      addedAt: new Date().toISOString(),
      // Add business_id if available for checkout context
      business_id: product.business,
      stock: selectedVariant.stock
    };

    // Check if item already exists in cart (same variant)
    const existingItemIndex = guestCart.findIndex(
      item => item.variant_id === selectedVariant.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const newQty = guestCart[existingItemIndex].quantity + qty;
      
      // Check stock for updated quantity
      if (newQty > selectedVariant.stock) {
        Swal.fire({
          icon: 'error',
          title: 'Stock Limit Exceeded',
          text: `Cannot add more than ${selectedVariant.stock} units`,
          confirmButtonText: 'OK',
          confirmButtonColor: '#f76f2f',
        });
        return;
      }
      
      guestCart[existingItemIndex].quantity = newQty;
      guestCart[existingItemIndex].addedAt = new Date().toISOString();
    } else {
      // Add new item to cart
      guestCart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem("website_guest_cart", JSON.stringify(guestCart));

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      html: `<strong>${product.product_name}</strong> has been added to your cart.`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'View Cart',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#f76f2f',
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to cart page (you'll need to create this route)
        window.location.href = '/cart';
      }
    });

    // Optional: Trigger cart update event for navbar
    window.dispatchEvent(new Event('cartUpdated'));
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="text-center py-5">Loading product...</div>
      </>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <>
        <WebsiteNavbar />
        <div className="text-center py-5 text-danger">{error}</div>
      </>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <WebsiteNavbar />
      <ShopHeader businessId={product.business} />

      {/* Copy Alert Notification */}
      {showCopyAlert && (
        <div className="product-copy-alert">
          <div className="product-copy-alert-content">
            <span className="product-copy-alert-icon">✓</span>
            <span className="product-copy-alert-text">Product link copied!</span>
          </div>
        </div>
      )}

      <div className="product-wrapper">
        <div className="product-layout">
          {/* ========== LEFT : IMAGES ========== */}
          <div className="image-section">
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

            <div className="main-image-box">
              <img src={selectedImage} alt={product.product_name} />

              <div className="floating-icons">
                <div 
                  className="icon-circle" 
                  onClick={handleShareClick}
                  style={{ cursor: "pointer" }}
                  title="Share product URL"
                >
                  <Share2 size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* ========== MIDDLE : DETAILS ========== */}
          <div className="details-section">
            <h1>{product.product_name}</h1>

            {product.description && (
              <p className="desc">{product.description}</p>
            )}

            {/* PRODUCT ATTRIBUTES */}
            {product.attributes && (
              <>
                <h3>Product Attributes</h3>
                <div className="attributes">
                  {Object.entries(product.attributes).map(([k, v]) => (
                    <div key={k}>
                      <span>{k.replace(/_/g, " ")}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* VARIANT ATTRIBUTES */}
            {selectedVariant.attributes && (
              <>
                <h3>Variant Details</h3>
                <div className="attributes">
                  {Object.entries(selectedVariant.attributes).map(([k, v]) => (
                    <div key={k}>
                      <span>{k.replace(/_/g, " ")}</span>
                      <span>{v}</span>
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
            <p className="stock-status">
              {selectedVariant.stock > 10 
                ? "In Stock" 
                : selectedVariant.stock > 0 
                  ? `Only ${selectedVariant.stock} left` 
                  : "Out of Stock"}
            </p>

            <div className="qty">
              <button onClick={() => setQty(q => q - 1)} disabled={qty === 1}>
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                disabled={qty >= selectedVariant.stock}
              >
                +
              </button>
            </div>

            <button 
              className="cart-btn"
              onClick={handleAddToCart}
              disabled={selectedVariant.stock <= 0}
            >
              <ShoppingCart size={18} style={{ marginRight: '8px' }} />
              ADD TO CART
            </button>

            <p className="secure">
              <span style={{ color: selectedVariant.stock > 0 ? 'green' : 'red' }}>
                {selectedVariant.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
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

export default WebProductDetails;

