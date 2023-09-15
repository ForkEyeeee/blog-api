import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
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
} from "@chakra-ui/react";

const CardItem = ({ url, title, content, time, published }: CardItemProps) => {
  return (
    <>
      {published && (
        <Card>
          <ChakraLink as={ReactRouterLink} to={`/posts/${url}`}>
            <CardHeader pb={0}>
              <VStack align={{ base: "start", md: "center" }}>
                <Heading size="md" color="rgb(94, 192, 241)">
                  {title}
                </Heading>
                <Text fontSize={"2xs"}>{time}</Text>
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
          </ChakraLink>
          <CardFooter flexDir={"column"}></CardFooter>
        </Card>
      )}
    </>
  );
};

export default CardItem;
