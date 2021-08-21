import { Link } from '@material-ui/core'
import React from 'react'
import { Col, Container, Image, ListGroup, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { black } from 'colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  link: {
    color: black,
    '&:hover': {
      color: '#002984',
      textDecoration: 'none',
    },
    '&:active': {
      color: '#002984',
      textDecoration: 'none',
    },
    '&:visited': {
      color: '#002984',
      textDecoration: 'none',
    },
  },
}))

Footer.propTypes = {}

function Footer(props) {
  const classes = useStyles()
  return (
    <footer style={{ backgroundColor: '#fafafa' }}>
      <div className='pl-5 pb-4  pr-5 mt-4'>
        <Row>

        <Col md={5}>
            <ListGroup>
              <div className='d-flex'>
                <Image
                  src='/logo/LOGO-LUANVAN20210821.png'
                  style={{ width: '16.5rem', height: '8rem', zIndex: '0' }}
                />
              </div>

              <div className='d-flex  mb-3'>
                <Link
                  href='#'
                  className='border bg-secondary p-2 rounded-circle mr-2'
                >
                  <Image src='https://img.icons8.com/fluent/24/000000/gmail-new.png' />
                </Link>
                <Link
                  className='border bg-secondary p-2 rounded-circle mr-2'
                  href='#'
                >
                  <Image src='https://img.icons8.com/fluent/24/000000/facebook-new.png' />
                </Link>
                <Link
                  className='border bg-secondary p-2 rounded-circle'
                  href='#'
                >
                  <Image src='https://img.icons8.com/fluent/24/000000/twitter.png' />
                </Link>
              </div>

              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <div
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                >
                  <div className='d-flex justify-content-start'>
                    <strong>Địa chỉ: </strong>
                    <p className='mb-0 pl-1'>
                      22 Lý Chiêu Hoàng, Phường 10, Quận 6, TP HCM
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <div
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                >
                  <div className='d-flex justify-content-start'>
                    <strong>Email: </strong>
                    <p className='mb-0 pl-1'>tuvan_online@naturalfood.com.vn</p>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <div
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                >
                  <div className='d-flex justify-content-start'>
                    <strong>Số điện thoại: </strong>
                    <p className='mb-0 pl-1'>(028) 38 753 443</p>
                  </div>
                </div>
              </ListGroup.Item>

              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <div
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                >
                  <div className='d-flex justify-content-start'>
                    <strong>Hotline: </strong>
                    <p className='mb-0 pl-1'>
                      19002126 ( cước phí: 3000đ/phút )
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2 mb-3'
                style={{ backgroundColor: '#fafafa' }}
              >
                <div
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                >
                  <div className='d-flex justify-content-start'>
                    <p className='mb-0'>
                      Thời gian tư vấn: Từ 07h30 đến 12h15, 13h15 đến 21h30 các
                      ngày trong tuần ( Trừ ngày Lễ, Tết)
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={2}>
            <ListGroup className='pt-5 pb-4'>
              <h5>Hỗ trợ</h5>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Hình thức giao hàng
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Hình thức thanh toán
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Chính sách đổi trả
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Chính sách bảo hành
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={2}>
            <ListGroup className='pt-5 pb-4'>
              <h5>Thông tin</h5>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Tuyển dụng
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Góp ý
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Giải đáp thắc mắc
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <ListGroup className='pt-5 pb-4'>
              <h5>Về Natural Food</h5>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Giới thiệu
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className='border-0 p-0 pt-2'
                style={{ backgroundColor: '#fafafa' }}
              >
                <Link
                  style={{
                    color: 'black',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05rem',
                  }}
                  className={classes.link + 'pt-1'}
                  href='/'
                >
                  Liên hệ
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          

        </Row>
      </div>
    </footer>
  )
}

export default Footer
