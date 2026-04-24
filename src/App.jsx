import './App.css'
import { Routes, Route } from "react-router";
import Home from './pages/Home';
import MainLayouts from './components/layouts/MainLayouts';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  

  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register' element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
