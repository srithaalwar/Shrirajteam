import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../BaseURL/BaseURL";
import ClientNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import Swal from "sweetalert2";
import "./ClientEditProfile";

const ClientEditProfile = () => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("user_id"));
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    marital_status: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin_code: "",
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    account_type: "",
    ifsc_code: "",
    pan_number: "",
    aadhaar_number: "",
    nominee_relationship: "",
    nominee_reference_to: "",
    image: null,
    aadhaar_front: null,
    aadhaar_back: null,
    pan_front: null,
    pan_back: null,
    bank_passbook: null,
    cancelled_cheque: null,
    nominee_aadhaar_front: null,
    nominee_aadhaar_back: null,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const requiredFields = [
    "first_name", "last_name", "email", "phone_number", "date_of_birth",
    "gender", "marital_status", "address", "city", "state", "country", "pin_code",
    "account_holder_name", "bank_name", "branch_name", "account_number", "account_type", "ifsc_code",
    "pan_number", "aadhaar_number", "nominee_reference_to", "nominee_relationship"
  ];

  useEffect(() => {
    if (!userId) return;
    setCountries(Country.getAllCountries());
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseurl}/users/${userId}/`);
      const user = response.data;

      const toFileObject = (url) =>
        url ? { name: url.split("/").pop(), url, file: null } : null;

      const countryObj = Country.getCountryByCode(user.country) || 
                        Country.getAllCountries().find(c => c.name === user.country);
      const countryName = countryObj?.name || user.country;

      const stateObj = State.getStateByCodeAndCountry(user.state, user.country) || 
                      State.getStatesOfCountry(countryObj?.isoCode).find(s => s.name === user.state);
      const stateName = stateObj?.name || user.state;

      const statesArray = countryObj ? State.getStatesOfCountry(countryObj.isoCode) : [];
      const citiesArray = (countryObj && stateObj) ? 
                         City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode) : [];

      setStates(statesArray);
      setCities(citiesArray);

      setFormData({
        ...user,
        country: countryName,
        state: stateName,
        city: user.city || "",
        image: toFileObject(user.image),
        aadhaar_front: toFileObject(user.aadhaar_front),
        aadhaar_back: toFileObject(user.aadhaar_back),
        pan_front: toFileObject(user.pan_front),
        pan_back: toFileObject(user.pan_back),
        bank_passbook: toFileObject(user.bank_passbook),
        cancelled_cheque: toFileObject(user.cancelled_cheque),
        nominee_aadhaar_front: toFileObject(user.nominee_aadhaar_front),
        nominee_aadhaar_back: toFileObject(user.nominee_aadhaar_back),
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load user data",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        [name]: { file, url, name: file.name },
      }));
      setErrors(prev => ({ ...prev, [name]: "" }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setFormData({ ...formData, country: countryName, state: "", city: "" });

    const countryObj = countries.find(c => c.name === countryName);
    const statesArray = countryObj ? State.getStatesOfCountry(countryObj.isoCode) : [];
    setStates(statesArray);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setFormData({ ...formData, state: stateName, city: "" });

    const countryObj = countries.find(c => c.name === formData.country);
    const stateObj = states.find(s => s.name === stateName);
    const citiesArray = (countryObj && stateObj) ? 
                       City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode) : [];
    setCities(citiesArray);
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setFormData({ ...formData, city: cityName });
  };

  const handleRemove = (name) => {
    setFormData(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newErrors = {};
    let missingFields = [];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value || value === "") {
        newErrors[field] = "This field is required";
        missingFields.push(field.replace(/_/g, " ").toUpperCase());
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      
      Swal.fire({
        icon: "warning",
        title: "Missing Required Fields",
        html: "Please fill the following required fields:<br/><br/>" + 
              missingFields.join("<br/>"),
        confirmButtonColor: "#6C63FF",
      });
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (
        ["image", "aadhaar_front", "aadhaar_back", "pan_front", "pan_back", 
         "bank_passbook", "cancelled_cheque", "nominee_aadhaar_front", 
         "nominee_aadhaar_back"].includes(key)
      ) {
        if (value?.file instanceof File) {
          form.append(key, value.file);
        } else if (value?.url && !value?.file) {
          // If we have URL but no file (from server), don't send anything
        }
      } else {
        form.append(key, value);
      }
    });

    try {
      await axios.put(`${baseurl}/users/${userId}/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
        confirmButtonColor: "#6C63FF",
      }).then(() => {
        navigate("/p-profile");
      });
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.detail || "Failed to update profile",
        confirmButtonColor: "#6C63FF",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ClientNavbar />
      
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <div className="header-actions">
            <button 
              className="back-btn"
              onClick={() => navigate("/client-profile")}
            >
              ← Back
            </button>
          </div>
          <h2>Profile Edit</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`form-input ${errors.first_name ? 'error' : ''}`}
                    placeholder="Enter first name"
                  />
                  {errors.first_name && <div className="error-message">{errors.first_name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`form-input ${errors.last_name ? 'error' : ''}`}
                    placeholder="Enter last name"
                  />
                  {errors.last_name && <div className="error-message">{errors.last_name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter email"
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className={`form-input ${errors.phone_number ? 'error' : ''}`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone_number && <div className="error-message">{errors.phone_number}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className={`form-input ${errors.date_of_birth ? 'error' : ''}`}
                  />
                  {errors.date_of_birth && <div className="error-message">{errors.date_of_birth}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Gender <span className="required">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`form-input form-select ${errors.gender ? 'error' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <div className="error-message">{errors.gender}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Marital Status <span className="required">*</span>
                  </label>
                  <select
                    name="marital_status"
                    value={formData.marital_status}
                    onChange={handleChange}
                    className={`form-input form-select ${errors.marital_status ? 'error' : ''}`}
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  {errors.marital_status && <div className="error-message">{errors.marital_status}</div>}
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="form-section">
              <h3 className="section-title">Address Details</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">
                    Address <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="Enter full address"
                  />
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Country <span className="required">*</span>
                  </label>
                  <select
                    value={formData.country}
                    onChange={handleCountryChange}
                    className={`form-input form-select ${errors.country ? 'error' : ''}`}
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.isoCode} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <div className="error-message">{errors.country}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    State <span className="required">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={handleStateChange}
                    className={`form-input form-select ${errors.state ? 'error' : ''}`}
                    disabled={!states.length}
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.isoCode} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.state && <div className="error-message">{errors.state}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    City <span className="required">*</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={handleCityChange}
                    className={`form-input form-select ${errors.city ? 'error' : ''}`}
                    disabled={!cities.length}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Pin Code <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="pin_code"
                    value={formData.pin_code}
                    onChange={handleChange}
                    className={`form-input ${errors.pin_code ? 'error' : ''}`}
                    placeholder="Enter pin code"
                  />
                  {errors.pin_code && <div className="error-message">{errors.pin_code}</div>}
                </div>
              </div>
            </div>

            {/* Banking Details */}
            <div className="form-section">
              <h3 className="section-title">Banking Details</h3>
              <div className="form-grid">
                {[
                  { name: "account_holder_name", label: "Account Holder Name" },
                  { name: "bank_name", label: "Bank Name" },
                  { name: "branch_name", label: "Branch Name" },
                  { name: "account_number", label: "Account Number" },
                  { name: "ifsc_code", label: "IFSC Code" },
                ].map(({ name, label }) => (
                  <div className="form-group" key={name}>
                    <label className="form-label">
                      {label} <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className={`form-input ${errors[name] ? 'error' : ''}`}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    {errors[name] && <div className="error-message">{errors[name]}</div>}
                  </div>
                ))}

                <div className="form-group">
                  <label className="form-label">
                    Account Type <span className="required">*</span>
                  </label>
                  <select
                    name="account_type"
                    value={formData.account_type}
                    onChange={handleChange}
                    className={`form-input form-select ${errors.account_type ? 'error' : ''}`}
                  >
                    <option value="">Select Account Type</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                  </select>
                  {errors.account_type && <div className="error-message">{errors.account_type}</div>}
                </div>
              </div>
            </div>

            {/* KYC Verification */}
            <div className="form-section">
              <h3 className="section-title">KYC Verification</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    PAN Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="pan_number"
                    value={formData.pan_number}
                    onChange={handleChange}
                    className={`form-input ${errors.pan_number ? 'error' : ''}`}
                    placeholder="Enter PAN number"
                  />
                  {errors.pan_number && <div className="error-message">{errors.pan_number}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Aadhaar Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadhaar_number"
                    value={formData.aadhaar_number}
                    onChange={handleChange}
                    className={`form-input ${errors.aadhaar_number ? 'error' : ''}`}
                    placeholder="Enter Aadhaar number"
                  />
                  {errors.aadhaar_number && <div className="error-message">{errors.aadhaar_number}</div>}
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="form-section">
              <h3 className="section-title">Uploads</h3>
              <div className="form-grid">
                {[
                  { label: "Upload Image", name: "image" },
                  { label: "Aadhaar Front", name: "aadhaar_front" },
                  { label: "Aadhaar Back", name: "aadhaar_back" },
                  { label: "PAN Front", name: "pan_front" },
                  { label: "PAN Back", name: "pan_back" },
                  { label: "Bank Passbook", name: "bank_passbook" },
                  { label: "Cancelled Cheque", name: "cancelled_cheque" },
                ].map(({ label, name }) => (
                  <div className="form-group" key={name}>
                    <label className="form-label">
                      {label} <span className="required">*</span>
                    </label>
                    <div className="file-upload">
                      <input
                        type="file"
                        name={name}
                        id={name}
                        onChange={handleChange}
                        className="file-input"
                      />
                      <label htmlFor={name} className="file-label">
                        Choose File
                      </label>
                      {formData[name]?.name && (
                        <div className="file-info">
                          <span className="file-name">{formData[name].name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemove(name)}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                    {errors[name] && <div className="error-message">{errors[name]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Nominee Details */}
            <div className="form-section">
              <h3 className="section-title">Nominee Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Nominee Relationship <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="nominee_relationship"
                    value={formData.nominee_relationship}
                    onChange={handleChange}
                    className={`form-input ${errors.nominee_relationship ? 'error' : ''}`}
                    placeholder="Enter relationship"
                  />
                  {errors.nominee_relationship && <div className="error-message">{errors.nominee_relationship}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Nominee Reference To <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="nominee_reference_to"
                    value={formData.nominee_reference_to}
                    onChange={handleChange}
                    className={`form-input ${errors.nominee_reference_to ? 'error' : ''}`}
                    placeholder="Enter reference"
                  />
                  {errors.nominee_reference_to && <div className="error-message">{errors.nominee_reference_to}</div>}
                </div>
              </div>
            </div>

            {/* Nominee Uploads */}
            <div className="form-section">
              <h3 className="section-title">Nominee Uploads</h3>
              <div className="form-grid">
                {[
                  { label: "Nominee Aadhaar Front", name: "nominee_aadhaar_front" },
                  { label: "Nominee Aadhaar Back", name: "nominee_aadhaar_back" },
                ].map(({ label, name }) => (
                  <div className="form-group" key={name}>
                    <label className="form-label">
                      {label} <span className="required">*</span>
                    </label>
                    <div className="file-upload">
                      <input
                        type="file"
                        name={name}
                        id={`nominee_${name}`}
                        onChange={handleChange}
                        className="file-input"
                      />
                      <label htmlFor={`nominee_${name}`} className="file-label">
                        Choose File
                      </label>
                      {formData[name]?.name && (
                        <div className="file-info">
                          <span className="file-name">{formData[name].name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemove(name)}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                    {errors[name] && <div className="error-message">{errors[name]}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/client-profile")}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientEditProfile;