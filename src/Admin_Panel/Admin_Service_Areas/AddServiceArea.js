import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Admin_Navbar/Admin_Navbar";
import { baseurl } from "../../BaseURL/BaseURL";
import { Country, State, City } from "country-state-city";
import "bootstrap/dist/css/bootstrap.min.css";

const AddServiceArea = () => {
  const [formData, setFormData] = useState({
    area_name: "",
    city: "",
    state: "",
    country: "IN",
    pincode: "",
    latitude: "",
    longitude: "",
    is_active: true
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load countries when component mounts
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (formData.country) {
      const statesOfCountry = State.getStatesOfCountry(formData.country);
      setStates(statesOfCountry);
      
      // Reset state and city when country changes
      setFormData(prev => ({
        ...prev,
        state: '',
        city: ''
      }));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.country]);

  // Load cities when state changes
  useEffect(() => {
    if (formData.country && formData.state) {
      const citiesOfState = City.getCitiesOfState(formData.country, formData.state);
      setCities(citiesOfState);
      
      // Reset city when state changes
      setFormData(prev => ({
        ...prev,
        city: ''
      }));
    } else {
      setCities([]);
    }
  }, [formData.country, formData.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const validateForm = () => {
    if (!formData.area_name) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Area name is required",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (!formData.country) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Country is required",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (!formData.state) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "State is required",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (!formData.city) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "City is required",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (!formData.pincode) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Pincode is required",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Pincode must be 6 digits",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (formData.latitude && (formData.latitude < -90 || formData.latitude > 90)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Latitude must be between -90 and 90",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    if (formData.longitude && (formData.longitude < -180 || formData.longitude > 180)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Longitude must be between -180 and 180",
        confirmButtonColor: "#273c75",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Get full country name from country code
      const selectedCountry = countries.find(c => c.isoCode === formData.country);
      const countryName = selectedCountry ? selectedCountry.name : formData.country;
      
      // Get full state name from state code
      const selectedState = states.find(s => s.isoCode === formData.state);
      const stateName = selectedState ? selectedState.name : formData.state;
      
      // Prepare payload - convert latitude and longitude to numbers
      const payload = {
        area_name: formData.area_name,
        city: formData.city,
        state: stateName,
        country: countryName,
        pincode: formData.pincode,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        is_active: formData.is_active
      };

      console.log("Submitting payload:", payload);

      await axios.post(`${baseurl}/service-areas/`, payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Service area added successfully",
        confirmButtonColor: "#273c75",
        confirmButtonText: "OK",
      }).then(() => navigate("/admin-service-areas"));
    } catch (error) {
      console.error("Error submitting form:", error);

      let errorMessage = "Failed to add service area";
      if (error.response?.data?.area_name) {
        errorMessage = "Area name already exists";
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data?.pincode) {
        errorMessage = "Invalid pincode format";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#273c75",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">
        <div className="card p-4">
          <h4 className="text-center mb-4">Add Service Area</h4>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Area Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Area Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="area_name"
                  value={formData.area_name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter area name (e.g., Tambaram)"
                  required
                  disabled={loading}
                />
              </div>

              {/* Country */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Country <span className="text-danger">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  State <span className="text-danger">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading || !formData.country}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  City <span className="text-danger">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={loading || !formData.state}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pincode */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Pincode <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  pattern="\d{6}"
                  required
                  disabled={loading}
                />
              </div>

              {/* Latitude */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Latitude</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter latitude (e.g., 12.9249)"
                  disabled={loading}
                />
                <small className="text-muted">Optional: Between -90 and 90</small>
              </div>

              {/* Longitude */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Longitude</label>
                <input
                  type="number"
                  step="any"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter longitude (e.g., 80.1000)"
                  disabled={loading}
                />
                <small className="text-muted">Optional: Between -180 and 180</small>
              </div>

              {/* Active Status */}
              <div className="col-md-12 mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="form-check-input"
                    id="isActive"
                    disabled={loading}
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active (Service area will be available for bookings)
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin-service-areas")}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#273c75",
                      borderColor: "#273c75",
                      color: "white",
                      minWidth: "180px",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Service Area"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddServiceArea;