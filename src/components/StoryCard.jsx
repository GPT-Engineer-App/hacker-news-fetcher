import { Box, Text, Link, Badge, useColorModeValue } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

const StoryCard = ({ title, url, points }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box p={4} bg={bg} color={color} borderRadius="md" shadow="md" width="100%">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Link href={url} isExternal color="teal.500">
        Read more
      </Link>
      <Badge ml={2} colorScheme="green">
        <FaArrowUp /> {points}
      </Badge>
    </Box>
  );
};

export default StoryCard;