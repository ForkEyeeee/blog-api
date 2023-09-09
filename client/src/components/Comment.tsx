import { Text } from "@chakra-ui/react";
const Comment = ({ comment }) => {
  return (
    <>
      <Text>{comment.username}</Text>
      <Text>{comment.time}</Text>
      <Text>{comment.content}</Text>
    </>
  );
};

export default Comment;
