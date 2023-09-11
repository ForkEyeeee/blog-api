import { useLocation } from "react-router-dom";
import useDataFetching from "../hooks/useDataFetching";
import { Box, Text } from "@chakra-ui/react";

const AboutUs = () => {
  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location, token);
  return (
    <Box>
      {data && (
        <>
          <Text fontSize="3xl">{data.message}</Text>
        </>
      )}
    </Box>
  );
};

export default AboutUs;
