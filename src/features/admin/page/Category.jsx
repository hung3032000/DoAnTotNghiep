
import CategoryListResults from 'components/admin/category/CategoryListResults';
import CategoryListToolbar from 'components/admin/category/CategoryListToolbar';
import React from 'react';
import Common from './Common';

function CategoryList() {
  
  return <Common title="Quản lý danh mục" toolbar={<CategoryListToolbar />} listResults={<CategoryListResults />} />;
}

export default CategoryList;
