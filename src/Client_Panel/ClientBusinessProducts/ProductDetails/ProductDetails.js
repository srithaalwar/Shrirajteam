
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





// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import ClientNavbar from "../../../Client_Panel/Client_Navbar/Client_Navbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../../../BaseURL/BaseURL";

// const ProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams();
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
//       <ShopHeader businessId={product.business} />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ========== LEFT : IMAGES ========== */}
//           <div className="image-section">
//             {/* Thumbnails Container with Scroll */}
//             <div className="thumbnail-list-container">
//               <div className="thumbnail-list">
//                 {(selectedVariant.media || []).map((img, index) => {
//                   const imgUrl = `${baseurl}${img.file}`;
//                   return (
//                     <div
//                       key={index}
//                       className={`thumb-box ${selectedImage === imgUrl ? "active" : ""}`}
//                       onClick={() => setSelectedImage(imgUrl)}
//                     >
//                       <img src={imgUrl} alt="thumb" />
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Scroll Indicator (only shows when there are more than 5 images) */}
//               {(selectedVariant.media || []).length > 5 && (
//                 <div className="scroll-indicator">
//                   <span>↓</span>
//                 </div>
//               )}
//             </div>

//             {/* Main Image */}
//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
//               <div className="floating-icons">
//                 <div className="icon-circle">❤️</div>
//                 <div className="icon-circle">↗️</div>
//               </div>
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
//                 <h2>Product Attributes</h2>
//                 <div className="attributes">
//                   {Object.entries(product.attributes).map(([k, v]) => (
//                     <div key={k} className="attribute-row">
//                       <span className="attribute-key">{k.replace(/_/g, " ")}</span>
//                       <span className="attribute-value">{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* VARIANT ATTRIBUTES */}
//             {selectedVariant.attributes && (
//               <>
//                 <h2>Variant Details</h2>
//                 <div className="attributes">
//                   {Object.entries(selectedVariant.attributes).map(([k, v]) => (
//                     <div key={k} className="attribute-row">
//                       <span className="attribute-key">{k.replace(/_/g, " ")}</span>
//                       <span className="attribute-value">{v}</span>
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
//               <button 
//                 className="qty-btn minus" 
//                 onClick={() => setQty(q => Math.max(1, q - 1))}
//               >
//                 −
//               </button>
//               <span className="qty-value">{qty}</span>
//               <button 
//                 className="qty-btn plus"
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
// import axios from "axios";
// import ClientNavbar from "../../../Client_Panel/Client_Navbar/Client_Navbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import {
//   Heart,
//   Share2,
  
// } from "lucide-react";

// const ClientProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant");
//   const [isFavorite, setIsFavorite] = useState(false);

//   /* ================= STATE ================= */
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
//   /* ================= NEW STATES FOR DYNAMIC FUNCTIONALITY ================= */
//   const [wishlist, setWishlist] = useState([]); // Array of wishlist items
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartLoading, setCartLoading] = useState(false);
//   const [cartItemId, setCartItemId] = useState(null); // To track existing cart item ID
//   const [cartQuantity, setCartQuantity] = useState(0); // Quantity in cart
  
//   // Get user from localStorage
//   const userId = localStorage.getItem("user_id");

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

//   /* ================= FETCH WISHLIST ================= */
//   useEffect(() => {
//     if (!userId || !selectedVariant) return;

//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
        
//         // Check if current variant is in wishlist
//         const wishlistItems = response.data || [];
//         setWishlist(wishlistItems);
        
//         // Check if current variant is in wishlist
//         const isVariantInWishlist = wishlistItems.some(
//           item => item.variant === selectedVariant.id
//         );
        
//         setIsInWishlist(isVariantInWishlist);
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//       }
//     };

//     fetchWishlist();
//   }, [userId, selectedVariant]);

//   /* ================= FETCH CART ITEMS ================= */
//   useEffect(() => {
//     if (!userId || !selectedVariant) return;

//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/cart/`);
        
//         // Filter cart items for current user
//         const userCartItems = response.data.filter(
//           item => item.user === parseInt(userId)
//         );
        
//         setCartItems(userCartItems);
        
//         // Check if current variant is in cart
//         const cartItem = userCartItems.find(
//           item => item.variant === selectedVariant.id
//         );
        
//         if (cartItem) {
//           setIsInCart(true);
//           setCartItemId(cartItem.id);
//           setCartQuantity(cartItem.quantity);
//         } else {
//           setIsInCart(false);
//           setCartItemId(null);
//           setCartQuantity(0);
//         }
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, [userId, selectedVariant]);

//   /* ================= WISHLIST FUNCTIONS ================= */
//   const handleWishlistToggle = async () => {
//     if (!userId) {
//       alert("Please login to add items to wishlist");
//       return;
//     }

//     if (!selectedVariant) return;

//     setWishlistLoading(true);
    
//     try {
//       if (isInWishlist) {
//         // Find wishlist item ID to delete
//         const wishlistItem = wishlist.find(
//           item => item.variant === selectedVariant.id && item.user === parseInt(userId)
//         );
        
//         if (wishlistItem) {
//           await axios.delete(`${baseurl}/wishlist/${wishlistItem.id}/`);
//           setIsInWishlist(false);
          
//           // Update local wishlist state
//           setWishlist(prev => prev.filter(item => item.id !== wishlistItem.id));
          
//           alert("Removed from wishlist");
//         }
//       } else {
//         // Add to wishlist
//         const response = await axios.post(`${baseurl}/wishlist/`, {
//           user: parseInt(userId),
//           variant: selectedVariant.id
//         });
        
//         setIsInWishlist(true);
        
//         // Add new item to local wishlist state
//         setWishlist(prev => [...prev, response.data]);
        
//         alert("Added to wishlist");
//       }
//     } catch (error) {
//       console.error("Error toggling wishlist:", error);
//       alert("Failed to update wishlist. Please try again.");
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   /* ================= CART FUNCTIONS ================= */
//   const handleAddToCart = async () => {
//     if (!userId) {
//       alert("Please login to add items to cart");
//       return;
//     }

//     if (!selectedVariant) return;
    
//     if (qty > selectedVariant.stock) {
//       alert(`Only ${selectedVariant.stock} items available in stock`);
//       return;
//     }

//     setCartLoading(true);
    
//     try {
//       if (isInCart && cartItemId) {
//         // Update existing cart item
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, {
//           user: parseInt(userId),
//           variant: selectedVariant.id,
//           quantity: qty
//         });
        
//         setCartQuantity(qty);
//         alert(`Cart updated to ${qty} items`);
//       } else {
//         // Add new item to cart
//         const response = await axios.post(`${baseurl}/cart/`, {
//           user: parseInt(userId),
//           variant: selectedVariant.id,
//           quantity: qty
//         });
        
//         setIsInCart(true);
//         setCartItemId(response.data.id);
//         setCartQuantity(qty);
        
//         // Add to local cart state
//         setCartItems(prev => [...prev, response.data]);
        
//         alert("Added to cart successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating cart:", error);
//       alert("Failed to update cart. Please try again.");
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   const handleRemoveFromCart = async () => {
//     if (!userId || !cartItemId) return;
    
//     setCartLoading(true);
    
//     try {
//       await axios.delete(`${baseurl}/cart/${cartItemId}/`);
      
//       setIsInCart(false);
//       setCartItemId(null);
//       setCartQuantity(0);
      
//       // Remove from local cart state
//       setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
//       alert("Removed from cart");
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//       alert("Failed to remove from cart. Please try again.");
//     } finally {
//       setCartLoading(false);
//     }
//   };

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
//       <ShopHeader businessId={product.business} />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ========== LEFT : IMAGES ========== */}
//           <div className="image-section">
//             {/* Thumbnails Container with Scroll */}
//             <div className="thumbnail-list-container">
//               <div className="thumbnail-list">
//                 {(selectedVariant.media || []).map((img, index) => {
//                   const imgUrl = `${baseurl}${img.file}`;
//                   return (
//                     <div
//                       key={index}
//                       className={`thumb-box ${selectedImage === imgUrl ? "active" : ""}`}
//                       onClick={() => setSelectedImage(imgUrl)}
//                     >
//                       <img src={imgUrl} alt="thumb" />
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Scroll Indicator (only shows when there are more than 5 images) */}
//               {(selectedVariant.media || []).length > 5 && (
//                 <div className="scroll-indicator">
//                   <span>↓</span>
//                 </div>
//               )}
//             </div>

//             {/* Main Image */}
//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
//               {/* <div className="floating-icons">
                
//                 <div 
//                   className={`icon-circle ${isInWishlist ? 'active' : ''}`}
//                   onClick={handleWishlistToggle}
//                   style={{ 
//                     cursor: wishlistLoading ? 'not-allowed' : 'pointer',
//                     opacity: wishlistLoading ? 0.7 : 1
//                   }}
//                 >
//                   {isInWishlist ? '❤️' : '🤍'}
//                 </div>
                
                
//                 <div className="icon-circle" title="Share">
//                   ↗️
//                 </div>
//               </div> */}

//               <div className="floating-icons">
//                 <div 
//                   className="icon-circle"
//                   onClick={() => setIsFavorite(!isFavorite)}
//                   style={{ color: isFavorite ? '#ff2e93' : '#666' }}
//                 >
//                   <Heart size={20} fill={isFavorite ? '#ff2e93' : 'none'} />
//                 </div>
//                 <div className="icon-circle">
//                   <Share2 size={20} />
//                 </div>
//               </div>
              
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section product-details-section">
            

//             <h1>{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h2>Product Attributes</h2>
//                 <div className="attributes">
//                   {Object.entries(product.attributes).map(([k, v]) => (
//                     <div key={k} className="attribute-row">
//                       <span className="attribute-key">{k.replace(/_/g, " ")}</span>
//                       <span className="attribute-value">{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* VARIANT ATTRIBUTES */}
//             {selectedVariant.attributes && (
//               <>
//                 <h2>Variant Details</h2>
//                 <div className="attributes">
//                   {Object.entries(selectedVariant.attributes).map(([k, v]) => (
//                     <div key={k} className="attribute-row">
//                       <span className="attribute-key">{k.replace(/_/g, " ")}</span>
//                       <span className="attribute-value">{v}</span>
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
//               <button 
//                 className="qty-btn minus" 
//                 onClick={() => setQty(q => Math.max(1, q - 1))}
//                 disabled={cartLoading}
//               >
//                 −
//               </button>
//               <span className="qty-value">{qty}</span>
//               <button 
//                 className="qty-btn plus"
//                 onClick={() => setQty(q => q + 1)}
//                 disabled={qty >= selectedVariant.stock || cartLoading}
//               >
//                 +
//               </button>
//             </div>

//             {/* Cart Buttons - Now Dynamic */}
//             <div className="cart-actions">
//               {isInCart ? (
//                 <div className="cart-buttons-group">
//                   <button 
//                     className="cart-btn update-cart"
//                     onClick={handleAddToCart}
//                     disabled={cartLoading}
//                   >
//                     {cartLoading ? 'UPDATING...' : `UPDATE CART (${cartQuantity})`}
//                   </button>
//                   {/* <button 
//                     className="cart-btn remove-cart"
//                     onClick={handleRemoveFromCart}
//                     disabled={cartLoading}
//                   >
//                     REMOVE
//                   </button> */}
//                 </div>
//               ) : (
//                 <button 
//                   className="cart-btn add-cart"
//                   onClick={handleAddToCart}
//                   disabled={cartLoading}
//                 >
//                   {cartLoading ? 'ADDING...' : 'ADD TO CART'}
//                 </button>
//               )}
//             </div>

//             <p className="secure">
//               Stock Available: {selectedVariant.stock}
//             </p>
            
//             {/* Show if item is already in cart */}
//             {isInCart && (
//               <p className="cart-info">
//                 Already in cart: {cartQuantity} item{cartQuantity !== 1 ? 's' : ''}
//               </p>
//             )}
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

// export default ClientProductDetails;




// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import ClientNavbar from "../../../Client_Panel/Client_Navbar/Client_Navbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import { Heart, Share2 } from "lucide-react";

// const ClientProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams();
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
  
//   /* ================= NEW STATES FOR DYNAMIC FUNCTIONALITY ================= */
//   const [wishlist, setWishlist] = useState([]); // Array of wishlist items
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [wishlistLoading, setWishlistLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartLoading, setCartLoading] = useState(false);
//   const [cartItemId, setCartItemId] = useState(null); // To track existing cart item ID
//   const [cartQuantity, setCartQuantity] = useState(0); // Quantity in cart
  
//   // Get user from localStorage
//   const userId = localStorage.getItem("user_id");

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

//   /* ================= FETCH WISHLIST ================= */
//   useEffect(() => {
//     if (!userId || !selectedVariant) return;

//     const fetchWishlist = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
//         console.log("📋 Wishlist API Response:", response.data);
        
//         // Handle paginated response - get items from results array
//         const wishlistResponse = response.data;
//         let wishlistItems = [];
        
//         if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
//           // Get items from results array
//           wishlistItems = wishlistResponse.results;
//         } else if (Array.isArray(wishlistResponse)) {
//           // If response is already an array
//           wishlistItems = wishlistResponse;
//         }
        
//         console.log("📋 Wishlist items:", wishlistItems);
//         setWishlist(wishlistItems);
        
//         // Check if current variant is in wishlist
//         const isVariantInWishlist = wishlistItems.some(
//           item => item.variant === selectedVariant.id
//         );
        
//         console.log("📋 Is variant in wishlist:", isVariantInWishlist, "for variant:", selectedVariant.id);
//         setIsInWishlist(isVariantInWishlist);
        
//       } catch (error) {
//         console.error("Error fetching wishlist:", error);
//         if (error.response) {
//           console.error("Error response status:", error.response.status);
//           console.error("Error response data:", error.response.data);
//         }
//       }
//     };

//     fetchWishlist();
//   }, [userId, selectedVariant]);

//   /* ================= FETCH CART ITEMS ================= */
//   useEffect(() => {
//     if (!userId || !selectedVariant) return;

//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/cart/`);
//         console.log("🛒 Cart API Response:", response.data);
        
//         // Handle paginated response - get items from results array
//         const cartResponse = response.data;
//         let userCartItems = [];
        
//         if (cartResponse.results && Array.isArray(cartResponse.results)) {
//           userCartItems = cartResponse.results;
//         } else if (Array.isArray(cartResponse)) {
//           userCartItems = cartResponse;
//         }
        
//         console.log("🛒 User cart items:", userCartItems);
//         setCartItems(userCartItems);
        
//         // Check if current variant is in cart
//         const cartItem = userCartItems.find(
//           item => item.variant === selectedVariant.id
//         );
        
//         if (cartItem) {
//           setIsInCart(true);
//           setCartItemId(cartItem.id);
//           setCartQuantity(cartItem.quantity);
//           console.log("🛒 Item found in cart:", cartItem);
//         } else {
//           setIsInCart(false);
//           setCartItemId(null);
//           setCartQuantity(0);
//           console.log("🛒 Item not found in cart");
//         }
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//         if (error.response) {
//           console.error("Error response status:", error.response.status);
//           console.error("Error response data:", error.response.data);
//         }
//       }
//     };

//     fetchCartItems();
//   }, [userId, selectedVariant]);

//   /* ================= WISHLIST FUNCTIONS ================= */
//   const handleWishlistToggle = async () => {
//     console.log("❤️ Wishlist toggle clicked");
//     console.log("User ID:", userId);
//     console.log("Selected Variant ID:", selectedVariant?.id);
//     console.log("Is in wishlist:", isInWishlist);
    
//     if (!userId) {
//       alert("Please login to add items to wishlist");
//       return;
//     }

//     if (!selectedVariant) {
//       console.error("No selected variant");
//       return;
//     }

//     setWishlistLoading(true);
    
//     try {
//       if (isInWishlist) {
//         // Find wishlist item ID to delete
//         console.log("Looking for wishlist item to delete...");
//         console.log("Current wishlist:", wishlist);
        
//         const wishlistItem = wishlist.find(
//           item => item.variant === selectedVariant.id && item.user === parseInt(userId)
//         );
        
//         console.log("Found wishlist item to delete:", wishlistItem);
        
//         if (wishlistItem) {
//           console.log(`Deleting wishlist item ${wishlistItem.id}`);
//           await axios.delete(`${baseurl}/wishlist/${wishlistItem.id}/`);
//           setIsInWishlist(false);
          
//           // Update local wishlist state
//           setWishlist(prev => prev.filter(item => item.id !== wishlistItem.id));
          
//           console.log("✅ Removed from wishlist");
//           alert("Removed from wishlist");
//         } else {
//           console.warn("Wishlist item not found for deletion");
//         }
//       } else {
//         // Add to wishlist
//         console.log("Adding to wishlist...");
//         const payload = {
//           user: parseInt(userId),
//           variant: selectedVariant.id
//         };
//         console.log("Wishlist payload:", payload);
        
//         const response = await axios.post(`${baseurl}/wishlist/`, payload);
//         console.log("Wishlist POST response:", response.data);
        
//         setIsInWishlist(true);
        
//         // Add new item to local wishlist state
//         setWishlist(prev => [...prev, response.data]);
        
//         console.log("✅ Added to wishlist");
//         alert("Added to wishlist");
//       }
//     } catch (error) {
//       console.error("❌ Error toggling wishlist:", error);
//       if (error.response) {
//         console.error("Error response status:", error.response.status);
//         console.error("Error response data:", error.response.data);
//       }
//       alert("Failed to update wishlist. Please try again.");
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   /* ================= CART FUNCTIONS ================= */
//   const handleAddToCart = async () => {
//     console.log("🛒 Add to cart clicked");
//     console.log("User ID:", userId);
//     console.log("Selected Variant ID:", selectedVariant?.id);
    
//     if (!userId) {
//       alert("Please login to add items to cart");
//       return;
//     }

//     if (!selectedVariant) {
//       console.error("No selected variant");
//       return;
//     }
    
//     if (qty > selectedVariant.stock) {
//       alert(`Only ${selectedVariant.stock} items available in stock`);
//       return;
//     }

//     setCartLoading(true);
    
//     try {
//       if (isInCart && cartItemId) {
//         // Update existing cart item
//         console.log(`Updating cart item ${cartItemId} to quantity ${qty}`);
//         const payload = {
//           user: parseInt(userId),
//           variant: selectedVariant.id,
//           quantity: qty
//         };
//         console.log("Cart update payload:", payload);
        
//         await axios.put(`${baseurl}/cart/${cartItemId}/`, payload);
        
//         setCartQuantity(qty);
        
//         // Update local cart state
//         setCartItems(prev => prev.map(item => 
//           item.id === cartItemId ? { ...item, quantity: qty } : item
//         ));
        
//         // Dispatch cart update event for navbar
//         window.dispatchEvent(new Event('cartUpdated'));
        
//         console.log("✅ Cart updated");
//         alert(`Cart updated to ${qty} items`);
//       } else {
//         // Add new item to cart
//         console.log("Adding new item to cart");
//         const payload = {
//           user: parseInt(userId),
//           variant: selectedVariant.id,
//           quantity: qty
//         };
//         console.log("Cart POST payload:", payload);
        
//         const response = await axios.post(`${baseurl}/cart/`, payload);
//         console.log("Cart POST response:", response.data);
        
//         setIsInCart(true);
//         setCartItemId(response.data.id);
//         setCartQuantity(qty);
        
//         // Add to local cart state
//         setCartItems(prev => [...prev, response.data]);
        
//         // Dispatch cart update event for navbar
//         window.dispatchEvent(new Event('cartUpdated'));
        
//         console.log("✅ Added to cart");
//         alert("Added to cart successfully!");
//       }
//     } catch (error) {
//       console.error("❌ Error updating cart:", error);
//       if (error.response) {
//         console.error("Error response status:", error.response.status);
//         console.error("Error response data:", error.response.data);
//       }
//       alert("Failed to update cart. Please try again.");
//     } finally {
//       setCartLoading(false);
//     }
//   };

//   const handleRemoveFromCart = async () => {
//     if (!userId || !cartItemId) return;
    
//     setCartLoading(true);
    
//     try {
//       console.log(`Removing cart item ${cartItemId}`);
//       await axios.delete(`${baseurl}/cart/${cartItemId}/`);
      
//       setIsInCart(false);
//       setCartItemId(null);
//       setCartQuantity(0);
      
//       // Remove from local cart state
//       setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
//       // Dispatch cart update event for navbar
//       window.dispatchEvent(new Event('cartUpdated'));
      
//       alert("Removed from cart");
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//       alert("Failed to remove from cart. Please try again.");
//     } finally {
//       setCartLoading(false);
//     }
//   };

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
//       <ShopHeader businessId={product.business} />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ========== LEFT : IMAGES ========== */}
//           <div className="image-section">
//             {/* Thumbnails Container with Scroll */}
//             <div className="thumbnail-list-container">
//               <div className="thumbnail-list">
//                 {(selectedVariant.media || []).map((img, index) => {
//                   const imgUrl = `${baseurl}${img.file}`;
//                   return (
//                     <div
//                       key={index}
//                       className={`thumb-box ${selectedImage === imgUrl ? "active" : ""}`}
//                       onClick={() => setSelectedImage(imgUrl)}
//                     >
//                       <img src={imgUrl} alt="thumb" />
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Scroll Indicator (only shows when there are more than 5 images) */}
//               {(selectedVariant.media || []).length > 5 && (
//                 <div className="scroll-indicator">
//                   <span>↓</span>
//                 </div>
//               )}
//             </div>

//             {/* Main Image */}
//             <div className="main-image-box">
//               <img src={selectedImage} alt={product.product_name} />
              
//               <div className="floating-icons">
//                 {/* Wishlist Icon */}
//                 <div 
//                   className="icon-circle"
//                   onClick={handleWishlistToggle}
//                   style={{ 
//                     cursor: wishlistLoading ? 'not-allowed' : 'pointer',
//                     color: isInWishlist ? '#ff2e93' : '#666',
//                     opacity: wishlistLoading ? 0.7 : 1
//                   }}
//                   title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
//                 >
//                   <Heart 
//                     size={20} 
//                     fill={isInWishlist ? '#ff2e93' : 'none'} 
//                   />
//                 </div>
                
//                 {/* Share Icon */}
//                 <div className="icon-circle" title="Share">
//                   <Share2 size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section product-details-section">
//             <h1>{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && (
//               <>
//                 <h2>Product Attributes</h2>
//                 <div className="attributes">
//                   {Object.entries(product.attributes).map(([k, v]) => (
//                     <div key={k} className="attribute-row">
//                       <span className="attribute-key">{k.replace(/_/g, " ")}</span>
//                       <span className="attribute-value">{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}

//             {/* VARIANT ATTRIBUTES */}
//             {selectedVariant.attributes && (
//               <>
//                 <h2>Variant Details</h2>
//                 <div className="attributes">
//                   {Object.entries(selectedVariant.attributes).map(([k, v]) => (
//                     <div key={k} className="attribute-row">
//                       <span className="attribute-key">{k.replace(/_/g, " ")}</span>
//                       <span className="attribute-value">{v}</span>
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
//               <button 
//                 className="qty-btn minus" 
//                 onClick={() => setQty(q => Math.max(1, q - 1))}
//                 disabled={cartLoading}
//               >
//                 −
//               </button>
//               <span className="qty-value">{qty}</span>
//               <button 
//                 className="qty-btn plus"
//                 onClick={() => setQty(q => q + 1)}
//                 disabled={qty >= selectedVariant.stock || cartLoading}
//               >
//                 +
//               </button>
//             </div>

//             {/* Cart Buttons */}
//             <div className="cart-actions">
//               {isInCart ? (
//                 <div className="cart-buttons-group">
//                   <button 
//                     className="cart-btn update-cart"
//                     onClick={handleAddToCart}
//                     disabled={cartLoading}
//                   >
//                     {cartLoading ? 'UPDATING...' : `UPDATE CART (${cartQuantity})`}
//                   </button>
//                   {/* <button 
//                     className="cart-btn remove-cart"
//                     onClick={handleRemoveFromCart}
//                     disabled={cartLoading}
//                   >
//                     REMOVE
//                   </button> */}
//                 </div>
//               ) : (
//                 <button 
//                   className="cart-btn add-cart"
//                   onClick={handleAddToCart}
//                   disabled={cartLoading}
//                 >
//                   {cartLoading ? 'ADDING...' : 'ADD TO CART'}
//                 </button>
//               )}
//             </div>

//             {/* Wishlist Button */}
//             <button 
//               className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
//               onClick={handleWishlistToggle}
//               disabled={wishlistLoading}
//               style={{
//                 marginTop: '15px',
//                 width: '100%',
//                 padding: '12px',
//                 backgroundColor: isInWishlist ? '#ff2e93' : '#f8f9fa',
//                 color: isInWishlist ? 'white' : '#333',
//                 border: `1px solid ${isInWishlist ? '#ff2e93' : '#ddd'}`,
//                 borderRadius: '4px',
//                 cursor: wishlistLoading ? 'not-allowed' : 'pointer',
//                 fontWeight: '500',
//                 fontSize: '14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '8px',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               {wishlistLoading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm" role="status"></span>
//                   PROCESSING...
//                 </>
//               ) : (
//                 <>
//                   <Heart 
//                     size={16} 
//                     fill={isInWishlist ? 'white' : 'none'} 
//                     color={isInWishlist ? 'white' : '#666'}
//                   />
//                   {isInWishlist ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}
//                 </>
//               )}
//             </button>

//             <p className="secure">
//               Stock Available: {selectedVariant.stock}
//             </p>
            
//             {/* Show if item is already in cart */}
//             {isInCart && (
//               <p className="cart-info">
//                 Already in cart: {cartQuantity} item{cartQuantity !== 1 ? 's' : ''}
//               </p>
//             )}
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

// export default ClientProductDetails;







import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import ClientNavbar from "../../../Client_Panel/Client_Navbar/Client_Navbar";
import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
import "./ProductDetails.css";
import { baseurl } from "../../../BaseURL/BaseURL";
import { Heart, Share2 } from "lucide-react";

const ClientProductDetails = () => {
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
  const [showCopyAlert, setShowCopyAlert] = useState(false); // NEW: Copy alert state
  
  /* ================= NEW STATES FOR DYNAMIC FUNCTIONALITY ================= */
  const [wishlist, setWishlist] = useState([]); // Array of wishlist items
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartItemId, setCartItemId] = useState(null); // To track existing cart item ID
  const [cartQuantity, setCartQuantity] = useState(0); // Quantity in cart
  
  // Get user from localStorage
  const userId = localStorage.getItem("user_id");

  /* ================= SHARE FUNCTIONALITY ================= */
  const handleShareClick = () => {
    // Construct the product URL with variant
    const currentUrl = `${window.location.origin}/product/${productId}/?variant=${variantId || selectedVariant?.id}`;
    
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        // Show custom alert/notification
        setShowCopyAlert(true);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
          setShowCopyAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        // Fallback for browsers that don't support clipboard API
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
          // Show error message
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

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    if (!userId || !selectedVariant) return;

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
        console.log("📋 Wishlist API Response:", response.data);
        
        // Handle paginated response - get items from results array
        const wishlistResponse = response.data;
        let wishlistItems = [];
        
        if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
          // Get items from results array
          wishlistItems = wishlistResponse.results;
        } else if (Array.isArray(wishlistResponse)) {
          // If response is already an array
          wishlistItems = wishlistResponse;
        }
        
        console.log("📋 Wishlist items:", wishlistItems);
        setWishlist(wishlistItems);
        
        // Check if current variant is in wishlist
        const isVariantInWishlist = wishlistItems.some(
          item => item.variant === selectedVariant.id
        );
        
        console.log("📋 Is variant in wishlist:", isVariantInWishlist, "for variant:", selectedVariant.id);
        setIsInWishlist(isVariantInWishlist);
        
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        if (error.response) {
          console.error("Error response status:", error.response.status);
          console.error("Error response data:", error.response.data);
        }
      }
    };

    fetchWishlist();
  }, [userId, selectedVariant]);

  /* ================= FETCH CART ITEMS ================= */
  useEffect(() => {
    if (!userId || !selectedVariant) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${baseurl}/cart/`);
        console.log("🛒 Cart API Response:", response.data);
        
        // Handle paginated response - get items from results array
        const cartResponse = response.data;
        let userCartItems = [];
        
        if (cartResponse.results && Array.isArray(cartResponse.results)) {
          userCartItems = cartResponse.results;
        } else if (Array.isArray(cartResponse)) {
          userCartItems = cartResponse;
        }
        
        console.log("🛒 User cart items:", userCartItems);
        setCartItems(userCartItems);
        
        // Check if current variant is in cart
        const cartItem = userCartItems.find(
          item => item.variant === selectedVariant.id
        );
        
        if (cartItem) {
          setIsInCart(true);
          setCartItemId(cartItem.id);
          setCartQuantity(cartItem.quantity);
          console.log("🛒 Item found in cart:", cartItem);
        } else {
          setIsInCart(false);
          setCartItemId(null);
          setCartQuantity(0);
          console.log("🛒 Item not found in cart");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        if (error.response) {
          console.error("Error response status:", error.response.status);
          console.error("Error response data:", error.response.data);
        }
      }
    };

    fetchCartItems();
  }, [userId, selectedVariant]);

  /* ================= WISHLIST FUNCTIONS ================= */
  const handleWishlistToggle = async () => {
    console.log("❤️ Wishlist toggle clicked");
    console.log("User ID:", userId);
    console.log("Selected Variant ID:", selectedVariant?.id);
    console.log("Is in wishlist:", isInWishlist);
    
    if (!userId) {
      alert("Please login to add items to wishlist");
      return;
    }

    if (!selectedVariant) {
      console.error("No selected variant");
      return;
    }

    setWishlistLoading(true);
    
    try {
      if (isInWishlist) {
        // Find wishlist item ID to delete
        console.log("Looking for wishlist item to delete...");
        console.log("Current wishlist:", wishlist);
        
        const wishlistItem = wishlist.find(
          item => item.variant === selectedVariant.id && item.user === parseInt(userId)
        );
        
        console.log("Found wishlist item to delete:", wishlistItem);
        
        if (wishlistItem) {
          console.log(`Deleting wishlist item ${wishlistItem.id}`);
          await axios.delete(`${baseurl}/wishlist/${wishlistItem.id}/`);
          setIsInWishlist(false);
          
          // Update local wishlist state
          setWishlist(prev => prev.filter(item => item.id !== wishlistItem.id));
          
          console.log("✅ Removed from wishlist");
          alert("Removed from wishlist");
        } else {
          console.warn("Wishlist item not found for deletion");
        }
      } else {
        // Add to wishlist
        console.log("Adding to wishlist...");
        const payload = {
          user: parseInt(userId),
          variant: selectedVariant.id
        };
        console.log("Wishlist payload:", payload);
        
        const response = await axios.post(`${baseurl}/wishlist/`, payload);
        console.log("Wishlist POST response:", response.data);
        
        setIsInWishlist(true);
        
        // Add new item to local wishlist state
        setWishlist(prev => [...prev, response.data]);
        
        console.log("✅ Added to wishlist");
        alert("Added to wishlist");
      }
    } catch (error) {
      console.error("❌ Error toggling wishlist:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  /* ================= CART FUNCTIONS ================= */
  const handleAddToCart = async () => {
    console.log("🛒 Add to cart clicked");
    console.log("User ID:", userId);
    console.log("Selected Variant ID:", selectedVariant?.id);
    
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    if (!selectedVariant) {
      console.error("No selected variant");
      return;
    }
    
    if (qty > selectedVariant.stock) {
      alert(`Only ${selectedVariant.stock} items available in stock`);
      return;
    }

    setCartLoading(true);
    
    try {
      if (isInCart && cartItemId) {
        // Update existing cart item
        console.log(`Updating cart item ${cartItemId} to quantity ${qty}`);
        const payload = {
          user: parseInt(userId),
          variant: selectedVariant.id,
          quantity: qty
        };
        console.log("Cart update payload:", payload);
        
        await axios.put(`${baseurl}/cart/${cartItemId}/`, payload);
        
        setCartQuantity(qty);
        
        // Update local cart state
        setCartItems(prev => prev.map(item => 
          item.id === cartItemId ? { ...item, quantity: qty } : item
        ));
        
        // Dispatch cart update event for navbar
        window.dispatchEvent(new Event('cartUpdated'));
        
        console.log("✅ Cart updated");
        alert(`Cart updated to ${qty} items`);
      } else {
        // Add new item to cart
        console.log("Adding new item to cart");
        const payload = {
          user: parseInt(userId),
          variant: selectedVariant.id,
          quantity: qty
        };
        console.log("Cart POST payload:", payload);
        
        const response = await axios.post(`${baseurl}/cart/`, payload);
        console.log("Cart POST response:", response.data);
        
        setIsInCart(true);
        setCartItemId(response.data.id);
        setCartQuantity(qty);
        
        // Add to local cart state
        setCartItems(prev => [...prev, response.data]);
        
        // Dispatch cart update event for navbar
        window.dispatchEvent(new Event('cartUpdated'));
        
        console.log("✅ Added to cart");
        alert("Added to cart successfully!");
      }
    } catch (error) {
      console.error("❌ Error updating cart:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
      alert("Failed to update cart. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!userId || !cartItemId) return;
    
    setCartLoading(true);
    
    try {
      console.log(`Removing cart item ${cartItemId}`);
      await axios.delete(`${baseurl}/cart/${cartItemId}/`);
      
      setIsInCart(false);
      setCartItemId(null);
      setCartQuantity(0);
      
      // Remove from local cart state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
      // Dispatch cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      alert("Removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove from cart. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

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
                {/* Wishlist Icon */}
                <div 
                  className="icon-circle"
                  onClick={handleWishlistToggle}
                  style={{ 
                    cursor: wishlistLoading ? 'not-allowed' : 'pointer',
                    color: isInWishlist ? '#ff2e93' : '#666',
                    opacity: wishlistLoading ? 0.7 : 1
                  }}
                  title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    size={20} 
                    fill={isInWishlist ? '#ff2e93' : 'none'} 
                  />
                </div>
                
                {/* Share Icon */}
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
          <div className="details-section product-details-section">
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
                disabled={cartLoading}
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button 
                className="qty-btn plus"
                onClick={() => setQty(q => q + 1)}
                disabled={qty >= selectedVariant.stock || cartLoading}
              >
                +
              </button>
            </div>

            {/* Cart Buttons */}
            <div className="cart-actions">
              {isInCart ? (
                <div className="cart-buttons-group">
                  <button 
                    className="cart-btn update-cart"
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                  >
                    {cartLoading ? 'UPDATING...' : `UPDATE CART (${cartQuantity})`}
                  </button>
                  {/* <button 
                    className="cart-btn remove-cart"
                    onClick={handleRemoveFromCart}
                    disabled={cartLoading}
                  >
                    REMOVE
                  </button> */}
                </div>
              ) : (
                <button 
                  className="cart-btn add-cart"
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                >
                  {cartLoading ? 'ADDING...' : 'ADD TO CART'}
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button 
              className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              style={{
                marginTop: '15px',
                width: '100%',
                padding: '12px',
                backgroundColor: isInWishlist ? '#ff2e93' : '#f8f9fa',
                color: isInWishlist ? 'white' : '#333',
                border: `1px solid ${isInWishlist ? '#ff2e93' : '#ddd'}`,
                borderRadius: '4px',
                cursor: wishlistLoading ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {wishlistLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  PROCESSING...
                </>
              ) : (
                <>
                  <Heart 
                    size={16} 
                    fill={isInWishlist ? 'white' : 'none'} 
                    color={isInWishlist ? 'white' : '#666'}
                  />
                  {isInWishlist ? 'ADDED TO WISHLIST' : 'ADD TO WISHLIST'}
                </>
              )}
            </button>

            <p className="secure">
              Stock Available: {selectedVariant.stock}
            </p>
            
            {/* Show if item is already in cart */}
            {isInCart && (
              <p className="cart-info">
                Already in cart: {cartQuantity} item{cartQuantity !== 1 ? 's' : ''}
              </p>
            )}
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

export default ClientProductDetails;