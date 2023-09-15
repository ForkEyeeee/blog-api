import { useLocation } from "react-router-dom";
import { Box, Text, Center, HStack, Spinner } from "@chakra-ui/react";
import useDataFetching from "../hooks/useDataFetching";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

const Post = () => {
  const location = `https://blog-api-production-83d4.up.railway.app/api${
    useLocation().pathname
  }`;
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

  if (error) {
    return (
      <Box>
        <Text>Failed to fetch post</Text>
      </Box>
    );
  }

  return (
    <Box>
      {data && (
        <>
          <Box>
            <Text fontSize="3xl" fontWeight={"bold"} p={5} textAlign={"center"}>
              {
                // @ts-ignore comment,
                data.post.title
              }
            </Text>
          </Box>
          <Text pl={5} pr={5} pb={5}>
            {
              // @ts-ignore comment,
              data.post.content
            }
          </Text>
          {
            // @ts-ignore comment,
            data.comments.map(comment => (
              <Comment key={comment._id} comment={comment} />
            ))
          }

          <CreateCommentForm // @ts-ignore comment,
            postid={
              // @ts-ignore comment,
              data.post._id
            }
          />
        </>
      )}
    </Box>
  );
};

export default Post;
