// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WebHome from "./WebHome/WebHome";
import WebsiteNavbar from "./WebsiteNavbar/WebsiteNavbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteNavbar />} />
        <Route path="/webhome" element={<WebHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
