// import React, { useEffect, useState } from "react";
// import "./Carousel.css";
// import { baseurl } from "../BaseURL/BaseURL";

// // ✅ Reliable Unsplash default banner
// const DEFAULT_BANNER =
//   "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80";

// const OfferCarousel = () => {
//   const [businesses, setBusinesses] = useState([]);
//   const [offersMap, setOffersMap] = useState({});

//   useEffect(() => {
//     fetchBusinesses();
//     fetchOffers();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       const res = await fetch(`${baseurl}/business/`);
//       const data = await res.json();
//       setBusinesses(data.results || []);
//     } catch (error) {
//       console.error("Business API error:", error);
//     }
//   };

//   const fetchOffers = async () => {
//     try {
//       const res = await fetch(`${baseurl}/offers/`);
//       const data = await res.json();

//       const map = {};
//       (data.results || []).forEach((offer) => {
//         map[offer.id] = offer;
//       });

//       setOffersMap(map);
//     } catch (error) {
//       console.error("Offers API error:", error);
//     }
//   };

//   // Split into slides (3 cards per slide)
//   const chunkSize = 3;
//   const slides = [];
//   for (let i = 0; i < businesses.length; i += chunkSize) {
//     slides.push(businesses.slice(i, i + chunkSize));
//   }

//   return (
//     <div className="offer-carousel-wrapper">
//       <div
//         id="offerCarousel"
//         className="carousel slide"
//         data-bs-ride="carousel"
//         data-bs-interval="4000"
//       >
//         <div className="carousel-inner">

//           {slides.map((slide, slideIndex) => (
//             <div
//               key={slideIndex}
//               className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
//             >
//               <div className="row g-4">

//                 {slide.map((business) => {
//                   const offer = offersMap[business.offer];
//                   const discount = offer?.value
//                     ? `${offer.value}%`
//                     : "0%";

//                   // ✅ SAFE banner logic
//                   const bannerImage =
//                     business.banner && business.banner.trim() !== ""
//                       ? `${baseurl}${business.banner}`
//                       : DEFAULT_BANNER;

//                   return (
//                     <div className="col-md-4" key={business.business_id}>
//                       <div
//                         className="offer-card"
//                         style={{ backgroundImage: `url(${bannerImage})` }}
//                       >
//                         <div className="offer-content">
//                           <p className="upto">UPTO</p>
//                           <h2>{discount}</h2>
//                           <p className="off">OFF</p>
//                           <button className="shop-btn">Shop Now</button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}

//               </div>
//             </div>
//           ))}

//         </div>

//         {/* Controls */}
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#offerCarousel"
//           data-bs-slide="prev"
//         >
//           <span className="carousel-control-prev-icon"></span>
//         </button>

//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#offerCarousel"
//           data-bs-slide="next"
//         >
//           <span className="carousel-control-next-icon"></span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OfferCarousel;



// import React, { useEffect, useState } from "react";
// import "./Carousel.css";
// import { baseurl } from "../BaseURL/BaseURL";

// // ✅ Reliable Unsplash default banner
// const DEFAULT_BANNER =
//   "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80";

// const OfferCarousel = () => {
//   const [businesses, setBusinesses] = useState([]);
//   const [offersMap, setOffersMap] = useState({});
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     fetchBusinesses();
//     fetchOffers();
//   }, []);

//   const fetchBusinesses = async () => {
//     try {
//       const res = await fetch(`${baseurl}/business/`);
//       const data = await res.json();
//       setBusinesses(data.results || []);
//     } catch (error) {
//       console.error("Business API error:", error);
//     }
//   };

//   const fetchOffers = async () => {
//     try {
//       const res = await fetch(`${baseurl}/offers/`);
//       const data = await res.json();

//       const map = {};
//       (data.results || []).forEach((offer) => {
//         map[offer.id] = offer;
//       });

//       setOffersMap(map);
//     } catch (error) {
//       console.error("Offers API error:", error);
//     }
//   };

//   // Split into slides (3 cards per slide)
//   const chunkSize = 3;
//   const slides = [];
//   for (let i = 0; i < businesses.length; i += chunkSize) {
//     slides.push(businesses.slice(i, i + chunkSize));
//   }

//   const handlePrev = () => {
//     setActiveIndex((prevIndex) => 
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setActiveIndex((prevIndex) => 
//       prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="offer-carousel-wrapper">
//       <div className="carousel-container">
//         <button 
//           className="carousel-control custom-prev"
//           onClick={handlePrev}
//         >
//           <span className="control-icon">‹</span>
//         </button>

//         <div className="carousel-viewport">
//           <div 
//             className="carousel-track"
//             style={{ 
//               transform: `translateX(-${activeIndex * 100}%)`,
//               transition: 'transform 0.5s ease'
//             }}
//           >
//             {slides.map((slide, slideIndex) => (
//               <div
//                 key={slideIndex}
//                 className="carousel-slide"
//               >
//                 <div className="row g-4">
//                   {slide.map((business) => {
//                     const offer = offersMap[business.offer];
//                     const discount = offer?.value
//                       ? `${offer.value}%`
//                       : "0%";

//                     // ✅ SAFE banner logic
//                     const bannerImage =
//                       business.banner && business.banner.trim() !== ""
//                         ? `${baseurl}${business.banner}`
//                         : DEFAULT_BANNER;

//                     return (
//                       <div className="col-md-4" key={business.business_id}>
//                         <div
//                           className="offer-card"
//                           style={{ backgroundImage: `url(${bannerImage})` }}
//                         >
//                           <div className="offer-content">
//                             <p className="upto">UPTO</p>
//                             <h2>{discount}</h2>
//                             <p className="off">OFF</p>
//                             <button className="shop-btn">Shop Now</button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button 
//           className="carousel-control custom-next"
//           onClick={handleNext}
//         >
//           <span className="control-icon">›</span>
//         </button>
//       </div>

//       {/* Indicators */}
//       <div className="carousel-indicators">
//         {slides.map((_, idx) => (
//           <button
//             key={idx}
//             className={`indicator ${idx === activeIndex ? 'active' : ''}`}
//             onClick={() => setActiveIndex(idx)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OfferCarousel;



import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { baseurl } from "../BaseURL/BaseURL";

// ✅ Reliable Unsplash default banner
const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80";

const OfferCarousel = ({ categorySlug = "electronics-mobile" }) => { // Add categorySlug prop with default
  const [businesses, setBusinesses] = useState([]);
  const [offersMap, setOffersMap] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinessesByCategory(categorySlug);
    fetchOffers();
  }, [categorySlug]); // Re-fetch when categorySlug changes

  const fetchBusinessesByCategory = async (slug) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseurl}/business/?category_slug=${slug}`);
      const data = await res.json();
      
      // Assuming the API returns businesses directly or in a results field
      setBusinesses(data.results || data || []);
    } catch (error) {
      console.error("Business API error:", error);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await fetch(`${baseurl}/offers/`);
      const data = await res.json();

      const map = {};
      (data.results || []).forEach((offer) => {
        map[offer.id] = offer;
      });

      setOffersMap(map);
    } catch (error) {
      console.error("Offers API error:", error);
    }
  };

  // Split into slides (3 cards per slide)
  const chunkSize = 3;
  const slides = [];
  for (let i = 0; i < businesses.length; i += chunkSize) {
    slides.push(businesses.slice(i, i + chunkSize));
  }

  const handlePrev = () => {
    if (slides.length === 0) return;
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setActiveIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="offer-carousel-wrapper">
        <div className="loading-text">Loading offers...</div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="offer-carousel-wrapper">
        <div className="no-offers-text">No offers available for this category.</div>
      </div>
    );
  }

  return (
    <div className="offer-carousel-wrapper">
      <div className="carousel-container">
        {slides.length > 1 && (
          <>
            <button 
              className="carousel-control custom-prev"
              onClick={handlePrev}
            >
              <span className="control-icon">‹</span>
            </button>

            <button 
              className="carousel-control custom-next"
              onClick={handleNext}
            >
              <span className="control-icon">›</span>
            </button>
          </>
        )}

        <div className="carousel-viewport">
          <div 
            className="carousel-track"
            style={{ 
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: 'transform 0.5s ease'
            }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="carousel-slide"
              >
                <div className="row g-4">
                  {slide.map((business) => {
                    const offer = offersMap[business.offer];
                    const discount = offer?.value
                      ? `${offer.value}%`
                      : "0%";

                    // ✅ SAFE banner logic
                    const bannerImage =
                      business.banner && business.banner.trim() !== ""
                        ? `${baseurl}${business.banner}`
                        : DEFAULT_BANNER;

                    return (
                      <div className="col-md-4" key={business.business_id}>
                        <div
                          className="offer-card"
                          style={{ backgroundImage: `url(${bannerImage})` }}
                        >
                          <div className="offer-content">
                            <p className="upto">UPTO</p>
                            <h2>{discount}</h2>
                            <p className="off">OFF</p>
                            <button className="shop-btn">Shop Now</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicators - only show if there are multiple slides */}
      {slides.length > 1 && (
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferCarousel;