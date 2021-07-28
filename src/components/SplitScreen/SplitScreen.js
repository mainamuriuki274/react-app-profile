import { Link } from 'react-router-dom';
import './SplitScreen.css'

const SplitScreen = (props) => {
    return ( 
        <div className="split-screen">
            <div style={{backgroundImage: "url('" + props.img + "')" }} className="left">
                <Link to="/" className="logo logo-split-screen">prometheus</Link> 
            </div>
            <div className="right">
                <Link to="/" className="logo logo-split-screen logo-mobile">prometheus</Link> 
                <div className="action">{props.actionText} {props.action &&<Link to={props.actionUrl}><button className="btn btn-outline">{props.action}</button></Link>}</div>
                <div className="form-container">
                <h1 className="form-title">{props.formTitle}</h1>
                {props.formDescription && <p className="form-description">{props.formDescription}</p>}
                   {props.form}
                    <div className="action-mobile">
                        <p>{props.actionText} {props.action && <Link to={props.actionUrl}>{props.action}</Link>}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SplitScreen;