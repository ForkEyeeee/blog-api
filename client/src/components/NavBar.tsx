// @ts-nocheck
import { Box, HStack, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import parseJwt from "./utils/parseJWT";
import validateToken from "./utils/validateToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { Divider } from "@chakra-ui/react";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const location = `${import.meta.env.VITE_ENDPOINT$}${useLocation().pathname}`;
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (!isExpiredUser && parsedToken) {
      localStorage.removeItem("jwt");
      navigate("/");
    }
  }, [isExpiredUser, navigate, parsedToken]);

  useEffect(() => {
    setCurrentTab(location);
  }, [location]);

  return (
    <Box>
      <>
        <Box
          p={2}
          pt={5}
          bg="white"
          fontFamily={"inter"}
          fontSize={16}
          textTransform={"capitalize"}
        >
          <HStack justifyContent="space-around">
            <ChakraLink as={ReactRouterLink} to={`/`} fontWeight={"bold"}>
              <HStack>
                <AiFillHome />
              </HStack>
            </ChakraLink>
            <ChakraLink
              as={ReactRouterLink}
              to={`/Aboutus`}
              textDecor={
                currentTab ===
                  "https://blog-api-backend-iosn.onrender.com/api/Aboutus" &&
                "underline"
              }
            >
              About Us
            </ChakraLink>
            {parsedToken === undefined &&
            !isExpiredUser &&
            isExpiredUser === undefined ? (
              <>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/users/new`}
                  textDecor={
                    currentTab ===
                      "https://blog-api-backend-iosn.onrender.com/api/users/new" &&
                    "underline"
                  }
                >
                  Sign Up
                </ChakraLink>
                <ChakraLink
                  as={ReactRouterLink}
                  to={`/session/new`}
                  textDecor={
                    currentTab ===
                      "https://blog-api-backend-iosn.onrender.com/api/session/new" &&
                    "underline"
                  }
                >
                  Login
                </ChakraLink>
              </>
            ) : (
              <ChakraLink
                onClick={() => {
                  localStorage.removeItem("jwt");
                  navigate(0);
                }}
              >
                Logout
              </ChakraLink>
            )}
          </HStack>
        </Box>
      </>
      <Flex justifyContent={"center"}>
        <Divider pt={5} width={"50%"} />
      </Flex>
    </Box>
  );
};

export default NavBar;
