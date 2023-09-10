import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Text, HStack, VStack, Flex } from "@chakra-ui/react";
import useDataFetching from "../hooks/useDataFetching";
import Comment from "./Comment";

const AboutUs = () => {
  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5173/api${useLocation().pathname}`;
  const [data, loading, error] = useDataFetching(location, token);
  console.log(data);
  console.log(location);
  console.log(error);
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
