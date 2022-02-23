import { Box, Container } from '@material-ui/core';
import CategoryListResults from 'components/admin/category/CategoryListResults';
import CategoryListToolbar from 'components/admin/category/CategoryListToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';

function CategoryList() {

  return (
    <>
    <Helmet>
      <title>Quản lý danh mục</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
      <CategoryListToolbar />
        <Box sx={{ pt: 3 }}>
          <CategoryListResults />
        </Box>
      </Container>
    </Box>
  </>
  );
}

export default CategoryList;
