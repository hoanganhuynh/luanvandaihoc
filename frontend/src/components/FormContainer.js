import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

FormContainer.propTypes = {}

function FormContainer({ children }) {
  return (
    <Container>
      <Row className='justify-content-md-center justify-content-sm-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
