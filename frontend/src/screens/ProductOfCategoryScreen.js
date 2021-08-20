import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryDetails } from '../actions/categoryAction'
import {
   getProductOfCategory,
   getProductOfSubCategory,
} from '../actions/productActions'
import { getSubCategoryDetails } from '../actions/subCategoryAction'
import FilterNav from '../components/FilterNav'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import SkeletonEffect from '../components/SkeletonEffect'
import {
   PRODUCT_OF_CATEGORY_RESET,
   PRODUCT_OF_SUB_CATEGORY_RESET,
} from '../constants/productConstants'

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
         margin: theme.spacing(0.5),
      },
   },
}))

const ProductOfCategoryScreen = ({ match }) => {
   const keyword = match.params.keyword
   const pageNumber = match.params.pageNumber || 1
   const catId = match.params.id

   const classes = useStyles()

   const handleDelete = () => {
      console.info('You clicked the delete icon.')
   }

   const handleClick = () => {
      console.info('You clicked the Chip.')
   }

   const dispatch = useDispatch()

   const productOfCategory = useSelector((state) => state.productOfCategory)
   const { loading, error, products, pages, page } = productOfCategory

   const productOfSubCategory = useSelector(
      (state) => state.productOfSubCategory
   )
   const {
      loading: loadingSub,
      error: errorSub,
      products: productSub,
   } = productOfSubCategory

   const categoryDetails = useSelector((state) => state.categoryDetails)
   const {
      loading: loadingCat,
      success: successCat,
      category,
   } = categoryDetails

   const subCategoryDetails = useSelector((state) => state.subCategoryDetails)
   const { subcat } = subCategoryDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const productFilter = useSelector((state) => state.productFilter)
   const {
      loading: loadingFilter,
      success: successFilter,
      product: productsFilter,
   } = productFilter

   const productSubFilter = useSelector((state) => state.productSubFilter)
   const {
      loading: loadingSubFilter,
      success: successSubFilter,
      product: productsSubFilter,
   } = productSubFilter

   const productFilterPrice = useSelector((state) => state.productFilterPrice)
   const {
      loading: loadingFilterPrice,
      success: successFilterPrice,
      product: productsFilterPrice,
   } = productFilterPrice

   console.log('product', productSub)
   console.log('product cat', productsFilter)

   useEffect(() => {
      dispatch(getProductOfCategory(catId))
      // dispatch({ type: PRODUCT_OF_SUB_CATEGORY_RESET })

      if (products.length === 0) {
         dispatch({ type: PRODUCT_OF_CATEGORY_RESET })
         dispatch(getProductOfSubCategory(catId))
      }

      if (userInfo) {
         dispatch(getCategoryDetails(catId))
         dispatch(getSubCategoryDetails(catId))
      }

      window.scrollTo(0, 0)
   }, [dispatch, userInfo, catId])

   return (
      <>
         <Header />
         <div className='pt-2'>
            <>
               <Meta />

               <>
                  <Row
                     className='card_color shadow '
                     style={{ minHeight: '105vh', backgroundColor: '#FFF' }}
                  >
                     <Col md={3} className='border-right border-gray'>
                        <FilterNav />
                     </Col>
                     <Col md={9}>
                        <div className='pt-2 pl-3 pr-3 '>
                           {/* <Col
                              md={12}
                              className='d-flex justify-content-center '
                           >
                              {productsFilter &&
                                 productsFilter.map((prod) => (
                                    <Chip
                                       variant='outlined'
                                       color='primary'
                                       size='small'
                                       label={prod.category.name}
                                    />
                                 ))}
                           </Col> */}
                           <Row>
                              {loadingFilterPrice ? (
                                 <SkeletonEffect />
                              ) : (
                                 productsFilterPrice?.map(
                                    (
                                       price // phai co ? de kiem tra price === null
                                    ) => (
                                       <>
                                          <Col
                                             key={price._id}
                                             sm={12}
                                             md={6}
                                             lg={4}
                                             xl={3}
                                          >
                                             <Product product={price} />
                                          </Col>
                                       </>
                                    )
                                 )
                              )}
                              {loadingFilter ? (
                                 <SkeletonEffect />
                              ) : (
                                 productsFilter?.map(
                                    (
                                       product // phai co ? de kiem tra product === null
                                    ) => (
                                       <Col
                                          key={product._id}
                                          sm={12}
                                          md={6}
                                          lg={4}
                                          xl={3}
                                       >
                                          <Product product={product} />
                                       </Col>
                                    )
                                 )
                              )}
                              {loadingSubFilter ? (
                                 <SkeletonEffect />
                              ) : (
                                 productsSubFilter?.map(
                                    (
                                       product // phai co ? de kiem tra product === null
                                    ) => (
                                       <Col
                                          key={product._id}
                                          sm={12}
                                          md={6}
                                          lg={4}
                                          xl={3}
                                       >
                                          <Product product={product} />
                                       </Col>
                                    )
                                 )
                              )}
                              {loading ? (
                                 <SkeletonEffect />
                              ) : (
                                 products?.map(
                                    (
                                       product // phai co ? de kiem tra product === null
                                    ) => (
                                       <Col
                                          key={product._id}
                                          sm={12}
                                          md={6}
                                          lg={4}
                                          xl={3}
                                       >
                                          <Product product={product} />
                                       </Col>
                                    )
                                 )
                              )}
                              {loadingSub ? (
                                 <SkeletonEffect />
                              ) : (
                                 productSub?.map(
                                    (
                                       product // phai co ? de kiem tra product === null
                                    ) => (
                                       <Col
                                          key={product._id}
                                          sm={12}
                                          md={6}
                                          lg={4}
                                          xl={3}
                                       >
                                          <Product product={product} />
                                       </Col>
                                    )
                                 )
                              )}
                           </Row>
                           <div className='d-flex justify-content-center'>
                              <Paginate
                                 pages={pages}
                                 page={page}
                                 // keyword={keyword ? keyword : ''}
                              />
                           </div>
                        </div>
                     </Col>
                  </Row>
               </>
            </>
         </div>
         <Footer />
      </>
   )
}

export default ProductOfCategoryScreen
