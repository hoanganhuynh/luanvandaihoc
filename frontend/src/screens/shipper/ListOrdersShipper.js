
import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SkeletonEffect from '../../components/SkeletonEffect'
import { ordersShipper } from '../../actions/orderActions'
import { logout } from '../../actions/userActions'

function ListOrdersShipper({ location, history }) {
   const dispatch = useDispatch()
   document.querySelector('.header-shipper')?.classList.add('d-none')
   document.querySelector('.header-shipperr')?.classList.add('d-none')

   const { loading, orders } = useSelector(state => state.ordersShipper)

   const showOrders = orders && orders.filter(order => order.orderStatus === 'Đang vận chuyển')


   useEffect(() => {
      dispatch(ordersShipper())
   }, [dispatch])

   return (
      <div>
         {loading ? <SkeletonEffect /> : (
            <Fragment>
               <div className="text-center p-3" 
                     style={{ fontSize:'20px',
                              color:'blue',
                              fontWeight:'bold'
               }}>DANH SÁCH ĐƠN HÀNG</div>
              
               {showOrders && showOrders.map(order => (
                  <div className=" p-3 mb-3 mr-2 ml-2" style={{borderRadius:'7px', backgroundColor:'#f9fff8'}}>
                     
                     
                     <div className="text-danger">Mã đơn hàng: {order._id}</div>
                     <div>Tên khách hàng: {order.user && order.user.name}</div>
                     <div>Số điện thoại: {order.shippingAddress && order.shippingAddress.numberPhone}</div>
                     <div>Địa chỉ giao hàng: {order.shippingAddress.diaChi}, {order.shippingAddress.xa}, {order.shippingAddress.huyen}, {order.shippingAddress.thanhPho}</div>
                     <Link to={`/shipper/order/${order._id}`}>
                        <div className="d-flex justify-content-end" 
                              ><span>Xem chi tiết</span></div>
                     </Link>
                  </div>
               ))}
               <div className="d-flex justify-content-between">
               <Link to="/shipper/login"><div className="btn btn-danger" style={{
                                                                                 borderRadius:'7px',
                                                                                 marginLeft:'10px'
                  }} onClick={() =>dispatch(logout())}>Đăng xuất</div></Link>
                  <Link to="/shipper/orders/delivered">
                     <button className="" 
                           style={{
                              padding:'4px',
                     backgroundColor:'green',
                     width:'180px',
                     marginRight:'10px',
                     color:'white',
                     textAlign:'center',
                     border:'none',
                     borderRadius:'7px',
                     height:'45px'
                              
                           }}
                           >
                        <span>Xem đơn hàng đã giao</span>
                     </button>
                  </Link>
                  
               </div>
               
             
            </Fragment>

         )}


      </div>
   )
}

export default ListOrdersShipper
