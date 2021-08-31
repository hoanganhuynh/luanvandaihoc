import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState , useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { consultOrder } from '../../actions/orderActions'
import Header from './components/Header'
import ListNumbers from './components/ListNumber'
import SideBar from './components/SideBar'
import { PieChart } from 'react-minimal-pie-chart';
import { Chart } from "react-google-charts";

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
   },
}))

function format(n, currency) {
   return n?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const AdminScreen = ({ history }) => {
   const classes = useStyles()
   const dispatch = useDispatch()

   const [consult, setConsult] = useState('currentMonth')

   // const userLogin = useSelector((state) => state.userLogin)
   // const { userInfo } = userLogin

   const orderConsult = useSelector((state) => state.orderConsult)
   const { order } = orderConsult

   const orderList = useSelector((state) => state.orderList)
   const { ordersList } = orderList

   
   var size = ordersList && ordersList.orders.length;
   var countCancel = () => {
      let x = 0;
      ordersList && ordersList.orders.map((z) => {
         if(z.orderStatus == 'Huỷ') x++
      })
      return x;
   }
   var countDelivered = () => {
      let x = 0;
      ordersList && ordersList.orders.map((z) => {
         if(z.orderStatus == 'Đã giao hàng') x++
      })
      return x;
   }
   var countSpending = () => {
      let x = 0;
      ordersList && ordersList.orders.map((z) => {
         if(z.orderStatus == 'Chờ xác nhận') x++
      })
      return x;
   }
   console.log('Tất cả: ',size);
   console.log('Đã huỷ: ',countCancel());
   console.log('Đã giao hàng: ',countDelivered());
   console.log('Chờ xác nhận: ',countSpending());

   const dataMock = [
      { title: 'Đã huỷ', value: countCancel(), color: 'rgb(255, 99, 72)' },
      { title: 'Đã giao hàng:', value: countDelivered(), color: 'rgb(100, 255, 133)' },
      { title: 'Chờ xác nhận:', value: countSpending(), color: 'rgb(255, 206, 72)' },
    ];

   // const orderList = useSelector((state) => state.orderList)
   // const { orders } = orderList

   // // orderDeliver
   
   // console.log('orders', orders)

   // useEffect(() => {
   //    dispatch(listOrders())
      
   // }, [dispatch, history, userInfo])


   const handleChange = (event) => {
      setConsult(event.target.value)
      dispatch(consultOrder({ values: event.target.value }))
   }

   const data = order?.orderFilters.map((cn) => ({
      name: cn._id,
      'Số đơn hàng': cn.count,
      'Tổng doanh thu': cn.total,
   }))

   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#fafafa' }}>
            <Col md={2} className='p-0 '>
               <SideBar />
            </Col>
            <Col
               md={10}
               className='pl-0 pt-4'
               style={{ backgroundColor: '#fff' }}
            >
               <div className="categorylink mb-3 ml-3">
               <span className="fa fa-home"></span>
               <span className="fa fa-angle-right"></span>
               <span>Dashboard</span>
               
            </div>
               <h3 className='ml-3'>Thống kê</h3>
               <ListNumbers />
               <h3 className='ml-3 mt-5 mb-3'>Biểu đồ doanh thu và thống kê đơn hàng</h3>
               <Row>
                  <Col md={5} className='pt-4 pl-4'>
                     <Chart
                        style={{transform:'scale(1.1)'}}
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                           ['Trạng thái đơn hàng', 'Phần Trăm'],
                           ['Huỷ đơn hàng', countCancel()],
                           ['Đã giao hàng', countDelivered()],
                           ['Đang vận chuyển', countSpending()]
                        ]}
                        options={{
                           title: 'Trạng thái đơn hàng',
                           is3D: true,
                        }}
                        rootProps={{ 'data-testid': '2' }}
                           />
                  </Col>
                  <Col md={7}>
                     <div className='d-flex justify-content-end'>
                        <FormControl
                           className={classes.formControl}
                           style={{ zIndex: '4' }}
                        >
                           <InputLabel id='demo-simple-select-label'>
                              Xem theo:
                           </InputLabel>
                           <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={consult}
                              onChange={handleChange}
                              align='center'
                              type='submit'
                           >
                              <MenuItem value={'day7Ago'}>7 ngày trước</MenuItem>
                              <MenuItem value={'currentWeek'}>Tuần này</MenuItem>
                              <MenuItem value={'monthAgo'}>Tháng trước</MenuItem>
                              <MenuItem value={'currentMonth'}>Tháng này</MenuItem>
                              <MenuItem value={'year'}>Cả năm</MenuItem>
                           </Select>
                        </FormControl>
                     </div>
                     <div className='ml-4'>
                     <BarChart
                        width={600}
                        height={300}
                        data={data}
                        style={{ zIndex: '5' }}
                     >
                        <XAxis
                           dataKey='name'
                           stroke='#334443'
                           style={{ fontWeight: '700' }}
                        />
                        <YAxis />
                        <Tooltip
                           wrapperStyle={{
                              width: 220,
                              backgroundColor: '#ccc',
                              fontSize: '0.9rem',
                              fontWeight: '700',
                           }}
                        />

                        <CartesianGrid
                           stroke='#2e5a1c'
                           // strokeDasharray='5 5'
                           type='monotone'
                        />
                        <Bar
                           dataKey={'Tổng doanh thu'}
                           fill='#4e9525'
                           barSize={20}
                        />
                        <Bar dataKey={'Số đơn hàng'} fill='#4e9525' barSize={1} />
                     </BarChart>
                  </div>
                  </Col>
                  
               </Row>
               
               
               

            </Col>
         </Row>
      </>
   )
}

export default AdminScreen
