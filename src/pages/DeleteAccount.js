import Main from "../components/Main/Main";

const DeleteAccount = () => {
    return ( 
        <Main 
            pageContent={[
                <div className="delete-account-container">
                    <h1>Delete my account</h1>
                    <span><i className="fas fa-exclamation-triangle"></i></span>
                    <h3>Are you absolutely sure?</h3>
                    <p>This action <strong>cannot</strong> be undone or reversed. This will <strong>permanently</strong> delete your account and all the information related to it and will be <strong>unrecoverable.</strong></p>
                    <form>
                        <label>Please type in your password below to confirm your action</label>
                        <input
                        type="password"
                        required
                        />
                        <button className="btn btn-outline">I understand the consequences, delete my account</button>
                    </form>
                </div>
            ]}
        />
     );
}
 
export default DeleteAccount;