import { Routes, Route, Outlet } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Home from "./Routes/Home/Home"
import { useState } from "react"
import LoggedSidebar from "./components/Sidebar/LoggedSidebar/LoggedSidebar"
import GuestSidebar from "./components/Sidebar/GuestSidebar/GuestSidebar"
import Register from "./Routes/Auth/Register/Register"
import RegisterPatient from "./Routes/Auth/Register/Components/Patient/Patient"
import RegisterPsychologist from "./Routes/Auth/Register/Components/Psychologist/Psychologist"


function App() {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleSidebar = () => { setIsOpen(isOpen => !isOpen) }

  const closeSidebar = () => { setIsOpen(false) }

  return (
    <>

      <Routes>

        <Route
          element={
            <>
              <Navbar toggleSidebar={toggleSidebar} />
              <GuestSidebar isOpen={isOpen} />
              <Outlet />
            </>
          }>

          <Route path="/" element={<Home closeSidebar={closeSidebar} />} />
        </Route>

        <Route
          path="/register"
          element={<Register />}
        >

          <Route path="patient" element={<RegisterPatient />}></Route>

          <Route path="psychologist" element={<RegisterPsychologist />}></Route>

        </Route>

      </Routes>

    </>

  )
}

export default App