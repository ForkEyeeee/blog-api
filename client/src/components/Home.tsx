import { useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CardItem from "./CardItem";
import useDataFetching from "../hooks/useDataFetching";

const Home = () => {
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location);

  return (
    <Box>
      {data && (
        <>
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
