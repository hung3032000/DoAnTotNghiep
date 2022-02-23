import Paypal from 'components/web/Paypal/PayPal';
import CheckOut from 'features/web/User/CheckOut';
import UserInfor from 'features/web/User/UserInfor';
import { lazy } from 'react';

const Order = lazy(() => import('features/web/User/Order'));
const AccountOverView = lazy(() => import('features/web/User/AccountOverView'));
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
    path: '/myaccount',
    main: AccountOverView,
  },
  {
    path: '/editaccount',
    main: UserInfor,
  },
  {
    path: '/addresses',
    main: AccountOverView,
  },
];
export default Page;
