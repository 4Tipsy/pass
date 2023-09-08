import axios from "axios"









const getFsLayer = async (pathToLayer: string, fileField: string) => {


  const data = {
    'pathToLayer': pathToLayer,
    'fileField': fileField
  }

  axios.post(window.SERVER_URL, data)
  .then((resp) => {

  })
  
}





export default getFsLayer