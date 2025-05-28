import { Box, Heading, Text, Stack, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function PromptCard({ prompt }) {
  return (
    <Link to={`/prompt/${prompt.id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={5}
        shadow="md"
        _hover={{ shadow: "lg", transform: "scale(1.02)" }}
        transition="all 0.2s"
      >
        <Stack spacing={3}>
          <Heading size="md">{prompt.title}</Heading>
          <Text fontSize="sm" color="gray.600">
            {prompt.description}
          </Text>
          <Badge colorScheme="purple">{prompt.category}</Badge>
          <Text fontWeight="bold">{prompt.price}</Text>
        </Stack>
      </Box>
    </Link>
  );
}

export default PromptCard;
