import SplitScreen from "../components/SplitScreen/SplitScreen";
import createProfile from "../images/create_profile.png";

const CreateProfile = () => {
    return ( 
        <SplitScreen
            img={createProfile}
            action=""
            actionText=""
            actionUrl=""
            formTitle="Welcome! Let's create your profile"
            formDescription=""
            form={[
                <form>
                <div className="profile-photo">
                    <label>Select a profile photo</label>
                    <input 
                    type="file"
                    accept="image/png, image/jpeg"
                    required
                    />
                </div>
                <div className="email">
                    <label>Username</label>
                    <input 
                    type="text"
                    required
                    />
                </div>
                <div className="firstname">
                    <label>Firstname</label>
                    <input 
                    type="text"
                    required
                    />
                </div>
                <div className="lastname">
                    <label>Lastname</label>
                    <input 
                    type="text"
                    required
                    />
                </div>
                <div className="phonenumber">
                    <label>Phonenumber</label>
                    <input 
                    type="number"
                    />
                </div>
                <div className="dob">
                    <label>Date of birth</label>
                    <input 
                    type="date"
                    required
                    />
                </div>
                <div className="gender">
                    <label>Gender/label</label>
                    <select>
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button className="btn btn-primary btn-submit">Create Profile</button>
            </form>
            ]}
        />
     );
}
 
export default CreateProfile;