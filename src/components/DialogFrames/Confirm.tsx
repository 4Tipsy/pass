import React from "react";
import { useRecoilState } from "recoil";


import { showConfirmState } from "../../atoms/modalFramesAtoms"; 





const Confirm: React.FC = () => {

  const [showConfirm, setShowConfirm] = useRecoilState(showConfirmState)


  return (
    <>
      <div className="shading" style={showConfirm ? {} : {display: 'none'}} onClick={ () => setShowConfirm(false) }>

        <div className="confirm">
          <div className="confirm__text">
            {showConfirm}
          </div>

          <div className="confirm__btns-block">
            <div className="confirm__btns-block__cancel-btn">Cancel</div>
            <div className="confirm__btns-block__ok-btn">Ok</div>
          </div>
        </div>

      </div>
    </>
  )
}



export default Confirm