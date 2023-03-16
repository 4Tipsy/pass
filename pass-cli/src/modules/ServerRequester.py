import json
import requests


class ServerRequester:


  # passing globals
  def __init__(self, GLOBALS):

    self.PASS_SERVER_ADDRESS = GLOBALS['pass_server_address']
    self.AUTH_TOKEN = GLOBALS['auth_token']
    self.CURRENT_VERSION = GLOBALS['current_version']





  def if_server_is_online(self) -> bool:

    try:
      res = requests.head(self.PASS_SERVER_ADDRESS, timeout=2.5) # in sec

      if res.status_code == 200:
        return True
      
      else:
        return False

    except requests.exceptions.Timeout:
      return False








  def version(self) -> object:
    return {'isSuccess': True, 'version': self.CURRENT_VERSION}







  def login(self, login_data) -> object:
    
    data_to_send = {
      'loginData': login_data # [userName, userPassword]
    }

    res = requests.post(self.PASS_SERVER_ADDRESS + '/login', data_to_send )

    return json.loads(res.content)
    




  def auth_check(self) -> object:

    if self.AUTH_TOKEN == None:

      return ({
        "isSuccess": False,
        "error": "U should log-in first"
        })


    data_to_send = {
      "authToken": self.AUTH_TOKEN
    }

    res = requests.post(self.PASS_SERVER_ADDRESS + '/authCheck', data_to_send)

    return json.loads(res.content)