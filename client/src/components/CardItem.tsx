import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  StackDivider,
  Box,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

const CardItem = ({ url, title, comments, content, time, published }) => {
  console.log(`/posts/${url}`);
  return (
    <Card>
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
          </Box>
          <Divider />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardItem;
