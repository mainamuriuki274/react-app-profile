import SplitScreen from "../components/SplitScreen/SplitScreen";
import welcomeImg from '../images/welcome.png'
import { Link } from "react-router-dom";

const Signup = () => {
    return ( 
        <SplitScreen
            img={welcomeImg}
            action="Login"
            actionText="Already have an account?"
            actionUrl="/login"
            formTitle="Sign up to get started"
            form={[
                <form>
                <div className="email">
                    <label>Email</label>
                    <input 
                    type="text"
                    required
                    />
                </div>
                <div className="password">
                    <label>Password</label>
                    <input 
                    type="password"
                    required
                    />
                </div>
                <div className="confirm-password">
                    <label>Confirm password</label>
                    <input 
                    type="password"
                    required
                    />
                </div>
                <div className="accept-checkbox">
                    <input type="checkbox"/>
                    <label>
                        Creating an account means you are okay with our and <Link to="/terms-and-conditions">Terms and Conditions</Link> and <Link to="/privacy-policy">Privacy Policy</Link>.
                    </label>
                </div>
                <button className="btn btn-primary btn-submit">Create Account</button>
            </form>
            ]}
        />
     );
}
 
export default Signup;