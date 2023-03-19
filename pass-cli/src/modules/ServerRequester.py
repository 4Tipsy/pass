import json
import os
import requests
import tqdm


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









  def get_file(self, file_field, file_to_get, where_to_save) -> None:


    data_to_send = {
      "authToken": self.AUTH_TOKEN,
      "fileField": file_field,
      "fileToGet": file_to_get,
    }


    # downloading the file
    res = requests.post(self.PASS_SERVER_ADDRESS + '/getFile', data_to_send)




    _path = os.path.join(where_to_save, file_to_get)


    # checking if file already exists
    if os.path.exists(_path):
      raise Exception(f'"{file_to_get}" already exists')



    # creating the file
    file_size = int( res.headers.get('content-length', 0) )
    progress_bar = tqdm.tqdm(total=file_size, unit='iB', unit_scale=True)

    with open(_path, 'wb') as new_file:
      for data in res.iter_content(1024):
        
        progress_bar.update(len(data))
        new_file.write(data)


    progress_bar.close()











  def get_files_list(self, file_field) -> object:


    data_to_send = {
      "authToken": self.AUTH_TOKEN,
      "fileField": file_field
    }
    
    res = requests.post(self.PASS_SERVER_ADDRESS + '/getFilesList', data_to_send)

    return json.loads(res.content)













  def send_file(self, file_field, file_to_send) -> object:


    if not os.path.exists(file_to_send):
      raise Exception(f'"{file_to_send}" does not exist')

    data_to_send = {
      "authToken": self.AUTH_TOKEN,
      "fileField": file_field
    }

    
    res = requests.post(self.PASS_SERVER_ADDRESS + '/sendFile', data_to_send, files={'file': open(file_to_send, 'rb')})
  
    return json.loads(res.content)