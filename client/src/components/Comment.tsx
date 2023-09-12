import { useState, useRef } from "react";
import CommentProps from "../types/commentProps";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import parseJwt from "../hooks/parseJWT";
import validateToken from "../hooks/validateToken";
import { EditIcon } from "@chakra-ui/icons";
import {
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Flex,
  Box,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";

const Comment = ({ comment }: { comment: CommentProps }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [visible, setVisible] = useState(true);

  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);
  const refContainer = useRef(null);
  console.log(refContainer.current);

  const handleEditMode = () => {
    setIsEditMode(() => !isEditMode);
  };

  const handleVisibleMode = () => {
    setVisible(prev => !prev);
  };

  const handleInputOnChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    handleVisibleMode();

    const formData = new FormData(e.target);
    const userComment = formData.get("user_comment");
    try {
      handleEditMode();
      const response = await fetch(location, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userComment: userComment,
          commentId: comment._id,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    console.log("delete pressed");
    const formData = new FormData(refContainer.current);
    const userComment = formData.get("user_comment");
    console.log(userComment);
    try {
      handleEditMode();
      const response = await fetch(location, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userComment: userComment,
          commentId: comment._id,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {visible && (
        <Card boxShadow={"lg"} borderRadius={5} pt={5} pb={5}>
          <form onSubmit={handleSubmit} ref={refContainer}>
            <CardBody>
              <VStack>
                <HStack
                  minW={"100%"}
                  gap={5}
                  pl={2}
                  justifyContent={"space-between"}
                >
                  <HStack justifyContent={"flex-start"}>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      style={{ color: "#808080" }}
                      size="3x"
                    />
                    <Text fontWeight={"bold"}>{comment.username}</Text>
                  </HStack>
                  {parsedToken !== undefined && isExpiredUser ? (
                    parsedToken.username !==
                    comment.username ? undefined : !isEditMode ? (
                      <Box onClick={handleEditMode}>
                        <EditIcon boxSize={6} />
                      </Box>
                    ) : (
                      <HStack>
                        <Button
                          onClick={handleDelete}
                          size="xs"
                          colorScheme="red"
                          variant="outline"
                        >
                          Delete
                        </Button>
                        <Button
                          type="submit"
                          colorScheme="green"
                          variant="ghost"
                          size="sm"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleEditMode}
                          size="xs"
                          colorScheme="red"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </HStack>
                    )
                  ) : null}
                </HStack>
                <Flex justifyContent={"flex-end"} minW={"100%"}>
                  <Text fontSize={"2xs"}>{comment.time}</Text>
                </Flex>
                {!isEditMode ? (
                  <Text>{inputText === "" ? comment.content : inputText}</Text>
                ) : (
                  <Input
                    type="text"
                    name="user_comment"
                    onChange={handleInputOnChange}
                    value={inputText === "" ? comment.content : inputText}
                  />
                )}
              </VStack>
            </CardBody>
            <Divider orientation="horizontal" color={"gray"} />
          </form>
        </Card>
      )}
    </>
  );
};

export default Comment;
