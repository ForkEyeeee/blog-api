import { Link as ReactRouterLink } from "react-router-dom";
import { AbsoluteCenter, Center, Link as ChakraLink } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardItemProps from "../types/cardItemProps";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Box,
  Stack,
  VStack,
  Divider,
  Flex,
  Select,
  Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
const CardItem = ({ url, title, content, time, published }: CardItemProps) => {
  const location = `http://localhost:5174/api${useLocation().pathname}`;
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const published = formData.get("published");
    try {
      const response = await fetch(location, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          published: published,
          postid: url,
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader pb={0}>
            <VStack align={{ base: "start", md: "center" }}>
              <Heading size="md" color="rgb(94, 192, 241)">
                {title}
              </Heading>
              <Text fontSize={"2xs"}>{time}</Text>
              <Select name="published" placeholder="Select option" required>
                <option value="true">published</option>
                <option value="false">unpublished</option>
              </Select>
              <Button type="submit">Save</Button>
              <Text>{published ? "published" : "unpublished"}</Text>
            </VStack>
          </CardHeader>
          <CardBody>
            <Stack spacing="4">
              <Box>{content}</Box>
            </Stack>
            <Flex justifyContent={"center"}>
              <Divider pt={10} width={"50%"} />
            </Flex>
          </CardBody>
          <CardFooter flexDir={"column"}></CardFooter>
        </Card>
      </form>
    </>
  );
};

export default CardItem;
