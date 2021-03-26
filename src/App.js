import React from "react";

import {AuthProvider} from "./contexts/authcontext";
import {BrowserRouter, Route} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import Signup from "./components/auth/signup";
import Profile from "./components/auth/profile";
import Login from "./components/auth/login";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./components/auth/forgotpwd";
import UpdateProfile from "./components/auth/updateprofile";
import Dashboard from "./components/dashboard";
function App() {
  return (
      <div>
          <BrowserRouter>
          <AuthProvider>
              <Switch>
                  <PrivateRoute exact path="/" component={Dashboard}/>
                  <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />
                  <Route path="/profile" component={Profile}/>

                  <Route path="/signup" component={Signup}/>
                  <Route path="/login" component={Login}/>

                  <Route path="/forgot-password" component={ForgotPassword} />
                  <Route path="/update-profile" component={UpdateProfile}/>

              </Switch>

          </AuthProvider>
          </BrowserRouter>

      </div>
  );
}

export default App;
