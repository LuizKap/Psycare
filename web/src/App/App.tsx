import { Routes, Route } from "react-router"

import PatientHome from "./Routes/Patient/PatientHome/PatientHome"
import { PsychologistHome } from "./Routes/Psychologist/PsychologistHome/Psychologist.home"

import Register from "./Routes/Auth/Register/Register"
import RegisterPatient from "./Routes/Auth/Register/Components/Patient"
import RegisterPsychologist from "./Routes/Auth/Register/Components/Psychologist"

import { Login } from "./Routes/Auth/Login/Login"
import { LoginPatient } from "./Routes/Auth/Login/components/Patient"
import { LoginPsychologist } from "./Routes/Auth/Login/components/Psychologist"

import { Toaster } from "sonner"

import { PatientLayout } from "./Routes/Patient/PatientLayout/PatientLayout"
import { PsychologistLayout } from "./Routes/Psychologist/PsychologistLayout/PsychologistLayout"
import Unauthorized from "./Routes/Unauthorized/Unauthorized"
import { useAuth } from "../hooks/useAuth"
import { Loading } from "./components/Loading/Loading"


function App() {

  const user = useAuth()

  if (user.loading) return (
    <Loading />
  )

  return (

    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={4000} />

      <Routes>

        {/* Área do paciente */}
        
        <Route element={<PatientLayout />}>
          <Route
            path="/"
            element={<PatientHome />}
          />
        </Route>


        {/* Área do psicólogo */}
        <Route element={<PsychologistLayout />}>
          <Route
            path="/psychologist"
            element={<PsychologistHome />}
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

        <Route
          path="/login"
          element={<Login />}
        >
          <Route
            path="patient"
            element={<LoginPatient />}
          />

          <Route
            path="psychologist"
            element={<LoginPsychologist />}
          />

        </Route>

        {/* Nao Autorizado */}

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

      </Routes>
    </>
  )
}

export default App