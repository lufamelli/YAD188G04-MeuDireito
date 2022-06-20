import Header from './components/header';
import './css/global.css';
import PrivateRoute from './PrivateRoute';
import Router from './routes';/*
import { redirectUser } from "./services/authLogin";
import { parseCookies, destroyCookie } from "nookies";
import api from './services/api';
import React, { useState } from 'react'*/
//import '../global-styles/main.scss'

function App() {
  //
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}
/*
App.getProps = async({Component, ctx}) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === "/user/show" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/lawyer/show";

    if (!token) {
      protectedRoutes && redirectUser(ctx, "/login");
    }
    else {
      try {
        const res = await api.get('/api/auth', {
          headers: { Authorization: token,}})

        const {user} = res.data

        if (user) {
          !protectedRoutes && redirectUser(ctx,)
      
          pageProps.user = user;
        }
      }
        
      catch{
        destroyCookie(ctx, 'token')
        redirectUser(ctx, '/user')
      }
    }
}*/

export default App;
