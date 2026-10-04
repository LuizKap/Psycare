import { Navigate, Outlet } from "react-router"
import { useState } from "react"

import PsychologistNavbar from "../../../components/Navbar/PsychologistNavbar"
import PsychologistSidebar from "./PsychologistSidebar/PsychologistSidebar"
import { useAuth } from "../../../../hooks/useAuth"

export function PsychologistLayout() {

    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (user.role !== "PSYCHOLOGIST") {
        return <Navigate to="/unauthorized" replace />
    }

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(isOpen => !isOpen)
    }

    return (
        <>
            <PsychologistNavbar toggleSidebar={toggleSidebar} />
            <PsychologistSidebar isOpen={isOpen} />

            <Outlet />
        </>
    )
}