import { Link } from 'react-router-dom';
import './Information.css'


const Information = (props) => {
    return (
        <div className="info-container">
            <div className="logo">
                <Link to="/" className="logo logo-information">prometheus</Link> 
            </div>
            <div className="info-image">
                <img src={props.img} alt="" />
            </div>
            <div className="info">
                <h1 className="info-title">{props.title}</h1>
                <p className="info-description">{props.description}</p>
                <Link to={props.nextUrl}><button className="btn btn-primary">{props.buttonName}</button></Link>
            </div>
        </div>
      );
}
 
export default Information;