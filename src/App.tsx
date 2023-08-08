import React, {useState, useEffect} from 'react';
import axios from 'axios';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FSManager from './components/FSManager/FSManager';




function App() {


  return (
    <>
      <Header />

      <FSManager fileField='mere' FSUrl='/' FSLayer={Array(90).fill({'name': 'ex', 'type': 'folder', 'sizeInMB': 400})} />

      <Footer spaceUsedInMB={9000} spaceAvailableInMB={10000}/>
    </>
  )
}

export default App;