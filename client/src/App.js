// axios for api request
//antd -buld ui components 
//react redux
//redux toolkit
//redux 
//bootstrap - cdn link we will use normal css styling.
//icons -remix icons cdn link 
//react -router dom without it .cannot make a single page 
import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './resources/global.css'

function App() {
  return (
    <div >
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

//n