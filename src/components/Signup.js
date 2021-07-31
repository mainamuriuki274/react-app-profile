import SplitScreen from "../components/SplitScreen/SplitScreen";
import welcomeImg from '../images/welcome.png'
import loading from '../images/loading.gif'
import { Link } from "react-router-dom";
import { useState } from "react";
import { EmailValidator, PasswordValidator } from "./FormValidator";
import { useHistory } from "react-router-dom";
import BaseUrl from "./BaseURL";

const Signup = (props) => {
    // form state variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [accept, setAccept] = useState(false)
    const [isPending, setIsPending] = useState(false);

    // error state variables for form
    const [emailError, setEmailError] = useState();
    const [formError, setFormError,] = useState();
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const history = useHistory(); 
    const setToken = props.setToken

    // validate form
    const handleValidation = async () => {
        let isValidForm = true;
        setIsPending(true)

        // reset form errors
        setFormError(false);
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        // confirm if email provided is valid
        if(!EmailValidator(email)){
            isValidForm = false;
            setEmailError("Please enter a valid email");
         }

        // ensure password is at least 8 characters long
        if(!PasswordValidator(password)){
            isValidForm = false;
            setPasswordError(true);
        }

        // confirm passwords match
        if(confirmPassword !== password){
            isValidForm = false;
            setConfirmPasswordError(true);
        }

        //ensure email provided is not already used
        if(EmailValidator(email)){
            await fetch(BaseUrl + "email/" + email, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if(response.status === 409){
                    isValidForm = false;
                    setEmailError("Email already exists");
                }
                else{
                    if(!response.ok){
                        throw Error('Could not validate email. Please try again');
                    } 
                }
            })
            .catch( error => {
                isValidForm = false;
                setFormError("Something went wrong...")
                if(error.message === "Failed to fetch"){
                    setEmailError("Could not validate email.")
                }
            });
        }
         setIsPending(false)
         return isValidForm
    }

    // submit user details
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(await handleValidation()){
            const user = {
                "email": email,
                "password": password
            };

            await fetch(BaseUrl +'user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => {
                if(res.ok){
                    setIsPending(false)
                    return res.json()
                }
                else{
                    throw Error("Something went wrong...")
                }
            })
            .then((data) => {
                setToken(data.token)
                if(data.token){
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setAccept(false)
                setIsPending(false)
                history.push('/create-profile')
                }
            }).catch( error => {
                setIsPending(false)
                setFormError("Something went wrong...", error)
            });
            setIsPending(false);
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
                        value = {email || ''}
                        onChange = {e => setEmail(e.target.value)}
                    />
                    {emailError && <span className="form-error">{emailError}</span>}
                </div>
                <div className="password">
                    <label>Password</label>
                    <input 
                        placeholder="Password"
                        type="password"
                        required
                        value = {password || ''}
                        onChange = {e => setPassword(e.target.value)}
                    />
                    {passwordError && <span className="form-error">Please enter a stronger password</span>}
                </div>
                <div className="confirm-password">
                    <label>Confirm password</label>
                    <input 
                        placeholder="Confirm Password"
                        type="password"
                        required
                        value = {confirmPassword || ''}
                        onChange = {e => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && <span className="form-error">Passwords do not match</span>}
                </div>
                <div className="accept-checkbox">
                    <input type="checkbox"
                        value = {accept}
                        onChange = {e => setAccept(!accept)}
                    />
                    <label>
                        Creating an account means you are okay with our and <Link to="/terms-and-conditions">Terms and Conditions</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.
                    </label>
                </div>
                <button disabled={!accept} className="btn btn-primary btn-submit">Create Account</button>
                {isPending &&<div className="loading" ><img src={loading} alt="loading" /></div>}
            </form>
            ]}
        />
     );
}
 
export default Signup;