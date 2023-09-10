import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/fontawesome-free-solid";
import { EditIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/react";
import {
  Text,
  HStack,
  Card,
  CardBody,
  Flex,
  Box,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Comment = ({ comment }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  // useEffect(() => {

  //   data = ;
  //   return
  // }, [token]);
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  let data = parseJwt(token);

  const handleEditMode = () => {
    setIsEditMode(() => !isEditMode);
  };
  const handleInputOnChange = e => {
    setInputText(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    handleEditMode();
    const formData = new FormData(e.target);
    const userComment = formData.get("user_comment");
    // console.log(userComment);
    try {
      const response = await fetch(location, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userComment: userComment,
          commentId: comment._id,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Handle success - maybe redirect or show a message
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };
  return (
    <Card boxShadow={"lg"} borderRadius={5} pt={5} pb={5}>
      <form onSubmit={handleSubmit}>
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
              {data !== undefined ? (
                data.username !== comment.username ? undefined : !isEditMode ? (
                  <Box onClick={handleEditMode}>
                    <EditIcon boxSize={6} />
                  </Box>
                ) : (
                  <HStack>
                    <Button
                      // onClick={handleEditMode}
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
              {" "}
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
        <Divider orientation="horizontal" color={"gray"} />{" "}
      </form>
    </Card>
  );
};
export default Comment;
