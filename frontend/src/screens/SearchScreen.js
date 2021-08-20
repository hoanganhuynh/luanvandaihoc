import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import SkeletonEffect from '../components/SkeletonEffect'

const SearchScreen = ({ match }) => {
   const keyword = match.params.keyword
   const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

   const productList = useSelector((state) => state.productList)
   const { loading, error, products, pages, page } = productList

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   useEffect(() => {
      // dispatch(getUserDetails(userInfo._id))
      dispatch(listProducts(keyword, pageNumber))
      window.scrollTo(0, 0)
   }, [dispatch, keyword, pageNumber, userInfo])
   return (
      <>
         <Header />
         <div>
            {loading ? (
               <SkeletonEffect />
            ) : error ? (
               <Message variant='danger'>{error}</Message>
            ) : (
               <>
                  <div className='mb-3 ml-5 mt-3 d-flex justify-content-center search_key'>
                     <h5 className='text-white'>Tìm kiếm: {keyword}</h5>
                  </div>
                  <Row className='m-5'>
                     {products?.map(
                        (
                           product // phai co ? de kiem tra product === null
                        ) => (
                           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              <Product product={product} />
                           </Col>
                        )
                     )}
                  </Row>
                  <div className='d-flex justify-content-center'>
                     <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                     />
                  </div>
               </>
            )}
         </div>
         <Footer />
      </>
   )
}

export default SearchScreen
