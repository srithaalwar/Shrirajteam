// src/Client_Panel/Pages/ClientSearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import { FaSearch, FaArrowLeft, FaBox, FaStore, FaStar, FaRupeeSign } from 'react-icons/fa';
import './ClientSearchResults.css';

const ClientSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // all, products, businesses
  
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [searchQuery]);
  
  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let allResults = [];
      
      // Search Products
      try {
        const productsRes = await axios.get(`${baseurl}/products/`, {
          params: { search: searchQuery, limit: 50 }
        });
        
        const productsData = productsRes.data.results || productsRes.data || [];
        const products = productsData.map(p => {
          const firstVariant = p.variants && p.variants[0];
          const variantMedia = firstVariant?.media || [];
          const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
          
          // Get all variant prices
          const prices = (p.variants || []).map(v => parseFloat(v.selling_price)).filter(price => !isNaN(price));
          const minPrice = prices.length > 0 ? Math.min(...prices) : null;
          const maxPrice = prices.length > 0 ? Math.max(...prices) : null;
          
          return {
            ...p,
            type: 'product',
            category: 'product',
            title: p.product_name || p.name,
            id: p.product_id,
            variant_id: firstVariant?.id,
            image: primaryImage?.file || p.image,
            minPrice: minPrice,
            maxPrice: maxPrice,
            description: p.description,
            rating: p.rating,
            ratingCount: p.rating_count,
            inStock: (p.variants || []).some(v => v.stock > 0),
            route: `/client-business-product-details/${p.product_id}/`
          };
        });
        allResults = [...allResults, ...products];
      } catch (err) {
        console.error('Error fetching products:', err);
      }
      
      // Search Businesses
      try {
        const businessesRes = await axios.get(`${baseurl}/business/`, {
          params: { search: searchQuery, limit: 50 }
        });
        
        const businessesData = businessesRes.data.results || businessesRes.data || [];
        const businesses = businessesData.map(b => ({
          ...b,
          type: 'business',
          category: 'business',
          title: b.business_name,
          id: b.business_id,
          image: b.logo,
          description: b.description,
          rating: b.rating,
          ratingCount: b.rating_count,
          location: b.city && b.state ? `${b.city}, ${b.state}` : null,
          verificationStatus: b.verification_status,
          route: `/client-business-details/${b.business_id}`
        }));
        allResults = [...allResults, ...businesses];
      } catch (err) {
        console.error('Error fetching businesses:', err);
      }
      
      setResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResultClick = (result) => {
    if (result.route) {
      navigate(result.route);
    } else if (result.type === 'product') {
      navigate(`/client-business-product-details/${result.id}/`);
    } else if (result.type === 'business') {
      navigate(`/client-business-details/${result.id}`);
    }
  };
  
  const getTypeIcon = (type) => {
    switch(type) {
      case 'product':
        return <FaBox />;
      case 'business':
        return <FaStore />;
      default:
        return <FaSearch />;
    }
  };
  
  const getTypeLabel = (type) => {
    switch(type) {
      case 'product':
        return 'Product';
      case 'business':
        return 'Business';
      default:
        return type;
    }
  };
  
  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media/')) return `${baseurl}${imagePath}`;
    return `${baseurl}/media/${imagePath}`;
  };
  
  const formatPrice = (price) => {
    if (!price) return null;
    return `₹${parseFloat(price).toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`;
  };
  
  const formatPriceRange = (minPrice, maxPrice) => {
    if (!minPrice && !maxPrice) return null;
    if (minPrice === maxPrice) return formatPrice(minPrice);
    if (minPrice && maxPrice) return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    if (minPrice) return `From ${formatPrice(minPrice)}`;
    if (maxPrice) return `Up to ${formatPrice(maxPrice)}`;
    return null;
  };
  
  const renderStars = (rating, ratingCount) => {
    if (!rating || rating === 0) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="result-rating-stars">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="star-full" />
        ))}
        {halfStar && <FaStar className="star-half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="star-empty" />
        ))}
        <span className="rating-value">{rating}</span>
        {ratingCount > 0 && (
          <span className="rating-count">({ratingCount})</span>
        )}
      </div>
    );
  };
  
  // Filter results based on active filter
  const filteredResults = results.filter(result => {
    if (activeFilter === 'all') return true;
    return result.category === activeFilter;
  });
  
  // Get counts for filters
  const productCount = results.filter(r => r.category === 'product').length;
  const businessCount = results.filter(r => r.category === 'business').length;
  
  if (!searchQuery) {
    return (
      <div className="client-search-results-container">
        <div className="search-results-empty">
          <FaSearch className="empty-icon" />
          <h3>No Search Query</h3>
          <p>Please enter a search term to see results.</p>
          <button onClick={() => navigate(-1)} className="back-button">
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="client-search-results-container">
      <div className="search-results-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>Search Results</h1>
      </div>
      
      <div className="search-info">
        <p>
          Found <strong>{filteredResults.length}</strong> result{filteredResults.length !== 1 ? 's' : ''} for 
          <strong> "{searchQuery}"</strong>
        </p>
      </div>
      
      {/* Filter Tabs - Only Products and Businesses */}
      <div className="search-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All ({results.length})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'product' ? 'active' : ''}`}
          onClick={() => setActiveFilter('product')}
        >
          <FaBox /> Products ({productCount})
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'business' ? 'active' : ''}`}
          onClick={() => setActiveFilter('business')}
        >
          <FaStore /> Businesses ({businessCount})
        </button>
      </div>
      
      {loading ? (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching for "{searchQuery}"...</p>
        </div>
      ) : error ? (
        <div className="search-error">
          <p>{error}</p>
          <button onClick={fetchSearchResults} className="retry-button">
            Try Again
          </button>
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="results-grid">
          {filteredResults.map((result, index) => (
            <div 
              key={`${result.type}-${result.id}-${index}`}
              className={`result-card ${result.type}`}
              onClick={() => handleResultClick(result)}
            >
              <div className="result-image">
                {result.image ? (
                  <img 
                    src={getFullImageUrl(result.image)} 
                    alt={result.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className="result-image-placeholder">
                    {getTypeIcon(result.type)}
                  </div>
                )}
                <span className="result-type-badge">
                  {getTypeLabel(result.type)}
                </span>
                {result.type === 'product' && result.inStock === false && (
                  <span className="out-of-stock-badge">Out of Stock</span>
                )}
                {result.type === 'business' && result.verificationStatus === 'verified' && (
                  <span className="verified-badge">✓ Verified</span>
                )}
              </div>
              
              <div className="result-details">
                <h3 className="result-title">{result.title || 'Untitled'}</h3>
                
                {/* Price Section - Only for products */}
                {result.type === 'product' && result.minPrice && (
                  <div className="result-price">
                    <FaRupeeSign className="price-icon" />
                    {formatPriceRange(result.minPrice, result.maxPrice)}
                  </div>
                )}
                
                {/* Location Section - Only for businesses */}
                {result.type === 'business' && result.location && (
                  <div className="result-location">
                    📍 {result.location}
                  </div>
                )}
                
                {/* Rating Section */}
                {result.rating > 0 && (
                  <div className="result-rating">
                    {renderStars(result.rating, result.ratingCount)}
                  </div>
                )}
                
                {/* Description */}
                {result.description && (
                  <p className="result-description">
                    {result.description.substring(0, 100)}
                    {result.description.length > 100 ? '...' : ''}
                  </p>
                )}
                
                <button className="view-details-btn">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <FaSearch className="no-results-icon" />
          <h3>No Results Found</h3>
          <p>We couldn't find any matches for "{searchQuery}"</p>
          <div className="suggestions">
            <p>Try:</p>
            <ul>
              <li>Checking your spelling</li>
              <li>Using more general terms</li>
              <li>Browsing different categories</li>
            </ul>
          </div>
          <button onClick={() => navigate('/client-dashboard')} className="browse-button">
            Browse All Listings
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientSearchResults;