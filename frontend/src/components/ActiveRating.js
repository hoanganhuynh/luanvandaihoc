import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'

const labels = {
  1: 'Rất tệ',
  2: 'Tệ',
  3: 'Bình thường',
  4: 'Tốt',
  5: 'Rất tốt',
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
})

export default function HoverRating({
  value,
  hover,
  setValue,
  setHover,
  size,
}) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Rating
        size={size}
        name='hover-feedback'
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  )
}
