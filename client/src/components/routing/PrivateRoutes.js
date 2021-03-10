import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import AuthContaxt from "../../context/auth/authContext"

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const context = useContext(AuthContaxt)

  const { isAuthenticated, loading } = context

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoutes
