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

export function PostQuizResults(userId, quizResults, timeStamp) {
  return fetch(API_URL + "/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
