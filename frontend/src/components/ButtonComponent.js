import Button from '@material-ui/core/Button'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import React from 'react'

const theme = createMuiTheme({
  success: {
    main: '#bac778',
  },

  palette: {
    primary: {
      light: '#ea605d',
      main: '#e53935',
      dark: '#a02725',
      contrastText: '#fff',
    },

    secondary: {
      light: '#57975b',
      main: '#7563c8',
      dark: '#6353a7',
      contrastText: '#fff',
      borderRadius: '1rem',
    },
  },
})

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
}))

export default function IconLabelButtons({
  color,
  value,
  size,
  endIcon,
  startIcon,
  onClick,
  disabled,
  type,
}) {
  const classes = useStyles()

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          size={size}
          color={color}
          endIcon={endIcon}
          startIcon={startIcon}
          className={classes.button}
          onClick={onClick}
          disabled={disabled}
          type={type}
          borderRadius={16}
        >
          {value}
        </Button>
      </ThemeProvider>
    </div>
  )
}
