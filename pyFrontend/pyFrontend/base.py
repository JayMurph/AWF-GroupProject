"""
pyFrontend base module.

This is the principal module of the pyFrontend project.
here you put your main classes and objects.

Be creative! do whatever you want!

If you want to replace this with a Flask application run:

    $ make init

and then choose `flask` as template.
"""
import datetime as dt
import json
import jwt

from enum import Enum
from colorama import init, Fore, Style

# example constant variable
NAME = "pyFrontend"
API_PORT = 3000
API_BASE_URL = f"http://localhost:{API_PORT}"
ACCESS_TOKEN_SECRET="4a300ba342e89659250c870751404e98"
REFRESH_TOKEN_SECRET="958730ab56be8845961d1964f8eb3b35"


class Log(Enum):
    TRACE = 1
    DEBUG = 2
    INFO = 3
    ERROR = 4

    def __str__(self):
        return self.name.lower()
        

class userClass:
    def __init__(self, userName: str, password: str, token: str=None):
        if token is None:
            self.sub = ""
            self.firstName = ""
            self.userName = userName
            self.email = ""
            self.password = password
            self.refreshToken = ""
            self.accessToken  = ""
            self.accessTokenExpiry = ""
            self.loggedIn = False
        else:
            #log(Log.TRACE, f'in alternate ctor')
            self.accessToken = token
            self.decodeToken()
            self.loggedIn = True
        

    def ingestTokens(self, responseObject):
        decodedResObj = json.loads(responseObject)

        self.accessToken = decodedResObj['accessToken']
        self.refreshToken = decodedResObj['refreshToken']
        self.decodeToken()
        self.loggedIn = True

    def decodeToken(self):
        decoded_access_tkn = jwt.decode(self.accessToken, ACCESS_TOKEN_SECRET, algorithms=['HS256'])
        self.sub = decoded_access_tkn['sub']
        self.firstName = decoded_access_tkn['firstName']
        self.userName = decoded_access_tkn['userName']
        self.password = decoded_access_tkn['password']
        self.email = decoded_access_tkn['email']
        self.accessTokenExpiry = dt.datetime.fromtimestamp(decoded_access_tkn['exp'])

    def testIfExpired(self):
        ts_now = dt.datetime.now()

        if ts_now < self.accessTokenExpiry:
            # Access token is not expired
            return False
        else:
            # Access token is expired
            return True

    def logout(self):
        self.loggedIn = False
        self.accessTokenExpiry = dt.datetime.now()
        self.accessToken = ""
        self.refreshToken = ""
        self.email = ""
        self.userName = ""
        self.password = ""
        self.sub = ""
        self.firstName = ""


def log(type: Log, message: str):
    init()

    foreground = Fore.RESET

    match type :
        case Log.TRACE:
            foreground = Fore.GREEN
        case Log.DEBUG:
            foreground = Fore.YELLOW
        case Log.INFO:
            foreground = Fore.BLUE
        case Log.ERROR:
            foreground = Fore.RED
        case _:
            foreground = Fore.RESET

    ts = dt.datetime.now().strftime("%m/%d %H:%M:%S")
    print(foreground + f'[{ts}] {type}: {message}' + Style.RESET_ALL)
