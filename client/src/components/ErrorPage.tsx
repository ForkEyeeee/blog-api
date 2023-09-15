import { useLocation } from "react-router-dom";
import useDataFetching from "../hooks/useDataFetching";
import { Box, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  const location = `https://blog-api-backend-iosn.onrender.com/api${
    useLocation().pathname
  }`;
  const [data] = useDataFetching(location);

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

export default ErrorPage;
