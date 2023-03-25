import { API_URL } from "./App";

export default function SignUpUser(
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
      password: password
    }),
  });
}
