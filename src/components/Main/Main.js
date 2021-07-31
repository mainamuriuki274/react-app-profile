import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './Main.css'

const Main = (props) => {
    const history = useHistory();
    const [menuClick,setMenuClick] = useState(false);

    const handleClick = () => {
        localStorage.removeItem('token');
        history.push("/");
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
                            <span>Logout</span>
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