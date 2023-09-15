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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("/api/users/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("jwt", data.token);
      navigate("/");
    } else {
      setFormError(data.message);
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
            name="username"
            type="email"
            placeholder="Enter in email format"
            maxW={"85%"}
          />
        </FormControl>

        <FormControl
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          pt={10}
          pb={5}
        >
          {" "}
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Choose a password"
            maxW={"85%"}
          />
        </FormControl>
        <FormControl
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          pt={10}
          pb={5}
        >
          {" "}
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmpassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            maxW={"85%"}
          />
        </FormControl>
        <Text color="red">{formError && formError}</Text>
        <Flex justifyContent={"center"}>
          <Button colorScheme="teal" variant="ghost" type="submit">
            Create Account
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SignUp;
