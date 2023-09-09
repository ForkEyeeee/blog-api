import { Box, HStack, Badge, Text, Image, Flex } from "@chakra-ui/react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
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
        <Text>Home</Text>
        <Text>About</Text>
        <Text>Login</Text>
      </HStack>
    </Box>
  );
};

export default NavBar;
