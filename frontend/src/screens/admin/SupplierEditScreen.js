import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {
  getSupplierDetails,
  updateSupplier,
} from '../../actions/supplierActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import MessageSuccess from '../../components/MessageSuccess'
import { SUPPLIER_UPDATE_RESET } from '../../constants/supplierConstants'
import SideBar from './components/SideBar'
import Header from './components/Header'
import SkeletonEffect from '../../components/SkeletonEffect'

const SupplierEditScreen = ({ history, match }) => {
  const supId = match.params.id

  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const supplierDetails = useSelector((state) => state.supplierDetails)
  const { loading, error, supplier } = supplierDetails

  const supplierUpdate = useSelector((state) => state.supplierUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = supplierUpdate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateSupplier({ _id: supId, name }))
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUPPLIER_UPDATE_RESET })
      history.push('/admin/supplierlist')
    } else {
      if (!supplier.name || supplier._id !== supId) {
        dispatch(getSupplierDetails(supId))
      } else {
        setName(supplier.name)
      }
    }
  }, [dispatch, history, supId, supplier, successUpdate])

  return (
    <>
      <Header />
      <Row style={{ backgroundColor: '#fafafa' }}>
        <Col md={2} className='p-0'>
          <SideBar />
        </Col>
        <Col md={10} className='pl-0 mt-3'>
          {loadingUpdate && (
            <MessageSuccess variant='Chỉnh sửa thành công'></MessageSuccess>
          )}
          {errorUpdate && <Message>{errorUpdate}</Message>}
          {loading ? (
            <SkeletonEffect />
          ) : (
            <Row className='justify-content-center'>
              <Col md={6}>
                <Form
                  onSubmit={submitHandler}
                  className='p-4 bg-light shadow card_color'
                  fluid
                >
                  <h3 className='text-center mb-4'>
                    Chỉnh sửa thông tin nhà cung cấp
                  </h3>
                  <Form.Group>
                    <Container>
                      <Form.Label
                        as='p'
                        className='mb-1'
                        style={{ fontSize: '1rem' }}
                      >
                        Tên nhà cung cấp
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: '1rem' }}
                        className='border border-grey rounded-pill'
                        type='name'
                        size='sm'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Container>
                  </Form.Group>
                  <div className='pl-3 pr-3 text-center'>
                    <Button
                      type='submit'
                      size='sm'
                      variant='outline-light'
                      className='rounded-pill btn_color_created'
                      style={{
                        fontSize: '1rem',
                        letterSpacing: '0.25rem',
                        width: '20rem',
                      }}
                    >
                      Cập nhật
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  )
}

export default SupplierEditScreen
