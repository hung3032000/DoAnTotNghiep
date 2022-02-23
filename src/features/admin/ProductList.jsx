import { Box, Container } from '@material-ui/core';
import ProductCard from 'components/admin/product/ProductCard';
import ProductListToolbar from 'components/admin/product/ProductListToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';

function ProductList() {
  return (
    <>
    <Helmet>
      <title>Quản lý sản phẩm</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar/>
        <Box sx={{ pt: 3 }}>
          <ProductCard/>
        </Box>
      </Container>
    </Box>
  </>
  );
}

export default ProductList;
