import React from "react";



import { ReactComponent as FolderSvg } from '../../../assets/icons/fs_folder.svg'

import FSEntity from "../../../types/FSEntity";



/* MAIN COMPONENT */
const Folder: React.FC<FSEntity> = ({name, sizeInMB}) => {





  return (
    <div className="fs-entity">

      <div className="fs-entity__icon-wrapper">
        <FolderSvg className="fs-entity__icon" />
      </div>

      <div className="fs-entity__name">
        {name}
      </div>

      {<div className="fs-entity__size">
        {sizeInMB ? sizeInMB +' MB' : ''}
      </div>}

    </div>
  )
}


export default Folder