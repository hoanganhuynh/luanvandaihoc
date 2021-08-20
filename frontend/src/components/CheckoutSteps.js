import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

CheckoutSteps.propTypes = {}

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className='mb-2 w-step'>
      <Nav.Item className='bg-dark bg-step'>
        {step1 ? (
          <LinkContainer to='/login' className='bg-info'>
            <Nav.Link className='link-green'>Mua hàng</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Mua hàng</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='bg-dark bg-step-2'>
        {step2 ? (
          <LinkContainer to='/shipping' className='bg-info'>
            <Nav.Link className='link-green'>Vận chuyển</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Vận chuyển</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='bg-dark bg-step-2'>
        {step3 ? (
          <LinkContainer to='/payment' className='bg-info'>
            <Nav.Link className='link-green'>Phương thức thành toán</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='link-green'>
            Phương thức thành toán
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='bg-dark bg-step-2'>
        {step4 ? (
          <LinkContainer to='/placeorder' className='bg-info'>
            <Nav.Link className='link-green'>Xác nhận đơn hàng</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='link-green'>
            Xác nhận đơn hàng
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
