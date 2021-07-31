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
import UpdateForm from './components/UpdateForm';
import ChangeEmail from './components/ChangeEmail';
import DeleteAccount from './components/DeleteAccount';
import ChangePassword from './components/ChangePassword';

function App() {
  const { token, setToken } = useToken();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route exact path="/signup">
            <Signup setToken={setToken}/>
          </Route>
          <Route exact path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route exact path="/email-sent">
            <EmailSent />
          </Route>

      {!token ? <Redirect to="/login" /> :
      <Router>
        <Switch>
          <Route exact path="/create-profile">
            <CreateProfile token={token}/>
          </Route>
          <Route exact path="/home">
            <Home  token={token}/>
          </Route>
          <Route exact path="/my-account">
            <UpdateForm  token={token}/>
          </Route>
          <Route exact path="/change-email">
            <ChangeEmail  token={token}/>
          </Route>
          <Route exact path="/change-password">
            <ChangePassword  token={token}/>
          </Route>
          <Route exact path="/delete-account">
            <DeleteAccount  token={token}/>
          </Route>
          <Route exact path="/account-deleted">
            <AccountDeleted />
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
