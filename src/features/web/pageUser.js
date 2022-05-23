import Paypal from 'components/web/Paypal/PayPal';
import CheckOut from 'features/web/User/CheckOut';
import UserInfor from 'features/web/User/UserInfor';
import Address from 'features/web/User/Address';
import { lazy } from 'react';

const Order = lazy(() => import('features/web/User/Order'));
const Page = [
  {
    path: '/checkout',
    main: CheckOut,
  },
  {
    path: '/paypal',
    main: Paypal,
  },
  {
    path: '/order',
    main: Order,
  },
  {
    path: '/editaccount',
    main: UserInfor,
  },
  {
    path: '/addresses',
    main: Address,
  },
];
export default Page;
