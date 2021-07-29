import SplitScreen from "../components/SplitScreen/SplitScreen";
import welcomeImg from '../images/welcome.png'
import { useState } from "react";
import { Link } from "react-router-dom";
import BaseUrl from "./BaseURL";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const setToken = props.setToken;
    const history = useHistory(); 

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(BaseUrl + 'login', {
            method: "GET",
            headers: {'Authorization': 'Basic ' + window.btoa(email + ":" + password)}
        })
        .then(res => {
            if(!res.ok && res.status === 401){
                
            }
            else{
                setError('Something went wrong')
            }
        return res.json()
        })
        .then((data) => {
            console.log(data.token)
            setToken(data.token)
            history.push("/home")
        })
    }
    return ( 
        <SplitScreen
            img={welcomeImg}
            action="Signup"
            actionText="Don't have an account?"
            actionUrl="/signup"
            formTitle="Sign in into your account"
            form={[
                <form onSubmit={handleSubmit}>
                <div className="email">
                    <label>Email</label>
                    <input 
                    type="text"
                    required
                    onChange = {(e) => {
                        setEmail(e.target.value)
                    }}
                    />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input 
                    type="password"
                    required
                    onChange = {(e) => {
                        setPassword(e.target.value)
                    }}
                    />
                </div>
                <button className="btn btn-primary btn-submit">Login</button>
                {error && <span className="form-error">{error}</span>}
                <Link className="forgot-password" to="/forgot-password">Forgot password?</Link>
            </form>
            ]}
        />
     );
}
 
export default Login;