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
import About from './pages/About';
import TrackOrder from './components/TrackOrder';
import AllHotDeals from './pages/AllHotDeals';
import UserDashboard from './pages/dashboard/UserDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import VerifyEmail from './pages/VerifyEmail';
import Settings from './pages/dashboard/Setting';


function App() {


  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/resetpassword' element={<Reset />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/track-order' element={<TrackOrder />} />
        <Route path='/allhotdeals' element={<AllHotDeals />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/settings' element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
      </Route>
    </Routes>
  )
}

export default App;
