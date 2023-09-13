import { useState, useRef } from "react";
import CommentProps from "../types/commentProps";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
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
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";

const Comment = ({ comment }: { comment: CommentProps }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const refContainer = useRef(null);
  const toast = useToast();

  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  const handleEditMode = () => {
    setIsEditMode(prevIsEdit => !prevIsEdit);
  };

  const handleVisibleMode = () => {
    setIsVisible(false);
  };

  const handleInputOnChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userComment = formData.get("user_comment");
    try {
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
      } else {
        handleEditMode();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    toast({
      title: "Saved.",
      description: "Comment successfully saved.",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "bottom",
    });
  };

  const handleDelete = async e => {
    e.preventDefault();
    const formData = new FormData(refContainer.current);
    const userComment = formData.get("user_comment");
    try {
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
      } else {
        handleEditMode();
        handleVisibleMode();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isVisible && (
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
                        <RiDeleteBin5Line
                          onClick={handleDelete}
                          size="xs"
                          colorScheme="red"
                          variant="outline"
                        />
                        <FcCancel
                          onClick={handleEditMode}
                          size="xs"
                          colorScheme="red"
                          variant="outline"
                        />
                        <Button
                          type="submit"
                          colorScheme="green"
                          variant="ghost"
                          size="sm"
                          onClick={handleSave}
                        >
                          Save
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
