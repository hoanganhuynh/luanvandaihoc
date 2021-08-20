import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.userAuth
  )

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to='/login' />
            }

            if (isAdmin === true && user.isAdmin === true) {
              return <Component {...props} />
            }

            // return <Component {...props} />
          }}
        />
      )}
    </Fragment>
  )
}

export default ProtectedRoute
