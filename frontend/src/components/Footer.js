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
                    <strong>?????a ch???: </strong>
                    <p className='mb-0 pl-1'>
                      22 L?? Chi??u Ho??ng, Ph?????ng 10, Qu???n 6, TP HCM
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
                    <strong>S??? ??i???n tho???i: </strong>
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
                      19002126 ( c?????c ph??: 3000??/ph??t )
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
                      Th???i gian t?? v???n: T??? 07h30 ?????n 12h15, 13h15 ??????n 21h30 c??c
                      ng??y trong tu???n ( Tr??? ng??y L???, T????t)
                    </p>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={2}>
            <ListGroup className='pt-5 pb-4'>
              <h5>H??? tr???</h5>
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
                  H??nh th???c giao h??ng
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
                  H??nh th???c thanh to??n
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
                  Ch??nh s??ch ?????i tr???
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
                  Ch??nh s??ch b???o h??nh
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={2}>
            <ListGroup className='pt-5 pb-4'>
              <h5>Th??ng tin</h5>
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
                  Tuy???n d???ng
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
                  G??p ??
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
                  Gi???i ????p th???c m???c
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <ListGroup className='pt-5 pb-4'>
              <h5>V??? Natural Food</h5>
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
                  Gi???i thi???u
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
                  Li??n h???
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
