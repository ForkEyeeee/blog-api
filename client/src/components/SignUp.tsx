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
const SignUp = () => {
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location);

  return (
    <Box>
      {/* {data && (
        <>
          <Text>{data.message}</Text>
        </>
      )} */}
      <form method="POST" action="/api/users/new">
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
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input name="confirmpassword" type="password" />
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default SignUp;
