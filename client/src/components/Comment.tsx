// @ts-nocheck
import { useState, useRef } from "react";
import CommentProps from "../types/commentProps";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
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
} from "@chakra-ui/react";

const Comment = ({ comment }: { comment: CommentProps }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const refContainer = useRef(null);
  const toast = useToast();

  const token = localStorage.getItem("jwt");
  const location = `https://blog-api-backend-iosn.onrender.com/api${
    useLocation().pathname
  }`;
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);

  const handleEditMode = () => {
    setIsEditMode(prevIsEdit => !prevIsEdit);
    setInputText(comment.content);
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
        setInputText(inputText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = () => {
    inputText !== "" &&
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
        toast({
          title: "Deleted.",
          description: "Comment successfully deleted.",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "bottom",
        });
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
                  <HStack
                    justifyContent={"flex-start"}
                    gap={{ base: "5", md: "10" }}
                  >
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
                          variant="outline"
                          color="red"
                        />
                        <GiCancel onClick={handleEditMode} variant="outline" />
                        <Button
                          type="submit"
                          colorScheme="green"
                          variant="ghost"
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
                    size="lg"
                    variant="flushed"
                    name="user_comment"
                    onChange={handleInputOnChange}
                    defaultValue={comment.content}
                    required
                  />
                )}
              </VStack>
            </CardBody>
            <Divider orientation="horizontal" color={"gray.300"} />
          </form>
        </Card>
      )}
    </>
  );
};

export default Comment;
