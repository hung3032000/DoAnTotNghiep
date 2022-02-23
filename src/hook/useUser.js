import adminAPI from 'api/adminAPI';
import { useEffect, useState } from 'react';

export default function useUserDetail(userId) {
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const result = await adminAPI.getAllUser(userId);
        setUser(result);
        console.log(result);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    })();
  }, []);

  return user;
}
