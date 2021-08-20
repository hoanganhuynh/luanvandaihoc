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
} from '@ant-design/icons'
import { Link } from '@material-ui/core'
import { Button, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const { SubMenu } = Menu

const SideBar = () => {
   const location = useLocation()

   const [state, setState] = useState(false)
   const [selectedKey, setSelectedKey] = useState('/')
   const [openKeys, setOpenKeys] = useState(['sub2'])

   const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

   const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
         setOpenKeys(keys)
      } else {
         setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
   }

   useEffect(() => {
      let path = location.pathname
      if (path === '/') {
         path = '/home'
      }

      if (
         location.pathname === '/admin/productlist' ||
         location.pathname === '/admin/product/create'
      ) {
         setOpenKeys(['sub1'])
      }

      setSelectedKey(path)
   }, [location])

   const toggleCollapsed = () => {
      setState(!state)
   }

   return (
      <>
         <div className='side_bar'>
            <Button
               type='primary'
               onClick={toggleCollapsed}
               // style={{ marginBottom: 16 }}
            >
               {React.createElement(
                  state ? MenuUnfoldOutlined : MenuFoldOutlined
               )}
            </Button>
            <Menu
               // defaultSelectedKeys={selectedKey}
               // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
               mode='inline'
               theme='dark'
               inlineCollapsed={state}
               selectedKeys={selectedKey}
               openKeys={openKeys}
               onOpenChange={onOpenChange}
               style={{ height: '100vh', backgroundColor: '#b68973' }}
            >
               <Menu.Item key='/admin' icon={<PieChartOutlined />}>
                  <Link
                     href='/admin'
                     className='text-decoration-none '
                     style={{ fontSize: '1rem' }}
                  >
                     Thống kê
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/userlist' icon={<UserOutlined />}>
                  <Link
                     href='/admin/userlist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Người dùng
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/categorieslist' icon={<BookOutlined />}>
                  <Link
                     href='/admin/categorieslist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Danh mục
                  </Link>
               </Menu.Item>
               <Menu.Item
                  key='/admin/subcategorieslist'
                  icon={<ContainerOutlined />}
               >
                  <Link
                     href='/admin/subcategorieslist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Danh mục con
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/salelist' icon={<PercentageOutlined />}>
                  <Link
                     href='/admin/salelist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Sale
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/codelist' icon={<QrcodeOutlined />}>
                  <Link
                     href='/admin/codelist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Mã giảm giá
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/supplierlist' icon={<ShopOutlined />}>
                  <Link
                     href='/admin/supplierlist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Nhà cung cấp
                  </Link>
               </Menu.Item>
               <Menu.Item
                  key='/admin/orderlist'
                  icon={<ReconciliationOutlined />}
               >
                  <Link
                     href='/admin/orderlist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Đơn hàng
                  </Link>
               </Menu.Item>
               <SubMenu
                  key='sub1'
                  icon={<TagsOutlined />}
                  title='Sản phẩm'
                  style={{ fontSize: '1rem' }}
               >
                  <Menu.Item
                     key='/admin/productlist'
                     className='m-0 pb-2'
                     // style={{ backgroundColor: '#587B7F' }}
                  >
                     <Link
                        href='/admin/productlist'
                        className='text-decoration-none'
                        style={{ fontSize: '1rem' }}
                     >
                        Danh sách
                     </Link>
                  </Menu.Item>
                  <Menu.Item
                     key='/admin/product/create'
                     className='m-0  pb-4'
                     style={{ fontSize: '1rem' }}
                     // style={{ backgroundColor: '#587B7F' }}
                  >
                     <Link
                        href='/admin/product/create'
                        className='text-decoration-none'
                     >
                        Thêm
                     </Link>
                  </Menu.Item>
               </SubMenu>
               {/* <SubMenu
            key='sub2'
            icon={<AppstoreOutlined />}
            title='Navigation Two'
          >
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <SubMenu key='sub3' title='Submenu'>
              <Menu.Item key='11'>Option 11</Menu.Item>
              <Menu.Item key='12'>Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
            </Menu>
         </div>
      </>
   )
}

export default SideBar
