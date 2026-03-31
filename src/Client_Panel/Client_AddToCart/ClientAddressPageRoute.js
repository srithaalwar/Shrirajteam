import React from "react";
import ClientNavbar from "../../Client_Panel/Client_Navbar/Client_Navbar";
import { ClientAddressPage } from "./ClientAddressManager";
import "./AddressManager.css";

/**
 * Route component: /client-addresses
 *
 * Renders the full Amazon-style "Your Addresses" page for clients.
 * Register this in your router like:
 *   <Route path="/client-addresses" element={<ClientAddressPageRoute />} />
 */
function ClientAddressPageRoute() {
  return (
    <>
      <ClientNavbar />
      <ClientAddressPage />
    </>
  );
}

export default ClientAddressPageRoute;