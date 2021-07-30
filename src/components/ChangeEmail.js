import { useState } from "react";
import BaseUrl from "./BaseURL";
import { EmailExists, EmailValidator } from "./FormValidator";

const ChangeEmail = (props) => {
    const [oldEmail, setOldEmail] = useState(props.email);
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [formError, setFormError] = useState();
    const [updatedSuccess, setUpdatedSuccess] = useState(false);

    const closeAlert = () => {
        setUpdatedSuccess(false)
    }

    const updateEmail = (userEmail) =>{
        return fetch(BaseUrl +'user/email', {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": props.token
                            },
                            body: JSON.stringify({"email":userEmail})
                        });
    }

    const validateEmail = () => {
        let isValidForm = true
        setFormError("")
        setEmailError("")
        if(email === oldEmail){
            setEmailError("You are already using that email")
        }
        else{
            if(!EmailValidator(email)){
                isValidForm = false;
                setEmailError("Please enter a valid email");
            }
        }
        return isValidForm 
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(validateEmail()){
            const putEmail = async () => {
                let emailStatus = 200
                if(email === oldEmail){
                    setEmailError("You are already using that email")
                }
                else{
                    let emailResponse = await EmailExists(email);
                    emailStatus = emailResponse.status
                    if(emailStatus === 409){
                        setEmailError("Email already exists");
                    }
                }
                if(emailStatus === 200){
                        await updateEmail(email)
                        .then(res => {
                            if(res.ok){
                                setUpdatedSuccess(true)
                                setOldEmail(email)
                                setEmail("")
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
            }
            putEmail();
        }
    }

    return ( 
            <div className="change-email-container">
                <h1>Change Email</h1>
                {updatedSuccess && <div className="form-success"><p>Successfully updated your email</p><div onClick={closeAlert} className="close-btn-icon"><i className="fas fa-times"></i></div></div>}
                {formError && <span className="form-error">{formError}</span>}
                <span className="icon"><i className="fas fa-envelope"></i></span>
                <form onSubmit={handleSubmit}>
                    <div className="email">
                        <label>Old Email</label>
                        <input 
                        type="text"
                        required
                        disabled
                        value =  {oldEmail}
                        />
                    </div>
                    <div className="new-email">
                        <label>New Email</label>
                        <input 
                        type="text"
                        required
                        value =  {email}
                        onChange = {e => setEmail(e.target.value)}
                        />
                        {emailError && <span className="form-error">{emailError}</span>}
                    </div>
                    <button className="btn btn-primary btn-submit">save</button>
                </form>
            </div>
     );
}
 
export default ChangeEmail;