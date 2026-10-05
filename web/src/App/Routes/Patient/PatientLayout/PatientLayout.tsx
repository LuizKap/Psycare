import { Navigate, Outlet } from "react-router"
import { useState } from "react"

import PatientNavbar from "../../../components/Navbar/PatientNavbar"
import PatientSidebar from "./PatientSidebar/PatientSidebar"
import { useAuth } from "../../../../hooks/useAuth"
import GuestSidebar from "./GuestSidebar/GuestSidebar"
import { AppointmentsProvider } from "../../../../contexts/Appointments.context"
import { PatientProvider } from "../../../../contexts/Patient.context"

export function PatientLayout() {

    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)

    if (user?.role === 'PSYCHOLOGIST') {
        return <Navigate to="/unauthorized" replace />
    }

    const toggleSidebar = () => {
        setIsOpen(isOpen => !isOpen)
    }

    const content = (
        <>
            <PatientNavbar toggleSidebar={toggleSidebar} />
            {user?.role === 'PATIENT' ? <PatientSidebar isOpen={isOpen} /> : <GuestSidebar isOpen={isOpen} />}

            <Outlet />
        </>
    )

    if (user?.role === 'PATIENT') {
        return (
            <PatientProvider>
                <AppointmentsProvider>
                    {content}
                </AppointmentsProvider>
            </PatientProvider>
        )
    } else {
        return content
    }

}