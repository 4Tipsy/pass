import React, {useState, useEffect} from 'react';


// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FSManager from './components/FsManager/FsManager';
import AddNewFsEntity from './components/ModalFrames/AddNewFsEntity';
import Alert from './components/DialogFrames/Alert';
import Confirm from './components/DialogFrames/Confirm';
import Prompt from './components/DialogFrames/Prompt';




function App() {


  return (
    <>
      <Header />

      <FSManager fsLayer={Array(1).fill({'name': 'ekfwf', 'type': 'folder', 'fileType': 'other', 'sizeInMB': 400})} />

      <Footer spaceUsedInMB={9000} spaceAvailableInMB={10000}/>

      <AddNewFsEntity/>

      <Alert/>
      <Confirm/>
      <Prompt/>
    </>
  )
}

export default App;