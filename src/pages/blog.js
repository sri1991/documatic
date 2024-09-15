import React from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Next Generation of Document Classification: Exploring Vision Language Models",
    summary: "Dive into the world of Vision Language Models and their impact on document classification.",
    image: "https://via.placeholder.com/400x200?text=VLM+Blog",
    link: "https://www.linkedin.com/pulse/next-generation-document-classification-exploring-vision-srinivas-rqftc/?trackingId=dM13A86%2BiaR6lhanpDXZsA%3D%3D",
    tags: ["AI", "Document Classification", "VLM"]
  },
  {
    id: 2,
    title: "Revolutionizing Information Extraction with AI",
    summary: "Discover how AI is transforming the way we extract valuable information from documents.",
    image: "https://via.placeholder.com/400x200?text=AI+Information+Extraction",
    link: "https://www.linkedin.com/pulse/revolutionizing-information-extraction-ai-jane-smith/",
    tags: ["AI", "Information Extraction", "NLP"]
  },
  {
    id: 3,
    title: "The Future of Signature Detection: AI-Powered Authenticity",
    summary: "Explore the latest advancements in AI-driven signature detection and verification.",
    image: "https://via.placeholder.com/400x200?text=Signature+Detection",
    link: "https://www.linkedin.com/pulse/future-signature-detection-ai-powered-authenticity-alex-johnson/",
    tags: ["AI", "Signature Detection", "Security"]
  },
  // Add more blog posts as needed
];

const BlogCard = ({ post }) => (
  <Card elevation={3}>
    <CardActionArea href={post.link} target="_blank" rel="noopener noreferrer">
      <CardMedia
        component="img"
        height="140"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.summary}
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {post.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

const BlogPage = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary" sx={{ mb: 6 }}>
          Documatic Blog
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <BlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;