import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Typography, Box } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';

const UserTypeSelector = ({userType, setUserType, setIsUserTypeSelected}) => {

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = () => {
    setIsUserTypeSelected(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f0f4fa',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: '400px',
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: 3,
          p: 4,
          textAlign: 'center', // Center-align text inside the box
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 2 }}>
            <Typography variant="h5" align="center">
              Select User
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-label="user-type"
            name="user-type"
            value={userType}
            onChange={handleChange}
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
          >
            <FormControlLabel
              value="admin"
              control={
                <Radio
                  icon={<AdminPanelSettingsIcon style={{ fontSize: 40 }} />}
                  checkedIcon={<AdminPanelSettingsIcon style={{ fontSize: 40 }} />}
                />
              }
              label="Admin"
              labelPlacement="bottom"
              sx={{ mx: 2 }}
            />
            <FormControlLabel
              value="student"
              control={
                <Radio
                  icon={<SchoolIcon style={{ fontSize: 40 }} />}
                  checkedIcon={<SchoolIcon style={{ fontSize: 40 }} />}
                />
              }
              label="Student"
              labelPlacement="bottom"
              sx={{ mx: 2 }}
            />
          </RadioGroup>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ borderRadius: '50px', padding: '10px 30px' }} // Rounded corners and padding for the button
            >
              Next
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default UserTypeSelector;
