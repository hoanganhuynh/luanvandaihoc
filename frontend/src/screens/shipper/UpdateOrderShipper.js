
import React, { useEffect, useState, Fragment } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, shipperUpdateOrder } from '../../actions/orderActions'
import { SHIPPER_UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import SkeletonEffect from '../../components/SkeletonEffect'

function UpdateOrderShipper({ location, history, match }) {
   const dispatch = useDispatch()
   document.querySelector('.header-shipper')?.classList.add('d-none')
   document.querySelector('.header-shipperr')?.classList.add('d-none')

   const { isUpdated } = useSelector(state => state.ordersShipper)
   const orderDetails = useSelector((state) => state.orderDetails)
   const { order, loading, error } = orderDetails

   useEffect(() => {
      dispatch(getOrderDetails(match.params.id))

      if (isUpdated) {
         dispatch({ type: SHIPPER_UPDATE_ORDER_RESET })
      }
   }, [dispatch, isUpdated])

   return (
      <div>
         {loading ? (<SkeletonEffect />) : (
            <Fragment>
                
               <div className=" text-center p-2"
                     style={{fontWeight:'bold', fontSize:'20px', color:'blue'}}>Thông tin chi tiết đơn hàng</div>
               <div className="bg-white p-2 mt-3 ml-2 mr-2">
                  <div>Trạng thái đơn hàng: <div style={{color:'green', fontWeight:'bold', display:'flex'}}>{order && order.orderStatus}</div></div>
                  
               </div>
               <div className="bg-white p-2 mt-2 ml-2 mr-2">
                  <strong>Thông tin khách hàng:</strong>
                  <div>Họ tên: {order && order.user.name}</div>
                  <div>Điện thoại: {order && order.shippingAddress.numberPhone}</div>
                  <div>Địa chỉ: {order?.shippingAddress.diaChi}, {order?.shippingAddress.xa}, {order?.shippingAddress.huyen}, {order?.shippingAddress.thanhPho}</div>
               </div>
              
               <div className="bg-white p-2 mt-3 ml-2 mr-2">
                  {order && order.orderItems.map(item => (
                     <div className="mb-2 d-flex">
                        <img src={item.images[0].url} style={{width: '60px'}} />
                        <div>
                           <div style={{paddingLeft:'10px'}}>
                              {item.name}
                           </div>
                           <div style={{paddingLeft:'10px'}}>Số lượng: {item.qty}</div>
                           <div style={{paddingLeft:'10px'}}>Giá: {item.price} vnđ</div>
                        </div>
                     </div>
                  ))}
                  
               </div>
               {order && order.orderStatus === 'Đang vận chuyển' && (
                     <div className="btn btn-success m-2" style={{
                        position:'relative',
                        left:'250px',
                        borderRadius:'7px'
                                                         
                     }} onClick={() => dispatch(shipperUpdateOrder(order && order._id))}>Đã giao</div>
                  )}
               <div style={{
                   padding:'4px',
                   backgroundColor:'grey',
                   width:'80px',
                   marginLeft:'10px',
                   marginTop:'10px',
                   color:'white',
                   textAlign:'center',
                   borderRadius:'7px'
                }}>
               <Link to="/shipper/orders" ><div>Quay lại</div></Link>
               </div>
            </Fragment>
         )}

      </div>
   )
}

export default UpdateOrderShipper
