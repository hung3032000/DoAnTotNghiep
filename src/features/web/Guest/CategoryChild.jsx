import { unwrapResult } from '@reduxjs/toolkit';
import CateC from 'components/web/category/CateC';
import { getListCategoryChild } from 'components/web/category/CategoryChildSlice';
import { categoryDetail } from 'components/web/category/CategorySlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';

function CategoryChild() {
  const {
    params: { id },
  } = useRouteMatch();

  // list category
  const dispatch = useDispatch();
  const dataCategoryDetail = useSelector((state) => state.categoryList.categoryDetail);
  const dataCategoryCList = useSelector((state) => state.categoryChildList.data);
  useEffect(() => {
    (async () => {
      try {
        const action = categoryDetail(id);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);

        const actionChild = getListCategoryChild(id, { substatus: true });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dataCategoryCList.length, dataCategoryDetail.length, dispatch, id]);
  return (
    <div>
      {/* Body */}
      <main id="main" className="clearfix" style={{ marginTop: '128px' }}>
        <div className="content-slot slot-grid-header" />
        <div id="primary" className="primary-content">
          <div className="page-header">
            <h1>
              <span className="title">{dataCategoryDetail.nameCategory}</span>
            </h1>
          </div>
          <CateC data={dataCategoryCList.subcategories} />
        </div>
      </main>
      {/* end body */}
    </div>
  );
}

export default CategoryChild;
