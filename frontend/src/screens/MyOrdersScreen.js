import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { listMyOrders } from '../actions/orderActions'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Announcement from '../components/Announcement'
import SkeletonEffect from '../components/SkeletonEffect'
import '../toast.css'
import { format, utcToZonedTime } from 'date-fns-tz'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'

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
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'ID',
   },
   { id: 'name', numeric: true, disablePadding: false, label: 'TÊN SẢN PHẨM' },
   { id: 'date', numeric: true, disablePadding: false, label: 'NGÀY ĐẶT' },
   { id: 'total', numeric: true, disablePadding: false, label: 'TỔNG CỘNG' },
   { id: 'carbs', numeric: true, disablePadding: false, label: 'THANH TOÁN' },
   {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'TRẠNG THÁI',
   },
   {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: '',
   },
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
            {/* <TableCell padding='checkbox'>
               <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
               />
            </TableCell> */}
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align='center'
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  className='pl-5'
                  style={{ fontWeight: '700' }}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
                     {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                           {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                        </span>
                     ) : null}
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
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
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

const EnhancedTableToolbar = (props) => {
   const classes = useToolbarStyles()
   const { numSelected } = props

   return (
      <Toolbar
         className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
         })}
      >
         <Typography
            className={classes.title}
            variant='h6'
            id='tableTitle'
            component='div'
         >
            <h3 className='text-center'> Danh sách đơn hàng</h3>
         </Typography>
      </Toolbar>
   )
}

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      padding: theme.spacing(3),
   },
   paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
   },
   table: {
      minWidth: 750,
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
}))

const MyOrdersScreen = ({ history }) => {
   const classes = useStyles()
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [message, setMessage] = useState(null)
   const [order, setOrder] = React.useState('asc')
   const [orderBy, setOrderBy] = React.useState('date')

   const [selected, setSelected] = React.useState([])
   const [page, setPage] = React.useState(0)
   const [dense, setDense] = React.useState(false)
   const [rowsPerPage, setRowsPerPage] = React.useState(5)

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = orders?.map((n) => n.name)
         setSelected(newSelecteds)
         return
      }
      setSelected([])
   }

   // const handleClick = (event, name) => {
   //    const selectedIndex = selected.indexOf(name)
   //    let newSelected = []

   //    if (selectedIndex === -1) {
   //       newSelected = newSelected.concat(selected, name)
   //    } else if (selectedIndex === 0) {
   //       newSelected = newSelected.concat(selected.slice(1))
   //    } else if (selectedIndex === selected.length - 1) {
   //       newSelected = newSelected.concat(selected.slice(0, -1))
   //    } else if (selectedIndex > 0) {
   //       newSelected = newSelected.concat(
   //          selected.slice(0, selectedIndex),
   //          selected.slice(selectedIndex + 1)
   //       )
   //    }

   //    setSelected(newSelected)
   // }

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

   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error, user } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
   const { success } = userUpdateProfile

   const orderListMy = useSelector((state) => state.orderListMy)
   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

   const emptyRows =
      orders !== undefined &&
      rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage)

   useEffect(() => {
      if (!userInfo) {
         history.push()
      } else {
         // dispatch(getUserDetails('profile'))
         dispatch(listMyOrders())
      }
      window.scrollTo(0, 0)
   }, [dispatch, history, userInfo, user])

   return (
      <>
         <Header />
         {loadingOrders ? (
            <SkeletonEffect />
         ) : errorOrders ? (
            <Announcement variant='danger'>{errorOrders}</Announcement>
         ) : (
            <>
               <div className={classes.root}>
                  <Paper className={classes.paper} boxShadow={3}>
                     <EnhancedTableToolbar numSelected={selected.length} />
                     <TableContainer>
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
                              rowCount={orders?.length}
                           />
                           <TableBody>
                              {stableSort(orders, getComparator(order, orderBy))
                                 .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                 )
                                 .map((row, index) => {
                                    const isItemSelected = isSelected(row.name)
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                       <TableRow
                                          hover
                                          // onClick={(event) =>
                                          //    handleClick(event, row._id)
                                          // }
                                          role='checkbox'
                                          aria-checked={isItemSelected}
                                          tabIndex={-1}
                                          key={row._id}
                                          selected={isItemSelected}
                                       >
                                          {/* <TableCell padding='checkbox'>
                                             <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{
                                                   'aria-labelledby': labelId,
                                                }}
                                             />
                                          </TableCell> */}
                                          <TableCell
                                             component='th'
                                             id={labelId}
                                             scope='row'
                                             align='center'
                                          >
                                             {row._id}
                                          </TableCell>
                                          <TableCell align='center'>
                                             {row.orderItems.map(
                                                (item, index) => (
                                                   <Row>
                                                      <Col md={12}>
                                                         <TableCell
                                                            key={index}
                                                            className='border-0'
                                                            align='center'
                                                         >
                                                            {item.name.slice(
                                                               0,
                                                               30
                                                            ) + '...'}
                                                         </TableCell>
                                                      </Col>
                                                   </Row>
                                                )
                                             )}
                                          </TableCell>
                                          <TableCell align='center'>
                                             {format(
                                                new utcToZonedTime(
                                                   row.createdAt,
                                                   'Asia/Ho_Chi_Minh'
                                                ),
                                                'HH:mm:ss - dd/MM/yyyy',
                                                { timeZone: 'Asia/Ho_Chi_Minh' }
                                             )}
                                          </TableCell>
                                          <TableCell align='center'>
                                             {formatMoney(row.totalPrice, 'đ')}
                                          </TableCell>
                                          <TableCell align='center'>
                                             {row.paymentMethod ===
                                                'Thanh toán bằng tiền mặt' &&
                                             row.isDelivered ? (
                                                <strong className='mb-0'>
                                                   {format(
                                                      new utcToZonedTime(
                                                         row.deliveredAt,
                                                         'Asia/Ho_Chi_Minh'
                                                      ),
                                                      'HH:mm:ss - dd/MM/yyyy',
                                                      {
                                                         timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                      }
                                                   )}
                                                </strong>
                                             ) : row.paymentMethod ===
                                                  'Thanh toán bằng PayPal' &&
                                               row.isPaid ? (
                                                <strong className='mb-0'>
                                                   {format(
                                                      new utcToZonedTime(
                                                         row.paidAt,
                                                         'Asia/Ho_Chi_Minh'
                                                      ),
                                                      'HH:mm:ss - dd/MM/yyyy',
                                                      {
                                                         timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                      }
                                                   )}
                                                </strong>
                                             ) : (
                                                <i
                                                   className='fas fa-times'
                                                   style={{ color: 'red' }}
                                                />
                                             )}
                                          </TableCell>
                                          <TableCell align='center'>
                                             {row.orderStatus === 'Huỷ' ? (
                                                <strong className='text-danger border border-danger p-2 rounded-pill'>
                                                   {row.orderStatus}
                                                </strong>
                                             ) : row.orderStatus ===
                                               'Đã giao hàng' ? (
                                                <strong className='text-success border border-success p-2 rounded-pill'>
                                                   {row.orderStatus}
                                                </strong>
                                             ) : (
                                                <strong className='text-warning border border-warning p-2 rounded-pill'>
                                                   {row.orderStatus}
                                                </strong>
                                             )}
                                          </TableCell>
                                          <TableCell align='center'>
                                             <LinkContainer
                                                to={`/order/${row._id}`}
                                             >
                                                <div>
                                                   <Button
                                                      style={{
                                                         fontSize: '1rem',
                                                      }}
                                                      variant='outline-light'
                                                      className='text-uppercase p-2 pl-3 pr-3 btn_color_details rounded-pill'
                                                   >
                                                      <i class='fab fa-connectdevelop'></i>
                                                   </Button>
                                                </div>
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
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                     />
                  </Paper>
                  <FormControlLabel
                     control={
                        <Switch checked={dense} onChange={handleChangeDense} />
                     }
                     label='Dense padding'
                  />
               </div>
            </>
         )}
         <Footer />
      </>
   )
}

export default MyOrdersScreen
