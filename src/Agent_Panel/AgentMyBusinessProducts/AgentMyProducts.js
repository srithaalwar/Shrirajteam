import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import ShopHeader from "./ProductHeader";
// import "./ProductDetails.css";
import { baseurl } from "../../BaseURL/BaseURL";
import { Heart, Share2, ShoppingCart, Play } from "lucide-react";
import Swal from "sweetalert2";
import ShareModal from "../../ShareModal/ShareModal";
import "./newstyle.css"
const AgentProductDetails = () => {
  /* ================= ROUTE PARAMS ================= */
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant");
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedMediaType, setSelectedMediaType] = useState("image");
  const [qty, setQty] = useState(1);
  const [openAbout, setOpenAbout] = useState(true);
  const [openDetails, setOpenDetails] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  
  /* ================= CART STATES ================= */
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);
  
  /* ================= WISHLIST STATES ================= */
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  
  // Get user from localStorage
  const userId = localStorage.getItem("user_id");

  /* ================= SHARE FUNCTIONALITY ================= */ 
  const handleShareClick = () => {
    const currentUrl = `${window.location.origin}/agent-business-product-details/${productId}/?variant=${variantId || selectedVariant?.id}`;
    
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

        // Set selected media based on available media
        if (variant.media && variant.media.length > 0) {
          const firstMedia = variant.media[0];
          setSelectedMedia(`${baseurl}${firstMedia.file}`);
          setSelectedMediaType(firstMedia.media_type || "image");
        } else {
          // No media available - use placeholder
          setSelectedMedia(null);
          setSelectedMediaType("placeholder");
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("❌ ProductDetails error:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [productId, variantId]);

  /* ================= FETCH CART ITEMS ================= */
  useEffect(() => {
    if (!userId || !selectedVariant) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${baseurl}/cart/?user=${userId}`);
        console.log("🛒 Cart API Response for user", userId, ":", response.data);
        
        const cartResponse = response.data;
        let userCartItems = [];
        
        if (cartResponse.results && Array.isArray(cartResponse.results)) {
          userCartItems = cartResponse.results;
        } else if (Array.isArray(cartResponse)) {
          userCartItems = cartResponse;
        }
        
        console.log("🛒 User cart items:", userCartItems);
        
        const cartItem = userCartItems.find(
          item => item.variant === selectedVariant.id
        );
        
        if (cartItem) {
          setIsInCart(true);
          setCartItemId(cartItem.id);
          setCartQuantity(cartItem.quantity);
          setQty(cartItem.quantity);
          console.log("🛒 Item found in cart:", cartItem);
        } else {
          setIsInCart(false);
          setCartItemId(null);
          setCartQuantity(0);
          setQty(1);
          console.log("🛒 Item not found in cart");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId, selectedVariant]);

  /* ================= FETCH WISHLIST ================= */
  useEffect(() => {
    if (!userId || !selectedVariant) return;

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${baseurl}/wishlist/?user=${userId}`);
        console.log("📋 Wishlist API Response:", response.data);
        
        const wishlistResponse = response.data;
        let wishlistItems = [];
        
        if (wishlistResponse.results && Array.isArray(wishlistResponse.results)) {
          wishlistItems = wishlistResponse.results;
        } else if (Array.isArray(wishlistResponse)) {
          wishlistItems = wishlistResponse;
        }
        
        console.log("📋 Wishlist items:", wishlistItems);
        setWishlist(wishlistItems);
        
        const isVariantInWishlist = wishlistItems.some(
          item => item.variant === selectedVariant.id
        );
        
        console.log("📋 Is variant in wishlist:", isVariantInWishlist, "for variant:", selectedVariant.id);
        setIsInWishlist(isVariantInWishlist);
        
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId, selectedVariant]);

  /* ================= PRICING ================= */
  const pricing = useMemo(() => {
    const mrp = parseFloat(selectedVariant?.mrp || 0);
    const price = parseFloat(selectedVariant?.selling_price || 0);
    const discount =
      mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return { mrp, price, discount };
  }, [selectedVariant]);

  /* ================= CART FUNCTIONS ================= */
  const handleAddToCart = async () => {
    console.log("🛒 Add to cart clicked");
    
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add items to cart',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    if (!selectedVariant) {
      console.error("No selected variant");
      return;
    }
    
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

    setCartLoading(true);
    
    try {
      if (isInCart && cartItemId) {
        await axios.put(`${baseurl}/cart/${cartItemId}/`, {
          user: parseInt(userId),
          variant: selectedVariant.id,
          quantity: qty
        });
        
        setCartQuantity(qty);
        
        Swal.fire({
          icon: 'success',
          title: 'Cart Updated!',
          text: `Cart updated to ${qty} items.`,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'View Cart',
          cancelButtonText: 'Continue Shopping',
          confirmButtonColor: '#f76f2f',
          cancelButtonColor: '#6c757d',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/agent-add-to-cart');
          }
        });
      } else {
        const response = await axios.post(`${baseurl}/cart/`, {
          user: parseInt(userId),
          variant: selectedVariant.id,
          quantity: qty
        });
        
        setIsInCart(true);
        setCartItemId(response.data.id);
        setCartQuantity(qty);
        
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${product.product_name} has been added to your cart.`,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'View Cart',
          cancelButtonText: 'Continue Shopping',
          confirmButtonColor: '#f76f2f',
          cancelButtonColor: '#6c757d',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/agent-add-to-cart');
          }
        });
      }
      
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error("❌ Error updating cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update cart. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
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
      setQty(1);
      
      Swal.fire({
        icon: 'info',
        title: 'Removed from Cart',
        text: `${product.product_name} has been removed from your cart.`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error("Error removing from cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove from cart. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    } finally {
      setCartLoading(false);
    }
  };

  const handleUpdateQuantity = (newQty) => {
    if (newQty < 1) {
      if (isInCart) {
        handleRemoveFromCart();
      }
    } else if (newQty > selectedVariant.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Stock Limit Exceeded',
        text: `Cannot add more than ${selectedVariant.stock} units`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    } else {
      setQty(newQty);
    }
  };

  /* ================= WISHLIST FUNCTIONS ================= */
  const handleWishlistToggle = async () => {
    console.log("❤️ Wishlist toggle clicked");
    
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add items to wishlist',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
      return;
    }

    if (!selectedVariant) {
      console.error("No selected variant");
      return;
    }

    setWishlistLoading(true);
    
    try {
      if (isInWishlist) {
        const wishlistItem = wishlist.find(
          item => item.variant === selectedVariant.id && item.user === parseInt(userId)
        );
        
        if (wishlistItem) {
          console.log(`Deleting wishlist item ${wishlistItem.id}`);
          await axios.delete(`${baseurl}/wishlist/${wishlistItem.id}/`);
          setIsInWishlist(false);
          setWishlist(prev => prev.filter(item => item.id !== wishlistItem.id));
          
          Swal.fire({
            icon: 'success',
            title: 'Removed from Wishlist',
            text: 'Item has been removed from your wishlist.',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } else {
        console.log("Adding to wishlist...");
        const payload = {
          user: parseInt(userId),
          variant: selectedVariant.id
        };
        
        const response = await axios.post(`${baseurl}/wishlist/`, payload);
        console.log("Wishlist POST response:", response.data);
        
        setIsInWishlist(true);
        setWishlist(prev => [...prev, response.data]);
        
        Swal.fire({
          icon: 'success',
          title: 'Added to Wishlist',
          text: 'Item has been added to your wishlist.',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
      
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error("❌ Error toggling wishlist:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update wishlist. Please try again.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f76f2f',
      });
    } finally {
      setWishlistLoading(false);
    }
  };

  // Function to handle media click (image or video)
  const handleMediaClick = (mediaItem) => {
    const mediaUrl = `${baseurl}${mediaItem.file}`;
    setSelectedMedia(mediaUrl);
    setSelectedMediaType(mediaItem.media_type || "image");
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <>
        <AgentNavbar />
        <div className="text-center py-5">Loading product...</div>
      </>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <>
        <AgentNavbar />
        <div className="text-center py-5 text-danger">{error}</div>
      </>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <AgentNavbar />
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
        <div className="product-layout my-product-layout">

          {/* ========== LEFT : MEDIA (Images & Videos) ========== */}
          <div className="image-section">
            {/* Thumbnails Container */}
            <div className="thumbnail-list-container">
              <div className="thumbnail-list">
                {(selectedVariant.media || []).map((mediaItem, index) => {
                  const mediaUrl = `${baseurl}${mediaItem.file}`;
                  const isVideo = mediaItem.media_type === 'video';
                  const isActive = selectedMedia === mediaUrl;
                  
                  return (
                    <div
                      key={index}
                      className={`thumb-box ${isActive ? "active" : ""}`}
                      onClick={() => handleMediaClick(mediaItem)}
                    >
                      {isVideo ? (
                        <div className="video-thumbnail">
                          <video 
                            src={mediaUrl} 
                            className="thumbnail-video"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div className="play-overlay">
                            <Play size={20} fill="white" />
                          </div>
                        </div>
                      ) : (
                        <img src={mediaUrl} alt="thumb" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Scroll Indicator */}
              {(selectedVariant.media || []).length > 5 && (
                <div className="scroll-indicator">
                  <span>↓</span>
                </div>
              )}
            </div>

            {/* Main Media Display */}
            <div className="main-image-box">
              {selectedMediaType === "video" && selectedMedia ? (
                <video
                  key={selectedMedia}
                  controls
                  autoPlay={false}
                  className="main-video"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src={selectedMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : selectedMediaType === "image" && selectedMedia ? (
                <img src={selectedMedia} alt={product.product_name} />
              ) : (
                // Placeholder when no media available
                <div className="no-media-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <path d="M8.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                    <path d="M21 15l-5-5-6 6-3-3-3 3"></path>
                  </svg>
                  <p>No media available</p>
                </div>
              )}
              
              <div className="floating-icons">
                {/* Wishlist Icon */}
                {/* <div 
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
                </div> */}
                
                <ShareModal
                  productId={productId}
                  variantId={variantId}
                  selectedVariant={selectedVariant}
                  productTitle={product?.name || "Check out this product!"}
                />
              </div>
            </div>
          </div>

          {/* ========== MIDDLE : DETAILS ========== */}
          <div className="details-section product-details-section">
            <h1>{product.product_name}</h1>

            {/* MOBILE BUY SECTION */}
            <div className="mobile-buy-box">
              <div className="mobile-price-row">
                <span className="mobile-price">₹{pricing.price.toFixed(2)}</span>

                {pricing.mrp > pricing.price && (
                  <>
                    <span className="mobile-mrp">₹{pricing.mrp.toFixed(2)}</span>
                    <span className="mobile-off">{pricing.discount}% OFF</span>
                  </>
                )}
              </div>

              {/* <div className="mobile-qty">
                <button
                  onClick={() => handleUpdateQuantity(qty - 1)}
                  disabled={cartLoading || qty <= 1}
                >
                  −
                </button>

                <span>{qty}</span>

                <button
                  onClick={() => handleUpdateQuantity(qty + 1)}
                  disabled={cartLoading || qty >= selectedVariant.stock}
                >
                  +
                </button>
              </div> */}

              {/* <button
                className="mobile-cart-btn"
                onClick={handleAddToCart}
                disabled={cartLoading || selectedVariant.stock <= 0}
              >
                <ShoppingCart size={18} style={{ marginRight: "8px" }} />
                {cartLoading ? 'PROCESSING...' : (isInCart ? 'UPDATE CART' : 'ADD TO CART')}
              </button> */}

              {/* {isInCart && (
                <button
                  className="mobile-cart-btn mobile-remove-btn"
                  onClick={handleRemoveFromCart}
                  disabled={cartLoading}
                  style={{
                    marginTop: '8px',
                    backgroundColor: '#dc3545',
                    color: 'white'
                  }}
                >
                  REMOVE FROM CART
                </button>
              )} */}

              {/* <button 
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
                    {isInWishlist ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
                  </>
                )}
              </button> */}
            </div>

            {/* KEY ATTRIBUTES */}
            {(product.attributes || selectedVariant?.attributes) && (
              <>
                <h6 style={{ fontWeight: 600 }}>Key Attributes</h6>

                <div className="attributes">
                  {/* Product Attributes */}
                  {product.attributes &&
                    Object.entries(product.attributes).map(([k, v]) => (
                      <div key={`product-${k}`} className="attribute-row">
                        <span className="attribute-key">
                          {k.replace(/_/g, " ")}
                        </span>
                        <span className="attribute-value">
                          {v}
                        </span>
                      </div>
                    ))}

                  {/* Variant Attributes */}
                  {selectedVariant.attributes &&
                    Object.entries(selectedVariant.attributes).map(([k, v]) => (
                      <div key={`variant-${k}`} className="attribute-row">
                        <span className="attribute-key">
                          {k.replace(/_/g, " ")}
                        </span>
                        <span className="attribute-value">
                          {v}
                        </span>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* ========== RIGHT : BUY BOX ========== */}
          {/* <div className="buy-box">
            <div className="price-row">
              <span className="price">₹{pricing.price.toFixed(2)}</span>
              {pricing.mrp > pricing.price && (
                <>
                  <span className="mrp">₹{pricing.mrp.toFixed(2)}</span>
                  <span className="off">{pricing.discount}% OFF</span>
                </>
              )}
            </div>


            <div className="qty">
              <button 
                className="qty-btn minus" 
                onClick={() => handleUpdateQuantity(qty - 1)}
                disabled={cartLoading || qty <= 1}
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button 
                className="qty-btn plus"
                onClick={() => handleUpdateQuantity(qty + 1)}
                disabled={cartLoading || qty >= selectedVariant.stock}
              >
                +
              </button>
            </div>

            <div className="cart-actions">
              <button 
                className={`cart-btn ${isInCart ? 'update-cart' : 'add-cart'}`}
                onClick={handleAddToCart}
                disabled={cartLoading || selectedVariant.stock <= 0}
                style={{ width: '100%' }}
              >
                <ShoppingCart size={18} style={{ marginRight: '8px' }} />
                {cartLoading ? 'PROCESSING...' : (isInCart ? 'UPDATE CART' : 'ADD TO CART')}
              </button>
              
              {isInCart && (
                <button 
                  className="cart-btn remove-cart"
                  onClick={handleRemoveFromCart}
                  disabled={cartLoading}
                  style={{
                    marginTop: '8px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    width: '100%'
                  }}
                >
                  REMOVE FROM CART
                </button>
              )}
            </div>

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
                  {isInWishlist ? 'IN WISHLIST' : 'ADD TO WISHLIST'}
                </>
              )}
            </button>

            <p className="secure">
              Stock Available: {selectedVariant.stock}
            </p>
            
            {isInCart && (
              <p className="cart-info">
                Currently in cart: {cartQuantity} item{cartQuantity !== 1 ? 's' : ''}
              </p>
            )}
          </div> */}
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