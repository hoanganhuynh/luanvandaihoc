import Step from '@material-ui/core/Step'
import StepConnector from '@material-ui/core/StepConnector'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import SettingsIcon from '@material-ui/icons/Settings'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import CachedIcon from '@material-ui/icons/Cached'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image, ListGroup, Row, Button, Form } from 'react-bootstrap'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
})

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles()
  const { active, completed } = props

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  )
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundColor: '#2e5a1c;',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#2e5a1c;',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector)

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#4e9525;',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundColor: '#4e9525;',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
})

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <CachedIcon style={{ fontSize: '1.8rem' }} />,
    2: <LocalShippingIcon style={{ fontSize: '1.8rem' }} />,
    3: <EventAvailableIcon style={{ fontSize: '1.8rem' }} />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const ProgressShipping = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  // const steps = getSteps()

  const steps = ['Chờ xác nhận', 'Đang vận chuyển', 'Đã giao hàng']

  const stepHandler = () => {
    setActiveStep(1)
  }

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={steps.indexOf(order.orderStatus)}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label} onChange={stepHandler}>
            {order.orderStatus === label ? (
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <p style={{ fontSize: '1rem' }}>{label}</p>
              </StepLabel>
            ) : (
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <p style={{ fontSize: '1rem' }}>{label}</p>
              </StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

export default ProgressShipping
