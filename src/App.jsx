import './App.css'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import MainLayouts from './components/layouts/MainLayouts';
import Register from './pages/Register';
import Login from './pages/Login';
import Forget from './pages/Forget';

function App() {
  

  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
      </Route>
    </Routes>
  )
}

export default App
