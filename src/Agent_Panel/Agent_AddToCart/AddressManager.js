// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Country, State, City } from "country-state-city";
// import {
//   FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimes, FaMapMarkerAlt,
//   FaUser, FaPhone, FaFlag, FaCity, FaStar
// } from "react-icons/fa";
// import { baseurl } from '../../BaseURL/BaseURL';

// const EMPTY_ADDRESS = {
//   full_name: "",
//   phone: "",
//   address_line1: "",
//   address_line2: "",
//   landmark: "",
//   city: "",
//   state: "",
//   pincode: "",
//   country: "IN",
//   country_name: "India",
//   is_default: false,
// };

// function AddressManager({ userId, onAddressSelect, selectedAddress }) {
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [formData, setFormData] = useState({ ...EMPTY_ADDRESS });
//   const [formErrors, setFormErrors] = useState({});
//   const [formTouched, setFormTouched] = useState({});
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [savingAddress, setSavingAddress] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Load countries on component mount
//   useEffect(() => {
//     const allCountries = Country.getAllCountries();
//     setCountries(allCountries);
//   }, []);

//   // Load states when country changes
//   useEffect(() => {
//     if (formData.country) {
//       const statesOfCountry = State.getStatesOfCountry(formData.country);
//       setStates(statesOfCountry);
//       setCities([]); // Reset cities when country changes
//       // Clear state if current state is not in the new country's states
//       if (formData.state && !statesOfCountry.find(s => s.isoCode === formData.state)) {
//         handleFieldChange('state', '');
//       }
//     } else {
//       setStates([]);
//       setCities([]);
//     }
//   }, [formData.country]);

//   // Load cities when state changes
//   useEffect(() => {
//     if (formData.country && formData.state) {
//       const citiesOfState = City.getCitiesOfState(formData.country, formData.state);
//       setCities(citiesOfState);
//       // Clear city if current city is not in the new state's cities
//       if (formData.city && !citiesOfState.find(c => c.name === formData.city)) {
//         handleFieldChange('city', '');
//       }
//     } else {
//       setCities([]);
//     }
//   }, [formData.country, formData.state]);

//   // Fetch saved addresses from API
//   const fetchAddresses = async () => {
//     if (!userId) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseurl}/addresses/?user_id=${userId}`, { timeout: 10000 });
//       const data = res.data.results || res.data || [];
//       setSavedAddresses(data);
//       // Auto-select default if no selected address
//       if (!selectedAddress && data.length > 0) {
//         const def = data.find(a => a.is_default) || data[0];
//         onAddressSelect(def);
//       }
//     } catch (err) {
//       console.error("Error fetching addresses:", err);
//       setSavedAddresses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, [userId]);


//   // Add this effect to update selected address when savedAddresses changes
// useEffect(() => {
//   // After addresses are updated, if we have a selected address,
//   // find its latest version from the updated addresses list
//   if (selectedAddress && savedAddresses.length > 0) {
//     const updatedSelectedAddress = savedAddresses.find(addr => addr.id === selectedAddress.id);
//     if (updatedSelectedAddress && JSON.stringify(updatedSelectedAddress) !== JSON.stringify(selectedAddress)) {
//       // If the selected address was edited, update it in the parent
//       onAddressSelect(updatedSelectedAddress);
//     } else if (!updatedSelectedAddress && selectedAddress) {
//       // If the selected address was deleted, select another address
//       const defaultAddr = savedAddresses.find(addr => addr.is_default) || savedAddresses[0] || null;
//       onAddressSelect(defaultAddr);
//     }
//   }
// }, [savedAddresses]); 

//   const validate = (data) => {
//     const errors = {};
//     if (!data.full_name?.trim()) errors.full_name = "Full name is required";
//     if (!data.phone?.trim()) errors.phone = "Phone is required";
//     else if (!/^\d{10}$/.test(data.phone)) errors.phone = "Enter valid 10-digit phone";
//     if (!data.address_line1?.trim()) errors.address_line1 = "Address line 1 is required";
//     if (!data.city?.trim()) errors.city = "City is required";
//     if (!data.state?.trim()) errors.state = "State is required";
//     if (!data.pincode?.trim()) errors.pincode = "Pincode is required";
//     else if (!/^\d{6}$/.test(data.pincode)) errors.pincode = "Enter valid 6-digit pincode";
//     if (!data.country?.trim()) errors.country = "Country is required";
//     return errors;
//   };

//   const handleFieldChange = (field, value) => {
//     setFormData(prev => {
//       const updated = { ...prev, [field]: value };
//       if (field === 'country') { 
//         updated.state = ''; 
//         updated.city = '';
//         // Get country name from code
//         const countryObj = countries.find(c => c.isoCode === value);
//         updated.country_name = countryObj ? countryObj.name : value;
//       }
//       if (field === 'state') { 
//         updated.city = '';
//       }
//       return updated;
//     });
//     setFormTouched(prev => ({ ...prev, [field]: true }));
//     setFormErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
//   };

//   const openAddForm = () => {
//     setEditingAddress(null);
//     setFormData({ ...EMPTY_ADDRESS, country: "IN", country_name: "India" });
//     setFormErrors({});
//     setFormTouched({});
//     setShowForm(true);
//   };

//   const openEditForm = (addr) => {
//     setEditingAddress(addr);
//     // Find country code from country name
//     const countryObj = countries.find(c => c.name === addr.country);
//     const countryCode = countryObj ? countryObj.isoCode : "IN";
    
//     // Find state code from state name
//     const statesList = State.getStatesOfCountry(countryCode);
//     const stateObj = statesList.find(s => s.name === addr.state);
//     const stateCode = stateObj ? stateObj.isoCode : "";
    
//     setFormData({
//       ...addr,
//       country: countryCode,
//       country_name: addr.country,
//       state: stateCode,
//     });
//     setFormErrors({});
//     setFormTouched({});
//     setShowForm(true);
//   };

// // Update the handleSave function to properly refresh the selection
// const handleSave = async () => {
//   const allTouched = {};
//   Object.keys(EMPTY_ADDRESS).forEach(k => { allTouched[k] = true; });
//   setFormTouched(allTouched);

//   const errors = validate(formData);
//   if (Object.keys(errors).length > 0) {
//     setFormErrors(errors);
//     return;
//   }

//   setSavingAddress(true);
//   try {
//     const countryObj = countries.find(c => c.isoCode === formData.country);
//     const countryName = countryObj ? countryObj.name : formData.country;
    
//     const statesList = State.getStatesOfCountry(formData.country);
//     const stateObj = statesList.find(s => s.isoCode === formData.state);
//     const stateName = stateObj ? stateObj.name : formData.state;

//     const payload = {
//       user: parseInt(userId),
//       full_name: formData.full_name,
//       phone: formData.phone,
//       address_line1: formData.address_line1,
//       address_line2: formData.address_line2 || "",
//       landmark: formData.landmark || "",
//       city: formData.city,
//       state: stateName,
//       pincode: formData.pincode,
//       country: countryName,
//       is_default: formData.is_default || false,
//     };

//     let updatedAddress;
//     if (editingAddress) {
//       // Update existing address
//       await axios.put(`${baseurl}/addresses/${editingAddress.id}/`, payload, { timeout: 10000 });
//       updatedAddress = { ...editingAddress, ...payload, id: editingAddress.id };
//     } else {
//       // Create new address
//       const response = await axios.post(`${baseurl}/addresses/`, payload, { timeout: 10000 });
//       updatedAddress = response.data;
//     }
    
//     // Refresh addresses after save
//     await fetchAddresses();
    
//     // Close the form
//     setShowForm(false);
    
//     // If we're editing the currently selected address, update it in parent
//     if (editingAddress && selectedAddress?.id === editingAddress.id) {
//       onAddressSelect(updatedAddress);
//     }
//     // If this is a new address and it's set as default, select it
//     else if (!editingAddress && formData.is_default) {
//       onAddressSelect(updatedAddress);
//     }
    
//   } catch (error) {
//     console.error("Error saving address:", error);
//     alert("Failed to save address. Please try again.");
//   } finally {
//     setSavingAddress(false);
//   }
// };

// // Update handleDelete function
// const handleDelete = async (addr) => {
//   if (!window.confirm("Are you sure you want to delete this address?")) return;
  
//   setDeletingId(addr.id);
//   try {
//     await axios.delete(`${baseurl}/addresses/${addr.id}/`, { timeout: 10000 });
//     await fetchAddresses();
    
//     // If the deleted address was selected, select another one
//     if (selectedAddress?.id === addr.id) {
//       // Wait a bit for the addresses to refresh
//       setTimeout(() => {
//         const defaultAddr = savedAddresses.find(a => a.id !== addr.id && a.is_default);
//         const firstAddr = savedAddresses.find(a => a.id !== addr.id);
//         const newSelected = defaultAddr || firstAddr || null;
//         onAddressSelect(newSelected);
//       }, 100);
//     }
//   } catch (error) {
//     console.error("Error deleting address:", error);
//     alert("Failed to delete address. Please try again.");
//   } finally {
//     setDeletingId(null);
//   }
// };

// // Update handleSetDefault function
// const handleSetDefault = async (addr) => {
//   try {
//     const payload = { ...addr, is_default: true };
//     await axios.put(`${baseurl}/addresses/${addr.id}/`, payload, { timeout: 10000 });
//     await fetchAddresses();
//     // If this address is selected, update it in parent
//     if (selectedAddress?.id === addr.id) {
//       onAddressSelect({ ...addr, is_default: true });
//     }
//   } catch (error) {
//     console.error("Error setting default address:", error);
//     alert("Failed to set default address. Please try again.");
//   }
// };

//   const handleSelectAddress = (addr) => {
//     onAddressSelect(addr);
//     setShowModal(false);
//   };

//   const formatAddress = (addr) => {
//     if (!addr) return "No address selected";
//     const parts = [
//       addr.address_line1,
//       addr.address_line2,
//       addr.landmark,
//       addr.city,
//       addr.state,
//       addr.pincode,
//       addr.country
//     ].filter(Boolean);
//     return parts.join(", ");
//   };

//   // Helper to get state name from code
//   const getStateName = (countryCode, stateCode) => {
//     const statesList = State.getStatesOfCountry(countryCode);
//     const state = statesList.find(s => s.isoCode === stateCode);
//     return state ? state.name : stateCode;
//   };

//   return (
//     <>
//       {/* Selected Address Display */}
//       <div className="am-selected-box" onClick={() => setShowModal(true)}>
//         <div className="am-selected-icon">
//           <FaMapMarkerAlt />
//         </div>
//         <div className="am-selected-info">
//           {selectedAddress ? (
//             <>
//               <div className="am-selected-name">
//                 {selectedAddress.full_name}
//                 {selectedAddress.is_default && (
//                   <span className="am-default-badge">Default</span>
//                 )}
//               </div>
//               <div className="am-selected-addr">{formatAddress(selectedAddress)}</div>
//               <div className="am-selected-phone">{selectedAddress.phone}</div>
//             </>
//           ) : (
//             <div className="am-selected-name am-no-address">
//               {loading ? "Loading addresses..." : "Click to add a delivery address"}
//             </div>
//           )}
//         </div>
//         <button className="am-change-btn">Change</button>
//       </div>

//       {/* Address Selection Modal */}
//       {showModal && (
//         <div className="am-overlay" onClick={() => { setShowModal(false); setShowForm(false); }}>
//           <div className="am-modal" onClick={e => e.stopPropagation()}>
//             {/* Modal Header */}
//             <div className="am-modal-header">
//               <h5>{showForm ? (editingAddress ? "Edit Address" : "Add a New Address") : "Choose a delivery address"}</h5>
//               <button className="am-close-btn" onClick={() => { setShowModal(false); setShowForm(false); }}>
//                 <FaTimes />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="am-modal-body">
//               {!showForm ? (
//                 <>
//                   {loading ? (
//                     <div className="text-center py-5">
//                       <div className="spinner-border text-primary" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                     </div>
//                   ) : savedAddresses.length === 0 ? (
//                     <div className="am-empty-state">
//                       <FaMapMarkerAlt size={40} />
//                       <p>No saved addresses yet</p>
//                       <p className="small text-muted">Add an address to continue</p>
//                     </div>
//                   ) : (
//                     <div className="am-address-list">
//                       {savedAddresses.map((addr) => (
//                         <div
//                           key={addr.id}
//                           className={`am-address-item ${selectedAddress?.id === addr.id ? 'am-selected' : ''}`}
//                           onClick={() => handleSelectAddress(addr)}
//                         >
//                           <div className="am-radio-wrap">
//                             <input
//                               type="radio"
//                               readOnly
//                               checked={selectedAddress?.id === addr.id}
//                               className="am-radio"
//                             />
//                           </div>
//                           <div className="am-addr-content">
//                             <div className="am-addr-header">
//                               <span className="am-addr-name">{addr.full_name}</span>
//                               {addr.is_default && (
//                                 <span className="am-default-tag">Default</span>
//                               )}
//                             </div>
//                             <div className="am-addr-text">{formatAddress(addr)}</div>
//                             <div className="am-addr-phone">
//                               <FaPhone size={10} className="me-1" />{addr.phone}
//                             </div>
//                             <div className="am-addr-actions" onClick={e => e.stopPropagation()}>
//                               <button className="am-action-link" onClick={() => openEditForm(addr)}>
//                                 <FaEdit size={11} /> Edit
//                               </button>
//                               <span className="am-sep">|</span>
//                               <button
//                                 className="am-action-link am-delete"
//                                 onClick={() => handleDelete(addr)}
//                                 disabled={deletingId === addr.id}
//                               >
//                                 {deletingId === addr.id ? "Removing..." : <><FaTrash size={11} /> Remove</>}
//                               </button>
//                               {!addr.is_default && (
//                                 <>
//                                   <span className="am-sep">|</span>
//                                   <button className="am-action-link am-default" onClick={() => handleSetDefault(addr)}>
//                                     <FaStar size={11} /> Set as default
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                           {selectedAddress?.id === addr.id && (
//                             <FaCheckCircle className="am-check-icon" />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   <button className="am-add-new-btn" onClick={openAddForm}>
//                     <FaPlus className="me-2" />
//                     Add a new address
//                   </button>
//                 </>
//               ) : (
//                 /* Add / Edit Address Form */
//                 <div className="am-form">
//                   <div className="am-form-grid">
//                     {/* Full Name */}
//                     <div className="am-form-group full">
//                       <label><FaUser size={11} className="me-1" />Full name (First and Last name) *</label>
//                       <input
//                         className={`am-input ${formTouched.full_name && formErrors.full_name ? 'am-error' : ''}`}
//                         value={formData.full_name}
//                         onChange={e => handleFieldChange('full_name', e.target.value)}
//                         placeholder="Enter your full name"
//                       />
//                       {formTouched.full_name && formErrors.full_name && <span className="am-err-msg">{formErrors.full_name}</span>}
//                     </div>

//                     {/* Phone */}
//                     <div className="am-form-group full">
//                       <label><FaPhone size={11} className="me-1" />Mobile number *</label>
//                       <input
//                         className={`am-input ${formTouched.phone && formErrors.phone ? 'am-error' : ''}`}
//                         value={formData.phone}
//                         onChange={e => handleFieldChange('phone', e.target.value)}
//                         placeholder="10-digit mobile number"
//                         maxLength="10"
//                       />
//                       {formTouched.phone && formErrors.phone && <span className="am-err-msg">{formErrors.phone}</span>}
//                     </div>

//                     {/* Pincode */}
//                     <div className="am-form-group full">
//                       <label>Pincode *</label>
//                       <input
//                         className={`am-input ${formTouched.pincode && formErrors.pincode ? 'am-error' : ''}`}
//                         value={formData.pincode}
//                         onChange={e => handleFieldChange('pincode', e.target.value)}
//                         placeholder="6 digits PIN code"
//                         maxLength="6"
//                       />
//                       {formTouched.pincode && formErrors.pincode && <span className="am-err-msg">{formErrors.pincode}</span>}
//                     </div>

//                     {/* Address Line 1 */}
//                     <div className="am-form-group full">
//                       <label>Flat, House no., Building, Company, Apartment *</label>
//                       <input
//                         className={`am-input ${formTouched.address_line1 && formErrors.address_line1 ? 'am-error' : ''}`}
//                         value={formData.address_line1}
//                         onChange={e => handleFieldChange('address_line1', e.target.value)}
//                         placeholder="House/flat number, building name"
//                       />
//                       {formTouched.address_line1 && formErrors.address_line1 && <span className="am-err-msg">{formErrors.address_line1}</span>}
//                     </div>

//                     {/* Address Line 2 */}
//                     <div className="am-form-group full">
//                       <label>Area, Street, Sector, Village</label>
//                       <input
//                         className="am-input"
//                         value={formData.address_line2}
//                         onChange={e => handleFieldChange('address_line2', e.target.value)}
//                         placeholder="Area, street, sector, village"
//                       />
//                     </div>

//                     {/* Landmark */}
//                     <div className="am-form-group full">
//                       <label>Landmark (Optional)</label>
//                       <input
//                         className="am-input"
//                         value={formData.landmark}
//                         onChange={e => handleFieldChange('landmark', e.target.value)}
//                         placeholder="Near ZPHS School"
//                       />
//                     </div>

//                     {/* Country */}
//                     <div className="am-form-group full">
//                       <label><FaFlag size={11} className="me-1" />Country / Region *</label>
//                       <select
//                         className={`am-input ${formTouched.country && formErrors.country ? 'am-error' : ''}`}
//                         value={formData.country}
//                         onChange={e => handleFieldChange('country', e.target.value)}
//                       >
//                         <option value="">Select Country</option>
//                         {countries.map(c => (
//                           <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
//                         ))}
//                       </select>
//                       {formTouched.country && formErrors.country && <span className="am-err-msg">{formErrors.country}</span>}
//                     </div>

//                     {/* State */}
//                     <div className="am-form-group">
//                       <label>State *</label>
//                       <select
//                         className={`am-input ${formTouched.state && formErrors.state ? 'am-error' : ''}`}
//                         value={formData.state}
//                         onChange={e => handleFieldChange('state', e.target.value)}
//                         disabled={!formData.country}
//                       >
//                         <option value="">Select State</option>
//                         {states.map(s => (
//                           <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
//                         ))}
//                       </select>
//                       {formTouched.state && formErrors.state && <span className="am-err-msg">{formErrors.state}</span>}
//                     </div>

//                     {/* City */}
//                     <div className="am-form-group">
//                       <label><FaCity size={11} className="me-1" />Town/City *</label>
//                       <select
//                         className={`am-input ${formTouched.city && formErrors.city ? 'am-error' : ''}`}
//                         value={formData.city}
//                         onChange={e => handleFieldChange('city', e.target.value)}
//                         disabled={!formData.state}
//                       >
//                         <option value="">Select City</option>
//                         {cities.map(c => (
//                           <option key={c.name} value={c.name}>{c.name}</option>
//                         ))}
//                       </select>
//                       {formTouched.city && formErrors.city && <span className="am-err-msg">{formErrors.city}</span>}
//                     </div>

//                     {/* Default checkbox */}
//                     <div className="am-form-group full am-checkbox-group">
//                       <label className="am-checkbox-label">
//                         <input
//                           type="checkbox"
//                           checked={formData.is_default}
//                           onChange={e => handleFieldChange('is_default', e.target.checked)}
//                         />
//                         <span>Make this my default address</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="am-form-actions">
//                     <button
//                       className="am-save-btn"
//                       onClick={handleSave}
//                       disabled={savingAddress}
//                     >
//                       {savingAddress ? "Saving..." : (editingAddress ? "Update address" : "Add address")}
//                     </button>
//                     <button
//                       className="am-cancel-btn"
//                       onClick={() => setShowForm(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default AddressManager;


//======================
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import {
  FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimes, FaMapMarkerAlt,
  FaUser, FaPhone, FaFlag, FaCity, FaStar, FaArrowLeft
} from "react-icons/fa";
import { baseurl } from '../../BaseURL/BaseURL';
import "./AddressManager.css";

const EMPTY_ADDRESS = {
  full_name: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "IN",
  country_name: "India",
  is_default: false,
};

/* -------------------------------------------------------
   AddressPage  –  full-page "Your Addresses" view
   (used at route /agent-addresses)
------------------------------------------------------- */
export function AddressPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_ADDRESS });
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [savingAddress, setSavingAddress] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { setCountries(Country.getAllCountries()); }, []);

  useEffect(() => {
    if (formData.country) {
      const s = State.getStatesOfCountry(formData.country);
      setStates(s);
      setCities([]);
    } else { setStates([]); setCities([]); }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      setCities(City.getCitiesOfState(formData.country, formData.state));
    } else { setCities([]); }
  }, [formData.country, formData.state]);

  const fetchAddresses = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/addresses/?user_id=${userId}`, { timeout: 10000 });
      setSavedAddresses(res.data.results || res.data || []);
    } catch { setSavedAddresses([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAddresses(); }, [userId]);

  const validate = (data) => {
    const e = {};
    if (!data.full_name?.trim()) e.full_name = "Full name is required";
    if (!data.phone?.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(data.phone)) e.phone = "Enter valid 10-digit phone";
    if (!data.address_line1?.trim()) e.address_line1 = "Address line 1 is required";
    if (!data.city?.trim()) e.city = "City is required";
    if (!data.state?.trim()) e.state = "State is required";
    if (!data.pincode?.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(data.pincode)) e.pincode = "Enter valid 6-digit pincode";
    if (!data.country?.trim()) e.country = "Country is required";
    return e;
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'country') {
        updated.state = ''; updated.city = '';
        const c = countries.find(c => c.isoCode === value);
        updated.country_name = c ? c.name : value;
      }
      if (field === 'state') updated.city = '';
      return updated;
    });
    setFormTouched(prev => ({ ...prev, [field]: true }));
    setFormErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const openAddForm = () => {
    setEditingAddress(null);
    setFormData({ ...EMPTY_ADDRESS, country: "IN", country_name: "India" });
    setFormErrors({}); setFormTouched({});
    setShowForm(true);
  };

  const openEditForm = (addr) => {
    setEditingAddress(addr);
    const countryObj = countries.find(c => c.name === addr.country);
    const countryCode = countryObj ? countryObj.isoCode : "IN";
    const statesList = State.getStatesOfCountry(countryCode);
    const stateObj = statesList.find(s => s.name === addr.state);
    setFormData({ ...addr, country: countryCode, country_name: addr.country, state: stateObj ? stateObj.isoCode : "" });
    setFormErrors({}); setFormTouched({});
    setShowForm(true);
  };

  const handleSave = async () => {
    const allTouched = {};
    Object.keys(EMPTY_ADDRESS).forEach(k => { allTouched[k] = true; });
    setFormTouched(allTouched);
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

    setSavingAddress(true);
    try {
      const countryObj = countries.find(c => c.isoCode === formData.country);
      const stateObj = State.getStatesOfCountry(formData.country).find(s => s.isoCode === formData.state);
      const payload = {
        user: parseInt(userId),
        full_name: formData.full_name,
        phone: formData.phone,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2 || "",
        landmark: formData.landmark || "",
        city: formData.city,
        state: stateObj ? stateObj.name : formData.state,
        pincode: formData.pincode,
        country: countryObj ? countryObj.name : formData.country,
        is_default: formData.is_default || false,
      };
      if (editingAddress) {
        await axios.put(`${baseurl}/addresses/${editingAddress.id}/`, payload, { timeout: 10000 });
      } else {
        await axios.post(`${baseurl}/addresses/`, payload, { timeout: 10000 });
      }
      await fetchAddresses();
      setShowForm(false);
    } catch { alert("Failed to save address. Please try again."); }
    finally { setSavingAddress(false); }
  };

  const handleDelete = async (addr) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setDeletingId(addr.id);
    try {
      await axios.delete(`${baseurl}/addresses/${addr.id}/`, { timeout: 10000 });
      await fetchAddresses();
    } catch { alert("Failed to delete address."); }
    finally { setDeletingId(null); }
  };

  const handleSetDefault = async (addr) => {
    try {
      await axios.put(`${baseurl}/addresses/${addr.id}/`, { ...addr, is_default: true }, { timeout: 10000 });
      await fetchAddresses();
    } catch { alert("Failed to set default address."); }
  };

  const formatAddress = (addr) =>
    [addr.address_line1, addr.address_line2, addr.landmark, addr.city, addr.state, addr.pincode, addr.country]
      .filter(Boolean).join(", ");

  return (
    <div className="ap-page">
      {/* Back button */}
      <button className="ap-back-header-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft className="ap-back-icon" />
        <span>Back</span>
      </button>

      <h1 className="ap-title">Your Addresses</h1>

      {loading ? (
        <div className="ap-loading">
          <div className="spinner-border text-primary" role="status" />
          <p>Loading addresses...</p>
        </div>
      ) : showForm ? (
        /* ---- Add / Edit Form ---- */
        <div className="ap-form-page">
          <button className="ap-back-btn" onClick={() => setShowForm(false)}>
            <FaArrowLeft className="me-2" />
            {editingAddress ? "Back to Addresses" : "Back to Addresses"}
          </button>
          <h2 className="ap-form-title">{editingAddress ? "Edit address" : "Add a new address"}</h2>

          <div className="ap-form-card">
            <div className="am-form-grid">
              {/* Full Name */}
              <div className="am-form-group full">
                <label><FaUser size={11} className="me-1" />Full name (First and Last name) *</label>
                <input
                  className={`am-input ${formTouched.full_name && formErrors.full_name ? 'am-error' : ''}`}
                  value={formData.full_name}
                  onChange={e => handleFieldChange('full_name', e.target.value)}
                  placeholder="Enter your full name"
                />
                {formTouched.full_name && formErrors.full_name && <span className="am-err-msg">{formErrors.full_name}</span>}
              </div>

              {/* Phone */}
              <div className="am-form-group full">
                <label><FaPhone size={11} className="me-1" />Mobile number *</label>
                <input
                  className={`am-input ${formTouched.phone && formErrors.phone ? 'am-error' : ''}`}
                  value={formData.phone}
                  onChange={e => handleFieldChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                {formTouched.phone && formErrors.phone && <span className="am-err-msg">{formErrors.phone}</span>}
              </div>

              {/* Pincode */}
              <div className="am-form-group full">
                <label>Pincode *</label>
                <input
                  className={`am-input ${formTouched.pincode && formErrors.pincode ? 'am-error' : ''}`}
                  value={formData.pincode}
                  onChange={e => handleFieldChange('pincode', e.target.value)}
                  placeholder="6 digits PIN code"
                  maxLength="6"
                />
                {formTouched.pincode && formErrors.pincode && <span className="am-err-msg">{formErrors.pincode}</span>}
              </div>

              {/* Address Line 1 */}
              <div className="am-form-group full">
                <label>Flat, House no., Building, Company, Apartment *</label>
                <input
                  className={`am-input ${formTouched.address_line1 && formErrors.address_line1 ? 'am-error' : ''}`}
                  value={formData.address_line1}
                  onChange={e => handleFieldChange('address_line1', e.target.value)}
                  placeholder="House/flat number, building name"
                />
                {formTouched.address_line1 && formErrors.address_line1 && <span className="am-err-msg">{formErrors.address_line1}</span>}
              </div>

              {/* Address Line 2 */}
              <div className="am-form-group full">
                <label>Area, Street, Sector, Village</label>
                <input
                  className="am-input"
                  value={formData.address_line2}
                  onChange={e => handleFieldChange('address_line2', e.target.value)}
                  placeholder="Area, street, sector, village"
                />
              </div>

              {/* Landmark */}
              <div className="am-form-group full">
                <label>Landmark (Optional)</label>
                <input
                  className="am-input"
                  value={formData.landmark}
                  onChange={e => handleFieldChange('landmark', e.target.value)}
                  placeholder="Near ZPHS School"
                />
              </div>

              {/* Country */}
              <div className="am-form-group full">
                <label><FaFlag size={11} className="me-1" />Country / Region *</label>
                <select
                  className={`am-input ${formTouched.country && formErrors.country ? 'am-error' : ''}`}
                  value={formData.country}
                  onChange={e => handleFieldChange('country', e.target.value)}
                >
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                </select>
                {formTouched.country && formErrors.country && <span className="am-err-msg">{formErrors.country}</span>}
              </div>

              {/* State */}
              <div className="am-form-group">
                <label>State *</label>
                <select
                  className={`am-input ${formTouched.state && formErrors.state ? 'am-error' : ''}`}
                  value={formData.state}
                  onChange={e => handleFieldChange('state', e.target.value)}
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                </select>
                {formTouched.state && formErrors.state && <span className="am-err-msg">{formErrors.state}</span>}
              </div>

              {/* City */}
              <div className="am-form-group">
                <label><FaCity size={11} className="me-1" />Town/City *</label>
                <select
                  className={`am-input ${formTouched.city && formErrors.city ? 'am-error' : ''}`}
                  value={formData.city}
                  onChange={e => handleFieldChange('city', e.target.value)}
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                {formTouched.city && formErrors.city && <span className="am-err-msg">{formErrors.city}</span>}
              </div>

              {/* Default */}
              <div className="am-form-group full am-checkbox-group">
                <label className="am-checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={e => handleFieldChange('is_default', e.target.checked)}
                  />
                  <span>Make this my default address</span>
                </label>
              </div>
            </div>

            <div className="am-form-actions">
              <button className="am-save-btn" onClick={handleSave} disabled={savingAddress}>
                {savingAddress ? "Saving..." : (editingAddress ? "Update address" : "Add address")}
              </button>
              <button className="am-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        /* ---- Address Grid ---- */
        <div className="ap-grid">
          {/* Add address card */}
          <div className="ap-add-card" onClick={openAddForm}>
            <div className="ap-add-icon">
              <span className="ap-plus">+</span>
            </div>
            <span className="ap-add-label">Add address</span>
          </div>

          {/* Existing address cards */}
          {savedAddresses.map((addr) => (
            <div key={addr.id} className={`ap-addr-card ${addr.is_default ? 'ap-default-card' : ''}`}>
              {addr.is_default && (
                <div className="ap-default-label">
                  Default: <span className="ap-default-brand">Your Home</span>
                </div>
              )}
              <div className="ap-addr-name">{addr.full_name}</div>
              <div className="ap-addr-body">
                {addr.address_line1}
                {addr.address_line2 && <>, {addr.address_line2}</>}
                {addr.landmark && <>, {addr.landmark}</>}
                <br />
                {addr.city}, {addr.state} {addr.pincode}
                <br />
                {addr.country}
              </div>
              <div className="ap-addr-phone">Phone number: {addr.phone}</div>

              <div className="ap-addr-actions">
                <button className="ap-action-btn" onClick={() => openEditForm(addr)}>Edit</button>
                <span className="ap-action-sep">|</span>
                <button
                  className="ap-action-btn"
                  onClick={() => handleDelete(addr)}
                  disabled={deletingId === addr.id}
                >
                  {deletingId === addr.id ? "Removing..." : "Remove"}
                </button>
                {!addr.is_default && (
                  <>
                    <span className="ap-action-sep">|</span>
                    <button className="ap-action-btn" onClick={() => handleSetDefault(addr)}>
                      Set as Default
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* -------------------------------------------------------
   AddressManager  –  inline widget used inside the cart
   (shows selected address + "Change" button that navigates
    to the /agent-addresses page)
------------------------------------------------------- */
function AddressManager({ userId, onAddressSelect, selectedAddress }) {
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/addresses/?user_id=${userId}`, { timeout: 10000 });
      const data = res.data.results || res.data || [];
      setSavedAddresses(data);
      if (!selectedAddress && data.length > 0) {
        const def = data.find(a => a.is_default) || data[0];
        onAddressSelect(def);
      }
    } catch { setSavedAddresses([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAddresses(); }, [userId]);

  // Re-sync selected address if it was changed on the address page
  useEffect(() => {
    const handleFocus = () => fetchAddresses();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const formatAddress = (addr) => {
    if (!addr) return "";
    return [addr.address_line1, addr.address_line2, addr.landmark, addr.city, addr.state, addr.pincode, addr.country]
      .filter(Boolean).join(", ");
  };

  const handleChangeAddress = () => {
    // Store current path so we can come back
    localStorage.setItem('addressReturnPath', window.location.pathname);
    navigate('/agent-addresses');
  };

  return (
    <div className="am-selected-box" onClick={handleChangeAddress}>
      <div className="am-selected-icon">
        <FaMapMarkerAlt />
      </div>
      <div className="am-selected-info">
        {loading ? (
          <div className="am-selected-name">Loading addresses...</div>
        ) : selectedAddress ? (
          <>
            <div className="am-selected-name">
              {selectedAddress.full_name}
              {selectedAddress.is_default && <span className="am-default-badge">Default</span>}
            </div>
            <div className="am-selected-addr">{formatAddress(selectedAddress)}</div>
            <div className="am-selected-phone">{selectedAddress.phone}</div>
          </>
        ) : (
          <div className="am-selected-name am-no-address">
            Click to add a delivery address
          </div>
        )}
      </div>
      <button className="am-change-btn" onClick={e => { e.stopPropagation(); handleChangeAddress(); }}>
        {selectedAddress ? "Change" : "Add"}
      </button>
    </div>
  );
}

export default AddressManager;