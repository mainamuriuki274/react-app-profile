import Navbar from "../Navbar/Navbar";
import './Landing.css'
import heroImg from '../../images/write_profile.svg'

const Landing = () => {
    return ( 
        <div className="landing-page">
            <Navbar />
            <div className="hero-section">
                <div className="hero-left">
                    <h1 className="hero-title">Easily create, view and edit your profile</h1>
                    <p className="hero-description">Prometheus is a profile tool that allows you to easily create and edit your profile to one that suits you perfectly.</p>
                    <button className="btn btn-primary">Learn more</button>
                </div>
                <div className="hero-right">
                    <img src={heroImg} alt=""/>
                </div>
            </div>
        </div>
     );
}
 
export default Landing;