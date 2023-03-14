import fs from 'fs'



function getFile(req, res, next) {
  
  try {
    
    let fileToGet = req.body.fileToGet
    
    let currentFolder = req.dataFromMiddleWare.currentFolder

    fileToGet = path.join(currentFolder, fileToGet)



    // checking if file exists
    if ( !fs.existsSync(fileToGet) ) {

      throw new Error(`${fileToGet} does not exist`)
    }




    // if it is directory
    if ( fs.lstatSync(fileToGet).isDirectory() ) {


      throw new Error('Downloading folders is unsupported now')



    // if it is file
    } else {

      fs.createReadStream(fileToGet).pipe(res) // sendFile
      
    }




  } catch (error) {
    
    next(error)
  }
}




export default getFile