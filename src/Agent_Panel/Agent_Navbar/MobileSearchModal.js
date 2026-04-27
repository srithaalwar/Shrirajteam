// MobileSearchModal.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import { FaSearch, FaTimes, FaBox } from 'react-icons/fa';
import './MobileSearchModal.css';

const MobileSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Get user_id from localStorage
  const getUserId = () => {
    const userId = localStorage.getItem('user_id');
    if (userId) return userId;
    
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.user_id || userData.id;
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
    return null;
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Perform search
  const performSearch = async (query) => {
    if (query.trim().length <= 1) {
      setSearchResults([]);
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
            limit: 20
          }
        });
      } catch (firstError) {
        try {
          productsRes = await axios.get(`${baseurl}/products/`, {
            params: { 
              q: query,
              limit: 20
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
      }
      
      // Filter client-side if needed
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

  const handleResultClick = (result) => {
    onClose();
    setSearchQuery('');
    setSearchResults([]);
    
    if (result.type === 'product') {
      const productId = result.id;
      const variantId = result.variant_id;
      if (productId && variantId) {
        navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
      } else if (productId) {
        navigate(`/agent-business-product-details/${productId}/`);
      } else {
        navigate(`/agent-product-details/${result.id}`);
      }
    }
  };

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ms-modal-overlay" onClick={onClose}>
      <div className="ms-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="ms-modal-header">
          <div className="ms-search-input-wrapper">
            <FaSearch className="ms-search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="ms-search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            {searchQuery && (
              <button className="ms-clear-btn" onClick={() => setSearchQuery('')}>
                <FaTimes />
              </button>
            )}
          </div>
          <button className="ms-cancel-btn" onClick={onClose}>Cancel</button>
        </div>
        
        <div className="ms-modal-body">
          {isLoading ? (
            <div className="ms-loading-state">
              <div className="ms-loading-spinner"></div>
              <p>Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="ms-results-list">
              {searchResults.map((result, index) => (
                <div 
                  key={result.id || index}
                  className="ms-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="ms-result-image">
                    {result.image ? (
                      <img src={result.image} alt={result.title} />
                    ) : (
                      <FaBox size={30} color="#999" />
                    )}
                  </div>
                  <div className="ms-result-info">
                    <div className="ms-result-title">{result.title}</div>
                    {result.price && (
                      <div className="ms-result-price">
                        ₹{parseFloat(result.price).toLocaleString('en-IN')}
                      </div>
                    )}
                    <div className="ms-result-type">Product</div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery.trim().length > 1 ? (
            <div className="ms-no-results">
              <div className="ms-no-results-icon">🔍</div>
              <p>No products found for "{searchQuery}"</p>
              <small>Try different keywords</small>
            </div>
          ) : (
            <div className="ms-initial-state">
              <div className="ms-search-icon-large">🔍</div>
              <p>Search for products</p>
              <small>Type to start searching...</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSearchModal;