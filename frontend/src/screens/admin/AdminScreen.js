import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { consultOrder } from '../../actions/orderActions'
import Header from './components/Header'
import ListNumbers from './components/ListNumber'
import SideBar from './components/SideBar'

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

   const orderConsult = useSelector((state) => state.orderConsult)
   const { order } = orderConsult

 

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
               <h3 className='ml-3'>Thống kê</h3>
               <ListNumbers />
               <div className='d-flex justify-content-end mr-4'>
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
                     width={1100}
                     height={500}
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
      </>
   )
}

export default AdminScreen
