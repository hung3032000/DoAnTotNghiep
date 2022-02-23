import categoryCApi from 'api/categoryCApi';
import { useEffect, useState } from 'react';

export default function useProductDetail(categoriesId) {
  const [category, setCategory] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const result = await categoryCApi.get(categoriesId);
        setCategory(result);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    })();
  }, [categoriesId]);

  return category;
}
