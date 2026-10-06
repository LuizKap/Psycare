import { Navigate, Outlet } from "react-router"
import { useState } from "react"

import PsychologistNavbar from "../../../components/Navbar/PsychologistNavbar"
import PsychologistSidebar from "./PsychologistSidebar/PsychologistSidebar"
import { useAuth } from "../../../../hooks/useAuth"
import { PsychologistProvider } from "../../../../contexts/Psychologist.context"

export function PsychologistLayout() {

    const [isOpen, setIsOpen] = useState(false)

    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/" replace />
    }

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