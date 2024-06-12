import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Link,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [filter, setFilter] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      .then((response) => response.json())
      .then((storyIds) => {
        const top10Ids = storyIds.slice(0, 10);
        return Promise.all(
          top10Ids.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
              (response) => response.json()
            )
          )
        );
      })
      .then((stories) => {
        setStories(stories);
        setFilteredStories(stories);
      })
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredStories(
        stories.filter((story) =>
          story.title.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredStories(stories);
    }
  }, [filter, stories]);

  return (
    <Container
      centerContent
      maxW="container.md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={bg}
      color={color}
    >
      <VStack spacing={4} width="100%">
        <HStack width="100%" justifyContent="space-between">
          <Text fontSize="2xl">Hacker News Stories</Text>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </HStack>
        <InputGroup>
          <Input
            placeholder="Filter by keyword"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <InputRightElement>
            <FaSearch />
          </InputRightElement>
        </InputGroup>
        {filteredStories.map((story) => (
          <Box
            key={story.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            width="100%"
            bg={useColorModeValue("white", "gray.700")}
          >
            <HStack justifyContent="space-between">
              <Link href={story.url} isExternal>
                <Text fontSize="lg" fontWeight="bold">
                  {story.title}
                </Text>
              </Link>
              <Text>{story.score} upvotes</Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;