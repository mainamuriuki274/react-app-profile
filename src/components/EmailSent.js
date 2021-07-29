import emailSent from '../images/mail_sent.png'
import Information from '../components/Information/Information';

const EmailSent = () => {
    return ( 
        <Information
            img={emailSent}
            title="Password Reset Email Sent"
            description="An email has been sent to your email address. Follow the directions int the email to reset your password."
            buttonName="Done"
            nextUrl="/"
        />
     );
}
 
export default EmailSent;