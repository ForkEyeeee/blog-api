import CreateCommentFormProps from "../types/createCommentFormProps";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Textarea,
  Divider,
  AbsoluteCenter,
  Button,
} from "@chakra-ui/react";
import parseJwt from "../hooks/parseJWT";
import validateToken from "../hooks/validateToken";

const CreateCommentForm = ({ postid }: CreateCommentFormProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const data = parseJwt(token);
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  const handleSubmit = async e => {
    e.preventDefault();
    navigate(0);

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
      }

      // Handle success - maybe redirect or show a message
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);
  return (
    <>
      {data && isExpiredUser && (
        <Box>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              Add Comment
            </AbsoluteCenter>
          </Box>
          <form onSubmit={handleSubmit}>
            <Textarea
              name="comment"
              placeholder="Here is a sample placeholder"
            />
            <Button type="submit">Add</Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default CreateCommentForm;
