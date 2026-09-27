import { Routes, Route, Outlet } from "react-router"
import { useState } from "react"

import Navbar from "./components/Navbar/Navbar"
import { Sidebar } from "./components/Sidebar/Sidebar.render"

import Home from "./Routes/Home/Home"

import Register from "./Routes/Auth/Register/Register"
import RegisterPatient from "./Routes/Auth/Register/Components/Patient"
import RegisterPsychologist from "./Routes/Auth/Register/Components/Psychologist"


function App() {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleSidebar = () => {
    setIsOpen(isOpen => !isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <Routes>

      {/* Layout principal */}
      <Route
        element={
          <>
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isOpen} />

            <Outlet />
          </>
        }
      >
        {/* Páginas dentro do Layout */}
        <Route
          path="/"
          element={<Home closeSidebar={closeSidebar} />}
        />
      </Route>


      {/* Cadastro */}
      <Route
        path="/register"
        element={<Register />}
      >
        <Route
          path="patient"
          element={<RegisterPatient />}
        />

        <Route
          path="psychologist"
          element={<RegisterPsychologist />}
        />
      </Route>

    </Routes>
  )
}

export default App