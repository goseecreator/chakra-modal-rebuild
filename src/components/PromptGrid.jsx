import { SimpleGrid } from "@chakra-ui/react";
import PromptCard from "./PromptCard";

const PromptGrid = ({ prompts }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
      {prompts.map((prompt, idx) => (
        <PromptCard key={idx} {...prompt} />
      ))}
    </SimpleGrid>
  );
};

export default PromptGrid;
