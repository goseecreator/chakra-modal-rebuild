import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BitBloomPromptStore from "./BitBloomPromptStore";
import AdminPage from "./Admin";

function App() {
  const [prompts, setPrompts] = useState([
    {
      title: "Prompt One",
      description: "A sample prompt for debugging.",
      category: "Tech",
      price: "$5",
      btcImpact: "0.00047"
    }
  ]);

  const addPrompt = (newPrompt) => {
    setPrompts((prev) => [...prev, newPrompt]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BitBloomPromptStore prompts={prompts} />} />
        <Route path="/admin" element={<AdminPage onAddPrompt={addPrompt} />} />
      </Routes>
    </Router>
  );
}

export default App;
