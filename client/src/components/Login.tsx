import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { Box, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import useDataFetching from "../hooks/fetch";
import Comment from "./Comment";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch("/api/session/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const { data } = await response.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      navigate("/");

      // Handle redirect or other actions after a successful login
    } else {
      // Handle login failure, maybe set an error state and display it
      console.error("Login failed:", data.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter in email format"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Login;
