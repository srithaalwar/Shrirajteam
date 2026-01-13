import React, { useState, useEffect } from 'react';
import "./Add_Property.css";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { baseurl } from '../../BaseURL/BaseURL';
import WebsiteNavbar from "../../Admin_Panel/Admin_Navbar/Admin_Navbar";


const AddPropertyForm = ({ user, mode = 'add' }) => {  
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('basic-details');
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [isViewing, setIsViewing] = useState(mode === 'view');
  const [loading, setLoading] = useState(mode !== 'add');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const referralId = localStorage.getItem('referral_id');
  const userId = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');
  const username = localStorage.getItem('user_name');

  const [propertyCategories, setPropertyCategories] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [showResidentialFields, setShowResidentialFields] = useState(false);
  const [showBuiltupArea, setShowBuiltupArea] = useState(true);

  const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [receivables, setReceivables] = useState(0);
    const [payables, setPayables] = useState(0);
    const [error, setError] = useState(null);

  // Define tabs matching the image layout
  const tabs = [
//     { id: 'information', label: 'Information' },
    { id: 'basic-details', label: 'Basic Details' },
    { id: 'location-details', label: 'Location Details' },
    { id: 'property-profile', label: 'Property Profile' },
    { id: 'media-upload', label: 'Media Upload' },
    { id: 'pricing-ownership', label: 'Pricing & Ownership' }
  ];

  // Error States
  const [errors, setErrors] = useState({});

  // Form State
  const [formData, setFormData] = useState({
    lookingTo: 'sell',
    category: '',
    propertyType: '',
    propertyTitle: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: 'IN',
    pinCode: '',
    latitude: '',
    longitude: '',
    plotArea: '',
    pricePerUnit: '',
    areaUnit: 'sq.ft.',
    length: '',
    breadth: '',
    numberOfFloors: 1,
    numberOfBedrooms: '',
    numberOfBalconies: '',
    numberOfBathrooms: '',
    floor: "",
    furnishing_status: "",
    openSides: 0,
    builtupArea: '',
    numberOfRoads: 0,
    roadWidth1: null,
    roadWidth2: null,
    facing: 'east',
    ownershipType: 'Freehold',
    price: '',
    maintenance: '',
    amenities: [],
    propertyUniqueness: '',
    locationAdvantages: '',
    otherFeatures: '',
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    isFeatured: false,
    images: [],
    videos: [],
    userId: userId,
    added_by: userId,
    role: null,
    agent_commission: "",
    files: [],
    preferred_tenants: '',
    rent_amount: '',
    deposit_amount: '',
    available_from: '',
    agreement_video: null,
    agreement_file: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, amenitiesRes] = await Promise.all([
          axios.get(`${baseurl}/property-categories/`),
          axios.get(`${baseurl}/amenities/`)
        ]);
        
        setPropertyCategories(categoriesRes.data.results || categoriesRes.data || []);
        
        let amenitiesData = amenitiesRes.data;
        if (amenitiesRes.data.results) {
          amenitiesData = amenitiesRes.data.results;
        }
        
        const formattedAmenities = Array.isArray(amenitiesData) 
          ? amenitiesData.map(amenity => ({
              ...amenity,
              amenity_id: parseInt(amenity.amenity_id) || amenity.amenity_id
            }))
          : [];
        setAmenities(formattedAmenities);

        if (id && mode !== 'add') {
          const response = await axios.get(`${baseurl}/property/${id}`);
          setFormData(response.data);
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
  }, [id, mode]);

  useEffect(() => {
    if (formData.category) {
      axios
        .get(`${baseurl}/property-types/category-id/${formData.category}/`)
        .then((response) => {
          const data = response.data.results || response.data;
          setPropertyTypes(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error('Error fetching property types:', error);
          setPropertyTypes([]);
        });
    } else {
      setPropertyTypes([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.propertyType && Array.isArray(propertyTypes)) {
      const selectedType = propertyTypes.find(type => type.property_type_id === formData.propertyType);
      if (selectedType) {
        const typeName = selectedType.name.toLowerCase();
        const shouldShowResidential = typeName.includes('flat') || typeName.includes('villa') ||
          typeName.includes('apartment') || typeName.includes('house');
        setShowResidentialFields(shouldShowResidential);
        const shouldShowBuiltupArea = !typeName.includes('plot');
        setShowBuiltupArea(shouldShowBuiltupArea);
      }
    }
  }, [formData.propertyType, propertyTypes]);

  useEffect(() => {
    if (formData.lookingTo === 'sell') {
      const price = parseFloat(formData.price) || 0;
      const commission = parseFloat(formData.agent_commission) || 0;
      const total = price + commission;
      setFormData(prev => ({
        ...prev,
        total_property_value: total
      }));
    }
  }, [formData.price, formData.agent_commission, formData.lookingTo]);

  const handleChange = (e) => {
    if (isViewing) return;
    
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };

      if (name === "pricePerUnit" || name === "plotArea") {
        const pricePerUnit = parseFloat(updated.pricePerUnit) || 0;
        const plotArea = parseFloat(updated.plotArea) || 0;
        updated.price = pricePerUnit * plotArea;
      }

      if (formData.lookingTo === 'sell') {
        const price = parseFloat(updated.price) || 0;
        const commission = parseFloat(updated.agent_commission) || 0;
        updated.total_property_value = price + commission;
      }

      return updated;
    });
  };
    const handleToggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const validateCurrentTab = () => {
    if (isViewing) return true;
    
    const newErrors = {};
    
    switch (activeTab) {
      case 'basic-details':
        if (!formData.propertyTitle?.trim()) newErrors.propertyTitle = 'Property Title is required';
        if (!formData.category) newErrors.category = 'Property Category is required';
        if (!formData.propertyType) newErrors.propertyType = 'Property Type is required';
        break;
        
      case 'location-details':
        if (!formData.address?.trim()) newErrors.address = 'Address is required';
        if (!formData.city?.trim()) newErrors.city = 'City is required';
        if (!formData.state?.trim()) newErrors.state = 'State is required';
        if (!formData.country?.trim()) newErrors.country = 'Country is required';
        break;
        
      case 'property-profile':
        if (!formData.areaUnit?.trim()) newErrors.areaUnit = 'Area Unit is required';
        if (!formData.plotArea || formData.plotArea <= 0) newErrors.plotArea = 'Valid Area is required';
        if (!formData.pricePerUnit || formData.pricePerUnit <= 0) newErrors.pricePerUnit = 'Valid Price Per Unit is required';
        if (!formData.length || formData.length <= 0) newErrors.length = 'Valid Length is required';
        if (!formData.breadth || formData.breadth <= 0) newErrors.breadth = 'Valid Breadth is required';
        if (showBuiltupArea && (!formData.builtupArea || formData.builtupArea <= 0)) {
          newErrors.builtupArea = 'Valid Built-up Area is required';
        }
        if (!formData.facing?.trim()) newErrors.facing = 'Facing Direction is required';
        if (!formData.ownershipType?.trim()) newErrors.ownershipType = 'Ownership Type is required';
        if (formData.openSides === null || formData.openSides === undefined || formData.openSides < 0) {
          newErrors.openSides = 'Valid Open Sides is required';
        }
        if (formData.numberOfRoads === null || formData.numberOfRoads === undefined || formData.numberOfRoads < 0) {
          newErrors.numberOfRoads = 'Valid Number of Roads is required';
        }
        break;
        
      case 'media-upload':
        if (formData.images.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Required Field',
            text: 'Please upload at least one property image',
            confirmButtonColor: '#3085d6',
          });
          return false;
        }
        break;
        
      case 'pricing-ownership':
        if (formData.lookingTo === 'sell') {
          if (!formData.price || formData.price <= 0) newErrors.price = 'Property Value is required';
          if (!formData.total_property_value || formData.total_property_value <= 0) newErrors.total_property_value = 'Total Property Value is required';
        } else {
          if (!formData.rent_amount || formData.rent_amount <= 0) newErrors.rent_amount = 'Rent Amount is required';
        }
        if (!formData.ownerName?.trim()) newErrors.ownerName = 'Owner Name is required';
        if (!formData.ownerContact?.trim()) newErrors.ownerContact = 'Owner Contact is required';
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

  const handleFileUpload = async (e, type) => {
    if (isViewing) return;
    
    const files = e.target.files;
    if (!files.length) return;

    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      file
    }));

    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles]
    }));
  };

  const removeFile = (index, type) => {
    if (isViewing) return;
    
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleAmenityChange = (amenityId) => {
    if (isViewing) return;
    
    setFormData(prev => {
      const numericId = parseInt(amenityId);
      const newAmenities = prev.amenities.includes(numericId)
        ? prev.amenities.filter(id => id !== numericId)
        : [...prev.amenities, numericId];
      return { ...prev, amenities: newAmenities };
    });
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
    const { type = 'text', name, label, required = true, options, multiline, rows, disabled = false, readOnly = false, ...props } = fieldConfig;
    
    if (isViewing) {
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

    if (type === 'checkbox') {
      return (
        <div className="mb-3 form-check">
          <input 
            type="checkbox" 
            name={name} 
            checked={formData[name] || false} 
            className="form-check-input" 
            onChange={handleChange} 
            disabled={disabled || isViewing}
            {...props}
          />
          <label className="form-check-label">{label}{required && '*'}</label>
          {renderError(name)}
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

  const renderAmenitiesField = () => {
    if (isViewing) {
      const selectedAmenities = Array.isArray(amenities) 
        ? amenities
            .filter(amenity => formData.amenities.includes(parseInt(amenity.amenity_id)))
            .map(amenity => amenity.name)
        : [];
      
      return (
        <div className="mb-3">
          <label className="customer-form-label view-mode-label">Amenities</label>
          <div className="view-mode-value">
            {selectedAmenities.length > 0 ? selectedAmenities.join(', ') : 'None'}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-3">
        <label className="customer-form-label">Amenities</label>
        <div className="amenities-checkbox-group">
          {Array.isArray(amenities) && amenities.map(amenity => (
            <div className="form-check form-check-inline" key={amenity.amenity_id}>
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={`amenity-${amenity.amenity_id}`}
                checked={formData.amenities.includes(parseInt(amenity.amenity_id))}
                onChange={() => handleAmenityChange(amenity.amenity_id)}
                disabled={isViewing}
              />
              <label className="form-check-label" htmlFor={`amenity-${amenity.amenity_id}`}>
                {amenity.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFileUploadField = (type, label, accept, required = false) => {
    if (isViewing) {
      const files = formData[type] || [];
      return (
        <div className="mb-3">
          <label className="customer-form-label view-mode-label">{label}</label>
          <div className="view-mode-value">
            {files.length > 0 ? (
              <div className="uploaded-files-view">
                {files.map((file, index) => (
                  <div key={index} className="file-item">{file.name}</div>
                ))}
              </div>
            ) : 'No files uploaded'}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-3">
        <label className="customer-form-label">{label}{required && '*'}</label>
        <div className="file-upload-container">
          <div className="input-group">
            <input
              id={`${type}-upload`}
              type="file"
              accept={accept}
              multiple={type !== 'agreement_video' && type !== 'agreement_file'}
              className="form-control"
              onChange={(e) => {
                if (type === 'agreement_video' || type === 'agreement_file') {
                  const file = e.target.files[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      [type]: {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        file: file
                      }
                    }));
                  }
                } else {
                  handleFileUpload(e, type);
                }
              }}
              disabled={isViewing}
            />
            <button 
              type="button"
              className="btn btn-outline-secondary media-upload-btn"
              onClick={() => document.getElementById(`${type}-upload`).click()}
              disabled={isViewing}
            >
              <i className="bi bi-upload me-1"></i> Upload
            </button>
          </div>
          <div className="uploaded-files mt-2">
            {formData[type] && (Array.isArray(formData[type]) ? formData[type] : [formData[type]]).map((file, index) => (
              file && (
                <div key={index} className="uploaded-file-item d-flex align-items-center justify-content-between">
                  <span className="file-name">{file.name}</span>
                  {!isViewing && (
                    <button 
                      type="button"
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => {
                        if (Array.isArray(formData[type])) {
                          removeFile(index, type);
                        } else {
                          setFormData(prev => ({ ...prev, [type]: null }));
                        }
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}
                </div>
              )
            ))}
          </div>
          {required && type === 'images' && formData.images.length === 0 && (
            <div className="invalid-feedback d-block">
              At least one image is required
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    if (loading) {
      return <div className="loading-spinner text-center py-5">Loading property data...</div>;
    }

    switch (activeTab) {
      case 'information':
        return (
          <div className="form-section">
            <h3 className="form-section-title">Information</h3>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'lookingTo',
                    label: 'Looking To',
                    options: [
                      { value: 'sell', label: 'Sell' },
                      { value: 'rent', label: 'Rent' }
                    ]
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'category',
                    label: 'Property Category',
                    options: Array.isArray(propertyCategories) 
                      ? propertyCategories.map(category => ({
                          value: category.property_category_id,
                          label: category.name
                        }))
                      : []
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'propertyType',
                    label: 'Property Type',
                    options: Array.isArray(propertyTypes) 
                      ? propertyTypes.map(type => ({
                          value: type.property_type_id,
                          label: type.name
                        }))
                      : [],
                    disabled: !formData.category
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'propertyTitle',
                    label: 'Property Title'
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
            </div>
          </div>
        );

      case 'basic-details':
        return (
          <div className="form-section">
            <h3 className="form-section-title">Basic Details</h3>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'lookingTo',
                    label: 'Looking To',
                    options: [
                      { value: 'sell', label: 'Sell' },
                      { value: 'rent', label: 'Rent' }
                    ]
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'category',
                    label: 'Property Category',
                    options: Array.isArray(propertyCategories) 
                      ? propertyCategories.map(category => ({
                          value: category.property_category_id,
                          label: category.name
                        }))
                      : []
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'propertyType',
                    label: 'Property Type',
                    options: Array.isArray(propertyTypes) 
                      ? propertyTypes.map(type => ({
                          value: type.property_type_id,
                          label: type.name
                        }))
                      : [],
                    disabled: !formData.category
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'propertyTitle',
                    label: 'Property Title'
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
            </div>
          </div>
        );

      case 'location-details':
        return (
          <div className="form-section">
            <h3 className="form-section-title">Location Details</h3>
            <div className="form-section-content">
              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'country',
                    label: 'Country',
                    options: [
                      { value: 'IN', label: 'India' },
                      { value: 'US', label: 'United States' },
                      { value: 'GB', label: 'United Kingdom' },
                      { value: 'CA', label: 'Canada' },
                      { value: 'AU', label: 'Australia' }
                    ]
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'state',
                    label: 'State',
                    required: true
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    name: 'city',
                    label: 'City',
                    required: true
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'pinCode',
                    label: 'Pin Code',
                    required: false
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {renderField({
                    type: 'textarea',
                    name: 'address',
                    label: 'Full Address',
                    rows: 3
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'property-profile':
        return (
          <div className="form-section">
            <h3 className="form-section-title">Property Profile</h3>
            <div className="form-section-content">
              {showResidentialFields && (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'numberOfFloors',
                        label: 'Number of Floors',
                        min: 1,
                        required: false
                      })}
                    </div>
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'numberOfBedrooms',
                        label: 'Number of Bedrooms',
                        min: 0,
                        required: false
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'numberOfBalconies',
                        label: 'Number of Balconies',
                        min: 0,
                        required: false
                      })}
                    </div>
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'numberOfBathrooms',
                        label: 'Number of Bathrooms',
                        min: 0,
                        required: false
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'floor',
                        label: 'Floor',
                        min: 0,
                        required: false
                      })}
                    </div>
                    <div className="col-md-6">
                      {renderField({
                        type: 'select',
                        name: 'furnishing_status',
                        label: 'Furnishing Status',
                        options: [
                          { value: '', label: 'Select' },
                          { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                          { value: 'Fully-Furnished', label: 'Fully-Furnished' },
                          { value: 'Unfurnished', label: 'Unfurnished' }
                        ],
                        required: false
                      })}
                    </div>
                  </div>
                </>
              )}

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'areaUnit',
                    label: 'Area Unit',
                    options: [
                      { value: 'sq.ft.', label: 'Square Feet' },
                      { value: 'sq.m.', label: 'Square Meters' },
                      { value: 'sq.yd.', label: 'Square Yards' },
                      { value: 'acres', label: 'Acres' },
                      { value: 'hectares', label: 'Hectares' },
                      { value: 'cents', label: 'Cents' }
                    ]
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'number',
                    name: 'plotArea',
                    label: 'Area',
                    step: '0.01',
                    min: 0
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'number',
                    name: 'pricePerUnit',
                    label: 'Price Per Unit',
                    step: '0.01',
                    min: 0
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'number',
                    name: 'length',
                    label: 'Length (ft)',
                    step: '0.01',
                    min: 0
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'number',
                    name: 'breadth',
                    label: 'Breadth (ft)',
                    step: '0.01',
                    min: 0
                  })}
                </div>
                {showBuiltupArea && (
                  <div className="col-md-6">
                    {renderField({
                      type: 'number',
                      name: 'builtupArea',
                      label: 'Built-up Area',
                      step: '0.01',
                      min: 0
                    })}
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'facing',
                    label: 'Facing Direction',
                    options: [
                      { value: 'east', label: 'East' },
                      { value: 'west', label: 'West' },
                      { value: 'north', label: 'North' },
                      { value: 'south', label: 'South' },
                      { value: 'north-east', label: 'North-East' },
                      { value: 'north-west', label: 'North-West' },
                      { value: 'south-east', label: 'South-East' },
                      { value: 'south-west', label: 'South-West' }
                    ]
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'select',
                    name: 'ownershipType',
                    label: 'Ownership Type',
                    options: [
                      { value: 'Freehold', label: 'Freehold' },
                      { value: 'Leasehold', label: 'Leasehold' },
                      { value: 'Cooperative', label: 'Cooperative' },
                      { value: 'Condominium', label: 'Condominium' }
                    ]
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'number',
                    name: 'openSides',
                    label: 'Number of Open Sides',
                    min: 0,
                    max: 4
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'number',
                    name: 'numberOfRoads',
                    label: 'Number of Roads',
                    min: 0,
                    max: 2
                  })}
                </div>
              </div>

              {formData.numberOfRoads >= 1 && (
                <div className="row">
                  <div className="col-md-6">
                    {renderField({
                      type: 'number',
                      name: 'roadWidth1',
                      label: 'Road 1 Width (ft)',
                      step: '0.01',
                      min: 0,
                      required: false
                    })}
                  </div>
                  {formData.numberOfRoads >= 2 && (
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'roadWidth2',
                        label: 'Road 2 Width (ft)',
                        step: '0.01',
                        min: 0,
                        required: false
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="row">
                <div className="col-6">
                  {renderField({
                    type: 'textarea',
                    name: 'propertyUniqueness',
                    label: 'Property Uniqueness',
                    rows: 3,
                    required: false
                  })}
                </div>
                     <div className="col-6">
                  {renderField({
                    type: 'textarea',
                    name: 'locationAdvantages',
                    label: 'Location Advantages',
                    rows: 3,
                    required: false
                  })}
                </div>

              </div>

          

              <div className="row">
                <div className="col-12">
                  {renderField({
                    type: 'textarea',
                    name: 'otherFeatures',
                    label: 'Other Features',
                    rows: 3,
                    required: false
                  })}
                </div>
              </div>

              {renderAmenitiesField()}
            </div>
          </div>
        );

      case 'media-upload':
        return (
          <div className="form-section">
            <h3 className="form-section-title">Media Upload</h3>
            <div className="form-section-content">
              <div className="row">
                <div className="col-12">
                  {renderFileUploadField('images', 'Property Images', 'image/*', true)}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {renderFileUploadField('videos', 'Property Videos', 'video/*', false)}
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  {renderFileUploadField('files', 'Property Documents', '.pdf,.doc,.docx,.xls,.xlsx,.txt', false)}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderFileUploadField('agreement_video', 'Agreement Video', 'video/*', false)}
                </div>
                <div className="col-md-6">
                  {renderFileUploadField('agreement_file', 'Agreement File', '.pdf,.doc,.docx,.xls,.xlsx,.txt', false)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'pricing-ownership':
        return (
          <div className="form-section">
            <h3 className="form-section-title">Pricing & Ownership</h3>
            <div className="form-section-content">
              {formData.lookingTo === 'sell' ? (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'price',
                        label: 'Property Value',
                        step: '0.01',
                        min: 0,
                        readOnly: true
                      })}
                    </div>
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'agent_commission',
                        label: 'Team Payout',
                        step: '0.01',
                        min: 0,
                        required: false
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      {renderField({
                        type: 'number',
                        name: 'total_property_value',
                        label: 'Total Property Value',
                        step: '0.01',
                        min: 0,
                        readOnly: true
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-6">
                      {renderField({
                        name: 'preferred_tenants',
                        label: 'Preferred Tenants',
                        required: false
                      })}
                    </div>
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'rent_amount',
                        label: 'Rent Amount',
                        step: '0.01',
                        min: 0
                      })}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {renderField({
                        type: 'number',
                        name: 'deposit_amount',
                        label: 'Deposit Amount',
                        step: '0.01',
                        min: 0,
                        required: false
                      })}
                    </div>
                    <div className="col-md-6">
                      {renderField({
                        type: 'date',
                        name: 'available_from',
                        label: 'Available From',
                        required: false
                      })}
                    </div>
                  </div>
                </>
              )}

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    name: 'ownerName',
                    label: 'Owner Name'
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    name: 'ownerContact',
                    label: 'Owner Contact (Phone)'
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {renderField({
                    type: 'email',
                    name: 'ownerEmail',
                    label: 'Owner Email',
                    required: false
                  })}
                </div>
                <div className="col-md-6">
                  {renderField({
                    type: 'checkbox',
                    name: 'isFeatured',
                    label: 'Mark as Featured',
                    required: false
                  })}
                </div>
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
      navigate('/a-dashboard');
      return;
    }

    let isValid = true;
    tabs.forEach(tab => {
      setActiveTab(tab.id);
      if (!validateCurrentTab()) {
        isValid = false;
      }
    });

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
      const payload = new FormData();

      const formFields = {
        looking_to: formData.lookingTo,
        property_title: formData.propertyTitle,
        description: formData.description || '',
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pin_code: formData.pinCode,
        latitude: formData.latitude || '12.120000',
        longitude: formData.longitude || '12.120000',
        area: formData.plotArea,
        area_unit: formData.areaUnit,
        price_per_unit: formData.pricePerUnit || '0.00',
        builtup_area: formData.builtupArea || '0.00',
        length_ft: formData.length || '0.00',
        breadth_ft: formData.breadth || '0.00',
        number_of_floors: formData.numberOfFloors,
        number_of_open_sides: formData.openSides,
        number_of_roads: formData.numberOfRoads,
        road_width_1_ft: formData.roadWidth1 || '0.00',
        road_width_2_ft: formData.roadWidth2 || '0.00',
        facing: formData.facing,
        ownership_type: formData.ownershipType,
        property_value: formData.price,
        property_uniqueness: formData.propertyUniqueness || '',
        location_advantages: formData.locationAdvantages || '',
        other_features: formData.otherFeatures || '',
        owner_name: formData.ownerName,
        owner_contact: formData.ownerContact,
        owner_email: formData.ownerEmail || '',
        is_featured: formData.isFeatured,
        category: formData.category,
        property_type: formData.propertyType,
        user_id: userId,
        referral_id: referralId,
        number_of_bedrooms: formData.numberOfBedrooms || 0,
        number_of_balconies: formData.numberOfBalconies || 0,
        number_of_bathrooms: formData.numberOfBathrooms || 0,
        floor: formData.floor || 0,
        furnishing_status: formData.furnishing_status || '',
        agent_commission: formData.agent_commission || '0.00',
        total_property_value: formData.total_property_value,
        username: username,
        preferred_tenants: formData.preferred_tenants || '',
        rent_amount: formData.rent_amount || '0.00',
        deposit_amount: formData.deposit_amount || '0.00',
        available_from: formData.available_from || '',
      };

      Object.entries(formFields).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      if (formData.amenities && formData.amenities.length > 0) {
        formData.amenities.forEach((id) => {
          payload.append("amenities", id.toString());
        });
      }

      formData.images.forEach((img) => {
        if (img.file) {
          payload.append('images', img.file, img.name);
        }
      });

      formData.videos.forEach((vid) => {
        if (vid.file) {
          payload.append('videos', vid.file, vid.name);
        }
      });

      formData.files.forEach((doc) => {
        if (doc.file) {
          payload.append('files', doc.file, doc.name);
        }
      });

      if (formData.agreement_video?.file) {
        payload.append('agreement_video', formData.agreement_video.file, formData.agreement_video.name);
      }

      if (formData.agreement_file?.file) {
        payload.append('agreement_file', formData.agreement_file.file, formData.agreement_file.name);
      }

      const endpoint = isEditing ? `${baseurl}/property/${id}/` : `${baseurl}/property/`;
      const method = isEditing ? 'put' : 'post';

      const response = await axios[method](endpoint, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: isEditing ? 'Property Updated Successfully!' : 'Property Added Successfully!',
        confirmButtonColor: '#3085d6',
      });
      navigate("/p-myassets");

    } catch (error) {
      console.error('Detailed submission error:', error);
      
      let errorMessage = isEditing ? 'Error updating property' : 'Error adding property';
      if (error.response?.data) {
        errorMessage += `: ${JSON.stringify(error.response.data)}`;
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
      case 'add': return "Add Property";
      case 'edit': return "Edit Property";
      case 'view': return "View Property";
      default: return "Property";
    }
  };

  return (

    <>
    <WebsiteNavbar/>

    <div className="container-fluid">

       

      <div className="row">
        <div className="col-12">
          <div className="property-form-container">
            <div className="form-header">
              <h2 className="form-title">{getTitle()}</h2>
              <div className="form-actions">
                {!isViewing && (
                  <>
                    <button 
                      type="button" 
                      className="btn btn-secondary me-2"
                      onClick={() => navigate('/p-myassets')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : (isEditing ? 'Update Property' : 'Add Property')}
                    </button>
                  </>
                )}
                {isViewing && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/p-myassets')}
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
                        {activeTab !== 'information' && (
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
                        {activeTab !== 'pricing-ownership' ? (
                          <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={isSubmitting}
                          >
                            Next <i className="bi bi-arrow-right ms-1"></i>
                          </button>
                        ) : (
                          <button 
                            type="button" 
                            className="btn btn-success"
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
                                {isEditing ? 'Update Property' : 'Add Property'}
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

export default AddPropertyForm;