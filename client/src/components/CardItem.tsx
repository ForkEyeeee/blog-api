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
} from "@chakra-ui/react";

const CardItem = ({ url, title, content, time }: CardItemProps) => {
  return (
    <>
      <Card>
        <ChakraLink as={ReactRouterLink} to={`/posts/${url}`}>
          <CardHeader pb={0}>
            <VStack align="start">
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
    </>
  );
};

export default CardItem;
