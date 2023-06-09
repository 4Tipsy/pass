import os
import shutil
import sys



os.chdir(os.path.dirname(os.path.abspath(__file__)))



# choosing the dir
where_to_install = None
while True:
    
  where_inputed = input('choose where to install the app (path should exist) (script will create "pass-cli" folder there) \n> ')


  if not os.path.exists(where_inputed):
    print('this path is not exist')
  else:

    print('\n' + where_inputed + ' contains:')
    print(os.listdir(where_inputed))



    if input('proceed? (y/n) > ') == 'y':
      where_to_install = where_inputed
      break







# creating the dir, and copying the files
where_to_install = os.path.join(where_to_install, 'pass-cli')
if not os.path.exists(where_to_install):
  os.mkdir(where_to_install)

else:
  print('"pass-cli" folder already exist there!')
  input()
  os.abort()



# copying
for dir in ['./src', './env']:
  dest = os.path.join(where_to_install, dir)
  shutil.copytree(dir, dest)
  print(f'{dir} copied')

for file in ['./settings.json']:
  dest = os.path.join(where_to_install, file)
  shutil.copyfile(file, dest)
  print(f'{file} copied')





# add to path
if input('write alias? (y/n)') != 'y':
  os.abort()



if (sys.platform == 'linux') or (sys.platform == 'linux2'):


  start_env = 'source ' + os.path.join(where_to_install, 'env/bin/activate')
  start_py = 'python ' + os.path.join(where_to_install, 'src/main.py')
  alias = f'alias pass="{start_env} && {start_py} && deactivate"\n'


  # write to .bashrc
  home_folder = os.path.expanduser('~')
  bashrc = os.path.abspath('%s/.bashrc' % home_folder)
  with open(bashrc, 'r') as f:
    lines = f.readlines()
    if alias not in lines:
      out = open(bashrc, 'a')
      out.write(alias)
      out.close()


  # instead of reload
  print('reload or "source ~/.bashrc"')





elif (sys.platform == 'win32'):
  print('how to make this on 2in i still dont know, sorry')
  input()







  
