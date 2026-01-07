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
import Login from "./Login/Login";
import LoginWithEmail from "./Login/LoginWithEmail";
import ForgotPassword from "./Login/ForgotPassword";
import Contact from "./ContacUs/Contact";
import AboutUs from './AboutUs/AboutUs'
import Register from "./Register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
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


      </Routes>
    </BrowserRouter>
  );
}

export default App;
