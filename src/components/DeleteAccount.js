import { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseUrl from "./BaseURL";

const DeleteAccount = (props) => {
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState();
    const [formError, setFormError] = useState();
    const history = useHistory(); 

    const handleSubmit = (e) => {
        setFormError("")
        setPasswordError("")
        e.preventDefault()
        if(!password){
            passwordError("Please enter your password")
        }
        else{
            const deleteAccount = async () => {
                await fetch(BaseUrl +'user', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": props.token
                    },
                    body: JSON.stringify({"password": password})
                    })
                    .then(res => {
                        if(res.status === 401){
                            setPasswordError("Invalid Password")
                        }
                        else if(res.ok){
                            localStorage.clear();
                            history.push('/account-deleted')
                        }
                        else{
                            setFormError('')
                        }
                    return res.json()
                    })
                    .catch( err => {
                        if(err.name !== 'AbortError'){
                            setFormError("Something went wrong...")
                        }
                    });
            }
            deleteAccount();
        }
    }
    return ( 
                <div className="delete-account-container">
                    <h1>Delete my account</h1>
                    <span><i className="fas fa-exclamation-triangle"></i></span>
                    <h3>Are you absolutely sure?</h3>
                    <p>This action <strong>cannot</strong> be undone or reversed. This will <strong>permanently</strong> delete your account and all the information related to it and will be <strong>unrecoverable.</strong></p>
                    <form onSubmit={handleSubmit}>
                        <label>Please type in your password below to confirm your action</label>
                        {formError && <span className="form-error"><br />{formError}</span>}
                        <input
                        type="password"
                        required
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        />
                        {passwordError && <span className="form-error"><br />{passwordError}<br /></span>}
                        <button className="btn btn-outline">I understand the consequences, delete my account</button>
                    </form>
                </div>
     );
}
 
export default DeleteAccount;