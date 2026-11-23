import { Outlet } from "react-router"
import { useState } from "react"

import PatientNavbar from "../../../components/Navbar/PatientNavbar"
import PatientSidebar from "./PatientSidebar/PatientSidebar"

import { ScheduledAppointmentsProvider } from "../../../../contexts/Scheduled.appointments.context"
import { PatientProvider } from "../../../../contexts/Patient.context"

export function PatientLayout() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <PatientProvider>
            <ScheduledAppointmentsProvider>
                <PatientNavbar toggleSidebar={toggleSidebar} />
                <PatientSidebar isOpen={isOpen} />
                <Outlet />
            </ScheduledAppointmentsProvider>
        </PatientProvider>
    )
}