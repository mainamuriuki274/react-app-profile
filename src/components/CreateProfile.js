import { useState } from "react";
import SplitScreen from "../components/SplitScreen/SplitScreen";
import createProfile from "../images/create_profile.png";
import BaseUrl from "./BaseURL";
import { AgeValidator, PhonenumberExists, PhonenumberValidator, UsernameExists } from "./FormValidator";
import { useHistory } from "react-router-dom";

const CreateProfile = (props) => {
    const history = useHistory(); 
    const [profilePhoto, setProfilePhoto] = useState();
    const [username,setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [dob, setDob] = useState('');
    const [img, setImg] = useState();

    const [profilePhotoError, setProfilePhotoError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [firstnameError, setFirstnameError] = useState();
    const [lastnameError, setLastnameError] = useState();
    const [genderError, setGenderError] = useState();
    const [phonenumberError, setPhonenumberError] = useState();
    const [dobError, setDobError] = useState();
    const [formError, setFormError] = useState();

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
    const saveProfile = (userProfile) =>{
        return fetch(BaseUrl +'profile', {
                            method: "POST",
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
        if(!profilePhoto){
            isValidForm = false;
            setProfilePhotoError("Please select a profile photo");
        }
        if(!username){
            isValidForm = false;
            setUsernameError("Please enter your firstname");
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
        if(!PhonenumberValidator(phonenumber)){
            isValidForm = false;
            setPhonenumberError("Please enter a valid phonenumber");
        }
        if(!AgeValidator(dob)){
            isValidForm = false;
            setDobError("Please enter a valid age");
        }
        
        return isValidForm
    } 

    const handleSubmit = (e) => {
        setFormError("")
        e.preventDefault();
        if(handleValidation()){
            const postProfile = async () => {
                await getBase64(profilePhoto);
                let phonenumberResponse = await PhonenumberExists(phonenumber)
                if(phonenumberResponse.status === 409){
                    setPhonenumberError("Phonenumber already exists");
                }
                let usernameResponse = await UsernameExists(username)
                if(usernameResponse.status === 409){
                    setUsernameError("Username already taken");
                }
                if(phonenumberResponse.status === 200 && usernameResponse.status === 200){
                    const userProfile = {img, username, firstname, lastname, gender, phonenumber, dob};
                        await saveProfile(userProfile)
                        .then(res => {
                            if(!res.ok){
                                setFormError('Something went wrong')
                            }
                        return res.json()
                        })
                        .then(() => {
                            setProfilePhoto()
                            setUsername('')
                            setFirstname('')
                            setLastname('')
                            setGender('')
                            setPhonenumber('')
                            setDob('')
                            history.push('/home')
                        }).catch( err => {
                            if(err.name !== 'AbortError'){
                                setFormError("Something went wrong...")
                            }
                        });
                    }
                }
                postProfile();
        }
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
            </form>
            ]}
        />
     );
}
 
export default CreateProfile;