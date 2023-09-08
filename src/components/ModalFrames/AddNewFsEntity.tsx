import React from "react";
import { useRecoilState } from "recoil";


import { ReactComponent as NewFolderSvg } from "../../assets/icons/new-folder.svg";
import { ReactComponent as NewFileSvg } from "../../assets/icons/new-file.svg";


// states
import { showAddNewFsEState } from "../../atoms/modalFramesAtoms";


const AddNewFsEntity: React.FC = () => {


  const [showAddNewFsE, setShowAddNewFsE ] = useRecoilState(showAddNewFsEState)


  return (

    
    <>
      <div className="shading" style={showAddNewFsE ? {} : {display: 'none'}} onClick={ () => setShowAddNewFsE(false) }>

        <div className="add-new-fse" onClick={ e => e.stopPropagation() }>
          <div className="add-new-fse__new-entity-btn" >
            <NewFolderSvg className="add-new-fse__new-entity-btn__icon"/>
            <div className="add-new-fse__new-entity-btn__text">New folder</div>
          </div>
          <div className="add-new-fse__new-entity-btn" >
            <NewFileSvg className="add-new-fse__new-entity-btn__icon"/>
            <div className="add-new-fse__new-entity-btn__text">Upload file</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AddNewFsEntity