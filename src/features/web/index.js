import Home from 'features/web/Home/Home';
import Login from 'features/web/Home/Login';
import Register from 'features/web/Home/Register';
import { lazy } from 'react';

const CategoryChild = lazy(() => import('features/web/Guest/CategoryChild'));
const Productin4 = lazy(() => import('features/web/Guest/ProductInfo'));
const ShowProduct = lazy(() => import('features/web/Guest/ShowProduct'));
const UserCart = lazy(() => import('features/web/Guest/UserCart'));
const Cartlist = lazy(() => import('features/web/User/CartList'));
const Page = [

  {
    path: ['/', '/home'],
    exact: true,
    main: Home,
  },
  {
    path: '/cartlist',
    exact: true,
    main: Cartlist,
  },
  {
    path: '/productinf/:productId',
    exact: true,
    main: Productin4,
  },
  {
    path: '/categorychild/:id',
    exact: true,
    main: CategoryChild,
  },
  {
    path: '/showProduct/:catechildId',
    exact: true,
    main: ShowProduct,
  },
  {
    path: '/login',
    exact: true,
    main: Login,
  },
  {
    path: '/register',
    exact: true,
    main: Register,
  },
  {
    path: '/usercart',
    exact: true,
    main: UserCart
  },
  {
    path: '/search',
    exact: false,
    main: Home
  }

];
export default Page;