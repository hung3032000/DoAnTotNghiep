import Account from 'features/admin/page/Account';
import CategoryA from 'features/admin/page/Category';
import CategoryChildA from 'features/admin/page/CategoryChild';
import CustomerList from 'features/admin/page/CustomerList';
import Dashboard from 'features/admin/page/Dashboard';
import OrderA from 'features/admin/page/OrderList';
import OrderComplete from 'features/admin/page/OrderCompleteList';
import ProductList from 'features/admin/page/ProductList';
import Settings from 'features/admin/page/Settings';
import Voucher from 'features/admin/page/Voucher';
import UserList from 'features/admin/page/UserList';
import Address from 'features/admin/page/Address';
import OrderHistory from 'features/admin/page/OrderHistory';
import SizeAColor from 'features/admin/page/SizeAColor';

const Page = [
  {
    path: ['/', '/dashboardA'],
    exact: true,
    main: Dashboard,
  },
  {
    path: '/usersA',
    exact: true,
    main: UserList,
  },
  {
    path: '/addressA',
    exact: true,
    main: Address,
  },
  {
    path: '/customersA',
    exact: true,
    main: CustomerList,
  },
  {
    path: '/productsA',
    exact: true,
    main: ProductList,
  },
  {
    path: '/categoriesA',
    exact: true,
    main: CategoryA,
  },
  {
    path: '/categoriesCA',
    exact: true,
    main: CategoryChildA,
  },
  {
    path: '/ordersA',
    exact: true,
    main: OrderA,
  },
  {
    path: '/ordersHistoryA',
    exact: true,
    main: OrderHistory,
  },
  {
    path: '/orderscompleteA',
    exact: true,
    main: OrderComplete,
  },
  {
    path: '/accountA',
    exact: true,
    main: Account,
  },
  {
    path: '/settingsA',
    exact: true,
    main: Settings,
  },
  {
    path: '/voucherA',
    exact: true,
    main: Voucher,
  },
  {
    path: '/sizeA/:id',
    exact: true,
    main: SizeAColor,
  }

];
export default Page;
