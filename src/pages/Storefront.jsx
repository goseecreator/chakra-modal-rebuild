import { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Container, Spinner, Text } from "@chakra-ui/react";
import PromptCard from "../components/PromptCard";

function Storefront() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch prompts", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxW="6xl" py={8}>
      <Heading mb={6}>BitBloom Storefront</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : prompts.length ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No prompts available yet.</Text>
      )}
    </Container>
  );
}

export default Storefront;
