import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
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
import { Close, Message } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import clsx from 'clsx'
import { format, utcToZonedTime } from 'date-fns-tz'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import '../../notisfied.css'
import {
   createSupplier,
   deleteSupplier,
   listSupplierAdm,
} from '../../actions/supplierActions'
import Announcement from '../../components/Announcement'
import Loader from '../../components/Loader'
import MessageSuccess from '../../components/MessageSuccess'
import SkeletonEffect from '../../components/SkeletonEffect'
import SideBar from './components/SideBar'
import Header from './components/Header'

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
      id: 'create',
      numeric: true,
      disablePadding: false,
      label: 'THỜI GIAN TẠO',
   },
   {
      id: 'update',
      numeric: true,
      disablePadding: false,
      label: 'THỜI GIAN CẬP NHẬT',
   },

   { id: 'action', numeric: true, disablePadding: false, label: '' },
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

const SupplierListScreen = () => {
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

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = supplier.map((sup) => sup._id)
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

   const [open, setOpen] = useState(false)
   const [name, setName] = useState('')

   const handleClickOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const supplierListAdm = useSelector((state) => state.supplierListAdm)
   const { loading, error, supplier } = supplierListAdm

   const supplierDelete = useSelector((state) => state.supplierDelete)
   const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
   } = supplierDelete

   const supplierCreate = useSelector((state) => state.supplierCreate)
   const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      supplier: createdProduct,
   } = supplierCreate

   const emptyRows =
      supplier !== undefined &&
      rowsPerPage - Math.min(rowsPerPage, supplier.length - page * rowsPerPage)

   const deleteHandle = (id) => {
      if (window.confirm('Bạn có chắc?')) {
         dispatch(deleteSupplier({ id }))
         setSelected([])
      }
   }

   const EnhancedTableToolbar = (props) => {
      const classes = useToolbarStyles()
      const { numSelected } = props

      const did = supplier.find((cat) => cat._id)
      return (
         <Toolbar
            className={clsx(classes.root, {
               [classes.highlight]: numSelected > 0,
            })}
         >
            {numSelected > 0 ? (
               <Typography
                  className={classes.title}
                  color='inherit'
                  variant='subtitle1'
                  component='div'
               >
                  {numSelected} selected
               </Typography>
            ) : (
               <Typography
                  className={classes.title}
                  variant='h6'
                  id='tableTitle'
                  component='div'
               >
                  <h2>DANH SÁCH NHÀ CUNG CẤP</h2>
               </Typography>
            )}

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
            )}
         </Toolbar>
      )
   }

   EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
   }

   useEffect(() => {
      if (userInfo) {
         dispatch(listSupplierAdm())
      }
   }, [dispatch, userInfo, successCreate, successDelete])

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(createSupplier(name))
   }

   const submitHandlerDetails = (e) => {
      e.preventDefault()
      dispatch(createSupplier(name))
   }

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col md={10} className='pl-0'>
               {loadingDelete && (
                     <MessageSuccess variant='Đã xoá thành công'></MessageSuccess>
                  ) && <SkeletonEffect />}
               {errorDelete && <Message>{errorDelete}</Message>}
               {loadingCreate && (
                  <MessageSuccess
                     variant={'Đã thêm ' + name + ' thành công'}
                  ></MessageSuccess>
               )}
               {errorCreate && <Message>{errorCreate}</Message>}
               {loading ? (
                  <SkeletonEffect />
               ) : error ? (
                  <Announcement variant='danger'>{error}</Announcement>
               ) : (
                  <>
                     <div>
                        <Dialog
                           disableBackdropClick
                           disableEscapeKeyDown
                           open={open}
                           onClose={handleClose}
                           aria-labelledby='form-dialog-title'
                           maxWidth='xl'
                        >
                           <div className='d-flex justify-content-end'>
                              <Button
                                 onClick={handleClose}
                                 className='p-1 m-1 rounded-pill'
                                 variant='light'
                              >
                                 <Close />
                              </Button>
                           </div>

                           <DialogContent style={{ width: '30rem' }}>
                              <h4 className='text-center'>Thêm nhà cung cấp</h4>
                              <Form onSubmit={submitHandler}>
                                 <Form.Group>
                                    <Form.Label as='p' className='mb-1'>
                                       Tên nhà cung cấp
                                    </Form.Label>
                                    <Form.Control
                                       className='border border-grey rounded-pill'
                                       type='name'
                                       size='normal'
                                       placeholder='Enter name'
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                 </Form.Group>
                                 <div className='pl-3 pr-3 text-center'>
                                    <Button
                                       type='submit'
                                       size='sm'
                                       variant='outline-light'
                                       className='rounded-pill btn-b btn_color_created pl-5 pr-5'
                                       style={{
                                          fontSize: '1rem',
                                          letterSpacing: '0.25rem',
                                       }}
                                    >
                                       Tạo
                                    </Button>
                                 </div>
                              </Form>
                           </DialogContent>
                        </Dialog>
                     </div>

                     <div className={classes.root}>
                        <div className='d-flex justify-content-end'>
                           <Button
                              variant='outline-light'
                              className='my-2 text-uppercase rounded-pill pt-2 pb-2'
                              onClick={handleClickOpen}
                              size='normal'
                           >
                              <i className='fas fa-plus'></i> Thêm nhà cung cấp
                           </Button>
                        </div>
                        <Paper className={classes.paper}>
                           <TableContainer
                              className='text-center p-5'
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
                                    rowCount={supplier.length}
                                 />
                                 <TableBody>
                                    {stableSort(
                                       supplier,
                                       getComparator(order, orderBy)
                                    )
                                       .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                       )
                                       .map((sup, index) => {
                                          const isItemSelected = isSelected(
                                             sup._id
                                          )
                                          const labelId = `enhanced-table-checkbox-${index}`

                                          return (
                                             <TableRow
                                                hover
                                                onClick={(event) =>
                                                   handleClick(event, sup._id)
                                                }
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={sup._id}
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
                                                   {sup._id}
                                                </TableCell>
                                                <TableCell
                                                   align='left'
                                                   className='text-center'
                                                >
                                                   {sup.name}
                                                </TableCell>
                                                <TableCell align='center'>
                                                   {format(
                                                      new utcToZonedTime(
                                                         sup.createdAt,
                                                         'Asia/Ho_Chi_Minh'
                                                      ),
                                                      'HH:mm:ss - dd/MM/yyyy',
                                                      {
                                                         timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                      }
                                                   )}
                                                </TableCell>
                                                <TableCell align='center'>
                                                   {format(
                                                      new utcToZonedTime(
                                                         sup.updatedAt,
                                                         'Asia/Ho_Chi_Minh'
                                                      ),
                                                      'HH:mm:ss - MM/dd/yyyy',
                                                      {
                                                         timeZone:
                                                            'Asia/Ho_Chi_Minh',
                                                      }
                                                   )}
                                                </TableCell>

                                                <TableCell align='center'>
                                                   <LinkContainer
                                                      to={`/admin/supplier/${sup._id}/edit`}
                                                   >
                                                      <Button
                                                         variant='outline-light'
                                                         className='btn-sm rounded-pill btn_color_details'
                                                      >
                                                         CHI TIẾT
                                                      </Button>
                                                   </LinkContainer>
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
                              count={supplier.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                           />
                        </Paper>
                        <FormControlLabel
                           control={
                              <Switch
                                 checked={dense}
                                 onChange={handleChangeDense}
                              />
                           }
                           label='Dense padding'
                        />
                     </div>
                  </>
               )}
            </Col>
         </Row>
      </>
   )
}

export default SupplierListScreen
