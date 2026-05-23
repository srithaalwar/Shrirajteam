// AgentSearchBar.js - with agent- prefixed class names
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../../BaseURL/BaseURL';
import { FaSearch, FaBox } from 'react-icons/fa';
import './ClientSearchBar.css';

const ClientSearchBar = ({ placeholder = "Search products..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Get user_id from localStorage - try multiple possible keys
  const getUserId = () => {
    const userId = localStorage.getItem('user_id');
    if (userId) return userId;
    
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.user_id || userData.id;
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
    
    return null;
  };

  // Debounce function to avoid too many API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const performSearch = async (query) => {
    if (query.trim().length <= 1) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const userId = getUserId();
      
      let productsRes;
      try {
        const excludeParam = userId ? `?exclude_user_id=${userId}` : '';
        productsRes = await axios.get(`${baseurl}/products/${excludeParam}&variant_verification_status=verified&business_verification_status=verified`, {
          params: { 
            search: query, 
            limit: 10
          }
        });
      } catch (firstError) {
        console.error('First attempt failed:', firstError);
        try {
          productsRes = await axios.get(`${baseurl}/products/`, {
            params: { 
              q: query,
              limit: 10
            }
          });
        } catch (secondError) {
          productsRes = await axios.get(`${baseurl}/products/`, {
            params: { limit: 50 }
          });
        }
      }
      
      let productsData = [];
      if (productsRes.data.results && Array.isArray(productsRes.data.results)) {
        productsData = productsRes.data.results;
      } else if (Array.isArray(productsRes.data)) {
        productsData = productsRes.data;
      } else if (productsRes.data.data && Array.isArray(productsRes.data.data)) {
        productsData = productsRes.data.data;
      } else {
        productsData = [];
      }
      
      let filteredProducts = productsData;
      const searchLower = query.toLowerCase();
      
      if (!productsRes.config.params?.search && !productsRes.config.params?.q) {
        filteredProducts = productsData.filter(product => {
          const productName = (product.product_name || product.name || '').toLowerCase();
          const description = (product.description || '').toLowerCase();
          const category = (product.category_name || product.category || '').toLowerCase();
          
          return productName.includes(searchLower) || 
                 description.includes(searchLower) || 
                 category.includes(searchLower);
        });
      }
      
      const products = filteredProducts.map(p => {
        const firstVariant = p.variants && p.variants[0];
        const variantMedia = firstVariant?.media || [];
        const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
        
        let imageUrl = null;
        if (primaryImage?.file) {
          imageUrl = primaryImage.file.startsWith('http') ? primaryImage.file : `${baseurl}${primaryImage.file}`;
        } else if (p.image) {
          imageUrl = p.image.startsWith('http') ? p.image : `${baseurl}${p.image}`;
        } else if (p.product_image) {
          imageUrl = p.product_image.startsWith('http') ? p.product_image : `${baseurl}${p.product_image}`;
        }
        
        return {
          ...p,
          type: 'product',
          title: p.product_name || p.name || 'Untitled',
          id: p.product_id || p.id,
          variant_id: firstVariant?.id || p.variant_id,
          image: imageUrl,
          price: firstVariant?.selling_price || p.selling_price || p.price,
          mrp: firstVariant?.mrp || p.mrp,
          stock: firstVariant?.stock || p.stock
        };
      });
      
      setSearchResults(products);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Debounced search
  const debouncedSearch = useRef(
    debounce((query) => performSearch(query), 500)
  ).current;

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/agent-search-results?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  // Handle result click
  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    if (result.type === 'product') {
      const productId = result.id;
      const variantId = result.variant_id;
      if (productId && variantId) {
        navigate(`/client-business-product-details/${productId}/?variant=${variantId}`);
      } else if (productId) {
        navigate(`/client-business-product-details/${productId}/`);
      } else {
        navigate(`/agent-product-details/${result.id}`);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getResultIcon = (type) => {
    return <FaBox size={24} color="#666" />;
  };

  const getTypeLabel = (type) => {
    return 'Product';
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return `₹${parseFloat(price).toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <div className="agent-search-container" ref={searchRef}>
      <form className="agent-search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="agent-search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            if (searchQuery.trim() && searchResults.length > 0) {
              setShowResults(true);
            }
          }}
          autoComplete="off"
        />
        
        <button type="submit" className="agent-search-btn">
          <FaSearch />
        </button>
      </form>
      
      {showResults && (
        <div className="agent-search-results">
          {isLoading ? (
            <div className="agent-search-loading">
              <div className="agent-loading-spinner"></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div 
                key={result.id || index}
                className="agent-search-result-item"
                onClick={() => handleResultClick(result)}
              >
                <div className="agent-result-icon">
                  {result.image ? (
                    <img 
                      src={result.image} 
                      alt={result.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        const parent = e.target.parentNode;
                        if (parent) {
                          parent.innerHTML = '';
                          parent.appendChild(getResultIcon(result.type));
                        }
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    getResultIcon(result.type)
                  )}
                </div>
                <div className="agent-result-content">
                  <div className="agent-result-title">
                    {result.title || 'Untitled'}
                  </div>
                  <div className="agent-result-type">
                    {getTypeLabel(result.type)}
                  </div>
                  {result.price && (
                    <div className="agent-result-price">
                      {formatPrice(result.price)}
                    </div>
                  )}
                  {result.stock !== undefined && result.stock === 0 && (
                    <div className="agent-result-stock agent-out-of-stock">Out of Stock</div>
                  )}
                  {result.stock !== undefined && result.stock > 0 && (
                    <div className="agent-result-stock agent-in-stock">In Stock</div>
                  )}
                </div>
              </div>
            ))
          ) : searchQuery.trim().length > 1 ? (
            <div className="agent-search-no-results">
              <div className="agent-no-results-icon">🔍</div>
              <div>No products found for "{searchQuery}"</div>
              <div className="agent-no-results-suggestion">
                Try checking your spelling or use different keywords
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ClientSearchBar;