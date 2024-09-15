import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem,
  ThemeProvider,
  createTheme,
  Box,  
  Card, 
  CardContent, 
  Grid, 
  Container,
  useTheme,
  Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExtractIcon from '@mui/icons-material/Description';
import ClassifyIcon from '@mui/icons-material/Category';
import SignatureIcon from '@mui/icons-material/VerifiedUser';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import HomePage  from './pages/home'
import DemoPage from './pages/demo'
import BlogPage from './pages/blog';


const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (view) => {
    setCurrentView(view);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    // Implement file upload and processing logic here
    console.log("File submitted:", file);
    // You would typically send the file to your backend or process it here
    // For now, we'll just set a dummy response
    setResponse("File processed successfully!");
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
         <HomePage />
        )
      case 'demo':
        return (
          <DemoPage />
        );
      case 'pricing':
        return <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginRight:'50px' }}><Typography variant="h7">Experience it free for now! We're working on introducing pricing plans soon, but you can still try us out at no cost. Stay tuned for updates! </Typography> </Paper>;
      case 'blogs':
        return <BlogPage />;
      default:
        return <Typography variant="h4">Page Not Found</Typography>;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Documatic
          </Typography>
          <Button color="inherit" onClick={() => handleNavClick('home')}>Home</Button>
          <Button color="inherit" onClick={() => handleNavClick('demo')}>Demo</Button>
          <Button color="inherit" onClick={() => handleNavClick('pricing')}>Pricing</Button>
          <Button color="inherit" onClick={() => handleNavClick('blogs')}>Blogs</Button>
        </Toolbar>
      </AppBar>
      {renderContent()}
    </ThemeProvider>
  );
}

export default App;