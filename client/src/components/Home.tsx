import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

const Home = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/posts");
        // console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const text = await response.text();
        // console.log(text);
        const data = JSON.parse(text);
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(message);
  return (
    <Box className="App">
      {message.map(message => (
        <Box>
          <Box>{message._id}</Box>
          <Box>{message.title}</Box>
          <Box>{message.comments}</Box>
          <Box>{message.time}</Box>
          <Box>{message.published}</Box>
        </Box>
      ))}{" "}
    </Box>
  );
};

export default Home;
