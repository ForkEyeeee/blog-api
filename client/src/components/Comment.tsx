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

const Comment = ({ comment }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => {
    setIsEditMode(() => !isEditMode);
  };
  return (
    <Card boxShadow={"lg"} borderRadius={5} pt={5} pb={5}>
      <CardBody>
        <VStack>
          <HStack minW={"100%"} gap={5} pl={2} justifyContent={"space-between"}>
            <HStack justifyContent={"flex-start"}>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ color: "#808080" }}
                size="3x"
              />
              <Text fontWeight={"bold"}>{comment.username}</Text>
            </HStack>
            {!isEditMode ? (
              <Box onClick={handleEditMode}>
                <EditIcon boxSize={6} />
              </Box>
            ) : (
              <HStack>
                <Button colorScheme="green" variant="ghost" size="sm">
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
            )}
          </HStack>
          <Flex justifyContent={"flex-end"} minW={"100%"}>
            {" "}
            <Text fontSize={"2xs"}>{comment.time}</Text>
          </Flex>
          {!isEditMode ? (
            <Text>{comment.content}</Text>
          ) : (
            <Input type="text" value={comment.content} />
          )}
        </VStack>
      </CardBody>
      <Divider orientation="horizontal" color={"gray"} />{" "}
    </Card>
  );
};

export default Comment;
