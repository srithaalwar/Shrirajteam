
// import React, { useEffect, useState, useCallback } from "react";
// import "./style.css";
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from "../../BaseURL/BaseURL";
// import { useNavigate } from "react-router-dom";
// import Categories from "./Categories";

// const AgentHome = () => {
//   const [businesses, setBusinesses] = useState([]);
//   const [offersMap, setOffersMap] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [categoriesMap, setCategoriesMap] = useState({});
//   const [categoriesLoading, setCategoriesLoading] = useState(false);
//   const [groupedBusinesses, setGroupedBusinesses] = useState({});
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const [error, setError] = useState(null);
  
//   // Pagination states
//   const [displayedCategories, setDisplayedCategories] = useState([]);
//   const [categoriesToShow, setCategoriesToShow] = useState(10); // Initial number of categories to show
//   const [loadingMore, setLoadingMore] = useState(false);
//   const INCREMENT_COUNT = 10; // Number of categories to load each time
  
//   const navigate = useNavigate();

//   // Helper function to get user ID from localStorage
//   const getUserIdFromStorage = () => {
//     try {
//       // Direct check for user_id in localStorage (most important)
//       const userId = localStorage.getItem('user_id');
//       if (userId) {
//         console.log("Found user_id directly in localStorage:", userId);
//         return userId;
//       }
      
//       // Check for user object in localStorage
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         const parsedUser = JSON.parse(userData);
//         console.log("Found user object:", parsedUser);
//         return parsedUser?.id || parsedUser?.user_id || null;
//       }
      
//       // Check for userId key
//       const userIdAlt = localStorage.getItem('userId');
//       if (userIdAlt) {
//         console.log("Found userId:", userIdAlt);
//         return userIdAlt;
//       }
      
//       console.log("No user ID found in localStorage");
//       console.log("All localStorage keys:", Object.keys(localStorage));
//       return null;
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const userId = getUserIdFromStorage();
//     console.log("Current User ID extracted:", userId, "Type:", typeof userId);
//     setCurrentUserId(userId);
//     fetchAllBusinesses(userId);
//     fetchOffers();
//     fetchAllCategories();
//   }, []);

//   const fetchAllBusinesses = async (userId) => {
//     setLoading(true);
//     setError(null);
//     try {
//       let businessesData = [];
      
//       // Build URL with exclude_user_id if user ID exists
//       if (userId && userId !== null && userId !== "null") {
//         const excludeUrl = `${baseurl}/business/?exclude_user_id=${userId}`;
//         console.log("Fetching businesses excluding user ID:", userId);
//         console.log("Full URL:", excludeUrl);
        
//         const res = await fetch(excludeUrl);
        
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
        
//         const data = await res.json();
//         console.log("API Response (exclude user):", data);
        
//         // Handle paginated response
//         businessesData = data.results || data || [];
//         console.log("Businesses from other users:", businessesData.length);
//       } else {
//         // If no user ID, fetch all businesses
//         const allUrl = `${baseurl}/business/`;
//         console.log("No user ID found, fetching all businesses:", allUrl);
        
//         const res = await fetch(allUrl);
        
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
        
//         const data = await res.json();
//         console.log("API Response (all businesses):", data);
        
//         businessesData = data.results || data || [];
//         console.log("All businesses:", businessesData.length);
//       }
      
//       // Filter businesses that have banners and are active
//       const businessesWithBanners = businessesData.filter(business => 
//         business.banner && 
//         business.banner.trim() !== "" && 
//         business.is_active === true
//       );
      
//       console.log("Businesses with banners:", businessesWithBanners.length);
//       console.log("Businesses details:", businessesWithBanners.map(b => ({ id: b.business_id, name: b.business_name, user: b.user })));
      
//       setBusinesses(businessesWithBanners);
      
//       // Group businesses by their primary category
//       const grouped = {};
//       businessesWithBanners.forEach(business => {
//         if (business.categories && business.categories.length > 0) {
//           const categoryId = business.categories[0];
//           if (!grouped[categoryId]) {
//             grouped[categoryId] = [];
//           }
//           grouped[categoryId].push(business);
//         }
//       });
      
//       setGroupedBusinesses(grouped);
      
//     } catch (error) {
//       console.error("Business API error:", error);
//       setError(error.message);
//       setBusinesses([]);
//       setGroupedBusinesses({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllCategories = async () => {
//     setCategoriesLoading(true);
//     try {
//       const res = await fetch(`${baseurl}/categories/`);
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log("Categories API Response:", data);
      
//       const categoriesData = data.results || data || [];
      
//       // Create a map of category_id to category name
//       const map = {};
//       categoriesData.forEach(category => {
//         map[category.category_id] = {
//           name: category.name,
//           slug: category.slug,
//           category_id: category.category_id
//         };
//       });
      
//       setCategoriesMap(map);
//     } catch (error) {
//       console.error("Categories API error:", error);
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };

//   const fetchOffers = async () => {
//     try {
//       const res = await fetch(`${baseurl}/offers/`);
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
      
//       const data = await res.json();
//       console.log("Offers API Response:", data);
      
//       const map = {};
//       (data.results || data || []).forEach((offer) => {
//         map[offer.id] = offer;
//       });
//       setOffersMap(map);
//     } catch (error) {
//       console.error("Offers API error:", error);
//     }
//   };

//   // Update displayed categories when groupedBusinesses or categoriesToShow changes
//   useEffect(() => {
//     const categoriesWithBusinesses = Object.keys(groupedBusinesses).filter(
//       categoryId => groupedBusinesses[categoryId].length > 0
//     );
//     setDisplayedCategories(categoriesWithBusinesses.slice(0, categoriesToShow));
//   }, [groupedBusinesses, categoriesToShow]);

//   const handleViewAll = (categoryId) => {
//     navigate(`/agent-home-subcategory/${categoryId}`);
//   };

//   const handleBusinessClick = (business) => {
//     if (business.categories && business.categories.length > 0) {
//       navigate(`/agent-home-subcategory/${business.categories[0]}`);
//     }
//   };

//   const loadMoreCategories = () => {
//     setLoadingMore(true);
//     // Simulate loading delay for better UX
//     setTimeout(() => {
//       setCategoriesToShow(prev => prev + INCREMENT_COUNT);
//       setLoadingMore(false);
//     }, 500);
//   };

//   if (loading) {
//     return (
//       <div>
//         <AgentNavbar />
//         <div className="mani-as-offer-wrapper">
//           <div className="mani-as-offer-loading">Loading businesses...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <AgentNavbar />
//         <div className="mani-as-offer-wrapper">
//           <div className="mani-as-offer-error">
//             Error loading businesses: {error}
//             <button 
//               onClick={() => fetchAllBusinesses(currentUserId)} 
//               className="retry-btn"
//               style={{
//                 marginLeft: '10px',
//                 padding: '5px 10px',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer'
//               }}
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (businesses.length === 0) {
//     return (
//       <div>
//         <AgentNavbar />
//         <div className="mani-as-offer-wrapper">
//           <div className="mani-as-offer-loading">
//             {currentUserId && currentUserId !== "null" 
//               ? `No other businesses available at the moment. Your business (User ID: ${currentUserId}) is currently listed, but no other businesses exist.` 
//               : "Please log in to view businesses."}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Get all categories that have businesses
//   const allCategoriesWithBusinesses = Object.keys(groupedBusinesses).filter(
//     categoryId => groupedBusinesses[categoryId].length > 0
//   );
  
//   const hasMoreCategories = displayedCategories.length < allCategoriesWithBusinesses.length;

//   return (
//     <div>
//       <AgentNavbar />
//       <Categories/>
      
//       <div className="agent-home-container">
//         {/* Businesses Carousel Sections */}
//         {displayedCategories.length === 0 ? (
//           <div className="mani-as-offer-wrapper">
//             <div className="mani-as-offer-loading">
//               No categories with businesses available.
//             </div>
//           </div>
//         ) : (
//           <>
//             {displayedCategories.map((categoryId) => {
//               const categoryBusinesses = groupedBusinesses[categoryId];
//               const categoryInfo = categoriesMap[categoryId];
//               const categoryName = categoryInfo?.name || "Businesses";
              
//               // Show only up to 3 businesses per category
//               const displayBusinesses = categoryBusinesses.slice(0, 3);
              
//               return (
//                 <div key={categoryId} className="mani-as-offer-wrapper">
//                   {/* Header */}
//                   <div className="mani-as-offer-header">
//                     <h2 className="mani-as-offer-heading">
//                       {categoriesLoading ? (
//                         <span className="mani-as-offer-loading-dots">Loading Category</span>
//                       ) : (
//                         categoryName
//                       )}
//                     </h2>
//                     <div className="mani-as-offer-viewall-wrap">
//                       <button 
//                         onClick={() => handleViewAll(categoryId)} 
//                         className="mani-as-offer-viewall-btn"
//                       >
//                         <span className="mani-as-viewall-circle">→</span>
//                       </button>
//                     </div>
//                   </div>

//                   {/* Cards */}
//                   <div className="mani-as-offer-cards-grid">
//                     {displayBusinesses.map((business) => {
//                       const offer = offersMap[business.offer];
//                       const discountValue = offer?.value || 0;
                      
//                       const bannerImage = business.banner 
//                         ? business.banner.startsWith('http') 
//                           ? business.banner 
//                           : `${baseurl}${business.banner}`
//                         : null;

//                       return (
//                         <div 
//                           className="mani-as-offer-card-item" 
//                           key={business.business_id}
//                           onClick={() => handleBusinessClick(business)}
//                         >
//                           <div
//                             className="mani-as-offer-card"
//                             style={{ 
//                               backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
//                               backgroundColor: bannerImage ? 'transparent' : '#f0f0f0'
//                             }}
//                           >
//                             {/* Business Info Overlay */}
//                             <div className="mani-as-offer-card-overlay">
//                               {/* Optional: Show business name if needed */}
//                               {/* <h3 className="mani-as-offer-business-name">{business.business_name}</h3> */}
//                               {discountValue > 0 && (
//                                 <div className="mani-as-offer-discount-badge">
//                                   {discountValue}% OFF
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
            
//             {/* Load More Button */}
//             {hasMoreCategories && (
//               <div className="load-more-container" style={{ textAlign: 'center', margin: '30px 0' }}>
//                 <button 
//                   onClick={loadMoreCategories}
//                   className="load-more-btn"
//                   disabled={loadingMore}
//                   style={{
//                     padding: '12px 30px',
//                     backgroundColor: '#f78e24',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '25px',
//                     cursor: loadingMore ? 'not-allowed' : 'pointer',
//                     fontSize: '16px',
//                     fontWeight: '500',
//                     transition: 'all 0.3s ease',
//                     opacity: loadingMore ? 0.6 : 1
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!loadingMore) {
//                       e.target.style.backgroundColor = '#f78e24';
//                       e.target.style.transform = 'translateY(-2px)';
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!loadingMore) {
//                       e.target.style.backgroundColor = '#f78e24';
//                       e.target.style.transform = 'translateY(0)';
//                     }
//                   }}
//                 >
//                   {loadingMore ? (
//                     <>
//                       <span className="loading-spinner" style={{
//                         display: 'inline-block',
//                         width: '16px',
//                         height: '16px',
//                         border: '2px solid #fff',
//                         borderTop: '2px solid transparent',
//                         borderRadius: '50%',
//                         animation: 'spin 0.6s linear infinite',
//                         marginRight: '8px',
//                         verticalAlign: 'middle'
//                       }}></span>
//                       Loading More...
//                     </>
//                   ) : (
//                     `View More  (${allCategoriesWithBusinesses.length - displayedCategories.length} remaining)`
//                   )}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
      
//       {/* Add CSS animation for spinner */}
//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AgentHome;




import React, { useEffect, useState, useCallback } from "react";
import "./style.css";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";

const AgentHome = () => {
  const [businesses, setBusinesses] = useState([]);
  const [offersMap, setOffersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [groupedBusinesses, setGroupedBusinesses] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [categoriesToShow, setCategoriesToShow] = useState(10); // Initial number of categories to show
  const [loadingMore, setLoadingMore] = useState(false);
  const INCREMENT_COUNT = 10; // Number of categories to load each time
  
  const navigate = useNavigate();

  // Helper function to get user ID from localStorage
  const getUserIdFromStorage = () => {
    try {
      // Direct check for user_id in localStorage (most important)
      const userId = localStorage.getItem('user_id');
      if (userId) {
        console.log("Found user_id directly in localStorage:", userId);
        return userId;
      }
      
      // Check for user object in localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log("Found user object:", parsedUser);
        return parsedUser?.id || parsedUser?.user_id || null;
      }
      
      // Check for userId key
      const userIdAlt = localStorage.getItem('userId');
      if (userIdAlt) {
        console.log("Found userId:", userIdAlt);
        return userIdAlt;
      }
      
      console.log("No user ID found in localStorage");
      console.log("All localStorage keys:", Object.keys(localStorage));
      return null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const userId = getUserIdFromStorage();
    console.log("Current User ID extracted:", userId, "Type:", typeof userId);
    setCurrentUserId(userId);
    fetchAllBusinesses(userId);
    fetchOffers();
    fetchAllCategories();
  }, []);

  const fetchAllBusinesses = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      let businessesData = [];
      
      // Build URL with exclude_user_id if user ID exists
      if (userId && userId !== null && userId !== "null") {
        const excludeUrl = `${baseurl}/business/?exclude_user_id=${userId}&verification_status=verified`;
        console.log("Fetching businesses excluding user ID:", userId);
        console.log("Full URL:", excludeUrl);
        
        const res = await fetch(excludeUrl);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("API Response (exclude user):", data);
        
        // Handle paginated response
        businessesData = data.results || data || [];
        console.log("Businesses from other users:", businessesData.length);
      } else {
        // If no user ID, fetch all businesses
        const allUrl = `${baseurl}/business/`;
        console.log("No user ID found, fetching all businesses:", allUrl);
        
        const res = await fetch(allUrl);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("API Response (all businesses):", data);
        
        businessesData = data.results || data || [];
        console.log("All businesses:", businessesData.length);
      }
      
      // Filter businesses that have banners and are active
      const businessesWithBanners = businessesData.filter(business => 
        business.banner && 
        business.banner.trim() !== "" && 
        business.is_active === true
      );
      
      console.log("Businesses with banners:", businessesWithBanners.length);
      console.log("Businesses details:", businessesWithBanners.map(b => ({ id: b.business_id, name: b.business_name, user: b.user })));
      
      setBusinesses(businessesWithBanners);
      
      // Group businesses by their primary category
      const grouped = {};
      businessesWithBanners.forEach(business => {
        if (business.categories && business.categories.length > 0) {
          const categoryId = business.categories[0];
          if (!grouped[categoryId]) {
            grouped[categoryId] = [];
          }
          grouped[categoryId].push(business);
        }
      });
      
      setGroupedBusinesses(grouped);
      
    } catch (error) {
      console.error("Business API error:", error);
      setError(error.message);
      setBusinesses([]);
      setGroupedBusinesses({});
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch(`${baseurl}/categories/`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Categories API Response:", data);
      
      const categoriesData = data.results || data || [];
      
      // Create a map of category_id to category name
      const map = {};
      categoriesData.forEach(category => {
        map[category.category_id] = {
          name: category.name,
          slug: category.slug,
          category_id: category.category_id
        };
      });
      
      setCategoriesMap(map);
    } catch (error) {
      console.error("Categories API error:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await fetch(`${baseurl}/offers/`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Offers API Response:", data);
      
      const map = {};
      (data.results || data || []).forEach((offer) => {
        map[offer.id] = offer;
      });
      setOffersMap(map);
    } catch (error) {
      console.error("Offers API error:", error);
    }
  };

  // Update displayed categories when groupedBusinesses or categoriesToShow changes
  useEffect(() => {
    const categoriesWithBusinesses = Object.keys(groupedBusinesses).filter(
      categoryId => groupedBusinesses[categoryId].length > 0
    );
    setDisplayedCategories(categoriesWithBusinesses.slice(0, categoriesToShow));
  }, [groupedBusinesses, categoriesToShow]);

  const handleViewAll = (categoryId) => {
    // Navigate to category page without business ID
    navigate(`/agent-home-subcategory/${categoryId}`);
  };

  const handleBusinessClick = (business) => {
    // When clicking on a business banner, navigate with business ID
    // This will allow the subcategory page to fetch products for this specific business
    if (business && business.business_id) {
      console.log("Navigating to business products with ID:", business.business_id);
      // Pass business ID in the URL
      navigate(`/agent-home-subcategory/${business.business_id}`, { 
        state: { 
          businessId: business.business_id,
          businessName: business.business_name,
          categoryId: business.categories?.[0] || null
        }
      });
    }
  };

  const loadMoreCategories = () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setCategoriesToShow(prev => prev + INCREMENT_COUNT);
      setLoadingMore(false);
    }, 500);
  };

  if (loading) {
    return (
      <div>
        <AgentNavbar />
        <div className="mani-as-offer-wrapper">
          <div className="mani-as-offer-loading">Loading businesses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AgentNavbar />
        <div className="mani-as-offer-wrapper">
          <div className="mani-as-offer-error">
            Error loading businesses: {error}
            <button 
              onClick={() => fetchAllBusinesses(currentUserId)} 
              className="retry-btn"
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (businesses.length === 0) {
    return (
      <div>
        <AgentNavbar />
        <div className="mani-as-offer-wrapper">
          <div className="mani-as-offer-loading">
            {currentUserId && currentUserId !== "null" 
              ? `No other businesses available at the moment. Your business (User ID: ${currentUserId}) is currently listed, but no other businesses exist.` 
              : "Please log in to view businesses."}
          </div>
        </div>
      </div>
    );
  }

  // Get all categories that have businesses
  const allCategoriesWithBusinesses = Object.keys(groupedBusinesses).filter(
    categoryId => groupedBusinesses[categoryId].length > 0
  );
  
  const hasMoreCategories = displayedCategories.length < allCategoriesWithBusinesses.length;

  return (
    <div>
      <AgentNavbar />
      <Categories/>
      
      <div className="agent-home-container">
        {/* Businesses Carousel Sections */}
        {displayedCategories.length === 0 ? (
          <div className="mani-as-offer-wrapper">
            <div className="mani-as-offer-loading">
              No categories with businesses available.
            </div>
          </div>
        ) : (
          <>
            {displayedCategories.map((categoryId) => {
              const categoryBusinesses = groupedBusinesses[categoryId];
              const categoryInfo = categoriesMap[categoryId];
              const categoryName = categoryInfo?.name || "Businesses";
              
              // Show only up to 3 businesses per category
              const displayBusinesses = categoryBusinesses.slice(0, 3);
              
              return (
                <div key={categoryId} className="mani-as-offer-wrapper">
                  {/* Header */}
                  <div className="mani-as-offer-header">
                    <h2 className="mani-as-offer-heading">
                      {categoriesLoading ? (
                        <span className="mani-as-offer-loading-dots">Loading Category</span>
                      ) : (
                        categoryName
                      )}
                    </h2>
                    <div className="mani-as-offer-viewall-wrap">
                      <button 
                        onClick={() => handleViewAll(categoryId)} 
                        className="mani-as-offer-viewall-btn"
                      >
                        <span className="mani-as-viewall-circle">→</span>
                      </button>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="mani-as-offer-cards-grid">
                    {displayBusinesses.map((business) => {
                      const offer = offersMap[business.offer];
                      const discountValue = offer?.value || 0;
                      
                      const bannerImage = business.banner 
                        ? business.banner.startsWith('http') 
                          ? business.banner 
                          : `${baseurl}${business.banner}`
                        : null;

                      return (
                        <div 
                          className="mani-as-offer-card-item" 
                          key={business.business_id}
                          onClick={() => handleBusinessClick(business)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div
                            className="mani-as-offer-card"
                            style={{ 
                              backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
                              backgroundColor: bannerImage ? 'transparent' : '#f0f0f0',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            {/* Business Info Overlay */}
                            {/* <div className="mani-as-offer-card-overlay">
                              <h3 className="mani-as-offer-business-name" style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '10px',
                                color: 'white',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                fontSize: '14px',
                                margin: 0
                              }}>
                                {business.business_name}
                              </h3>
                              {discountValue > 0 && (
                                <div className="mani-as-offer-discount-badge" style={{
                                  position: 'absolute',
                                  top: '10px',
                                  right: '10px',
                                  backgroundColor: '#ff4444',
                                  color: 'white',
                                  padding: '5px 10px',
                                  borderRadius: '20px',
                                  fontSize: '12px',
                                  fontWeight: 'bold'
                                }}>
                                  {discountValue}% OFF
                                </div>
                              )}
                            </div> */}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* Load More Button */}
            {hasMoreCategories && (
              <div className="load-more-container" style={{ textAlign: 'center', margin: '30px 0' }}>
                <button 
                  onClick={loadMoreCategories}
                  className="load-more-btn"
                  disabled={loadingMore}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#f78e24',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: loadingMore ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    opacity: loadingMore ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loadingMore) {
                      e.target.style.backgroundColor = '#e67e22';
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loadingMore) {
                      e.target.style.backgroundColor = '#f78e24';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {loadingMore ? (
                    <>
                      <span className="loading-spinner" style={{
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.6s linear infinite',
                        marginRight: '8px',
                        verticalAlign: 'middle'
                      }}></span>
                      Loading More...
                    </>
                  ) : (
                    `View More (${allCategoriesWithBusinesses.length - displayedCategories.length} remaining)`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Add CSS animation for spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AgentHome;