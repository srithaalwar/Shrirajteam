// src/components/AutoRedirect.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoRedirect = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Use user_id since your backend may not return a token
    const userId = localStorage.getItem("user_id");
    const roles = JSON.parse(localStorage.getItem("user_roles") || "[]");
    const referralId = localStorage.getItem("referral_id") || "";

    if (!userId) return; // Not logged in, stay on WebHome

    if (roles.length >= 1) {
      const role = roles[0];
      if (role === "Admin" || role === "Super Admin") navigate("/admin-dashboard");
      else if (role === "Agent") navigate("/agent-busineess-category");
      else if (role === "Client") navigate("/client-busineess-category");
    } else {
      // No roles — fallback to referral ID
      if (referralId.toUpperCase().startsWith("SRP")) navigate("/agent-dashboard");
      else if (referralId.toUpperCase().startsWith("SRT")) navigate("/Client-dashboard");
    }
  }, [navigate]);

  return children;
};

export default AutoRedirect;