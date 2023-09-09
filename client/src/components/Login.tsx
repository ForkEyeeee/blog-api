import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import useDataFetching from "../hooks/useDataFetching";
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
  return (
    <Box>
      {/* {data && (
        <>
          <Text>{data.message}</Text>
        </>
      )} */}
      <form method="POST" action="/api/session/new">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="Enter in email format"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Login;
