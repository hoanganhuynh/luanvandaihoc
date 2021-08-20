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