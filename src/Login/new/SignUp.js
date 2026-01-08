import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Swal from "sweetalert2";
import "./SignUp.css"; // We'll update this CSS file
import { baseurl } from "../../BaseURL/BaseURL";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const [acceptedTC, setAcceptedTC] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        role_ids: [],
        email: "",
        password: "",
        phone_number: "",
        date_of_birth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin_code: "",
        pan_number: "",
        aadhaar_number: "",
        kyc_status: "pending",
        account_holder_name: "",
        bank_name: "",
        branch_name: "",
        account_number: "",
        account_type: "",
        ifsc_code: "",
        nominee_reference_to: "",
        referral_id: "",
        referred_by: "",
        status: ""
    });

    const hiddenFields = [
        "aadhaar_number",
        "pan_number",
        "referral_id",
        "account_type",
        "image",
        "date_of_birth",
        "gender",
        "address",
        "city",
        "state",
        "country",
        "pin_code",
        "status",
        "pan_number",
        "aadhaar_number",
        "kyc_status",
        "account_holder_name",
        "bank_name",
        "branch_name",
        "account_number",
        "account_type",
        "ifsc_code",
        "nominee_reference_to",
        "referral_id",
        "referred_by",
    ];

    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [pancard, setPancard] = useState(null);
    const [aadhar, setAadhar] = useState(null);
    const [image, setImage] = useState(null);
    const [pancardName, setPancardName] = useState("");
    const [aadharName, setAadharName] = useState("");
    const [imageName, setImageName] = useState("");
    const [partnerUsers, setPartnerUsers] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [helplineNumber, setHelplineNumber] = useState("");
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        phone_number: ""
    });

    const [sponsorInfo, setSponsorInfo] = useState(null);
    const [sponsorError, setSponsorError] = useState('');
    const [loginLoading, setLoginLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const checkSponsorId = async (sponsorId) => {
        try {
            const response = await fetch(`${baseurl}/users/role/Agent/`);
            if (!response.ok) {
                throw new Error('Failed to fetch agents');
            }
            const agents = await response.json();

            const foundAgent = agents.find(agent => agent.referral_id === sponsorId);

            if (foundAgent) {
                setSponsorInfo(foundAgent);
                setSponsorError('');
            } else {
                setSponsorInfo(null);
                setSponsorError('Not Valid Sponsor ID');
            }
        } catch (error) {
            setSponsorInfo(null);
            setSponsorError('Error checking sponsor ID');
            console.error('Error checking sponsor ID:', error);
        }
    };

    useEffect(() => {
        if (formData.role_ids[0] === 2 && formData.referred_by) {
            const timer = setTimeout(() => {
                checkSponsorId(formData.referred_by);
            }, 500);

            return () => clearTimeout(timer);
        } else {
            setSponsorInfo(null);
            setSponsorError('');
        }
    }, [formData.referred_by, formData.role_ids]);

    useEffect(() => {
        fetch(`${baseurl}/roles/`)
            .then((res) => res.json())
            .then((data) => setRoles(data))
            .catch((err) => console.error("Error fetching roles:", err));

        fetch(`${baseurl}/users/`)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error("Error fetching users:", err));

        fetch(`${baseurl}/users/role/Partner/`)
            .then((res) => res.json())
            .then((data) => setPartnerUsers(data))
            .catch((err) => console.error("Error fetching partner users:", err));
    }, []);

    useEffect(() => {
        fetch(`${baseurl}/phonenumbers/`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0 && data[0].phone_number) {
                    setHelplineNumber(data[0].phone_number);
                }
            })
            .catch((err) => console.error("Error fetching helpline number:", err));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "role_ids") {
            setFormData({ ...formData, role_ids: [Number(e.target.value)] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleFileChange = (event, setFile, setFileName) => {
        const file = event.target.files[0];
        if (!file) return;
        setFile(file);
        setFileName(file.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({ email: "", phone_number: "" });

        const { email, phone_number } = formData;
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        if (!phone_number.trim()) newErrors.phone_number = "Phone number is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!acceptedTC) {
            Swal.fire({
                icon: "warning",
                title: "Terms & Conditions",
                text: "Please accept the Terms & Conditions and Privacy Policy",
                confirmButtonColor: "#3085d6"
            });
            return;
        }

        setLoading(true);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        if (pancard) formDataToSend.append("pan", pancard);
        if (aadhar) formDataToSend.append("aadhaar", aadhar);
        if (image) formDataToSend.append("image", image);

        try {
            const response = await fetch(`${baseurl}/users/`, {
                method: "POST",
                body: formDataToSend,
            });

            const responseData = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "User Registered",
                    text: "User registered successfully!",
                    confirmButtonColor: "#3085d6"
                }).then(() => {
                    setUsers([...users, responseData]);
                    navigate("/login");
                });
            } else {
                if (responseData.email) {
                    setErrors(prev => ({ ...prev, email: "Email already exists" }));
                }
                if (responseData.phone_number) {
                    setErrors(prev => ({ ...prev, phone_number: "Phone number already exists" }));
                }

                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: "Please check the form for errors.",
                    confirmButtonColor: "#d33"
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Error",
                text: "An error occurred while submitting the form.",
                confirmButtonColor: "#d33"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLoginClick = () => {
        setLoginLoading(true);
        setTimeout(() => {
            navigate("/login");
        }, 800);
    };

    const formatLabel = (key) => {
        return key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const visibleFields = Object.keys(formData).filter(
        key => !hiddenFields.includes(key) && key !== "role_ids"
    );

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <div className="signup-card">
                    <div className="signup-form-container">
                        <h3 className="text-center mb-4">Registration</h3>
                        
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row g-3">
                                {visibleFields.map((key) => (
                                    <div className="col-md-6" key={key}>
                                        <div className="form-group">
                                            <label htmlFor={key} className="form-label">
                                                {formatLabel(key)}
                                            </label>
                                            {key.includes("password") ? (
                                                <div className="input-group">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                                        id={key}
                                                        name={key}
                                                        value={formData[key]}
                                                        onChange={handleChange}
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                    {errors[key] && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors[key]}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    <input
                                                        type={key.includes("date") ? "date" : "text"}
                                                        className={`form-control ${errors[key] ? 'is-invalid' : ''}`}
                                                        id={key}
                                                        name={key}
                                                        value={formData[key]}
                                                        onChange={handleChange}
                                                    />
                                                    {errors[key] && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors[key]}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="role_ids" className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            id="role_ids"
                                            name="role_ids"
                                            value={formData.role_ids[0] || ""}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            {roles
                                                .filter((role) => role.role_name.toLowerCase() !== "admin")
                                                .map((role) => (
                                                    <option key={role.role_id} value={role.role_id}>
                                                        {role.role_name === "Agent"
                                                            ? "Team"
                                                            : role.role_name === "Client"
                                                                ? "User"
                                                                : role.role_name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                {roles.find(role => role.role_id === formData.role_ids[0])?.role_name === "Agent" && (
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="referred_by" className="form-label">Sponsor ID</label>
                                            <input
                                                type="text"
                                                className={`form-control ${sponsorError ? 'is-invalid' : ''}`}
                                                id="referred_by"
                                                name="referred_by"
                                                value={formData.referred_by}
                                                onChange={handleChange}
                                            />
                                            {sponsorError && (
                                                <div className="invalid-feedback d-block">
                                                    {sponsorError}
                                                </div>
                                            )}
                                            {sponsorInfo && (
                                                <div className="sponsor-info mt-2">
                                                    <small className="text-muted">
                                                        Sponsor: <strong>{sponsorInfo.first_name} {sponsorInfo.last_name}</strong>
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="acceptedTC"
                                    checked={acceptedTC}
                                    onChange={(e) => setAcceptedTC(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="acceptedTC">
                                    I agree to the{" "}
                                    <a href="/termsandconditions" target="_blank" className="text-decoration-none">
                                        Terms & Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a href="/privacypolicy" target="_blank" className="text-decoration-none">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <div className="helpline-number text-center mt-3">
                                <small className="text-muted">
                                    Helpline Number: {helplineNumber || "---"}
                                </small>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 mt-3 signup-btn"
                                disabled={!acceptedTC || loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Registering...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </button>

                            <div className="text-center mt-3">
                                <small className="me-2">Already registered?</small>
                                {loginLoading ? (
                                    <div className="d-inline-flex align-items-center ms-1">
                                        <div className="spinner-border spinner-border-sm text-primary me-1" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <small>Redirecting...</small>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={handleLoginClick}
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="signup-footer text-center mt-4">
                    <small className="text-white opacity-75">
                        © {new Date().getFullYear()} SHRIRAJ. All rights reserved. <br />
                        <RouterLink to="/termsandconditions" className="text-white text-decoration-underline mx-2">
                            Terms & Conditions
                        </RouterLink>
                        |
                        <RouterLink to="/privacypolicy" className="text-white text-decoration-underline mx-2">
                            Privacy Policy
                        </RouterLink>
                        |
                        <RouterLink to="/refundpolicy" className="text-white text-decoration-underline mx-2">
                            Refund Policy
                        </RouterLink>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default SignUp;