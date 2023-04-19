import { API_URL } from "./App";

export function SignUpUser(
  email,
  username,
  password,
  firstname,
  lastname,
  birthDate
) {
  return fetch(API_URL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      birthDate: birthDate,
      password: password,
    }),
  });
}

export function PostQuizResults(userId, quizResults, timeStamp, accessToken) {
  return fetch(API_URL + "/quiz", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": "Bearer " + accessToken
    },
    body: JSON.stringify({
      userId: userId,
      finalScore: quizResults.getScore(),
      category: quizResults.quizCategory,
      timeStamp: timeStamp
    }),
  });
}

export function GetCategoryQuizResultsPage(category, pageNum) {
  const leaderboardEndpoint = API_URL + "/leaderboard?category=" + category + "&page=" + pageNum;
  return fetch(leaderboardEndpoint);
}

export function GetProfile(userId) {
  return fetch(API_URL + "/profile/" + userId);
}

export function LoginUser(username, password) {
  return fetch(API_URL + "/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      userName: username,
      password: password
    }),
  });
}

export function LogoutUser(refreshToken) {
  return fetch(API_URL + "/logout", {
    method:"DELETE",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      refreshToken:refreshToken
    }),
  });
}

export function RenewAccessToken(refreshToken) {
  return fetch(API_URL + "/renew", {
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      refreshToken:refreshToken
    })
  });
}