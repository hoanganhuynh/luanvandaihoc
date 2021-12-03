
import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SkeletonEffect from '../../components/SkeletonEffect'
import { ordersShipper } from '../../actions/orderActions'

function OrdersDelivered({ location, history }) {
   const dispatch = useDispatch()
   document.querySelector('.header-shipper')?.classList.add('d-none')
   document.querySelector('.header-shipperr')?.classList.add('d-none')

   const { loading, orders } = useSelector(state => state.ordersShipper)

   const showOrders = orders && orders.filter(order => order.orderStatus === 'Đã giao hàng')

   useEffect(() => {
      dispatch(ordersShipper())
   }, [dispatch])

   return (
      <div>
         {loading ? <SkeletonEffect /> : (
            <Fragment>
               <div className='d-flex ' style={{backgroundColor:'green'}}>
                  
                  <Link to="/shipper/orders" ><i class="fas fa-chevron-left" style={{fontSize:'18px', color:'white', position:'relative', top:'16px', left:'20px'}}></i></Link>
                  
                  <div className="text-center  text-success " style={{fontSize:'20px', padding:'10px', color:'white', position:'relative', left:'60px'}}><strong style={{color:'white'}}>ĐƠN HÀNG ĐÃ GIAO</strong></div>
                </div>
               {showOrders && showOrders.map(order => (
                  <div className=" p-3 mb-3" style={{
                   
                     margin:'10px',
                     backgroundColor:'#f9fff8'
                     
                  }}>
                     <div className="text-danger d-flex">Mã đơn hàng: <div style={{color:'black'}}>{order._id}</div></div>
                     <div className="text-danger">Thông tin giao hàng</div>
                     <div>Tên khách hàng: {order.user && order.user.name}</div>
                     <div>Số điện thoại: {order.shippingAddress && order.shippingAddress.numberPhone}</div>
                     <div>Địa chỉ giao hàng: {order.shippingAddress.diaChi}, {order.shippingAddress.xa}, {order.shippingAddress.huyen}, {order.shippingAddress.thanhPho}</div>
                     <Link to={`/shipper/order/${order._id}`}>
                        <div className="d-flex justify-content-end"><span>Xem chi tiết</span></div>
                     </Link>
                     
                     
                    
                  </div>
                  
               ))}
               
               
            </Fragment>

         )}


      </div>
   )
}

export default OrdersDelivered
