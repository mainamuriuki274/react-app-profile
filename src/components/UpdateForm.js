import Main from "../components/Main/Main";
import { Link } from "react-router-dom";
import welcome from '../images/welcome.png'

const UpdateForm = () => {
    return ( 
      <Main
        pageContent={[
            <div className="update-form">
                        <h1>Update Profile Details</h1>
                        <form>
                            <div className="left-section">
                                <h2 className="section-title">Personal Information</h2>
                                <div className="profile-photo">
                                    <img className="profile-img" src={welcome} alt="" />
                                    <input 
                                    type="file"
                                    required
                                    />
                                </div>
                                <div className="username">
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
                                <div className="dob">
                                    <label>Date of Birth</label>
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
                            </div>
                            <div className="right-section">
                                <div className="contact-info">
                                    <h2 className="section-title">Contact Information</h2>
                                    <div className="phonenumber">
                                        <label>Phonenumber</label>
                                        <input 
                                        type="number"
                                        />
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
        ]}
      />
     );
}
 
export default UpdateForm;