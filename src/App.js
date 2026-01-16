// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebHome from "./WebHome/WebHome";
import WebsiteNavbar from "./WebsiteNavbar/WebsiteNavbar";
import SubCategories from "./SubCategories/SubCategories";
import ProductDetails from "./ProductDetails/ProductDetails"
import Products from "./Products_Main_page/Products";
import ShopHeader from "./Products_Main_page/ShopHeader";
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
import ElectronicAndMobilesCarousel from "./ElectronicAndMobilesCarousel/Carousel";
import ClothingAndGarmentsCarousel from "./ClothingAndGarmentsCarousel/Carousel";
import GroceryAndKiranamCarousel from "./GroceryAndKiranamCarousel/Carousel";
import FootWearCarousel from "./FootWearCarousel/Carousel";

import AdminDashboard from "./Admin_Panel/Dashboard/Dashboard";
import AdminLayout from "./AdminSidebar/AdminLayout";
import AdminProducts from './Admin_Panel/Products/Products'
import PropertiesList from './Admin_Panel/Properties/PropertiesList';
import PropertyEditForm from './Admin_Panel/Properties/PropertyEditForm';

import AgentDashboard from './Agent_Panel/AgentDashboard/Dashboard'
import AgentAddProperty from './Agent_Panel/AddProperty/Add_Property'
import AgentProperties from './Agent_Panel/AgentProperties/PropertiesList'
import AgentMyProperty from './Agent_Panel/MyProperties/MyProperties'
import AgentMyPropertyEditForm from "./Agent_Panel/MyProperties/MyPropertiesEditForm"

import ClientDashboard from './Client_Panel/Dashboard/Dashboard'
import ClientAddPropertyForm from "./Client_Panel/ClientAddProperty/Add_Property";
import ClientProperties from './Client_Panel/ClientProperties/PropertiesList';
import ClientMyProperty from './Client_Panel/MyProperties/MyProperties';
import ClientMyPropertyEditForm from './Client_Panel/MyProperties/MyPropertiesEditForm';


import StaffList from "./Admin_Panel/Users/Users";
import Company from "./Admin_Panel/Company/Company";
import Leads from "./Admin_Panel/Leads/Leads";

import AddBookingSlab from "./../src/Admin_Panel/BookingSlab/AddBookingSlab";
import BookingSlab from "./../src/Admin_Panel/BookingSlab/BookingSlab";
import EditBookingSlab from "./Admin_Panel/BookingSlab/EditBookingSlab";
import TableCategory from "./Admin_Panel/TableCategory/TableCategory";
import PropertyCategoryform from "./Admin_Panel/TableCategory/PropertyCategoryform";
import Category from "./Admin_Panel/TableCategory/Category";
import EditCategory from "./../src/Admin_Panel/TableCategory/EditCategory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLayout />} />

        <Route path="/" element={<WebHome />} />
        <Route path="/webhome" element={<WebHome />} />
        <Route path="/category/:id" element={<SubCategories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shop-header" element={< ShopHeader />} />
        <Route path="/a-products" element={<AdminProducts />} />


        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:propertyId" element={<PropertyDetails />} />

        {/* <Route path="/w-productdetails" element={<ProductDetails/>} /> */}
        <Route path="/product/:productId" element={<ProductDetails />} />
        {/* <Route path="/w-subcategory/:id" element={<SubCategories />} /> */}
        <Route path="/w-subcategory/:id" element={<SubCategories />} />
        <Route path="/products/:id" element={<AdminProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginwithemail" element={<LoginWithEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact_us" element={<Contact />} />
        <Route path="/about_us" element={<AboutUs />} />

        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


        <Route path="/faqs" element={<FAQAccordion />} />

        {/* website-home */}
        <Route path="/Electronics-carousel" element={<ElectronicAndMobilesCarousel />} />
        <Route path="/Clothing-carousel" element={<ClothingAndGarmentsCarousel />} />
        <Route path="/Grocery-carousel" element={<GroceryAndKiranamCarousel />} />
        <Route path="/Footwear-carousel" element={<FootWearCarousel />} />



        {/* Admin-panel */}
        <Route path="/admin-add-property" element={<Add_Property />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-properties" element={<PropertiesList />} />
        {/* <Route path="/a-edit-form" element={<PropertyEditForm />} /> */}
                <Route path="/edit-property/:property_id" element={<PropertyEditForm />} />

        <Route path="/a-bookingslab" element={<BookingSlab />} />
        <Route path="/a-add-booking-slab" element={<AddBookingSlab />} />
        <Route path="/a-edit-booking-slab/:id" element={<EditBookingSlab />} />

        <Route path="/tablecategory" element={<TableCategory />} />
        <Route path="/propertycategoryform" element={<PropertyCategoryform />} />
        <Route path="/a-category" element={<Category />} />
         <Route path="/editcategory/:id" element={<EditCategory />} />
     
        {/* Agent-panel */}

        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/agent-add-property" element={<AgentAddProperty />} />
        <Route path="/agent-properties" element={<AgentProperties />} />

        <Route path="/agent-my-properties" element={<AgentMyProperty />} />
         <Route path="/myproperties/edit/:property_id" element={<AgentMyPropertyEditForm />} />


            {/* Client-panel */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-add-property-form" element={<ClientAddPropertyForm />} />
        <Route path="/client-Properties" element={<ClientProperties />} />
        <Route path="/client-my-properties" element={<ClientMyProperty />} />
         <Route path="/clientmyproperties/edit/:property_id" element={<ClientMyPropertyEditForm />} />

        <Route path="/a-users" element={<StaffList />} />
        <Route path="/a-company" element={<Company />} />
        <Route path="/a-leads" element={<Leads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
