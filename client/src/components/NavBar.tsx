import { Box, HStack, Badge, Text, Image, Flex } from "@chakra-ui/react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
const NavBar = () => {
  return (
    <Box
      // bgGradient="linear(to-r, blue.400, blue.600)"
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
        <Text>About</Text>
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
