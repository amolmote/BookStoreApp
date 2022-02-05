import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { NavBar } from '../components'

import {Login,SignUp,Books,AdminHome,Home,AdminBooks,UserHome,MainHome,RequestList} from '../pages'

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/"             element={<Home/>}/>
                <Route path="/login"        element={<Login/>} />
                <Route path="/signup"       element={<SignUp/>} />
                <Route path="/books"        element={<Books/>} />
                <Route path="/adminhome"    element={<AdminHome/>} />
                <Route path="/adminbooks"   element={<AdminBooks/>}/>
                <Route path="/userhome"     element={<UserHome/>}  />
                <Route path="/mainhome"     element ={<MainHome/>}/>
                <Route path="/requestlist"  element ={<RequestList/>}/>
            </Routes>  
        </Router>
    )
}



export default App