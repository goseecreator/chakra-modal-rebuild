import { Box, Heading, Text, VStack, Badge, Button } from "@chakra-ui/react";

const PromptCard = ({ title, description, category, price }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={5} shadow="md">
      <VStack align="start" spacing={3}>
        <Heading size="md">{title}</Heading>
        <Text fontSize="sm">{description}</Text>
        <Badge colorScheme="teal">{category}</Badge>
        <Text fontWeight="bold">${price}</Text>
        <Button colorScheme="blue" size="sm">Buy</Button>
      </VStack>
    </Box>
  );
};

export default PromptCard;
