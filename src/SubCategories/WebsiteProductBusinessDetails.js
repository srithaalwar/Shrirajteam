import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import WebsiteNavbar from "../../src/WebsiteNavbar/WebsiteNavbar";
import ShopHeader from "../Agent_Panel/AgentBusinessProducts/ProductDetails/ProductsDetailsHeader/ProductHeader";
// import "./ProductDetails.css";
import { baseurl } from "../BaseURL/BaseURL";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from "react-icons/fa";

const WebsiteProductDetails = () => {
  /* ================= ROUTE PARAMS ================= */
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const variantId = searchParams.get("variant");

  /* ================= STATE ================= */
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState(""); // "image" or "video"
  const [qty, setQty] = useState(1);
  const [openAbout, setOpenAbout] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  /* ================= VIDEO PLAYER STATE ================= */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const thumbnailListRef = useRef(null);

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

        // Set initial media (image or video)
        if (variant.media?.length > 0) {
          const firstMedia = variant.media[0];
          setSelectedMedia(`${baseurl}${firstMedia.file}`);
          setMediaType(firstMedia.media_type || "image");
        } else {
          setSelectedMedia(
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
          );
          setMediaType("image");
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("❌ ProductDetails error:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [productId, variantId]);

  /* ================= THUMBNAIL SCROLL EFFECT ================= */
  useEffect(() => {
    const thumbnailList = thumbnailListRef.current;
    if (thumbnailList) {
      // Check if there are more than 5 thumbnails
      const totalThumbnails = selectedVariant?.media?.length || 0;
      if (totalThumbnails > 5) {
        thumbnailList.style.maxHeight = "350px"; // Height for 5 thumbnails
        thumbnailList.style.overflowY = "auto";
      } else {
        thumbnailList.style.maxHeight = "none";
        thumbnailList.style.overflowY = "visible";
      }
    }
  }, [selectedVariant]);

  /* ================= VIDEO CONTROLS ================= */
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
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

  return (
    <>
      <WebsiteNavbar />
      <ShopHeader businessId={product.business} />

      <div className="product-wrapper">
        <div className="product-layout">

          {/* ========== LEFT : MEDIA GALLERY ========== */}
          <div className="image-section">
            {/* Thumbnails Container */}
            <div className="thumbnail-list-container">
              <div 
                className="thumbnail-list" 
                ref={thumbnailListRef}
              >
                {(selectedVariant.media || []).map((media, index) => {
                  const mediaUrl = `${baseurl}${media.file}`;
                  const isSelected = selectedMedia === mediaUrl;
                  const type = media.media_type || "image";
                  
                  return (
                    <div
                      key={index}
                      className={`thumb-box ${isSelected ? "active" : ""}`}
                      onClick={() => {
                        setSelectedMedia(mediaUrl);
                        setMediaType(type);
                        setIsPlaying(false);
                        if (videoRef.current) {
                          videoRef.current.pause();
                          videoRef.current.currentTime = 0;
                        }
                      }}
                    >
                      {type === "video" ? (
                        <div className="video-thumbnail">
                          <img 
                            src={media.thumbnail || mediaUrl.replace('.mp4', '.jpg')} 
                            alt="Video thumbnail" 
                            onError={(e) => {
                              e.target.src = "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150";
                            }}
                          />
                          <div className="video-play-icon">
                            <FaPlay />
                          </div>
                        </div>
                      ) : (
                        <img src={mediaUrl} alt={`Product ${index + 1}`} />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Scroll Indicator for Desktop */}
              {(selectedVariant.media?.length || 0) > 5 && (
                <div className="scroll-indicator">
                  <span>↓</span>
                </div>
              )}
            </div>

            {/* Main Media Display */}
            <div className="main-media-box" ref={videoContainerRef}>
              {mediaType === "video" ? (
                <div className="video-player-container">
                  <video
                    ref={videoRef}
                    src={selectedMedia}
                    className="main-video"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    loop
                    playsInline
                  />
                  
                  {/* Custom Video Controls */}
                  <div className="video-controls">
                    <button className="control-btn" onClick={togglePlay}>
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    
                    <div className="time-slider">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="seek-slider"
                      />
                      <span className="time-display">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <div className="volume-controls">
                      <button className="control-btn" onClick={toggleMute}>
                        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                      />
                    </div>
                    
                    <button className="control-btn" onClick={toggleFullscreen}>
                      {isFullscreen ? <FaCompress /> : <FaExpand />}
                    </button>
                  </div>
                </div>
              ) : (
                <img 
                  src={selectedMedia} 
                  alt={product.product_name} 
                  className="main-image"
                />
              )}
            </div>
          </div>

          {/* ========== MIDDLE : DETAILS ========== */}
          <div className="details-section">
            <p className="store-link">
              Visit the {product.brand || "Store"}
            </p>

            <h1 className="product-title">{product.product_name}</h1>

            {product.description && (
              <p className="desc">{product.description}</p>
            )}

            {/* PRODUCT ATTRIBUTES */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <>
                <h3 className="section-title">Product Attributes</h3>
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
            {selectedVariant.attributes && Object.keys(selectedVariant.attributes).length > 0 && (
              <>
                <h3 className="section-title">Variant Details</h3>
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

export default WebsiteProductDetails;