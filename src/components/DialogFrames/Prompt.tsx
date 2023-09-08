import React, { useState } from "react";
import { useRecoilState } from "recoil";


import { showPromptState } from "../../atoms/modalFramesAtoms"; 





const Prompt: React.FC = () => {

  const [showPrompt, setShowPrompt] = useRecoilState(showPromptState)
  const [input, setInput] = useState('')


  return (
    <>
      <div className="shading"  style={showPrompt ? {} : {display: 'none'}} onClick={ () => setShowPrompt(false) }>

        <div className="prompt" onClick={ e => e.stopPropagation() }>
          <div className="prompt__text">
            {showPrompt}
          </div>

          <input type={"text"} placeholder={"Input..."} className="prompt__input" value={input} onChangeCapture={ e => setInput(e.target.value) }/>

          <div className="prompt__btns-block">
            <div className="prompt__btns-block__cancel-btn">Cancel</div>
            <div className="prompt__btns-block__ok-btn">Ok</div>
          </div>
        </div>

      </div>
    </>
  )
}



export default Prompt