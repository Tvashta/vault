import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/authcontext"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { curUser } = useAuth()

    return (
        <Route
            {...rest}
    render={props => {
        return curUser ? <Component {...props} /> : <Redirect to="/login"/>
    }}
    />
    )
}