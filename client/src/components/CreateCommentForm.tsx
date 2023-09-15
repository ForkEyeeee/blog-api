import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Textarea,
  Divider,
  AbsoluteCenter,
  Button,
  Flex,
} from "@chakra-ui/react";
import parseJwt from "../hooks/parseJWT";
import validateToken from "../hooks/validateToken";

const CreateCommentForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const location = `https://blog-api-backend-iosn.onrender.com/api${
    useLocation().pathname
  }`;
  const data = parseJwt(token);
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    try {
      const response = await fetch(location, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {data && isExpiredUser && (
        <Box>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4" fontWeight={"medium"}>
              Add Comment
            </AbsoluteCenter>
          </Box>
          <form onSubmit={handleSubmit}>
            <Flex justifyContent={"center"}>
              <Textarea
                name="comment"
                placeholder="Enter a new comment"
                maxW={"75%"}
              />
            </Flex>
            <Flex justifyContent="center">
              <Button
                colorScheme="teal"
                variant="ghost"
                mt={5}
                mb={5}
                type="submit"
              >
                Submit
              </Button>{" "}
            </Flex>
          </form>
        </Box>
      )}
    </>
  );
};

export default CreateCommentForm;
