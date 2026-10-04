import { Navigate, Outlet } from "react-router"
import { useState } from "react"

import PatientNavbar from "../../../components/Navbar/PatientNavbar"
import PatientSidebar from "./PatientSidebar/PatientSidebar"
import { useAuth } from "../../../../hooks/useAuth"
import GuestSidebar from "./GuestSidebar/GuestSidebar"
import { AppointmentsProvider } from "../../../../contexts/Appointments.context"

export function PatientLayout() {

    const { user } = useAuth()

    if (user?.role === 'PSYCHOLOGIST') {
        return <Navigate to="/unauthorized" replace />
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(isOpen => !isOpen)
    }

    const content = (
        <>
            <PatientNavbar toggleSidebar={toggleSidebar} />

            {user?.role === 'PATIENT'
                ? <PatientSidebar isOpen={isOpen} />
                : <GuestSidebar isOpen={isOpen} />
            }

            <Outlet />
        </>
    )

    if (user?.role === 'PATIENT') {
        return (
            <AppointmentsProvider>
                {content}
            </AppointmentsProvider>
        )
    }

    return content
}