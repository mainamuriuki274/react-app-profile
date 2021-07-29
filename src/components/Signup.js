import SplitScreen from "../components/SplitScreen/SplitScreen";
import welcomeImg from '../images/welcome.png'
import { Link } from "react-router-dom";
import { useState } from "react";
import { EmailExists, EmailValidator } from "./EmailValidator";
import { PasswordValidator } from "./PasswordValidator";
import { useHistory } from "react-router-dom";
import BaseUrl from "./BaseURL";

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [accept, setAccept] = useState(false)
    const [emailError, setEmailError] = useState();
    const [formError, setFormError,] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory(); 
    const setToken = props.setToken

    const handleValidation = () => {
        let isValidForm = true
        setFormError(false)
        setEmailError(false)
        setPasswordError(false)
        setConfirmPasswordError(false)
        if(!EmailValidator(email)){
            isValidForm = false;
            setEmailError("Please enter a valid email");
         }
         if(!PasswordValidator(password)){
            isValidForm = false;
            setPasswordError(true);
         }
         if(confirmPassword !== password){
            isValidForm = false;
            setConfirmPasswordError(true);
         }
         return isValidForm
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(handleValidation()){
            const checkEmail = async () => {
                let response = await EmailExists(email)
                if(response.status === 409){
                    setEmailError("Email exists");
                }
                else{
                    const user = {email, password};
                    fetch(BaseUrl +'user', {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(user)
                    })
                    .then(res => {
                        if(!res.ok){
                            throw Error('Something went wrong')
                        }
                    return res.json()
                    })
                    .then((data) => {
                        setEmail('')
                        setPassword('')
                        setConfirmPassword('')
                        setAccept(false)
                        setToken(data.token)
                        history.push('/create-profile')
                    })
        
                }
        }
        checkEmail();
        }
    }

    return ( 
        <SplitScreen
            img={welcomeImg}
            action="Login"
            actionText="Already have an account?"
            actionUrl="/login"
            formTitle="Sign up to get started"
            form={[
                <form onSubmit={handleSubmit}>
                {formError && <span className="form-error">{formError}</span>}
                <div className="email">
                    <label>Email</label>
                    <input 
                        placeholder="Email"
                        type="text"
                        required
                        onChange = {(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    {emailError && <span className="form-error">{emailError}</span>}
                </div>
                <div className="password">
                    <label>Password</label>
                    <input 
                        placeholder="Password"
                        type="password"
                        required
                        onChange = {(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    {passwordError && <span className="form-error">Please enter a stronger password</span>}
                </div>
                <div className="confirm-password">
                    <label>Confirm password</label>
                    <input 
                        placeholder="Confirm Password"
                        type="password"
                        required
                        onChange = {(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                    />
                    {confirmPasswordError && <span className="form-error">Passwords do not match</span>}
                </div>
                <div className="accept-checkbox">
                    <input type="checkbox"
                        onChange = {(e) => {
                            setAccept(!accept)
                        }}
                    />
                    <label>
                        Creating an account means you are okay with our and <Link to="/terms-and-conditions">Terms and Conditions</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.
                    </label>
                </div>
                <button disabled={!accept} className="btn btn-primary btn-submit">Create Account</button>
            </form>
            ]}
        />
     );
}
 
export default Signup;