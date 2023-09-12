import { Box, HStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import parseJwt from "../hooks/parseJWT";
import validateToken from "../hooks/validateToken";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  useEffect(() => {
    if (!isExpiredUser && parsedToken) {
      localStorage.removeItem("jwt");
      navigate("/");
    }
  }, [isExpiredUser, navigate, parsedToken]);

  return (
    <Box>
      <>
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
            </ChakraLink>
            <ChakraLink as={ReactRouterLink} to={`/Aboutus`}>
              About Us
            </ChakraLink>
            {parsedToken === undefined &&
            !isExpiredUser &&
            isExpiredUser === undefined ? (
              <>
                <ChakraLink as={ReactRouterLink} to={`/users/new`}>
                  SignUp
                </ChakraLink>
                <ChakraLink as={ReactRouterLink} to={`/session/new`}>
                  Login
                </ChakraLink>
              </>
            ) : (
              <Box
                onClick={() => {
                  localStorage.removeItem("jwt");
                  navigate("/");
                }}
              >
                Logout
              </Box>
            )}
          </HStack>
        </Box>
      </>
    </Box>
  );
};

export default NavBar;
