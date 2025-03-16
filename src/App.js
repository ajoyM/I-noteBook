import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {useState, useEffect} from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AuthState from './context/auth/AuthState';

function App() {
  const [message, setMessage] = useState("welcome to notebook world")
  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 1000)
  }, [])
  
  return (
    <AuthState>
    <NoteState>
    <Router>
      <div className="App">
        <Navbar />
        <Alert message={message} />
      </div>
      <Routes>
        <Route path="/"  element={<Home />}></Route>
        <Route path="/about"  element={<About />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </NoteState>
    </AuthState>
  );
}

export default App;
