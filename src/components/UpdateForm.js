import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseUrl from "./BaseURL";
import { AgeValidator, PhonenumberValidator } from "./FormValidator";
import Main from "./Main/Main";
import loading from '../images/loading.gif'
import loadingPage from '../images/miss_minutes.gif'
import noConnection from '../images/no_connection.gif'

const UpdateForm = (props) => {
    // state variables and other variables declaration
    const [currentNumber, setCurrentNumber] = useState();
    const [currentUsername, setCurrentUsername] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [username,setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [dob, setDob] = useState('');
    const [img, setImg] = useState();
    const [isPending, setIsPending] = useState(false);
    const [updatedSuccess, setUpdatedSuccess] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageLoadingImg, setIsPageLoadingImg] = useState(loadingPage);
    const [isPageLoadingText, setIsPageLoadingText] = useState("Hold still while we go and get your page...");

    const [profilePhotoError, setProfilePhotoError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [firstnameError, setFirstnameError] = useState();
    const [lastnameError, setLastnameError] = useState();
    const [genderError, setGenderError] = useState();
    const [phonenumberError, setPhonenumberError] = useState();
    const [dobError, setDobError] = useState();
    const [formError, setFormError] = useState();
    const history = useHistory(); 
    
    const closeAlert = () => {
        setUpdatedSuccess(false)
    }

    const getUserData = async () => {
        await fetch(BaseUrl + "profile" , {
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
            else if(response.status === 404){
                history.push('/create-profile')
            }
            else{
                if(!response.ok){
                    throw Error();
                } 
            }
        })
        .then((data) => {
            setCurrentNumber(data.profile.phonenumber);
            setCurrentUsername(data.profile.username);
            setImg(data.profile.profile_photo);
            setUsername(data.profile.username);
            setFirstname(data.profile.firstname);
            setLastname(data.profile.lastname);
            setGender(data.profile.gender);
            setPhonenumber(data.profile.phonenumber);
            setDob(data.profile.dob);
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
        getUserData();
    }, []);
    const handleValidation = async () => {
        let isValidForm = true;
        
        // reset error messages
        setFormError("")
        setProfilePhotoError('')
        setUsernameError('')
        setFirstnameError('')
        setLastnameError('')
        setGenderError('')
        setPhonenumberError('')
        setDobError('')

        // ensure username is not empty
        if(!username){
            isValidForm = false;
            setUsernameError("Please enter a username");
        }

        // ensure firstname is entered
        if(!firstname){
            isValidForm = false;
            setFirstnameError("Please enter your firstname");
        }

        // ensure the lastname has been provided
        if(!lastname){
            isValidForm = false;
            setLastnameError("Please enter your lastname");
        }

        // ensure a gender is selected
        if(!gender){
            isValidForm = false;
            setGenderError("Please enter your gender");
        }

        // ensure phonumber is valid
        if(currentNumber !== phonenumber){
            if(!PhonenumberValidator(phonenumber)){
                isValidForm = false;
                setPhonenumberError("Please enter a valid phonenumber");
            }
        }

        // ensure age is between 13 and 119
        if(!AgeValidator(dob)){
            isValidForm = false;
            setDobError("Please enter a valid age");
        }
        
        // ensure phonenumber provided is not already used
        if(currentNumber !== phonenumber){
        if(PhonenumberValidator(phonenumber)){
            await fetch(BaseUrl + "phonenumber/" + phonenumber, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if(response.status === 409){
                    isValidForm = false;
                    setPhonenumberError("Phonenumber already exists");
                }
                else{
                    if(!response.ok){
                        throw Error('Could not validate phonenumber.');
                    } 
                }
            })
            .catch( error => {
                isValidForm = false;
                setFormError("Something went wrong...")
                if(error.message === "Failed to fetch"){
                    setPhonenumberError("Could not validate phonenumber.")
                }
            });
            }
        }
         // ensure usernmae provided is not already used
         if(currentUsername !== username){
         if(username){
            await fetch(BaseUrl + "username/" + username, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                if(response.status === 409){
                    isValidForm = false;
                    setUsernameError("Username already exists");
                }
                else{
                    if(!response.ok){
                        throw Error('Could not validate username.');
                    } 
                }
            })
            .catch( error => {
                isValidForm = false;
                setFormError("Something went wrong...")
                if(error.message === "Failed to fetch"){
                    setUsernameError("Could not validate phonenumber.")
                }
            });
        }
    }

        // convert Image to base64
        if(profilePhoto){
           await new Promise(resolve => {
                let baseURL = "";
                let reader = new FileReader();
                reader.readAsDataURL(profilePhoto);
                reader.onload = () => {
                  baseURL = reader.result;
                  resolve(baseURL);
                  setImg(baseURL)
                };
            });
        }
        setIsPending(false)
        return isValidForm
    } 

    const handleSubmit = async (e) => {
        setIsPending(true);
        e.preventDefault();
        if(await handleValidation()){
            const userProfile = {
                                    "img": img,
                                    "username": username, 
                                    "firstname": firstname, 
                                    "lastname": lastname, 
                                    "gender": gender, 
                                    "phonenumber": phonenumber,
                                    "dob": dob
                                };

            await fetch(BaseUrl +'profile', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": props.token
                },
                body: JSON.stringify(userProfile)
            })
            .then(res => {
                if(res.ok){
                    setIsPending(false)
                    setUpdatedSuccess(true)
                }
                else{
                    setFormError('Something went wrong')
                }
            })
            .catch( error => {
                setIsPending(false)
                setFormError("Something went wrong...", error)
            });
        }
        setIsPending(false)
    }

    return ( 
       <Main 
        username = {username}
        pageContent={[
            <div className="main-container-content">
                {isPageLoading ? 
                <div className="page-loading">
                <img src={isPageLoadingImg} alt="" />
                <p>{isPageLoadingText}</p>
            </div>
            :
            <div className="update-form">
            <h1>Update Profile Details</h1>
            {updatedSuccess && <div className="form-success"><p>Successfully updated</p><div onClick={closeAlert} className="close-btn-icon"><i className="fas fa-times"></i></div></div>}
            {formError && <span className="form-error">{formError}</span>}
            <form onSubmit={handleSubmit}>
                <div className="left-section">
                    <h2 className="section-title">Personal Information</h2>
                    <div className="profile-photo">
                        <img className="profile-img" src={img} alt="profile" />
                        <input 
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => setProfilePhoto(e.target.files[0])}
                        />
                        {profilePhotoError && <span className="form-error">{profilePhotoError}</span>}
                    </div>
                    <div className="username">
                        <label>Username</label>
                        <input 
                        type="text"
                        required
                        value = {username || ''}
                        onChange = {e => setUsername(e.target.value)}
                        />
                        {usernameError && <span className="form-error">{usernameError}</span>}
                    </div>
                    <div className="firstname">
                        <label>Firstname</label>
                        <input 
                        type="text"
                        required
                        value = {firstname || ''}
                        onChange = {e => setFirstname(e.target.value)}
                        />
                        {firstnameError && <span className="form-error">{firstnameError}</span>}
                    </div>
                    <div className="lastname">
                        <label>Lastname</label>
                        <input 
                        type="text"
                        required
                        value = {lastname || ''}
                        onChange = {e => setLastname(e.target.value)}
                        />
                        {lastnameError && <span className="form-error">{lastnameError}</span>}
                    </div>
                    <div className="dob">
                        <label>Date of Birth</label>
                        <input 
                        type="date"
                        required
                        value = {dob || ''}
                        onChange = {e => setDob(e.target.value)}
                        />
                        {dobError && <span className="form-error">{dobError}</span>}
                    </div>
                    <div className="gender">
                        <label>Gender/label</label>
                        <select
                        value = {gender || ''}
                        onChange = {e => setGender(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {genderError && <span className="form-error">{genderError}</span>}
                    </div>
                </div>
                <div className="right-section">
                    <div className="contact-info">
                        <h2 className="section-title">Contact Information</h2>
                        <div className="phonenumber">
                            <label>Phonenumber</label>
                            <input 
                            type="number"
                            required
                            value = {phonenumber || ''}
                            onChange = {e => setPhonenumber(e.target.value)}
                            />
                            {phonenumberError && <span className="form-error">{phonenumberError}</span>}
                        </div>
                        <br></br>
                        <Link to="/change-email">Change email</Link>
                    </div>
                    <div className="authentication-info">
                        <h2 className="section-title">Authentication Information</h2>
                        <Link to="/change-password">Change Password</Link>
                    </div>
                    <div className="danger-zone">
                        <h2 className="section-title">Danger Zone</h2>
                        <Link to="/delete-account">Delete my account</Link>
                    </div>
                    <div className="submit-btn">
                        <button className="btn btn-primary btn-submit">Update Info</button>
                        {isPending &&<div className="loading" ><img src={loading} alt="loading" /></div>}
                    </div>
                </div>
            </form>
        </div>}
    </div>
        ]}
       />
     );
}
 
export default UpdateForm;