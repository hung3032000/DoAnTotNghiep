import { unwrapResult } from '@reduxjs/toolkit';
import { getProductDetail } from 'slice/ProductSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useProductDetail(productId) {
  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.product.product);

  useEffect(() => {
    (async () => {
      try {
        const action = getProductDetail(productId);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    })();
  }, [dispatch, productId]);
  return dataProducts;
}
