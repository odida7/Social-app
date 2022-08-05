
import './App.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {user} = useContext(AuthContext)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/auth' element={ user ? <Navigate to='/' /> : <Auth/> } />

          <Route exact path='/' element={user ? <Home/> : <Navigate to='/auth' />}/>

          <Route exact path='/profile/:id' element={user ? <Profile/> : <Navigate to='../auth'/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 