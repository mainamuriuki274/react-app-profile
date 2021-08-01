import { useEffect, useState } from "react";
import BaseUrl from "./BaseURL";
import { EmailValidator } from "./FormValidator";
import Main from "./Main/Main";
import loading from '../images/loading.gif'
import loadingPage from '../images/miss_minutes.gif'
import noConnection from '../images/no_connection.gif'

const ChangeEmail = (props) => {
    const [oldEmail, setOldEmail] = useState(props.email);
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const [formError, setFormError] = useState();
    const [updatedSuccess, setUpdatedSuccess] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageLoadingImg, setIsPageLoadingImg] = useState(loadingPage);
    const [isPageLoadingText, setIsPageLoadingText] = useState("Hold still while we go and get your page...");

    const closeAlert = () => {
        setUpdatedSuccess(false)
    }

    const getUserEmail = async () => {
        await fetch(BaseUrl + "user" , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": props.token
            }
        })
        .then(response => {
            if(response.ok){
                return response.json()
            }
            else{
                if(!response.ok){
                    throw Error();
                } 
            }
        })
        .then((data) => {
            setOldEmail(data.user.email);
            setIsPageLoading(false);
        })
        .catch( error => {
            if(error.message === "Failed to fetch"){
                setIsPageLoadingImg(noConnection);
                setIsPageLoadingText("Uh oh! Failed to connect to the server.")
            }
        });
    }
    // eslint-disable-next-line
    useEffect(() => {
        getUserEmail();
    }, []);
    const validateEmail = async () => {
        let isValidForm = true
        setFormError("")
        setEmailError("")
        if(!EmailValidator(email)){
            isValidForm = false;
            setEmailError("Please enter a valid email");
        }
        else{
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
        
        return isValidForm 
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true);
        if(validateEmail()){
            await fetch(BaseUrl +'user/email', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": props.token
                },
                body: JSON.stringify({"email":email})
            })
            .then(res => {
                if(res.ok){
                    setUpdatedSuccess(true)
                    setOldEmail(email)
                    setEmail("")
                    setIsPending(false);
                }
                else{
                    setIsPending(false);
                    setFormError('Something went wrong')
                }
            return res.json()
            })
            .catch( err => {
                    setIsPending(false);
                    setFormError("Something went wrong...")
            });
            setIsPending(false);
        }
    }

    return ( 
        <Main
        pageContent = {[
            <div className="main-container-content">
                {isPageLoading ? 
                <div className="page-loading">
                <img src={isPageLoadingImg} alt="" />
                <p>{isPageLoadingText}</p>
            </div>
            :
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
                    {isPending &&<div className="loading" ><img src={loading} alt="loading" /></div>}
                </form>
            </div>
            }
            </div>
        ]}
        />
     );
}
 
export default ChangeEmail;