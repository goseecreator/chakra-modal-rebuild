
import React, { useState } from "react";
import {
  Box, Heading, Text, VStack, SimpleGrid, Input, Select, useColorModeValue, useDisclosure, useToast
} from "@chakra-ui/react";
import PromptCard from "./components/PromptCard";
import PaginationControls from "./components/PaginationControls";
import PurchaseModal from "./components/PurchaseModal";

// TODO: Replace with your actual data and constants
// import { prompts, PROMPTS_PER_PAGE } from "../data/prompts";
const prompts = [
  {
    title: "Prompt One",
    description: "A sample prompt for debugging.",
    category: "Tech",
    price: "$5",
    btcImpact: "0.00047"
  }
];
const PROMPTS_PER_PAGE = 6;

function BitBloomPromptStore() {
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const filteredPrompts = prompts.filter(p =>
    (category === "All" || p.category === category) &&
    (p.title + p.description).toLowerCase().includes(filter.toLowerCase())
  );
  console.log("Filtered Prompts:", filteredPrompts);

  const paginatedPrompts = filteredPrompts.slice((currentPage - 1) * PROMPTS_PER_PAGE, currentPage * PROMPTS_PER_PAGE);
  const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);

  const handleBuy = (prompt) => {
    setSelectedPrompt(prompt);
    onOpen();
  };

  const confirmPurchase = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/buy-prompt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: selectedPrompt.title, userEmail: userEmail || "anonymous" }),
      });
      if (!res.ok) throw new Error("Purchase failed");

      setShowThankYou(true);
      toast({
        title: "Purchase Complete",
        description: `You purchased ${selectedPrompt.title}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to record purchase.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUserEmail("");
    }
  };

  return (
    <Box p={6} maxW="6xl" mx="auto">
      <Heading mb={4} textAlign="center">BitBloom Prompt Store</Heading>
      <Text mb={4} textAlign="center" fontSize="lg">
        🌸 Every $5 prompt funds $0.47 in Bitcoin for a new soul.
      </Text>
      <Box mb={4} maxW="md" mx="auto">
        <Input
          placeholder="Search prompts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          mb={4}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Healing">Healing</option>
          <option value="Web3">Web3</option>
        </Select>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {paginatedPrompts.map((prompt, idx) => (
          <PromptCard
            key={idx}
            prompt={prompt}
            idx={idx}
            onBuy={handleBuy}
            bg={cardBg}
          />
        ))}
      </SimpleGrid>

      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <PurchaseModal
        isOpen={isOpen}
        onClose={onClose}
        selectedPrompt={selectedPrompt}
        showThankYou={showThankYou}
        setShowThankYou={setShowThankYou}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        onConfirm={confirmPurchase}
      />

    </Box>
    
  );
}
export default BitBloomPromptStore;
