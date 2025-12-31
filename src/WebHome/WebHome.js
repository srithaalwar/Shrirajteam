import React from "react";
import "./WebHome.css";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessIcon from "@mui/icons-material/Business";
import HandshakeIcon from "@mui/icons-material/Handshake";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ConstructionIcon from "@mui/icons-material/Construction";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


const categories = [
  { name: "Residential Projects", icon: <ApartmentIcon /> },
  { name: "Commercial Projects", icon: <BusinessIcon /> },
  { name: "Co-working Spaces", icon: <HandshakeIcon /> },
  { name: "Office Leasing", icon: <WorkOutlineIcon /> },
  { name: "Retail Spaces", icon: <StorefrontIcon /> },
  { name: "Industrial Units", icon: <ConstructionIcon /> },
  { name: "Land Investments", icon: <PublicIcon /> },
  { name: "Smart Buildings", icon: <LocationCityIcon /> },
  { name: "Business Assets", icon: <BusinessCenterIcon /> },
  { name: "High-Return Deals", icon: <TrendingUpIcon /> },
];


const products = [
  {
    name: "3 BHK Luxury Apartment – Jubilee Hills",
    price: 8500000,
    oldPrice: 9500000,
    discount: "10%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    name: "Independent Villa with Garden – Gachibowli",
    price: 14500000,
    oldPrice: 16500000,
    discount: "12%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  },
  {
    name: "2 BHK Affordable Flat – Kukatpally",
    price: 4800000,
    oldPrice: 5200000,
    discount: "8%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  },
  {
    name: "Commercial Office Space – HITEC City",
    price: 22000000,
    oldPrice: 25000000,
    discount: "12%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
  },
  {
    name: "Residential Plot – Shadnagar",
    price: 3200000,
    oldPrice: 3800000,
    discount: "16%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },

];

const businessDeals = [
  {
    name: "IT Services & Software Solutions",
    discount: "15%",
    button: "VIEW",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786",
  },
  {
    name: "Manufacturing & Industrial Supplies",
    discount: "25%",
    button: "VIEW",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
  },
  {
    name: "Wholesale Grocery Distribution",
    discount: "30%",
    button: "VIEW",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Logistics & Supply Chain Services",
    discount: "20%",
    button: "VIEW",
    image: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311",
  },
  {
    name: "Construction & Infrastructure Projects",
    discount: "18%",
    button: "VIEW",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },

];

const productDealsData = [
  {
    name: "Smart Fitness Watch",
    price: 4499,
    oldPrice: 5999,
    discount: "25%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smart Fitness Watch",
    price: 4499,
    oldPrice: 5999,
    discount: "25%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smart Fitness Watch",
    price: 4499,
    oldPrice: 5999,
    discount: "25%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smart Fitness Watch",
    price: 4499,
    oldPrice: 5999,
    discount: "25%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Smart Fitness Watch",
    price: 4499,
    oldPrice: 5999,
    discount: "25%",
    button: "ADD",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
];


const WebHome = () => {
  return (
    <div>
      <WebsiteNavbar/>
    <div className="webhome-container">

      {/* Categories */}
      <div className="categories-row">
        {categories.map((cat, i) => (
          <div className="category-item" key={i}>
            <div className="category-icon">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

   <h2 className="section-title">Property Deals</h2>


  <div className="products-row no-scrollbar" id="propertyRow">
    {products.map((item, index) => (
      <div className="product-card" key={index}>
        <div className="discount-badge">{item.discount}</div>

        <img src={item.image} alt={item.name} />

        <button
          className={`card-btn ${
            item.button === "ADD"
              ? "add"
              : item.button === "VIEW"
              ? "view"
              : "closed"
          }`}
        >
          {item.button}
        </button>

        <div className="product-info">
          <p className="product-name">{item.name}</p>

          <div className="price-row">
            <span className="price">₹{item.price}</span>
            <span className="old-price">₹{item.oldPrice}</span>
          </div>
        </div>
      </div>
    ))}
  </div>

 

      {/* ===== HOME DEALS CAROUSEL (SAFE CSS) ===== */}
<div className="hdc-carousel">

  <button className="hdc-arrow hdc-left">‹</button>

  <div className="hdc-wrapper">

    {/* LEFT CONTENT */}
    <div className="hdc-left">
      

      <h1>
        Big Savings on <br /> Daily Deals!
      </h1>

      <p>
        Shop Across Categories and Enjoy <br />
        Unbeatable Prices on Your Favorite Products
      </p>

      <button className="hdc-btn">SHOP NOW</button>
    </div>

    {/* RIGHT IMAGES */}
    <div className="hdc-right">
      <div className="hdc-image-grid">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" />
        <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" />
        
      </div>

      <div className="hdc-off-badge">
        UPTO <br />
        <span>90%</span> <br />
        OFF
      </div>
    </div>

  </div>

  <button className="hdc-arrow hdc-right">›</button>

  <div className="hdc-dots">
    <span className="hdc-dot active"></span>
    <span className="hdc-dot"></span>
    <span className="hdc-dot"></span>
    <span className="hdc-dot"></span>
  </div>
</div>



{/* Bussiness */}

<h2 className="section-title">Bussiness Deals</h2>

<div className="products-row">
  {businessDeals.map((item, index) => (
    <div className="product-card" key={index}>
      <div className="discount-badge">{item.discount}</div>

      <img src={item.image} alt={item.name} />

      <button
        className={`card-btn ${
          item.button === "ADD"
            ? "add"
            : item.button === "VIEW"
            ? "view"
            : "closed"
        }`}
      >
        {item.button}
      </button>

      <div className="product-info">
        <p className="product-name">{item.name}</p>
      </div>
    </div>
  ))}
</div>



<h2 className="deals-heading">Products</h2>

<div className="products-row">
  {productDealsData.map((item, index) => (
    <div className="product-card" key={index}>
      <div className="discount-badge">{item.discount}</div>

      <img src={item.image} alt={item.name} />

      <button
        className={`card-btn ${
          item.button === "ADD"
            ? "add"
            : item.button === "VIEW"
            ? "view"
            : "closed"
        }`}
      >
        {item.button}
      </button>

      <div className="product-info">
        <p className="product-name">{item.name}</p>

        <div className="price-row">
          <span className="price">₹{item.price.toLocaleString()}</span>
          <span className="old-price">
            ₹{item.oldPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>







    </div>
    </div>

  );
};

export default WebHome;
