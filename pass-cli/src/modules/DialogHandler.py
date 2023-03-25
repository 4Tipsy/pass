import json
import os
import tqdm


class DialogHandler:
    

  def __init__(self, ServerRequester):
    self.ServerRequester = ServerRequester




  def handle_version(self) -> None:

    [status, res] = self.ServerRequester.version()

    if status == 200:
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

      [status, res] = self.ServerRequester.auth_check() # request

      if status == 200:
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
    [status, res] = self.ServerRequester.login(login_data) # request

    if status == 200:
      
      settings = {}
      auth_token = res['authToken']


      # write new auth_token to settings.json
      path_to_settings_json = os.path.join(os.path.dirname(os.path.abspath(__file__)) , '../settings.json' )
      with open(path_to_settings_json, 'r', encoding='utf-8') as read_file:
        settings = json.load(read_file)

      
      settings['auth_token'] = auth_token

      with open(path_to_settings_json, 'w', encoding='utf-8') as write_file:
        json.dump(settings, write_file, indent=4)



        print('success')


    else:

      print('login failed \n')
      print(res['error'])









  # unlogin
  def handle_unlogin(self) -> None:
    
    # write "None" instead of auth_token in settings.json
    path_to_settings_json = os.path.join(os.path.dirname(os.path.abspath(__file__)) , '../settings.json' )
    with open(path_to_settings_json, 'r', encoding='utf-8') as read_file:
      settings = json.load(read_file)

    
    settings['auth_token'] = None

    with open(path_to_settings_json, 'w', encoding='utf-8') as write_file:
      json.dump(settings, write_file, indent=4)



      print('success')






  # get
  def handle_get(self, file_field, file_to_get, where_to_save) -> None:
    print(f'> getting "{file_to_get}":')
    self.ServerRequester.get_file(file_field, file_to_get, where_to_save)





  # ls/list
  def handle_get_files_list(self, file_field) -> None:
    [status, res] = self.ServerRequester.get_files_list(file_field)

    if status == 200:
      print(f'[[ file_field = {file_field} ]]')

      if len(res['filesList']) != 0:
        for f in res['filesList']:
          gap = '_' * (40 - len(f['name']) )
          print(f"\"{f['name']}\" {gap} {f['size']}")
      else:
        print('no files here yet...')
    
    else:
      print(res['error'])




  # send
  def handle_send(self, file_field, file_to_send) -> None:
    print(f'> sending "{file_to_send}":')
    self.ServerRequester.send_file(file_field, file_to_send)










  # del
  def handle_del(self, file_field, file_to_del) -> None:
    print(f'> deleting {file_to_del}')
    self.ServerRequester.del_file(file_field, file_to_del)















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
    print('pass unlogin/ul')
    print(' => unlogin from PASS')
    print('\n')
    print('pass send/put/s/p [file... or many... just like "npm i"]')
    print(' => possible keys: [-mere/-m | -unmere/-um | -reserved/-res/-r]')
    print(' => send [files] to your PASS storage, u can choose file-field via key')
    print('\n')
    print('pass del/d [file... or many... just like "npm i"]')
    print(' => possible keys: [-mere/-m | -unmere/-um | -reserved/-res/-r]')
    print(' => delete [files] from your PASS storage, u can choose file-field via key')
    print('\n')
    print('pass get/g [file... or many... just like "npm i"]')
    print(' => possible keys: [-mere/-m | -unmere/-um | -reserved/-res/-r]')
    print('               [-where=/path/where/to/download/ur/files]')
    print(' => get [files] from your PASS storage, u can choose file-field via (u know which) key')
    print('    if [-where=/some/path] is not given would download to current dir')
    print('\n')
    print('pass ls/list')
    print(' => possible keys: [-mere/-m | -unmere/-um | -reserved/-res/-r]')
    print(' => get list of files from your PASS storage, u can choose file-field via key')
    print('\n')
    print('\n')
    print('thanks for using pass-cli, u can contact me here: "https://github.com/4Tipsy" :3')