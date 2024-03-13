import React, { useState } from "react";
import { Box, Heading, VStack, Input, IconButton, HStack, Text, useToast, Container, UnorderedList, ListItem, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("black", "white");

  const handleInputChange = (event) => setInputValue(event.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <HStack justifyContent="space-between" width="100%">
          <Heading pb={2}>Todo App</Heading>
          <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} variant="outline" aria-label="Toggle color mode" />
        </HStack>
        <HStack as="form" onSubmit={(e) => e.preventDefault()} width="100%">
          <Input placeholder="Add a new task" value={inputValue} onChange={handleInputChange} variant="filled" bgColor={bgColor} color={color} />
          <IconButton icon={<FaPlus />} onClick={handleAddTodo} variant="outline" aria-label="Add todo" />
        </HStack>
        <Box width="100%" bgColor={bgColor} p={4} borderRadius="md">
          <UnorderedList styleType="none" m={0}>
            {todos.map((todo, index) => (
              <ListItem key={index} p={2}>
                <HStack justifyContent="space-between">
                  <Text>{todo}</Text>
                  <Button leftIcon={<FaTrash />} onClick={() => handleDeleteTodo(index)} variant="ghost" colorScheme="red" size="sm">
                    Delete
                  </Button>
                </HStack>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
