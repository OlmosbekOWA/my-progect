import { Outlet } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs';
import { ToastContainer } from "react-toastify";
import './App.css'

function App() {


  return (
    <>
      <StyleProvider layer>
        <Outlet />
        <ToastContainer />
      </StyleProvider>
    </>  
  )
}

export default App
