import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Container,
  useTheme
} from '@mui/material';
import ExtractIcon from '@mui/icons-material/Description';
import ClassifyIcon from '@mui/icons-material/Category';
import SignatureIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';


const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          {icon}
        </Box>
        <Typography variant="h6" component="div" gutterBottom align="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const theme = useTheme();
  
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/demo'); // Navigate to the demo page
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" color="primary">
          Welcome to Documatic
        </Typography>
        <Typography variant="h4" gutterBottom align="center" color="text.secondary" sx={{ mb: 6 }}>
          Revolutionize Your Document Management with Intelligent Processing
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 6 }}>
          At Documatic, we harness the power of cutting-edge AI to transform the way you handle documents. 
          Our intelligent document processing (IDP) solutions streamline your workflows, ensuring efficiency 
          and accuracy like never before.
        </Typography>

        <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
          Key Features
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<ExtractIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />}
              title="Information Extraction"
              description="Effortlessly extract valuable data from your documents. Our advanced algorithms identify and pull out key information, saving you time and reducing manual errors."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<ClassifyIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />}
              title="Document Classification"
              description="Automatically categorize your documents with precision. Whether it's invoices, contracts, or receipts, Documatic ensures everything is neatly organized and easily accessible."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard 
              icon={<SignatureIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />}
              title="Signature and Stamp Detection"
              description="Verify the authenticity of your documents with our robust signature and stamp detection capabilities. Our technology accurately identifies and validates signatures and stamps, ensuring your documents are genuine and compliant."
            />
          </Grid>
        </Grid>

        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom color="text.primary">
            Experience the Future of Document Management with Documatic
          </Typography>
        </Box>

        <Box textAlign="center">
          <Button variant="contained" size="large" color="primary" onClick={handleGetStarted}>
            Get Started Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;