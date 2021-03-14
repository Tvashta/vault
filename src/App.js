import React from "react";

import {AuthProvider} from "./contexts/authcontext";
import {BrowserRouter, Route} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./components/forgotpwd";
import UpdateProfile from "./components/updateprofile";
function App() {
  return (
      <div>
          <BrowserRouter>
          <AuthProvider>
              <Switch>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/login" component={Login}/>
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/update-profile" component={UpdateProfile}/>
              </Switch>

          </AuthProvider>
          </BrowserRouter>

      </div>
  );
}

export default App;
