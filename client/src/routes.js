import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import Home from "./pages/client";

import LoginUser from "./pages/user/loginUser";
import ResgisterUser from "./pages/user/registerUser";
import ShowUser from './pages/user/showUser';
import ResgisterLawyer from "./pages/lawyer/registerLawyer";
import ShowLawyer from './pages/lawyer/showLawyer';
import CreatePost from "./pages/posts/createPost";
import Posts from "./pages/posts";
import { getToken, getOab} from "./services/auth";
import Detail from "./pages/posts/detail";
import CreateQuestion from "./pages/question/createQuestion";
import Questions from "./pages/question/questions";
import CreatePostOnQuestion from "./pages/posts/createPostOnQuestion";
import Details from "./pages/question/details";

//import PrivateRoute from  './services/wAuth'

const PrivateRoute = ({element: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      getToken() ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

function isLoged() {
  if(getToken() != null) {
    return true
  }
  else {
    return false
  }
}

function isLawyer() {
  if(getOab() !==null) {
    return true
  }
  else {
    return false
  }
}

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
        <Route path="/post/create/:_id" element={<CreatePostOnQuestion/>}/>
        <Route path="/post" element={<Posts/>}/>
        <Route path="/post/:_id" element={<Detail/>}/>
        
        <Route path="/question/create" element={<CreateQuestion/>}/>
        <Route path="/question/:_id" element={<Details/>}/>
        <Route path="/questions" element={<Questions/>}/>
      </Routes>
    </BrowserRouter>
  )  
}