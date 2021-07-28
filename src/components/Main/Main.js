import { useState } from "react";
import { Link } from "react-router-dom";
import './Main.css'
import welcome from '../../images/welcome.png'

const Main = (props) => {
    const [click,setClick] = useState(false);
    const [menuClick,setMenuClick] = useState(false);
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
                            <span>Hello, John Doe <i className={click ? 'fas fa-caret-up' : 'fas fa-caret-down'}></i></span>
                        </div>
                        <div className={click ? 'dropdown-content-active' : 'dropdown-content'}>
                            <Link className="logout-button" to="/">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                   {props.pageContent}

                </div>
            </div>
        </div>
      );
}
 
export default Main;