import re
import os


    
def arg_parser(raw_args, DialogHandler):

  # devide raw_args to kays and args
  args = []
  keys = []

  for raw_arg in raw_args:
    if raw_arg[0] == '-':
      keys.append(raw_arg)
    else:
      args.append(raw_arg)

  



  # if -help
  if (keys[0] in ['-h', '-help'] and len(raw_args) == 1):
    DialogHandler.handle_help()



  # if -version
  elif (keys[0] in ['-v', '-version'] and len(raw_args) == 1):
    DialogHandler.handle_version()








  # if certain command is given
  else:
    command = args[0]


    # server-status
    if command in ['server-status', 's', 'ss']:
      if len(args) != 1:
        raise Exception('extra args after "server-status"')
      else:
        DialogHandler.handle_status()










    # login
    elif command in ['login', 'l']:
      if len(args) != 3:
        raise Exception('wrong args of "login"')
      else:
        DialogHandler.handle_login(args[1], args[2])









    # send
    elif command in ['put', 'send', 'p', 's']:


      if len(keys) > 1:
        raise Exception('too many keys given')


      files = args[1:]
      where_key = None

      # key -[where] handle
      if (len(keys) == 0 or keys[0] in ['-mere', '-m']):
        where_key = 'mere'
      elif keys[0] in ['-unmere', '-um']:
        where_key = 'unmere'
      elif keys[0] in ['-reserved', '-res', '-r']:
        where_key = 'reserved'
      else:
        raise Exception(f'unknown key "{keys[0]}"')

      for file in files:
        DialogHandler.handle_send(where_key, file)







    # get
    elif command in ['get', 'g']:

      if len(keys) > 1:
        raise Exception('too many keys given')
      

      files = args[1:]
      where_to_key = None
      where_from_key = None

      # keys checking
      for key in keys:
        if key not in ['-m', '-mere', '-um', '-unmere', '-r', '-res', '-reserved']:

          r = re.compile('-where=*.')
          key_ = list(filter(r.match, keys)) # key_ can be ['-where=/some/path'] or []

          if len(key_) == 0:
            raise Exception(f'unknown key "{key}"')
          else:
            where_to_key = key_[0].split('=', 1)[1]

        else:
          where_from_key = key


      if where_from_key == None or where_from_key in ['-mere', '-m']:
        where_from_key = 'mere'
      elif where_from_key in ['-unmere', '-um']:
        where_from_key = 'unmere'
      elif where_from_key in ['-reserved', '-res', '-r']:
        where_from_key = 'reserved'




      # check if dist exists
      if not os.path.exists(where_to_key):
        raise Exception(f'path "{where_to_key}" does not exist')
      

      for file in files:
        DialogHandler.handle_get(where_to_key, file)






    else:
      raise Exception(f'unknown command "{command}"')









  