import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
import GoogleSignIn from './GoogleSignIn';  // Import the new component

const FeatureCard = ({ icon, title, description }) => {
  // ... (keep the existing FeatureCard component)
};

const HomePage = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    setUser(response.profileObj);
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="969023779879-13aoj3h0pv2bia3ntsc7jva183eqdcpu.apps.googleusercontent.com">
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center" color="primary">
            Welcome to Documatic
          </Typography>
          
          {/* Add Google Sign-In button */}
          <Box textAlign="center" sx={{ mb: 4 }}>
            {user ? (
              <Typography variant="h6">Welcome, {user.name}!</Typography>
            ) : (
              <GoogleSignIn onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
            )}
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <FeatureCard
                icon={<ExtractIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />}
                title="Extract Text"
                description="Extract text from documents and images."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FeatureCard
                icon={<ClassifyIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />}
                title="Classify Text"
                description="Classify text into categories using machine learning."
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FeatureCard
                icon={<SignatureIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />}
                title="Sign Documents"
                description="Digitally sign documents and verify signatures."
              />
            </Grid>
            </Grid>
        </Container>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default HomePage;
