import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Center,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import CardItem from "./CardItem";
import useDataFetching from "../hooks/useDataFetching";
import parseJwt from "../hooks/parseJWT";
import validateToken from "../hooks/validateToken";
const Home = () => {
  const token = localStorage.getItem("jwt");
  const location = `http://localhost:5174/api${useLocation().pathname}`;
  const parsedToken = parseJwt(token);
  const isExpiredUser = validateToken(parsedToken);
  const [data, loading, error] = useDataFetching(location, token);
  // const response = await fetch("/api/authorsession/posts", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // const navigate = useNavigate();
  // const [data, loading, error] = useDataFetching(location);

  console.log(data);

  // if (loading)
  //   return (
  //     <Center p={10}>
  //       <HStack spacing={5}>
  //         <Spinner
  //           thickness="4px"
  //           speed="0.65s"
  //           emptyColor="gray.200"
  //           color="blue.500"
  //           size="xl"
  //         />
  //         <Text>Loading...</Text>
  //       </HStack>
  //     </Center>
  //   );

  return (
    <Box>
      {data && (
        <>
          <Flex justifyContent={"center"}>
            <Heading fontSize={{ base: 22, md: 30 }} pt={10} pb={5}>
              My thoughts and opinions
            </Heading>
          </Flex>
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
