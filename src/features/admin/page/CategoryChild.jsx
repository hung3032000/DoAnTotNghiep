import CategoryChildListResults from 'components/admin/categoryChild/CategoryChildListResults';
import CategoryChildListToolbar from 'components/admin/categoryChild/CategoryChildListToolbar';
import React from 'react';
import Common from './Common';

function CategoryChild() {
  return <Common title="Quản lý danh mục phụ" toolbar={<CategoryChildListToolbar />} listResults={<CategoryChildListResults />} />;
}

export default CategoryChild;
