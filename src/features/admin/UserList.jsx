import { Box, Container } from '@material-ui/core';
import UserListResults from 'components/admin/user/UserListResults';
import UserListToolbar from 'components/admin/user/UserListToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';
function UserList() {
  return (
    <>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar />
          <Box sx={{ pt: 3 }}>
            <UserListResults/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default UserList;
