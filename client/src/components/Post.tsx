import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import useDataFetching from "../hooks/useDataFetching";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
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
          <Text fontSize="3xl" fontWeight={"bold"}>
            {data.post.title}
          </Text>
          <Text>{data.post.content}</Text>
          {data.comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
          <CreateCommentForm postid={data.post._id} />
        </>
      )}
    </Box>
  );
};

export default Post;
