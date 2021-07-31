import { useState } from "react";
import { Link } from "react-router-dom";
import './Main.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import DeleteAccount from '../DeleteAccount';
import ChangePassword from '../ChangePassword';
import ChangeEmail from '../ChangeEmail';
import UpdateForm from '../UpdateForm';
import useFetch from "../useFetch";

const Main = (props) => {
    const [click,setClick] = useState(false);
    const [menuClick,setMenuClick] = useState(false);
    const {data, isPending, error} = useFetch('profile', props.token)

    const handleClick = () => {
        setClick(!click)
    }
    const handleOpenMenuClick = () => {
        setMenuClick(true)
    }
    const handleCloseMenuClick = () => {
        setMenuClick(false)
    }
    return (
        <div className="main-content">
            <div className={menuClick ? 'sidenav-open' : 'sidenav'}>
                <div className="logo-main">
                    <Link to="/home" className="logo">prometheus</Link>
                    <div className="menu-icon-close" onClick={handleCloseMenuClick}>
                        <i className='fas fa-times close-icon'/>
                    </div>
                </div>
                <div className="sidenav-menu">
                    <Link to="/home" className="sidenav-links"><i className="fas fa-home"></i> Home</Link>
                    <Link to="/my-account" className="sidenav-links"><i className="fas fa-user-alt"></i> Account</Link>
                </div>
            </div>
            <div className={menuClick ? 'main-small' : 'main'}>
                <div className="navbar">
                    <div className="menu-icon-open" onClick={handleOpenMenuClick}>
                        <i className='fas fa-bars open-icon' />
                    </div>
                    <div className="dropdown">
                        <div className="dropdown-btn" onClick={handleClick}>
                            <span>Hello, {data && data.profile.username} <i className={click ? 'fas fa-caret-up' : 'fas fa-caret-down'}></i></span>
                        </div>
                        <div className={click ? 'dropdown-content-active' : 'dropdown-content'}>
                            <Link className="logout-button" to="/">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                {error && <div className="form-error">{error}</div>}
                {isPending && <div>Loading...</div>}
                {data &&
                <Router>
                    <Switch>
                        <Route exact path="/my-account">
                            <UpdateForm
                                token = {props.token}
                                username = {data.profile.username}
                                firstname = {data.profile.firstname}
                                lastname= {data.profile.lastname}
                                gender = {data.profile.gender}
                                phonenumber = { parseInt(data.profile.phonenumber)}
                                dob = {data.profile.dob}
                            />
                        </Route>
                        <Route path="/my-account/delete-account">
                            <DeleteAccount
                            token = {props.token}
                            />
                        </Route>
                        <Route path="/my-account/change-password">
                            <ChangePassword
                            token = {props.token}
                             />
                        </Route>
                        <Route path="/my-account/change-email">
                            <ChangeEmail 
                                token = {props.token}
                                email ={data.profile.email}
                            />
                        </Route>
                    </Switch>
                </Router>
                }
                </div>
            </div>
        </div>
      );
}
 
export default Main;