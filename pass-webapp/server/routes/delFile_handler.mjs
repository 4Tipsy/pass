import fs from 'fs'
import path from 'path'


function delFile_handler(req, res, next) {
  
  try {
    
    let fileToDel = req.body.fileToDel
    
    let currentFolder = req.dataFromMiddleware.currentFolder

    let fileToDelPath = path.join(currentFolder, fileToDel)



    // checking if file exists
    if ( !fs.existsSync(fileToDelPath) ) {

      throw new Error(`"${fileToDel}" does not exist`)
    }




    // if it is directory
    if ( fs.lstatSync(fileToDelPath).isDirectory() ) {


      throw new Error('Deleting folders is unsupported now')



    // if it is file
    } else {


      // get file size
      let fileSize = fs.lstatSync(fileToDelPath).size

      // space available check
      let currentUser = req.dataFromMiddleware.currentUser
      let spaceUsed_inMb = currentUser.spaceUsed_inMb
      spaceUsed_inMb -= (fileSize / 1024) / 1024

      
      // write new spaceUsed to users.json
      let users = JSON.parse( fs.readFileSync('users.json', 'utf8') )
      users.forEach(
        (u) => {
          if (u.userId == currentUser.userId) {
            u.spaceUsed_inMb = spaceUsed_inMb
          }
        }
      )
      fs.writeFileSync('users.json', JSON.stringify(users, null, '\t'))





      // deleting the file
      fs.unlinkSync(fileToDelPath)


      let objToSend = {'isSuccess': true}
      res.send( JSON.stringify(objToSend) )
      
    }




  } catch (error) {
    
    next(error)
  }
}




export default delFile_handler