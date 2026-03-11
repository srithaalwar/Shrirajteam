// src/components/GuestRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const navigate = useNavigate();

useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const roles = JSON.parse(localStorage.getItem("user_roles") || "[]");
    const referralId = localStorage.getItem("referral_id") || "";

    if (!userId) return; // Not logged in, show login page normally

    if (roles.length >= 1) {
      const role = roles[0];
      if (role === "Admin" || role === "Super Admin") navigate("/admin-dashboard");
      else if (role === "Agent") navigate("/agent-busineess-category");
      else if (role === "Client") navigate("/client-busineess-category");
    } else {
      if (referralId.toUpperCase().startsWith("SRP")) navigate("/agent-dashboard");
      else if (referralId.toUpperCase().startsWith("SRT")) navigate("/Client-dashboard");
    }
  }, [navigate]);

  return children;
};

export default GuestRoute;