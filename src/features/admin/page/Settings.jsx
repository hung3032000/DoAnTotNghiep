import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsNotifications from 'components/admin/settings/SettingsNotifications';
import SettingsPassword from 'components/admin/settings/SettingsPassword';


import React from 'react';
// import PropTypes from 'prop-types';

// SettingsView.propTypes = {
  
// };

function SettingsView(props) {
  return (
    <>
    <Helmet>
      <title>Cài đặt</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <SettingsNotifications />
        <Box sx={{ pt: 3 }}>
          <SettingsPassword />
        </Box>
      </Container>
    </Box>
  </>
  );
}

export default SettingsView;
