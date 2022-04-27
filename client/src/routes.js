import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/client";

import LoginUser from "./pages/user/loginUser";
import ResgisterUser from "./pages/user/registerUser";
import ShowUser from './pages/user/showUser';
import ResgisterLawyer from "./pages/lawyer/registerLawyer";
import ShowLawyer from './pages/lawyer/showLawyer';
import CreatePost from "./pages/posts/createPost";
import Posts from "./pages/posts";


//import PrivateRoute from  './services/wAuth'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/user" element={<LoginUser/>}/>
        <Route path="/user/register" element={<ResgisterUser/>}/>
        <Route path="/user/show" element={<ShowUser/>}/>

        <Route path="/lawyer/register" element={<ResgisterLawyer/>}/>
        <Route path="/lawyer/show" element={<ShowLawyer/>}/>
        <Route path="/post/create" element={<CreatePost/>}/>
        <Route path="/post" element={<Posts/>}/>
      </Routes>
    </BrowserRouter>
  )
}