import {
   BookOutlined,
   ContainerOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined,
   PercentageOutlined,
   PieChartOutlined,
   QrcodeOutlined,
   ReconciliationOutlined,
   ShopOutlined,
   TagsOutlined,
   UserOutlined,
} from '@ant-design/icons';
import { Carousel, Image, Skeleton } from 'antd';
import SecurityIcon from '@material-ui/icons/Security';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import NatureIcon from '@material-ui/icons/Nature'; // sub
import LoyaltyIcon from '@material-ui/icons/Loyalty'; // sale
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'; // mgg
import FilterVintageIcon from '@material-ui/icons/FilterVintage'; // sp
import AssignmentIcon from '@material-ui/icons/Assignment';

import { useDispatch, useSelector } from 'react-redux';

// import { Link } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
   ProSidebar,
   Menu,
   MenuItem,
   SubMenu,
   SidebarHeader,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// const { SubMenu } = Menu

const SideBar = () => {
   const location = useLocation();

   const [state, setState] = useState(false);
   const [selectedKey, setSelectedKey] = useState('/');
   const [openKeys, setOpenKeys] = useState(['sub2']);

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

   const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
         setOpenKeys(keys);
      } else {
         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
   };

   useEffect(() => {
      let path = location.pathname;
      if (path === '/') {
         path = '/home';
      }

      if (
         location.pathname === '/admin/productlist' ||
         location.pathname === '/admin/product/create'
      ) {
         setOpenKeys(['sub1']);
      }

      setSelectedKey(path);
   }, [location]);

   const toggleCollapsed = () => {
      setState(!state);
   };

   return (
      <>
         <ProSidebar style={{ backgroundColor: 'red !important' }}>
            <SidebarHeader>
               <div className="d-flex justify-content-center py-3 flex-column align-items-center">
                  <Image
                     className="rounded-circle border border-grey"
                     style={{
                        width: '4.3rem',
                        height: '4.3rem',
                        filter: 'invert(0)',
                        opacity: '1',
                        transform: 'scale(1) rotate(0deg)',
                     }}
                     fluid
                     src={userInfo && userInfo.avatar && userInfo.avatar.url}
                  />
                  <p className="my-2 h5 text-white">
                     {userInfo && userInfo.name}
                  </p>
                  <strong
                     className="text-capitalize text-left"
                     style={{ fontSize: '11px', color: '#fafafa' }}
                  >
                     <SecurityIcon
                        className="mr-1"
                        style={{ width: '14px', fill: '#fafafa' }}
                     />
                     Quản trị viên
                  </strong>
               </div>
            </SidebarHeader>
            <Menu iconShape="circle">
               <MenuItem icon={<DashboardIcon />}>
                  Dashboard
                  <Link to="/admin" />
               </MenuItem>
               <MenuItem icon={<PersonIcon />}>
                  Người dùng
                  <Link to="/admin/userlist" />
               </MenuItem>

               <MenuItem icon={<AssignmentIcon />}>
                  Đơn hàng
                  <Link to="/admin/orderlist" />
               </MenuItem>

               <SubMenu title="Sản phẩm" icon={<FilterVintageIcon />}>
                  <MenuItem>
                     Danh sách
                     <Link to="/admin/productlist" />
                  </MenuItem>
                  <MenuItem>
                     Thêm sản phẩm
                     <Link to="/admin/product/create" />
                  </MenuItem>
               </SubMenu>

               <MenuItem icon={<PersonIcon />}>
                  Đánh giá
                  <Link to="/admin/listreviews" />
               </MenuItem>

               <MenuItem icon={<PersonIcon />}>
                  Nhà cung cấp
                  <Link to="/admin/supplierlist" />
               </MenuItem>

               <MenuItem icon={<CategoryIcon />}>
                  Danh mục
                  <Link to="/admin/categorieslist" />
               </MenuItem>
               <MenuItem icon={<NatureIcon />}>
                  Danh mục con
                  <Link to="/admin/subcategorieslist" />
               </MenuItem>

               <MenuItem icon={<LoyaltyIcon />}>
                  Sale
                  <Link to="/admin/salelist" />
               </MenuItem>

               <MenuItem icon={<ConfirmationNumberIcon />}>
                  Mã giảm giá
                  <Link to="/admin/codelist" />
               </MenuItem>
            </Menu>
         </ProSidebar>
         ;
      </>
   );
};

export default SideBar;
