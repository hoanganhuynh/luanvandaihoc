import Link from '@material-ui/core/Link'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const useStyles = makeStyles((theme) => ({
  stepIcon: {
    color: '#3F51B5',
    size: 'large',
  },
}))

export default function HorizontalLinearStepper({
  step1,
  step2,
  step3,
  step4,
}) {
  const classes = useStyles()

  return (
    <div>
      <Stepper
        alternativeLabel
        className='pt-4 pb-4 bg-light border-0 steps-shipping'
      >
        <Step>
          {step1 ? (
            <LinkContainer to='/'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong className='text-capitalize'>Mua hàng</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong className='text-capitalize'>Mua hàng</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong className='text-capitalize'>Vận chuyển</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong className='text-capitalize'>Vận chuyển</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step3 ? (
            <LinkContainer to='/payment'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong className='text-capitalize'>
                    Phương thức thanh toán
                  </strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong className='text-capitalize'>
                  Phương thức thanh toán
                </strong>
              </Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step4 ? (
            <LinkContainer to='/placeoreder'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong className='text-capitalize'>Xác nhận đơn hàng</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong className='text-capitalize'>Xác nhận đơn hàng</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
      </Stepper>
    </div>
  )
}
