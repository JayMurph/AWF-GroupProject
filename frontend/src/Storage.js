import "local-storage";
import "react-cookie";
export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const USER_ID_KEY = "userId";
export const USERNAME_KEY = "userName";
export const PASSWORD_KEY = "password";
export const FIRST_NAME_KEY = "firstName";
export const EMAIL_KEY = "email";
export const COOKIE_KEYS = [
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID_KEY,
  USERNAME_KEY,
  FIRST_NAME_KEY,
  EMAIL_KEY
];

const LAST_NAME_KEY = "lastName";
const BIRTH_DATE_KEY = "birthDate";

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