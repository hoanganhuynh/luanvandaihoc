import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table'
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
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import '../../notisfied.css'
import { deleteUser, listUsers } from '../../actions/userActions'
import Announcement from '../../components/Announcement'
import SkeletonEffect from '../../components/SkeletonEffect'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Card from '@material-ui/core/Card'
import { Link } from 'react-router-dom'

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
      label: 'ID',
   },
   { id: 'name', numeric: true, disablePadding: false, label: 'TÊN' },
   {
      id: 'email',
      numeric: true,
      disablePadding: false,
      label: 'ĐỊA CHỈ EMAIL',
   },
   { id: 'isAdmin', numeric: true, disablePadding: false, label: 'Phân quyền' },
   { id: 'action', numeric: true, disablePadding: false, label: 'Hành động' },
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
                  className='pl-2'
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

function ListUserScreen({ history }) {
   const classes = useStyles()
   const [order, setOrder] = React.useState('asc')
   const [orderBy, setOrderBy] = React.useState('calories')
   const [selected, setSelected] = React.useState([])
   const [page, setPage] = React.useState(0)
   const [dense, setDense] = React.useState(false)
   const [rowsPerPage, setRowsPerPage] = React.useState(5)

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }
   const userList = useSelector((state) => state.userList)
   const { loading, error, users } = userList

   const shippers = users && users.filter(user => user.role)
   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = shippers.map((user) => user._id)
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



   const emptyRows =
      users !== undefined &&
      rowsPerPage - Math.min(rowsPerPage, shippers.length - page * rowsPerPage)

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const userDelete = useSelector((state) => state.userDelete)
   const { success: successDelete } = userDelete

   const deleteHandle = (id) => {
      if (window.confirm('You are sure?')) {
         dispatch(deleteUser(id))
      }
   }

   const EnhancedTableToolbar = (props) => {
      const classes = useToolbarStyles()
      const { numSelected } = props

      const did = shippers.find((user) => user._id)

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
               <h2 style={{ fontSize: '20px', float: 'left' }}>Danh sách nhân viên</h2>
            </Typography>
            {/* <Link to="/admin/create-user">
               <div className="btn btn-primary">Thêm shipper</div></Link> */}
            {/* )} */}

            {/* {numSelected > 0 ? (
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

   useEffect(() => {
      // if (userInfo && userInfo.role && userInfo.role === 'admin') {
         dispatch(listUsers())
      // } else {
      //    history.push('/login')
      // }
   }, [dispatch, history, successDelete, userInfo])

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#3ba66b' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0 ' style={{ backgroundColor: '#fff' }}>
               {loading ? (
                  <SkeletonEffect />
               ) : error ? (
                  <Announcement variant='danger'>{error}</Announcement>
               ) : (
                  <>
                     <div className={classes.root} className='rounded card_color '
                        style={{
                           height: 'auto',
                           backgroundColor: '#F8F8F8',
                        }}>
                        <Paper
                           className={classes.paper}
                        // style={{
                        //   borderRadius: '1rem',
                        //   border: '0.25px solid #ddd',
                        // }}
                        >
                           <TableContainer
                              className='text-center p-2'
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
                              // className='border-bottom border-info text-info pb-1'
                              >
                                 <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={shippers.length}
                                 />
                                 <TableBody>
                                    {stableSort(
                                       shippers,
                                       getComparator(order, orderBy)
                                    )
                                       .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                       )
                                       .map((user, index) => {
                                          const isItemSelected = isSelected(
                                             user._id
                                          )
                                          const labelId = `enhanced-table-checkbox-${index}`

                                          return (

                                             <TableRow
                                                hover
                                                onClick={(event) =>
                                                   handleClick(event, user._id)
                                                }
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={user._id}
                                                selected={isItemSelected}
                                             >

                                                <TableCell padding='checkbox'>
                                                   <Checkbox
                                                      checked={isItemSelected}
                                                      inputProps={{
                                                         'aria-labelledby':
                                                            labelId,
                                                      }}
                                                   />
                                                </TableCell>
                                                <TableCell
                                                   component='th'
                                                   id={labelId}
                                                   scope='row'
                                                   padding='none'
                                                   align='center'
                                                >
                                                   {user._id}
                                                </TableCell>
                                                <TableCell
                                                   align='left'
                                                   className='text-center'
                                                >
                                                   {user.name}
                                                </TableCell>
                                                <TableCell align='center'>
                                                   {user.email}
                                                </TableCell>
                                                <TableCell align='center'>
                                                   {' '}
                                                   {user.role && user.role}
                                                   {/* {user.isAdmin ? (
                                                      <i
                                                         className='fas fa-check'
                                                         style={{
                                                            color: 'green',
                                                         }}
                                                      ></i>
                                                   ) : (
                                                      <i
                                                         className='fas fa-times'
                                                         style={{
                                                            color: 'red',
                                                         }}
                                                      ></i>
                                                   )} */}
                                                </TableCell>
                                                <TableCell align='center'>
                                                   <LinkContainer
                                                      to={`/admin/user/${user._id}/edit`}
                                                      style={{ marginRight: '10px' }}
                                                   >
                                                      <Button
                                                         className='btn_description'
                                                      >
                                                         Xem
                                                         {/* <i className='far fa-edit'></i> */}
                                                      </Button>
                                                   </LinkContainer>
                                                   <Button
                                                      aria-label='delete'
                                                      onClick={() => deleteHandle(selected)}
                                                      className='btn_delete'
                                                      style={{
                                                         borderRadius: '9px',
                                                         backgroundColor: '#ff9400',
                                                         border: '1px solid black',
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
                              rowsPerPageOptions={[5, 10, 25]}
                              component='div'
                              count={shippers.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                           />
                        </Paper>
                        {/* <FormControlLabel
                           control={
                              <Switch
                                 checked={dense}
                                 onChange={handleChangeDense}
                              />
                           }
                           label='Dense padding'
                        /> */}
                     </div>
                  </>
               )}
            </Col>
         </Row>
      </>
   )
}

export default ListUserScreen
