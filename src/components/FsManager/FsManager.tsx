/*
  FS = File System
*/

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useRecoilState } from 'recoil';


import Folder from './FsEntities/Folder'
import File from './FsEntities/File'



// ts types
import FsEntity from '../../types/FsEntity';


// svg
import { ReactComponent as PlusSvg } from '../../assets/icons/plus.svg'
import { ReactComponent as ArrowGoBackSvg } from '../../assets/icons/arrow-go-back.svg'


// states
import { showAddNewFsEState } from '../../atoms/modalFramesAtoms';
import { fileFieldState } from '../../atoms/fsManagerAtoms';
import { fsUrlState } from '../../atoms/fsManagerAtoms';





interface FsLayerInterface {
  fsLayer: FsEntity[];
}

/* MAIN COMPONENT */
const FsManager: React.FC = () => {



  const [ , setShowAddNewFsE] = useRecoilState(showAddNewFsEState)
  const [fileField , ] = useRecoilState(fileFieldState)
  const [fsUrl, setFsUrl] = useRecoilState(fsUrlState)

  const [fsLayer, setFsLayer]: any = useState({'result': 'loading'})

  useEffect(()=>{

    axios.post(window.SERVER_URL + '/fs-service/get-fs-layer', {'fileField': fileField, 'pathToLayer': fsUrl}, { withCredentials: true })
    .then((resp: any) => {
      if (resp.result === 'success') {
        setFsLayer(resp)

      } else {
        setFsLayer(resp)
      }

    })
    

  }, [fileField, fsUrl])




  function goBackInFs () {

    let newFsUrl = fsUrl.split('/').slice(0, -2).join('/')
    newFsUrl += '/'
    setFsUrl(newFsUrl)
  }








  const FsLayer: React.FC<FsLayerInterface> = ({fsLayer}) => {

    return (
      <>
          {/* go-back btn */}
          {
          fsUrl !== '/' &&
          <div className="go-back-btn" onClick={ () => goBackInFs() }>
            <ArrowGoBackSvg className='go-back-btn__icon'/>
          </div>
          }

          {/* fs-layer render */
            fsLayer.map(
              (entity) => {
                if (entity.type === 'folder') return <Folder {...entity} key={entity.name}/>

                if (entity.type === 'file') return <File {...entity} key={entity.name}/>
              }
            )
          }

          {/* add new fs-entity btn */}
          <div className="add-new-fse-btn" onClick={ () => setShowAddNewFsE(true) }>
            <PlusSvg className='add-new-fse-btn__icon'/>
          </div>
      </>
    )
  }






  return (
    <div className="fs-manager-section">

      <div className="fs-url">
        <div className="file-field">
          <span className="colored-text" style={fileField === 'reserved' ? {textDecoration: 'line-through'} : {}}>
            [{fileField}]: 
          </span>
          {' ' + fsUrl}
        </div>
      </div>



      {/* FS! */}
      <SimpleBar className='fs-manager-wrapper' autoHide={false}>
        <div className="fs-manager">
          {
            fsLayer.result === 'loading' 
            ? 'Loading'

            : fsLayer.result !== 'error'
            ? <FsLayer fsLayer={fsLayer.fsLayer} />


            : 'Error'
          }
        </div>
      </SimpleBar>




    </div>
  )
}







export default FsManager