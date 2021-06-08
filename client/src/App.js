import Navbar from './components/Navbar';
import "./App.css"
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/profile">
      <Profile />
    </Route>
    <Route path="/createpost">
      <CreatePost />
    </Route>
    </BrowserRouter>
  );
}

export default App;
