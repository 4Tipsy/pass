import React from "react";
import { useRecoilState } from "recoil";


import { showAlertState } from "../../atoms/modalFramesAtoms"; 


const Alert: React.FC = () => {


  const [showAlert, setShowAlert] = useRecoilState(showAlertState)


  return (
    <>
      <div className="shading" style={showAlert ? {} : {display: 'none'}} onClick={ () => setShowAlert(false) }>

        <div className="alert">
          <div className="alert__text">
            {showAlert}
          </div>

          <div className="alert__btns-block">
            <div className="alert__btns-block__ok-btn" onClick={ () => setShowAlert(false) }>Ok</div>
          </div>
        </div>

      </div>
    </>
  )
}



export default Alert