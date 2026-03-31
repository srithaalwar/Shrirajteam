// src/Agent_Panel/Pages/AgentSearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import { FaTag, FaSearch, FaArrowLeft, FaBox, FaStore, FaHandshake } from 'react-icons/fa';
import './AgentSearchResults.css';

const AgentSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      let results = [];
      
      // Search Products
      try {
        const productsRes = await axios.get(`${baseurl}/products/`, {
          params: { search: searchQuery, limit: 50 }
        });
        
        const productsData = productsRes.data.results || productsRes.data || [];
        const products = productsData.map(p => {
          // Get variants
          const variants = p.variants || [];
          const firstVariant = variants[0];
          const variantMedia = firstVariant?.media || [];
          const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
          
          // Get all variant prices
          const prices = variants.map(v => parseFloat(v.selling_price)).filter(p => !isNaN(p));
          const minPrice = prices.length > 0 ? Math.min(...prices) : null;
          const maxPrice = prices.length > 0 ? Math.max(...prices) : null;
          
          return {
            ...p,
            type: 'product',
            title: p.product_name,
            id: p.product_id,
            variants: variants,
            image: primaryImage?.file || p.image,
            minPrice: minPrice,
            maxPrice: maxPrice,
            description: p.description,
            hasVariants: p.has_variants,
            rating: p.rating,
            ratingCount: p.rating_count
          };
        });
        results = [...results, ...products];
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
          title: b.business_name,
          id: b.business_id,
          image: b.logo,
          description: b.description,
          rating: b.rating,
          ratingCount: b.rating_count,
          location: `${b.city}, ${b.state}`,
          verificationStatus: b.verification_status
        }));
        results = [...results, ...businesses];
      } catch (err) {
        console.error('Error fetching businesses:', err);
      }
      
      // Search Service Providers (if endpoint exists)
      try {
        const providersRes = await axios.get(`${baseurl}/service-providers/`, {
          params: { search: searchQuery, limit: 50 }
        });
        
        const providersData = providersRes.data.results || providersRes.data || [];
        const providers = providersData.map(s => ({
          ...s,
          type: 'service',
          title: s.name || s.service_name,
          id: s.id,
          image: s.image,
          description: s.description
        }));
        results = [...results, ...providers];
      } catch (err) {
        console.error('Error fetching service providers:', err);
      }
      
      // Search Offers (if endpoint exists)
      try {
        const offersRes = await axios.get(`${baseurl}/offers/`, {
          params: { search: searchQuery, limit: 50 }
        });
        
        const offersData = offersRes.data.results || offersRes.data || [];
        const offers = offersData.map(o => ({
          ...o,
          type: 'offer',
          title: o.title || o.offer_name,
          id: o.id,
          image: o.image,
          description: o.description
        }));
        results = [...results, ...offers];
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
      
      setResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleResultClick = (result) => {
    if (result.type === 'product') {
      navigate(`/agent-business-product-details/${result.id}/`);
    } else if (result.type === 'business') {
      navigate(`/agent-my-business/${result.id}`);
    } else if (result.type === 'service') {
      navigate(`/a-service-providers/${result.id}`);
    } else if (result.type === 'offer') {
      navigate(`/agent-offers/${result.id}`);
    }
  };
  
  const getTypeIcon = (type) => {
    switch(type) {
      case 'product':
        return <FaBox />;
      case 'business':
        return <FaStore />;
      case 'service':
        return <FaHandshake />;
      case 'offer':
        return <FaTag />;
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
      case 'service':
        return 'Service Provider';
      case 'offer':
        return 'Offer';
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
  
  if (!searchQuery) {
    return (
      <div className="search-results-container">
        <div className="search-results-empty">
          <FaSearch className="empty-icon" />
          <h3>No Search Query</h3>
          <p>Please enter a search term to see results.</p>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="search-results-container">
      <div className="search-results-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>Search Results</h1>
      </div>
      
      <div className="search-info">
        <p>
          Found <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''} for 
          <strong> "{searchQuery}"</strong>
        </p>
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
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="result-card"
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
              </div>
              
              <div className="result-details">
                <h3 className="result-title">{result.title || 'Untitled'}</h3>
                
                {result.type === 'product' && result.minPrice && (
                  <div className="result-price">
                    {result.minPrice === result.maxPrice 
                      ? formatPrice(result.minPrice)
                      : `${formatPrice(result.minPrice)} - ${formatPrice(result.maxPrice)}`}
                  </div>
                )}
                
                {result.type === 'business' && result.location && (
                  <div className="result-location">
                    📍 {result.location}
                  </div>
                )}
                
                {result.type === 'business' && result.verificationStatus && (
                  <div className="result-verification">
                    <span className={`verification-badge ${result.verificationStatus}`}>
                      {result.verificationStatus === 'verified' ? '✓ Verified' : 'Pending Verification'}
                    </span>
                  </div>
                )}
                
                {result.rating > 0 && (
                  <div className="result-rating">
                    {'★'.repeat(Math.floor(result.rating))}
                    {'☆'.repeat(5 - Math.floor(result.rating))}
                    <span className="rating-value"> {result.rating}</span>
                    {result.ratingCount > 0 && (
                      <span className="rating-count"> ({result.ratingCount})</span>
                    )}
                  </div>
                )}
                
                {result.description && (
                  <p className="result-description">
                    {result.description.substring(0, 100)}
                    {result.description.length > 100 ? '...' : ''}
                  </p>
                )}
                
                <button className="view-details-btn">
                  View Details
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
          <button onClick={() => navigate('/agent-home')} className="browse-button">
            Browse All Listings
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentSearchResults;