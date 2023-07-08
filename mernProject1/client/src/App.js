import './App.css';
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './component/Home';
import LivePrice from './component/LivePrice';
import AllRecords from './component/AllRecords';
function App() {
  return (
  <BrowserRouter>
      <Navbar />
      <Routes >
      <Route  path='/' element={<Home />} />
         
          <Route  path='/allrecords' element={<AllRecords />} />
          <Route  path='/live-price' element={<LivePrice />} />


      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
