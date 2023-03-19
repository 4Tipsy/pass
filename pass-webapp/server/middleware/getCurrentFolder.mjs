import path from 'path'


function getCurrentFolder(req, res, next) {
  

  let fileField = req.body.fileField // can be ['mere', 'notMere', 'reserved']

  let currentUser = req.dataFromMiddleware.currentUser
  
  let currentFolder = path.join('users-folders', currentUser.userFolder, fileField)



  // pass userFolder to next middleware
  req.dataFromMiddleware.currentFolder = currentFolder
  


  next()
}


export default getCurrentFolder