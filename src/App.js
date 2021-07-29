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
import UpdateForm from './components/UpdateForm';
import DeleteAccount from './components/DeleteAccount';
import ChangePassword from './components/ChangePassword';
import ChangeEmail from './components/ChangeEmail';
import Landing from './components/Landing/Landing';
import useToken from './components/useToken';

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
            <CreateProfile />
          </Route>
          <Route exact path="/my-account">
            <UpdateForm />
          </Route>
          <Route path="/my-account/delete-account">
            <DeleteAccount />
          </Route>
          <Route path="/my-account/change-password">
            <ChangePassword />
          </Route>
          <Route path="/my-account/change-email">
            <ChangeEmail />
          </Route>
          <Route path="/home">
            <Home />
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
