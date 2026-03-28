

//===================================================

// import React, { useEffect, useState } from "react";
// // import "./Carousel.css";
// import { baseurl } from "../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";

// const GroceryAndKiranamCarousel = ({ categorySlug = "grocery-kirana" }) => {
//   const [businesses, setBusinesses] = useState([]);
//   const [offersMap, setOffersMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryLoading, setCategoryLoading] = useState(false);
//   const [categoryId, setCategoryId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCategoryBySlug(categorySlug);
//     fetchBusinessesByCategory(categorySlug);
//     fetchOffers();
//   }, [categorySlug]);

//   const fetchCategoryBySlug = async (slug) => {
//     try {
//       const res = await fetch(`${baseurl}/categories/?slug=${slug}`);
//       if (res.ok) {
//         const data = await res.json();
//         if (data.results && data.results.length > 0) {
//           const category = data.results[0];
//           setCategoryId(category.category_id);
//           setCategoryName(category.name || "");
//         } else {
//           setCategoryName("Special Offers");
//         }
//       }
//     } catch (error) {
//       console.error("Category by slug API error:", error);
//       setCategoryName("Special Offers");
//     }
//   };

//   const fetchBusinessesByCategory = async (slug) => {
//     setLoading(true);
//     setCategoryLoading(true);
//     try {
//       // const res = await fetch(`${baseurl}/business/?category_slug=${slug}`);
//       const res = await fetch(`${baseurl}/business/?category_slug=${slug}&verification_status=verified`);
//       const data = await res.json();

//       const businessesData = data.results || data || [];
      
//       const businessesWithBanners = businessesData.filter(business => 
//         business.banner && business.banner.trim() !== ""
//       );
      
//       setBusinesses(businessesWithBanners);

//       if (
//         businessesData.length > 0 &&
//         businessesData[0].categories &&
//         businessesData[0].categories.length > 0
//       ) {
//         await fetchCategoryName(businessesData[0].categories[0]);
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

//   const handleViewAll = async () => {
//     try {
//       const res = await fetch(`${baseurl}/categories/?slug=${categorySlug}`);
//       const data = await res.json();
//       if (data.results && data.results.length > 0) {
//         const categoryId = data.results[0].category_id;
//         navigate(`/w-subcategory/${categoryId}`);
//       } else {
//         console.error("Category not found");
//       }
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   // Updated: Now navigates to subcategory page instead of business page
//   const handleBusinessClick = async (business) => {
//     // If we already have categoryId from state, use it
//     if (categoryId) {
//       navigate(`/w-subcategory/${categoryId}`);
//     } else {
//       // Otherwise try to get category ID from business data
//       try {
//         // First try to get category from business data
//         if (business.categories && business.categories.length > 0) {
//           navigate(`/w-subcategory/${business.categories[0]}`);
//         } else {
//           // Fallback to fetching by slug
//           await handleViewAll();
//         }
//       } catch (error) {
//         console.error("Error navigating:", error);
//       }
//     }
//   };

//   // Return null if no businesses with banners
//   if (!loading && businesses.length === 0) {
//     return null;
//   }

//   if (loading) {
//     return (
//       <div className="mani-as-offer-wrapper">
//         <div className="mani-as-offer-loading">Loading offers...</div>
//       </div>
//     );
//   }

//   const displayBusinesses = businesses.slice(0, 3);

//   return (
//     <div className="mani-as-offer-wrapper">
//       {/* Header */}
//       <div className="mani-as-offer-header">
//         <h2 className="mani-as-offer-heading">
//           {categoryLoading ? (
//             <span className="mani-as-offer-loading-dots">Loading Category</span>
//           ) : (
//             categoryName || "Special Offers"
//           )}
//         </h2>
//         <div className="mani-as-offer-viewall-wrap">
//           <button onClick={handleViewAll} className="mani-as-offer-viewall-btn">
//             <span className="mani-as-viewall-circle">→</span>
//           </button>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="mani-as-offer-cards-grid">
//         {displayBusinesses.map((business) => {
//           const offer = offersMap[business.offer];
//           const discountValue = offer?.value || 0;
//           const discount = discountValue > 0 ? `${discountValue}%` : "0%";

//           const bannerImage = `${baseurl}${business.banner}`;

//           return (
//             <div 
//               className="mani-as-offer-card-item" 
//               key={business.business_id}
//               onClick={() => handleBusinessClick(business)}
//             >
//               <div
//                 className="mani-as-offer-card"
//                 style={{ backgroundImage: `url(${bannerImage})` }}
//               >
//                 {/* Discount Badge - Commented out */}
//               </div>
//             </div> 
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GroceryAndKiranamCarousel;



//=====================================
// changes made on Date = 28-03-2026



import React, { useEffect, useState } from "react";
// import "./Carousel.css";
import { baseurl } from "../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

const GroceryAndKiranamCarousel = ({ categorySlug = "grocery-kirana" }) => {
  const [businesses, setBusinesses] = useState([]);
  const [offersMap, setOffersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoryBySlug(categorySlug);
    fetchBusinessesByCategory(categorySlug);
    fetchOffers();
  }, [categorySlug]);

  const fetchCategoryBySlug = async (slug) => {
    try {
      const res = await fetch(`${baseurl}/categories/?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const category = data.results[0];
          setCategoryId(category.category_id);
          setCategoryName(category.name || "");
        } else {
          setCategoryName("Special Offers");
        }
      }
    } catch (error) {
      console.error("Category by slug API error:", error);
      setCategoryName("Special Offers");
    }
  };

  const fetchBusinessesByCategory = async (slug) => {
    setLoading(true);
    setCategoryLoading(true);
    try {
      const res = await fetch(`${baseurl}/business/?category_slug=${slug}&verification_status=verified`);
      const data = await res.json();

      const businessesData = data.results || data || [];
      
      const businessesWithBanners = businessesData.filter(business => 
        business.banner && business.banner.trim() !== ""
      );
      
      setBusinesses(businessesWithBanners);

      if (
        businessesData.length > 0 &&
        businessesData[0].categories &&
        businessesData[0].categories.length > 0
      ) {
        await fetchCategoryName(businessesData[0].categories[0]);
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

  const handleViewAll = async () => {
    try {
      const res = await fetch(`${baseurl}/categories/?slug=${categorySlug}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const categoryId = data.results[0].category_id;
        navigate(`/w-subcategory/${categoryId}`);
      } else {
        console.error("Category not found");
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // FIXED: Now navigates to subcategory page with business ID in state
  const handleBusinessClick = async (business) => {
    console.log("Business clicked:", business);
    
    // Get the category ID from the business's categories array or from state
    const businessCategoryId = business.categories && business.categories.length > 0 
      ? business.categories[0] 
      : categoryId;
    
    if (!businessCategoryId) {
      console.error("No category ID found for business");
      // Fallback to view all
      await handleViewAll();
      return;
    }
    
    // Navigate to the subcategory page with business information in state
    navigate(`/w-subcategory/${businessCategoryId}`, {
      state: {
        businessId: business.business_id,
        businessName: business.business_name,
        categoryId: businessCategoryId
      }
    });
  };

  // Return null if no businesses with banners
  if (!loading && businesses.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="mani-as-offer-wrapper">
        <div className="mani-as-offer-loading">Loading offers...</div>
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
          const discountValue = offer?.value || 0;
          
          // Handle both relative and absolute URLs
          const bannerImage = business.banner?.startsWith('http') 
            ? business.banner 
            : `${baseurl}${business.banner}`;

          return (
            <div 
              className="mani-as-offer-card-item" 
              key={business.business_id}
              onClick={() => handleBusinessClick(business)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="mani-as-offer-card"
                style={{ backgroundImage: `url(${bannerImage})` }}
              >
                {/* Discount Badge - Commented out */}
              </div>
            </div> 
          );
        })}
      </div>
    </div>
  );
};

export default GroceryAndKiranamCarousel;