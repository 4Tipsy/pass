import React from "react";
import { useRecoilState } from "recoil";


import { ReactComponent as FolderSvg } from '../../../assets/icons/fs_folder.svg'

import FsEntity from "../../../types/FsEntity";



import { fsUrlState } from "../../../atoms/fsManagerAtoms";




/* MAIN COMPONENT */
const Folder: React.FC<FsEntity> = ({name, sizeInMB}) => {


  const [fsUrl , setFsUrl] = useRecoilState(fsUrlState)



  function goForwardInFs(folderName: string) {

    let newUrl = fsUrl + folderName + '/' // '/some/url/' + 'folderName' + '/'
    setFsUrl(newUrl)
  }



  return (
    <div className="fs-entity" onClick={ () => goForwardInFs(name) }>

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