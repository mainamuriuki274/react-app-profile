import { useState } from "react";
import BaseUrl from "./BaseURL";
import { PasswordValidator } from "./FormValidator";

const ChangePassword = (props) => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    const [formError, setFormError] = useState();
    const [updatedSuccess, setUpdatedSuccess] = useState(false);

    const [oldPasswordError, setOldPasswordError] = useState();
    const [newPasswordError, setNewPasswordError] = useState();
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState();

    const closeAlert = () => {
        setUpdatedSuccess(false)
    }

    const updatePassword = (passwords) =>{
        return fetch(BaseUrl +'user/password', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": props.token
                    },
                    body: JSON.stringify(passwords)
                });
        
    }

    const validatePassword = () => {
        let isValidForm = true;
        if(!oldPassword){
            isValidForm = false
            setOldPasswordError("Please enter your current password")
        }
        if(!PasswordValidator(newPassword)){
            isValidForm = false
            setNewPasswordError("Please enter a stronger password")
        }
        if(newPassword !== confirmNewPassword){
            isValidForm = false
            setConfirmNewPasswordError("Passwords do not match")
        }
        return isValidForm
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(validatePassword()){
            const putPassword = async () => {
                const passwords = {"password": oldPassword,"newPassword": newPassword}
                await updatePassword(passwords)
                        .then(res => {
                            if(res.ok){
                                setUpdatedSuccess(true)
                                setOldPassword("")
                                setNewPassword("")
                                setConfirmNewPassword("")
                            }
                            else{
                                setFormError('Something went wrong')
                            }
                        return res.json()
                        })
                        .catch( err => {
                            if(err.name !== 'AbortError'){
                                setFormError("Something went wrong...")
                            }
                        });
            }
            putPassword();
        }
    }

    return ( 
            <div className="change-password-container">
                <h1>Change password</h1>
                {updatedSuccess && <div className="form-success"><p>Successfully updated your password</p><div onClick={closeAlert} className="close-btn-icon"><i className="fas fa-times"></i></div></div>}
                {formError && <span className="form-error">{formError}</span>}
                <span><i className="fas fa-lock"></i></span>
                <form onSubmit={handleSubmit}>
                    <div className="password">
                        <label>Old Password</label>
                        <input 
                        type="password"
                        required
                        value = {oldPassword}
                        onChange = {e => setOldPassword(e.target.value)}
                        />
                        {oldPasswordError && <span className="form-error">{oldPasswordError}</span>}
                    </div>
                    <div className="new-password">
                        <label>New password</label>
                        <input 
                        type="password"
                        required
                        value = {newPassword}
                        onChange = {e => setNewPassword(e.target.value)}
                        />
                        {newPasswordError && <span className="form-error">{newPasswordError}</span>}
                    </div>
                    <div className="confirm-new-password">
                        <label>Confirm new password</label>
                        <input 
                        type="password"
                        required
                        value = {confirmNewPassword}
                        onChange = {e => setConfirmNewPassword(e.target.value)}
                        />
                        {confirmNewPasswordError && <span className="form-error">{confirmNewPasswordError}</span>}
                    </div>
                    <button className="btn btn-primary btn-submit">save</button>
                </form>
            </div>
     );
}
 
export default ChangePassword;