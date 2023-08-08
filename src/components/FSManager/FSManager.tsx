/*
  FS = File System
*/

import React from 'react'

import Folder from './FSEntities/Folder'
import File from './FSEntities/File'

// ts type
import FSEntity from '../../types/FSEntity';


import { ReactComponent as PlusSvg } from '../../assets/icons/plus.svg'





interface FSManagerInterface {
  fileField: 'mere' | 'unmere' | 'reserved';
  FSUrl: string;
  FSLayer: FSEntity[];
}

/* MAIN COMPONENT */
const FSManager: React.FC<FSManagerInterface> = ({fileField, FSUrl, FSLayer}) => {


  return (
    <div className="fs-manager-wrapper">

      <div className="fs-url">
        <div className="file-field">
          <span className="colored-text">[{fileField}]: </span>
          {FSUrl}
        </div>
      </div>



      {/* File System! */}
      <div className="fs-manager">

        {/* fs-layer render */
          FSLayer.map(
            (entity) => {
              if (entity.type === 'folder') return <Folder {...entity} />

              if (entity.type === 'file') return <File {...entity} />
            }
          )
        }
        {/* add new fs-entity btn */}
        <div className="add-new-fse-btn">
          <PlusSvg className='add-new-fse-btn__icon'/>
        </div>


      </div>

    </div>
  )
}


export default FSManager