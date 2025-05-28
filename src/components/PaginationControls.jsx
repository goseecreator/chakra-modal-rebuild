
import { HStack, Button } from "@chakra-ui/react";

export default function PaginationControls({ totalPages, currentPage, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <HStack justifyContent="center" mt={8} spacing={4}>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          variant={currentPage === i + 1 ? "solid" : "outline"}
          colorScheme="purple"
        >
          {i + 1}
        </Button>
      ))}
    </HStack>
  );
}
