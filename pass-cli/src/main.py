import sys
import json
import os



# globals init from settings.json
GLOBALS = {}

path_to_settings_json = os.path.join(os.path.dirname(os.path.abspath(__file__)) , '../settings.json' )
with open(path_to_settings_json, 'r', encoding='utf-8') as read_file:
  settings = json.load(read_file)

  GLOBALS['pass_server_address'] = settings['pass_server_address']
  GLOBALS['auth_token'] = settings['auth_token']
  GLOBALS['current_version'] = settings['app_info']['version']


# import app's modules
from modules.ServerRequester import ServerRequester as ServerRequester_exemplar
from modules.DialogHandler import DialogHandler as DialogHandler_exemplar

from modules.arg_parser import arg_parser



def Main():

  # init modules
  ServerRequester = ServerRequester_exemplar(GLOBALS)
  DialogHandler = DialogHandler_exemplar(ServerRequester)




  # APP ITSELF!

  try:
    raw_args = sys.argv[1:] # gets arguments after "pass" command


    # if 0 args
    if len(raw_args) == 0:
      raw_args = ['-help']

    # if more then 15
    elif len(raw_args) > 15:
      raise Exception('can process only 15 args')
    

    # processing
    arg_parser(raw_args, DialogHandler)


  # if arg_parser() returns error or >15 args
  except Exception as e_text:
    print(f'Error: {e_text}')





if __name__ == "__main__":
  Main()
