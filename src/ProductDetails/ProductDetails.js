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




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import "./ProductDetails.css";
import { baseurl } from "../BaseURL/BaseURL";

const ProductDetails = () => {
  const { id } = useParams(); // product_id from URL

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [openAbout, setOpenAbout] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    setLoading(true);

    fetch(`${baseurl}/products/?product_id=${id}`)
      .then(res => res.json())
      .then(data => {
        const prod = data.results?.[0];
        setProduct(prod);

        // Set primary image
        if (prod?.media?.length > 0) {
          const primary =
            prod.media.find(m => m.is_primary) || prod.media[0];
          setSelectedImage(`${baseurl}${primary.file}`);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <>
        <WebsiteNavbar />
        <div className="text-center py-5">Loading product...</div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <WebsiteNavbar />
        <div className="text-center py-5">Product not found</div>
      </>
    );
  }

  const variant = product.variants?.[0];
  const mrp = parseFloat(variant?.mrp || 0);
  const price = parseFloat(variant?.selling_price || 0);
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <>
      <WebsiteNavbar />

      <div className="product-wrapper">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          Home / Products / {product.product_name}
        </div>

        <div className="product-layout">

          {/* LEFT – IMAGE SECTION */}
          <div className="image-section">
            <div className="thumbnail-list">
              {product.media?.map((img, index) => (
                <div
                  key={index}
                  className={`thumb-box ${
                    selectedImage === `${baseurl}${img.file}` ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(`${baseurl}${img.file}`)}
                >
                  <img src={`${baseurl}${img.file}`} alt="thumb" />
                </div>
              ))}
            </div>

            <div className="main-image-box">
              <img src={selectedImage} alt={product.product_name} />
            </div>
          </div>

          {/* MIDDLE – DETAILS */}
          <div className="details-section">
            <p className="store-link">
              Visit the {product.brand || "Store"}
            </p>

            <h1>{product.product_name}</h1>

            <p className="desc">
              {product.description}
            </p>

            <h3>Key Attributes</h3>

            <div className="attributes">
              {product.attributes &&
                Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key}>
                    <span>{key.replace("_", " ")}</span>
                    <span>{value}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* RIGHT – BUY BOX */}
          <div className="buy-box">
            <div className="price-row">
              <span className="price">₹{price}</span>
              {mrp > price && (
                <>
                  <span className="mrp">₹{mrp}</span>
                  <span className="off">{discount}%</span>
                </>
              )}
            </div>

            <p className="unit">1 unit</p>

            <div className="qty">
              <button onClick={() => setQty(qty - 1)} disabled={qty === 1}>
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                disabled={qty >= variant?.stock}
              >
                +
              </button>
            </div>

            <button className="cart-btn">ADD TO CART</button>

            <p className="secure">
              Stock Available: {variant?.stock || 0}
            </p>
          </div>
        </div>

        {/* ================= ABOUT & DETAILS ================= */}
        <div className="product-info-row">

          {/* ABOUT PRODUCT */}
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
                <p>{product.description}</p>
              </div>
            )}
          </div>

          {/* PRODUCT DETAILS */}
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
                    {variant &&
                      Object.entries(variant.attributes || {}).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
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
