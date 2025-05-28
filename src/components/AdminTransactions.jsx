import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const bg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading transactions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>💸 Transactions</Heading>

      {loading ? (
        <Spinner size="xl" />
      ) : transactions.length === 0 ? (
        <Text>No transactions found.</Text>
      ) : (
        <Box overflowX="auto" bg={bg} rounded="md" p={4}>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th isNumeric>Amount</Th>
                <Th>Currency</Th>
                <Th>Email</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((tx) => (
                <Tr key={tx.id}>
                  <Td>{tx.id}</Td>
                  <Td isNumeric>${(tx.amount / 100).toFixed(2)}</Td>
                  <Td>{tx.currency.toUpperCase()}</Td>
                  <Td>{tx.email}</Td>
                  <Td>{new Date(tx.created_at).toLocaleString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default AdminTransactions;
