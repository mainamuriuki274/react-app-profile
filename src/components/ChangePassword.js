import Main from "../components/Main/Main";

const ChangePassword = () => {
    return ( 
        <Main
        pageContent={[
            <div className="change-password-container">
                <h1>Change password</h1>
                <span><i className="fas fa-lock"></i></span>
                <form>
                    <div className="password">
                        <label>Old Password</label>
                        <input 
                        type="password"
                        required
                        />
                    </div>
                    <div className="new-password">
                        <label>New password</label>
                        <input 
                        type="password"
                        required
                        />
                    </div>
                    <div className="confirm-new-password">
                        <label>Confirm new password</label>
                        <input 
                        type="password"
                        required
                        />
                    </div>
                    <button className="btn btn-primary btn-submit">save</button>
                </form>
            </div>
        ]}
        />
     );
}
 
export default ChangePassword;