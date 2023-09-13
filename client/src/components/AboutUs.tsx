import { Box, Heading, Text, VStack, Divider, Image } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <VStack spacing={8} align="center" p={5}>
      <Box>
        <Heading color="rgb(94, 192, 241)" size="2xl">
          About The Blog
        </Heading>
      </Box>
      <Box maxW="600px">
        <Text fontSize="md" textAlign="justify">
          "Chronicles of Insight" began as a humble blog in 2015, aiming to
          share perspectives, thoughts, and insights on the world's
          ever-evolving landscape. Over time, our platform has grown into a
          community of avid readers and writers passionate about various
          subjects ranging from technology to philosophy.
        </Text>
      </Box>
      {/* <Box maxW="600px">
        <Image
          src="path_to_some_image.jpg"
          alt="Blogging team photo"
          borderRadius="lg"
          boxShadow="xl"
        />
      </Box> */}
      <Box maxW="600px">
        <Text fontSize="md" textAlign="justify">
          Our team of writers hails from diverse backgrounds, each bringing a
          unique voice to the table. This diversity ensures that our readers
          receive a multi-faceted view on topics, sparking discussions, debates,
          and deeper introspection.
        </Text>
      </Box>
      <Divider borderColor="gray.300" />
      <Box maxW="600px">
        <Heading color="rgb(94, 192, 241)" size="lg">
          Our Mission
        </Heading>
        <Text fontSize="md" mt={3} textAlign="justify">
          Our mission is to inform, inspire, and ignite conversations. We
          believe in the power of words to enlighten, challenge, and evoke
          emotions. At "Chronicles of Insight," we aim to be a beacon of
          unbiased, thoughtful, and fresh perspectives in the vast sea of online
          content.
        </Text>
      </Box>
      <Box maxW="600px">
        <Heading color="rgb(94, 192, 241)" size="lg">
          Join Us
        </Heading>
        <Text fontSize="md" mt={3} textAlign="justify">
          We are always on the lookout for new voices to join our blogging
          family. Whether you are an experienced writer or someone just starting
          out, if you have a story to tell or an insight to share, we'd love to
          hear from you.
        </Text>
      </Box>
      <Divider borderColor="gray.300" />
      <Box maxW="600px">
        <Text fontSize="md" textAlign="justify">
          As we navigate the intricacies of our shared human experience,
          "Chronicles of Insight" remains committed to being a platform for
          authentic voices and stories. We invite you to dive in, explore our
          articles, and be part of our journey.
        </Text>
      </Box>
    </VStack>
  );
};

export default AboutUs;
