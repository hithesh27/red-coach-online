// axios for api request
//antd -buld ui components 
//react redux
//redux toolkit
//redux 
//bootstrap - cdn link we will use normal css styling.
//icons -remix icons cdn link 
//react -router dom without it .cannot make a single page A
import 'antd/dist/reset.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/RegisterUser';
import './resources/global.css'
import './index.css'
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
function App() {
  //console.log('APP')
  return (
    <div >
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}></Route>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

//n