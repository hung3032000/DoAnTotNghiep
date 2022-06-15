
import { Link as RouterLink,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Grid as GridIcon,
  
  ShoppingBag as ShoppingBagIcon,
  // User as UserIcon,
  UserPlus as UserPlusIcon,
  Truck as TruckIcon,
  Inbox as InboxIcon,

} from 'react-feather';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'admin',
  name: 'Pham Ngoc Hung'
};

const items = [
  {
    href: '/dashboardA',
    icon: BarChartIcon,
    title: 'Trang chủ'
  },
  {
    href: '/usersA',
    icon: UserPlusIcon,
    title: 'Quản lý người dùng'
  },
  // {
  //   href: '/customersA',
  //   icon: UsersIcon,
  //   title: 'Khách hàng'
  // },
  {
    href: '/productsA',
    icon: ShoppingBagIcon,
    title: 'Sản phẩm'
  },
  {
    href: '/categoriesA',
    icon: GridIcon,
    title: 'Danh mục'
  },
  {
    href: '/categoriesCA',
    icon: GridIcon,
    title: 'Danh mục con'
  },
  {
    href: '/ordersA',
    icon: TruckIcon,
    title: 'Đơn hàng'
  },
  {
    href: '/orderscompleteA',
    icon: TruckIcon,
    title: 'Đơn hàng đã xử lý'
  },
  {
    href: '/ordersHistoryA',
    icon: TruckIcon,
    title: 'Lịch sử đơn hàng'
  },
  {
    href: '/voucherA',
    icon: InboxIcon,
    title: 'Quản lý voucher'
  },
  {
    href: '/statistical',
    icon: EqualizerIcon,
    title: 'Thống kê'
  },
  
  // ,{
  //   href: '/settingsA',
  //   icon: SettingsIcon,
  //   title: 'Cài đặt'
  // } 
 
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Lỗi'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  // const location = useLocation();

  // useEffect(() => {
  //   if (openMobile && onMobileClose) {
  //     onMobileClose();
  //   }
  // }, [location.pathname, onMobileClose, openMobile]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
