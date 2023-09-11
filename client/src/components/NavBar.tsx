import { Box, HStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box
      pb={10}
      bg="gray"
      fontFamily={"inter"}
      fontSize={16}
      textTransform={"capitalize"}
    >
      <HStack justifyContent="flex-end">
        <ChakraLink as={ReactRouterLink} to={`/`}>
          Home
        </ChakraLink>{" "}
        <ChakraLink as={ReactRouterLink} to={`/Aboutus`}>
          About Us
        </ChakraLink>{" "}
        <ChakraLink as={ReactRouterLink} to={`/users/new`}>
          SignUp
        </ChakraLink>{" "}
        <ChakraLink as={ReactRouterLink} to={`/session/new`}>
          Login
        </ChakraLink>{" "}
      </HStack>
    </Box>
  );
};

export default NavBar;
