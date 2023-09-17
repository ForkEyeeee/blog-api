import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_ENDPOINT}/session/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const { data, success, message } = await response.json();
    if (success) {
      localStorage.setItem("jwt", data.token);
      navigate("/");
    } else {
      setFormError(message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          pt={5}
        >
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter in email format"
            maxW={"85%"}
            required
          />
        </FormControl>
        <FormControl
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          pt={5}
        >
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            maxW={"85%"}
            required
          />
        </FormControl>
        <Text color={"red"}>{formError && formError}</Text>
        <Flex justifyContent={"center"}>
          <Button colorScheme="teal" variant="ghost" mt={10} type="submit">
            Login
          </Button>
        </Flex>{" "}
      </form>
    </Box>
  );
};

export default Login;
