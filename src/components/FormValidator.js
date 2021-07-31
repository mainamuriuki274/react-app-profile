import validator from 'validator' 
import BaseUrl from './BaseURL';


// ensure email format is valid
export function EmailValidator (email) {
    if (validator.isEmail(email)) {
        return true;
    } 
    else{
        return false;
    }
}

// ensure phonenumber format is valid
export function PhonenumberValidator (number) {
    if (validator.isMobilePhone(number)) {
        return true;
    } 
    else{
        return false;
    }
}

//  ensure password is at least 8 characters long
export function PasswordValidator (password) {
    if (password.length > 8) {
        return true
    } 
    else{
        return false;
    }
  }

// ensure age is between 13 and 119 years
export function AgeValidator (dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
        age--;
    }
    if(age > 12 && age < 120){
        return true
    }
    else{
        return false
    }
}

// check if value(email,username,phonenumber e.t.c) is already being used
export function ValueExists (url, value) {
        const abortCont = new AbortController();
        return fetch(BaseUrl + url + "/" + value, {
                    method: "GET",
                    signal: abortCont.signal,
                    headers: {
                        "Content-Type": "application/json",
                    }
            });
}

// export function UsernameExists (username) {
//     const abortCont = new AbortController();
//     fetch(BaseUrl + 'username/' + username, {signal: abortCont.signal});
    
// return response;
// }

// export function PhonenumberExists (phonenumber) {
//     const abortCont = new AbortController();
//     let response = fetch(BaseUrl + 'phonenumber/' + phonenumber, {signal: abortCont.signal});
    
// return response;
// }