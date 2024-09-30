import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ThemeProvider,
  createTheme,
  Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomePage from './pages/home';
import DemoPage from './pages/demo';
import BlogPage from './pages/blog';
import GoogleSignIn from './pages/GoogleSignIn';

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router>
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
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/demo">Demo</Button>
            <Button color="inherit" component={Link} to="/pricing">Pricing</Button>
            <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/signin" element={<GoogleSignIn />} />
          <Route path="/pricing" element={
            <Paper elevation={3} sx={{ padding: '20px', margin: '20px' }}>
              <Typography variant="h6">
                Experience it free for now! We're working on introducing pricing plans soon, but you can still try us out at no cost. Stay tuned for updates!
              </Typography>
            </Paper>
          } />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="*" element={<Typography variant="h4">Page Not Found</Typography>} />
        </Routes>
        <Analytics />
      </ThemeProvider>
    </Router>
  );
}

export default App;