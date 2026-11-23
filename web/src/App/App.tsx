import { Routes, Route } from "react-router"

import Home from "./Routes/Home/Home"
import { PsychologistHome } from "./Routes/Psychologist/PsychologistHome/Psychologist.home"

import Register from "./Routes/Auth/Register/Register"
import RegisterPatient from "./Routes/Auth/Register/Components/Patient"
import RegisterPsychologist from "./Routes/Auth/Register/Components/Psychologist"

import { Login } from "./Routes/Auth/Login/Login"
import { LoginPatient } from "./Routes/Auth/Login/components/Patient"
import { LoginPsychologist } from "./Routes/Auth/Login/components/Psychologist"

import { Toaster } from "sonner"

import { PsychologistLayout } from "./Routes/Psychologist/PsychologistLayout/PsychologistLayout"
import Unauthorized from "./Routes/Unauthorized/Unauthorized"
import { useAuth } from "../hooks/useAuth"
import { Loading } from "./components/Loading/Loading"
import { MyAppointments } from "./Routes/Patient/Appointments/MyAppointments/MyAppointments"
import { CreateAppointment } from "./Routes/Patient/Appointments/CreateAppointment/CreateAppointment"
import { PsychologistAppointments } from "./Routes/Psychologist/Appointments/PsychologistAppointments/PsychologistAppointments"
import 'react-loading-skeleton/dist/skeleton.css'
import { PsychologistProfile } from "./Routes/Psychologist/PsychologistProfile/PsychologistProfile"
import { AboutPsychologist } from "./Routes/Patient/AboutPsychologist/AboutPsychologist"
import { PatientProfile } from "./Routes/Patient/PatientProfile/PatientProfile"
import { RequirePatient } from "./Routes/RequirePatient/RequirePatient"
import { PatientOrGuestLayout } from "./Routes/PatientOrGuestLayout/PatientOrGuestLayout"


function App() {

  const auth = useAuth()

  if (auth.loading) return (
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

        {/* Rotas públicas: Guest e Paciente */}

        <Route element={<PatientOrGuestLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/aboutPsychologist"
            element={<AboutPsychologist />}
          />

          {/* Rotas do paciente */}

          <Route element={<RequirePatient />}>

            <Route
              path="/patient/appointments"
              element={<MyAppointments />}
            />

            <Route
              path="/appointments/create"
              element={<CreateAppointment />}
            />

            <Route
              path="/patient/me"
              element={<PatientProfile />}
            />

          </Route>

        </Route >


        {/* Área do psicólogo */}
        <Route element={<PsychologistLayout />}>

          <Route
            path="/psychologist"
            element={<PsychologistHome />}
          />

          <Route
            path="/psychologist/appointments"
            element={<PsychologistAppointments />}
          />

          <Route
            path="/psychologist/me"
            element={<PsychologistProfile />}
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