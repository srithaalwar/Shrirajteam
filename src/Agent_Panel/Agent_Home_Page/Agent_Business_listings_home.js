import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { useNavigate } from "react-router-dom";

const AgentHome = () => {
  const [businesses, setBusinesses] = useState([]);
  const [offersMap, setOffersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [groupedBusinesses, setGroupedBusinesses] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Helper function to get user ID from localStorage
  const getUserIdFromStorage = () => {
    try {
      // Try to get user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        return parsedUser?.id || parsedUser?.user_id || null;
      }
      
      // Alternative: check for direct user_id in localStorage
//       const userId = localStorage.getItem('user_id');
      const userId = 29;
      if (userId) return userId;
      
      return null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  };

  useEffect(() => {
    const userId = getUserIdFromStorage();
    setCurrentUserId(userId);
    fetchAllBusinesses(userId);
    fetchOffers();
    fetchAllCategories();
  }, []);

  const fetchAllBusinesses = async (userId) => {
    setLoading(true);
    try {
      // Build URL with exclude_user_id if user ID exists
      let url = `${baseurl}/business/`;
      if (userId) {
        url = `${baseurl}/business/?exclude_user_id=${userId}`;
      }
      
      console.log("Fetching businesses from:", url); // Debug log
      const res = await fetch(url);
      const data = await res.json();
      
      const businessesData = data.results || data || [];
      
      // Filter businesses that have banners
      const businessesWithBanners = businessesData.filter(business => 
        business.banner && business.banner.trim() !== "" && business.is_active === true
      );
      
      console.log("Businesses fetched:", businessesWithBanners.length); // Debug log
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
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch(`${baseurl}/categories/`);
      const data = await res.json();
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

  const handleViewAll = (categoryId) => {
    navigate(`/w-subcategory/${categoryId}`);
  };

  const handleBusinessClick = (business) => {
    if (business.categories && business.categories.length > 0) {
      navigate(`/w-subcategory/${business.categories[0]}`);
    }
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

  if (businesses.length === 0) {
    return (
      <div>
        <AgentNavbar />
        <div className="mani-as-offer-wrapper">
          <div className="mani-as-offer-loading">No businesses available at the moment.</div>
        </div>
      </div>
    );
  }

  // Display only categories that have at least one business
  const categoriesWithBusinesses = Object.keys(groupedBusinesses).filter(
    categoryId => groupedBusinesses[categoryId].length > 0
  );

  return (
    <div>
      <AgentNavbar />
      
      <div className="agent-home-container">
        {/* Welcome Section */}
        {/* <div className="agent-welcome-section">
          <h1 className="agent-welcome-title">Welcome, Agent!</h1>
          <p className="agent-welcome-subtitle">Discover and manage businesses in your area</p>
        </div> */}

        {/* Businesses Carousel Sections */}
        {categoriesWithBusinesses.map((categoryId) => {
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
                    >
                      <div
                        className="mani-as-offer-card"
                        style={{ 
                          backgroundImage: bannerImage ? `url(${bannerImage})` : 'none',
                          backgroundColor: bannerImage ? 'transparent' : '#f0f0f0'
                        }}
                      >
                        {/* Business Info Overlay */}
                        <div className="mani-as-offer-card-overlay">
                          <h3 className="mani-as-offer-business-name">{business.business_name}</h3>
                          {discountValue > 0 && (
                            <div className="mani-as-offer-discount-badge">
                              {discountValue}% OFF
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentHome;