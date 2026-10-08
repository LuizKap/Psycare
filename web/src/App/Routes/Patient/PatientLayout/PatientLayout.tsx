import { Navigate, Outlet } from "react-router"
import { useState } from "react"

import PatientNavbar from "../../../components/Navbar/PatientNavbar"
import PatientSidebar from "./PatientSidebar/PatientSidebar"
import { useAuth } from "../../../../hooks/useAuth"
import GuestSidebar from "./GuestSidebar/GuestSidebar"
import { ScheduledAppointmentsProvider } from "../../../../contexts/Scheduled.appointments.context"
import { PatientProvider } from "../../../../contexts/Patient.context"

export function PatientLayout() {

    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    console.log(user)

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
                <ScheduledAppointmentsProvider>
                    {content}
                </ScheduledAppointmentsProvider>
            </PatientProvider>
        )
    } else {
        return content
    }

}