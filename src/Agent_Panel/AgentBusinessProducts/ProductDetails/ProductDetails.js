
// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../../../Agent_Panel/Agent_Navbar/Agent_Navbar";
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
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
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






// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";

// const AgentProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant");

//   /* ================= STATE ================= */
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [mediaType, setMediaType] = useState(""); // "image" or "video"
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
//   /* ================= VIDEO PLAYER STATE ================= */
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const videoRef = useRef(null);
//   const videoContainerRef = useRef(null);

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

//         // Set initial media (image or video)
//         if (variant.media?.length > 0) {
//           const firstMedia = variant.media[0];
//           setSelectedMedia(`${baseurl}${firstMedia.file}`);
//           setMediaType(firstMedia.media_type); // "image" or "video"
//         } else {
//           setSelectedMedia(
//             "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
//           );
//           setMediaType("image");
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ ProductDetails error:", err);
//         setError(err.message || "Something went wrong");
//         setLoading(false);
//       });
//   }, [productId, variantId]);

//   /* ================= VIDEO CONTROLS ================= */
//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume;
//       setVolume(newVolume);
//       setIsMuted(newVolume === 0);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       setCurrentTime(videoRef.current.currentTime);
//     }
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     if (videoRef.current) {
//       videoRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       if (videoContainerRef.current.requestFullscreen) {
//         videoContainerRef.current.requestFullscreen();
//       } else if (videoContainerRef.current.mozRequestFullScreen) {
//         videoContainerRef.current.mozRequestFullScreen();
//       } else if (videoContainerRef.current.webkitRequestFullscreen) {
//         videoContainerRef.current.webkitRequestFullscreen();
//       } else if (videoContainerRef.current.msRequestFullscreen) {
//         videoContainerRef.current.msRequestFullscreen();
//       }
//       setIsFullscreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       }
//       setIsFullscreen(false);
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

//   return (
//     <>
//       <WebsiteNavbar />
//       <ShopHeader businessId={product.business} />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ========== LEFT : MEDIA GALLERY ========== */}
//           <div className="image-section">
//             <div className="thumbnail-list">
//               {(selectedVariant.media || []).map((media, index) => {
//                 const mediaUrl = `${baseurl}${media.file}`;
//                 const isSelected = selectedMedia === mediaUrl;
                
//                 return (
//                   <div
//                     key={index}
//                     className={`thumb-box ${isSelected ? "active" : ""}`}
//                     onClick={() => {
//                       setSelectedMedia(mediaUrl);
//                       setMediaType(media.media_type);
//                       setIsPlaying(false);
//                       if (videoRef.current) {
//                         videoRef.current.pause();
//                         videoRef.current.currentTime = 0;
//                       }
//                     }}
//                   >
//                     {media.media_type === "video" ? (
//                       <div className="video-thumbnail">
//                         <img 
//                           src={mediaUrl.replace('.mp4', '.jpg')} 
//                           alt="Video thumbnail" 
//                           onError={(e) => {
//                             // Fallback if no thumbnail
//                             e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150";
//                           }}
//                         />
//                         <div className="video-play-icon">
//                           <FaPlay />
//                         </div>
//                       </div>
//                     ) : (
//                       <img src={mediaUrl} alt={`Product ${index + 1}`} />
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="main-media-box" ref={videoContainerRef}>
//               {mediaType === "video" ? (
//                 <div className="video-player-container">
//                   <video
//                     ref={videoRef}
//                     src={selectedMedia}
//                     className="main-video"
//                     onTimeUpdate={handleTimeUpdate}
//                     onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                     onEnded={() => setIsPlaying(false)}
//                     loop
//                     playsInline
//                   />
                  
//                   {/* Custom Video Controls */}
//                   <div className="video-controls">
//                     <button className="control-btn" onClick={togglePlay}>
//                       {isPlaying ? <FaPause /> : <FaPlay />}
//                     </button>
                    
//                     <div className="time-slider">
//                       <input
//                         type="range"
//                         min="0"
//                         max={duration || 0}
//                         value={currentTime}
//                         onChange={handleSeek}
//                         className="seek-slider"
//                       />
//                       <span className="time-display">
//                         {formatTime(currentTime)} / {formatTime(duration)}
//                       </span>
//                     </div>
                    
//                     <div className="volume-controls">
//                       <button className="control-btn" onClick={toggleMute}>
//                         {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
//                       </button>
//                       <input
//                         type="range"
//                         min="0"
//                         max="1"
//                         step="0.1"
//                         value={volume}
//                         onChange={handleVolumeChange}
//                         className="volume-slider"
//                       />
//                     </div>
                    
//                     <button className="control-btn" onClick={toggleFullscreen}>
//                       {isFullscreen ? <FaCompress /> : <FaExpand />}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <img 
//                   src={selectedMedia} 
//                   alt={product.product_name} 
//                   className="main-image"
//                 />
//               )}
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
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

// export default AgentProductDetails;




// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import WebsiteNavbar from "../../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
// import { baseurl } from "../../../BaseURL/BaseURL";
// import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";

// const AgentProductDetails = () => {
//   /* ================= ROUTE PARAMS ================= */
//   const { productId } = useParams();
//   const [searchParams] = useSearchParams();
//   const variantId = searchParams.get("variant");

//   /* ================= STATE ================= */
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [mediaType, setMediaType] = useState(""); // "image" or "video"
//   const [qty, setQty] = useState(1);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [openDetails, setOpenDetails] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  
//   /* ================= VIDEO PLAYER STATE ================= */
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const videoRef = useRef(null);
//   const videoContainerRef = useRef(null);
//   const thumbnailListRef = useRef(null);

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

//         // Set initial media (image or video)
//         if (variant.media?.length > 0) {
//           const firstMedia = variant.media[0];
//           setSelectedMedia(`${baseurl}${firstMedia.file}`);
//           setMediaType(firstMedia.media_type || "image");
//         } else {
//           setSelectedMedia(
//             "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
//           );
//           setMediaType("image");
//         }

//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("❌ ProductDetails error:", err);
//         setError(err.message || "Something went wrong");
//         setLoading(false);
//       });
//   }, [productId, variantId]);

//   /* ================= THUMBNAIL SCROLL EFFECT ================= */
//   useEffect(() => {
//     const thumbnailList = thumbnailListRef.current;
//     if (thumbnailList) {
//       // Check if there are more than 5 thumbnails
//       const totalThumbnails = selectedVariant?.media?.length || 0;
//       if (totalThumbnails > 5) {
//         thumbnailList.style.maxHeight = "350px"; // Height for 5 thumbnails
//         thumbnailList.style.overflowY = "auto";
//       } else {
//         thumbnailList.style.maxHeight = "none";
//         thumbnailList.style.overflowY = "visible";
//       }
//     }
//   }, [selectedVariant]);

//   /* ================= VIDEO CONTROLS ================= */
//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     if (videoRef.current) {
//       videoRef.current.volume = newVolume;
//       setVolume(newVolume);
//       setIsMuted(newVolume === 0);
//     }
//   };

//   const handleTimeUpdate = () => {
//     if (videoRef.current) {
//       setCurrentTime(videoRef.current.currentTime);
//     }
//   };

//   const handleSeek = (e) => {
//     const newTime = parseFloat(e.target.value);
//     if (videoRef.current) {
//       videoRef.current.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const toggleFullscreen = () => {
//     const container = videoContainerRef.current;
//     if (!document.fullscreenElement) {
//       if (container.requestFullscreen) {
//         container.requestFullscreen();
//       } else if (container.mozRequestFullScreen) {
//         container.mozRequestFullScreen();
//       } else if (container.webkitRequestFullscreen) {
//         container.webkitRequestFullscreen();
//       } else if (container.msRequestFullscreen) {
//         container.msRequestFullscreen();
//       }
//       setIsFullscreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       }
//       setIsFullscreen(false);
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

//   return (
//     <>
//       <WebsiteNavbar />
//       <ShopHeader businessId={product.business} />

//       <div className="product-wrapper">
//         <div className="product-layout">

//           {/* ========== LEFT : MEDIA GALLERY ========== */}
//           <div className="image-section">
//             {/* Thumbnails Container */}
//             <div className="thumbnail-list-container">
//               <div 
//                 className="thumbnail-list" 
//                 ref={thumbnailListRef}
//               >
//                 {(selectedVariant.media || []).map((media, index) => {
//                   const mediaUrl = `${baseurl}${media.file}`;
//                   const isSelected = selectedMedia === mediaUrl;
//                   const type = media.media_type || "image";
                  
//                   return (
//                     <div
//                       key={index}
//                       className={`thumb-box ${isSelected ? "active" : ""}`}
//                       onClick={() => {
//                         setSelectedMedia(mediaUrl);
//                         setMediaType(type);
//                         setIsPlaying(false);
//                         if (videoRef.current) {
//                           videoRef.current.pause();
//                           videoRef.current.currentTime = 0;
//                         }
//                       }}
//                     >
//                       {type === "video" ? (
//                         <div className="video-thumbnail">
//                           <img 
//                             src={media.thumbnail || mediaUrl.replace('.mp4', '.jpg')} 
//                             alt="Video thumbnail" 
//                             onError={(e) => {
//                               e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150";
//                             }}
//                           />
//                           <div className="video-play-icon">
//                             <FaPlay />
//                           </div>
//                         </div>
//                       ) : (
//                         <img src={mediaUrl} alt={`Product ${index + 1}`} />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Scroll Indicator for Desktop */}
//               {(selectedVariant.media?.length || 0) > 5 && (
//                 <div className="scroll-indicator">
//                   <span>↓</span>
//                 </div>
//               )}
//             </div>

//             {/* Main Media Display */}
//             <div className="main-media-box" ref={videoContainerRef}>
//               {mediaType === "video" ? (
//                 <div className="video-player-container">
//                   <video
//                     ref={videoRef}
//                     src={selectedMedia}
//                     className="main-video"
//                     onTimeUpdate={handleTimeUpdate}
//                     onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
//                     onPlay={() => setIsPlaying(true)}
//                     onPause={() => setIsPlaying(false)}
//                     onEnded={() => setIsPlaying(false)}
//                     loop
//                     playsInline
//                   />
                  
//                   {/* Custom Video Controls */}
//                   <div className="video-controls">
//                     <button className="control-btn" onClick={togglePlay}>
//                       {isPlaying ? <FaPause /> : <FaPlay />}
//                     </button>
                    
//                     <div className="time-slider">
//                       <input
//                         type="range"
//                         min="0"
//                         max={duration || 0}
//                         value={currentTime}
//                         onChange={handleSeek}
//                         className="seek-slider"
//                       />
//                       <span className="time-display">
//                         {formatTime(currentTime)} / {formatTime(duration)}
//                       </span>
//                     </div>
                    
//                     <div className="volume-controls">
//                       <button className="control-btn" onClick={toggleMute}>
//                         {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
//                       </button>
//                       <input
//                         type="range"
//                         min="0"
//                         max="1"
//                         step="0.1"
//                         value={volume}
//                         onChange={handleVolumeChange}
//                         className="volume-slider"
//                       />
//                     </div>
                    
//                     <button className="control-btn" onClick={toggleFullscreen}>
//                       {isFullscreen ? <FaCompress /> : <FaExpand />}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <img 
//                   src={selectedMedia} 
//                   alt={product.product_name} 
//                   className="main-image"
//                 />
//               )}
//             </div>
//           </div>

//           {/* ========== MIDDLE : DETAILS ========== */}
//           <div className="details-section">
//             <p className="store-link">
//               Visit the {product.brand || "Store"}
//             </p>

//             <h1 className="product-title">{product.product_name}</h1>

//             {product.description && (
//               <p className="desc">{product.description}</p>
//             )}

//             {/* PRODUCT ATTRIBUTES */}
//             {product.attributes && Object.keys(product.attributes).length > 0 && (
//               <>
//                 <h3 className="section-title">Product Attributes</h3>
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
//             {selectedVariant.attributes && Object.keys(selectedVariant.attributes).length > 0 && (
//               <>
//                 <h3 className="section-title">Variant Details</h3>
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

// export default AgentProductDetails;




import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
 import WebsiteNavbar from "../../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import ShopHeader from "./ProductsDetailsHeader/ProductHeader";
import "./ProductDetails.css";
import { baseurl } from "../../../BaseURL/BaseURL";

const AgentProductDetails = () => {
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
        
        // Check if current variant is in wishlist
        const wishlistItems = response.data || [];
        setWishlist(wishlistItems);
        
        // Check if current variant is in wishlist
        const isVariantInWishlist = wishlistItems.some(
          item => item.variant === selectedVariant.id
        );
        
        setIsInWishlist(isVariantInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
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
        
        // Filter cart items for current user
        const userCartItems = response.data.filter(
          item => item.user === parseInt(userId)
        );
        
        setCartItems(userCartItems);
        
        // Check if current variant is in cart
        const cartItem = userCartItems.find(
          item => item.variant === selectedVariant.id
        );
        
        if (cartItem) {
          setIsInCart(true);
          setCartItemId(cartItem.id);
          setCartQuantity(cartItem.quantity);
        } else {
          setIsInCart(false);
          setCartItemId(null);
          setCartQuantity(0);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId, selectedVariant]);

  /* ================= WISHLIST FUNCTIONS ================= */
  const handleWishlistToggle = async () => {
    if (!userId) {
      alert("Please login to add items to wishlist");
      return;
    }

    if (!selectedVariant) return;

    setWishlistLoading(true);
    
    try {
      if (isInWishlist) {
        // Find wishlist item ID to delete
        const wishlistItem = wishlist.find(
          item => item.variant === selectedVariant.id && item.user === parseInt(userId)
        );
        
        if (wishlistItem) {
          await axios.delete(`${baseurl}/wishlist/${wishlistItem.id}/`);
          setIsInWishlist(false);
          
          // Update local wishlist state
          setWishlist(prev => prev.filter(item => item.id !== wishlistItem.id));
          
          alert("Removed from wishlist");
        }
      } else {
        // Add to wishlist
        const response = await axios.post(`${baseurl}/wishlist/`, {
          user: parseInt(userId),
          variant: selectedVariant.id
        });
        
        setIsInWishlist(true);
        
        // Add new item to local wishlist state
        setWishlist(prev => [...prev, response.data]);
        
        alert("Added to wishlist");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  /* ================= CART FUNCTIONS ================= */
  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login to add items to cart");
      return;
    }

    if (!selectedVariant) return;
    
    if (qty > selectedVariant.stock) {
      alert(`Only ${selectedVariant.stock} items available in stock`);
      return;
    }

    setCartLoading(true);
    
    try {
      if (isInCart && cartItemId) {
        // Update existing cart item
        await axios.put(`${baseurl}/cart/${cartItemId}/`, {
          user: parseInt(userId),
          variant: selectedVariant.id,
          quantity: qty
        });
        
        setCartQuantity(qty);
        alert(`Cart updated to ${qty} items`);
      } else {
        // Add new item to cart
        const response = await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          variant: selectedVariant.id,
          quantity: qty
        });
        
        setIsInCart(true);
        setCartItemId(response.data.id);
        setCartQuantity(qty);
        
        // Add to local cart state
        setCartItems(prev => [...prev, response.data]);
        
        alert("Added to cart successfully!");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!userId || !cartItemId) return;
    
    setCartLoading(true);
    
    try {
      await axios.delete(`${baseurl}/cart/${cartItemId}/`);
      
      setIsInCart(false);
      setCartItemId(null);
      setCartQuantity(0);
      
      // Remove from local cart state
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
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
                {/* Wishlist Icon - Now Dynamic */}
                <div 
                  className={`icon-circle ${isInWishlist ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                  style={{ 
                    cursor: wishlistLoading ? 'not-allowed' : 'pointer',
                    opacity: wishlistLoading ? 0.7 : 1
                  }}
                >
                  {isInWishlist ? '❤️' : '🤍'}
                </div>
                
                {/* Share Icon */}
                <div className="icon-circle" title="Share">
                  ↗️
                </div>
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

            {/* Cart Buttons - Now Dynamic */}
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

export default AgentProductDetails;