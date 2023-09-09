import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
const Post = () => {
  const [message, setMessage] = useState([]);
  const location = useLocation().pathname;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5173/api${location}`);
        // console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const text = await response.text();
        // console.log(text);
        const data = JSON.parse(text);
        setMessage(data.message);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <VStack>
        <Text fontSize="3xl">{message.title}</Text>
        <Text fontSize={"2xl"}>{message.content}</Text>
      </VStack>
    </Box>
  );
};

export default Post;
