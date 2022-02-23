import { Box, Container } from '@material-ui/core';
import CategoryChildListResults from 'components/admin/categoryChild/CategoryChildListResults';
import CategoryChildListToolbar from 'components/admin/categoryChild/CategoryChildListToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';

function CategoryChild() {
 
  return (
    <>
      <Helmet>
        <title>Quản lý danh mục phụ</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <CategoryChildListToolbar />
          <Box sx={{ pt: 3 }}>
            <CategoryChildListResults/>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CategoryChild;
