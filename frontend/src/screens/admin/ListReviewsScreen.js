import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import BubbleChartOutlinedIcon from '@material-ui/icons/BubbleChartOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
import { format, utcToZonedTime } from 'date-fns-tz';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
   deleteOrder,
   filterOrder,
   listOrders,
} from '../../actions/orderActions';
import {
   approveStatusOfReviews,
   deleteStatusOfReviews,
   filterReviews,
   listAllReviews,
} from '../../actions/reviewsActions';
import Announcement from '../../components/Announcement';
import Message from '../../components/Message';
import SkeletonEffect from '../../components/SkeletonEffect';
import '../../notisfied.css';
import Header from './components/Header';
import SideBar from './components/SideBar';

function formatMoney(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency;
}

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
   const stabilizedThis = array?.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

const headCells = [
   { id: 'name', numeric: true, disablePadding: false, label: 'NGƯỜI DÙNG' },
   { id: 'date', numeric: true, disablePadding: false, label: 'NỘI DUNG' },
   { id: 'rating', numeric: true, disablePadding: false, label: 'ĐIỂM' },
   { id: 'date', numeric: true, disablePadding: false, label: 'SẢN PHẨM' },
   { id: 'status', numeric: true, disablePadding: false, label: 'TRẠNG THÁI' },

   { id: 'action', numeric: false, disablePadding: false, label: 'HÀNH ĐỘNG' },
];

function EnhancedTableHead(props) {
   const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
   } = props;
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
   };

   const [dense, setDense] = React.useState(true);

   return (
      <TableHead>
         <TableRow>
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
                  {headCell.label}
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
}

EnhancedTableHead.propTypes = {
   classes: PropTypes.object.isRequired,
   numSelected: PropTypes.number.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   onSelectAllClick: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

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
}));

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
}));

function ListReviewsScreen({ history, match }) {
   const classes = useStyles();
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('calories');
   const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(0);
   const [dense, setDense] = React.useState(true);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = ord.map((order) => order._id);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangeDense = (event) => {
      setDense(event.target.checked);
   };

   const isSelected = (name) => selected.indexOf(name) !== -1;

   const dispatch = useDispatch();

   const listReviews = useSelector((state) => state.listReviews);
   
   const { loading, error, products } = listReviews;

   const ord = products;

   const count = products?.reduce(
      (sum, pro) => Number(sum) + Number(pro.reviews?.length),
      0
   );

   const approveStatus = useSelector((state) => state.approveStatus);
   const {
      loading: loadingApprove,
      error: errorApprove,
      success: successApprove,
   } = approveStatus;

   const deleteStatus = useSelector((state) => state.deleteStatus);
   const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
   } = deleteStatus;

   const filterReview = useSelector((state) => state.filterReview);
   const {
      loading: loadingFilter,
      error: errorFilter,
      success: successFilter,
      filter,
   } = filterReview;

   const emptyRows =
      products?.orders !== undefined &&
      rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   // useEffect(() => {
   //    if (userInfo && userInfo.isAdmin) {
   //       dispatch(listAllReviews());
   //    } else {
   //       history.push('/login');
   //    }
   // }, [
   //    dispatch,
   //    history,
   //    userInfo,
   //    successApprove,
   //    successDelete,
   //    successFilter,
   // ]);

   useEffect(() => {
      if (userInfo && userInfo.role && userInfo.role === 'admin') {
         dispatch(listAllReviews())
      } else {
         history.push('/login')
      }
   }, [dispatch, history, successDelete, userInfo])

   const EnhancedTableToolbar = (props) => {
      const classes = useToolbarStyles();
      const { numSelected } = props;

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
                  <h2>Danh sách đánh giá</h2>
               </Typography>
            )}

            {numSelected > 0 ? (
               <Tooltip title='Delete'>
                  <IconButton aria-label='delete'>
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
      );
   };

   EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
   };

   const [open, setOpen] = React.useState(false);

   const handleClose = () => {
      setOpen(false);
   };

   const handleOpen = () => {
      setOpen(true);
   };

   const [orderStatus, setOrderStatus] = useState('');

   const stateOrder = ['Đã duyệt', 'Chưa duyệt', 'Xoá'];

   const approveStatusOfReview = (productId, reviewId) => {
      dispatch(
         approveStatusOfReviews({ productId: productId, reviewId: reviewId })
      );
   };

   const deleteStatusOfReview = (productId, reviewId) => {
      dispatch(
         deleteStatusOfReviews({ productId: productId, reviewId: reviewId })
      );
   };

   const handleChange = (event) => {
      setOrderStatus(event.target.value);
      dispatch(filterReviews({ status: event.target.value }));
   };

   return (
      <>
         <Header />

         <Row style={{ backgroundColor: '#fff' }}>
            <Col md={2} className='p-0'>
               <SideBar fluid />
            </Col>
            <Col md={10} className='pl-0'>
            <div className="categorylink mb-3 ml-3 mt-3">
                              <span className="fa fa-home"></span>
                              <span className="fa fa-angle-right"></span>
                              <span>Danh sách đánh giá</span>
                           </div>
               <FormControl className={classes.formControl}>
                  <InputLabel
                     id='demo-controlled-open-select-label'
                     style={{ fontSize: '1.2rem' }}
                  >
                     Trạng thái đánh giá
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
               </FormControl>
               {loadingApprove && <SkeletonEffect />}
               {errorApprove && <Message>{errorApprove}</Message>}

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
                                 rowCount={count}
                              />
                              <TableBody>
                                 {filter?.map((pro) =>
                                    stableSort(
                                       pro.reviews,
                                       getComparator(order, orderBy)
                                    )
                                       .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                       )
                                       .map((cat, index) => {
                                          const isItemSelected = isSelected(
                                             cat._id
                                          );
                                          const labelId = `enhanced-table-checkbox-${index}`;

                                          return (
                                             <TableRow
                                                hover
                                                role='checkbox'
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={cat._id}
                                                selected={isItemSelected}
                                             >
                                                <TableCell
                                                   align='left'
                                                   className='text-center'
                                                >
                                                   {cat.name}
                                                </TableCell>
                                                <TableCell
                                                   align='left'
                                                   className='text-center'
                                                >
                                                   {cat.comment}
                                                </TableCell>
                                                <TableCell
                                                   align='left'
                                                   className='text-center'
                                                >
                                                   {cat.rating}
                                                </TableCell>
                                                <TableCell
                                                   align='left'
                                                   className='text-center'
                                                >
                                                   {pro.name}
                                                </TableCell>
                                                <TableCell
                                                   align='center'
                                                   className='text-center'
                                                >
                                                   {cat.status === 'Xoá' ? (
                                                      <strong className='text-danger  p-2 rounded-pill'>
                                                         {cat.status}
                                                      </strong>
                                                   ) : cat.status ===
                                                     'Đã duyệt' ? (
                                                      <strong className='text-success  p-2 rounded-pill'>
                                                         {cat.status}
                                                      </strong>
                                                   ) : (
                                                      <strong className='text-warning p-2 rounded-pill'>
                                                         {cat.status}
                                                      </strong>
                                                   )}
                                                </TableCell>

                                                <TableCell align='center'>
                                                   <Button
                                                      variant='outline-success'
                                                      className='btn-sm rounded-pill'
                                                      onClick={() =>
                                                         approveStatusOfReview(
                                                            pro._id,
                                                            cat._id
                                                         )
                                                      }
                                                   >
                                                      Duyệt
                                                   </Button>
                                                   <Button
                                                      variant='danger'
                                                      onClick={() =>
                                                         deleteStatusOfReview(
                                                            pro._id,
                                                            cat._id
                                                         )
                                                      }
                                                      className='btn-sm rounded-pill'
                                                   >
                                                      Xoá
                                                   </Button>
                                                </TableCell>
                                             </TableRow>
                                          );
                                       })
                                 )}
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
                           count={count}
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
                                    rowCount={count}
                                 />
                                 <TableBody>
                                    {products?.map((pro) =>
                                       stableSort(
                                          pro.reviews,
                                          getComparator(order, orderBy)
                                       )
                                          .slice(
                                             page * rowsPerPage,
                                             page * rowsPerPage + rowsPerPage
                                          )
                                          .map((cat, index) => {
                                             const isItemSelected = isSelected(
                                                cat._id
                                             );
                                             const labelId = `enhanced-table-checkbox-${index}`;

                                             return (
                                                <TableRow
                                                   hover
                                                   role='checkbox'
                                                   aria-checked={isItemSelected}
                                                   tabIndex={-1}
                                                   key={cat._id}
                                                   selected={isItemSelected}
                                                >
                                                   <TableCell
                                                      align='left'
                                                      className='text-center'
                                                   >
                                                      {cat.name}
                                                   </TableCell>
                                                   <TableCell
                                                      align='left'
                                                      className='text-center'
                                                   >
                                                      {cat.comment}
                                                   </TableCell>
                                                   <TableCell
                                                      align='left'
                                                      className='text-center'
                                                   >
                                                      {cat.rating}
                                                   </TableCell>
                                                   <TableCell
                                                      align='left'
                                                      className='text-center'
                                                   >
                                                      {pro.name}
                                                   </TableCell>
                                                   <TableCell
                                                      align='center'
                                                      className='text-center'
                                                   >
                                                      {cat.status === 'Xoá' ? (
                                                         <strong className='text-danger  p-2 rounded-pill'>
                                                            {cat.status}
                                                         </strong>
                                                      ) : cat.status ===
                                                        'Đã duyệt' ? (
                                                         <strong className='text-success  p-2 rounded-pill'>
                                                            {cat.status}
                                                         </strong>
                                                      ) : (
                                                         <strong className='text-warning p-2 rounded-pill'>
                                                            {cat.status}
                                                         </strong>
                                                      )}
                                                   </TableCell>

                                                   {cat.status === 'Xoá' ? (
                                                         <TableCell align='center'>
                                                         <Button
                                                            variant='outline-success'
                                                            className='btn-sm rounded-pill'
                                                            onClick={() =>
                                                               approveStatusOfReview(
                                                                  pro._id,
                                                                  cat._id
                                                               )
                                                            }
                                                         >
                                                            Khôi phục
                                                         </Button>
                                                      </TableCell>
                                                      ) : cat.status ===
                                                        'Đã duyệt' ? (
                                                         <TableCell align='center'>
                                                      
                                                            <Button
                                                               variant='danger'
                                                               onClick={() =>
                                                                  deleteStatusOfReview(
                                                                     pro._id,
                                                                     cat._id
                                                                  )
                                                               }
                                                               className='btn-sm rounded-pill'
                                                            >
                                                               Xoá
                                                            </Button>
                                                         </TableCell>
                                                      ) : (
                                                         <TableCell align='center'>
                                                         <Button
                                                            variant='outline-success'
                                                            className='btn-sm rounded-pill'
                                                            onClick={() =>
                                                               approveStatusOfReview(
                                                                  pro._id,
                                                                  cat._id
                                                               )
                                                            }
                                                         >
                                                            Duyệt
                                                         </Button>
                                                         <Button
                                                               variant='danger'
                                                               onClick={() =>
                                                                  deleteStatusOfReview(
                                                                     pro._id,
                                                                     cat._id
                                                                  )
                                                               }
                                                               className='btn-sm rounded-pill'
                                                            >
                                                               Xoá
                                                            </Button>
                                                      </TableCell>
                                                      )}



                                                </TableRow>
                                             );
                                          })
                                    )}
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
                              count={count}
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
   );
}

export default ListReviewsScreen;
