import fs from 'fs'
import path from 'path'


function getFile_handler(req, res, next) {
  
  try {
    
    let fileToGet = req.body.fileToGet
    
    let currentFolder = req.dataFromMiddleware.currentFolder

    let fileToGetPath = path.join(currentFolder, fileToGet)



    // checking if file exists
    if ( !fs.existsSync(fileToGetPath) ) {

      throw new Error(`"${fileToGet}" does not exist`)
    }




    // if it is directory
    if ( fs.lstatSync(fileToGetPath).isDirectory() ) {


      throw new Error('Downloading folders is unsupported now')



    // if it is file
    } else {

      let fileSizeInBytes = fs.lstatSync(fileToGetPath).size
      res.set('content-length', fileSizeInBytes)
      fs.createReadStream(fileToGetPath).pipe(res) // sendFile
      
    }




  } catch (error) {
    
    next(error)
  }
}




export default getFile_handler