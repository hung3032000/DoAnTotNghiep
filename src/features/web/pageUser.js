import Paypal from 'components/web/Paypal/PayPal';
import CheckOut from 'features/web/User/CheckOut';
import UserInfor from 'features/web/User/UserInfor';
import Address from 'features/web/User/Address';
import Order from 'features/web/User/Order';
import OrderPending from 'features/web/User/OrderPending';
import OrderCancel from 'features/web/User/OrderCancel';
import OrderComplete from 'features/web/User/OrderComplete';
import OrderUserCancel from 'features/web/User/OrderUserCancel';

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
    path: '/orderComplete',
    exact: true,
    main: OrderComplete,
  },
  {
    path: '/orderUserCancel',
    exact: true,
    main: OrderUserCancel,
  },
  {
    path: '/orderPending',
    exact: true,
    main: OrderPending,
  },
  {
    path: '/orderCancel',
    exact: true,
    main: OrderCancel,
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
