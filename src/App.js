import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import CreateProfile from './pages/CreateProfile';
import PageNotFound from './pages/PageNotFound';
import EmailSent from './pages/EmailSent';
import AccountDeleted from './pages/AccountDeleted';
import Home from './pages/Home';
import UpdateForm from './pages/UpdateForm';
import DeleteAccount from './pages/DeleteAccount';
import ChangePassword from './pages/ChangePassword';
import ChangeEmail from './pages/ChangeEmail';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navbar />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/create-profile">
            <CreateProfile />
          </Route>
          <Route path="/email-sent">
            <EmailSent />
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
          <Route path="/account-deleted">
            <AccountDeleted />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
