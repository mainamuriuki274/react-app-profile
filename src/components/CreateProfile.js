import { useState } from "react";
import SplitScreen from "../components/SplitScreen/SplitScreen";
import createProfile from "../images/create_profile.png";
import BaseUrl from "./BaseURL";
import { AgeValidator, PhonenumberValidator } from "./FormValidator";
import { useHistory } from "react-router-dom";
import loading from '../images/loading.gif'

const CreateProfile = (props) => {
    // state variables and other variables declaration
    const history = useHistory(); 
    const [profilePhoto, setProfilePhoto] = useState();
    const [username,setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [dob, setDob] = useState('');
    const [img, setImg] = useState();
    const [isPending, setIsPending] = useState(false);

    const [profilePhotoError, setProfilePhotoError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [firstnameError, setFirstnameError] = useState();
    const [lastnameError, setLastnameError] = useState();
    const [genderError, setGenderError] = useState();
    const [phonenumberError, setPhonenumberError] = useState();
    const [dobError, setDobError] = useState();
    const [formError, setFormError] = useState();

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

        // ensure profile photo is selected
        if(!profilePhoto){
            isValidForm = false;
            setProfilePhotoError("Please select a profile photo");
        }

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
        if(!PhonenumberValidator(phonenumber)){
            isValidForm = false;
            setPhonenumberError("Please enter a valid phonenumber");
        }

        // ensure age is between 13 and 119
        if(!AgeValidator(dob)){
            isValidForm = false;
            setDobError("Please enter a valid age");
        }
        
        // ensure phonenumber provided is not already used
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

         // ensure usernmae provided is not already used
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
        if(!img){
            isValidForm = false;
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
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": props.token
                },
                body: JSON.stringify(userProfile)
            })
            .then(res => {
                if(res.ok){
                    setProfilePhoto()
                    setUsername('')
                    setFirstname('')
                    setLastname('')
                    setGender('')
                    setPhonenumber('')
                    setDob('')
                    setIsPending(false)
                    history.push('/home')
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
        <SplitScreen
            img={createProfile}
            action=""
            actionText=""
            actionUrl=""
            formTitle="Welcome! Let's create your profile"
            formDescription=""
            form={[
                <form onSubmit={handleSubmit}>
                {formError && <span className="form-error">{formError}</span>}
                <div className="profile-photo">
                    <label>Select a profile photo</label>
                    <input 
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    required
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
                <div className="dob">
                    <label>Date of birth</label>
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
                <button className="btn btn-primary btn-submit">Create Profile</button>
                {isPending &&<div className="loading" ><img src={loading} alt="loading" /></div>}
            </form>
            ]}
        />
     );
}
 
export default CreateProfile;