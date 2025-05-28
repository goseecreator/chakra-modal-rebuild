import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Input,
  Textarea,
  Select,
  Button,
  useToast
} from "@chakra-ui/react";

export default function AdminPage({ onAddPrompt }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Tech");
  const [price, setPrice] = useState("$5");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPrompt = {
      title,
      description,
      category,
      price,
      btcImpact: "0.00047", // Placeholder
    };

    onAddPrompt(newPrompt);

    toast({
      title: "Prompt added.",
      description: `${title} was added successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setTitle("");
    setDescription("");
    setCategory("Tech");
    setPrice("$5");
  };

  return (
    <Box maxW="md" mx="auto" p={6}>
      <Heading mb={6}>Admin: Add New Prompt</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Prompt title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Prompt description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Tech">Tech</option>
            <option value="Healing">Healing</option>
            <option value="Web3">Web3</option>
          </Select>
          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button colorScheme="purple" type="submit">
            Add Prompt
          </Button>
        </VStack>
      </form>

    </Box>
  );
}
