import './App.css'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import MainLayouts from './components/layouts/MainLayouts';
import Register from './pages/Register';
import Login from './pages/Login';
import Forget from './pages/Forget';
import Verify from './pages/Verify';
import Reset from './pages/Reset';
import Contact from './pages/Contact';

function App() {
  

  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/resetpassword/:token' element={<Reset />} />
        <Route path='/contact' element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App;
