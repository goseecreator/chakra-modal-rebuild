import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Box,
  Input,
  Button
} from "@chakra-ui/react";

function PurchaseModal({
  isOpen,
  onClose,
  selectedPrompt,
  showThankYou,
  setShowThankYou,
  userEmail,
  setUserEmail,
  onConfirm
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {showThankYou ? "Thank You!" : "Confirm Purchase"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showThankYou ? (
            <Text>Your prompt has been emailed to you. 🌸</Text>
          ) : (
            <Box>
              <Text><strong>Prompt:</strong> {selectedPrompt?.title}</Text>
              <Text><strong>Price:</strong> {selectedPrompt?.price}</Text>
              <Input
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => {
            setShowThankYou(false);
            onClose();
          }}>
            Close
          </Button>
          {!showThankYou && (
            <Button colorScheme="purple" onClick={onConfirm}>
              Confirm
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PurchaseModal;
