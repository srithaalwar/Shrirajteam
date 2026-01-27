// // App.js
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import WebHome from "./WebHome/WebHome";
// import WebsiteNavbar from "./WebsiteNavbar/WebsiteNavbar";
// import SubCategories from "./SubCategories/SubCategories";
// import ProductDetails from "./ProductDetails/ProductDetails"
// import Products from "./Products_Main_page/Products";
// import ShopHeader from "./Products_Main_page/ShopHeader";
// import Properties from "./Properties_Main_Page/Properties";
// import PropertyDetails from "./Properties_Main_Page/PropertyDetails";
// import Login from "./Login/new/Login";
// import LoginWithEmail from "./Login/LoginWithEmail";
// import ForgotPassword from "./Login/ForgotPassword";
// import Contact from "./ContacUs/Contact";
// import AboutUs from './AboutUs/AboutUs'
// import Register from "./Register/Register";
// import VerifyOTP from "./Login/VerifyOTP";

// import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
// import FAQAccordion from "./FAQs/FAQ";
// import RefundPolicy from "./RefundPolicy/RefundPolicy";
// import TermsAndConditions from "./Terms&Conditions/TermsAndConditions";
// import Add_Property from './Admin_Panel/AddProperties/Add_Property';
// import ElectronicAndMobilesCarousel from "./ElectronicAndMobilesCarousel/Carousel";
// import ClothingAndGarmentsCarousel from "./ClothingAndGarmentsCarousel/Carousel";
// import GroceryAndKiranamCarousel from "./GroceryAndKiranamCarousel/Carousel";
// import FootWearCarousel from "./FootWearCarousel/Carousel";

// import AdminDashboard from "./Admin_Panel/Dashboard/Dashboard";
// import AdminLayout from "./AdminSidebar/AdminLayout";
// import AdminProducts from './Admin_Panel/Products/Products'
// import PropertiesList from './Admin_Panel/Properties/PropertiesList';
// import PropertyEditForm from './Admin_Panel/Properties/PropertyEditForm';
// import AdminProfile from "./Admin_Panel/Profile/AdminProfile";
// import AgentDashboard from './Agent_Panel/AgentDashboard/Dashboard'
// import AgentAddProperty from './Agent_Panel/AddProperty/Add_Property'
// import AgentProperties from './Agent_Panel/AgentProperties/PropertiesList'
// import AgentMyProperty from './Agent_Panel/MyProperties/MyProperties'
// import AgentMyPropertyEditForm from "./Agent_Panel/MyProperties/MyPropertiesEditForm"
// import AgentProfile from './Agent_Panel/AgentProfile/AgentProfile'
// import AgentEditProfile from "./Agent_Panel/AgentProfile/AgentEditProfile";
// import AgentAddBusinessForm from './Agent_Panel/AgentBusiness/AddBusiness'
// import AgentBusinesslist from './Agent_Panel/AgentMyBusiness/MyBusiness'

// import ClientDashboard from './Client_Panel/Dashboard/Dashboard'
// import ClientAddPropertyForm from "./Client_Panel/ClientAddProperty/Add_Property";
// import ClientProperties from './Client_Panel/ClientProperties/PropertiesList';
// import ClientMyProperty from './Client_Panel/MyProperties/MyProperties';
// import ClientMyPropertyEditForm from './Client_Panel/MyProperties/MyPropertiesEditForm';
// import ClientProfile from "./Client_Panel/ClientProfile/ClientProfile";
// import ClientEditProfile from "./Client_Panel/ClientProfile/ClientEditProfile";
// import StaffList from "./Admin_Panel/Users/Users";
// import Company from "./Admin_Panel/Company/Company";
// import Leads from "./Admin_Panel/Leads/Leads";

// import AddBookingSlab from "./../src/Admin_Panel/BookingSlab/AddBookingSlab";
// import BookingSlab from "./../src/Admin_Panel/BookingSlab/BookingSlab";
// import EditBookingSlab from "./Admin_Panel/BookingSlab/EditBookingSlab";
// import TableCategory from "./Admin_Panel/TableCategory/TableCategory";
// import PropertyCategoryform from "./Admin_Panel/TableCategory/PropertyCategoryform";
// import Category from "./Admin_Panel/TableCategory/Category";
// import EditCategory from "./../src/Admin_Panel/TableCategory/EditCategory";
// import Departments from "./../src/Admin_Panel/Departments/Departments";
// import AddDepartments from "./../src/Admin_Panel/Departments/AddDepartments";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/admin" element={<AdminLayout />} />

//         <Route path="/" element={<WebHome />} />
//         <Route path="/webhome" element={<WebHome />} />
//         <Route path="/category/:id" element={<SubCategories />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/shop-header" element={< ShopHeader />} />
//         <Route path="/a-products" element={<AdminProducts />} />


//         <Route path="/properties" element={<Properties />} />
//         <Route path="/property/:propertyId" element={<PropertyDetails />} />

//         {/* <Route path="/w-productdetails" element={<ProductDetails/>} /> */}
//         <Route path="/product/:productId" element={<ProductDetails />} />
//         {/* <Route path="/w-subcategory/:id" element={<SubCategories />} /> */}
//         <Route path="/w-subcategory/:id" element={<SubCategories />} />
//         <Route path="/products/:id" element={<AdminProducts />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/loginwithemail" element={<LoginWithEmail />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/contact_us" element={<Contact />} />
//         <Route path="/about_us" element={<AboutUs />} />

//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/refund-policy" element={<RefundPolicy />} />
//         <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


//         <Route path="/faqs" element={<FAQAccordion />} />

//         {/* website-home */}
//         <Route path="/Electronics-carousel" element={<ElectronicAndMobilesCarousel />} />
//         <Route path="/Clothing-carousel" element={<ClothingAndGarmentsCarousel />} />
//         <Route path="/Grocery-carousel" element={<GroceryAndKiranamCarousel />} />
//         <Route path="/Footwear-carousel" element={<FootWearCarousel />} />



//         {/* Admin-panel */}
//         <Route path="/admin-add-property" element={<Add_Property />} />

//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/admin-properties" element={<PropertiesList />} />
//         {/* <Route path="/a-edit-form" element={<PropertyEditForm />} /> */}
//                 <Route path="/edit-property/:property_id" element={<PropertyEditForm />} />

//         <Route path="/a-bookingslab" element={<BookingSlab />} />
//         <Route path="/a-add-booking-slab" element={<AddBookingSlab />} />
//         <Route path="/a-edit-booking-slab/:id" element={<EditBookingSlab />} />

//         <Route path="/tablecategory" element={<TableCategory />} />
//         <Route path="/propertycategoryform" element={<PropertyCategoryform />} />
//         <Route path="/a-category" element={<Category />} />
//          <Route path="/editcategory/:id" element={<EditCategory />} />
//           <Route path="/a-departments" element={<Departments />} />
//           <Route path="/adddepartment" element={<AddDepartments />} />
//                <Route path="/admin-profile" element={<AdminProfile />} />

//         {/* Agent-panel */}

//         <Route path="/agent-dashboard" element={<AgentDashboard />} />
//         <Route path="/agent-add-property" element={<AgentAddProperty />} />
//         <Route path="/agent-properties" element={<AgentProperties />} />

//         <Route path="/agent-my-properties" element={<AgentMyProperty />} />
//          <Route path="/myproperties/edit/:property_id" element={<AgentMyPropertyEditForm />} />
//         <Route path="/agent-profile" element={<AgentProfile />} />
//         <Route path="/agent-edit-profile" element={<AgentEditProfile />} />

//         <Route path="/agent-add-business-form" element={<AgentAddBusinessForm />} />
//         <Route path="/agent-my-business" element={<AgentBusinesslist />} />


//             {/* Client-panel */}
//         <Route path="/client-dashboard" element={<ClientDashboard />} />
//         <Route path="/client-add-property-form" element={<ClientAddPropertyForm />} />
//         <Route path="/client-Properties" element={<ClientProperties />} />
//         <Route path="/client-my-properties" element={<ClientMyProperty />} />
//          <Route path="/clientmyproperties/edit/:property_id" element={<ClientMyPropertyEditForm />} />
//         <Route path="/client-profile" element={<ClientProfile />} />
//          <Route path="/client-edit-profile" element={<ClientEditProfile />} />


//         <Route path="/a-users" element={<StaffList />} />
//         <Route path="/a-company" element={<Company />} />
//         <Route path="/a-leads" element={<Leads />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;






import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebHome from "./WebHome/WebHome";
import WebsiteNavbar from "./WebsiteNavbar/WebsiteNavbar";
import SubCategories from "./SubCategories/SubCategories";
import ProductDetails from "./ProductDetails/ProductDetails"
import MainProductDetails from "./Products_Main_page/Products"

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
import AdminProfile from "./Admin_Panel/Profile/AdminProfile";
import AdminAddTrainingMaterial from "./Admin_Panel/Admin_TrainingMaterial/AddTrainingMaterial";
import AdminTrainingMaterial from "./Admin_Panel/Admin_TrainingMaterial/TrainingMaterial";
import AdminEditTrainingMaterial from './Admin_Panel/Admin_TrainingMaterial/EditTrainingMaterial';
import AdminAddSubscription from "./Admin_Panel/Admin_Subscription/AddSubscription";
import AdminEditSubscription from "./Admin_Panel/Admin_Subscription/EditSubscription";
import AdminSubscription from "./Admin_Panel/Admin_Subscription/Subscription";
import SettingsMain from './Admin_Panel/Admin_Prefix/SettingsMain';
import ReferralPrefix from './Admin_Panel/Admin_Prefix/ReferralPrefix';
import AddReferralPrefix from './Admin_Panel/Admin_Prefix/AddReferralPrefix';
import EditReferralPrefix from './Admin_Panel/Admin_Prefix/EditReferralPrefix';
import CommissionLevels from './Admin_Panel/Admin_PayOut_Master/CommissionLevels';
import AddCommissionLevels from './Admin_Panel/Admin_PayOut_Master/AddCommissionLevels';
import EditCommissionLevels from './Admin_Panel/Admin_PayOut_Master/EditCommissionLevels';
import AdminBusiness from './Admin_Panel/Admin_Business/MyBusiness'
import Chatbot from "./Admin_Panel/Admin_ChatBot/ChatBot";
import CreateQA from "./Admin_Panel/Admin_ChatBot/CreateQA";
import EditQA from "./Admin_Panel/Admin_ChatBot/EditQA";
import AdminSitevisit from "./Admin_Panel/Admin_SiteVisits/SiteVisits";
import AdminEditSitevisit from "./Admin_Panel/Admin_SiteVisits/EditSitevisit";
import AdminBusinessProductsDetails from "./Admin_Panel/Admin_Business/Business_Products"


import AgentDashboard from './Agent_Panel/AgentDashboard/Dashboard'
import AgentAddProperty from './Agent_Panel/AgentAddProperty/Add_Property'
import AgentProperties from './Agent_Panel/AgentProperties/PropertiesList'
import AgentMyProperty from './Agent_Panel/MyProperties/MyProperties'
import AgentMyPropertyEditForm from "./Agent_Panel/MyProperties/MyPropertiesEditForm"
import AgentProfile from './Agent_Panel/AgentProfile/AgentProfile'
import AgentEditProfile from "./Agent_Panel/AgentProfile/AgentEditProfile";
import AgentAddBusinessForm from './Agent_Panel/AgentBusiness/AddBusiness'
import AgentBusinesslist from './Agent_Panel/AgentMyBusiness/MyBusiness'
import AgentbusinessCategory from './Agent_Panel/AgentBusinessProducts/AgentBusinessProductsCategories'
import AgentSubCategory from './Agent_Panel/AgentBusinessProducts/SubCategories'
import AgentProductDetails from './Agent_Panel/AgentBusinessProducts/ProductDetails/ProductDetails'
import AgentAddProductForm from './Agent_Panel/AgentAddProduct/AddProductForm'
import MyTeam from './Agent_Panel/Agent_MyTeam/MyTeam';
import Sitevisit from './Agent_Panel/Agent_SiteVisits/Site_Visits'
import AddSitevisit from './Agent_Panel/Agent_SiteVisits/Add_SiteVisitForm'
import EditSitevisit from './Agent_Panel/Agent_SiteVisits/Edit_SiteVisitForm'
import TrainingMaterial from "./Agent_Panel/Agent_TrainingMaterial/Training_Material";
import AgentMyProducts from "./Agent_Panel/Agent_My_Products/My_Products";
import AgentSubscriptionPlan from './Agent_Panel/Agent_SubscriptionPlan/Subcrptionplan';
import AgentBusinessProductsDetails from "./Agent_Panel/AgentMyBusiness/Business_Products"

import ClientDashboard from './Client_Panel/Client_Dashboard/Dashboard'
import ClientAddPropertyForm from "./Client_Panel/Client_AddProperty/Add_Property";
import ClientProperties from './Client_Panel/ClientProperties/PropertiesList';
import ClientMyProperty from './Client_Panel/MyProperties/MyProperties';
import ClientMyPropertyEditForm from './Client_Panel/MyProperties/MyPropertiesEditForm';
import ClientProfile from "./Client_Panel/ClientProfile/ClientProfile";
import ClientEditProfile from "./Client_Panel/ClientProfile/ClientEditProfile";
import ClientbusinessCategory from './Client_Panel/ClientBusinessProducts/ClientBusinessProductsCategories'
import ClientSubCategory from './Client_Panel/ClientBusinessProducts/SubCategories'
import ClientProductDetails from './Client_Panel/ClientBusinessProducts/ProductDetails/ProductDetails'
import ClientSubscriptionPlan from './Client_Panel/Client_SubscriptionPlan/Subcrptionplan';


import UserList from "./Admin_Panel/Users/Users";
import EditUser from "./Admin_Panel/Users/EditUsers";
import ViewUser from "./Admin_Panel/Users/ViewUser";
import Company from "./Admin_Panel/Company/Company";
import Leads from "./Admin_Panel/Leads/Leads";

import AddBookingSlab from "./../src/Admin_Panel/BookingSlab/AddBookingSlab";
import BookingSlab from "./../src/Admin_Panel/BookingSlab/BookingSlab";
import EditBookingSlab from "./Admin_Panel/BookingSlab/EditBookingSlab";
import TableCategory from "./Admin_Panel/TableCategory/TableCategory";
import PropertyCategoryform from "./Admin_Panel/TableCategory/PropertyCategoryform";
import Category from "./Admin_Panel/TableCategory/Category";
import EditCategory from "./../src/Admin_Panel/TableCategory/EditCategory";
import Departments from "./../src/Admin_Panel/Departments/Departments";
import AddDepartments from "./../src/Admin_Panel/Departments/AddDepartments";

// Import the Business List component
import BusinessList from './Agent_Panel/AgentMyBusiness/MyBusiness';
// Import the AddBusinessForm component
import AddBusinessForm from './Agent_Panel/AgentBusiness/AddBusiness';

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

        <Route path="/w-productdetails" element={<MainProductDetails/>} />
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
        <Route path="/a-departments" element={<Departments />} />
        <Route path="/adddepartment" element={<AddDepartments />} />
        <Route path="/admin-profile" element={<AdminProfile />} />

       <Route path="/admin-trainingmaterial" element={<AdminTrainingMaterial />} />
        <Route path="/admin-addtrainingmaterial" element={<AdminAddTrainingMaterial />} />
       <Route path="/admin-edittrainingmaterial" element={<AdminEditTrainingMaterial />} />

        <Route path="/admin-subscriptions" element={<AdminSubscription />} />
          <Route path="/admin-addsubscriptions" element={<AdminAddSubscription />} />
          <Route path="/admin-edit-subscription/:id" element={<AdminEditSubscription />} />

            <Route path="/a-settings" element={<SettingsMain />} />
        <Route path="/referral-prefix" element={<ReferralPrefix />} />
        <Route path="/add-referral-prefix" element={<AddReferralPrefix />} />
        <Route path="/edit-referral-prefix/:id" element={<EditReferralPrefix />} />

          <Route path="/admin-commissionmaster" element={<CommissionLevels />} />
          <Route path="/admin-add-commissionmaster" element={<AddCommissionLevels />} />
          <Route path="/admin-edit-commissionmaster/:id" element={<EditCommissionLevels />} />
           <Route path="/admin-business" element={<AdminBusiness />} />
           <Route path="/admin-my-products" element={<AdminBusinessProductsDetails />} />



           <Route path="/admin-chatbot" element={<Chatbot />} />
           <Route path="/admin-createq&a" element={<CreateQA />} />
           <Route path="/admin-editqa/:id" element={<EditQA />} />

            <Route path="/admin-sitevisit" element={<AdminSitevisit />} />
          <Route path="/admin-admiteditsite/:id" element={<AdminEditSitevisit />} />


        {/* Agent-panel */}

        <Route path="/agent-dashboard" element={<AgentDashboard />} />
        <Route path="/agent-add-property" element={<AgentAddProperty />} />
        <Route path="/agent-properties" element={<AgentProperties />} />

        <Route path="/agent-my-properties" element={<AgentMyProperty />} />
        <Route path="/myproperties/edit/:property_id" element={<AgentMyPropertyEditForm />} />
        <Route path="/agent-profile" element={<AgentProfile />} />
        <Route path="/agent-edit-profile" element={<AgentEditProfile />} />

        {/* Business Routes - Updated to use the new components */}
        <Route path="/agent-add-business-form" element={<AgentAddBusinessForm />} />
        <Route path="/agent-my-business" element={<AgentBusinesslist />} />
        <Route path="/agent-subscription-plan" element={<AgentSubscriptionPlan />} />

        {/* New Business Routes for general use */}
        <Route path="/businesses" element={<BusinessList />} />
        <Route path="/add-business" element={<AddBusinessForm mode="add" />} />
        <Route path="/edit-business/:id" element={<AddBusinessForm mode="edit" />} />
        <Route path="/view-business/:id" element={<AddBusinessForm mode="view" />} />
        <Route path="/agent-busineess-category" element={<AgentbusinessCategory />} />
        <Route path="/agent-subcategory/:id" element={<AgentSubCategory />} />
       <Route path="/agent-business-product-details/:productId" element={<AgentProductDetails />} />
        <Route path="/agent-add-product-form" element={<AgentAddProductForm />} />

        <Route path="/agent-my-team" element={<MyTeam />} />

         <Route path="/agent-site-visits" element={<Sitevisit />} />
          <Route path="/agent-addsitevisit" element={<AddSitevisit />} />
          <Route path="/agent-editsitevisit/:id" element={<EditSitevisit />} />
          <Route path="/agent-training-material" element={<TrainingMaterial />} />
          <Route path="/agent-my-products" element={<AgentMyProducts />} />
            {/* <Route path="/agent-my-business-products/" element={<AgentBusinessProductsDetails />} /> */}
            <Route path="/my-products" element={<AgentBusinessProductsDetails />} />




        {/* Client-panel */}
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/client-add-property-form" element={<ClientAddPropertyForm />} />
        <Route path="/client-Properties" element={<ClientProperties />} />
        <Route path="/client-my-properties" element={<ClientMyProperty />} />
        <Route path="/clientmyproperties/edit/:property_id" element={<ClientMyPropertyEditForm />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/client-edit-profile" element={<ClientEditProfile />} />
         <Route path="/client-busineess-category" element={<ClientbusinessCategory />} />
        <Route path="/client-subcategory/:id" element={<ClientSubCategory />} />
        <Route path="/client-business-product-details/:productId" element={<ClientProductDetails />} />
        <Route path="/client-subscription-plan" element={<ClientSubscriptionPlan />} />

        <Route path="/admin-users" element={<UserList />} />
          <Route path="/admin-view-user/:id" element={<ViewUser />} />
        <Route path="/admin-edit-user/:id" element={<EditUser />} />
        <Route path="/a-company" element={<Company />} />
        <Route path="/a-leads" element={<Leads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;