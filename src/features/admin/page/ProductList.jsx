import ProductCard from 'components/admin/product/ProductCard';
import ProductListToolbar from 'components/admin/product/ProductListToolbar';
import Common from './Common';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import Loader from 'components/fullPageLoading';
import { getListCategoryChildAdmin } from 'slice/CategoryChildSlice';
import { getListProductAdmin } from 'slice/ProductListSlice';
function ProductList() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //fetch data category
  const dataCategoryCList = useSelector((state) => state.categoryChildList.dataA);
  const dataProductsList = useSelector((state) => state.productList.dataA);

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        //categoryC
        const actionChild = getListCategoryChildAdmin({
          page: 1,
          limit: 10,
        });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
        //product
        const actionGetProducts = getListProductAdmin({
          page: 1,
          limit: 100,
        });
        const resultActionGetProducts = await dispatch(actionGetProducts);
        unwrapResult(resultActionGetProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  const [productsList, setProductsList] = useState(dataProductsList);

  return (
    <>
      <Loader showLoader={loading} />
      <Common
        title="Quản lý sản phẩm"
        toolbar={<ProductListToolbar data={dataProductsList} setProductsList={setProductsList} />}
        listResults={<ProductCard dataCategoryCList={dataCategoryCList} dataProductsList={productsList.length === 0 ? dataProductsList : productsList} />}
      />
    </>
  );
}

export default ProductList;
