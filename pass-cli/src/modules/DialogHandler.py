import json


class DialogHandler:
    

  def __init__(self, ServerRequester):
    self.ServerRequester = ServerRequester




  def handle_version(self) -> None:

    res = self.ServerRequester.version()

    if res['isSuccess']:
      version = res['version']

      print(f'Current: {version}')

    else:
      print('_write_it_already_')





  # pass status/s/ss
  def handle_status(self) -> None:

    print('status checking...')


    server_is_online = self.ServerRequester.if_server_is_online() # request

    if server_is_online:

      print('PASS is available')

      res = self.ServerRequester.auth_check() # request

      if res['isSuccess']:
        user = res['currentUser']

        print(f'successfully login as {user}')

      else:
        print('login failed')



    else:
      print('PASS is unavailable')







  # pass login/l <name> <password>
  def handle_login(self, user_name, user_password) -> None:
      
    print('login starting...')

    login_data = [user_name, user_password]
    res = self.ServerRequester.login(login_data) # request

    if res['isSuccess']:
      
      settings = {}
      auth_token = res['authToken']


      # write new auth_token to settings.json
      with open('../settings.json', 'r', encoding='utf-8') as read_file:
        settings = json.load(read_file)

      
      settings['auth_token'] = auth_token

      with open('../settings.json', 'w', encoding='utf-8') as write_file:
        json.dump(settings, write_file, indent=4)



        print('success')


    else:

      print('login failed \n')
      print(res['error'])











  def handle_help(self) -> None:
    
    print('\n')
    print('pass -help/-h')
    print(' => prints help information')
    print('\n')
    print('pass -version/-v')
    print(' => get version of pass-cli')
    print('\n')
    print('pass login/l [username] [password]')
    print(' => login to PASS')
    print('\n')
    print('pass send/put/s/p [file... or many... just like "npm i"]')
    print(' => possible keys: [-mere/-m | -unmere/-um | -reserved/-res/-r]')
    print(' => send [files] to your PASS storage, u can choose file-field via key')
    print('\n')
    print('pass get/g [file... or many... just like "npm i"]')
    print(' => possible keys: [-mere/-m | -unmere/-um | -reserved/-res/-r]')
    print('               [-where=/path/where/to/download/ur/files]')
    print(' => get [files] from your PASS storage, u can choose file-field via (u know which) key')
    print('    if [-where=/some/path] is not given would download to current dir')
    print('\n')
    print('\n')
    print('thanks for using pass, u can contact me here: "https://github.com/4Tipsy" :3')