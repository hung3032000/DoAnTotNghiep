import SizeAColorResults from 'components/admin/form/products/ProductDetailSize';
import React from 'react';
import Common from './Common';

function SizeAColor() {
  return <Common title="Quản lý danh mục"  listResults={<SizeAColorResults />} />;
}

export default SizeAColor;