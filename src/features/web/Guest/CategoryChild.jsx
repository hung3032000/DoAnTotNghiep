import { unwrapResult } from '@reduxjs/toolkit';
import CateC from 'components/web/category/CateC';
import { getListCategoryChild } from 'slice/CategoryChildSlice';
import { categoryDetail } from 'slice/CategorySlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Loader from 'components/fullPageLoading';

function CategoryChild() {
  const {
    params: { id },
  } = useRouteMatch();
  const [loading, setLoading] = useState(false);

  // list category
  const dispatch = useDispatch();
  const dataCategoryDetail = useSelector((state) => state.categoryList.categoryDetail);
  const dataCategoryCList = useSelector((state) => state.categoryChildList.data);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = categoryDetail(id);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataCategoryCList.length, dataCategoryDetail.length, dispatch, id]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getListCategoryChild(id);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataCategoryCList.length, dataCategoryDetail.length, dispatch, id]);
  const [data, setData] = useState(dataCategoryCList.subcategories);
  useEffect(() => {
    setData(dataCategoryCList.subcategories ? dataCategoryCList.subcategories.filter((service) => service.substatus === true) : dataCategoryCList.subcategories);
  }, [dataCategoryCList.subcategories]);

  return (
    <div>
      <Loader showLoader={loading} />
      <main id="main" className="clearfix" style={{ marginTop: '128px' }}>
        <div className="content-slot slot-grid-header" />
        <div id="primary" className="primary-content">
          <div className="page-header">
            <h1>
              <span className="title">{dataCategoryDetail.nameCategory}</span>
            </h1>
          </div>
          <CateC data={data} />
        </div>
      </main>
    </div>
  );
}

export default CategoryChild;
