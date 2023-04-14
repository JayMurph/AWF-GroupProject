# pyFrontend 

This is a Python CLI application that can test various aspects of the API.

## Use 


```
Usage: pyFrontend [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  delete-profile   Delete profile that you log in to.
  get-token        Returns a access jwt token, valid for 10 minutes.
  new-score        Send $count number of random leaderboard entires with...
  new-score-token  Alternate version of new-score using a token.
  sign-up          Signup new user.
  update-profile   Send new credentials to update stuff.
```

### Example: Retrieve valid token and call `new-score` function (WSL/Linux only)


With credentials: `{userName: "SemiDoge", password: "secret"}`

> `pyFrontend get-token -u SemiDoge -p secret | tr -d '\n' | xargs -I{} pyFrontend new-score-token -t {}`
