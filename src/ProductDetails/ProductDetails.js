import React, { useState } from "react";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import "./ProductDetails.css";

const images = [
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811" },
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" },
];

const ProductDetails = () => {
    
  const [selectedImage, setSelectedImage] = useState(images[0].image);
  const [qty, setQty] = useState(1);
  const [openAbout, setOpenAbout] = useState(false);
const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <WebsiteNavbar />

      <div className="product-wrapper">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          Home / Electronics / Printer
        </div>

        <div className="product-layout">

       {/* LEFT – IMAGE SECTION */}
    <div className="image-section">
      {/* Thumbnails */}
      <div className="thumbnail-list">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumb-box ${
              selectedImage === img.image ? "active" : ""
            }`}
            onClick={() => setSelectedImage(img.image)}
          >
            <img src={img.image} alt="thumbnail" />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image-box">
        <img src={selectedImage} alt="product" />

        <div className="floating-icons">
          <div className="icon-circle">♡</div>
          <div className="icon-circle">↗</div>
        </div>
  </div>
</div>



          {/* MIDDLE – DETAILS */}
          <div className="details-section">
            <a href="/" className="store-link">
              Visit the Om Systems Store
            </a>

            <h1>Epson EcoTank L8050</h1>
            <p className="review">Be the first to review this product</p>

            <p className="desc">
              Presenting cost-effective borderless A4 photo printing solutions
              perfectly suited for design drawing, stunning photos, and versatile
              media printing, with the Epson L8050 Superb Savings and Page Yield:
              High capacity integrated ink tanks and high...
              <span> Read More</span>
            </p>

            <h3>Key Attributes</h3>

            <div className="attributes">
              <div><span>Country Of Origin</span><span>Indonesia</span></div>
              <div><span>Warranty</span><span>1 year</span></div>
              <div><span>Model</span><span>Epson EcoTank L8050</span></div>
              <div><span>Brand</span><span>Epson India Pvt. Ltd.</span></div>
              <div><span>Net Quantity</span><span>1 unit</span></div>
              <div><span>Manufacturer</span><span>PT.EPSON BATAM</span></div>
            </div>

            <a href="/" className="view-all">View full attributes</a>
          </div>

          

       {/* RIGHT – BUY BOX */}
<div className="buy-box">

  {/* Price */}
  <div className="price-row">
    <span className="price">₹21,199</span>
    <span className="mrp">₹26,999</span>
    <span className="off">21%</span>
  </div>

  <p className="unit">1 unit</p>

  {/* Quantity */}
  <div className="qty">
    <button onClick={() => setQty(qty - 1)} disabled={qty === 1}>−</button>
    <span>{qty}</span>
    <button onClick={() => setQty(qty + 1)}>+</button>
  </div>

  <button className="cart-btn">ADD TO CART</button>

  {/* Seller Card */}
  <div className="seller-card">
    <div>
      <p><strong>Sold By:</strong> <span className="seller-name">Om Systems</span></p>
      <p className="vendor">Vendor Source: <span>Mystore</span></p>
      <p className="rating">★ No Ratings Yet</p>
    </div>
    <span className="arrow">›</span>
  </div>

  <p className="other-sellers">Other sellers on Mystore →</p>

  {/* EMI */}
  <div className="payment-card">
    <p><strong>EMI from ₹745/month</strong></p>
    <div className="payment-footer">
      <span>💳 💳 💳 & more</span>
      <span className="link">View plans</span>
    </div>
  </div>

  {/* Pay Later */}
  <div className="payment-card">
    <p><strong>Pay later available</strong></p>
    <div className="payment-footer">
      <span>▶ & more</span>
      <span className="link">View options</span>
    </div>
  </div>

  <p className="secure">Secured by <strong>Razorpay</strong></p>

  {/* Policies */}
  <div className="policies">
    <div>🚚 Not Cancellable</div>
    <div>📦 Not Returnable</div>
  </div>

  <hr />

  {/* QR */}
  <div className="qr-actions">
    <span>⬇ Download QR</span>
    <span>↗ Share</span>
  </div>
</div>


        </div>
      </div>


    </>
  );
};

export default ProductDetails;
