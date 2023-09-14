import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Center,
  HStack,
  Spinner,
  Text,
  Textarea,
  Button,
  Input,
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

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const published = formData.get("post");
    try {
      const response = await fetch(location, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: formData.get("post"),
          title: formData.get("title"),
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      } else {
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <Input name="title" />
            <Textarea name="post" />
            <Button type="submit">Add Post</Button>
          </form>
        </>
      )}
    </Box>
  );
};

export default Home;
