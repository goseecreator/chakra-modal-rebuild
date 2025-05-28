// src/components/Header.jsx
import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => (
  <Flex as="header" p={4} bg="teal.500" color="white" align="center">
    <Heading size="md">BitBloom</Heading>
    <Spacer />
    <Button as={Link} to="/" variant="ghost" color="white">Home</Button>
    <Button as={Link} to="/admin" variant="ghost" color="white">Admin</Button>
  </Flex>
);

export default Header;
