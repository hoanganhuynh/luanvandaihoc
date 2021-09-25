// import { Menu } from '@material-ui/core'
// import { Link } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { deepOrange } from '@material-ui/core/colors'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import { black } from 'colors'
import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, useHistory } from 'react-router-dom'
import { listCategories } from '../actions/categoryAction'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { listSubCategory } from '../actions/subCategoryAction'

const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
   },
})((props) => (
   <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'center',
      }}
      transformOrigin={{
         vertical: 'top',
         horizontal: 'center',
      }}
      {...props}
   />
))

const StyledMenuItem = withStyles((theme) => ({
   root: {
      '&:focus': {
         backgroundColor: theme.palette.primary.main,
         '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
         },
      },
   },
}))(MenuItem)

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   paper: {
      marginRight: theme.spacing(1),
      zIndex: '7 !important',
   },
   orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4),
   },
   link: {
      color: black,
      '&:hover': {
         color: '#002984',
         textDecoration: 'none',
      },
      '&:active': {
         color: '#002984',
         textDecoration: 'none',
      },
      '&:visited': {
         color: '#002984',
         textDecoration: 'none',
      },
   },
}))

const StyledBadge = withStyles((theme) => ({
   badge: {
      right: -5,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '11px 8px',
      borderRadius: '50%',
   },
}))(Badge)

function Header(props) {
   const classes = useStyles()
   const [open, setOpen] = React.useState(false)
   const anchorRef = React.useRef(null)
   const anchorReff = React.useRef(null)
   const history = useHistory()
   const [anchorEl, setAnchorEl] = useState(null)
   // const [menu, setMenu] = useState(false)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const menu = (
      <Menu>
         <Menu.Item key='0'>
            <a to='https://www.antgroup.com'>1st menu item</a>
         </Menu.Item>
         <Menu.Item key='1'>
            <a to='https://www.aliyun.com'>2nd menu item</a>
         </Menu.Item>
         <Menu.Divider />
         <Menu.Item key='3'>3rd menu item</Menu.Item>
      </Menu>
   )

   const userDetails = useSelector((state) => state.userDetails)
   const { user } = userDetails

   const categoriesList = useSelector((state) => state.categoriesList)
   const { category } = categoriesList

   const subCategoryList = useSelector((state) => state.subCategoryList)
   const { Sub } = subCategoryList

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const dispatch = useDispatch()

   const cart = useSelector((state) => state.cart)
   const { cartItems } = cart

   const logoutHandler = () => {
      firebase.auth().signOut()
      dispatch(logout())
      dispatch({ type: USER_DETAILS_RESET })
      history.push('/')
   }

   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen)
   }

   const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
         return
      }

      setOpen(false)
   }

   function handleListKeyDown(event) {
      if (event.key === 'Tab') {
         event.preventDefault()
         setOpen(false)
      }
   }

   // return focus to the button when we transitioned from !open -> open
   const prevOpen = React.useRef(open)
   useEffect(() => {
      if (prevOpen.current === true && open === false) {
         anchorRef.current.focus()
      }

      dispatch(listCategories())
      dispatch(listSubCategory())

      prevOpen.current = open
   }, [open, userInfo, user])

   return (
      <>
         <Navbar
            expand='lg'
            collapseOnSelect
            className='p-0 pl-5 pr-5 m-0 shadow'
            style={{ backgroundColor: '#fff', height: '5rem' }}
         >
            <Container fluid>
               <LinkContainer to='/'>
                  <Navbar.Brand className='text-uppercase font-weight-bold flex-grow-1 '>
                     {/* <h2>ProShop</h2> */}
                     <Image
                        className=''
                        src='/logo/LOGO-LUANVAN20210821.png'
                        style={{
                           width: '10rem',
                           height: '4.2rem',
                           zIndex: '0',
                        }}
                     />
                  </Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />

               <Route
                  render={({ history }) => <SearchBox history={history} />}
               />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ml-auto' inline>
                     <LinkContainer to='/cart'>
                        <Nav.Link className='text-uppercase'>
                           <IconButton className='cart-icon' aria-label='cart'>
                              <StyledBadge
                                 badgeContent={cartItems.length}
                                 color='secondary'
                              >
                                 <ShoppingCartIcon />
                              </StyledBadge>
                           </IconButton>
                        </Nav.Link>
                     </LinkContainer>

                     {userInfo ? (
                        <>
                           <Button
                              ref={anchorRef}
                              aria-controls={
                                 open ? 'menu-list-grow' : undefined
                              }
                              aria-haspopup='true'
                              onClick={handleToggle}
                              className='ml-2  mt-1 mb-1 rounded-circle'
                           >
                              {userInfo ? (
                                 <Image
                                    className='rounded-circle border border-grey'
                                    src={
                                       userDetails.user
                                          ? userDetails.user?.avatar?.url
                                          : userDetails.user.avatar?.url
                                    }
                                    alt={
                                       userDetails.user && userDetails.user.name
                                    }
                                    style={{
                                       width: '2.5rem',
                                       height: '2.5rem',
                                    }}
                                    fluid
                                 />
                              ) : (
                                 <Avatar className={classes.orange}>
                                    {userInfo.name.substring(0, 1)}
                                 </Avatar>
                              )}
                           </Button>
                           <Popper
                              open={open}
                              anchorEl={anchorRef.current}
                              role={undefined}
                              transition
                              disablePortal
                              style={{ zIndex: '2' }}
                           >
                              {({ TransitionProps, placement }) => (
                                 <Grow
                                    {...TransitionProps}
                                    style={{
                                       transformOrigin:
                                          placement === 'bottom'
                                             ? 'center top'
                                             : 'center bottom',
                                    }}
                                 >
                                    <Paper>
                                       <ClickAwayListener
                                          onClickAway={handleClose}
                                       >
                                          <MenuList
                                             autoFocusItem={open}
                                             id='menu-list-grow'
                                             onKeyDown={handleListKeyDown}
                                          >
                                             {userInfo && userInfo.isAdmin && (
                                                <MenuItem onClick={handleClose}>
                                                   <Link
                                                      to='/admin'
                                                      className={classes.link}
                                                      style={{
                                                         color: 'black',
                                                         fontSize: '0.8rem',
                                                         letterSpacing:
                                                            '0.05rem',
                                                      }}
                                                   >
                                                      <Image
                                                         src='https://img.icons8.com/fluent/24/000000/user-male-circle.png'
                                                         className='pr-1'
                                                      />
                                                      <strong className='text-capitalize'>
                                                         Quản lí
                                                      </strong>
                                                   </Link>
                                                </MenuItem>
                                             )}
                                             <MenuItem onClick={handleClose}>
                                                <Link
                                                   to='/profile'
                                                   className={classes.link}
                                                   style={{
                                                      color: 'black',
                                                      fontSize: '0.8rem',
                                                      letterSpacing: '0.05rem',
                                                   }}
                                                >
                                                   <Image
                                                      src='https://img.icons8.com/fluent/24/000000/user-male-circle.png'
                                                      className='pr-1'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Thông tin cá nhân
                                                   </strong>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem onClick={handleClose}>
                                                <Link
                                                   to='/myorders'
                                                   className={classes.link}
                                                   style={{
                                                      color: 'black',
                                                      fontSize: '0.8rem',
                                                      letterSpacing: '0.05rem',
                                                   }}
                                                >
                                                   <Image
                                                      src='https://img.icons8.com/fluent/24/000000/receipt-dollar.png'
                                                      className='pr-1'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Đơn hàng của tôi
                                                   </strong>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem onClick={handleClose}>
                                                <Link
                                                   to='/profile/address'
                                                   className={classes.link}
                                                   style={{
                                                      color: 'black',
                                                      fontSize: '0.8rem',
                                                      letterSpacing: '0.05rem',
                                                   }}
                                                >
                                                   <Image
                                                      width='25px'
                                                      src='https://image.flaticon.com/icons/png/512/684/684908.png'
                                                      className='pr-1'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Quản lí địa chỉ
                                                   </strong>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem
                                                onClick={logoutHandler}
                                                style={{
                                                   color: 'black',
                                                   fontSize: '0.8rem',
                                                   letterSpacing: '0.05rem',
                                                }}
                                             >
                                                <Link
                                                   to='/'
                                                   className={classes.link}
                                                   style={{
                                                      color: 'black',
                                                      fontSize: '0.8rem',
                                                      letterSpacing: '0.05rem',
                                                   }}
                                                >
                                                   <Image
                                                      className='pr-1'
                                                      src='https://img.icons8.com/fluent/24/000000/exit.png'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Đăng Xuất
                                                   </strong>
                                                </Link>
                                             </MenuItem>
                                          </MenuList>
                                       </ClickAwayListener>
                                    </Paper>
                                 </Grow>
                              )}
                           </Popper>
                        </>
                     ) : (
                        <>
                           <Button
                              ref={anchorRef}
                              aria-controls={
                                 open ? 'menu-list-grow' : undefined
                              }
                              aria-haspopup='true'
                              onClick={handleToggle}
                              className='ml-2 mt-1 mb-1 rounded-circle'
                           >
                              <Image src='https://img.icons8.com/fluent/30/000000/circled-menu.png' />
                           </Button>
                           <Popper
                              open={open}
                              anchorEl={anchorRef.current}
                              role={undefined}
                              transition
                              disablePortal
                              style={{ zIndex: '2' }}
                           >
                              {({ TransitionProps, placement }) => (
                                 <Grow
                                    {...TransitionProps}
                                    style={{
                                       transformOrigin:
                                          placement === 'bottom'
                                             ? 'center top'
                                             : 'center bottom',
                                    }}
                                 >
                                    <Paper>
                                       <ClickAwayListener
                                          onClickAway={handleClose}
                                       >
                                          <MenuList
                                             autoFocusItem={open}
                                             id='menu-list-grow'
                                             onKeyDown={handleListKeyDown}
                                          >
                                             <MenuItem
                                                onClick={handleClose}
                                                style={{
                                                   color: 'black',
                                                   fontSize: '0.8rem',
                                                   letterSpacing: '0.05rem',
                                                }}
                                             >
                                                <Link
                                                   to='/login'
                                                   className={classes.link}
                                                >
                                                   <Image
                                                      className='pr-1'
                                                      src='https://img.icons8.com/fluent/24/000000/key.png'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Đăng Nhập
                                                   </strong>
                                                </Link>
                                             </MenuItem>
                                             <MenuItem
                                                onClick={handleClose}
                                                style={{
                                                   color: 'black',
                                                   fontSize: '0.8rem',
                                                   letterSpacing: '0.05rem',
                                                }}
                                             >
                                                <Link
                                                   to='/register'
                                                   className={classes.link}
                                                >
                                                   <Image
                                                      className='pr-1'
                                                      src='https://img.icons8.com/fluent/24/000000/new-contact.png'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Đăng Kí
                                                   </strong>
                                                </Link>
                                             </MenuItem>
                                          </MenuList>
                                       </ClickAwayListener>
                                    </Paper>
                                 </Grow>
                              )}
                           </Popper>
                        </>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         {/* <Row>
          <Col md={12} className='pl-5'> */}
         {/* <div className='d-flex justify-content-around'>
            {category &&
              category.map((cat) => (
                <div className='container_link_color'>
                  <Dropdown overlay={menu}>
                    <Link
                      to='/product'
                      className='ant-dropdown-link text-decoration-none link_color'
                      onClick={(e) => e.preventDefault()}
                      style={{ fontSize: '1rem' }}
                    >
                      {cat.name}
                      <DownOutlined
                        className='pl-1'
                        style={{ fontSize: '0.5rem' }}
                      />
                    </Link>
                  </Dropdown>
                </div>
              ))}
          </div> */}
         <div className='p-2'>
            <ul className='navbar-4'>
               <li id='cate'>
                  <a href='#'></a>
                  <span className='fa fa-bars'></span> Danh mục
               </li>
               <li>
                  <a href='/'></a>
                  <span className='fa fa-home'></span> Trang chủ
               </li>
               <li>
                  <a href='#'></a>Giới thiệu
               </li>
               <li>
                  <a href='#'></a>Liên hệ
               </li>
            </ul>
            <div id='float-cate' className='float-cate'>
               <div id='menu'>
                  <ul className='parent-menu'>
                     {category &&
                        category.map((cat) => (
                           <li>
                              {cat.name}
                              <ul>
                                 {Sub &&
                                    Sub?.map(
                                       (s) =>
                                          s.category === cat._id && (
                                             <li>
                                                <Link
                                                   to={`/product/${s._id}/category`}
                                                >
                                                   {s.name}
                                                </Link>
                                             </li>
                                          )
                                    )}
                              </ul>
                              <span className='fa fa-chevron-right'></span>
                           </li>
                        ))}
                  </ul>
               </div>
            </div>
         </div>

         {/* </Col>
        </Row> */}
      </>
   )
}

export default Header
