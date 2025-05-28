import {
    Box,
    Heading,
    Text,
    Spinner,
    Stack,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
  } from "@chakra-ui/react";
  import { useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  function PromptDetail() {
    const { id } = useParams();
    const [prompt, setPrompt] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    useEffect(() => {
      fetch("http://localhost:3001/transactions")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((p) => p.id === id);
          setPrompt(found);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch prompt", err);
          setLoading(false);
        });
    }, [id]);
  
    const handlePurchase = async () => {
      const res = await fetch("http://localhost:3001/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: prompt.amount }), // amount in cents
      });
  
      const data = await res.json();
      const stripe = await import("@stripe/stripe-js").then((m) =>
        m.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
      );
      const result = await stripe.redirectToCheckout({
        clientReferenceId: prompt.id,
        lineItems: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: prompt.title,
                description: prompt.description,
              },
              unit_amount: prompt.amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: window.location.origin,
        cancelUrl: window.location.href,
      });
  
      if (result.error) {
        console.error(result.error.message);
      }
    };
  
    if (loading) return <Spinner size="xl" />;
  
    return (
      <Box p={8}>
        <Stack spacing={4}>
          <Heading>{prompt.title}</Heading>
          <Text fontSize="md">{prompt.description}</Text>
          <Text fontWeight="bold">Category: {prompt.category}</Text>
          <Text fontWeight="bold">Price: ${prompt.amount / 100}</Text>
          <Text>BTC Impact: {prompt.BTCImpact}</Text>
  
          <Button onClick={onOpen} colorScheme="blue">
            Buy Prompt
          </Button>
        </Stack>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Your Purchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb={3}>{prompt.title}</Text>
              <Text>Price: ${prompt.amount / 100}</Text>
              <Text fontSize="sm" color="gray.500">
                This purchase is non-refundable.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handlePurchase} colorScheme="green" mr={3}>
                Confirm & Pay
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
  
  export default PromptDetail;
  