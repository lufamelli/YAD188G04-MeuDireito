import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/client";
import LoginUser from "./pages/user/loginUser";
import ResgisterUser from "./pages/user/registerUser";
import ShowUser from './pages/user/showUser';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/user" element={<LoginUser/>}/>
        <Route path="/user/register" element={<ResgisterUser/>}/>
        <Route path="/user/show" element={<ShowUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}