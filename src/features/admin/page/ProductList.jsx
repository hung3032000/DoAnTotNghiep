import ProductCard from 'components/admin/product/ProductCard';
import ProductListToolbar from 'components/admin/product/ProductListToolbar';
import React from 'react';
import Common from './Common';

function ProductList() {
  return <Common title="Quản lý sản phẩm" toolbar={<ProductListToolbar />} listResults={<ProductCard />} />;
}

export default ProductList;
