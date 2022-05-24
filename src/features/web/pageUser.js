import Paypal from 'components/web/Paypal/PayPal';
import CheckOut from 'features/web/User/CheckOut';
import UserInfor from 'features/web/User/UserInfor';
import Address from 'features/web/User/Address';
import Order from 'features/web/User/Order';

const Page = [
  {
    path: '/checkout',
    exact: true,
    main: CheckOut,
  },
  {
    path: '/paypal',
    exact: true,
    main: Paypal,
  },
  {
    path: '/order',
    exact: true,
    main: Order,
  },
  {
    path: '/editaccount',
    exact: true,
    main: UserInfor,
  },
  {
    path: '/addresses',
    exact: true,
    main: Address,
  },
];
export default Page;
