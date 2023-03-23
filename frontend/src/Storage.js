import "local-storage";
const USER_ID_KEY = "user_id";
const USERNAME_KEY = "username";
//const PASSWORD_KEY = "password";
const FIRST_NAME_KEY = "firstname";
const LAST_NAME_KEY = "lastname";
const EMAIL_KEY = "email";
const BIRTH_DATE_KEY = "birthdate";

export function GetUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function SetUserId(userId) {
  localStorage.setItem(USER_ID_KEY, userId);
}

export function ClearUserId() {
  localStorage.removeItem(USER_ID_KEY);
}

export function ClearUserData() {
    ClearUserId();
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(FIRST_NAME_KEY);
    localStorage.removeItem(LAST_NAME_KEY);
    localStorage.removeItem(BIRTH_DATE_KEY);
    localStorage.removeItem(EMAIL_KEY);
}

export function SaveUserData(userData) {
    SetUserId(userData._id);
    localStorage.setItem(USERNAME_KEY, userData.userName);
    localStorage.setItem(FIRST_NAME_KEY, userData.firstName);
    localStorage.setItem(LAST_NAME_KEY, userData.lastName);
    localStorage.setItem(BIRTH_DATE_KEY, userData.birthDate);
    localStorage.setItem(EMAIL_KEY, userData.email);
}
