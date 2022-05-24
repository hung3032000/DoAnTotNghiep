import React from 'react';
import { Box, Container } from '@material-ui/core';
import { Helmet } from 'react-helmet';
function Common(props) {
  const { title, toolbar, listResults } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          {toolbar}
          <Box sx={{ pt: 3 }}>{listResults}</Box>
        </Container>
      </Box>
    </>
  );
}

export default Common;
