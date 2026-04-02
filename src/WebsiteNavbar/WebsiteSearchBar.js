import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../BaseURL/BaseURL';
import { FaSearch, FaBox } from 'react-icons/fa';
import './WebsiteSearchBar.css';

const WebsiteSearchBar = ({ placeholder = "Search products..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Search function - Products only
  const performSearch = async (query) => {
    if (query.trim().length <= 1) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      // Search Products only
      const productsRes = await axios.get(`${baseurl}/products/`, {
        params: { search: query, limit: 10 }
      });
      
      const productsData = productsRes.data.results || productsRes.data || [];
      const products = productsData.map(p => {
        const firstVariant = p.variants && p.variants[0];
        const variantMedia = firstVariant?.media || [];
        const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
        
        return {
          ...p,
          type: 'product',
          title: p.product_name || p.name,
          id: p.product_id,
          product_id: p.product_id, // Add explicit product_id
          variant_id: firstVariant?.id,
          image: primaryImage?.file || p.image,
          price: firstVariant?.selling_price,
          route: `/product/${p.product_id}/`, // Changed route pattern
        };
      });
      
      setSearchResults(products.slice(0, 10));
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useRef(
    debounce((query) => performSearch(query), 500)
  ).current;

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    // Fixed navigation logic
    if (result.route) {
      navigate(result.route);
    } else if (result.type === 'product' && result.product_id) {
      // Use product_id instead of id for consistency
      navigate(`/product/${result.product_id}/`);
    } else if (result.id) {
      // Fallback
      navigate(`/product/${result.id}/`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getResultIcon = () => {
    return <FaBox />;
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return `₹${parseFloat(price).toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`;
  };

  // Helper function to get correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    // Remove any duplicate baseurl
    if (imagePath.startsWith(baseurl)) return imagePath;
    return `${baseurl}${imagePath}`;
  };

  return (
    <div className="wn-website-search-container" ref={searchRef}>
      <form className="wn-website-search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="wn-website-search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => searchQuery.trim() && setShowResults(true)}
          autoComplete="off"
        />
        <button type="submit" className="wn-website-search-btn">
          <FaSearch />
        </button>
      </form>
      
      {showResults && (
        <div className="wn-website-search-results">
          {isLoading ? (
            <div className="wn-website-search-loading">
              <div className="wn-website-loading-spinner"></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div 
                key={result.product_id || index}
                className="wn-website-search-result-item"
                onClick={() => handleResultClick(result)}
              >
                <div className="wn-website-result-icon">
                  {result.image ? (
                    <img 
                      src={getImageUrl(result.image)}
                      alt={result.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        const parent = e.target.parentNode;
                        if (parent) {
                          const icon = document.createElement('div');
                          icon.innerHTML = getResultIcon();
                          parent.appendChild(icon);
                        }
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    getResultIcon()
                  )}
                </div>
                <div className="wn-website-result-content">
                  <div className="wn-website-result-title">
                    {result.title || 'Untitled'}
                  </div>
                  <div className="wn-website-result-type">
                    Product
                  </div>
                  {result.price && (
                    <div className="wn-website-result-price">
                      {formatPrice(result.price)}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : searchQuery.trim().length > 1 ? (
            <div className="wn-website-search-no-results">
              <div className="wn-website-no-results-icon">🔍</div>
              <div>No products found for "{searchQuery}"</div>
              <div className="wn-website-no-results-suggestion">
                Try checking your spelling or use different keywords
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default WebsiteSearchBar;