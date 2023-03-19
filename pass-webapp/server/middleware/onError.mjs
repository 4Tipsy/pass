
function onError(error, req, res, next) {

  console.log(error);

  let objToSend = {
    'isSuccess': false,
    'error': error.message
  }

  res.send( JSON.stringify(objToSend) )

}


export default onError