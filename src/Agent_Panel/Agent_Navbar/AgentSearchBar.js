// // AgentSearchBar.js
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { baseurl } from '../../BaseURL/BaseURL';
// import { FaSearch, FaBox, FaStore, FaHandshake, FaTag } from 'react-icons/fa';
// import './AgentSearchBar.css';

// const AgentSearchBar = ({ placeholder = "Search products, businesses, services..." }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   // Debounce function to avoid too many API calls
//   const debounce = (func, delay) => {
//     let timeoutId;
//     return (...args) => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => func(...args), delay);
//     };
//   };

//   // Search function - searches all categories
//   const performSearch = async (query) => {
//     if (query.trim().length <= 1) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       let results = [];
      
//       // Search Products
//       try {
//         const productsRes = await axios.get(`${baseurl}/products/`, {
//           params: { search: query, limit: 5 }
//         });
        
//         // Handle paginated response
//         const productsData = productsRes.data.results || productsRes.data || [];
//         const products = productsData.map(p => {
//           // Get the first variant for price and image
//           const firstVariant = p.variants && p.variants[0];
//           const variantMedia = firstVariant?.media || [];
//           const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
          
//           return {
//             ...p,
//             type: 'product',
//             title: p.product_name || p.name,
//             id: p.product_id,
//             variant_id: firstVariant?.id,
//             image: primaryImage?.file || p.image,
//             price: firstVariant?.selling_price || p.price,
//             mrp: firstVariant?.mrp,
//             stock: firstVariant?.stock
//           };
//         });
//         results = [...results, ...products];
//       } catch (err) {
//         console.error('Error searching products:', err);
//       }
      
//       // Search Businesses
//       try {
//         const businessesRes = await axios.get(`${baseurl}/business/`, {
//           params: { search: query, limit: 5 }
//         });
        
//         // Handle paginated response
//         const businessesData = businessesRes.data.results || businessesRes.data || [];
//         const businesses = businessesData.map(b => ({
//           ...b,
//           type: 'business',
//           title: b.business_name || b.name,
//           id: b.business_id,
//           image: b.logo,
//           description: b.description
//         }));
//         results = [...results, ...businesses];
//       } catch (err) {
//         console.error('Error searching businesses:', err);
//       }
      
//       // Search Service Providers (if endpoint exists)
//       try {
//         const providersRes = await axios.get(`${baseurl}/service-providers/`, {
//           params: { search: query, limit: 5 }
//         });
        
//         const providersData = providersRes.data.results || providersRes.data || [];
//         const providers = providersData.map(s => ({
//           ...s,
//           type: 'service',
//           title: s.name || s.service_name,
//           id: s.id,
//           image: s.image
//         }));
//         results = [...results, ...providers];
//       } catch (err) {
//         console.error('Error searching service providers:', err);
//       }
      
//       // Search Offers (if endpoint exists)
//       try {
//         const offersRes = await axios.get(`${baseurl}/offers/`, {
//           params: { search: query, limit: 5 }
//         });
        
//         const offersData = offersRes.data.results || offersRes.data || [];
//         const offers = offersData.map(o => ({
//           ...o,
//           type: 'offer',
//           title: o.title || o.offer_name,
//           id: o.id,
//           image: o.image
//         }));
//         results = [...results, ...offers];
//       } catch (err) {
//         console.error('Error searching offers:', err);
//       }
      
//       setSearchResults(results.slice(0, 10));
//       setShowResults(true);
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Debounced search
//   const debouncedSearch = useRef(
//     debounce((query) => performSearch(query), 500)
//   ).current;

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedSearch(query);
//   };

//   // Handle search submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/agent-search-results?q=${encodeURIComponent(searchQuery)}`);
//       setShowResults(false);
//     }
//   };

//   // Handle result click
//   const handleResultClick = (result) => {
//     setShowResults(false);
//     setSearchQuery('');
    
//     // Navigate based on result type
//     if (result.type === 'product') {
//       const productId = result.id;
//       const variantId = result.variant_id;
//       if (productId && variantId) {
//         navigate(`/agent-business-product-details/${productId}/?variant=${variantId}`);
//       } else if (productId) {
//         navigate(`/agent-business-product-details/${productId}/`);
//       } else {
//         navigate(`/agent-product-details/${result.id}`);
//       }
//     } else if (result.type === 'business') {
//       navigate(`/view-business/${result.id}`);
//     } else if (result.type === 'service') {
//       navigate(`/a-service-providers/${result.id}`);
//     } else if (result.type === 'offer') {
//       navigate(`/agent-offers/${result.id}`);
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Get icon based on result type
//   const getResultIcon = (type) => {
//     switch(type) {
//       case 'product':
//         return <FaBox />;
//       case 'business':
//         return <FaStore />;
//       case 'service':
//         return <FaHandshake />;
//       case 'offer':
//         return <FaTag />;
//       default:
//         return <FaSearch />;
//     }
//   };

//   // Get type label
//   const getTypeLabel = (type) => {
//     switch(type) {
//       case 'product':
//         return 'Product';
//       case 'business':
//         return 'Business';
//       case 'service':
//         return 'Service Provider';
//       case 'offer':
//         return 'Offer';
//       default:
//         return type;
//     }
//   };

//   // Format price
//   const formatPrice = (price) => {
//     if (!price) return null;
//     return `₹${parseFloat(price).toLocaleString('en-IN', {
//       maximumFractionDigits: 0
//     })}`;
//   };

//   return (
//     <div className="wn-search-container" ref={searchRef}>
//       <form className="wn-search-form" onSubmit={handleSearchSubmit}>
//         {/* Search Input - Simple without category dropdown */}
//         <input
//           type="text"
//           className="wn-search-input"
//           placeholder={placeholder}
//           value={searchQuery}
//           onChange={handleSearchChange}
//           onFocus={() => searchQuery.trim() && setShowResults(true)}
//           autoComplete="off"
//         />
        
//         {/* Search Button */}
//         <button type="submit" className="wn-search-btn">
//           <FaSearch />
//         </button>
//       </form>
      
//       {/* Search Results Dropdown */}
//       {showResults && (
//         <div className="wn-search-results">
//           {isLoading ? (
//             <div className="wn-search-loading">
//               <div className="wn-loading-spinner"></div>
//               Searching...
//             </div>
//           ) : searchResults.length > 0 ? (
//             searchResults.map((result, index) => (
//               <div 
//                 key={index}
//                 className="wn-search-result-item"
//                 onClick={() => handleResultClick(result)}
//               >
//                 <div className="wn-result-icon">
//                   {result.image ? (
//                     <img 
//                       src={result.image.startsWith('http') ? result.image : `${baseurl}${result.image}`} 
//                       alt={result.title}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.style.display = 'none';
//                         e.target.parentNode.innerHTML = getResultIcon(result.type);
//                       }}
//                       style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
//                     />
//                   ) : (
//                     getResultIcon(result.type)
//                   )}
//                 </div>
//                 <div className="wn-result-content">
//                   <div className="wn-result-title">
//                     {result.title || 'Untitled'}
//                   </div>
//                   <div className="wn-result-type">
//                     {getTypeLabel(result.type)}
//                   </div>
//                   {result.price && (
//                     <div className="wn-result-price">
//                       {formatPrice(result.price)}
//                     </div>
//                   )}
//                   {result.stock !== undefined && result.stock === 0 && (
//                     <div className="wn-result-stock">Out of Stock</div>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : searchQuery.trim().length > 1 ? (
//             <div className="wn-search-no-results">
//               <div className="wn-no-results-icon">🔍</div>
//               <div>No results found for "{searchQuery}"</div>
//               <div className="wn-no-results-suggestion">
//                 Try checking your spelling or use different keywords
//               </div>
//             </div>
//           ) : null}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AgentSearchBar;


//-------------------------------------------------



// AgentSearchBar.js
// AgentSearchBar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseurl } from '../../BaseURL/BaseURL';
import { FaSearch, FaBox } from 'react-icons/fa';
import './AgentSearchBar.css';

const AgentSearchBar = ({ placeholder = "Search products..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Get user_id from localStorage - try multiple possible keys
  const getUserId = () => {
    // Try different ways to get user ID
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

  // Search function - FIXED: Don't use exclude_user_id if it's not supported
  // const performSearch = async (query) => {
  //   if (query.trim().length <= 1) {
  //     setSearchResults([]);
  //     setShowResults(false);
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     // Option 1: Try without exclude_user_id first (most reliable)
  //     let productsRes;
  //     try {
  //       productsRes = await axios.get(`${baseurl}/products/?exclude_user_id=37`, {
  //         params: { 
  //           search: query, 
  //           limit: 10
  //         }
  //       });
  //     } catch (firstError) {
  //       console.error('First attempt failed:', firstError);
  //       // Option 2: Try with different parameter name
  //       try {
  //         productsRes = await axios.get(`${baseurl}/products/`, {
  //           params: { 
  //             q: query,  // Try 'q' instead of 'search'
  //             limit: 10
  //           }
  //         });
  //       } catch (secondError) {
  //         // Option 3: Try without any search param, then filter client-side
  //         productsRes = await axios.get(`${baseurl}/products/`, {
  //           params: { limit: 50 }
  //         });
  //       }
  //     }
      
  //     // Handle different response structures
  //     let productsData = [];
  //     if (productsRes.data.results && Array.isArray(productsRes.data.results)) {
  //       productsData = productsRes.data.results;
  //     } else if (Array.isArray(productsRes.data)) {
  //       productsData = productsRes.data;
  //     } else if (productsRes.data.data && Array.isArray(productsRes.data.data)) {
  //       productsData = productsRes.data.data;
  //     } else {
  //       productsData = [];
  //     }
      
  //     // Filter products based on search query (client-side filtering as fallback)
  //     let filteredProducts = productsData;
  //     const searchLower = query.toLowerCase();
      
  //     // If API search didn't work, filter client-side
  //     if (!productsRes.config.params?.search && !productsRes.config.params?.q) {
  //       filteredProducts = productsData.filter(product => {
  //         const productName = (product.product_name || product.name || '').toLowerCase();
  //         const description = (product.description || '').toLowerCase();
  //         const category = (product.category_name || product.category || '').toLowerCase();
          
  //         return productName.includes(searchLower) || 
  //                description.includes(searchLower) || 
  //                category.includes(searchLower);
  //       });
  //     }
      
  //     // Map products to display format
  //     const products = filteredProducts.map(p => {
  //       // Get the first variant for price and image
  //       const firstVariant = p.variants && p.variants[0];
  //       const variantMedia = firstVariant?.media || [];
  //       const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
        
  //       // Get image URL correctly
  //       let imageUrl = null;
  //       if (primaryImage?.file) {
  //         imageUrl = primaryImage.file.startsWith('http') ? primaryImage.file : `${baseurl}${primaryImage.file}`;
  //       } else if (p.image) {
  //         imageUrl = p.image.startsWith('http') ? p.image : `${baseurl}${p.image}`;
  //       } else if (p.product_image) {
  //         imageUrl = p.product_image.startsWith('http') ? p.product_image : `${baseurl}${p.product_image}`;
  //       }
        
  //       return {
  //         ...p,
  //         type: 'product',
  //         title: p.product_name || p.name || 'Untitled',
  //         id: p.product_id || p.id,
  //         variant_id: firstVariant?.id || p.variant_id,
  //         image: imageUrl,
  //         price: firstVariant?.selling_price || p.selling_price || p.price,
  //         mrp: firstVariant?.mrp || p.mrp,
  //         stock: firstVariant?.stock || p.stock
  //       };
  //     });
      
  //     setSearchResults(products);
  //     setShowResults(true);
  //   } catch (error) {
  //     console.error('Search error:', error);
  //     setSearchResults([]);
  //     setShowResults(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const performSearch = async (query) => {
  if (query.trim().length <= 1) {
    setSearchResults([]);
    setShowResults(false);
    return;
  }

  setIsLoading(true);
  try {
    // Get user_id from localStorage
    const userId = getUserId();
    
    // Option 1: Try without exclude_user_id first (most reliable)
    let productsRes;
    try {
      // Use the dynamic userId instead of hardcoded 37
      const excludeParam = userId ? `?exclude_user_id=${userId}` : '';
      productsRes = await axios.get(`${baseurl}/products/${excludeParam}&variant_verification_status=verified&business_verification_status: "verified"`, {
        params: { 
          search: query, 
          limit: 10
        }
      });
    } catch (firstError) {
      console.error('First attempt failed:', firstError);
      // Option 2: Try with different parameter name
      try {
        productsRes = await axios.get(`${baseurl}/products/`, {
          params: { 
            q: query,  // Try 'q' instead of 'search'
            limit: 10
          }
        });
      } catch (secondError) {
        // Option 3: Try without any search param, then filter client-side
        productsRes = await axios.get(`${baseurl}/products/`, {
          params: { limit: 50 }
        });
      }
    }
    
    // Rest of your code remains the same...
    // Handle different response structures
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
    
    // Filter products based on search query (client-side filtering as fallback)
    let filteredProducts = productsData;
    const searchLower = query.toLowerCase();
    
    // If API search didn't work, filter client-side
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
    
    // Map products to display format
    const products = filteredProducts.map(p => {
      // Get the first variant for price and image
      const firstVariant = p.variants && p.variants[0];
      const variantMedia = firstVariant?.media || [];
      const primaryImage = variantMedia.find(m => m.is_primary) || variantMedia[0];
      
      // Get image URL correctly
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
      const userId = getUserId();
      navigate(`/agent-search-results?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  // Handle result click
  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    
    // Navigate to product details
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

  // Get icon based on result type
  const getResultIcon = (type) => {
    return <FaBox size={24} color="#666" />;
  };

  // Get type label
  const getTypeLabel = (type) => {
    return 'Product';
  };

  // Format price
  const formatPrice = (price) => {
    if (!price) return null;
    return `₹${parseFloat(price).toLocaleString('en-IN', {
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <div className="wn-search-container" ref={searchRef}>
      <form className="wn-search-form" onSubmit={handleSearchSubmit}>
        {/* Search Input - Simple without category dropdown */}
        <input
          type="text"
          className="wn-search-input"
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
        
        {/* Search Button */}
        <button type="submit" className="wn-search-btn">
          <FaSearch />
        </button>
      </form>
      
      {/* Search Results Dropdown */}
      {showResults && (
        <div className="wn-search-results">
          {isLoading ? (
            <div className="wn-search-loading">
              <div className="wn-loading-spinner"></div>
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div 
                key={result.id || index}
                className="wn-search-result-item"
                onClick={() => handleResultClick(result)}
              >
                <div className="wn-result-icon">
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
                <div className="wn-result-content">
                  <div className="wn-result-title">
                    {result.title || 'Untitled'}
                  </div>
                  <div className="wn-result-type">
                    {getTypeLabel(result.type)}
                  </div>
                  {result.price && (
                    <div className="wn-result-price">
                      {formatPrice(result.price)}
                    </div>
                  )}
                  {result.stock !== undefined && result.stock === 0 && (
                    <div className="wn-result-stock out-of-stock">Out of Stock</div>
                  )}
                  {result.stock !== undefined && result.stock > 0 && (
                    <div className="wn-result-stock in-stock">In Stock</div>
                  )}
                </div>
              </div>
            ))
          ) : searchQuery.trim().length > 1 ? (
            <div className="wn-search-no-results">
              <div className="wn-no-results-icon">🔍</div>
              <div>No products found for "{searchQuery}"</div>
              <div className="wn-no-results-suggestion">
                Try checking your spelling or use different keywords
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AgentSearchBar;