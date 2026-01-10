import React, { useEffect, useState, useRef } from "react";
import "./WebHome.css";
import WebsiteNavbar from "../WebsiteNavbar/WebsiteNavbar";
import Categories from "./Categories";
import { baseurl } from "../BaseURL/BaseURL";
import Footer from "../Footer/Footer";
const WebHome = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoSlide, setIsVideoSlide] = useState(false);

  // Fetch carousel images using your baseurl
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseurl}/carousel/`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Carousel API response:", data);

        if (data.results && Array.isArray(data.results)) {
          setCarouselImages(data.results);
        } else {
          console.warn("Unexpected API response structure:", data);
          setCarouselImages([]);
        }

      } catch (err) {
        console.error("Carousel API error:", err);
        setError(err.message);
        // Fallback to static images if API fails
        setCarouselImages([
          { image: "https://images.unsplash.com/photo-1600585154340-043cd447c909" },
          { image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811" },
          { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselImages();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const currentItem = carouselImages[currentIndex];

    // ❌ Do NOT auto-slide when current slide is a video
    if (currentItem && isVideo(currentItem)) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length, currentIndex, carouselImages]);


  // Carousel arrows
  const handlePrev = () => {
    if (!carouselImages.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (!carouselImages.length) return;
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    if (imagePath.startsWith('/')) {
      return `${baseurl}${imagePath}`;
    }

    return imagePath;
  };

  const isVideo = (item) => {
    return item?.video && item.video !== "";
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const handleVideoEnd = () => {
    setCurrentIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };



  useEffect(() => {
    setIsVideoPlaying(true);
  }, [currentIndex]);

  useEffect(() => {
    const currentItem = carouselImages[currentIndex];

    if (currentItem && isVideo(currentItem)) {
      setIsVideoSlide(true);
      setIsVideoPlaying(false); // show ▶ first
    } else {
      setIsVideoSlide(false);
      setIsVideoPlaying(false);
    }
  }, [currentIndex, carouselImages]);


  useEffect(() => {
    if (isVideoSlide && videoRef.current) {
      const playTimer = setTimeout(() => {
        videoRef.current.play();
      }, 600); // short delay so ▶ is visible first

      return () => clearTimeout(playTimer);
    }
  }, [isVideoSlide]);

  return (
    <div>
      <WebsiteNavbar />
      <div className="webhome-container">
        {/* Dynamic Categories */}
        <Categories />

        {/* ===== HOME DEALS CAROUSEL AS BACKGROUND BANNER ===== */}
        <div className="hdc-carousel-banner">
          {/* Background Image */}
          <div className="hdc-banner-background">
            {carouselImages.length > 0 && carouselImages[currentIndex] && (
              isVideo(carouselImages[currentIndex]) ? (
                <div className="hdc-video-wrapper" onClick={toggleVideoPlay}>
                  <video
                    ref={videoRef}
                    className="hdc-banner-video"
                    src={getImageUrl(carouselImages[currentIndex].video)}
                    muted
                    playsInline
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                    onEnded={handleVideoEnd}
                    onError={(e) => {
                      console.error("Video failed to load:", e.target.src);
                    }}
                  />


                  {/* ▶ / ❚❚ Overlay */}
                  <div className="hdc-video-control-icon">
                    {isVideoPlaying ? "❚❚" : "▶"}
                  </div>
                </div>
              ) : (
                <img
                  src={getImageUrl(carouselImages[currentIndex].image)}
                  alt={`Banner ${currentIndex + 1}`}
                  className="hdc-banner-image"
                />
              )
            )}
          </div>



          {/* Carousel Controls */}
          <button className="hdc-arrow hdc-left" onClick={handlePrev}>‹</button>
          <button className="hdc-arrow hdc-right" onClick={handleNext}>›</button>

          {/* Dots indicator */}
          <div className="hdc-dots">
            {carouselImages.map((_, index) => (
              <span
                key={index}
                className={`hdc-dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Rest of your components remain the same */}
        <h2 className="section-title">Property Deals</h2>
        <div className="products-row no-scrollbar" id="propertyRow">
          {products.map((item, index) => (
            <div className="product-card" key={index}>
              <div className="discount-badge">{item.discount}</div>
              <img src={item.image} alt={item.name} />
              <button
                className={`card-btn ${item.button === "ADD"
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

        <h2 className="section-title">Business Deals</h2>
        <div className="products-row">
          {businessDeals.map((item, index) => (
            <div className="product-card" key={index}>
              <div className="discount-badge">{item.discount}</div>
              <img src={item.image} alt={item.name} />
              <button
                className={`card-btn ${item.button === "VIEW"
                    ? "view"
                    : item.button === "ADD"
                      ? "add"
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
                className={`card-btn ${item.button === "ADD"
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


      <Footer />
    </div>
  );
};

// Products data arrays remain the same...
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

export default WebHome;