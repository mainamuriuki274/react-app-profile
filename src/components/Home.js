import { useState } from "react";
import Main from "../components/Main/Main";
import loadingPage from '../images/miss_minutes.gif'

const Home = (props) => {
    const [isPageLoading, setIsPageLoading] = useState(true);
    setTimeout( () => {setIsPageLoading(false)} , 3000);
    return ( 
        <Main token={props.token}
            pageContent = {[
                <div className="main-container-content">
                    {isPageLoading ?
                    <div className="page-loading">
                        <img src={loadingPage} alt="" />
                        <p>Hold still while we go and get your page...</p>
                    </div>
                    :
                     <h1>Homepage</h1> 
                    }
                </div>
            ]}
        />
     );
}
 
export default Home;