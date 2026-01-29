
// import React, { useState, useEffect } from 'react';
// import "./AddBusiness.css";
// import axios from 'axios';
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { baseurl } from '../../BaseURL/BaseURL';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
// const AddBusinessForm = ({ user, mode = 'add' }) => {  
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState('basic-details');
//   const [isEditing, setIsEditing] = useState(mode === 'edit');
//   const [isViewing, setIsViewing] = useState(mode === 'view');
//   const [loading, setLoading] = useState(mode !== 'add');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
  
//   const userId = localStorage.getItem('user_id');
//   const token = localStorage.getItem('token');

//   // Define tabs
//   const tabs = [
//     { id: 'basic-details', label: 'Basic Details' },
//     { id: 'contact-info', label: 'Contact Info' },
//     { id: 'address', label: 'Address' },
//     { id: 'bank-compliance', label: 'Bank & Compliance' },
//     { id: 'marketplace', label: 'Marketplace' },
//     { id: 'working-hours', label: 'Working Hours' }
//   ];

//   // Working hours days
//   const DAYS = [
//     { value: 'monday', label: 'Monday' },
//     { value: 'tuesday', label: 'Tuesday' },
//     { value: 'wednesday', label: 'Wednesday' },
//     { value: 'thursday', label: 'Thursday' },
//     { value: 'friday', label: 'Friday' },
//     { value: 'saturday', label: 'Saturday' },
//     { value: 'sunday', label: 'Sunday' }
//   ];

//   // Business types
//   const BUSINESS_TYPES = [
//     { value: 'individual', label: 'Individual' },
//     { value: 'proprietor', label: 'Proprietor' },
//     { value: 'partnership', label: 'Partnership' },
//     { value: 'private_limited', label: 'Private Limited' },
//     { value: 'llp', label: 'LLP' }
//   ];

//   // Error States
//   const [errors, setErrors] = useState({});

//   // Form State - Updated to match payload
//   const [formData, setFormData] = useState({
//     // Basic Details
//     business_name: '',
//     legal_name: '',
//     business_type: '',
//     description: '',
    
//     // Contact Info
//     categories: [],
//     support_email: '',
//     support_phone: '',
//     website: '',
    
//     // Address
//     address_line1: '',
//     address_line2: '',
//     city: '',
//     state: '',
//     country: 'India',
//     pincode: '',
    
//     // Bank & Compliance
//     bank_account_name: '',
//     bank_account_number: '',
//     bank_ifsc: '',
//     bank_name: '',
//     gst_number: '',
//     pan_number: '',
    
//     // Marketplace
//     commission_percent: '5.00',
//     settlement_cycle_days: 3,
//     min_order_value: '50.00',
    
//     // Working Hours - Initialize with default values
//     working_hours: DAYS.map(day => ({
//       day: day.value,
//       opens_at: day.value === 'sunday' ? null : '11:00',
//       closes_at: day.value === 'sunday' ? null : '18:00',
//       is_closed: day.value === 'sunday'
//     })),
    
//     // System fields
//     user: parseInt(userId) || 1
//   });

//   // Categories state
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const categoriesRes = await axios.get(`${baseurl}/categories/`, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         const businessCategories = Array.isArray(categoriesRes.data) 
//           ? categoriesRes.data.filter(cat => cat.level === 'business')
//           : categoriesRes.data.results?.filter(cat => cat.level === 'business') || [];
        
//         setCategories(businessCategories);

//         // If editing/viewing, fetch business data
//         if (id && mode !== 'add') {
//           const response = await axios.get(`${baseurl}/business/${id}/`, {
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });
          
//           const businessData = response.data;
          
//           // Format the data for the form
//           const formattedData = {
//             business_name: businessData.business_name || '',
//             legal_name: businessData.legal_name || '',
//             business_type: businessData.business_type || '',
//             description: businessData.description || '',
//             categories: businessData.categories || [],
//             support_email: businessData.support_email || '',
//             support_phone: businessData.support_phone || '',
//             website: businessData.website || '',
//             address_line1: businessData.address_line1 || '',
//             address_line2: businessData.address_line2 || '',
//             city: businessData.city || '',
//             state: businessData.state || '',
//             country: businessData.country || 'India',
//             pincode: businessData.pincode || '',
//             gst_number: businessData.gst_number || '',
//             pan_number: businessData.pan_number || '',
//             bank_account_name: businessData.bank_account_name || '',
//             bank_account_number: businessData.bank_account_number || '',
//             bank_ifsc: businessData.bank_ifsc || '',
//             bank_name: businessData.bank_name || '',
//             commission_percent: businessData.commission_percent || '5.00',
//             settlement_cycle_days: businessData.settlement_cycle_days || 3,
//             min_order_value: businessData.min_order_value || '50.00',
//             user: parseInt(userId) || 1,
//             // Format working hours
//             working_hours: businessData.working_hours?.length 
//               ? DAYS.map(day => {
//                   const existingHour = businessData.working_hours.find(wh => wh.day === day.value);
//                   if (existingHour) {
//                     return {
//                       day: day.value,
//                       opens_at: existingHour.opens_at || null,
//                       closes_at: existingHour.closes_at || null,
//                       is_closed: existingHour.is_closed || false
//                     };
//                   }
//                   return {
//                     day: day.value,
//                     opens_at: day.value === 'sunday' ? null : '11:00',
//                     closes_at: day.value === 'sunday' ? null : '18:00',
//                     is_closed: day.value === 'sunday'
//                   };
//                 })
//               : DAYS.map(day => ({
//                   day: day.value,
//                   opens_at: day.value === 'sunday' ? null : '11:00',
//                   closes_at: day.value === 'sunday' ? null : '18:00',
//                   is_closed: day.value === 'sunday'
//                 }))
//           };
          
//           setFormData(formattedData);
//           setIsEditing(mode === 'edit');
//           setIsViewing(mode === 'view');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load data',
//           confirmButtonColor: '#d33',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id, mode, token, userId]);

//   const handleChange = (e) => {
//     if (isViewing) return;
    
//     const { name, value, type, checked } = e.target;
    
//     if (type === 'checkbox') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: checked
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleCategoryChange = (categoryId) => {
//     if (isViewing) return;
    
//     setFormData(prev => {
//       const numericId = parseInt(categoryId);
//       const newCategories = prev.categories.includes(numericId)
//         ? prev.categories.filter(id => id !== numericId)
//         : [...prev.categories, numericId];
//       return { ...prev, categories: newCategories };
//     });
//   };

//   const handleWorkingHourChange = (index, field, value) => {
//     if (isViewing) return;
    
//     setFormData(prev => {
//       const updatedHours = [...prev.working_hours];
      
//       if (field === 'is_closed') {
//         const isClosed = value === 'true';
//         updatedHours[index] = {
//           ...updatedHours[index],
//           is_closed: isClosed,
//           opens_at: isClosed ? null : updatedHours[index].opens_at || '11:00',
//           closes_at: isClosed ? null : updatedHours[index].closes_at || '18:00'
//         };
//       } else {
//         updatedHours[index] = {
//           ...updatedHours[index],
//           [field]: value
//         };
//       }
      
//       return { ...prev, working_hours: updatedHours };
//     });
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const validateCurrentTab = () => {
//     if (isViewing) return true;
    
//     const newErrors = {};
    
//     switch (activeTab) {
//       case 'basic-details':
//         if (!formData.business_name?.trim()) newErrors.business_name = 'Business Name is required';
//         if (!formData.business_type) newErrors.business_type = 'Business Type is required';
//         break;
        
//       case 'contact-info':
//         if (!formData.support_email?.trim()) newErrors.support_email = 'Support Email is required';
//         if (!formData.support_phone?.trim()) newErrors.support_phone = 'Support Phone is required';
//         // Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (formData.support_email && !emailRegex.test(formData.support_email)) {
//           newErrors.support_email = 'Invalid email format';
//         }
//         break;
        
//       case 'address':
//         if (!formData.address_line1?.trim()) newErrors.address_line1 = 'Address Line 1 is required';
//         if (!formData.city?.trim()) newErrors.city = 'City is required';
//         if (!formData.state?.trim()) newErrors.state = 'State is required';
//         if (!formData.pincode?.trim()) newErrors.pincode = 'Pincode is required';
//         break;
        
//       case 'bank-compliance':
//         if (!formData.bank_account_name?.trim()) newErrors.bank_account_name = 'Account Name is required';
//         if (!formData.bank_account_number?.trim()) newErrors.bank_account_number = 'Account Number is required';
//         if (!formData.bank_ifsc?.trim()) newErrors.bank_ifsc = 'IFSC Code is required';
//         if (!formData.bank_name?.trim()) newErrors.bank_name = 'Bank Name is required';
//         break;
        
//       case 'marketplace':
//         if (!formData.commission_percent || parseFloat(formData.commission_percent) < 0) {
//           newErrors.commission_percent = 'Valid commission percentage is required';
//         }
//         if (!formData.settlement_cycle_days || parseInt(formData.settlement_cycle_days) <= 0) {
//           newErrors.settlement_cycle_days = 'Valid settlement days is required';
//         }
//         if (!formData.min_order_value || parseFloat(formData.min_order_value) < 0) {
//           newErrors.min_order_value = 'Valid minimum order value is required';
//         }
//         break;
//     }
    
//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (!validateCurrentTab()) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill all required fields correctly',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }
    
//     const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
//     if (currentIndex < tabs.length - 1) {
//       setActiveTab(tabs[currentIndex + 1].id);
//     }
//   };

//   const handleBack = () => {
//     const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
//     if (currentIndex > 0) {
//       setActiveTab(tabs[currentIndex - 1].id);
//     }
//   };

//   const renderError = (fieldName) => {
//     return errors[fieldName] ? (
//       <div className="invalid-feedback" style={{ display: 'block' }}>
//         {errors[fieldName]}
//       </div>
//     ) : null;
//   };

//   const getInputClass = (fieldName) => {
//     return `form-control customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
//   };

//   const getSelectClass = (fieldName) => {
//     return `form-select customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
//   };

//   const getTextareaClass = (fieldName) => {
//     return `form-control customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
//   };

//   const renderField = (fieldConfig) => {
//     const { type = 'text', name, label, required = true, options, multiline, rows, disabled = false, readOnly = false, ...props } = fieldConfig;
    
//     if (isViewing) {
//       const value = formData[name];
//       const displayValue = Array.isArray(value) 
//         ? value.join(', ')
//         : (value !== null && value !== undefined && value !== '' ? value.toString() : 'N/A');
      
//       return (
//         <div className="mb-3">
//           <label className="customer-form-label view-mode-label">{label}</label>
//           <div className="view-mode-value">{displayValue}</div>
//         </div>
//       );
//     }

//     if (type === 'select') {
//       return (
//         <div className="mb-3">
//           <label className="customer-form-label">{label}{required && '*'}</label>
//           <select 
//             className={getSelectClass(name)} 
//             name={name} 
//             value={formData[name] || ''} 
//             onChange={handleChange} 
//             required={required}
//             disabled={disabled || isViewing}
//             {...props}
//           >
//             <option value="">Select</option>
//             {options?.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           {renderError(name)}
//         </div>
//       );
//     }

//     if (type === 'textarea') {
//       return (
//         <div className="mb-3">
//           <label className="customer-form-label">{label}{required && '*'}</label>
//           <textarea 
//             name={name} 
//             value={formData[name] || ''} 
//             className={getTextareaClass(name)} 
//             onChange={handleChange} 
//             required={required}
//             rows={rows || 3}
//             disabled={disabled || isViewing}
//             {...props}
//           />
//           {renderError(name)}
//         </div>
//       );
//     }

//     return (
//       <div className="mb-3">
//         <label className="customer-form-label">{label}{required && '*'}</label>
//         <input 
//           type={type} 
//           name={name} 
//           value={formData[name] || ''} 
//           className={getInputClass(name)} 
//           onChange={handleChange} 
//           required={required}
//           disabled={disabled || isViewing}
//           readOnly={readOnly}
//           {...props}
//         />
//         {renderError(name)}
//       </div>
//     );
//   };

//   const renderActiveTab = () => {
//     if (loading) {
//       return <div className="loading-spinner text-center py-5">Loading business data...</div>;
//     }

//     switch (activeTab) {
//       case 'basic-details':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Basic Details</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-4">
//                   {renderField({
//                     name: 'business_name',
//                     label: 'Business Name',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   {renderField({
//                     name: 'legal_name',
//                     label: 'Legal Name',
//                     required: false
//                   })}
//                 </div>
//                  <div className="col-md-4">
//                   {renderField({
//                     type: 'select',
//                     name: 'business_type',
//                     label: 'Business Type',
//                     options: BUSINESS_TYPES,
//                     required: true
//                   })}
//                 </div>
//               </div>

//               {/* <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     type: 'select',
//                     name: 'business_type',
//                     label: 'Business Type',
//                     options: BUSINESS_TYPES,
//                     required: true
//                   })}
//                 </div>
//               </div> */}

//               <div className="row">
//                 <div className="col-12">
//                   {renderField({
//                     type: 'textarea',
//                     name: 'description',
//                     label: 'Description',
//                     rows: 4,
//                     required: false
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-12">
//                   <label className="customer-form-label">Business Categories</label>
//                   <div className="categories-checkbox-group">
//                     {Array.isArray(categories) && categories.map(category => (
//                       <div className="form-check form-check-inline" key={category.category_id}>
//                         <input 
//                           className="form-check-input" 
//                           type="checkbox" 
//                           id={`category-${category.category_id}`}
//                           checked={formData.categories.includes(parseInt(category.category_id))}
//                           onChange={() => handleCategoryChange(category.category_id)}
//                           disabled={isViewing}
//                         />
//                         <label className="form-check-label" htmlFor={`category-${category.category_id}`}>
//                           {category.name}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'contact-info':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Contact Information</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     type: 'email',
//                     name: 'support_email',
//                     label: 'Support Email',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'support_phone',
//                     label: 'Support Phone',
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'website',
//                     label: 'Website',
//                     type: 'url',
//                     required: false
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'address':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Address Details</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-12">
//                   {renderField({
//                     type: 'textarea',
//                     name: 'address_line1',
//                     label: 'Address Line 1',
//                     rows: 2,
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-12">
//                   {renderField({
//                     type: 'textarea',
//                     name: 'address_line2',
//                     label: 'Address Line 2',
//                     rows: 2,
//                     required: false
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-3">
//                   {renderField({
//                     name: 'city',
//                     label: 'City',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-3">
//                   {renderField({
//                     name: 'state',
//                     label: 'State',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-3">
//                   {renderField({
//                     name: 'pincode',
//                     label: 'Pincode',
//                     required: true
//                   })}
//                 </div>
//                  <div className="col-md-3">
//                   {renderField({
//                     name: 'country',
//                     label: 'Country',
//                     value: 'India',
//                     readOnly: true
//                   })}
//                 </div>
//               </div>

//               {/* <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'country',
//                     label: 'Country',
//                     value: 'India',
//                     readOnly: true
//                   })}
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         );

//       case 'bank-compliance':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Bank & Compliance Details</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_account_name',
//                     label: 'Account Holder Name',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_account_number',
//                     label: 'Account Number',
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_ifsc',
//                     label: 'IFSC Code',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_name',
//                     label: 'Bank Name',
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'gst_number',
//                     label: 'GST Number',
//                     required: false,
//                     placeholder: '36ABCDE1234F1Z2'
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'pan_number',
//                     label: 'PAN Number',
//                     required: false,
//                     placeholder: 'ABCDE1234F'
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'marketplace':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Marketplace Settings</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-4">
//                   {renderField({
//                     type: 'number',
//                     name: 'commission_percent',
//                     label: 'Commission Percentage',
//                     step: '0.01',
//                     min: 0,
//                     max: 100,
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   {renderField({
//                     type: 'number',
//                     name: 'settlement_cycle_days',
//                     label: 'Settlement Cycle (Days)',
//                     min: 1,
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   {renderField({
//                     type: 'number',
//                     name: 'min_order_value',
//                     label: 'Minimum Order Value',
//                     step: '0.01',
//                     min: 0,
//                     required: true
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'working-hours':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Working Hours</h3>
//             <div className="form-section-content">
//               <div className="table-responsive">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>Day</th>
//                       <th>Opens At</th>
//                       <th>Closes At</th>
//                       <th>Closed</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {formData.working_hours.map((hour, index) => (
//                       <tr key={hour.day}>
//                         <td>{DAYS.find(d => d.value === hour.day)?.label || hour.day}</td>
//                         <td>
//                           {isViewing ? (
//                             <div className="view-mode-value">{hour.opens_at || 'N/A'}</div>
//                           ) : (
//                             <input
//                               type="time"
//                               className="form-control"
//                               value={hour.opens_at || ''}
//                               onChange={(e) => handleWorkingHourChange(index, 'opens_at', e.target.value)}
//                               disabled={hour.is_closed || isViewing}
//                             />
//                           )}
//                         </td>
//                         <td>
//                           {isViewing ? (
//                             <div className="view-mode-value">{hour.closes_at || 'N/A'}</div>
//                           ) : (
//                             <input
//                               type="time"
//                               className="form-control"
//                               value={hour.closes_at || ''}
//                               onChange={(e) => handleWorkingHourChange(index, 'closes_at', e.target.value)}
//                               disabled={hour.is_closed || isViewing}
//                             />
//                           )}
//                         </td>
//                         <td className="text-center">
//                           {isViewing ? (
//                             <div className="view-mode-value">{hour.is_closed ? 'Yes' : 'No'}</div>
//                           ) : (
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 checked={hour.is_closed || false}
//                                 onChange={(e) => handleWorkingHourChange(index, 'is_closed', e.target.checked.toString())}
//                               />
//                               <label className="form-check-label ms-1">Closed</label>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="alert alert-info mt-3">
//                 <small>
//                   <i className="bi bi-info-circle me-1"></i>
//                   When "Closed" is checked, time fields will be disabled and set to null in the API.
//                 </small>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();

//     if (isViewing) {
//       navigate('/agent-add-business-form');
//       return;
//     }

//     // Validate all tabs
//     let isValid = true;
//     for (const tab of tabs) {
//       setActiveTab(tab.id);
//       if (!validateCurrentTab()) {
//         isValid = false;
//       }
//     }

//     if (!isValid) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Incomplete Form',
//         text: 'Please complete all required fields in all steps',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Prepare payload matching your API structure
//       const payload = {
//         business_name: formData.business_name,
//         legal_name: formData.legal_name || '',
//         business_type: formData.business_type,
//         description: formData.description || '',
//         categories: formData.categories,
//         user: formData.user,
//         support_email: formData.support_email,
//         support_phone: formData.support_phone,
//         website: formData.website || '',
//         address_line1: formData.address_line1,
//         address_line2: formData.address_line2 || '',
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pincode: formData.pincode,
//         gst_number: formData.gst_number || '',
//         pan_number: formData.pan_number || '',
//         bank_account_name: formData.bank_account_name,
//         bank_account_number: formData.bank_account_number,
//         bank_ifsc: formData.bank_ifsc,
//         bank_name: formData.bank_name,
//         commission_percent: parseFloat(formData.commission_percent) || 5.0,
//         settlement_cycle_days: parseInt(formData.settlement_cycle_days) || 3,
//         min_order_value: parseFloat(formData.min_order_value) || 50.00,
//         working_hours: formData.working_hours.map(hour => {
//           if (hour.is_closed) {
//             return {
//               day: hour.day,
//               is_closed: true
//             };
//           }
//           return {
//             day: hour.day,
//             opens_at: hour.opens_at || '11:00',
//             closes_at: hour.closes_at || '18:00',
//             is_closed: false
//           };
//         })
//       };

//       // Set headers
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       const endpoint = isEditing ? `${baseurl}/business/${id}/` : `${baseurl}/business/`;
//       const method = isEditing ? 'put' : 'post';

//       const response = await axios[method](endpoint, payload, { headers });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: isEditing ? 'Business Updated Successfully!' : 'Business Added Successfully!',
//         confirmButtonColor: '#3085d6',
//       });
//       navigate("/agent-add-business-form");

//     } catch (error) {
//       console.error('Detailed submission error:', error);
      
//       let errorMessage = isEditing ? 'Error updating business' : 'Error adding business';
//       if (error.response?.data) {
//         // Handle Django validation errors
//         const errors = error.response.data;
//         if (typeof errors === 'object') {
//           errorMessage = Object.entries(errors)
//             .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
//             .join('\n');
//         } else {
//           errorMessage += `: ${JSON.stringify(errors)}`;
//         }
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: errorMessage,
//         confirmButtonColor: '#d33',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getTitle = () => {
//     switch (mode) {
//       case 'add': return "Add Business";
//       case 'edit': return "Edit Business";
//       case 'view': return "View Business";
//       default: return "Business";
//     }
//   };

//   return (

//            <>
//                <AgentNavbar/>
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-12">
//           <div className="business-form-container">
//             <div className="form-header">
//               <h2 className="form-title">{getTitle()}</h2>
//               <div className="form-actions">
//                 {!isViewing && (
//                   <>
//                     <button 
//                       type="button" 
//                       className="btn btn-secondary me-2"
//                       onClick={() => navigate('/agent-add-business-form')}
//                       disabled={isSubmitting}
//                     >
//                       Cancel
//                     </button>
//                     <button 
//                       type="button" 
//                       className="btn btn-primary"
//                       onClick={handleSubmit}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Saving...' : (isEditing ? 'Update Business' : 'Add Business')}
//                     </button>
//                   </>
//                 )}
//                 {isViewing && (
//                   <button 
//                     type="button" 
//                     className="btn btn-secondary"
//                     onClick={() => navigate('/agent-add-business-form')}
//                   >
//                     Back to List
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="form-tabs-container">
//               <ul className="nav nav-tabs form-tabs">
//                 {tabs.map((tab) => (
//                   <li className="nav-item" key={tab.id}>
//                     <button
//                       className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
//                       onClick={() => handleTabClick(tab.id)}
//                       type="button"
//                     >
//                       {tab.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="form-body">
//               <form onSubmit={handleSubmit}>
//                 {renderActiveTab()}
                
//                 {!isViewing && (
//                   <div className="form-navigation">
//                     <div className="row">
//                       <div className="col-md-6">
//                         {activeTab !== 'basic-details' && (
//                           <button 
//                             type="button" 
//                             className="btn btn-secondary"
//                             onClick={handleBack}
//                             disabled={isSubmitting}
//                           >
//                             <i className="bi bi-arrow-left me-1"></i> Back
//                           </button>
//                         )}
//                       </div>
//                       <div className="col-md-6 text-end">
//                         {activeTab !== 'working-hours' ? (
//                           <button 
//                             type="button" 
//                             className="btn btn-primary"
//                             onClick={handleNext}
//                             disabled={isSubmitting}
//                           >
//                             Next <i className="bi bi-arrow-right ms-1"></i>
//                           </button>
//                         ) : (
//                           <button 
//                             type="button" 
//                             className="btn btn-success"
//                             onClick={handleSubmit}
//                             disabled={isSubmitting}
//                           >
//                             {isSubmitting ? (
//                               <>
//                                 <span className="spinner-border spinner-border-sm me-1"></span>
//                                 Saving...
//                               </>
//                             ) : (
//                               <>
//                                 {isEditing ? 'Update Business' : 'Add Business'}
//                                 <i className="bi bi-check-circle ms-1"></i>
//                               </>
//                             )}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     </>
//   );
// };

// export default AddBusinessForm;




// import React, { useState, useEffect } from 'react';
// import "./AddBusiness.css";
// import axios from 'axios';
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import { baseurl } from '../../BaseURL/BaseURL';
// import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

// const AddBusinessForm = ({ user, mode = 'add' }) => {  
//   const { id } = useParams();
//   const [activeTab, setActiveTab] = useState('basic-details');
//   const [isEditing, setIsEditing] = useState(mode === 'edit');
//   const [isViewing, setIsViewing] = useState(mode === 'view');
//   const [loading, setLoading] = useState(mode !== 'add');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
  
//   const userId = localStorage.getItem('user_id');
//   const token = localStorage.getItem('token');

//   // Define tabs
//   const tabs = [
//     { id: 'basic-details', label: 'Basic Details' },
//     { id: 'contact-info', label: 'Contact Info' },
//     { id: 'address', label: 'Address' },
//     { id: 'bank-compliance', label: 'Bank & Compliance' },
//     { id: 'marketplace', label: 'Marketplace' },
//     { id: 'working-hours', label: 'Working Hours' }
//   ];

//   // Working hours days
//   const DAYS = [
//     { value: 'monday', label: 'Monday' },
//     { value: 'tuesday', label: 'Tuesday' },
//     { value: 'wednesday', label: 'Wednesday' },
//     { value: 'thursday', label: 'Thursday' },
//     { value: 'friday', label: 'Friday' },
//     { value: 'saturday', label: 'Saturday' },
//     { value: 'sunday', label: 'Sunday' }
//   ];

//   // Business types
//   const BUSINESS_TYPES = [
//     { value: 'individual', label: 'Individual' },
//     { value: 'proprietor', label: 'Proprietor' },
//     { value: 'partnership', label: 'Partnership' },
//     { value: 'private_limited', label: 'Private Limited' },
//     { value: 'llp', label: 'LLP' }
//   ];

//   // Error States
//   const [errors, setErrors] = useState({});

//   // Form State - Updated to match payload
//   const [formData, setFormData] = useState({
//     // Basic Details
//     business_name: '',
//     legal_name: '',
//     business_type: '',
//     description: '',
    
//     // Contact Info
//     categories: [],
//     support_email: '',
//     support_phone: '',
//     website: '',
    
//     // Address
//     address_line1: '',
//     address_line2: '',
//     city: '',
//     state: '',
//     country: 'India',
//     pincode: '',
    
//     // Bank & Compliance
//     bank_account_name: '',
//     bank_account_number: '',
//     bank_ifsc: '',
//     bank_name: '',
//     gst_number: '',
//     pan_number: '',
    
//     // Marketplace
//     commission_percent: '5.00',
//     settlement_cycle_days: 3,
//     min_order_value: '50.00',
    
//     // Working Hours - Initialize with default values
//     working_hours: DAYS.map(day => ({
//       day: day.value,
//       opens_at: day.value === 'sunday' ? null : '11:00',
//       closes_at: day.value === 'sunday' ? null : '18:00',
//       is_closed: day.value === 'sunday'
//     })),
    
//     // System fields
//     user: parseInt(userId) || 1
//   });

//   // Categories state
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const categoriesRes = await axios.get(`${baseurl}/categories/`, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         const businessCategories = Array.isArray(categoriesRes.data) 
//           ? categoriesRes.data.filter(cat => cat.level === 'business')
//           : categoriesRes.data.results?.filter(cat => cat.level === 'business') || [];
        
//         setCategories(businessCategories);

//         // If editing/viewing, fetch business data
//         if (id && mode !== 'add') {
//           const response = await axios.get(`${baseurl}/business/${id}/`, {
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });
          
//           const businessData = response.data;
          
//           // Format the data for the form
//           const formattedData = {
//             business_name: businessData.business_name || '',
//             legal_name: businessData.legal_name || '',
//             business_type: businessData.business_type || '',
//             description: businessData.description || '',
//             categories: businessData.categories || [],
//             support_email: businessData.support_email || '',
//             support_phone: businessData.support_phone || '',
//             website: businessData.website || '',
//             address_line1: businessData.address_line1 || '',
//             address_line2: businessData.address_line2 || '',
//             city: businessData.city || '',
//             state: businessData.state || '',
//             country: businessData.country || 'India',
//             pincode: businessData.pincode || '',
//             gst_number: businessData.gst_number || '',
//             pan_number: businessData.pan_number || '',
//             bank_account_name: businessData.bank_account_name || '',
//             bank_account_number: businessData.bank_account_number || '',
//             bank_ifsc: businessData.bank_ifsc || '',
//             bank_name: businessData.bank_name || '',
//             commission_percent: businessData.commission_percent || '5.00',
//             settlement_cycle_days: businessData.settlement_cycle_days || 3,
//             min_order_value: businessData.min_order_value || '50.00',
//             user: parseInt(userId) || 1,
//             // Format working hours
//             working_hours: businessData.working_hours?.length 
//               ? DAYS.map(day => {
//                   const existingHour = businessData.working_hours.find(wh => wh.day === day.value);
//                   if (existingHour) {
//                     return {
//                       day: day.value,
//                       opens_at: existingHour.opens_at || null,
//                       closes_at: existingHour.closes_at || null,
//                       is_closed: existingHour.is_closed || false
//                     };
//                   }
//                   return {
//                     day: day.value,
//                     opens_at: day.value === 'sunday' ? null : '11:00',
//                     closes_at: day.value === 'sunday' ? null : '18:00',
//                     is_closed: day.value === 'sunday'
//                   };
//                 })
//               : DAYS.map(day => ({
//                   day: day.value,
//                   opens_at: day.value === 'sunday' ? null : '11:00',
//                   closes_at: day.value === 'sunday' ? null : '18:00',
//                   is_closed: day.value === 'sunday'
//                 }))
//           };
          
//           setFormData(formattedData);
//           setIsEditing(mode === 'edit');
//           setIsViewing(mode === 'view');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load data',
//           confirmButtonColor: '#d33',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [id, mode, token, userId]);

//   const handleChange = (e) => {
//     if (isViewing) return;
    
//     const { name, value, type, checked } = e.target;
    
//     if (type === 'checkbox') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: checked
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }

//     // Clear error for this field
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleCategoryChange = (categoryId) => {
//     if (isViewing) return;
    
//     setFormData(prev => {
//       const numericId = parseInt(categoryId);
//       const newCategories = prev.categories.includes(numericId)
//         ? prev.categories.filter(id => id !== numericId)
//         : [...prev.categories, numericId];
//       return { ...prev, categories: newCategories };
//     });
//   };

//   const handleWorkingHourChange = (index, field, value) => {
//     if (isViewing) return;
    
//     setFormData(prev => {
//       const updatedHours = [...prev.working_hours];
      
//       if (field === 'is_closed') {
//         const isClosed = value === 'true';
//         updatedHours[index] = {
//           ...updatedHours[index],
//           is_closed: isClosed,
//           opens_at: isClosed ? null : updatedHours[index].opens_at || '11:00',
//           closes_at: isClosed ? null : updatedHours[index].closes_at || '18:00'
//         };
//       } else {
//         updatedHours[index] = {
//           ...updatedHours[index],
//           [field]: value
//         };
//       }
      
//       return { ...prev, working_hours: updatedHours };
//     });
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const validateCurrentTab = () => {
//     if (isViewing) return true;
    
//     const newErrors = {};
    
//     switch (activeTab) {
//       case 'basic-details':
//         if (!formData.business_name?.trim()) newErrors.business_name = 'Business Name is required';
//         if (!formData.business_type) newErrors.business_type = 'Business Type is required';
//         break;
        
//       case 'contact-info':
//         if (!formData.support_email?.trim()) newErrors.support_email = 'Support Email is required';
//         if (!formData.support_phone?.trim()) newErrors.support_phone = 'Support Phone is required';
//         // Validate email format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (formData.support_email && !emailRegex.test(formData.support_email)) {
//           newErrors.support_email = 'Invalid email format';
//         }
//         break;
        
//       case 'address':
//         if (!formData.address_line1?.trim()) newErrors.address_line1 = 'Address Line 1 is required';
//         if (!formData.city?.trim()) newErrors.city = 'City is required';
//         if (!formData.state?.trim()) newErrors.state = 'State is required';
//         if (!formData.pincode?.trim()) newErrors.pincode = 'Pincode is required';
//         break;
        
//       case 'bank-compliance':
//         if (!formData.bank_account_name?.trim()) newErrors.bank_account_name = 'Account Name is required';
//         if (!formData.bank_account_number?.trim()) newErrors.bank_account_number = 'Account Number is required';
//         if (!formData.bank_ifsc?.trim()) newErrors.bank_ifsc = 'IFSC Code is required';
//         if (!formData.bank_name?.trim()) newErrors.bank_name = 'Bank Name is required';
//         break;
        
//       case 'marketplace':
//         if (!formData.commission_percent || parseFloat(formData.commission_percent) < 0) {
//           newErrors.commission_percent = 'Valid commission percentage is required';
//         }
//         if (!formData.settlement_cycle_days || parseInt(formData.settlement_cycle_days) <= 0) {
//           newErrors.settlement_cycle_days = 'Valid settlement days is required';
//         }
//         if (!formData.min_order_value || parseFloat(formData.min_order_value) < 0) {
//           newErrors.min_order_value = 'Valid minimum order value is required';
//         }
//         break;
//     }
    
//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (!validateCurrentTab()) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Validation Error',
//         text: 'Please fill all required fields correctly',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }
    
//     const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
//     if (currentIndex < tabs.length - 1) {
//       setActiveTab(tabs[currentIndex + 1].id);
//     }
//   };

//   const handleBack = () => {
//     const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
//     if (currentIndex > 0) {
//       setActiveTab(tabs[currentIndex - 1].id);
//     }
//   };

//   const renderError = (fieldName) => {
//     return errors[fieldName] ? (
//       <div className="invalid-feedback" style={{ display: 'block' }}>
//         {errors[fieldName]}
//       </div>
//     ) : null;
//   };

//   const getInputClass = (fieldName) => {
//     return `form-control customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
//   };

//   const getSelectClass = (fieldName) => {
//     return `form-select customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
//   };

//   const getTextareaClass = (fieldName) => {
//     return `form-control customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
//   };

//   const renderField = (fieldConfig) => {
//     const { type = 'text', name, label, required = true, options, multiline, rows, disabled = false, readOnly = false, ...props } = fieldConfig;
    
//     if (isViewing) {
//       const value = formData[name];
//       const displayValue = Array.isArray(value) 
//         ? value.join(', ')
//         : (value !== null && value !== undefined && value !== '' ? value.toString() : 'N/A');
      
//       return (
//         <div className="mb-3">
//           <label className="customer-form-label view-mode-label">{label}</label>
//           <div className="view-mode-value">{displayValue}</div>
//         </div>
//       );
//     }

//     if (type === 'select') {
//       return (
//         <div className="mb-3">
//           <label className="customer-form-label">{label}{required && '*'}</label>
//           <select 
//             className={getSelectClass(name)} 
//             name={name} 
//             value={formData[name] || ''} 
//             onChange={handleChange} 
//             required={required}
//             disabled={disabled || isViewing}
//             {...props}
//           >
//             <option value="">Select</option>
//             {options?.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           {renderError(name)}
//         </div>
//       );
//     }

//     if (type === 'textarea') {
//       return (
//         <div className="mb-3">
//           <label className="customer-form-label">{label}{required && '*'}</label>
//           <textarea 
//             name={name} 
//             value={formData[name] || ''} 
//             className={getTextareaClass(name)} 
//             onChange={handleChange} 
//             required={required}
//             rows={rows || 3}
//             disabled={disabled || isViewing}
//             {...props}
//           />
//           {renderError(name)}
//         </div>
//       );
//     }

//     return (
//       <div className="mb-3">
//         <label className="customer-form-label">{label}{required && '*'}</label>
//         <input 
//           type={type} 
//           name={name} 
//           value={formData[name] || ''} 
//           className={getInputClass(name)} 
//           onChange={handleChange} 
//           required={required}
//           disabled={disabled || isViewing}
//           readOnly={readOnly}
//           {...props}
//         />
//         {renderError(name)}
//       </div>
//     );
//   };

//   const renderActiveTab = () => {
//     if (loading) {
//       return <div className="loading-spinner text-center py-5">Loading business data...</div>;
//     }

//     switch (activeTab) {
//       case 'basic-details':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Basic Details</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-4">
//                   {renderField({
//                     name: 'business_name',
//                     label: 'Business Name',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   {renderField({
//                     name: 'legal_name',
//                     label: 'Legal Name',
//                     required: false
//                   })}
//                 </div>
//                  <div className="col-md-4">
//                   {renderField({
//                     type: 'select',
//                     name: 'business_type',
//                     label: 'Business Type',
//                     options: BUSINESS_TYPES,
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-12">
//                   {renderField({
//                     type: 'textarea',
//                     name: 'description',
//                     label: 'Description',
//                     rows: 4,
//                     required: false
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-12">
//                   <label className="customer-form-label">Business Categories</label>
//                   <div className="categories-checkbox-group">
//                     {Array.isArray(categories) && categories.map(category => (
//                       <div className="form-check form-check-inline" key={category.category_id}>
//                         <input 
//                           className="form-check-input" 
//                           type="checkbox" 
//                           id={`category-${category.category_id}`}
//                           checked={formData.categories.includes(parseInt(category.category_id))}
//                           onChange={() => handleCategoryChange(category.category_id)}
//                           disabled={isViewing}
//                         />
//                         <label className="form-check-label" htmlFor={`category-${category.category_id}`}>
//                           {category.name}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'contact-info':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Contact Information</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     type: 'email',
//                     name: 'support_email',
//                     label: 'Support Email',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'support_phone',
//                     label: 'Support Phone',
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'website',
//                     label: 'Website',
//                     type: 'url',
//                     required: false
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'address':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Address Details</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-12">
//                   {renderField({
//                     type: 'textarea',
//                     name: 'address_line1',
//                     label: 'Address Line 1',
//                     rows: 2,
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-12">
//                   {renderField({
//                     type: 'textarea',
//                     name: 'address_line2',
//                     label: 'Address Line 2',
//                     rows: 2,
//                     required: false
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-3">
//                   {renderField({
//                     name: 'city',
//                     label: 'City',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-3">
//                   {renderField({
//                     name: 'state',
//                     label: 'State',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-3">
//                   {renderField({
//                     name: 'pincode',
//                     label: 'Pincode',
//                     required: true
//                   })}
//                 </div>
//                  <div className="col-md-3">
//                   {renderField({
//                     name: 'country',
//                     label: 'Country',
//                     value: 'India',
//                     readOnly: true
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'bank-compliance':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Bank & Compliance Details</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_account_name',
//                     label: 'Account Holder Name',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_account_number',
//                     label: 'Account Number',
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_ifsc',
//                     label: 'IFSC Code',
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'bank_name',
//                     label: 'Bank Name',
//                     required: true
//                   })}
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'gst_number',
//                     label: 'GST Number',
//                     required: false,
//                     placeholder: '36ABCDE1234F1Z2'
//                   })}
//                 </div>
//                 <div className="col-md-6">
//                   {renderField({
//                     name: 'pan_number',
//                     label: 'PAN Number',
//                     required: false,
//                     placeholder: 'ABCDE1234F'
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'marketplace':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Marketplace Settings</h3>
//             <div className="form-section-content">
//               <div className="row">
//                 <div className="col-md-4">
//                   {renderField({
//                     type: 'number',
//                     name: 'commission_percent',
//                     label: 'Commission Percentage',
//                     step: '0.01',
//                     min: 0,
//                     max: 100,
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   {renderField({
//                     type: 'number',
//                     name: 'settlement_cycle_days',
//                     label: 'Settlement Cycle (Days)',
//                     min: 1,
//                     required: true
//                   })}
//                 </div>
//                 <div className="col-md-4">
//                   {renderField({
//                     type: 'number',
//                     name: 'min_order_value',
//                     label: 'Minimum Order Value',
//                     step: '0.01',
//                     min: 0,
//                     required: true
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );

//       case 'working-hours':
//         return (
//           <div className="form-section">
//             <h3 className="form-section-title">Working Hours</h3>
//             <div className="form-section-content">
//               <div className="table-responsive">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th>Day</th>
//                       <th>Opens At</th>
//                       <th>Closes At</th>
//                       <th>Closed</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {formData.working_hours.map((hour, index) => (
//                       <tr key={hour.day}>
//                         <td>{DAYS.find(d => d.value === hour.day)?.label || hour.day}</td>
//                         <td>
//                           {isViewing ? (
//                             <div className="view-mode-value">{hour.opens_at || 'N/A'}</div>
//                           ) : (
//                             <input
//                               type="time"
//                               className="form-control"
//                               value={hour.opens_at || ''}
//                               onChange={(e) => handleWorkingHourChange(index, 'opens_at', e.target.value)}
//                               disabled={hour.is_closed || isViewing}
//                             />
//                           )}
//                         </td>
//                         <td>
//                           {isViewing ? (
//                             <div className="view-mode-value">{hour.closes_at || 'N/A'}</div>
//                           ) : (
//                             <input
//                               type="time"
//                               className="form-control"
//                               value={hour.closes_at || ''}
//                               onChange={(e) => handleWorkingHourChange(index, 'closes_at', e.target.value)}
//                               disabled={hour.is_closed || isViewing}
//                             />
//                           )}
//                         </td>
//                         <td className="text-center">
//                           {isViewing ? (
//                             <div className="view-mode-value">{hour.is_closed ? 'Yes' : 'No'}</div>
//                           ) : (
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 checked={hour.is_closed || false}
//                                 onChange={(e) => handleWorkingHourChange(index, 'is_closed', e.target.checked.toString())}
//                               />
//                               <label className="form-check-label ms-1">Closed</label>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="alert alert-info mt-3">
//                 <small>
//                   <i className="bi bi-info-circle me-1"></i>
//                   When "Closed" is checked, time fields will be disabled and set to null in the API.
//                 </small>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();

//     if (isViewing) {
//       navigate('/agent-my-business'); // Changed to business list page
//       return;
//     }

//     // Validate all tabs
//     let isValid = true;
//     for (const tab of tabs) {
//       setActiveTab(tab.id);
//       if (!validateCurrentTab()) {
//         isValid = false;
//       }
//     }

//     if (!isValid) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Incomplete Form',
//         text: 'Please complete all required fields in all steps',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Prepare payload matching your API structure
//       const payload = {
//         business_name: formData.business_name,
//         legal_name: formData.legal_name || '',
//         business_type: formData.business_type,
//         description: formData.description || '',
//         categories: formData.categories,
//         user: formData.user,
//         support_email: formData.support_email,
//         support_phone: formData.support_phone,
//         website: formData.website || '',
//         address_line1: formData.address_line1,
//         address_line2: formData.address_line2 || '',
//         city: formData.city,
//         state: formData.state,
//         country: formData.country,
//         pincode: formData.pincode,
//         gst_number: formData.gst_number || '',
//         pan_number: formData.pan_number || '',
//         bank_account_name: formData.bank_account_name,
//         bank_account_number: formData.bank_account_number,
//         bank_ifsc: formData.bank_ifsc,
//         bank_name: formData.bank_name,
//         commission_percent: parseFloat(formData.commission_percent) || 5.0,
//         settlement_cycle_days: parseInt(formData.settlement_cycle_days) || 3,
//         min_order_value: parseFloat(formData.min_order_value) || 50.00,
//         working_hours: formData.working_hours.map(hour => {
//           if (hour.is_closed) {
//             return {
//               day: hour.day,
//               is_closed: true
//             };
//           }
//           return {
//             day: hour.day,
//             opens_at: hour.opens_at || '11:00',
//             closes_at: hour.closes_at || '18:00',
//             is_closed: false
//           };
//         })
//       };

//       // Set headers
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       };

//       const endpoint = isEditing ? `${baseurl}/business/${id}/` : `${baseurl}/business/`;
//       const method = isEditing ? 'put' : 'post';

//       const response = await axios[method](endpoint, payload, { headers });

//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: isEditing ? 'Business Updated Successfully!' : 'Business Added Successfully!',
//         confirmButtonColor: '#3085d6',
//       });
//       // Navigate to Business List page after success
//       navigate("/agent-my-business");

//     } catch (error) {
//       console.error('Detailed submission error:', error);
      
//       let errorMessage = isEditing ? 'Error updating business' : 'Error adding business';
//       if (error.response?.data) {
//         // Handle Django validation errors
//         const errors = error.response.data;
//         if (typeof errors === 'object') {
//           errorMessage = Object.entries(errors)
//             .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
//             .join('\n');
//         } else {
//           errorMessage += `: ${JSON.stringify(errors)}`;
//         }
//       }
      
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: errorMessage,
//         confirmButtonColor: '#d33',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getTitle = () => {
//     switch (mode) {
//       case 'add': return "Add Business";
//       case 'edit': return "Edit Business";
//       case 'view': return "View Business";
//       default: return "Business";
//     }
//   };

//   return (
//     <>
//       <AgentNavbar/>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-12">
//             <div className="business-form-container">
//               <div className="form-header">
//                 <h2 className="form-title">{getTitle()}</h2>
//                 <div className="form-actions">
//                   {!isViewing && (
//                     <>
//                       <button 
//                         type="button" 
//                         className="btn btn-secondary me-2"
//                         onClick={() => navigate('/agent-my-business')} // Changed to business list
//                         disabled={isSubmitting}
//                       >
//                         Cancel
//                       </button>
//                       <button 
//                         type="button" 
//                         className="btn btn-primary"
//                         onClick={handleSubmit}
//                         disabled={isSubmitting}
//                       >
//                         {isSubmitting ? 'Saving...' : (isEditing ? 'Update Business' : 'Add Business')}
//                       </button>
//                     </>
//                   )}
//                   {isViewing && (
//                     <button 
//                       type="button" 
//                       className="btn btn-secondary"
//                       onClick={() => navigate('/agent-my-business')} // Changed to business list
//                     >
//                       Back to List
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="form-tabs-container">
//                 <ul className="nav nav-tabs form-tabs">
//                   {tabs.map((tab) => (
//                     <li className="nav-item" key={tab.id}>
//                       <button
//                         className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
//                         onClick={() => handleTabClick(tab.id)}
//                         type="button"
//                       >
//                         {tab.label}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="form-body">
//                 <form onSubmit={handleSubmit}>
//                   {renderActiveTab()}
                  
//                   {!isViewing && (
//                     <div className="form-navigation">
//                       <div className="row">
//                         <div className="col-md-6">
//                           {activeTab !== 'basic-details' && (
//                             <button 
//                               type="button" 
//                               className="btn btn-secondary"
//                               onClick={handleBack}
//                               disabled={isSubmitting}
//                             >
//                               <i className="bi bi-arrow-left me-1"></i> Back
//                             </button>
//                           )}
//                         </div>
//                         <div className="col-md-6 text-end">
//                           {activeTab !== 'working-hours' ? (
//                             <button 
//                               type="button" 
//                               className="btn btn-primary"
//                               onClick={handleNext}
//                               disabled={isSubmitting}
//                             >
//                               Next <i className="bi bi-arrow-right ms-1"></i>
//                             </button>
//                           ) : (
//                             <button 
//                               type="button" 
//                               className="btn btn-success"
//                               onClick={handleSubmit}
//                               disabled={isSubmitting}
//                             >
//                               {isSubmitting ? (
//                                 <>
//                                   <span className="spinner-border spinner-border-sm me-1"></span>
//                                   Saving...
//                                 </>
//                               ) : (
//                                 <>
//                                   {isEditing ? 'Update Business' : 'Add Business'}
//                                   <i className="bi bi-check-circle ms-1"></i>
//                                 </>
//                               )}
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddBusinessForm;



import React, { useState, useEffect } from 'react';
import "./AddBusiness.css";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";

const AddBusinessForm = ({ user, mode = 'add' }) => {  
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('basic-details');
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [isViewing, setIsViewing] = useState(mode === 'view');
  const [loading, setLoading] = useState(mode !== 'add');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  // Define tabs
  const tabs = [
    { id: 'basic-details', label: 'Basic Details' },
    { id: 'contact-info', label: 'Contact Info' },
    { id: 'address', label: 'Address' },
    { id: 'bank-compliance', label: 'Bank & Compliance' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'working-hours', label: 'Working Hours' }
  ];

  // Working hours days
  const DAYS = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  // Business types
  const BUSINESS_TYPES = [
    { value: 'individual', label: 'Individual' },
    { value: 'proprietor', label: 'Proprietor' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'private_limited', label: 'Private Limited' },
    { value: 'llp', label: 'LLP' }
  ];

  // Error States
  const [errors, setErrors] = useState({});

  // File States
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Form State - Updated to match payload
  const [formData, setFormData] = useState({
    // Basic Details
    business_name: '',
    legal_name: '',
    business_type: '',
    description: '',
    logo: '',
    banner: '',
    
    // Contact Info
    categories: [],
    support_email: '',
    support_phone: '',
    website: '',
    
    // Address
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    
    // Bank & Compliance
    bank_account_name: '',
    bank_account_number: '',
    bank_ifsc: '',
    bank_name: '',
    gst_number: '',
    pan_number: '',
    
    // Marketplace
    commission_percent: '5.00',
    settlement_cycle_days: 3,
    min_order_value: '50.00',
    
    // Working Hours - Initialize with default values
    working_hours: DAYS.map(day => ({
      day: day.value,
      opens_at: day.value === 'sunday' ? null : '11:00',
      closes_at: day.value === 'sunday' ? null : '18:00',
      is_closed: day.value === 'sunday'
    })),
    
    // System fields
    user: parseInt(userId) || 1
  });

  // Categories state
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await axios.get(`${baseurl}/categories/`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const businessCategories = Array.isArray(categoriesRes.data) 
          ? categoriesRes.data.filter(cat => cat.level === 'business')
          : categoriesRes.data.results?.filter(cat => cat.level === 'business') || [];
        
        setCategories(businessCategories);

        // If editing/viewing, fetch business data
        if (id && mode !== 'add') {
          const response = await axios.get(`${baseurl}/business/${id}/`, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          const businessData = response.data;
          
          // Format the data for the form
          const formattedData = {
            business_name: businessData.business_name || '',
            legal_name: businessData.legal_name || '',
            business_type: businessData.business_type || '',
            description: businessData.description || '',
            logo: businessData.logo || '',
            banner: businessData.banner || '',
            categories: businessData.categories || [],
            support_email: businessData.support_email || '',
            support_phone: businessData.support_phone || '',
            website: businessData.website || '',
            address_line1: businessData.address_line1 || '',
            address_line2: businessData.address_line2 || '',
            city: businessData.city || '',
            state: businessData.state || '',
            country: businessData.country || 'India',
            pincode: businessData.pincode || '',
            gst_number: businessData.gst_number || '',
            pan_number: businessData.pan_number || '',
            bank_account_name: businessData.bank_account_name || '',
            bank_account_number: businessData.bank_account_number || '',
            bank_ifsc: businessData.bank_ifsc || '',
            bank_name: businessData.bank_name || '',
            commission_percent: businessData.commission_percent || '5.00',
            settlement_cycle_days: businessData.settlement_cycle_days || 3,
            min_order_value: businessData.min_order_value || '50.00',
            user: parseInt(userId) || 1,
            // Format working hours
            working_hours: businessData.working_hours?.length 
              ? DAYS.map(day => {
                  const existingHour = businessData.working_hours.find(wh => wh.day === day.value);
                  if (existingHour) {
                    return {
                      day: day.value,
                      opens_at: existingHour.opens_at || null,
                      closes_at: existingHour.closes_at || null,
                      is_closed: existingHour.is_closed || false
                    };
                  }
                  return {
                    day: day.value,
                    opens_at: day.value === 'sunday' ? null : '11:00',
                    closes_at: day.value === 'sunday' ? null : '18:00',
                    is_closed: day.value === 'sunday'
                  };
                })
              : DAYS.map(day => ({
                  day: day.value,
                  opens_at: day.value === 'sunday' ? null : '11:00',
                  closes_at: day.value === 'sunday' ? null : '18:00',
                  is_closed: day.value === 'sunday'
                }))
          };
          
          setFormData(formattedData);
          
          // Set preview URLs for existing images
          if (businessData.logo) {
            setLogoPreview(`${baseurl}${businessData.logo}`);
          }
          if (businessData.banner) {
            setBannerPreview(`${baseurl}${businessData.banner}`);
          }
          
          setIsEditing(mode === 'edit');
          setIsViewing(mode === 'view');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load data',
          confirmButtonColor: '#d33',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, mode, token, userId]);

  const handleChange = (e) => {
    if (isViewing) return;
    
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLogoChange = (e) => {
    if (isViewing) return;
    
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'Logo size should be less than 2MB'
        }));
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          logo: 'Only JPG, PNG, and GIF files are allowed'
        }));
        return;
      }
      
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.logo) {
        setErrors(prev => ({
          ...prev,
          logo: ''
        }));
      }
    }
  };

  const handleBannerChange = (e) => {
    if (isViewing) return;
    
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          banner: 'Banner size should be less than 5MB'
        }));
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          banner: 'Only JPG, PNG, and GIF files are allowed'
        }));
        return;
      }
      
      setBannerFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.banner) {
        setErrors(prev => ({
          ...prev,
          banner: ''
        }));
      }
    }
  };

  const handleCategoryChange = (categoryId) => {
    if (isViewing) return;
    
    setFormData(prev => {
      const numericId = parseInt(categoryId);
      const newCategories = prev.categories.includes(numericId)
        ? prev.categories.filter(id => id !== numericId)
        : [...prev.categories, numericId];
      return { ...prev, categories: newCategories };
    });
  };

  const handleWorkingHourChange = (index, field, value) => {
    if (isViewing) return;
    
    setFormData(prev => {
      const updatedHours = [...prev.working_hours];
      
      if (field === 'is_closed') {
        const isClosed = value === 'true';
        updatedHours[index] = {
          ...updatedHours[index],
          is_closed: isClosed,
          opens_at: isClosed ? null : updatedHours[index].opens_at || '11:00',
          closes_at: isClosed ? null : updatedHours[index].closes_at || '18:00'
        };
      } else {
        updatedHours[index] = {
          ...updatedHours[index],
          [field]: value
        };
      }
      
      return { ...prev, working_hours: updatedHours };
    });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const validateCurrentTab = () => {
    if (isViewing) return true;
    
    const newErrors = {};
    
    switch (activeTab) {
      case 'basic-details':
        if (!formData.business_name?.trim()) newErrors.business_name = 'Business Name is required';
        if (!formData.business_type) newErrors.business_type = 'Business Type is required';
        if (!isEditing && !logoFile && !formData.logo) newErrors.logo = 'Logo is required';
        break;
        
      case 'contact-info':
        if (!formData.support_email?.trim()) newErrors.support_email = 'Support Email is required';
        if (!formData.support_phone?.trim()) newErrors.support_phone = 'Support Phone is required';
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.support_email && !emailRegex.test(formData.support_email)) {
          newErrors.support_email = 'Invalid email format';
        }
        break;
        
      case 'address':
        if (!formData.address_line1?.trim()) newErrors.address_line1 = 'Address Line 1 is required';
        if (!formData.city?.trim()) newErrors.city = 'City is required';
        if (!formData.state?.trim()) newErrors.state = 'State is required';
        if (!formData.pincode?.trim()) newErrors.pincode = 'Pincode is required';
        break;
        
      case 'bank-compliance':
        if (!formData.bank_account_name?.trim()) newErrors.bank_account_name = 'Account Name is required';
        if (!formData.bank_account_number?.trim()) newErrors.bank_account_number = 'Account Number is required';
        if (!formData.bank_ifsc?.trim()) newErrors.bank_ifsc = 'IFSC Code is required';
        if (!formData.bank_name?.trim()) newErrors.bank_name = 'Bank Name is required';
        break;
        
      case 'marketplace':
        if (!formData.commission_percent || parseFloat(formData.commission_percent) < 0) {
          newErrors.commission_percent = 'Valid commission percentage is required';
        }
        if (!formData.settlement_cycle_days || parseInt(formData.settlement_cycle_days) <= 0) {
          newErrors.settlement_cycle_days = 'Valid settlement days is required';
        }
        if (!formData.min_order_value || parseFloat(formData.min_order_value) < 0) {
          newErrors.min_order_value = 'Valid minimum order value is required';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentTab()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill all required fields correctly',
        confirmButtonColor: '#d33',
      });
      return;
    }
    
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <div className="invalid-feedback" style={{ display: 'block' }}>
        {errors[fieldName]}
      </div>
    ) : null;
  };

  const getInputClass = (fieldName) => {
    return `form-control customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
  };

  const getSelectClass = (fieldName) => {
    return `form-select customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
  };

  const getTextareaClass = (fieldName) => {
    return `form-control customer-form-input ${errors[fieldName] ? 'is-invalid' : ''} ${isViewing ? 'view-mode' : ''}`;
  };

  const renderField = (fieldConfig) => {
    const { type = 'text', name, label, required = true, options, multiline, rows, disabled = false, readOnly = false, accept, ...props } = fieldConfig;
    
    if (isViewing && type !== 'file') {
      const value = formData[name];
      const displayValue = Array.isArray(value) 
        ? value.join(', ')
        : (value !== null && value !== undefined && value !== '' ? value.toString() : 'N/A');
      
      return (
        <div className="mb-3">
          <label className="customer-form-label view-mode-label">{label}</label>
          <div className="view-mode-value">{displayValue}</div>
        </div>
      );
    }

    if (type === 'select') {
      return (
        <div className="mb-3">
          <label className="customer-form-label">{label}{required && '*'}</label>
          <select 
            className={getSelectClass(name)} 
            name={name} 
            value={formData[name] || ''} 
            onChange={handleChange} 
            required={required}
            disabled={disabled || isViewing}
            {...props}
          >
            <option value="">Select</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {renderError(name)}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="mb-3">
          <label className="customer-form-label">{label}{required && '*'}</label>
          <textarea 
            name={name} 
            value={formData[name] || ''} 
            className={getTextareaClass(name)} 
            onChange={handleChange} 
            required={required}
            rows={rows || 3}
            disabled={disabled || isViewing}
            {...props}
          />
          {renderError(name)}
        </div>
      );
    }

    if (type === 'file') {
      return (
        <div className="mb-3">
          <label className="customer-form-label">{label}{required && '*'}</label>
          <input 
            type="file" 
            name={name} 
            className={`form-control ${errors[name] ? 'is-invalid' : ''}`} 
            onChange={name === 'logo' ? handleLogoChange : handleBannerChange}
            required={required && !isEditing}
            disabled={isViewing}
            accept={accept || 'image/*'}
            {...props}
          />
          {renderError(name)}
          {(logoPreview || formData.logo) && name === 'logo' && (
            <div className="mt-2">
              <p className="small text-muted">Preview:</p>
              <img 
                src={logoPreview || `${baseurl}${formData.logo}`} 
                alt="Logo preview" 
                className="img-thumbnail" 
                style={{ maxWidth: '150px', maxHeight: '150px' }}
              />
            </div>
          )}
          {(bannerPreview || formData.banner) && name === 'banner' && (
            <div className="mt-2">
              <p className="small text-muted">Preview:</p>
              <img 
                src={bannerPreview || `${baseurl}${formData.banner}`} 
                alt="Banner preview" 
                className="img-thumbnail" 
                style={{ maxWidth: '300px', maxHeight: '150px' }}
              />
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="mb-3">
        <label className="customer-form-label">{label}{required && '*'}</label>
        <input 
          type={type} 
          name={name} 
          value={formData[name] || ''} 
          className={getInputClass(name)} 
          onChange={handleChange} 
          required={required}
          disabled={disabled || isViewing}
          readOnly={readOnly}
          {...props}
        />
        {renderError(name)}
      </div>
    );
  };

  const renderActiveTab = () => {
    if (loading) {
      return <div className="loading-spinner text-center py-5">Loading business data...</div>;
    }

    switch (activeTab) {
      case 'basic-details':
        return (
          <div className="form-section">
            {/* <h3 className="form-section-title">Basic Details</h3> */}
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-4">
                  {renderField({
                    name: 'business_name',
                    label: 'Business Name',
                    required: true
                  })}
                </div>
                <div className="col-md-4">
                  {renderField({
                    name: 'legal_name',
                    label: 'Legal Name',
                    required: false
                  })}
                </div>
                 <div className="col-md-4">
                  {renderField({
                    type: 'select',
                    name: 'business_type',
                    label: 'Business Type',
                    options: BUSINESS_TYPES,
                    required: true
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'file',
                    name: 'logo',
                    label: 'Business Logo',
                    required: !isEditing,
                    accept: 'image/jpeg,image/jpg,image/png,image/gif'
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'file',
                    name: 'banner',
                    label: 'Business Banner',
                    required: false,
                    accept: 'image/jpeg,image/jpg,image/png,image/gif'
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {renderField({
                    type: 'textarea',
                    name: 'description',
                    label: 'Description',
                    rows: 4,
                    required: false
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <label className="customer-form-label">Business Categories</label>
                  <div className="categories-checkbox-group">
                    {Array.isArray(categories) && categories.map(category => (
                      <div className="form-check form-check-inline" key={category.category_id}>
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id={`category-${category.category_id}`}
                          checked={formData.categories.includes(parseInt(category.category_id))}
                          onChange={() => handleCategoryChange(category.category_id)}
                          disabled={isViewing}
                        />
                        <label className="form-check-label" htmlFor={`category-${category.category_id}`}>
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact-info':
        return (
          <div className="form-section">
            {/* <h3 className="form-section-title">Contact Information</h3> */}
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'email',
                    name: 'support_email',
                    label: 'Support Email',
                    required: true
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'support_phone',
                    label: 'Support Phone',
                    required: true
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    name: 'website',
                    label: 'Website',
                    type: 'url',
                    required: false
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'address':
        return (
          <div className="form-section">
            {/* <h3 className="form-section-title">Address Details</h3> */}
            <div className="form-section-content">
              <div className="row">
                <div className="col-12">
                  {renderField({
                    type: 'textarea',
                    name: 'address_line1',
                    label: 'Address Line 1',
                    rows: 2,
                    required: true
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {renderField({
                    type: 'textarea',
                    name: 'address_line2',
                    label: 'Address Line 2',
                    rows: 2,
                    required: false
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  {renderField({
                    name: 'city',
                    label: 'City',
                    required: true
                  })}
                </div>
                <div className="col-md-3">
                  {renderField({
                    name: 'state',
                    label: 'State',
                    required: true
                  })}
                </div>
                <div className="col-md-3">
                  {renderField({
                    name: 'pincode',
                    label: 'Pincode',
                    required: true
                  })}
                </div>
                 <div className="col-md-3">
                  {renderField({
                    name: 'country',
                    label: 'Country',
                    value: 'India',
                    readOnly: true
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'bank-compliance':
        return (
          <div className="form-section">
            {/* <h3 className="form-section-title">Bank & Compliance Details</h3> */}
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    name: 'bank_account_name',
                    label: 'Account Holder Name',
                    required: true
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'bank_account_number',
                    label: 'Account Number',
                    required: true
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    name: 'bank_ifsc',
                    label: 'IFSC Code',
                    required: true
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'bank_name',
                    label: 'Bank Name',
                    required: true
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    name: 'gst_number',
                    label: 'GST Number',
                    required: false,
                    placeholder: '36ABCDE1234F1Z2'
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'pan_number',
                    label: 'PAN Number',
                    required: false,
                    placeholder: 'ABCDE1234F'
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'marketplace':
        return (
          <div className="form-section">
            {/* <h3 className="form-section-title">Marketplace Settings</h3> */}
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-4">
                  {renderField({
                    type: 'number',
                    name: 'commission_percent',
                    label: 'Commission Percentage',
                    step: '0.01',
                    min: 0,
                    max: 100,
                    required: true
                  })}
                </div>
                <div className="col-md-4">
                  {renderField({
                    type: 'number',
                    name: 'settlement_cycle_days',
                    label: 'Settlement Cycle (Days)',
                    min: 1,
                    required: true
                  })}
                </div>
                <div className="col-md-4">
                  {renderField({
                    type: 'number',
                    name: 'min_order_value',
                    label: 'Minimum Order Value',
                    step: '0.01',
                    min: 0,
                    required: true
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'working-hours':
        return (
          <div className="form-section">
            {/* <h3 className="form-section-title">Working Hours</h3> */}
            <div className="form-section-content">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Opens At</th>
                      <th>Closes At</th>
                      <th>Closed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.working_hours.map((hour, index) => (
                      <tr key={hour.day}>
                        <td>{DAYS.find(d => d.value === hour.day)?.label || hour.day}</td>
                        <td>
                          {isViewing ? (
                            <div className="view-mode-value">{hour.opens_at || 'N/A'}</div>
                          ) : (
                            <input
                              type="time"
                              className="form-control"
                              value={hour.opens_at || ''}
                              onChange={(e) => handleWorkingHourChange(index, 'opens_at', e.target.value)}
                              disabled={hour.is_closed || isViewing}
                            />
                          )}
                        </td>
                        <td>
                          {isViewing ? (
                            <div className="view-mode-value">{hour.closes_at || 'N/A'}</div>
                          ) : (
                            <input
                              type="time"
                              className="form-control"
                              value={hour.closes_at || ''}
                              onChange={(e) => handleWorkingHourChange(index, 'closes_at', e.target.value)}
                              disabled={hour.is_closed || isViewing}
                            />
                          )}
                        </td>
                        <td className="text-center">
                          {isViewing ? (
                            <div className="view-mode-value">{hour.is_closed ? 'Yes' : 'No'}</div>
                          ) : (
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={hour.is_closed || false}
                                onChange={(e) => handleWorkingHourChange(index, 'is_closed', e.target.checked.toString())}
                              />
                              <label className="form-check-label ms-1">Closed</label>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="alert alert-info mt-3">
                <small>
                  <i className="bi bi-info-circle me-1"></i>
                  When "Closed" is checked, time fields will be disabled and set to null in the API.
                </small>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (isViewing) {
      navigate('/agent-my-business'); // Changed to business list page
      return;
    }

    // Validate all tabs
    let isValid = true;
    for (const tab of tabs) {
      setActiveTab(tab.id);
      if (!validateCurrentTab()) {
        isValid = false;
      }
    }

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please complete all required fields in all steps',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append('business_name', formData.business_name);
      formDataToSend.append('legal_name', formData.legal_name || '');
      formDataToSend.append('business_type', formData.business_type);
      formDataToSend.append('description', formData.description || '');
      formData.categories.forEach(cat => {
        formDataToSend.append('categories', cat);
      });
      formDataToSend.append('user', formData.user);
      formDataToSend.append('support_email', formData.support_email);
      formDataToSend.append('support_phone', formData.support_phone);
      formDataToSend.append('website', formData.website || '');
      formDataToSend.append('address_line1', formData.address_line1);
      formDataToSend.append('address_line2', formData.address_line2 || '');
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('gst_number', formData.gst_number || '');
      formDataToSend.append('pan_number', formData.pan_number || '');
      formDataToSend.append('bank_account_name', formData.bank_account_name);
      formDataToSend.append('bank_account_number', formData.bank_account_number);
      formDataToSend.append('bank_ifsc', formData.bank_ifsc);
      formDataToSend.append('bank_name', formData.bank_name);
      formDataToSend.append('commission_percent', parseFloat(formData.commission_percent) || 5.0);
      formDataToSend.append('settlement_cycle_days', parseInt(formData.settlement_cycle_days) || 3);
      formDataToSend.append('min_order_value', parseFloat(formData.min_order_value) || 50.00);
      
      // Add working hours as JSON string
      const workingHoursData = formData.working_hours.map(hour => {
        if (hour.is_closed) {
          return {
            day: hour.day,
            is_closed: true
          };
        }
        return {
          day: hour.day,
          opens_at: hour.opens_at || '11:00',
          closes_at: hour.closes_at || '18:00',
          is_closed: false
        };
      });
      formDataToSend.append('working_hours', JSON.stringify(workingHoursData));
      
      // Add files if they exist
      if (logoFile) {
        formDataToSend.append('logo', logoFile);
      }
      if (bannerFile) {
        formDataToSend.append('banner', bannerFile);
      }

      // Set headers for multipart/form-data
      const headers = {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData, browser will set it automatically with boundary
      };

      const endpoint = isEditing ? `${baseurl}/business/${id}/` : `${baseurl}/business/`;
      const method = isEditing ? 'put' : 'post';

      // For PUT requests with files, use PATCH for partial updates
      if (isEditing && (logoFile || bannerFile)) {
        const response = await axios.patch(endpoint, formDataToSend, { headers });
      } else {
        const response = await axios[method](endpoint, formDataToSend, { headers });
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: isEditing ? 'Business Updated Successfully!' : 'Business Added Successfully!',
        confirmButtonColor: '#3085d6',
      });
      // Navigate to Business List page after success
      navigate("/agent-my-business");

    } catch (error) {
      console.error('Detailed submission error:', error);
      
      let errorMessage = isEditing ? 'Error updating business' : 'Error adding business';
      if (error.response?.data) {
        // Handle Django validation errors
        const errors = error.response.data;
        if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
        } else {
          errorMessage += `: ${JSON.stringify(errors)}`;
        }
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'add': return "Add Business";
      case 'edit': return "Edit Business";
      case 'view': return "View Business";
      default: return "Business";
    }
  };

  return (
    <>
      <AgentNavbar/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="business-form-container">
              <div className="form-header">
                <h2 className="form-title">{getTitle()}</h2>
                <div className="form-actions">
                  {!isViewing && (
                    <>
                      <button 
                        type="button" 
                        className="btn btn-secondary me-2"
                        onClick={() => navigate('/agent-my-business')} // Changed to business list
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn "
                          style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : (isEditing ? 'Update Business' : 'Add Business')}
                      </button>
                    </>
                  )}
                  {isViewing && (
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => navigate('/agent-my-business')} // Changed to business list
                    >
                      Back to List
                    </button>
                  )}
                </div>
              </div>

              <div className="form-tabs-container">
                <ul className="nav nav-tabs form-tabs">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="form-body">
                <form onSubmit={handleSubmit}>
                  {renderActiveTab()}
                  
                  {!isViewing && (
                    <div className="form-navigation">
                      <div className="row">
                        <div className="col-md-6">
                          {activeTab !== 'basic-details' && (
                            <button 
                              type="button" 
                              className="btn btn-secondary"
                              onClick={handleBack}
                              disabled={isSubmitting}
                            >
                              <i className="bi bi-arrow-left me-1"></i> Back
                            </button>
                          )}
                        </div>
                        <div className="col-md-6 text-end">
                          {activeTab !== 'working-hours' ? (
                            <button 
                              type="button" 
                              className="btn"
                                style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
                              onClick={handleNext}
                              disabled={isSubmitting}
                            >
                              Next <i className="bi bi-arrow-right ms-1"></i>
                            </button>
                          ) : (
                            <button 
                              type="button" 
                              className="btn"
                                style={{
              backgroundColor: '#273c75',
              borderColor: '#273c75',
              color: 'white'
            }}
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                  Saving...
                                </>
                              ) : (
                                <>
                                  {isEditing ? 'Update Business' : 'Add Business'}
                                  <i className="bi bi-check-circle ms-1"></i>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBusinessForm;