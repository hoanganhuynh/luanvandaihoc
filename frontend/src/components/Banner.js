import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

const Banner = () => {
   return (
      <Carousel fade>
         <Carousel.Item interval={5000}>
            <Image
               className='d-block'
               style={{ width: '100%', height: '65vh' }}
               src='/banner/qua-tang-doanh-nghiep-2.jpg'
               alt='First slide'
            />
         </Carousel.Item>
         {/* <Carousel.Item interval={5000}>
            <Image
               className='d-block '
               style={{ width: '100%', height: '65vh' }}
               src='/banner/khuyen-mai-hot-2004202194944.jpg'
               alt='Second slide'
            />
         </Carousel.Item>
         <Carousel.Item interval={5000}>
            <Image
               className='d-block '
               style={{ width: '100%', height: '65vh' }}
               src='/banner/rau-an-toan-4k-farm-tang-03032021142652.jpg'
               alt='Third slide'
            />
         </Carousel.Item>
         <Carousel.Item interval={5000}>
            <Image
               className='d-block'
               style={{ width: '100%', height: '65vh' }}
               src='/banner/thuc-pham-giam-soc-20042021213548.jpg'
               alt='Four slide'
            />
         </Carousel.Item> */}
      </Carousel>
   )
}

export default Banner
