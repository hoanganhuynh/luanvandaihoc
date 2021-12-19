
import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SkeletonEffect from '../../components/SkeletonEffect'
import { ordersShipper } from '../../actions/orderActions'
import { logout } from '../../actions/userActions'
import { format, utcToZonedTime } from 'date-fns-tz'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'


function ListOrdersShipper({ location, history }) {
   const dispatch = useDispatch()
   document.querySelector('.header-shipper')?.classList.add('d-none')
   document.querySelector('.header-shipperr')?.classList.add('d-none')

   const { loading, orders } = useSelector(state => state.ordersShipper)

   const showOrders = orders && orders.filter(order => order.orderStatus === 'Đang vận chuyển')

   console.log('order', showOrders);


   useEffect(() => {
      dispatch(ordersShipper())
   }, [dispatch])

   return (
      <div>
         {loading ? <SkeletonEffect /> : (
            <Fragment>
               <div className='d-flex flex-column justify-content-between align-items-center pb-4' style={{minHeight:'100vh'}}>
               <div >
               <div className="text-center p-3 mb-2" 
                     style={{ fontSize:'20px',
                              color:'green',
                              fontWeight:'bold'
               }}>DANH SÁCH ĐƠN HÀNG</div>

               {showOrders && showOrders?.length === 0 ? <div className="d-flex flex-column align-items-center">
                  <Image
                              style={{ zIndex: '2' }}
                              src='/background/empty.jpeg'
                              width='120px'
                              className='m-2'
                              // src={product && product.images[0].url}
                           />
                   <h5 className='py-5 d-flex justify-content-center'>Bạn chưa có đơn hàng nào !</h5> </div>:
               <p className='py-2 d-flex justify-content-center'>🔔 Bạn có <span className='mx-1 font-weight-bold'>{showOrders && showOrders?.length ||'0'} </span> đơn hàng cần giao 🔔</p>}
              
               {showOrders && showOrders.map(order => (
                  <div className=" p-3 mb-3 mr-2 ml-2" style={{borderRadius:'7px', backgroundColor:'#f9fff8', borderBottom: '1px solid #d1d1d1'}}>
                     
                     <div className="">{format(new utcToZonedTime(order.deliveredAt,
                        'Asia/Ho_Chi_Minh'),
                        'dd/MM/yyyy',
                        {timeZone:'Asia/Ho_Chi_Minh',})}
                     </div>
                     <div className="text-danger">Mã đơn hàng: {order._id}</div>
                     <div>Tên khách hàng: {order.user && order.user.name}</div>
                     <div>Số điện thoại: {order.shippingAddress && order.shippingAddress.numberPhone}</div>
                     <div>Địa chỉ giao hàng: {order.shippingAddress.diaChi}, {order.shippingAddress.xa}, {order.shippingAddress.huyen}, {order.shippingAddress.thanhPho}</div>
                     <Link to={`/shipper/order/${order._id}`}>
                        <div className="btn btn-warning d-flex justify-content-center" 
                              ><span>Xem chi tiết</span></div>
                     </Link>
                  </div>
               ))}
               <div className="d-flex justify-content-between flex-column align-items-center">
                  <Link to="/shipper/orders/delivered">
                        <button className="mb-5" 
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
               
               </div>
               <Link to="/shipper/login"><div className="mt-5 btn btn-danger" style={{
                                                                                    borderRadius:'7px',
                                                                                    marginLeft:'10px',
                                                                                    marginTop: 'auto'
                     }} onClick={() =>dispatch(logout())}>Đăng xuất</div></Link>
                     </div>
            </Fragment>
            

         )}


      </div>
   )
}

export default ListOrdersShipper
