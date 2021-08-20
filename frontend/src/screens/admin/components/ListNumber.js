import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../../actions/orderActions'
import { listAllProduct, listProducts } from '../../../actions/productActions'
import { listSupplierAdm } from '../../../actions/supplierActions'

function formatMoney(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const ListNumbers = ({ history }) => {
   const dispatch = useDispatch()

   const productListAll = useSelector((state) => state.productListAll)
   const { products } = productListAll

   const orderConsult = useSelector((state) => state.orderConsult)
   const { order } = orderConsult

   const supplierListAdm = useSelector((state) => state.supplierListAdm)
   const { supplier } = supplierListAdm

   const orderList = useSelector((state) => state.orderList)
   const { ordersList } = orderList

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   let outOfStock = 0
   let productOut = []
   products && products.map((product) => {
      if (product.countInStock == 0) {
         productOut.push(product)
         outOfStock += 1
      }
   })

   useEffect(() => {
      if (!userInfo.isAdmin) {
         history.push('/login')
      }

      if (userInfo) {
         dispatch(listOrders())
         dispatch(listAllProduct())
         dispatch(listSupplierAdm())
      }
   }, [dispatch, history, userInfo])

   return (
      <div>
         <Row className='p-3 '>
            <Col md={3}>
               <Card
                  className='shadow card_color'
                  style={{ height: '16rem', border: '0.25rem solid #2e5a1c' }}
               >
                  <Card.Body>
                     <Card.Title className='text-center'>
                        <h4>Tổng số đơn hàng</h4>
                     </Card.Title>
                     <Card.Subtitle
                        className='mb-3  pt-2 text-center text-secondary'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        Tổng số đơn hàng đã được đặt
                     </Card.Subtitle>
                     <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>
                           {ordersList && ordersList.orders?.length}
                        </h1>
                     </Card.Title>
                     <Card.Subtitle className='mb-2 text-center'>
                        <h5 className='text-secondary'>Đơn hàng</h5>
                     </Card.Subtitle>
                     <Card.Link
                        href='/admin/orderlist'
                        className='d-flex justify-content-end'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        <Button color='secondary'>
                           <strong className='text-capitalize'>Chi tiết</strong>
                        </Button>
                     </Card.Link>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card
                  className='shadow card_color'
                  style={{ height: '16rem', border: '0.25rem solid #2e5a1c' }}
               >
                  <Card.Body>
                     <Card.Title className='text-center'>
                        <h4>Doanh thu</h4>
                     </Card.Title>
                     <Card.Subtitle
                        className='mb-4 mt-4 pt-2 text-center text-secondary'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        Tổng số doanh thu từ các đơn hàng
                     </Card.Subtitle>
                     <Card.Title className='text-center mb-4'>
                        <h2
                           style={{ fontSize: '1.4rem' }}
                           className='text-lowercase'
                        >
                           {ordersList?.totalAmount &&
                              formatMoney(ordersList?.totalAmount, 'đ')}
                        </h2>
                     </Card.Title>

                     <Card.Link
                        href='/admin/orderlist'
                        className='d-flex justify-content-end'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        <Button color='secondary'>
                           <strong className='text-capitalize'>
                              {' '}
                              Chi tiết
                           </strong>
                        </Button>
                     </Card.Link>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card
                  className='shadow card_color'
                  style={{ height: '16rem', border: '0.25rem solid #2e5a1c' }}
               >
                  <Card.Body>
                     <Card.Title className='text-center'>
                        <h4>Tổng số sản phẩm</h4>
                     </Card.Title>
                     <Card.Subtitle
                        className=' pt-2 text-center text-secondary'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        Tổng số sản phẩm đang được bày bán
                     </Card.Subtitle>
                     <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>
                           {products && products.length}
                        </h1>
                     </Card.Title>
                     <Card.Subtitle className='mb-2 text-center'>
                        <h5 className='text-secondary'>Sản phẩm</h5>
                     </Card.Subtitle>
                     <Card.Link
                        href='/admin/productlist'
                        className='d-flex justify-content-end'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        <Button color='secondary'>
                           <strong className='text-capitalize'>Chi tiết</strong>
                        </Button>
                     </Card.Link>
                  </Card.Body>
               </Card>
            </Col>

            <Col md={3}>
               <Card
                  className='shadow card_color'
                  style={{ height: '16rem', border: '0.25rem solid #2e5a1c' }}
                  text='light'
               >
                  <Card.Body>
                     <Card.Title className='text-center'>
                        <h4>Tổng số sản phẩm hết hàng</h4>
                     </Card.Title>
                     <Card.Subtitle
                        className='mb-3 pt-2 text-center text-secondary'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        Tổng số sản phẩm hết hàng
                     </Card.Subtitle>
                     <Card.Title className='text-center'>
                        <h1 style={{ fontSize: '3rem' }}>{outOfStock}</h1>
                     </Card.Title>
                     <Card.Subtitle className='mb-1 text-center'>
                        <h5 className='text-secondary'>Sản phẩm</h5>
                     </Card.Subtitle>
                     <Card.Link
                        href='/admin/productlist'
                        className='d-flex justify-content-end'
                        style={{ borderTop: '0.15rem solid #ddd' }}
                     >
                        <Button color='secondary'>
                           <strong className='text-capitalize'>Chi tiết</strong>
                        </Button>
                     </Card.Link>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </div>
   )
}

export default ListNumbers
