import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import { LinkContainer } from 'react-router-bootstrap'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function BasicPagination({
  count,
  page,
  pages,
  isAdmin = false,
  keyword,
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Pagination
        count={[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        color='primary'
      />
    </div>
  )
}
