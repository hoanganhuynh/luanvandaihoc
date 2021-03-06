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
import GradeIcon from '@material-ui/icons/Grade';
import TwoWheelerIcon from '@material-ui/icons/TwoWheeler';


import { useDispatch, useSelector } from 'react-redux';

// import { Link } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import React, { useEffect, useState, Fragment } from 'react';
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
                     {userInfo.role && userInfo.role === 'admin' ? ('Qu???n tr??? vi??n') : 'Nh??n vi??n b??n h??ng'}
                  </strong>
               </div>
            </SidebarHeader>
            
               {/* <Fragment> */}
            <Menu iconShape="circle">
            {userInfo.role && userInfo.role === 'admin' && (
               <Fragment>
               <MenuItem icon={<DashboardIcon />}>
                  Dashboard
                  <Link to="/admin" />
               </MenuItem>
               <MenuItem icon={<PersonIcon />}>
                  Kh??ch h??ng
                  <Link to="/admin/userlist" />
               </MenuItem>
               <MenuItem icon={<AssignmentIcon />}>
                  ????n h??ng
                  <Link to="/admin/orderlist" />
               </MenuItem>
               <MenuItem icon={<GradeIcon />}>
                  ????nh gi??
                  <Link to="/admin/listreviews" />
               </MenuItem>
               <SubMenu title="S???n ph???m" icon={<FilterVintageIcon />}>
                  <MenuItem>
                     Danh s??ch
                     <Link to="/admin/productlist" />
                  </MenuItem>
                  <MenuItem>
                     Th??m s???n ph???m
                     <Link to="/admin/product/create" />
                  </MenuItem>
               </SubMenu>
               <MenuItem icon={<PersonIcon />}>
                  Nh?? cung c???p
                  <Link to="/admin/supplierlist" />
               </MenuItem>
               <MenuItem icon={<CategoryIcon />}>
                  Danh m???c
                  <Link to="/admin/categorieslist" />
               </MenuItem>
               <MenuItem icon={<NatureIcon />}>
                  Danh m???c con
                  <Link to="/admin/subcategorieslist" />
               </MenuItem>
               <MenuItem icon={<TwoWheelerIcon />}>
                  Shipper
                  <Link to="/admin/orderlistofscreen" />
               </MenuItem>
               <MenuItem icon={<LoyaltyIcon />}>
                  Sale
                  <Link to="/admin/salelist" />
               </MenuItem>
               <MenuItem icon={<ConfirmationNumberIcon />}>
                  M?? gi???m gi??
                  <Link to="/admin/codelist" />
               </MenuItem>
               <SubMenu title="Nh??n vi??n" icon={<PersonIcon />}>
                  <MenuItem>
                     Danh s??ch
                     <Link to="/admin/list-user" />
                  </MenuItem>
                  <MenuItem>
                     Th??m nh??n vi??n
                     <Link to="/admin/create-user" />
                  </MenuItem>
               </SubMenu>
               </Fragment>
            )}
                  {userInfo.role && userInfo.role === 'order' && (
                     <Fragment>
                        <MenuItem icon={<AssignmentIcon />}>
                        ????n h??ng
                        <Link to="/admin/orderlist" />
                     </MenuItem>
                     <MenuItem icon={<TwoWheelerIcon />}>
                  Shipper
                  <Link to="/admin/orderlistofscreen" />
               </MenuItem>
                     </Fragment>
                     )}
            </Menu>
            

               
         </ProSidebar>
         ;
      </>
   );
};

export default SideBar;
