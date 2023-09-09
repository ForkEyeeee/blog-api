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

const CardItem = ({ title, comments, content, time, published }) => {
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
            <Text pt="2" fontSize="sm" fontWeight={"light-bold"}>
              {content}
            </Text>
          </Box>
          <Divider />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardItem;
