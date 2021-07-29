export function PasswordValidator (password) {
    if (password.length > 8) {
        return true
    } 
    else{
        return false;
    }
  }