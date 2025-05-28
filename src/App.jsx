import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Storefront from "./pages/Storefront";

function App() {
  return (
    <ChakraProvider>
      <Router basename="/chakra-modal-rebuild">
        <Routes>
          <Route path="/" element={<Storefront />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
