import Main from "../components/Main/Main";

const ChangeEmail = () => {
    return ( 
        <Main
        pageContent={[
            <div className="change-email-container">
                <h1>Change Email</h1>
                <span><i className="fas fa-envelope"></i></span>
                <form>
                    <div className="email">
                        <label>Old Email</label>
                        <input 
                        type="text"
                        required
                        disabled
                        />
                    </div>
                    <div className="new-email">
                        <label>New Email</label>
                        <input 
                        type="text"
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
 
export default ChangeEmail;