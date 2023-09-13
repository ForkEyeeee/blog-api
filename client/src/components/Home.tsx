import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Center,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import CardItem from "./CardItem";
import useDataFetching from "../hooks/useDataFetching";

const Home = () => {
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location);

  if (loading)
    return (
      <Center p={10}>
        <HStack spacing={5}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Loading...</Text>
        </HStack>
      </Center>
    );

  return (
    <Box>
      {data && (
        <>
          <Flex justifyContent={"center"}>
            <Heading fontSize={{ base: 22 }} pt={10} pb={5}>
              My thoughts and opinions
            </Heading>
          </Flex>
          {data.message.map(postItem => (
            <CardItem
              key={postItem._id}
              url={postItem._id}
              title={postItem.title}
              comments={postItem.comments}
              time={postItem.time}
              content={postItem.content}
              published={postItem.published}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default Home;
