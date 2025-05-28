import { Box, Text, Heading, VStack, Button, useColorModeValue } from "@chakra-ui/react";

export default function PromptCard({ prompt, onBuy }) {
  const cardBg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={border}
      borderRadius="md"
      p={5}
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "md", transform: "scale(1.01)" }}
    >
      <VStack align="start" spacing={3}>
        <Heading size="md" noOfLines={2}>
          {prompt.title}
        </Heading>
        <Text noOfLines={3}>{prompt.description}</Text>
        <Text fontSize="sm" color="gray.500">
          Category: {prompt.category}
        </Text>
        <Text fontWeight="bold" color="purple.500">
          {prompt.price}
        </Text>
        <Button
          size="sm"
          colorScheme="purple"
          alignSelf="stretch"
          onClick={() => onBuy(prompt)}
        >
          Buy Prompt
        </Button>
      </VStack>
    </Box>
  );
}
