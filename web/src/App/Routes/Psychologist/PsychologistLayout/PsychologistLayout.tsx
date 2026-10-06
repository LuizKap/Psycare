import { Navigate, Outlet } from "react-router"
import { useState } from "react"

import PsychologistNavbar from "../../../components/Navbar/PsychologistNavbar"
import PsychologistSidebar from "./PsychologistSidebar/PsychologistSidebar"
import { useAuth } from "../../../../hooks/useAuth"
import { PsychologistProvider } from "../../../../contexts/Psychologist.context"
import { AppointmentsProvider } from "../../../../contexts/Appointments.context"

export function PsychologistLayout() {

    const [isOpen, setIsOpen] = useState(false)

    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    console.log(user.role)

    if (user.role !== "PSYCHOLOGIST") {
        return <Navigate to="/unauthorized" replace />
    }

    const toggleSidebar = () => {
        setIsOpen(isOpen => !isOpen)
    }

    return (
        <>
            <PsychologistProvider>
                <PsychologistNavbar toggleSidebar={toggleSidebar} />
                <PsychologistSidebar isOpen={isOpen} />

                <Outlet />
            </PsychologistProvider>
        </>
    )
}