import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import clsx from 'clsx'
import { format, utcToZonedTime } from 'date-fns-tz'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
   deleteOrder,
   filterOrder,
   listOrders,
} from '../../actions/orderActions'
import Announcement from '../../components/Announcement'
import Message from '../../components/Message'
import SkeletonEffect from '../../components/SkeletonEffect'
import '../../notisfied.css'
import Header from './components/Header'
import SideBar from './components/SideBar'

function formatMoney(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1
   }
   if (b[orderBy] > a[orderBy]) {
      return 1
   }
   return 0
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
   const stabilizedThis = array.map((el, index) => [el, index])
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
   })
   return stabilizedThis.map((el) => el[0])
}

const headCells = [
   {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'Mã đơn hàng',
   },
   { id: 'name', numeric: true, disablePadding: false, label: 'NGƯỜI DÙNG' },
   // { id: 'date', numeric: true, disablePadding: false, label: 'NGÀY ĐẶT' },
   { id: 'total', numeric: true, disablePadding: false, label: 'TỔNG TIỀN' },
   { id: 'product', numeric: true, disablePadding: false, label: 'SẢN PHẨM' },
   // { id: 'paid', numeric: true, disablePadding: false, label: 'THANH TOÁN' },
   // {
   //    id: 'delivered',
   //    numeric: true,
   //    disablePadding: false,
   //    label: 'GIAO HÀNG',
   // },
   {
      id: 'status',
      numeric: true,
      disablePadding: false,
      label: 'TRẠNG THÁI',
   },
   { id: 'action', numeric: false, disablePadding: false, label: 'Hành động' },
]

function EnhancedTableHead(props) {
   const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
   } = props
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
   }

   return (
      <TableHead>
         <TableRow>
            <TableCell padding='checkbox'>
               <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
               />
            </TableCell>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align='center'
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  style={{
                     fontWeight: '700',
                     fontSize: '0.8rem',
                  }}
                  className='table_th'
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
                     {/* {orderBy === headCell.id ? (
                        <div
                           className={
                              classes.visuallyHidden + 'text-capitalize'
                           }
                        >
                           {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                        </div>
                     ) : null} */}
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   )
}

EnhancedTableHead.propTypes = {
   classes: PropTypes.object.isRequired,
   numSelected: PropTypes.number.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   onSelectAllClick: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles((theme) => ({
   root: {
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(1),
   },
   highlight:
      theme.palette.type === 'light'
         ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
           }
         : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
           },
   title: {
      flex: '1 1 100%',
   },
}))

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
   },
   table: {
      minWidth: 750,
      align: 'center',
      padding: theme.spacing(1),
   },
   visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
   },

   formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
   },
}))

function OrderListScreen({ history, match }) {
   const classes = useStyles()
   const [order, setOrder] = React.useState('asc')
   const [orderBy, setOrderBy] = React.useState('calories')
   const [selected, setSelected] = React.useState([])
   const [page, setPage] = React.useState(0)
   const [dense, setDense] = React.useState(false)
   const [rowsPerPage, setRowsPerPage] = React.useState(10)

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = ord.map((order) => order._id)
         setSelected(newSelecteds)
         return
      }
      setSelected([])
   }

   const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name)
      let newSelected = []

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, name)
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
         )
      }

      setSelected(newSelected)
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
   }

   const handleChangeDense = (event) => {
      setDense(event.target.checked)
   }

   const isSelected = (name) => selected.indexOf(name) !== -1

   const dispatch = useDispatch()

   const orderList = useSelector((state) => state.orderList)
   const { loading, error, ordersList } = orderList
   console.log('ordersList', orderList)

   const ord = ordersList?.orders

   const orderDelete = useSelector((state) => state.orderDelete)
   const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
   } = orderDelete

   const orderFilter = useSelector((state) => state.orderFilter)
   const {
      loading: loadingFilter,
      error: errorFilter,
      success: successFilter,
      filter,
   } = orderFilter

   const emptyRows =
      ordersList?.orders !== undefined &&
      rowsPerPage -
         Math.min(rowsPerPage, ordersList?.orders.length - page * rowsPerPage)

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin
   console.log('userInfoO', userInfo)

   useEffect(() => {
      console.log('sao k dijt')
      // if (userInfo && userInfo.role && (userInfo.role === 'admin' || userInfo.role === 'order')) {
         dispatch(listOrders())
      // } else {
      //    history.push('/login')
      // }
   }, dispatch)

   const deleteHandle = (id) => {
      if (window.confirm('You are sure?')) {
         dispatch(deleteOrder(id))
      }
   }

   const EnhancedTableToolbar = (props) => {
      const classes = useToolbarStyles()
      const { numSelected } = props

      return (
         <Toolbar
            className={clsx(classes.root, {
               [classes.highlight]: numSelected > 0,
            })}
         >
            {/* {numSelected > 0 ? (
               <Typography
                  className={classes.title}
                  color='inherit'
                  variant='subtitle1'
                  component='div'
               >
                  {numSelected} selected
               </Typography>
            ) : ( */}
            
               <Typography
                  className={classes.title}
                  variant='h6'
                  id='tableTitle'
                  component='div'
               >
                  {' '}
                  <h2 style={{fontSize:'20px', float:'left'}}>Danh sách đơn hàng</h2>
               </Typography>
               <FormControl className={classes.formControl} style={{float:'right'}}>
               Lọc đơn hàng

                  <Select
                     labelId='demo-controlled-open-select-label'
                     id='demo-controlled-open-select'
                     open={open}
                     
                     onClose={handleClose}
                     onOpen={handleOpen}
                     value={orderStatus}
                     onChange={handleChange}
                     className='text-danger text-center text-uppercase'
                  >
                     
                     {stateOrder.map((t) => (
                        <MenuItem className='justify-content-center' value={t} > 
                           {t} 
                        </MenuItem>
                     ))}
                  </Select>
                  
               </FormControl>
            {/* )}

            {numSelected > 0 ? (
               <Tooltip title='Delete'>
                  <IconButton
                     aria-label='delete'
                     onClick={() => deleteHandle(selected)}
                  >
                     <DeleteIcon />
                  </IconButton>
               </Tooltip>
            ) : (
               <Tooltip title='Filter list'>
                  <IconButton aria-label='filter list'>
                     <FilterListIcon />
                  </IconButton>
               </Tooltip>
            )} */}
         </Toolbar>
      )
   }

   EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
   }

   const [open, setOpen] = React.useState(false)

   const handleClose = () => {
      setOpen(false)
   }

   const handleOpen = () => {
      setOpen(true)
   }

   const [orderStatus, setOrderStatus] = useState('')

   const stateOrder = ['Chờ xác nhận', 'Đang vận chuyển', 'Đã giao hàng', 'Huỷ']

   const handleChange = (event) => {
      setOrderStatus(event.target.value)
      dispatch(filterOrder({ orderStatus: event.target.value }))
   }

   return (
      <>
         <Header />

         <Row style={{ backgroundColor: '#fff' }}>

            <Col md={2} className='p-0'>
               <SideBar fluid />
            </Col>
            <Col md={10} className='pl-0'>
               {/* <FormControl className={classes.formControl} style={{float:'right'}}>
                  <InputLabel
                     id='demo-controlled-open-select-label'
                     style={{ fontSize: '1.2rem' }}
                  >
                     Trạng thái đơn hàng
                  </InputLabel>
                  <Select
                     labelId='demo-controlled-open-select-label'
                     id='demo-controlled-open-select'
                     open={open}
                     onClose={handleClose}
                     onOpen={handleOpen}
                     value={orderStatus}
                     onChange={handleChange}
                     className='text-danger text-center text-uppercase'
                  >
                     {stateOrder.map((t) => (
                        <MenuItem className='justify-content-center' value={t}>
                           {t}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl> */}
               {loadingDelete && <SkeletonEffect />}
               {errorDelete && <Message>{errorDelete}</Message>}

               {loadingFilter ? (
                  <SkeletonEffect />
               ) : errorFilter ? (
                  <Announcement variant='danger'>{error}</Announcement>
               ) : filter?.length !== 0 ? (
                  <div className={classes.root}>
                     <Paper className={classes.paper}>
                        <TableContainer
                           className='text-center '
                           style={{
                              borderRadius: '1rem',
                           }}
                        >
                           <EnhancedTableToolbar
                              numSelected={selected.length}
                           />
                           <Table
                              className={classes.table}
                              aria-labelledby='tableTitle'
                              size={dense ? 'small' : 'medium'}
                              aria-label='enhanced table'
                           >
                              <EnhancedTableHead
                                 classes={classes}
                                 numSelected={selected.length}
                                 order={order}
                                 orderBy={orderBy}
                                 onSelectAllClick={handleSelectAllClick}
                                 onRequestSort={handleRequestSort}
                                 rowCount={filter?.length}
                              />
                              <TableBody>
                                 {filter &&
                                    filter
                                       .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                       )
                                       .map((order, index) => {
                                          const isItemSelected = isSelected(
                                             order._id
                                          )
                                          const labelId = `enhanced-table-checkbox-${index}`

                                          return (
                                             <TableRow
                                                hover
                                                onClick={(event) =>
                                                   handleClick(event, order._id)
                                                }
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={order._id}
                                                selected={isItemSelected}
                                                className='p-0'
                                             >
                                                <TableCell
                                                   padding='checkbox'
                                                   className='table_th'
                                                >
                                                   <Checkbox
                                                      checked={isItemSelected}
                                                      inputProps={{
                                                         'aria-labelledby':
                                                            labelId,
                                                      }}
                                                   />
                                                </TableCell>
                                                <TableCell
                                                   id={labelId}
                                                   // scope='row'
                                                   // padding='none'
                                                   align='center'
                                                   className='table_th '
                                                >
                                                   {order._id}
                                                </TableCell>
                                                <TableCell
                                                   align='center'
                                                   // component='th'
                                                   className='text-capitalize table_th'
                                                >
                                                   {order.user &&
                                                      order.user.name}
                                                </TableCell>
                                                {/* <TableCell
                                                   align='center'
                                                   className='table_th'
                                                >
                                                   {format(
                                                      new utcToZonedTime(
                                                         order.createdAt,
                                                         'Asia/Ho_Chi_Minh'
                                                      ),
                                                      'HH:mm:ss - dd/MM/yyyy',
                                                      {
                                                         timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                      }
                                                   )}
                                                </TableCell> */}
                                                <TableCell
                                                   align='center'
                                                   className='table_th'
                                                >
                                                   {formatMoney(
                                                      order.totalPrice,
                                                      'đ'
                                                   )}
                                                </TableCell>
                                                <TableCell
                                                   align='center'
                                                   className='table_th'
                                                >
                                                   {order.orderItems &&
                                                      order.orderItems.map(
                                                         (q) =>
                                                            q.name.slice(
                                                               0,
                                                               20
                                                            ) + '...'
                                                      )}
                                                </TableCell>

                                                {/* <TableCell
                                                   align='center'
                                                   style={{
                                                      color: 'green',
                                                      fontWeight: '700',
                                                   }}
                                                   className='table_th'
                                                >
                                                   {order.isPaid ? (
                                                      format(
                                                         new utcToZonedTime(
                                                            order.paidAt,
                                                            'Asia/Ho_Chi_Minh'
                                                         ),
                                                         'HH:mm:ss - dd/MM/yyyy',
                                                         {
                                                            timeZone:
                                                               'Asia/Ho_Chi_Minh',
                                                         }
                                                      )
                                                   ) : (
                                                      <i
                                                         className='fas fa-times'
                                                         style={{
                                                            color: 'red',
                                                         }}
                                                      ></i>
                                                   )}
                                                </TableCell>
                                                <TableCell
                                                   align='center'
                                                   style={{
                                                      color: 'green',
                                                      fontWeight: '700',
                                                   }}
                                                   className='table_th'
                                                >
                                                   {order.isDelivered ? (
                                                      format(
                                                         new utcToZonedTime(
                                                            order.deliveredAt,
                                                            'Asia/Ho_Chi_Minh'
                                                         ),
                                                         'HH:mm:ss - dd/MM/yyyy',
                                                         {
                                                            timeZone:
                                                               'Asia/Ho_Chi_Minh',
                                                         }
                                                      )
                                                   ) : (
                                                      <i
                                                         className='fas fa-times'
                                                         style={{
                                                            color: 'red',
                                                         }}
                                                      ></i>
                                                   )}
                                                </TableCell> */}
                                                <TableCell
                                                   align='center'
                                                   // component='th'
                                                   className='text-capitalize table_th'
                                                >
                                                   {order.orderStatus ===
                                                   'Huỷ' ? (
                                                      <strong className='text-danger  p-2 rounded-pill'>
                                                         {order.orderStatus}
                                                      </strong>
                                                   ) : order.orderStatus ===
                                                     'Đã giao hàng' ? (
                                                      <strong className='text-success  p-2 rounded-pill'>
                                                         {order.orderStatus}
                                                      </strong>
                                                   ) : (
                                                      <strong className='text-warning p-2 rounded-pill'>
                                                         {order.orderStatus}
                                                      </strong>
                                                   )}
                                                </TableCell>
                                                <TableCell
                                                   align='center'
                                                   className='table_th'
                                                >
                                                   <LinkContainer
                                                      to={`/admin/order/${order._id}/edit`}
                                                   >
                                                      <Button
                                                         variant='outline-dark'
                                                         className='btn-sm btn-unique rounded-pill'
                                                      >
                                                         <BubbleChartOutlinedIcon
                                                            style={{
                                                               fontSize:
                                                                  '1.2rem',
                                                            }}
                                                         />
                                                      </Button>
                                                   </LinkContainer>
                                                </TableCell>
                                             </TableRow>
                                          )
                                       })}
                                 {emptyRows > 0 && (
                                    <TableRow
                                       style={{
                                          height: (dense ? 33 : 53) * emptyRows,
                                       }}
                                    >
                                       <TableCell colSpan={6} />
                                    </TableRow>
                                 )}
                              </TableBody>
                           </Table>
                        </TableContainer>
                        <TablePagination
                           rowsPerPageOptions={[5, 10, 15, 20, 25]}
                           component='div'
                           count={filter?.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           onChangePage={handleChangePage}
                           onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                     </Paper>
                    
                  </div>
               ) : loading ? (
                  <SkeletonEffect />
               ) : error ? (
                  <Announcement variant='danger'>{error}</Announcement>
               ) : (
                  <>
                     <div className={classes.root}>
                        <Paper className={classes.paper}>
                           <TableContainer
                              className='text-center '
                              style={{
                                 borderRadius: '1rem',
                              }}
                           >
                              <EnhancedTableToolbar
                                 numSelected={selected.length}
                              />
                              <Table
                                 className={classes.table}
                                 aria-labelledby='tableTitle'
                                 size={dense ? 'small' : 'medium'}
                                 aria-label='enhanced table'
                              >
                                 <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={ordersList?.orders.length}
                                 />
                                 <TableBody>
                                    {ordersList &&
                                       ordersList.orders
                                          .slice(
                                             page * rowsPerPage,
                                             page * rowsPerPage + rowsPerPage
                                          )
                                          .map((order, index) => {
                                             const isItemSelected = isSelected(
                                                order._id
                                             )
                                             const labelId = `enhanced-table-checkbox-${index}`

                                             return (
                                                <TableRow
                                                   hover
                                                   onClick={(event) =>
                                                      handleClick(
                                                         event,
                                                         order._id
                                                      )
                                                   }
                                                   role='checkbox'
                                                   aria-checked={isItemSelected}
                                                   tabIndex={-1}
                                                   key={order._id}
                                                   selected={isItemSelected}
                                                   className='p-0'
                                                >
                                                   <TableCell
                                                      padding='checkbox'
                                                      className='table_th'
                                                   >
                                                      <Checkbox
                                                         checked={
                                                            isItemSelected
                                                         }
                                                         inputProps={{
                                                            'aria-labelledby':
                                                               labelId,
                                                         }}
                                                      />
                                                   </TableCell>
                                                   <TableCell
                                                      id={labelId}
                                                      // scope='row'
                                                      // padding='none'
                                                      align='center'
                                                      className='table_th '
                                                   >
                                                      {order._id}
                                                   </TableCell>
                                                   <TableCell
                                                      align='center'
                                                      // component='th'
                                                      className='text-capitalize table_th'
                                                   >
                                                      {order.user &&
                                                         order.user.name}
                                                   </TableCell>
                                                   {/* <TableCell
                                                      align='center'
                                                      className='table_th'
                                                   >
                                                      {format(
                                                         new utcToZonedTime(
                                                            order.createdAt,
                                                            'Asia/Ho_Chi_Minh'
                                                         ),
                                                         'HH:mm:ss - dd/MM/yyyy',
                                                         {
                                                            timeZone:
                                                               'Asia/Ho_Chi_Minh',
                                                         }
                                                      )}
                                                   </TableCell> */}
                                                   <TableCell
                                                      align='center'
                                                      className='table_th'
                                                   >
                                                      {formatMoney(
                                                         order.totalPrice,
                                                         'đ'
                                                      )}
                                                   </TableCell>
                                                   <TableCell
                                                      align='center'
                                                      className='table_th'
                                                   >
                                                      {order.orderItems &&
                                                         order.orderItems.map(
                                                            (q) =>
                                                               q.name.slice(
                                                                  0,
                                                                  10
                                                               ) + '...'
                                                         )}
                                                   </TableCell>

                                                   {/* <TableCell
                                                      align='center'
                                                      style={{
                                                         color: 'green',
                                                         fontWeight: '700',
                                                      }}
                                                      className='table_th'
                                                   >
                                                      {order.isPaid ? (
                                                         format(
                                                            new utcToZonedTime(
                                                               order.paidAt,
                                                               'Asia/Ho_Chi_Minh'
                                                            ),
                                                            'HH:mm:ss - dd/MM/yyyy',
                                                            {
                                                               timeZone:
                                                                  'Asia/Ho_Chi_Minh',
                                                            }
                                                         )
                                                      ) : (
                                                         <i
                                                            className='fas fa-times'
                                                            style={{
                                                               color: 'red',
                                                            }}
                                                         ></i>
                                                      )}
                                                   </TableCell>
                                                   <TableCell
                                                      align='center'
                                                      style={{
                                                         color: 'green',
                                                         fontWeight: '700',
                                                      }}
                                                      className='table_th'
                                                   >
                                                      {order.isDelivered ? (
                                                         format(
                                                            new utcToZonedTime(
                                                               order.deliveredAt,
                                                               'Asia/Ho_Chi_Minh'
                                                            ),
                                                            'HH:mm:ss - dd/MM/yyyy',
                                                            {
                                                               timeZone:
                                                                  'Asia/Ho_Chi_Minh',
                                                            }
                                                         )
                                                      ) : (
                                                         <i
                                                            className='fas fa-times'
                                                            style={{
                                                               color: 'red',
                                                            }}
                                                         ></i>
                                                      )}
                                                   </TableCell> */}
                                                   <TableCell
                                                      align='center'
                                                      // component='th'
                                                      className='text-capitalize table_th'
                                                   >
                                                      {order.orderStatus ===
                                                      'Huỷ' ? (
                                                         <strong className='text-danger  p-2 rounded-pill'>
                                                            {order.orderStatus}
                                                         </strong>
                                                      ) : order.orderStatus ===
                                                        'Đã giao hàng' ? (
                                                         <strong className='text-success  p-2 rounded-pill'>
                                                            {order.orderStatus}
                                                         </strong>
                                                      ) : (
                                                         <strong className='text-warning p-2 rounded-pill'>
                                                            {order.orderStatus}
                                                         </strong>
                                                      )}
                                                   </TableCell>
                                                   <TableCell
                                                      align='center'
                                                      className='table_th'
                                                   >
                                                      <LinkContainer
                                                         to={`/admin/order/${order._id}/edit`}
                                                         style={{marginRight:'4px'}}
                                                      >
                                                         <Button
                                                            className='btn_description'
                                                         >
                                                           Xem
                                                         </Button>
                                                      </LinkContainer>
                                                      
                                    <Button
                                    aria-label='delete'
                                    onClick={() => deleteHandle(selected)}
                                      className='btn_delete'
                                      style={{borderRadius:'9px',
                                              backgroundColor:'#ff9400',
                                              border:'1px solid black',
                                              color: 'white'
                                          }}
                                    >
                                      Xoá
                                    </Button>
                                                   </TableCell>
                                                </TableRow>
                                             )
                                          })}
                                    {emptyRows > 0 && (
                                       <TableRow
                                          style={{
                                             height:
                                                (dense ? 33 : 53) * emptyRows,
                                          }}
                                       >
                                          <TableCell colSpan={6} />
                                       </TableRow>
                                    )}
                                 </TableBody>
                              </Table>
                           </TableContainer>
                           <TablePagination
                              rowsPerPageOptions={[5, 10, 15, 20, 25]}
                              component='div'
                              count={ordersList?.orders.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                           />
                        </Paper>
                      
                     </div>{' '}
                  </>
               )}
            </Col>

         </Row>
      </>
   )
}

export default OrderListScreen
