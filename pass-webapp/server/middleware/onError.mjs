
function onError(error, req, res, next) {

  console.log(error);

  let objToSend = {
    'error': error.message
  }

  res.status(500) // means error
  res.send( JSON.stringify(objToSend) )

}


export default onError