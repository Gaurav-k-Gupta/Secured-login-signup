import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/signup';
import Home from './Components/Home';
import RefreshHandler from './RefreshHandler';

function App() {
  const [isAuthenticated,setisAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to='/' />
  }

  
  return (
    <>
      <Router>
        <div>
        <RefreshHandler setisAuthenticated={setisAuthenticated}/>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
