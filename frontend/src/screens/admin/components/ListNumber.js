import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
// import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../../../actions/orderActions'
import { listAllProduct, listProducts } from '../../../actions/productActions'
import { listSupplierAdm } from '../../../actions/supplierActions'
import CountUp from 'react-countup';

import { Carousel, Image, Skeleton } from 'antd'

function formatMoney(n, currency) {
   return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const ListNumbers = ({ history }) => {
   const dispatch = useDispatch()

   const productListAll = useSelector((state) => state.productListAll)
   const { products } = productListAll

   const categoriesList = useSelector((state) => state.categoriesList)
   const { category } = categoriesList

   const subCategoryList = useSelector((state) => state.subCategoryList)
   const { Sub } = subCategoryList

   const codeList = useSelector((state) => state.codeList)
   const { code } = codeList
   

   const userList = useSelector((state) => state.userList)
   const {users } = userList

   // console.log(users)

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
         <Row className='p-4'>
            <Col md={3} className='p-0 pr-3'
            style={{border: 'none', borderRadius:'6px'}}
            >
               <div className='d-flex p-0 card-thongke bg-gradient-purple justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>
                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'>
                        <CountUp start={1234} end={ordersList && ordersList.orders?.length} duration={1} />
                        </p>
                     <p className='text-white'>Tổng đơn hàng</p>
                     <Link className='text-light' to='admin/orderlist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/order.png' fluid />
                  </div>
               </div>
            </Col>

            <Col md={3} className='p-0 pr-3'
            style={{border: 'none', borderRadius:'6px'}}
            >
               <div className='d-flex p-0 card-thongke bg-gradient-orange justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>

                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'> 
                     <CountUp start={3131731} end={ordersList?.totalAmount &&
                                  ordersList?.totalAmount} duration={1}/>đ
                     </p>
                     <p className='text-white'>Tổng doanh thu</p>
                     <Link className='text-light' to='admin/orderlist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/doanhthu.png' fluid />
                  </div>
               </div>
            </Col>

            <Col md={3} className='p-0 pr-3'
            
            >
               <div className='d-flex p-0 card-thongke bg-gradient-blue justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>

                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'><CountUp  start={5674} duration={1} end={products && products.length}/></p>
                     <p className='text-white'>Tổng sản phẩm</p>
                     <Link className='text-light' to='admin/productlist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/cay.png' fluid />
                  </div>
               </div>
            </Col>

            <Col md={3} className=''
            
            >
               <div className='d-flex p-0 card-thongke bg-gradient-red justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>

                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'><CountUp end={outOfStock} duration={1}/></p>
                     <p className=' text-white'>SP hết hàng</p>
                     <Link className='text-light' to='admin/productlist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/hethang.png' fluid />
                  </div>
               </div>
            </Col>
         </Row>

         <Row className='px-4'>
            <Col md={3} className='p-0 pr-3'
            style={{border: 'none', borderRadius:'6px'}}
            >
               <div className='d-flex p-0 card-thongke bg-gradient-green justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>
                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'><CountUp start={2311} end={users && users.length} duration={1}/></p>
                     <p className='text-white'>Khách hàng</p>
                     <Link className='text-light' to='admin/orderlist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/khachhang.png' fluid />
                  </div>
               </div>
            </Col>

            <Col md={3} className='p-0 pr-3'
            style={{border: 'none', borderRadius:'6px'}}
            >
               <div className='d-flex p-0 card-thongke bg-gradient-blue2 justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>

                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'><CountUp end={category && category.length} duration={1} start={123}/></p>
                     <p className='text-white'>Tổng danh mục</p>
                     <Link className='text-light' to='admin/categorieslist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/danhmuc.png' fluid />
                  </div>
               </div>
            </Col>

            <Col md={3} className='p-0 pr-3'
            
            >
               <div className='d-flex p-0 card-thongke bg-gradient-yellow justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>

                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'><CountUp end={Sub && Sub.length} duration={1} start={234}/></p>
                     <p className='text-white'>Tổng danh mục con</p>
                     <Link className='text-light' to='admin/productlist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/cay.png' fluid />
                  </div>
               </div>
            </Col>

            <Col md={3} className=''
            
            >
               <div className='d-flex p-0 card-thongke bg-gradient-purple2 justify-content-between '
               style={{border: 'none', borderRadius:'6px'}}>

                  <div className='mr-3 p-3'>
                     <p className='h2 text-white'><CountUp end={code && code.length} duration={1} start={456}/></p>
                     <p className=' text-white'>Mã giảm giá</p>
                     <Link className='text-light' to='admin/codelist' >Chi tiết
                     <span className="fa fa-angle-right ml-2"></span>
                     </Link>
                  </div>
                  <div className='card-thongke-right p-2'>
                  <Image width='45px' src='/background/code.png' fluid />
                  </div>
               </div>
            </Col>
         </Row>
      </div>
   )
}

export default ListNumbers
