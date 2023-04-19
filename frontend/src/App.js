import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route element={<Login/>}/>
        <Route element={<Register/>}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

function Root() {
  return(
    <div className='container'>
    </div>
  )
}
