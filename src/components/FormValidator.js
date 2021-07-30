import validator from 'validator' 
import BaseUrl from './BaseURL';

export function EmailValidator (email) {
    if (validator.isEmail(email)) {
        return true;
    } 
    else{
        return false;
    }
  }

export function EmailExists (email) {
            const abortCont = new AbortController();
            let response = fetch(BaseUrl + 'email/' + email, {signal: abortCont.signal});
            
        return response;
  }

export function PasswordValidator (password) {
    if (password.length > 8) {
        return true
    } 
    else{
        return false;
    }
  }

export function PhonenumberValidator (number) {
    if (validator.isMobilePhone(number)) {
        return true;
    } 
    else{
        return false;
    }
  }
export function AgeValidator (dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if(age > 12 && age < 120){
        return true
    }
    else{
        return false
    }
}
export function UsernameExists (username) {
    const abortCont = new AbortController();
    let response = fetch(BaseUrl + 'username/' + username, {signal: abortCont.signal});
    
return response;
}

export function PhonenumberExists (phonenumber) {
    const abortCont = new AbortController();
    let response = fetch(BaseUrl + 'phonenumber/' + phonenumber, {signal: abortCont.signal});
    
return response;
}