import os



class DialogHandler:
    
    def get_path():
      

      while True:

        path_to_file = input('Path to file:')


        if not os.path.exists(path_to_file):
          print('[!] There is no such file')


        elif os.path.isdir(path_to_file):
          print("[!] It's not a file")

        
        else:
          return path_to_file 
