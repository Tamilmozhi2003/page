

import Auth from "./components/Auth";
import React,{useEffect} from 'react';
import './App.css';
import { HashRouter,Routes,Route } from 'react-router-dom';


function App() {

  return (
    <>
    

       <HashRouter><Routes>
        <Route path="/" element={<Auth/>}/>
        
      </Routes></HashRouter>

    </>
  );
}

export default App;