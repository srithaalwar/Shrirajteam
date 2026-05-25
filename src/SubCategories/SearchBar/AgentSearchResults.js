// AgentSearchResults.js - with agent- prefixed class names
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import { FaSearch, FaArrowLeft, FaBox } from 'react-icons/fa';
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
      // REMOVED: exclude_user_id parameter completely
      const productsRes = await axios.get(`${baseurl}/products/`, {
        params: { 
          search: searchQuery, 
          limit: 50
        }
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
      
      setResults(products);
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
    }
  };
  
  const getTypeIcon = (type) => {
    return <FaBox />;
  };
  
  const getTypeLabel = (type) => {
    return 'Product';
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
      <div className="agent-search-results-container">
        <div className="agent-search-results-empty">
          <FaSearch className="agent-empty-icon" />
          <h3>No Search Query</h3>
          <p>Please enter a search term to see results.</p>
          <button onClick={() => navigate(-1)} className="agent-back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="agent-search-results-container">
      <div className="agent-search-results-header">
        <button onClick={() => navigate(-1)} className="agent-back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>Search Results</h1>
      </div>
      
      <div className="agent-search-info">
        <p>
          Found <strong>{results.length}</strong> product{results.length !== 1 ? 's' : ''} for 
          <strong> "{searchQuery}"</strong>
        </p>
      </div>
      
      {loading ? (
        <div className="agent-search-loading">
          <div className="agent-loading-spinner"></div>
          <p>Searching for "{searchQuery}"...</p>
        </div>
      ) : error ? (
        <div className="agent-search-error">
          <p>{error}</p>
          <button onClick={fetchSearchResults} className="agent-retry-button">
            Try Again
          </button>
        </div>
      ) : results.length > 0 ? (
        <div className="agent-results-grid">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="agent-result-card"
              onClick={() => handleResultClick(result)}
            >
              <div className="agent-result-image">
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
                  <div className="agent-result-image-placeholder">
                    {getTypeIcon(result.type)}
                  </div>
                )}
                <span className="agent-result-type-badge">
                  {getTypeLabel(result.type)}
                </span>
              </div>
              
              <div className="agent-result-details">
                <h3 className="agent-result-title">{result.title || 'Untitled'}</h3>
                
                {result.type === 'product' && result.minPrice && (
                  <div className="agent-result-price">
                    {result.minPrice === result.maxPrice 
                      ? formatPrice(result.minPrice)
                      : `${formatPrice(result.minPrice)} - ${formatPrice(result.maxPrice)}`}
                  </div>
                )}
                
                {result.description && (
                  <p className="agent-result-description">
                    {result.description.substring(0, 100)}
                    {result.description.length > 100 ? '...' : ''}
                  </p>
                )}
                
                <button className="agent-view-details-btn">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="agent-no-results">
          <FaSearch className="agent-no-results-icon" />
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching "{searchQuery}"</p>
          <div className="agent-suggestions">
            <p>Try:</p>
            <ul>
              <li>Checking your spelling</li>
              <li>Using more general terms</li>
              <li>Browsing different categories</li>
            </ul>
          </div>
          <button onClick={() => navigate('/agent-home')} className="agent-browse-button">
            Browse All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentSearchResults;