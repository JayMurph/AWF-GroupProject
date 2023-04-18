import secureLocalStorage from "react-secure-storage";
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
  EMAIL_KEY,
];

//const LAST_NAME_KEY = "lastName";
//const BIRTH_DATE_KEY = "birthDate";

export function GetSessionUserId() {
  return secureLocalStorage.getItem(USER_ID_KEY);
}

export function SetSessionUserId(userId) {
  secureLocalStorage.setItem(USER_ID_KEY, userId);
}

export function GetSessionUserName() {
  return secureLocalStorage.getItem(USERNAME_KEY);
}

export function GetSessionPassword() {
  return secureLocalStorage.getItem(PASSWORD_KEY);
}

export function GetSessionAccessToken() {
  return secureLocalStorage.getItem(ACCESS_TOKEN_KEY);
}

export function SetSessionAccessToken(accessToken) {
  secureLocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function ClearSessionAccessToken() {
  secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function GetSessionRefreshToken() {
  return secureLocalStorage.getItem(REFRESH_TOKEN_KEY);
}

export function SetSessionRefreshToken(refreshToken) {
  secureLocalStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function SaveSessionData(
  accessToken,
  refreshToken,
  userId,
  username,
  password,
  firstName,
  email
) {
  secureLocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  secureLocalStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  secureLocalStorage.setItem(USER_ID_KEY, userId);
  secureLocalStorage.setItem(USERNAME_KEY, username);
  secureLocalStorage.setItem(PASSWORD_KEY, password);
  secureLocalStorage.setItem(FIRST_NAME_KEY, firstName);
  secureLocalStorage.setItem(EMAIL_KEY, email);
}

export function ClearSessionData() {
  //secureLocalStorage.removeItem(ACCESS_TOKEN_KEY);
  //secureLocalStorage.removeItem(REFRESH_TOKEN_KEY);
  //secureLocalStorage.removeItem(USER_ID_KEY);
  //secureLocalStorage.removeItem(USERNAME_KEY);
  //secureLocalStorage.removeItem(PASSWORD_KEY);
  //secureLocalStorage.removeItem(FIRST_NAME_KEY);
  //secureLocalStorage.removeItem(EMAIL_KEY);
  secureLocalStorage.clear();
}
