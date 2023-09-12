import { useLocation } from "react-router-dom";
import useDataFetching from "../hooks/useDataFetching";
import { Box, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  // const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location);

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
