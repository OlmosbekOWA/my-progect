import { Outlet } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs';
import './App.css'

function App() {


  return (
    <>
      <StyleProvider layer>
        <Outlet />
      </StyleProvider>
    </>  
  )
}

export default App
