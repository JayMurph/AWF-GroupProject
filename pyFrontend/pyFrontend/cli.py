"""CLI interface for pyFrontend project.

Be creative! do whatever you want!

- Install click or typer and create a CLI app
- Use builtin argparse
- Start a web application
- Import things from your .base module
"""

import random
import click
import random

from pyFrontend.base import userClass
from pyFrontend.base import Log, log

from pyFrontend.util import testConnection, login, logout
from pyFrontend.util import postScore, signUp, deleteProfile, updateProfile

@click.group()
def cli():
    pass

@click.command()
@click.option('-u', '--username', prompt=True, help='Username: ')
@click.option('-p', '--password', prompt=True, hide_input=True, confirmation_prompt=True, help='Password: ')
@click.option('-fn', '--first_name', prompt=True, help='First name: ')
@click.option('-ln', '--last_name', prompt=True, help='Last name: ')
@click.option('-em', '--email', prompt=True, help='Email: ')
@click.option('-bd', '--birth_date', prompt=True, help='Password: ')
def sign_up(username: str, password: str, first_name: str, last_name: str, email: str, birth_date: str):
    log(Log.TRACE, f'Calling: sign_()')

    payload = {
        "userName": username,
        "password": password,
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "birthDate": birth_date,
    }

    ret = signUp(payload)
    if ret == False:
        return

    pyl = payload['userName']
    log(Log.INFO, f'Successfully signed up {pyl}')
    return

@click.command()
@click.option('-u', '--username', prompt=True, help='Username: ')
@click.option('-p', '--password', prompt=True, hide_input=True, confirmation_prompt=True, help='Password: ')
@click.option('-c', '--count', help='Amount of randomized hiscores to be created. Max = 1000', default=1)
def new_score(username: str, password: str, count: str):
    log(Log.TRACE, f'Calling: new_score()')
    cats = ["math", "history", "science", "literature"]

    if count > 1000:
        log(Log.INFO, f"Count '{count}' above max of 1000. Set count to  '1000'")
        count = 1000

    if testConnection() == False:
        log(Log.ERROR, f'Connection test failed. Aborting.')
        return

    user = userClass(username, password)
    ret = login(user)

    if ret == False:
        user.logout()
        return

    user.ingestTokens(ret)

    for i in range(count):
        sc = postScore(user, random.randint(1000, 5000), cats[random.randint(0, 3)])
        if sc != 200:
            log(Log.ERROR, f'Something went wrong, status code {sc}')
            return

    log(Log.INFO, f'Successfully posted randomized {count} hiscore(s)') 
    log(Log.INFO, f'Logging out... {user.userName}')
    logout(user)
    return


@click.command()
@click.option('-u', '--username', prompt=True, help='Username: ')
@click.option('-p', '--password', prompt=True, hide_input=True, confirmation_prompt=True, help='Password: ')
def delete_profile(username: str, password: str):
    log(Log.TRACE, f'Calling: delete_profile()')

    if testConnection() == False:
        log(Log.ERROR, f'Connection test failed. Aborting.')
        return

    user = userClass(username, password)
    ret = login(user)

    if ret == False:
        user.logout()
        return

    user.ingestTokens(ret)

    ret = deleteProfile(user)
    if ret != 200:
        log(Log.ERROR, f'Something went wrong, status code {ret}')
        logout(user)
        return 

    log(Log.INFO, f'Successfully deleted profile, logging out {user.userName}')
    logout(user)

@click.command()
@click.option('-u', '--username', prompt=True, help='username: ')
@click.option('-p', '--password', prompt=True, hide_input=True, confirmation_prompt=True, help='password: ')
@click.option('-nu', '--new_username', prompt=True, help='new username: ')
@click.option('-ne', '--new_email', prompt=True, help='new email: ')
@click.option('-np', '--new_password', prompt=True, hide_input=True, confirmation_prompt=True, help='new password: ')
def update_profile(username: str, password: str, new_username: str, new_password: str, new_email: str):
    log(Log.TRACE, f'Calling: update_profile()')

    if testConnection() == False:
        log(Log.ERROR, f'Connection test failed. Aborting.')
        return

    user = userClass(username, password)
    ret = login(user)

    if ret == False:
        user.logout()
        return

    user.ingestTokens(ret)
    
    newUserCreds = {
        "userName": new_username,
        "email": new_email,
        "old_password": password,
        "new_password": new_password 
    }
    ret = updateProfile(user, newUserCreds)
    if ret.status_code != 200:
        log(Log.ERROR, f'Something went wrong, status code {ret}')
        logout(user)
        return 

    # need to relog with the new profile with the new fields
    log(Log.INFO, f'logging out {user.userName}')
    logout(user)
    del user

    updatedUser = userClass(newUserCreds['userName'], newUserCreds['new_password'])
    newLoginRet = login(updatedUser)
    updatedUser.ingestTokens(newLoginRet)

    if newLoginRet == False:
        log(Log.ERROR, 'Could not relog as newly updated profile')
        user.logout()
        return

    
    log(Log.INFO, f'Successfully updated profile')
    #log(Log.INFO, f'New profile: {user.userName}/{user.}')
    logout(updatedUser)

cli.add_command(sign_up)
cli.add_command(new_score)
cli.add_command(delete_profile)
cli.add_command(update_profile)

def main():  # pragma: no cover
    cli()

