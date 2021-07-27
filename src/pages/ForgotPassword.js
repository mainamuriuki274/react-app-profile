import SplitScreen from "../components/SplitScreen/SplitScreen";
import forgotPassword from '../images/forgot_password.png'

const ForgotPassword = () => {
    return ( 
        <SplitScreen
            img={forgotPassword}
            action="Back to Login"
            actionText=""
            actionUrl="/login"
            formTitle="Forgot your password"
            formDescription="Enter your email and we will send you a link to reset your password"
            form={[
                <form>
                <div className="email">
                    <label>Email</label>
                    <input 
                    type="text"
                    required
                    />
                </div>
                <button className="btn btn-primary btn-submit">Submit</button>
            </form>
            ]}
        />
     );
}
 
export default ForgotPassword;