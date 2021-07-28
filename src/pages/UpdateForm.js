const UpdateForm = () => {
    return ( 
        <div className="update-form">
            <h1>Update Profile Details</h1>
            <form>
                <div className="left">
                    <h2 className="form-section">Personal Information</h2>
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
                        type="text"
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
                <div className="right">
                    <div className="phonenumber">
                        <label>Phonenumber</label>
                        <input 
                        type="number"
                        />
                    </div>
                    <div className="email">
                        <label>Email</label>
                        <input 
                        type="text"
                        required
                        />
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default UpdateForm;