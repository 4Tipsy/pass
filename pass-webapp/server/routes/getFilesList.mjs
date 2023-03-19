import fs from 'fs'
import path from 'path'



function getFilesList(req, res, next) {
  
  try {

    let currentFolder = req.dataFromMiddleware.currentFolder


    // get data about files and folders in currentFolder
    let filesList = fs.readdirSync(currentFolder).map(
      el => {

        let name = el
        let sizeInBytes = fs.lstatSync( path.join(currentFolder, el) ).size
        let size = `${sizeInBytes / 1000000} MB`


        return {'name': name, 'size': size}
      }
    )


    let objToSend = {
      'isSuccess': true,
      'filesList': filesList
    }
  
    res.send( JSON.stringify(objToSend) )
    



  } catch (error) {
    
    next(error)

  }

}



export default getFilesList