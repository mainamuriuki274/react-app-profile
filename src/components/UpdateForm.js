import { Link } from "react-router-dom";
import welcome from '../images/welcome.png'
import { useState } from "react";
import BaseUrl from "./BaseURL";
import { AgeValidator, PhonenumberExists, PhonenumberValidator, UsernameExists } from "./FormValidator";

const UpdateForm = (props) => {
    const [profilePhoto, setProfilePhoto] = useState();
    const [username,setUsername] = useState(props.username);
    const [firstname, setFirstname] = useState(props.firstname);
    const [lastname, setLastname] = useState(props.lastname);
    const [gender, setGender] = useState(props.gender);
    const [phonenumber, setPhonenumber] = useState(props.phonenumber);
    const [dob, setDob] = useState(props.dob);
    const [img, setImg] = useState();
    const [updatedSuccess, setUpdatedSuccess] = useState(false);

    const [profilePhotoError, setProfilePhotoError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [firstnameError, setFirstnameError] = useState();
    const [lastnameError, setLastnameError] = useState();
    const [genderError, setGenderError] = useState();
    const [phonenumberError, setPhonenumberError] = useState();
    const [dobError, setDobError] = useState();
    const [formError, setFormError] = useState();

    const closeAlert = () => {
        setUpdatedSuccess(false)
    }

    const getBase64 = (file) => {
        return new Promise(resolve => {
          let baseURL = "";
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
            setImg(baseURL)
          };
        });
      };
    const updateProfile = (userProfile) =>{
        return fetch(BaseUrl +'profile', {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": props.token
                            },
                            body: JSON.stringify(userProfile)
                        });
        
    }
    const handleValidation = () => {
        let isValidForm = true;
        setProfilePhotoError('')
        setUsernameError('')
        setFirstnameError('')
        setLastnameError('')
        setGenderError('')
        setPhonenumberError('')
        setDobError('')
        if(phonenumber !== props.phonenumber){
            if(!username){
                isValidForm = false;
                setUsernameError("Please enter your firstname");
            }
        }
        if(!firstname){
            isValidForm = false;
            setFirstnameError("Please enter your firstname");
        }
        if(!lastname){
            isValidForm = false;
            setLastnameError("Please enter your lastname");
        }
        if(!gender){
            isValidForm = false;
            setGenderError("Please enter your gender");
        }
        if(phonenumber !== props.phonenumber){
            if(!PhonenumberValidator(phonenumber)){
                isValidForm = false;
                setPhonenumberError("Please enter a valid phonenumber");
            }
        }
        if(dob !== props.dob){
            if(!AgeValidator(dob)){
                isValidForm = false;
                setDobError("Please enter a valid age");
            }
        }
        
        return isValidForm
    } 

    const handleSubmit = (e) => {
        setFormError("")
        e.preventDefault();
        if(handleValidation()){
            const putProfile = async () => {
                if(profilePhoto){
                await getBase64(profilePhoto);
                }
                let usernameStatus = 200
                let phonenumberStatus = 200
                if(phonenumber !== props.phonenumber){
                    let phonenumberResponse = await PhonenumberExists(phonenumber);
                    phonenumberStatus = phonenumberResponse.status
                    if(phonenumberStatus === 409){
                        setPhonenumberError("Phonenumber already exists");
                    }
                }
                if(username !== props.username){
                    let usernameResponse = await UsernameExists(username);
                    usernameStatus = usernameResponse.status
                    if(usernameStatus === 409){
                        setUsernameError("Username already taken");
                    }
                }
                if(phonenumberStatus === 200 && usernameStatus === 200){
                    const userProfile = {img, username, firstname, lastname, gender, phonenumber, dob};
                        await updateProfile(userProfile)
                        .then(res => {
                            if(res.ok){
                                setUpdatedSuccess(true)
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
                putProfile();
        }
    }

    return ( 
        <div className="update-form">
                        <h1>Update Profile Details</h1>
                        {updatedSuccess && <div className="form-success"><p>Successfully updated</p><div onClick={closeAlert} className="close-btn-icon"><i className="fas fa-times"></i></div></div>}
                        {formError && <span className="form-error">{formError}</span>}
                        <form onSubmit={handleSubmit}>
                            <div className="left-section">
                                <h2 className="section-title">Personal Information</h2>
                                <div className="profile-photo">
                                    <img className="profile-img" src={welcome} alt="" />
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
                                    value = {username}
                                    onChange = {e => setUsername(e.target.value)}
                                    />
                                    {usernameError && <span className="form-error">{usernameError}</span>}
                                </div>
                                <div className="firstname">
                                    <label>Firstname</label>
                                    <input 
                                    type="text"
                                    required
                                    value = {firstname}
                                    onChange = {e => setFirstname(e.target.value)}
                                    />
                                    {firstnameError && <span className="form-error">{firstnameError}</span>}
                                </div>
                                <div className="lastname">
                                    <label>Lastname</label>
                                    <input 
                                    type="text"
                                    required
                                    value = {lastname}
                                    onChange = {e => setLastname(e.target.value)}
                                    />
                                    {lastnameError && <span className="form-error">{lastnameError}</span>}
                                </div>
                                <div className="dob">
                                    <label>Date of Birth</label>
                                    <input 
                                    type="date"
                                    required
                                    value = {dob}
                                    onChange = {e => setDob(e.target.value)}
                                    />
                                    {dobError && <span className="form-error">{dobError}</span>}
                                </div>
                                <div className="gender">
                                    <label>Gender/label</label>
                                    <select
                                    value = {gender}
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
                                        value = {phonenumber}
                                        onChange = {e => setPhonenumber(e.target.value)}
                                        />
                                        {phonenumberError && <span className="form-error">{phonenumberError}</span>}
                                    </div>
                                    <br></br>
                                    <Link to="/my-account/change-email">Change email</Link>
                                </div>
                                <div className="authentication-info">
                                    <h2 className="section-title">Authentication Information</h2>
                                    <Link to="/my-account/change-password">Change Password</Link>
                                </div>
                                <div className="danger-zone">
                                    <h2 className="section-title">Danger Zone</h2>
                                    <Link to="/my-account/delete-account">Delete my account</Link>
                                </div>
                                <div className="submit-btn">
                                    <button className="btn btn-primary btn-submit">Update Info</button>
                                </div>
                            </div>
                        </form>
                    </div>
     );
}
 
export default UpdateForm;