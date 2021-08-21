import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listSale } from '../actions/saleAction'
import Rating from './Rating'

function Product({ product }) {
   function format(n, currency) {
      return n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
   }

   function discount(product, percent) {
      return product - product * percent
   }

   const dispatch = useDispatch()

   const saleList = useSelector((state) => state.saleList)
   const { sale } = saleList

   useEffect(() => {
      dispatch(listSale())
   }, [dispatch])

   console.log('list sale', sale)

   return (
      <>
         <Card className='mt-0 rounded product-card '>
            <div className='image-product'>
               <Link to={`/product/${product._id}`}>
                  <Card.Img
                     src={product.images[0].url}
                     variant='top'
                     style={{ zIndex: '1' }}
                  />
               </Link>
            </div>
            <Card.Body>
               <Link
                  to={`/product/${product._id}`}
                  className='text-decoration-none title-product'
               >
                  <Card.Title as='div' style={{ height: '2rem', fontSize:'20px' }}>
                     <strong className="text-success">{product.name.length > 30 ? product.name.slice(0, 40) + '...' : product.name}</strong>
                  </Card.Title>
               </Link>

               <Card.Text as='div' className='rating-product pb-2'>
                  <Link
                     to={`/product/${product._id}`}
                     className='text-decoration-none title-product'
                  >
                     <Rating
                        value={product.rating}
                        text={`(${product.numReviews} đánh giá)`}
                     />
                  </Link>
               </Card.Text>
               <Link
                  to={`/product/${product._id}`}
                  className='text-decoration-none title-product'
               >
                  <div
                     className='d-flex justify-content-between'
                     style={{
                        height: '3rem',
                        position: 'absolute',
                        top: 0,
                        right: 0
                     }}
                  >
                     {/* <Card.Text>
                        <p className='mb-0'>Đã bán: {product.sold}</p>
                     </Card.Text> */}
                     {product.sales ? (
                        <div
                           className='ml-3 text-white tag_sale d-flex justify-content-around align-items-center'
                           style={{
                              width: '5rem',
                              height: '2rem',
                              zIndex: '15',
                              fontSize: '1rem',
                           }}
                        >
                           {sale &&
                              sale?.map((s) =>
                                    s._id === product?.sales && (
                                       <p className='mb-0 p-1'> -{s.name}% </p>
                                    )
                              )}
                        </div>
                     ) : (
                        
                        <div
                           className=' text-white d-flex justify-content-around align-items-center'
                           style={{
                              width: '4rem',
                              height: '3rem',
                           }}
                        >
                           <p className='mb-0'></p>
                        </div>
                     )}
                  </div>
               </Link>
               <Link
                  to={`/product/${product._id}`}
                  className='text-decoration-none title-product'
               >
                  {product.sales ? (
                     <div className='d-flex justify-content-between mt-3'>
                        <Card.Text
                           as='h5'
                           className='text-lowercase text-secondary text-decoration-line-through mb-0'
                        >
                           {format(product.price, 'đ')}
                        </Card.Text>
                        {sale &&
                           sale?.map(
                              (s) =>
                                 s._id === product?.sales && (
                                    <Card.Text
                                       as='h5'
                                       className='text-lowercase'
                                       style={{
                                          color: '#ff6a88',
                                       }}
                                    >
                                       {format(
                                          discount(product.price, s.percent),
                                          'đ'
                                       )}
                                    </Card.Text>
                                 )
                           )}
                     </div>
                  ) : (
                     <Card.Text as='h5' className='text-lowercase mt-3'>
                        {format(product.price, 'đ')}
                     </Card.Text>
                  )}
               </Link>
            </Card.Body>
         </Card>
      </>
   )
}

export default Product
