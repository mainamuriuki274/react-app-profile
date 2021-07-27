import SplitScreen from "../components/SplitScreen/SplitScreen";
import welcomeImg from '../images/welcome.png'
import { Link } from "react-router-dom";

const Login = () => {
    return ( 
        <SplitScreen
            img={welcomeImg}
            action="Signup"
            actionText="Don't have an account?"
            actionUrl="/signup"
            formTitle="Sign in into your account"
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
                <button className="btn btn-primary btn-submit">Login</button>
                <Link className="forgot-password" to="/forgot-password">Forgot password?</Link>
            </form>
            ]}
        />
     );
}
 
export default Login;