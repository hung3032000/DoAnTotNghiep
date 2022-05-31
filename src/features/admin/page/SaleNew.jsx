import SaleNewResults from 'components/admin/form/products/ProductNewSale';
import React from 'react';
import Common from './Common';

function SaleNew() {
  return <Common title="Quản lý danh mục"  listResults={<SaleNewResults />} />;
}

export default SaleNew;