import accountDeleted from '../images/delete_account.png'
import Information from '../components/Information/Information';

const AccountDeleted = () => {
    return ( 
        <Information
            img={accountDeleted}
            title="Account Deleted Successfully"
            description="Your Account has successfully, you will be logged out automatically. You can sign up again to create a new account."
            buttonName="Done"
            nextUrl="/"
        /> 
     );
}
 
export default AccountDeleted;