import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import CardItem from "./CardItem";
import PostProps from "../types/postProps";

const Home = () => {
  const [post, setPost] = useState<Array<PostProps>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        const data = JSON.parse(text);
        setPost(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      {post.map(postItem => (
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
    </Box>
  );
};

export default Home;
