import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import useDataFetching from "../hooks/useDataFetching";
import Comment from "./Comment";
const Post = () => {
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location);
  console.log(data);
  console.log(location);
  console.log(error);
  return (
    <Box>
      {data && (
        <>
          <Text fontSize="3xl">{data.post.title}</Text>
          <Text fontSize="3xl">{data.post.content}</Text>
          {data.comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Post;
