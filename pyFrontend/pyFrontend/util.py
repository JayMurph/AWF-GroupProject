import requests as req
import json
import datetime as dt

from pyFrontend.base import userClass
from pyFrontend.base import API_BASE_URL
from pyFrontend.base import Log, log

def testConnection():
    testReq = req.get(API_BASE_URL)
    if testReq.status_code != 200:
        log(Log.ERROR, f'Could not retrieve resource: {API_BASE_URL}, returned {testReq.status_code}')
        return False
    
    return True

def renewToken(user: userClass):
    payload = {
        "refreshToken": user.refreshToken,
    }

    res = req.post(f'{API_BASE_URL}/renew', json=payload)
    if res.status_code > 210:
        log(Log.ERROR, f'Failed to retrieve new token, status code: {res.status_code}')
        return False
    
    user.accessToken = json.loads(res.content.decode('utf-8'))['accessToken']

    log(Log.INFO, f'Successfully retrieved new token')
    return True

def signUp(payload: dict[str, str]):
    res = req.post(f'{API_BASE_URL}/signup', json=payload)
    if res.status_code == 500:
        log(Log.ERROR, 'Failed to create profile')
        return False
    
    return res.status_code

def login(user: userClass):
    payload = {
        "userName": user.userName,
        "password": user.password
    }

    #log(Log.INFO, f'Sending {payload}')
    res = req.post(f'{API_BASE_URL}/login', json=payload)
    if res.status_code > 210:
        log(Log.ERROR, 'Failed to login')
        return False

    return res.content.decode('utf-8')

def postScore(user: userClass, score: int, category: str):
    payload = {
        "userId": user.sub,
        "finalScore": score,
        "category": category,
        "timeStamp": dt.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
        #"2023-02-21T13:47:11Z"
    }

    header = {f'Authorization': 'Bearer ' + user.accessToken}

    res = req.post(f'{API_BASE_URL}/quiz', json=payload, headers=header)
    if res.status_code > 210:
        log(Log.ERROR, 'Failed to logout')
        return res.status_code
    
    return res.status_code

def updateProfile(user: userClass, payload: dict[str, str]):
    header = {f'Authorization': 'Bearer ' + user.accessToken}

    res = req.put(f'{API_BASE_URL}/profile/{user.sub}', json=payload, headers=header)
    if res.status_code == 500:
        log(Log.ERROR, 'Failed to delete profile')
        return res.status_code
    
    return res

def deleteProfile(user: userClass):
    payload = {
        "refreshToken": user.refreshToken,
    }

    header = {f'Authorization': 'Bearer ' + user.accessToken}

    res = req.delete(f'{API_BASE_URL}/profile/{user.sub}', json=payload, headers=header)
    if res.status_code > 210:
        #log(Log.ERROR, 'Failed to delete profile')
        return res.status_code

    return res.status_code

def logout(user: userClass): 
    payload = {
        "refreshToken": user.refreshToken
    }

    res = req.delete(f'{API_BASE_URL}/logout', json=payload)
    if res.status_code > 210:
        log(Log.ERROR, 'Failed to logout')
        return res.status_code

    user.logout()
    return res.status_code
 