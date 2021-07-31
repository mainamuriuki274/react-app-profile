import SplitScreen from "../components/SplitScreen/SplitScreen";
import welcomeImg from '../images/welcome.png'
import { useState } from "react";
import { Link } from "react-router-dom";
import BaseUrl from "./BaseURL";
import { useHistory } from "react-router-dom";
import { EmailValidator } from "./FormValidator";
import loading from '../images/loading.gif'

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState();
    const [isPending, setIsPending] = useState(false);
    const [formError, setFormError] = useState();
    const setToken = props.setToken;
    const history = useHistory(); 
    
    const handleSubmit = (e) => {
        setFormError("")
        setIsPending(true)
        e.preventDefault()
        setEmailError(false)
        setError('')
        if(!EmailValidator(email)){
            setEmailError(true);
         }
         else{
            fetch(BaseUrl + 'login', {
                method: "GET",
                headers: {'Authorization': 'Basic ' + window.btoa(email + ":" + password)}
            })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                else{
                    if(res.status === 401){
                        setError('Invalid Email or password')
                        throw Error('Invalid Email or password');
                    }
                    else{
                        setFormError('Something went wrong...')
                    }
                }
            })
            .then((data) => {
                if(data.token){
                    setToken(data.token)
                    setIsPending(false)
                    history.push("/home")
                }
            })
            .catch( error => {
                if(error.message !== 'Invalid Email or password'){
                    setIsPending(false)
                    setFormError("Something went wrong..")
                }
            });
            setIsPending(false)
         }
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
                {formError && <span className="form-error">{formError}</span>}
                <div className="email">
                    <label>Email</label>
                    <input 
                    type="text"
                    required
                    value = {email}
                    onChange = {e => setEmail(e.target.value)}
                    />
                {emailError && <span className="form-error">Please enter a valid email</span>}
                </div>
                <div className="password">
                    <label>Password</label>
                    <input 
                    type="password"
                    required
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-submit">Login</button>
                {error && <span className="form-error"><br /> {error} <br /> <br /></span> }
                <Link className="forgot-password" to="/forgot-password">Forgot password?</Link>
                {isPending &&<div className="loading" ><img src={loading} alt="loading" /></div>}
            </form>
            ]}
        />
     );
}
 
export default Login;