import { useEffect, useState } from "react";
import { Container, VStack, Input, useColorMode, Button, Box } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import StoryCard from "../components/StoryCard";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [filter, setFilter] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
      const storyIds = await response.json();
      const topTenIds = storyIds.slice(0, 10);

      const storyPromises = topTenIds.map(async (id) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return storyResponse.json();
      });

      const stories = await Promise.all(storyPromises);
      setStories(stories);
      setFilteredStories(stories);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredStories(stories.filter(story => story.title.toLowerCase().includes(filter.toLowerCase())));
    } else {
      setFilteredStories(stories);
    }
  }, [filter, stories]);

  return (
    <Container centerContent maxW="container.md" py={4}>
      <Box width="100%" display="flex" justifyContent="space-between" mb={4}>
        <Input
          placeholder="Filter stories by keyword"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Box>
      <VStack spacing={4} width="100%">
        {filteredStories.map((story) => (
          <StoryCard key={story.id} title={story.title} url={story.url} points={story.score} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;