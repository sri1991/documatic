import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Box, Card, CardContent} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const GoogleSignIn = ({ onSuccess, onFailure }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Card>
      <CardContent>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          render={renderProps => (
            <Button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              variant="contained"
              color="primary"
              startIcon={<LoginIcon width="20" height="20" />}
            >
              Sign in with Google
            </Button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </CardContent>
    </Card>
  </Box>
  );
};

export default GoogleSignIn;