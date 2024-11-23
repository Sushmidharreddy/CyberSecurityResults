import logo from './logo.svg';
import './App.css';
import Results from './Components/Results/Results';
import ResultsFormate from './Components/Results/ResultsFormate';
import Header from './Components/Header/Header';
import {Routes, Route} from 'react-router-dom';
import Upload from './Components/Upload/Upload';
import { useState } from 'react';
import { store } from './Components/Context/ContextApi';
import Footer from './Components/Footer/Footer';

function App() {

  const[results,SetResults] = useState([]);

  return (
    
    <div>
      <div className='sticky-top'>  <Header/>  </div>


<store.Provider value={[results,SetResults]}>
            <Routes>
              <Route path='/' element={<Results/>}/>
              <Route element={<ResultsFormate/>}/>
            </Routes>
          </store.Provider>
          <Routes>
          <Route path="/upload" element={<Upload/>}/>
           </Routes>


          
    <Footer />
    </div>
    
  );
}

export default App;
