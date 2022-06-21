import CategoryListResults from 'components/admin/category/CategoryListResults';
import CategoryListToolbar from 'components/admin/category/CategoryListToolbar';
import Common from './Common';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { getListCategoryAdmin } from 'slice/CategorySlice';
import { useSnackbar } from 'notistack';
function CategoryList() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataCategoryList = useSelector((state) => state.categoryList.dataA);
  const { enqueueSnackbar } = useSnackbar();

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const action = getListCategoryAdmin();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, enqueueSnackbar]);
  const [categoryList, setCategoryList] = useState(dataCategoryList);

  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý danh mục"
        toolbar={<CategoryListToolbar data={dataCategoryList} setCategoryList={setCategoryList} />}
        listResults={<CategoryListResults dataCategoryList={categoryList.length === 0 ? dataCategoryList : categoryList} />}
      />
    </>
  );
}

export default CategoryList;
