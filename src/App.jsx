import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Storefront from "./pages/Storefront";
import PromptDetail from "./pages/PromptDetail";


function App() {
  return (
    <ChakraProvider>
      <Router basename="/chakra-modal-rebuild">
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
