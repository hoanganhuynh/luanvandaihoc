import React from 'react'
import { Image, ListGroup } from 'react-bootstrap'

const ImagePay = () => {
  return (
    <ListGroup>
      <ListGroup.Item className='border-0 d-flex justify-content-around'>
        <Image src='https://img.icons8.com/fluent/50/000000/visa.png' />
        <Image src='https://img.icons8.com/fluent/50/000000/paypal.png' />
        <Image src='https://img.icons8.com/fluent/50/000000/money.png' />
      </ListGroup.Item>
    </ListGroup>
  )
}

export default ImagePay
