import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import FooterComponent from './components/FooterComponent'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './components/CreatePost'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route element={<PrivateRoute/>}>
           <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
           <Route path="/create-post" element={<CreatePost/>} />
        </Route>
        <Route path="/projects" element={<Project/>} />
      </Routes>
      <FooterComponent/>
      </BrowserRouter>

    </div>
  )
}

export default App