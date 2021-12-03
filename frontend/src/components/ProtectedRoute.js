import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdmin, isOrder, component: Component, ...rest }) => {
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

            if(isAdmin === true && isOrder === true && user.role && (user.role === 'admin' || user.role === 'order')) {
              return <Component {...props} />
            }

            if (isAdmin === true && !isOrder && user.role && user.role === 'admin') {
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
