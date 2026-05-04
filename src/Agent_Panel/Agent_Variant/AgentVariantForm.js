// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// // import './AddProductForm.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import { FaTrash, FaPlusCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

// const AddVariantForm = ({ onSuccess, onCancel }) => {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [userProducts, setUserProducts] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingProducts, setFetchingProducts] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [userId, setUserId] = useState(null);
//   const [userDataLoaded, setUserDataLoaded] = useState(false);

//   // Variant form state
//   const [variants, setVariants] = useState([{
//     sku: '',
//     mrp: '',
//     selling_price: '',
//     stock: "",
//     attributes: {},
//     cgst_percent: 0,
//     sgst_percent: 0,
//     tax_percent: 0,
//     hsn_code: '',
//     weight_kg: '',
//     length_cm: '',
//     width_cm: '',
//     height_cm: '',
//     manufacture_date: '',
//     expiry_date: '',
//     is_returnable: true,
//     return_days: 7,
//     product_commission: '',
//     offer_id: '',
//     media: []
//   }]);

//   const [variantAttributes, setVariantAttributes] = useState([
//     [{ key: '', value: '' }]
//   ]);

//   const [variantMediaFiles, setVariantMediaFiles] = useState([[]]);

//   // Get user ID from localStorage
//   useEffect(() => {
//     console.log('Checking localStorage for user data...');
    
//     const userIdFromStorage = localStorage.getItem('user_id');
    
//     if (userIdFromStorage) {
//       console.log('Found user_id in localStorage:', userIdFromStorage);
//       setUserId(userIdFromStorage);
//       setUserDataLoaded(true);
//     } else {
//       const userDataJson = localStorage.getItem('user');
//       if (userDataJson) {
//         try {
//           const parsedUser = JSON.parse(userDataJson);
//           const userIdFromJson = parsedUser.user_id;
          
//           if (userIdFromJson) {
//             console.log('Found user_id in user JSON:', userIdFromJson);
//             setUserId(userIdFromJson);
//             setUserDataLoaded(true);
//           } else {
//             console.error('user_id not found in localStorage');
//             showAuthError();
//           }
//         } catch (error) {
//           console.error('Error parsing user JSON:', error);
//           showAuthError();
//         }
//       } else {
//         console.error('No user data found in localStorage');
//         showAuthError();
//       }
//     }
//   }, []);

//   // Fetch user's products when userId is available
//   useEffect(() => {
//     if (userId && userDataLoaded) {
//       fetchUserProducts();
//       fetchOffers();
//     }
//   }, [userId, userDataLoaded]);

//   const showAuthError = () => {
//     Swal.fire({
//       icon: 'error',
//       title: 'Authentication Required',
//       text: 'Please login to access this page.',
//       confirmButtonColor: '#273c75',
//       confirmButtonText: 'Go to Login'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.location.href = '/login';
//       }
//     });
//   };

//   const fetchUserProducts = async () => {
//     if (!userId) return;
    
//     setFetchingProducts(true);
//     try {
//       console.log('Fetching products for user_id:', userId);
//       const response = await axios.get(`${baseurl}/products/?user_id=${userId}`);
//       console.log('Products response:', response.data);
//       setUserProducts(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch products. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setFetchingProducts(false);
//     }
//   };

//   const fetchOffers = async () => {
//     if (!userId) return;
    
//     try {
//       console.log('Fetching offers for user_id:', userId);
//       const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
//       console.log('Offers response:', response.data);
//       setOffers(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//       setOffers([]);
//     }
//   };

//   const handleProductSelect = async (productId) => {
//     setSelectedProductId(productId);
    
//     if (!productId) {
//       setSelectedProduct(null);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       // Fetch the complete product details including variants
//       const response = await axios.get(`${baseurl}/products/${productId}/`);
//       console.log('Selected product details:', response.data);
//       setSelectedProduct(response.data);
      
//       // Reset variants form
//       setVariants([{
//         sku: '',
//         mrp: '',
//         selling_price: '',
//         stock: "",
//         attributes: {},
//         cgst_percent: 0,
//         sgst_percent: 0,
//         tax_percent: 0,
//         hsn_code: '',
//         weight_kg: '',
//         length_cm: '',
//         width_cm: '',
//         height_cm: '',
//         manufacture_date: '',
//         expiry_date: '',
//         is_returnable: true,
//         return_days: 7,
//         product_commission: '',
//         offer_id: '',
//         media: []
//       }]);
//       setVariantAttributes([[{ key: '', value: '' }]]);
//       setVariantMediaFiles([[]]);
//       setErrors({});
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch product details. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value, type, checked } = e.target;
//     const updatedVariants = [...variants];
    
//     let processedValue = value;
    
//     // Convert numeric fields
//     if (['mrp', 'selling_price', 'cgst_percent', 'sgst_percent', 'tax_percent', 'weight_kg', 'length_cm', 'width_cm', 'height_cm', 'product_commission'].includes(name)) {
//       processedValue = value === '' ? 0 : parseFloat(value) || 0;
//     } else if (['stock', 'return_days'].includes(name)) {
//       processedValue = value === '' ? 0 : parseInt(value) || 0;
//     } else if (type === 'checkbox') {
//       processedValue = checked;
//     }
    
//     updatedVariants[index] = {
//       ...updatedVariants[index],
//       [name]: processedValue
//     };
    
//     setVariants(updatedVariants);
//   };

//   // Variant Attributes handlers
//   const handleVariantAttributeChange = (variantIndex, attrIndex, e) => {
//     const { name, value } = e.target;
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (!updatedVariantAttributes[variantIndex]) {
//       updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
//     }
    
//     if (name === 'key') {
//       updatedVariantAttributes[variantIndex][attrIndex].key = value;
//     } else if (name === 'value') {
//       updatedVariantAttributes[variantIndex][attrIndex].value = value;
//     }
    
//     setVariantAttributes(updatedVariantAttributes);
    
//     // Update variant attributes in variants state
//     const attributesObj = {};
//     updatedVariantAttributes[variantIndex].forEach(attr => {
//       if (attr.key && attr.value) {
//         attributesObj[attr.key] = attr.value;
//       }
//     });
    
//     const updatedVariants = [...variants];
//     updatedVariants[variantIndex] = {
//       ...updatedVariants[variantIndex],
//       attributes: attributesObj
//     };
//     setVariants(updatedVariants);
//   };

//   const addVariantAttribute = (variantIndex) => {
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (!updatedVariantAttributes[variantIndex]) {
//       updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
//     }
    
//     updatedVariantAttributes[variantIndex] = [
//       ...updatedVariantAttributes[variantIndex],
//       { key: '', value: '' }
//     ];
    
//     setVariantAttributes(updatedVariantAttributes);
//   };

//   const removeVariantAttribute = (variantIndex, attrIndex) => {
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (updatedVariantAttributes[variantIndex] && updatedVariantAttributes[variantIndex].length > 1) {
//       updatedVariantAttributes[variantIndex] = updatedVariantAttributes[variantIndex].filter((_, i) => i !== attrIndex);
//       setVariantAttributes(updatedVariantAttributes);
      
//       // Update variant attributes in variants state
//       const attributesObj = {};
//       updatedVariantAttributes[variantIndex].forEach(attr => {
//         if (attr.key && attr.value) {
//           attributesObj[attr.key] = attr.value;
//         }
//       });
      
//       const updatedVariants = [...variants];
//       updatedVariants[variantIndex] = {
//         ...updatedVariants[variantIndex],
//         attributes: attributesObj
//       };
//       setVariants(updatedVariants);
//     }
//   };

//   // Media handlers
//   const handleMediaFileChange = (variantIndex, mediaIndex, e) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       const updatedMediaFiles = [...variantMediaFiles];
      
//       if (!updatedMediaFiles[variantIndex]) {
//         updatedMediaFiles[variantIndex] = [];
//       }
      
//       const file = files[0];
//       const fileType = file.type.startsWith('image/') ? 'image' : 
//                       file.type.startsWith('video/') ? 'video' : 'image';
      
//       updatedMediaFiles[variantIndex][mediaIndex] = file;
//       setVariantMediaFiles(updatedMediaFiles);
      
//       // Update media info in variants state
//       const updatedVariants = [...variants];
//       if (!updatedVariants[variantIndex].media) {
//         updatedVariants[variantIndex].media = [];
//       }
      
//       updatedVariants[variantIndex].media.push({
//         media_type: fileType,
//         sort_order: updatedVariants[variantIndex].media.length,
//         is_primary: updatedVariants[variantIndex].media.length === 0
//       });
      
//       setVariants(updatedVariants);
      
//       // Clear media error
//       if (errors[`variant_${variantIndex}_media`]) {
//         setErrors(prev => {
//           const newErrors = { ...prev };
//           delete newErrors[`variant_${variantIndex}_media`];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const addMediaToVariant = (variantIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     if (!updatedVariants[variantIndex].media) {
//       updatedVariants[variantIndex].media = [];
//     }
    
//     if (!updatedMediaFiles[variantIndex]) {
//       updatedMediaFiles[variantIndex] = [];
//     }
    
//     // This will be handled by file input, just add a placeholder
//     updatedMediaFiles[variantIndex].push(null);
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const removeMediaFromVariant = (variantIndex, mediaIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     // Don't remove if it's the only media
//     if (updatedMediaFiles[variantIndex]?.length <= 1) {
//       return;
//     }
    
//     updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.filter((_, idx) => idx !== mediaIndex);
    
//     if (updatedMediaFiles[variantIndex]) {
//       updatedMediaFiles[variantIndex] = updatedMediaFiles[variantIndex].filter((_, idx) => idx !== mediaIndex);
//     }
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const addVariant = () => {
//     setVariants(prev => [...prev, {
//       sku: '',
//       mrp: '',
//       selling_price: '',
//       stock: 0,
//       attributes: {},
//       cgst_percent: 0,
//       sgst_percent: 0,
//       tax_percent: 0,
//       hsn_code: '',
//       weight_kg: '',
//       length_cm: '',
//       width_cm: '',
//       height_cm: '',
//       manufacture_date: '',
//       expiry_date: '',
//       is_returnable: true,
//       return_days: 7,
//       product_commission: '',
//       offer_id: '',
//       media: []
//     }]);
//     setVariantMediaFiles(prev => [...prev, []]);
//     setVariantAttributes(prev => [...prev, [{ key: '', value: '' }]]);
//   };

//   const removeVariant = (index) => {
//     if (variants.length > 1) {
//       const updatedVariants = variants.filter((_, i) => i !== index);
//       const updatedMediaFiles = variantMediaFiles.filter((_, i) => i !== index);
//       const updatedAttributes = variantAttributes.filter((_, i) => i !== index);
//       setVariants(updatedVariants);
//       setVariantMediaFiles(updatedMediaFiles);
//       setVariantAttributes(updatedAttributes);
//     }
//   };

//   const getOfferDisplayText = (offer) => {
//     if (!offer) return '';
    
//     let displayText = '';
//     if (offer.offer_type === 'discount_percent') {
//       displayText = `${offer.value}% off`;
//     } else if (offer.offer_type === 'discount_flat') {
//       displayText = `₹${offer.value} off`;
//     } else if (offer.offer_type === 'buy_x_get_y') {
//       displayText = `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//     } else if (offer.offer_type === 'free_gift') {
//       displayText = `Free Gift`;
//     } else {
//       displayText = offer.description || 'Special Offer';
//     }
    
//     if (offer.start_date && offer.end_date) {
//       displayText += ` (Valid: ${offer.start_date} to ${offer.end_date})`;
//     }
    
//     return displayText;
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!selectedProduct) {
//       newErrors.product = 'Please select a product';
//     }
    
//     // Variants validation
//     variants.forEach((variant, index) => {
//       if (!variant.sku.trim()) {
//         newErrors[`variant_${index}_sku`] = 'SKU is required';
//       }
//       if (!variant.mrp || variant.mrp <= 0) {
//         newErrors[`variant_${index}_mrp`] = 'Valid MRP is required';
//       }
//       if (variant.stock < 0) {
//         newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
//       }
      
//       const variantMediaFilesArray = variantMediaFiles[index] || [];
//       const hasMediaFile = variantMediaFilesArray.some(file => file !== null && file !== undefined);
      
//       if (!hasMediaFile) {
//         newErrors[`variant_${index}_media`] = 'At least one product image is required';
//       }
//     });
    
//     setErrors(newErrors);
    
//     if (Object.keys(newErrors).length > 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Form Validation Error',
//         text: 'Please fill in all required fields correctly',
//         confirmButtonColor: '#273c75'
//       });
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication Error',
//         text: 'User ID is required. Please login again.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!selectedProduct) {
//       Swal.fire({
//         icon: 'error',
//         title: 'No Product Selected',
//         text: 'Please select a product to add variants.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const formDataToSend = new FormData();
      
//       // Prepare only the new variants data (don't include product data or existing variants)
//       const newVariantsData = prepareNewVariantsData();
      
//       // Send only the variants data as a JSON string
//       formDataToSend.append('variants', JSON.stringify(newVariantsData));
      
//       // Add all media files for new variants
//       variantMediaFiles.forEach((variantFiles) => {
//         variantFiles.forEach((file) => {
//           if (file) {
//             formDataToSend.append('media_file', file);
//           }
//         });
//       });

//       console.log('Sending PUT request to:', `${baseurl}/products/${selectedProduct.product_id}/`);
//       console.log('New variants data:', newVariantsData);
      
//       const response = await axios.put(`${baseurl}/products/${selectedProduct.product_id}/`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       console.log('Response received:', response.data);
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Variants Added Successfully!',
//         text: 'New variants have been added to the product.',
//         confirmButtonColor: '#273c75'
//       }).then((result) => {
//         if (onSuccess) {
//           onSuccess(response.data);
//         }
//       });
      
//       // Reset form
//       setSelectedProduct(null);
//       setSelectedProductId('');
//       setVariants([{
//         sku: '',
//         mrp: '',
//         selling_price: '',
//         stock: 0,
//         attributes: {},
//         cgst_percent: 0,
//         sgst_percent: 0,
//         tax_percent: 0,
//         hsn_code: '',
//         weight_kg: '',
//         length_cm: '',
//         width_cm: '',
//         height_cm: '',
//         manufacture_date: '',
//         expiry_date: '',
//         is_returnable: true,
//         return_days: 7,
//         product_commission: '',
//         offer_id: '',
//         media: []
//       }]);
//       setVariantAttributes([[{ key: '', value: '' }]]);
//       setVariantMediaFiles([[]]);
      
//     } catch (error) {
//       console.error('Error adding variants:', error);
//       console.error('Error response:', error.response?.data);
      
//       let errorMessage = 'An error occurred while adding variants';
      
//       if (error.response?.data?.error) {
//         const errorMsg = error.response.data.error;
//         if (typeof errorMsg === 'string') {
//           if (errorMsg.includes('[') && errorMsg.includes(']')) {
//             const match = errorMsg.match(/\[(.*?)\]/);
//             errorMessage = match ? match[1] : errorMsg;
//           } else {
//             errorMessage = errorMsg;
//           }
//         }
//       } else if (error.response?.data) {
//         errorMessage = JSON.stringify(error.response.data);
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Error Adding Variants',
//         text: errorMessage,
//         confirmButtonColor: '#273c75'
//       });
      
//       setErrors({ api: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to prepare new variants data
//   const prepareNewVariantsData = () => {
//     return variants.map((variant, variantIndex) => {
//       const processedAttributes = {};
//       Object.entries(variant.attributes).forEach(([key, value]) => {
//         if (!isNaN(value) && value !== '' && value !== null) {
//           processedAttributes[key] = Number(value);
//         } else {
//           processedAttributes[key] = value;
//         }
//       });

//       // Prepare media array for this variant
//       const mediaArray = variant.media.map((media, mediaIndex) => ({
//         media_type: media.media_type,
//         sort_order: media.sort_order || mediaIndex,
//         is_primary: media.is_primary || (mediaIndex === 0)
//       }));

//       const variantObj = {
//         sku: variant.sku || '',
//         mrp: variant.mrp === '' ? 0 : parseFloat(variant.mrp) || 0,
//         selling_price: variant.selling_price === '' || variant.selling_price === null ? null : parseFloat(variant.selling_price),
//         stock: variant.stock === '' ? 0 : parseInt(variant.stock) || 0,
//         attributes: processedAttributes,
//         cgst_percent: variant.cgst_percent === '' ? 0 : parseFloat(variant.cgst_percent) || 0,
//         sgst_percent: variant.sgst_percent === '' ? 0 : parseFloat(variant.sgst_percent) || 0,
//         tax_percent: variant.tax_percent === '' ? 0 : parseFloat(variant.tax_percent) || 0,
//         hsn_code: variant.hsn_code || '',
//         weight_kg: variant.weight_kg === '' ? null : (parseFloat(variant.weight_kg) || null),
//         length_cm: variant.length_cm === '' ? null : (parseFloat(variant.length_cm) || null),
//         width_cm: variant.width_cm === '' ? null : (parseFloat(variant.width_cm) || null),
//         height_cm: variant.height_cm === '' ? null : (parseFloat(variant.height_cm) || null),
//         manufacture_date: variant.manufacture_date || null,
//         expiry_date: variant.expiry_date || null,
//         is_returnable: variant.is_returnable || false,
//         return_days: variant.return_days === '' ? 7 : parseInt(variant.return_days) || 7,
//         product_commission: variant.product_commission === '' ? '0.00' : parseFloat(variant.product_commission).toFixed(2),
//         media: mediaArray
//       };

//       if (variant.offer_id && variant.offer_id !== '') {
//         variantObj.offer_id = parseInt(variant.offer_id);
//       }

//       return variantObj;
//     });
//   };

//   const handleCancel = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'All unsaved changes will be lost.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#273c75',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, cancel',
//       cancelButtonText: 'No, continue editing'
//     }).then((result) => {
//       if (result.isConfirmed && onCancel) {
//         onCancel();
//       }
//     });
//   };

//   if (!userId && userDataLoaded === false) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="product-form-container">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading user data...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="product-form-container">
//         <div className="product-form-header">
//           <h2>Add Variants to Existing Product</h2>
//           <div className="user-info-badge">
//             <small>User ID: {userId}</small>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="product-form">
//           {errors.api && (
//             <div className="alert alert-danger" role="alert">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {errors.api}
//             </div>
//           )}

//           {/* Product Selection Section */}
//           <div className="form-section">
//             <h4 className="section-title">Select Product</h4>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="product" className="agent-form-label">
//                     Product <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${errors.product ? 'is-invalid' : ''}`}
//                     id="product"
//                     value={selectedProductId}
//                     onChange={(e) => handleProductSelect(e.target.value)}
//                     disabled={fetchingProducts || loading}
//                   >
//                     <option value="">
//                       {fetchingProducts ? 'Loading products...' : 'Select a product'}
//                     </option>
//                     {userProducts.map(product => (
//                       <option key={product.product_id} value={product.product_id}>
//                         {product.product_name} (Variants: {product.variants?.length || 0})
//                       </option>
//                     ))}
//                   </select>
//                   {errors.product && (
//                     <div className="invalid-feedback">{errors.product}</div>
//                   )}
//                   {selectedProduct && (
//                     <div className="mt-2 p-2 bg-light rounded">
//                       <small>
//                         <strong>Selected Product:</strong> {selectedProduct.product_name}<br />
//                         <strong>Brand:</strong> {selectedProduct.brand || 'N/A'}<br />
//                         <strong>Category:</strong> {selectedProduct.category}<br />
//                         <strong>Existing Variants:</strong> {selectedProduct.variants?.length || 0}
//                       </small>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Variants Section - Only show if product is selected */}
//           {selectedProduct && (
//             <div className="form-section">
//               <h4 className="section-title">
//                 Add New Variants for {selectedProduct.product_name}
//               </h4>
              
//               {variants.map((variant, variantIndex) => (
//                 <div key={variantIndex} className="variant-card">
//                   <div className="variant-header">
//                     <h5>New Variant {variantIndex + 1}</h5>
//                     {variants.length > 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => removeVariant(variantIndex)}
//                         title="Remove variant"
//                       >
//                         <FaTrash /> Remove Variant
//                       </button>
//                     )}
//                   </div>
                  
//                   {/* Row 1: SKU and MRP */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`sku_${variantIndex}`} className="agent-form-label">
//                           SKU <span className="text-danger">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           className={`form-control ${errors[`variant_${variantIndex}_sku`] ? 'is-invalid' : ''}`}
//                           id={`sku_${variantIndex}`}
//                           name="sku"
//                           value={variant.sku}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           placeholder="Enter SKU"
//                         />
//                         {errors[`variant_${variantIndex}_sku`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_sku`]}</div>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`mrp_${variantIndex}`} className="agent-form-label">
//                           MRP <span className="text-danger">*</span>
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className={`form-control ${errors[`variant_${variantIndex}_mrp`] ? 'is-invalid' : ''}`}
//                             id={`mrp_${variantIndex}`}
//                             name="mrp"
//                             value={variant.mrp || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                         {errors[`variant_${variantIndex}_mrp`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_mrp`]}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 2: Selling Price and Stock */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`selling_price_${variantIndex}`} className="agent-form-label">
//                           Selling Price
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`selling_price_${variantIndex}`}
//                             name="selling_price"
//                             value={variant.selling_price || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                         <div className="form-text">Leave empty if same as MRP</div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`stock_${variantIndex}`} className="agent-form-label">
//                           Stock Quantity
//                         </label>
//                         <input
//                           type="number"
//                           className={`form-control ${errors[`variant_${variantIndex}_stock`] ? 'is-invalid' : ''}`}
//                           id={`stock_${variantIndex}`}
//                           name="stock"
//                           value={variant.stock}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                         />
//                         {errors[`variant_${variantIndex}_stock`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_stock`]}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 3: Product Commission and Tax Percent */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`product_commission_${variantIndex}`} className="agent-form-label">
//                           Product Commission (₹)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`product_commission_${variantIndex}`}
//                             name="product_commission"
//                             value={variant.product_commission}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`tax_percent_${variantIndex}`} className="agent-form-label">
//                           Tax Percent (%)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">%</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`tax_percent_${variantIndex}`}
//                             name="tax_percent"
//                             value={variant.tax_percent || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             max="100"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 4: CGST and SGST */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`cgst_percent_${variantIndex}`} className="agent-form-label">
//                           CGST Percent (%)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">%</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`cgst_percent_${variantIndex}`}
//                             name="cgst_percent"
//                             value={variant.cgst_percent || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             max="100"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`sgst_percent_${variantIndex}`} className="agent-form-label">
//                           SGST Percent (%)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">%</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`sgst_percent_${variantIndex}`}
//                             name="sgst_percent"
//                             value={variant.sgst_percent || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             max="100"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 5: HSN Code and Offer */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`hsn_code_${variantIndex}`} className="agent-form-label">
//                           HSN Code
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id={`hsn_code_${variantIndex}`}
//                           name="hsn_code"
//                           value={variant.hsn_code || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           placeholder="Enter HSN code"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`offer_id_${variantIndex}`} className="agent-form-label">
//                           Apply Offer
//                         </label>
//                         <select
//                           className="form-select"
//                           id={`offer_id_${variantIndex}`}
//                           name="offer_id"
//                           value={variant.offer_id || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         >
//                           <option value="">Select Offer (Optional)</option>
//                           {offers.map(offer => (
//                             <option key={offer.id} value={offer.id}>
//                               {getOfferDisplayText(offer)}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 6: Weight and Dimensions */}
//                   <div className="row">
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`weight_kg_${variantIndex}`} className="agent-form-label">
//                           Weight (kg)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`weight_kg_${variantIndex}`}
//                           name="weight_kg"
//                           value={variant.weight_kg || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.001"
//                           placeholder="0.000"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`length_cm_${variantIndex}`} className="agent-form-label">
//                           Length (cm)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`length_cm_${variantIndex}`}
//                           name="length_cm"
//                           value={variant.length_cm || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.1"
//                           placeholder="0.0"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`width_cm_${variantIndex}`} className="agent-form-label">
//                           Width (cm)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`width_cm_${variantIndex}`}
//                           name="width_cm"
//                           value={variant.width_cm || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.1"
//                           placeholder="0.0"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`height_cm_${variantIndex}`} className="agent-form-label">
//                           Height (cm)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`height_cm_${variantIndex}`}
//                           name="height_cm"
//                           value={variant.height_cm || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.1"
//                           placeholder="0.0"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 7: Manufacture and Expiry Dates */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`manufacture_date_${variantIndex}`} className="agent-form-label">
//                           Manufacture Date
//                         </label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           id={`manufacture_date_${variantIndex}`}
//                           name="manufacture_date"
//                           value={variant.manufacture_date || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`expiry_date_${variantIndex}`} className="agent-form-label">
//                           Expiry Date
//                         </label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           id={`expiry_date_${variantIndex}`}
//                           name="expiry_date"
//                           value={variant.expiry_date || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 8: Returnable and Return Days */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <div className="form-check" style={{ paddingTop: '2rem' }}>
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id={`is_returnable_${variantIndex}`}
//                             name="is_returnable"
//                             checked={variant.is_returnable}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                           />
//                           <label className="form-check-label" htmlFor={`is_returnable_${variantIndex}`}>
//                             Product is Returnable
//                           </label>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`return_days_${variantIndex}`} className="agent-form-label">
//                           Return Days
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`return_days_${variantIndex}`}
//                           name="return_days"
//                           value={variant.return_days}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           max="30"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Variant Attributes Section */}
//                   <div className="mb-3">
//                     <label className="agent-form-label">Variant Attributes</label>
//                     <div className="attributes-section">
//                       {variantAttributes[variantIndex]?.map((attr, attrIndex) => (
//                         <div key={attrIndex} className="row g-2 mb-2 align-items-center">
//                           <div className="col-md-5">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Attribute name (e.g., Color, Size)"
//                               name="key"
//                               value={attr.key}
//                               onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                             />
//                           </div>
//                           <div className="col-md-5">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Attribute value (e.g., Red, Large)"
//                               name="value"
//                               value={attr.value}
//                               onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                             />
//                           </div>
//                           <div className="col-md-2">
//                             {variantAttributes[variantIndex]?.length > 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => removeVariantAttribute(variantIndex, attrIndex)}
//                                 style={{ minWidth: '40px' }}
//                                 title="Remove attribute"
//                               >
//                                 <FaTrash />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-primary mt-2"
//                         onClick={() => addVariantAttribute(variantIndex)}
//                       >
//                         <FaPlusCircle /> Add Attribute
//                       </button>
//                     </div>
//                   </div>

//                   {/* Media Upload Section */}
//                   <div className="media-upload-section">
//                     <label className="agent-form-label">
//                       Product Media (Images & Videos) <span className="text-danger">*</span>
//                     </label>
                    
//                     {errors[`variant_${variantIndex}_media`] && (
//                       <div className="alert alert-danger py-2" role="alert">
//                         <small>
//                           <FaExclamationTriangle className="me-1" />
//                           {errors[`variant_${variantIndex}_media`]}
//                         </small>
//                       </div>
//                     )}
                    
//                     {variantMediaFiles[variantIndex]?.map((file, mediaIndex) => (
//                       <div key={mediaIndex} className="media-item-card mb-3 p-3 border rounded">
//                         <div className="row align-items-center">
//                           <div className="col-md-8">
//                             <div className="mb-2">
//                               <label className="agent-form-label small">
//                                 {mediaIndex === 0 ? 'Primary Image (Required)' : 'Additional Media'}
//                               </label>
//                               <input
//                                 type="file"
//                                 className={`form-control form-control-sm ${mediaIndex === 0 && !variantMediaFiles[variantIndex]?.[mediaIndex] && errors[`variant_${variantIndex}_media`] ? 'is-invalid' : ''}`}
//                                 accept="image/*,video/*"
//                                 onChange={(e) => handleMediaFileChange(variantIndex, mediaIndex, e)}
//                                 required={mediaIndex === 0}
//                               />
//                               {variantMediaFiles[variantIndex]?.[mediaIndex] && (
//                                 <div className="form-text">
//                                   Selected: {variantMediaFiles[variantIndex][mediaIndex].name}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="col-md-2">
//                             {variantMediaFiles[variantIndex]?.length > 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger mt-4"
//                                 onClick={() => removeMediaFromVariant(variantIndex, mediaIndex)}
//                                 disabled={mediaIndex === 0}
//                                 title={mediaIndex === 0 ? "Primary image cannot be removed" : "Remove this media"}
//                               >
//                                 <FaTrash />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => addMediaToVariant(variantIndex)}
//                     >
//                       <FaPlusCircle /> Add More Media
//                     </button>
                    
//                     <div className="form-text mt-2">
//                       <FaInfoCircle /> At least one product image is required. The first image will be used as the primary product image.
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <button
//                 type="button"
//                 className="btn btn-outline-primary mt-3"
//                 onClick={addVariant}
//               >
//                 <FaPlusCircle /> Add Another Variant
//               </button>
//             </div>
//           )}

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={handleCancel}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white'
//               }}
//               disabled={loading || !selectedProduct}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Adding Variants...
//                 </>
//               ) : (
//                 <>
//                   <FaPlusCircle className="me-2" />
//                   Add Variants
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddVariantForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// // import './AddProductForm.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import { FaTrash, FaPlusCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

// const AddVariantForm = ({ onSuccess, onCancel }) => {
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [selectedBusinessId, setSelectedBusinessId] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [userBusinesses, setUserBusinesses] = useState([]);
//   const [userProducts, setUserProducts] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBusinesses, setFetchingBusinesses] = useState(true);
//   const [fetchingProducts, setFetchingProducts] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [userId, setUserId] = useState(null);
//   const [userDataLoaded, setUserDataLoaded] = useState(false);

//   // Variant form state
//   const [variants, setVariants] = useState([{
//     sku: '',
//     mrp: '',
//     selling_price: '',
//     stock: "",
//     attributes: {},
//     tax_percent: 0,
//     hsn_code: '',
//     weight_kg: '',
//     length_cm: '',
//     width_cm: '',
//     height_cm: '',
//     manufacture_date: '',
//     expiry_date: '',
//     is_returnable: true,
//     return_days: 7,
//     product_commission: '',
//     offer_id: '',
//     media: []
//   }]);

//   const [variantAttributes, setVariantAttributes] = useState([
//     [{ key: '', value: '' }]
//   ]);

//   const [variantMediaFiles, setVariantMediaFiles] = useState([[]]);

//   // Get user ID from localStorage
//   useEffect(() => {
//     console.log('Checking localStorage for user data...');
    
//     const userIdFromStorage = localStorage.getItem('user_id');
    
//     if (userIdFromStorage) {
//       console.log('Found user_id in localStorage:', userIdFromStorage);
//       setUserId(userIdFromStorage);
//       setUserDataLoaded(true);
//     } else {
//       const userDataJson = localStorage.getItem('user');
//       if (userDataJson) {
//         try {
//           const parsedUser = JSON.parse(userDataJson);
//           const userIdFromJson = parsedUser.user_id;
          
//           if (userIdFromJson) {
//             console.log('Found user_id in user JSON:', userIdFromJson);
//             setUserId(userIdFromJson);
//             setUserDataLoaded(true);
//           } else {
//             console.error('user_id not found in localStorage');
//             showAuthError();
//           }
//         } catch (error) {
//           console.error('Error parsing user JSON:', error);
//           showAuthError();
//         }
//       } else {
//         console.error('No user data found in localStorage');
//         showAuthError();
//       }
//     }
//   }, []);

//   // Fetch user's businesses when userId is available
//   useEffect(() => {
//     if (userId && userDataLoaded) {
//       fetchUserBusinesses();
//       fetchOffers();
//     }
//   }, [userId, userDataLoaded]);

//   const showAuthError = () => {
//     Swal.fire({
//       icon: 'error',
//       title: 'Authentication Required',
//       text: 'Please login to access this page.',
//       confirmButtonColor: '#273c75',
//       confirmButtonText: 'Go to Login'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.location.href = '/login';
//       }
//     });
//   };

//   const fetchUserBusinesses = async () => {
//     if (!userId) return;
    
//     setFetchingBusinesses(true);
//     try {
//       console.log('Fetching businesses for user_id:', userId);
//       const response = await axios.get(`${baseurl}/business/?user=${userId}`);
//       console.log('Businesses response:', response.data);
//       setUserBusinesses(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching businesses:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch businesses. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setFetchingBusinesses(false);
//     }
//   };

//   const fetchUserProducts = async (businessId) => {
//     if (!businessId) return;
    
//     setFetchingProducts(true);
//     try {
//       console.log('Fetching products for business_id:', businessId);
//       const response = await axios.get(`${baseurl}/products/?business_id=${businessId}`);
//       console.log('Products response:', response.data);
//       setUserProducts(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch products. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//       setUserProducts([]);
//     } finally {
//       setFetchingProducts(false);
//     }
//   };

//   const fetchOffers = async () => {
//     if (!userId) return;
    
//     try {
//       console.log('Fetching offers for user_id:', userId);
//       const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
//       console.log('Offers response:', response.data);
//       setOffers(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//       setOffers([]);
//     }
//   };

//   const handleBusinessSelect = async (businessId) => {
//     setSelectedBusinessId(businessId);
//     setSelectedProduct(null);
//     setSelectedProductId('');
//     setUserProducts([]);
    
//     if (!businessId) {
//       setSelectedBusiness(null);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       // Find the selected business from the list
//       const business = userBusinesses.find(b => b.business_id === parseInt(businessId));
//       setSelectedBusiness(business);
      
//       // Fetch products for this business
//       await fetchUserProducts(businessId);
      
//       // Reset variants form
//       resetVariantsForm();
//     } catch (error) {
//       console.error('Error selecting business:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load business details.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProductSelect = async (productId) => {
//     setSelectedProductId(productId);
    
//     if (!productId) {
//       setSelectedProduct(null);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       // Fetch the complete product details including variants
//       const response = await axios.get(`${baseurl}/products/${productId}/`);
//       console.log('Selected product details:', response.data);
//       setSelectedProduct(response.data);
      
//       // Reset variants form
//       resetVariantsForm();
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch product details. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetVariantsForm = () => {
//     setVariants([{
//       sku: '',
//       mrp: '',
//       selling_price: '',
//       stock: "",
//       attributes: {},
//       tax_percent: 0,
//       hsn_code: '',
//       weight_kg: '',
//       length_cm: '',
//       width_cm: '',
//       height_cm: '',
//       manufacture_date: '',
//       expiry_date: '',
//       is_returnable: true,
//       return_days: 7,
//       product_commission: '',
//       offer_id: '',
//       media: []
//     }]);
//     setVariantAttributes([[{ key: '', value: '' }]]);
//     setVariantMediaFiles([[]]);
//     setErrors({});
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value, type, checked } = e.target;
//     const updatedVariants = [...variants];
    
//     let processedValue = value;
    
//     // Convert numeric fields
//     if (['mrp', 'selling_price', 'tax_percent', 'weight_kg', 'length_cm', 'width_cm', 'height_cm', 'product_commission'].includes(name)) {
//       processedValue = value === '' ? 0 : parseFloat(value) || 0;
//     } else if (['stock', 'return_days'].includes(name)) {
//       processedValue = value === '' ? 0 : parseInt(value) || 0;
//     } else if (type === 'checkbox') {
//       processedValue = checked;
//     }
    
//     updatedVariants[index] = {
//       ...updatedVariants[index],
//       [name]: processedValue
//     };
    
//     setVariants(updatedVariants);
//   };

//   // Variant Attributes handlers
//   const handleVariantAttributeChange = (variantIndex, attrIndex, e) => {
//     const { name, value } = e.target;
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (!updatedVariantAttributes[variantIndex]) {
//       updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
//     }
    
//     if (name === 'key') {
//       updatedVariantAttributes[variantIndex][attrIndex].key = value;
//     } else if (name === 'value') {
//       updatedVariantAttributes[variantIndex][attrIndex].value = value;
//     }
    
//     setVariantAttributes(updatedVariantAttributes);
    
//     // Update variant attributes in variants state
//     const attributesObj = {};
//     updatedVariantAttributes[variantIndex].forEach(attr => {
//       if (attr.key && attr.value) {
//         attributesObj[attr.key] = attr.value;
//       }
//     });
    
//     const updatedVariants = [...variants];
//     updatedVariants[variantIndex] = {
//       ...updatedVariants[variantIndex],
//       attributes: attributesObj
//     };
//     setVariants(updatedVariants);
//   };

//   const addVariantAttribute = (variantIndex) => {
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (!updatedVariantAttributes[variantIndex]) {
//       updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
//     }
    
//     updatedVariantAttributes[variantIndex] = [
//       ...updatedVariantAttributes[variantIndex],
//       { key: '', value: '' }
//     ];
    
//     setVariantAttributes(updatedVariantAttributes);
//   };

//   const removeVariantAttribute = (variantIndex, attrIndex) => {
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (updatedVariantAttributes[variantIndex] && updatedVariantAttributes[variantIndex].length > 1) {
//       updatedVariantAttributes[variantIndex] = updatedVariantAttributes[variantIndex].filter((_, i) => i !== attrIndex);
//       setVariantAttributes(updatedVariantAttributes);
      
//       // Update variant attributes in variants state
//       const attributesObj = {};
//       updatedVariantAttributes[variantIndex].forEach(attr => {
//         if (attr.key && attr.value) {
//           attributesObj[attr.key] = attr.value;
//         }
//       });
      
//       const updatedVariants = [...variants];
//       updatedVariants[variantIndex] = {
//         ...updatedVariants[variantIndex],
//         attributes: attributesObj
//       };
//       setVariants(updatedVariants);
//     }
//   };

//   // Media handlers
//   const handleMediaFileChange = (variantIndex, mediaIndex, e) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       const updatedMediaFiles = [...variantMediaFiles];
      
//       if (!updatedMediaFiles[variantIndex]) {
//         updatedMediaFiles[variantIndex] = [];
//       }
      
//       const file = files[0];
//       const fileType = file.type.startsWith('image/') ? 'image' : 
//                       file.type.startsWith('video/') ? 'video' : 'image';
      
//       updatedMediaFiles[variantIndex][mediaIndex] = file;
//       setVariantMediaFiles(updatedMediaFiles);
      
//       // Update media info in variants state
//       const updatedVariants = [...variants];
//       if (!updatedVariants[variantIndex].media) {
//         updatedVariants[variantIndex].media = [];
//       }
      
//       updatedVariants[variantIndex].media.push({
//         media_type: fileType,
//         sort_order: updatedVariants[variantIndex].media.length,
//         is_primary: updatedVariants[variantIndex].media.length === 0
//       });
      
//       setVariants(updatedVariants);
      
//       // Clear media error
//       if (errors[`variant_${variantIndex}_media`]) {
//         setErrors(prev => {
//           const newErrors = { ...prev };
//           delete newErrors[`variant_${variantIndex}_media`];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const addMediaToVariant = (variantIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     if (!updatedVariants[variantIndex].media) {
//       updatedVariants[variantIndex].media = [];
//     }
    
//     if (!updatedMediaFiles[variantIndex]) {
//       updatedMediaFiles[variantIndex] = [];
//     }
    
//     // This will be handled by file input, just add a placeholder
//     updatedMediaFiles[variantIndex].push(null);
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const removeMediaFromVariant = (variantIndex, mediaIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     // Don't remove if it's the only media
//     if (updatedMediaFiles[variantIndex]?.length <= 1) {
//       return;
//     }
    
//     updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.filter((_, idx) => idx !== mediaIndex);
    
//     if (updatedMediaFiles[variantIndex]) {
//       updatedMediaFiles[variantIndex] = updatedMediaFiles[variantIndex].filter((_, idx) => idx !== mediaIndex);
//     }
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const addVariant = () => {
//     setVariants(prev => [...prev, {
//       sku: '',
//       mrp: '',
//       selling_price: '',
//       stock: 0,
//       attributes: {},
//       tax_percent: 0,
//       hsn_code: '',
//       weight_kg: '',
//       length_cm: '',
//       width_cm: '',
//       height_cm: '',
//       manufacture_date: '',
//       expiry_date: '',
//       is_returnable: true,
//       return_days: 7,
//       product_commission: '',
//       offer_id: '',
//       media: []
//     }]);
//     setVariantMediaFiles(prev => [...prev, []]);
//     setVariantAttributes(prev => [...prev, [{ key: '', value: '' }]]);
//   };

//   const removeVariant = (index) => {
//     if (variants.length > 1) {
//       const updatedVariants = variants.filter((_, i) => i !== index);
//       const updatedMediaFiles = variantMediaFiles.filter((_, i) => i !== index);
//       const updatedAttributes = variantAttributes.filter((_, i) => i !== index);
//       setVariants(updatedVariants);
//       setVariantMediaFiles(updatedMediaFiles);
//       setVariantAttributes(updatedAttributes);
//     }
//   };

//   const getOfferDisplayText = (offer) => {
//     if (!offer) return '';
    
//     let displayText = '';
//     if (offer.offer_type === 'discount_percent') {
//       displayText = `${offer.value}% off`;
//     } else if (offer.offer_type === 'discount_flat') {
//       displayText = `₹${offer.value} off`;
//     } else if (offer.offer_type === 'buy_x_get_y') {
//       displayText = `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//     } else if (offer.offer_type === 'free_gift') {
//       displayText = `Free Gift`;
//     } else {
//       displayText = offer.description || 'Special Offer';
//     }
    
//     if (offer.start_date && offer.end_date) {
//       displayText += ` (Valid: ${offer.start_date} to ${offer.end_date})`;
//     }
    
//     return displayText;
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!selectedBusiness) {
//       newErrors.business = 'Please select a business';
//     }
    
//     if (!selectedProduct) {
//       newErrors.product = 'Please select a product';
//     }
    
//     // Variants validation
//     variants.forEach((variant, index) => {
//       // SKU is now optional - removed validation
//       if (!variant.mrp || variant.mrp <= 0) {
//         newErrors[`variant_${index}_mrp`] = 'Valid MRP is required';
//       }
//       if (variant.stock < 0) {
//         newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
//       }
      
//       const variantMediaFilesArray = variantMediaFiles[index] || [];
//       const hasMediaFile = variantMediaFilesArray.some(file => file !== null && file !== undefined);
      
//       if (!hasMediaFile) {
//         newErrors[`variant_${index}_media`] = 'At least one product image is required';
//       }
//     });
    
//     setErrors(newErrors);
    
//     if (Object.keys(newErrors).length > 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Form Validation Error',
//         text: 'Please fill in all required fields correctly',
//         confirmButtonColor: '#273c75'
//       });
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication Error',
//         text: 'User ID is required. Please login again.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!selectedBusiness) {
//       Swal.fire({
//         icon: 'error',
//         title: 'No Business Selected',
//         text: 'Please select a business to add variants.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!selectedProduct) {
//       Swal.fire({
//         icon: 'error',
//         title: 'No Product Selected',
//         text: 'Please select a product to add variants.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const formDataToSend = new FormData();
      
//       // Prepare only the new variants data (don't include product data or existing variants)
//       const newVariantsData = prepareNewVariantsData();
      
//       // Send only the variants data as a JSON string
//       formDataToSend.append('variants', JSON.stringify(newVariantsData));
      
//       // Add all media files for new variants
//       variantMediaFiles.forEach((variantFiles) => {
//         variantFiles.forEach((file) => {
//           if (file) {
//             formDataToSend.append('media_file', file);
//           }
//         });
//       });

//       console.log('Sending PUT request to:', `${baseurl}/products/${selectedProduct.product_id}/`);
//       console.log('New variants data:', newVariantsData);
      
//       const response = await axios.put(`${baseurl}/products/${selectedProduct.product_id}/`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       console.log('Response received:', response.data);
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Variants Added Successfully!',
//         text: 'New variants have been added to the product.',
//         confirmButtonColor: '#273c75'
//       }).then((result) => {
//         if (onSuccess) {
//           onSuccess(response.data);
//         }
//       });
      
//       // Reset form
//       setSelectedProduct(null);
//       setSelectedProductId('');
//       resetVariantsForm();
      
//     } catch (error) {
//       console.error('Error adding variants:', error);
//       console.error('Error response:', error.response?.data);
      
//       let errorMessage = 'An error occurred while adding variants';
      
//       if (error.response?.data?.error) {
//         const errorMsg = error.response.data.error;
//         if (typeof errorMsg === 'string') {
//           if (errorMsg.includes('[') && errorMsg.includes(']')) {
//             const match = errorMsg.match(/\[(.*?)\]/);
//             errorMessage = match ? match[1] : errorMsg;
//           } else {
//             errorMessage = errorMsg;
//           }
//         }
//       } else if (error.response?.data) {
//         errorMessage = JSON.stringify(error.response.data);
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Error Adding Variants',
//         text: errorMessage,
//         confirmButtonColor: '#273c75'
//       });
      
//       setErrors({ api: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to prepare new variants data
//   const prepareNewVariantsData = () => {
//     return variants.map((variant, variantIndex) => {
//       const processedAttributes = {};
//       Object.entries(variant.attributes).forEach(([key, value]) => {
//         if (!isNaN(value) && value !== '' && value !== null) {
//           processedAttributes[key] = Number(value);
//         } else {
//           processedAttributes[key] = value;
//         }
//       });

//       // Prepare media array for this variant
//       const mediaArray = variant.media.map((media, mediaIndex) => ({
//         media_type: media.media_type,
//         sort_order: media.sort_order || mediaIndex,
//         is_primary: media.is_primary || (mediaIndex === 0)
//       }));

//       const variantObj = {
//         sku: variant.sku || '',
//         mrp: variant.mrp === '' ? 0 : parseFloat(variant.mrp) || 0,
//         selling_price: variant.selling_price === '' || variant.selling_price === null ? null : parseFloat(variant.selling_price),
//         stock: variant.stock === '' ? 0 : parseInt(variant.stock) || 0,
//         attributes: processedAttributes,
//         tax_percent: variant.tax_percent === '' ? 0 : parseFloat(variant.tax_percent) || 0,
//         hsn_code: variant.hsn_code || '',
//         weight_kg: variant.weight_kg === '' ? null : (parseFloat(variant.weight_kg) || null),
//         length_cm: variant.length_cm === '' ? null : (parseFloat(variant.length_cm) || null),
//         width_cm: variant.width_cm === '' ? null : (parseFloat(variant.width_cm) || null),
//         height_cm: variant.height_cm === '' ? null : (parseFloat(variant.height_cm) || null),
//         manufacture_date: variant.manufacture_date || null,
//         expiry_date: variant.expiry_date || null,
//         is_returnable: variant.is_returnable || false,
//         return_days: variant.return_days === '' ? 7 : parseInt(variant.return_days) || 7,
//         product_commission: variant.product_commission === '' ? '0.00' : parseFloat(variant.product_commission).toFixed(2),
//         media: mediaArray
//       };

//       if (variant.offer_id && variant.offer_id !== '') {
//         variantObj.offer_id = parseInt(variant.offer_id);
//       }

//       return variantObj;
//     });
//   };

//   const handleCancel = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'All unsaved changes will be lost.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#273c75',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, cancel',
//       cancelButtonText: 'No, continue editing'
//     }).then((result) => {
//       if (result.isConfirmed && onCancel) {
//         onCancel();
//       }
//     });
//   };

//   if (!userId && userDataLoaded === false) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="product-form-container">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading user data...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="product-form-container">
//         <div className="product-form-header">
//           <h2>Add Variants to Existing Product</h2>
//           <div className="user-info-badge">
//             <small>User ID: {userId}</small>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="product-form">
//           {errors.api && (
//             <div className="alert alert-danger" role="alert">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {errors.api}
//             </div>
//           )}

//           {/* Business Selection Section */}
//           <div className="form-section">
//             <h4 className="section-title">Select Business</h4>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="business" className="agent-form-label">
//                     Business <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${errors.business ? 'is-invalid' : ''}`}
//                     id="business"
//                     value={selectedBusinessId}
//                     onChange={(e) => handleBusinessSelect(e.target.value)}
//                     disabled={fetchingBusinesses || loading}
//                   >
//                     <option value="">
//                       {fetchingBusinesses ? 'Loading businesses...' : 'Select a business'}
//                     </option>
//                     {userBusinesses.map(business => (
//                       <option key={business.business_id} value={business.business_id}>
//                         {business.business_name} ({business.business_type || 'Business'})
//                       </option>
//                     ))}
//                   </select>
//                   {errors.business && (
//                     <div className="invalid-feedback">{errors.business}</div>
//                   )}
//                   {selectedBusiness && (
//                     <div className="mt-2 p-2 bg-light rounded">
//                       <small>
//                         <strong>Selected Business:</strong> {selectedBusiness.business_name}<br />
//                         <strong>Legal Name:</strong> {selectedBusiness.legal_name || 'N/A'}<br />
//                         <strong>Type:</strong> {selectedBusiness.business_type || 'N/A'}<br />
//                         <strong>Status:</strong> {selectedBusiness.verification_status}
//                       </small>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Selection Section - Only show if business is selected */}
//           {selectedBusiness && (
//             <div className="form-section">
//               <h4 className="section-title">Select Product</h4>
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="mb-3">
//                     <label htmlFor="product" className="agent-form-label">
//                       Product <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className={`form-select ${errors.product ? 'is-invalid' : ''}`}
//                       id="product"
//                       value={selectedProductId}
//                       onChange={(e) => handleProductSelect(e.target.value)}
//                       disabled={fetchingProducts || loading}
//                     >
//                       <option value="">
//                         {fetchingProducts ? 'Loading products...' : 'Select a product'}
//                       </option>
//                       {userProducts.map(product => (
//                         <option key={product.product_id} value={product.product_id}>
//                           {product.product_name} (Variants: {product.variants?.length || 0})
//                         </option>
//                       ))}
//                     </select>
//                     {errors.product && (
//                       <div className="invalid-feedback">{errors.product}</div>
//                     )}
//                     {selectedProduct && (
//                       <div className="mt-2 p-2 bg-light rounded">
//                         <small>
//                           <strong>Selected Product:</strong> {selectedProduct.product_name}<br />
//                           <strong>Brand:</strong> {selectedProduct.brand || 'N/A'}<br />
//                           <strong>Category:</strong> {selectedProduct.category}<br />
//                           <strong>Existing Variants:</strong> {selectedProduct.variants?.length || 0}
//                         </small>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Variants Section - Only show if product is selected */}
//           {selectedProduct && (
//             <div className="form-section">
//               <h4 className="section-title">
//                 Add New Variants for {selectedProduct.product_name}
//               </h4>
              
//               {variants.map((variant, variantIndex) => (
//                 <div key={variantIndex} className="variant-card">
//                   <div className="variant-header">
//                     <h5>New Variant {variantIndex + 1}</h5>
//                     {variants.length > 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => removeVariant(variantIndex)}
//                         title="Remove variant"
//                       >
//                         <FaTrash /> Remove Variant
//                       </button>
//                     )}
//                   </div>
                  
//                   {/* Row 1: SKU (Optional) and MRP */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`sku_${variantIndex}`} className="agent-form-label">
//                           SKU <span className="text-muted">(Optional)</span>
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id={`sku_${variantIndex}`}
//                           name="sku"
//                           value={variant.sku}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           placeholder="Enter SKU (optional)"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`mrp_${variantIndex}`} className="agent-form-label">
//                           MRP <span className="text-danger">*</span>
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className={`form-control ${errors[`variant_${variantIndex}_mrp`] ? 'is-invalid' : ''}`}
//                             id={`mrp_${variantIndex}`}
//                             name="mrp"
//                             value={variant.mrp || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                         {errors[`variant_${variantIndex}_mrp`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_mrp`]}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 2: Selling Price and Stock */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`selling_price_${variantIndex}`} className="agent-form-label">
//                           Selling Price
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`selling_price_${variantIndex}`}
//                             name="selling_price"
//                             value={variant.selling_price || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                         <div className="form-text">Leave empty if same as MRP</div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`stock_${variantIndex}`} className="agent-form-label">
//                           Stock Quantity
//                         </label>
//                         <input
//                           type="number"
//                           className={`form-control ${errors[`variant_${variantIndex}_stock`] ? 'is-invalid' : ''}`}
//                           id={`stock_${variantIndex}`}
//                           name="stock"
//                           value={variant.stock}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                         />
//                         {errors[`variant_${variantIndex}_stock`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_stock`]}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 3: Product Commission and Tax Percent */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`product_commission_${variantIndex}`} className="agent-form-label">
//                           Product Commission (₹)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`product_commission_${variantIndex}`}
//                             name="product_commission"
//                             value={variant.product_commission}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`tax_percent_${variantIndex}`} className="agent-form-label">
//                           Tax Percent (%)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">%</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`tax_percent_${variantIndex}`}
//                             name="tax_percent"
//                             value={variant.tax_percent || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             max="100"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 4: HSN Code and Offer */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`hsn_code_${variantIndex}`} className="agent-form-label">
//                           HSN Code
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id={`hsn_code_${variantIndex}`}
//                           name="hsn_code"
//                           value={variant.hsn_code || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           placeholder="Enter HSN code"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`offer_id_${variantIndex}`} className="agent-form-label">
//                           Apply Offer
//                         </label>
//                         <select
//                           className="form-select"
//                           id={`offer_id_${variantIndex}`}
//                           name="offer_id"
//                           value={variant.offer_id || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         >
//                           <option value="">Select Offer (Optional)</option>
//                           {offers.map(offer => (
//                             <option key={offer.id} value={offer.id}>
//                               {getOfferDisplayText(offer)}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 5: Weight and Dimensions */}
//                   <div className="row">
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`weight_kg_${variantIndex}`} className="agent-form-label">
//                           Weight (kg)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`weight_kg_${variantIndex}`}
//                           name="weight_kg"
//                           value={variant.weight_kg || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.001"
//                           placeholder="0.000"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`length_cm_${variantIndex}`} className="agent-form-label">
//                           Length (cm)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`length_cm_${variantIndex}`}
//                           name="length_cm"
//                           value={variant.length_cm || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.1"
//                           placeholder="0.0"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`width_cm_${variantIndex}`} className="agent-form-label">
//                           Width (cm)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`width_cm_${variantIndex}`}
//                           name="width_cm"
//                           value={variant.width_cm || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.1"
//                           placeholder="0.0"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-3">
//                       <div className="mb-3">
//                         <label htmlFor={`height_cm_${variantIndex}`} className="agent-form-label">
//                           Height (cm)
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`height_cm_${variantIndex}`}
//                           name="height_cm"
//                           value={variant.height_cm || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.1"
//                           placeholder="0.0"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 6: Manufacture and Expiry Dates */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`manufacture_date_${variantIndex}`} className="agent-form-label">
//                           Manufacture Date
//                         </label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           id={`manufacture_date_${variantIndex}`}
//                           name="manufacture_date"
//                           value={variant.manufacture_date || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`expiry_date_${variantIndex}`} className="agent-form-label">
//                           Expiry Date
//                         </label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           id={`expiry_date_${variantIndex}`}
//                           name="expiry_date"
//                           value={variant.expiry_date || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 7: Returnable and Return Days */}
//                   <div className="row">
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <div className="form-check" style={{ paddingTop: '2rem' }}>
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             id={`is_returnable_${variantIndex}`}
//                             name="is_returnable"
//                             checked={variant.is_returnable}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                           />
//                           <label className="form-check-label" htmlFor={`is_returnable_${variantIndex}`}>
//                             Product is Returnable
//                           </label>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="col-md-6">
//                       <div className="mb-3">
//                         <label htmlFor={`return_days_${variantIndex}`} className="agent-form-label">
//                           Return Days
//                         </label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`return_days_${variantIndex}`}
//                           name="return_days"
//                           value={variant.return_days}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           max="30"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Variant Attributes Section */}
//                   <div className="mb-3">
//                     <label className="agent-form-label">Variant Attributes</label>
//                     <div className="attributes-section">
//                       {variantAttributes[variantIndex]?.map((attr, attrIndex) => (
//                         <div key={attrIndex} className="row g-2 mb-2 align-items-center">
//                           <div className="col-md-5">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Attribute name (e.g., Color, Size)"
//                               name="key"
//                               value={attr.key}
//                               onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                             />
//                           </div>
//                           <div className="col-md-5">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Attribute value (e.g., Red, Large)"
//                               name="value"
//                               value={attr.value}
//                               onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                             />
//                           </div>
//                           <div className="col-md-2">
//                             {variantAttributes[variantIndex]?.length > 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => removeVariantAttribute(variantIndex, attrIndex)}
//                                 style={{ minWidth: '40px' }}
//                                 title="Remove attribute"
//                               >
//                                 <FaTrash />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-primary mt-2"
//                         onClick={() => addVariantAttribute(variantIndex)}
//                       >
//                         <FaPlusCircle /> Add Attribute
//                       </button>
//                     </div>
//                   </div>

//                   {/* Media Upload Section */}
//                   <div className="media-upload-section">
//                     <label className="agent-form-label">
//                       Product Media (Images & Videos) <span className="text-danger">*</span>
//                     </label>
                    
//                     {errors[`variant_${variantIndex}_media`] && (
//                       <div className="alert alert-danger py-2" role="alert">
//                         <small>
//                           <FaExclamationTriangle className="me-1" />
//                           {errors[`variant_${variantIndex}_media`]}
//                         </small>
//                       </div>
//                     )}
                    
//                     {variantMediaFiles[variantIndex]?.map((file, mediaIndex) => (
//                       <div key={mediaIndex} className="media-item-card mb-3 p-3 border rounded">
//                         <div className="row align-items-center">
//                           <div className="col-md-8">
//                             <div className="mb-2">
//                               <label className="agent-form-label small">
//                                 {mediaIndex === 0 ? 'Primary Image (Required)' : 'Additional Media'}
//                               </label>
//                               <input
//                                 type="file"
//                                 className={`form-control form-control-sm ${mediaIndex === 0 && !variantMediaFiles[variantIndex]?.[mediaIndex] && errors[`variant_${variantIndex}_media`] ? 'is-invalid' : ''}`}
//                                 accept="image/*,video/*"
//                                 onChange={(e) => handleMediaFileChange(variantIndex, mediaIndex, e)}
//                                 required={mediaIndex === 0}
//                               />
//                               {variantMediaFiles[variantIndex]?.[mediaIndex] && (
//                                 <div className="form-text">
//                                   Selected: {variantMediaFiles[variantIndex][mediaIndex].name}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="col-md-2">
//                             {variantMediaFiles[variantIndex]?.length > 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger mt-4"
//                                 onClick={() => removeMediaFromVariant(variantIndex, mediaIndex)}
//                                 disabled={mediaIndex === 0}
//                                 title={mediaIndex === 0 ? "Primary image cannot be removed" : "Remove this media"}
//                               >
//                                 <FaTrash />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => addMediaToVariant(variantIndex)}
//                     >
//                       <FaPlusCircle /> Add More Media
//                     </button>
                    
//                     <div className="form-text mt-2">
//                       <FaInfoCircle /> At least one product image is required. The first image will be used as the primary product image.
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <button
//                 type="button"
//                 className="btn btn-outline-primary mt-3"
//                 onClick={addVariant}
//               >
//                 <FaPlusCircle /> Add Another Variant
//               </button>
//             </div>
//           )}

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={handleCancel}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white'
//               }}
//               disabled={loading || !selectedProduct}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Adding Variants...
//                 </>
//               ) : (
//                 <>
//                   <FaPlusCircle className="me-2" />
//                   Add Variants
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddVariantForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import { FaTrash, FaPlusCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

// const AddVariantForm = ({ onSuccess, onCancel }) => {
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [selectedBusinessId, setSelectedBusinessId] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedProductId, setSelectedProductId] = useState('');
//   const [userBusinesses, setUserBusinesses] = useState([]);
//   const [userProducts, setUserProducts] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBusinesses, setFetchingBusinesses] = useState(true);
//   const [fetchingProducts, setFetchingProducts] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [userId, setUserId] = useState(null);
//   const [userDataLoaded, setUserDataLoaded] = useState(false);

//   // Variant form state - Simplified to match the image
//   const [variants, setVariants] = useState([{
//     sku: '',
//     mrp: '',
//     stock: "",
//     tax_percent: 0,
//     hsn_code: '',
//     product_commission: '',
//     offer_id: '',
//     attributes: {},
//     media: []
//   }]);

//   const [variantAttributes, setVariantAttributes] = useState([
//     [{ key: '', value: '' }]
//   ]);

//   const [variantMediaFiles, setVariantMediaFiles] = useState([[]]);

//   // Get user ID from localStorage
//   useEffect(() => {
//     console.log('Checking localStorage for user data...');
    
//     const userIdFromStorage = localStorage.getItem('user_id');
    
//     if (userIdFromStorage) {
//       console.log('Found user_id in localStorage:', userIdFromStorage);
//       setUserId(userIdFromStorage);
//       setUserDataLoaded(true);
//     } else {
//       const userDataJson = localStorage.getItem('user');
//       if (userDataJson) {
//         try {
//           const parsedUser = JSON.parse(userDataJson);
//           const userIdFromJson = parsedUser.user_id;
          
//           if (userIdFromJson) {
//             console.log('Found user_id in user JSON:', userIdFromJson);
//             setUserId(userIdFromJson);
//             setUserDataLoaded(true);
//           } else {
//             console.error('user_id not found in localStorage');
//             showAuthError();
//           }
//         } catch (error) {
//           console.error('Error parsing user JSON:', error);
//           showAuthError();
//         }
//       } else {
//         console.error('No user data found in localStorage');
//         showAuthError();
//       }
//     }
//   }, []);

//   // Fetch user's businesses when userId is available
//   useEffect(() => {
//     if (userId && userDataLoaded) {
//       fetchUserBusinesses();
//       fetchOffers();
//     }
//   }, [userId, userDataLoaded]);

//   const showAuthError = () => {
//     Swal.fire({
//       icon: 'error',
//       title: 'Authentication Required',
//       text: 'Please login to access this page.',
//       confirmButtonColor: '#273c75',
//       confirmButtonText: 'Go to Login'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.location.href = '/login';
//       }
//     });
//   };

//   const fetchUserBusinesses = async () => {
//     if (!userId) return;
    
//     setFetchingBusinesses(true);
//     try {
//       console.log('Fetching businesses for user_id:', userId);
//       const response = await axios.get(`${baseurl}/business/?user_id=${userId}`);
//       console.log('Businesses response:', response.data);
//       setUserBusinesses(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching businesses:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch businesses. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setFetchingBusinesses(false);
//     }
//   };

//   const fetchUserProducts = async (businessId) => {
//     if (!businessId) return;
    
//     setFetchingProducts(true);
//     try {
//       console.log('Fetching products for business_id:', businessId);
//       const response = await axios.get(`${baseurl}/products/`);
//       console.log('All products response:', response.data);
      
//       const allProducts = response.data.results || [];
//       const filteredProducts = allProducts.filter(product => product.business === parseInt(businessId));
      
//       console.log('Filtered products for business:', filteredProducts);
//       setUserProducts(filteredProducts);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch products. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//       setUserProducts([]);
//     } finally {
//       setFetchingProducts(false);
//     }
//   };

//   const fetchOffers = async () => {
//     if (!userId) return;
    
//     try {
//       console.log('Fetching offers for user_id:', userId);
//       const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
//       console.log('Offers response:', response.data);
//       setOffers(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//       setOffers([]);
//     }
//   };

//   const handleBusinessSelect = async (businessId) => {
//     setSelectedBusinessId(businessId);
//     setSelectedProduct(null);
//     setSelectedProductId('');
//     setUserProducts([]);
    
//     if (!businessId) {
//       setSelectedBusiness(null);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       const business = userBusinesses.find(b => b.business_id === parseInt(businessId));
//       setSelectedBusiness(business);
//       await fetchUserProducts(businessId);
//       resetVariantsForm();
//     } catch (error) {
//       console.error('Error selecting business:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to load business details.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProductSelect = async (productId) => {
//     setSelectedProductId(productId);
    
//     if (!productId) {
//       setSelectedProduct(null);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       const response = await axios.get(`${baseurl}/products/${productId}/`);
//       console.log('Selected product details:', response.data);
//       setSelectedProduct(response.data);
//       resetVariantsForm();
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to fetch product details. Please try again.',
//         confirmButtonColor: '#273c75'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetVariantsForm = () => {
//     setVariants([{
//       sku: '',
//       mrp: '',
//       stock: "",
//       tax_percent: 0,
//       hsn_code: '',
//       product_commission: '',
//       offer_id: '',
//       attributes: {},
//       media: []
//     }]);
//     setVariantAttributes([[{ key: '', value: '' }]]);
//     setVariantMediaFiles([[]]);
//     setErrors({});
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value, type, checked } = e.target;
//     const updatedVariants = [...variants];
    
//     let processedValue = value;
    
//     // Convert numeric fields
//     if (['mrp', 'tax_percent', 'product_commission'].includes(name)) {
//       processedValue = value === '' ? 0 : parseFloat(value) || 0;
//     } else if (name === 'stock') {
//       processedValue = value === '' ? 0 : parseInt(value) || 0;
//     }
    
//     updatedVariants[index] = {
//       ...updatedVariants[index],
//       [name]: processedValue
//     };
    
//     setVariants(updatedVariants);
//   };

//   // Variant Attributes handlers
//   const handleVariantAttributeChange = (variantIndex, attrIndex, e) => {
//     const { name, value } = e.target;
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (!updatedVariantAttributes[variantIndex]) {
//       updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
//     }
    
//     if (name === 'key') {
//       updatedVariantAttributes[variantIndex][attrIndex].key = value;
//     } else if (name === 'value') {
//       updatedVariantAttributes[variantIndex][attrIndex].value = value;
//     }
    
//     setVariantAttributes(updatedVariantAttributes);
    
//     // Update variant attributes in variants state
//     const attributesObj = {};
//     updatedVariantAttributes[variantIndex].forEach(attr => {
//       if (attr.key && attr.value) {
//         attributesObj[attr.key] = attr.value;
//       }
//     });
    
//     const updatedVariants = [...variants];
//     updatedVariants[variantIndex] = {
//       ...updatedVariants[variantIndex],
//       attributes: attributesObj
//     };
//     setVariants(updatedVariants);
//   };

//   const addVariantAttribute = (variantIndex) => {
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (!updatedVariantAttributes[variantIndex]) {
//       updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
//     }
    
//     updatedVariantAttributes[variantIndex] = [
//       ...updatedVariantAttributes[variantIndex],
//       { key: '', value: '' }
//     ];
    
//     setVariantAttributes(updatedVariantAttributes);
//   };

//   const removeVariantAttribute = (variantIndex, attrIndex) => {
//     const updatedVariantAttributes = [...variantAttributes];
    
//     if (updatedVariantAttributes[variantIndex] && updatedVariantAttributes[variantIndex].length > 1) {
//       updatedVariantAttributes[variantIndex] = updatedVariantAttributes[variantIndex].filter((_, i) => i !== attrIndex);
//       setVariantAttributes(updatedVariantAttributes);
      
//       // Update variant attributes in variants state
//       const attributesObj = {};
//       updatedVariantAttributes[variantIndex].forEach(attr => {
//         if (attr.key && attr.value) {
//           attributesObj[attr.key] = attr.value;
//         }
//       });
      
//       const updatedVariants = [...variants];
//       updatedVariants[variantIndex] = {
//         ...updatedVariants[variantIndex],
//         attributes: attributesObj
//       };
//       setVariants(updatedVariants);
//     }
//   };

//   // Media handlers
//   const handleMediaFileChange = (variantIndex, mediaIndex, e) => {
//     const files = e.target.files;
//     if (files && files[0]) {
//       const updatedMediaFiles = [...variantMediaFiles];
      
//       if (!updatedMediaFiles[variantIndex]) {
//         updatedMediaFiles[variantIndex] = [];
//       }
      
//       const file = files[0];
//       const fileType = file.type.startsWith('image/') ? 'image' : 
//                       file.type.startsWith('video/') ? 'video' : 'image';
      
//       updatedMediaFiles[variantIndex][mediaIndex] = file;
//       setVariantMediaFiles(updatedMediaFiles);
      
//       // Update media info in variants state
//       const updatedVariants = [...variants];
//       if (!updatedVariants[variantIndex].media) {
//         updatedVariants[variantIndex].media = [];
//       }
      
//       updatedVariants[variantIndex].media.push({
//         media_type: fileType,
//         sort_order: updatedVariants[variantIndex].media.length,
//         is_primary: updatedVariants[variantIndex].media.length === 0
//       });
      
//       setVariants(updatedVariants);
      
//       // Clear media error
//       if (errors[`variant_${variantIndex}_media`]) {
//         setErrors(prev => {
//           const newErrors = { ...prev };
//           delete newErrors[`variant_${variantIndex}_media`];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const addMediaToVariant = (variantIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     if (!updatedVariants[variantIndex].media) {
//       updatedVariants[variantIndex].media = [];
//     }
    
//     if (!updatedMediaFiles[variantIndex]) {
//       updatedMediaFiles[variantIndex] = [];
//     }
    
//     updatedMediaFiles[variantIndex].push(null);
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const removeMediaFromVariant = (variantIndex, mediaIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     if (updatedMediaFiles[variantIndex]?.length <= 1) {
//       return;
//     }
    
//     updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.filter((_, idx) => idx !== mediaIndex);
    
//     if (updatedMediaFiles[variantIndex]) {
//       updatedMediaFiles[variantIndex] = updatedMediaFiles[variantIndex].filter((_, idx) => idx !== mediaIndex);
//     }
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const addVariant = () => {
//     setVariants(prev => [...prev, {
//       sku: '',
//       mrp: '',
//       stock: 0,
//       tax_percent: 0,
//       hsn_code: '',
//       product_commission: '',
//       offer_id: '',
//       attributes: {},
//       media: []
//     }]);
//     setVariantMediaFiles(prev => [...prev, []]);
//     setVariantAttributes(prev => [...prev, [{ key: '', value: '' }]]);
//   };

//   const removeVariant = (index) => {
//     if (variants.length > 1) {
//       const updatedVariants = variants.filter((_, i) => i !== index);
//       const updatedMediaFiles = variantMediaFiles.filter((_, i) => i !== index);
//       const updatedAttributes = variantAttributes.filter((_, i) => i !== index);
//       setVariants(updatedVariants);
//       setVariantMediaFiles(updatedMediaFiles);
//       setVariantAttributes(updatedAttributes);
//     }
//   };

//   const getOfferDisplayText = (offer) => {
//     if (!offer) return '';
    
//     let displayText = '';
//     if (offer.offer_type === 'discount_percent') {
//       displayText = `${offer.value}% off`;
//     } else if (offer.offer_type === 'discount_flat') {
//       displayText = `₹${offer.value} off`;
//     } else if (offer.offer_type === 'buy_x_get_y') {
//       displayText = `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
//     } else if (offer.offer_type === 'free_gift') {
//       displayText = `Free Gift`;
//     } else {
//       displayText = offer.description || 'Special Offer';
//     }
    
//     if (offer.start_date && offer.end_date) {
//       displayText += ` (Valid: ${offer.start_date} to ${offer.end_date})`;
//     }
    
//     return displayText;
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!selectedBusiness) {
//       newErrors.business = 'Please select a business';
//     }
    
//     if (!selectedProduct) {
//       newErrors.product = 'Please select a product';
//     }
    
//     // Variants validation
//     variants.forEach((variant, index) => {
//       if (!variant.mrp || variant.mrp <= 0) {
//         newErrors[`variant_${index}_mrp`] = 'Valid MRP is required';
//       }
//       if (variant.stock < 0) {
//         newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
//       }
      
//       const variantMediaFilesArray = variantMediaFiles[index] || [];
//       const hasMediaFile = variantMediaFilesArray.some(file => file !== null && file !== undefined);
      
//       if (!hasMediaFile) {
//         newErrors[`variant_${index}_media`] = 'At least one product image is required';
//       }
//     });
    
//     setErrors(newErrors);
    
//     if (Object.keys(newErrors).length > 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Form Validation Error',
//         text: 'Please fill in all required fields correctly',
//         confirmButtonColor: '#273c75'
//       });
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication Error',
//         text: 'User ID is required. Please login again.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!selectedBusiness) {
//       Swal.fire({
//         icon: 'error',
//         title: 'No Business Selected',
//         text: 'Please select a business to add variants.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!selectedProduct) {
//       Swal.fire({
//         icon: 'error',
//         title: 'No Product Selected',
//         text: 'Please select a product to add variants.',
//         confirmButtonColor: '#273c75'
//       });
//       return;
//     }
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const formDataToSend = new FormData();
      
//       // Prepare only the new variants data
//       const newVariantsData = prepareNewVariantsData();
      
//       // Send only the variants data as a JSON string
//       formDataToSend.append('variants', JSON.stringify(newVariantsData));
      
//       // Add all media files for new variants
//       variantMediaFiles.forEach((variantFiles) => {
//         variantFiles.forEach((file) => {
//           if (file) {
//             formDataToSend.append('media_file', file);
//           }
//         });
//       });

//       console.log('Sending PUT request to:', `${baseurl}/products/${selectedProduct.product_id}/`);
//       console.log('New variants data:', newVariantsData);
      
//       const response = await axios.put(`${baseurl}/products/${selectedProduct.product_id}/`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       console.log('Response received:', response.data);
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Variants Added Successfully!',
//         text: 'New variants have been added to the product.',
//         confirmButtonColor: '#273c75'
//       }).then((result) => {
//         if (onSuccess) {
//           onSuccess(response.data);
//         }
//       });
      
//       // Reset form
//       setSelectedProduct(null);
//       setSelectedProductId('');
//       resetVariantsForm();
      
//     } catch (error) {
//       console.error('Error adding variants:', error);
//       console.error('Error response:', error.response?.data);
      
//       let errorMessage = 'An error occurred while adding variants';
      
//       if (error.response?.data?.error) {
//         const errorMsg = error.response.data.error;
//         if (typeof errorMsg === 'string') {
//           if (errorMsg.includes('[') && errorMsg.includes(']')) {
//             const match = errorMsg.match(/\[(.*?)\]/);
//             errorMessage = match ? match[1] : errorMsg;
//           } else {
//             errorMessage = errorMsg;
//           }
//         }
//       } else if (error.response?.data) {
//         errorMessage = JSON.stringify(error.response.data);
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Error Adding Variants',
//         text: errorMessage,
//         confirmButtonColor: '#273c75'
//       });
      
//       setErrors({ api: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to prepare new variants data - Simplified
//   const prepareNewVariantsData = () => {
//     return variants.map((variant, variantIndex) => {
//       const processedAttributes = {};
//       Object.entries(variant.attributes).forEach(([key, value]) => {
//         if (!isNaN(value) && value !== '' && value !== null) {
//           processedAttributes[key] = Number(value);
//         } else {
//           processedAttributes[key] = value;
//         }
//       });

//       // Prepare media array for this variant
//       const mediaArray = variant.media.map((media, mediaIndex) => ({
//         media_type: media.media_type,
//         sort_order: media.sort_order || mediaIndex,
//         is_primary: media.is_primary || (mediaIndex === 0)
//       }));

//       const variantObj = {
//         sku: variant.sku || '',
//         mrp: parseFloat(variant.mrp) || 0,
//         stock: parseInt(variant.stock) || 0,
//         attributes: processedAttributes,
//         tax_percent: parseFloat(variant.tax_percent) || 0,
//         hsn_code: variant.hsn_code || '',
//         product_commission: variant.product_commission === '' ? '0.00' : parseFloat(variant.product_commission).toFixed(2),
//         media: mediaArray
//       };

//       if (variant.offer_id && variant.offer_id !== '') {
//         variantObj.offer_id = parseInt(variant.offer_id);
//       }

//       return variantObj;
//     });
//   };

//   const handleCancel = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'All unsaved changes will be lost.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#273c75',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, cancel',
//       cancelButtonText: 'No, continue editing'
//     }).then((result) => {
//       if (result.isConfirmed && onCancel) {
//         onCancel();
//       }
//     });
//   };

//   if (!userId && userDataLoaded === false) {
//     return (
//       <>
//         <AgentNavbar />
//         <div className="product-form-container">
//           <div className="text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">Loading user data...</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <AgentNavbar />
//       <div className="product-form-container">
//         <div className="product-form-header">
//           <h2>Add Variants to Existing Product</h2>
//           <div className="user-info-badge">
//             <small>User ID: {userId}</small>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="product-form">
//           {errors.api && (
//             <div className="alert alert-danger" role="alert">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {errors.api}
//             </div>
//           )}

//           {/* Business Selection Section */}
//           <div className="form-section">
//             <h4 className="section-title">Select Business</h4>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="mb-3">
//                   <label htmlFor="business" className="agent-form-label">
//                     Business <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${errors.business ? 'is-invalid' : ''}`}
//                     id="business"
//                     value={selectedBusinessId}
//                     onChange={(e) => handleBusinessSelect(e.target.value)}
//                     disabled={fetchingBusinesses || loading}
//                   >
//                     <option value="">
//                       {fetchingBusinesses ? 'Loading businesses...' : 'Select a business'}
//                     </option>
//                     {userBusinesses.map(business => (
//                       <option key={business.business_id} value={business.business_id}>
//                         {business.business_name} ({business.business_type || 'Business'})
//                       </option>
//                     ))}
//                   </select>
//                   {errors.business && (
//                     <div className="invalid-feedback">{errors.business}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Selection Section */}
//           {selectedBusiness && (
//             <div className="form-section">
//               <h4 className="section-title">Select Product</h4>
//               <div className="row">
//                 <div className="col-md-12">
//                   <div className="mb-3">
//                     <label htmlFor="product" className="agent-form-label">
//                       Product <span className="text-danger">*</span>
//                     </label>
//                     <select
//                       className={`form-select ${errors.product ? 'is-invalid' : ''}`}
//                       id="product"
//                       value={selectedProductId}
//                       onChange={(e) => handleProductSelect(e.target.value)}
//                       disabled={fetchingProducts || loading}
//                     >
//                       <option value="">
//                         {fetchingProducts ? 'Loading products...' : 'Select a product'}
//                       </option>
//                       {userProducts.map(product => (
//                         <option key={product.product_id} value={product.product_id}>
//                           {product.product_name} (Variants: {product.variants?.length || 0})
//                         </option>
//                       ))}
//                     </select>
//                     {errors.product && (
//                       <div className="invalid-feedback">{errors.product}</div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Variants Section */}
//           {selectedProduct && (
//             <div className="form-section">
//               <h4 className="section-title">
//                 Add New Variants for {selectedProduct.product_name}
//               </h4>
              
//               {variants.map((variant, variantIndex) => (
//                 <div key={variantIndex} className="variant-card">
//                   <div className="variant-header">
//                     <h5>Variant {variantIndex + 1}</h5>
//                     {variants.length > 1 && (
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => removeVariant(variantIndex)}
//                         title="Remove variant"
//                       >
//                         <FaTrash /> Remove Variant
//                       </button>
//                     )}
//                   </div>
                  
//                   {/* SKU Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`sku_${variantIndex}`} className="agent-form-label">
//                           SKU
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id={`sku_${variantIndex}`}
//                           name="sku"
//                           value={variant.sku}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           placeholder="e.g., LADDU-BESAN-250G"
//                         />
//                         <div className="form-text">e.g., LADDU-BESAN-250G</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* MRP Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`mrp_${variantIndex}`} className="agent-form-label">
//                           MRP <span className="text-danger">*</span>
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">₹</span>
//                           <input
//                             type="number"
//                             className={`form-control ${errors[`variant_${variantIndex}_mrp`] ? 'is-invalid' : ''}`}
//                             id={`mrp_${variantIndex}`}
//                             name="mrp"
//                             value={variant.mrp || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                         {errors[`variant_${variantIndex}_mrp`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_mrp`]}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Quantity Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`stock_${variantIndex}`} className="agent-form-label">
//                           Stock Quantity
//                         </label>
//                         <input
//                           type="number"
//                           className={`form-control ${errors[`variant_${variantIndex}_stock`] ? 'is-invalid' : ''}`}
//                           id={`stock_${variantIndex}`}
//                           name="stock"
//                           value={variant.stock}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           placeholder="0"
//                         />
//                         {errors[`variant_${variantIndex}_stock`] && (
//                           <div className="invalid-feedback">{errors[`variant_${variantIndex}_stock`]}</div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Tax Percent Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`tax_percent_${variantIndex}`} className="agent-form-label">
//                           Tax Percent (%)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">%</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`tax_percent_${variantIndex}`}
//                             name="tax_percent"
//                             value={variant.tax_percent || ''}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             max="100"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Product Commission Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`product_commission_${variantIndex}`} className="agent-form-label">
//                           Product Commission (€)
//                         </label>
//                         <div className="input-group">
//                           <span className="input-group-text">€</span>
//                           <input
//                             type="number"
//                             className="form-control"
//                             id={`product_commission_${variantIndex}`}
//                             name="product_commission"
//                             value={variant.product_commission}
//                             onChange={(e) => handleVariantChange(variantIndex, e)}
//                             min="0"
//                             step="0.01"
//                             placeholder="0.00"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* HSN Code Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`hsn_code_${variantIndex}`} className="agent-form-label">
//                           HSN Code
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id={`hsn_code_${variantIndex}`}
//                           name="hsn_code"
//                           value={variant.hsn_code || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           placeholder="Enter HSN code"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer Field */}
//                   <div className="row">
//                     <div className="col-md-12">
//                       <div className="mb-3">
//                         <label htmlFor={`offer_id_${variantIndex}`} className="agent-form-label">
//                           Apply Offer
//                         </label>
//                         <select
//                           className="form-select"
//                           id={`offer_id_${variantIndex}`}
//                           name="offer_id"
//                           value={variant.offer_id || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                         >
//                           <option value="">Select Offer (Optional)</option>
//                           {offers.map(offer => (
//                             <option key={offer.id} value={offer.id}>
//                               {getOfferDisplayText(offer)}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Variant Attributes Section */}
//                   <div className="mb-3">
//                     <label className="agent-form-label">Variant Attributes</label>
//                     <div className="attributes-section">
//                       {variantAttributes[variantIndex]?.map((attr, attrIndex) => (
//                         <div key={attrIndex} className="row g-2 mb-2 align-items-center">
//                           <div className="col-md-5">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="e.g., unit, value, display"
//                               name="key"
//                               value={attr.key}
//                               onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                             />
//                           </div>
//                           <div className="col-md-5">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="e.g., g, 250, 250g"
//                               name="value"
//                               value={attr.value}
//                               onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                             />
//                           </div>
//                           <div className="col-md-2">
//                             {variantAttributes[variantIndex]?.length > 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => removeVariantAttribute(variantIndex, attrIndex)}
//                                 style={{ minWidth: '40px' }}
//                                 title="Remove attribute"
//                               >
//                                 <FaTrash />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         className="btn btn-sm btn-outline-primary mt-2"
//                         onClick={() => addVariantAttribute(variantIndex)}
//                       >
//                         <FaPlusCircle /> Add Attribute
//                       </button>
//                     </div>
//                   </div>

//                   {/* Media Upload Section */}
//                   <div className="media-upload-section">
//                     <label className="agent-form-label">
//                       Product Media (Images & Videos) <span className="text-danger">*</span>
//                     </label>
                    
//                     {errors[`variant_${variantIndex}_media`] && (
//                       <div className="alert alert-danger py-2" role="alert">
//                         <small>
//                           <FaExclamationTriangle className="me-1" />
//                           {errors[`variant_${variantIndex}_media`]}
//                         </small>
//                       </div>
//                     )}
                    
//                     {variantMediaFiles[variantIndex]?.map((file, mediaIndex) => (
//                       <div key={mediaIndex} className="media-item-card mb-3 p-3 border rounded">
//                         <div className="row align-items-center">
//                           <div className="col-md-8">
//                             <div className="mb-2">
//                               <label className="agent-form-label small">
//                                 {mediaIndex === 0 ? 'Primary Media (Required)' : 'Additional Media'}
//                               </label>
//                               <input
//                                 type="file"
//                                 className={`form-control form-control-sm`}
//                                 accept="image/*,video/*"
//                                 onChange={(e) => handleMediaFileChange(variantIndex, mediaIndex, e)}
//                               />
//                               {variantMediaFiles[variantIndex]?.[mediaIndex] && (
//                                 <div className="form-text">
//                                   Selected: {variantMediaFiles[variantIndex][mediaIndex].name}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className="col-md-2">
//                             {variantMediaFiles[variantIndex]?.length > 1 && (
//                               <button
//                                 type="button"
//                                 className="btn btn-sm btn-outline-danger mt-4"
//                                 onClick={() => removeMediaFromVariant(variantIndex, mediaIndex)}
//                                 disabled={mediaIndex === 0}
//                                 title={mediaIndex === 0 ? "Primary media cannot be removed" : "Remove this media"}
//                               >
//                                 <FaTrash />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
                    
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary"
//                       onClick={() => addMediaToVariant(variantIndex)}
//                     >
//                       <FaPlusCircle /> Add More Media
//                     </button>
                    
//                     <div className="form-text mt-2">
//                       <FaInfoCircle /> At least one product image is required. The first image will be used as the primary product image.
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <button
//                 type="button"
//                 className="btn btn-outline-primary mt-3"
//                 onClick={addVariant}
//               >
//                 <FaPlusCircle /> Add Another Variant
//               </button>
//             </div>
//           )}

//           {/* Form Actions */}
//           <div className="form-actions">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={handleCancel}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn"
//               style={{
//                 backgroundColor: '#273c75',
//                 borderColor: '#273c75',
//                 color: 'white'
//               }}
//               disabled={loading || !selectedProduct}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Adding Variants...
//                 </>
//               ) : (
//                 <>
//                   <FaPlusCircle className="me-2" />
//                   Add Variants
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddVariantForm;

//=============================================



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import { FaTrash, FaPlusCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const AddVariantForm = ({ onSuccess, onCancel }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [userBusinesses, setUserBusinesses] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBusinesses, setFetchingBusinesses] = useState(true);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // Variant form state
  const [variants, setVariants] = useState([{
    sku: '',
    mrp: '',
    stock: "",
    tax_percent: 0,
    hsn_code: '',
    product_commission: '',
    offer_id: '',
    attributes: {},
    media: []  // This will store media metadata
  }]);

  const [variantAttributes, setVariantAttributes] = useState([
    [{ key: '', value: '' }]
  ]);

  const [variantMediaFiles, setVariantMediaFiles] = useState([[]]);

  // Get user ID from localStorage
  useEffect(() => {
    console.log('Checking localStorage for user data...');
    
    const userIdFromStorage = localStorage.getItem('user_id');
    
    if (userIdFromStorage) {
      console.log('Found user_id in localStorage:', userIdFromStorage);
      setUserId(userIdFromStorage);
      setUserDataLoaded(true);
    } else {
      const userDataJson = localStorage.getItem('user');
      if (userDataJson) {
        try {
          const parsedUser = JSON.parse(userDataJson);
          const userIdFromJson = parsedUser.user_id;
          
          if (userIdFromJson) {
            console.log('Found user_id in user JSON:', userIdFromJson);
            setUserId(userIdFromJson);
            setUserDataLoaded(true);
          } else {
            console.error('user_id not found in localStorage');
            showAuthError();
          }
        } catch (error) {
          console.error('Error parsing user JSON:', error);
          showAuthError();
        }
      } else {
        console.error('No user data found in localStorage');
        showAuthError();
      }
    }
  }, []);

  // Fetch user's businesses when userId is available
  useEffect(() => {
    if (userId && userDataLoaded) {
      fetchUserBusinesses();
      fetchOffers();
    }
  }, [userId, userDataLoaded]);

  const showAuthError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Authentication Required',
      text: 'Please login to access this page.',
      confirmButtonColor: '#273c75',
      confirmButtonText: 'Go to Login'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
  };

  const fetchUserBusinesses = async () => {
    if (!userId) return;
    
    setFetchingBusinesses(true);
    try {
      console.log('Fetching businesses for user_id:', userId);
      const response = await axios.get(`${baseurl}/business/?user_id=${userId}`);
      console.log('Businesses response:', response.data);
      setUserBusinesses(response.data.results || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch businesses. Please try again.',
        confirmButtonColor: '#273c75'
      });
    } finally {
      setFetchingBusinesses(false);
    }
  };

  const fetchUserProducts = async (businessId) => {
    if (!businessId) return;
    
    setFetchingProducts(true);
    try {
      console.log('Fetching products for business_id:', businessId);
      const response = await axios.get(`${baseurl}/products/`);
      console.log('All products response:', response.data);
      
      const allProducts = response.data.results || [];
      const filteredProducts = allProducts.filter(product => product.business === parseInt(businessId));
      
      console.log('Filtered products for business:', filteredProducts);
      setUserProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch products. Please try again.',
        confirmButtonColor: '#273c75'
      });
      setUserProducts([]);
    } finally {
      setFetchingProducts(false);
    }
  };

  const fetchOffers = async () => {
    if (!userId) return;
    
    try {
      console.log('Fetching offers for user_id:', userId);
      const response = await axios.get(`${baseurl}/offers/user-id/${userId}/`);
      console.log('Offers response:', response.data);
      setOffers(response.data.results || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffers([]);
    }
  };

  const handleBusinessSelect = async (businessId) => {
    setSelectedBusinessId(businessId);
    setSelectedProduct(null);
    setSelectedProductId('');
    setUserProducts([]);
    
    if (!businessId) {
      setSelectedBusiness(null);
      return;
    }
    
    try {
      setLoading(true);
      const business = userBusinesses.find(b => b.business_id === parseInt(businessId));
      setSelectedBusiness(business);
      await fetchUserProducts(businessId);
      resetVariantsForm();
    } catch (error) {
      console.error('Error selecting business:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load business details.',
        confirmButtonColor: '#273c75'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = async (productId) => {
    setSelectedProductId(productId);
    
    if (!productId) {
      setSelectedProduct(null);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/products/${productId}/`);
      console.log('Selected product details:', response.data);
      setSelectedProduct(response.data);
      resetVariantsForm();
    } catch (error) {
      console.error('Error fetching product details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch product details. Please try again.',
        confirmButtonColor: '#273c75'
      });
    } finally {
      setLoading(false);
    }
  };

  const resetVariantsForm = () => {
    setVariants([{
      sku: '',
      mrp: '',
      stock: "",
      tax_percent: 0,
      hsn_code: '',
      product_commission: '',
      offer_id: '',
      attributes: {},
      media: []
    }]);
    setVariantAttributes([[{ key: '', value: '' }]]);
    setVariantMediaFiles([[]]);
    setErrors({});
  };

  const handleVariantChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedVariants = [...variants];
    
    let processedValue = value;
    
    // Convert numeric fields
    if (['mrp', 'tax_percent', 'product_commission'].includes(name)) {
      processedValue = value === '' ? 0 : parseFloat(value) || 0;
    } else if (name === 'stock') {
      processedValue = value === '' ? 0 : parseInt(value) || 0;
    }
    
    updatedVariants[index] = {
      ...updatedVariants[index],
      [name]: processedValue
    };
    
    setVariants(updatedVariants);
  };

  // Variant Attributes handlers
  const handleVariantAttributeChange = (variantIndex, attrIndex, e) => {
    const { name, value } = e.target;
    const updatedVariantAttributes = [...variantAttributes];
    
    if (!updatedVariantAttributes[variantIndex]) {
      updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
    }
    
    if (name === 'key') {
      updatedVariantAttributes[variantIndex][attrIndex].key = value;
    } else if (name === 'value') {
      updatedVariantAttributes[variantIndex][attrIndex].value = value;
    }
    
    setVariantAttributes(updatedVariantAttributes);
    
    // Update variant attributes in variants state
    const attributesObj = {};
    updatedVariantAttributes[variantIndex].forEach(attr => {
      if (attr.key && attr.value) {
        attributesObj[attr.key] = attr.value;
      }
    });
    
    const updatedVariants = [...variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      attributes: attributesObj
    };
    setVariants(updatedVariants);
  };

  const addVariantAttribute = (variantIndex) => {
    const updatedVariantAttributes = [...variantAttributes];
    
    if (!updatedVariantAttributes[variantIndex]) {
      updatedVariantAttributes[variantIndex] = [{ key: '', value: '' }];
    }
    
    updatedVariantAttributes[variantIndex] = [
      ...updatedVariantAttributes[variantIndex],
      { key: '', value: '' }
    ];
    
    setVariantAttributes(updatedVariantAttributes);
  };

  const removeVariantAttribute = (variantIndex, attrIndex) => {
    const updatedVariantAttributes = [...variantAttributes];
    
    if (updatedVariantAttributes[variantIndex] && updatedVariantAttributes[variantIndex].length > 1) {
      updatedVariantAttributes[variantIndex] = updatedVariantAttributes[variantIndex].filter((_, i) => i !== attrIndex);
      setVariantAttributes(updatedVariantAttributes);
      
      // Update variant attributes in variants state
      const attributesObj = {};
      updatedVariantAttributes[variantIndex].forEach(attr => {
        if (attr.key && attr.value) {
          attributesObj[attr.key] = attr.value;
        }
      });
      
      const updatedVariants = [...variants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        attributes: attributesObj
      };
      setVariants(updatedVariants);
    }
  };

  // Media handlers
  const handleMediaFileChange = (variantIndex, mediaIndex, e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const updatedMediaFiles = [...variantMediaFiles];
      const updatedVariants = [...variants];
      
      if (!updatedMediaFiles[variantIndex]) {
        updatedMediaFiles[variantIndex] = [];
      }
      
      if (!updatedVariants[variantIndex].media) {
        updatedVariants[variantIndex].media = [];
      }
      
      const file = files[0];
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'image';
      
      // Store the actual file
      updatedMediaFiles[variantIndex][mediaIndex] = file;
      
      // Store media metadata in variants state (matching backend expected format)
      const mediaMetadata = {
        media_type: fileType,
        sort_order: mediaIndex,
        is_primary: mediaIndex === 0
      };
      
      if (updatedVariants[variantIndex].media[mediaIndex]) {
        // Update existing
        updatedVariants[variantIndex].media[mediaIndex] = mediaMetadata;
      } else {
        // Add new
        updatedVariants[variantIndex].media.push(mediaMetadata);
      }
      
      setVariantMediaFiles(updatedMediaFiles);
      setVariants(updatedVariants);
      
      // Clear media error
      if (errors[`variant_${variantIndex}_media`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`variant_${variantIndex}_media`];
          return newErrors;
        });
      }
    }
  };

  const addMediaToVariant = (variantIndex) => {
    const updatedVariants = [...variants];
    const updatedMediaFiles = [...variantMediaFiles];
    
    if (!updatedVariants[variantIndex].media) {
      updatedVariants[variantIndex].media = [];
    }
    
    if (!updatedMediaFiles[variantIndex]) {
      updatedMediaFiles[variantIndex] = [];
    }
    
    // Add placeholder for new media
    updatedMediaFiles[variantIndex].push(null);
    updatedVariants[variantIndex].media.push({
      media_type: 'image',
      sort_order: updatedVariants[variantIndex].media.length,
      is_primary: false
    });
    
    setVariants(updatedVariants);
    setVariantMediaFiles(updatedMediaFiles);
  };

  const removeMediaFromVariant = (variantIndex, mediaIndex) => {
    const updatedVariants = [...variants];
    const updatedMediaFiles = [...variantMediaFiles];
    
    if (updatedVariants[variantIndex].media.length <= 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Remove',
        text: 'Each variant must have at least one media file.',
        confirmButtonColor: '#273c75'
      });
      return;
    }
    
    updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.filter((_, idx) => idx !== mediaIndex);
    
    if (updatedMediaFiles[variantIndex]) {
      updatedMediaFiles[variantIndex] = updatedMediaFiles[variantIndex].filter((_, idx) => idx !== mediaIndex);
    }
    
    // Update sort orders
    updatedVariants[variantIndex].media.forEach((media, idx) => {
      media.sort_order = idx;
      media.is_primary = idx === 0;
    });
    
    setVariants(updatedVariants);
    setVariantMediaFiles(updatedMediaFiles);
  };

  const addVariant = () => {
    setVariants(prev => [...prev, {
      sku: '',
      mrp: '',
      stock: 0,
      tax_percent: 0,
      hsn_code: '',
      product_commission: '',
      offer_id: '',
      attributes: {},
      media: []
    }]);
    setVariantMediaFiles(prev => [...prev, []]);
    setVariantAttributes(prev => [...prev, [{ key: '', value: '' }]]);
  };

  const removeVariant = (index) => {
    if (variants.length > 1) {
      const updatedVariants = variants.filter((_, i) => i !== index);
      const updatedMediaFiles = variantMediaFiles.filter((_, i) => i !== index);
      const updatedAttributes = variantAttributes.filter((_, i) => i !== index);
      setVariants(updatedVariants);
      setVariantMediaFiles(updatedMediaFiles);
      setVariantAttributes(updatedAttributes);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Remove',
        text: 'At least one variant is required.',
        confirmButtonColor: '#273c75'
      });
    }
  };

  const getOfferDisplayText = (offer) => {
    if (!offer) return '';
    
    let displayText = '';
    if (offer.offer_type === 'discount_percent') {
      displayText = `${offer.value}% off`;
    } else if (offer.offer_type === 'discount_flat') {
      displayText = `₹${offer.value} off`;
    } else if (offer.offer_type === 'buy_x_get_y') {
      displayText = `Buy ${offer.x_quantity} Get ${offer.y_quantity}`;
    } else if (offer.offer_type === 'free_gift') {
      displayText = `Free Gift`;
    } else {
      displayText = offer.description || 'Special Offer';
    }
    
    if (offer.start_date && offer.end_date) {
      displayText += ` (Valid: ${offer.start_date} to ${offer.end_date})`;
    }
    
    return displayText;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedBusiness) {
      newErrors.business = 'Please select a business';
    }
    
    if (!selectedProduct) {
      newErrors.product = 'Please select a product';
    }
    
    // Variants validation
    variants.forEach((variant, index) => {
      if (!variant.mrp || variant.mrp <= 0) {
        newErrors[`variant_${index}_mrp`] = 'Valid MRP is required';
      }
      if (variant.stock < 0) {
        newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
      }
      
      // Check if variant has at least one media file
      const variantMediaFilesArray = variantMediaFiles[index] || [];
      const hasMediaFile = variantMediaFilesArray.some(file => file !== null && file !== undefined);
      
      if (!hasMediaFile) {
        newErrors[`variant_${index}_media`] = 'At least one product image is required for each variant';
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Error',
        text: 'Please fill in all required fields correctly',
        confirmButtonColor: '#273c75'
      });
      return false;
    }
    
    return true;
  };

  // Prepare variants data exactly as backend expects
  const prepareVariantsData = () => {
    return variants.map((variant) => {
      // Process attributes
      const processedAttributes = {};
      Object.entries(variant.attributes).forEach(([key, value]) => {
        if (value && value !== '') {
          processedAttributes[key] = value;
        }
      });

      // Create variant object without media files (they'll be sent separately)
      const variantObj = {
        sku: variant.sku || '',
        mrp: parseFloat(variant.mrp) || 0,
        stock: parseInt(variant.stock) || 0,
        attributes: processedAttributes,
        tax_percent: parseFloat(variant.tax_percent) || 0,
        hsn_code: variant.hsn_code || '',
        product_commission: variant.product_commission === '' ? '0.00' : parseFloat(variant.product_commission).toFixed(2),
        media: variant.media // Include media metadata
      };

      if (variant.offer_id && variant.offer_id !== '') {
        variantObj.offer_id = parseInt(variant.offer_id);
      }

      return variantObj;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User ID is required. Please login again.',
        confirmButtonColor: '#273c75'
      });
      return;
    }
    
    if (!selectedBusiness) {
      Swal.fire({
        icon: 'error',
        title: 'No Business Selected',
        text: 'Please select a business to add variants.',
        confirmButtonColor: '#273c75'
      });
      return;
    }
    
    if (!selectedProduct) {
      Swal.fire({
        icon: 'error',
        title: 'No Product Selected',
        text: 'Please select a product to add variants.',
        confirmButtonColor: '#273c75'
      });
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Prepare variants data
      const variantsData = prepareVariantsData();
      
      // Send variants as JSON string (as backend expects)
      formDataToSend.append('variants', JSON.stringify(variantsData));
      
      // Collect all media files in order (as backend expects)
      // The backend expects media_files in the same order as they appear in variants
      const allMediaFiles = [];
      variantMediaFiles.forEach((variantFiles) => {
        if (variantFiles && Array.isArray(variantFiles)) {
          variantFiles.forEach((file) => {
            if (file && file instanceof File) {
              allMediaFiles.push(file);
            }
          });
        }
      });
      
      // Append each media file - backend expects 'media_files' (plural) field
      allMediaFiles.forEach((file) => {
        formDataToSend.append('media_files', file);
      });

      console.log('Sending request to add variants to product:', selectedProduct.product_id);
      console.log('Variants data:', variantsData);
      console.log('Number of media files:', allMediaFiles.length);
      console.log('Media files details:', allMediaFiles.map(f => ({ name: f.name, type: f.type, size: f.size })));
      
      // Use PUT request to update product with new variants
      // Note: Make sure your backend has a PUT endpoint that handles adding variants
      const response = await axios.put(`${baseurl}/products/${selectedProduct.product_id}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Response received:', response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Variants Added Successfully!',
        text: `${variantsData.length} new variant(s) have been added to the product.`,
        confirmButtonColor: '#273c75'
      }).then((result) => {
        if (onSuccess) {
          onSuccess(response.data);
        }
        // Reset form
        setSelectedProduct(null);
        setSelectedProductId('');
        resetVariantsForm();
      });
      
    } catch (error) {
      console.error('Error adding variants:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = 'An error occurred while adding variants';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error Adding Variants',
        text: errorMessage,
        confirmButtonColor: '#273c75'
      });
      
      setErrors({ api: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#273c75',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'No, continue editing'
    }).then((result) => {
      if (result.isConfirmed && onCancel) {
        onCancel();
      }
    });
  };

  if (!userId && userDataLoaded === false) {
    return (
      <>
        <AgentNavbar />
        <div className="product-form-container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading user data...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AgentNavbar />
      <div className="product-form-container">
        <div className="product-form-header">
          <h2>Add Variants to Existing Product</h2>
          <div className="user-info-badge">
            <small>User ID: {userId}</small>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {errors.api && (
            <div className="alert alert-danger" role="alert">
              <FaExclamationTriangle className="me-2" />
              {errors.api}
            </div>
          )}

          {/* Business Selection Section */}
          <div className="form-section">
            <h4 className="section-title">Select Business</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="business" className="agent-form-label">
                    Business <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.business ? 'is-invalid' : ''}`}
                    id="business"
                    value={selectedBusinessId}
                    onChange={(e) => handleBusinessSelect(e.target.value)}
                    disabled={fetchingBusinesses || loading}
                  >
                    <option value="">
                      {fetchingBusinesses ? 'Loading businesses...' : 'Select a business'}
                    </option>
                    {userBusinesses.map(business => (
                      <option key={business.business_id} value={business.business_id}>
                        {business.business_name} ({business.business_type || 'Business'})
                      </option>
                    ))}
                  </select>
                  {errors.business && (
                    <div className="invalid-feedback">{errors.business}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Selection Section */}
          {selectedBusiness && (
            <div className="form-section">
              <h4 className="section-title">Select Product</h4>
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="product" className="agent-form-label">
                      Product <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.product ? 'is-invalid' : ''}`}
                      id="product"
                      value={selectedProductId}
                      onChange={(e) => handleProductSelect(e.target.value)}
                      disabled={fetchingProducts || loading}
                    >
                      <option value="">
                        {fetchingProducts ? 'Loading products...' : 'Select a product'}
                      </option>
                      {userProducts.map(product => (
                        <option key={product.product_id} value={product.product_id}>
                          {product.product_name} (Variants: {product.variants?.length || 0})
                        </option>
                      ))}
                    </select>
                    {errors.product && (
                      <div className="invalid-feedback">{errors.product}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Variants Section */}
          {selectedProduct && (
            <div className="form-section">
              <h4 className="section-title">
                Add New Variants for {selectedProduct.product_name}
              </h4>
              
              {variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="variant-card">
                  <div className="variant-header">
                    <h5>Variant {variantIndex + 1}</h5>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeVariant(variantIndex)}
                        title="Remove variant"
                      >
                        <FaTrash /> Remove Variant
                      </button>
                    )}
                  </div>
                  
                  {/* SKU Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`sku_${variantIndex}`} className="agent-form-label">
                          SKU
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`sku_${variantIndex}`}
                          name="sku"
                          value={variant.sku}
                          onChange={(e) => handleVariantChange(variantIndex, e)}
                          placeholder="e.g., LADDU-BESAN-250G"
                        />
                        <div className="form-text">Unique identifier for this variant (optional)</div>
                      </div>
                    </div>
                  </div>

                  {/* MRP Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`mrp_${variantIndex}`} className="agent-form-label">
                          MRP <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">₹</span>
                          <input
                            type="number"
                            className={`form-control ${errors[`variant_${variantIndex}_mrp`] ? 'is-invalid' : ''}`}
                            id={`mrp_${variantIndex}`}
                            name="mrp"
                            value={variant.mrp || ''}
                            onChange={(e) => handleVariantChange(variantIndex, e)}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            required
                          />
                        </div>
                        {errors[`variant_${variantIndex}_mrp`] && (
                          <div className="invalid-feedback">{errors[`variant_${variantIndex}_mrp`]}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stock Quantity Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`stock_${variantIndex}`} className="agent-form-label">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          className={`form-control ${errors[`variant_${variantIndex}_stock`] ? 'is-invalid' : ''}`}
                          id={`stock_${variantIndex}`}
                          name="stock"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(variantIndex, e)}
                          min="0"
                          placeholder="0"
                        />
                        {errors[`variant_${variantIndex}_stock`] && (
                          <div className="invalid-feedback">{errors[`variant_${variantIndex}_stock`]}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tax Percent Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`tax_percent_${variantIndex}`} className="agent-form-label">
                          Tax Percent (%)
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">%</span>
                          <input
                            type="number"
                            className="form-control"
                            id={`tax_percent_${variantIndex}`}
                            name="tax_percent"
                            value={variant.tax_percent || ''}
                            onChange={(e) => handleVariantChange(variantIndex, e)}
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Commission Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`product_commission_${variantIndex}`} className="agent-form-label">
                          Product Commission (₹)
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">₹</span>
                          <input
                            type="number"
                            className="form-control"
                            id={`product_commission_${variantIndex}`}
                            name="product_commission"
                            value={variant.product_commission}
                            onChange={(e) => handleVariantChange(variantIndex, e)}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HSN Code Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`hsn_code_${variantIndex}`} className="agent-form-label">
                          HSN Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id={`hsn_code_${variantIndex}`}
                          name="hsn_code"
                          value={variant.hsn_code || ''}
                          onChange={(e) => handleVariantChange(variantIndex, e)}
                          placeholder="Enter HSN code"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Offer Field */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor={`offer_id_${variantIndex}`} className="agent-form-label">
                          Apply Offer
                        </label>
                        <select
                          className="form-select"
                          id={`offer_id_${variantIndex}`}
                          name="offer_id"
                          value={variant.offer_id || ''}
                          onChange={(e) => handleVariantChange(variantIndex, e)}
                        >
                          <option value="">Select Offer (Optional)</option>
                          {offers.map(offer => (
                            <option key={offer.id} value={offer.id}>
                              {getOfferDisplayText(offer)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Variant Attributes Section */}
                  <div className="mb-3">
                    <label className="agent-form-label">Variant Attributes (Optional)</label>
                    <div className="attributes-section">
                      {variantAttributes[variantIndex]?.map((attr, attrIndex) => (
                        <div key={attrIndex} className="row g-2 mb-2 align-items-center">
                          <div className="col-md-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Attribute name (e.g., size, color, weight)"
                              name="key"
                              value={attr.key}
                              onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
                            />
                          </div>
                          <div className="col-md-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Attribute value (e.g., Large, Red, 1kg)"
                              name="value"
                              value={attr.value}
                              onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
                            />
                          </div>
                          <div className="col-md-2">
                            {variantAttributes[variantIndex]?.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeVariantAttribute(variantIndex, attrIndex)}
                                style={{ minWidth: '40px' }}
                                title="Remove attribute"
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary mt-2"
                        onClick={() => addVariantAttribute(variantIndex)}
                      >
                        <FaPlusCircle /> Add Attribute
                      </button>
                    </div>
                  </div>

                  {/* Media Upload Section */}
                  <div className="media-upload-section">
                    <label className="agent-form-label">
                      Product Media (Images & Videos) <span className="text-danger">*</span>
                    </label>
                    
                    {errors[`variant_${variantIndex}_media`] && (
                      <div className="alert alert-danger py-2" role="alert">
                        <small>
                          <FaExclamationTriangle className="me-1" />
                          {errors[`variant_${variantIndex}_media`]}
                        </small>
                      </div>
                    )}
                    
                    {variant.media.map((media, mediaIndex) => (
                      <div key={mediaIndex} className="media-item-card mb-3 p-3 border rounded">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <div className="mb-2">
                              <label className="agent-form-label small">
                                {mediaIndex === 0 ? 'Primary Media (Required)' : `Additional Media ${mediaIndex + 1}`}
                              </label>
                              <input
                                type="file"
                                className="form-control form-control-sm"
                                accept="image/*,video/*"
                                onChange={(e) => handleMediaFileChange(variantIndex, mediaIndex, e)}
                              />
                              {variantMediaFiles[variantIndex]?.[mediaIndex] && (
                                <div className="form-text text-success mt-1">
                                  ✓ Selected: {variantMediaFiles[variantIndex][mediaIndex].name}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="col-md-2">
                            {variant.media.length > 1 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger mt-4"
                                onClick={() => removeMediaFromVariant(variantIndex, mediaIndex)}
                                disabled={mediaIndex === 0}
                                title={mediaIndex === 0 ? "Primary media cannot be removed" : "Remove this media"}
                              >
                                <FaTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => addMediaToVariant(variantIndex)}
                    >
                      <FaPlusCircle /> Add More Media
                    </button>
                    
                    <div className="form-text mt-2">
                      <FaInfoCircle className="me-1" />
                      At least one product image is required per variant. The first image will be used as the primary image.
                      Supported formats: Images (JPEG, PNG, GIF) and Videos (MP4, WebM)
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="btn btn-outline-primary mt-3"
                onClick={addVariant}
              >
                <FaPlusCircle /> Add Another Variant
              </button>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: '#273c75',
                borderColor: '#273c75',
                color: 'white'
              }}
              disabled={loading || !selectedProduct}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Adding Variants...
                </>
              ) : (
                <>
                  <FaPlusCircle className="me-2" />
                  Add Variants
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .product-form-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .product-form-header {
          // background: linear-gradient(135deg, #273c75 0%, #1e2f5a 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .product-form-header h2 {
          margin: 0;
          font-size: 1.8rem;
        }
        
        .user-info-badge {
          background: rgba(255,255,255,0.2);
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }
        
        .form-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .section-title {
          color: #273c75;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e0e0e0;
        }
        
        .variant-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid #e0e0e0;
        }
        
        .variant-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #dee2e6;
        }
        
        .variant-header h5 {
          margin: 0;
          color: #495057;
        }
        
        .agent-form-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .attributes-section {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
        }
        
        .media-upload-section {
          background: white;
          padding: 1rem;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          margin-top: 1rem;
        }
        
        .media-item-card {
          background: #f8f9fa;
        }
        
        @media (max-width: 768px) {
          .product-form-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .form-actions button {
            width: 100%;
          }
        }
            @media (max-width: 767px) {
             .form-actions {
            flex-direction: row;
          }
      }
      `}</style>
    </>
  );
};

export default AddVariantForm;