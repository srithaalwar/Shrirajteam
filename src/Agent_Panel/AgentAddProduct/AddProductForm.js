
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import './AddProductForm.css';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// import { baseurl } from '../../BaseURL/BaseURL';
// import { FaTrash, FaPlusCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

// const ProductForm = ({ onSuccess, onCancel }) => {
//   const [productData, setProductData] = useState({
//     business: '',
//     product_name: '',
//     description: '',
//     brand: '',
//     model_no: '',
//     category: '',
//     attributes: {},
//     has_variants: false
//   });

//   const [variants, setVariants] = useState([{
//     sku: '',
//     mrp: '',
//     selling_price: '',
//     stock:"" ,
//     attributes: {},
//     cgst_percent: 0,
//     sgst_percent: 0,
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
//     media: [{ media_type: 'image', sort_order: 0, is_primary: true }]
//   }]);

//   const [productAttributes, setProductAttributes] = useState([
//     { key: '', value: '' }
//   ]);

//   const [variantAttributes, setVariantAttributes] = useState([
//     [{ key: '', value: '' }]
//   ]);

//   const [categories, setCategories] = useState([]);
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [variantMediaFiles, setVariantMediaFiles] = useState([[]]);
//   const [userId, setUserId] = useState(null);

//   // Get user ID from localStorage on component mount
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUserId(parsedUser.id || parsedUser.user_id || 2);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         setUserId(2);
//       }
//     } else {
//       setUserId(2);
//     }
//   }, []);

//   // Fetch businesses when userId is available
//   useEffect(() => {
//     if (userId) {
//       fetchBusinesses();
//     }
//   }, [userId]);

//   // Fetch categories when business is selected
//   useEffect(() => {
//     if (productData.business) {
//       fetchCategories(productData.business);
//     } else {
//       setCategories([]);
//       setProductData(prev => ({
//         ...prev,
//         category: ''
//       }));
//     }
//   }, [productData.business, userId]);

//   // Update productData.attributes when productAttributes changes
//   useEffect(() => {
//     const attributesObj = {};
//     productAttributes.forEach(attr => {
//       if (attr.key && attr.value) {
//         if (attr.value.toLowerCase() === 'true') {
//           attributesObj[attr.key] = true;
//         } else if (attr.value.toLowerCase() === 'false') {
//           attributesObj[attr.key] = false;
//         } else {
//           attributesObj[attr.key] = attr.value;
//         }
//       }
//     });
//     setProductData(prev => ({
//       ...prev,
//       attributes: attributesObj
//     }));
//   }, [productAttributes]);

//   // Update variant attributes when variantAttributes changes
//   useEffect(() => {
//     const updatedVariants = [...variants];
//     variantAttributes.forEach((attrsArray, variantIndex) => {
//       const attributesObj = {};
//       attrsArray.forEach(attr => {
//         if (attr.key && attr.value) {
//           attributesObj[attr.key] = attr.value;
//         }
//       });
//       if (updatedVariants[variantIndex]) {
//         updatedVariants[variantIndex] = {
//           ...updatedVariants[variantIndex],
//           attributes: attributesObj
//         };
//       }
//     });
//     setVariants(updatedVariants);
//   }, [variantAttributes]);

//   const fetchCategories = async (businessId) => {
//     try {
//       const response = await axios.get(
//         `${baseurl}/categories/?user_id=${userId}&business_id=${businessId}&level=product`
//       );
//       setCategories(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories([]);
//     }
//   };

//   const fetchBusinesses = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/business/?user_id=${userId}`);
//       setBusinesses(response.data.results || []);
//     } catch (error) {
//       console.error('Error fetching businesses:', error);
//     }
//   };

//   const handleProductChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     setProductData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     if (name === 'business') {
//       setProductData(prev => ({
//         ...prev,
//         business: value,
//         category: ''
//       }));
//     }
    
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value, type, checked } = e.target;
//     const updatedVariants = [...variants];
    
//     let processedValue = value;
    
//     // Convert numeric fields
//     if (['mrp', 'selling_price', 'cgst_percent', 'sgst_percent', 'weight_kg', 'length_cm', 'width_cm', 'height_cm', 'product_commission'].includes(name)) {
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

//   // Product Attributes handlers
//   const handleProductAttributeChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedAttributes = [...productAttributes];
    
//     if (name === 'key') {
//       updatedAttributes[index].key = value;
//     } else if (name === 'value') {
//       updatedAttributes[index].value = value;
//     }
    
//     setProductAttributes(updatedAttributes);
//   };

//   const addProductAttribute = () => {
//     setProductAttributes([...productAttributes, { key: '', value: '' }]);
//   };

//   const removeProductAttribute = (index) => {
//     if (productAttributes.length > 1) {
//       const updatedAttributes = productAttributes.filter((_, i) => i !== index);
//       setProductAttributes(updatedAttributes);
//     }
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
//     }
//   };

//   // Media handlers for each variant
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
      
//       // Update or add file
//       if (updatedMediaFiles[variantIndex][mediaIndex]) {
//         updatedMediaFiles[variantIndex][mediaIndex] = file;
//       } else {
//         updatedMediaFiles[variantIndex][mediaIndex] = file;
//       }
      
//       setVariantMediaFiles(updatedMediaFiles);
      
//       // Update media info in variants state
//       const updatedVariants = [...variants];
//       if (!updatedVariants[variantIndex].media[mediaIndex]) {
//         updatedVariants[variantIndex].media[mediaIndex] = {
//           media_type: fileType,
//           sort_order: mediaIndex,
//           is_primary: mediaIndex === 0
//         };
//       } else {
//         updatedVariants[variantIndex].media[mediaIndex] = {
//           ...updatedVariants[variantIndex].media[mediaIndex],
//           media_type: fileType
//         };
//       }
      
//       setVariants(updatedVariants);
      
//       // Clear media error for this variant if it exists
//       if (errors[`variant_${variantIndex}_media`]) {
//         setErrors(prev => {
//           const newErrors = { ...prev };
//           delete newErrors[`variant_${variantIndex}_media`];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const handleMediaTypeChange = (variantIndex, mediaIndex, e) => {
//     const { value } = e.target;
//     const updatedVariants = [...variants];
    
//     if (!updatedVariants[variantIndex].media[mediaIndex]) {
//       updatedVariants[variantIndex].media[mediaIndex] = {
//         media_type: value,
//         sort_order: mediaIndex,
//         is_primary: false
//       };
//     } else {
//       updatedVariants[variantIndex].media[mediaIndex] = {
//         ...updatedVariants[variantIndex].media[mediaIndex],
//         media_type: value
//       };
//     }
    
//     setVariants(updatedVariants);
//   };

//   const handlePrimaryChange = (variantIndex, mediaIndex, e) => {
//     const { checked } = e.target;
//     const updatedVariants = [...variants];
    
//     // Reset all primary flags for this variant
//     updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.map((media, idx) => ({
//       ...media,
//       is_primary: idx === mediaIndex ? checked : false
//     }));
    
//     setVariants(updatedVariants);
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
    
//     updatedVariants[variantIndex].media.push({
//       media_type: 'image',
//       sort_order: updatedVariants[variantIndex].media.length,
//       is_primary: false
//     });
    
//     updatedMediaFiles[variantIndex].push(null);
    
//     setVariants(updatedVariants);
//     setVariantMediaFiles(updatedMediaFiles);
//   };

//   const removeMediaFromVariant = (variantIndex, mediaIndex) => {
//     const updatedVariants = [...variants];
//     const updatedMediaFiles = [...variantMediaFiles];
    
//     // Don't remove if it's the first media (we need at least one)
//     if (mediaIndex === 0 && updatedVariants[variantIndex].media.length === 1) {
//       return;
//     }
    
//     // Remove media from variants
//     updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.filter((_, idx) => idx !== mediaIndex);
    
//     // Update sort orders
//     updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.map((media, idx) => ({
//       ...media,
//       sort_order: idx
//     }));
    
//     // Remove file
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
//       media: [{ media_type: 'image', sort_order: 0, is_primary: true }]
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

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Product validation
//     if (!productData.product_name.trim()) {
//       newErrors.product_name = 'Product name is required';
//     }
//     if (!productData.category) {
//       newErrors.category = 'Category is required';
//     }
//     if (!productData.business) {
//       newErrors.business = 'Business is required';
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
      
//       // Check if at least one media file is uploaded for this variant
//       const variantMediaFilesArray = variantMediaFiles[index] || [];
//       const hasMediaFile = variantMediaFilesArray.some(file => file !== null && file !== undefined);
      
//       if (!hasMediaFile) {
//         newErrors[`variant_${index}_media`] = 'At least one product image is required';
//       }
      
//       // Check specifically for the first media file
//       if (!variantMediaFilesArray[0]) {
//         newErrors[`variant_${index}_media`] = 'Primary product image is required';
//       }
//     });
    
//     setErrors(newErrors);
    
//     // Show SweetAlert2 if there are errors
//     if (Object.keys(newErrors).length > 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Form Validation Error',
//         text: 'Please fill in all required fields correctly',
//         confirmButtonColor: '#273c75',
//         confirmButtonText: 'OK'
//       });
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // Prepare FormData for multipart upload
//       const formDataToSend = new FormData();
      
//       // Clean and prepare product data
//       const cleanProductData = {
//         business: parseInt(productData.business) || 0,
//         product_name: productData.product_name,
//         description: productData.description || '',
//         brand: productData.brand || '',
//         model_no: productData.model_no || '',
//         category: parseInt(productData.category) || 0,
//         attributes: productData.attributes,
//         has_variants: productData.has_variants || false,
//         verification_status: 'pending'
//       };

//       // Clean and prepare variants data
//       const cleanVariantsData = variants.map((variant, variantIndex) => {
//         // Convert numeric values in attributes
//         const processedAttributes = {};
//         Object.entries(variant.attributes).forEach(([key, value]) => {
//           if (!isNaN(value) && value !== '' && value !== null) {
//             processedAttributes[key] = Number(value);
//           } else {
//             processedAttributes[key] = value;
//           }
//         });

//         // Prepare media array
//         const mediaArray = variant.media.map((media, mediaIndex) => ({
//           media_type: media.media_type,
//           sort_order: media.sort_order || mediaIndex,
//           is_primary: media.is_primary || (mediaIndex === 0)
//         }));

//         return {
//           sku: variant.sku || '',
//           mrp: variant.mrp === '' ? 0 : parseFloat(variant.mrp) || 0,
//           selling_price: variant.selling_price === '' || variant.selling_price === null ? null : parseFloat(variant.selling_price),
//           stock: variant.stock === '' ? 0 : parseInt(variant.stock) || 0,
//           attributes: processedAttributes,
//           cgst_percent: variant.cgst_percent === '' ? 0 : parseFloat(variant.cgst_percent) || 0,
//           sgst_percent: variant.sgst_percent === '' ? 0 : parseFloat(variant.sgst_percent) || 0,
//           hsn_code: variant.hsn_code || '',
//           weight_kg: variant.weight_kg === '' ? null : (parseFloat(variant.weight_kg) || null),
//           length_cm: variant.length_cm === '' ? null : (parseFloat(variant.length_cm) || null),
//           width_cm: variant.width_cm === '' ? null : (parseFloat(variant.width_cm) || null),
//           height_cm: variant.height_cm === '' ? null : (parseFloat(variant.height_cm) || null),
//           manufacture_date: variant.manufacture_date || null,
//           expiry_date: variant.expiry_date || null,
//           is_returnable: variant.is_returnable || false,
//           return_days: variant.return_days === '' ? 7 : parseInt(variant.return_days) || 7,
//           product_commission: variant.product_commission === '' ? '0.00' : parseFloat(variant.product_commission).toFixed(2),
//           tax_percent: 0,
//           media: mediaArray
//         };
//       });

//       console.log('Product Data:', cleanProductData);
//       console.log('Product Attributes:', productData.attributes);
//       console.log('Variants Data:', cleanVariantsData);
//       console.log('Media Files:', variantMediaFiles);

//       // Add data to FormData as JSON strings
//       formDataToSend.append('product', JSON.stringify(cleanProductData));
//       formDataToSend.append('variants', JSON.stringify(cleanVariantsData));
      
//       // Add all media files to FormData with the same key 'media_file'
//       variantMediaFiles.forEach((variantFiles, variantIndex) => {
//         variantFiles.forEach((file, fileIndex) => {
//           if (file) {
//             formDataToSend.append('media_file', file);
//           }
//         });
//       });

//       console.log('Sending request to:', `${baseurl}/products/`);
      
//       // Log FormData entries for debugging
//       console.log('FormData entries:');
//       for (let pair of formDataToSend.entries()) {
//         console.log(pair[0] + ':', pair[0] === 'media_file' ? `File: ${pair[1].name}` : pair[1]);
//       }
      
//       // Send request
//       const response = await axios.post(`${baseurl}/products/`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       console.log('Response received:', response.data);
      
//       // Show success alert
//       Swal.fire({
//         icon: 'success',
//         title: 'Product Added Successfully!',
//         text: 'Your product has been added and is pending verification.',
//         confirmButtonColor: '#273c75',
//         confirmButtonText: 'OK'
//       }).then((result) => {
//         if (onSuccess) {
//           onSuccess(response.data);
//         }
//       });
      
//       // Reset form
//       setProductData({
//         business: '',
//         product_name: '',
//         description: '',
//         brand: '',
//         model_no: '',
//         category: '',
//         attributes: {},
//         has_variants: false
//       });
//       setVariants([{
//         sku: '',
//         mrp: '',
//         selling_price: '',
//         stock: 0,
//         attributes: {},
//         cgst_percent: 0,
//         sgst_percent: 0,
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
//         media: [{ media_type: 'image', sort_order: 0, is_primary: true }]
//       }]);
//       setProductAttributes([{ key: '', value: '' }]);
//       setVariantAttributes([[{ key: '', value: '' }]]);
//       setCategories([]);
//       setVariantMediaFiles([[]]);
      
//     } catch (error) {
//       console.error('Error creating product:', error);
//       console.error('Error response:', error.response?.data);
//       console.error('Error status:', error.response?.status);
      
//       // Show error alert
//       let errorMessage = 'An error occurred while creating the product';
      
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
//         title: 'Error Creating Product',
//         text: errorMessage,
//         confirmButtonColor: '#273c75',
//         confirmButtonText: 'OK'
//       });
      
//       setErrors({ api: errorMessage });
//     } finally {
//       setLoading(false);
//     }
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

//   return (
//     <>
//       <AgentNavbar />
//       <div className="product-form-container">
//         <div className="product-form-header">
//           <h2>Add New Product</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="product-form">
//           {/* Show API errors at the top */}
//           {errors.api && (
//             <div className="alert alert-danger" role="alert">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {errors.api}
//             </div>
//           )}

//           {/* Product Information Section */}
//           <div className="form-section">
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="business" className="agent-form-label">
//                     Business <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${errors.business ? 'is-invalid' : ''}`}
//                     id="business"
//                     name="business"
//                     value={productData.business}
//                     onChange={handleProductChange}
//                   >
//                     <option value="">Select Business</option>
//                     {businesses.map(business => (
//                       <option key={business.business_id} value={business.business_id}>
//                         {business.business_name}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.business && (
//                     <div className="invalid-feedback">{errors.business}</div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="product_name" className="agent-form-label">
//                     Product Name <span className="text-danger">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${errors.product_name ? 'is-invalid' : ''}`}
//                     id="product_name"
//                     name="product_name"
//                     value={productData.product_name}
//                     onChange={handleProductChange}
//                     placeholder="Enter product name"
//                   />
//                   {errors.product_name && (
//                     <div className="invalid-feedback">{errors.product_name}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="brand" className="agent-form-label">Brand</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="brand"
//                     name="brand"
//                     value={productData.brand}
//                     onChange={handleProductChange}
//                     placeholder="Enter brand name"
//                   />
//                 </div>
//               </div>
              
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="model_no" className="agent-form-label">Model Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="model_no"
//                     name="model_no"
//                     value={productData.model_no}
//                     onChange={handleProductChange}
//                     placeholder="Enter model number"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-3">
//               <label htmlFor="description" className="agent-form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 value={productData.description}
//                 onChange={handleProductChange}
//                 rows="3"
//                 placeholder="Enter product description"
//               />
//             </div>
            
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="category" className="agent-form-label">
//                     Category <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                     id="category"
//                     name="category"
//                     value={productData.category}
//                     onChange={handleProductChange}
//                     disabled={!productData.business || categories.length === 0}
//                   >
//                     <option value="">
//                       {!productData.business 
//                         ? 'Select a business first' 
//                         : categories.length === 0 
//                           ? 'No categories available' 
//                           : 'Select Category'
//                       }
//                     </option>
//                     {categories.map(category => (
//                       <option key={category.category_id} value={category.category_id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.category && (
//                     <div className="invalid-feedback">{errors.category}</div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <div className="form-check" style={{ paddingTop: '2rem' }}>
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       id="has_variants"
//                       name="has_variants"
//                       checked={productData.has_variants}
//                       onChange={handleProductChange}
//                     />
//                     <label className="form-check-label" htmlFor="has_variants">
//                       This product has variants
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Attributes Section */}
//             <div className="mb-3">
//               <label className="agent-form-label">Product Attributes</label>
//               <div className="attributes-section">
//                 {productAttributes.map((attr, attrIndex) => (
//                   <div key={attrIndex} className="row g-2 mb-2 align-items-center">
//                     <div className="col-md-6">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Attribute name (e.g., type, origin)"
//                         name="key"
//                         value={attr.key}
//                         onChange={(e) => handleProductAttributeChange(attrIndex, e)}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Attribute value (e.g., Besan Laddu, India)"
//                         name="value"
//                         value={attr.value}
//                         onChange={(e) => handleProductAttributeChange(attrIndex, e)}
//                       />
//                     </div>
//                     <div className="col-md-2">
//                       {productAttributes.length > 1 && (
//                         <button
//                           type="button"
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => removeProductAttribute(attrIndex)}
//                           style={{ minWidth: '40px' }}
//                           title="Remove attribute"
//                         >
// <FaTrash />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-primary mt-2"
//                   onClick={addProductAttribute}
//                 >
//                   <i className="bi bi-plus-circle"></i> Add Attribute
//                 </button>
//                 <div className="form-text mt-2">
//                   Product attributes: {JSON.stringify(productData.attributes)}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Variants Section */}
//           <div className="form-section">
//             <h4 className="section-title">
//               <i className="bi bi-layers"></i> Product Variants
//             </h4>
            
//             {variants.map((variant, variantIndex) => (
//               <div key={variantIndex} className="variant-card">
//                 <div className="variant-header">
//                   <h5>Variant {variantIndex + 1}</h5>
//                   {variants.length > 1 && (
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={() => removeVariant(variantIndex)}
//                       title="Remove variant"
//                     >
//                       <i className="bi bi-trash"></i> Remove Variant
//                     </button>
//                   )}
//                 </div>
                
//                 {/* Row 1: SKU * and MRP * */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor={`sku_${variantIndex}`} className="agent-form-label">
//                         SKU <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className={`form-control ${errors[`variant_${variantIndex}_sku`] ? 'is-invalid' : ''}`}
//                         id={`sku_${variantIndex}`}
//                         name="sku"
//                         value={variant.sku}
//                         onChange={(e) => handleVariantChange(variantIndex, e)}
//                         placeholder="Enter SKU (e.g., LADDU-BESAN-250G)"
//                       />
//                       {errors[`variant_${variantIndex}_sku`] && (
//                         <div className="invalid-feedback">{errors[`variant_${variantIndex}_sku`]}</div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor={`mrp_${variantIndex}`} className="agent-form-label">
//                         MRP <span className="text-danger">*</span>
//                       </label>
//                       <div className="input-group">
//                         <span className="input-group-text">₹</span>
//                         <input
//                           type="number"
//                           className={`form-control ${errors[`variant_${variantIndex}_mrp`] ? 'is-invalid' : ''}`}
//                           id={`mrp_${variantIndex}`}
//                           name="mrp"
//                           value={variant.mrp || ''}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.01"
//                           placeholder="0.00"
//                         />
//                       </div>
//                       {errors[`variant_${variantIndex}_mrp`] && (
//                         <div className="invalid-feedback">{errors[`variant_${variantIndex}_mrp`]}</div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Row 2: Stock Quantity and Product Commission (₹) */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor={`stock_${variantIndex}`} className="agent-form-label">
//                         Stock Quantity
//                       </label>
//                       <input
//                         type="number"
//                         className={`form-control ${errors[`variant_${variantIndex}_stock`] ? 'is-invalid' : ''}`}
//                         id={`stock_${variantIndex}`}
//                         name="stock"
//                         value={variant.stock}
//                         onChange={(e) => handleVariantChange(variantIndex, e)}
//                         min=""
//                       />
//                       {errors[`variant_${variantIndex}_stock`] && (
//                         <div className="invalid-feedback">{errors[`variant_${variantIndex}_stock`]}</div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor={`product_commission_${variantIndex}`} className="agent-form-label">
//                         Product Commission (₹)
//                       </label>
//                       <div className="input-group">
//                         <span className="input-group-text">₹</span>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id={`product_commission_${variantIndex}`}
//                           name="product_commission"
//                           value={variant.product_commission}
//                           onChange={(e) => handleVariantChange(variantIndex, e)}
//                           min="0"
//                           step="0.01"
//                           placeholder="0.00"
//                         />
//                       </div>
//                       <div className="form-text">
//                         Enter commission amount in rupees (not percentage)
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Variant Attributes Section */}
//                 <div className="mb-3">
//                   <label className="agent-form-label">Variant Attributes</label>
//                   <div className="attributes-section">
//                     {variantAttributes[variantIndex]?.map((attr, attrIndex) => (
//                       <div key={attrIndex} className="row g-2 mb-2 align-items-center">
//                         <div className="col-md-6">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Attribute name (e.g., unit, value, display)"
//                             name="key"
//                             value={attr.key}
//                             onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                           />
//                         </div>
//                         <div className="col-md-6">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Attribute value (e.g., g, 250, 250g)"
//                             name="value"
//                             value={attr.value}
//                             onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
//                           />
//                         </div>
//                         <div className="col-md-2">
//                           {variantAttributes[variantIndex]?.length > 1 && (
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => removeVariantAttribute(variantIndex, attrIndex)}
//                               style={{ minWidth: '40px' }}
//                               title="Remove attribute"
//                             >
// <FaTrash />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-outline-primary mt-2"
//                       onClick={() => addVariantAttribute(variantIndex)}
//                     >
//                       <i className="bi bi-plus-circle"></i> Add Attribute
//                     </button>
//                     <div className="form-text mt-2">
//                       Variant attributes: {JSON.stringify(variant.attributes)}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Media Upload Section for each variant */}
//                 <div className="media-upload-section">
//                   <label className="agent-form-label">
//                     Product Media (Images & Videos) <span className="text-danger">*</span>
//                   </label>
                  
//                   {errors[`variant_${variantIndex}_media`] && (
//                     <div className="alert alert-danger py-2" role="alert">
//                       <small>
//                         <i className="bi bi-exclamation-triangle me-1"></i>
//                         {errors[`variant_${variantIndex}_media`]}
//                       </small>
//                     </div>
//                   )}
                  
//                   {variant.media.map((media, mediaIndex) => (
//                     <div key={mediaIndex} className="media-item-card mb-3 p-3 border rounded">
//                       <div className="row align-items-center">
//                         <div className="col-md-5">
//                           <div className="mb-2">
//                             <label className="agent-form-label small">
//                               {mediaIndex === 0 ? 'Primary Image (Required)' : 'Additional Media'}
//                             </label>
//                             <input
//                               type="file"
//                               className={`form-control form-control-sm ${mediaIndex === 0 && !variantMediaFiles[variantIndex]?.[mediaIndex] && errors[`variant_${variantIndex}_media`] ? 'is-invalid' : ''}`}
//                               accept="image/*,video/*"
//                               onChange={(e) => handleMediaFileChange(variantIndex, mediaIndex, e)}
//                               required={mediaIndex === 0}
//                             />
//                             {variantMediaFiles[variantIndex]?.[mediaIndex] && (
//                               <div className="form-text">
//                                 Selected: {variantMediaFiles[variantIndex][mediaIndex].name}
//                               </div>
//                             )}
//                             {mediaIndex === 0 && !variantMediaFiles[variantIndex]?.[mediaIndex] && errors[`variant_${variantIndex}_media`] && (
//                               <div className="invalid-feedback">
//                                 Please upload a primary product image
//                               </div>
//                             )}
//                           </div>
//                         </div>
                        
//                         <div className="col-md-3">
//                           <div className="mb-2">
//                             <label className="agent-form-label small">Media Type</label>
//                             <select
//                               className="form-select form-select-sm"
//                               value={media.media_type || 'image'}
//                               onChange={(e) => handleMediaTypeChange(variantIndex, mediaIndex, e)}
//                             >
//                               <option value="image">Image</option>
//                               <option value="video">Video</option>
//                             </select>
//                           </div>
//                         </div>
                        
//                         <div className="col-md-2">
//                           <div className="form-check mb-2" style={{ paddingTop: '1.5rem' }}>
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               checked={media.is_primary || false}
//                               onChange={(e) => handlePrimaryChange(variantIndex, mediaIndex, e)}
//                               id={`primary_${variantIndex}_${mediaIndex}`}
//                               disabled={mediaIndex === 0}
//                             />
//                             <label className="form-check-label small" htmlFor={`primary_${variantIndex}_${mediaIndex}`}>
//                               {mediaIndex === 0 ? 'Primary (Required)' : 'Set as Primary'}
//                             </label>
//                           </div>
//                         </div>
                        
//                         <div className="col-md-2">
//                           {variant.media.length > 1 && (
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-outline-danger"
//                               onClick={() => removeMediaFromVariant(variantIndex, mediaIndex)}
//                               disabled={mediaIndex === 0}
//                               title={mediaIndex === 0 ? "Primary image cannot be removed" : "Remove this media"}
//                               style={{ minWidth: '40px' }}
//                             >
// <FaTrash />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
                  
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-primary"
//                     onClick={() => addMediaToVariant(variantIndex)}
//                   >
//                     <i className="bi bi-plus-circle"></i> Add More Media
//                   </button>
                  
//                   <div className="form-text mt-2">
//                     <i className="bi bi-info-circle"></i> At least one product image is required. The first image will be used as the primary product image.
//                   </div>
//                 </div>
//               </div>
//             ))}
            
//             <button
//               type="button"
//               className="btn btn-outline-primary mt-3"
//               onClick={addVariant}
//             >
//               <i className="bi bi-plus-circle"></i> Add Another Variant
//             </button>
//           </div>

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
//               disabled={loading || !productData.business || categories.length === 0}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-check-circle me-2"></i>
//                   Save Product
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ProductForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddProductForm.css';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { baseurl } from '../../BaseURL/BaseURL';
import { FaTrash, FaPlusCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const ProductForm = ({ onSuccess, onCancel }) => {
  const [productData, setProductData] = useState({
    business: '',
    product_name: '',
    description: '',
    brand: '',
    model_no: '',
    category: '',
    attributes: {},
    has_variants: false
  });

  const [variants, setVariants] = useState([{
    sku: '',
    mrp: '',
    selling_price: '',
    stock:"" ,
    attributes: {},
    cgst_percent: 0,
    sgst_percent: 0,
    hsn_code: '',
    weight_kg: '',
    length_cm: '',
    width_cm: '',
    height_cm: '',
    manufacture_date: '',
    expiry_date: '',
    is_returnable: true,
    return_days: 7,
    product_commission: '',
    media: [{ media_type: 'image', sort_order: 0, is_primary: true }]
  }]);

  const [productAttributes, setProductAttributes] = useState([
    { key: '', value: '' }
  ]);

  const [variantAttributes, setVariantAttributes] = useState([
    [{ key: '', value: '' }]
  ]);

  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [variantMediaFiles, setVariantMediaFiles] = useState([[]]);
  const [userId, setUserId] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // Get user ID from localStorage - DIRECTLY from localStorage keys
  useEffect(() => {
    console.log('Checking localStorage for user data...');
    
    // Check if user_id exists directly in localStorage
    const userIdFromStorage = localStorage.getItem('user_id');
    
    if (userIdFromStorage) {
      console.log('Found user_id in localStorage:', userIdFromStorage);
      setUserId(userIdFromStorage);
      setUserDataLoaded(true);
    } else {
      // If not found, check if there's a 'user' JSON object
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

  // Fetch businesses when userId is available and valid
  useEffect(() => {
    if (userId && userDataLoaded) {
      console.log('Fetching businesses for user_id:', userId);
      fetchBusinesses();
    }
  }, [userId, userDataLoaded]);

  // Fetch categories when business is selected
  useEffect(() => {
    if (productData.business && userId) {
      console.log('Fetching categories for business:', productData.business, 'user:', userId);
      fetchCategories(productData.business);
    } else {
      setCategories([]);
      setProductData(prev => ({
        ...prev,
        category: ''
      }));
    }
  }, [productData.business, userId]);

  // Update productData.attributes when productAttributes changes
  useEffect(() => {
    const attributesObj = {};
    productAttributes.forEach(attr => {
      if (attr.key && attr.value) {
        if (attr.value.toLowerCase() === 'true') {
          attributesObj[attr.key] = true;
        } else if (attr.value.toLowerCase() === 'false') {
          attributesObj[attr.key] = false;
        } else {
          attributesObj[attr.key] = attr.value;
        }
      }
    });
    setProductData(prev => ({
      ...prev,
      attributes: attributesObj
    }));
  }, [productAttributes]);

  // Update variant attributes when variantAttributes changes
  useEffect(() => {
    const updatedVariants = [...variants];
    variantAttributes.forEach((attrsArray, variantIndex) => {
      const attributesObj = {};
      attrsArray.forEach(attr => {
        if (attr.key && attr.value) {
          attributesObj[attr.key] = attr.value;
        }
      });
      if (updatedVariants[variantIndex]) {
        updatedVariants[variantIndex] = {
          ...updatedVariants[variantIndex],
          attributes: attributesObj
        };
      }
    });
    setVariants(updatedVariants);
  }, [variantAttributes]);

  const fetchCategories = async (businessId) => {
    if (!userId) {
      console.error('Cannot fetch categories: User ID is not available');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User authentication required to fetch categories.',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    try {
      const response = await axios.get(
        `${baseurl}/categories/?user_id=${userId}&business_id=${businessId}&level=product`
      );
      setCategories(response.data.results || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch categories. Please try again.',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
    }
  };

  const fetchBusinesses = async () => {
    if (!userId) {
      console.error('Cannot fetch businesses: User ID is not available');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User authentication required to fetch businesses.',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    try {
      console.log('Fetching businesses with user_id:', userId);
      const response = await axios.get(`${baseurl}/business/?user_id=${userId}`);
      console.log('Businesses response:', response.data);
      setBusinesses(response.data.results || []);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      console.error('Error details:', error.response?.data);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch businesses. Please try again.',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'business') {
      setProductData(prev => ({
        ...prev,
        business: value,
        category: ''
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleVariantChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedVariants = [...variants];
    
    let processedValue = value;
    
    // Convert numeric fields
    if (['mrp', 'selling_price', 'cgst_percent', 'sgst_percent', 'weight_kg', 'length_cm', 'width_cm', 'height_cm', 'product_commission'].includes(name)) {
      processedValue = value === '' ? 0 : parseFloat(value) || 0;
    } else if (['stock', 'return_days'].includes(name)) {
      processedValue = value === '' ? 0 : parseInt(value) || 0;
    } else if (type === 'checkbox') {
      processedValue = checked;
    }
    
    updatedVariants[index] = {
      ...updatedVariants[index],
      [name]: processedValue
    };
    
    setVariants(updatedVariants);
  };

  // Product Attributes handlers
  const handleProductAttributeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAttributes = [...productAttributes];
    
    if (name === 'key') {
      updatedAttributes[index].key = value;
    } else if (name === 'value') {
      updatedAttributes[index].value = value;
    }
    
    setProductAttributes(updatedAttributes);
  };

  const addProductAttribute = () => {
    setProductAttributes([...productAttributes, { key: '', value: '' }]);
  };

  const removeProductAttribute = (index) => {
    if (productAttributes.length > 1) {
      const updatedAttributes = productAttributes.filter((_, i) => i !== index);
      setProductAttributes(updatedAttributes);
    }
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
    }
  };

  // Media handlers for each variant
  const handleMediaFileChange = (variantIndex, mediaIndex, e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const updatedMediaFiles = [...variantMediaFiles];
      
      if (!updatedMediaFiles[variantIndex]) {
        updatedMediaFiles[variantIndex] = [];
      }
      
      const file = files[0];
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'image';
      
      // Update or add file
      if (updatedMediaFiles[variantIndex][mediaIndex]) {
        updatedMediaFiles[variantIndex][mediaIndex] = file;
      } else {
        updatedMediaFiles[variantIndex][mediaIndex] = file;
      }
      
      setVariantMediaFiles(updatedMediaFiles);
      
      // Update media info in variants state
      const updatedVariants = [...variants];
      if (!updatedVariants[variantIndex].media[mediaIndex]) {
        updatedVariants[variantIndex].media[mediaIndex] = {
          media_type: fileType,
          sort_order: mediaIndex,
          is_primary: mediaIndex === 0
        };
      } else {
        updatedVariants[variantIndex].media[mediaIndex] = {
          ...updatedVariants[variantIndex].media[mediaIndex],
          media_type: fileType
        };
      }
      
      setVariants(updatedVariants);
      
      // Clear media error for this variant if it exists
      if (errors[`variant_${variantIndex}_media`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`variant_${variantIndex}_media`];
          return newErrors;
        });
      }
    }
  };

  const handleMediaTypeChange = (variantIndex, mediaIndex, e) => {
    const { value } = e.target;
    const updatedVariants = [...variants];
    
    if (!updatedVariants[variantIndex].media[mediaIndex]) {
      updatedVariants[variantIndex].media[mediaIndex] = {
        media_type: value,
        sort_order: mediaIndex,
        is_primary: false
      };
    } else {
      updatedVariants[variantIndex].media[mediaIndex] = {
        ...updatedVariants[variantIndex].media[mediaIndex],
        media_type: value
      };
    }
    
    setVariants(updatedVariants);
  };

  const handlePrimaryChange = (variantIndex, mediaIndex, e) => {
    const { checked } = e.target;
    const updatedVariants = [...variants];
    
    // Reset all primary flags for this variant
    updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.map((media, idx) => ({
      ...media,
      is_primary: idx === mediaIndex ? checked : false
    }));
    
    setVariants(updatedVariants);
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
    
    updatedVariants[variantIndex].media.push({
      media_type: 'image',
      sort_order: updatedVariants[variantIndex].media.length,
      is_primary: false
    });
    
    updatedMediaFiles[variantIndex].push(null);
    
    setVariants(updatedVariants);
    setVariantMediaFiles(updatedMediaFiles);
  };

  const removeMediaFromVariant = (variantIndex, mediaIndex) => {
    const updatedVariants = [...variants];
    const updatedMediaFiles = [...variantMediaFiles];
    
    // Don't remove if it's the first media (we need at least one)
    if (mediaIndex === 0 && updatedVariants[variantIndex].media.length === 1) {
      return;
    }
    
    // Remove media from variants
    updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.filter((_, idx) => idx !== mediaIndex);
    
    // Update sort orders
    updatedVariants[variantIndex].media = updatedVariants[variantIndex].media.map((media, idx) => ({
      ...media,
      sort_order: idx
    }));
    
    // Remove file
    if (updatedMediaFiles[variantIndex]) {
      updatedMediaFiles[variantIndex] = updatedMediaFiles[variantIndex].filter((_, idx) => idx !== mediaIndex);
    }
    
    setVariants(updatedVariants);
    setVariantMediaFiles(updatedMediaFiles);
  };

  const addVariant = () => {
    setVariants(prev => [...prev, {
      sku: '',
      mrp: '',
      selling_price: '',
      stock: 0,
      attributes: {},
      cgst_percent: 0,
      sgst_percent: 0,
      hsn_code: '',
      weight_kg: '',
      length_cm: '',
      width_cm: '',
      height_cm: '',
      manufacture_date: '',
      expiry_date: '',
      is_returnable: true,
      return_days: 7,
      product_commission: '',
      media: [{ media_type: 'image', sort_order: 0, is_primary: true }]
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
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Product validation
    if (!productData.product_name.trim()) {
      newErrors.product_name = 'Product name is required';
    }
    if (!productData.category) {
      newErrors.category = 'Category is required';
    }
    if (!productData.business) {
      newErrors.business = 'Business is required';
    }
    
    // Variants validation
    variants.forEach((variant, index) => {
      if (!variant.sku.trim()) {
        newErrors[`variant_${index}_sku`] = 'SKU is required';
      }
      if (!variant.mrp || variant.mrp <= 0) {
        newErrors[`variant_${index}_mrp`] = 'Valid MRP is required';
      }
      if (variant.stock < 0) {
        newErrors[`variant_${index}_stock`] = 'Stock cannot be negative';
      }
      
      // Check if at least one media file is uploaded for this variant
      const variantMediaFilesArray = variantMediaFiles[index] || [];
      const hasMediaFile = variantMediaFilesArray.some(file => file !== null && file !== undefined);
      
      if (!hasMediaFile) {
        newErrors[`variant_${index}_media`] = 'At least one product image is required';
      }
      
      // Check specifically for the first media file
      if (!variantMediaFilesArray[0]) {
        newErrors[`variant_${index}_media`] = 'Primary product image is required';
      }
    });
    
    setErrors(newErrors);
    
    // Show SweetAlert2 if there are errors
    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Error',
        text: 'Please fill in all required fields correctly',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User ID is required. Please login again.',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare FormData for multipart upload
      const formDataToSend = new FormData();
      
      // Clean and prepare product data - ADD USER ID
      const cleanProductData = {
        business: parseInt(productData.business) || 0,
        product_name: productData.product_name,
        description: productData.description || '',
        brand: productData.brand || '',
        model_no: productData.model_no || '',
        category: parseInt(productData.category) || 0,
        attributes: productData.attributes,
        has_variants: productData.has_variants || false,
        verification_status: 'pending',
        user_id: userId, // Add user_id from localStorage
        created_by: userId // Also add as created_by if needed
      };

      // Clean and prepare variants data
      const cleanVariantsData = variants.map((variant, variantIndex) => {
        // Convert numeric values in attributes
        const processedAttributes = {};
        Object.entries(variant.attributes).forEach(([key, value]) => {
          if (!isNaN(value) && value !== '' && value !== null) {
            processedAttributes[key] = Number(value);
          } else {
            processedAttributes[key] = value;
          }
        });

        // Prepare media array
        const mediaArray = variant.media.map((media, mediaIndex) => ({
          media_type: media.media_type,
          sort_order: media.sort_order || mediaIndex,
          is_primary: media.is_primary || (mediaIndex === 0)
        }));

        return {
          sku: variant.sku || '',
          mrp: variant.mrp === '' ? 0 : parseFloat(variant.mrp) || 0,
          selling_price: variant.selling_price === '' || variant.selling_price === null ? null : parseFloat(variant.selling_price),
          stock: variant.stock === '' ? 0 : parseInt(variant.stock) || 0,
          attributes: processedAttributes,
          cgst_percent: variant.cgst_percent === '' ? 0 : parseFloat(variant.cgst_percent) || 0,
          sgst_percent: variant.sgst_percent === '' ? 0 : parseFloat(variant.sgst_percent) || 0,
          hsn_code: variant.hsn_code || '',
          weight_kg: variant.weight_kg === '' ? null : (parseFloat(variant.weight_kg) || null),
          length_cm: variant.length_cm === '' ? null : (parseFloat(variant.length_cm) || null),
          width_cm: variant.width_cm === '' ? null : (parseFloat(variant.width_cm) || null),
          height_cm: variant.height_cm === '' ? null : (parseFloat(variant.height_cm) || null),
          manufacture_date: variant.manufacture_date || null,
          expiry_date: variant.expiry_date || null,
          is_returnable: variant.is_returnable || false,
          return_days: variant.return_days === '' ? 7 : parseInt(variant.return_days) || 7,
          product_commission: variant.product_commission === '' ? '0.00' : parseFloat(variant.product_commission).toFixed(2),
          tax_percent: 0,
          media: mediaArray
        };
      });

      console.log('User ID from localStorage:', userId);
      console.log('Product Data:', cleanProductData);
      console.log('Product Attributes:', productData.attributes);
      console.log('Variants Data:', cleanVariantsData);
      console.log('Media Files:', variantMediaFiles);

      // Add data to FormData as JSON strings
      formDataToSend.append('product', JSON.stringify(cleanProductData));
      formDataToSend.append('variants', JSON.stringify(cleanVariantsData));
      
      // Add all media files to FormData with the same key 'media_file'
      variantMediaFiles.forEach((variantFiles, variantIndex) => {
        variantFiles.forEach((file, fileIndex) => {
          if (file) {
            formDataToSend.append('media_file', file);
          }
        });
      });

      console.log('Sending request to:', `${baseurl}/products/`);
      
      // Log FormData entries for debugging
      console.log('FormData entries:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ':', pair[0] === 'media_file' ? `File: ${pair[1].name}` : pair[1]);
      }
      
      // Send request
      const response = await axios.post(`${baseurl}/products/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Response received:', response.data);
      
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Product Added Successfully!',
        text: 'Your product has been added and is pending verification.',
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (onSuccess) {
          onSuccess(response.data);
        }
      });
      
      // Reset form
      setProductData({
        business: '',
        product_name: '',
        description: '',
        brand: '',
        model_no: '',
        category: '',
        attributes: {},
        has_variants: false
      });
      setVariants([{
        sku: '',
        mrp: '',
        selling_price: '',
        stock: 0,
        attributes: {},
        cgst_percent: 0,
        sgst_percent: 0,
        hsn_code: '',
        weight_kg: '',
        length_cm: '',
        width_cm: '',
        height_cm: '',
        manufacture_date: '',
        expiry_date: '',
        is_returnable: true,
        return_days: 7,
        product_commission: '',
        media: [{ media_type: 'image', sort_order: 0, is_primary: true }]
      }]);
      setProductAttributes([{ key: '', value: '' }]);
      setVariantAttributes([[{ key: '', value: '' }]]);
      setCategories([]);
      setVariantMediaFiles([[]]);
      
    } catch (error) {
      console.error('Error creating product:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // Show error alert
      let errorMessage = 'An error occurred while creating the product';
      
      if (error.response?.data?.error) {
        const errorMsg = error.response.data.error;
        if (typeof errorMsg === 'string') {
          if (errorMsg.includes('[') && errorMsg.includes(']')) {
            const match = errorMsg.match(/\[(.*?)\]/);
            errorMessage = match ? match[1] : errorMsg;
          } else {
            errorMessage = errorMsg;
          }
        }
      } else if (error.response?.data) {
        errorMessage = JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error Creating Product',
        text: errorMessage,
        confirmButtonColor: '#273c75',
        confirmButtonText: 'OK'
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

  // Don't render the form if userId is not loaded
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
          <h2>Add New Product</h2>
          <div className="user-info-badge">
            <small>User ID: {userId}</small>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Show API errors at the top */}
          {errors.api && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {errors.api}
            </div>
          )}

          {/* Product Information Section */}
          <div className="form-section">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="business" className="agent-form-label">
                    Business <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.business ? 'is-invalid' : ''}`}
                    id="business"
                    name="business"
                    value={productData.business}
                    onChange={handleProductChange}
                  >
                    <option value="">Select Business</option>
                    {businesses.map(business => (
                      <option key={business.business_id} value={business.business_id}>
                        {business.business_name}
                      </option>
                    ))}
                  </select>
                  {errors.business && (
                    <div className="invalid-feedback">{errors.business}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="product_name" className="agent-form-label">
                    Product Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.product_name ? 'is-invalid' : ''}`}
                    id="product_name"
                    name="product_name"
                    value={productData.product_name}
                    onChange={handleProductChange}
                    placeholder="Enter product name"
                  />
                  {errors.product_name && (
                    <div className="invalid-feedback">{errors.product_name}</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="brand" className="agent-form-label">Brand</label>
                  <input
                    type="text"
                    className="form-control"
                    id="brand"
                    name="brand"
                    value={productData.brand}
                    onChange={handleProductChange}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="model_no" className="agent-form-label">Model Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="model_no"
                    name="model_no"
                    value={productData.model_no}
                    onChange={handleProductChange}
                    placeholder="Enter model number"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="agent-form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={productData.description}
                onChange={handleProductChange}
                rows="3"
                placeholder="Enter product description"
              />
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="category" className="agent-form-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleProductChange}
                    disabled={!productData.business || categories.length === 0}
                  >
                    <option value="">
                      {!productData.business 
                        ? 'Select a business first' 
                        : categories.length === 0 
                          ? 'No categories available' 
                          : 'Select Category'
                      }
                    </option>
                    {categories.map(category => (
                      <option key={category.category_id} value={category.category_id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="form-check" style={{ paddingTop: '2rem' }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="has_variants"
                      name="has_variants"
                      checked={productData.has_variants}
                      onChange={handleProductChange}
                    />
                    <label className="form-check-label" htmlFor="has_variants">
                      This product has variants
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Attributes Section */}
            <div className="mb-3">
              <label className="agent-form-label">Product Attributes</label>
              <div className="attributes-section">
                {productAttributes.map((attr, attrIndex) => (
                  <div key={attrIndex} className="row g-2 mb-2 align-items-center">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Attribute name (e.g., type, origin)"
                        name="key"
                        value={attr.key}
                        onChange={(e) => handleProductAttributeChange(attrIndex, e)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Attribute value (e.g., Besan Laddu, India)"
                        name="value"
                        value={attr.value}
                        onChange={(e) => handleProductAttributeChange(attrIndex, e)}
                      />
                    </div>
                    <div className="col-md-2">
                      {productAttributes.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeProductAttribute(attrIndex)}
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
                  onClick={addProductAttribute}
                >
                  <FaPlusCircle /> Add Attribute
                </button>
                <div className="form-text mt-2">
                  Product attributes: {JSON.stringify(productData.attributes)}
                </div>
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="form-section">
            <h4 className="section-title">
              Product Variants
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
                
                {/* Row 1: SKU * and MRP * */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor={`sku_${variantIndex}`} className="agent-form-label">
                        SKU <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors[`variant_${variantIndex}_sku`] ? 'is-invalid' : ''}`}
                        id={`sku_${variantIndex}`}
                        name="sku"
                        value={variant.sku}
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        placeholder="Enter SKU (e.g., LADDU-BESAN-250G)"
                      />
                      {errors[`variant_${variantIndex}_sku`] && (
                        <div className="invalid-feedback">{errors[`variant_${variantIndex}_sku`]}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
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
                        />
                      </div>
                      {errors[`variant_${variantIndex}_mrp`] && (
                        <div className="invalid-feedback">{errors[`variant_${variantIndex}_mrp`]}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 2: Stock Quantity and Product Commission (₹) */}
                <div className="row">
                  <div className="col-md-6">
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
                        min=""
                      />
                      {errors[`variant_${variantIndex}_stock`] && (
                        <div className="invalid-feedback">{errors[`variant_${variantIndex}_stock`]}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
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
                          min=""
                          step="0.01"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="form-text">
                        Enter commission amount in rupees (not percentage)
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Variant Attributes Section */}
                <div className="mb-3">
                  <label className="agent-form-label">Variant Attributes</label>
                  <div className="attributes-section">
                    {variantAttributes[variantIndex]?.map((attr, attrIndex) => (
                      <div key={attrIndex} className="row g-2 mb-2 align-items-center">
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Attribute name (e.g., unit, value, display)"
                            name="key"
                            value={attr.key}
                            onChange={(e) => handleVariantAttributeChange(variantIndex, attrIndex, e)}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Attribute value (e.g., g, 250, 250g)"
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
                    <div className="form-text mt-2">
                      Variant attributes: {JSON.stringify(variant.attributes)}
                    </div>
                  </div>
                </div>
                
                {/* Media Upload Section for each variant */}
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
                        <div className="col-md-5">
                          <div className="mb-2">
                            <label className="agent-form-label small">
                              {mediaIndex === 0 ? 'Primary Image (Required)' : 'Additional Media'}
                            </label>
                            <input
                              type="file"
                              className={`form-control form-control-sm ${mediaIndex === 0 && !variantMediaFiles[variantIndex]?.[mediaIndex] && errors[`variant_${variantIndex}_media`] ? 'is-invalid' : ''}`}
                              accept="image/*,video/*"
                              onChange={(e) => handleMediaFileChange(variantIndex, mediaIndex, e)}
                              required={mediaIndex === 0}
                            />
                            {variantMediaFiles[variantIndex]?.[mediaIndex] && (
                              <div className="form-text">
                                Selected: {variantMediaFiles[variantIndex][mediaIndex].name}
                              </div>
                            )}
                            {mediaIndex === 0 && !variantMediaFiles[variantIndex]?.[mediaIndex] && errors[`variant_${variantIndex}_media`] && (
                              <div className="invalid-feedback">
                                Please upload a primary product image
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-3">
                          <div className="mb-2">
                            <label className="agent-form-label small">Media Type</label>
                            <select
                              className="form-select form-select-sm"
                              value={media.media_type || 'image'}
                              onChange={(e) => handleMediaTypeChange(variantIndex, mediaIndex, e)}
                            >
                              <option value="image">Image</option>
                              <option value="video">Video</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="col-md-2">
                          <div className="form-check mb-2" style={{ paddingTop: '1.5rem' }}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={media.is_primary || false}
                              onChange={(e) => handlePrimaryChange(variantIndex, mediaIndex, e)}
                              id={`primary_${variantIndex}_${mediaIndex}`}
                              disabled={mediaIndex === 0}
                            />
                            <label className="form-check-label small" htmlFor={`primary_${variantIndex}_${mediaIndex}`}>
                              {mediaIndex === 0 ? 'Primary (Required)' : 'Set as Primary'}
                            </label>
                          </div>
                        </div>
                        
                        <div className="col-md-2">
                          {variant.media.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeMediaFromVariant(variantIndex, mediaIndex)}
                              disabled={mediaIndex === 0}
                              title={mediaIndex === 0 ? "Primary image cannot be removed" : "Remove this media"}
                              style={{ minWidth: '40px' }}
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
                    <FaInfoCircle /> At least one product image is required. The first image will be used as the primary product image.
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

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
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
              disabled={loading || !productData.business || categories.length === 0}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <FaPlusCircle className="me-2" />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;