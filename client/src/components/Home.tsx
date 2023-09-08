import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

const Home = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/create-post");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const text = await response.text();
        console.log(text);
        const data = JSON.parse(text);
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box className="App">
      <Heading>{message}</Heading>
    </Box>
  );
};

export default Home;
