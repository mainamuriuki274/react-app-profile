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