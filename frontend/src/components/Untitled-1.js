<Navbar
expand='lg'
collapseOnSelect
className='p-0 pl-5 pr-5'
style={{ backgroundColor: '#54bb18', color:'#fff', height:'66px'}}
variant='tabs'
>
    <div class="collapse navbar-collapse pl-2 pr-2" id="main_nav">
        <ul className="navbar-nav">
            <li
                className="nav-item dropdown has-megamenu"
                style={{ fontSize: "0.85rem" }}
            >
                <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    data-bs-toggle="dropdown"
                >
                    Danh mục
                </Link>
                <div
                    className="box-category dropdown-menu megamenu"
                    style={{
                        borderRadius: "4px",
                        background: "transparent",
                        height: "200%",
                    }}
                    role="menu"
                >
                    <div
                        id="menu"
                        className="row g-6"
                        style={{ width: "60rem", padding: "0", height: "inherit" }}
                    >
                        <ul className="parent-menu">
                            {category &&
                                category.map((cat) => (
                                    <li>
                                        {cat.name}
                                        <ul>
                                            {Sub &&
                                                Sub.map((s) => (
                                                    <li>
                                                        <Link to={`/product/${s._id}/category`}>
                                                            {s.category === cat._id && s.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </li>
            <li class="nav-item active" style={{ fontSize: "0.85rem" }}>
                <Link className="nav-link" to="/">
                    Trang chủ
                </Link>
            </li>

            <li class="nav-item active" style={{ fontSize: "0.85rem" }}>
                <Link className="nav-link" to="/">
                    Giới thiệu
                </Link>
            </li>

            <li class="nav-item active" style={{ fontSize: "0.85rem" }}>
            <Link className="nav-link" to="/">
                Liên hệ
            </Link>
        </li>
    </ul>
</div>;

</Navbar>






.parent-menu {
    background-color: #fff;
    min-width: 200px;
    float: left;
    width: 200px;
    border-radius: 4px;
    padding: 0;
  }
  
  .parent-menu li {
    height: 60px;
    line-height: 60px;
    padding: 0 16px;
  }
  
  .parent-menu li ul li {
    padding: 0;
  }
  
  .parent-menu li:hover {
    background-color: rgba(84,187,24,0.1);
    color: #54bb18;
  }


  {s.category === cat._id && s.name}



  /////////////////
  <div className='side_bar'>
            
            <Menu
               // defaultSelectedKeys={selectedKey}
               // defaultOpenKeys={['sub1', 'sub2', 'sub3']}
               mode='inline'
               theme='dark'
               inlineCollapsed={state}
               selectedKeys={selectedKey}
               openKeys={openKeys}
               onOpenChange={onOpenChange}
               style={{ height: '100vh', backgroundColor: '#111' }}
            >
               <Menu.Item key='/admin' icon={<DashboardIcon fontSize='25px' />}>
                  <Link
                     to='/admin'
                     className='text-decoration-none text-white'
                     style={{ fontSize: '0.9rem' }}
                  >
                     Thống kê
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/userlist' icon={<UserOutlined />}>
                  <Link
                     to='/admin/userlist'
                     className='text-decoration-none text-white'
                     style={{ fontSize: '1rem' }}
                  >
                     Người dùng
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/categorieslist' icon={<BookOutlined />}>
                  <Link
                     to='/admin/categorieslist'
                     className='text-decoration-none text-white'
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
                     to='/admin/subcategorieslist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Danh mục con
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/salelist' icon={<PercentageOutlined />}>
                  <Link
                     to='/admin/salelist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Sale
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/codelist' icon={<QrcodeOutlined />}>
                  <Link
                     to='/admin/codelist'
                     className='text-decoration-none'
                     style={{ fontSize: '1rem' }}
                  >
                     Mã giảm giá
                  </Link>
               </Menu.Item>
               <Menu.Item key='/admin/supplierlist' icon={<ShopOutlined />}>
                  <Link
                     to='/admin/supplierlist'
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
                     to='/admin/orderlist'
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
                        to='/admin/productlist'
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
                        to='/admin/product/create'
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