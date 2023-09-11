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
  Divider,
} from "@chakra-ui/react";

const CardItem = ({ url, title, content, time }: CardItemProps) => {
  return (
    <Card>
      <CardFooter flexDir={"column"}>
        <CardHeader pb={0}>
          <Heading size="md">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing="4">
            <Box>
              <Text fontSize={"2xs"}>{time}</Text>
            </Box>
            <Box>
              <ChakraLink as={ReactRouterLink} to={`/posts/${url}`}>
                {content}
              </ChakraLink>
              <Divider />
            </Box>
          </Stack>
        </CardBody>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
