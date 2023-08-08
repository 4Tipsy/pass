import React from "react";



import { ReactComponent as OtherFileSvg } from '../../../assets/icons/fs_other_file.svg'

import FSEntity from "../../../types/FSEntity";



/* MAIN COMPONENT */
const File: React.FC<FSEntity> = ({name, sizeInMB, fileType}) => {





  return (
    <div className="fs-entity">

      <div className="fs-entity__icon-wrapper">
        <Svg_ fileType={fileType}/>
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





const Svg_: React.FC<Pick<FSEntity, 'fileType'>> = ({fileType}) => {

  /* proper svg img due to fileType */

  return (
    <>
      {
      fileType === 'img'
      ? <OtherFileSvg className="fs-entity__icon"/>
    
      : fileType === 'txt'
      ? <div/>
      
      : fileType === 'other'
      ? <div/>
    
      : <div>this one should never be rendered as if entity is 'file' it should 100% have 'fileType' !== undefined</div>
      }
    </>
  )
}





export default File