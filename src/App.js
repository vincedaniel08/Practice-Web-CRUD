import React, {useState, useEffect} from "react";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import ForgotPassword from "./pages/ForgotPassword";
import Registration from "./pages/Registration";
import NotFound from "./pages/404";
import PrivateRoute from "../src/routers/PrivateRoute";
import PublicRoute from "../src/routers/PublicRoute";
import firebase from "../src/utils/firebase";
import { ThemeProvider} from '@material-ui/core/styles';
import theme from "./utils/theme";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";



function App() {

  const [state, setstate] = useState({
    isAuth: false,
    isLoading: true

  })

  useEffect(() => {
  
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setstate({isAuth: true, isLoading: false})
      } else {
        // No user is signed in.
        setstate({isAuth: false, isLoading: false})
      }
      console.log(user);
    });
  }, [])


  if (state.isLoading){

    return <p>Loading......</p>
}

  return <ThemeProvider theme={theme}>

    <Router>
      <Switch>

        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <PrivateRoute component={Home} isAuth={state.isAuth} path="/home" exact />
        <PrivateRoute component={Profile} isAuth={state.isAuth} path="/profile" exact/>
        <PublicRoute component={Login} isAuth={state.isAuth} restricted={true} path="/login" exact />
        <PublicRoute component={Registration} isAuth={state.isAuth} restricted={true} path="/registration" exact />
        <PublicRoute component={NewUser} isAuth={state.isAuth} restricted={true} path="/newuser" exact />
        <Route component={ForgotPassword} path="/forgotpassword" exact />
        <Route component={NotFound} />

      </Switch >
    </Router>

  </ThemeProvider>

}



    



 

export default App;
