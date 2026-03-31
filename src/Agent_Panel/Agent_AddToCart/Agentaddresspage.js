import React from "react";
import AgentNavbar from "../../Agent_Panel/Agent_Navbar/Agent_Navbar";
import { AddressPage } from "./AddressManager";
import "./AddressManager.css";

/**
 * Route component: /agent-addresses
 *
 * Renders the full Amazon-style "Your Addresses" page.
 * Register this in your router like:
 *   <Route path="/agent-addresses" element={<AgentAddressPage />} />
 */
function AgentAddressPage() {
  return (
    <>
      <AgentNavbar />
      <AddressPage />
    </>
  );
}

export default AgentAddressPage;