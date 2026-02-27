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

//=====================================
//below code with Carousel slides 

// import React, { useEffect, useState } from "react";
// import "./Carousel.css";
// import { baseurl } from "../BaseURL/BaseURL";

// // ✅ Reliable Unsplash default banner
// const DEFAULT_BANNER =
//   "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80";

// const OfferCarousel = ({ categorySlug = "electronics-mobile" }) => {
//   const [businesses, setBusinesses] = useState([]);
//   const [offersMap, setOffersMap] = useState({});
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryLoading, setCategoryLoading] = useState(false);

//   useEffect(() => {
//     fetchBusinessesByCategory(categorySlug);
//     fetchOffers();
//   }, [categorySlug]);

//   const fetchBusinessesByCategory = async (slug) => {
//     setLoading(true);
//     setCategoryLoading(true);
//     try {
//       const res = await fetch(`${baseurl}/business/?category_slug=${slug}`);
//       const data = await res.json();
      
//       const businessesData = data.results || data || [];
//       setBusinesses(businessesData);

//       // Fetch category name if we have businesses
//       if (businessesData.length > 0 && businessesData[0].categories && businessesData[0].categories.length > 0) {
//         await fetchCategoryName(businessesData[0].categories[0]);
//       } else {
//         // If no category ID found, use slug to get category name
//         await fetchCategoryBySlug(slug);
//       }
//     } catch (error) {
//       console.error("Business API error:", error);
//       setBusinesses([]);
//     } finally {
//       setLoading(false);
//       setCategoryLoading(false);
//     }
//   };

//   const fetchCategoryName = async (categoryId) => {
//     try {
//       const res = await fetch(`${baseurl}/categories/${categoryId}/`);
//       if (res.ok) {
//         const categoryData = await res.json();
//         setCategoryName(categoryData.name || "");
//       }
//     } catch (error) {
//       console.error("Category API error:", error);
//       setCategoryName("Special Offers");
//     }
//   };

//   const fetchCategoryBySlug = async (slug) => {
//     try {
//       const res = await fetch(`${baseurl}/categories/?slug=${slug}`);
//       if (res.ok) {
//         const data = await res.json();
//         if (data.results && data.results.length > 0) {
//           setCategoryName(data.results[0].name || "");
//         } else {
//           setCategoryName("Special Offers");
//         }
//       }
//     } catch (error) {
//       console.error("Category by slug API error:", error);
//       setCategoryName("Special Offers");
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
//     if (slides.length === 0) return;
//     setActiveIndex((prevIndex) => 
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     if (slides.length === 0) return;
//     setActiveIndex((prevIndex) => 
//       prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   if (loading) {
//     return (
//       <div className="offer-carousel-wrapper">
//         <div className="loading-text">Loading offers...</div>
//       </div>
//     );
//   }

//   if (businesses.length === 0) {
//     return (
//       <div className="offer-carousel-wrapper">
//         <div className="no-offers-text">No offers available for this category.</div>
//       </div>
//     );
//   }

//   return (
//     <div className="offer-carousel-wrapper">
//       {/* Dynamic Category Heading */}
//       <div className="carousel-header">
//         <h2 className="category-heading">
//           {categoryLoading ? (
//             <span className="loading-dots">Loading Category</span>
//           ) : (
//             categoryName || "Special Offers"
//           )}
//         </h2>
//         <div className="view-all-link">
//           <a href={`/category/${categorySlug}`}>View All →</a>
//         </div>
//       </div>

//       <div className="carousel-container">
//         {slides.length > 1 && (
//           <>
//             <button 
//               className="carousel-control custom-prev"
//               onClick={handlePrev}
//             >
//               <span className="control-icon">‹</span>
//             </button>

//             <button 
//               className="carousel-control custom-next"
//               onClick={handleNext}
//             >
//               <span className="control-icon">›</span>
//             </button>
//           </>
//         )}

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
//       </div>

//       {/* Indicators - only show if there are multiple slides */}
//       {slides.length > 1 && (
//         <div className="carousel-indicators">
//           {slides.map((_, idx) => (
//             <button
//               key={idx}
//               className={`indicator ${idx === activeIndex ? 'active' : ''}`}
//               onClick={() => setActiveIndex(idx)}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfferCarousel;


//=====================================================
// below code without carousel slides 

import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { baseurl } from "../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80";

const OfferCarousel = ({ categorySlug = "electronics-mobile" }) => {
  const [businesses, setBusinesses] = useState([]);
  const [offersMap, setOffersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessesByCategory(categorySlug);
    fetchOffers();
  }, [categorySlug]);

  const fetchBusinessesByCategory = async (slug) => {
    setLoading(true);
    setCategoryLoading(true);
    try {
      const res = await fetch(`${baseurl}/business/?category_slug=${slug}`);
      const data = await res.json();

      const businessesData = data.results || data || [];
      setBusinesses(businessesData);

      if (
        businessesData.length > 0 &&
        businessesData[0].categories &&
        businessesData[0].categories.length > 0
      ) {
        await fetchCategoryName(businessesData[0].categories[0]);
      } else {
        await fetchCategoryBySlug(slug);
      }
    } catch (error) {
      console.error("Business API error:", error);
      setBusinesses([]);
    } finally {
      setLoading(false);
      setCategoryLoading(false);
    }
  };

  const fetchCategoryName = async (categoryId) => {
    try {
      const res = await fetch(`${baseurl}/categories/${categoryId}/`);
      if (res.ok) {
        const categoryData = await res.json();
        setCategoryName(categoryData.name || "");
      }
    } catch (error) {
      console.error("Category API error:", error);
      setCategoryName("Special Offers");
    }
  };

  const fetchCategoryBySlug = async (slug) => {
    try {
      const res = await fetch(`${baseurl}/categories/?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setCategoryName(data.results[0].name || "");
        } else {
          setCategoryName("Special Offers");
        }
      }
    } catch (error) {
      console.error("Category by slug API error:", error);
      setCategoryName("Special Offers");
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

  const handleViewAll = () => {
    navigate(`/category/${categorySlug}`);
  };

  if (loading) {
    return (
      <div className="mani-as-offer-wrapper">
        <div className="mani-as-offer-loading">Loading offers...</div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div className="mani-as-offer-wrapper">
        <div className="mani-as-offer-empty">No offers available for this category.</div>
      </div>
    );
  }

  const displayBusinesses = businesses.slice(0, 3);

  return (
    <div className="mani-as-offer-wrapper">
      {/* Header */}
      <div className="mani-as-offer-header">
        <h2 className="mani-as-offer-heading">
          {categoryLoading ? (
            <span className="mani-as-offer-loading-dots">Loading Category</span>
          ) : (
            categoryName || "Special Offers"
          )}
        </h2>
       <div className="mani-as-offer-viewall-wrap">
  <button onClick={handleViewAll} className="mani-as-offer-viewall-btn">
   
    <span className="mani-as-viewall-circle">→</span>
  </button>
</div>
      </div>

      {/* Cards */}
      <div className="mani-as-offer-cards-grid">
        {displayBusinesses.map((business) => {
          const offer = offersMap[business.offer];
          const discount = offer?.value ? `${offer.value}%` : "0%";

          const bannerImage =
            business.banner && business.banner.trim() !== ""
              ? `${baseurl}${business.banner}`
              : DEFAULT_BANNER;

          return (
            <div className="mani-as-offer-card-item" key={business.business_id}>
              <div
                className="mani-as-offer-card"
                style={{ backgroundImage: `url(${bannerImage})` }}
              >
                <div className="mani-as-offer-card-content">
                  <p className="mani-as-offer-upto">UPTO</p>
                  <h2 className="mani-as-offer-discount">{discount}</h2>
                  <p className="mani-as-offer-off">OFF</p>
                  <button className="mani-as-offer-shop-btn">Shop Now</button>
                </div>
              </div>
            </div> 
          );
        })}
      </div>
    </div>
  );
};

export default OfferCarousel;

