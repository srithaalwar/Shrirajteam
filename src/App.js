// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebHome from "./WebHome/WebHome";
import WebsiteNavbar from "./WebsiteNavbar/WebsiteNavbar";
import SubCategories from "./SubCategories/SubCategories";
import ProductDetails from "./ProductDetails/ProductDetails"
import Products from "./Products_Main_page/Products";
import Properties from "./Properties_Main_Page/Properties";
import PropertyDetails from "./Properties_Main_Page/PropertyDetails";
import Login from "./Login/new/Login";
import LoginWithEmail from "./Login/LoginWithEmail";
import ForgotPassword from "./Login/ForgotPassword";
import Contact from "./ContacUs/Contact";
import AboutUs from './AboutUs/AboutUs'
import Register from "./Register/Register";
import VerifyOTP from "./Login/VerifyOTP";

import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import FAQAccordion from "./FAQs/FAQ";
import RefundPolicy from "./RefundPolicy/RefundPolicy";
import TermsAndConditions from "./Terms&Conditions/TermsAndConditions";
import Add_Property from './Admin_Panel/AddProperties/Add_Property';

import AdminDashboard from "./Admin_Panel/Dashboard/Dashboard";
import AdminLayout from "./AdminSidebar/AdminLayout";
import PropertiesList from './Admin_Panel/Properties/PropertiesList';

import AgentDashboard from './Agent_Panel/Dashboard/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
                <Route path="/admin" element={<AdminLayout />}/>

        <Route path="/" element={<WebHome />} />
        <Route path="/webhome" element={<WebHome />} />
        <Route path="/category/:id" element={<SubCategories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/properties" element={<Properties />} />
                <Route path="/property/:propertyId" element={<PropertyDetails />} />

<Route path="/w-productdetails" element={<ProductDetails/>} />
<Route path="/w-category/:id" element={<SubCategories />} />
  <Route path="/login" element={<Login />} />
        <Route path="/loginwithemail" element={<LoginWithEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register/>} />
         <Route path="/contact_us" element={<Contact/>} />
                  <Route path="/about_us" element={<AboutUs/>} />

<Route path="/verify-otp" element={<VerifyOTP />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/terms-and-conditions" element={<TermsAndConditions />} />


<Route path="/faqs" element={<FAQAccordion />} />
<Route path="/add-property" element={<Add_Property />} />

<Route path="/a-dashboard" element={<AdminDashboard />} />
<Route path="/a-properties" element={<PropertiesList />} />

<Route path="/agent-dashboard" element={<AgentDashboard />} />





      </Routes>
    </BrowserRouter>
  );
}

export default App;
