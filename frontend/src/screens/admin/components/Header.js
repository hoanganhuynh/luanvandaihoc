// import { Menu } from '@material-ui/core'
// import { Link } from '@material-ui/core'
import { MenuList } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Buttonn from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { deepOrange } from '@material-ui/core/colors'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Menu, notification } from 'antd'
import 'antd/dist/antd.css'
import { black } from 'colors'
import firebase from 'firebase'
import moment from 'moment'
import 'moment/locale/vi'
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import OpenSocket from 'socket.io-client'
import { listCategories } from '../../../actions/categoryAction'
import {
   getNotification,
   notificationCount,
} from '../../../actions/notificationsAction'
import { logout } from '../../../actions/userActions'

moment.locale('vi')

const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
   },
})((props) => (
   <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
         vertical: 'top',
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
      width: '100%',
      maxWidth: '40ch',
      backgroundColor: theme.palette.background.paper,
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
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
   },
}))(Badge)

function Header(props) {
   const classes = useStyles()

   const [open, setOpen] = React.useState(false)
   const [open1, setOpen1] = React.useState(false)
   const anchorRef = React.useRef(null)
   const anchorRef1 = React.useRef(null)
   const history = useHistory()
   const [anchorEl, setAnchorEl] = useState(null)
   const [anchorEl1, setAnchorEl1] = useState(null)
   // const [menu, setMenu] = useState(false)

   const [loadingNotifications, setLoadingNotifications] = useState(false)
   const [notifications, setNotifications] = useState([])
   const [hasFirstFetch, setHasFirstFetch] = useState(false)
   const [visibleNoti, setVisibleNoti] = useState(false)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const userDetails = useSelector((state) => state.userDetails)
   const { user } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const dispatch = useDispatch()

   const notificationsAdm = useSelector((state) => state.notificationsAdm)
   const { notificationsCount, userData } = notificationsAdm

   const userNotification = useSelector((state) => state.userNotification)
   const { notifi } = userNotification

   const not = notifi?.notifications?.reverse()

   const logoutHandler = () => {
      firebase.auth().signOut()
      dispatch(logout())
      history.push('/')
   }

   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen)
   }

   const handleToggle1 = () => {
      setOpen1((prevOpen) => !prevOpen)
   }

   const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
         return
      }

      setOpen(false)
   }

   const handleClose1 = (event) => {
      if (anchorRef1.current && anchorRef1.current.contains(event.target)) {
         return
      }

      setOpen1(false)
   }

   function handleListKeyDown(event) {
      if (event.key === 'Tab') {
         event.preventDefault()
         setOpen(false)
      }
   }

   function handleListKeyDown1(event) {
      if (event.key === 'Tab') {
         event.preventDefault()
         setOpen1(false)
      }
   }

   // return focus to the button when we transitioned from !open -> open
   const prevOpen = React.useRef(open)
   const prevOpen1 = React.useRef(open1)

   const openNotification = useCallback(
      (type, data) => {
         let action = 'đã thanh toán thành công đơn hàng.'
         // let description = `"${data.content}..."`
         let url

         switch (type) {
            case 'create order':
               action = `đã đặt đơn hàng #${data.content?._id}.`
               // description = `"${data.content}..."`
               url = `/admin/orderlist/${data.orderId}`
               break

            default:
               break
         }

         if (data) {
            notification.open({
               message: (
                  <span>
                     <strong>{data.user.name}</strong> đã {action}
                  </span>
               ),
               // description,
               placement: 'bottomLeft',
               icon: <Avatar alt='avatar user' src={data.user.avatar?.url} />,
               duration: 10,
               key: Math.random(),
               closeIcon: null,
               style: {
                  borderRadius: 5,
                  boxShadow: '0 0 20px #ccc',
                  cursor: 'pointer',
               },
               onClick() {
                  history.push(`/admin/orderlist/${data.orderId}`)
               },
            })
         }
      },
      [props]
   )

   useEffect(() => {
      if (prevOpen.current === true && open === false) {
         anchorRef.current.focus()
      }

      if (prevOpen1.current === true && open1 === false) {
         anchorRef1.current.focus()
      }

      dispatch(listCategories())
      // dispatch(getNotifications())

      prevOpen.current = open
      prevOpen1.current = open1

      const socket = OpenSocket('http://localhost:5000')

      socket.on('create order', (orderUser) => {
         openNotification('create order', orderUser)

         dispatch(
            notificationCount({
               count: notificationsCount + 1,
            })
         )
      })

      return () => {
         socket.emit('logout')
      }
   }, [dispatch, notificationsCount, user])

   const openNotificationsDropdown = () => {
      // Nếu có notifications mới hoặc chưa fetch lần nào thì sẽ fetch notifications
      if (!visibleNoti) {
         if (user.notifications?.newNotifications || !hasFirstFetch) {
            setLoadingNotifications(true)
            setNotifications([])
            dispatch(getNotification())
            if (not) {
               setNotifications(notifi?.notifications.reverse())
               dispatch(notificationCount({ count: 0 }))
            }
         }
      }
      setVisibleNoti((pre) => !pre)
   }

   const markAsReadHandler = (index) => {}

   return (
      <>
         <Navbar
            expand='lg'
            collapseOnSelect
            className='p-0 pl-5 pr-5 m-0 shadow sticky-top'
            style={{ backgroundColor: '#fafafa', height: '4rem' ,zIndex:'99' }}
         >
            <Container fluid>
               <LinkContainer to='/'>
                  <Navbar.Brand className='text-uppercase font-weight-bold flex-grow-1 '>
                     <Image
                        src='/logo/LOGO-LUANVAN20210821.png'
                        style={{ width: '9.6rem', height: '4rem', zIndex: '0' }}
                     />
                  </Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />

               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ml-auto' inline>
                     <Buttonn
                        ref={anchorRef1}
                        aria-controls={open1 ? 'menu-list-grow' : undefined}
                        aria-haspopup='true'
                        onClick={handleToggle1}
                        className='ml-2 mt-1 mb-1 rounded-circle'
                     >
                        <IconButton
                           aria-label='cart'
                           onClick={openNotificationsDropdown}
                        >
                           <StyledBadge
                              badgeContent={notificationsCount}
                              max={9}
                              color='secondary'
                           >
                              <NotificationsIcon />
                           </StyledBadge>
                        </IconButton>
                     </Buttonn>
                     <Popper
                        open={open1}
                        anchorEl={anchorRef1.current}
                        role={undefined}
                        transition
                        disablePortal
                        style={{ zIndex: '10'}}
                        className='noti-list'
                     >
                        {({ TransitionProps, placement }) => (
                           <Grow {...TransitionProps}>
                              <Paper>
                                 <ClickAwayListener onClickAway={handleClose1}>
                                    <List
                                       className={classes.root}
                                       autoFocusItem={open}
                                       id='menu-list-grow'
                                       onKeyDown={handleListKeyDown1}
                                    >
                                       {not?.map((notify, index) => (
                                          <Link
                                             to={`/admin/order/${notify.logId.rootId}/edit`}
                                             className='notifications'
                                             // onClick={() =>
                                             //    markAsReadHandler(index)
                                             // }
                                          >
                                             <ListItem
                                                alignItems='flex-start'
                                                onClick={handleClose1}
                                                className='notifications_items'
                                             >
                                                <ListItemAvatar>
                                                   <Avatar
                                                      alt='Remy Sharp'
                                                      src={
                                                         notify.logId.userId
                                                            ?.avatar.url
                                                      }
                                                      style={{
                                                         width: '2.5rem',
                                                         height: '2.5rem',
                                                      }}
                                                   />
                                                </ListItemAvatar>
                                                <div>
                                                   <strong className='text-capitalize'>
                                                      {`${notify.logId.userId?.name} đã đặt hàng #${notify.logId.rootId} thành công.`}
                                                   </strong>

                                                   <p className='text-lowercase'>
                                                      {moment(
                                                         notify.logId.createdAt
                                                      ).fromNow()}
                                                   </p>
                                                </div>
                                                <p>
                                                   {notify.hasRead === true ? (
                                                      ''
                                                   ) : (
                                                      <i
                                                         className='fas fa-circle'
                                                         style={{
                                                            color: 'blueviolet',
                                                         }}
                                                      ></i>
                                                   )}
                                                </p>
                                             </ListItem>
                                          </Link>
                                       ))}
                                    </List>
                                 </ClickAwayListener>
                              </Paper>
                           </Grow>
                        )}
                     </Popper>

                     {userInfo ? (
                        <>
                           <Buttonn
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
                                    src={userDetails.user.avatar?.url}
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
                           </Buttonn>
                           <Popper
                              open={open}
                              anchorEl={anchorRef.current}
                              role={undefined}
                              transition
                              disablePortal
                              style={{ zIndex: '5' }}
                           >
                              {({ TransitionProps, placement }) => (
                                 <Grow {...TransitionProps}>
                                    <Paper>
                                       <ClickAwayListener
                                          onClickAway={handleClose}
                                       >
                                          <MenuList
                                             autoFocusItem={open}
                                             id='menu-list-grow'
                                             onKeyDown={handleListKeyDown}
                                          >
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
                                                      Hồ sơ
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
                           <Buttonn
                              ref={anchorRef}
                              aria-controls={
                                 open ? 'menu-list-grow' : undefined
                              }
                              aria-haspopup='true'
                              onClick={handleToggle}
                              className='ml-2 mt-1 mb-1 rounded-circle'
                           >
                              <Image src='https://img.icons8.com/fluent/30/000000/circled-menu.png' />
                           </Buttonn>
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
      </>
   )
}

export default Header
