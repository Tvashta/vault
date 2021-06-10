import React from "react";

import {AuthProvider} from "./contexts/authcontext";
import {BrowserRouter, Route} from "react-router-dom";
import Switch from "react-bootstrap/Switch";
import Signup from "./components/auth/signup";
import Profile from "./components/auth/profile";
import Login from "./components/auth/login";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./components/auth/forgotPassword";
import UpdateProfile from "./components/auth/updateProfile";
import Dashboard from "./components/dashboard";
import Favourites from "./components/favourites";
import Shared from "./components/shared";
import Search from "./components/search";
import FAQ from "./components/faq";
import Contact from "./components/contact";
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

                  <Route path="/fav" component={Favourites} />
                  <Route path="/shared" component={Shared} />
                  <Route path="/search" component={Search} />

                  <Route path="/faq" component={FAQ} />
                  <Route path="/contact" component={Contact} />

              </Switch>

          </AuthProvider>
          </BrowserRouter>

      </div>
  );
}

export default App;
