import CategoryChildListResults from 'components/admin/categoryChild/CategoryChildListResults';
import CategoryChildListToolbar from 'components/admin/categoryChild/CategoryChildListToolbar';
import Common from './Common';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';
import React, { useEffect, useState } from 'react';
import { getListCategoryAdmin } from 'slice/CategorySlice';
import { getListCategoryChildAdmin } from 'slice/CategoryChildSlice';
import { useSnackbar } from 'notistack';
function CategoryChild() {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const dataCategoryList = useSelector((state) => state.categoryList.dataA);
  const dataCategoryCList = useSelector((state) => state.categoryChildList.dataA);
  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getListCategoryAdmin({
          page: 1,
          limit: 100,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const actionChild = getListCategoryChildAdmin({
          page: 1,
          limit: 5000,
        });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, enqueueSnackbar]);

  const [subCategoryList, setSubCategoryList] = useState(dataCategoryCList);

  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý danh mục phụ"
        toolbar={<CategoryChildListToolbar data={dataCategoryCList} setSubCategoryList={setSubCategoryList} />}
        listResults={<CategoryChildListResults dataCategoryCList={subCategoryList.length === 0 ? dataCategoryCList : subCategoryList} dataCategoryList={dataCategoryList} />}
      />
    </>
  );
}

export default CategoryChild;
