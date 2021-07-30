import './App.css';
import {BrowserRouter as Router, Route,Redirect, Switch} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import CreateProfile from './components/CreateProfile';
import PageNotFound from './components/PageNotFound';
import EmailSent from './components/EmailSent';
import AccountDeleted from './components/AccountDeleted';
import Home from './components/Home';
import Landing from './components/Landing/Landing';
import useToken from './components/useToken';
import Main from './components/Main/Main';

function App() {
  const { token, setToken } = useToken();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/signup">
            <Signup setToken={setToken}/>
          </Route>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/email-sent">
            <EmailSent />
          </Route>
          <Route path="/account-deleted">
            <AccountDeleted />
          </Route>

      {!token ? <Redirect to="/login" /> :
      <Router>
        <Switch>
          <Route path="/create-profile">
            <CreateProfile token={token}/>
          </Route>
          <Route exact path="/my-account">
            <Main token={token}/>
          </Route>
          <Route path="/home">
            <Home  token={token}/>
          </Route>
          </Switch>
      </Router>
      }

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
