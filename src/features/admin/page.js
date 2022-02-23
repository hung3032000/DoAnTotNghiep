import Account from 'features/admin/Account';
import CategoryA from 'features/admin/Category';
import CategoryChildA from 'features/admin/CategoryChild';
import CustomerList from 'features/admin/CustomerList';
import Dashboard from 'features/admin/Dashboard';
import OrderA from 'features/admin/OrderList';
import OrderComplete from 'features/admin/OrderCompleteList';
import ProductList from 'features/admin/ProductList';
import Settings from 'features/admin/Settings';
import UserList from 'features/admin/UserList';
import Address from 'features/admin/Address';
import OrderHistory from 'features/admin/OrderHistory';

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
      expect: true,
      main: Account
    },
    {
      path: '/settingsA',
      expect: true,
      main: Settings
    }
  ];
  export default Page;