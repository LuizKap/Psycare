import { BrowserRouter, Routes, Route } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Home from "./Routes/Home/Home"
import { useState } from "react"
import Sidebar from "./components/Sidebar/Sidebar"


function App() {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleSidebar = () => { setIsOpen(isOpen => !isOpen) }

  const closeSidebar = () => { setIsOpen(false) }

  return (

    <BrowserRouter>

      <Navbar toggleSidebar={toggleSidebar} />

      <Sidebar isOpen={isOpen} />

      <Routes>

        <Route path="/" element={<Home closeSidebar={closeSidebar} />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App