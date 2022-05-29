import SizeAColorResults from 'components/admin/form/products/ProductDetailSize';
import SizeAColorToolbar from 'components/admin/category/CategoryListToolbar';
import React from 'react';
import Common from './Common';

function SizeAColor() {
  return <Common title="Quản lý danh mục" toolbar={<SizeAColorToolbar />} listResults={<SizeAColorResults />} />;
}

export default SizeAColor;